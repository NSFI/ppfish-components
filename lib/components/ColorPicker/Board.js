"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _color = _interopRequireDefault(require("./helpers/color"));

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

var WIDTH = 200;
var HEIGHT = 150;

var Board =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    var _this;

    _classCallCheck(this, Board);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Board).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onBoardMouseDown", function (e) {
      var buttons = e.buttons; // only work on left click
      // @see https://developer.mozilla.org/en-US/docs/Web/Events/mousedown

      if (buttons !== 1) return;

      _this.removeListeners();

      var x = e.clientX;
      var y = e.clientY;

      _this.pointMoveTo({
        x: x,
        y: y
      });

      window.addEventListener('mousemove', _this.onBoardDrag);
      window.addEventListener('mouseup', _this.onBoardDragEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "onBoardTouchStart", function (e) {
      if (e.touches.length !== 1) {
        return;
      }

      _this.removeTouchListeners();

      var x = e.targetTouches[0].clientX;
      var y = e.targetTouches[0].clientY;

      _this.pointMoveTo({
        x: x,
        y: y
      });

      window.addEventListener('touchmove', _this.onBoardTouchMove);
      window.addEventListener('touchend', _this.onBoardTouchEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "onBoardTouchMove", function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }

      var x = e.targetTouches[0].clientX;
      var y = e.targetTouches[0].clientY;

      _this.pointMoveTo({
        x: x,
        y: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBoardTouchEnd", function () {
      _this.removeTouchListeners();
    });

    _defineProperty(_assertThisInitialized(_this), "onBoardDrag", function (e) {
      var x = e.clientX;
      var y = e.clientY;

      _this.pointMoveTo({
        x: x,
        y: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBoardDragEnd", function (e) {
      var x = e.clientX;
      var y = e.clientY;

      _this.pointMoveTo({
        x: x,
        y: y
      });

      _this.removeListeners();
    });

    _defineProperty(_assertThisInitialized(_this), "getPrefixCls", function () {
      return "".concat(_this.props.rootPrefixCls, "-board");
    });

    _defineProperty(_assertThisInitialized(_this), "removeTouchListeners", function () {
      window.removeEventListener('touchmove', _this.onBoardTouchMove);
      window.removeEventListener('touchend', _this.onBoardTouchEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "removeListeners", function () {
      window.removeEventListener('mousemove', _this.onBoardDrag);
      window.removeEventListener('mouseup', _this.onBoardDragEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "pointMoveTo", function (pos) {
      var rect = _reactDom["default"].findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();

      var left = pos.x - rect.left;
      var top = pos.y - rect.top;
      var rWidth = rect.width || WIDTH;
      var rHeight = rect.height || HEIGHT;
      left = Math.max(0, left);
      left = Math.min(left, rWidth);
      top = Math.max(0, top);
      top = Math.min(top, rHeight);
      var color = _this.props.color;
      color.saturation = left / rWidth;
      color.brightness = 1 - top / rHeight;

      _this.props.onChange(color);
    });

    return _this;
  }

  _createClass(Board, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeListeners();
      this.removeTouchListeners();
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.getPrefixCls();
      var color = this.props.color;
      var hueHsv = {
        h: color.hue,
        s: 1,
        v: 1
      };
      var hueColor = new _color["default"](hueHsv).toHexString();
      var xRel = color.saturation * 100;
      var yRel = (1 - color.brightness) * 100;
      return _react["default"].createElement("div", {
        className: prefixCls
      }, _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-hsv"),
        style: {
          backgroundColor: hueColor
        }
      }, _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-value")
      }), _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-saturation")
      })), _react["default"].createElement("span", {
        style: {
          left: "".concat(xRel, "%"),
          top: "".concat(yRel, "%")
        }
      }), _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-handler"),
        onMouseDown: this.onBoardMouseDown,
        onTouchStart: this.onBoardTouchStart
      }));
    }
  }]);

  return Board;
}(_react["default"].Component);

exports["default"] = Board;

_defineProperty(Board, "propTypes", {
  color: _propTypes["default"].object,
  onChange: _propTypes["default"].func,
  rootPrefixCls: _propTypes["default"].string
});