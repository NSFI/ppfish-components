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
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';
import './style/index.less';
import ConfigConsumer from '../Config/Consumer';
var noop = function () { };
var LoadMore = /** @class */ (function (_super) {
    __extends(LoadMore, _super);
    function LoadMore(props) {
        return _super.call(this, props) || this;
    }
    LoadMore.prototype.render = function () {
        var _a = this.props, defaultText = _a.defaultText, onLoadMore = _a.onLoadMore, status = _a.status, buttonSize = _a.buttonSize, loadingText = _a.loadingText, errorText = _a.errorText, endText = _a.endText, extraCls = _a.extraCls, otherProps = __rest(_a, ["defaultText", "onLoadMore", "status", "buttonSize", "loadingText", "errorText", "endText", "extraCls"]);
        return (React.createElement(ConfigConsumer, { componentName: "LoadMore" }, function (Locale) {
            var _a;
            return React.createElement("div", { className: classNames('fishd-loadmore', (_a = {},
                    _a["" + extraCls] = !!extraCls,
                    _a)) }, status === 'end' ? (React.createElement("span", { className: "z-load-end" }, Locale.endText)) : (React.createElement(Button, __assign({ size: buttonSize, onClick: onLoadMore, loading: status === 'loading' }, otherProps), (function () {
                switch (status) {
                    case 'default':
                        return Locale.defaultText;
                        break;
                    case 'loading':
                        return Locale.loadingText;
                        break;
                    case 'error':
                        return Locale.errorText;
                        break;
                    case 'end':
                        return Locale.endText;
                }
            })())));
        }));
    };
    LoadMore.propTypes = {
        onLoadMore: PropTypes.func,
        className: PropTypes.string,
        status: PropTypes.string,
        defaultText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        loadingText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        endText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        extraCls: PropTypes.string,
        buttonSize: PropTypes.string
    };
    LoadMore.defaultProps = {
        onLoadMore: noop,
        status: 'default',
        defaultText: '查看更多',
        loadingText: '加载中',
        errorText: '加载失败，请重试',
        endText: '没有更多了',
        buttonSize: 'default'
    };
    return LoadMore;
}(React.Component));
export default LoadMore;
