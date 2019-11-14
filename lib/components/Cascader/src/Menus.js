"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _arrayTreeFilter = _interopRequireDefault(require("array-tree-filter"));

var _reactDom = require("react-dom");

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

var Menus =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Menus, _React$Component);

  function Menus(props) {
    var _this;

    _classCallCheck(this, Menus);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Menus).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "saveMenuItem", function (index) {
      return function (node) {
        _this.menuItems[index] = node;
      };
    });

    _this.menuItems = {};
    return _this;
  }

  _createClass(Menus, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollActiveItemToView();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.visible && this.props.visible) {
        this.scrollActiveItemToView();
      }
    }
  }, {
    key: "getFieldName",
    value: function getFieldName(name) {
      var _this$props = this.props,
          fieldNames = _this$props.fieldNames,
          defaultFieldNames = _this$props.defaultFieldNames; // 防止只设置单个属性的名字

      return fieldNames[name] || defaultFieldNames[name];
    }
  }, {
    key: "getOption",
    value: function getOption(option, menuIndex) {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          expandTrigger = _this$props2.expandTrigger,
          expandIcon = _this$props2.expandIcon;
      var onSelect = this.props.onSelect.bind(this, option, menuIndex);
      var expandProps = {
        onClick: onSelect
      };
      var menuItemCls = "".concat(prefixCls, "-menu-item");
      var expandIconNode = null;
      var hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;

      if (hasChildren || option.isLeaf === false) {
        menuItemCls += " ".concat(prefixCls, "-menu-item-expand");
        expandIconNode = _react["default"].createElement("span", {
          className: "".concat(prefixCls, "-menu-item-expand-icon")
        }, expandIcon);
      }

      if (expandTrigger === 'hover' && hasChildren) {
        expandProps = {
          onMouseEnter: this.delayOnSelect.bind(this, onSelect),
          onMouseLeave: this.delayOnSelect.bind(this),
          onClick: onSelect
        };
      }

      if (this.isActiveOption(option, menuIndex)) {
        menuItemCls += " ".concat(prefixCls, "-menu-item-active");
        expandProps.ref = this.saveMenuItem(menuIndex);
      }

      if (option.disabled) {
        menuItemCls += " ".concat(prefixCls, "-menu-item-disabled");
      }

      if (option.loading) {
        menuItemCls += " ".concat(prefixCls, "-menu-item-loading");
      }

      var title = '';

      if (option.title) {
        title = option.title;
      } else if (typeof option[this.getFieldName('label')] === 'string') {
        title = option[this.getFieldName('label')];
      }

      return _react["default"].createElement("li", _extends({
        key: option[this.getFieldName('value')],
        className: menuItemCls,
        title: title
      }, expandProps), option[this.getFieldName('label')], expandIconNode);
    }
  }, {
    key: "getActiveOptions",
    value: function getActiveOptions(values) {
      var _this2 = this;

      var activeValue = values || this.props.activeValue;
      var options = this.props.options;
      return (0, _arrayTreeFilter["default"])(options, function (o, level) {
        return o[_this2.getFieldName('value')] === activeValue[level];
      }, {
        childrenKeyName: this.getFieldName('children')
      });
    }
  }, {
    key: "getShowOptions",
    value: function getShowOptions() {
      var _this3 = this;

      var options = this.props.options;
      var result = this.getActiveOptions().map(function (activeOption) {
        return activeOption[_this3.getFieldName('children')];
      }).filter(function (activeOption) {
        return !!activeOption;
      });
      result.unshift(options);
      return result;
    }
  }, {
    key: "delayOnSelect",
    value: function delayOnSelect(onSelect) {
      var _this4 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }

      if (typeof onSelect === 'function') {
        this.delayTimer = setTimeout(function () {
          onSelect(args);
          _this4.delayTimer = null;
        }, 150);
      }
    }
  }, {
    key: "scrollActiveItemToView",
    value: function scrollActiveItemToView() {
      // scroll into view
      var optionsLength = this.getShowOptions().length;

      for (var i = 0; i < optionsLength; i++) {
        var itemComponent = this.menuItems[i];

        if (itemComponent) {
          var target = (0, _reactDom.findDOMNode)(itemComponent);
          target.parentNode.scrollTop = target.offsetTop;
        }
      }
    }
  }, {
    key: "isActiveOption",
    value: function isActiveOption(option, menuIndex) {
      var _this$props$activeVal = this.props.activeValue,
          activeValue = _this$props$activeVal === void 0 ? [] : _this$props$activeVal;
      return activeValue[menuIndex] === option[this.getFieldName('value')];
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          dropdownMenuColumnStyle = _this$props3.dropdownMenuColumnStyle;
      return _react["default"].createElement("div", null, this.getShowOptions().map(function (options, menuIndex) {
        return _react["default"].createElement("ul", {
          className: "".concat(prefixCls, "-menu"),
          key: menuIndex,
          style: dropdownMenuColumnStyle
        }, options.map(function (option) {
          return _this5.getOption(option, menuIndex);
        }));
      }));
    }
  }]);

  return Menus;
}(_react["default"].Component);

Menus.defaultProps = {
  options: [],
  value: [],
  activeValue: [],
  onSelect: function onSelect() {},
  prefixCls: 'rc-cascader-menus',
  visible: false,
  expandTrigger: 'click'
};
Menus.propTypes = {
  value: _propTypes["default"].array,
  activeValue: _propTypes["default"].array,
  options: _propTypes["default"].array.isRequired,
  prefixCls: _propTypes["default"].string,
  expandTrigger: _propTypes["default"].string,
  onSelect: _propTypes["default"].func,
  visible: _propTypes["default"].bool,
  dropdownMenuColumnStyle: _propTypes["default"].object,
  defaultFieldNames: _propTypes["default"].object,
  fieldNames: _propTypes["default"].object,
  expandIcon: _propTypes["default"].node
};
var _default = Menus;
exports["default"] = _default;