"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function rgbaColor(r, g, b, a) {
  return "rgba(" + [r, g, b, a / 100].join(',') + ")";
}

var Alpha =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Alpha, _React$Component);

  function Alpha(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

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

    _defineProperty(_assertThisInitialized(_this), "getBackground", function () {
      var _this$props$color = _this.props.color,
          red = _this$props$color.red,
          green = _this$props$color.green,
          blue = _this$props$color.blue;
      var opacityGradient = "linear-gradient(to right, " + rgbaColor(red, green, blue, 0) + " , " + rgbaColor(red, green, blue, 100) + ")"; // eslint-disable-line max-len

      return opacityGradient;
    });

    _defineProperty(_assertThisInitialized(_this), "getPrefixCls", function () {
      return _this.props.rootPrefixCls + "-alpha";
    });

    _defineProperty(_assertThisInitialized(_this), "pointMoveTo", function (coords) {
      var rect = (0, _reactDom.findDOMNode)(_assertThisInitialized(_this)).getBoundingClientRect();
      var width = rect.width;
      var left = coords.x - rect.left;
      left = Math.max(0, left);
      left = Math.min(left, width);
      var alpha = Math.round(left / width * 100);

      _this.props.onChange(alpha);
    });

    _defineProperty(_assertThisInitialized(_this), "removeListeners", function () {
      window.removeEventListener('mousemove', _this.onDrag);
      window.removeEventListener('mouseup', _this.onDragEnd);
    });

    return _this;
  }

  var _proto = Alpha.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeListeners();
  };

  _proto.render = function render() {
    var prefixCls = this.getPrefixCls();
    return _react.default.createElement("div", {
      className: prefixCls
    }, _react.default.createElement("div", {
      ref: "bg",
      className: prefixCls + "-bg",
      style: {
        background: this.getBackground()
      }
    }), _react.default.createElement("span", {
      style: {
        left: this.props.alpha + "%"
      }
    }), _react.default.createElement("div", {
      className: prefixCls + "-handler",
      onMouseDown: this.onMouseDown
    }));
  };

  return Alpha;
}(_react.default.Component);

exports.default = Alpha;

_defineProperty(Alpha, "propTypes", {
  alpha: _propTypes.default.number,
  color: _propTypes.default.object,
  onChange: _propTypes.default.func,
  rootPrefixCls: _propTypes.default.string
});