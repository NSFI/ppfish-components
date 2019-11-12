"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Ribbon =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Ribbon, _React$Component);

  function Ribbon(props) {
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

    _defineProperty(_assertThisInitialized(_this), "getPrefixCls", function () {
      return _this.props.rootPrefixCls + "-ribbon";
    });

    _defineProperty(_assertThisInitialized(_this), "pointMoveTo", function (coords) {
      var rect = _reactDom.default.findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();

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

  var _proto = Ribbon.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeListeners();
  };

  _proto.render = function render() {
    var prefixCls = this.getPrefixCls();
    var hue = this.props.color.hue;
    var per = hue / 360 * 100;
    return _react.default.createElement("div", {
      className: prefixCls
    }, _react.default.createElement("span", {
      ref: "point",
      style: {
        left: per + "%"
      }
    }), _react.default.createElement("div", {
      className: prefixCls + "-handler",
      onMouseDown: this.onMouseDown
    }));
  };

  return Ribbon;
}(_react.default.Component);

exports.default = Ribbon;

_defineProperty(Ribbon, "propTypes", {
  color: _propTypes.default.object,
  onChange: _propTypes.default.func,
  rootPrefixCls: _propTypes.default.string
});