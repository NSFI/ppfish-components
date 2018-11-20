import * as React from 'react';
import RcDropdown from './src';
import classNames from 'classnames';
import warning from 'warning';
export default class Dropdown extends React.Component {
    getTransitionName() {
        const { placement = '', transitionName } = this.props;
        if (transitionName !== undefined) {
            return transitionName;
        }
        if (placement.indexOf('top') >= 0) {
            return 'slide-down';
        }
        return 'slide-up';
    }
    componentDidMount() {
        const { overlay } = this.props;
        if (overlay) {
            const overlayProps = overlay.props;
            warning(!overlayProps.mode || overlayProps.mode === 'vertical', `mode="${overlayProps.mode}" is not supported for Dropdown\'s Menu.`);
        }
    }
    render() {
        const { children, prefixCls, overlay: overlayElements, trigger, disabled } = this.props;
        const child = React.Children.only(children);
        const overlay = React.Children.only(overlayElements);
        const dropdownTrigger = React.cloneElement(child, {
            className: classNames(child.props.className, `${prefixCls}-trigger`),
            disabled,
        });
        // menu cannot be selectable in dropdown defaultly
        // menu should be focusable in dropdown defaultly
        const { selectable = false, focusable = true } = overlay.props;
        const fixedModeOverlay = typeof overlay.type === 'string'
            ? overlay : React.cloneElement(overlay, {
            mode: 'vertical',
            selectable,
            focusable,
        });
        const triggerActions = disabled ? [] : trigger;
        let alignPoint;
        if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
            alignPoint = true;
        }
        return (React.createElement(RcDropdown, Object.assign({ alignPoint: alignPoint }, this.props, { transitionName: this.getTransitionName(), trigger: triggerActions, overlay: fixedModeOverlay }), dropdownTrigger));
    }
}
Dropdown.defaultProps = {
    prefixCls: 'fishd-dropdown',
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft',
};
