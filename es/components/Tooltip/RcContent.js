"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RcContent =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(RcContent, _React$Component);

  function RcContent() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RcContent.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    var trigger = this.props.trigger;

    if (trigger) {
      trigger.forcePopupAlign();
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        overlay = _this$props.overlay,
        prefixCls = _this$props.prefixCls,
        id = _this$props.id;
    return _react.default.createElement("div", {
      className: prefixCls + "-inner",
      id: id
    }, typeof overlay === 'function' ? overlay() : overlay);
  };

  return RcContent;
}(_react.default.Component);

exports.default = RcContent;

_defineProperty(RcContent, "propTypes", {
  prefixCls: _propTypes.default.string,
  overlay: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]).isRequired,
  id: _propTypes.default.string,
  trigger: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.node])
});