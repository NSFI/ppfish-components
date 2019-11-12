"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../../Tooltip/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tip =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Tip, _React$Component);

  function Tip() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tip.prototype;

  _proto.render = function render() {
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

    return _react.default.createElement(_index.default, {
      title: title,
      visible: visible
    }, _react.default.createElement("div", {
      className: prefixCls + "-all-handle",
      style: tipStyle
    }));
  };

  return Tip;
}(_react.default.Component);

exports.default = Tip;

_defineProperty(Tip, "propTypes", {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  position: _propTypes.default.number,
  vertical: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  title: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string])
});