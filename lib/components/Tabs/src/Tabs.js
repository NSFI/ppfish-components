"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _KeyCode = _interopRequireDefault(require("./KeyCode"));

var _TabPane = _interopRequireDefault(require("./TabPane"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

function getDefaultActiveKey(props) {
  var activeKey;

  _react["default"].Children.forEach(props.children, function (child) {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });

  return activeKey;
}

function activeKeyIsValid(props, key) {
  var keys = _react["default"].Children.map(props.children, function (child) {
    return child && child.key;
  });

  return keys.indexOf(key) >= 0;
}

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tabs, _React$Component);

  _createClass(Tabs, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var newState = {};

      if ('activeKey' in nextProps) {
        newState.activeKey = nextProps.activeKey;
      } else if (!activeKeyIsValid(nextProps, prevState.activeKey)) {
        // https://github.com/ant-design/ant-design/issues/7093
        newState.activeKey = getDefaultActiveKey(nextProps);
      }

      return newState;
    }
  }]);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onTabClick", function (activeKey, e) {
      if (_this.tabBar.props.onTabClick) {
        _this.tabBar.props.onTabClick(activeKey, e);
      }

      _this.setActiveKey(activeKey);
    });

    _defineProperty(_assertThisInitialized(_this), "onNavKeyDown", function (e) {
      var eventKeyCode = e.keyCode;

      if (eventKeyCode === _KeyCode["default"].RIGHT || eventKeyCode === _KeyCode["default"].DOWN) {
        e.preventDefault();

        var nextKey = _this.getNextActiveKey(true);

        _this.onTabClick(nextKey);
      } else if (eventKeyCode === _KeyCode["default"].LEFT || eventKeyCode === _KeyCode["default"].UP) {
        e.preventDefault();

        var previousKey = _this.getNextActiveKey(false);

        _this.onTabClick(previousKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function (_ref) {
      var target = _ref.target,
          currentTarget = _ref.currentTarget;

      if (target === currentTarget && target.scrollLeft > 0) {
        target.scrollLeft = 0;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setActiveKey", function (activeKey) {
      if (_this.state.activeKey !== activeKey) {
        if (!('activeKey' in _this.props)) {
          _this.setState({
            activeKey: activeKey
          });
        }

        _this.props.onChange(activeKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getNextActiveKey", function (next) {
      var activeKey = _this.state.activeKey;
      var children = [];

      _react["default"].Children.forEach(_this.props.children, function (c) {
        if (c && !c.props.disabled) {
          if (next) {
            children.push(c);
          } else {
            children.unshift(c);
          }
        }
      });

      var length = children.length;
      var ret = length && children[0].key;
      children.forEach(function (child, i) {
        if (child.key === activeKey) {
          if (i === length - 1) {
            ret = children[0].key;
          } else {
            ret = children[i + 1].key;
          }
        }
      });
      return ret;
    });

    var _activeKey;

    if ('activeKey' in props && typeof props.activeKey == 'string') {
      _activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props && typeof props.defaultActiveKey == 'string') {
      _activeKey = props.defaultActiveKey;
    } else {
      _activeKey = getDefaultActiveKey(props);
    }

    _this.state = {
      activeKey: _activeKey
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: "render",
    value: function render() {
      var _classnames;

      var props = this.props;

      var prefixCls = props.prefixCls,
          navWrapper = props.navWrapper,
          tabBarPosition = props.tabBarPosition,
          className = props.className,
          renderTabContent = props.renderTabContent,
          renderTabBar = props.renderTabBar,
          destroyInactiveTabPane = props.destroyInactiveTabPane,
          restProps = _objectWithoutProperties(props, ["prefixCls", "navWrapper", "tabBarPosition", "className", "renderTabContent", "renderTabBar", "destroyInactiveTabPane"]);

      var cls = (0, _classnames2["default"])((_classnames = {}, _defineProperty(_classnames, prefixCls, 1), _defineProperty(_classnames, "".concat(prefixCls, "-").concat(tabBarPosition), 1), _defineProperty(_classnames, className, !!className), _classnames));
      this.tabBar = renderTabBar();
      var contents = [_react["default"].cloneElement(this.tabBar, {
        prefixCls: prefixCls,
        navWrapper: navWrapper,
        key: 'tabBar',
        onKeyDown: this.onNavKeyDown,
        tabBarPosition: tabBarPosition,
        onTabClick: this.onTabClick,
        panels: props.children,
        activeKey: this.state.activeKey
      }), _react["default"].cloneElement(renderTabContent(), {
        prefixCls: prefixCls,
        tabBarPosition: tabBarPosition,
        activeKey: this.state.activeKey,
        destroyInactiveTabPane: destroyInactiveTabPane,
        children: props.children,
        onChange: this.setActiveKey,
        key: 'tabContent'
      })];

      if (tabBarPosition === 'bottom') {
        contents.reverse();
      }

      return _react["default"].createElement("div", _extends({
        className: cls,
        style: props.style
      }, (0, _utils.getDataAttr)(restProps), {
        onScroll: this.onScroll
      }), contents);
    }
  }]);

  return Tabs;
}(_react["default"].Component);

Tabs.propTypes = {
  destroyInactiveTabPane: _propTypes["default"].bool,
  renderTabBar: _propTypes["default"].func.isRequired,
  renderTabContent: _propTypes["default"].func.isRequired,
  navWrapper: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  children: _propTypes["default"].node,
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  tabBarPosition: _propTypes["default"].string,
  style: _propTypes["default"].object,
  activeKey: _propTypes["default"].string,
  defaultActiveKey: _propTypes["default"].string
};
Tabs.defaultProps = {
  prefixCls: 'rc-tabs',
  destroyInactiveTabPane: false,
  onChange: noop,
  navWrapper: function navWrapper(arg) {
    return arg;
  },
  tabBarPosition: 'top',
  children: null,
  style: {}
};
Tabs.TabPane = _TabPane["default"];
(0, _reactLifecyclesCompat.polyfill)(Tabs);
var _default = Tabs;
exports["default"] = _default;