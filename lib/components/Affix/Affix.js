"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _omit = _interopRequireDefault(require("omit.js"));

var _throttleByAnimationFrame = require("../../utils/throttleByAnimationFrame");

require("./style/index.less");

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

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//获取target在屏幕上的绝对定位
function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() : {
    top: 0,
    left: 0,
    bottom: 0
  };
} //获取target的滚动距离


function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  var prop = top ? 'pageYOffset' : 'pageXOffset';
  var method = top ? 'scrollTop' : 'scrollLeft';
  var isWindow = target === window;
  var ret = isWindow ? target[prop] : target[method]; // ie6,7,8 standard mode

  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
} //获取elem的宽高以及在target节点的的top、left距离值


function getOffset(element, target) {
  var elemRect = element.getBoundingClientRect();
  var targetRect = getTargetRect(target);
  var scrollTop = getScroll(target, true);
  var scrollLeft = getScroll(target, false);
  var docElem = window.document.body;
  var clientTop = docElem.clientTop || 0;
  var clientLeft = docElem.clientLeft || 0;
  return {
    top: elemRect.top - targetRect.top + scrollTop - clientTop,
    left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height
  };
}

function noop() {}

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

var Affix =
/** @class */
function (_super) {
  __extends(Affix, _super);

  function Affix() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
    _this.eventHandlers = {};
    _this.state = {
      affixStyle: undefined,
      placeholderStyle: undefined
    };

    _this.saveFixedNode = function (node) {
      _this.fixedNode = node;
    };

    _this.savePlaceholderNode = function (node) {
      _this.placeholderNode = node;
    };

    return _this;
  } //设置fixed的元素的样式


  Affix.prototype.setAffixStyle = function (e, affixStyle) {
    var _this = this;

    var _a = this.props,
        _b = _a.onChange,
        onChange = _b === void 0 ? noop : _b,
        _c = _a.target,
        target = _c === void 0 ? getDefaultTarget : _c;
    var originalAffixStyle = this.state.affixStyle;
    var isWindow = target() === window;

    if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
      return;
    }

    if ((0, _shallowequal.default)(affixStyle, originalAffixStyle)) {
      return;
    }

    this.setState({
      affixStyle: affixStyle
    }, function () {
      var affixed = !!_this.state.affixStyle;

      if (affixStyle && !originalAffixStyle || !affixStyle && originalAffixStyle) {
        onChange(affixed);
      }
    });
  }; //设置占位元素的样式


  Affix.prototype.setPlaceholderStyle = function (placeholderStyle) {
    var originalPlaceholderStyle = this.state.placeholderStyle;

    if ((0, _shallowequal.default)(placeholderStyle, originalPlaceholderStyle)) {
      return;
    }

    this.setState({
      placeholderStyle: placeholderStyle
    });
  }; //同步占位元素的样式


  Affix.prototype.syncPlaceholderStyle = function (e) {
    var affixStyle = this.state.affixStyle;

    if (!affixStyle) {
      return;
    }

    this.placeholderNode.style.cssText = '';
    this.setAffixStyle(e, __assign(__assign({}, affixStyle), {
      width: this.placeholderNode.offsetWidth
    }));
    this.setPlaceholderStyle({
      width: this.placeholderNode.offsetWidth
    });
  }; //滚动以及window.resize监听处理方法


  Affix.prototype.updatePosition = function (e) {
    var _a = this.props,
        offsetTop = _a.offsetTop,
        offsetBottom = _a.offsetBottom,
        offset = _a.offset,
        _b = _a.target,
        target = _b === void 0 ? getDefaultTarget : _b;
    var targetNode = target(); // Backwards support
    // Fix: if offsetTop === 0, it will get undefined,
    //   if offsetBottom is type of number, offsetMode will be { top: false, ... }

    offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop;
    var scrollTop = getScroll(targetNode, true);
    var affixNode = ReactDOM.findDOMNode(this);
    var elemOffset = getOffset(affixNode, targetNode);
    var elemSize = {
      width: this.fixedNode.offsetWidth,
      height: this.fixedNode.offsetHeight
    };
    var offsetMode = {
      top: false,
      bottom: false
    }; // Default to `offsetTop=0`.

    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }

    var targetRect = getTargetRect(targetNode);
    var targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;

    if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
      // Fixed Top
      var width = elemOffset.width;
      var top_1 = targetRect.top + offsetTop;
      this.setAffixStyle(e, {
        position: 'fixed',
        top: top_1,
        left: targetRect.left + elemOffset.left,
        width: width
      });
      this.setPlaceholderStyle({
        width: width,
        height: elemSize.height
      });
    } else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight && offsetMode.bottom) {
      // Fixed Bottom
      var targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
      var width = elemOffset.width;
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffet + offsetBottom,
        left: targetRect.left + elemOffset.left,
        width: width
      });
      this.setPlaceholderStyle({
        width: width,
        height: elemOffset.height
      });
    } else {
      var affixStyle = this.state.affixStyle;

      if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
        this.setAffixStyle(e, __assign(__assign({}, affixStyle), {
          width: affixNode.offsetWidth
        }));
      } else {
        this.setAffixStyle(e, null);
      }

      this.setPlaceholderStyle(null);
    }

    if (e.type === 'resize') {
      this.syncPlaceholderStyle(e);
    }
  };

  Affix.prototype.componentDidMount = function () {
    var _this = this;

    var target = this.props.target || getDefaultTarget; // Wait for parent component ref has its value

    this.timeout = setTimeout(function () {
      _this.setTargetEventListeners(target);
    });
  };

  Affix.prototype.componentDidUpdate = function (prevProps) {
    if (this.props.target !== prevProps.target) {
      this.clearEventListeners();
      this.setTargetEventListeners(this.props.target); // Mock Event object.

      this.updatePosition({});
    }

    if (this.props.offsetTop !== prevProps.offsetTop || this.props.offsetBottom !== prevProps.offsetBottom) {
      this.updatePosition({});
    }
  };

  Affix.prototype.componentWillUnmount = function () {
    this.clearEventListeners();
    clearTimeout(this.timeout);
    this.updatePosition.cancel();
  };

  Affix.prototype.setTargetEventListeners = function (getTarget) {
    var _this = this;

    var target = getTarget();

    if (!target) {
      return;
    }

    this.clearEventListeners();
    this.events.forEach(function (eventName) {
      _this.eventHandlers[eventName] = (0, _utils.addEventListener)(target, eventName, _this.updatePosition);
    });
  };

  Affix.prototype.clearEventListeners = function () {
    var _this = this;

    this.events.forEach(function (eventName) {
      var handler = _this.eventHandlers[eventName];

      if (handler && handler.remove) {
        handler.remove();
      }
    });
  };

  Affix.prototype.render = function () {
    var _a;

    var className = (0, _classnames.default)((_a = {}, _a[this.props.prefixCls || 'fishd-affix'] = this.state.affixStyle, _a));
    var props = (0, _omit.default)(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);

    var placeholderStyle = __assign(__assign({}, this.state.placeholderStyle), this.props.style);

    return React.createElement("div", __assign({}, props, {
      style: placeholderStyle,
      ref: this.savePlaceholderNode
    }), React.createElement("div", {
      className: className,
      ref: this.saveFixedNode,
      style: this.state.affixStyle
    }, this.props.children));
  };

  Affix.propTypes = {
    offsetTop: _propTypes.default.number,
    offsetBottom: _propTypes.default.number,
    target: _propTypes.default.func
  };

  __decorate([(0, _throttleByAnimationFrame.throttleByAnimationFrameDecorator)()], Affix.prototype, "updatePosition", null);

  return Affix;
}(React.Component);

var _default = Affix;
exports.default = _default;