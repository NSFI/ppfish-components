"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BasePopup = _interopRequireDefault(require("../Base/BasePopup"));

var _SearchInput = _interopRequireDefault(require("../SearchInput"));

var _util = require("../util");

var _index = _interopRequireDefault(require("../../../Button/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var MultiplePopup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MultiplePopup, _React$Component);

  function MultiplePopup() {
    var _this;

    _classCallCheck(this, MultiplePopup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiplePopup).call(this));

    _defineProperty(_assertThisInitialized(_this), "onPlaceholderClick", function () {
      _this.inputRef.current.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "renderPlaceholder", function () {
      var _this$props = _this.props,
          searchPlaceholder = _this$props.searchPlaceholder,
          searchValue = _this$props.searchValue,
          prefixCls = _this$props.prefixCls;

      if (!searchPlaceholder) {
        return null;
      }

      return _react["default"].createElement("span", {
        style: {
          display: searchValue ? 'none' : 'block'
        },
        onClick: _this.onPlaceholderClick,
        className: "".concat(prefixCls, "-search__field__placeholder")
      }, searchPlaceholder);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearch", function () {
      var _this$props2 = _this.props,
          showSearch = _this$props2.showSearch,
          dropdownPrefixCls = _this$props2.dropdownPrefixCls;

      if (!showSearch) {
        return null;
      }

      return _react["default"].createElement("span", {
        className: "".concat(dropdownPrefixCls, "-search")
      }, _react["default"].createElement(_SearchInput["default"], _extends({}, _this.props, {
        ref: _this.inputRef,
        renderPlaceholder: _this.renderPlaceholder
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderConfirmBtn", function () {
      var _this$props3 = _this.props,
          onCancel = _this$props3.onCancel,
          onConfirm = _this$props3.onConfirm,
          disableConfirm = _this$props3.disableConfirm;
      return _react["default"].createElement("div", {
        className: "dropdown-confirm"
      }, _react["default"].createElement(_index["default"], {
        onClick: onCancel
      }, "\u53D6\u6D88"), _react["default"].createElement(_index["default"], {
        type: "primary",
        onClick: onConfirm,
        disabled: disableConfirm
      }, "\u786E\u5B9A"));
    });

    _this.inputRef = (0, _util.createRef)();
    return _this;
  }

  _createClass(MultiplePopup, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement(_BasePopup["default"], _extends({}, this.props, {
        renderSearch: this.renderSearch
      })), this.renderConfirmBtn());
    }
  }]);

  return MultiplePopup;
}(_react["default"].Component);

_defineProperty(MultiplePopup, "propTypes", _objectSpread({}, _BasePopup["default"].propTypes, {
  searchValue: _propTypes["default"].string,
  showSearch: _propTypes["default"].bool,
  dropdownPrefixCls: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  disableConfirm: _propTypes["default"].bool,
  searchPlaceholder: _propTypes["default"].string
}));

var _default = MultiplePopup;
exports["default"] = _default;