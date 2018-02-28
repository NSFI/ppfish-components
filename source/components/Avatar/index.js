import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { getHeadpic, getDynamicCls } from '../../utils/';
import './index.less';

class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { children, extraCls, ltbHeadpic, adviserLeaderFlag } = this.props;
    let rank;
    let avatarCls = getDynamicCls('avatar', extraCls, () => {
      return typeof extraCls != 'undefined';
    });
    // 是否主理, 1是0否
    if (typeof adviserLeaderFlag != 'undefined' && adviserLeaderFlag == '1') {
      rank = (<i className="iconfont main">&#xe61f;</i>);
    }else {
      rank = (<i className="iconfont">&#xe61f;</i>);
    }
    return (
      <div className={avatarCls}>
        <img src={getHeadpic(ltbHeadpic)} width="100%" height="100%" />
        {rank}
        {children}
      </div>
    );
  }
}

Avatar.propTypes = {
  extraCls: PropTypes.string,
  ltbHeadpic: PropTypes.string,
  adviserLeaderFlag: PropTypes.string,
  roleMark: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.node,
};

export default Avatar;
