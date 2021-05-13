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
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
function rgbaColor(r, g, b, a) {
    return "rgba(" + [r, g, b, a / 100].join(',') + ")";
}
var Alpha = /** @class */ (function (_super) {
    __extends(Alpha, _super);
    function Alpha(props) {
        var _this = _super.call(this, props) || this;
        _this.onMouseDown = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.pointMoveTo({
                x: x,
                y: y
            });
            window.addEventListener('mousemove', _this.onDrag);
            window.addEventListener('mouseup', _this.onDragEnd);
        };
        _this.onDrag = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.pointMoveTo({
                x: x,
                y: y
            });
        };
        _this.onDragEnd = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.pointMoveTo({ x: x, y: y });
            _this.removeListeners();
        };
        _this.getBackground = function () {
            var _a = _this.props.color, red = _a.red, green = _a.green, blue = _a.blue;
            var opacityGradient = "linear-gradient(to right, " + rgbaColor(red, green, blue, 0) + " , " + rgbaColor(red, green, blue, 100) + ")";
            return opacityGradient;
        };
        _this.getPrefixCls = function () {
            return _this.props.rootPrefixCls + "-alpha";
        };
        _this.pointMoveTo = function (coords) {
            var rect = findDOMNode(_this).getBoundingClientRect();
            var width = rect.width;
            var left = coords.x - rect.left;
            left = Math.max(0, left);
            left = Math.min(left, width);
            var alpha = Math.round((left / width) * 100);
            _this.props.onChange(alpha);
        };
        _this.removeListeners = function () {
            window.removeEventListener('mousemove', _this.onDrag);
            window.removeEventListener('mouseup', _this.onDragEnd);
        };
        return _this;
    }
    Alpha.prototype.componentWillUnmount = function () {
        this.removeListeners();
    };
    Alpha.prototype.render = function () {
        var prefixCls = this.getPrefixCls();
        return (React.createElement("div", { className: prefixCls },
            React.createElement("div", { ref: "bg", className: prefixCls + "-bg", style: { background: this.getBackground() } }),
            React.createElement("span", { style: { left: this.props.alpha + "%" } }),
            React.createElement("div", { className: prefixCls + "-handler", onMouseDown: this.onMouseDown })));
    };
    Alpha.propTypes = {
        alpha: PropTypes.number,
        color: PropTypes.object,
        onChange: PropTypes.func,
        rootPrefixCls: PropTypes.string
    };
    return Alpha;
}(React.Component));
export default Alpha;
