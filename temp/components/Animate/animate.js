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
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import AnimateChild from './child';
var noop = function () { };
var FirstChild = function (props) {
    var childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};
var Animate = /** @class */ (function (_super) {
    __extends(Animate, _super);
    function Animate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animate.prototype.normalizeNames = function (names) {
        if (typeof names === 'string') {
            return {
                appear: names + "-appear",
                appearActive: names + "-appear-active",
                enter: names + "-enter",
                enterActive: names + "-enter-active",
                leave: names + "-leave",
                leaveActive: names + "-leave-active",
            };
        }
        if (typeof names === 'object') {
            return {
                appear: names.appear,
                appearActive: names.appear + "-active",
                enter: "" + names.enter,
                enterActive: names.enter + "-active",
                leave: "" + names.leave,
                leaveActive: names.leave + "-active",
            };
        }
    };
    Animate.prototype.render = function () {
        var _this = this;
        var _a = this.props, animation = _a.animation, children = _a.children, animationAppear = _a.animationAppear, singleMode = _a.singleMode, component = _a.component, beforeAppear = _a.beforeAppear, onAppear = _a.onAppear, afterAppear = _a.afterAppear, beforeEnter = _a.beforeEnter, onEnter = _a.onEnter, afterEnter = _a.afterEnter, beforeLeave = _a.beforeLeave, onLeave = _a.onLeave, afterLeave = _a.afterLeave, _b = _a.timeout, timeout = _b === void 0 ? 500 : _b, others = __rest(_a, ["animation", "children", "animationAppear", "singleMode", "component", "beforeAppear", "onAppear", "afterAppear", "beforeEnter", "onEnter", "afterEnter", "beforeLeave", "onLeave", "afterLeave", "timeout"]);
        var animateChildren = Children.map(children, function (child) {
            return (React.createElement(AnimateChild
            // @ts-ignore
            , { 
                // @ts-ignore
                key: child.key, names: _this.normalizeNames(animation), onAppear: beforeAppear, onAppearing: onAppear, onAppeared: afterAppear, onEnter: beforeEnter, onEntering: onEnter, onEntered: afterEnter, onExit: beforeLeave, onExiting: onLeave, onExited: afterLeave, timeout: timeout }, child));
        });
        return (React.createElement(TransitionGroup, __assign({ appear: animationAppear, component: singleMode ? FirstChild : component }, others), animateChildren));
    };
    Animate.propTypes = {
        animation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        animationAppear: PropTypes.bool,
        component: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        singleMode: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
        ]),
        beforeAppear: PropTypes.func,
        onAppear: PropTypes.func,
        afterAppear: PropTypes.func,
        beforeEnter: PropTypes.func,
        onEnter: PropTypes.func,
        afterEnter: PropTypes.func,
        beforeLeave: PropTypes.func,
        onLeave: PropTypes.func,
        afterLeave: PropTypes.func,
        timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    };
    Animate.defaultProps = {
        animationAppear: true,
        component: 'span',
        singleMode: true,
        beforeAppear: noop,
        onAppear: noop,
        afterAppear: noop,
        beforeEnter: noop,
        onEnter: noop,
        afterEnter: noop,
        beforeLeave: noop,
        onLeave: noop,
        afterLeave: noop,
    };
    return Animate;
}(Component));
export default Animate;
