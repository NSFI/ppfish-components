"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var Option =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Option, _React$Component);

  function Option(props) {
    var _this;

    _classCallCheck(this, Option);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Option).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onOptionClick", function (e, option) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onOptionClick = _this$props.onOptionClick;

      if (!disabled) {
        onOptionClick && onOptionClick(e, option);
      }
    });

    return _this;
  }

  _createClass(Option, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          title = _this$props2.title,
          children = _this$props2.children,
          activeKey = _this$props2.activeKey,
          showOptionCheckedIcon = _this$props2.showOptionCheckedIcon,
          value = _this$props2.value,
          disabled = _this$props2.disabled,
          checked = _this$props2.checked,
          prefixCls = _this$props2.prefixCls;
      var label = children && children.length === 1 ? children[0] : children;
      var optionCls = (0, _classnames["default"])(_defineProperty({}, "".concat(prefixCls, "-item"), true), _defineProperty({}, "checked", !!checked), _defineProperty({}, "checked-icon", !!checked && showOptionCheckedIcon), _defineProperty({}, "active", 'activeKey' in this.props && activeKey === value), _defineProperty({}, "".concat(prefixCls, "-item-disabled"), !!disabled));
      return _react["default"].createElement("li", {
        title: title,
        className: optionCls,
        onClick: function onClick(e) {
          return _this2.onOptionClick(e, {
            label: label,
            title: title,
            key: value
          });
        }
      }, children);
    }
  }]);

  return Option;
}(_react["default"].Component);

exports["default"] = Option;

_defineProperty(Option, "isSelectOption", true);

_defineProperty(Option, "propTypes", {
  activeKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  checked: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),
  children: _propTypes["default"].node,
  disabled: _propTypes["default"].bool,
  onOptionClick: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  showOptionCheckedIcon: _propTypes["default"].bool,
  title: _propTypes["default"].string,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].node])
});

_defineProperty(Option, "defaultProps", {
  prefixCls: 'fishd-select-dropdown-option',
  showOptionCheckedIcon: true
});