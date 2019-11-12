"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _Radio = _interopRequireDefault(require("./Radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

// case sensitive
function getCheckedValue(children) {
  var value = null;
  var matched = false;
  React.Children.forEach(children, function (radio) {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? {
    value: value
  } : undefined;
}

var RadioGroup =
/** @class */
function (_super) {
  __extends(RadioGroup, _super);

  function RadioGroup(props) {
    var _this = _super.call(this, props) || this;

    _this.onRadioChange = function (ev) {
      var lastValue = _this.state.value;
      var value = ev.target.value;

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      var onChange = _this.props.onChange;

      if (onChange && value !== lastValue) {
        onChange(ev);
      }
    };

    var value;

    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      var checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }

    _this.state = {
      value: value
    };
    return _this;
  }

  RadioGroup.getDerivedStateFromProps = function (nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      };
    } else {
      var checkedValue = getCheckedValue(nextProps.children);

      if (checkedValue) {
        return {
          value: checkedValue.value
        };
      }
    }

    return null;
  };

  RadioGroup.prototype.getChildContext = function () {
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: this.props.disabled,
        name: this.props.name
      }
    };
  };

  RadioGroup.prototype.shouldComponentUpdate = function (nextProps, nextState) {
    return !(0, _shallowequal.default)(this.props, nextProps) || !(0, _shallowequal.default)(this.state, nextState);
  };

  RadioGroup.prototype.render = function () {
    var _a;

    var _this = this;

    var props = this.props;
    var prefixCls = props.prefixCls,
        _b = props.className,
        className = _b === void 0 ? '' : _b,
        options = props.options,
        buttonStyle = props.buttonStyle;
    var groupPrefixCls = prefixCls + "-group";
    var classString = (0, _classnames.default)(groupPrefixCls, groupPrefixCls + "-" + buttonStyle, (_a = {}, _a[groupPrefixCls + "-" + props.size] = props.size, _a), className);
    var children = props.children; // 如果存在 options, 优先使用

    if (options && options.length > 0) {
      children = options.map(function (option, index) {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return React.createElement(_Radio.default, {
            key: index,
            prefixCls: prefixCls,
            disabled: _this.props.disabled,
            value: option,
            onChange: _this.onRadioChange,
            checked: _this.state.value === option
          }, option);
        } else {
          // 此处类型自动推导为 { label: string value: string }
          return React.createElement(_Radio.default, {
            key: index,
            prefixCls: prefixCls,
            disabled: option.disabled || _this.props.disabled,
            value: option.value,
            onChange: _this.onRadioChange,
            checked: _this.state.value === option.value
          }, option.label);
        }
      });
    }

    return React.createElement("div", {
      className: classString,
      style: props.style,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
      id: props.id
    }, children);
  };

  RadioGroup.defaultProps = {
    disabled: false,
    prefixCls: 'fishd-radio',
    buttonStyle: 'outline'
  };
  RadioGroup.childContextTypes = {
    radioGroup: PropTypes.any
  };
  return RadioGroup;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(RadioGroup);
var _default = RadioGroup;
exports.default = _default;