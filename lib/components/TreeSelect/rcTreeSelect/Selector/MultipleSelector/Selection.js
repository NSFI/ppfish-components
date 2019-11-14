"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Selection =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Selection, _React$Component);

  function Selection() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Selection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Selection)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

  _createClass(Selection, [{
    key: "render",
    value: function render() {
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
        content = "".concat(content.slice(0, maxTagTextLength), "...");
      }

      var tagStyle = Object.assign({
        width: tagWidth + 'px'
      }, _util.UNSELECTABLE_STYLE);
      var removeCls = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-selection__choice__remove"), true), _defineProperty(_classNames, "".concat(iconPrefix, "-close-modal-line"), true), _defineProperty(_classNames, "".concat(prefixCls, "-selection__choice__remove__disabled"), disableCloseTag), _classNames));
      return _react["default"].createElement("li", _extends({
        style: tagStyle
      }, _util.UNSELECTABLE_ATTRIBUTE, {
        role: "menuitem",
        className: "".concat(prefixCls, "-selection__choice"),
        title: (0, _util.toTitle)(label)
      }), _react["default"].createElement("span", {
        className: removeCls,
        onMouseDown: disableCloseTag ? null : this.onRemove
      }), _react["default"].createElement("span", {
        className: "".concat(prefixCls, "-selection__choice__content")
      }, content));
    }
  }]);

  return Selection;
}(_react["default"].Component);

_defineProperty(Selection, "propTypes", {
  disableCloseTag: _propTypes["default"].bool,
  editable: _propTypes["default"].bool,
  prefixCls: _propTypes["default"].string,
  iconPrefix: _propTypes["default"].string,
  maxTagTextLength: _propTypes["default"].number,
  tagWidth: _propTypes["default"].number,
  onRemove: _propTypes["default"].func,
  label: _propTypes["default"].node,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
});

var _default = Selection;
exports["default"] = _default;