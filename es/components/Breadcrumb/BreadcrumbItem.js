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
import PropTypes from 'prop-types';

var BreadcrumbItem =
/** @class */
function (_super) {
  __extends(BreadcrumbItem, _super);

  function BreadcrumbItem() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  BreadcrumbItem.prototype.render = function () {
    var _a = this.props,
        prefixCls = _a.prefixCls,
        separator = _a.separator,
        children = _a.children,
        maxWidth = _a.maxWidth,
        restProps = __rest(_a, ["prefixCls", "separator", "children", "maxWidth"]);

    var link = null;

    if ('href' in this.props) {
      link = React.createElement("a", __assign({
        className: prefixCls + "-link",
        style: maxWidth != undefined ? {
          'maxWidth': maxWidth
        } : null
      }, restProps), children);
    } else {
      link = React.createElement("span", __assign({
        className: prefixCls + "-link",
        style: maxWidth != undefined ? {
          'maxWidth': maxWidth
        } : null
      }, restProps), children);
    }

    if (children) {
      return React.createElement("span", null, link, React.createElement("span", {
        className: prefixCls + "-separator"
      }, separator));
    }

    return null;
  };

  BreadcrumbItem.__FISHD_BREADCRUMB_ITEM = true;
  BreadcrumbItem.defaultProps = {
    prefixCls: 'fishd-breadcrumb',
    separator: '/'
  };
  BreadcrumbItem.propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    href: PropTypes.string,
    maxWidth: PropTypes.number
  };
  return BreadcrumbItem;
}(React.Component);

export default BreadcrumbItem;