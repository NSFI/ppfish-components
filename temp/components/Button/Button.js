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
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Icon from '../Icon/index';
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}
// Insert one space between two chinese characters automatically.
function insertSpace(child, needInserted) {
    // Check the child if is undefined or null.
    if (child == null) {
        return;
    }
    var SPACE = needInserted ? ' ' : '';
    // strictNullChecks oops.
    if (typeof child !== 'string' &&
        typeof child !== 'number' &&
        isString(child.type) &&
        isTwoCNChar(child.props.children)) {
        return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
    }
    if (typeof child === 'string') {
        if (isTwoCNChar(child)) {
            child = child.split('').join(SPACE);
        }
        return React.createElement("span", null, child);
    }
    return child;
}
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = function (e) {
            // Add click effect
            _this.setState({ clicked: true });
            clearTimeout(_this.timeout);
            _this.timeout = window.setTimeout(function () { return _this.setState({ clicked: false }); }, 500);
            var onClick = _this.props.onClick;
            if (onClick) {
                onClick(e);
            }
        };
        _this.state = {
            loading: props.loading,
            clicked: false,
            hasTwoCNChar: false
        };
        return _this;
    }
    Button.getDerivedStateFromProps = function (nextProps, prevState) {
        if (nextProps.loading instanceof Boolean) {
            return __assign(__assign({}, prevState), { loading: nextProps.loading });
        }
        return null;
    };
    Button.prototype.componentDidMount = function () {
        this.fixTwoCNChar();
    };
    Button.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        this.fixTwoCNChar();
        if (prevProps.loading && typeof prevProps.loading !== 'boolean') {
            clearTimeout(this.delayTimeout);
        }
        var loading = this.props.loading;
        if (loading && typeof loading !== 'boolean' && loading.delay) {
            this.delayTimeout = window.setTimeout(function () { return _this.setState({ loading: loading }); }, loading.delay);
        }
        else if (prevProps.loading === this.props.loading) {
            return;
        }
        else {
            this.setState({ loading: loading });
        }
    };
    Button.prototype.componentWillUnmount = function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    };
    Button.prototype.fixTwoCNChar = function () {
        // Fix for HOC usage like <FormatMessage />
        var node = findDOMNode(this);
        var buttonText = node.textContent || node.innerText;
        if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
            if (!this.state.hasTwoCNChar) {
                this.setState({
                    hasTwoCNChar: true
                });
            }
        }
        else if (this.state.hasTwoCNChar) {
            this.setState({
                hasTwoCNChar: false
            });
        }
    };
    Button.prototype.isNeedInserted = function () {
        var _a = this.props, icon = _a.icon, children = _a.children;
        return React.Children.count(children) === 1 && !icon;
    };
    Button.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, type = _b.type, shape = _b.shape, size = _b.size, className = _b.className, children = _b.children, icon = _b.icon, prefixCls = _b.prefixCls, ghost = _b.ghost, _loadingProp = _b.loading, rest = __rest(_b, ["type", "shape", "size", "className", "children", "icon", "prefixCls", "ghost", "loading"]);
        var _c = this.state, loading = _c.loading, clicked = _c.clicked, hasTwoCNChar = _c.hasTwoCNChar;
        // large => lg
        // small => sm
        var sizeCls = '';
        switch (size) {
            case 'large':
                sizeCls = 'lg';
                break;
            case 'small':
                sizeCls = 'sm';
                break;
            default:
                break;
        }
        var classes = classNames(prefixCls, className, (_a = {},
            _a[prefixCls + "-" + type] = type,
            _a[prefixCls + "-" + shape] = shape,
            _a[prefixCls + "-" + sizeCls] = sizeCls,
            _a[prefixCls + "-icon-only"] = !children && icon,
            _a[prefixCls + "-loading"] = loading,
            _a[prefixCls + "-clicked"] = clicked,
            _a[prefixCls + "-background-ghost"] = ghost,
            _a[prefixCls + "-two-chinese-chars"] = hasTwoCNChar,
            _a));
        var iconType = loading ? 'load-line' : icon;
        var iconNode = iconType ? React.createElement(Icon, { type: iconType, spinning: loading }) : null;
        var kids = children || children === 0
            ? React.Children.map(children, function (child) { return insertSpace(child, _this.isNeedInserted()); })
            : null;
        if ('href' in rest) {
            return (React.createElement("a", __assign({}, rest, { className: classes, onClick: this.handleClick }),
                iconNode,
                kids));
        }
        else {
            // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
            var htmlType = rest.htmlType, otherProps = __rest(rest, ["htmlType"]);
            return (React.createElement("button", __assign({}, otherProps, { type: htmlType || 'button', className: classes, onClick: this.handleClick }),
                iconNode,
                kids));
        }
    };
    Button.__FISHD_BUTTON = true;
    Button.defaultProps = {
        prefixCls: 'fishd-btn',
        loading: false,
        ghost: false
    };
    Button.propTypes = {
        type: PropTypes.string,
        shape: PropTypes.oneOf(['circle', 'circle-outline']),
        size: PropTypes.oneOf(['large', 'default', 'small']),
        htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
        onClick: PropTypes.func,
        loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        className: PropTypes.string,
        icon: PropTypes.string
    };
    return Button;
}(React.Component));
polyfill(Button);
export default Button;
