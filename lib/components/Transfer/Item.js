"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _PureRenderMixin = _interopRequireDefault(require("../Checkbox/src/PureRenderMixin"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _reactLazyLoad = _interopRequireDefault(require("react-lazy-load"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Item =
/** @class */
function (_super) {
  __extends(Item, _super);

  function Item() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Item.prototype.shouldComponentUpdate = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return _PureRenderMixin["default"].shouldComponentUpdate.apply(this, args);
  };

  Item.prototype.render = function () {
    var _a;

    var _b = this.props,
        mode = _b.mode,
        direction = _b.direction,
        renderedText = _b.renderedText,
        renderedEl = _b.renderedEl,
        item = _b.item,
        lazy = _b.lazy,
        checked = _b.checked,
        prefixCls = _b.prefixCls,
        onClick = _b.onClick,
        onClose = _b.onClose;
    var className = (0, _classnames["default"])((_a = {}, _a[prefixCls + "-content-item"] = true, _a[prefixCls + "-content-item-disabled"] = item.disabled, _a));
    var listItem = React.createElement("li", {
      className: className,
      title: renderedText
    }, React.createElement("span", {
      className: prefixCls + "-content-item-text",
      onClick: item.disabled ? undefined : function () {
        return onClick(item, direction);
      }
    }, mode === 'multiple' ? React.createElement(_Checkbox["default"], {
      checked: checked,
      disabled: item.disabled
    }) : null, React.createElement("span", null, renderedEl)), mode === 'single' && direction === 'right' ? React.createElement("span", {
      className: prefixCls + "-content-item-close",
      onClick: item.disabled ? undefined : function () {
        return onClose(item);
      }
    }, React.createElement(_Icon["default"], {
      type: "close-modal-line"
    })) : null);
    var children = null;

    if (lazy) {
      var lazyProps = __assign({
        height: 32,
        offset: 500,
        throttle: 0,
        debounce: false
      }, lazy);

      children = React.createElement(_reactLazyLoad["default"], __assign({}, lazyProps), listItem);
    } else {
      children = listItem;
    }

    return children;
  };

  return Item;
}(React.Component);

var _default = Item;
exports["default"] = _default;