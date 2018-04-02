import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Drawer.less';

/**
 * 抽屉组件
 * @prop {string} className   设置类名
 * @prop {object} style       设置样式
 * @prop {bool} visible       图表参数
 * @prop {object} onClose     图表事件
 * @prop {node} container     容器
 * @author hzmajianglong@corp.netease.com
 */
class Drawer extends PureComponent {

  handleClose = e=>{
    const {onClose} = this.props;
    onClose && onClose();
  };

  render() {
    const {children, className, style, visible, container} = this.props;
    const drawerClass = classNames("m-drawer", className, {
      "z-visible": visible
    });
    const el = (
      <div className={drawerClass} style={style}>
        <a className="m-drawer-close" onClick={this.handleClose}>
          <i className="iconfont icon-guanbi"/>
        </a>
        <div className="m-drawer-container">{children}</div>
      </div>
    );
    return container ? ReactDOM.createPortal(el, container) : el;
  }
}

Drawer.propTypes = {
  className: PropTypes.string,
  container: PropTypes.instanceOf(Element),
  onClose: PropTypes.func,
  style: PropTypes.object,
  visible: PropTypes.bool.isRequired
};

export default Drawer;
