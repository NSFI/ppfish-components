"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./style/index.less");

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

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
    return {
      media: mediaQuery,
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };

  window.matchMedia = window.matchMedia || matchMediaPolyfill;
} // Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
// Fix https://github.com/ant-design/ant-design/issues/6560
// Fix https://github.com/ant-design/ant-design/issues/3308


var SlickCarousel = require('react-slick')["default"];

function CustomArrow(props) {
  var className = props.className,
      style = props.style,
      onClick = props.onClick;
  return React.createElement("div", {
    className: className,
    style: __assign(__assign({}, style), {
      display: "flex"
    }),
    onClick: onClick
  });
}

var Carousel =
/** @class */
function (_super) {
  __extends(Carousel, _super);

  function Carousel(props) {
    var _this = _super.call(this, props) || this;

    _this.onWindowResized = function () {
      // Fix https://github.com/ant-design/ant-design/issues/2550
      var autoplay = _this.props.autoplay;

      if (autoplay && _this.slick && _this.slick.innerSlider && _this.slick.innerSlider.autoPlay) {
        _this.slick.innerSlider.autoPlay();
      }
    };

    _this.saveSlick = function (node) {
      _this.slick = node;
    };

    _this.onWindowResized = (0, _debounce["default"])(_this.onWindowResized, 500, {
      leading: false
    });
    return _this;
  }

  Carousel.prototype.componentDidMount = function () {
    var _this = this;

    var _a = this.props,
        autoplay = _a.autoplay,
        autoplaySpeed = _a.autoplaySpeed,
        dotsPosition = _a.dotsPosition,
        dotsTimer = _a.dotsTimer;

    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    } // https://github.com/ant-design/ant-design/issues/7191


    this.innerSlider = this.slick && this.slick.innerSlider;
    this.slickDOM = (0, _reactDom.findDOMNode)(this.slick);

    if (autoplay && dotsTimer) {
      var aniName_1 = dotsPosition == 'left' || dotsPosition == 'right' ? 'dotsAniVertical' : 'dotsAni',
          timerEl = this.slickDOM.querySelector('.timer');
      !!timerEl && timerEl.style.setProperty("--dots-ani", aniName_1 + " " + autoplaySpeed / 1000 + "s infinite");
      this.slickDOM.addEventListener('mouseover', function () {
        var timerEl = _this.slickDOM.querySelector('.timer');

        !!timerEl && timerEl.style.setProperty("--dots-ani", 'none');
      });
      this.slickDOM.addEventListener('mouseout', function () {
        var timerEl = _this.slickDOM.querySelector('.timer');

        !!timerEl && timerEl.style.setProperty("--dots-ani", aniName_1 + " " + autoplaySpeed / 1000 + "s infinite");
      });
    }
  };

  Carousel.prototype.componentWillUnmount = function () {
    var autoplay = this.props.autoplay;

    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
      this.onWindowResized.cancel();
    }
  };

  Carousel.prototype.next = function () {
    this.slick.slickNext();
  };

  Carousel.prototype.prev = function () {
    this.slick.slickPrev();
  };

  Carousel.prototype.goTo = function (slide) {
    this.slick.slickGoTo(slide);
  };

  Carousel.prototype.render = function () {
    var _a = this.props,
        prefixCls = _a.prefixCls,
        className = _a.className,
        style = _a.style,
        dotsPosition = _a.dotsPosition,
        dotsTimer = _a.dotsTimer,
        nextArrow = _a.nextArrow,
        prevArrow = _a.prevArrow,
        centerMode = _a.centerMode,
        centerPadding = _a.centerPadding,
        slidesToShow = _a.slidesToShow,
        restProps = __rest(_a, ["prefixCls", "className", "style", "dotsPosition", "dotsTimer", "nextArrow", "prevArrow", "centerMode", "centerPadding", "slidesToShow"]);

    var cls = (0, _classnames["default"])(prefixCls, prefixCls + "-" + dotsPosition, className);
    var dotsCls = (0, _classnames["default"])('slick-dots', {
      'slick-dots-vertical': dotsPosition == 'left' || dotsPosition == 'right',
      'timer': restProps.autoplay && dotsTimer
    });

    if (restProps.effect === 'fade') {
      restProps.fade = true;
    }

    return React.createElement("div", {
      className: cls,
      style: style
    }, React.createElement(SlickCarousel, __assign({}, restProps, {
      ref: this.saveSlick,
      nextArrow: nextArrow ? nextArrow : React.createElement(CustomArrow, {
        className: "slick-next",
        onClick: this.next
      }),
      prevArrow: prevArrow ? prevArrow : React.createElement(CustomArrow, {
        className: "slick-prev",
        onClick: this.prev
      }),
      centerMode: centerMode,
      centerPadding: centerPadding,
      slidesToShow: slidesToShow,
      dotsClass: dotsCls
    })));
  };

  Carousel.defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'fishd-carousel',
    draggable: false,
    dotsTimer: false,
    autoplaySpeed: 3000,
    dotsPosition: 'bottom',
    centerMode: false,
    centerPadding: '50px',
    slidesToShow: 1
  };
  return Carousel;
}(React.Component);

var _default = Carousel;
exports["default"] = _default;