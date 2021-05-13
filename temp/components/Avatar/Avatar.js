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
import * as ReactDOM from 'react-dom';
import Icon from '../Icon';
import classNames from 'classnames';
var Avatar = /** @class */ (function (_super) {
    __extends(Avatar, _super);
    function Avatar(props) {
        var _this = _super.call(this, props) || this;
        _this.setScale = function () {
            var childrenNode = _this.avatarChildren;
            if (childrenNode) {
                var childrenWidth = childrenNode.offsetWidth;
                var avatarNode = ReactDOM.findDOMNode(_this);
                var avatarWidth = avatarNode.getBoundingClientRect().width;
                // add 4px gap for each side to get better performance
                if (avatarWidth - 8 < childrenWidth) {
                    _this.setState({
                        scale: (avatarWidth - 8) / childrenWidth
                    });
                }
                else {
                    _this.setState({
                        scale: 1
                    });
                }
            }
        };
        _this.handleImgLoadError = function () {
            var onError = _this.props.onError;
            var errorFlag = onError ? onError() : undefined;
            if (errorFlag !== false) {
                _this.setState({ isImgExist: false });
            }
        };
        _this.state = {
            scale: 1,
            isImgExist: true
        };
        return _this;
    }
    Avatar.prototype.componentDidMount = function () {
        this.setScale();
    };
    Avatar.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.children !== this.props.children ||
            (prevState.scale !== this.state.scale && this.state.scale === 1) ||
            prevState.isImgExist !== this.state.isImgExist) {
            this.setScale();
        }
    };
    Avatar.prototype.render = function () {
        var _a, _b;
        var _this = this;
        var _c = this.props, prefixCls = _c.prefixCls, shape = _c.shape, size = _c.size, src = _c.src, icon = _c.icon, className = _c.className, alt = _c.alt, others = __rest(_c, ["prefixCls", "shape", "size", "src", "icon", "className", "alt"]);
        var _d = this.state, isImgExist = _d.isImgExist, scale = _d.scale;
        var sizeCls = classNames((_a = {},
            _a[prefixCls + "-lg"] = size === 'large',
            _a[prefixCls + "-sm"] = size === 'small',
            _a));
        var classString = classNames(prefixCls, className, sizeCls, (_b = {},
            _b[prefixCls + "-" + shape] = shape,
            _b[prefixCls + "-image"] = src && isImgExist,
            _b[prefixCls + "-icon"] = icon,
            _b));
        var sizeStyle = typeof size === 'number'
            ? {
                width: size,
                height: size,
                lineHeight: size + "px",
                fontSize: icon ? size / 2 : 18
            }
            : {};
        var children = this.props.children;
        if (src && isImgExist) {
            children = React.createElement("img", { src: src, onError: this.handleImgLoadError, alt: alt });
        }
        else if (icon) {
            children = React.createElement(Icon, { type: icon });
        }
        else {
            var childrenNode = this.avatarChildren;
            if (childrenNode || scale !== 1) {
                var childrenStyle = {
                    msTransform: "scale(" + scale + ")",
                    WebkitTransform: "scale(" + scale + ")",
                    transform: "scale(" + scale + ")",
                    position: 'absolute',
                    display: 'inline-block',
                    left: "calc(50% - " + Math.round(childrenNode.offsetWidth / 2) + "px)"
                };
                var sizeChildrenStyle = typeof size === 'number'
                    ? {
                        lineHeight: size + "px"
                    }
                    : {};
                children = (React.createElement("span", { className: prefixCls + "-string", ref: function (span) { return (_this.avatarChildren = span); }, style: __assign(__assign({}, sizeChildrenStyle), childrenStyle) }, children));
            }
            else {
                children = (React.createElement("span", { className: prefixCls + "-string", ref: function (span) { return (_this.avatarChildren = span); } }, children));
            }
        }
        return (React.createElement("span", __assign({}, others, { style: __assign(__assign({}, sizeStyle), others.style), className: classString }), children));
    };
    Avatar.defaultProps = {
        prefixCls: 'fishd-avatar',
        shape: 'circle',
        size: 'default'
    };
    return Avatar;
}(React.Component));
export default Avatar;
