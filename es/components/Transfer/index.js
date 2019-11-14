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

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import List from './List';
import Operation from './Operation';
import Search from './Search';
import './style/index.less';

function noop() {}

var Transfer =
/** @class */
function (_super) {
  __extends(Transfer, _super);

  function Transfer(props) {
    var _this = _super.call(this, props) || this;

    _this.separatedDataSource = null;

    _this.moveTo = function (direction) {
      var _a;

      var _b = _this.props,
          _c = _b.targetKeys,
          targetKeys = _c === void 0 ? [] : _c,
          _d = _b.dataSource,
          dataSource = _d === void 0 ? [] : _d,
          onChange = _b.onChange;
      var _e = _this.state,
          sourceSelectedKeys = _e.sourceSelectedKeys,
          targetSelectedKeys = _e.targetSelectedKeys;
      var moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys; // filter the disabled options

      var newMoveKeys = moveKeys.filter(function (key) {
        return !dataSource.some(function (data) {
          return !!(key === data.key && data.disabled);
        });
      }); // move items to target box

      var newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
        return newMoveKeys.indexOf(targetKey) === -1;
      }); // empty checked keys

      var oppositeDirection = direction === 'right' ? 'left' : 'right';

      _this.setState((_a = {}, _a[_this.getSelectedKeysName(oppositeDirection)] = [], _a));

      _this.handleSelectChange(oppositeDirection, []);

      if (onChange) {
        onChange(newTargetKeys, direction, newMoveKeys);
      }
    };

    _this.moveToLeft = function () {
      return _this.moveTo('left');
    };

    _this.moveToRight = function () {
      return _this.moveTo('right');
    };

    _this.handleSelectAll = function (direction, filteredDataSource, checkAll) {
      var _a;

      var originalSelectedKeys = _this.state[_this.getSelectedKeysName(direction)] || [];
      var currentKeys = filteredDataSource.map(function (item) {
        return item.key;
      }); // Only operate current keys from original selected keys

      var newKeys1 = originalSelectedKeys.filter(function (key) {
        return currentKeys.indexOf(key) === -1;
      });

      var newKeys2 = __spreadArrays(originalSelectedKeys);

      currentKeys.forEach(function (key) {
        if (newKeys2.indexOf(key) === -1) {
          newKeys2.push(key);
        }
      });
      var holder = checkAll ? newKeys1 : newKeys2;

      _this.handleSelectChange(direction, holder);

      if (!_this.props.selectedKeys) {
        _this.setState((_a = {}, _a[_this.getSelectedKeysName(direction)] = holder, _a));
      }
    };

    _this.handleLeftSelectAll = function (filteredDataSource, checkAll) {
      return _this.handleSelectAll('left', filteredDataSource, checkAll);
    };

    _this.handleRightSelectAll = function (filteredDataSource, checkAll) {
      return _this.handleSelectAll('right', filteredDataSource, checkAll);
    };

    _this.handleFilter = function (direction, e) {
      var _a;

      _this.setState((_a = {}, // add filter
      _a[direction + "Filter"] = e.target.value, _a));

      if (_this.props.onSearchChange) {
        _this.props.onSearchChange(direction, e);
      }
    };

    _this.handleLeftFilter = function (e) {
      return _this.handleFilter('left', e);
    };

    _this.handleRightFilter = function (e) {
      return _this.handleFilter('right', e);
    };

    _this.handleClear = function (direction) {
      var _a;

      _this.setState((_a = {}, _a[direction + "Filter"] = '', _a));
    };

    _this.handleLeftClear = function () {
      return _this.handleClear('left');
    };

    _this.handleRightClear = function () {
      return _this.handleClear('right');
    }; // 只单选模式下的目标列表


    _this.handleClose = function (selectedItem) {
      if (_this.props.mode === 'single') {
        var _a = _this.props,
            _b = _a.targetKeys,
            targetKeys = _b === void 0 ? [] : _b,
            onChange = _a.onChange;
        var newMoveKeys = [selectedItem.key];
        var newTargetKeys = targetKeys.filter(function (key) {
          return key !== selectedItem.key;
        });

        if (onChange) {
          onChange(newTargetKeys, 'left', newMoveKeys);
        }
      }
    };

    _this.handleSelect = function (direction, selectedItem, checked) {
      var _a; // 单选模式下，点击直接move


      if (_this.props.mode === 'single') {
        if (direction === 'right') {
          return;
        }

        var _b = _this.props,
            _c = _b.targetKeys,
            targetKeys = _c === void 0 ? [] : _c,
            onChange = _b.onChange;
        var newMoveKeys = [selectedItem.key];
        var newTargetKeys = targetKeys.concat(newMoveKeys);

        if (onChange) {
          onChange(newTargetKeys, 'right', newMoveKeys);
        }
      } else {
        var _d = _this.state,
            sourceSelectedKeys = _d.sourceSelectedKeys,
            targetSelectedKeys = _d.targetSelectedKeys;
        var holder = direction === 'left' ? __spreadArrays(sourceSelectedKeys) : __spreadArrays(targetSelectedKeys);
        var index = holder.indexOf(selectedItem.key);

        if (index > -1) {
          holder.splice(index, 1);
        }

        if (checked) {
          holder.push(selectedItem.key);
        }

        _this.handleSelectChange(direction, holder);

        if (!_this.props.selectedKeys) {
          _this.setState((_a = {}, _a[_this.getSelectedKeysName(direction)] = holder, _a));
        }
      }
    };

    _this.handleLeftSelect = function (selectedItem, checked) {
      return _this.handleSelect('left', selectedItem, checked);
    };

    _this.handleRightSelect = function (selectedItem, checked) {
      return _this.handleSelect('right', selectedItem, checked);
    };

    _this.handleScroll = function (direction, e) {
      var onScroll = _this.props.onScroll;

      if (onScroll) {
        onScroll(direction, e);
      }
    };

    _this.handleLeftScroll = function (e) {
      return _this.handleScroll('left', e);
    };

    _this.handleRightScroll = function (e) {
      return _this.handleScroll('right', e);
    };

    _this.getTitles = function (transferLocale) {
      var props = _this.props;

      if (props.titles) {
        return props.titles;
      }

      return transferLocale.titles;
    };

    _this.getSelectedKeysName = function (direction) {
      return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    };

    _this.renderTransfer = function () {
      var _a = _this.props,
          _b = _a.prefixCls,
          prefixCls = _b === void 0 ? 'fishd-transfer' : _b,
          className = _a.className,
          mode = _a.mode,
          _c = _a.operations,
          operations = _c === void 0 ? [] : _c,
          operation = _a.operation,
          showSearch = _a.showSearch,
          notFoundContent = _a.notFoundContent,
          searchPlaceholder = _a.searchPlaceholder,
          body = _a.body,
          footer = _a.footer,
          style = _a.style,
          listStyle = _a.listStyle,
          operationStyle = _a.operationStyle,
          filterOption = _a.filterOption,
          render = _a.render,
          lazy = _a.lazy;
      var _d = _this.state,
          leftFilter = _d.leftFilter,
          rightFilter = _d.rightFilter,
          sourceSelectedKeys = _d.sourceSelectedKeys,
          targetSelectedKeys = _d.targetSelectedKeys;

      var _e = _this.separateDataSource(_this.props),
          leftDataSource = _e.leftDataSource,
          rightDataSource = _e.rightDataSource;

      var leftActive = targetSelectedKeys.length > 0;
      var rightActive = sourceSelectedKeys.length > 0;
      var cls = classNames(className, prefixCls);
      var localeDefault = {
        titles: [''],
        notFoundContent: '无匹配结果',
        sourceNotFoundContent: '暂无相关信息',
        targetNotFonudContent: '请从左侧选择添加',
        searchPlaceholder: '请输入关键字',
        itemUnit: '',
        itemsUnit: ''
      };

      var titles = _this.getTitles(localeDefault);

      return React.createElement("div", {
        className: cls,
        style: style
      }, React.createElement(List, {
        mode: mode,
        direction: 'left',
        prefixCls: prefixCls + "-list",
        titleText: titles[0],
        dataSource: leftDataSource,
        filter: leftFilter,
        filterOption: filterOption,
        style: listStyle,
        checkedKeys: sourceSelectedKeys,
        handleFilter: _this.handleLeftFilter,
        handleClear: _this.handleLeftClear,
        handleSelect: _this.handleLeftSelect,
        handleSelectAll: _this.handleLeftSelectAll,
        render: render,
        showSearch: showSearch,
        searchPlaceholder: searchPlaceholder || localeDefault.searchPlaceholder,
        notFoundContent: notFoundContent || localeDefault.sourceNotFoundContent,
        itemUnit: localeDefault.itemUnit,
        itemsUnit: localeDefault.itemsUnit,
        body: body,
        footer: footer,
        lazy: lazy,
        onScroll: _this.handleLeftScroll
      }), React.createElement(Operation, {
        mode: mode,
        arrowText: operation,
        className: prefixCls + "-operation",
        rightActive: rightActive,
        rightArrowText: operations[0],
        moveToRight: _this.moveToRight,
        leftActive: leftActive,
        leftArrowText: operations[1],
        moveToLeft: _this.moveToLeft,
        style: operationStyle
      }), React.createElement(List, {
        mode: mode,
        direction: "right",
        prefixCls: prefixCls + "-list",
        titleText: titles[1],
        dataSource: rightDataSource,
        filter: rightFilter,
        filterOption: filterOption,
        style: listStyle,
        checkedKeys: targetSelectedKeys,
        handleFilter: _this.handleRightFilter,
        handleClear: _this.handleRightClear,
        handleSelect: _this.handleRightSelect,
        handleSelectAll: _this.handleRightSelectAll,
        handleClose: _this.handleClose,
        render: render,
        showSearch: showSearch,
        searchPlaceholder: searchPlaceholder || localeDefault.searchPlaceholder,
        notFoundContent: notFoundContent || localeDefault.targetNotFonudContent,
        itemUnit: localeDefault.itemUnit,
        itemsUnit: localeDefault.itemsUnit,
        body: body,
        footer: footer,
        lazy: lazy,
        onScroll: _this.handleRightScroll
      }));
    };

    var _a = props.selectedKeys,
        selectedKeys = _a === void 0 ? [] : _a,
        _b = props.targetKeys,
        targetKeys = _b === void 0 ? [] : _b;
    _this.state = {
      leftFilter: '',
      rightFilter: '',
      sourceSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.indexOf(key) === -1;
      }),
      targetSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.indexOf(key) > -1;
      }),
      prevProps: props
    };
    return _this;
  }

  Transfer.getDerivedStateFromProps = function (nextProps, prevState) {
    var _a = prevState.prevProps,
        prevProps = _a === void 0 ? {} : _a;
    var newState = {
      prevProps: nextProps
    };
    var sourceSelectedKeys = prevState.sourceSelectedKeys,
        targetSelectedKeys = prevState.targetSelectedKeys;

    if (nextProps.targetKeys !== prevProps.targetKeys || nextProps.dataSource !== prevProps.dataSource) {
      if (!nextProps.selectedKeys || !nextProps.selectedKeys.length) {
        // clear key no longer existed
        // clear checkedKeys according to targetKeys
        var dataSource = nextProps.dataSource,
            _b = nextProps.targetKeys,
            targetKeys_1 = _b === void 0 ? [] : _b;
        var newSourceSelectedKeys_1 = [];
        var newTargetSelectedKeys_1 = [];
        dataSource.forEach(function (_a) {
          var key = _a.key;

          if (sourceSelectedKeys.includes(key) && !targetKeys_1.includes(key)) {
            newSourceSelectedKeys_1.push(key);
          }

          if (targetSelectedKeys.includes(key) && targetKeys_1.includes(key)) {
            newTargetSelectedKeys_1.push(key);
          }
        });
        newState.sourceSelectedKeys = newSourceSelectedKeys_1;
        newState.targetSelectedKeys = newTargetSelectedKeys_1;
      }
    }

    if (nextProps.selectedKeys && nextProps.selectedKeys.length > 0) {
      var targetKeys_2 = nextProps.targetKeys || [];
      newState.sourceSelectedKeys = nextProps.selectedKeys.filter(function (key) {
        return !targetKeys_2.includes(key);
      });
      newState.targetSelectedKeys = nextProps.selectedKeys.filter(function (key) {
        return targetKeys_2.includes(key);
      });
    }

    return newState;
  };

  Transfer.prototype.componentDidUpdate = function (prevProps) {
    if (prevProps.targetKeys !== this.props.targetKeys || prevProps.dataSource !== this.props.dataSource) {
      // clear cached separated dataSource
      this.separatedDataSource = null;
      this.forceUpdate();
    }
  };

  Transfer.prototype.separateDataSource = function (props) {
    if (this.separatedDataSource) {
      return this.separatedDataSource;
    }

    var dataSource = props.dataSource,
        rowKey = props.rowKey,
        _a = props.targetKeys,
        targetKeys = _a === void 0 ? [] : _a;
    var leftDataSource = [];
    var rightDataSource = new Array(targetKeys.length);
    dataSource.forEach(function (record) {
      if (rowKey) {
        record.key = rowKey(record);
      } // rightDataSource should be ordered by targetKeys
      // leftDataSource should be ordered by dataSource


      var indexOfKey = targetKeys.indexOf(record.key);

      if (indexOfKey !== -1) {
        rightDataSource[indexOfKey] = record;
      } else {
        leftDataSource.push(record);
      }
    });
    this.separatedDataSource = {
      leftDataSource: leftDataSource,
      rightDataSource: rightDataSource
    };
    return this.separatedDataSource;
  };

  Transfer.prototype.handleSelectChange = function (direction, holder) {
    var _a = this.state,
        sourceSelectedKeys = _a.sourceSelectedKeys,
        targetSelectedKeys = _a.targetSelectedKeys;
    var onSelectChange = this.props.onSelectChange;

    if (!onSelectChange) {
      return;
    }

    if (direction === 'left') {
      onSelectChange(holder, targetSelectedKeys);
    } else {
      onSelectChange(sourceSelectedKeys, holder);
    }
  };

  Transfer.prototype.render = function () {
    return React.createElement("div", null, this.renderTransfer());
  }; // For high-level customized Transfer @dqaria


  Transfer.List = List;
  Transfer.Operation = Operation;
  Transfer.Search = Search;
  Transfer.defaultProps = {
    mode: 'multiple',
    dataSource: [],
    render: noop,
    showSearch: false,
    operation: '>'
  };
  Transfer.propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    render: PropTypes.func,
    targetKeys: PropTypes.array,
    onChange: PropTypes.func,
    height: PropTypes.number,
    style: PropTypes.object,
    listStyle: PropTypes.object,
    operationStyle: PropTypes.object,
    className: PropTypes.string,
    titles: PropTypes.array,
    operations: PropTypes.array,
    operation: PropTypes.string,
    showSearch: PropTypes.bool,
    filterOption: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    notFoundContent: PropTypes.node,
    body: PropTypes.func,
    footer: PropTypes.func,
    rowKey: PropTypes.func,
    lazy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  };
  return Transfer;
}(React.Component);

polyfill(Transfer);
export default Transfer;