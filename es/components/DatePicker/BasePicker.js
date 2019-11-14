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
import { isValidValue, equalDate } from '../../utils/date';
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

var BasePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BasePicker, _React$Component);

  _createClass(BasePicker, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ("value" in nextProps && !isEqual(nextProps.value, prevState.prevPropValue)) {
        var validDate = isValidValue(nextProps.value) ? nextProps.value : null;
        var text = isValidValue(nextProps.value) ? BasePicker.dateToStr(nextProps.value, prevState[$type], nextProps.format, nextProps.separator // 这个值当前使用的是undefined
        ) : "";
        var state = {
          value: validDate,
          text: text,
          // 增加一个confirmValue记录每次确定的值，当点击"取消"或者输入不合法时，恢复这个值
          confirmValue: validDate
        };
        state.prevPropValue = nextProps.value;
        return state;
      }

      return null;
    }
  }, {
    key: "dateToStr",
    value: function dateToStr(date, type, format, separator) {
      if (!date || !isValidValue(date)) return '';
      var tdate = date;
      var formatter = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).formatter;
      var result = formatter(tdate, format || DEFAULT_FORMATS[type], separator);
      return result;
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        format: PropTypes.string,
        placement: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
        prefixCls: PropTypes.string,
        getPopupContainer: PropTypes.func,
        showTrigger: PropTypes.bool,
        allowClear: PropTypes.bool,
        disabled: PropTypes.bool,
        esc: PropTypes.bool,
        value: PropTypes.instanceOf(Date),
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
        placeholder: '',
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

  function BasePicker(props, _type, state) {
    var _this$state2;

    var _this;

    _classCallCheck(this, BasePicker);

    require_condition(typeof _type === 'string');
    _this = _possibleConstructorReturn(this, _getPrototypeOf(BasePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onPicked", function (value) {
      var isKeepPannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isConfirmValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      _this.setState({
        pickerVisible: isKeepPannel,
        value: value,
        text: _this.dateToStr(value)
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
      var confirmValue = _this.state.confirmValue;

      _this.setState({
        pickerVisible: false,
        value: confirmValue ? confirmValue : null,
        text: confirmValue ? _this.dateToStr(confirmValue) : ''
      }, function () {
        _this.props.onVisibleChange(false);
      });
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

      if (_this.isDateValid(value) && !equalDate(value, confirmValue)) {
        _this.onPicked(value, false, true);
      } else {
        _this.onCancelPicked();
      }
    });

    _this.type = _type;
    _this.inputClick = false;
    _this.state = (_this$state2 = {}, _defineProperty(_this$state2, $type, _type), _defineProperty(_this$state2, "pickerVisible", false), _defineProperty(_this$state2, "value", null), _defineProperty(_this$state2, "text", ""), _defineProperty(_this$state2, "confirmValue", null), _this$state2);
    return _this;
  }

  _createClass(BasePicker, [{
    key: "isDateValid",
    value: function isDateValid(date) {
      return date === null || isValidValue(date);
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
    key: "dateToStr",
    value: function dateToStr(date) {
      return BasePicker.dateToStr(date, this.type, this.props.format, this.getFormatSeparator());
    } // (string) => Date | null

  }, {
    key: "parseDate",
    value: function parseDate(dateStr) {
      if (!dateStr) return null;
      var type = this.type;
      var parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).parser;
      return parser(dateStr, this.getFormat(), this.getFormatSeparator());
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
          className = _this$props2.className,
          placeholder = _this$props2.placeholder,
          placement = _this$props2.placement,
          prefixCls = _this$props2.prefixCls,
          getPopupContainer = _this$props2.getPopupContainer,
          showTrigger = _this$props2.showTrigger,
          allowClear = _this$props2.allowClear,
          disabled = _this$props2.disabled,
          style = _this$props2.style;
      var _this$state3 = this.state,
          pickerVisible = _this$state3.pickerVisible,
          value = _this$state3.value,
          text = _this$state3.text;

      var triggerClass = function triggerClass() {
        return _this3.type.includes('date') || _this3.type.includes('week') ? 'date-line' : 'time-line';
      };

      var calcIsShowTrigger = function calcIsShowTrigger() {
        if (showTrigger != null) {
          return !!showTrigger;
        } else {
          return haveTriggerType(_this3.type);
        }
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
          placeholder: placeholder,
          onFocus: _this3.handleFocus,
          onBlur: _this3.handleBlur,
          onKeyDown: _this3.handleKeydown,
          onChange: function onChange(e) {
            var inputValue = e.target.value;

            var ndate = _this3.parseDate(inputValue);

            if (!isInputValid(inputValue, ndate)) {
              _this3.setState({
                text: inputValue,
                pickerVisible: true
              });
            } else {
              //only set value on a valid date input
              _this3.setState({
                text: inputValue,
                value: ndate,
                pickerVisible: true
              });
            }
          },
          ref: "inputRoot",
          value: text,
          prefix: prefixIcon(),
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

  return BasePicker;
}(React.Component);

export default BasePicker;