import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import Modal from '../Modal/index.tsx';
import Icon from '../Icon/index.tsx';
import Video from './Video';

import './VideoViewer.less';

class VideoViewer extends Component {
  static defaultProps = {
    prefixCls: 'fishd-video-viewer',
    visible: false,
    draggable: false,
    mask: false,
    closable: true,
  };

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
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };

  static Video = Video;

  constructor(props) {
    super(props);
  }

  handleOnClose = () => {
    this.props.onCancel();
  };

  render() {
    const {prefixCls, children, draggable, closable, wrapClassName = '', maskStyle} = this.props;
    const MODAL_WRAP = `${prefixCls}-modal-wrap`;
    const otherProps = omit(this.props, [
      'prefixCls',
      'wrapClassName',
      // 'visible',
      // 'mask',
      // 'onCancel',
      // 'afterClose',
      // 'width',
      'title',
      'footer',
      'maskStyle',
      'closable',
    ]);
    const modalProps = {
      ...otherProps,
      wrapClassName: `${wrapClassName} ${MODAL_WRAP}`,
      className: 'fishd-modal',
      title: null,
      footer: null,
      maskStyle: maskStyle ? maskStyle : {backgroundColor: 'rgba(0,0,0,0.2)'},
      // 不显示Modal自带的关闭按钮
      closable: false,
    };
    const content = (
      <div className={`${prefixCls}-content`}>
        {children}
        {
          closable ?
            <Icon type="close-circle-fill" className="icon-close" onClick={this.handleOnClose} />
            : null
        }
      </div>
    );
    return (
      <Modal {...modalProps}>
        <div className={`${prefixCls}-inner`}>
          {content}
        </div>
      </Modal>
    );
  }
}

export default VideoViewer;
