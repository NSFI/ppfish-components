"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _RcTooltip = _interopRequireDefault(require("./RcTooltip"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _placements = _interopRequireDefault(require("./placements"));

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

var splitObject = function splitObject(obj, keys) {
  var picked = {};

  var omitted = __assign({}, obj);

  keys.forEach(function (key) {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return {
    picked: picked,
    omitted: omitted
  };
};

var Tooltip =
/** @class */
function (_super) {
  __extends(Tooltip, _super);

  function Tooltip(props) {
    var _this = _super.call(this, props) || this;

    _this.onVisibleChange = function (visible) {
      var onVisibleChange = _this.props.onVisibleChange;

      if (!('visible' in _this.props)) {
        _this.setState({
          visible: _this.isNoTitle() ? false : visible
        });
      }

      if (onVisibleChange && !_this.isNoTitle()) {
        onVisibleChange(visible);
      }
    }; // 动态设置动画点


    _this.onPopupAlign = function (domNode, align) {
      var placements = _this.getPlacements(); // 当前返回的位置


      var placement = Object.keys(placements).filter(function (key) {
        return placements[key].points[0] === align.points[0] && placements[key].points[1] === align.points[1];
      })[0];

      if (!placement) {
        return;
      } // 根据当前坐标设置动画点


      var rect = domNode.getBoundingClientRect();
      var transformOrigin = {
        top: '50%',
        left: '50%'
      };

      if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
        transformOrigin.top = rect.height - align.offset[1] + "px";
      } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
        transformOrigin.top = -align.offset[1] + "px";
      }

      if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
        transformOrigin.left = rect.width - align.offset[0] + "px";
      } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
        transformOrigin.left = -align.offset[0] + "px";
      }

      domNode.style.transformOrigin = transformOrigin.left + " " + transformOrigin.top;
    };

    _this.saveTooltip = function (node) {
      _this.tooltip = node;
    };

    _this.state = {
      visible: !!props.visible || !!props.defaultVisible
    };
    return _this;
  }

  Tooltip.getDerivedStateFromProps = function (nextProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible
      };
    }

    return null;
  };

  Tooltip.prototype.getPopupDomNode = function () {
    return this.tooltip.getPopupDomNode();
  };

  Tooltip.prototype.getPlacements = function () {
    var _a = this.props,
        builtinPlacements = _a.builtinPlacements,
        arrowPointAtCenter = _a.arrowPointAtCenter,
        autoAdjustOverflow = _a.autoAdjustOverflow;
    return builtinPlacements || (0, _placements["default"])({
      arrowPointAtCenter: arrowPointAtCenter,
      verticalArrowShift: 8,
      autoAdjustOverflow: autoAdjustOverflow
    });
  };

  Tooltip.prototype.isHoverTrigger = function () {
    var trigger = this.props.trigger;

    if (!trigger || trigger === 'hover') {
      return true;
    }

    if (Array.isArray(trigger)) {
      return trigger.indexOf('hover') >= 0;
    }

    return false;
  }; // Fix Tooltip won't hide at disabled button
  // mouse events don't trigger at disabled button in Chrome
  // https://github.com/react-component/tooltip/issues/18


  Tooltip.prototype.getDisabledCompatibleChildren = function (element) {
    if ((element.type.__FISHD_BUTTON || element.type === 'button') && element.props.disabled && this.isHoverTrigger()) {
      // Pick some layout related style properties up to span
      // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
      var _a = splitObject(element.props.style, ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex']),
          picked = _a.picked,
          omitted = _a.omitted;

      var spanStyle = __assign(__assign({
        display: 'inline-block'
      }, picked), {
        cursor: 'not-allowed'
      });

      var buttonStyle = __assign(__assign({}, omitted), {
        pointerEvents: 'none'
      });

      var child = (0, React.cloneElement)(element, {
        style: buttonStyle,
        className: null
      });
      return React.createElement("span", {
        style: spanStyle,
        className: element.props.className
      }, child);
    }

    return element;
  };

  Tooltip.prototype.isNoTitle = function () {
    var _a = this.props,
        title = _a.title,
        overlay = _a.overlay;
    return !title && !overlay; // overlay for old version compatibility
  };

  Tooltip.prototype.render = function () {
    var _a;

    var _b = this,
        props = _b.props,
        state = _b.state;

    var prefixCls = props.prefixCls,
        title = props.title,
        overlay = props.overlay,
        openClassName = props.openClassName,
        getPopupContainer = props.getPopupContainer,
        getTooltipContainer = props.getTooltipContainer;
    var children = props.children;
    var visible = state.visible; // Hide tooltip when there is no title

    if (!('visible' in props) && this.isNoTitle()) {
      visible = false;
    }

    var child = this.getDisabledCompatibleChildren(React.isValidElement(children) ? children : React.createElement("span", null, children));
    var childProps = child.props;
    var childCls = (0, _classnames["default"])(childProps.className, (_a = {}, _a[openClassName || prefixCls + "-open"] = true, _a));
    return React.createElement(_RcTooltip["default"], __assign({}, this.props, {
      getTooltipContainer: getPopupContainer || getTooltipContainer,
      ref: this.saveTooltip,
      builtinPlacements: this.getPlacements(),
      overlay: overlay || title || '',
      visible: visible,
      onVisibleChange: this.onVisibleChange,
      onPopupAlign: this.onPopupAlign
    }), visible ? (0, React.cloneElement)(child, {
      className: childCls
    }) : child);
  };

  Tooltip.defaultProps = {
    prefixCls: 'fishd-tooltip',
    placement: 'top',
    transitionName: 'zoom-big-fast',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true
  };
  return Tooltip;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(Tooltip);
var _default = Tooltip;
exports["default"] = _default;