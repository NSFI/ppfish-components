var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';
import Menu, { SubMenu, Item as MenuItem } from '../Menu/src';
import closest from 'dom-closest';
import classNames from 'classnames';
import { shallowEqual } from '../../utils';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import FilterDropdownMenuWrapper from './FilterDropdownMenuWrapper';

var FilterMenu =
/** @class */
function (_super) {
  __extends(FilterMenu, _super);

  function FilterMenu(props) {
    var _this = _super.call(this, props) || this;

    _this.getNeverShown = function (column) {
      var rootNode = ReactDOM.findDOMNode(_this);
      var filterBelongToScrollBody = !!closest(rootNode, ".fishd-table-scroll");

      if (filterBelongToScrollBody) {
        // When fixed column have filters, there will be two dropdown menus
        // Filter dropdown menu inside scroll body should never be shown
        // To fix https://github.com/ant-design/ant-design/issues/5010 and
        // https://github.com/ant-design/ant-design/issues/7909
        return !!column.fixed;
      }

      return false;
    };

    _this.setSelectedKeys = function (_a) {
      var selectedKeys = _a.selectedKeys;

      _this.setState({
        selectedKeys: selectedKeys
      });
    };

    _this.handleClearFilters = function () {
      _this.setState({
        selectedKeys: []
      }, _this.handleConfirm);
    };

    _this.handleConfirm = function () {
      _this.setVisible(false);

      _this.confirmFilter();
    };

    _this.onVisibleChange = function (visible) {
      _this.setVisible(visible);

      if (!visible) {
        _this.confirmFilter();
      }
    };

    _this.handleMenuItemClick = function (info) {
      if (!info.keyPath || info.keyPath.length <= 1) {
        return;
      }

      var keyPathOfSelectedItem = _this.state.keyPathOfSelectedItem;

      if (_this.state.selectedKeys.indexOf(info.key) >= 0) {
        // deselect SubMenu child
        delete keyPathOfSelectedItem[info.key];
      } else {
        // select SubMenu child
        keyPathOfSelectedItem[info.key] = info.keyPath;
      }

      _this.setState({
        keyPathOfSelectedItem: keyPathOfSelectedItem
      });
    };

    _this.renderFilterIcon = function () {
      var _a = _this.props,
          column = _a.column,
          locale = _a.locale,
          prefixCls = _a.prefixCls;
      var filterd = _this.props.selectedKeys.length > 0;
      var filterIcon = column.filterIcon;

      if (typeof filterIcon === 'function') {
        filterIcon = filterIcon(filterd);
      }

      var dropdownSelectedClass = filterd ? prefixCls + "-selected" : '';
      return filterIcon ? React.cloneElement(filterIcon, {
        title: locale.filterTitle,
        className: classNames(prefixCls + "-icon", filterIcon.props.className)
      }) : React.createElement(Icon, {
        title: locale.filterTitle,
        type: "filter",
        className: dropdownSelectedClass
      });
    };

    var visible = 'filterDropdownVisible' in props.column ? props.column.filterDropdownVisible : false;
    _this.state = {
      selectedKeys: props.selectedKeys,
      keyPathOfSelectedItem: {},
      visible: visible,
      prevProps: props,
      neverShown: false
    };
    return _this;
  }

  FilterMenu.getDerivedStateFromProps = function (nextProps, prevState) {
    var _a = prevState.prevProps,
        prevProps = _a === void 0 ? {} : _a;
    var newState = {
      prevProps: nextProps
    };

    if ('selectedKeys' in nextProps && !shallowEqual(prevProps.selectedKeys, nextProps.selectedKeys)) {
      newState.selectedKeys = nextProps.selectedKeys;
    }

    var column = nextProps.column;

    if ('filterDropdownVisible' in column) {
      newState.visible = column.filterDropdownVisible;
    }

    return newState;
  };

  FilterMenu.prototype.componentDidMount = function () {
    var column = this.props.column;
    this.setState({
      neverShown: this.getNeverShown(column)
    });
  };

  FilterMenu.prototype.componentDidUpdate = function () {
    var column = this.props.column;
    var neverShown = this.getNeverShown(column);

    if (this.state.neverShown !== neverShown) {
      this.setState({
        neverShown: neverShown
      });
    }
  };

  FilterMenu.prototype.setVisible = function (visible) {
    var column = this.props.column;

    if (!('filterDropdownVisible' in column)) {
      this.setState({
        visible: visible
      });
    }

    if (column.onFilterDropdownVisibleChange) {
      column.onFilterDropdownVisibleChange(visible);
    }
  };

  FilterMenu.prototype.confirmFilter = function () {
    if (this.state.selectedKeys !== this.props.selectedKeys) {
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    }
  };

  FilterMenu.prototype.renderMenuItem = function (item) {
    var column = this.props.column;
    var selectedKeys = this.state.selectedKeys;
    var multiple = 'filterMultiple' in column ? column.filterMultiple : true;
    var input = multiple ? React.createElement(Checkbox, {
      checked: selectedKeys.indexOf(item.value.toString()) >= 0
    }) : React.createElement(Radio, {
      checked: selectedKeys.indexOf(item.value.toString()) >= 0
    });
    return React.createElement(MenuItem, {
      key: item.value
    }, input, React.createElement("span", null, item.text));
  };

  FilterMenu.prototype.hasSubMenu = function () {
    var _a = this.props.column.filters,
        filters = _a === void 0 ? [] : _a;
    return filters.some(function (item) {
      return !!(item.children && item.children.length > 0);
    });
  };

  FilterMenu.prototype.renderMenus = function (items) {
    var _this = this;

    return items.map(function (item) {
      if (item.children && item.children.length > 0) {
        var keyPathOfSelectedItem_1 = _this.state.keyPathOfSelectedItem;
        var containSelected = Object.keys(keyPathOfSelectedItem_1).some(function (key) {
          return keyPathOfSelectedItem_1[key].indexOf(item.value) >= 0;
        });
        var subMenuCls = containSelected ? _this.props.dropdownPrefixCls + "-submenu-contain-selected" : '';
        return React.createElement(SubMenu, {
          title: item.text,
          className: subMenuCls,
          key: item.value.toString()
        }, _this.renderMenus(item.children));
      }

      return _this.renderMenuItem(item);
    });
  };

  FilterMenu.prototype.render = function () {
    var _a;

    var _this = this;

    var _b = this.props,
        column = _b.column,
        locale = _b.locale,
        prefixCls = _b.prefixCls,
        dropdownPrefixCls = _b.dropdownPrefixCls,
        getPopupContainer = _b.getPopupContainer; // default multiple selection in filter dropdown

    var multiple = 'filterMultiple' in column ? column.filterMultiple : true;
    var dropdownMenuClass = classNames((_a = {}, _a[dropdownPrefixCls + "-menu-without-submenu"] = !this.hasSubMenu(), _a));
    var filterDropdown = column.filterDropdown;

    if (filterDropdown && typeof filterDropdown === 'function') {
      filterDropdown = filterDropdown({
        prefixCls: dropdownPrefixCls + "-custom",
        setSelectedKeys: function setSelectedKeys(selectedKeys) {
          return _this.setSelectedKeys({
            selectedKeys: selectedKeys
          });
        },
        selectedKeys: this.state.selectedKeys,
        confirm: this.handleConfirm,
        clearFilters: this.handleClearFilters,
        filters: column.filters,
        getPopupContainer: function getPopupContainer(triggerNode) {
          return triggerNode.parentNode;
        }
      });
    }

    var menus = filterDropdown ? React.createElement(FilterDropdownMenuWrapper, null, filterDropdown) : React.createElement(FilterDropdownMenuWrapper, {
      className: prefixCls + "-dropdown"
    }, React.createElement(Menu, {
      multiple: multiple,
      onClick: this.handleMenuItemClick,
      prefixCls: dropdownPrefixCls + "-menu",
      className: dropdownMenuClass,
      onSelect: this.setSelectedKeys,
      onDeselect: this.setSelectedKeys,
      selectedKeys: this.state.selectedKeys,
      getPopupContainer: function getPopupContainer(triggerNode) {
        return triggerNode.parentNode;
      }
    }, this.renderMenus(column.filters)), React.createElement("div", {
      className: prefixCls + "-dropdown-btns"
    }, React.createElement("a", {
      className: prefixCls + "-dropdown-link clear",
      onClick: this.handleClearFilters
    }, locale.filterReset), React.createElement("a", {
      className: prefixCls + "-dropdown-link confirm",
      onClick: this.handleConfirm
    }, locale.filterConfirm)));
    return React.createElement(Dropdown, {
      trigger: ['click'],
      overlay: menus,
      visible: this.state.neverShown ? false : this.state.visible,
      onVisibleChange: this.onVisibleChange,
      getPopupContainer: getPopupContainer,
      forceRender: true
    }, this.renderFilterIcon());
  };

  FilterMenu.defaultProps = {
    handleFilter: function handleFilter() {},
    column: {}
  };
  return FilterMenu;
}(React.Component);

polyfill(FilterMenu);
export default FilterMenu;