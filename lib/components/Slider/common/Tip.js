"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../../Tooltip/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tip, _React$Component);

  function Tip() {
    _classCallCheck(this, Tip);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tip).apply(this, arguments));
  }

  _createClass(Tip, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          visible = _this$props.visible,
          position = _this$props.position,
          vertical = _this$props.vertical,
          title = _this$props.title,
          prefixCls = _this$props.prefixCls;
      var tipStyle = {
        position: 'absolute'
      };

      if (position) {
        if (vertical) {
          tipStyle.top = position;
          tipStyle.height = 10;
          tipStyle.width = 5;
        } else {
          tipStyle.left = position - 5;
          tipStyle.width = 10;
          tipStyle.height = 5;
        }
      }

      return _react["default"].createElement(_index["default"], {
        title: title,
        visible: visible
      }, _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-all-handle"),
        style: tipStyle
      }));
    }
  }]);

  return Tip;
}(_react["default"].Component);

exports["default"] = Tip;

_defineProperty(Tip, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  position: _propTypes["default"].number,
  vertical: _propTypes["default"].bool,
  visible: _propTypes["default"].bool,
  title: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string])
});