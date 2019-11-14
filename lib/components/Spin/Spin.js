"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _omit = _interopRequireDefault(require("omit.js"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
};

// Render indicator
var defaultIndicator = null;

function renderIndicator(props) {
  var prefixCls = props.prefixCls,
      indicator = props.indicator;
  var dotClassName = prefixCls + "-dot";

  if (React.isValidElement(indicator)) {
    return React.cloneElement(indicator, {
      className: (0, _classnames["default"])(indicator.props.className, dotClassName)
    });
  }

  if (React.isValidElement(defaultIndicator)) {
    return React.cloneElement(defaultIndicator, {
      className: (0, _classnames["default"])(defaultIndicator.props.className, dotClassName)
    });
  }

  return React.createElement("span", {
    className: (0, _classnames["default"])(dotClassName, prefixCls + "-dot-spin")
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null));
}

var Spin =
/** @class */
function (_super) {
  __extends(Spin, _super);

  function Spin(props) {
    var _this = _super.call(this, props) || this;

    var spinning = props.spinning;
    _this.state = {
      spinning: spinning
    };
    return _this;
  }

  Spin.setDefaultIndicator = function (indicator) {
    defaultIndicator = indicator;
  };

  Spin.getDerivedStateFromProps = function (nextProps, prevState) {
    var spinning = nextProps.spinning,
        delay = nextProps.delay;

    if (prevState.spinning !== spinning) {
      if (spinning == false || isNaN(Number(delay)) || delay === 0) {
        // spinning -> false
        // spinning -> true && delay -> falsy
        return __assign(__assign({}, prevState), {
          spinning: spinning
        });
      }
    }

    return null;
  };

  Spin.prototype.isNestedPattern = function () {
    return !!(this.props && this.props.children);
  };

  Spin.prototype.componentDidMount = function () {
    var _this = this;

    var _a = this.props,
        spinning = _a.spinning,
        delay = _a.delay;

    if (spinning && delay && !isNaN(Number(delay))) {
      this.setState({
        spinning: false
      });
      this.delayTimeout = window.setTimeout(function () {
        return _this.setState({
          spinning: spinning
        });
      }, delay);
    }
  };

  Spin.prototype.componentWillUnmount = function () {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  };

  Spin.prototype.componentDidUpdate = function (prevProps) {
    var _this = this;

    var spinning = this.props.spinning;
    var prevSpinning = prevProps.spinning;
    var delay = this.props.delay;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    if (prevSpinning && !spinning) {
      this.debounceTimeout = window.setTimeout(function () {
        return _this.setState({
          spinning: spinning
        });
      }, 200);

      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else {
      if (spinning && delay && !isNaN(Number(delay))) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }

        this.delayTimeout = window.setTimeout(function () {
          return _this.setState({
            spinning: spinning
          });
        }, delay);
      } else if (spinning !== this.state.spinning) {
        this.setState({
          spinning: spinning
        });
      }
    }
  };

  Spin.prototype.render = function () {
    var _a, _b;

    var _c = this.props,
        className = _c.className,
        size = _c.size,
        prefixCls = _c.prefixCls,
        tip = _c.tip,
        wrapperClassName = _c.wrapperClassName,
        restProps = __rest(_c, ["className", "size", "prefixCls", "tip", "wrapperClassName"]);

    var spinning = this.state.spinning;
    var spinClassName = (0, _classnames["default"])(prefixCls, (_a = {}, _a[prefixCls + "-sm"] = size === 'small', _a[prefixCls + "-lg"] = size === 'large', _a[prefixCls + "-spinning"] = spinning, _a[prefixCls + "-show-text"] = !!tip, _a), className); // fix https://fb.me/react-unknown-prop

    var divProps = (0, _omit["default"])(restProps, ['spinning', 'delay', 'indicator']);
    var spinElement = React.createElement("div", __assign({}, divProps, {
      className: spinClassName
    }), renderIndicator(this.props), tip ? React.createElement("span", {
      className: prefixCls + "-text"
    }, tip) : null);

    if (this.isNestedPattern()) {
      var animateClassName = prefixCls + '-nested-loading';

      if (wrapperClassName) {
        animateClassName += ' ' + wrapperClassName;
      }

      var nestedClassName = (0, _classnames["default"])((_b = {}, _b[prefixCls + "-nested"] = true, _b[prefixCls + "-blur"] = spinning, _b));
      return React.createElement(_rcAnimate["default"], __assign({}, divProps, {
        component: "div",
        className: animateClassName,
        style: null,
        transitionName: "fade"
      }), spinning && React.createElement("div", {
        key: "loading"
      }, spinElement), React.createElement("div", {
        className: nestedClassName,
        key: "nested"
      }, this.props.children));
    }

    return spinElement;
  };

  Spin.defaultProps = {
    prefixCls: 'fishd-spin',
    spinning: true,
    size: 'default',
    wrapperClassName: ''
  };
  Spin.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    wrapperClassName: PropTypes.string,
    indicator: PropTypes.node
  };
  return Spin;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(Spin);
var _default = Spin;
exports["default"] = _default;