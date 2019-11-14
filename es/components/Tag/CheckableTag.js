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

var CheckableTag =
/** @class */
function (_super) {
  __extends(CheckableTag, _super);

  function CheckableTag() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.handleClick = function () {
      var _a = _this.props,
          checked = _a.checked,
          onChange = _a.onChange;

      if (onChange) {
        onChange(!checked);
      }
    };

    return _this;
  }

  CheckableTag.prototype.render = function () {
    var _a;

    var _b = this.props,
        _c = _b.prefixCls,
        prefixCls = _c === void 0 ? 'fishd-tag' : _c,
        className = _b.className,
        checked = _b.checked,
        restProps = __rest(_b, ["prefixCls", "className", "checked"]);

    var cls = classNames(prefixCls, (_a = {}, _a[prefixCls + "-checkable"] = true, _a[prefixCls + "-checkable-checked"] = checked, _a), className);
    delete restProps.onChange; // TypeScript cannot check delete now.

    return React.createElement("div", __assign({}, restProps, {
      className: cls,
      onClick: this.handleClick
    }));
  };

  return CheckableTag;
}(React.Component);

export default CheckableTag;