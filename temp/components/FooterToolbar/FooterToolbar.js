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
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addEventListener } from '../../utils';
var FooterToolbar = /** @class */ (function (_super) {
    __extends(FooterToolbar, _super);
    function FooterToolbar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            offset: 0
        };
        _this.setToolbarPosition = function () {
            var target = _this.props.target;
            var height = getComputedStyle(_this.wrapper).height;
            var wrapperHeight = Number.parseInt(height);
            var targetElement = document.documentElement;
            if (target && typeof target === 'function' && target() !== window) {
                targetElement = target();
            }
            var offsetObj = {
                containerHeight: targetElement.clientHeight,
                containerScrollTop: targetElement.scrollTop
            };
            var offset = offsetObj.containerHeight + offsetObj.containerScrollTop - wrapperHeight;
            var maxOffset = targetElement.scrollHeight - wrapperHeight;
            _this.setState({
                offset: offset > maxOffset ? maxOffset : offset
            });
        };
        return _this;
    }
    FooterToolbar.prototype.componentDidMount = function () {
        var _this = this;
        this.setToolbarPosition();
        var target = (this.props.target && this.props.target()) || window;
        this.scrollListener = addEventListener(target, 'scroll', function () {
            _this.setToolbarPosition();
        });
        this.resizeListener = addEventListener(window, 'resize', function () {
            _this.setToolbarPosition();
        });
    };
    FooterToolbar.prototype.componentWillUnmount = function () {
        if (this.scrollListener) {
            this.scrollListener.remove();
        }
        if (this.resizeListener) {
            this.resizeListener.remove();
        }
    };
    FooterToolbar.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, children = _b.children, className = _b.className, prefixCls = _b.prefixCls, style = _b.style;
        var toolbarStyle = __assign(__assign({}, style), { position: 'absolute', top: this.state.offset });
        return (React.createElement("div", { className: classNames((_a = {}, _a[className] = true, _a[prefixCls] = true, _a)), style: toolbarStyle, ref: function (wrapper) {
                _this.wrapper = wrapper;
            } },
            React.createElement("div", { className: prefixCls + "-inner" }, children)));
    };
    FooterToolbar.defaultProps = {
        children: null,
        className: '',
        prefixCls: 'fishd-footer-toolbar'
    };
    FooterToolbar.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        target: PropTypes.func,
        style: PropTypes.object
    };
    return FooterToolbar;
}(React.Component));
export default FooterToolbar;
