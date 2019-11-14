function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input/index.js';
import Icon from '../Icon/index.js';
import Trigger from 'rc-trigger';
import { HAVE_TRIGGER_TYPES, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import { Errors, require_condition } from './libs/utils';
import KEYCODE from '../../utils/KeyCode';
import { isValidValue, isValidValueArr, equalDateArr } from '../../utils/date';
import placements from './placements';
import isEqual from 'lodash/isEqual';

var haveTriggerType = function haveTriggerType(type) {
  return HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};

var isInputValid = function isInputValid(text, date) {
  if (text.trim() === '' || !isValidValue(date)) return false;
  return true;
};

var $type = Symbol('type');

var DateRangeBasePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateRangeBasePicker, _React$Component);

  _createClass(DateRangeBasePicker, null, [{
    key: "dateToStr",
    value: function dateToStr(date, type, format, separator) {
      if (!date || !isValidValue(date)) return '';
      var tdate = date;
      var formatter = TYPE_VALUE_RESOLVER_MAP['date'].formatter;
      var result = formatter(tdate, format || DEFAULT_FORMATS[type], separator);
      return result;
    }
  }, {
    key: "propToState",
    value: function propToState(_ref, state) {
      var value = _ref.value,
          format = _ref.format,
          separator = _ref.separator;
      var type = state[$type];
      return {
        value: value && isValidValueArr(value) ? value : null,
        text: value && isValidValueArr(value) ? [DateRangeBasePicker.dateToStr(value[0], type, format, separator), DateRangeBasePicker.dateToStr(value[1], type, format, separator)] : "",
        confirmValue: value && isValidValueArr(value) ? value : null
      };
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // 只 value 受控
      if ('value' in nextProps && !isEqual(prevState.prevPropValue, nextProps.value)) {
        var state = DateRangeBasePicker.propToState(nextProps, prevState);
        state.prevPropValue = nextProps.value;
        return state;
      }

      return null;
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        className: PropTypes.string,
        startPlaceholder: PropTypes.string,
        endPlaceholder: PropTypes.string,
        separator: PropTypes.string,
        format: PropTypes.string,
        placement: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
        prefixCls: PropTypes.string,
        getPopupContainer: PropTypes.func,
        showTrigger: PropTypes.bool,
        allowClear: PropTypes.bool,
        disabled: PropTypes.bool,
        esc: PropTypes.bool,
        value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onVisibleChange: PropTypes.func,
        style: PropTypes.object
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

    _classCallCheck(this, DateRangeBasePicker);

    require_condition(typeof _type === 'string');
    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRangeBasePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onPicked", function (value) {
      var isKeepPannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isConfirmValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

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
      var parser = TYPE_VALUE_RESOLVER_MAP['date'].parser;
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

      if (_this.props.esc && keyCode === KEYCODE.ESC) {
        _this.setState({
          pickerVisible: false
        }, function () {
          _this.props.onVisibleChange(false);
        });

        _this.refs.inputRoot.blur();

        evt.stopPropagation();
      } // enter


      if (keyCode === KEYCODE.ENTER) {
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

      if (_this.isDateValid(value) && !equalDateArr(value, confirmValue)) {
        _this.onPicked(value, false, true);
      } else {
        _this.onCancelPicked();
      }
    });

    _this.type = _type;
    _this.inputClick = false;
    _this.state = {
      pickerVisible: false,
      value: props.value && isValidValueArr(props.value) ? props.value : null,
      text: props.value && isValidValueArr(props.value) ? [_this.dateToStr(props.value[0]), _this.dateToStr(props.value[1])] : '',
      // 增加一个confirmValue记录每次确定的值，当点击"取消"或者空白处时，恢复这个值
      confirmValue: props.value && isValidValueArr(props.value) ? props.value : null
    };
    return _this;
  }

  _createClass(DateRangeBasePicker, [{
    key: "isDateValid",
    value: function isDateValid(date) {
      return date === null || isValidValueArr(date);
    }
  }, {
    key: "pickerPanel",
    value: function pickerPanel(state, props) {
      throw new Errors.MethodImplementationRequiredError(props);
    }
  }, {
    key: "getFormatSeparator",
    value: function getFormatSeparator() {
      return undefined;
    }
  }, {
    key: "getFormat",
    value: function getFormat() {
      return this.props.format || DEFAULT_FORMATS[this.type];
    }
  }, {
    key: "togglePickerVisible",
    value: function togglePickerVisible() {
      var _this2 = this;

      this.setState({
        pickerVisible: !this.state.pickerVisible
      }, function () {
        _this2.props.onVisibleChange(!_this2.state.pickerVisible);
      });
    } // 聚焦

  }, {
    key: "render",
    value: function render() {
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
          return React.createElement(Icon, {
            className: classNames("".concat(prefixCls, "-date-picker-icon"), 'prefix-iconfont'),
            type: triggerClass()
          });
        } else {
          return null;
        }
      }; // 后缀图标


      var suffixIcon = function suffixIcon() {
        if (text && allowClear) {
          return React.createElement(Icon, {
            className: classNames("".concat(prefixCls, "-date-picker-icon"), 'suffix-iconfont'),
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
        return React.createElement("span", {
          className: classNames("".concat(prefixCls, "-date-editor"), className, {
            'is-have-trigger': calcIsShowTrigger(),
            'is-active': pickerVisible,
            'is-filled': !!value,
            'is-disable': disabled
          }),
          style: _objectSpread({}, style),
          onClick: function onClick() {
            return _this3.inputClick = true;
          }
        }, React.createElement("div", {
          className: classNames("".concat(prefixCls, "-date-editor--").concat(_this3.type), {
            'is-active': pickerVisible,
            'disabled': disabled
          })
        }, React.createElement(Input, {
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
        }), React.createElement("span", {
          className: classNames("range-separator", {
            'disabled': disabled
          })
        }, separator), React.createElement(Input, {
          className: "".concat(prefixCls, "-date-range-picker-second-input"),
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

      return React.createElement(Trigger, {
        action: disabled ? [] : ['click'],
        builtinPlacements: placements,
        ref: function ref(node) {
          return _this3.trigger = node;
        },
        getPopupContainer: getPopupContainer,
        onPopupVisibleChange: this.onVisibleChange,
        popup: getPickerPanel(),
        popupPlacement: placement,
        popupVisible: pickerVisible,
        prefixCls: "".concat(prefixCls, "-date-time-picker-popup"),
        destroyPopupOnHide: true
      }, getInputPanel());
    }
  }]);

  return DateRangeBasePicker;
}(React.Component);

export default DateRangeBasePicker;