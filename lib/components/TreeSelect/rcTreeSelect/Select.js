"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _KeyCode = _interopRequireDefault(require("../../../utils/KeyCode.js"));

var _other = require("../../../utils/other.js");

var _raf = _interopRequireDefault(require("raf"));

var _SelectTrigger = _interopRequireDefault(require("./SelectTrigger"));

var _BaseSelector = require("./Base/BaseSelector");

var _BasePopup = require("./Base/BasePopup");

var _SingleSelector = _interopRequireDefault(require("./Selector/SingleSelector"));

var _MultipleSelector = _interopRequireWildcard(require("./Selector/MultipleSelector"));

var _SinglePopup = _interopRequireDefault(require("./Popup/SinglePopup"));

var _MultiplePopup = _interopRequireDefault(require("./Popup/MultiplePopup"));

var _strategies = require("./strategies");

var _util = require("./util");

var _propTypes2 = require("./propTypes");

var _SelectNode = _interopRequireDefault(require("./SelectNode"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Select, _React$Component);

  _createClass(Select, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _prevState$prevProps = prevState.prevProps,
          prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;
      var treeCheckable = nextProps.treeCheckable,
          treeCheckStrictly = nextProps.treeCheckStrictly,
          filterTreeNode = nextProps.filterTreeNode,
          treeNodeFilterProp = nextProps.treeNodeFilterProp,
          treeDataSimpleMode = nextProps.treeDataSimpleMode,
          loadData = nextProps.loadData;
      var newState = {
        prevProps: nextProps,
        init: false
      }; // Process the state when props updated

      function processState(propName, updater) {
        if (prevProps[propName] !== nextProps[propName]) {
          updater(nextProps[propName], prevProps[propName]);
          return true;
        }

        return false;
      }

      var valueRefresh = false; // Open

      processState('open', function (propValue) {
        newState.open = !!propValue;
      }); // Tree Nodes

      var treeNodes;
      var treeDataChanged = false;
      var treeDataModeChanged = false;
      processState('treeData', function (propValue) {
        treeNodes = (0, _util.convertDataToTree)(propValue);
        treeDataChanged = true;
      });
      processState('treeDataSimpleMode', function (propValue, prevValue) {
        if (!propValue) return;
        var prev = !prevValue || prevValue === true ? {} : prevValue; // Shallow equal to avoid dynamic prop object

        if (!(0, _other.shallowEqual)(propValue, prev)) {
          treeDataModeChanged = true;
        }
      }); // Parse by `treeDataSimpleMode`

      if (treeDataSimpleMode && (treeDataChanged || treeDataModeChanged)) {
        var simpleMapper = _objectSpread({
          id: 'id',
          pId: 'pId',
          rootPId: null
        }, treeDataSimpleMode !== true ? treeDataSimpleMode : {});

        treeNodes = (0, _util.convertDataToTree)((0, _util.parseSimpleTreeData)(nextProps.treeData, simpleMapper));
      } // If `treeData` not provide, use children TreeNodes


      if (!nextProps.treeData) {
        processState('children', function (propValue) {
          treeNodes = Array.isArray(propValue) ? propValue : [propValue];
        });
      } // Convert `treeData` to entities


      if (treeNodes) {
        var entitiesMap = (0, _util.convertTreeToEntities)(treeNodes);
        newState.treeNodes = treeNodes;
        newState.posEntities = entitiesMap.posEntities;
        newState.valueEntities = entitiesMap.valueEntities;
        newState.keyEntities = entitiesMap.keyEntities;
        valueRefresh = true;
      } // Value List


      if (prevState.init) {
        if (nextProps.value && nextProps.value.length) {
          newState.oriValueList = nextProps.value;
          newState.curValueList = nextProps.value;
        } else if (nextProps.defaultValue && nextProps.defaultValue.length) {
          newState.oriValueList = nextProps.defaultValue;
          newState.curValueList = nextProps.defaultValue;
        }

        processState('defaultValue', function (propValue) {
          newState.valueList = (0, _util.formatInternalValue)(propValue, nextProps);
          valueRefresh = true;
        });
      }

      processState('value', function (propValue) {
        newState.oriValueList = nextProps.value;
        newState.curValueList = nextProps.value;
        newState.valueList = (0, _util.formatInternalValue)(propValue, nextProps);
        valueRefresh = true;
      }); // Selector Value List

      if (valueRefresh) {
        // Find out that value not exist in the tree
        var missValueList = [];
        var filteredValueList = [];
        var keyList = []; // Get latest value list

        var latestValueList = newState.valueList;

        if (!latestValueList) {
          // Also need add prev missValueList to avoid new treeNodes contains the value
          latestValueList = [].concat(_toConsumableArray(prevState.valueList), _toConsumableArray(prevState.missValueList));
        } // Get key by value


        latestValueList.forEach(function (wrapperValue) {
          var value = wrapperValue.value;
          var entity = (newState.valueEntities || prevState.valueEntities)[value];

          if (entity) {
            keyList.push(entity.key);
            filteredValueList.push(wrapperValue);
            return;
          } // If not match, it may caused by ajax load. We need keep this


          missValueList.push(wrapperValue);
        }); // We need calculate the value when tree is checked tree

        if (treeCheckable && !treeCheckStrictly) {
          // Calculate the keys need to be checked
          var _conductCheck = (0, _util.conductCheck)(keyList, true, newState.keyEntities || prevState.keyEntities, null, loadData),
              checkedKeys = _conductCheck.checkedKeys; // Format value list again for internal usage


          newState.valueList = checkedKeys.map(function (key) {
            return {
              value: (newState.keyEntities || prevState.keyEntities)[key].value
            };
          });
        } else {
          newState.valueList = filteredValueList;
        } // Fill the missValueList, we still need display in the selector


        newState.missValueList = missValueList; // Calculate the value list for `Selector` usage

        newState.selectorValueList = (0, _util.formatSelectorValue)(newState.valueList, nextProps, newState.valueEntities || prevState.valueEntities);
      } // [Legacy] To align with `Select` component,
      // We use `searchValue` instead of `inputValue` but still keep the api
      // `inputValue` support `null` to work as `autoClearSearchValue`


      processState('inputValue', function (propValue) {
        if (propValue !== null) {
          newState.searchValue = propValue;
        }
      }); // Search value

      processState('searchValue', function (propValue) {
        newState.searchValue = propValue;
      }); // Do the search logic

      if (newState.searchValue !== undefined || prevState.searchValue && treeNodes) {
        var searchValue = newState.searchValue !== undefined ? newState.searchValue : prevState.searchValue;
        var upperSearchValue = String(searchValue).toUpperCase();
        var filterTreeNodeFn = filterTreeNode;

        if (filterTreeNode === false) {
          // Don't filter if is false
          filterTreeNodeFn = function filterTreeNodeFn() {
            return true;
          };
        } else if (typeof filterTreeNodeFn !== 'function') {
          // When is not function (true or undefined), use inner filter
          filterTreeNodeFn = function filterTreeNodeFn(_, node) {
            var nodeValue = String(node.props[treeNodeFilterProp]).toUpperCase();
            return nodeValue.indexOf(upperSearchValue) !== -1;
          };
        }

        newState.filteredTreeNodes = (0, _util.getFilterTree)(newState.treeNodes || prevState.treeNodes, searchValue, filterTreeNodeFn, newState.valueEntities || prevState.valueEntities);
      } // Checked Strategy


      processState('showCheckedStrategy', function () {
        newState.selectorValueList = newState.selectorValueList || (0, _util.formatSelectorValue)(newState.valueList || prevState.valueList, nextProps, newState.valueEntities || prevState.valueEntities);
      });
      return newState;
    }
  }]);

  function Select(_props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onSelectorFocus", function () {
      _this.setState({
        focused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectorBlur", function () {
      _this.setState({
        focused: false
      }); // TODO: Close when Popup is also not focused
      // this.setState({ open: false });

    });

    _defineProperty(_assertThisInitialized(_this), "onComponentKeyDown", function (event) {
      var open = _this.state.open;
      var esc = _this.props.esc;
      var keyCode = event.keyCode;

      if (!open) {
        if ([_KeyCode["default"].ENTER, _KeyCode["default"].DOWN].indexOf(keyCode) !== -1) {
          _this.setOpenState(true);
        }
      } else if (_KeyCode["default"].ESC === keyCode) {
        esc && _this.setOpenState(false);
      } else if ([_KeyCode["default"].UP, _KeyCode["default"].DOWN, _KeyCode["default"].LEFT, _KeyCode["default"].RIGHT].indexOf(keyCode) !== -1) {
        // TODO: Handle `open` state
        event.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselect", function (wrappedValue, node, nodeEventInfo) {
      var onDeselect = _this.props.onDeselect;
      if (!onDeselect) return;
      onDeselect(wrappedValue, node, nodeEventInfo);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectorClear", function (event) {
      var disabled = _this.props.disabled;
      if (disabled) return;

      _this.triggerChange([], [], {}, true);

      if (!_this.isSearchValueControlled()) {
        _this.setUncontrolledState({
          searchValue: '',
          filteredTreeNodes: null
        });
      }

      event.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "onMultipleSelectorRemove", function (event, removeValue) {
      event.stopPropagation();
      var _this$state = _this.state,
          valueList = _this$state.valueList,
          missValueList = _this$state.missValueList,
          valueEntities = _this$state.valueEntities;
      var _this$props = _this.props,
          treeCheckable = _this$props.treeCheckable,
          treeCheckStrictly = _this$props.treeCheckStrictly,
          treeNodeLabelProp = _this$props.treeNodeLabelProp,
          disabled = _this$props.disabled,
          required = _this$props.required,
          editable = _this$props.editable;
      if (disabled) return; // Find trigger entity

      var triggerEntity = valueEntities[removeValue]; // Clean up value

      var newValueList = valueList;

      if (triggerEntity) {
        // If value is in tree
        if (treeCheckable && !treeCheckStrictly) {
          newValueList = valueList.filter(function (_ref) {
            var value = _ref.value;
            var entity = valueEntities[value];
            return !(0, _util.isPosRelated)(entity.pos, triggerEntity.pos);
          });
        } else {
          newValueList = valueList.filter(function (_ref2) {
            var value = _ref2.value;
            return value !== removeValue;
          });
        }
      }

      var triggerNode = triggerEntity ? triggerEntity.node : null;
      var extraInfo = {
        triggerValue: removeValue,
        triggerNode: triggerNode
      };
      var deselectInfo = {
        node: triggerNode
      }; // [Legacy] Little hack on this to make same action as `onCheck` event.

      if (treeCheckable) {
        var filteredEntityList = newValueList.map(function (_ref3) {
          var value = _ref3.value;
          return valueEntities[value];
        });
        deselectInfo.event = 'check';
        deselectInfo.checked = false;
        deselectInfo.checkedNodes = filteredEntityList.map(function (_ref4) {
          var node = _ref4.node;
          return node;
        });
        deselectInfo.checkedNodesPositions = filteredEntityList.map(function (_ref5) {
          var node = _ref5.node,
              pos = _ref5.pos;
          return {
            node: node,
            pos: pos
          };
        });

        if (treeCheckStrictly) {
          extraInfo.allCheckedNodes = deselectInfo.checkedNodes;
        } else {
          // TODO: It's too expansive to get `halfCheckedKeys` in onDeselect. Not pass this.
          extraInfo.allCheckedNodes = (0, _util.flatToHierarchy)(filteredEntityList).map(function (_ref6) {
            var node = _ref6.node;
            return node;
          });
        }
      } else {
        deselectInfo.event = 'select';
        deselectInfo.selected = false;
        deselectInfo.selectedNodes = newValueList.map(function (_ref7) {
          var value = _ref7.value;
          return (valueEntities[value] || {}).node;
        });
      } // Some value user pass prop is not in the tree, we also need clean it


      var newMissValueList = missValueList.filter(function (_ref8) {
        var value = _ref8.value;
        return value !== removeValue;
      });
      var wrappedValue;

      if (_this.isLabelInValue()) {
        wrappedValue = {
          label: triggerNode ? triggerNode.props[treeNodeLabelProp] : null,
          value: removeValue
        };
      } else {
        wrappedValue = removeValue;
      }

      _this.setState({
        disableCloseTag: !!(required && editable && newValueList.length == 1)
      });

      _this.onDeselect(wrappedValue, triggerNode, deselectInfo);

      _this.triggerChange(newMissValueList, newValueList, extraInfo, true);
    });

    _defineProperty(_assertThisInitialized(_this), "onValueTrigger", function (isAdd, nodeList, nodeEventInfo, nodeExtraInfo) {
      // 禁用单选模式下的取消选择功能
      if (!_this.isMultiple() && !isAdd) return;
      var node = nodeEventInfo.node;
      var value = node.props.value;
      var _this$state2 = _this.state,
          missValueList = _this$state2.missValueList,
          valueEntities = _this$state2.valueEntities,
          keyEntities = _this$state2.keyEntities,
          treeNodes = _this$state2.treeNodes,
          searchValue = _this$state2.searchValue;
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          inputValue = _this$props2.inputValue,
          treeNodeLabelProp = _this$props2.treeNodeLabelProp,
          onSelect = _this$props2.onSelect,
          treeCheckable = _this$props2.treeCheckable,
          treeCheckStrictly = _this$props2.treeCheckStrictly,
          autoClearSearchValue = _this$props2.autoClearSearchValue,
          loadData = _this$props2.loadData;
      var label = node.props[treeNodeLabelProp];
      if (disabled) return; // Wrap the return value for user

      var wrappedValue;

      if (_this.isLabelInValue()) {
        wrappedValue = {
          value: value,
          label: label
        };
      } else {
        wrappedValue = value;
      } // [Legacy] Origin code not trigger `onDeselect` every time. Let's align the behaviour.
      // if (isAdd) {
      //   if (onSelect) {
      //     onSelect(wrappedValue, node, nodeEventInfo);
      //   }
      // } else {
      //   this.onDeselect(wrappedValue, node, nodeEventInfo);
      // }


      if (!isAdd) {
        _this.onDeselect(wrappedValue, node, nodeEventInfo);
      } // Get wrapped value list.
      // This is a bit hack cause we use key to match the value.
      // let newValueList = nodeList.map(({ props }) => ({
      //   value: props.value,
      //   label: props[treeNodeLabelProp],
      // }));
      // 返回节点对象所有的属性信息


      var newValueList = nodeList.map(function (_ref9) {
        var props = _ref9.props;
        return props;
      }); // When is `treeCheckable` and with `searchValue`, `valueList` is not full filled.
      // We need calculate the missing nodes.
      // 搜索状态下仍需计算勾选节点的上下联动关系

      if (treeCheckable && !treeCheckStrictly) {
        var keyList = newValueList.map(function (_ref10) {
          var val = _ref10.value;
          return valueEntities[val].key;
        });

        if (isAdd) {
          keyList = (0, _util.conductCheck)(keyList, true, keyEntities, null, loadData).checkedKeys;
        } else {
          keyList = (0, _util.conductCheck)([valueEntities[value].key], false, keyEntities, {
            checkedKeys: keyList
          }, loadData).checkedKeys;
        }

        newValueList = keyList.map(function (key) {
          var props = keyEntities[key].node.props; // return {
          //   value: props.value,
          //   label: props[treeNodeLabelProp],
          // };
          // 返回节点对象所有的属性信息

          return props;
        });
      } // Clean up `searchValue` when this prop is set


      if (!_this.isSearchValueControlled() && (autoClearSearchValue || inputValue === null)) {
        _this.setUncontrolledState({
          searchValue: '',
          filteredTreeNodes: null
        });
      } // [Legacy] Provide extra info


      var extraInfo = _objectSpread({}, nodeExtraInfo, {
        triggerValue: value,
        triggerNode: node
      });

      _this.triggerChange(missValueList, newValueList, extraInfo, false, isAdd);
    });

    _defineProperty(_assertThisInitialized(_this), "onTreeNodeSelect", function (_, nodeEventInfo) {
      var _this$props3 = _this.props,
          treeCheckable = _this$props3.treeCheckable,
          multiple = _this$props3.multiple;
      if (treeCheckable) return;

      if (!multiple) {
        _this.setOpenState(false);
      } // 处理单选


      var selectedNodes = nodeEventInfo.selectedNodes;
      var isAdd = nodeEventInfo.selected;

      _this.onValueTrigger(isAdd, selectedNodes, nodeEventInfo, {
        selected: isAdd
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTreeNodeCheck", function (_, nodeEventInfo) {
      var _this$state3 = _this.state,
          searchValue = _this$state3.searchValue,
          keyEntities = _this$state3.keyEntities,
          valueEntities = _this$state3.valueEntities,
          curValueList = _this$state3.curValueList;
      var _this$props4 = _this.props,
          treeCheckStrictly = _this$props4.treeCheckStrictly,
          loadData = _this$props4.loadData;
      var checkedNodes = nodeEventInfo.checkedNodes,
          checkedNodesPositions = nodeEventInfo.checkedNodesPositions;
      var isAdd = nodeEventInfo.checked;
      var extraInfo = {
        checked: isAdd
      };
      var checkedNodeList = checkedNodes; // [Legacy] Check event provide `allCheckedNodes`.
      // When `treeCheckStrictly` or internal `searchValue` is set, TreeNode will be unrelated:
      // - Related: Show the top checked nodes and has children prop.
      // - Unrelated: Show all the checked nodes.

      if (treeCheckStrictly) {
        extraInfo.allCheckedNodes = nodeEventInfo.checkedNodes;
      } else if (searchValue) {
        var oriKeyList = curValueList.map(function (value) {
          return valueEntities[value];
        }).filter(function (entity) {
          return entity;
        }).map(function (_ref11) {
          var key = _ref11.key;
          return key;
        });
        var keyList;

        if (isAdd) {
          keyList = Array.from(new Set([].concat(_toConsumableArray(oriKeyList), _toConsumableArray(checkedNodeList.map(function (_ref12) {
            var value = _ref12.props.value;
            return valueEntities[value].key;
          })))));
        } else {
          var oriCheckedKeys = (0, _util.conductCheck)(oriKeyList, true, keyEntities, null, loadData).checkedKeys;
          keyList = (0, _util.conductCheck)([nodeEventInfo.node.props.eventKey], false, keyEntities, {
            checkedKeys: oriCheckedKeys
          }, loadData).checkedKeys;
        } // Fixed error when uncheck node in search result


        checkedNodeList = keyList.map(function (key) {
          return keyEntities[key].node;
        }); // Let's follow as not `treeCheckStrictly` format

        extraInfo.allCheckedNodes = keyList.map(function (key) {
          return (0, _util.cleanEntity)(keyEntities[key]);
        });
      } else {
        extraInfo.allCheckedNodes = (0, _util.flatToHierarchy)(checkedNodesPositions);
      }

      _this.onValueTrigger(isAdd, checkedNodeList, nodeEventInfo, extraInfo);
    });

    _defineProperty(_assertThisInitialized(_this), "onDropdownVisibleChange", function (open) {
      _this.setOpenState(open, true);
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchInputChange", function (_ref13) {
      var value = _ref13.target.value;
      var _this$state4 = _this.state,
          treeNodes = _this$state4.treeNodes,
          valueEntities = _this$state4.valueEntities;
      var _this$props5 = _this.props,
          onSearch = _this$props5.onSearch,
          filterTreeNode = _this$props5.filterTreeNode,
          treeNodeFilterProp = _this$props5.treeNodeFilterProp;

      if (onSearch) {
        onSearch(value);
      }

      var isSet = false;

      if (!_this.isSearchValueControlled()) {
        isSet = _this.setUncontrolledState({
          searchValue: value
        });

        _this.setOpenState(true);
      }

      if (isSet) {
        // Do the search logic
        var upperSearchValue = String(value).toUpperCase();
        var filterTreeNodeFn = filterTreeNode;

        if (!filterTreeNodeFn) {
          filterTreeNodeFn = function filterTreeNodeFn(_, node) {
            var nodeValue = String(node.props[treeNodeFilterProp]).toUpperCase();
            return nodeValue.indexOf(upperSearchValue) !== -1;
          };
        }

        _this.setState({
          filteredTreeNodes: (0, _util.getFilterTree)(treeNodes, value, filterTreeNodeFn, valueEntities)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchInputKeyDown", function (event) {// Remove
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
    });

    _defineProperty(_assertThisInitialized(_this), "setUncontrolledState", function (state) {
      var needSync = false;
      var newState = {};
      Object.keys(state).forEach(function (name) {
        if (name in _this.props) return;
        needSync = true;
        newState[name] = state[name];
      });

      if (needSync) {
        _this.setState(newState);
      }

      return needSync;
    });

    _defineProperty(_assertThisInitialized(_this), "setOpenState", function (open) {
      var byTrigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var onDropdownVisibleChange = _this.props.onDropdownVisibleChange;

      if (onDropdownVisibleChange && onDropdownVisibleChange(open, {
        documentClickClose: !open && byTrigger
      }) === false) {
        return;
      } // 关闭 Popup 时，若有已选择项，则执行取消操作


      if (!open) {
        var _this$state5 = _this.state,
            oriValueList = _this$state5.oriValueList,
            curValueList = _this$state5.curValueList;
        var onCancel = _this.props.onCancel;

        if (JSON.stringify(oriValueList) !== JSON.stringify(curValueList)) {
          _this.setState({
            curValueList: oriValueList
          });

          onCancel && onCancel(oriValueList);
        }
      }

      _this.setUncontrolledState({
        open: open
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isMultiple", function () {
      var _this$props6 = _this.props,
          multiple = _this$props6.multiple,
          treeCheckable = _this$props6.treeCheckable;
      return !!(multiple || treeCheckable);
    });

    _defineProperty(_assertThisInitialized(_this), "isLabelInValue", function () {
      return (0, _util.isLabelInValue)(_this.props);
    });

    _defineProperty(_assertThisInitialized(_this), "isSearchValueControlled", function () {
      var inputValue = _this.props.inputValue;
      if ('searchValue' in _this.props) return true;
      return 'inputValue' in _this.props && inputValue !== null;
    });

    _defineProperty(_assertThisInitialized(_this), "forcePopupAlign", function () {
      var $trigger = _this.selectTriggerRef.current;

      if ($trigger) {
        $trigger.forcePopupAlign();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "delayForcePopupAlign", function () {
      // Wait 2 frame to avoid dom update & dom algin in the same time
      // https://github.com/ant-design/ant-design/issues/12031
      (0, _raf["default"])(function () {
        (0, _raf["default"])(_this.forcePopupAlign);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "triggerChange", function (missValueList, valueList) {
      var extraInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var immediate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var triggerSelect = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var valueEntities = _this.state.valueEntities;
      var _this$props7 = _this.props,
          onChange = _this$props7.onChange,
          disabled = _this$props7.disabled,
          onConfirm = _this$props7.onConfirm,
          onSelect = _this$props7.onSelect,
          treeNodeLabelProp = _this$props7.treeNodeLabelProp;
      if (disabled) return; // Trigger

      var extra = _objectSpread({
        // [Legacy] Always return as array contains label & value
        preValue: _this.state.selectorValueList.map(function (_ref14) {
          var label = _ref14.label,
              value = _ref14.value;
          return {
            label: label,
            value: value
          };
        })
      }, extraInfo); // Format value by `treeCheckStrictly`


      var selectorValueList = (0, _util.formatSelectorValue)(valueList, _this.props, valueEntities);

      if (!('value' in _this.props)) {
        _this.setState({
          missValueList: missValueList,
          valueList: valueList,
          selectorValueList: selectorValueList
        });
      } // Only do the logic when `onChange` function provided
      // if (onChange) {


      var connectValueList; // Get value by mode

      if (_this.isMultiple()) {
        connectValueList = [].concat(_toConsumableArray(missValueList), _toConsumableArray(selectorValueList));
      } else {
        connectValueList = selectorValueList.slice(0, 1);
      }

      var labelList = null;
      var returnValue;

      if (_this.isLabelInValue()) {
        returnValue = connectValueList.map(function (_ref15) {
          var label = _ref15.label,
              value = _ref15.value;
          return {
            label: label,
            value: value
          };
        });
      } else {
        labelList = [];
        returnValue = connectValueList.map(function (_ref16) {
          var label = _ref16.label,
              value = _ref16.value;
          labelList.push(label);
          return value;
        });
      }

      if (!_this.isMultiple()) {
        returnValue = returnValue[0];
      }

      _this.setState({
        returnValue: returnValue,
        connectValueList: connectValueList,
        extra: extra
      });

      var selectValue;

      if (_this.isLabelInValue()) {
        selectValue = {
          value: extraInfo.triggerValue,
          label: extraInfo.triggerNode.props[treeNodeLabelProp]
        };
      } else {
        selectValue = extraInfo.triggerValue;
      } // 触发 onSelect 事件


      if (triggerSelect) {
        onSelect && onSelect(selectValue, returnValue, connectValueList, extra);
      } // 每次触发改变都重新设置 curValueList


      if (immediate) {
        // onConfirm && onConfirm(returnValue, labelList, extra);
        // onChange && onChange(returnValue, labelList, extra);
        onConfirm && onConfirm(returnValue, connectValueList, extra);
        onChange && onChange(returnValue, connectValueList, extra);
      } else {
        _this.setState({
          curValueList: returnValue
        });
      }

      if (!_this.isMultiple()) {
        onChange && onChange(returnValue, labelList, extra);
      } // }

    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      var oriValueList = _this.state.oriValueList;
      var onCancel = _this.props.onCancel;
      onCancel && onCancel(oriValueList);

      _this.setState({
        curValueList: oriValueList,
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleConfirm", function () {
      var _this$state6 = _this.state,
          curValueList = _this$state6.curValueList,
          connectValueList = _this$state6.connectValueList,
          extra = _this$state6.extra;
      var _this$props8 = _this.props,
          onConfirm = _this$props8.onConfirm,
          onChange = _this$props8.onChange,
          required = _this$props8.required,
          editable = _this$props8.editable; // curValueList 为已选择的树节点值的列表；connectValueList 为包含已选择的树节点对象所有属性信息的列表

      onConfirm && onConfirm(curValueList, connectValueList, extra);
      onChange && onChange(curValueList, connectValueList, extra);

      _this.setState({
        open: false,
        disableCloseTag: !!(required && editable && curValueList.length == 1)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "resetSelect", function () {
      var onReset = _this.props.onReset;
      onReset && onReset();

      _this.setState({
        open: false
      });
    });

    var prefixAria = _props.prefixAria,
        defaultOpen = _props.defaultOpen,
        _open = _props.open,
        _required = _props.required,
        _editable = _props.editable,
        defaultValue = _props.defaultValue,
        _value = _props.value;
    var disableCloseTag = false;

    if (_required && _editable) {
      var initValue = _value || defaultValue;

      if (typeof initValue == "string" || Array.isArray(initValue) && initValue.length == 1) {
        disableCloseTag = true;
      }
    }

    _this.state = {
      open: !!_open || !!defaultOpen,
      valueList: [],
      missValueList: [],
      // Contains the value not in the tree
      selectorValueList: [],
      // Used for multiple selector
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
      disableCloseTag: disableCloseTag
    };
    _this.selectorRef = (0, _util.createRef)();
    _this.selectTriggerRef = (0, _util.createRef)(); // ARIA need `aria-controls` props mapping
    // Since this need user input. Let's generate ourselves

    _this.ariaId = (0, _util.generateAriaId)("".concat(prefixAria, "-list"));
    return _this;
  }

  _createClass(Select, [{
    key: "getChildContext",
    value: function getChildContext() {
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
          onSearchInputKeyDown: this.onSearchInputKeyDown
        }
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props9 = this.props,
          autoFocus = _this$props9.autoFocus,
          disabled = _this$props9.disabled;

      if (autoFocus && !disabled) {
        this.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, prevState) {
      if (prevState.valueList !== this.state.valueList) {
        this.forcePopupAlign();
      }
    } // ==================== Selector ====================

  }, {
    key: "focus",
    value: function focus() {
      this.selectorRef.current.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.selectorRef.current.blur();
    }
  }, {
    key: "render",
    // ===================== Render =====================
    value: function render() {
      var _this$state7 = this.state,
          valueList = _this$state7.valueList,
          missValueList = _this$state7.missValueList,
          selectorValueList = _this$state7.selectorValueList,
          valueEntities = _this$state7.valueEntities,
          keyEntities = _this$state7.keyEntities,
          searchValue = _this$state7.searchValue,
          open = _this$state7.open,
          focused = _this$state7.focused,
          treeNodes = _this$state7.treeNodes,
          filteredTreeNodes = _this$state7.filteredTreeNodes,
          curValueList = _this$state7.curValueList,
          disableCloseTag = _this$state7.disableCloseTag;
      var _this$props10 = this.props,
          prefixCls = _this$props10.prefixCls,
          loadData = _this$props10.loadData,
          treeCheckStrictly = _this$props10.treeCheckStrictly,
          loading = _this$props10.loading,
          required = _this$props10.required,
          editable = _this$props10.editable;
      var isMultiple = this.isMultiple();
      var rtValueList = Array.isArray(curValueList) ? _toConsumableArray(curValueList) : [curValueList]; // 非 treeCheckStrictly 下的多选，在选中节点后有父子层级的联动

      if (isMultiple && !treeCheckStrictly) {
        var keyList = [];
        rtValueList.forEach(function (value) {
          if (valueEntities[value] != undefined) {
            keyList.push(valueEntities[value].key);
          }
        });
        var checkedKeys = (0, _util.conductCheck)(keyList, true, keyEntities, null, loadData).checkedKeys;
        rtValueList = checkedKeys.map(function (key) {
          return keyEntities[key] && keyEntities[key].value;
        });
      }

      var passProps = _objectSpread({}, this.props, {
        isMultiple: isMultiple,
        // valueList,
        // Check 一个节点时，实时显示其选中状态。在搜索结果中正确显示其子节点的选中状态
        valueList: (0, _util.formatInternalValue)(rtValueList, this.props),
        selectorValueList: [].concat(_toConsumableArray(missValueList), _toConsumableArray(selectorValueList)),
        valueEntities: valueEntities,
        keyEntities: keyEntities,
        searchValue: searchValue,
        upperSearchValue: (searchValue || '').toUpperCase(),
        // Perf save
        open: open,
        focused: focused,
        dropdownPrefixCls: "".concat(prefixCls, "-dropdown"),
        ariaId: this.ariaId
      });

      if (!isMultiple) {
        passProps['resetSelect'] = this.resetSelect;
      } else {
        required && (passProps['disableConfirm'] = !passProps.valueList.length);
        required && editable && (passProps['disableCloseTag'] = disableCloseTag);
      }

      delete passProps.loadData;
      var Popup = isMultiple ? _MultiplePopup["default"] : _SinglePopup["default"];

      var $popup = _react["default"].createElement(Popup, _extends({}, passProps, {
        loadData: searchValue ? null : loadData // 有搜索内容时不触发异步加载
        ,
        loading: loading,
        onTreeExpanded: this.delayForcePopupAlign,
        treeNodes: treeNodes,
        filteredTreeNodes: filteredTreeNodes,
        onCancel: this.handleCancel,
        onConfirm: this.handleConfirm
      }));

      var Selector = isMultiple ? _MultipleSelector["default"] : _SingleSelector["default"];

      var $selector = _react["default"].createElement(Selector, _extends({}, passProps, {
        ref: this.selectorRef,
        onChoiceAnimationLeave: this.forcePopupAlign
      })); // let triggerGetPopupContainer = passProps.getPopupContainer;
      // if (!triggerGetPopupContainer || !triggerGetPopupContainer()) {
      //   triggerGetPopupContainer = this.__proto__.constructor.defaultProps.getPopupContainer;
      // }


      var triggerProps = {
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
        open: passProps.open
      };
      return _react["default"].createElement(_SelectTrigger["default"], _extends({}, triggerProps, {
        ref: this.selectTriggerRef
      }), $selector);
    }
  }]);

  return Select;
}(_react["default"].Component);

_defineProperty(Select, "propTypes", {
  prefixCls: _propTypes["default"].string,
  iconPrefix: _propTypes["default"].string,
  prefixAria: _propTypes["default"].string,
  multiple: _propTypes["default"].bool,
  showArrow: _propTypes["default"].bool,
  open: _propTypes["default"].bool,
  value: _propTypes2.valueProp,
  autoFocus: _propTypes["default"].bool,
  editable: _propTypes["default"].bool,
  esc: _propTypes["default"].bool,
  required: _propTypes["default"].bool,
  defaultOpen: _propTypes["default"].bool,
  defaultValue: _propTypes2.valueProp,
  showSearch: _propTypes["default"].bool,
  placeholder: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  inputValue: _propTypes["default"].string,
  // [Legacy] Deprecated. Use `searchValue` instead.
  searchValue: _propTypes["default"].string,
  autoClearSearchValue: _propTypes["default"].bool,
  searchPlaceholder: _propTypes["default"].node,
  // [Legacy] Confuse with placeholder
  disabled: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  labelInValue: _propTypes["default"].bool,
  maxTagCount: _propTypes["default"].number,
  maxTagPlaceholder: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  maxTagTextLength: _propTypes["default"].number,
  showCheckedStrategy: _propTypes["default"].oneOf([_strategies.SHOW_ALL, _strategies.SHOW_PARENT, _strategies.SHOW_CHILD]),
  dropdownMatchSelectWidth: _propTypes["default"].bool,
  tagWidth: _propTypes["default"].number,
  treeData: _propTypes["default"].array,
  treeDataSimpleMode: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object]),
  treeNodeFilterProp: _propTypes["default"].string,
  treeNodeLabelProp: _propTypes["default"].string,
  treeNodeResetTitle: _propTypes["default"].string,
  treeCheckable: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].node]),
  treeCheckStrictly: _propTypes["default"].bool,
  showIcon: _propTypes["default"].bool,
  icon: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node]),
  treeLine: _propTypes["default"].bool,
  treeDefaultExpandAll: _propTypes["default"].bool,
  treeDefaultExpandedKeys: _propTypes["default"].array,
  loadData: _propTypes["default"].func,
  loading: _propTypes["default"].bool,
  uniqueTreeNodeByLabel: _propTypes["default"].bool,
  filterTreeNode: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].bool]),
  notFoundContent: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  getPopupContainer: _propTypes["default"].func,
  onSearch: _propTypes["default"].func,
  onSelect: _propTypes["default"].func,
  onDeselect: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onConfirm: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  onExpand: _propTypes["default"].func,
  onReset: _propTypes["default"].func,
  onDropdownVisibleChange: _propTypes["default"].func
});

_defineProperty(Select, "childContextTypes", {
  rcTreeSelect: _propTypes["default"].shape(_objectSpread({}, _BaseSelector.selectorContextTypes, {}, _MultipleSelector.multipleSelectorContextTypes, {}, _BasePopup.popupContextTypes, {
    onSearchInputChange: _propTypes["default"].func,
    onSearchInputKeyDown: _propTypes["default"].func
  }))
});

_defineProperty(Select, "defaultProps", {
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
  showCheckedStrategy: _strategies.SHOW_CHILD,
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
  getPopupContainer: function getPopupContainer() {
    return document.body;
  }
});

Select.TreeNode = _SelectNode["default"];
Select.SHOW_ALL = _strategies.SHOW_ALL;
Select.SHOW_PARENT = _strategies.SHOW_PARENT;
Select.SHOW_CHILD = _strategies.SHOW_CHILD; // Let warning show correct component name

Select.displayName = 'TreeSelect';
(0, _reactLifecyclesCompat.polyfill)(Select);
var _default = Select;
exports["default"] = _default;