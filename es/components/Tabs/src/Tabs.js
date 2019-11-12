"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _KeyCode = _interopRequireDefault(require("./KeyCode"));

var _TabPane = _interopRequireDefault(require("./TabPane"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

function getDefaultActiveKey(props) {
  var activeKey;

  _react.default.Children.forEach(props.children, function (child) {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });

  return activeKey;
}

function activeKeyIsValid(props, key) {
  var keys = _react.default.Children.map(props.children, function (child) {
    return child && child.key;
  });

  return keys.indexOf(key) >= 0;
}

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Tabs, _React$Component);

  Tabs.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var newState = {};

    if ('activeKey' in nextProps) {
      newState.activeKey = nextProps.activeKey;
    } else if (!activeKeyIsValid(nextProps, prevState.activeKey)) {
      // https://github.com/ant-design/ant-design/issues/7093
      newState.activeKey = getDefaultActiveKey(nextProps);
    }

    return newState;
  };

  function Tabs(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onTabClick", function (activeKey, e) {
      if (_this.tabBar.props.onTabClick) {
        _this.tabBar.props.onTabClick(activeKey, e);
      }

      _this.setActiveKey(activeKey);
    });

    _defineProperty(_assertThisInitialized(_this), "onNavKeyDown", function (e) {
      var eventKeyCode = e.keyCode;

      if (eventKeyCode === _KeyCode.default.RIGHT || eventKeyCode === _KeyCode.default.DOWN) {
        e.preventDefault();

        var nextKey = _this.getNextActiveKey(true);

        _this.onTabClick(nextKey);
      } else if (eventKeyCode === _KeyCode.default.LEFT || eventKeyCode === _KeyCode.default.UP) {
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

      _react.default.Children.forEach(_this.props.children, function (c) {
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

  var _proto = Tabs.prototype;

  _proto.render = function render() {
    var _classnames;

    var props = this.props;

    var prefixCls = props.prefixCls,
        navWrapper = props.navWrapper,
        tabBarPosition = props.tabBarPosition,
        className = props.className,
        renderTabContent = props.renderTabContent,
        renderTabBar = props.renderTabBar,
        destroyInactiveTabPane = props.destroyInactiveTabPane,
        restProps = _objectWithoutPropertiesLoose(props, ["prefixCls", "navWrapper", "tabBarPosition", "className", "renderTabContent", "renderTabBar", "destroyInactiveTabPane"]);

    var cls = (0, _classnames2.default)((_classnames = {}, _classnames[prefixCls] = 1, _classnames[prefixCls + "-" + tabBarPosition] = 1, _classnames[className] = !!className, _classnames));
    this.tabBar = renderTabBar();
    var contents = [_react.default.cloneElement(this.tabBar, {
      prefixCls: prefixCls,
      navWrapper: navWrapper,
      key: 'tabBar',
      onKeyDown: this.onNavKeyDown,
      tabBarPosition: tabBarPosition,
      onTabClick: this.onTabClick,
      panels: props.children,
      activeKey: this.state.activeKey
    }), _react.default.cloneElement(renderTabContent(), {
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

    return _react.default.createElement("div", _extends({
      className: cls,
      style: props.style
    }, (0, _utils.getDataAttr)(restProps), {
      onScroll: this.onScroll
    }), contents);
  };

  return Tabs;
}(_react.default.Component);

Tabs.propTypes = {
  destroyInactiveTabPane: _propTypes.default.bool,
  renderTabBar: _propTypes.default.func.isRequired,
  renderTabContent: _propTypes.default.func.isRequired,
  navWrapper: _propTypes.default.func,
  onChange: _propTypes.default.func,
  children: _propTypes.default.node,
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  tabBarPosition: _propTypes.default.string,
  style: _propTypes.default.object,
  activeKey: _propTypes.default.string,
  defaultActiveKey: _propTypes.default.string
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
Tabs.TabPane = _TabPane.default;
(0, _reactLifecyclesCompat.polyfill)(Tabs);
var _default = Tabs;
exports.default = _default;