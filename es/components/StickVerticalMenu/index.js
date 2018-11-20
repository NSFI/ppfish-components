import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Item from './Item';
import './style/index.less';

const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
class StickVerticalMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    defaultSelectedKeys: PropTypes.array,
    selectedKeys: PropTypes.array,
    className: PropTypes.string,
  };
  static defaultProps = {
    selectedKeys: [],
  };
  static Item = Item;

  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.defaultSelectedKeys || props.selectedKeys
    };
  }

  componentWillReceiveProps(nextProps) {
    const diffArr = difference(nextProps.selectedKeys, this.props.selectedKeys);
    if (diffArr && diffArr.length) {
      this.setState({
        activeKey: nextProps.selectedKeys
      });
    }
  }

  onClickItem = (key) => {
    this.setState({
      activeKey: [key]
    });
  };

  render() {
    const { children, className } = this.props;
    const activeKey = this.state.activeKey;
    return (
      <div className={classNames('fishd-stick-v-menu', {
        [`${className}`]: className
      })}>
        {React.Children.map(children, (child, index) => {
          // If there is no key provide, use the panel order as default key
          const key = child.key || String(index);
          const isActive = activeKey.some(it => it.startsWith(key));
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
