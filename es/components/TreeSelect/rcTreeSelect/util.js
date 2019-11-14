function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import warning from 'warning';
import { convertDataToTree as rcConvertDataToTree, convertTreeToEntities as rcConvertTreeToEntities, conductCheck as rcConductCheck } from '../rcTree/util.js';
import SelectNode from './SelectNode.js';
import { SHOW_CHILD, SHOW_PARENT } from './strategies.js';
var warnDeprecatedLabel = false;
export function toNodeArray(children) {
  var ret = [];
  React.Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
} // =================== MISC ====================

export function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }

  return null;
}
export function toArray(data) {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
} // Shallow copy of React 16.3 createRef api

export function createRef() {
  var func = function setRef(node) {
    func.current = node;
  };

  return func;
} // =============== Legacy ===============

export var UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
};
export var UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'unselectable'
};
/**
 * Convert position list to hierarchy structure.
 * This is little hack since use '-' to split the position.
 */

export function flatToHierarchy(positionList) {
  if (!positionList.length) {
    return [];
  }

  var entrances = {}; // Prepare the position map

  var posMap = {};
  var parsedList = positionList.slice().map(function (entity) {
    var clone = _objectSpread({}, entity, {
      fields: entity.pos.split('-')
    });

    delete clone.children;
    return clone;
  });
  parsedList.forEach(function (entity) {
    posMap[entity.pos] = entity;
  }); // 按照节点的位置排序

  parsedList.sort(function (a, b) {
    var aLen = a.fields.length,
        bLen = b.fields.length,
        minLen = aLen <= bLen ? aLen : bLen;

    for (var i = 0; i < minLen; i++) {
      var aPos = a.fields[i],
          bPos = b.fields[i];

      if (aPos == bPos) {
        if (i == minLen - 1) {
          return -1;
        }
      } else {
        return aPos - bPos;
      }
    }
  }); // Create the hierarchy

  parsedList.forEach(function (entity) {
    var parentPos = entity.fields.slice(0, -1).join('-');
    var parentEntity = posMap[parentPos];

    if (!parentEntity) {
      entrances[entity.pos] = entity;
    } else {
      parentEntity.children = parentEntity.children || [];
      parentEntity.children.push(entity);
    } // Some time position list provide `key`, we don't need it


    delete entity.key;
    delete entity.fields;
  });
  return Object.keys(entrances).map(function (key) {
    return entrances[key];
  });
} // =============== Accessibility ===============

var ariaId = 0;
export function resetAriaId() {
  ariaId = 0;
}
export function generateAriaId(prefix) {
  ariaId += 1;
  return "".concat(prefix, "_").concat(ariaId);
}
export function isLabelInValue(props) {
  var treeCheckable = props.treeCheckable,
      treeCheckStrictly = props.treeCheckStrictly,
      labelInValue = props.labelInValue;

  if (treeCheckable && treeCheckStrictly) {
    return true;
  }

  return labelInValue || false;
} // =================== Tree ====================

export function parseSimpleTreeData(treeData, _ref) {
  var id = _ref.id,
      pId = _ref.pId,
      rootPId = _ref.rootPId;
  var keyNodes = {};
  var rootNodeList = []; // Fill in the map

  var nodeList = treeData.map(function (node) {
    var clone = _objectSpread({}, node);

    var key = clone[id];
    keyNodes[key] = clone;
    clone.key = clone.key || key;
    return clone;
  }); // Connect tree

  nodeList.forEach(function (node) {
    var parentKey = node[pId];
    var parent = keyNodes[parentKey]; // Fill parent

    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(node);
    } // Fill root tree node


    if (parentKey === rootPId || !parent && rootPId === null) {
      rootNodeList.push(node);
    }
  });
  return rootNodeList;
}
/**
 * Detect if position has relation.
 * e.g. 1-2 related with 1-2-3
 * e.g. 1-3-2 related with 1
 * e.g. 1-2 not related with 1-21
 */

export function isPosRelated(pos1, pos2) {
  var fields1 = pos1.split('-');
  var fields2 = pos2.split('-');
  var minLen = Math.min(fields1.length, fields2.length);

  for (var i = 0; i < minLen; i += 1) {
    if (fields1[i] !== fields2[i]) {
      return false;
    }
  }

  return true;
}
/**
 * This function is only used on treeNode check (none treeCheckStrictly but has searchInput).
 * We convert entity to { node, pos, children } format.
 * This is legacy bug but we still need to do with it.
 * @param entity
 */

export function cleanEntity(_ref2) {
  var node = _ref2.node,
      pos = _ref2.pos,
      children = _ref2.children;
  var instance = {
    node: node,
    pos: pos
  };

  if (children) {
    instance.children = children.map(cleanEntity);
  }

  return instance;
}
/**
 * Get a filtered TreeNode list by provided treeNodes.
 * [Legacy] Since `Tree` use `key` as map but `key` will changed by React,
 * we have to convert `treeNodes > data > treeNodes` to keep the key.
 * Such performance hungry!
 */

export function getFilterTree(treeNodes, searchValue, filterFunc, valueEntities) {
  if (!searchValue) {
    return null;
  }

  function mapFilteredNodeToData(node) {
    if (!node) return null;
    var match = false;

    if (filterFunc(searchValue, node)) {
      match = true;
    } // Fixed checked status error in search result
    // const children = (React.Children.map(node.props.children, mapFilteredNodeToData) || []).filter(n => n);


    var children = toNodeArray(node.props.children).map(mapFilteredNodeToData).filter(function (n) {
      return n;
    });

    if (children.length || match) {
      return React.createElement(SelectNode, _extends({}, node.props, {
        key: valueEntities[node.props.value].key
      }), children);
    }

    return null;
  }

  return treeNodes.map(mapFilteredNodeToData).filter(function (node) {
    return node;
  });
} // =================== Value ===================

/**
 * Convert value to array format to make logic simplify.
 */

export function formatInternalValue(value, props) {
  var valueList = toArray(value); // Parse label in value

  if (isLabelInValue(props)) {
    return valueList.map(function (val) {
      if (_typeof(val) !== 'object' || !val) {
        return {
          value: '',
          label: ''
        };
      }

      return val;
    });
  }

  return valueList.map(function (val) {
    return {
      value: val
    };
  });
}
export function getLabel(wrappedValue, entity, treeNodeLabelProp) {
  if (wrappedValue.label) {
    return wrappedValue.label;
  }

  if (entity && entity.node.props) {
    return entity.node.props[treeNodeLabelProp];
  } // Since value without entity will be in missValueList.
  // This code will never reached, but we still need this in case.


  return wrappedValue.value;
}
/**
 * Convert internal state `valueList` to user needed value list.
 * This will return an array list. You need check if is not multiple when return.
 *
 * `allCheckedNodes` is used for `treeCheckStrictly`
 */

export function formatSelectorValue(valueList, props, valueEntities) {
  var treeNodeLabelProp = props.treeNodeLabelProp,
      treeCheckable = props.treeCheckable,
      treeCheckStrictly = props.treeCheckStrictly,
      showCheckedStrategy = props.showCheckedStrategy; // Will hide some value if `showCheckedStrategy` is set

  if (treeCheckable && !treeCheckStrictly) {
    var values = {};
    valueList.forEach(function (wrappedValue) {
      values[wrappedValue.value] = wrappedValue;
    });
    var hierarchyList = flatToHierarchy(valueList.map(function (_ref3) {
      var value = _ref3.value;
      return valueEntities[value];
    }));

    if (showCheckedStrategy === SHOW_PARENT) {
      // 返回除 label、value 外更多的信息
      // Only get the parent checked value
      return hierarchyList.map(function (_ref4) {
        var _ref4$node$props = _ref4.node.props,
            label = _ref4$node$props.label,
            value = _ref4$node$props.value,
            restProps = _objectWithoutProperties(_ref4$node$props, ["label", "value"]);

        return _objectSpread({
          label: getLabel(values[value], valueEntities[value], treeNodeLabelProp),
          value: value
        }, restProps);
      });
    } else if (showCheckedStrategy === SHOW_CHILD) {
      // Only get the children checked value
      var targetValueList = []; // Find the leaf children

      var traverse = function traverse(_ref5) {
        var _ref5$node$props = _ref5.node.props,
            label = _ref5$node$props.label,
            value = _ref5$node$props.value,
            restProps = _objectWithoutProperties(_ref5$node$props, ["label", "value"]),
            children = _ref5.children;

        if (!children || children.length === 0) {
          // 返回除 label、value 外更多的信息
          targetValueList.push(_objectSpread({
            label: getLabel(values[value], valueEntities[value], treeNodeLabelProp),
            value: value
          }, restProps));
          return;
        }

        children.forEach(function (entity) {
          traverse(entity);
        });
      };

      hierarchyList.forEach(function (entity) {
        traverse(entity);
      });
      return targetValueList;
    }
  } // return valueList.map(wrappedValue => ({
  //   label: getLabel(wrappedValue, valueEntities[wrappedValue.value], treeNodeLabelProp),
  //   value: wrappedValue.value,
  // }));
  // 返回除 label、value 外更多的信息


  return valueList.map(function (wrappedValue) {
    var label = wrappedValue.label,
        value = wrappedValue.value,
        restWrappedValue = _objectWithoutProperties(wrappedValue, ["label", "value"]);

    return _objectSpread({
      label: getLabel(wrappedValue, valueEntities[wrappedValue.value], treeNodeLabelProp),
      value: wrappedValue.value
    }, restWrappedValue);
  });
}
/**
 * Use `rc-tree` convertDataToTree to convert treeData to TreeNodes.
 * This will change the label to title value
 */

function processProps(props) {
  var title = props.title,
      label = props.label,
      key = props.key,
      value = props.value;

  var cloneProps = _objectSpread({}, props); // Warning user not to use deprecated label prop.


  if (label && !title) {
    if (!warnDeprecatedLabel) {
      warning(false, '\'label\' in treeData is deprecated. Please use \'title\' instead.');
      warnDeprecatedLabel = true;
    }

    cloneProps.title = label;
  }

  if (!key) {
    cloneProps.key = value;
  }

  return cloneProps;
}

export function convertDataToTree(treeData) {
  return rcConvertDataToTree(treeData, {
    processProps: processProps
  });
}
/**
 * Use `rc-tree` convertTreeToEntities for entities calculation.
 * We have additional entities of `valueEntities`
 */

function initWrapper(wrapper) {
  return _objectSpread({}, wrapper, {
    valueEntities: {}
  });
}

function processEntity(entity, wrapper) {
  var value = entity.node.props.value;
  entity.value = value;
  wrapper.valueEntities[value] = entity;
}

export function convertTreeToEntities(treeNodes) {
  return rcConvertTreeToEntities(treeNodes, {
    initWrapper: initWrapper,
    processEntity: processEntity
  });
}
export var conductCheck = rcConductCheck;