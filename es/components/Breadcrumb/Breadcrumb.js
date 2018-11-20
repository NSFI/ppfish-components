import * as React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import warning from 'warning';
import BreadcrumbItem from './BreadcrumbItem';
import classNames from 'classnames';
import Icon from '../Icon';
function getBreadcrumbName(route, params) {
    if (!route.breadcrumbName) {
        return null;
    }
    const paramsKeys = Object.keys(params).join('|');
    const name = route.breadcrumbName.replace(new RegExp(`:(${paramsKeys})`, 'g'), (replacement, key) => params[key] || replacement);
    return name;
}
function defaultItemRender(route, params, routes, paths) {
    const isLastItem = routes.indexOf(route) === routes.length - 1;
    const name = getBreadcrumbName(route, params);
    return isLastItem
        ? React.createElement("span", null, name)
        : React.createElement("a", { href: `#/${paths.join('/')}` }, name);
}
export default class Breadcrumb extends React.Component {
    componentDidMount() {
        const props = this.props;
        warning(!('linkRender' in props || 'nameRender' in props), '`linkRender` and `nameRender` are removed, please use `itemRender` instead, ' +
            'see: https://u.ant.design/item-render.');
    }
    render() {
        let crumbs;
        const { separator, prefixCls, style, className, routes, params = {}, children, itemRender = defaultItemRender, maxWidth, size } = this.props;
        if (routes && routes.length > 0) {
            const paths = [];
            crumbs = routes.map((route) => {
                route.path = route.path || '';
                let path = route.path.replace(/^\//, '');
                Object.keys(params).forEach(key => {
                    path = path.replace(`:${key}`, params[key]);
                });
                if (path) {
                    paths.push(path);
                }
                return (React.createElement(BreadcrumbItem, { separator: separator, key: route.breadcrumbName || path, maxWidth: maxWidth }, itemRender(route, params, routes, paths)));
            });
        }
        else if (children) {
            crumbs = React.Children.map(children, (element, index) => {
                if (!element) {
                    return element;
                }
                warning(element.type && element.type.__FISHD_BREADCRUMB_ITEM, 'Breadcrumb only accepts Breadcrumb.Item as it\'s children');
                return cloneElement(element, {
                    separator,
                    maxWidth,
                    key: index,
                });
            });
        }
        let cls = classNames(className, prefixCls, {
            'small': size === 'small'
        });
        return (React.createElement("div", { className: cls, style: style }, crumbs));
    }
}
Breadcrumb.defaultProps = {
    prefixCls: 'fishd-breadcrumb',
    separator: React.createElement(Icon, { type: "arrow-line-regular" }),
    size: 'default'
};
Breadcrumb.propTypes = {
    prefixCls: PropTypes.string,
    size: PropTypes.string,
    separator: PropTypes.node,
    routes: PropTypes.array,
    params: PropTypes.object,
    linkRender: PropTypes.func,
    nameRender: PropTypes.func,
};
