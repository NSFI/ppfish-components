"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../Icon/index.js"));

var _PanelContent = _interopRequireDefault(require("./PanelContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var CollapsePanel =
/*#__PURE__*/
function (_Component) {
  _inherits(CollapsePanel, _Component);

  function CollapsePanel(props) {
    var _this;

    _classCallCheck(this, CollapsePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CollapsePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getHeader", function (status) {
      var header = _this.props.header;

      if (typeof header === 'function') {
        return header(status);
      } else {
        return header;
      }
    });

    _this.handleItemClick = _this.handleItemClick.bind(_assertThisInitialized(_this));
    _this.handleItemClose = _this.handleItemClose.bind(_assertThisInitialized(_this));
    _this.state = {
      isCustom: typeof _this.props.header === 'function' //是否显示箭头,不可关闭时不显示

    };
    return _this;
  }

  _createClass(CollapsePanel, [{
    key: "handleItemClick",
    value: function handleItemClick() {
      var _this$props = this.props,
          onItemClick = _this$props.onItemClick,
          disabled = _this$props.disabled;

      if (!disabled) {
        onItemClick();
      }
    }
  }, {
    key: "handleItemClose",
    value: function handleItemClose(e) {
      e.stopPropagation();
      var _this$props2 = this.props,
          onCloseItem = _this$props2.onCloseItem,
          disabled = _this$props2.disabled;

      if (!disabled) {
        onCloseItem();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames, _classNames2;

      var _this$props3 = this.props,
          itemKey = _this$props3.itemKey,
          className = _this$props3.className,
          prefixCls = _this$props3.prefixCls,
          disabled = _this$props3.disabled,
          header = _this$props3.header,
          showClose = _this$props3.showClose,
          style = _this$props3.style,
          children = _this$props3.children,
          isActive = _this$props3.isActive;
      var isCustom = this.state.isCustom;
      var headerCls = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-header"), true), _defineProperty(_classNames, "".concat(prefixCls, "-header-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-header-close"), showClose), _defineProperty(_classNames, "".concat(prefixCls, "-header-custom"), isCustom), _classNames));
      var itemCls = (0, _classnames["default"])((_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-item"), true), _defineProperty(_classNames2, "".concat(prefixCls, "-item-active"), isActive), _defineProperty(_classNames2, className, className), _classNames2));
      var closeCls = (0, _classnames["default"])({
        'close': true,
        'z-close-show': showClose
      });

      var getArrowIcon = function getArrowIcon(isActive) {
        if (isActive) {
          return _react["default"].createElement(_index["default"], {
            className: "icon",
            type: "top"
          });
        } else {
          return _react["default"].createElement(_index["default"], {
            className: "icon",
            type: "bottom"
          });
        }
      };

      return _react["default"].createElement("div", {
        className: itemCls,
        style: style
      }, _react["default"].createElement("div", {
        className: headerCls,
        onClick: this.handleItemClick,
        role: "tab",
        "aria-expanded": isActive,
        ref: itemKey
      }, _react["default"].createElement("div", {
        className: "arrow"
      }, getArrowIcon(isActive)), _react["default"].createElement("div", {
        className: "title"
      }, this.getHeader(isActive)), _react["default"].createElement("div", {
        className: closeCls,
        onClick: this.handleItemClose
      }, _react["default"].createElement(_index["default"], {
        className: "icon",
        type: "picture-close"
      }))), _react["default"].createElement(_PanelContent["default"], {
        prefixCls: prefixCls,
        isActive: isActive
      }, children));
    }
  }]);

  return CollapsePanel;
}(_react.Component);

_defineProperty(CollapsePanel, "propTypes", {
  itemKey: _propTypes["default"].func,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,
  openAnimation: _propTypes["default"].object,
  prefixCls: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  header: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func]),
  showClose: _propTypes["default"].bool,
  isActive: _propTypes["default"].bool,
  onItemClick: _propTypes["default"].func,
  onCloseItem: _propTypes["default"].func
});

_defineProperty(CollapsePanel, "defaultProps", {
  isActive: false,
  disabled: false,
  style: {},
  onItemClick: function onItemClick() {},
  onCloseItem: function onCloseItem() {}
});

var _default = CollapsePanel;
exports["default"] = _default;