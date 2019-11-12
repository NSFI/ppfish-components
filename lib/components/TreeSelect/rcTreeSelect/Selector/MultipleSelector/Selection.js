"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Selection =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Selection, _React$Component);

  function Selection() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onRemove", function (event) {
      event.stopPropagation();
      event.preventDefault();
      var _this$props = _this.props,
          onRemove = _this$props.onRemove,
          value = _this$props.value;
      onRemove(event, value);
    });

    return _this;
  }

  var _proto = Selection.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        maxTagTextLength = _this$props2.maxTagTextLength,
        label = _this$props2.label,
        value = _this$props2.value,
        tagWidth = _this$props2.tagWidth,
        disableCloseTag = _this$props2.disableCloseTag,
        iconPrefix = _this$props2.iconPrefix;
    var content = label || value;

    if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
      content = content.slice(0, maxTagTextLength) + "...";
    }

    var tagStyle = Object.assign({
      width: tagWidth + 'px'
    }, _util.UNSELECTABLE_STYLE);
    var removeCls = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-selection__choice__remove"] = true, _classNames[iconPrefix + "-close-modal-line"] = true, _classNames[prefixCls + "-selection__choice__remove__disabled"] = disableCloseTag, _classNames));
    return _react.default.createElement("li", _extends({
      style: tagStyle
    }, _util.UNSELECTABLE_ATTRIBUTE, {
      role: "menuitem",
      className: prefixCls + "-selection__choice",
      title: (0, _util.toTitle)(label)
    }), _react.default.createElement("span", {
      className: removeCls,
      onMouseDown: disableCloseTag ? null : this.onRemove
    }), _react.default.createElement("span", {
      className: prefixCls + "-selection__choice__content"
    }, content));
  };

  return Selection;
}(_react.default.Component);

_defineProperty(Selection, "propTypes", {
  disableCloseTag: _propTypes.default.bool,
  editable: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  iconPrefix: _propTypes.default.string,
  maxTagTextLength: _propTypes.default.number,
  tagWidth: _propTypes.default.number,
  onRemove: _propTypes.default.func,
  label: _propTypes.default.node,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
});

var _default = Selection;
exports.default = _default;