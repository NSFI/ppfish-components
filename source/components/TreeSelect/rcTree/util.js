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

    return (
      <TreeNode srcItem={item} key={props.key} {...processProps(props)}>
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
 * @returns {{checkedKeys: [], halfCheckedKeys: []}}
 */
export function conductCheck(keyList, isCheck, keyEntities, status, loadData, loadedKeys) {
  const checkedKeys = {};
  const halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)
  let checkStatus = status || {};

  (checkStatus.checkedKeys || []).forEach((key) => {
    checkedKeys[key] = true;
  });

  (checkStatus.halfCheckedKeys || []).forEach((key) => {
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
    } else {
      checkedKeys[key] = false;
    }
    halfCheckedKeys[key] = someChildChecked;

    if (parent) {
      conductUp(parent.key);
    }
  }

  // Conduct down
  function conductDown(key) {
    if (checkedKeys[key] === isCheck) return;

    const entity = keyEntities[key];
    if (!entity) return;

    const { children, node } = entity;

    if (isCheckDisabled(node)) return;

    checkedKeys[key] = isCheck;

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

  if(!globalObj.isInSearch){
    globalObj.beforeSearchCheckKeys=[];
    checkedKeyList.map((key)=>{
      globalObj.beforeSearchCheckKeys[key]=true;
    });
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


export function formatEntitiesforSearch(keyEntities,checkedKeys,treeNode,globalObj){
  let halfCheckedKeys=[];
  if(!globalObj.isInSearch){
    return halfCheckedKeys;
  }
  let temp=[];
  for(let k in keyEntities){
    
    let node=keyEntities[k].node;
    temp.push(node);
    if(!node.props.isLeaf){
      if(node.key==treeNode.key||node.key==treeNode.props.eventKey){
        halfCheckedKeys=arrDel(halfCheckedKeys,node.key);
        if(treeNode.props.srcItem._checked){
          if(!globalObj.beforeSearchCheckKeys[node.key]&&node.props.srcItem.childCount>node.props.children.length){
            halfCheckedKeys.push(node.key);
          }
        }else{
          if(globalObj.beforeSearchCheckKeys[node.key]&&node.props.srcItem.childCount>node.props.children.length){
            halfCheckedKeys.push(node.key);
          }
        }
      }else{
        let hadCk=node.props.children.some(n=>checkedKeys.indexOf(n.key) !== -1);
        let hadNoCk=node.props.children.some(n=>checkedKeys.indexOf(n.key) == -1);
        if(hadCk&&hadNoCk){
          halfCheckedKeys.push(node.key);
        }
        if(!hadNoCk){
          if(node.props.srcItem.childCount>node.props.children.length){
            halfCheckedKeys.push(node.key);
          }
        }
        if(!hadCk){
          if(globalObj.beforeSearchCheckKeys[node.key]&&node.props.srcItem.childCount>node.props.children.length){
            halfCheckedKeys.push(node.key);
          }
        }
      }
      
    }
  }
  return halfCheckedKeys;
 
}