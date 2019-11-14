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

import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

var TextLoading = function TextLoading(props) {
  var _a = props.text,
      text = _a === void 0 ? '加载中' : _a,
      _b = props.className,
      className = _b === void 0 ? '' : _b,
      _c = props.prefixCls,
      prefixCls = _c === void 0 ? 'fishd-spin' : _c;
  var otherProps = omit(props, ['className', 'prefixCls']);
  var classString = classNames(prefixCls + "-text-loading", className);
  return React.createElement("div", __assign({}, otherProps, {
    className: classString
  }), text, React.createElement("span", {
    className: prefixCls + "-text-loading-dot"
  }, React.createElement("i", null, ".")));
};

export default TextLoading;