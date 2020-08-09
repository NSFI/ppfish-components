/**
 * ARIA: https://www.w3.org/TR/wai-aria/#combobox
 * Sample 1:
 * https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/combobox/aria1.1pattern/listbox-combo.html
 * Sample 2:
 * https://www.w3.org/blog/wai-components-gallery/widget/combobox-with-aria-autocompleteinline/
 *
 * Tab logic:
 * Popup is close
 * 1. Focus input (mark component as focused)
 * 2. Press enter to show the popup
 * 3. If popup has input, focus it
 *
 * Popup is open
 * 1. press tab to close the popup
 * 2. Focus back to the selection input box
 * 3. Let the native tab going on
 *
 * TreeSelect use 2 design type.
 * In single mode, we should focus on the `span`
 * In multiple mode, we should focus on the `input`
 */

import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import KeyCode from '../../../utils/KeyCode.js';
import { shallowEqual } from '../../../utils/other.js';
import raf from 'raf';

import SelectTrigger from './SelectTrigger';
import { selectorContextTypes } from './Base/BaseSelector';
import { popupContextTypes } from './Base/BasePopup';
import SingleSelector from './Selector/SingleSelector';
import MultipleSelector, { multipleSelectorContextTypes } from './Selector/MultipleSelector';
import SinglePopup from './Popup/SinglePopup';
import MultiplePopup from './Popup/MultiplePopup';

import { SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from './strategies';

import {
  createRef, generateAriaId,
  formatInternalValue, formatSelectorValue,
  parseSimpleTreeData,
  convertDataToTree, convertTreeToEntities, conductCheck,
  flatToHierarchy,
  isPosRelated, isLabelInValue, getFilterTree,
  cleanEntity,
} from './util';
import {isNodeCheckedBeforeSearch} from "../rcTree/util";
import { valueProp } from './propTypes';
import SelectNode from './SelectNode';
import globalObj from "../globalObj.js";

class Select extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    prefixAria: PropTypes.string,
    multiple: PropTypes.bool,
    showArrow: PropTypes.bool,
    open: PropTypes.bool,
    value: valueProp,
    autoFocus: PropTypes.bool,
    editable: PropTypes.bool,
    esc: PropTypes.bool,
    required: PropTypes.bool,

    doSearchUnchecked: PropTypes.bool,

    defaultOpen: PropTypes.bool,
    defaultValue: valueProp,

    showSearch: PropTypes.bool,
    placeholder: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    inputValue: PropTypes.string, // [Legacy] Deprecated. Use `searchValue` instead.
    searchValue: PropTypes.string,
    autoClearSearchValue: PropTypes.bool,
    searchPlaceholder: PropTypes.node, // [Legacy] Confuse with placeholder
    disabled: PropTypes.bool,
    children: PropTypes.node,
    labelInValue: PropTypes.bool,
    maxTagCount: PropTypes.number,
    maxTagPlaceholder: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
    maxTagTextLength: PropTypes.number,
    showCheckedStrategy: PropTypes.oneOf([
      SHOW_ALL, SHOW_PARENT, SHOW_CHILD,
    ]),

    dropdownMatchSelectWidth: PropTypes.bool,
    tagWidth: PropTypes.number,
    treeData: PropTypes.array,
    treeDataSimpleMode: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    treeNodeFilterProp: PropTypes.string,
    treeNodeLabelProp: PropTypes.string,
    treeNodeResetTitle: PropTypes.string,
    treeCheckable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.node,
    ]),
    treeCheckStrictly: PropTypes.bool,
    showIcon: PropTypes.bool,
    icon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),
    treeLine: PropTypes.bool,
    treeDefaultExpandAll: PropTypes.bool,
    treeDefaultExpandedKeys: PropTypes.array,
    loadData: PropTypes.func,
    loading: PropTypes.bool,
    uniqueTreeNodeByLabel: PropTypes.bool,
    filterTreeNode: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    notFoundContent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    getPopupContainer: PropTypes.func,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    onChange: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onExpand: PropTypes.func,
    onReset: PropTypes.func,
    onDropdownVisibleChange: PropTypes.func,
  };

  static childContextTypes = {
    rcTreeSelect: PropTypes.shape({
      ...selectorContextTypes,
      ...multipleSelectorContextTypes,
      ...popupContextTypes,

      onSearchInputChange: PropTypes.func,
      onSearchInputKeyDown: PropTypes.func,
    }),
  };

  static defaultProps = {
    placeholder: '请选择',
    prefixCls: 'fishd-rc-tree-select',
    iconPrefix: 'fishdicon',
    prefixAria: 'fishd-rc-tree-select',
    showArrow: true,
    showSearch: false,
    editable: true,
    required: false,
    loading: false,
    autoClearSearchValue: false,
    showCheckedStrategy: SHOW_CHILD,

    // dropdownMatchSelectWidth change the origin design, set to false now
    // ref: https://github.com/react-component/select/blob/4cad95e098a341a09de239ad6981067188842020/src/Select.jsx#L344
    // ref: https://github.com/react-component/select/pull/71
    treeNodeFilterProp: 'title',
    treeNodeLabelProp: 'title',
    treeNodeResetTitle: '不选择任何分类',
    showIcon: false,
    notFoundContent: '无匹配结果',
    uniqueTreeNodeByLabel: false,
    autoExpandParent: true,
    getPopupContainer: () => document.body,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {} } = prevState;
    const {
      treeCheckable, treeCheckStrictly,
      filterTreeNode, treeNodeFilterProp,
      treeDataSimpleMode,
      loadData
    } = nextProps;
    const newState = {
      prevProps: nextProps,
      init: false,
    };

    // Process the state when props updated
    function processState(propName, updater) {
      if (prevProps[propName] !== nextProps[propName]) {
        updater(nextProps[propName], prevProps[propName]);
        return true;
      }
      return false;
    }

    let valueRefresh = false;

    // Open
    processState('open', (propValue) => {
      newState.open = !!propValue;
    });

    // Tree Nodes
    let treeNodes;
    let treeDataChanged = false;
    let treeDataModeChanged = false;
    processState('treeData', (propValue) => {
      treeNodes = convertDataToTree(propValue);
      treeDataChanged = true;
    });

    processState('treeDataSimpleMode', (propValue, prevValue) => {
      if (!propValue) return;

      const prev = !prevValue || prevValue === true ? {} : prevValue;

      // Shallow equal to avoid dynamic prop object
      if (!shallowEqual(propValue, prev)) {
        treeDataModeChanged = true;
      }
    });

    // Parse by `treeDataSimpleMode`
    if (treeDataSimpleMode && (treeDataChanged || treeDataModeChanged)) {
      const simpleMapper = {
        id: 'id',
        pId:'pId',
        rootPId: null,
        ...(treeDataSimpleMode !== true ? treeDataSimpleMode : {}),
      };
      treeNodes = convertDataToTree(
        parseSimpleTreeData(nextProps.treeData, simpleMapper)
      );
    }

    // If `treeData` not provide, use children TreeNodes
    if (!nextProps.treeData) {
      processState('children', (propValue) => {
        treeNodes = Array.isArray(propValue) ? propValue : [propValue];
      });
    }

    // Convert `treeData` to entities
    if (treeNodes) {
      const entitiesMap = convertTreeToEntities(treeNodes);
      newState.treeNodes = treeNodes;
      newState.posEntities = entitiesMap.posEntities;
      newState.valueEntities = entitiesMap.valueEntities;
      newState.keyEntities = entitiesMap.keyEntities;

      valueRefresh = true;
    }

    // Value List
    if (prevState.init) {
      if (nextProps.value && nextProps.value.length) {
        newState.oriValueList = nextProps.value;
        newState.curValueList = nextProps.value;
      } else if (nextProps.defaultValue && nextProps.defaultValue.length) {
        newState.oriValueList = nextProps.defaultValue;
        newState.curValueList = nextProps.defaultValue;
      }

      processState('defaultValue', (propValue) => {
        newState.valueList = formatInternalValue(propValue, nextProps);
        valueRefresh = true;
      });
    }

    processState('value', (propValue) => {
      newState.oriValueList = nextProps.value;
      newState.curValueList = nextProps.value;
      newState.valueList = formatInternalValue(propValue, nextProps);
      valueRefresh = true;
    });

    // Selector Value List
    if (valueRefresh) {
      // Find out that value not exist in the tree
      const missValueList = [];
      const filteredValueList = [];
      const keyList = [];

      // Get latest value list
      let latestValueList = newState.valueList;
      if (!latestValueList) {
        // Also need add prev missValueList to avoid new treeNodes contains the value
        latestValueList = [...prevState.valueList, ...prevState.missValueList];
      }

      // Get key by value
      latestValueList
        .forEach((wrapperValue) => {
          const { value } = wrapperValue;
          const entity = (newState.valueEntities || prevState.valueEntities)[value];

          if (entity) {
            keyList.push(entity.key);
            filteredValueList.push(wrapperValue);
            return;
          }

          // If not match, it may caused by ajax load. We need keep this
          missValueList.push(wrapperValue);
        });

      // We need calculate the value when tree is checked tree
      if (treeCheckable && !treeCheckStrictly) {
        // Calculate the keys need to be checked
        const { checkedKeys } = conductCheck(
          keyList,
          true,
          newState.keyEntities || prevState.keyEntities,
          null,
          loadData,null,false,nextProps.doSearchUnchecked
        );
        // Format value list again for internal usage
        newState.valueList = checkedKeys.map(key => ({
          value: (newState.keyEntities || prevState.keyEntities)[key].value,
        }));
      } else {
        newState.valueList = filteredValueList;
      }

      // Fill the missValueList, we still need display in the selector
      newState.missValueList = missValueList;
      // Calculate the value list for `Selector` usage
      if(valueRefresh||prevState.globalData.__handleConfirm||!nextProps.doSearchUnchecked){
        newState.selectorValueList = formatSelectorValue(
          newState.valueList,
          nextProps,
          newState.valueEntities || prevState.valueEntities,
        );
        prevState.globalData.__handleConfirm=false;
      }
    }

    // [Legacy] To align with `Select` component,
    // We use `searchValue` instead of `inputValue` but still keep the api
    // `inputValue` support `null` to work as `autoClearSearchValue`
    processState('inputValue', (propValue) => {
      if (propValue !== null) {
        newState.searchValue = propValue;
      }
    });

    // Search value
    processState('searchValue', (propValue) => {
      newState.searchValue = propValue;
    });

    // Do the search logic
    if (
      newState.searchValue !== undefined ||
      (prevState.searchValue && treeNodes)
    ) {
      const searchValue = newState.searchValue !== undefined ? newState.searchValue : prevState.searchValue;
      const upperSearchValue = String(searchValue).toUpperCase();

      let filterTreeNodeFn = filterTreeNode;
      if (filterTreeNode === false) {
        // Don't filter if is false
        filterTreeNodeFn = () => true;
      } else if (typeof filterTreeNodeFn !== 'function') {
        // When is not function (true or undefined), use inner filter
        filterTreeNodeFn = (_, node) => {
          const nodeValue = String(node.props[treeNodeFilterProp]).toUpperCase();
          return nodeValue.indexOf(upperSearchValue) !== -1;
        };
      }

      newState.filteredTreeNodes = getFilterTree(
        newState.treeNodes || prevState.treeNodes,
        searchValue,
        filterTreeNodeFn,
        newState.valueEntities || prevState.valueEntities,
      );
      globalObj.filteredTreeNodes=newState.filteredTreeNodes;
    }

    // Checked Strategy
    processState('showCheckedStrategy', () => {
      newState.selectorValueList = newState.selectorValueList || formatSelectorValue(
        newState.valueList || prevState.valueList,
        nextProps,
        newState.valueEntities || prevState.valueEntities,
      );
    });

    return newState;
  }

  constructor(props) {
    super(props);

    const {
      prefixAria,
      defaultOpen,
      open,
      required,
      editable,
      defaultValue,
      value
    } = props;

    let disableCloseTag = false;
    if (required && editable) {
      let initValue = value || defaultValue;
      if (typeof initValue == "string" || (Array.isArray(initValue) && initValue.length==1)) {
        disableCloseTag = true;
      }
    }
    this.globalData={
      beforeSearchSyncCheckKeys:[],
      beforeSearchSyncHalfCheckKeys:[]
    };
    this.state = {
      open: !!open || !!defaultOpen,
      valueList: [],
      missValueList: [], // Contains the value not in the tree
      selectorValueList: [], // Used for multiple selector
      valueEntities: {},
      keyEntities: {},
      searchValue: '',

      init: true,
      oriValueList: [],
      curValueList: [],

      // onChange 和 onConfirm 回调函数的回传参数
      returnValue: [],
      connectValueList: [],
      extra: {},

      disableCloseTag,
      globalData:this.globalData
    };

    this.selectorRef = createRef();
    this.selectTriggerRef = createRef();

    // ARIA need `aria-controls` props mapping
    // Since this need user input. Let's generate ourselves
    this.ariaId = generateAriaId(`${prefixAria}-list`);
    
  }

  getChildContext() {
    return {
      rcTreeSelect: {
        onSelectorFocus: this.onSelectorFocus,
        onSelectorBlur: this.onSelectorBlur,
        onSelectorKeyDown: this.onComponentKeyDown,
        onSelectorClear: this.onSelectorClear,
        onMultipleSelectorRemove: this.onMultipleSelectorRemove,

        onTreeNodeSelect: this.onTreeNodeSelect,
        onTreeNodeCheck: this.onTreeNodeCheck,
        onPopupKeyDown: this.onComponentKeyDown,

        onSearchInputChange: this.onSearchInputChange,
        onSearchInputKeyDown: this.onSearchInputKeyDown,
      },
    };
  }

  componentDidMount() {
    const { autoFocus, disabled } = this.props;

    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.valueList !== this.state.valueList) {
      this.forcePopupAlign();
    }
    const {curValueList}=this.state;
    let obj=globalObj;
    obj.treeNodes=this.state.treeNodes;
    //记录下搜索前选中的节点，以key为ID，也是节点的value值
    if(!obj.isInSearch && curValueList){
      obj.beforeSearchCheckKeys=[];
      const {checkKeys,halfCheckKeys}=this.remenberBeforeSearchChecks(obj);
      this.globalData.beforeSearchSyncCheckKeys=checkKeys;
      this.globalData.beforeSearchSyncHalfCheckKeys=halfCheckKeys;
      curValueList.map((key)=>{
        obj.beforeSearchCheckKeys[key]=true;
      });
    }
    obj.fromNodeChecks=null;//手动选择某个节点时，记录下计算出的checkedkeys，这样再次执行conductCheck计算时，可以直接返回数据,减少对conductCheck的调用.
  }

  // ==================== Selector ====================
  onSelectorFocus = () => {
    this.setState({ focused: true });
  };

  onSelectorBlur = () => {
    this.setState({ focused: false });

    // TODO: Close when Popup is also not focused
    // this.setState({ open: false });
  };

  // Handle key board event in both Selector and Popup
  onComponentKeyDown = (event) => {
    const { open } = this.state;
    const { esc } = this.props;
    const { keyCode } = event;

    if (!open) {
      if ([KeyCode.ENTER, KeyCode.DOWN].indexOf(keyCode) !== -1) {
        this.setOpenState(true);
      }
    } else if (KeyCode.ESC === keyCode) {
      esc && this.setOpenState(false);
    } else if ([KeyCode.UP, KeyCode.DOWN, KeyCode.LEFT, KeyCode.RIGHT].indexOf(keyCode) !== -1) {
      // TODO: Handle `open` state
      event.stopPropagation();
    }
  };

  onDeselect = (wrappedValue, node, nodeEventInfo) => {
    const { onDeselect } = this.props;
    if (!onDeselect) return;

    onDeselect(wrappedValue, node, nodeEventInfo);
  };

  onSelectorClear = (event) => {
    const { disabled } = this.props;
    if (disabled) return;

    this.triggerChange([], [], {}, true);

    if (!this.isSearchValueControlled()) {
      this.setUncontrolledState({
        searchValue: '',
        filteredTreeNodes: null,
      });
    }

    event.stopPropagation();
  };

  onMultipleSelectorRemove = (event, removeValue) => {
    event.stopPropagation();

    const { valueList, missValueList, valueEntities } = this.state;

    const { treeCheckable, treeCheckStrictly, treeNodeLabelProp, disabled, required, editable } = this.props;
    if (disabled) return;

    // Find trigger entity
    const triggerEntity = valueEntities[removeValue];

    // Clean up value
    let newValueList = valueList;
    if (triggerEntity) {
      // If value is in tree
      if (treeCheckable && !treeCheckStrictly) {
        newValueList = valueList.filter(({value}) => {
          const entity = valueEntities[value];
          return !isPosRelated(entity.pos, triggerEntity.pos);
        });
      } else {
        newValueList = valueList.filter(({value}) => value !== removeValue);
      }
    }

    const triggerNode = triggerEntity ? triggerEntity.node : null;

    const extraInfo = {
      triggerValue: removeValue,
      triggerNode,
    };
    const deselectInfo = {
      node: triggerNode,
    };

    // [Legacy] Little hack on this to make same action as `onCheck` event.
    if (treeCheckable) {
      const filteredEntityList = newValueList.map(({ value }) => valueEntities[value]);

      deselectInfo.event = 'check';
      deselectInfo.checked = false;
      deselectInfo.checkedNodes = filteredEntityList.map(({ node }) => node);
      deselectInfo.checkedNodesPositions = filteredEntityList
        .map(({ node, pos }) => ({ node, pos }));

      if (treeCheckStrictly) {
        extraInfo.allCheckedNodes = deselectInfo.checkedNodes;
      } else {
        // TODO: It's too expansive to get `halfCheckedKeys` in onDeselect. Not pass this.
        extraInfo.allCheckedNodes = flatToHierarchy(filteredEntityList)
          .map(({ node }) => node);
      }
    } else {
      deselectInfo.event = 'select';
      deselectInfo.selected = false;
      deselectInfo.selectedNodes = newValueList.map(({ value }) => (valueEntities[value] || {}).node);
    }

    // Some value user pass prop is not in the tree, we also need clean it
    const newMissValueList = missValueList.filter(({ value }) => value !== removeValue);

    let wrappedValue;
    if (this.isLabelInValue()) {
      wrappedValue = {
        label: triggerNode ? triggerNode.props[treeNodeLabelProp] : null,
        value: removeValue,
      };
    } else {
      wrappedValue = removeValue;
    }

    this.setState({
      disableCloseTag: !!(required && editable && newValueList.length==1)
    });

    this.onDeselect(wrappedValue, triggerNode, deselectInfo);
    this.triggerChange(newMissValueList, newValueList, extraInfo, true);
  };

  // ===================== Popup ======================
  onValueTrigger = (isAdd, nodeList, nodeEventInfo, nodeExtraInfo) => {
    // 禁用单选模式下的取消选择功能
    if (!this.isMultiple() && !isAdd) return;

    const { node } = nodeEventInfo;
    const { value } = node.props;
    const { missValueList, valueEntities, keyEntities, treeNodes, searchValue } = this.state;
    const {
      disabled, inputValue,
      treeNodeLabelProp, onSelect,
      treeCheckable, treeCheckStrictly, autoClearSearchValue,
      loadData,doSearchUnchecked
    } = this.props;
    const label = node.props[treeNodeLabelProp];

    if (disabled) return;

    // Wrap the return value for user
    let wrappedValue;
    if (this.isLabelInValue()) {
      wrappedValue = {
        value,
        label,
      };
    } else {
      wrappedValue = value;
    }

    // [Legacy] Origin code not trigger `onDeselect` every time. Let's align the behaviour.
    // if (isAdd) {
    //   if (onSelect) {
    //     onSelect(wrappedValue, node, nodeEventInfo);
    //   }
    // } else {
    //   this.onDeselect(wrappedValue, node, nodeEventInfo);
    // }
    if (!isAdd) {
      this.onDeselect(wrappedValue, node, nodeEventInfo);
    }

    // Get wrapped value list.
    // This is a bit hack cause we use key to match the value.
    // let newValueList = nodeList.map(({ props }) => ({
    //   value: props.value,
    //   label: props[treeNodeLabelProp],
    // }));
    // 返回节点对象所有的属性信息
    let newValueList = nodeList.map(({ props }) => (props));

    // When is `treeCheckable` and with `searchValue`, `valueList` is not full filled.
    // We need calculate the missing nodes.
    // 搜索状态下仍需计算勾选节点的上下联动关系
    if (treeCheckable && !treeCheckStrictly) {
      let keyList = newValueList.map(({ value: val }) => valueEntities[val].key);
      if (isAdd) {
        keyList = conductCheck(
          keyList,
          true,
          keyEntities,
          null,
          loadData,null,false,doSearchUnchecked
        ).checkedKeys;
      } else {
        keyList = conductCheck(
          [valueEntities[value].key],
          false,
          keyEntities,
          { checkedKeys: keyList },
          loadData,null,false,doSearchUnchecked
        ).checkedKeys;
      }
      newValueList = keyList.map(key => {
        const { node: { props } } = keyEntities[key];
        // return {
        //   value: props.value,
        //   label: props[treeNodeLabelProp],
        // };
        // 返回节点对象所有的属性信息
        return props;
      });
    }

    // Clean up `searchValue` when this prop is set
    if (!this.isSearchValueControlled() && (autoClearSearchValue || inputValue === null)) {
      this.setUncontrolledState({
        searchValue: '',
        filteredTreeNodes: null,
      });
    }

    // [Legacy] Provide extra info
    const extraInfo = {
      ...nodeExtraInfo,
      triggerValue: value,
      triggerNode: node,
    };

    this.triggerChange(missValueList, newValueList, extraInfo, false, isAdd);
  };

  onTreeNodeSelect = (_, nodeEventInfo) => {
    const { treeCheckable, multiple } = this.props;
    if (treeCheckable) return;

    if (!multiple) {
      this.setOpenState(false);
    }

    // 处理单选
    const { selectedNodes } = nodeEventInfo;
    const isAdd = nodeEventInfo.selected;

    this.onValueTrigger(isAdd, selectedNodes, nodeEventInfo, { selected: isAdd });
  };

  onTreeNodeCheck = (_, nodeEventInfo) => {
    const { searchValue, keyEntities, valueEntities, curValueList } = this.state;
    const { treeCheckStrictly, loadData,doSearchUnchecked } = this.props;

    const { checkedNodes, checkedNodesPositions } = nodeEventInfo;
    const isAdd = nodeEventInfo.checked;

    const extraInfo = {
      checked: isAdd,
    };

    let checkedNodeList = checkedNodes;

    // [Legacy] Check event provide `allCheckedNodes`.
    // When `treeCheckStrictly` or internal `searchValue` is set, TreeNode will be unrelated:
    // - Related: Show the top checked nodes and has children prop.
    // - Unrelated: Show all the checked nodes.

    if (treeCheckStrictly) {
      extraInfo.allCheckedNodes = nodeEventInfo.checkedNodes;
    } else if (searchValue) {
      const oriKeyList = curValueList
        .map((value) => valueEntities[value])
        .filter(entity => entity)
        .map(({ key }) => key);

      let keyList;
      if (isAdd) {
        keyList = Array.from(
          new Set([
            ...oriKeyList,
            ...checkedNodeList.map(({ props: { value } }) => valueEntities[value].key),
          ]),
        );
      } else {
        let oriCheckedKeys = conductCheck(
          oriKeyList,
          true,
          keyEntities,
          null,
          loadData,null,false,doSearchUnchecked
        ).checkedKeys;
        keyList = conductCheck(
          [nodeEventInfo.node.props.eventKey],
          false,
          keyEntities,
          { checkedKeys: oriCheckedKeys },
          loadData,null,false,doSearchUnchecked
        ).checkedKeys;
      }

      // Fixed error when uncheck node in search result
      checkedNodeList = keyList.map(key => keyEntities[key].node);

      // Let's follow as not `treeCheckStrictly` format
      extraInfo.allCheckedNodes = keyList.map(key => cleanEntity(keyEntities[key]));
    } else {
      extraInfo.allCheckedNodes = flatToHierarchy(checkedNodesPositions);
    }

    this.onValueTrigger(isAdd, checkedNodeList, nodeEventInfo, extraInfo);
  };

  // ==================== Trigger =====================
  onDropdownVisibleChange = (open) => {
    this.setOpenState(open, true);
  };

  onSearchInputChange = ({ target: { value } }) => {
    const { treeNodes, valueEntities,curValueList } = this.state;
    const { onSearch, filterTreeNode, treeNodeFilterProp } = this.props;
    globalObj.isInSearch=!!value;//记录下当前是否处于搜索状态
    if (onSearch) {
      onSearch(value);
    }
    let isSet = false;

    if (!this.isSearchValueControlled()) {
      isSet = this.setUncontrolledState({
        searchValue: value,
      });
      this.setOpenState(true);
    }

    if (isSet) {
      // Do the search logic
      const upperSearchValue = String(value).toUpperCase();

      let filterTreeNodeFn = filterTreeNode;
      if (!filterTreeNodeFn) {
        filterTreeNodeFn = (_, node) => {
          const nodeValue = String(node.props[treeNodeFilterProp]).toUpperCase();
          return nodeValue.indexOf(upperSearchValue) !== -1;
        };
      }
      globalObj.filteredTreeNodes=getFilterTree(treeNodes, value, filterTreeNodeFn, valueEntities);
      this.setState({
        filteredTreeNodes: globalObj.filteredTreeNodes,
      });
    }
  };

  onSearchInputKeyDown = (event) => {
    // Remove
    // const { searchValue, valueList } = this.state;
    // const { keyCode } = event;

    // if (
    //   KeyCode.BACKSPACE === keyCode &&
    //   this.isMultiple() &&
    //   !searchValue &&
    //   valueList.length
    // ) {
    //   const lastValue = valueList[valueList.length - 1].value;
    //   this.onMultipleSelectorRemove(event, lastValue);
    // }
  };

  /**
   * Only update the value which is not in props
   */
  setUncontrolledState = (state) => {
    let needSync = false;
    const newState = {};

    Object.keys(state).forEach(name => {
      if (name in this.props) return;

      needSync = true;
      newState[name] = state[name];
    });

    if (needSync) {
      this.setState(newState);
    }

    return needSync;
  };

  // [Legacy] Origin provide `documentClickClose` which triggered by `Trigger`
  // Currently `TreeSelect` align the hide popup logic as `Select` which blur to hide.
  // `documentClickClose` is not accurate anymore. Let's just keep the key word.
  setOpenState = (open, byTrigger = false) => {
    const { onDropdownVisibleChange,doSearchUnchecked } = this.props;
    if (onDropdownVisibleChange && onDropdownVisibleChange(open, { documentClickClose: !open && byTrigger }) === false) {
      return;
    }

    // 关闭 Popup 时，若有已选择项，则执行取消操作
    if (!open&&!doSearchUnchecked) {
      const { oriValueList, curValueList } = this.state;
      const { onCancel } = this.props;
      if (JSON.stringify(oriValueList) !== JSON.stringify(curValueList)) {
        this.setState({
          curValueList: oriValueList
        });
        onCancel && onCancel(oriValueList);
      }
    }

    this.setUncontrolledState({ open });
  };

  // Tree checkable is also a multiple case
  isMultiple = () => {
    const { multiple, treeCheckable } = this.props;
    return !!(multiple || treeCheckable);
  };

  isLabelInValue = () => {
    return isLabelInValue(this.props);
  };

  // [Legacy] To align with `Select` component,
  // We use `searchValue` instead of `inputValue`
  // but currently still need support that.
  // Add this method the check if is controlled
  isSearchValueControlled = () => {
    const { inputValue } = this.props;
    if ('searchValue' in this.props) return true;
    return ('inputValue' in this.props) && inputValue !== null;
  };

  // TODO: onChoiceAnimationLeave
  forcePopupAlign = () => {
    const $trigger = this.selectTriggerRef.current;

    if ($trigger) {
      $trigger.forcePopupAlign();
    }
  };

  delayForcePopupAlign = () => {
    // Wait 2 frame to avoid dom update & dom algin in the same time
    // https://github.com/ant-design/ant-design/issues/12031
    raf(() => {
      raf(this.forcePopupAlign);
    });
  };

  /**
   * 1. Update state valueList.
   * 2. Fire `onChange` event to user.
   */
  triggerChange = (missValueList, valueList, extraInfo = {}, immediate = false, triggerSelect = false) => {
    const { valueEntities } = this.state;
    const { onChange, disabled, onConfirm, onSelect, treeNodeLabelProp } = this.props;

    if (disabled) return;

    // Trigger
    const extra = {
      // [Legacy] Always return as array contains label & value
      preValue: this.state.selectorValueList.map(({ label, value }) => ({ label, value })),
      ...extraInfo,
    };

    // Format value by `treeCheckStrictly`
    const selectorValueList = formatSelectorValue(valueList, this.props, valueEntities);

    if (!('value' in this.props)) {
      this.setState({
        missValueList,
        valueList,
        selectorValueList,
      });
    }

    // Only do the logic when `onChange` function provided
    // if (onChange) {
    let connectValueList;

    // Get value by mode
    if (this.isMultiple()) {
      connectValueList = [...missValueList, ...selectorValueList];
    } else {
      connectValueList = selectorValueList.slice(0, 1);
    }

    let labelList = null;
    let returnValue;

    if (this.isLabelInValue()) {
      returnValue = connectValueList.map(({ label, value }) => ({ label, value }));
    } else {
      labelList = [];
      returnValue = connectValueList.map(({ label, value }) => {
        labelList.push(label);
        return value;
      });
    }

    if (!this.isMultiple()) {
      returnValue = returnValue[0];
    }

    this.setState({
      returnValue,
      connectValueList,
      extra
    });

    let selectValue;
    if (this.isLabelInValue()) {
      selectValue = {
        value: extraInfo.triggerValue,
        label: extraInfo.triggerNode.props[treeNodeLabelProp],
      };
    } else {
      selectValue = extraInfo.triggerValue;
    }

    // 触发 onSelect 事件
    if (triggerSelect) {
      onSelect && onSelect(selectValue, returnValue, connectValueList, extra);
    }

    // 每次触发改变都重新设置 curValueList
    if (immediate) {
      // onConfirm && onConfirm(returnValue, labelList, extra);
      // onChange && onChange(returnValue, labelList, extra);
      onConfirm && onConfirm(returnValue, connectValueList, extra);
      onChange && onChange(returnValue, connectValueList, extra);
    } else {
      this.setState({
        curValueList: returnValue
      });
    }

    if (!this.isMultiple()) {
      onChange && onChange(returnValue, labelList, extra);
    }
    // }
  };

  focus() {
    this.selectorRef.current.focus();
  }

  blur() {
    this.selectorRef.current.blur();
  }

  handleCancel = () => {
    const { oriValueList } = this.state;
    const { onCancel } = this.props;

    onCancel && onCancel(oriValueList);
    this.setState({
      curValueList: oriValueList,
      open: false
    });
  };

  //设置搜索模式下，输出给用户的所有选择的节点KEY
  remenberBeforeSearchChecks=(obj)=>{
    if(!obj.treeNodes||!globalObj.checkedKeys||!globalObj.halfCheckedKeys){
      return {checkKeys:[],halfCheckKeys:[]};
    }
    let queue =[];//[parentNode,node]
    obj.treeNodes.forEach(node => queue.push([null,node]));
    let checkKeys=[];
    let halfCheckKeys=[];
    while (queue.length) {
      let q = queue.shift();
      let parentNode=q[0];
      let node=q[1];
      let key=node.key;
      let checked=globalObj.checkedKeys.indexOf(node.key)!=-1;
      let halfchecked=globalObj.halfCheckedKeys.indexOf(node.key)!=-1;
      
      if(node.props.isLeaf){
        if(checked){
          checkKeys.push(key);
        }else{
          if(halfchecked){
            halfCheckKeys.push(key);
          }
        }
      }else{
          if(checked){
            checkKeys.push(key);
          }else{
              if(halfchecked){
                halfCheckKeys.push(key);
              }
              if (node.props.children) {
                if(node.props.children.some(child=>globalObj.checkedKeys.indexOf(child.key)!=-1||
                globalObj.halfCheckedKeys.indexOf(child.key)!=-1)){
                  //准备子节点，插入队列，用于下个轮回遍历
                  node.props.children.forEach(_node => queue.push([node,_node]));
                }
                
              }
          }
      }
    }
    return {checkKeys,halfCheckKeys};

  };

  //设置搜索模式下，输出给用户的选择或反选的数据,最终用于查询数据的条件转给后端接口
  setInSearchCheckedData=(obj,keyEntities)=>{
    let checkedGroups=[];
    let checkedKefus=[];
    let uncheckedKefus=[];
    let uncheckedGroups=[];
    if(!obj.filteredTreeNodes){
      return {checkedGroups,checkedKefus,uncheckedKefus,uncheckedGroups};
    }
    let queue =[];//[parentNode,node]
    obj.filteredTreeNodes.forEach(node => queue.push([null,node]));

    let _allSiblingChecked=(childs)=>{
      return !childs.some((c)=>obj.checkedKeys.indexOf(c.key)==-1||obj.halfCheckedKeys.indexOf(c.key)==-1);
    };
    while (queue.length) {
      let q = queue.shift();
      let parentNode=q[0];
      let node=q[1];
      let val=node.props._data.idValue||node.props._data.value;
      let checked=obj.checkedKeys.indexOf(node.key)!=-1;
      let halfChecked=obj.halfCheckedKeys.indexOf(node.key)!=-1;

      if(node.props.isLeaf){
        if(parentNode){
          if(isNodeCheckedBeforeSearch(parentNode,keyEntities,obj)){
            //搜索前父节点是选择状态，执行反选逻辑
            if(!checked){
              uncheckedKefus.push(val);
            }else if(_allSiblingChecked(parentNode.props.children)){
              //所有兄弟节点都处于选择状态
              checkedKefus.push(val);
            }
          }else{
            //搜索前父节点是非选择状态，执行正选逻辑
            if(checked){
              checkedKefus.push(val);
            }
          }
        }else{
          //不存在父节点，直接根据选择状态存入checkedKefus
          if(checked){
            checkedKefus.push(val);
          }
        }
      }else{
        if(parentNode){
          if(isNodeCheckedBeforeSearch(parentNode,keyEntities,obj)){
            //搜索前父节点是选择状态，执行反选逻辑
            if(!checked){
              if(!halfChecked){
                uncheckedGroups.push(val);
              }else{
                //准备子节点，插入队列，用于下个轮回遍历
                node.props.children.forEach(_node => queue.push([node,_node]));
              }
              
            }else{
              if(_allSiblingChecked(parentNode.props.children)){
                checkedGroups.push(val);
              }
            }
          }else{
            //搜索前父节点是非选择状态，执行正选逻辑
            if(checked){
              if(!halfChecked){
                checkedGroups.push(val);
              }else{
                if (node.props.children) {
                  node.props.children.forEach(_node => queue.push([node,_node]));
                }
              }
              
            }else if(halfChecked){
              node.props.children.forEach(_node => queue.push([node,_node]));
            }
          }
        }else{
          if(checked){
            if(halfChecked){
              //同时为halfChecked表示，子节点全选，但实际childCount大于搜索出的子节点个数
              if (node.props.children) {
                //准备子节点，插入队列，用于下个轮回遍历
                node.props.children.forEach(_node => queue.push([node,_node]));
              }
            }else{
              //如果父节点是选择状态，则直接存入checkedGroups，不需要再遍历子孙节点。
              checkedGroups.push(val);
            }
          }else{
            if(halfChecked){
              if (node.props.children) {
                //准备子节点，插入队列，用于下个轮回遍历
                node.props.children.forEach(_node => queue.push([node,_node]));
              }
            }
            
          }
        }
      }
    }
    return {checkedGroups,checkedKefus,uncheckedKefus,uncheckedGroups};

  };

  handleConfirm = () => {
    const { curValueList, connectValueList, extra,treeNodes,keyEntities } = this.state;
    const { onConfirm, onChange, required, editable } = this.props;
    globalObj.treeNodes=treeNodes;
    extra.isInSearch=false;
    if(globalObj.isInSearch){
      //搜索状态返回的正选反选数据
      extra.valueObject=this.setInSearchCheckedData(globalObj,keyEntities);
      extra.isInSearch=true;
    }
    extra.globalObj=globalObj;
    // curValueList 为已选择的树节点值的列表；connectValueList 为包含已选择的树节点对象所有属性信息的列表
    onConfirm && onConfirm(curValueList, connectValueList, extra);
    onChange && onChange(curValueList, connectValueList, extra);
    this.globalData.__handleConfirm=true;
    this.setState({
      open: false,
      disableCloseTag: !!(required && editable && curValueList.length==1)
    });
  };

  resetSelect = () => {
    const { onReset } = this.props;

    onReset && onReset();
    this.setState({ open: false });
  };

  // ===================== Render =====================
  render() {
    const {
      valueList, missValueList, selectorValueList,
      valueEntities, keyEntities,
      searchValue,
      open, focused,
      treeNodes, filteredTreeNodes,
      curValueList,
      disableCloseTag
    } = this.state;
    const { prefixCls, loadData, treeCheckStrictly, loading, required, editable,doSearchUnchecked } = this.props;
    const isMultiple = this.isMultiple();
    let rtValueList = Array.isArray(curValueList) ? [...curValueList] : [curValueList];

    // 非 treeCheckStrictly 下的多选，在选中节点后有父子层级的联动
    if (isMultiple && !treeCheckStrictly) {
      let keyList = [];
      rtValueList.forEach(value => {
        if (valueEntities[value] != undefined) {
          keyList.push(valueEntities[value].key);
        }
      });

      // let obj=this.globalData;
      // if(doSearchUnchecked&&obj.beforeSearchSyncCheckKeys){
      //   //搜索状态下，curValueList可能为空，这时无法确定他们的父节点半选还是全选，把搜索前同步记录的KEY插入curValueList，这样就可以在进入搜索状态后，正确展示父节点的全选半选
      //   for(let i=0;i<obj.beforeSearchSyncCheckKeys.length;i++){
      //     let k=obj.beforeSearchSyncCheckKeys[i];
      //     if(keyList.indexOf(k)==-1){
      //       keyList.push(k);
      //     }
      //   }
      // }

      let checkedKeys = conductCheck(keyList, true, keyEntities, null, loadData,null
        ,false,doSearchUnchecked).checkedKeys;
      rtValueList = checkedKeys.map(key => {
        return keyEntities[key] && keyEntities[key].value;
      });
    }

    const passProps = {
      ...this.props,
      isMultiple,
      // valueList,
      // Check 一个节点时，实时显示其选中状态。在搜索结果中正确显示其子节点的选中状态
      valueList: formatInternalValue(rtValueList, this.props),
      selectorValueList: [...missValueList, ...selectorValueList],
      valueEntities,
      keyEntities,
      searchValue,
      upperSearchValue: (searchValue || '').toUpperCase(), // Perf save
      open,
      focused,
      dropdownPrefixCls: `${prefixCls}-dropdown`,
      ariaId: this.ariaId,
    };

    if (!isMultiple) {
      passProps['resetSelect'] = this.resetSelect;
    } else {
      required && (passProps['disableConfirm'] = !passProps.valueList.length);
      required && editable && (passProps['disableCloseTag'] = disableCloseTag);
    }

    delete passProps.loadData;

    const Popup = isMultiple ? MultiplePopup : SinglePopup;
    const $popup = (
      <Popup
        {...passProps}
        loadData={searchValue ? null : loadData}  // 有搜索内容时不触发异步加载
        loading={loading}
        onTreeExpanded={this.delayForcePopupAlign}
        treeNodes={treeNodes}
        filteredTreeNodes={filteredTreeNodes}
        globalData={this.globalData}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
      />
    );

    const Selector = isMultiple ? MultipleSelector : SingleSelector;
    const $selector = (
      <Selector
        {...passProps}
        ref={this.selectorRef}
        onChoiceAnimationLeave={this.forcePopupAlign}
      />
    );

    // let triggerGetPopupContainer = passProps.getPopupContainer;
    // if (!triggerGetPopupContainer || !triggerGetPopupContainer()) {
    //   triggerGetPopupContainer = this.__proto__.constructor.defaultProps.getPopupContainer;
    // }

    const triggerProps = {
      disabled: passProps.disabled,
      dropdownPopupAlign: passProps.dropdownPopupAlign,
      dropdownMatchSelectWidth: passProps.dropdownMatchSelectWidth,
      dropdownClassName: passProps.dropdownClassName,
      dropdownStyle: passProps.dropdownStyle,
      getPopupContainer: passProps.getPopupContainer,
      placement: passProps.placement,
      transitionName: passProps.transitionName,
      animation: passProps.animation,
      isMultiple: passProps.isMultiple,
      dropdownPrefixCls: passProps.dropdownPrefixCls,
      onDropdownVisibleChange: this.onDropdownVisibleChange,
      popupElement: $popup,
      open: passProps.open,
    };

    return (
      <SelectTrigger {...triggerProps} ref={this.selectTriggerRef} >
        {$selector}
      </SelectTrigger>
    );
  }
}

Select.TreeNode = SelectNode;
Select.SHOW_ALL = SHOW_ALL;
Select.SHOW_PARENT = SHOW_PARENT;
Select.SHOW_CHILD = SHOW_CHILD;

// Let warning show correct component name
Select.displayName = 'TreeSelect';

polyfill(Select);

export default Select;
