import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../Icon';
import classNames from 'classnames';
import './style/index.less';
function noop() { }
function getDataOrAriaProps(props) {
    return Object.keys(props).reduce((prev, key) => {
        if ((key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') &&
            key.substr(0, 7) !== 'data-__') {
            prev[key] = props[key];
        }
        return prev;
    }, {});
}
export default class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = (e) => {
            e.preventDefault();
            let dom = ReactDOM.findDOMNode(this);
            dom.style.height = `${dom.offsetHeight}px`;
            // Magic code
            // 重复一次后才能正确设置 height
            dom.style.height = `${dom.offsetHeight}px`;
            this.setState({
                closing: false,
            });
            (this.props.onClose || noop)(e);
        };
        this.animationEnd = () => {
            this.setState({
                closed: true,
                closing: true,
            });
            (this.props.afterClose || noop)();
        };
        this.state = {
            closing: true,
            closed: false,
        };
    }
    render() {
        let { closable, description, type, prefixCls = 'fishd-alert', message, closeText, showIcon, banner, className = '', style, iconType, } = this.props;
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
            if (!!description) {
                iconType += '-o';
            }
        }
        let alertCls = classNames(prefixCls, {
            [`${prefixCls}-${type}`]: true,
            [`${prefixCls}-close`]: !this.state.closing,
            [`${prefixCls}-with-description`]: !!description,
            [`${prefixCls}-no-icon`]: !showIcon,
            [`${prefixCls}-banner`]: !!banner,
        }, className);
        // closeable when closeText is assigned
        if (closeText) {
            closable = true;
        }
        const closeIcon = closable ? (React.createElement("a", { onClick: this.handleClose, className: `${prefixCls}-close-icon` }, closeText || React.createElement(Icon, { type: "close-modal-line" }))) : null;
        const dataOrAriaProps = getDataOrAriaProps(this.props);
        return this.state.closed ? null : (React.createElement(Animate, { component: "", showProp: "data-show", transitionName: `${prefixCls}-slide-up`, onEnd: this.animationEnd },
            React.createElement("div", Object.assign({ "data-show": this.state.closing, className: alertCls, style: style }, dataOrAriaProps),
                showIcon ? React.createElement(Icon, { className: `${prefixCls}-icon`, type: iconType }) : null,
                React.createElement("span", { className: `${prefixCls}-message` }, message),
                React.createElement("span", { className: `${prefixCls}-description` }, description),
                closeIcon)));
    }
}
