"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _utils = require("../../utils");

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

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
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

var CheckboxGroup =
/** @class */
function (_super) {
  __extends(CheckboxGroup, _super);

  function CheckboxGroup(props) {
    var _this = _super.call(this, props) || this;

    _this.toggleOption = function (option) {
      var optionIndex = _this.state.value.indexOf(option.value);

      var value = __spreadArrays(_this.state.value);

      if (optionIndex === -1) {
        value.push(option.value);
      } else {
        value.splice(optionIndex, 1);
      }

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value);
      }
    };

    _this.state = {
      value: props.value || props.defaultValue || []
    };
    return _this;
  }

  CheckboxGroup.getDerivedStateFromProps = function (nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || []
      };
    }

    return null;
  };

  CheckboxGroup.prototype.getChildContext = function () {
    return {
      checkboxGroup: {
        toggleOption: this.toggleOption,
        value: this.state.value,
        disabled: this.props.disabled
      }
    };
  };

  CheckboxGroup.prototype.shouldComponentUpdate = function (nextProps, nextState) {
    return !(0, _utils.shallowEqual)(this.props, nextProps) || !(0, _utils.shallowEqual)(this.state, nextState);
  };

  CheckboxGroup.prototype.getOptions = function () {
    var options = this.props.options; // https://github.com/Microsoft/TypeScript/issues/7960

    return options.map(function (option) {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option
        };
      }

      return option;
    });
  };

  CheckboxGroup.prototype.render = function () {
    var _this = this;

    var _a = this,
        props = _a.props,
        state = _a.state;

    var prefixCls = props.prefixCls,
        className = props.className,
        style = props.style,
        options = props.options;
    var groupPrefixCls = prefixCls + "-group";
    var children = props.children;

    if (options && options.length > 0) {
      children = this.getOptions().map(function (option) {
        return React.createElement(_Checkbox.default, {
          prefixCls: prefixCls,
          key: option.value.toString(),
          disabled: 'disabled' in option ? option.disabled : props.disabled,
          value: option.value,
          checked: state.value.indexOf(option.value) !== -1,
          onChange: function onChange() {
            return _this.toggleOption(option);
          },
          className: groupPrefixCls + "-item"
        }, option.label);
      });
    }

    var classString = (0, _classnames.default)(groupPrefixCls, className);
    return React.createElement("div", {
      className: classString,
      style: style
    }, children);
  };

  CheckboxGroup.defaultProps = {
    options: [],
    prefixCls: 'fishd-checkbox'
  };
  CheckboxGroup.propTypes = {
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func
  };
  CheckboxGroup.childContextTypes = {
    checkboxGroup: PropTypes.any
  };
  return CheckboxGroup;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(CheckboxGroup);
var _default = CheckboxGroup;
exports.default = _default;