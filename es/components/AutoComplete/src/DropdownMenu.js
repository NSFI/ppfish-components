function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Menu from '../../Menu/src/index.js';
import scrollIntoView from 'dom-scroll-into-view';
import raf from 'raf';
import { toArray, getSelectKeys, preventDefaultEvent, saveRef } from './util';

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  function DropdownMenu(_props) {
    var _this;

    _classCallCheck(this, DropdownMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropdownMenu).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "scrollActiveItemToView", function () {
      // scroll into view
      var itemComponent = findDOMNode(_this.firstActiveItem);
      var props = _this.props;

      if (itemComponent) {
        var scrollIntoViewOpts = {
          onlyScrollIfNeeded: true
        };

        if ((!props.value || props.value.length === 0) && props.firstActiveValue) {
          scrollIntoViewOpts.alignWithTop = true;
        } // Delay to scroll since current frame item position is not ready when pre view is by filter
        // https://github.com/ant-design/ant-design/issues/11268#issuecomment-406634462


        raf(function () {
          scrollIntoView(itemComponent, findDOMNode(_this.menuRef), scrollIntoViewOpts);
        });
      }
    });

    _this.lastInputValue = _props.inputValue;
    _this.saveMenuRef = saveRef(_assertThisInitialized(_this), 'menuRef');
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollActiveItemToView();
      this.lastVisible = this.props.visible;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (!nextProps.visible) {
        this.lastVisible = false;
      } // freeze when hide


      return nextProps.visible;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var props = this.props;

      if (!prevProps.visible && props.visible) {
        this.scrollActiveItemToView();
      }

      this.lastVisible = props.visible;
      this.lastInputValue = props.inputValue;
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this2 = this;

      var props = this.props;
      var menuItems = props.menuItems,
          defaultActiveFirstOption = props.defaultActiveFirstOption,
          value = props.value,
          prefixCls = props.prefixCls,
          multiple = props.multiple,
          onMenuSelect = props.onMenuSelect,
          inputValue = props.inputValue,
          firstActiveValue = props.firstActiveValue,
          backfillValue = props.backfillValue;

      if (menuItems && menuItems.length) {
        var menuProps = {};

        if (multiple) {
          menuProps.onDeselect = props.onMenuDeselect;
          menuProps.onSelect = onMenuSelect;
        } else {
          menuProps.onClick = onMenuSelect;
        }

        var selectedKeys = getSelectKeys(menuItems, value);
        var activeKeyProps = {};
        var clonedMenuItems = menuItems;

        if (selectedKeys.length || firstActiveValue) {
          if (props.visible && !this.lastVisible) {
            activeKeyProps.activeKey = selectedKeys[0] || firstActiveValue;
          }

          var foundFirst = false; // set firstActiveItem via cloning menus
          // for scroll into view

          var clone = function clone(item) {
            if (!foundFirst && selectedKeys.indexOf(item.key) !== -1 || !foundFirst && !selectedKeys.length && firstActiveValue.indexOf(item.key) !== -1) {
              foundFirst = true;
              return cloneElement(item, {
                ref: function ref(_ref) {
                  _this2.firstActiveItem = _ref;
                }
              });
            }

            return item;
          };

          clonedMenuItems = menuItems.map(function (item) {
            if (item.type.isMenuItemGroup) {
              var children = toArray(item.props.children).map(clone);
              return cloneElement(item, {}, children);
            }

            return clone(item);
          });
        } else {
          // Clear firstActiveItem when dropdown menu items was empty
          // Avoid `Unable to find node on an unmounted component`
          // https://github.com/ant-design/ant-design/issues/10774
          this.firstActiveItem = null;
        } // clear activeKey when inputValue change


        var lastValue = value && value[value.length - 1];

        if (inputValue !== this.lastInputValue && (!lastValue || lastValue !== backfillValue)) {
          activeKeyProps.activeKey = '';
        }

        return React.createElement(Menu, _extends({
          ref: this.saveMenuRef,
          style: this.props.dropdownMenuStyle,
          defaultActiveFirst: defaultActiveFirstOption,
          role: "listbox"
        }, activeKeyProps, {
          multiple: multiple
        }, menuProps, {
          selectedKeys: selectedKeys,
          prefixCls: "".concat(prefixCls, "-menu")
        }), clonedMenuItems);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var renderMenu = this.renderMenu();
      return renderMenu ? React.createElement("div", {
        style: {
          overflow: 'auto'
        },
        onFocus: this.props.onPopupFocus,
        onMouseDown: preventDefaultEvent,
        onScroll: this.props.onPopupScroll
      }, renderMenu) : null;
    }
  }]);

  return DropdownMenu;
}(React.Component);

_defineProperty(DropdownMenu, "propTypes", {
  defaultActiveFirstOption: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  dropdownMenuStyle: PropTypes.object,
  multiple: PropTypes.bool,
  onPopupFocus: PropTypes.func,
  onPopupScroll: PropTypes.func,
  onMenuDeSelect: PropTypes.func,
  onMenuSelect: PropTypes.func,
  prefixCls: PropTypes.string,
  menuItems: PropTypes.array,
  inputValue: PropTypes.string,
  visible: PropTypes.bool
});

export { DropdownMenu as default };
DropdownMenu.displayName = 'DropdownMenu';