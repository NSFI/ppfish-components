import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {polyfill} from 'react-lifecycles-compat';

import CollapsePanel from "./Panel";

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
    className: PropTypes.string,
    defaultActiveKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    activeKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    // 是否开启功能：点击header后将header置顶
    isScrollToHeader: PropTypes.bool,
    // 是否开启功能：手风琴效果，既每次点击header只展开一项
    accordion: PropTypes.bool,
    // 是否开启删除功能
    showClose: PropTypes.bool,
    // 是否显示边框
    bordered: PropTypes.bool,
    // 是否显示面板的状态数组
    statusList: PropTypes.array,
    onChange: PropTypes.func,
    close: PropTypes.func
  };

  static defaultProps = {
    prefixCls: "fishd-collapse",
    isScrollToHeader: false,
    accordion: false,
    showClose: false,
    bordered: true,
    onChange() {},
    close() {}
  };

  static Panel = CollapsePanel;

  static getDerivedStateFromProps(nextProps,prevState){
    const {prevProps = {}}=prevState;
    const newState={
      prevProps:nextProps,
    };
    if('activeKey' in nextProps){
      newState.activeKey = toArray(nextProps.activeKey);
    }
    if(nextProps.statusList !== prevProps.statusList){
      newState.statusList = nextProps.statusList;
    }
    return newState;
  }

  constructor(props) {
    super(props);
    const { activeKey, defaultActiveKey, statusList } = props;
    let currentActiveKey = defaultActiveKey;
    if ("activeKey" in props) {
      currentActiveKey = activeKey;
    }
    this.state = {
      // 已激活面板的key
      activeKey: toArray(currentActiveKey),
      statusList: statusList || new Array(this.props.children.length).fill(true),
      prevProps:props,
    };
    // 当前点击的key
    this.currentKey = null;
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
          activeKey.push(key);
        }
      }
      // 当前点击的key
      this.currentKey = key;
      this.setActiveKey(activeKey);
    };
  }

  onCloseItem(key) {
    return () => {
      const { children, statusList } = this.props;
      const keyList = Children.map(children, (child, index) => {
        return child.key || String(index);
      });
      const index = keyList.findIndex(item => {
        return key == item;
      });
      statusList[index] = false;
      this.props.close(statusList);
    };
  }

  getItems() {
    const activeKey = this.state.activeKey;
    const { prefixCls, accordion, showClose } = this.props;
    return Children.map(this.props.children, (child, index) => {
      if (!this.state.statusList[index]) {
        return null;
      }
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
        itemKey: el => (this[key] = el),
        header,
        showClose,
        isActive,
        prefixCls,
        children: child.props.children,
        onItemClick: this.onClickItem(key).bind(this),
        onCloseItem: this.onCloseItem(key).bind(this)
      };

      return React.cloneElement(child, props);
    });
  }

  setActiveKey(activeKey) {
    if (!("activeKey" in this.props)) {
      this.setState({
        activeKey
      });
    }
    this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
  }

  scrollToHeader() {
    const { activeKey } = this.state;
    const { isScrollToHeader } = this.props;
    const currentKey = this.currentKey;
    const collapse = this.collapse;
    if (!isScrollToHeader || !currentKey || !activeKey.includes(currentKey)) {
      return;
    }
    const el = this[currentKey];
    const collapseRect = collapse && collapse.getBoundingClientRect();
    const elRect = el && el.getBoundingClientRect();
    const diff = collapse.scrollHeight - collapse.clientHeight;
    if (collapseRect && elRect) {
      let toTop = collapse.scrollTop + elRect.top - collapseRect.top;
      if (toTop < diff) {
        collapse.scrollTop = toTop;
      }
    }
    this.currentKey = null;
  }

  render() {
    const { prefixCls, className, isScrollToHeader, bordered } = this.props;
    let clsObj = {};
    let style = null;
    clsObj[prefixCls] = true;
    if (className) {
      clsObj[className] = true;
    }
    if (!bordered) {
      clsObj[`${prefixCls}-borderless`] = true;
    }
    if (isScrollToHeader) {
      style = { overflowY: "auto", overflowX: "hidden" };
    }
    return (
      <div
        className={classNames(clsObj)}
        ref={node => (this.collapse = node)}
        style={style}
      >
        {this.getItems()}
      </div>
    );
  }
}

polyfill(Collapse);

export default Collapse;
