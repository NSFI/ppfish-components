var __extends = this && this.__extends || function () {
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

var __assign = this && this.__assign || function () {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import classNames from 'classnames';

var TimelineItem =
/** @class */
function (_super) {
  __extends(TimelineItem, _super);

  function TimelineItem() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  TimelineItem.prototype.render = function () {
    var _a, _b;

    var _c = this.props,
        prefixCls = _c.prefixCls,
        className = _c.className,
        _d = _c.color,
        color = _d === void 0 ? '' : _d,
        children = _c.children,
        pending = _c.pending,
        dot = _c.dot,
        restProps = __rest(_c, ["prefixCls", "className", "color", "children", "pending", "dot"]);

    var itemClassName = classNames((_a = {}, _a[prefixCls + "-item"] = true, _a[prefixCls + "-item-pending"] = pending, _a), className);
    var dotClassName = classNames((_b = {}, _b[prefixCls + "-item-head"] = true, _b[prefixCls + "-item-head-custom"] = dot, _b[prefixCls + "-item-head-" + color] = true, _b));
    return React.createElement("li", __assign({}, restProps, {
      className: itemClassName
    }), React.createElement("div", {
      className: prefixCls + "-item-tail"
    }), React.createElement("div", {
      className: dotClassName,
      style: {
        borderColor: /blue|red|green/.test(color) ? undefined : color
      }
    }, dot), React.createElement("div", {
      className: prefixCls + "-item-content"
    }, children));
  };

  TimelineItem.defaultProps = {
    prefixCls: 'fishd-timeline',
    color: 'blue',
    pending: false
  };
  return TimelineItem;
}(React.Component);

export default TimelineItem;