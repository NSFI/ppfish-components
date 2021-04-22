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
import RcDropdown from './src';
import classNames from 'classnames';
import warning from 'warning';
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dropdown.prototype.getTransitionName = function () {
        var _a = this.props, _b = _a.placement, placement = _b === void 0 ? '' : _b, transitionName = _a.transitionName;
        if (transitionName !== undefined) {
            return transitionName;
        }
        if (placement.indexOf('top') >= 0) {
            return 'slide-down';
        }
        return 'slide-up';
    };
    Dropdown.prototype.componentDidMount = function () {
        var overlay = this.props.overlay;
        if (overlay) {
            var overlayProps = overlay.props;
            warning(!overlayProps.mode || overlayProps.mode === 'vertical', "mode=\"" + overlayProps.mode + "\" is not supported for Dropdown's Menu.");
        }
    };
    Dropdown.prototype.render = function () {
        var _a = this.props, children = _a.children, prefixCls = _a.prefixCls, overlayElements = _a.overlay, trigger = _a.trigger, disabled = _a.disabled;
        var child = React.Children.only(children);
        var overlay = React.Children.only(overlayElements);
        var dropdownTrigger = React.cloneElement(child, {
            className: classNames(child.props.className, prefixCls + "-trigger"),
            disabled: disabled
        });
        // menu cannot be selectable in dropdown defaultly
        // menu should be focusable in dropdown defaultly
        var _b = overlay.props, _c = _b.selectable, selectable = _c === void 0 ? false : _c, _d = _b.focusable, focusable = _d === void 0 ? true : _d;
        var fixedModeOverlay = typeof overlay.type === 'string'
            ? overlay
            : React.cloneElement(overlay, {
                mode: 'vertical',
                selectable: selectable,
                focusable: focusable
            });
        var triggerActions = disabled ? [] : trigger;
        var alignPoint;
        if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
            alignPoint = true;
        }
        return (React.createElement(RcDropdown, __assign({ alignPoint: alignPoint }, this.props, { transitionName: this.getTransitionName(), trigger: triggerActions, overlay: fixedModeOverlay }), dropdownTrigger));
    };
    Dropdown.defaultProps = {
        prefixCls: 'fishd-dropdown',
        mouseEnterDelay: 0.15,
        mouseLeaveDelay: 0.1,
        placement: 'bottomLeft'
    };
    return Dropdown;
}(React.Component));
export default Dropdown;
