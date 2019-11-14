"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../../Menu/src/index.js"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _raf = _interopRequireDefault(require("raf"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  function DropdownMenu(_props) {
    var _this;

    _classCallCheck(this, DropdownMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropdownMenu).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "scrollActiveItemToView", function () {
      // scroll into view
      var itemComponent = (0, _reactDom.findDOMNode)(_this.firstActiveItem);
      var props = _this.props;

      if (itemComponent) {
        var scrollIntoViewOpts = {
          onlyScrollIfNeeded: true
        };

        if ((!props.value || props.value.length === 0) && props.firstActiveValue) {
          scrollIntoViewOpts.alignWithTop = true;
        } // Delay to scroll since current frame item position is not ready when pre view is by filter
        // https://github.com/ant-design/ant-design/issues/11268#issuecomment-406634462


        (0, _raf["default"])(function () {
          (0, _domScrollIntoView["default"])(itemComponent, (0, _reactDom.findDOMNode)(_this.menuRef), scrollIntoViewOpts);
        });
      }
    });

    _this.lastInputValue = _props.inputValue;
    _this.saveMenuRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'menuRef');
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollActiveItemToView();
      this.lastVisible = this.props.visible;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (!nextProps.visible) {
        this.lastVisible = false;
      } // freeze when hide


      return nextProps.visible;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var props = this.props;

      if (!prevProps.visible && props.visible) {
        this.scrollActiveItemToView();
      }

      this.lastVisible = props.visible;
      this.lastInputValue = props.inputValue;
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this2 = this;

      var props = this.props;
      var menuItems = props.menuItems,
          defaultActiveFirstOption = props.defaultActiveFirstOption,
          value = props.value,
          prefixCls = props.prefixCls,
          multiple = props.multiple,
          onMenuSelect = props.onMenuSelect,
          inputValue = props.inputValue,
          firstActiveValue = props.firstActiveValue,
          backfillValue = props.backfillValue;

      if (menuItems && menuItems.length) {
        var menuProps = {};

        if (multiple) {
          menuProps.onDeselect = props.onMenuDeselect;
          menuProps.onSelect = onMenuSelect;
        } else {
          menuProps.onClick = onMenuSelect;
        }

        var selectedKeys = (0, _util.getSelectKeys)(menuItems, value);
        var activeKeyProps = {};
        var clonedMenuItems = menuItems;

        if (selectedKeys.length || firstActiveValue) {
          if (props.visible && !this.lastVisible) {
            activeKeyProps.activeKey = selectedKeys[0] || firstActiveValue;
          }

          var foundFirst = false; // set firstActiveItem via cloning menus
          // for scroll into view

          var clone = function clone(item) {
            if (!foundFirst && selectedKeys.indexOf(item.key) !== -1 || !foundFirst && !selectedKeys.length && firstActiveValue.indexOf(item.key) !== -1) {
              foundFirst = true;
              return (0, _react.cloneElement)(item, {
                ref: function ref(_ref) {
                  _this2.firstActiveItem = _ref;
                }
              });
            }

            return item;
          };

          clonedMenuItems = menuItems.map(function (item) {
            if (item.type.isMenuItemGroup) {
              var children = (0, _util.toArray)(item.props.children).map(clone);
              return (0, _react.cloneElement)(item, {}, children);
            }

            return clone(item);
          });
        } else {
          // Clear firstActiveItem when dropdown menu items was empty
          // Avoid `Unable to find node on an unmounted component`
          // https://github.com/ant-design/ant-design/issues/10774
          this.firstActiveItem = null;
        } // clear activeKey when inputValue change


        var lastValue = value && value[value.length - 1];

        if (inputValue !== this.lastInputValue && (!lastValue || lastValue !== backfillValue)) {
          activeKeyProps.activeKey = '';
        }

        return _react["default"].createElement(_index["default"], _extends({
          ref: this.saveMenuRef,
          style: this.props.dropdownMenuStyle,
          defaultActiveFirst: defaultActiveFirstOption,
          role: "listbox"
        }, activeKeyProps, {
          multiple: multiple
        }, menuProps, {
          selectedKeys: selectedKeys,
          prefixCls: "".concat(prefixCls, "-menu")
        }), clonedMenuItems);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var renderMenu = this.renderMenu();
      return renderMenu ? _react["default"].createElement("div", {
        style: {
          overflow: 'auto'
        },
        onFocus: this.props.onPopupFocus,
        onMouseDown: _util.preventDefaultEvent,
        onScroll: this.props.onPopupScroll
      }, renderMenu) : null;
    }
  }]);

  return DropdownMenu;
}(_react["default"].Component);

exports["default"] = DropdownMenu;

_defineProperty(DropdownMenu, "propTypes", {
  defaultActiveFirstOption: _propTypes["default"].bool,
  value: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string, _propTypes["default"].array]),
  dropdownMenuStyle: _propTypes["default"].object,
  multiple: _propTypes["default"].bool,
  onPopupFocus: _propTypes["default"].func,
  onPopupScroll: _propTypes["default"].func,
  onMenuDeSelect: _propTypes["default"].func,
  onMenuSelect: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  menuItems: _propTypes["default"].array,
  inputValue: _propTypes["default"].string,
  visible: _propTypes["default"].bool
});

DropdownMenu.displayName = 'DropdownMenu';