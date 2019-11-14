"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _isNegativeZero = _interopRequireDefault(require("is-negative-zero"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _utils = require("../../../utils");

var _InputHandler = _interopRequireDefault(require("./InputHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function noop() {}

function preventDefault(e) {
  e.preventDefault();
}

function defaultParser(input) {
  /* eslint-disable-next-line */
  return input.replace(/[^\w\.-]+/g, '');
}

function getValidValue(value, min, max) {
  var val = parseFloat(value, 10); // https://github.com/ant-design/ant-design/issues/7358

  if (isNaN(val)) {
    return value;
  }

  if (val < min) {
    val = min;
  }

  if (val > max) {
    val = max;
  }

  return val;
}

function toPrecisionAsStep(props, num) {
  if (isNotCompleteNumber(num) || num === '') {
    return num;
  }

  var precision = Math.abs(getMaxPrecision(props, num));

  if (precision === 0) {
    return num.toString();
  }

  if (!isNaN(precision)) {
    return Number(num).toFixed(precision);
  }

  return num.toString();
} // '1.' '1x' 'xx' '' => are not complete numbers


function isNotCompleteNumber(num) {
  return isNaN(num) || num === '' || num === null || num && num.toString().indexOf('.') === num.toString().length - 1;
} // step={1.0} value={1.51}
// press +
// then value should be 2.51, rather than 2.5
// if this.props.precision is undefined
// https://github.com/react-component/input-number/issues/39
// 获取最大数值精度


function getMaxPrecision(props, currentValue) {
  var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if ('precision' in props) {
    return props.precision;
  }

  var step = props.step;
  var ratioPrecision = getPrecision(props, ratio);
  var stepPrecision = getPrecision(props, step);
  var currentValuePrecision = getPrecision(props, currentValue);

  if (!currentValue) {
    return ratioPrecision + stepPrecision;
  }

  return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
} //获取数值精度


function getPrecision(props, value) {
  if ('precision' in props) {
    return props.precision;
  }

  var valueString = value.toString();

  if (valueString.indexOf('e-') >= 0) {
    return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
  }

  var precision = 0;

  if (valueString.indexOf('.') >= 0) {
    precision = valueString.length - valueString.indexOf('.') - 1;
  }

  return precision;
}

function getPrecisionFactor(props, currentValue) {
  var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var precision = getMaxPrecision(props, currentValue, ratio);
  return Math.pow(10, precision);
}

function getRatio(e) {
  var ratio = 1;

  if (e.metaKey || e.ctrlKey) {
    ratio = 0.1;
  } else if (e.shiftKey) {
    ratio = 10;
  }

  return ratio;
}

function getValueFromEvent(e) {
  // optimize for chinese input experience
  // https://github.com/ant-design/ant-design/issues/8196
  return e.target.value.trim().replace(/。/g, '.');
}
/**
 * When click and hold on a button - the speed of auto changin the value.
 */


var SPEED = 200;
/**
 * When click and hold on a button - the delay before auto changin the value.
 */

var DELAY = 600;
/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var RcInputNumber =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RcInputNumber, _React$Component);

  _createClass(RcInputNumber, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var newState = {
        prevProps: nextProps
      };
      var _prevState$prevProps = prevState.prevProps,
          prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;

      if ('value' in nextProps && prevProps.value !== nextProps.value) {
        var value = prevState.focused ? nextProps.value : getValidValue(nextProps.value, nextProps.min, nextProps.max);
        var inputValue = prevState.inputting ? value : toPrecisionAsStep(nextProps, value);
        newState.value = value;
        newState.inputValue = inputValue;
      }

      return newState;
    }
  }]);

  function RcInputNumber(props) {
    var _this;

    _classCallCheck(this, RcInputNumber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RcInputNumber).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var onKeyDown = _this.props.onKeyDown;

      if (e.keyCode === _utils.KeyCode.UP) {
        var ratio = getRatio(e);

        _this.up(e, ratio);

        _this.stop();
      } else if (e.keyCode === _utils.KeyCode.DOWN) {
        var _ratio = getRatio(e);

        _this.down(e, _ratio);

        _this.stop();
      } // Trigger user key down


      _this.recordCursorPosition();

      _this.lastKeyCode = e.keyCode;

      if (onKeyDown) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        onKeyDown.apply(void 0, [e].concat(args));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (e) {
      var onKeyUp = _this.props.onKeyUp;

      _this.stop();

      _this.recordCursorPosition(); // Trigger user key up


      if (onKeyUp) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        onKeyUp.apply(void 0, [e].concat(args));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      if (_this.state.focused) {
        _this.setState({
          inputting: true
        });
      }

      var input = _this.props.parser(getValueFromEvent(e)); // valid number or invalid string


      var newInputValue = _this.toNumberWhenUserInput(input);

      _this.setState({
        inputValue: newInputValue
      });

      _this.props.onChange(newInputValue);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
      var onMouseUp = _this.props.onMouseUp;

      _this.recordCursorPosition();

      if (onMouseUp) {
        onMouseUp.apply(void 0, arguments);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      var _this$props;

      _this.setState({
        focused: true
      });

      (_this$props = _this.props).onFocus.apply(_this$props, arguments);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      _this.setState({
        focused: false,
        inputting: false
      });

      var value = _this.getCurrentValidValue(_this.state.inputValue);

      e.persist(); // fix https://github.com/react-component/input-number/issues/51

      _this.setValue(value, function () {
        var _this$props2;

        (_this$props2 = _this.props).onBlur.apply(_this$props2, [e].concat(args));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getInputDisplayValue", function () {
      var _this$state = _this.state,
          focused = _this$state.focused,
          inputValue = _this$state.inputValue,
          value = _this$state.value;
      var inputDisplayValue;

      if (focused) {
        inputDisplayValue = inputValue;
      } else {
        inputDisplayValue = toPrecisionAsStep(_this.props, value);
      }

      if (inputDisplayValue === undefined || inputDisplayValue === null) {
        inputDisplayValue = '';
      }

      return inputDisplayValue;
    });

    _defineProperty(_assertThisInitialized(_this), "recordCursorPosition", function () {
      // Record position
      try {
        _this.cursorStart = _this.input.selectionStart;
        _this.cursorEnd = _this.input.selectionEnd;
        _this.currentValue = _this.input.value;
        _this.cursorBefore = _this.input.value.substring(0, _this.cursorStart);
        _this.cursorAfter = _this.input.value.substring(_this.cursorEnd);
      } catch (e) {// Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    });

    _defineProperty(_assertThisInitialized(_this), "restoreByAfter", function (str) {
      if (str === undefined) return false;
      var fullStr = _this.input.value;
      var index = fullStr.lastIndexOf(str);
      if (index === -1) return false;

      if (index + str.length === fullStr.length) {
        _this.fixCaret(index, index);

        return true;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "partRestoreByAfter", function (str) {
      if (str === undefined) return false; // For loop from full str to the str with last char to map. e.g. 123
      // -> 123
      // -> 23
      // -> 3

      return Array.prototype.some.call(str, function (_, start) {
        var partStr = str.substring(start);
        return _this.restoreByAfter(partStr);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      if (_this.autoStepTimer) {
        clearTimeout(_this.autoStepTimer);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "down", function (e, ratio, recursive) {
      _this.pressingUpOrDown = true;

      _this.step('down', e, ratio, recursive);
    });

    _defineProperty(_assertThisInitialized(_this), "up", function (e, ratio, recursive) {
      _this.pressingUpOrDown = true;

      _this.step('up', e, ratio, recursive);
    });

    _defineProperty(_assertThisInitialized(_this), "saveUp", function (node) {
      _this.upHandler = node;
    });

    _defineProperty(_assertThisInitialized(_this), "saveDown", function (node) {
      _this.downHandler = node;
    });

    _defineProperty(_assertThisInitialized(_this), "saveInput", function (node) {
      _this.input = node;
    });

    var _value;

    if ('value' in props) {
      _value = props.value;
    } else {
      _value = props.defaultValue;
    }

    _value = _this.toNumber(_value);
    _this.state = {
      inputValue: toPrecisionAsStep(props, _value),
      value: _value,
      focused: props.autoFocus,
      inputting: false,
      prevProps: props
    };
    return _this;
  }

  _createClass(RcInputNumber, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // Restore cursor
      try {
        // Firefox set the input cursor after it get focused.
        // This caused that if an input didn't init with the selection,
        // set will cause cursor not correct when first focus.
        // Safari will focus input if set selection. We need skip this.
        if (this.cursorStart !== undefined && this.state.focused) {
          // In most cases, the string after cursor is stable.
          // We can move the cursor before it
          if ( // If not match full str, try to match part of str
          !this.partRestoreByAfter(this.cursorAfter)) {
            // If not match any of then, let's just keep the position
            // TODO: Logic should not reach here, need check if happens
            var pos = this.cursorStart + 1; // If not have last string, just position to the end

            if (!this.cursorAfter) {
              pos = this.input.value.length;
            } else if (this.lastKeyCode === _utils.KeyCode.BACKSPACE) {
              pos = this.cursorStart - 1;
            } else if (this.lastKeyCode === _utils.KeyCode.DELETE) {
              pos = this.cursorStart;
            }

            this.fixCaret(pos, pos);
          } else if (this.currentValue === this.input.value) {
            // Handle some special key code
            switch (this.lastKeyCode) {
              case _utils.KeyCode.BACKSPACE:
                this.fixCaret(this.cursorStart - 1, this.cursorStart - 1);
                break;

              case _utils.KeyCode.DELETE:
                this.fixCaret(this.cursorStart + 1, this.cursorStart + 1);
                break;

              default: // Do nothing

            }
          }
        }
      } catch (e) {} // Do nothing
      // Reset last key


      this.lastKeyCode = null; // pressingUpOrDown is true means that someone just click up or down button

      if (!this.pressingUpOrDown) {
        return;
      }

      if (this.props.focusOnUpDown && this.state.focused) {
        if (document.activeElement !== this.input) {
          this.focus();
        }
      }

      this.pressingUpOrDown = false;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: "getCurrentValidValue",
    value: function getCurrentValidValue(value) {
      var val = value;

      if (val === '') {
        val = '';
      } else if (!isNotCompleteNumber(val)) {
        val = getValidValue(val, this.props.min, this.props.max);
      } else {
        val = this.state.value;
      }

      return this.toNumber(val);
    }
  }, {
    key: "setValue",
    value: function setValue(v, callback) {
      // trigger onChange
      var newValue = isNotCompleteNumber(parseFloat(v, 10)) ? undefined : parseFloat(v, 10);
      var changed = newValue !== this.state.value || "".concat(newValue) !== "".concat(this.state.inputValue); // https://github.com/ant-design/ant-design/issues/7363

      if (!('value' in this.props)) {
        this.setState({
          value: newValue,
          inputValue: toPrecisionAsStep(this.props, v)
        }, callback);
      } else {
        // always set input value same as value
        this.setState({
          inputValue: toPrecisionAsStep(this.props, this.state.value)
        }, callback);
      }

      if (changed) {
        this.props.onChange(newValue);
      }
    }
  }, {
    key: "fixCaret",
    value: function fixCaret(start, end) {
      if (start === undefined || end === undefined || !this.input || !this.input.value) {
        return;
      }

      try {
        var currentStart = this.input.selectionStart;
        var currentEnd = this.input.selectionEnd;

        if (start !== currentStart || end !== currentEnd) {
          this.input.setSelectionRange(start, end);
        }
      } catch (e) {// Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.input.focus();
      this.recordCursorPosition();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "formatWrapper",
    value: function formatWrapper(num) {
      // http://2ality.com/2012/03/signedzero.html
      // https://github.com/ant-design/ant-design/issues/9439
      if ((0, _isNegativeZero["default"])(num)) {
        return '-0';
      }

      if (this.props.formatter) {
        return this.props.formatter(num);
      }

      return num;
    }
  }, {
    key: "toNumber",
    value: function toNumber(num) {
      if (isNotCompleteNumber(num)) {
        return num;
      }

      if ('precision' in this.props) {
        return Number(Number(num).toFixed(this.props.precision));
      }

      return Number(num);
    } // '1.0' '1.00'  => may be a inputing number

  }, {
    key: "toNumberWhenUserInput",
    value: function toNumberWhenUserInput(num) {
      // num.length > 16 => prevent input large number will became Infinity
      if ((/\.\d*0$/.test(num) || num.length > 16) && this.state.focused) {
        return num;
      }

      return this.toNumber(num);
    }
  }, {
    key: "upStep",
    value: function upStep(val, rat) {
      var _this$props3 = this.props,
          step = _this$props3.step,
          min = _this$props3.min;
      var precisionFactor = getPrecisionFactor(this.props, val, rat);
      var precision = Math.abs(getMaxPrecision(this.props, val, rat));
      var result;

      if (typeof val === 'number') {
        result = ((precisionFactor * val + precisionFactor * step * rat) / precisionFactor).toFixed(precision);
      } else {
        result = min === -Infinity ? step : min;
      }

      return this.toNumber(result);
    }
  }, {
    key: "downStep",
    value: function downStep(val, rat) {
      var _this$props4 = this.props,
          step = _this$props4.step,
          min = _this$props4.min;
      var precisionFactor = getPrecisionFactor(this.props, val, rat);
      var precision = Math.abs(getMaxPrecision(this.props, val, rat));
      var result;

      if (typeof val === 'number') {
        result = ((precisionFactor * val - precisionFactor * step * rat) / precisionFactor).toFixed(precision);
      } else {
        result = min === -Infinity ? -step : min;
      }

      return this.toNumber(result);
    }
  }, {
    key: "step",
    value: function step(type, e) {
      var _this2 = this;

      var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var recursive = arguments.length > 3 ? arguments[3] : undefined;
      this.stop();

      if (e) {
        e.persist();
        e.preventDefault();
      }

      var props = this.props;

      if (props.disabled) {
        return;
      }

      var value = this.getCurrentValidValue(this.state.inputValue) || 0;

      if (isNotCompleteNumber(value)) {
        return;
      }

      var val = this["".concat(type, "Step")](value, ratio);
      var outOfRange = val > props.max || val < props.min;

      if (val > props.max) {
        val = props.max;
      } else if (val < props.min) {
        val = props.min;
      }

      this.setValue(val);
      this.setState({
        focused: true
      });

      if (outOfRange) {
        return;
      }

      this.autoStepTimer = setTimeout(function () {
        _this2[type](e, ratio, true);
      }, recursive ? SPEED : DELAY);
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var props = _objectSpread({}, this.props);

      var prefixCls = props.prefixCls,
          disabled = props.disabled,
          readOnly = props.readOnly,
          useTouch = props.useTouch;
      var classes = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, props.className, !!props.className), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-focused"), this.state.focused), _classNames));
      var upDisabledClass = '';
      var downDisabledClass = '';
      var value = this.state.value;

      if (value || value === 0) {
        if (!isNaN(value)) {
          var val = Number(value);

          if (val >= props.max) {
            upDisabledClass = "".concat(prefixCls, "-handler-up-disabled");
          }

          if (val <= props.min) {
            downDisabledClass = "".concat(prefixCls, "-handler-down-disabled");
          }
        } else {
          upDisabledClass = "".concat(prefixCls, "-handler-up-disabled");
          downDisabledClass = "".concat(prefixCls, "-handler-down-disabled");
        }
      }

      var dataOrAriaAttributeProps = {};

      for (var key in props) {
        if (props.hasOwnProperty(key) && (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role')) {
          dataOrAriaAttributeProps[key] = props[key];
        }
      }

      var editable = !props.readOnly && !props.disabled; // focus state, show input value
      // unfocus state, show valid value

      var inputDisplayValue = this.getInputDisplayValue();
      var upEvents;
      var downEvents;

      if (useTouch) {
        upEvents = {
          onTouchStart: editable && !upDisabledClass ? this.up : noop,
          onTouchEnd: this.stop
        };
        downEvents = {
          onTouchStart: editable && !downDisabledClass ? this.down : noop,
          onTouchEnd: this.stop
        };
      } else {
        upEvents = {
          onMouseDown: editable && !upDisabledClass ? this.up : noop,
          onMouseUp: this.stop,
          onMouseLeave: this.stop
        };
        downEvents = {
          onMouseDown: editable && !downDisabledClass ? this.down : noop,
          onMouseUp: this.stop,
          onMouseLeave: this.stop
        };
      }

      var inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
      var isUpDisabled = !!upDisabledClass || disabled || readOnly;
      var isDownDisabled = !!downDisabledClass || disabled || readOnly; // ref for test

      return _react["default"].createElement("div", {
        className: classes,
        style: props.style,
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave,
        onMouseOver: props.onMouseOver,
        onMouseOut: props.onMouseOut
      }, _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-handler-wrap")
      }, _react["default"].createElement(_InputHandler["default"], _extends({
        ref: this.saveUp,
        disabled: isUpDisabled,
        prefixCls: prefixCls,
        unselectable: "unselectable"
      }, upEvents, {
        role: "button",
        "aria-label": "Increase Value",
        "aria-disabled": !!isUpDisabled,
        className: "".concat(prefixCls, "-handler ").concat(prefixCls, "-handler-up ").concat(upDisabledClass)
      }), this.props.upHandler || _react["default"].createElement("span", {
        unselectable: "unselectable",
        className: "".concat(prefixCls, "-handler-up-inner"),
        onClick: preventDefault
      })), _react["default"].createElement(_InputHandler["default"], _extends({
        ref: this.saveDown,
        disabled: isDownDisabled,
        prefixCls: prefixCls,
        unselectable: "unselectable"
      }, downEvents, {
        role: "button",
        "aria-label": "Decrease Value",
        "aria-disabled": !!isDownDisabled,
        className: "".concat(prefixCls, "-handler ").concat(prefixCls, "-handler-down ").concat(downDisabledClass)
      }), this.props.downHandler || _react["default"].createElement("span", {
        unselectable: "unselectable",
        className: "".concat(prefixCls, "-handler-down-inner"),
        onClick: preventDefault
      }))), _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-input-wrap"),
        role: "spinbutton",
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": value
      }, _react["default"].createElement("input", _extends({
        required: props.required,
        type: props.type,
        placeholder: props.placeholder,
        onClick: props.onClick,
        onMouseUp: this.onMouseUp,
        className: "".concat(prefixCls, "-input"),
        tabIndex: props.tabIndex,
        autoComplete: "off",
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: editable ? this.onKeyDown : noop,
        onKeyUp: editable ? this.onKeyUp : noop,
        autoFocus: props.autoFocus,
        maxLength: props.maxLength,
        readOnly: props.readOnly,
        disabled: props.disabled,
        max: props.max,
        min: props.min,
        step: props.step,
        name: props.name,
        id: props.id,
        onChange: this.onChange,
        ref: this.saveInput,
        value: inputDisplayValueFormat,
        pattern: props.pattern
      }, dataOrAriaAttributeProps))));
    }
  }]);

  return RcInputNumber;
}(_react["default"].Component);

_defineProperty(RcInputNumber, "propTypes", {
  value: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  focusOnUpDown: _propTypes["default"].bool,
  autoFocus: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  onKeyDown: _propTypes["default"].func,
  onKeyUp: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  tabIndex: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  disabled: _propTypes["default"].bool,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  readOnly: _propTypes["default"].bool,
  max: _propTypes["default"].number,
  min: _propTypes["default"].number,
  step: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  upHandler: _propTypes["default"].node,
  downHandler: _propTypes["default"].node,
  useTouch: _propTypes["default"].bool,
  formatter: _propTypes["default"].func,
  parser: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onMouseOver: _propTypes["default"].func,
  onMouseOut: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func,
  precision: _propTypes["default"].number,
  required: _propTypes["default"].bool,
  pattern: _propTypes["default"].string
});

_defineProperty(RcInputNumber, "defaultProps", {
  focusOnUpDown: true,
  useTouch: false,
  prefixCls: 'rc-input-number',
  min: -MAX_SAFE_INTEGER,
  step: 1,
  style: {},
  onChange: noop,
  onKeyDown: noop,
  onFocus: noop,
  onBlur: noop,
  parser: defaultParser,
  required: false
});

(0, _reactLifecyclesCompat.polyfill)(RcInputNumber);
var _default = RcInputNumber;
exports["default"] = _default;