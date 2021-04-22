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
/* eslint react/no-did-mount-set-state: 0 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { isFlexSupported } from './utils';
import Step from './Step';
var Steps = /** @class */ (function (_super) {
    __extends(Steps, _super);
    function Steps(props) {
        var _this = _super.call(this, props) || this;
        _this.calcStepOffsetWidth = function () {
            if (isFlexSupported()) {
                return;
            }
            // Just for IE9
            var domNode = findDOMNode(_this);
            if (domNode.children.length > 0) {
                if (_this.calcTimeout) {
                    clearTimeout(_this.calcTimeout);
                }
                _this.calcTimeout = setTimeout(function () {
                    // +1 for fit edge bug of digit width, like 35.4px
                    var lastStepOffsetWidth = (domNode.lastChild.offsetWidth || 0) + 1;
                    // Reduce shake bug
                    if (_this.state.lastStepOffsetWidth === lastStepOffsetWidth ||
                        Math.abs(_this.state.lastStepOffsetWidth - lastStepOffsetWidth) <= 3) {
                        return;
                    }
                    _this.setState({ lastStepOffsetWidth: lastStepOffsetWidth });
                });
            }
        };
        _this.state = {
            flexSupported: true,
            lastStepOffsetWidth: 0
        };
        _this.calcStepOffsetWidth = debounce(_this.calcStepOffsetWidth, 150);
        return _this;
    }
    Steps.prototype.componentDidMount = function () {
        this.calcStepOffsetWidth();
        if (!isFlexSupported()) {
            this.setState({
                flexSupported: false
            });
        }
    };
    Steps.prototype.componentDidUpdate = function () {
        this.calcStepOffsetWidth();
    };
    Steps.prototype.componentWillUnmount = function () {
        if (this.calcTimeout) {
            clearTimeout(this.calcTimeout);
        }
        // @ts-ignore
        if (this.calcStepOffsetWidth && this.calcStepOffsetWidth.cancel) {
            // @ts-ignore
            this.calcStepOffsetWidth.cancel();
        }
    };
    Steps.prototype.render = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, _c = _b.style, style = _c === void 0 ? {} : _c, className = _b.className, children = _b.children, direction = _b.direction, labelPlacement = _b.labelPlacement, iconPrefix = _b.iconPrefix, status = _b.status, size = _b.size, current = _b.current, progressDot = _b.progressDot, initial = _b.initial, icons = _b.icons, restProps = __rest(_b, ["prefixCls", "style", "className", "children", "direction", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot", "initial", "icons"]);
        var _d = this.state, lastStepOffsetWidth = _d.lastStepOffsetWidth, flexSupported = _d.flexSupported;
        var filteredChildren = React.Children.toArray(children).filter(function (c) { return !!c; });
        var lastIndex = filteredChildren.length - 1;
        var adjustedlabelPlacement = progressDot ? 'vertical' : labelPlacement;
        var classString = classNames(prefixCls, prefixCls + "-" + direction, className, (_a = {},
            _a[prefixCls + "-" + size] = size,
            _a[prefixCls + "-label-" + adjustedlabelPlacement] = direction === 'horizontal',
            _a[prefixCls + "-dot"] = !!progressDot,
            _a));
        return (React.createElement("div", { className: classString, style: style }, React.Children.map(filteredChildren, function (child, index) {
            if (!child) {
                return null;
            }
            var stepNumber = initial + index;
            var childProps = __assign({ stepNumber: "" + (stepNumber + 1), prefixCls: prefixCls,
                iconPrefix: iconPrefix, wrapperStyle: style, progressDot: progressDot,
                icons: icons }, child.props);
            if (!flexSupported && direction !== 'vertical' && index !== lastIndex) {
                childProps.itemWidth = 100 / lastIndex + "%";
                childProps.adjustMarginRight = -Math.round(lastStepOffsetWidth / lastIndex + 1);
            }
            // fix tail color
            if (status === 'error' && index === current - 1) {
                childProps.className = prefixCls + "-next-error";
            }
            if (!child.props.status) {
                if (stepNumber === current) {
                    childProps.status = status;
                }
                else if (stepNumber < current) {
                    childProps.status = 'finish';
                }
                else {
                    childProps.status = 'wait';
                }
            }
            // @ts-ignore
            return React.cloneElement(child, childProps);
        })));
    };
    Steps.propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        iconPrefix: PropTypes.string,
        direction: PropTypes.string,
        labelPlacement: PropTypes.string,
        children: PropTypes.node,
        status: PropTypes.string,
        size: PropTypes.string,
        progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        style: PropTypes.object,
        initial: PropTypes.number,
        current: PropTypes.number,
        icons: PropTypes.shape({
            finish: PropTypes.node,
            error: PropTypes.node
        })
    };
    Steps.defaultProps = {
        prefixCls: 'fishd-steps',
        iconPrefix: 'fishd',
        direction: 'horizontal',
        labelPlacement: 'horizontal',
        initial: 0,
        current: 0,
        status: 'process',
        size: '',
        progressDot: false
    };
    Steps.Step = Step;
    return Steps;
}(React.Component));
export default Steps;
