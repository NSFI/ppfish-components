"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.selectorContextTypes = exports.selectorPropTypes = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _util = require("../util");

var _index = _interopRequireDefault(require("../../../Icon/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var selectorPropTypes = {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  open: _propTypes["default"].bool,
  valueList: _propTypes["default"].array,
  // Name as valueList to diff the single value
  allowClear: _propTypes["default"].bool,
  showArrow: _propTypes["default"].bool,
  uniqueTreeNodeByLabel: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  removeSelected: _propTypes["default"].func,
  // Pass by component
  ariaId: _propTypes["default"].string
};
exports.selectorPropTypes = selectorPropTypes;
var selectorContextTypes = {
  onSelectorFocus: _propTypes["default"].func.isRequired,
  onSelectorBlur: _propTypes["default"].func.isRequired,
  onSelectorKeyDown: _propTypes["default"].func.isRequired,
  onSelectorClear: _propTypes["default"].func.isRequired
};
exports.selectorContextTypes = selectorContextTypes;

function _default(modeName) {
  var BaseSelector =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(BaseSelector, _React$Component);

    function BaseSelector() {
      var _this;

      _classCallCheck(this, BaseSelector);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseSelector).call(this));

      _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
        var _this$props = _this.props,
            onFocus = _this$props.onFocus,
            focused = _this$props.focused;
        var onSelectorFocus = _this.context.rcTreeSelect.onSelectorFocus;

        if (!focused) {
          onSelectorFocus();
        }

        if (onFocus) {
          onFocus.apply(void 0, arguments);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
        var onBlur = _this.props.onBlur;
        var onSelectorBlur = _this.context.rcTreeSelect.onSelectorBlur; // TODO: Not trigger when is inner component get focused

        onSelectorBlur();

        if (onBlur) {
          onBlur.apply(void 0, arguments);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "focus", function () {
        _this.domRef.current.focus();
      });

      _defineProperty(_assertThisInitialized(_this), "blur", function () {
        _this.domRef.current.focus();
      });

      _this.domRef = (0, _util.createRef)();
      return _this;
    }

    _createClass(BaseSelector, [{
      key: "renderClear",
      value: function renderClear() {
        var _this$props2 = this.props,
            prefixCls = _this$props2.prefixCls,
            allowClear = _this$props2.allowClear,
            valueList = _this$props2.valueList;
        var onSelectorClear = this.context.rcTreeSelect.onSelectorClear;

        if (!allowClear || !valueList.length || !valueList[0].value) {
          return null;
        }

        return _react["default"].createElement("span", {
          key: "clear",
          className: "".concat(prefixCls, "-selection__clear"),
          onClick: onSelectorClear
        });
      }
    }, {
      key: "renderArrow",
      value: function renderArrow() {
        var _this$props3 = this.props,
            prefixCls = _this$props3.prefixCls,
            showArrow = _this$props3.showArrow;

        if (!showArrow) {
          return null;
        }

        return _react["default"].createElement(_index["default"], {
          key: "arrow",
          type: "down-fill",
          className: "".concat(prefixCls, "-arrow"),
          style: {
            outline: 'none'
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _classNames;

        var _this$props4 = this.props,
            prefixCls = _this$props4.prefixCls,
            className = _this$props4.className,
            style = _this$props4.style,
            open = _this$props4.open,
            focused = _this$props4.focused,
            disabled = _this$props4.disabled,
            allowClear = _this$props4.allowClear,
            onClick = _this$props4.onClick,
            ariaId = _this$props4.ariaId,
            renderSelection = _this$props4.renderSelection,
            renderPlaceholder = _this$props4.renderPlaceholder,
            tabIndex = _this$props4.tabIndex;
        var onSelectorKeyDown = this.context.rcTreeSelect.onSelectorKeyDown;
        var myTabIndex = tabIndex;

        if (disabled) {
          myTabIndex = null;
        }

        return _react["default"].createElement("span", {
          style: style // 用 onMouseDown 代替 onClick，修复加载页面后点击弹层，RcTrigger v2.6.2 中
          // onDocumentClick 先于 onPopupMouseDown 执行，导致的弹层异常关闭的问题 
          ,
          onMouseDown: onClick,
          className: (0, _classnames["default"])(className, prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-open"), open), _defineProperty(_classNames, "".concat(prefixCls, "-focused"), open || focused), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-enabled"), !disabled), _defineProperty(_classNames, "".concat(prefixCls, "-allow-clear"), allowClear), _classNames)),
          ref: this.domRef,
          role: "combobox",
          "aria-expanded": open,
          "aria-owns": open ? ariaId : undefined,
          "aria-controls": open ? ariaId : undefined,
          "aria-haspopup": "listbox",
          "aria-disabled": disabled,
          tabIndex: myTabIndex,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyDown: onSelectorKeyDown
        }, _react["default"].createElement("span", {
          key: "selection",
          className: (0, _classnames["default"])("".concat(prefixCls, "-selection"), "".concat(prefixCls, "-selection--").concat(modeName))
        }, renderSelection(), this.renderClear(), this.renderArrow(), renderPlaceholder && renderPlaceholder()));
      }
    }]);

    return BaseSelector;
  }(_react["default"].Component);

  _defineProperty(BaseSelector, "propTypes", _objectSpread({}, selectorPropTypes, {
    // Pass by HOC
    renderSelection: _propTypes["default"].func.isRequired,
    renderPlaceholder: _propTypes["default"].func,
    tabIndex: _propTypes["default"].number
  }));

  _defineProperty(BaseSelector, "contextTypes", {
    rcTreeSelect: _propTypes["default"].shape(_objectSpread({}, selectorContextTypes))
  });

  _defineProperty(BaseSelector, "defaultProps", {
    tabIndex: 0
  });

  (0, _reactLifecyclesCompat.polyfill)(BaseSelector);
  return BaseSelector;
}