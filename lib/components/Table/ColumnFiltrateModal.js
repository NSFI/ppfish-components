"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _Modal = _interopRequireDefault(require("../Modal"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __extends = void 0 && (void 0).__extends || function () {
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

var CheckboxGroup = _Checkbox["default"].Group;

var getColumnKey = function getColumnKey(column) {
  if ('colSpan' in column) {
    return column.filtrateTitle || column.title;
  } else {
    return column.key || column.dataIndex || column.filtrateTitle || column.title;
  }
};

var flatten = function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
};

var getCheckedOptions = function getCheckedOptions(columns, hideColumns) {
  return columns // 去除表头合并不显示的列
  .filter(function (column) {
    return column.colSpan !== 0;
  }) // 去除初始化就被隐藏的列
  .filter(function (column) {
    return hideColumns.findIndex(function (key) {
      return key === getColumnKey(column);
    }) === -1;
  }) // 只留uniqueId
  .map(function (column) {
    return getColumnKey(column);
  });
};

var getColSpanOption = function getColSpanOption(columns) {
  var colSpanOption = [];
  columns.forEach(function (column, index) {
    if ('colSpan' in column && column.colSpan !== 0) {
      colSpanOption.push({
        key: column.filtrateTitle || column.title,
        value: columns.slice(index, index + column.colSpan).map(function (column) {
          return column.key || column.dataIndex;
        })
      });
    }
  });
  return colSpanOption;
};

var ColumnFiltrateModal =
/** @class */
function (_super) {
  __extends(ColumnFiltrateModal, _super);

  function ColumnFiltrateModal(props) {
    var _this = _super.call(this, props) || this;

    _this.showModal = function () {
      _this.setState({
        visible: true
      });
    };

    _this.handleOk = function () {
      _this.setState({
        visible: false,
        checkedOptionConfirm: _this.state.checkedOption
      }, function () {
        // 被隐藏的列表key
        _this.props.onChange(flatten(_this.getOptions().filter(function (column) {
          return _this.state.checkedOptionConfirm.indexOf(column.value) === -1;
        }).map(function (column) {
          var indexOfColSpan = _this.state.colSpanOption.findIndex(function (option) {
            return option.key === column.value;
          });

          if (indexOfColSpan !== -1) {
            return _this.state.colSpanOption[indexOfColSpan].value;
          } else {
            return column.value;
          }
        })));
      });
    };

    _this.handleCancel = function () {
      _this.setState({
        visible: false,
        checkedOption: _this.state.checkedOptionConfirm
      });
    };

    _this.onChange = function (checkedOption) {
      _this.setState({
        checkedOption: checkedOption
      });
    };

    _this.getOptions = function () {
      var _a = _this.props,
          columns = _a.columns,
          defaultColumns = _a.defaultColumns;
      return columns // 去除表头合并的不显示的
      .filter(function (column) {
        return column.colSpan !== 0;
      }) // 获取他们的label、value、disabled
      .map(function (column) {
        var uniqKey = getColumnKey(column); //fixed /分组不能控制显示隐藏

        var disabled = !!column.fixed || !!column.children;
        var title = column.filtrateTitle || column.title;
        return {
          label: _react["default"].createElement(_Tooltip["default"], {
            title: title
          }, title),
          value: uniqKey,
          disabled: disabled
        };
      }) // 去除默认展示数据项
      .filter(function (column) {
        return defaultColumns.findIndex(function (key) {
          return key === column.value;
        }) === -1;
      });
    }; //默认一直显示的选项


    _this.getDefaultOption = function () {
      var _a = _this.props,
          columns = _a.columns,
          _b = _a.defaultColumns,
          defaultColumns = _b === void 0 ? [] : _b;
      return columns.filter(function (column) {
        return defaultColumns.findIndex(function (key) {
          return key === getColumnKey(column);
        }) !== -1;
      }).map(function (column) {
        return {
          label: _react["default"].createElement(_Tooltip["default"], {
            title: column.filtrateTitle || column.title
          }, column.filtrateTitle || column.title),
          value: getColumnKey(column),
          disabled: true
        };
      });
    };

    var _a = _this.props,
        columns = _a.columns,
        hideColumns = _a.hideColumns;
    var option = getCheckedOptions(columns, hideColumns);
    _this.state = {
      visible: false,
      checkedOption: option,
      checkedOptionConfirm: option,
      prevProps: props,
      colSpanOption: getColSpanOption(columns)
    };
    return _this;
  }

  ColumnFiltrateModal.getDerivedStateFromProps = function (nextProps, prevState) {
    var _a = prevState.prevProps,
        prevProps = _a === void 0 ? {} : _a;
    var newState = {
      prevProps: nextProps
    }; //监听column个数变化，重新初始化checkedOption

    if ('columns' in nextProps && nextProps.columns.length !== prevProps.columns.length) {
      var columns = nextProps.columns,
          hideColumns = nextProps.hideColumns;
      var option = getCheckedOptions(columns, hideColumns);
      newState.checkedOption = option;
      newState.checkedOptionConfirm = option;
      newState.colSpanOption = getColSpanOption(columns);
    }

    return newState;
  };

  ColumnFiltrateModal.prototype.render = function () {
    var prefixCls = this.props.prefixCls;
    var _a = this.state,
        visible = _a.visible,
        checkedOption = _a.checkedOption;
    var options = this.getOptions();
    var defaultOption = this.getDefaultOption();
    return _react["default"].createElement("div", null, _react["default"].createElement(_Icon["default"], {
      className: prefixCls + "-filtrate-icon",
      type: "Settingx",
      onClick: this.showModal
    }), _react["default"].createElement(_Modal["default"], {
      title: "\u9009\u62E9\u9700\u8981\u5C55\u793A\u7684\u6570\u636E\u9879",
      wrapClassName: prefixCls + "-filtrate-modal",
      visible: visible,
      width: 680,
      onOk: this.handleOk,
      onCancel: this.handleCancel
    }, _react["default"].createElement("div", {
      className: prefixCls + "-filtrate-modal-enable-list"
    }, _react["default"].createElement(CheckboxGroup, {
      value: checkedOption,
      options: options,
      onChange: this.onChange
    })), defaultOption && !!defaultOption.length && _react["default"].createElement("div", {
      className: prefixCls + "-filtrate-modal-disabled-list"
    }, _react["default"].createElement("p", {
      className: "title"
    }, "\u9ED8\u8BA4\u5C55\u793A\u6570\u636E\u9879"), _react["default"].createElement(CheckboxGroup, {
      options: defaultOption,
      defaultValue: defaultOption.map(function (option) {
        return option.value;
      })
    }))));
  };

  ColumnFiltrateModal.defaultProps = {
    defaultColumns: [],
    hideColumns: []
  };
  return ColumnFiltrateModal;
}(_react["default"].Component);

(0, _reactLifecyclesCompat.polyfill)(ColumnFiltrateModal);
var _default = ColumnFiltrateModal;
exports["default"] = _default;