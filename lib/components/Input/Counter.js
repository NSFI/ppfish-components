"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _omit = _interopRequireDefault(require("omit.js"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _TextArea = _interopRequireDefault(require("./TextArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function countValue(value) {
  return value.length;
}

var Counter =
/** @class */
function (_super) {
  __extends(Counter, _super);

  function Counter(props) {
    var _this = _super.call(this, props) || this;

    _this.saveTextarea = function (node) {
      _this.textarea = node;
    };

    _this.handleClick = function () {
      _this.focus();
    };

    _this.handleTextareaChange = function (e) {
      var onChange = _this.props.onChange;
      var textareaValue = _this.textarea && _this.textarea.textAreaRef.value;

      _this.setState({
        value: textareaValue
      });

      if (onChange) {
        onChange(e);
      }
    };

    _this.getCount = function () {
      var count = _this.props.count;
      var value = _this.state.value;

      if (!value) {
        return 0;
      } // 自定义计数方法


      if (count) {
        return count(String(value));
      }

      return countValue(String(value));
    };

    var value = '';

    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }

    _this.state = {
      value: value,
      prevProps: props
    };
    return _this;
  }

  Counter.getDerivedStateFromProps = function (nextProps, prevState) {
    var _a = prevState.prevProps,
        prevProps = _a === void 0 ? {} : _a;
    var newState = {
      prevProps: nextProps
    };

    if (prevProps.value !== nextProps.value) {
      newState.value = nextProps.value;
    }

    return newState;
  };

  Counter.prototype.focus = function () {
    this.textarea.focus();
  };

  Counter.prototype.blur = function () {
    this.textarea.blur();
  };

  Counter.prototype.getTextAreaClassName = function () {
    var _a;

    var _b = this.props,
        inputPrefixCls = _b.inputPrefixCls,
        className = _b.className,
        disabled = _b.disabled;
    return (0, _classnames["default"])(inputPrefixCls, className, (_a = {}, _a[inputPrefixCls + "-disabled"] = disabled, _a));
  };

  Counter.prototype.render = function () {
    var _a;

    var _b = this.props,
        inputPrefixCls = _b.inputPrefixCls,
        className = _b.className,
        prefixCls = _b.prefixCls,
        disabled = _b.disabled,
        limit = _b.limit;
    var inputClassName = (0, _classnames["default"])(className, (_a = {}, _a["" + prefixCls] = true, _a[inputPrefixCls + "-disabled"] = disabled, _a));
    var textareaClassName = (0, _classnames["default"])(inputPrefixCls, className);
    var otherProps = (0, _omit["default"])(this.props, ['inputPrefixCls', 'prefixCls', 'limit', 'count', 'value', 'onChange']);
    var total = this.getCount();
    return React.createElement("span", {
      className: inputClassName,
      onClick: this.handleClick
    }, React.createElement(_TextArea["default"], __assign({}, otherProps, {
      className: textareaClassName,
      maxLength: limit,
      onChange: this.handleTextareaChange,
      value: this.state.value,
      ref: this.saveTextarea
    })), React.createElement("span", {
      className: prefixCls + "-footer"
    }, React.createElement("span", {
      className: prefixCls + "-indicator"
    }, total, "/", limit)));
  };

  Counter.defaultProps = {
    inputPrefixCls: 'fishd-input',
    prefixCls: 'fishd-input-counter'
  };
  return Counter;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(Counter);
var _default = Counter;
exports["default"] = _default;