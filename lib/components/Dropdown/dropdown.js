"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _src = _interopRequireDefault(require("./src"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

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

var Dropdown =
/** @class */
function (_super) {
  __extends(Dropdown, _super);

  function Dropdown() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Dropdown.prototype.getTransitionName = function () {
    var _a = this.props,
        _b = _a.placement,
        placement = _b === void 0 ? '' : _b,
        transitionName = _a.transitionName;

    if (transitionName !== undefined) {
      return transitionName;
    }

    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }

    return 'slide-up';
  };

  Dropdown.prototype.componentDidMount = function () {
    var overlay = this.props.overlay;

    if (overlay) {
      var overlayProps = overlay.props;
      (0, _warning["default"])(!overlayProps.mode || overlayProps.mode === 'vertical', "mode=\"" + overlayProps.mode + "\" is not supported for Dropdown's Menu.");
    }
  };

  Dropdown.prototype.render = function () {
    var _a = this.props,
        children = _a.children,
        prefixCls = _a.prefixCls,
        overlayElements = _a.overlay,
        trigger = _a.trigger,
        disabled = _a.disabled;
    var child = React.Children.only(children);
    var overlay = React.Children.only(overlayElements);
    var dropdownTrigger = React.cloneElement(child, {
      className: (0, _classnames["default"])(child.props.className, prefixCls + "-trigger"),
      disabled: disabled
    }); // menu cannot be selectable in dropdown defaultly
    // menu should be focusable in dropdown defaultly

    var _b = overlay.props,
        _c = _b.selectable,
        selectable = _c === void 0 ? false : _c,
        _d = _b.focusable,
        focusable = _d === void 0 ? true : _d;
    var fixedModeOverlay = typeof overlay.type === 'string' ? overlay : React.cloneElement(overlay, {
      mode: 'vertical',
      selectable: selectable,
      focusable: focusable
    });
    var triggerActions = disabled ? [] : trigger;
    var alignPoint;

    if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
      alignPoint = true;
    }

    return React.createElement(_src["default"], __assign({
      alignPoint: alignPoint
    }, this.props, {
      transitionName: this.getTransitionName(),
      trigger: triggerActions,
      overlay: fixedModeOverlay
    }), dropdownTrigger);
  };

  Dropdown.defaultProps = {
    prefixCls: 'fishd-dropdown',
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft'
  };
  return Dropdown;
}(React.Component);

var _default = Dropdown;
exports["default"] = _default;