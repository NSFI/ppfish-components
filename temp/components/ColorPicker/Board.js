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
import Color from './helpers/color';
var WIDTH = 200;
var HEIGHT = 150;
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(props) {
        var _this = _super.call(this, props) || this;
        _this.onBoardMouseDown = function (e) {
            var buttons = e.buttons;
            // only work on left click
            // @see https://developer.mozilla.org/en-US/docs/Web/Events/mousedown
            if (buttons !== 1)
                return;
            _this.removeListeners();
            var x = e.clientX;
            var y = e.clientY;
            _this.pointMoveTo({ x: x, y: y });
            window.addEventListener('mousemove', _this.onBoardDrag);
            window.addEventListener('mouseup', _this.onBoardDragEnd);
        };
        _this.onBoardTouchStart = function (e) {
            if (e.touches.length !== 1) {
                return;
            }
            _this.removeTouchListeners();
            var x = e.targetTouches[0].clientX;
            var y = e.targetTouches[0].clientY;
            _this.pointMoveTo({ x: x, y: y });
            window.addEventListener('touchmove', _this.onBoardTouchMove);
            window.addEventListener('touchend', _this.onBoardTouchEnd);
        };
        _this.onBoardTouchMove = function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            var x = e.targetTouches[0].clientX;
            var y = e.targetTouches[0].clientY;
            _this.pointMoveTo({
                x: x,
                y: y
            });
        };
        _this.onBoardTouchEnd = function () {
            _this.removeTouchListeners();
        };
        _this.onBoardDrag = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.pointMoveTo({
                x: x,
                y: y
            });
        };
        _this.onBoardDragEnd = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.pointMoveTo({
                x: x,
                y: y
            });
            _this.removeListeners();
        };
        _this.getPrefixCls = function () {
            return _this.props.rootPrefixCls + "-board";
        };
        _this.removeTouchListeners = function () {
            window.removeEventListener('touchmove', _this.onBoardTouchMove);
            window.removeEventListener('touchend', _this.onBoardTouchEnd);
        };
        _this.removeListeners = function () {
            window.removeEventListener('mousemove', _this.onBoardDrag);
            window.removeEventListener('mouseup', _this.onBoardDragEnd);
        };
        /**
         * 移动光标位置到
         * @param  {object} pos X Y 全局坐标点
         */
        _this.pointMoveTo = function (pos) {
            var rect = ReactDOM.findDOMNode(_this).getBoundingClientRect();
            var left = pos.x - rect.left;
            var top = pos.y - rect.top;
            var rWidth = rect.width || WIDTH;
            var rHeight = rect.height || HEIGHT;
            left = Math.max(0, left);
            left = Math.min(left, rWidth);
            top = Math.max(0, top);
            top = Math.min(top, rHeight);
            var color = _this.props.color;
            color.saturation = left / rWidth;
            color.brightness = 1 - top / rHeight;
            _this.props.onChange(color);
        };
        return _this;
    }
    Board.prototype.componentWillUnmount = function () {
        this.removeListeners();
        this.removeTouchListeners();
    };
    Board.prototype.render = function () {
        var prefixCls = this.getPrefixCls();
        var color = this.props.color;
        var hueHsv = {
            h: color.hue,
            s: 1,
            v: 1
        };
        var hueColor = new Color(hueHsv).toHexString();
        var xRel = color.saturation * 100;
        var yRel = (1 - color.brightness) * 100;
        return (React.createElement("div", { className: prefixCls },
            React.createElement("div", { className: prefixCls + "-hsv", style: { backgroundColor: hueColor } },
                React.createElement("div", { className: prefixCls + "-value" }),
                React.createElement("div", { className: prefixCls + "-saturation" })),
            React.createElement("span", { style: { left: xRel + "%", top: yRel + "%" } }),
            React.createElement("div", { className: prefixCls + "-handler", onMouseDown: this.onBoardMouseDown, onTouchStart: this.onBoardTouchStart })));
    };
    Board.propTypes = {
        color: PropTypes.object,
        onChange: PropTypes.func,
        rootPrefixCls: PropTypes.string
    };
    return Board;
}(React.Component));
export default Board;
