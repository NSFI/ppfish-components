import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Item extends Component {
  static propTypes = {
    children: PropTypes.node,
    onItemClick: PropTypes.func,
    isActive: PropTypes.bool,
  };
  static defaultProps = {
    onItemClick: () => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children, onItemClick, isActive} = this.props;
    return (
      <div
        className={classNames('fishd-stick-v-menu-item', {
          'z-active': isActive
        })}
        onClick={onItemClick}
      >
        {children}
      </div>
    );
  }
}

export default Item;
