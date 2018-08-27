import React, { Component, Children } from 'react';
import debug from 'debug';
import PropTypes from 'prop-types';
import { default as TreePaneView } from './TreePane';
import Pane from './Pane';
import Item from './Item';

import './style/index.less';

const componentLog = debug('component:log');
const componentWarn = debug('component:warn');

// 实例化根树
const createPane = (tree, parentItem = null) => {
  const items = [];
  // items后面设置
  const pane = new Pane(parentItem, null);
  for ( let i = 0; i < tree.length; i++ ) {
    const treeI = tree[i];
    // children后面设置
    const item = new Item(null, pane, treeI.key, treeI.id, treeI.text, treeI.leaf);
    const status = treeI.status;
    if ( typeof status !== 'undefined' ) {
      // status 1-全选，2-半选
      item.setSelected(status === 1, status === 2);
    }
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
  if ( pane && pane.visible ) {
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
// 将pane序列化成输入的data格式
const serializeToData = (pane, copyKeys=['key', 'text', 'leaf']) => {
  const data = [];
  const items = pane.items;
  for ( let i = 0; i < items.length; i++ ) {
    const item = items[i];
    let status;
    let values;
    // 全选
    if ( item.selected ) {
      status = 1;
    // 部分选中
    } else if ( item.indeterminate ) {
      status = 2;
    // 全不选
    } else {
      status = 0;
    }
    if ( item.children ) {
      values = serializeToData(item.children, copyKeys);
    } else {
      values = [];
    }
    const newItem = {};
    copyKeys.forEach(key => {
      newItem[key] = item[key];
    });
    newItem.status = status;
    newItem.values = values;
    data.push(newItem);
  }
  return data;
};
// 支持多级的树形选择控件
// TODO multiple= false未实现
class TreePane extends Component {
  static serializeToData = serializeToData;
  static propTypes = {
    // 首次渲染时使用的树状结构数据
    defaultData: PropTypes.array.isRequired,
    // 注意data受控属性和selected受控属性建议只使用其中一个
    // 受控属性，当前树状结构数据
    data: PropTypes.array,
    // 点击后从服务端获取子节点数据
    loadLeaf: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    // 首次渲染时使用的勾选节点键值对，true-全选，false-全不选
    defaultSelected: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    // 注意data受控属性和selected受控属性建议只使用其中一个
    // 受控属性，当前勾选的节点键值对，true-全选，false-全不选
    selected: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    // true,多选模式/false,单选模式
    multiple: PropTypes.bool,
    // 勾选后是否递归子树和父树
    recursive: PropTypes.bool,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    multiple: true,
    recursive: true,
    loadLeaf: null,
    onSelect: () => {}
  };

  constructor(props) {
    super(props);
    const { defaultData, defaultSelected, data, selected } = props;
    if ( typeof data !== 'undefined' && typeof selected !== 'undefined' ) {
      componentWarn('同时使用props data和props selected两个受控属性时，将会使用data的status 作为选中状态!');
    }
    const pane = this.setPane(defaultData, defaultSelected);
    // 设置默认勾选状态
    if ( defaultSelected ) {
      this.setItemSelectedByKeys(pane, defaultSelected);
    }
    this.state = {
      pane,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pane } = this.state;
    const { data, selected } = nextProps;
    // 使用data受控属性，status表示选中状态
    if ( typeof data !== 'undefined' ) {
      const newPane = this.setPane(data, selected);
      this.setState({
        pane: newPane,
      });
    // 使用selected受控属性，key表示操作的键，value表示操作结果
    } else if ( typeof selected !== 'undefined' ) {
      // fixme react 修改了state导致this.props非预期结果，类似问题见https://github.com/facebook/react/issues/7121
      const newPane = this.setItemSelectedByKeys(pane, selected);
      // TODO selected受控属性存在的问题：在当前组件只渲染了第一层子节点的情况下，如果传的selected受控属性里有子孙节点，
      // TODO 则无法根据子孙节点计算第一层子节点的选中状态
      this.setState({
        pane: newPane,
      });
    }
  }

  /**
   *
   * @param data 树状结构数据
   * @param selected {Object} [Optional]树状结构数据选中的键值对
   */
  setPane = (data, selected) => {
    // performance.mark('genPane-start');
    const pane = createPane(data);
    // performance.mark('genPane-end');
    // performance.measure('genPane', 'genPane-start', 'genPane-end');
    // let measures = performance.getEntriesByName('genPane');
    // console.log(measures[0]);
    componentLog('多级树实例化：', pane);
    let firstKey;
    // 传入的selected为键值对
    if ( typeof selected === 'object' ) {
      firstKey = Object.keys(selected)[0];
    // 传入data
    } else if ( typeof data !== 'undefined' ) {
      const dataSelected = pane.getSelected();
      if ( dataSelected && dataSelected.length ) {
        firstKey = dataSelected[0];
      }
    }
    // 设置面板显示状态
    pane.setDefaultVisible(firstKey);
    pane.setItemCurrent(firstKey);
    this.loaded = {};
    return pane;

  };

  /**
   * 根据key设置勾选状态
   * @param pane
   * @param selected {Object|Boolean} [required]勾选状态对象
   * @returns {*}
   */
  setItemSelectedByKeys(pane, selected) {
    const { recursive } = this.props;
    if ( typeof selected == 'object' ) {
      for ( let key in selected ) {
        pane.setItemSelected(key, selected[key], recursive);
      }
    // 全选
    } else if ( selected === true ) {
      pane.setAllItemSelected(true, recursive);
    // 全不选
    } else if ( selected === false ) {
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
    // 返回选中的数据项目、当前点击的key、当前点击的value
    onSelect(pane, key, value);
    this.setState({
      pane,
    });
  }

  handlePaneCurrent(key, id) {
    const { loadLeaf } = this.props;
    const { pane } = this.state;
    const item = pane.getItemByKey(key);
    // 已渲染children
    if ( item.children || this.loaded[key] ) {
      pane.setItemCurrent(key);
      this.setState({
        pane,
      });
    // 存在子节点
    } else if ( !item.leaf && typeof loadLeaf === 'function' ) {
      item.setLoading(true);
      this.setState({
        pane,
      });
      Promise.resolve(loadLeaf(key, id)).then(data => {
        let childPane;
        if ( data ) {
          // 当用户界面全选或者全不选父节点时，需要更新加载后的data status保持和父节点一致
          if ( item.indeterminate === false ) {
            const dataCopy = data.map(it => {
              let status;
              if ( item.selected ) {
                status = 1;
              } else {
                status = 0;
              }
              // 返回复制的对象，注意避免修改data原始值
              return Object.assign({}, it, {
                status: status
              });
            });
            childPane = createPane(dataCopy, item);
          } else {
            childPane = createPane(data, item);
          }
          componentLog('加载新的数据，多级树实例化：', pane);
          item.setChildren(childPane);
        }
      })
        .catch(e => {
          componentLog('加载新的数据失败', e);
        })
        .finally(() => {
          this.loaded[key] = true;
          item.setLoading(false);
          pane.setItemCurrent(key);
          this.setState({
            pane,
          });
        });
    } else {
      pane.setItemCurrent(key);
      this.setState({
        pane,
      });
    }
  }

  render() {
    const { pane } = this.state;
    const paneArr = generatePaneArr(pane);
    componentLog('多级树分组：', paneArr);
    return (
      <div className="fishd-tree-select-container">
        {
          paneArr.map((paneList, depth) => {
            return paneList.map((pane, i) => {
              return (
                <TreePaneView
                  key={i}
                  pane={pane}
                  depth={depth}
                  onSelect={(key, value) => this.handlePaneSelect(key, value)}
                  onCurrent={(key, id) => this.handlePaneCurrent(key, id)}
                />
              );
            });
          })
        }
      </div>
    );
  }
}

export default TreePane;
