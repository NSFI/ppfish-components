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
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
var Ribbon = /** @class */ (function (_super) {
    __extends(Ribbon, _super);
    function Ribbon(props) {
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
            _this.pointMoveTo({
                x: x,
                y: y
            });
            _this.removeListeners();
        };
        _this.getPrefixCls = function () {
            return _this.props.rootPrefixCls + "-ribbon";
        };
        _this.pointMoveTo = function (coords) {
            var rect = ReactDOM.findDOMNode(_this).getBoundingClientRect();
            var width = rect.width;
            var left = coords.x - rect.left;
            left = Math.max(0, left);
            left = Math.min(left, width);
            var huePercent = left / width;
            var hue = huePercent * 360;
            var color = _this.props.color;
            color.hue = hue;
            _this.props.onChange(color);
        };
        _this.removeListeners = function () {
            window.removeEventListener('mousemove', _this.onDrag);
            window.removeEventListener('mouseup', _this.onDragEnd);
        };
        return _this;
    }
    Ribbon.prototype.componentWillUnmount = function () {
        this.removeListeners();
    };
    Ribbon.prototype.render = function () {
        var prefixCls = this.getPrefixCls();
        var hue = this.props.color.hue;
        var per = (hue / 360) * 100;
        return (React.createElement("div", { className: prefixCls },
            React.createElement("span", { ref: "point", style: { left: per + "%" } }),
            React.createElement("div", { className: prefixCls + "-handler", onMouseDown: this.onMouseDown })));
    };
    Ribbon.propTypes = {
        color: PropTypes.object,
        onChange: PropTypes.func,
        rootPrefixCls: PropTypes.string
    };
    return Ribbon;
}(React.Component));
export default Ribbon;
