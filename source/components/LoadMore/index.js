import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';

import './index.less';

const noop = () => {
};

export default class LoadMore extends React.Component {
  static propTypes = {
    onLoadMore: PropTypes.func,
    loading: PropTypes.bool,
    loadError: PropTypes.bool,
    normalText: PropTypes.string,
    loadingText: PropTypes.string,
    failedText: PropTypes.string,
    endText: PropTypes.string,
    loadEnd: PropTypes.bool,
  };

  static defaultProps = {
    onLoadMore: noop,
    loading: false,
    loadError: false,
    normalText: '查看更多',
    loadingText: '加载中',
    failedText: '加载失败，请重试',
    endText: '没有更多了',
    loadEnd: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {normalText, onLoadMore, loading, loadError, loadingText, failedText, loadEnd} = this.props;
    let buttonText;
    if (loadError) {
      buttonText = failedText;
    } else if (loadError) {
      buttonText = loadingText;
    } else {
      buttonText = normalText;
    }
    return (
      <div className="m-loadmore">
        {loadEnd ?
          <span>没有更多了</span> :
          <Button type="primary" size="large" onClick={onLoadMore} loading={loading}>{buttonText}</Button>
        }
      </div>
    );
  }
}
