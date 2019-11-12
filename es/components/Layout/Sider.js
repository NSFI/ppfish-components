"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _index = _interopRequireDefault(require("../Icon/index"));

var _isNumeric = _interopRequireDefault(require("../../utils/isNumeric"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}; // matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82


if (typeof window !== 'undefined') {
  var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
    return {
      media: mediaQuery,
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };

  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

var dimensionMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
};

var generateId = function () {
  var i = 0;
  return function (prefix) {
    if (prefix === void 0) {
      prefix = '';
    }

    i += 1;
    return "" + prefix + i;
  };
}();

var Sider =
/** @class */
function (_super) {
  __extends(Sider, _super);

  function Sider(props) {
    var _this = _super.call(this, props) || this;

    _this.responsiveHandler = function (mql) {
      _this.setState({
        below: mql.matches
      });

      var onBreakpoint = _this.props.onBreakpoint;

      if (onBreakpoint) {
        onBreakpoint(mql.matches);
      }

      if (_this.state.collapsed !== mql.matches) {
        _this.setCollapsed(mql.matches, 'responsive');
      }
    };

    _this.setCollapsed = function (collapsed, type) {
      if (!('collapsed' in _this.props)) {
        _this.setState({
          collapsed: collapsed
        });
      }

      var onCollapse = _this.props.onCollapse;

      if (onCollapse) {
        onCollapse(collapsed, type);
      }
    };

    _this.toggle = function () {
      var collapsed = !_this.state.collapsed;

      _this.setCollapsed(collapsed, 'clickTrigger');
    };

    _this.belowShowChange = function () {
      _this.setState({
        belowShow: !_this.state.belowShow
      });
    };

    _this.uniqueId = generateId('fishd-sider-');
    var matchMedia;

    if (typeof window !== 'undefined') {
      matchMedia = window.matchMedia;
    }

    if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
      _this.mql = matchMedia("(max-width: " + dimensionMap[props.breakpoint] + ")");
    }

    var collapsed;

    if ('collapsed' in props) {
      collapsed = props.collapsed;
    } else {
      collapsed = props.defaultCollapsed;
    }

    _this.state = {
      prevCollapsed: collapsed,
      collapsed: collapsed,
      below: false
    };
    return _this;
  }

  Sider.getDerivedStateFromProps = function (nextProps, prevState) {
    if ("collapsed" in nextProps && nextProps.collapsed !== prevState.prevCollapsed) {
      return {
        prevCollapsed: nextProps.collapsed,
        collapsed: nextProps.collapsed
      };
    }

    return null;
  };

  Sider.prototype.getChildContext = function () {
    return {
      siderCollapsed: this.state.collapsed,
      collapsedWidth: this.props.collapsedWidth
    };
  };

  Sider.prototype.componentDidMount = function () {
    if (this.mql) {
      this.mql.addEventListener('change', this.responsiveHandler);
      this.responsiveHandler(this.mql);
    }

    if (this.context.siderHook) {
      this.context.siderHook.addSider(this.uniqueId);
    }
  };

  Sider.prototype.componentWillUnmount = function () {
    if (this.mql) {
      this.mql.removeListener(this.responsiveHandler);
    }

    if (this.context.siderHook) {
      this.context.siderHook.removeSider(this.uniqueId);
    }
  };

  Sider.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        className = _b.className,
        theme = _b.theme,
        collapsible = _b.collapsible,
        reverseArrow = _b.reverseArrow,
        trigger = _b.trigger,
        style = _b.style,
        width = _b.width,
        collapsedWidth = _b.collapsedWidth,
        others = __rest(_b, ["prefixCls", "className", "theme", "collapsible", "reverseArrow", "trigger", "style", "width", "collapsedWidth"]);

    var divProps = (0, _omit.default)(others, ['collapsed', 'defaultCollapsed', 'onCollapse', 'breakpoint', 'onBreakpoint']);
    var rawWidth = this.state.collapsed ? collapsedWidth : width; // use "px" as fallback unit for width

    var siderWidth = (0, _isNumeric.default)(rawWidth) ? rawWidth + "px" : String(rawWidth); // special trigger when collapsedWidth == 0

    var zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? React.createElement("span", {
      onClick: this.toggle,
      className: prefixCls + "-zero-width-trigger"
    }, React.createElement(_index.default, {
      type: "bars"
    })) : null;
    var iconObj = {
      'expanded': reverseArrow ? React.createElement(_index.default, {
        type: "right"
      }) : React.createElement(_index.default, {
        type: "left"
      }),
      'collapsed': reverseArrow ? React.createElement(_index.default, {
        type: "left"
      }) : React.createElement(_index.default, {
        type: "right"
      })
    };
    var status = this.state.collapsed ? 'collapsed' : 'expanded';
    var defaultTrigger = iconObj[status];
    var triggerDom = trigger !== null ? zeroWidthTrigger || React.createElement("div", {
      className: prefixCls + "-trigger",
      onClick: this.toggle,
      style: {
        width: siderWidth
      }
    }, trigger || defaultTrigger) : null;

    var divStyle = __assign(__assign({}, style), {
      flex: "0 0 " + siderWidth,
      maxWidth: siderWidth,
      minWidth: siderWidth,
      width: siderWidth
    });

    var siderCls = (0, _classnames.default)(className, prefixCls, prefixCls + "-" + theme, (_a = {}, _a[prefixCls + "-collapsed"] = !!this.state.collapsed, _a[prefixCls + "-has-trigger"] = collapsible && trigger !== null && !zeroWidthTrigger, _a[prefixCls + "-below"] = !!this.state.below, _a[prefixCls + "-zero-width"] = parseFloat(siderWidth) === 0, _a));
    return React.createElement("div", __assign({
      className: siderCls
    }, divProps, {
      style: divStyle
    }), React.createElement("div", {
      className: prefixCls + "-children"
    }, this.props.children), collapsible || this.state.below && zeroWidthTrigger ? triggerDom : null);
  };

  Sider.__FISHD_LAYOUT_SIDER = true;
  Sider.defaultProps = {
    prefixCls: 'fishd-layout-sider',
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 160,
    collapsedWidth: 64,
    style: {},
    theme: 'dark'
  };
  Sider.childContextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };
  Sider.contextTypes = {
    siderHook: PropTypes.object
  };
  return Sider;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(Sider);
var _default = Sider;
exports.default = _default;