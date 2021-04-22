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
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../Icon';
import classNames from 'classnames';
function noop() { }
function getDataOrAriaProps(props) {
    return Object.keys(props).reduce(function (prev, key) {
        if ((key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') &&
            key.substr(0, 7) !== 'data-__') {
            prev[key] = props[key];
        }
        return prev;
    }, {});
}
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClose = function (e) {
            e.preventDefault();
            var dom = ReactDOM.findDOMNode(_this);
            dom.style.height = dom.offsetHeight + "px";
            // Magic code
            // 重复一次后才能正确设置 height
            dom.style.height = dom.offsetHeight + "px";
            _this.setState({
                closing: false
            });
            (_this.props.onClose || noop)(e);
        };
        _this.animationEnd = function () {
            _this.setState({
                closed: true,
                closing: true
            });
            (_this.props.afterClose || noop)();
        };
        _this.state = {
            closing: true,
            closed: false
        };
        return _this;
    }
    Alert.prototype.render = function () {
        var _a;
        var _b = this.props, closable = _b.closable, description = _b.description, type = _b.type, _c = _b.prefixCls, prefixCls = _c === void 0 ? 'fishd-alert' : _c, message = _b.message, closeText = _b.closeText, showIcon = _b.showIcon, banner = _b.banner, _d = _b.className, className = _d === void 0 ? '' : _d, style = _b.style, iconType = _b.iconType;
        // banner模式默认有 Icon
        showIcon = banner && showIcon === undefined ? true : showIcon;
        // banner模式默认为警告
        type = banner && type === undefined ? 'warning' : type || 'info';
        if (!iconType) {
            switch (type) {
                case 'success':
                    iconType = 'hints-success';
                    break;
                case 'info':
                    iconType = 'hints-notification';
                    break;
                case 'error':
                    iconType = 'hints-error';
                    break;
                case 'warning':
                    iconType = 'hints-warning';
                    break;
                // 展示空icon
                default:
                    iconType = 'default';
            }
            // use outline icon in alert with description
            if (description) {
                iconType += '-o';
            }
        }
        var alertCls = classNames(prefixCls, (_a = {},
            _a[prefixCls + "-" + type] = true,
            _a[prefixCls + "-close"] = !this.state.closing,
            _a[prefixCls + "-with-description"] = !!description,
            _a[prefixCls + "-no-icon"] = !showIcon,
            _a[prefixCls + "-banner"] = !!banner,
            _a), className);
        // closeable when closeText is assigned
        if (closeText) {
            closable = true;
        }
        var closeIcon = closable ? (React.createElement("a", { onClick: this.handleClose, className: prefixCls + "-close-icon" }, closeText || React.createElement(Icon, { type: "close-modal-line" }))) : null;
        var dataOrAriaProps = getDataOrAriaProps(this.props);
        return this.state.closed ? null : (React.createElement(Animate, { component: "", showProp: "data-show", transitionName: prefixCls + "-slide-up", onEnd: this.animationEnd },
            React.createElement("div", __assign({ "data-show": this.state.closing, className: alertCls, style: style }, dataOrAriaProps),
                showIcon ? React.createElement(Icon, { className: prefixCls + "-icon", type: iconType }) : null,
                React.createElement("span", { className: prefixCls + "-message" }, message),
                React.createElement("span", { className: prefixCls + "-description" }, description),
                closeIcon)));
    };
    return Alert;
}(React.Component));
export default Alert;
