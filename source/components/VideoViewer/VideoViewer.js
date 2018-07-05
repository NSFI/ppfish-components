import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import Video from './Video';

import './VideoViewer.less';

/**
 * 视频查看器组件
 * @prop {node} children   视频播放器节点
 * @prop {bool} visible       模态框是否可见
 * @prop {bool} draggable       模态框是否支持拖动
 * @prop {bool} mask     模态框关闭的遮罩是否可见
 * @prop {function} onCancel     点击遮罩层或右上角叉或取消按钮的回调
 * @prop {function} afterClose     模态框关闭的回调
 * @prop {number|string} width     模态框的宽度
 */
class VideoViewer extends Component {
  static propTypes = {
    children: PropTypes.node,
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

  static defaultProps = {
    visible: false,
    draggable: false,
    mask: false,
    closable: true,
  };

  static Video = Video;

  constructor(props) {
    super(props);
  }

  handleOnClose = () => {
    this.props.onCancel();
  };

  render() {
    const {children, draggable, closable, wrapClassName, maskStyle} = this.props;
    const MODAL_WRAP = 'm-video-viewer-modal-wrap';
    const modalProps = {
      ...this.props,
      wrapClassName: wrapClassName ? `${wrapClassName} ${MODAL_WRAP}` : MODAL_WRAP,
      title: null,
      footer: null,
      maskStyle: maskStyle ? maskStyle : {backgroundColor: 'rgba(0,0,0,0.2)'},
      // 不显示Modal自带的关闭按钮
      closable: false,
    };
    const content = (
      <div className="m-video-viewer-content">
        {
          closable ?
            <i className="iconfont icon-guanbi" onClick={this.handleOnClose}/>
            : null
        }
        {children}
      </div>
    );
    return (
      <Modal {...modalProps}>
        <div className="m-video-viewer-inner">
          {
            draggable ?
              <Draggable>
                {content}
              </Draggable>
              : content
          }
        </div>
      </Modal>
    );
  }
}

export default VideoViewer;
