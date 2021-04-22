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
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { supportAni, addClass, removeClass, guid } from '../../utils';
var noop = function () { };
function off(node, eventName, callback, useCapture) {
    if (useCapture === void 0) { useCapture = false; }
    if (node.removeEventListener) {
        node.removeEventListener(eventName, callback, useCapture);
    }
}
function on(node, eventName, callback, useCapture) {
    if (useCapture === void 0) { useCapture = false; }
    if (node.addEventListener) {
        node.addEventListener(eventName, callback, useCapture);
    }
    return {
        off: function () { return off(node, eventName, callback, useCapture); }
    };
}
function getStyleProperty(node, name) {
    var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];
    var style = window.getComputedStyle(node);
    var ret = '';
    for (var i = 0; i < prefixes.length; i++) {
        ret = style.getPropertyValue(prefixes[i] + name);
        if (ret) {
            break;
        }
    }
    return ret;
}
var AnimateChild = /** @class */ (function (_super) {
    __extends(AnimateChild, _super);
    function AnimateChild(props) {
        var _this_1 = _super.call(this, props) || this;
        _this_1.endListeners = {
            transitionend: [],
            animationend: []
        };
        _this_1.node = null;
        _this_1.generateEndListener = function (node, done, eventName, id) {
            var _this = _this_1;
            return function endListener(e) {
                if (e && e.target === node) {
                    if (_this.timeoutMap[id]) {
                        clearTimeout(_this.timeoutMap[id]);
                        delete _this.timeoutMap[id];
                    }
                    done();
                    off(node, eventName, endListener);
                    var listeners = _this.endListeners[eventName];
                    var index = listeners.indexOf(endListener);
                    index > -1 && listeners.splice(index, 1);
                }
            };
        };
        _this_1.addEndListener = function (node, done) {
            if (supportAni.transition || supportAni.animation) {
                var id_1 = guid();
                _this_1.node = node;
                if (supportAni.transition) {
                    var transitionEndListener = _this_1.generateEndListener(node, done, 'transitionend', id_1);
                    on(node, 'transitionend', transitionEndListener);
                    _this_1.endListeners.transitionend.push(transitionEndListener);
                }
                if (supportAni.animation) {
                    var animationEndListener = _this_1.generateEndListener(node, done, 'animationend', id_1);
                    on(node, 'animationend', animationEndListener);
                    _this_1.endListeners.animationend.push(animationEndListener);
                }
                setTimeout(function () {
                    var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
                    var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
                    var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
                    var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
                    var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
                    _this_1.timeoutMap[id_1] = setTimeout(function () {
                        done();
                    }, time * 1000 + 200);
                }, 15);
            }
            else {
                done();
            }
        };
        _this_1.removeEndtListener = function () {
            _this_1.transitionOff && _this_1.transitionOff();
            _this_1.animationOff && _this_1.animationOff();
        };
        _this_1.removeClassNames = function (node, names) {
            Object.keys(names).forEach(function (key) {
                removeClass(node, names[key]);
            });
        };
        _this_1.handleEnter = function (node, isAppearing) {
            var names = _this_1.props.names;
            if (names) {
                _this_1.removeClassNames(node, names);
                var className = isAppearing ? 'appear' : 'enter';
                addClass(node, names[className]);
            }
            var hook = isAppearing ? _this_1.props.onAppear : _this_1.props.onEnter;
            hook(node);
        };
        _this_1.handleEntering = function (node, isAppearing) {
            setTimeout(function () {
                var names = _this_1.props.names;
                if (names) {
                    var className = isAppearing ? 'appearActive' : 'enterActive';
                    addClass(node, names[className]);
                }
                var hook = isAppearing ? _this_1.props.onAppearing : _this_1.props.onEntering;
                hook(node);
            }, 10);
        };
        _this_1.handleEntered = function (node, isAppearing) {
            var names = _this_1.props.names;
            if (names && typeof names === 'object') {
                var classNames = isAppearing
                    ? [names.appear, names.appearActive]
                    : [names.enter, names.enterActive];
                classNames.forEach(function (className) {
                    removeClass(node, className);
                });
            }
            var hook = isAppearing ? _this_1.props.onAppeared : _this_1.props.onEntered;
            hook(node);
        };
        _this_1.handleExit = function (node) {
            var names = _this_1.props.names;
            if (names) {
                _this_1.removeClassNames(node, names);
                addClass(node, names.leave);
            }
            _this_1.props.onExit(node);
        };
        _this_1.handleExiting = function (node) {
            setTimeout(function () {
                var names = _this_1.props.names;
                if (names) {
                    addClass(node, names.leaveActive);
                }
                _this_1.props.onExiting(node);
            }, 10);
        };
        _this_1.handleExited = function (node) {
            var names = _this_1.props.names;
            if (names) {
                [names.leave, names.leaveActive].forEach(function (className) {
                    removeClass(node, className);
                });
            }
            _this_1.props.onExited(node);
        };
        _this_1.endListeners = {
            transitionend: [],
            animationend: []
        };
        _this_1.timeoutMap = {};
        return _this_1;
    }
    AnimateChild.prototype.componentWillUnmount = function () {
        var _this_1 = this;
        Object.keys(this.endListeners).forEach(function (eventName) {
            _this_1.endListeners[eventName].forEach(function (listener) {
                off(_this_1.node, eventName, listener);
            });
        });
        this.endListeners = {
            transitionend: [],
            animationend: []
        };
    };
    AnimateChild.prototype.render = function () {
        var _a = this.props, names = _a.names, onAppear = _a.onAppear, onAppeared = _a.onAppeared, onAppearing = _a.onAppearing, onEnter = _a.onEnter, onEntering = _a.onEntering, onEntered = _a.onEntered, onExit = _a.onExit, onExiting = _a.onExiting, onExited = _a.onExited, others = __rest(_a, ["names", "onAppear", "onAppeared", "onAppearing", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"]);
        return (React.createElement(Transition, __assign({}, others, { onEnter: this.handleEnter, onEntering: this.handleEntering, onEntered: this.handleEntered, onExit: this.handleExit, onExiting: this.handleExiting, onExited: this.handleExited, addEndListener: this.addEndListener })));
    };
    AnimateChild.propTypes = {
        names: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onAppear: PropTypes.func,
        onAppearing: PropTypes.func,
        onAppeared: PropTypes.func,
        onEnter: PropTypes.func,
        onEntering: PropTypes.func,
        onEntered: PropTypes.func,
        onExit: PropTypes.func,
        onExiting: PropTypes.func,
        onExited: PropTypes.func,
        timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    };
    AnimateChild.defaultProps = {
        onAppear: noop,
        onAppearing: noop,
        onAppeared: noop,
        onEnter: noop,
        onEntering: noop,
        onEntered: noop,
        onExit: noop,
        onExiting: noop,
        onExited: noop
    };
    return AnimateChild;
}(React.Component));
export default AnimateChild;
