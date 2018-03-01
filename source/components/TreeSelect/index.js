import React, { Component, Children } from 'react';
import debug from 'debug';
import PropTypes from 'prop-types';
import TreePane from './TreePane';
import './index.less';
const componentLog = debug('component:log');
const componentError = debug('component:error');

// 树面板class对象
class Pane {
  constructor(parent, items) {
    this.parent = parent; // Item
    this.items = items; // [Item]
    this.visible = false;
    this.cache = {};
  }

  setItems(items) {
    this.items = items;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  // 设置默认显示的pane
  setDefaultVisible(key) {
    const item = this.getItemByKey(key);
    if (item) {
      item.setPanelBackVisible();
    // 没有匹配到key，显示第一级
    } else {
      this.setVisible(true);
    }
  }

  getItemByKey(key) {
    const cacheItem = this.cache[key];
    if ( cacheItem ) {
      // componentLog(`从cache中匹配到key：${key}`, cacheItem);
      return cacheItem;
    }
    for ( let i = 0; i < this.items.length; i++ ) {
      const item = this.items[i];
      if ( item.key == key ) {
        // componentLog(`匹配到key：${key}`, item);
        this.cache[key] = item;
        return item;
      }
      if ( item.children ) {
        const result = item.children.getItemByKey(key);
        if ( result ) {
          return result;
        }
      }
    }
    return null;
  }

  // 单选Item，往后遍历全选其子树，往前遍历设置父树勾选状态
  setItemSelected(key, value) {
    const item = this.getItemByKey(key);
    if ( item ) {
      item.setSelected(value, false);
      item.setForwardSelected(value);
      if ( item.pane ) {
        item.pane.setItemBackSelected();
      }
    }
  }

  // 全选Item
  setAllItemSelected(checked) {
    const items = this.items;
    if ( !items ) {
      return;
    }
    items.forEach(it => {
      this.setItemSelected(it.key, checked);
    });
  }

  // 往前遍历设置父树勾选状态，检查当前层级节点是否全部选中/全不选/部分选中，修改上一级勾选状态
  setItemBackSelected(indeterminate) {
    const parent = this.parent;
    if ( !parent ) {
      return;
    }
    const countLen = (items, key) => {
      return items.reduce((sum, item) => {
        return (item[key] ? 1 : 0) + sum;
      }, 0);
    };
    //  😭这里有bug
    const totalLen = this.items.reduce((sum, item) => {
      return (item.selected ? 1 : 0) + sum;
    }, 0);
    // 不传indeterminate时，执行计算
    if ( typeof indeterminate == 'undefined') {
      const selectedLen = countLen(this.items, 'selected');
      const indeterminateLen = countLen(this.items, 'indeterminate');
      // 全选
      if ( selectedLen == this.items.length ) {
        parent.setSelected(true, false);
        // 遍历父树检查
        parent.pane.setItemBackSelected();
      // 全不选
      } else if ( indeterminateLen == 0 && selectedLen == 0 ) {
        parent.setSelected(false, false);
        // 遍历父树全不选
        parent.pane.setItemBackSelected();
      // 部分选中
      } else {
        parent.setSelected(false, true);
        // 遍历父树部分选中
        parent.pane.setItemBackSelected(true);
      }
    // 跳过计算，直接循环遍历部分选中
    } else {
      parent.setSelected(false, true);
      parent.pane.setItemBackSelected(true);
    }
  }

  // 设置Item选中状态，设置子树显示状态
  setItemCurrent(key) {
    if ( !key ) {
      return;
    }
    const item = this.getItemByKey(key);
    if ( item ) {
      // 设置Item选中状态
      item.pane.items.forEach(it => it.setCurrent(false));
      item.setCurrent(true);
      // 设置子树显示状态
      item.pane.setForwardVisible(false);
      if ( item.children ) {
        item.children.setVisible(true);
      }
    }
  }

  // 往后遍历设置显示状态
  setForwardVisible(visible) {
    const items = this.items;
    if ( items ) {
      for ( let i = 0; i < items.length; i++ ) {
        const item = items[i];
        if ( item.children ) {
          item.children.setVisible(visible);
          item.children.setForwardVisible(visible);
        }
      }
    }
  }

  // 获取当前选中的值
  getSelected(returned = []) {
    for ( let i = 0; i < this.items.length; i++ ) {
      const item = this.items[i];
      // 全选
      if ( item.selected ) {
        // componentLog(`找到勾选项目：${item.selected}`, item.key);
        returned.push(item);
      // 部分选中
      } else if ( item.indeterminate ) {
        if ( item.children ) {
          item.children.getSelected(returned);
        }
      // 全不选
      } else {
        // do nothing
      }
    }
    return returned;
  }
}

// 树项目class对象
class Item {
  constructor(children, pane, key, text) {
    this.children = children; // Pane
    this.pane = pane; // Pane
    this.selected = false;
    this.indeterminate = false;
    this.key = key;
    this.text = text;
    this.current = false;
  }

  setChildren(children) {
    this.children = children;
  }

  // // 全不选
  // selected = false;
  // indeterminate = false;
  // // 部分选中
  // selected = false;
  // indeterminate = true;
  // // 全选
  // selected = true;
  // indeterminate = false;
  setSelected(value, indeterminate) {
    this.selected = value;
    this.indeterminate = indeterminate;
  }

  setCurrent(value) {
    this.current = value;
  }

  // 往前遍历设置面板显示状态
  setPanelBackVisible() {
    this.pane.setVisible(true);
    if ( this.pane.parent ) {
      this.pane.parent.setPanelBackVisible();
    }
  }

  // 往后遍历全选其子树
  setForwardSelected(value) {
    const pane = this.children;
    if ( !pane ) {
      return;
    }
    for ( let i = 0; i < pane.items.length; i++ ) {
      const item = pane.items[i];
      item.setSelected(value, false);
      item.setForwardSelected(value);
    }
  }
}

// 实例化根树
const createPane = (tree, parentItem = null) => {
  const items = [];
  // items后面设置
  const pane = new Pane(parentItem, null);
  for ( let i = 0; i < tree.length; i++ ) {
    const treeI = tree[i];
    // children后面设置
    const item = new Item(null, pane, treeI.key, treeI.text);
    if ( treeI.values && treeI.values.length ) {
      const nextPane = createPane(treeI.values, item);
      // 设置children
      item.setChildren(nextPane);
    }
    // 设置items
    items.push(item);
  }
  pane.setItems(items);
  return pane;
};

// 分组成适合UI展示的多维数组结构
const generatePaneArr = (pane, depth = 0, returned = []) => {
  if ( pane ) {
    returned[depth] = returned[depth] || [];
    returned[depth].push(pane);
  }
  if ( pane.items ) {
    for ( let i = 0; i < pane.items.length; i++ ) {
      let item = pane.items[i];
      if ( item.children ) {
        depth++;
        generatePaneArr(item.children, depth, returned);
        depth--;
      }
    }
  }
  return returned;
};

// 支持多级的树形选择控件
// TODO multiple= false未实现
class TreeSelect extends Component {
  static propTypes = {
    data: PropTypes.array,
    // 默认勾选的节点键值对
    defaultSelectedMap: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    // 变化勾选的节点键值对
    selectedObj: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    // true,多选模式/false,单选模式
    multiple: PropTypes.bool,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    multiple: true,
    onSelect: () => {}
  }

  constructor(props) {
    super(props);
    const pane = createPane(props.data);
    componentLog('多级树实例化：', pane);
    const { defaultSelectedMap } = props;
    let firstKey;
    if ( typeof defaultSelectedMap == 'object' ) {
      firstKey = Object.keys(defaultSelectedMap)[0];
    }
    // 设置默认勾选状态
    this.setItemSelectedByKeys(pane, defaultSelectedMap);
    // 设置面板显示状态
    pane.setDefaultVisible(firstKey);
    // pane.setDefaultVisible('bb0');
    pane.setItemCurrent(firstKey);
    // pane.setItemCurrent('13232dad1');
    this.state = {
      pane,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pane } = this.state;
    const { selectedObj } = nextProps;
    // 新的勾选keys
    // fixme react 修改了state导致this.props非预期结果，类似问题见https://github.com/facebook/react/issues/7121
    const newPane = this.setItemSelectedByKeys(pane, selectedObj);
    this.setState({
      pane: newPane,
    });
  }

  setItemSelectedByKeys(pane, selectedObj) {
    if ( typeof selectedObj == 'object' ) {
      for ( let key in selectedObj ) {
        pane.setItemSelected(key, selectedObj[key]);
      }
    // 全选
    } else if ( selectedObj ) {
      pane.setAllItemSelected(true);
    // 全不选
    } else {
      pane.setAllItemSelected(false);
    }
    return pane;
  }

  handlePaneSelect(key, value) {
    const { pane } = this.state;
    const { onSelect } = this.props;
    pane.setItemSelected(key, value);
    pane.setItemCurrent(key);
    onSelect(pane.getSelected(), key, value);
    this.setState({
      pane,
    });
  }

  handlePaneCurrent(key) {
    const { pane } = this.state;
    pane.setItemCurrent(key);
    this.setState({
      pane,
    });
  }

  render() {
    const { pane } = this.state;
    const paneArr = generatePaneArr(pane);
    componentLog('多级树分组：', paneArr);
    return (
      <div className="m-tree-select-container">
        {
          paneArr.map((paneList, depth) => {
            return paneList.map((pane, i) => {
              return (
                <TreePane
                  key={i}
                  pane={pane}
                  depth={depth}
                  onSelect={(key, value) => this.handlePaneSelect(key, value)}
                  onCurrent={(key) => this.handlePaneCurrent(key)}
                />
              );
            });
          })
        }
      </div>
    );
  }
}

export default TreeSelect;
