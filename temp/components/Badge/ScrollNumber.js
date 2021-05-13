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
import { createElement, Component } from 'react';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
function getNumberArray(num) {
    return num
        ? num
            .toString()
            .split('')
            .reverse()
            .map(function (i) { return Number(i); })
        : [];
}
var ScrollNumber = /** @class */ (function (_super) {
    __extends(ScrollNumber, _super);
    function ScrollNumber(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            prevProps: props,
            animateStarted: false,
            count: props.count,
            lastCount: props.count,
            nextCount: undefined
        };
        return _this;
    }
    ScrollNumber.getDerivedStateFromProps = function (nextProps, prevState) {
        var newState = { prevProps: nextProps };
        var _a = prevState.prevProps, prevProps = _a === void 0 ? {} : _a;
        if ('count' in nextProps) {
            if (prevProps.count === nextProps.count) {
                return newState;
            }
            return __assign(__assign({}, newState), { animateStarted: true, lastCount: prevProps.count, nextCount: nextProps.count });
        }
    };
    ScrollNumber.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        if ('count' in this.props) {
            if (prevState.animateStarted === false && this.state.animateStarted === true) {
                setTimeout(function () {
                    _this.setState({
                        animateStarted: false,
                        count: _this.state.nextCount
                    }, function () {
                        var onAnimated = _this.props.onAnimated;
                        if (onAnimated) {
                            onAnimated();
                        }
                    });
                }, 5);
            }
        }
    };
    ScrollNumber.prototype.getPositionByNum = function (num, i) {
        if (this.state.animateStarted) {
            return 10 + num;
        }
        var currentDigit = getNumberArray(this.state.count)[i];
        var lastDigit = getNumberArray(this.state.lastCount)[i];
        // 同方向则在同一侧切换数字
        if (this.state.count > this.state.lastCount) {
            if (currentDigit >= lastDigit) {
                return 10 + num;
            }
            return 20 + num;
        }
        if (currentDigit <= lastDigit) {
            return 10 + num;
        }
        return num;
    };
    ScrollNumber.prototype.renderNumberList = function (position) {
        var childrenToReturn = [];
        for (var i = 0; i < 30; i++) {
            var currentClassName = position === i ? 'current' : '';
            childrenToReturn.push(React.createElement("p", { key: i.toString(), className: currentClassName }, i % 10));
        }
        return childrenToReturn;
    };
    ScrollNumber.prototype.renderCurrentNumber = function (num, i) {
        var position = this.getPositionByNum(num, i);
        var removeTransition = this.state.animateStarted || getNumberArray(this.state.lastCount)[i] === undefined;
        return createElement('span', {
            className: this.props.prefixCls + "-only",
            style: {
                transition: removeTransition ? 'none' : undefined,
                msTransform: "translateY(" + -position * 100 + "%)",
                WebkitTransform: "translateY(" + -position * 100 + "%)",
                transform: "translateY(" + -position * 100 + "%)"
            },
            key: i
        }, this.renderNumberList(position));
    };
    ScrollNumber.prototype.renderNumberElement = function () {
        var _this = this;
        var state = this.state;
        if (!state.count || isNaN(state.count)) {
            return state.count;
        }
        return getNumberArray(state.count)
            .map(function (num, i) { return _this.renderCurrentNumber(num, i); })
            .reverse();
    };
    ScrollNumber.prototype.render = function () {
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, title = _a.title, _b = _a.component, component = _b === void 0 ? 'sup' : _b;
        // fix https://fb.me/react-unknown-prop
        var restProps = omit(this.props, ['count', 'onAnimated', 'component', 'prefixCls']);
        var newProps = __assign(__assign({}, restProps), { className: classNames(prefixCls, className), title: title });
        // allow specify the border
        // mock border-color by box-shadow for compatible with old usage:
        // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />
        if (style && style.borderColor) {
            newProps.style.boxShadow = "0 0 0 1px " + style.borderColor + " inset";
        }
        return createElement(component, newProps, this.renderNumberElement());
    };
    ScrollNumber.defaultProps = {
        prefixCls: 'fishd-scroll-number',
        count: null,
        onAnimated: function () { }
    };
    return ScrollNumber;
}(Component));
polyfill(ScrollNumber);
export default ScrollNumber;
