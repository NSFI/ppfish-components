function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children } from 'react';
import warning from 'warning';
import TreeNode from './TreeNode.js';
var DRAG_SIDE_RANGE = 0.25;
var DRAG_MIN_GAP = 2;
var onlyTreeNodeWarned = false;
export function toArray(children) {
  var ret = [];
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
  var clone = list.slice();
  var index = clone.indexOf(value);

  if (index >= 0) {
    clone.splice(index, 1);
  }

  return clone;
}
export function arrAdd(list, value) {
  var clone = list.slice();

  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }

  return clone;
}
export function posToArr(pos) {
  return pos.split('-');
}
export function getPosition(level, index) {
  return "".concat(level, "-").concat(index);
}
export function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}
export function getNodeChildren(children) {
  return toArray(children).filter(isTreeNode);
}
export function isCheckDisabled(node) {
  var _ref = node.props || {},
      disabled = _ref.disabled,
      disableCheckbox = _ref.disableCheckbox;

  return !!(disabled || disableCheckbox);
}
export function traverseTreeNodes(treeNodes, callback) {
  function processNode(node, index, parent) {
    var children = node ? node.props.children : treeNodes;
    var pos = node ? getPosition(parent.pos, index) : 0; // Filter children

    var childList = getNodeChildren(children); // Process node if is not root

    if (node) {
      var data = {
        node: node,
        index: index,
        pos: pos,
        key: node.key || pos,
        parentPos: parent.node ? parent.pos : null
      };
      callback(data);
    } // Process children node


    Children.forEach(childList, function (subNode, subIndex) {
      processNode(subNode, subIndex, {
        node: node,
        pos: pos
      });
    });
  }

  processNode(null);
}
/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 */

export function mapChildren(children, func) {
  var list = toArray(children).map(func);

  if (list.length === 1) {
    return list[0];
  }

  return list;
}
export function getDragNodesKeys(treeNodes, node) {
  var _node$props = node.props,
      eventKey = _node$props.eventKey,
      pos = _node$props.pos;
  var dragNodesKeys = [];
  traverseTreeNodes(treeNodes, function (_ref2) {
    var key = _ref2.key;
    dragNodesKeys.push(key);
  });
  dragNodesKeys.push(eventKey || pos);
  return dragNodesKeys;
} // Only used when drag, not affect SSR.

export function calcDropPosition(event, treeNode) {
  var clientY = event.clientY;

  var _treeNode$selectHandl = treeNode.selectHandle.getBoundingClientRect(),
      top = _treeNode$selectHandl.top,
      bottom = _treeNode$selectHandl.bottom,
      height = _treeNode$selectHandl.height;

  var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

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
  var multiple = props.multiple;

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
  return keyList.map(function (key) {
    return String(key);
  });
}

var internalProcessProps = function internalProcessProps(props) {
  return props;
};

export function convertDataToTree(treeData, processer) {
  if (!treeData) return [];

  var _ref3 = processer || {},
      _ref3$processProps = _ref3.processProps,
      processProps = _ref3$processProps === void 0 ? internalProcessProps : _ref3$processProps;

  var list = Array.isArray(treeData) ? treeData : [treeData];
  return list.map(function (_ref4, index) {
    var children = _ref4.children,
        props = _objectWithoutProperties(_ref4, ["children"]);

    var childrenNodes = convertDataToTree(children, processer);
    return React.createElement(TreeNode, _extends({
      key: props.key
    }, processProps(props)), childrenNodes);
  });
} // TODO: ========================= NEW LOGIC =========================

/**
 * Calculate treeNodes entities. `processTreeEntity` is used for `rc-tree-select`
 * @param treeNodes
 * @param processTreeEntity  User can customize the entity
 */

export function convertTreeToEntities(treeNodes) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      initWrapper = _ref5.initWrapper,
      processEntity = _ref5.processEntity,
      onProcessFinished = _ref5.onProcessFinished;

  var posEntities = {};
  var keyEntities = {};
  var wrapper = {
    posEntities: posEntities,
    keyEntities: keyEntities
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseTreeNodes(treeNodes, function (item) {
    var node = item.node,
        index = item.index,
        pos = item.pos,
        key = item.key,
        parentPos = item.parentPos;
    var entity = {
      node: node,
      index: index,
      key: key,
      pos: pos
    };
    posEntities[pos] = entity;
    keyEntities[key] = entity; // Fill children

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
  } // Convert keys to object format


  var keyProps;

  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if (_typeof(keys) === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined
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
  var checkedKeys = {};
  var halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)

  var checkStatus = status || {};
  (checkStatus.checkedKeys || []).forEach(function (key) {
    checkedKeys[key] = true;
  });
  (checkStatus.halfCheckedKeys || []).forEach(function (key) {
    halfCheckedKeys[key] = true;
  }); // Conduct up

  function conductUp(key) {
    if (checkedKeys[key] === isCheck) return;
    var entity = keyEntities[key];
    if (!entity) return;
    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    if (isCheckDisabled(node)) return; // Check child node checked status

    var everyChildChecked = true;
    var someChildChecked = false; // Child checked or half checked

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (child) {
      var childKey = child.key;
      var childChecked = checkedKeys[childKey];
      var childHalfChecked = halfCheckedKeys[childKey];
      if (childChecked || childHalfChecked) someChildChecked = true;

      if ( // 取消勾选
      !childChecked // 注释以下代码，避免异步加载非搜索状态下上级全选不联动的问题。改为搜索状态下上级节点全选联动，半选不联动。
      // 搜索状态的异步加载模式下，当前父节点key不在已加载的节点中，全选子节点时，不选中父节点
      // || (upperSearchValue && loadData && (!loadedKeys || loadedKeys.indexOf(key) == -1))
      ) {
          everyChildChecked = false;
        }
    }); // Update checked status

    if (isCheck) {
      checkedKeys[key] = everyChildChecked;
    } else {
      checkedKeys[key] = false;
    }

    halfCheckedKeys[key] = someChildChecked;

    if (parent) {
      conductUp(parent.key);
    }
  } // Conduct down


  function conductDown(key) {
    if (checkedKeys[key] === isCheck) return;
    var entity = keyEntities[key];
    if (!entity) return;
    var children = entity.children,
        node = entity.node;
    if (isCheckDisabled(node)) return;
    checkedKeys[key] = isCheck;
    (children || []).forEach(function (child) {
      conductDown(child.key);
    });
  }

  function conduct(key) {
    var entity = keyEntities[key];

    if (!entity) {
      warning(false, "'".concat(key, "' does not exist in the tree."));
      return;
    }

    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    checkedKeys[key] = isCheck;
    if (isCheckDisabled(node)) return; // Conduct down

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (child) {
      conductDown(child.key);
    }); // Conduct up

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conduct(key);
  });
  var checkedKeyList = [];
  var halfCheckedKeyList = []; // Fill checked list

  Object.keys(checkedKeys).forEach(function (key) {
    if (checkedKeys[key]) {
      checkedKeyList.push(key);
    }
  }); // Fill half checked list

  Object.keys(halfCheckedKeys).forEach(function (key) {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(key);
    }
  });
  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  };
}
export function conductLoad(keyList, isCheck, keyEntities, status) {
  var checkedKeys = {};
  var halfCheckedKeys = {}; // Record the key has some child checked (include child half checked)

  var checkStatus = status || {},
      oriCheckedKeys = checkStatus.checkedKeys || [],
      oriHalfCheckedKeys = checkStatus.halfCheckedKeys || [];
  oriCheckedKeys.forEach(function (key) {
    checkedKeys[key] = true;
  });
  oriHalfCheckedKeys.forEach(function (key) {
    halfCheckedKeys[key] = true;
  }); // Conduct up

  function conductUp(key) {
    if (checkedKeys[key] === isCheck) return;
    var entity = keyEntities[key];
    if (!entity) return;
    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    if (isCheckDisabled(node)) return; // Check child node checked status

    var everyChildChecked = true;
    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (child) {
      var childKey = child.key;

      if (!checkedKeys[childKey]) {
        everyChildChecked = false;
      }
    }); // Update checked status

    if (everyChildChecked) {
      checkedKeys[key] = true;

      if (parent) {
        conductUp(parent.key);
      }
    }
  }

  function conduct(key) {
    var entity = keyEntities[key];

    if (!entity) {
      warning(false, "'".concat(key, "' does not exist in the tree."));
      return;
    }

    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    checkedKeys[key] = isCheck;
    if (isCheckDisabled(node)) return;
    var everyChildChecked = true; // Conduct down

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (child) {
      var childKey = child.key;
      var entity = keyEntities[childKey];
      if (!entity) return;
      var children = entity.children,
          node = entity.node;
      if (isCheckDisabled(node)) return;

      if (!checkedKeys[childKey]) {
        everyChildChecked = false;
      }
    }); // Update checked status

    if (everyChildChecked) {
      checkedKeys[key] = true; // Conduct up

      if (parent) {
        conductUp(parent.key);
      }
    }
  }

  (keyList || []).forEach(function (key) {
    conduct(key);
  });
  var checkedKeyList = [];
  var halfCheckedKeyList = []; // Fill checked list

  Object.keys(checkedKeys).forEach(function (key) {
    if (checkedKeys[key]) {
      checkedKeyList.push(key);
    }
  }); // Fill half checked list

  Object.keys(halfCheckedKeys).forEach(function (key) {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(key);
    }
  });
  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  };
}
/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */

export function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = {};

  function conductUp(key) {
    if (expandedKeys[key]) return;
    var entity = keyEntities[key];
    if (!entity) return;
    expandedKeys[key] = true;
    var parent = entity.parent,
        node = entity.node;
    if (isCheckDisabled(node)) return;

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conductUp(key);
  });
  return Object.keys(expandedKeys);
}
/**
 * Returns only the data- and aria- key/value pairs
 * @param {object} props
 */

export function getDataAndAria(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      prev[key] = props[key];
    }

    return prev;
  }, {});
}