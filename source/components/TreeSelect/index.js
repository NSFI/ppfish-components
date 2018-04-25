import React, { Component, Children } from 'react';
import debug from 'debug';
import PropTypes from 'prop-types';
import TreePane from './TreePane';
import Pane from './Pane';
import Item from './Item';
import './index.less';
const componentLog = debug('component:log');
const componentError = debug('component:error');

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
    // 勾选后是否递归子树和父树
    recursive: PropTypes.bool,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    multiple: true,
    recursive: true,
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

  /**
   * 根据key设置勾选状态
   * @param pane
   * @param selectedObj 勾选状态对象 {Object|Boolean}
   * @returns {*}
   */
  setItemSelectedByKeys(pane, selectedObj) {
    const { recursive } = this.props;
    if ( typeof selectedObj == 'object' ) {
      for ( let key in selectedObj ) {
        pane.setItemSelected(key, selectedObj[key], recursive);
      }
    // 全选
    } else if ( selectedObj ) {
      pane.setAllItemSelected(true, recursive);
    // 全不选
    } else {
      pane.setAllItemSelected(false, recursive);
    }
    return pane;
  }

  handlePaneSelect(key, value) {
    const { pane } = this.state;
    const { onSelect, recursive } = this.props;
    pane.setItemSelected(key, value, recursive);
    // 递归查找时，展示下一层级
    if ( recursive ) {
      pane.setItemCurrent(key);
    }
    onSelect(pane.getSelected(recursive), key, value);
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
