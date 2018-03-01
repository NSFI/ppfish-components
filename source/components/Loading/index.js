import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spin } from 'antd';
import './index.less';

class Loading extends Component {
  static propTypes = {
    children: PropTypes.node,
    extraCls: PropTypes.string,
    loadingIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { extraCls, loadingIcon } = this.props;
    const LOADING_TEXT = '加载中...';
    if ( loadingIcon ) {
      return (
        <div className={classNames('m-loading', {[`${extraCls}`]: !!extraCls})}>
          <div className="m-loading-bg">
            <img src={loadingIcon}/>
            <p className="m-loading-text">{LOADING_TEXT}</p>
          </div>
        </div>
      );
    }
    return (
      <div className={classNames('m-loading', {[`${extraCls}`]: !!extraCls})}>
        <Spin tip={LOADING_TEXT} />
      </div>
    );
  }
}

export default Loading;
