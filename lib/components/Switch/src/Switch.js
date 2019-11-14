"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var Switch =
/*#__PURE__*/
function (_Component) {
  _inherits(Switch, _Component);

  _createClass(Switch, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var newState = {};
      var checked = nextProps.checked;

      if ('checked' in nextProps) {
        newState.checked = !!checked;
      }

      return newState;
    }
  }]);

  function Switch(props) {
    var _this;

    _classCallCheck(this, Switch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Switch).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      var onClick = _this.props.onClick;
      var checked = !_this.state.checked;

      _this.setChecked(checked);

      onClick(checked);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      if (e.keyCode === 37) {
        // Left
        _this.setChecked(false);
      } else if (e.keyCode === 39) {
        // Right
        _this.setChecked(true);
      } else if (e.keyCode === 32 || e.keyCode === 13) {
        // Space, Enter
        _this.toggle();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function (e) {
      if (_this.node) {
        _this.node.blur();
      }

      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveNode", function (node) {
      _this.node = node;
    });

    var _checked = false;

    if ('checked' in props) {
      _checked = !!props.checked;
    } else {
      _checked = !!props.defaultChecked;
    }

    _this.state = {
      checked: _checked
    };
    return _this;
  }

  _createClass(Switch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          autoFocus = _this$props.autoFocus,
          disabled = _this$props.disabled;

      if (autoFocus && !disabled) {
        this.focus();
      }
    }
  }, {
    key: "setChecked",
    value: function setChecked(checked) {
      if (this.props.disabled) {
        return;
      }

      if (!('checked' in this.props)) {
        this.setState({
          checked: checked
        });
      }

      this.props.onChange(checked);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.node.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.node.blur();
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props2 = this.props,
          className = _this$props2.className,
          prefixCls = _this$props2.prefixCls,
          disabled = _this$props2.disabled,
          loadingIcon = _this$props2.loadingIcon,
          checkedChildren = _this$props2.checkedChildren,
          tabIndex = _this$props2.tabIndex,
          unCheckedChildren = _this$props2.unCheckedChildren,
          restProps = _objectWithoutProperties(_this$props2, ["className", "prefixCls", "disabled", "loadingIcon", "checkedChildren", "tabIndex", "unCheckedChildren"]);

      var checked = this.state.checked;
      var switchTabIndex = disabled ? -1 : tabIndex || 0;
      var switchClassName = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, "".concat(prefixCls, "-checked"), checked), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
      return _react["default"].createElement("span", _extends({}, restProps, {
        className: switchClassName,
        tabIndex: switchTabIndex,
        ref: this.saveNode,
        onKeyDown: this.handleKeyDown,
        onClick: this.toggle,
        onMouseUp: this.handleMouseUp
      }), loadingIcon, _react["default"].createElement("span", {
        className: "".concat(prefixCls, "-inner")
      }, checked ? checkedChildren : unCheckedChildren));
    }
  }]);

  return Switch;
}(_react.Component);

Switch.propTypes = {
  className: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  checkedChildren: _propTypes["default"].any,
  unCheckedChildren: _propTypes["default"].any,
  onChange: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  tabIndex: _propTypes["default"].number,
  checked: _propTypes["default"].bool,
  defaultChecked: _propTypes["default"].bool,
  autoFocus: _propTypes["default"].bool,
  loadingIcon: _propTypes["default"].node
};
Switch.defaultProps = {
  prefixCls: 'rc-switch',
  checkedChildren: null,
  unCheckedChildren: null,
  className: '',
  defaultChecked: false,
  onChange: noop,
  onClick: noop
};
(0, _reactLifecyclesCompat.polyfill)(Switch);
var _default = Switch;
exports["default"] = _default;