"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _ScrollNumber = _interopRequireDefault(require("./ScrollNumber"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./style/Badge.less");

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
};

var Badge =
/** @class */
function (_super) {
  __extends(Badge, _super);

  function Badge() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Badge.prototype.render = function () {
    var _a, _b, _c;

    var _d = this.props,
        count = _d.count,
        showZero = _d.showZero,
        prefixCls = _d.prefixCls,
        scrollNumberPrefixCls = _d.scrollNumberPrefixCls,
        overflowCount = _d.overflowCount,
        overflowType = _d.overflowType,
        className = _d.className,
        style = _d.style,
        children = _d.children,
        dot = _d.dot,
        status = _d.status,
        text = _d.text,
        offset = _d.offset,
        title = _d.title,
        restProps = __rest(_d, ["count", "showZero", "prefixCls", "scrollNumberPrefixCls", "overflowCount", "overflowType", "className", "style", "children", "dot", "status", "text", "offset", "title"]);

    var displayCount = count > overflowCount ? overflowType === 'plus' ? overflowCount + "+" : '...' : count;
    var isZero = displayCount === '0' || displayCount === 0;
    var isDot = dot && !isZero || status; // dot mode don't need count

    if (isDot) {
      displayCount = '';
    }

    var isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    var hidden = (isEmpty || isZero && !showZero) && !isDot;
    var statusCls = (0, _classnames.default)((_a = {}, _a[prefixCls + "-status-dot"] = !!status, _a[prefixCls + "-status-" + status] = !!status, _a));
    var scrollNumberCls = (0, _classnames.default)((_b = {}, _b[prefixCls + "-dot"] = isDot, _b[prefixCls + "-count"] = !isDot, _b[prefixCls + "-multiple-words"] = !isDot && count && count.toString && count.toString().length > 1, _b[prefixCls + "-status-" + status] = !!status, _b));
    var badgeCls = (0, _classnames.default)(className, prefixCls, (_c = {}, _c[prefixCls + "-status"] = !!status, _c[prefixCls + "-not-a-wrapper"] = !children, _c));
    var styleWithOffset = offset ? __assign({
      marginLeft: offset[0],
      marginTop: offset[1]
    }, style) : style; // <Badge status="success" />

    if (!children && status) {
      return React.createElement("span", __assign({}, restProps, {
        className: badgeCls,
        style: styleWithOffset
      }), React.createElement("span", {
        className: statusCls
      }), React.createElement("span", {
        className: prefixCls + "-status-text"
      }, text));
    }

    var scrollNumber = hidden ? null : React.createElement(_ScrollNumber.default, {
      prefixCls: scrollNumberPrefixCls,
      "data-show": !hidden,
      className: scrollNumberCls,
      count: displayCount,
      title: title || count,
      style: styleWithOffset,
      key: "scrollNumber"
    });
    var statusText = hidden || !text ? null : React.createElement("span", {
      className: prefixCls + "-status-text"
    }, text);
    return React.createElement("span", __assign({}, restProps, {
      className: badgeCls
    }), children, React.createElement(_rcAnimate.default, {
      component: "",
      showProp: "data-show",
      transitionName: children ? prefixCls + "-zoom" : '',
      transitionAppear: true
    }, scrollNumber), statusText);
  };

  Badge.defaultProps = {
    prefixCls: 'fishd-badge',
    scrollNumberPrefixCls: 'fishd-scroll-number',
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99,
    overflowType: 'plus'
  };
  Badge.propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number
  };
  return Badge;
}(React.Component);

var _default = Badge;
exports.default = _default;