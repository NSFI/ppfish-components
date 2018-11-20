var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import Icon from '../Icon/index';
import CheckableTag from './CheckableTag';
import './style/index.less';
class Tag extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            closing: false,
            closed: false,
            visible: true,
        };
        this.handleIconClick = (e) => {
            const onClose = this.props.onClose;
            if (onClose) {
                onClose(e);
            }
            if (e.defaultPrevented || 'visible' in this.props) {
                return;
            }
            this.setState({ visible: false });
        };
        this.close = () => {
            if (this.state.closing || this.state.closed) {
                return;
            }
            const dom = ReactDOM.findDOMNode(this);
            dom.style.width = `${dom.getBoundingClientRect().width}px`;
            // It's Magic Code, don't know why
            dom.style.width = `${dom.getBoundingClientRect().width}px`;
            this.setState({
                closing: true,
            });
        };
        this.show = () => {
            this.setState({
                closed: false,
            });
        };
        this.animationEnd = (_, existed) => {
            if (!existed && !this.state.closed) {
                this.setState({
                    closed: true,
                    closing: false,
                });
                const afterClose = this.props.afterClose;
                if (afterClose) {
                    afterClose();
                }
            }
            else {
                this.setState({
                    closed: false,
                });
            }
        };
    }
    static getDerivedStateFromProps(nextProps) {
        return ('visible' in nextProps) ? { visible: nextProps.visible } : null;
    }
    componentDidUpdate(_prevProps, prevState) {
        if (prevState.visible && !this.state.visible) {
            this.close();
        }
        else if (!prevState.visible && this.state.visible) {
            this.show();
        }
    }
    isPresetColor(color) {
        return false;
        // if (!color) { return false; }
        // return (
        //   /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/
        //   .test(color)
        // );
    }
    render() {
        const _a = this.props, { prefixCls, closable, color, className, children, style, autoShowClose } = _a, otherProps = __rest(_a, ["prefixCls", "closable", "color", "className", "children", "style", "autoShowClose"]);
        const isPresetColor = this.isPresetColor(color);
        const classString = classNames(prefixCls, {
            [`${prefixCls}-${color}`]: isPresetColor,
            [`${prefixCls}-has-color`]: (color && !isPresetColor),
            [`${prefixCls}-close`]: this.state.closing,
        }, className);
        // fix https://fb.me/react-unknown-prop
        const divProps = omit(otherProps, [
            'onClose',
            'afterClose',
            'visible',
        ]);
        const tagStyle = Object.assign({ backgroundColor: (color && !isPresetColor) ? color : null }, style);
        let closeIcon = null;
        if (closable) {
            if (autoShowClose) {
                closeIcon = React.createElement(Icon, { type: "close-modal-line", onClick: this.handleIconClick });
            }
            else {
                closeIcon = React.createElement(Icon, { type: "close-modal-line", onClick: this.handleIconClick, className: "invisible" });
            }
        }
        const tag = this.state.closed ? null : (React.createElement("div", Object.assign({ "data-show": !this.state.closing }, divProps, { className: classString, style: tagStyle }),
            children,
            closeIcon));
        return (React.createElement(Animate, { component: "", showProp: "data-show", transitionName: `${prefixCls}-zoom`, transitionAppear: true, onEnd: this.animationEnd }, tag));
    }
}
Tag.CheckableTag = CheckableTag;
Tag.defaultProps = {
    prefixCls: 'fishd-tag',
    closable: false,
    autoShowClose: true,
};
polyfill(Tag);
export default Tag;
