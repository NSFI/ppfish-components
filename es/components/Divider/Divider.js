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

import React from 'react';
import classNames from 'classnames';
export default function Divider(_a) {
  var _b;

  var _c = _a.prefixCls,
      prefixCls = _c === void 0 ? 'fishd' : _c,
      _d = _a.type,
      type = _d === void 0 ? 'horizontal' : _d,
      _e = _a.orientation,
      orientation = _e === void 0 ? '' : _e,
      className = _a.className,
      children = _a.children,
      dashed = _a.dashed,
      textStyle = _a.textStyle,
      restProps = __rest(_a, ["prefixCls", "type", "orientation", "className", "children", "dashed", "textStyle"]);

  var orientationPrefix = orientation.length > 0 ? '-' + orientation : orientation;
  var classString = classNames(className, prefixCls + "-divider", prefixCls + "-divider-" + type, (_b = {}, _b[prefixCls + "-divider-with-text" + orientationPrefix] = children, _b[prefixCls + "-divider-dashed"] = dashed, _b)); //纵向文字仅支持字符串格式

  var verticalText = type === 'vertical' && children && children.toString().split('').map(function (text, i) {
    return React.createElement("span", {
      className: prefixCls + "-divider-vertical-child",
      key: i
    }, text);
  });
  return React.createElement("div", __assign({
    className: classString
  }, restProps), children && React.createElement("span", {
    className: prefixCls + "-divider-inner-text",
    style: textStyle
  }, verticalText ? verticalText : children));
}