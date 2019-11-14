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
import Input from './Input';
import Icon from '../Icon';
import Button from '../Button';

var Search =
/** @class */
function (_super) {
  __extends(Search, _super);

  function Search() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.onSearch = function (e) {
      var _a = _this.props,
          onSearch = _a.onSearch,
          disabled = _a.disabled;

      if (disabled) {
        return false;
      }

      if (onSearch) {
        onSearch(_this.input.input.value, e);
      }

      _this.input.focus();
    };

    _this.saveInput = function (node) {
      _this.input = node;
    };

    return _this;
  }

  Search.prototype.focus = function () {
    this.input.focus();
  };

  Search.prototype.blur = function () {
    this.input.blur();
  };

  Search.prototype.getButtonOrIcon = function () {
    var _a = this.props,
        enterButton = _a.enterButton,
        prefixCls = _a.prefixCls,
        size = _a.size,
        disabled = _a.disabled;
    var enterButtonAsElement = enterButton;
    var node;

    if (!enterButton) {
      node = React.createElement(Icon, {
        className: prefixCls + "-icon",
        type: "search-line",
        key: "searchIcon"
      });
    } else if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
      node = React.cloneElement(enterButtonAsElement, enterButtonAsElement.type === Button ? {
        className: prefixCls + "-button",
        size: size
      } : {});
    } else {
      node = React.createElement(Button, {
        className: prefixCls + "-button",
        type: "primary",
        size: size,
        disabled: disabled,
        key: "enterButton"
      }, enterButton === true ? React.createElement(Icon, {
        type: "search-line"
      }) : enterButton);
    }

    return React.cloneElement(node, {
      onClick: this.onSearch
    });
  };

  Search.prototype.render = function () {
    var _a;

    var _b = this.props,
        className = _b.className,
        prefixCls = _b.prefixCls,
        inputPrefixCls = _b.inputPrefixCls,
        size = _b.size,
        suffix = _b.suffix,
        enterButton = _b.enterButton,
        others = __rest(_b, ["className", "prefixCls", "inputPrefixCls", "size", "suffix", "enterButton"]);

    delete others.onSearch;
    var buttonOrIcon = this.getButtonOrIcon();
    var searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
    var inputClassName = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-enter-button"] = !!enterButton, _a[prefixCls + "-" + size] = !!size, _a));
    return React.createElement(Input, __assign({
      onPressEnter: this.onSearch
    }, others, {
      size: size,
      className: inputClassName,
      prefixCls: inputPrefixCls,
      suffix: searchSuffix,
      ref: this.saveInput
    }));
  };

  Search.defaultProps = {
    inputPrefixCls: 'fishd-input',
    prefixCls: 'fishd-input-search',
    enterButton: false
  };
  return Search;
}(React.Component);

export default Search;