"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _contextTypes = require("./contextTypes");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tree =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tree);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tree)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      posEntities: {},
      // eslint-disable-line react/no-unused-state
      keyEntities: {},
      selectedKeys: [],
      checkedKeys: [],
      halfCheckedKeys: [],
      loadedKeys: [],
      loadingKeys: [],
      treeNode: []
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeDragStart", function (event, node) {
      var expandedKeys = _this.state.expandedKeys;
      var onDragStart = _this.props.onDragStart;
      var _node$props = node.props,
          eventKey = _node$props.eventKey,
          children = _node$props.children;
      _this.dragNode = node;

      _this.setState({
        dragNodesKeys: (0, _util.getDragNodesKeys)(children, node),
        expandedKeys: (0, _util.arrDel)(expandedKeys, eventKey)
      });

      if (onDragStart) {
        onDragStart({
          event: event,
          node: node
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeDragEnter", function (event, node) {
      var expandedKeys = _this.state.expandedKeys;
      var onDragEnter = _this.props.onDragEnter;
      var _node$props2 = node.props,
          pos = _node$props2.pos,
          eventKey = _node$props2.eventKey;
      if (!_this.dragNode) return;
      var dropPosition = (0, _util.calcDropPosition)(event, node); // Skip if drag node is self

      if (_this.dragNode.props.eventKey === eventKey && dropPosition === 0) {
        _this.setState({
          dragOverNodeKey: '',
          dropPosition: null
        });

        return;
      } // Ref: https://github.com/react-component/tree/issues/132
      // Add timeout to let onDragLevel fire before onDragEnter,
      // so that we can clean drag props for onDragLeave node.
      // Macro task for this:
      // https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-script


      setTimeout(function () {
        // Update drag over node
        _this.setState({
          dragOverNodeKey: eventKey,
          dropPosition: dropPosition
        }); // Side effect for delay drag


        if (!_this.delayedDragEnterLogic) {
          _this.delayedDragEnterLogic = {};
        }

        Object.keys(_this.delayedDragEnterLogic).forEach(function (key) {
          clearTimeout(_this.delayedDragEnterLogic[key]);
        });
        _this.delayedDragEnterLogic[pos] = setTimeout(function () {
          var newExpandedKeys = (0, _util.arrAdd)(expandedKeys, eventKey);

          _this.setState({
            expandedKeys: newExpandedKeys
          });

          if (onDragEnter) {
            onDragEnter({
              event: event,
              node: node,
              expandedKeys: newExpandedKeys
            });
          }
        }, 400);
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeDragOver", function (event, node) {
      var onDragOver = _this.props.onDragOver;
      var eventKey = node.props.eventKey; // Update drag position

      if (_this.dragNode && eventKey === _this.state.dragOverNodeKey) {
        var dropPosition = (0, _util.calcDropPosition)(event, node);
        if (dropPosition === _this.state.dropPosition) return;

        _this.setState({
          dropPosition: dropPosition
        });
      }

      if (onDragOver) {
        onDragOver({
          event: event,
          node: node
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeDragLeave", function (event, node) {
      var onDragLeave = _this.props.onDragLeave;

      _this.setState({
        dragOverNodeKey: ''
      });

      if (onDragLeave) {
        onDragLeave({
          event: event,
          node: node
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeDragEnd", function (event, node) {
      var onDragEnd = _this.props.onDragEnd;

      _this.setState({
        dragOverNodeKey: ''
      });

      if (onDragEnd) {
        onDragEnd({
          event: event,
          node: node
        });
      }

      _this.dragNode = null;
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeDrop", function (event, node) {
      var _this$state = _this.state,
          _this$state$dragNodes = _this$state.dragNodesKeys,
          dragNodesKeys = _this$state$dragNodes === void 0 ? [] : _this$state$dragNodes,
          dropPosition = _this$state.dropPosition;
      var onDrop = _this.props.onDrop;
      var _node$props3 = node.props,
          eventKey = _node$props3.eventKey,
          pos = _node$props3.pos;

      _this.setState({
        dragOverNodeKey: ''
      });

      if (dragNodesKeys.indexOf(eventKey) !== -1) {
        (0, _warning["default"])(false, 'Can not drop to dragNode(include it\'s children node)');
        return;
      }

      var posArr = (0, _util.posToArr)(pos);
      var dropResult = {
        event: event,
        node: node,
        dragNode: _this.dragNode,
        dragNodesKeys: dragNodesKeys.slice(),
        dropPosition: dropPosition + Number(posArr[posArr.length - 1])
      };

      if (dropPosition !== 0) {
        dropResult.dropToGap = true;
      }

      if (onDrop) {
        onDrop(dropResult);
      }

      _this.dragNode = null;
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeClick", function (e, treeNode) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e, treeNode);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeDoubleClick", function (e, treeNode) {
      var onDoubleClick = _this.props.onDoubleClick;

      if (onDoubleClick) {
        onDoubleClick(e, treeNode);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeSelect", function (e, treeNode) {
      var selectedKeys = _this.state.selectedKeys;
      var keyEntities = _this.state.keyEntities;
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          multiple = _this$props.multiple,
          required = _this$props.required;
      var _treeNode$props = treeNode.props,
          selected = _treeNode$props.selected,
          eventKey = _treeNode$props.eventKey;
      var targetSelected = !selected; // 必选的单选，取消选择时不处理

      if (required && !multiple && !targetSelected) return; // Update selected keys

      if (!targetSelected) {
        selectedKeys = (0, _util.arrDel)(selectedKeys, eventKey);
      } else if (!multiple) {
        selectedKeys = [eventKey];
      } else {
        selectedKeys = (0, _util.arrAdd)(selectedKeys, eventKey);
      } // [Legacy] Not found related usage in doc or upper libs


      var selectedNodes = selectedKeys.map(function (key) {
        var entity = keyEntities[key];
        if (!entity) return null;
        return entity.node;
      }).filter(function (node) {
        return node;
      });

      _this.setUncontrolledState({
        selectedKeys: selectedKeys
      });

      if (onSelect) {
        var eventObj = {
          event: 'select',
          selected: targetSelected,
          node: treeNode,
          selectedNodes: selectedNodes,
          nativeEvent: e.nativeEvent
        };
        onSelect(selectedKeys, eventObj);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeCheck", function (e, treeNode, checked) {
      var _this$state2 = _this.state,
          keyEntities = _this$state2.keyEntities,
          oriCheckedKeys = _this$state2.checkedKeys,
          oriHalfCheckedKeys = _this$state2.halfCheckedKeys,
          loadedKeys = _this$state2.loadedKeys;
      var _this$props2 = _this.props,
          checkStrictly = _this$props2.checkStrictly,
          onCheck = _this$props2.onCheck,
          loadData = _this$props2.loadData;
      var eventKey = treeNode.props.eventKey; // Prepare trigger arguments

      var checkedObj;
      var eventObj = {
        event: 'check',
        node: treeNode,
        checked: checked,
        nativeEvent: e.nativeEvent
      };

      if (checkStrictly) {
        var checkedKeys = checked ? (0, _util.arrAdd)(oriCheckedKeys, eventKey) : (0, _util.arrDel)(oriCheckedKeys, eventKey);
        var halfCheckedKeys = (0, _util.arrDel)(oriHalfCheckedKeys, eventKey);
        checkedObj = {
          checked: checkedKeys,
          halfChecked: halfCheckedKeys
        };
        eventObj.checkedNodes = checkedKeys.map(function (key) {
          return keyEntities[key];
        }).filter(function (entity) {
          return entity;
        }).map(function (entity) {
          return entity.node;
        });

        _this.setUncontrolledState({
          checkedKeys: checkedKeys
        });
      } else {
        var _conductCheck = (0, _util.conductCheck)([eventKey], checked, keyEntities, {
          checkedKeys: oriCheckedKeys,
          halfCheckedKeys: oriHalfCheckedKeys
        }, loadData, loadedKeys),
            _checkedKeys = _conductCheck.checkedKeys,
            _halfCheckedKeys = _conductCheck.halfCheckedKeys;

        checkedObj = _checkedKeys; // [Legacy] This is used for `rc-tree-select`

        eventObj.checkedNodes = [];
        eventObj.checkedNodesPositions = [];
        eventObj.halfCheckedKeys = _halfCheckedKeys;

        _checkedKeys.forEach(function (key) {
          var entity = keyEntities[key];
          if (!entity) return;
          var node = entity.node,
              pos = entity.pos;
          eventObj.checkedNodes.push(node);
          eventObj.checkedNodesPositions.push({
            node: node,
            pos: pos
          });
        });

        _this.setUncontrolledState({
          checkedKeys: _checkedKeys,
          halfCheckedKeys: _halfCheckedKeys
        });
      }

      if (onCheck) {
        onCheck(checkedObj, eventObj);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeLoad", function (treeNode) {
      return new Promise(function (resolve, reject) {
        // We need to get the latest state of loading/loaded keys
        _this.setState(function (_ref) {
          var _ref$loadedKeys = _ref.loadedKeys,
              loadedKeys = _ref$loadedKeys === void 0 ? [] : _ref$loadedKeys,
              _ref$loadingKeys = _ref.loadingKeys,
              loadingKeys = _ref$loadingKeys === void 0 ? [] : _ref$loadingKeys;
          var _this$props3 = _this.props,
              loadData = _this$props3.loadData,
              onLoad = _this$props3.onLoad,
              onCheck = _this$props3.onCheck;
          var eventKey = treeNode.props.eventKey;

          if (!loadData || loadedKeys.indexOf(eventKey) !== -1 || loadingKeys.indexOf(eventKey) !== -1) {
            // react 15 will warn if return null
            return {};
          } // Process load data


          var promise = loadData(treeNode);
          promise.then(function () {
            var _this$state3 = _this.state,
                keyEntities = _this$state3.keyEntities,
                oriCheckedKeys = _this$state3.checkedKeys,
                oriHalfCheckedKeys = _this$state3.halfCheckedKeys;
            var newLoadedKeys = (0, _util.arrAdd)(_this.state.loadedKeys, eventKey);
            var newLoadingKeys = (0, _util.arrDel)(_this.state.loadingKeys, eventKey); // onLoad should trigger before internal setState to avoid `loadData` trigger twice.
            // https://github.com/ant-design/ant-design/issues/12464

            if (onLoad) {
              var eventObj = {
                event: 'load',
                node: treeNode
              };
              onLoad(newLoadedKeys, eventObj);
            } // 半选状态下的节点异步加载完成后，根据其子节点的状态更新该节点及其祖先节点的选择状态


            if (treeNode.props.halfChecked) {
              var _conductLoad = (0, _util.conductLoad)([eventKey], treeNode.props.checked, keyEntities, {
                checkedKeys: oriCheckedKeys,
                halfCheckedKeys: oriHalfCheckedKeys
              }),
                  checkedKeys = _conductLoad.checkedKeys,
                  halfCheckedKeys = _conductLoad.halfCheckedKeys;

              if (checkedKeys.indexOf(eventKey) != -1) {
                var checkedObj = checkedKeys;
                var evtObj = {
                  event: 'check',
                  node: treeNode,
                  checked: true // nativeEvent: e.nativeEvent,

                }; // [Legacy] This is used for `rc-tree-select`

                evtObj.checkedNodes = [];
                evtObj.checkedNodesPositions = [];
                evtObj.halfCheckedKeys = halfCheckedKeys;
                checkedKeys.forEach(function (key) {
                  var entity = keyEntities[key];
                  if (!entity) return;
                  var node = entity.node,
                      pos = entity.pos;
                  evtObj.checkedNodes.push(node);
                  evtObj.checkedNodesPositions.push({
                    node: node,
                    pos: pos
                  });
                }); // checkedKeys 改变后触发勾选事件

                if (onCheck) {
                  onCheck(checkedObj, evtObj);
                }

                _this.setState({
                  checkedKeys: checkedKeys,
                  halfCheckedKeys: halfCheckedKeys
                });
              }
            }

            _this.setUncontrolledState({
              loadedKeys: newLoadedKeys
            });

            _this.setState({
              loadingKeys: newLoadingKeys
            });

            resolve();
          }, function () {
            reject();
          });
          return {
            loadingKeys: (0, _util.arrAdd)(loadingKeys, eventKey)
          };
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeExpand", function (e, treeNode) {
      var _this$state4 = _this.state,
          oriExpandedKeys = _this$state4.expandedKeys,
          oriLoadingKeys = _this$state4.loadingKeys;
      var _this$props4 = _this.props,
          onExpand = _this$props4.onExpand,
          loadData = _this$props4.loadData;
      var _treeNode$props2 = treeNode.props,
          eventKey = _treeNode$props2.eventKey,
          expanded = _treeNode$props2.expanded; // Update selected keys

      var index = oriExpandedKeys.indexOf(eventKey);
      var targetExpanded = !expanded;
      (0, _warning["default"])(expanded && index !== -1 || !expanded && index === -1, 'Expand state not sync with index check');
      var expandedKeys = [];

      if (targetExpanded) {
        expandedKeys = (0, _util.arrAdd)(oriExpandedKeys, eventKey);
      } else {
        expandedKeys = (0, _util.arrDel)(oriExpandedKeys, eventKey);
      }

      _this.setUncontrolledState({
        expandedKeys: expandedKeys
      });

      if (onExpand) {
        onExpand(expandedKeys, {
          node: treeNode,
          expanded: targetExpanded,
          nativeEvent: e.nativeEvent
        });
      } // Async Load data


      if (targetExpanded && loadData) {
        var loadPromise = _this.onNodeLoad(treeNode);

        return loadPromise ? loadPromise.then(function () {
          // [Legacy] Refresh logic
          _this.setUncontrolledState({
            expandedKeys: expandedKeys
          });
        }, function () {
          _this.setState({
            expandedKeys: oriExpandedKeys,
            loadingKeys: oriLoadingKeys
          });
        }) : null;
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeMouseEnter", function (event, node) {
      var onMouseEnter = _this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter({
          event: event,
          node: node
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeMouseLeave", function (event, node) {
      var onMouseLeave = _this.props.onMouseLeave;

      if (onMouseLeave) {
        onMouseLeave({
          event: event,
          node: node
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNodeContextMenu", function (event, node) {
      var onRightClick = _this.props.onRightClick;

      if (onRightClick) {
        event.preventDefault();
        onRightClick({
          event: event,
          node: node
        });
      }
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
    });

    _defineProperty(_assertThisInitialized(_this), "isKeyChecked", function (key) {
      var _this$state$checkedKe = _this.state.checkedKeys,
          checkedKeys = _this$state$checkedKe === void 0 ? [] : _this$state$checkedKe;
      return checkedKeys.indexOf(key) !== -1;
    });

    _defineProperty(_assertThisInitialized(_this), "renderTreeNode", function (child, index) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var _this$state5 = _this.state,
          keyEntities = _this$state5.keyEntities,
          _this$state5$expanded = _this$state5.expandedKeys,
          expandedKeys = _this$state5$expanded === void 0 ? [] : _this$state5$expanded,
          _this$state5$selected = _this$state5.selectedKeys,
          selectedKeys = _this$state5$selected === void 0 ? [] : _this$state5$selected,
          _this$state5$halfChec = _this$state5.halfCheckedKeys,
          halfCheckedKeys = _this$state5$halfChec === void 0 ? [] : _this$state5$halfChec,
          _this$state5$loadedKe = _this$state5.loadedKeys,
          loadedKeys = _this$state5$loadedKe === void 0 ? [] : _this$state5$loadedKe,
          _this$state5$loadingK = _this$state5.loadingKeys,
          loadingKeys = _this$state5$loadingK === void 0 ? [] : _this$state5$loadingK,
          dragOverNodeKey = _this$state5.dragOverNodeKey,
          dropPosition = _this$state5.dropPosition;
      var pos = (0, _util.getPosition)(level, index);
      var key = child.key || pos;

      if (!keyEntities[key]) {
        (0, _util.warnOnlyTreeNode)();
        return null;
      }

      return _react["default"].cloneElement(child, {
        key: key,
        eventKey: key,
        expanded: expandedKeys.indexOf(key) !== -1,
        selected: selectedKeys.indexOf(key) !== -1,
        loaded: loadedKeys.indexOf(key) !== -1,
        loading: loadingKeys.indexOf(key) !== -1,
        checked: _this.isKeyChecked(key),
        halfChecked: halfCheckedKeys.indexOf(key) !== -1,
        pos: pos,
        // [Legacy] Drag props
        dragOver: dragOverNodeKey === key && dropPosition === 0,
        dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
        dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
      });
    });

    return _this;
  }

  _createClass(Tree, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this$props5 = this.props,
          prefixCls = _this$props5.prefixCls,
          selectable = _this$props5.selectable,
          showIcon = _this$props5.showIcon,
          icon = _this$props5.icon,
          draggable = _this$props5.draggable,
          checkable = _this$props5.checkable,
          checkStrictly = _this$props5.checkStrictly,
          disabled = _this$props5.disabled,
          loadData = _this$props5.loadData,
          filterTreeNode = _this$props5.filterTreeNode,
          openTransitionName = _this$props5.openTransitionName,
          openAnimation = _this$props5.openAnimation,
          switcherIcon = _this$props5.switcherIcon;
      return {
        rcTree: {
          // root: this,
          prefixCls: prefixCls,
          selectable: selectable,
          showIcon: showIcon,
          icon: icon,
          switcherIcon: switcherIcon,
          draggable: draggable,
          checkable: checkable,
          checkStrictly: checkStrictly,
          disabled: disabled,
          openTransitionName: openTransitionName,
          openAnimation: openAnimation,
          loadData: loadData,
          filterTreeNode: filterTreeNode,
          renderTreeNode: this.renderTreeNode,
          isKeyChecked: this.isKeyChecked,
          onNodeClick: this.onNodeClick,
          onNodeDoubleClick: this.onNodeDoubleClick,
          onNodeExpand: this.onNodeExpand,
          onNodeSelect: this.onNodeSelect,
          onNodeCheck: this.onNodeCheck,
          onNodeLoad: this.onNodeLoad,
          onNodeMouseEnter: this.onNodeMouseEnter,
          onNodeMouseLeave: this.onNodeMouseLeave,
          onNodeContextMenu: this.onNodeContextMenu,
          onNodeDragStart: this.onNodeDragStart,
          onNodeDragEnter: this.onNodeDragEnter,
          onNodeDragOver: this.onNodeDragOver,
          onNodeDragLeave: this.onNodeDragLeave,
          onNodeDragEnd: this.onNodeDragEnd,
          onNodeDrop: this.onNodeDrop
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var treeNode = this.state.treeNode;
      var _this$props6 = this.props,
          prefixCls = _this$props6.prefixCls,
          className = _this$props6.className,
          style = _this$props6.style,
          focusable = _this$props6.focusable,
          showLine = _this$props6.showLine,
          _this$props6$tabIndex = _this$props6.tabIndex,
          tabIndex = _this$props6$tabIndex === void 0 ? 0 : _this$props6$tabIndex;
      var domProps = (0, _util.getDataAndAria)(this.props);

      if (focusable) {
        domProps.tabIndex = tabIndex;
        domProps.onKeyDown = this.onKeyDown;
      }

      return _react["default"].createElement("ul", _extends({}, domProps, {
        className: (0, _classnames["default"])(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-show-line"), showLine)),
        style: style,
        role: "tree",
        unselectable: "on"
      }), (0, _util.mapChildren)(treeNode, function (node, index) {
        return _this2.renderTreeNode(node, index);
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, prevState) {
      var prevProps = prevState.prevProps;
      var newState = {
        prevProps: props
      };

      function needSync(name) {
        return !prevProps && name in props || prevProps && prevProps[name] !== props[name];
      } // ================== Tree Node ==================


      var treeNode = null; // Check if `treeData` or `children` changed and save into the state.

      if (needSync('treeData')) {
        treeNode = (0, _util.convertDataToTree)(props.treeData);
      } else if (needSync('children')) {
        treeNode = (0, _util.toArray)(props.children);
      } // Tree support filter function which will break the tree structure in the vdm.
      // We cache the treeNodes in state so that we can return the treeNode in event trigger.


      if (treeNode) {
        newState.treeNode = treeNode; // Calculate the entities data for quick match

        var entitiesMap = (0, _util.convertTreeToEntities)(treeNode);
        newState.posEntities = entitiesMap.posEntities;
        newState.keyEntities = entitiesMap.keyEntities;
      }

      var keyEntities = newState.keyEntities || prevState.keyEntities; // ================ expandedKeys =================

      if (needSync('expandedKeys') || prevProps && needSync('autoExpandParent')) {
        newState.expandedKeys = props.autoExpandParent || !prevProps && props.defaultExpandParent ? (0, _util.conductExpandParent)(props.expandedKeys, keyEntities) : props.expandedKeys;
      } else if (treeNode && props.expandAll || !prevProps && props.defaultExpandAll) {
        newState.expandedKeys = Object.keys(keyEntities);
      } else if (!prevProps && props.defaultExpandedKeys) {
        newState.expandedKeys = props.autoExpandParent || props.defaultExpandParent ? (0, _util.conductExpandParent)(props.defaultExpandedKeys, keyEntities) : props.defaultExpandedKeys;
      } // ================ selectedKeys =================


      if (props.selectable) {
        if (needSync('selectedKeys')) {
          newState.selectedKeys = (0, _util.calcSelectedKeys)(props.selectedKeys, props);
        } else if (!prevProps && props.defaultSelectedKeys) {
          newState.selectedKeys = (0, _util.calcSelectedKeys)(props.defaultSelectedKeys, props);
        }
      } // ================= checkedKeys =================


      if (props.checkable) {
        var checkedKeyEntity;

        if (needSync('checkedKeys')) {
          checkedKeyEntity = (0, _util.parseCheckedKeys)(props.checkedKeys) || {};
        } else if (!prevProps && props.defaultCheckedKeys) {
          checkedKeyEntity = (0, _util.parseCheckedKeys)(props.defaultCheckedKeys) || {};
        } else if (treeNode) {
          // If treeNode changed, we also need check it
          checkedKeyEntity = {
            checkedKeys: prevState.checkedKeys,
            halfCheckedKeys: prevState.halfCheckedKeys
          };
        }

        if (checkedKeyEntity) {
          var _checkedKeyEntity = checkedKeyEntity,
              _checkedKeyEntity$che = _checkedKeyEntity.checkedKeys,
              checkedKeys = _checkedKeyEntity$che === void 0 ? [] : _checkedKeyEntity$che,
              _checkedKeyEntity$hal = _checkedKeyEntity.halfCheckedKeys,
              halfCheckedKeys = _checkedKeyEntity$hal === void 0 ? [] : _checkedKeyEntity$hal;

          if (!props.checkStrictly) {
            var conductKeys = (0, _util.conductCheck)(checkedKeys, true, keyEntities, null, props.loadData, props.loadedKeys);
            checkedKeys = conductKeys.checkedKeys;
            halfCheckedKeys = conductKeys.halfCheckedKeys;
          }

          newState.checkedKeys = checkedKeys;
          newState.halfCheckedKeys = halfCheckedKeys;
        }
      } // ================= loadedKeys ==================


      if (needSync('loadedKeys')) {
        newState.loadedKeys = props.loadedKeys;
      }

      return newState;
    }
  }]);

  return Tree;
}(_react["default"].Component);

_defineProperty(Tree, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  tabIndex: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  children: _propTypes["default"].node,
  treeData: _propTypes["default"].array,
  // Generate treeNode by children
  showLine: _propTypes["default"].bool,
  showIcon: _propTypes["default"].bool,
  icon: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  focusable: _propTypes["default"].bool,
  selectable: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  multiple: _propTypes["default"].bool,
  checkable: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].node]),
  checkStrictly: _propTypes["default"].bool,
  draggable: _propTypes["default"].bool,
  defaultExpandParent: _propTypes["default"].bool,
  autoExpandParent: _propTypes["default"].bool,
  defaultExpandAll: _propTypes["default"].bool,
  defaultExpandedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  expandAll: _propTypes["default"].bool,
  expandedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  defaultCheckedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  checkedKeys: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])), _propTypes["default"].object]),
  defaultSelectedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  selectedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  onClick: _propTypes["default"].func,
  onDoubleClick: _propTypes["default"].func,
  onExpand: _propTypes["default"].func,
  onCheck: _propTypes["default"].func,
  onSelect: _propTypes["default"].func,
  onLoad: _propTypes["default"].func,
  loadData: _propTypes["default"].func,
  loadedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onRightClick: _propTypes["default"].func,
  onDragStart: _propTypes["default"].func,
  onDragEnter: _propTypes["default"].func,
  onDragOver: _propTypes["default"].func,
  onDragLeave: _propTypes["default"].func,
  onDragEnd: _propTypes["default"].func,
  onDrop: _propTypes["default"].func,
  filterTreeNode: _propTypes["default"].func,
  openTransitionName: _propTypes["default"].string,
  openAnimation: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  switcherIcon: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  required: _propTypes["default"].bool
});

_defineProperty(Tree, "childContextTypes", _contextTypes.treeContextTypes);

_defineProperty(Tree, "defaultProps", {
  prefixCls: 'fishd-rc-tree',
  showLine: false,
  showIcon: true,
  selectable: true,
  multiple: false,
  checkable: false,
  disabled: false,
  checkStrictly: false,
  draggable: false,
  defaultExpandParent: true,
  autoExpandParent: false,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  expandAll: false,
  required: false
});

(0, _reactLifecyclesCompat.polyfill)(Tree);
var _default = Tree;
exports["default"] = _default;