"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Checkbox = _interopRequireDefault(require("./src/Checkbox"));

var _utils = require("../../utils");

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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var Checkbox =
/** @class */
function (_super) {
  __extends(Checkbox, _super);

  function Checkbox() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.saveCheckbox = function (node) {
      _this.rcCheckbox = node;
    };

    return _this;
  }

  Checkbox.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
    return !(0, _utils.shallowEqual)(this.props, nextProps) || !(0, _utils.shallowEqual)(this.state, nextState) || !(0, _utils.shallowEqual)(this.context.checkboxGroup, nextContext.checkboxGroup);
  };

  Checkbox.prototype.focus = function () {
    this.rcCheckbox.focus();
  };

  Checkbox.prototype.blur = function () {
    this.rcCheckbox.blur();
  };

  Checkbox.prototype.render = function () {
    var _a, _b;

    var _c = this,
        props = _c.props,
        context = _c.context;

    var prefixCls = props.prefixCls,
        className = props.className,
        children = props.children,
        indeterminate = props.indeterminate,
        style = props.style,
        onMouseEnter = props.onMouseEnter,
        onMouseLeave = props.onMouseLeave,
        restProps = __rest(props, ["prefixCls", "className", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave"]);

    var checkboxGroup = context.checkboxGroup;

    var checkboxProps = __assign({}, restProps);

    if (checkboxGroup) {
      checkboxProps.onChange = function () {
        return checkboxGroup.toggleOption({
          label: children,
          value: props.value
        });
      };

      checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
    }

    var classString = (0, _classnames["default"])(className, (_a = {}, _a[prefixCls + "-wrapper"] = true, _a));
    var checkboxClass = (0, _classnames["default"])((_b = {}, _b[prefixCls + "-indeterminate"] = indeterminate, _b));
    return React.createElement("label", {
      className: classString,
      style: style,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, React.createElement(_Checkbox["default"], __assign({}, checkboxProps, {
      prefixCls: prefixCls,
      className: checkboxClass,
      ref: this.saveCheckbox
    })), children !== undefined ? React.createElement("span", null, children) : null);
  };

  Checkbox.defaultProps = {
    prefixCls: 'fishd-checkbox',
    indeterminate: false
  };
  Checkbox.contextTypes = {
    checkboxGroup: PropTypes.any
  };
  return Checkbox;
}(React.Component);

var _default = Checkbox;
exports["default"] = _default;