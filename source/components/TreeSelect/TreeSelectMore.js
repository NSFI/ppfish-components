import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

class TreeSelectMore extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    hasSubItem: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    const { hasSubItem, onClick, loading } = this.props;
    if ( loading ) {
      return (
        <div className="m-tree-select-more m-tree-select-more-empty">
          <Icon type="loading" spin={1} />
        </div>
      );
    }
    if ( !hasSubItem ) {
      return (
        <div className="m-tree-select-more m-tree-select-more-empty" />
      );
    }
    return (
      <div
        className="m-tree-select-more"
        onClick={onClick}
      ><i className="iconfont icon-youjiantou" /></div>
    );
  }
}

export default TreeSelectMore;
