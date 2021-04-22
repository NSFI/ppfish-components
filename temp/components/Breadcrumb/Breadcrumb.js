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
    var paramsKeys = Object.keys(params).join('|');
    var name = route.breadcrumbName.replace(new RegExp(":(" + paramsKeys + ")", 'g'), function (replacement, key) { return params[key] || replacement; });
    return name;
}
function defaultItemRender(route, params, routes, paths) {
    var isLastItem = routes.indexOf(route) === routes.length - 1;
    var name = getBreadcrumbName(route, params);
    return isLastItem ? React.createElement("span", null, name) : React.createElement("a", { href: "#/" + paths.join('/') }, name);
}
var Breadcrumb = /** @class */ (function (_super) {
    __extends(Breadcrumb, _super);
    function Breadcrumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Breadcrumb.prototype.componentDidMount = function () {
        var props = this.props;
        warning(!('linkRender' in props || 'nameRender' in props), '`linkRender` and `nameRender` are removed, please use `itemRender` instead, ' +
            'see: https://u.ant.design/item-render.');
    };
    Breadcrumb.prototype.render = function () {
        var crumbs;
        var _a = this.props, separator = _a.separator, prefixCls = _a.prefixCls, style = _a.style, className = _a.className, routes = _a.routes, _b = _a.params, params = _b === void 0 ? {} : _b, children = _a.children, _c = _a.itemRender, itemRender = _c === void 0 ? defaultItemRender : _c, maxWidth = _a.maxWidth, size = _a.size;
        if (routes && routes.length > 0) {
            var paths_1 = [];
            crumbs = routes.map(function (route) {
                route.path = route.path || '';
                var path = route.path.replace(/^\//, '');
                Object.keys(params).forEach(function (key) {
                    path = path.replace(":" + key, params[key]);
                });
                if (path) {
                    paths_1.push(path);
                }
                return (React.createElement(BreadcrumbItem, { separator: separator, key: route.breadcrumbName || path, maxWidth: maxWidth }, itemRender(route, params, routes, paths_1)));
            });
        }
        else if (children) {
            crumbs = React.Children.map(children, function (element, index) {
                if (!element) {
                    return element;
                }
                warning(element.type && element.type.__FISHD_BREADCRUMB_ITEM, "Breadcrumb only accepts Breadcrumb.Item as it's children");
                return cloneElement(element, {
                    separator: separator,
                    maxWidth: maxWidth,
                    key: index
                });
            });
        }
        var cls = classNames(className, prefixCls, {
            small: size === 'small'
        });
        return (React.createElement("div", { className: cls, style: style }, crumbs));
    };
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
        nameRender: PropTypes.func
    };
    return Breadcrumb;
}(React.Component));
export default Breadcrumb;
