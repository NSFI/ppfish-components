"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _index = _interopRequireWildcard(require("./src/index.js"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _warning = _interopRequireDefault(require("warning"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function isFlexSupported() {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    var documentElement = window.document.documentElement;
    return 'flex' in documentElement.style || 'webkitFlex' in documentElement.style || 'Flex' in documentElement.style || 'msFlex' in documentElement.style;
  }

  return false;
}

var Tabs =
/** @class */
function (_super) {
  __extends(Tabs, _super);

  function Tabs() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.createNewTab = function (targetKey) {
      var onEdit = _this.props.onEdit;

      if (onEdit) {
        onEdit(targetKey, 'add');
      }
    };

    _this.removeTab = function (targetKey, e) {
      e.stopPropagation();

      if (!targetKey) {
        return;
      }

      var onEdit = _this.props.onEdit;

      if (onEdit) {
        onEdit(targetKey, 'remove');
      }
    };

    _this.handleChange = function (activeKey) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(activeKey);
      }
    };

    return _this;
  }

  Tabs.prototype.componentDidMount = function () {
    var NO_FLEX = ' no-flex';
    var tabNode = (0, _reactDom.findDOMNode)(this);

    if (tabNode && !isFlexSupported() && tabNode.className.indexOf(NO_FLEX) === -1) {
      tabNode.className += NO_FLEX;
    }
  };

  Tabs.prototype.render = function () {
    var _a;

    var _this = this;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        _c = _b.className,
        className = _c === void 0 ? '' : _c,
        size = _b.size,
        type = _b.type,
        tabPosition = _b.tabPosition,
        children = _b.children,
        tabBarExtraContent = _b.tabBarExtraContent,
        tabBarStyle = _b.tabBarStyle,
        hideAdd = _b.hideAdd,
        loading = _b.loading,
        onTabClick = _b.onTabClick,
        onPrevClick = _b.onPrevClick,
        onNextClick = _b.onNextClick,
        animated = _b.animated,
        tabBarGutter = _b.tabBarGutter;

    var _d = _typeof(animated) === 'object' ? {
      inkBarAnimated: animated.inkBar,
      tabPaneAnimated: animated.tabPane
    } : {
      inkBarAnimated: animated,
      tabPaneAnimated: animated
    },
        inkBarAnimated = _d.inkBarAnimated,
        tabPaneAnimated = _d.tabPaneAnimated;

    var showInkBar = true; // card tabs should not have animation

    if (type !== 'line') {
      showInkBar = false;
      tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
    }

    (0, _warning["default"])(!(type.indexOf('card') >= 0 && (size === 'small' || size === 'large')), 'Tabs[type=card|editable-card] doesn\'t have small or large size, it\'s by designed.');
    var cls = (0, _classnames["default"])(className, (_a = {}, _a[prefixCls + "-vertical"] = tabPosition === 'left' || tabPosition === 'right', _a[prefixCls + "-" + size] = !!size, _a[prefixCls + "-card"] = type.indexOf('card') >= 0, _a[prefixCls + "-" + type] = true, _a[prefixCls + "-no-animation"] = !tabPaneAnimated, _a)); // only card type tabs can be added and closed

    var childrenWithClose = [];

    if (type === 'editable-card') {
      childrenWithClose = [];
      React.Children.forEach(children, function (child, index) {
        var closable = child.props.closable;
        closable = typeof closable === 'undefined' ? true : closable;
        var closeIcon = closable ? React.createElement(_Icon["default"], {
          type: "close-tag-line",
          onClick: function onClick(e) {
            return _this.removeTab(child.key, e);
          }
        }) : null;
        childrenWithClose.push(React.cloneElement(child, {
          tab: React.createElement("div", {
            className: closable ? undefined : prefixCls + "-tab-unclosable"
          }, child.props.tab, closeIcon),
          key: child.key || index
        }));
      }); // Add new tab handler

      if (!hideAdd) {
        tabBarExtraContent = React.createElement("span", null, React.createElement(_Icon["default"], {
          type: "upload-plus",
          className: prefixCls + "-new-tab",
          onClick: this.createNewTab
        }), tabBarExtraContent);
      }
    }

    tabBarExtraContent = tabBarExtraContent ? React.createElement("div", {
      className: prefixCls + "-extra-content"
    }, tabBarExtraContent) : null;

    var renderTabBar = function renderTabBar() {
      return React.createElement(_index.ScrollableInkTabBar, {
        showInkBar: showInkBar,
        inkBarAnimated: inkBarAnimated,
        extraContent: tabBarExtraContent,
        onTabClick: onTabClick,
        onPrevClick: onPrevClick,
        onNextClick: onNextClick,
        style: tabBarStyle,
        tabBarGutter: tabBarGutter
      });
    };

    return React.createElement(_index["default"], __assign({}, this.props, {
      className: cls,
      tabBarPosition: tabPosition,
      renderTabBar: renderTabBar,
      renderTabContent: function renderTabContent() {
        return React.createElement(_index.TabContent, {
          animated: tabPaneAnimated,
          animatedWithMargin: true,
          loading: loading
        });
      },
      onChange: this.handleChange
    }), childrenWithClose.length > 0 ? childrenWithClose : children);
  };

  Tabs.TabPane = _index.TabPane;
  Tabs.defaultProps = {
    prefixCls: 'fishd-tabs',
    hideAdd: false,
    loading: false,
    size: 'default',
    tabPosition: 'top',
    type: 'line'
  };
  return Tabs;
}(React.Component);

var _default = Tabs;
exports["default"] = _default;