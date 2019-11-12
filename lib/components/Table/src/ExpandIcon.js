"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpandIcon =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ExpandIcon, _React$Component);

  function ExpandIcon() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ExpandIcon.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !(0, _utils.shallowEqual)(nextProps, this.props);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        expandable = _this$props.expandable,
        prefixCls = _this$props.prefixCls,
        onExpand = _this$props.onExpand,
        needIndentSpaced = _this$props.needIndentSpaced,
        expanded = _this$props.expanded,
        record = _this$props.record;

    if (expandable) {
      var expandClassName = expanded ? 'expanded' : 'collapsed';
      return _react.default.createElement("span", {
        className: prefixCls + "-expand-icon " + prefixCls + "-" + expandClassName,
        onClick: function onClick(e) {
          return onExpand(record, e);
        }
      });
    } else if (needIndentSpaced) {
      return _react.default.createElement("span", {
        className: prefixCls + "-expand-icon " + prefixCls + "-spaced"
      });
    }

    return null;
  };

  return ExpandIcon;
}(_react.default.Component);

exports.default = ExpandIcon;

_defineProperty(ExpandIcon, "propTypes", {
  record: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  expandable: _propTypes.default.bool,
  expanded: _propTypes.default.bool,
  needIndentSpaced: _propTypes.default.bool,
  onExpand: _propTypes.default.func
});