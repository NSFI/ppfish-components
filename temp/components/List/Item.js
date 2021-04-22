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
import { Col } from '../Grid';
export var Meta = function (props) {
    var _a = props.prefixCls, prefixCls = _a === void 0 ? 'fishd-list' : _a, className = props.className, avatar = props.avatar, title = props.title, description = props.description, others = __rest(props, ["prefixCls", "className", "avatar", "title", "description"]);
    var classString = classNames(prefixCls + "-item-meta", className);
    var content = (React.createElement("div", { className: prefixCls + "-item-meta-content" },
        title && React.createElement("h4", { className: prefixCls + "-item-meta-title" }, title),
        description && React.createElement("div", { className: prefixCls + "-item-meta-description" }, description)));
    return (React.createElement("div", __assign({}, others, { className: classString }),
        avatar && React.createElement("div", { className: prefixCls + "-item-meta-avatar" }, avatar),
        (title || description) && content));
};
function getGrid(grid, t) {
    return grid[t] && Math.floor(24 / grid[t]);
}
var GridColumns = ['', 1, 2, 3, 4, 6, 8, 12, 24];
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.render = function () {
        var _a;
        var grid = this.context.grid;
        var _b = this.props, _c = _b.prefixCls, prefixCls = _c === void 0 ? 'fishd-list' : _c, children = _b.children, actions = _b.actions, extra = _b.extra, className = _b.className, others = __rest(_b, ["prefixCls", "children", "actions", "extra", "className"]);
        var classString = classNames(prefixCls + "-item", className);
        var metaContent = [];
        var otherContent = [];
        React.Children.forEach(children, function (element) {
            if (element && element.type && element.type === Meta) {
                metaContent.push(element);
            }
            else {
                otherContent.push(element);
            }
        });
        var contentClassString = classNames(prefixCls + "-item-content", (_a = {},
            _a[prefixCls + "-item-content-single"] = metaContent.length < 1,
            _a));
        var content = otherContent.length > 0 ? React.createElement("div", { className: contentClassString }, otherContent) : null;
        var actionsContent;
        if (actions && actions.length > 0) {
            var actionsContentItem_1 = function (action, i) { return (React.createElement("li", { key: prefixCls + "-item-action-" + i },
                action,
                i !== actions.length - 1 && React.createElement("em", { className: prefixCls + "-item-action-split" }))); };
            actionsContent = (React.createElement("ul", { className: prefixCls + "-item-action" }, actions.map(function (action, i) { return actionsContentItem_1(action, i); })));
        }
        var extraContent = (React.createElement("div", { className: prefixCls + "-item-extra-wrap" },
            React.createElement("div", { className: prefixCls + "-item-main" },
                metaContent,
                content,
                actionsContent),
            React.createElement("div", { className: prefixCls + "-item-extra" }, extra)));
        var mainContent = grid ? (React.createElement(Col, { span: getGrid(grid, 'column'), xs: getGrid(grid, 'xs'), sm: getGrid(grid, 'sm'), md: getGrid(grid, 'md'), lg: getGrid(grid, 'lg'), xl: getGrid(grid, 'xl'), xxl: getGrid(grid, 'xxl') },
            React.createElement("div", __assign({}, others, { className: classString }),
                extra && extraContent,
                !extra && metaContent,
                !extra && content,
                !extra && actionsContent))) : (React.createElement("div", __assign({}, others, { className: classString }),
            extra && extraContent,
            !extra && metaContent,
            !extra && content,
            !extra && actionsContent));
        return mainContent;
    };
    Item.Meta = Meta;
    Item.propTypes = {
        column: PropTypes.oneOf(GridColumns),
        xs: PropTypes.oneOf(GridColumns),
        sm: PropTypes.oneOf(GridColumns),
        md: PropTypes.oneOf(GridColumns),
        lg: PropTypes.oneOf(GridColumns),
        xl: PropTypes.oneOf(GridColumns),
        xxl: PropTypes.oneOf(GridColumns)
    };
    Item.contextTypes = {
        grid: PropTypes.any
    };
    return Item;
}(React.Component));
export default Item;
