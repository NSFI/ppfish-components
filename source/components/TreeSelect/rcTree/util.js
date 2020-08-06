import React, { Children } from 'react';
import warning from 'warning';
import TreeNode from './TreeNode.js';
import globalObj from "../globalObj.js";
const DRAG_SIDE_RANGE = 0.25;
const DRAG_MIN_GAP = 2;

let onlyTreeNodeWarned = false;

export function toArray(children) {
  let ret = [];

  Children.forEach(children, function (c) {
    ret.push(c);
  });

  return ret;
}

export function warnOnlyTreeNode() {
  if (onlyTreeNodeWarned) return;

  onlyTreeNodeWarned = true;
  warning(false, 'Tree only accept TreeNode as children.');
}

export function arrDel(list, value) {
  const clone = list.slice();
  const index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}

export function arrAdd(list, value) {
  const clone = list.slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}

export function posToArr(pos) {
  return pos.split('-');
}

export function getPosition(level, index) {
  return `${level}-${index}`;
}

export function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}

export function getNodeChildren(children) {
  return toArray(children).filter(isTreeNode);
}

export function isCheckDisabled(node) {
  const { disabled, disableCheckbox } = node.props || {};
  return !!(disabled || disableCheckbox);
}

export function traverseTreeNodes(treeNodes, callback) {
  function processNode(node, index, parent) {
    const children = node ? node.props.children : treeNodes;
    const pos = node ? getPosition(parent.pos, index) : 0;

    // Filter children
    const childList = getNodeChildren(children);

    // Process node if is not root
    if (node) {
      const data = {
        node,
        index,
        pos,
        key: node.key || pos,
        parentPos: parent.node ? parent.pos : null,
      };

      callback(data);
    }

    // Process children node
    Children.forEach(childList, (subNode, subIndex) => {
      processNode(subNode, subIndex, { node, pos });
    });
  }

  processNode(null);
}

/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 */
export function mapChildren(children, func) {
  const list = toArray(children).map(func);
  if (list.length === 1) {
    return list[0];
  }
  return list;
}

export function getDragNodesKeys(treeNodes, node) {
  const { eventKey, pos } = node.props;
  const dragNodesKeys = [];

  traverseTreeNodes(treeNodes, ({ key }) => {
    dragNodesKeys.push(key);
  });
  dragNodesKeys.push(eventKey || pos);
  return dragNodesKeys;
}

// Only used when drag, not affect SSR.
export function calcDropPosition(event, treeNode) {
  const { clientY } = event;
  const { top, bottom, height } = treeNode.selectHandle.getBoundingClientRect();
  const des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

  if (clientY <= top + des) {
    return -1;
  } else if (clientY >= bottom - des) {
    return 1;
  }

  return 0;
}

/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */
export function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) return undefined;

  const { multiple } = props;
  if (multiple) {
    return selectedKeys.slice();
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }
  return selectedKeys;
}

/**
 * Since React internal will convert key to string,
 * we need do this to avoid `checkStrictly` use number match
 */
function keyListToString(keyList) {
  if (!keyList) return keyList;
  return keyList.map(key => String(key));
}

const internalProcessProps = props => props;
export function convertDataToTree(treeData, processer) {
  if (!treeData) return [];

  const { processProps = internalProcessProps } = processer || {};
  const list = Array.isArray(treeData) ? treeData : [treeData];
  return list.map((item, index) => {
    const { children, ...props }=item;
    const childrenNodes = convertDataToTree(children, processer);
    //给节点的增加_data属性，对应节点的数据源，同时给这个数据源制定_pData属性，用于树形结构的构造，方便后面的遍历业务。
    return (
      <TreeNode key={props.key} _data={item} {...processProps(props)}>
        {childrenNodes}
      </TreeNode>
    );
  });
}

// TODO: ========================= NEW LOGIC =========================
/**
 * Calculate treeNodes entities. `processTreeEntity` is used for `rc-tree-select`
 * @param treeNodes
 * @param processTreeEntity  User can customize the entity
 */
export function convertTreeToEntities(treeNodes, { initWrapper, processEntity, onProcessFinished } = {}) {


  const posEntities = {};
  const keyEntities = {};
  let wrapper = {
    posEntities,
    keyEntities,
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseTreeNodes(treeNodes, (item) => {
    const { node, index, pos, key, parentPos } = item;
    const entity = { node, index, key, pos };

    posEntities[pos] = entity;
    keyEntities[key] = entity;

    // Fill children
    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (processEntity) {
      processEntity(entity, wrapper);
    }
  });

  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }

  return wrapper;
}

/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */
export function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  }

  // Convert keys to object format
  let keyProps;
  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined,
    };
  } else if (typeof keys === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined,
    };
  } else {
    warning(false, '`checkedKeys` is not an array or an object');
    return null;
  }

  keyProps.checkedKeys = keyListToString(keyProps.checkedKeys);
  keyProps.halfCheckedKeys = keyListToString(keyProps.halfCheckedKeys);

  return keyProps;
}

/**
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 * @param keyList       list of keys
 * @param isCheck       is check the node or not
 * @param keyEntities   parsed by `convertTreeToEntities` function in Tree
 * @param checkStatus   Can pass current checked status for process (usually for uncheck operation)
 * @param forNodeCheck  单击复选框时执行此方法，会做特殊处理，不再同时触发其他场景调用此方法重新生成checkedKeys，halfCheckedKeys，会直接放回上次生成的值
 * @returns {{checkedKeys: [], halfCheckedKeys: []}}
 */
export function conductCheck(keyList, isCheck, keyEntities, status, loadData, loadedKeys,forNodeCheck,doSearchUnchecked) {
  const isInSearch=globalObj.isInSearch;
  if(globalObj.fromNodeChecks){
    return globalObj.fromNodeChecks;
  }
  const checkedKeys = {};
  const halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)
  let checkStatus = status || {};

  (checkStatus.checkedKeys || []).forEach((key) => {
    checkedKeys[key] = true;
  });

  (checkStatus.halfCheckedKeys || []).forEach((key) => {
    halfCheckedKeys[key] = true;
  });
 
  function isExpendAndAllChecked(node){
    let allckd=true;
    if(node.props._data.children&&node.props._data.children.length==node.props._data.childCount){
      for(let i=0;i<node.props._data.children.length;i++){
        if(globalObj.checkedKeys.indexOf(node.key)==-1){
          allckd=false;
          break;
        }
      }
    }else{
      allckd=false;
    }
    return  allckd;
  }
  // Conduct up
  function conductUp(key) {
    if (checkedKeys[key] === isCheck) return;

    const entity = keyEntities[key];
    if (!entity) return;
    const { children, parent, node } = entity;

    if (isCheckDisabled(node)) return;

    // Check child node checked status
    let everyChildChecked = true;
    let someChildChecked = false; // Child checked or half checked

    (children || [])
      .filter(child => !isCheckDisabled(child.node))
      .forEach((child) => {
        let childKey = child.key;
        const childChecked = checkedKeys[childKey];
        const childHalfChecked = halfCheckedKeys[childKey];

        if (childChecked || childHalfChecked) someChildChecked = true;
        if (
          // 取消勾选
          !childChecked
          // 注释以下代码，避免异步加载非搜索状态下上级全选不联动的问题。改为搜索状态下上级节点全选联动，半选不联动。
          // 搜索状态的异步加载模式下，当前父节点key不在已加载的节点中，全选子节点时，不选中父节点
          // || (upperSearchValue && loadData && (!loadedKeys || loadedKeys.indexOf(key) == -1))
        ) {
          everyChildChecked = false;
        }
      });

    // Update checked status
    if (isCheck) {
      checkedKeys[key] = everyChildChecked;
      if(isInSearch&&doSearchUnchecked){
        if(everyChildChecked){
          //在搜索状态下，实际子节点个数大于搜索出的子节点个数，则不能标记为全选
          if(!isNodeCheckedBeforeSearch(node,keyEntities,globalObj)){
            if(node.props.children&&node.props._data.childCount>node.props.children.length){
              checkedKeys[key]=false;
            }
            if(isExpendAndAllChecked(node)){
              checkedKeys[key]=true;
            }        
          }else{
            checkedKeys[key]=true;
          }
        }else{

        }
      }
    } else {
      checkedKeys[key] = false;
      if(isInSearch&&doSearchUnchecked){
        if(isNodeCheckedBeforeSearch(node,keyEntities,globalObj)){
          //如果搜索前是选中状态，则去掉勾选后，状态为半选
          if(node.props.children&&node.props._data.childCount>node.props.children.length){
            someChildChecked=true;
            node.props._data._checkedNum=0;
          }
        }else{
          if(isExpendAndAllChecked(node)){
            checkedKeys[key]=true;
          }  
        }
      }
     
    }
    if(checkedKeys[key]){
      someChildChecked=false;
    }
    halfCheckedKeys[key] = someChildChecked;

    if (parent) {
      if(parent.key!=key){
         conductUp(parent.key);
      }
    }
  }

  // Conduct down
  function conductDown(key) {
    if (checkedKeys[key] === isCheck) return;

    const entity = keyEntities[key];
    if (!entity) return;

    const { children, node,parent } = entity;

    if (isCheckDisabled(node)) return;

    checkedKeys[key] = isCheck;
    if(isInSearch&&doSearchUnchecked&&!node.props.isLeaf){
      let childs=children || [];
      if(isCheck){
        if(!isNodeCheckedBeforeSearch(node,keyEntities,globalObj)){
          if(node.props._data.childCount>childs.length){
            //实际子节点个数大于搜索出来的子节点个数，需要判断为半选
            checkedKeys[key] = false;
            halfCheckedKeys[key] = true;
            let _parent=parent;
            //一个节点为半选，它的祖先节点都应该是半选
            while (_parent){
              checkedKeys[_parent.key] = false;
              halfCheckedKeys[_parent.key] = true;
              _parent.node.props._data._checkedNum=1;
              _parent=keyEntities[_parent.key].parent;
            }
          }
        }
      }else{
        if(isNodeCheckedBeforeSearch(node,keyEntities,globalObj)){
          if(node.props._data.childCount>childs.length){
            halfCheckedKeys[key] = true;
          }
        }
      }
      
    }
    
    (children || []).forEach((child) => {
      conductDown(child.key);
    });
  }

  function conduct(key) {
    const entity = keyEntities[key];

    if (!entity) {
      warning(false, `'${key}' does not exist in the tree.`);
      return;
    }

    const { children, parent, node } = entity;
    checkedKeys[key] = isCheck;
    
    if (isCheckDisabled(node)) return;

    if(isInSearch&&doSearchUnchecked&&isCheck&&!node.props.isLeaf){
      if(isCheck){
        if(!isNodeCheckedBeforeSearch(node,keyEntities,globalObj)){
          //实际子节点个数大于搜索出来的子节点个数，需要判断为半选
          if(children&&node.props._data.childCount>children.length){
            checkedKeys[key] = false;
            halfCheckedKeys[key] = true;
          }
        }
      }else{
        if(isNodeCheckedBeforeSearch(node,keyEntities,globalObj)){
          halfCheckedKeys[key] = true;
        }
      }
     
    }
    // Conduct down
    (children || [])
      .filter(child => !isCheckDisabled(child.node))
      .forEach((child) => {
        conductDown(child.key);
      });

    // Conduct up
    
    if (parent) {
        conductUp(parent.key);
    }
  }

  (keyList || []).forEach((key) => {
    conduct(key);
  });

  const checkedKeyList = [];
  const halfCheckedKeyList = [];

  // Fill checked list
  Object.keys(checkedKeys).forEach((key) => {
    if (checkedKeys[key]) {
      checkedKeyList.push(key);
    }
  });

  // Fill half checked list
  Object.keys(halfCheckedKeys).forEach((key) => {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(key);
    }
  });

  if(forNodeCheck){
    globalObj.fromNodeChecks={ 
      checkedKeys: checkedKeyList,
      halfCheckedKeys: halfCheckedKeyList
    };
  }
  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList,
  };
}

export function conductLoad(keyList, isCheck, keyEntities, status) {
  const checkedKeys = {};
  const halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)
  let checkStatus = status || {},
      oriCheckedKeys = checkStatus.checkedKeys || [],
      oriHalfCheckedKeys = checkStatus.halfCheckedKeys || [];

  oriCheckedKeys.forEach((key) => {
    checkedKeys[key] = true;
  });

  oriHalfCheckedKeys.forEach((key) => {
    halfCheckedKeys[key] = true;
  });

  // Conduct up
  function conductUp(key) {
    if (checkedKeys[key] === isCheck) return;

    const entity = keyEntities[key];
    if (!entity) return;

    const { children, parent, node } = entity;

    if (isCheckDisabled(node)) return;

    // Check child node checked status
    let everyChildChecked = true;
    (children || [])
      .filter(child => !isCheckDisabled(child.node))
      .forEach((child) => {
        let childKey = child.key;
        if (!checkedKeys[childKey]) {
          everyChildChecked = false;
        }
      });

    // Update checked status
    if (everyChildChecked) {
      checkedKeys[key] = true;
      if (parent) {
        conductUp(parent.key);
      }
    }
  }

  function conduct(key) {
    const entity = keyEntities[key];

    if (!entity) {
      warning(false, `'${key}' does not exist in the tree.`);
      return;
    }

    const { children, parent, node } = entity;
    checkedKeys[key] = isCheck;

    if (isCheckDisabled(node)) return;

    let everyChildChecked = true;
    // Conduct down
    (children || [])
      .filter(child => !isCheckDisabled(child.node))
      .forEach((child) => {
        let childKey = child.key;
        const entity = keyEntities[childKey];
        if (!entity) return;

        const { children, node } = entity;

        if (isCheckDisabled(node)) return;

        if(!checkedKeys[childKey]) {
          everyChildChecked = false;
        }
      });

    // Update checked status
    if (everyChildChecked) {
      checkedKeys[key] = true;

      // Conduct up
      if (parent) {
        conductUp(parent.key);
      }
    }
  }

  (keyList || []).forEach((key) => {
    conduct(key);
  });

  const checkedKeyList = [];
  const halfCheckedKeyList = [];

  // Fill checked list
  Object.keys(checkedKeys).forEach((key) => {
    if (checkedKeys[key]) {
      checkedKeyList.push(key);
    }
  });

  // Fill half checked list
  Object.keys(halfCheckedKeys).forEach((key) => {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(key);
    }
  });

  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList,
  };
}

/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */
export function conductExpandParent(keyList, keyEntities) {
  const expandedKeys = {};

  function conductUp(key) {
    if (expandedKeys[key]) return;

    const entity = keyEntities[key];
    if (!entity) return;

    expandedKeys[key] = true;

    const { parent, node } = entity;

    if (isCheckDisabled(node)) return;

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach((key) => {
    conductUp(key);
  });

  return Object.keys(expandedKeys);
}

/**
 * Returns only the data- and aria- key/value pairs
 * @param {object} props
 */
export function getDataAndAria(props) {
  return Object.keys(props).reduce((prev, key) => {
    if ((key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-')) {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}


//判断某个节点搜索前是否是选择状态
export function isNodeCheckedBeforeSearch(node,keyEntities,globalObj){
  if(globalObj.beforeSearchCheckKeys[node.key]){
    return true;
  }else{
    let _parent=keyEntities[node.key].parent;
    while(_parent){
      if(globalObj.beforeSearchCheckKeys[_parent.key]){
        return true;
      }else{
        _parent=keyEntities[_parent.key||"--"].parent;
      }
    }
  }
  return false;
}
