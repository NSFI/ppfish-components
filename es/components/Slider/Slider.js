"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _RcSlider = _interopRequireDefault(require("./RcSlider"));

var _RcRange = _interopRequireDefault(require("./RcRange"));

var _RcHandle = _interopRequireDefault(require("./RcHandle"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

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

var Slider =
/** @class */
function (_super) {
  __extends(Slider, _super);

  function Slider(props) {
    var _this = _super.call(this, props) || this;

    _this.toggleTooltipVisible = function (index, visible) {
      _this.setState(function (_a) {
        var _b;

        var visibles = _a.visibles;
        return {
          visibles: __assign(__assign({}, visibles), (_b = {}, _b[index] = visible, _b))
        };
      });
    };

    _this.sliderHandle = function (_a) {
      var value = _a.value,
          dragging = _a.dragging,
          index = _a.index,
          restProps = __rest(_a, ["value", "dragging", "index"]);

      var _b = _this.props,
          tooltipPrefixCls = _b.tooltipPrefixCls,
          tipFormatter = _b.tipFormatter,
          _c = _b.tipMode,
          tipMode = _c === void 0 ? "default" : _c,
          handle = _b.handle;
      var visibles = _this.state.visibles;
      var visible = tipFormatter ? visibles[index] || dragging : false;

      if (tipMode === 'all') {
        return React.createElement(_RcHandle.default, __assign({}, restProps, {
          handle: handle,
          value: value
        }));
      }

      return React.createElement(_Tooltip.default, {
        prefixCls: tooltipPrefixCls,
        title: tipFormatter ? tipFormatter(value) : '',
        visible: visible,
        placement: "top",
        transitionName: "zoom-down",
        key: index,
        stretch: "minWidth"
      }, React.createElement(_RcHandle.default, __assign({}, restProps, {
        value: value,
        handle: handle,
        onMouseEnter: function onMouseEnter() {
          return _this.toggleTooltipVisible(index, true);
        },
        onMouseLeave: function onMouseLeave() {
          return _this.toggleTooltipVisible(index, false);
        }
      })));
    };

    _this.saveSlider = function (node) {
      _this.rcSlider = node;
    };

    _this.state = {
      visibles: {}
    };
    return _this;
  }

  Slider.prototype.focus = function () {
    this.rcSlider.focus();
  };

  Slider.prototype.blur = function () {
    this.rcSlider.focus();
  };

  Slider.prototype.render = function () {
    var _a = this.props,
        range = _a.range,
        restProps = __rest(_a, ["range"]);

    if (range) {
      return React.createElement(_RcRange.default, __assign({}, restProps, {
        ref: this.saveSlider,
        handle: this.sliderHandle
      }));
    }

    return React.createElement(_RcSlider.default, __assign({}, restProps, {
      ref: this.saveSlider,
      handle: this.sliderHandle
    }));
  };

  Slider.defaultProps = {
    prefixCls: 'fishd-slider',
    tooltipPrefixCls: 'fishd-tooltip',
    tipFormatter: function tipFormatter(value) {
      return value.toString();
    }
  };
  return Slider;
}(React.Component);

var _default = Slider;
exports.default = _default;