"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OptGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(OptGroup, _React$Component);

  function OptGroup(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = OptGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        label = _this$props.label,
        prefixCls = _this$props.prefixCls,
        _isShow = _this$props._isShow;
    return _isShow && _react.default.createElement("div", {
      className: (0, _classnames.default)("" + prefixCls)
    }, _react.default.createElement("p", {
      className: prefixCls + "-label"
    }, label), children);
  };

  return OptGroup;
}(_react.default.Component);

exports.default = OptGroup;

_defineProperty(OptGroup, "isSelectOptGroup", true);

_defineProperty(OptGroup, "propTypes", {
  _isShow: _propTypes.default.bool,
  // INTERNAL USE ONLY
  children: _propTypes.default.node.isRequired,
  label: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]).isRequired,
  prefixCls: _propTypes.default.string
});

_defineProperty(OptGroup, "defaultProps", {
  _isShow: true,
  prefixCls: 'fishd-select-dropdown-option-group'
});