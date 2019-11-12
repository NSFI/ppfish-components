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

var _classnames = _interopRequireDefault(require("classnames"));

var _TimelineItem = _interopRequireDefault(require("./TimelineItem"));

var _Icon = _interopRequireDefault(require("../Icon"));

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

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var Timeline =
/** @class */
function (_super) {
  __extends(Timeline, _super);

  function Timeline() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Timeline.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        _c = _b.pending,
        pending = _c === void 0 ? null : _c,
        pendingDot = _b.pendingDot,
        children = _b.children,
        className = _b.className,
        reverse = _b.reverse,
        mode = _b.mode,
        restProps = __rest(_b, ["prefixCls", "pending", "pendingDot", "children", "className", "reverse", "mode"]);

    var pendingNode = typeof pending === 'boolean' ? null : pending;
    var classString = (0, _classnames.default)(prefixCls, (_a = {}, _a[prefixCls + "-pending"] = !!pending, _a[prefixCls + "-reverse"] = !!reverse, _a[prefixCls + "-" + mode] = !!mode, _a), className);
    var pendingItem = !!pending ? React.createElement(_TimelineItem.default, {
      pending: !!pending,
      dot: pendingDot || React.createElement(_Icon.default, {
        type: "load-line",
        spinning: true
      })
    }, pendingNode) : null;
    var timeLineItems = !!reverse ? __spreadArrays([pendingItem], React.Children.toArray(children).reverse()) : __spreadArrays(React.Children.toArray(children), [pendingItem]); // Remove falsy items

    var truthyItems = timeLineItems.filter(function (item) {
      return !!item;
    });
    var itemsCount = React.Children.count(truthyItems);
    var lastCls = prefixCls + "-item-last";
    var items = React.Children.map(truthyItems, function (ele, idx) {
      return React.cloneElement(ele, {
        className: (0, _classnames.default)([ele.props.className, !reverse && !!pending ? idx === itemsCount - 2 ? lastCls : '' : idx === itemsCount - 1 ? lastCls : '', mode === 'alternate' ? idx % 2 === 0 ? prefixCls + "-item-left" : prefixCls + "-item-right" : mode === 'right' ? prefixCls + "-item-right" : ''])
      });
    });
    return React.createElement("ul", __assign({}, restProps, {
      className: classString
    }), items);
  };

  Timeline.Item = _TimelineItem.default;
  Timeline.defaultProps = {
    prefixCls: 'fishd-timeline',
    reverse: false,
    mode: ''
  };
  return Timeline;
}(React.Component);

var _default = Timeline;
exports.default = _default;