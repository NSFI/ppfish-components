import React, { Component, Children }from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CollapsePanel from './Panel';
import './index.less';

function toArray(activeKey) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}
class Collapse extends Component {

  static propTypes = {
    children: PropTypes.node,
    prefixCls: PropTypes.string,
    extraCls: PropTypes.string,
    defaultActiveKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    activeKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    // 是否开启功能：点击header后将header置顶
    isScrollToHeader: PropTypes.bool,
    // 是否开启功能：手风琴效果，既每次点击header只展开一项
    accordion: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'm-collapse',
    isScrollToHeader: false,
    accordion: false,
    onChange() {},
  };

  static Panel = CollapsePanel;

  constructor(props) {
    super(props);
    const { activeKey, defaultActiveKey } = props;
    let currentActiveKey = defaultActiveKey;
    if ('activeKey' in props) {
      currentActiveKey = activeKey;
    }
    this.state = {
      // 已激活面板的key
      activeKey: toArray(currentActiveKey),
      // 当前点击的key
      currentKey: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: toArray(nextProps.activeKey),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToHeader();
  }

  onClickItem(key) {
    return () => {
      let activeKey = this.state.activeKey;
      // 手风琴效果,只展开一项,收起其他项
      if (this.props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [...activeKey];
        const index = activeKey.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          this.setState({
            currentKey: key
          });
          activeKey.push(key);
        }
      }
      this.setActiveKey(activeKey);
    };
  }

  getItems() {
    const activeKey = this.state.activeKey;
    const { prefixCls, accordion } = this.props;
    return Children.map(this.props.children, (child, index) => {
      // If there is no key provide, use the panel order as default key
      const key = child.key || String(index);
      const header = child.props.header;
      let isActive = false;
      if (accordion) {
        isActive = activeKey[0] === key;
      } else {
        isActive = activeKey.indexOf(key) > -1;
      }

      const props = {
        itemKey: el => this[key] = el,
        header,
        isActive,
        prefixCls,
        children: child.props.children,
        onItemClick: this.onClickItem(key).bind(this),
      };

      return React.cloneElement(child, props);
    });
  }

  setActiveKey(activeKey) {
    if (!('activeKey' in this.props)) {
      this.setState({
        activeKey,
      });
    }
    this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
  }

  scrollToHeader() {
    const { currentKey, activeKey } = this.state;
    const { isScrollToHeader } = this.props;
    const collapse = this.refs.collapse;
    if ( !isScrollToHeader || !currentKey || !activeKey.includes(currentKey) ) {
      return;
    }
    const el = this[currentKey];
    const collapseRect = collapse && collapse.getBoundingClientRect();
    const elRect = el && el.getBoundingClientRect();
    const diff = collapse.scrollHeight - collapse.clientHeight;
    if ( collapseRect && elRect ) {
      let toTop = collapse.scrollTop + elRect.top - collapseRect.top;
      if ( toTop < diff ) {
        collapse.scrollTop = toTop;
      }
    }
    this.setState({
      currentKey: null
    });
  }

  render() {
    const { prefixCls, extraCls, isScrollToHeader } = this.props;
    let clsObj = {};
    let style = null;
    clsObj[prefixCls] = true;
    if (extraCls) {
      clsObj[extraCls] = true;
    }
    if (isScrollToHeader) {
      style = { overflowY: 'auto', overflowX: 'hidden'};
    }
    return (
      <div className={classNames(clsObj)} ref="collapse" style={style}>
        {this.getItems()}
      </div>
    );
  }
}

export default Collapse;
