import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { getDynamicCls } from '../../utils';
import './index.less';

class Avatar extends Component {
  static propTypes = {
    // 额外写入的class
    extraCls: PropTypes.string,
    // 头像图片url
    headPic: PropTypes.string,
    // 身份标识
    roleFlag: PropTypes.number,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
  }

  getHeadpic = (headpic) => {
    const defaultHeadpic = require('./default-avatar.png');
    return (headpic && headpic.trim && headpic.trim()) || defaultHeadpic;
  };

  render() {
    const { children, extraCls, headPic, roleFlag } = this.props;
    const avatarCls = getDynamicCls('m-avatar', extraCls, () => {
      return typeof extraCls !== 'undefined';
    });
    const rankCls = getDynamicCls('iconfont', 'm-avatar-main',
      () => typeof roleFlag !== 'undefined' && roleFlag === 1);
    return (
      <div className={avatarCls}>
        <img src={this.getHeadpic(headPic)} width="100%" height="100%" />
        <i className={rankCls}>&#xe648;</i>
        {children}
      </div>
    );
  }
}

export default Avatar;
