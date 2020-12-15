import * as React from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import Modal from '../Modal';
import Icon from '../Icon';

export interface VideoModalProps {
  prefixCls?: string;
  width?: string | number;
  afterClose?: () => void;
  draggable?: boolean;
  mask?: boolean;
  onCancel?: () => void;
  visible?: boolean;
  children?: React.ReactNode | React.ReactChildren;
  wrapClassName?: string;
  maskStyle?: React.CSSProperties;
  closable?: boolean;
}

class VideoModal extends React.Component<VideoModalProps> {
  static propTypes = {
    prefixCls: PropTypes.string,
    children: PropTypes.node,
    wrapClassName: PropTypes.string,
    maskStyle: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    draggable: PropTypes.bool,
    mask: PropTypes.bool,
    closable: PropTypes.bool,
    onCancel: PropTypes.func,
    afterClose: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static defaultProps = {
    prefixCls: 'fishd-video-modal',
    visible: false,
    draggable: false,
    closable: true,
    mask: false,
    width: 640
  };

  constructor(props) {
    super(props);
  }

  handleOnClose = () => {
    this.props.onCancel();
  };

  render() {
    const { prefixCls, children, closable, wrapClassName = '', maskStyle } = this.props;

    const MODAL_WRAP = `${prefixCls}-modal-wrap`;

    const otherProps = omit(this.props, [
      'prefixCls',
      'wrapClassName',
      'title',
      'footer',
      'maskStyle',
      'closable'
    ]);

    const modalProps = {
      ...otherProps,
      wrapClassName: `${wrapClassName} ${MODAL_WRAP}`,
      className: 'fishd-modal',
      maskStyle: maskStyle ? maskStyle : { backgroundColor: 'rgba(0,0,0,0.2)' },
      // 不显示Modal自带的关闭按钮
      closable: false,
      title: null,
      footer: null
    };

    const content = (
      <div className={`${prefixCls}-content`}>
        {children}
        <div className={`${prefixCls}-header`}>
          {closable ? (
            <Icon type="picture-close" className="icon-close" onClick={this.handleOnClose} />
          ) : null}
        </div>
      </div>
    );

    return (
      <Modal {...modalProps}>
        <div className={`${prefixCls}-inner`}>{content}</div>
      </Modal>
    );
  }
}

export default VideoModal;
