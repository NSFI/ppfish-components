"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _utils = require("../../utils");

var _raf = _interopRequireDefault(require("raf"));

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

var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;

  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

function noop() {}

function getDefaultTarget() {
  return window;
}

var BackTop =
/** @class */
function (_super) {
  __extends(BackTop, _super);

  function BackTop(props) {
    var _this = _super.call(this, props) || this;

    _this.getCurrentScrollTop = function () {
      var getTarget = _this.props.target || getDefaultTarget;
      var targetNode = getTarget();

      if (targetNode === window) {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      }

      return targetNode.scrollTop;
    };

    _this.scrollToTop = function (e) {
      var scrollTop = _this.getCurrentScrollTop();

      var startTime = Date.now();

      var frameFunc = function frameFunc() {
        var timestamp = Date.now();
        var time = timestamp - startTime;

        _this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));

        if (time < 450) {
          (0, _raf.default)(frameFunc);
        }
      };

      (0, _raf.default)(frameFunc);
      (_this.props.onClick || noop)(e);
    };

    _this.handleScroll = function () {
      var _a = _this.props,
          visibilityHeight = _a.visibilityHeight,
          _b = _a.target,
          target = _b === void 0 ? getDefaultTarget : _b;
      var scrollTop = (0, _utils.getScroll)(target(), true);

      _this.setState({
        visible: scrollTop > visibilityHeight
      });
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  BackTop.prototype.setScrollTop = function (value) {
    var getTarget = this.props.target || getDefaultTarget;
    var targetNode = getTarget();

    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    } else {
      targetNode.scrollTop = value;
    }
  };

  BackTop.prototype.componentDidMount = function () {
    var getTarget = this.props.target || getDefaultTarget;
    this.scrollEvent = (0, _utils.addEventListener)(getTarget(), 'scroll', this.handleScroll);
    this.handleScroll();
  };

  BackTop.prototype.componentWillUnmount = function () {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  };

  BackTop.prototype.render = function () {
    var _a = this.props,
        _b = _a.prefixCls,
        prefixCls = _b === void 0 ? 'fishd-back-top' : _b,
        _c = _a.className,
        className = _c === void 0 ? '' : _c,
        children = _a.children;
    var classString = (0, _classnames.default)(prefixCls, className);
    var defaultElement = React.createElement("div", {
      className: prefixCls + "-content"
    }, React.createElement("div", {
      className: prefixCls + "-icon"
    })); // fix https://fb.me/react-unknown-prop

    var divProps = (0, _omit.default)(this.props, ['prefixCls', 'className', 'children', 'visibilityHeight', 'target']);
    var backTopBtn = this.state.visible ? React.createElement("div", __assign({}, divProps, {
      className: classString,
      onClick: this.scrollToTop
    }), children || defaultElement) : null;
    return React.createElement(_rcAnimate.default, {
      component: "",
      transitionName: "fade"
    }, backTopBtn);
  };

  BackTop.defaultProps = {
    visibilityHeight: 400
  };
  return BackTop;
}(React.Component);

var _default = BackTop;
exports.default = _default;