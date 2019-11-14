"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TabPane =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TabPane, _React$Component);

  function TabPane() {
    _classCallCheck(this, TabPane);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabPane).apply(this, arguments));
  }

  _createClass(TabPane, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          className = _this$props.className,
          destroyInactiveTabPane = _this$props.destroyInactiveTabPane,
          active = _this$props.active,
          forceRender = _this$props.forceRender,
          rootPrefixCls = _this$props.rootPrefixCls,
          style = _this$props.style,
          children = _this$props.children,
          placeholder = _this$props.placeholder,
          restProps = _objectWithoutProperties(_this$props, ["className", "destroyInactiveTabPane", "active", "forceRender", "rootPrefixCls", "style", "children", "placeholder"]);

      this._isActived = this._isActived || active;
      var prefixCls = "".concat(rootPrefixCls, "-tabpane");
      var cls = (0, _classnames2["default"])((_classnames = {}, _defineProperty(_classnames, prefixCls, 1), _defineProperty(_classnames, "".concat(prefixCls, "-inactive"), !active), _defineProperty(_classnames, "".concat(prefixCls, "-active"), active), _defineProperty(_classnames, className, className), _classnames));
      var isRender = destroyInactiveTabPane ? active : this._isActived;
      return _react["default"].createElement("div", _extends({
        style: style,
        role: "tabpanel",
        "aria-hidden": active ? 'false' : 'true',
        className: cls
      }, (0, _utils.getDataAttr)(restProps)), isRender || forceRender ? children : placeholder);
    }
  }]);

  return TabPane;
}(_react["default"].Component);

exports["default"] = TabPane;
TabPane.propTypes = {
  className: _propTypes["default"].string,
  active: _propTypes["default"].bool,
  // style: PropTypes.any,
  style: _propTypes["default"].object,
  destroyInactiveTabPane: _propTypes["default"].bool,
  forceRender: _propTypes["default"].bool,
  placeholder: _propTypes["default"].node,
  rootPrefixCls: _propTypes["default"].string,
  children: _propTypes["default"].node
};
TabPane.defaultProps = {
  placeholder: null
};