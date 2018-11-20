import * as React from 'react';
import Dialog from './DialogWrap';
import * as PropTypes from 'prop-types';
import { addEventListener } from '../../utils/index';
import Button from '../Button';
import './style/index.less';
let mousePosition;
let mousePositionEventBinded;
export default class Modal extends React.Component {
    constructor() {
        super(...arguments);
        this.handleCancel = (e) => {
            const onCancel = this.props.onCancel;
            if (onCancel) {
                onCancel(e);
            }
        };
        this.handleOk = (e) => {
            const onOk = this.props.onOk;
            if (onOk) {
                onOk(e);
            }
        };
    }
    componentDidMount() {
        if (mousePositionEventBinded) {
            return;
        }
        // 只有点击事件支持从鼠标位置动画展开
        addEventListener(document.documentElement, 'click', (e) => {
            mousePosition = {
                x: e.pageX,
                y: e.pageY,
            };
            // 100ms 内发生过点击事件，则从点击位置动画展示
            // 否则直接 zoom 展示
            // 这样可以兼容非点击方式展开
            setTimeout(() => mousePosition = null, 100);
        });
        mousePositionEventBinded = true;
    }
    render() {
        const { footer, visible, okText, okType, cancelText, confirmLoading } = this.props;
        const defaultFooter = (React.createElement("div", null,
            React.createElement(Button, Object.assign({ onClick: this.handleCancel }, this.props.cancelButtonProps), cancelText),
            React.createElement(Button, Object.assign({ type: okType, loading: confirmLoading, onClick: this.handleOk }, this.props.okButtonProps), okText)));
        return (React.createElement(Dialog, Object.assign({}, this.props, { footer: footer === undefined ? defaultFooter : footer, visible: visible, mousePosition: mousePosition, onClose: this.handleCancel })));
    }
}
Modal.defaultProps = {
    prefixCls: 'fishd-modal',
    width: 560,
    transitionName: 'fishd-modal-zoom',
    maskTransitionName: '',
    confirmLoading: false,
    visible: false,
    okType: 'primary',
    okButtonDisabled: false,
    cancelButtonDisabled: false,
    draggable: false,
    maskClosable: false,
    keyboard: false,
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
};
Modal.propTypes = {
    prefixCls: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    draggable: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool,
    align: PropTypes.object,
    footer: PropTypes.node,
    title: PropTypes.node,
    closable: PropTypes.bool,
};
