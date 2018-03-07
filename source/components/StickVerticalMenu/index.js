import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Item from './Item';
import './index.less';

class StickVerticalMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    defaultSelectedKeys: PropTypes.array,
  };
  static defaultProps = {
    defaultSelectedKeys: []
  };
  static Item = Item;

  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.defaultSelectedKeys
    };
  }

  onClickItem = (key) => {
    this.setState({
      activeKey: [key]
    });
  };

  render() {
    const { children } = this.props;
    const activeKey = this.state.activeKey;
    return (
      <div className="m-stick-v-menu">
        {React.Children.map(children, (child, index) => {
          // If there is no key provide, use the panel order as default key
          const key = child.key || String(index);
          const isActive = activeKey.indexOf(key) > -1;
          const props = {
            itemKey: el => this[key] = el,
            isActive,
            children: child.props.children,
            onItemClick: () => this.onClickItem(key),
          };
          return React.cloneElement(child, props);
        })}
      </div>
    );
  }
}

export default StickVerticalMenu;
