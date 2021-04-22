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
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
var defaultSizeMap = {
    small: {
        width: 90,
        height: 60
    },
    default: {
        width: 150,
        height: 100
    },
    large: {
        width: 240,
        height: 160
    }
};
var Status = {
    PENDING: 'pending',
    LOADING: 'loading',
    LOADED: 'loaded',
    FAILED: 'failed'
};
var noop = function () { };
var ImageLoader = /** @class */ (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader(props) {
        var _this = _super.call(this, props) || this;
        _this.base64Img = function (cls) {
            var placeholderSize = _this.props.placeholderSize;
            var sizeProps = {
                width: '100%'
            };
            if (typeof placeholderSize === 'object') {
                sizeProps = Object.assign({}, sizeProps, placeholderSize);
            }
            else if (['small', 'default', 'large'].indexOf(placeholderSize) > -1) {
                sizeProps = Object.assign({}, sizeProps, defaultSizeMap[placeholderSize]);
            }
            return React.createElement("div", { className: cls, style: __assign({}, sizeProps) });
        };
        _this.state = {
            status: (props.src ? Status.LOADING : Status.PENDING),
            prevProps: props
        };
        return _this;
    }
    ImageLoader.prototype.componentDidMount = function () {
        if (this.state.status === Status.LOADING) {
            this.createLoader();
        }
    };
    ImageLoader.prototype.componentDidUpdate = function () {
        if (this.state.status === Status.LOADING && !this.img) {
            this.createLoader();
        }
    };
    ImageLoader.prototype.componentWillUnmount = function () {
        this.destroyLoader();
    };
    ImageLoader.prototype.getClassName = function () {
        var prefixCls = this.props.prefixCls;
        var className = prefixCls + " " + prefixCls + "-" + this.state.status;
        if (this.props.className) {
            className = className + " " + this.props.className;
        }
        return className;
    };
    ImageLoader.prototype.createLoader = function () {
        this.destroyLoader(); // We can only have one loader at a time.
        this.img = new Image();
        this.img.onload = this.handleLoad.bind(this);
        this.img.onerror = this.handleError.bind(this);
        this.img.src = this.props.src;
    };
    ImageLoader.prototype.destroyLoader = function () {
        if (this.img) {
            this.img.onload = null;
            this.img.onerror = null;
            this.img = null;
        }
    };
    ImageLoader.prototype.handleLoad = function (event) {
        this.destroyLoader();
        this.setState({ status: Status.LOADED });
        if (this.props.onLoad)
            this.props.onLoad(event);
    };
    ImageLoader.prototype.handleError = function (error) {
        this.destroyLoader();
        this.setState({ status: Status.FAILED });
        if (this.props.onError)
            this.props.onError(error);
    };
    ImageLoader.prototype.renderImg = function () {
        var _a = this.props, src = _a.src, imgProps = _a.imgProps;
        var otherProps = omit(imgProps, ['src']);
        return React.createElement("img", __assign({ src: src }, otherProps));
    };
    ImageLoader.prototype.render = function () {
        var _a = this.props, style = _a.style, preLoader = _a.preLoader, failedLoader = _a.failedLoader;
        var wrapperProps = {
            style: {},
            className: this.getClassName()
        };
        if (style) {
            wrapperProps.style = style;
        }
        var content = null;
        switch (this.state.status) {
            case Status.LOADED:
                // 加载成功
                content = this.renderImg();
                break;
            case Status.FAILED:
                // 使用自定义加载失败图片
                if (failedLoader) {
                    if (typeof failedLoader === 'function') {
                        content = failedLoader();
                    }
                    else {
                        content = failedLoader;
                    }
                    // 使用系统预置加载失败图片
                }
                else {
                    content = this.base64Img('failed-img');
                }
                break;
            default:
                // 使用自定义占位图片
                if (preLoader) {
                    if (typeof preLoader === 'function') {
                        content = preLoader();
                    }
                    else {
                        content = preLoader;
                    }
                    // 使用系统预置占位图片
                }
                else {
                    content = this.base64Img('preload-img');
                }
                break;
        }
        return React.createElement("div", __assign({}, wrapperProps), content);
    };
    ImageLoader.propTypes = {
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        placeholderSize: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        style: PropTypes.object,
        preLoader: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        failedLoader: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        src: PropTypes.string,
        onLoad: PropTypes.func,
        onError: PropTypes.func,
        imgProps: PropTypes.object
    };
    ImageLoader.defaultProps = {
        prefixCls: 'fishd-image-loader',
        placeholderSize: 'default',
        onLoad: noop,
        onError: noop
    };
    ImageLoader.getDerivedStateFromProps = function (nextProps, prevState) {
        var _a = prevState.prevProps, prevProps = _a === void 0 ? { src: '' } : _a;
        var newState = { prevProps: nextProps };
        if (prevProps.src !== nextProps.src) {
            newState.status = (nextProps.src ? Status.LOADING : Status.PENDING);
        }
        return newState;
    };
    return ImageLoader;
}(React.Component));
polyfill(ImageLoader);
export default ImageLoader;
