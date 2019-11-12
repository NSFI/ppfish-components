"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../Input/index.js"));

var _index2 = _interopRequireDefault(require("../Icon/index.js"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _constants = require("./constants");

var _utils = require("./libs/utils");

var _KeyCode = _interopRequireDefault(require("../../utils/KeyCode"));

var _date = require("../../utils/date");

var _placements = _interopRequireDefault(require("./placements"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var haveTriggerType = function haveTriggerType(type) {
  return _constants.HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};

var isInputValid = function isInputValid(text, date) {
  if (text.trim() === '' || !(0, _date.isValidValue)(date)) return false;
  return true;
};

var $type = Symbol('type');

var DateRangeBasePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DateRangeBasePicker, _React$Component);

  DateRangeBasePicker.dateToStr = function dateToStr(date, type, format, separator) {
    if (!date || !(0, _date.isValidValue)(date)) return '';
    var tdate = date;
    var formatter = _constants.TYPE_VALUE_RESOLVER_MAP['date'].formatter;
    var result = formatter(tdate, format || _constants.DEFAULT_FORMATS[type], separator);
    return result;
  };

  DateRangeBasePicker.propToState = function propToState(_ref, state) {
    var value = _ref.value,
        format = _ref.format,
        separator = _ref.separator;
    var type = state[$type];
    return {
      value: value && (0, _date.isValidValueArr)(value) ? value : null,
      text: value && (0, _date.isValidValueArr)(value) ? [DateRangeBasePicker.dateToStr(value[0], type, format, separator), DateRangeBasePicker.dateToStr(value[1], type, format, separator)] : "",
      confirmValue: value && (0, _date.isValidValueArr)(value) ? value : null
    };
  };

  DateRangeBasePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    // 只 value 受控
    if ('value' in nextProps && !(0, _isEqual.default)(prevState.prevPropValue, nextProps.value)) {
      var state = DateRangeBasePicker.propToState(nextProps, prevState);
      state.prevPropValue = nextProps.value;
      return state;
    }

    return null;
  };

  _createClass(DateRangeBasePicker, null, [{
    key: "propTypes",
    get: function get() {
      return {
        className: _propTypes.default.string,
        startPlaceholder: _propTypes.default.string,
        endPlaceholder: _propTypes.default.string,
        separator: _propTypes.default.string,
        format: _propTypes.default.string,
        placement: _propTypes.default.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
        prefixCls: _propTypes.default.string,
        getPopupContainer: _propTypes.default.func,
        showTrigger: _propTypes.default.bool,
        allowClear: _propTypes.default.bool,
        disabled: _propTypes.default.bool,
        esc: _propTypes.default.bool,
        value: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
        onFocus: _propTypes.default.func,
        onBlur: _propTypes.default.func,
        onChange: _propTypes.default.func,
        onVisibleChange: _propTypes.default.func,
        style: _propTypes.default.object
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        separator: '至',
        placement: 'bottomLeft',
        prefixCls: 'fishd',
        showTrigger: true,
        allowClear: true,
        disabled: false,
        esc: true,
        onFocus: function onFocus() {},
        onBlur: function onBlur() {},
        onChange: function onChange() {},
        onVisibleChange: function onVisibleChange() {}
      };
    }
  }]);

  function DateRangeBasePicker(props, _type, state) {
    var _this;

    (0, _utils.require_condition)(typeof _type === 'string');
    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onPicked", function (value, isKeepPannel, isConfirmValue) {
      if (isKeepPannel === void 0) {
        isKeepPannel = false;
      }

      if (isConfirmValue === void 0) {
        isConfirmValue = true;
      }

      // 当为日期范围选择面板时，把结束时间默认设置为23:59:59:999
      if (_this.type == 'daterange' && value && value.length === 2) {
        value[1] = new Date(value[1].setHours(23, 59, 59, 999));
      }

      _this.setState({
        pickerVisible: isKeepPannel,
        value: value,
        text: value && value.length === 2 ? [_this.dateToStr(value[0]), _this.dateToStr(value[1])] : ''
      }, function () {
        _this.props.onVisibleChange(isKeepPannel);
      });

      if (isConfirmValue) {
        _this.setState({
          confirmValue: value
        });

        _this.props.onChange(value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelPicked", function () {
      _this.setState({
        pickerVisible: false,
        value: _this.state.confirmValue && _this.state.confirmValue.length === 2 ? _this.state.confirmValue : null,
        text: _this.state.confirmValue && _this.state.confirmValue.length === 2 ? [_this.dateToStr(new Date(_this.state.confirmValue[0])), _this.dateToStr(new Date(_this.state.confirmValue[1]))] : ''
      }, function () {
        _this.props.onVisibleChange(false);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dateToStr", function (date) {
      return DateRangeBasePicker.dateToStr(date, _this.type, _this.getFormat(), _this.getFormatSeparator());
    });

    _defineProperty(_assertThisInitialized(_this), "parseDate", function (dateStr) {
      if (!dateStr) return null;
      var type = _this.type;
      var parser = _constants.TYPE_VALUE_RESOLVER_MAP['date'].parser;
      return parser(dateStr, _this.getFormat(), _this.getFormatSeparator());
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (e) {
      _this.props.onFocus(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (e) {
      _this.props.onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeydown", function (evt) {
      var keyCode = evt.keyCode; // esc

      if (_this.props.esc && keyCode === _KeyCode.default.ESC) {
        _this.setState({
          pickerVisible: false
        }, function () {
          _this.props.onVisibleChange(false);
        });

        _this.refs.inputRoot.blur();

        evt.stopPropagation();
      } // enter


      if (keyCode === _KeyCode.default.ENTER) {
        _this.setState({
          pickerVisible: false
        }, function () {
          _this.saveValidInputValue();
        });

        _this.refs.inputRoot.blur();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickCloseIcon", function (e) {
      e && e.stopPropagation();
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          allowClear = _this$props.allowClear;
      var text = _this.state.text;
      if (disabled || !allowClear) return;

      if (!text) {
        _this.togglePickerVisible();
      } else {
        _this.setState({
          text: '',
          value: null,
          pickerVisible: false,
          confirmValue: null
        }, function () {
          _this.props.onVisibleChange(false);

          _this.props.onChange(null);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      if (_this.inputClick && !visible) {
        _this.inputClick = false;
        return;
      }

      _this.inputClick = false;

      _this.setState({
        pickerVisible: visible
      }, function () {
        if (!visible) {
          _this.saveValidInputValue();
        } else {
          _this.props.onVisibleChange(visible);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveValidInputValue", function () {
      var _this$state = _this.state,
          value = _this$state.value,
          confirmValue = _this$state.confirmValue;

      if (_this.isDateValid(value) && !(0, _date.equalDateArr)(value, confirmValue)) {
        _this.onPicked(value, false, true);
      } else {
        _this.onCancelPicked();
      }
    });

    _this.type = _type;
    _this.inputClick = false;
    _this.state = {
      pickerVisible: false,
      value: props.value && (0, _date.isValidValueArr)(props.value) ? props.value : null,
      text: props.value && (0, _date.isValidValueArr)(props.value) ? [_this.dateToStr(props.value[0]), _this.dateToStr(props.value[1])] : '',
      // 增加一个confirmValue记录每次确定的值，当点击"取消"或者空白处时，恢复这个值
      confirmValue: props.value && (0, _date.isValidValueArr)(props.value) ? props.value : null
    };
    return _this;
  }

  var _proto = DateRangeBasePicker.prototype;

  _proto.isDateValid = function isDateValid(date) {
    return date === null || (0, _date.isValidValueArr)(date);
  };

  _proto.pickerPanel = function pickerPanel(state, props) {
    throw new _utils.Errors.MethodImplementationRequiredError(props);
  };

  _proto.getFormatSeparator = function getFormatSeparator() {
    return undefined;
  };

  _proto.getFormat = function getFormat() {
    return this.props.format || _constants.DEFAULT_FORMATS[this.type];
  };

  _proto.togglePickerVisible = function togglePickerVisible() {
    var _this2 = this;

    this.setState({
      pickerVisible: !this.state.pickerVisible
    }, function () {
      _this2.props.onVisibleChange(!_this2.state.pickerVisible);
    });
  } // 聚焦
  ;

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        startPlaceholder = _this$props2.startPlaceholder,
        endPlaceholder = _this$props2.endPlaceholder,
        separator = _this$props2.separator,
        showTrigger = _this$props2.showTrigger,
        allowClear = _this$props2.allowClear,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        placement = _this$props2.placement,
        prefixCls = _this$props2.prefixCls,
        getPopupContainer = _this$props2.getPopupContainer,
        style = _this$props2.style;
    var _this$state2 = this.state,
        pickerVisible = _this$state2.pickerVisible,
        value = _this$state2.value,
        text = _this$state2.text;

    var calcIsShowTrigger = function calcIsShowTrigger() {
      if (showTrigger !== null) {
        return !!showTrigger;
      } else {
        return haveTriggerType(_this3.type);
      }
    };

    var triggerClass = function triggerClass() {
      return _this3.type.includes('date') || _this3.type.includes('week') ? 'date-line' : 'time-line';
    }; // 前缀图标


    var prefixIcon = function prefixIcon() {
      if (calcIsShowTrigger()) {
        return _react.default.createElement(_index2.default, {
          className: (0, _classnames.default)(prefixCls + "-date-picker-icon", 'prefix-iconfont'),
          type: triggerClass()
        });
      } else {
        return null;
      }
    }; // 后缀图标


    var suffixIcon = function suffixIcon() {
      if (text && allowClear) {
        return _react.default.createElement(_index2.default, {
          className: (0, _classnames.default)(prefixCls + "-date-picker-icon", 'suffix-iconfont'),
          type: "close-circle-fill",
          onClick: _this3.handleClickCloseIcon
        });
      } else {
        return null;
      }
    }; // 下拉面板


    var getPickerPanel = function getPickerPanel() {
      return _this3.pickerPanel(_this3.state);
    }; // 选择框


    var getInputPanel = function getInputPanel() {
      return _react.default.createElement("span", {
        className: (0, _classnames.default)(prefixCls + "-date-editor", className, {
          'is-have-trigger': calcIsShowTrigger(),
          'is-active': pickerVisible,
          'is-filled': !!value,
          'is-disable': disabled
        }),
        style: Object.assign({}, style),
        onClick: function onClick() {
          return _this3.inputClick = true;
        }
      }, _react.default.createElement("div", {
        className: (0, _classnames.default)(prefixCls + "-date-editor--" + _this3.type, {
          'is-active': pickerVisible,
          'disabled': disabled
        })
      }, _react.default.createElement(_index.default, {
        disabled: disabled,
        type: "text",
        placeholder: startPlaceholder,
        onFocus: _this3.handleFocus,
        onBlur: _this3.handleBlur,
        onKeyDown: _this3.handleKeydown,
        onChange: function onChange(e) {
          var inputValue = e.target.value;

          var ndate = _this3.parseDate(inputValue);

          if (!isInputValid(inputValue, ndate)) {
            _this3.setState({
              text: [inputValue, _this3.state.text[1]],
              pickerVisible: true
            });
          } else {
            //only set value on a valid date input
            _this3.setState({
              text: [inputValue, _this3.state.text[1]],
              value: [ndate, _this3.state.value[1]],
              pickerVisible: true
            });
          }
        },
        ref: "inputRoot",
        value: text && text.length == 2 ? text[0] : '',
        prefix: prefixIcon()
      }), _react.default.createElement("span", {
        className: (0, _classnames.default)("range-separator", {
          'disabled': disabled
        })
      }, separator), _react.default.createElement(_index.default, {
        className: prefixCls + "-date-range-picker-second-input",
        disabled: disabled,
        type: "text",
        placeholder: endPlaceholder,
        onFocus: _this3.handleFocus,
        onBlur: _this3.handleBlur,
        onKeyDown: _this3.handleKeydown,
        onChange: function onChange(e) {
          var inputValue = e.target.value;

          var ndate = _this3.parseDate(inputValue);

          if (!isInputValid(inputValue, ndate)) {
            _this3.setState({
              text: [_this3.state.text[0], inputValue],
              pickerVisible: true
            });
          } else {
            //only set value on a valid date input
            _this3.setState({
              text: [_this3.state.text[0], inputValue],
              value: [_this3.state.value[0], ndate],
              pickerVisible: true
            });
          }
        },
        value: text && text.length == 2 ? text[1] : '',
        suffix: suffixIcon()
      })));
    };

    return _react.default.createElement(_rcTrigger.default, {
      action: disabled ? [] : ['click'],
      builtinPlacements: _placements.default,
      ref: function ref(node) {
        return _this3.trigger = node;
      },
      getPopupContainer: getPopupContainer,
      onPopupVisibleChange: this.onVisibleChange,
      popup: getPickerPanel(),
      popupPlacement: placement,
      popupVisible: pickerVisible,
      prefixCls: prefixCls + "-date-time-picker-popup",
      destroyPopupOnHide: true
    }, getInputPanel());
  };

  return DateRangeBasePicker;
}(_react.default.Component);

var _default = DateRangeBasePicker;
exports.default = _default;