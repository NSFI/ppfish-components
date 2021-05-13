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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '../Tooltip';
import ResizeObserver from 'resize-observer-polyfill';
import EllipsisText from './EllipsisText';
/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */
// @ts-ignore
var isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;
var Ellipsis = /** @class */ (function (_super) {
    __extends(Ellipsis, _super);
    function Ellipsis() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            text: '',
            targetCount: 0,
            isEllipsisActive: false
        };
        _this.detectEllipsisActive = function (node) {
            _this.setState({
                isEllipsisActive: node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth
            });
        };
        _this.computeLine = function () {
            var lines = _this.props.lines;
            if (lines && !isSupportLineClamp) {
                var text = _this.shadowChildren.innerText || _this.shadowChildren.textContent;
                var lineHeight = parseInt(getComputedStyle(_this.root).lineHeight, 10);
                var targetHeight = lines * lineHeight;
                _this.content.style.height = targetHeight + "px";
                var totalHeight = _this.shadowChildren.offsetHeight;
                var shadowNode = _this.shadow.firstChild;
                if (totalHeight <= targetHeight) {
                    _this.setState({
                        text: text,
                        targetCount: text.length
                    });
                    return;
                }
                // bisection
                var len = text.length;
                var mid = Math.ceil(len / 2);
                var count = _this.bisection(targetHeight, mid, 0, len, text, shadowNode);
                _this.setState({
                    text: text,
                    targetCount: count
                });
            }
        };
        _this.bisection = function (th, m, b, e, text, shadowNode) {
            var suffix = '...';
            var mid = m;
            var end = e;
            var begin = b;
            shadowNode.innerHTML = text.substring(0, mid) + suffix;
            var sh = shadowNode.offsetHeight;
            if (sh <= th) {
                shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
                sh = shadowNode.offsetHeight;
                if (sh > th || mid === begin) {
                    return mid;
                }
                begin = mid;
                if (end - begin === 1) {
                    mid = 1 + begin;
                }
                else {
                    mid = Math.floor((end - begin) / 2) + begin;
                }
                return _this.bisection(th, mid, begin, end, text, shadowNode);
            }
            if (mid - 1 < 0) {
                return mid;
            }
            shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
            sh = shadowNode.offsetHeight;
            if (sh <= th) {
                return mid - 1;
            }
            end = mid;
            mid = Math.floor((end - begin) / 2) + begin;
            return _this.bisection(th, mid, begin, end, text, shadowNode);
        };
        _this.handleRoot = function (n) {
            _this.root = n;
        };
        _this.handleContent = function (n) {
            _this.content = n;
        };
        _this.handleNode = function (n) {
            _this.node = n;
        };
        _this.handleShadow = function (n) {
            _this.shadow = n;
        };
        _this.handleShadowChildren = function (n) {
            _this.shadowChildren = n;
        };
        return _this;
    }
    Ellipsis.prototype.componentDidMount = function () {
        var _this = this;
        if (this.node) {
            this.computeLine();
        }
        // detect ellipsis active in width/lines mode
        if (this.props.width || this.props.lines) {
            var target_1;
            if (this.props.width) {
                target_1 = this.widthNode;
            }
            else if (this.props.lines && isSupportLineClamp) {
                target_1 = this.lineClampNode;
            }
            else {
                return;
            }
            this.detectEllipsisActive(target_1);
            this.resizeObserver = new ResizeObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.target === target_1) {
                        _this.detectEllipsisActive(target_1);
                    }
                });
            });
            this.resizeObserver.observe(target_1);
        }
    };
    Ellipsis.prototype.componentDidUpdate = function (perProps) {
        var _a = this.props, lines = _a.lines, children = _a.children;
        if (lines !== perProps.lines || children !== perProps.children) {
            this.computeLine();
        }
    };
    Ellipsis.prototype.componentWillUnmount = function () {
        this.resizeObserver && this.resizeObserver.disconnect();
    };
    Ellipsis.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.state, text = _b.text, targetCount = _b.targetCount, isEllipsisActive = _b.isEllipsisActive;
        var _c = this.props, children = _c.children, lines = _c.lines, length = _c.length, width = _c.width, className = _c.className, tooltip = _c.tooltip, style = _c.style, fullWidthRecognition = _c.fullWidthRecognition, prefix = _c.prefix, tooltipProps = _c.tooltipProps, restProps = __rest(_c, ["children", "lines", "length", "width", "className", "tooltip", "style", "fullWidthRecognition", "prefix", "tooltipProps"]);
        var cls = classNames(prefix + "-ellipsis", className, (_a = {},
            _a[prefix + "-width-mode"] = width,
            _a[prefix + "-line"] = lines && !isSupportLineClamp,
            _a[prefix + "-lineClamp"] = lines && isSupportLineClamp,
            _a));
        // 一种限制都没有返回原值
        if (!lines && !length && !width) {
            return (React.createElement("span", __assign({ className: cls }, restProps), children));
        }
        // 宽度限制
        if (width) {
            var node = (React.createElement("span", __assign({ ref: function (node) { return (_this.widthNode = node); }, className: cls }, restProps, { style: __assign(__assign({}, style), { maxWidth: width }) }), children));
            return tooltip ? (React.createElement(Tooltip, __assign({}, tooltipProps, { overlayClassName: prefix + "-tooltip", title: isEllipsisActive ? children : null }), node)) : (node);
        }
        // 字数限制
        if (length) {
            return (React.createElement(EllipsisText, __assign({ prefix: prefix, className: cls, tooltipProps: tooltipProps, length: length, text: children || '', tooltip: tooltip, fullWidthRecognition: fullWidthRecognition }, restProps)));
        }
        //行数限制
        var id = "fishd-ellipsis-" + ("" + new Date().getTime() + Math.floor(Math.random() * 100));
        // support document.body.style.webkitLineClamp
        if (isSupportLineClamp) {
            var style_1 = "#" + id + "{-webkit-line-clamp:" + lines + ";-webkit-box-orient: vertical;}";
            var node = (React.createElement("div", __assign({ ref: function (node) { return (_this.lineClampNode = node); }, id: id, className: cls }, restProps),
                React.createElement("style", null, style_1),
                children));
            return tooltip ? (React.createElement(Tooltip, __assign({}, tooltipProps, { overlayClassName: prefix + "-tooltip", title: isEllipsisActive ? children : null }), node)) : (node);
        }
        var childNode = (React.createElement("span", { ref: this.handleNode },
            targetCount > 0 && text.substring(0, targetCount),
            targetCount > 0 && targetCount < text.length && '...'));
        return (React.createElement("div", __assign({}, restProps, { ref: this.handleRoot, className: cls }),
            React.createElement("div", { ref: this.handleContent },
                tooltip ? (React.createElement(Tooltip, { overlayClassName: prefix + "-tooltip", title: text }, childNode)) : (childNode),
                React.createElement("div", { className: prefix + "-shadow", ref: this.handleShadowChildren }, children),
                React.createElement("div", { className: prefix + "-shadow", ref: this.handleShadow },
                    React.createElement("span", null, text)))));
    };
    Ellipsis.defaultProps = {
        prefix: 'fishd-ellipsis',
        fullWidthRecognition: false,
        tooltip: true,
        tooltipProps: {}
    };
    Ellipsis.propTypes = {
        prefix: PropTypes.string,
        lines: PropTypes.number,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        length: PropTypes.number,
        tooltip: PropTypes.bool,
        tooltipProps: PropTypes.object,
        fullWidthRecognition: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        children: PropTypes.node
    };
    return Ellipsis;
}(React.Component));
export default Ellipsis;
