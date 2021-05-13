var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import RcSlider from './RcSlider';
import RcRange from './RcRange';
import RcHandle from './RcHandle';
import Tooltip from '../Tooltip';
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleTooltipVisible = function (index, visible) {
            _this.setState(function (_a) {
                var _b;
                var visibles = _a.visibles;
                return ({
                    visibles: __assign(__assign({}, visibles), (_b = {}, _b[index] = visible, _b))
                });
            });
        };
        _this.sliderHandle = function (_a) {
            var value = _a.value, dragging = _a.dragging, index = _a.index, restProps = __rest(_a, ["value", "dragging", "index"]);
            var _b = _this.props, tooltipPrefixCls = _b.tooltipPrefixCls, tipFormatter = _b.tipFormatter, _c = _b.tipMode, tipMode = _c === void 0 ? 'default' : _c, handle = _b.handle;
            var visibles = _this.state.visibles;
            var visible = tipFormatter ? visibles[index] || dragging : false;
            if (tipMode === 'all') {
                return React.createElement(RcHandle, __assign({}, restProps, { handle: handle, value: value }));
            }
            return (React.createElement(Tooltip, { prefixCls: tooltipPrefixCls, title: tipFormatter ? tipFormatter(value) : '', visible: visible, placement: "top", transitionName: "zoom-down", key: index, stretch: "minWidth" },
                React.createElement(RcHandle, __assign({}, restProps, { value: value, handle: handle, onMouseEnter: function () { return _this.toggleTooltipVisible(index, true); }, onMouseLeave: function () { return _this.toggleTooltipVisible(index, false); } }))));
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
        var _a = this.props, range = _a.range, restProps = __rest(_a, ["range"]);
        if (range) {
            return React.createElement(RcRange, __assign({}, restProps, { ref: this.saveSlider, handle: this.sliderHandle }));
        }
        return React.createElement(RcSlider, __assign({}, restProps, { ref: this.saveSlider, handle: this.sliderHandle }));
    };
    Slider.defaultProps = {
        prefixCls: 'fishd-slider',
        tooltipPrefixCls: 'fishd-tooltip',
        tipFormatter: function (value) {
            return value.toString();
        }
    };
    return Slider;
}(React.Component));
export default Slider;
