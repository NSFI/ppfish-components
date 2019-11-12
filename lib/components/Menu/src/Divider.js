"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Divider =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Divider, _React$Component);

  function Divider() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Divider.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$className = _this$props.className,
        className = _this$props$className === void 0 ? '' : _this$props$className,
        rootPrefixCls = _this$props.rootPrefixCls;
    return _react.default.createElement("li", {
      className: className + " " + rootPrefixCls + "-item-divider"
    });
  };

  return Divider;
}(_react.default.Component);

exports.default = Divider;

_defineProperty(Divider, "propTypes", {
  className: _propTypes.default.string,
  rootPrefixCls: _propTypes.default.string
});

_defineProperty(Divider, "defaultProps", {
  // To fix keyboard UX.
  disabled: true
});