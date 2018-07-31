'use strict';

exports.__esModule = true;
exports.arrDel = arrDel;
exports.arrAdd = arrAdd;
exports.posToArr = posToArr;
exports.getPosition = getPosition;
exports.getNodeChildren = getNodeChildren;
exports.isCheckDisabled = isCheckDisabled;
exports.traverseTreeNodes = traverseTreeNodes;
exports.getStrictlyValue = getStrictlyValue;
exports.getFullKeyList = getFullKeyList;
exports.isParent = isParent;
exports.getNodesStatistic = getNodesStatistic;
exports.getDragNodesKeys = getDragNodesKeys;
exports.calcDropPosition = calcDropPosition;
exports.calcExpandedKeys = calcExpandedKeys;
exports.calcSelectedKeys = calcSelectedKeys;
exports.calcCheckStateConduct = calcCheckStateConduct;
exports.calcCheckedKeys = calcCheckedKeys;

let _react = require('react');

let _warning = require('warning');

let _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint no-loop-func: 0*/
let DRAG_SIDE_RANGE = 0.25;
let DRAG_MIN_GAP = 2;

function arrDel(list, value) {
  let clone = list.slice();
  let index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}

function arrAdd(list, value) {
  let clone = list.slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}

function posToArr(pos) {
  return pos.split('-');
}

function getPosition(level, index) {
  return level + '-' + index;
}

function getNodeChildren(children) {
  let childList = Array.isArray(children) ? children : [children];
  return childList.filter(function (child) {
    return child && child.type && child.type.isTreeNode;
  });
}

function isCheckDisabled(node) {
  let _ref = node.props || {},
      disabled = _ref.disabled,
      disableCheckbox = _ref.disableCheckbox;

  return !!(disabled || disableCheckbox);
}

function traverseTreeNodes(treeNodes, subTreeData, callback) {
  if (typeof subTreeData === 'function') {
    callback = subTreeData;
    subTreeData = false;
  }

  function processNode(node, index, parent) {
    let children = node ? node.props.children : treeNodes;
    let pos = node ? getPosition(parent.pos, index) : 0;

    // Filter children
    let childList = getNodeChildren(children);

    // Process node if is not root
    if (node) {
      let data = {
        node: node,
        index: index,
        pos: pos,
        key: node.key || pos,
        parentPos: parent.node ? parent.pos : null
      };

      // Children data is not must have
      if (subTreeData) {
        // Statistic children
        let subNodes = [];
        _react.Children.forEach(childList, function (subNode, subIndex) {
          // Provide limit snapshot
          let subPos = getPosition(pos, index);
          subNodes.push({
            node: subNode,
            key: subNode.key || subPos,
            pos: subPos,
            index: subIndex
          });
        });
        data.subNodes = subNodes;
      }

      // Can break traverse by return false
      if (callback(data) === false) {
        return;
      }
    }

    // Process children node
    _react.Children.forEach(childList, function (subNode, subIndex) {
      processNode(subNode, subIndex, { node: node, pos: pos });
    });
  }

  processNode(null);
}

/**
 * [Legacy] Return halfChecked when it has value.
 * @param checkedKeys
 * @param halfChecked
 * @returns {*}
 */
function getStrictlyValue(checkedKeys, halfChecked) {
  if (halfChecked) {
    return { checked: checkedKeys, halfChecked: halfChecked };
  }
  return checkedKeys;
}

function getFullKeyList(treeNodes) {
  let keyList = [];
  traverseTreeNodes(treeNodes, function (_ref2) {
    let key = _ref2.key;

    keyList.push(key);
  });
  return keyList;
}

/**
 * Check position relation.
 * @param parentPos
 * @param childPos
 * @param directly only directly parent can be true
 * @returns {boolean}
 */
function isParent(parentPos, childPos) {
  let directly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!parentPos || !childPos || parentPos.length > childPos.length) return false;

  let parentPath = posToArr(parentPos);
  let childPath = posToArr(childPos);

  // Directly check
  if (directly && parentPath.length !== childPath.length - 1) return false;

  let len = parentPath.length;
  for (let i = 0; i < len; i += 1) {
    if (parentPath[i] !== childPath[i]) return false;
  }

  return true;
}

/**
 * Statistic TreeNodes info
 * @param treeNodes
 * @returns {{}}
 */
function getNodesStatistic(treeNodes) {
  let statistic = {
    keyNodes: {},
    posNodes: {},
    nodeList: []
  };

  traverseTreeNodes(treeNodes, true, function (_ref3) {
    let node = _ref3.node,
        index = _ref3.index,
        pos = _ref3.pos,
        key = _ref3.key,
        subNodes = _ref3.subNodes,
        parentPos = _ref3.parentPos;

    let data = { node: node, index: index, pos: pos, key: key, subNodes: subNodes, parentPos: parentPos };
    statistic.keyNodes[key] = data;
    statistic.posNodes[pos] = data;
    statistic.nodeList.push(data);
  });

  return statistic;
}

function getDragNodesKeys(treeNodes, node) {
  let _node$props = node.props,
      eventKey = _node$props.eventKey,
      pos = _node$props.pos;

  let dragNodesKeys = [];

  traverseTreeNodes(treeNodes, function (_ref4) {
    let nodePos = _ref4.pos,
        key = _ref4.key;

    if (isParent(pos, nodePos)) {
      dragNodesKeys.push(key);
    }
  });
  dragNodesKeys.push(eventKey || pos);
  return dragNodesKeys;
}

// Only used when drag, not affect SSR.
function calcDropPosition(event, treeNode) {
  let clientY = event.clientY;

  let _treeNode$selectHandl = treeNode.selectHandle.getBoundingClientRect(),
      top = _treeNode$selectHandl.top,
      bottom = _treeNode$selectHandl.bottom,
      height = _treeNode$selectHandl.height;

  let des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

  if (clientY <= top + des) {
    return -1;
  } else if (clientY >= bottom - des) {
    return 1;
  }

  return 0;
}

/**
 * Auto expand all related node when sub node is expanded
 * @param keyList
 * @param props
 * @returns [string]
 */
function calcExpandedKeys(keyList, props) {
  if (!keyList) {
    return [];
  }

  let children = props.children;

  // Fill parent expanded keys

  let _getNodesStatistic = getNodesStatistic(children),
      keyNodes = _getNodesStatistic.keyNodes,
      nodeList = _getNodesStatistic.nodeList;

  let needExpandKeys = {};
  let needExpandPathList = [];

  // Fill expanded nodes
  keyList.forEach(function (key) {
    let node = keyNodes[key];
    if (node) {
      needExpandKeys[key] = true;
      needExpandPathList.push(node.pos);
    }
  });

  // Match parent by path
  nodeList.forEach(function (_ref5) {
    let pos = _ref5.pos,
        key = _ref5.key;

    if (needExpandPathList.some(function (childPos) {
      return isParent(pos, childPos);
    })) {
      needExpandKeys[key] = true;
    }
  });

  let calcExpandedKeyList = Object.keys(needExpandKeys);

  // [Legacy] Return origin keyList if calc list is empty
  return calcExpandedKeyList.length ? calcExpandedKeyList : keyList;
}

/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */
function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) {
    return undefined;
  }

  let multiple = props.multiple;

  if (multiple) {
    return selectedKeys.slice();
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }
  return selectedKeys;
}

/**
 * Check conduct is by key level. It pass though up & down.
 * When conduct target node is check means already conducted will be skip.
 * @param treeNodes
 * @param checkedKeys
 * @returns {{checkedKeys: Array, halfCheckedKeys: Array}}
 */
function calcCheckStateConduct(treeNodes, checkedKeys) {
  let _getNodesStatistic2 = getNodesStatistic(treeNodes),
      keyNodes = _getNodesStatistic2.keyNodes,
      posNodes = _getNodesStatistic2.posNodes;

  let tgtCheckedKeys = {};
  let tgtHalfCheckedKeys = {};

  // Conduct up
  function conductUp(key, halfChecked) {
    if (tgtCheckedKeys[key]) return;

    let _keyNodes$key = keyNodes[key],
        _keyNodes$key$subNode = _keyNodes$key.subNodes,
        subNodes = _keyNodes$key$subNode === undefined ? [] : _keyNodes$key$subNode,
        parentPos = _keyNodes$key.parentPos,
        node = _keyNodes$key.node;

    if (isCheckDisabled(node)) return;

    let allSubChecked = !halfChecked && subNodes.filter(function (sub) {
      return !isCheckDisabled(sub.node);
    }).every(function (sub) {
      return tgtCheckedKeys[sub.key];
    });

    if (allSubChecked) {
      tgtCheckedKeys[key] = true;
    } else {
      tgtHalfCheckedKeys[key] = true;
    }

    if (parentPos !== null) {
      conductUp(posNodes[parentPos].key, !allSubChecked);
    }
  }

  // Conduct down
  function conductDown(key) {
    if (tgtCheckedKeys[key]) return;
    let _keyNodes$key2 = keyNodes[key],
        _keyNodes$key2$subNod = _keyNodes$key2.subNodes,
        subNodes = _keyNodes$key2$subNod === undefined ? [] : _keyNodes$key2$subNod,
        node = _keyNodes$key2.node;


    if (isCheckDisabled(node)) return;

    tgtCheckedKeys[key] = true;

    subNodes.forEach(function (sub) {
      conductDown(sub.key);
    });
  }

  function conduct(key) {
    if (!keyNodes[key]) {
      (0, _warning2['default'])(false, '\'' + key + '\' does not exist in the tree.');
      return;
    }

    let _keyNodes$key3 = keyNodes[key],
        _keyNodes$key3$subNod = _keyNodes$key3.subNodes,
        subNodes = _keyNodes$key3$subNod === undefined ? [] : _keyNodes$key3$subNod,
        parentPos = _keyNodes$key3.parentPos,
        node = _keyNodes$key3.node;

    tgtCheckedKeys[key] = true;

    if (isCheckDisabled(node)) return;

    // Conduct down
    subNodes.filter(function (sub) {
      return !isCheckDisabled(sub.node);
    }).forEach(function (sub) {
      conductDown(sub.key);
    });

    // Conduct up
    if (parentPos !== null) {
      conductUp(posNodes[parentPos].key);
    }
  }

  checkedKeys.forEach(function (key) {
    conduct(key);
  });

  return {
    checkedKeys: Object.keys(tgtCheckedKeys),
    halfCheckedKeys: Object.keys(tgtHalfCheckedKeys).filter(function (key) {
      return !tgtCheckedKeys[key];
    })
  };
}

/**
 * Calculate the value of checked and halfChecked keys.
 * This should be only run in init or props changed.
 */
function calcCheckedKeys(keys, props) {
  let checkable = props.checkable,
      children = props.children,
      checkStrictly = props.checkStrictly;


  if (!checkable || !keys) {
    return null;
  }

  // Convert keys to object format
  let keyProps = void 0;
  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if (typeof keys === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined
    };
  } else {
    (0, _warning2['default'])(false, '`CheckedKeys` is not an array or an object');
    return null;
  }

  // Do nothing if is checkStrictly mode
  if (checkStrictly) {
    return keyProps;
  }

  // Conduct calculate the check status
  let _keyProps = keyProps,
      _keyProps$checkedKeys = _keyProps.checkedKeys,
      checkedKeys = _keyProps$checkedKeys === undefined ? [] : _keyProps$checkedKeys;

  return calcCheckStateConduct(children, checkedKeys);
}