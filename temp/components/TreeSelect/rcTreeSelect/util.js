import React from 'react';
import warning from 'warning';
import {
  convertDataToTree as rcConvertDataToTree,
  convertTreeToEntities as rcConvertTreeToEntities,
  conductCheck as rcConductCheck,
} from '../rcTree/util.js';
import SelectNode from './SelectNode.js';
import { SHOW_CHILD, SHOW_PARENT } from './strategies.js';

let warnDeprecatedLabel = false;

export function toNodeArray(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

// =================== MISC ====================
export function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }
  return null;
}

export function toArray(data) {
  if (!data) return [];

  return Array.isArray(data) ? data : [data];
}

// Shallow copy of React 16.3 createRef api
export function createRef() {
  const func = function setRef(node) {
    func.current = node;
  };
  return func;
}

// =============== Legacy ===============
export const UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
};

export const UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'unselectable',
};

/**
 * Convert position list to hierarchy structure.
 * This is little hack since use '-' to split the position.
 */
export function flatToHierarchy(positionList) {

  if (!positionList.length) {
    return [];
  }

  const entrances = {};

  // Prepare the position map
  const posMap = {};
  const parsedList = positionList.slice().map(entity => {
    const clone = {
      ...entity,
      fields: entity.pos.split('-'),
    };
    delete clone.children;
    return clone;
  });

  parsedList.forEach((entity) => {
    posMap[entity.pos] = entity;
  });

  // 按照节点的位置排序
  parsedList.sort((a, b) => {
    let aLen = a.fields.length,
        bLen = b.fields.length,
        minLen = aLen <= bLen ? aLen : bLen;

    for (let i=0; i<minLen; i++) {
      let aPos = a.fields[i],
          bPos = b.fields[i];

      if (aPos == bPos) {
        if (i == minLen - 1) {
          return -1;
        }
      } else {
        return aPos - bPos;
      }
    }
  });

  // Create the hierarchy
  parsedList.forEach((entity) => {
    const parentPos = entity.fields.slice(0, -1).join('-');
    const parentEntity = posMap[parentPos];

    if (!parentEntity) {
      entrances[entity.pos] = entity;
    } else {
      parentEntity.children = parentEntity.children || [];
      parentEntity.children.push(entity);
    }

    // Some time position list provide `key`, we don't need it
    delete entity.key;
    delete entity.fields;
  });

  return Object.keys(entrances).map(key => entrances[key]);
}

// =============== Accessibility ===============
let ariaId = 0;

export function resetAriaId() {
  ariaId = 0;
}

export function generateAriaId(prefix) {
  ariaId += 1;
  return `${prefix}_${ariaId}`;
}

export function isLabelInValue(props) {
  const { treeCheckable, treeCheckStrictly, labelInValue } = props;
  if (treeCheckable && treeCheckStrictly) {
    return true;
  }
  return labelInValue || false;
}

// =================== Tree ====================
export function parseSimpleTreeData(treeData, { id, pId, rootPId }) {
  const keyNodes = {};
  const rootNodeList = [];

  // Fill in the map
  const nodeList = treeData.map((node) => {
    const clone = { ...node };
    const key = clone[id];
    keyNodes[key] = clone;
    clone.key = clone.key || key;
    return clone;
  });

  // Connect tree
  nodeList.forEach((node) => {
    const parentKey = node[pId];
    const parent = keyNodes[parentKey];

    // Fill parent
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(node);
    }

    // Fill root tree node
    if (parentKey === rootPId || (!parent && rootPId === null)) {
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
  const fields1 = pos1.split('-');
  const fields2 = pos2.split('-');

  const minLen = Math.min(fields1.length, fields2.length);
  for (let i = 0; i < minLen; i += 1) {
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
export function cleanEntity({ node, pos, children }) {
  const instance = {
    node,
    pos,
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

    let match = false;
    if (filterFunc(searchValue, node)) {
      match = true;
    }

    // Fixed checked status error in search result
    // const children = (React.Children.map(node.props.children, mapFilteredNodeToData) || []).filter(n => n);
    const children = toNodeArray(node.props.children).map(mapFilteredNodeToData).filter(n => n);

    if (children.length || match) {
      return (
        <SelectNode
          {...node.props}
          key={valueEntities[node.props.value].key}
        >
          {children}
        </SelectNode>
      );
    }

    return null;
  }

  return treeNodes.map(mapFilteredNodeToData).filter(node => node);
}

// =================== Value ===================
/**
 * Convert value to array format to make logic simplify.
 */
export function formatInternalValue(value, props) {
  const valueList = toArray(value);

  // Parse label in value
  if (isLabelInValue(props)) {
    return valueList.map((val) => {
      if (typeof val !== 'object' || !val) {
        return {
          value: '',
          label: '',
        };
      }

      return val;
    });
  }

  return valueList.map(val => ({
    value: val,
  }));
}

export function getLabel(wrappedValue, entity, treeNodeLabelProp) {
  if (wrappedValue.label) {
    return wrappedValue.label;
  }

  if (entity && entity.node.props) {
    return entity.node.props[treeNodeLabelProp];
  }

  // Since value without entity will be in missValueList.
  // This code will never reached, but we still need this in case.
  return wrappedValue.value;
}

/**
 * Convert internal state `valueList` to user needed value list.
 * This will return an array list. You need check if is not multiple when return.
 * `allCheckedNodes` is used for `treeCheckStrictly`
 */
export function formatSelectorValue(valueList, props, valueEntities) {
  const {
    treeNodeLabelProp,
    treeCheckable, treeCheckStrictly, showCheckedStrategy,
  } = props;


  // Will hide some value if `showCheckedStrategy` is set
  if (treeCheckable && !treeCheckStrictly) {
    const values = {};
    valueList.forEach((wrappedValue) => {
      values[wrappedValue.value] = wrappedValue;
    });
    const hierarchyList = flatToHierarchy(valueList.map(({ value }) => valueEntities[value]));

    if (showCheckedStrategy === SHOW_PARENT) {
      // 返回除 label、value 外更多的信息
      // Only get the parent checked value
      return hierarchyList.map(({ node: { props: { label, value, ...restProps } } }) => ({
        label: getLabel(values[value], valueEntities[value], treeNodeLabelProp),
        value,
        ...restProps
      }));

    } else if (showCheckedStrategy === SHOW_CHILD) {
      // Only get the children checked value
      const targetValueList = [];

      // Find the leaf children
      const traverse = ({ node: { props: { label, value, ...restProps } }, children }) => {
        if (!children || children.length === 0) {
          // 返回除 label、value 外更多的信息
          targetValueList.push({
            label: getLabel(values[value], valueEntities[value], treeNodeLabelProp),
            value,
            ...restProps
          });
          return;
        }

        children.forEach((entity) => {
          traverse(entity);
        });
      };

      hierarchyList.forEach((entity) => {
        traverse(entity);
      });

      return targetValueList;
    }
  }

  // return valueList.map(wrappedValue => ({
  //   label: getLabel(wrappedValue, valueEntities[wrappedValue.value], treeNodeLabelProp),
  //   value: wrappedValue.value,
  // }));

  // 返回除 label、value 外更多的信息
  return valueList.map(wrappedValue => {
    const { label, value, ...restWrappedValue } = wrappedValue;
    return {
      label: getLabel(wrappedValue, valueEntities[wrappedValue.value], treeNodeLabelProp),
      value: wrappedValue.value,
      ...restWrappedValue
    };
  });
}

/**
 * Use `rc-tree` convertDataToTree to convert treeData to TreeNodes.
 * This will change the label to title value
 */
function processProps(props) {
  const { title, label, key, value } = props;
  const cloneProps = { ...props };

  // Warning user not to use deprecated label prop.
  if (label && !title) {
    if (!warnDeprecatedLabel) {
      warning(
        false,
        '\'label\' in treeData is deprecated. Please use \'title\' instead.'
      );
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
  return rcConvertDataToTree(treeData, { processProps });
}

/**
 * Use `rc-tree` convertTreeToEntities for entities calculation.
 * We have additional entities of `valueEntities`
 */
function initWrapper(wrapper) {
  return {
    ...wrapper,
    valueEntities: {},
  };
}

function processEntity(entity, wrapper) {
  const value = entity.node.props.value;
  entity.value = value;
  wrapper.valueEntities[value] = entity;
}

export function convertTreeToEntities(treeNodes) {
  return rcConvertTreeToEntities(treeNodes, {
    initWrapper,
    processEntity,
  });
}

export const conductCheck = rcConductCheck;
