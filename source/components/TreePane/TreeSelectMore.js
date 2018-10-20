import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/index.tsx';

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
        <div className="fishd-tree-select-more fishd-tree-select-more-empty">
          <Icon type="load-line" spinning={true} />
        </div>
      );
    }
    if ( !hasSubItem ) {
      return (
        <div className="fishd-tree-select-more fishd-tree-select-more-empty" />
      );
    }
    return (
      <div
        className="fishd-tree-select-more"
        onClick={onClick}
      ><Icon type="right" className="arrow-right" /></div>
    );
  }
}

export default TreeSelectMore;
