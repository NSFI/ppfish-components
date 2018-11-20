var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from '../Grid';
export const Meta = (props) => {
    const { prefixCls = 'fishd-list', className, avatar, title, description } = props, others = __rest(props, ["prefixCls", "className", "avatar", "title", "description"]);
    const classString = classNames(`${prefixCls}-item-meta`, className);
    const content = (React.createElement("div", { className: `${prefixCls}-item-meta-content` },
        title && React.createElement("h4", { className: `${prefixCls}-item-meta-title` }, title),
        description && React.createElement("div", { className: `${prefixCls}-item-meta-description` }, description)));
    return (React.createElement("div", Object.assign({}, others, { className: classString }),
        avatar && React.createElement("div", { className: `${prefixCls}-item-meta-avatar` }, avatar),
        (title || description) && content));
};
function getGrid(grid, t) {
    return grid[t] && Math.floor(24 / grid[t]);
}
const GridColumns = ['', 1, 2, 3, 4, 6, 8, 12, 24];
export default class Item extends React.Component {
    render() {
        const { grid } = this.context;
        const _a = this.props, { prefixCls = 'fishd-list', children, actions, extra, className } = _a, others = __rest(_a, ["prefixCls", "children", "actions", "extra", "className"]);
        const classString = classNames(`${prefixCls}-item`, className);
        const metaContent = [];
        const otherContent = [];
        React.Children.forEach(children, (element) => {
            if (element && element.type && element.type === Meta) {
                metaContent.push(element);
            }
            else {
                otherContent.push(element);
            }
        });
        const contentClassString = classNames(`${prefixCls}-item-content`, {
            [`${prefixCls}-item-content-single`]: (metaContent.length < 1),
        });
        const content = otherContent.length > 0 ? (React.createElement("div", { className: contentClassString }, otherContent)) : null;
        let actionsContent;
        if (actions && actions.length > 0) {
            const actionsContentItem = (action, i) => (React.createElement("li", { key: `${prefixCls}-item-action-${i}` },
                action,
                i !== (actions.length - 1) && React.createElement("em", { className: `${prefixCls}-item-action-split` })));
            actionsContent = (React.createElement("ul", { className: `${prefixCls}-item-action` }, actions.map((action, i) => actionsContentItem(action, i))));
        }
        const extraContent = (React.createElement("div", { className: `${prefixCls}-item-extra-wrap` },
            React.createElement("div", { className: `${prefixCls}-item-main` },
                metaContent,
                content,
                actionsContent),
            React.createElement("div", { className: `${prefixCls}-item-extra` }, extra)));
        const mainContent = grid ? (React.createElement(Col, { span: getGrid(grid, 'column'), xs: getGrid(grid, 'xs'), sm: getGrid(grid, 'sm'), md: getGrid(grid, 'md'), lg: getGrid(grid, 'lg'), xl: getGrid(grid, 'xl'), xxl: getGrid(grid, 'xxl') },
            React.createElement("div", Object.assign({}, others, { className: classString }),
                extra && extraContent,
                !extra && metaContent,
                !extra && content,
                !extra && actionsContent))) : (React.createElement("div", Object.assign({}, others, { className: classString }),
            extra && extraContent,
            !extra && metaContent,
            !extra && content,
            !extra && actionsContent));
        return mainContent;
    }
}
Item.Meta = Meta;
Item.propTypes = {
    column: PropTypes.oneOf(GridColumns),
    xs: PropTypes.oneOf(GridColumns),
    sm: PropTypes.oneOf(GridColumns),
    md: PropTypes.oneOf(GridColumns),
    lg: PropTypes.oneOf(GridColumns),
    xl: PropTypes.oneOf(GridColumns),
    xxl: PropTypes.oneOf(GridColumns),
};
Item.contextTypes = {
    grid: PropTypes.any,
};
