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
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
export var getStrFullLength = function (str) {
    if (str === void 0) { str = ''; }
    return str.split('').reduce(function (pre, cur) {
        var charCode = cur.charCodeAt(0);
        if (charCode >= 0 && charCode <= 128) {
            return pre + 1;
        }
        return pre + 2;
    }, 0);
};
export var cutStrByFullLength = function (str, maxLength) {
    if (str === void 0) { str = ''; }
    var showLength = 0;
    return str.split('').reduce(function (pre, cur) {
        var charCode = cur.charCodeAt(0);
        if (charCode >= 0 && charCode <= 128) {
            showLength += 1;
        }
        else {
            showLength += 2;
        }
        if (showLength <= maxLength) {
            return pre + cur;
        }
        return pre;
    }, '');
};
var EllipsisText = function (_a) {
    var prefix = _a.prefix, text = _a.text, length = _a.length, tooltip = _a.tooltip, className = _a.className, fullWidthRecognition = _a.fullWidthRecognition, tooltipProps = _a.tooltipProps, other = __rest(_a, ["prefix", "text", "length", "tooltip", "className", "fullWidthRecognition", "tooltipProps"]);
    if (typeof text !== 'string') {
        throw new Error('Ellipsis children must be string.');
    }
    var textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
    if (textLength <= length || length < 0) {
        return React.createElement("span", __assign({}, other), text);
    }
    var tail = '...';
    var displayText;
    if (length - tail.length <= 0) {
        displayText = '';
    }
    else {
        displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
    }
    if (tooltip) {
        return (React.createElement(Tooltip, __assign({}, tooltipProps, { overlayClassName: prefix + "-tooltip", title: text }),
            React.createElement("span", null,
                displayText,
                tail)));
    }
    return (React.createElement("span", __assign({ className: className }, other),
        displayText,
        tail));
};
EllipsisText.propTypes = {
    prefix: PropTypes.string,
    text: PropTypes.string,
    length: PropTypes.number,
    tooltip: PropTypes.bool,
    fullWidthRecognition: PropTypes.bool,
    tooltipProps: PropTypes.object
};
export default EllipsisText;
