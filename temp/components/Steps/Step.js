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
function isString(str) {
    return typeof str === 'string';
}
var Step = /** @class */ (function (_super) {
    __extends(Step, _super);
    function Step() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Step.prototype.renderIconNode = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, progressDot = _b.progressDot, stepNumber = _b.stepNumber, status = _b.status, title = _b.title, description = _b.description, icon = _b.icon, iconPrefix = _b.iconPrefix, icons = _b.icons;
        var iconNode;
        var iconClassName = classNames(prefixCls + "-icon", iconPrefix + "icon", (_a = {},
            _a[iconPrefix + "icon-" + icon] = icon && isString(icon),
            _a[iconPrefix + "icon-check-line"] = !icon && status === 'finish',
            _a[iconPrefix + "icon-close-tag-line"] = !icon && status === 'error',
            _a));
        var iconDot = React.createElement("span", { className: prefixCls + "-icon-dot" });
        // `progressDot` enjoy the highest priority
        if (progressDot) {
            if (typeof progressDot === 'function') {
                iconNode = (React.createElement("span", { className: prefixCls + "-icon" }, progressDot(iconDot, {
                    index: Number(stepNumber - 1),
                    status: status,
                    title: title,
                    description: description
                })));
            }
            else {
                iconNode = React.createElement("span", { className: prefixCls + "-icon" }, iconDot);
            }
        }
        else if (icon && !isString(icon)) {
            iconNode = React.createElement("span", { className: prefixCls + "-icon" }, icon);
        }
        else if (icons && icons.finish && status === 'finish') {
            iconNode = React.createElement("span", { className: prefixCls + "-icon" }, icons.finish);
        }
        else if (icons && icons.error && status === 'error') {
            iconNode = React.createElement("span", { className: prefixCls + "-icon" }, icons.error);
        }
        else if (icon || status === 'finish' || status === 'error') {
            iconNode = React.createElement("span", { className: iconClassName });
        }
        else {
            iconNode = React.createElement("span", { className: prefixCls + "-icon" }, stepNumber);
        }
        return iconNode;
    };
    Step.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, prefixCls = _b.prefixCls, style = _b.style, itemWidth = _b.itemWidth, _c = _b.status, status = _c === void 0 ? 'wait' : _c, iconPrefix = _b.iconPrefix, icon = _b.icon, wrapperStyle = _b.wrapperStyle, adjustMarginRight = _b.adjustMarginRight, stepNumber = _b.stepNumber, description = _b.description, title = _b.title, progressDot = _b.progressDot, tailContent = _b.tailContent, icons = _b.icons, restProps = __rest(_b, ["className", "prefixCls", "style", "itemWidth", "status", "iconPrefix", "icon", "wrapperStyle", "adjustMarginRight", "stepNumber", "description", "title", "progressDot", "tailContent", "icons"]);
        var classString = classNames(prefixCls + "-item", prefixCls + "-item-" + status, className, (_a = {},
            _a[prefixCls + "-item-custom"] = icon,
            _a));
        var stepItemStyle = __assign({}, style);
        if (itemWidth) {
            stepItemStyle.width = itemWidth;
        }
        if (adjustMarginRight) {
            stepItemStyle.marginRight = adjustMarginRight;
        }
        return (React.createElement("div", __assign({}, restProps, { className: classString, style: stepItemStyle }),
            React.createElement("div", { className: prefixCls + "-item-tail" }, tailContent),
            React.createElement("div", { className: prefixCls + "-item-icon" }, this.renderIconNode()),
            React.createElement("div", { className: prefixCls + "-item-content" },
                React.createElement("div", { className: prefixCls + "-item-title" }, title),
                description && React.createElement("div", { className: prefixCls + "-item-description" }, description))));
    };
    Step.propTypes = {
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        style: PropTypes.object,
        wrapperStyle: PropTypes.object,
        itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        status: PropTypes.string,
        iconPrefix: PropTypes.string,
        icon: PropTypes.node,
        adjustMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        stepNumber: PropTypes.string,
        description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        tailContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        icons: PropTypes.shape({
            finish: PropTypes.node,
            error: PropTypes.node
        })
    };
    return Step;
}(React.Component));
export default Step;
