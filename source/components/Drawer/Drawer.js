import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/index.tsx';
import './style/Drawer.less';

/**
 * 抽屉组件
 * @prop {string} className   设置类名
 * @prop {object} style       设置样式
 * @prop {bool} visible       图表参数
 * @prop {object} onClose     图表事件
 * @prop {node} container     容器
 */
class Drawer extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.instanceOf(Element),
    onClose: PropTypes.func,
    style: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    prefixCls: PropTypes.string
  };

  static defaultProps = {
    visible: false,
    prefixCls: 'fishd'
  };

  handleClose = e => {
    const {onClose} = this.props;
    onClose && onClose();
  };

  render() {
    const {children, className, style, visible, container, prefixCls} = this.props;
    const drawerClass = classNames(`${prefixCls}-drawer`, className, {
      "z-visible": visible
    });
    const el = (
      <div className={drawerClass} style={style}>
        <span className={`${prefixCls}-drawer-close`} onClick={this.handleClose}>
          <Icon className="iconfont" type="close-modal-line"/>
        </span>
        <div className={`${prefixCls}-drawer-container`}>{children}</div>
      </div>
    );
    return container ? ReactDOM.createPortal(el, container) : el;
  }
}

export default Drawer;
