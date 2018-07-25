import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/index.tsx';

import './index.less';

const noop = () => {
};

export default class LoadMore extends React.Component {
  static propTypes = {
    onLoadMore: PropTypes.func,
    loading: PropTypes.bool,
    loadError: PropTypes.bool,
    loadEnd: PropTypes.bool,
    normalText: PropTypes.string,
    loadingText: PropTypes.string,
    failedText: PropTypes.string,
    endText: PropTypes.string,
    extraCls: PropTypes.string,
  };

  static defaultProps = {
    onLoadMore: noop,
    loading: false,
    loadError: false,
    loadEnd: false,
    normalText: '查看更多',
    loadingText: '加载中',
    failedText: '加载失败，请重试',
    endText: '没有更多了',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {normalText, onLoadMore, loading, loadError, loadingText, failedText, loadEnd, extraCls} = this.props;
    let buttonText;
    if (loadError) {
      buttonText = failedText;
    } else if (loading) {
      buttonText = loadingText;
    } else {
      buttonText = normalText;
    }
    return (
      <div className={classNames('m-loadmore', {[`${extraCls}`]: !!extraCls})}>
        {loadEnd ?
          <span>没有更多了</span> :
          <Button type="primary" size="large" onClick={onLoadMore} loading={loading}>{buttonText}</Button>
        }
      </div>
    );
  }
}
