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
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
// Render indicator
var defaultIndicator = null;
function renderIndicator(props) {
    var prefixCls = props.prefixCls, indicator = props.indicator;
    var dotClassName = prefixCls + "-dot";
    if (React.isValidElement(indicator)) {
        return React.cloneElement(indicator, {
            className: classNames(indicator.props.className, dotClassName)
        });
    }
    if (React.isValidElement(defaultIndicator)) {
        return React.cloneElement(defaultIndicator, {
            className: classNames(defaultIndicator.props.className, dotClassName)
        });
    }
    return (React.createElement("span", { className: classNames(dotClassName, prefixCls + "-dot-spin") },
        React.createElement("i", null),
        React.createElement("i", null),
        React.createElement("i", null),
        React.createElement("i", null)));
}
var Spin = /** @class */ (function (_super) {
    __extends(Spin, _super);
    function Spin(props) {
        var _this = _super.call(this, props) || this;
        var spinning = props.spinning;
        _this.state = {
            spinning: spinning
        };
        return _this;
    }
    Spin.setDefaultIndicator = function (indicator) {
        defaultIndicator = indicator;
    };
    Spin.getDerivedStateFromProps = function (nextProps, prevState) {
        var spinning = nextProps.spinning, delay = nextProps.delay;
        if (prevState.spinning !== spinning) {
            if (spinning == false || isNaN(Number(delay)) || delay === 0) {
                // spinning -> false
                // spinning -> true && delay -> falsy
                return __assign(__assign({}, prevState), { spinning: spinning });
            }
        }
        return null;
    };
    Spin.prototype.isNestedPattern = function () {
        return !!(this.props && this.props.children);
    };
    Spin.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, spinning = _a.spinning, delay = _a.delay;
        if (spinning && delay && !isNaN(Number(delay))) {
            this.setState({ spinning: false });
            this.delayTimeout = window.setTimeout(function () { return _this.setState({ spinning: spinning }); }, delay);
        }
    };
    Spin.prototype.componentWillUnmount = function () {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    };
    Spin.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var spinning = this.props.spinning;
        var prevSpinning = prevProps.spinning;
        var delay = this.props.delay;
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (prevSpinning && !spinning) {
            this.debounceTimeout = window.setTimeout(function () { return _this.setState({ spinning: spinning }); }, 200);
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        }
        else {
            if (spinning && delay && !isNaN(Number(delay))) {
                if (this.delayTimeout) {
                    clearTimeout(this.delayTimeout);
                }
                this.delayTimeout = window.setTimeout(function () { return _this.setState({ spinning: spinning }); }, delay);
            }
            else if (spinning !== this.state.spinning) {
                this.setState({ spinning: spinning });
            }
        }
    };
    Spin.prototype.render = function () {
        var _a, _b;
        var _c = this.props, className = _c.className, size = _c.size, prefixCls = _c.prefixCls, tip = _c.tip, wrapperClassName = _c.wrapperClassName, restProps = __rest(_c, ["className", "size", "prefixCls", "tip", "wrapperClassName"]);
        var spinning = this.state.spinning;
        var spinClassName = classNames(prefixCls, (_a = {},
            _a[prefixCls + "-sm"] = size === 'small',
            _a[prefixCls + "-lg"] = size === 'large',
            _a[prefixCls + "-spinning"] = spinning,
            _a[prefixCls + "-show-text"] = !!tip,
            _a), className);
        // fix https://fb.me/react-unknown-prop
        var divProps = omit(restProps, ['spinning', 'delay', 'indicator']);
        var spinElement = (React.createElement("div", __assign({}, divProps, { className: spinClassName }),
            renderIndicator(this.props),
            tip ? React.createElement("span", { className: prefixCls + "-text" }, tip) : null));
        if (this.isNestedPattern()) {
            var animateClassName = prefixCls + '-nested-loading';
            if (wrapperClassName) {
                animateClassName += ' ' + wrapperClassName;
            }
            var nestedClassName = classNames((_b = {},
                _b[prefixCls + "-nested"] = true,
                _b[prefixCls + "-blur"] = spinning,
                _b));
            return (React.createElement(Animate, __assign({}, divProps, { component: "div", className: animateClassName, style: null, transitionName: "fade" }),
                spinning && React.createElement("div", { key: "loading" }, spinElement),
                React.createElement("div", { className: nestedClassName, key: "nested" }, this.props.children)));
        }
        return spinElement;
    };
    Spin.defaultProps = {
        prefixCls: 'fishd-spin',
        spinning: true,
        size: 'default',
        wrapperClassName: ''
    };
    Spin.propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        spinning: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        wrapperClassName: PropTypes.string,
        indicator: PropTypes.node
    };
    return Spin;
}(React.Component));
polyfill(Spin);
export default Spin;
