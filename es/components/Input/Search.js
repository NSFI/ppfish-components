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

var _Input = _interopRequireDefault(require("./Input"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Button = _interopRequireDefault(require("../Button"));

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
      node = React.createElement(_Icon.default, {
        className: prefixCls + "-icon",
        type: "search-line",
        key: "searchIcon"
      });
    } else if (enterButtonAsElement.type === _Button.default || enterButtonAsElement.type === 'button') {
      node = React.cloneElement(enterButtonAsElement, enterButtonAsElement.type === _Button.default ? {
        className: prefixCls + "-button",
        size: size
      } : {});
    } else {
      node = React.createElement(_Button.default, {
        className: prefixCls + "-button",
        type: "primary",
        size: size,
        disabled: disabled,
        key: "enterButton"
      }, enterButton === true ? React.createElement(_Icon.default, {
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
    var inputClassName = (0, _classnames.default)(prefixCls, className, (_a = {}, _a[prefixCls + "-enter-button"] = !!enterButton, _a[prefixCls + "-" + size] = !!size, _a));
    return React.createElement(_Input.default, __assign({
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

var _default = Search;
exports.default = _default;