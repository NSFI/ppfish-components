import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TreeSelectMore extends Component {
  static propTypes = {
    hasSubItem: PropTypes.bool,
    onClick: PropTypes.func,
  }

  render() {
    const { hasSubItem, onClick } = this.props;
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
