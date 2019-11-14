"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Ribbon =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Ribbon, _React$Component);

  function Ribbon(props) {
    var _this;

    _classCallCheck(this, Ribbon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ribbon).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
      var x = e.clientX;
      var y = e.clientY;

      _this.pointMoveTo({
        x: x,
        y: y
      });

      window.addEventListener('mousemove', _this.onDrag);
      window.addEventListener('mouseup', _this.onDragEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "onDrag", function (e) {
      var x = e.clientX;
      var y = e.clientY;

      _this.pointMoveTo({
        x: x,
        y: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnd", function (e) {
      var x = e.clientX;
      var y = e.clientY;

      _this.pointMoveTo({
        x: x,
        y: y
      });

      _this.removeListeners();
    });

    _defineProperty(_assertThisInitialized(_this), "getPrefixCls", function () {
      return "".concat(_this.props.rootPrefixCls, "-ribbon");
    });

    _defineProperty(_assertThisInitialized(_this), "pointMoveTo", function (coords) {
      var rect = _reactDom["default"].findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();

      var width = rect.width;
      var left = coords.x - rect.left;
      left = Math.max(0, left);
      left = Math.min(left, width);
      var huePercent = left / width;
      var hue = huePercent * 360;
      var color = _this.props.color;
      color.hue = hue;

      _this.props.onChange(color);
    });

    _defineProperty(_assertThisInitialized(_this), "removeListeners", function () {
      window.removeEventListener('mousemove', _this.onDrag);
      window.removeEventListener('mouseup', _this.onDragEnd);
    });

    return _this;
  }

  _createClass(Ribbon, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.getPrefixCls();
      var hue = this.props.color.hue;
      var per = hue / 360 * 100;
      return _react["default"].createElement("div", {
        className: prefixCls
      }, _react["default"].createElement("span", {
        ref: "point",
        style: {
          left: "".concat(per, "%")
        }
      }), _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-handler"),
        onMouseDown: this.onMouseDown
      }));
    }
  }]);

  return Ribbon;
}(_react["default"].Component);

exports["default"] = Ribbon;

_defineProperty(Ribbon, "propTypes", {
  color: _propTypes["default"].object,
  onChange: _propTypes["default"].func,
  rootPrefixCls: _propTypes["default"].string
});