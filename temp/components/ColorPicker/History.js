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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from 'react';
import PropTypes from 'prop-types';
import Color from './helpers/color';
var History = /** @class */ (function (_super) {
    __extends(History, _super);
    function History() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    History.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, colorHistory = _a.colorHistory, maxHistory = _a.maxHistory;
        var renderColors = __spreadArrays(colorHistory);
        if (colorHistory.length < maxHistory) {
            var historyList = Array.from({
                length: maxHistory - colorHistory.length
            });
            renderColors = __spreadArrays(renderColors, historyList);
        }
        return (React.createElement("div", { className: prefixCls + "-history" }, renderColors.map(function (obj, key) {
            if (obj) {
                var props = {};
                if (typeof obj === 'object') {
                    var _a = new Color(obj.color).RGB, r = _a[0], g = _a[1], b = _a[2];
                    var RGBA = [r, g, b];
                    RGBA.push(obj.alpha / 100);
                    props = {
                        key: key,
                        onClick: function () { return _this.props.onHistoryClick(obj); },
                        className: prefixCls + "-history-color",
                        style: { background: "rgba(" + RGBA.join(',') + ")" }
                    };
                }
                else if (typeof obj === 'string') {
                    props = {
                        key: key,
                        onClick: function () { return _this.props.onHistoryClick({ color: obj, alpha: 100 }); },
                        className: prefixCls + "-history-color",
                        style: { background: obj }
                    };
                }
                return React.createElement("span", __assign({}, props));
            }
            else {
                var props = {
                    key: key,
                    className: prefixCls + "-history-color 111"
                };
                return React.createElement("span", __assign({}, props));
            }
        })));
    };
    History.propTypes = {
        colorHistory: PropTypes.array,
        maxHistory: PropTypes.number,
        onHistoryClick: PropTypes.func,
        prefixCls: PropTypes.string
    };
    return History;
}(React.Component));
export default History;
