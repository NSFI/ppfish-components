"use strict";

exports.__esModule = true;
exports.default = exports.SubMenu = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _utils = require("../../../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _miniStore = require("mini-store");

var _SubPopupMenu = _interopRequireDefault(require("./SubPopupMenu"));

var _placements = _interopRequireDefault(require("./placements"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var guid = 0;
var popupPlacementMap = {
  horizontal: 'bottomLeft',
  vertical: 'rightTop',
  'vertical-left': 'rightTop',
  'vertical-right': 'leftTop'
};

var updateDefaultActiveFirst = function updateDefaultActiveFirst(store, eventKey, defaultActiveFirst) {
  var _Object$assign;

  var menuId = (0, _util.getMenuIdFromSubMenuEventKey)(eventKey);
  var state = store.getState();
  store.setState({
    defaultActiveFirst: Object.assign({}, state.defaultActiveFirst, (_Object$assign = {}, _Object$assign[menuId] = defaultActiveFirst, _Object$assign))
  });
};

var SubMenu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SubMenu, _React$Component);

  function SubMenu(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onDestroy", function (key) {
      _this.props.onDestroy(key);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var keyCode = e.keyCode;
      var menu = _this.menuInstance;
      var _this$props = _this.props,
          isOpen = _this$props.isOpen,
          store = _this$props.store;

      if (keyCode === _utils.KeyCode.ENTER) {
        _this.onTitleClick(e);

        updateDefaultActiveFirst(store, _this.props.eventKey, true);
        return true;
      }

      if (keyCode === _utils.KeyCode.RIGHT) {
        if (isOpen) {
          menu.onKeyDown(e);
        } else {
          _this.triggerOpenChange(true); // need to update current menu's defaultActiveFirst value


          updateDefaultActiveFirst(store, _this.props.eventKey, true);
        }

        return true;
      }

      if (keyCode === _utils.KeyCode.LEFT) {
        var handled;

        if (isOpen) {
          handled = menu.onKeyDown(e);
        } else {
          return undefined;
        }

        if (!handled) {
          _this.triggerOpenChange(false);

          handled = true;
        }

        return handled;
      }

      if (isOpen && (keyCode === _utils.KeyCode.UP || keyCode === _utils.KeyCode.DOWN)) {
        return menu.onKeyDown(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOpenChange", function (e) {
      _this.props.onOpenChange(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onPopupVisibleChange", function (visible) {
      _this.triggerOpenChange(visible, visible ? 'mouseenter' : 'mouseleave');
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      var _this$props2 = _this.props,
          key = _this$props2.eventKey,
          onMouseEnter = _this$props2.onMouseEnter,
          store = _this$props2.store;
      updateDefaultActiveFirst(store, _this.props.eventKey, false);
      onMouseEnter({
        key: key,
        domEvent: e
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (e) {
      var _this$props3 = _this.props,
          parentMenu = _this$props3.parentMenu,
          eventKey = _this$props3.eventKey,
          onMouseLeave = _this$props3.onMouseLeave;
      parentMenu.subMenuInstance = _assertThisInitialized(_this);
      onMouseLeave({
        key: eventKey,
        domEvent: e
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTitleMouseEnter", function (domEvent) {
      var _this$props4 = _this.props,
          key = _this$props4.eventKey,
          onItemHover = _this$props4.onItemHover,
          onTitleMouseEnter = _this$props4.onTitleMouseEnter;
      onItemHover({
        key: key,
        hover: true
      });
      onTitleMouseEnter({
        key: key,
        domEvent: domEvent
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTitleMouseLeave", function (e) {
      var _this$props5 = _this.props,
          parentMenu = _this$props5.parentMenu,
          eventKey = _this$props5.eventKey,
          onItemHover = _this$props5.onItemHover,
          onTitleMouseLeave = _this$props5.onTitleMouseLeave;
      parentMenu.subMenuInstance = _assertThisInitialized(_this);
      onItemHover({
        key: eventKey,
        hover: false
      });
      onTitleMouseLeave({
        key: eventKey,
        domEvent: e
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTitleClick", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      props.onTitleClick({
        key: props.eventKey,
        domEvent: e
      });

      if (props.triggerSubMenuAction === 'hover') {
        return;
      }

      _this.triggerOpenChange(!props.isOpen, 'click');

      updateDefaultActiveFirst(props.store, _this.props.eventKey, false);
    });

    _defineProperty(_assertThisInitialized(_this), "onSubMenuClick", function (info) {
      _this.props.onClick(_this.addKeyPath(info));
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (info) {
      _this.props.onSelect(info);
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselect", function (info) {
      _this.props.onDeselect(info);
    });

    _defineProperty(_assertThisInitialized(_this), "getPrefixCls", function () {
      return _this.props.rootPrefixCls + "-submenu";
    });

    _defineProperty(_assertThisInitialized(_this), "getActiveClassName", function () {
      return _this.getPrefixCls() + "-active";
    });

    _defineProperty(_assertThisInitialized(_this), "getDisabledClassName", function () {
      return _this.getPrefixCls() + "-disabled";
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedClassName", function () {
      return _this.getPrefixCls() + "-selected";
    });

    _defineProperty(_assertThisInitialized(_this), "getOpenClassName", function () {
      return _this.props.rootPrefixCls + "-submenu-open";
    });

    _defineProperty(_assertThisInitialized(_this), "saveMenuInstance", function (c) {
      // children menu instance
      _this.menuInstance = c;
    });

    _defineProperty(_assertThisInitialized(_this), "addKeyPath", function (info) {
      return Object.assign({}, info, {
        keyPath: (info.keyPath || []).concat(_this.props.eventKey)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "triggerOpenChange", function (open, type) {
      var key = _this.props.eventKey;

      var openChange = function openChange() {
        _this.onOpenChange({
          key: key,
          item: _assertThisInitialized(_this),
          trigger: type,
          open: open
        });
      };

      if (type === 'mouseenter') {
        // make sure mouseenter happen after other menu item's mouseleave
        _this.mouseenterTimeout = setTimeout(function () {
          openChange();
        }, 0);
      } else {
        openChange();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isChildrenSelected", function () {
      var ret = {
        find: false
      };
      (0, _util.loopMenuItemRecursively)(_this.props.children, _this.props.selectedKeys, ret);
      return ret.find;
    });

    _defineProperty(_assertThisInitialized(_this), "isOpen", function () {
      return _this.props.openKeys.indexOf(_this.props.eventKey) !== -1;
    });

    _defineProperty(_assertThisInitialized(_this), "adjustWidth", function () {
      /* istanbul ignore if */
      if (!_this.subMenuTitle || !_this.menuInstance) {
        return;
      }

      var popupMenu = _reactDom.default.findDOMNode(_this.menuInstance);

      if (popupMenu.offsetWidth >= _this.subMenuTitle.offsetWidth) {
        return;
      }
      /* istanbul ignore next */


      popupMenu.style.minWidth = _this.subMenuTitle.offsetWidth + "px";
    });

    _defineProperty(_assertThisInitialized(_this), "saveSubMenuTitle", function (subMenuTitle) {
      _this.subMenuTitle = subMenuTitle;
    });

    var _store = _props.store;
    var _eventKey = _props.eventKey;

    var defaultActiveFirst = _store.getState().defaultActiveFirst;

    _this.isRootMenu = false;
    var value = false;

    if (defaultActiveFirst) {
      value = defaultActiveFirst[_eventKey];
    }

    updateDefaultActiveFirst(_store, _eventKey, value);
    return _this;
  }

  var _proto = SubMenu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.componentDidUpdate();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var _this$props6 = this.props,
        mode = _this$props6.mode,
        parentMenu = _this$props6.parentMenu,
        manualRef = _this$props6.manualRef; // invoke customized ref to expose component to mixin

    if (manualRef) {
      manualRef(this);
    }

    if (mode !== 'horizontal' || !parentMenu.isRootMenu || !this.props.isOpen) {
      return;
    }

    this.minWidthTimeout = setTimeout(function () {
      return _this2.adjustWidth();
    }, 0);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this$props7 = this.props,
        onDestroy = _this$props7.onDestroy,
        eventKey = _this$props7.eventKey;

    if (onDestroy) {
      onDestroy(eventKey);
    }
    /* istanbul ignore if */


    if (this.minWidthTimeout) {
      clearTimeout(this.minWidthTimeout);
    }
    /* istanbul ignore if */


    if (this.mouseenterTimeout) {
      clearTimeout(this.mouseenterTimeout);
    }
  };

  _proto.renderChildren = function renderChildren(children) {
    var props = this.props;
    var baseProps = {
      mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
      visible: this.props.isOpen,
      level: props.level + 1,
      inlineIndent: props.inlineIndent,
      focusable: false,
      onClick: this.onSubMenuClick,
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      onDestroy: this.onDestroy,
      selectedKeys: props.selectedKeys,
      eventKey: props.eventKey + "-menu-",
      openKeys: props.openKeys,
      openTransitionName: props.openTransitionName,
      openAnimation: props.openAnimation,
      onOpenChange: this.onOpenChange,
      subMenuOpenDelay: props.subMenuOpenDelay,
      parentMenu: this,
      subMenuCloseDelay: props.subMenuCloseDelay,
      forceSubMenuRender: props.forceSubMenuRender,
      triggerSubMenuAction: props.triggerSubMenuAction,
      builtinPlacements: props.builtinPlacements,
      defaultActiveFirst: props.store.getState().defaultActiveFirst[(0, _util.getMenuIdFromSubMenuEventKey)(props.eventKey)],
      multiple: props.multiple,
      prefixCls: props.rootPrefixCls,
      id: this._menuId,
      manualRef: this.saveMenuInstance
    };
    var haveRendered = this.haveRendered;
    this.haveRendered = true;
    this.haveOpened = this.haveOpened || baseProps.visible || baseProps.forceSubMenuRender; // never rendered not planning to, don't render

    if (!this.haveOpened) {
      return _react.default.createElement("div", null);
    } // don't show transition on first rendering (no animation for opened menu)
    // show appear transition if it's not visible (not sure why)
    // show appear transition if it's not inline mode


    var transitionAppear = haveRendered || !baseProps.visible || !baseProps.mode === 'inline';
    baseProps.className = " " + baseProps.prefixCls + "-sub";
    var animProps = {};

    if (baseProps.openTransitionName) {
      animProps.transitionName = baseProps.openTransitionName;
    } else if (typeof baseProps.openAnimation === 'object') {
      animProps.animation = Object.assign({}, baseProps.openAnimation);

      if (!transitionAppear) {
        delete animProps.animation.appear;
      }
    }

    return _react.default.createElement(_rcAnimate.default, _extends({}, animProps, {
      showProp: "visible",
      component: "",
      transitionAppear: transitionAppear
    }), _react.default.createElement(_SubPopupMenu.default, _extends({}, baseProps, {
      id: this._menuId
    }), children));
  };

  _proto.render = function render() {
    var _classNames;

    var props = Object.assign({}, this.props);
    var isOpen = props.isOpen;
    var prefixCls = this.getPrefixCls();
    var isInlineMode = props.mode === 'inline';
    var className = (0, _classnames.default)(prefixCls, prefixCls + "-" + props.mode, (_classNames = {}, _classNames[props.className] = !!props.className, _classNames[this.getOpenClassName()] = isOpen, _classNames[this.getActiveClassName()] = props.active || isOpen && !isInlineMode, _classNames[this.getDisabledClassName()] = props.disabled, _classNames[this.getSelectedClassName()] = this.isChildrenSelected(), _classNames));

    if (!this._menuId) {
      if (props.eventKey) {
        this._menuId = props.eventKey + "$Menu";
      } else {
        this._menuId = "$__$" + ++guid + "$Menu";
      }
    }

    var mouseEvents = {};
    var titleClickEvents = {};
    var titleMouseEvents = {};

    if (!props.disabled) {
      mouseEvents = {
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter
      }; // only works in title, not outer li

      titleClickEvents = {
        onClick: this.onTitleClick
      };
      titleMouseEvents = {
        onMouseEnter: this.onTitleMouseEnter,
        onMouseLeave: this.onTitleMouseLeave
      };
    }

    var style = {};

    if (isInlineMode) {
      style.paddingLeft = props.inlineIndent * props.level;
    }

    var ariaOwns = {}; // only set aria-owns when menu is open
    // otherwise it would be an invalid aria-owns value
    // since corresponding node cannot be found

    if (this.props.isOpen) {
      ariaOwns = {
        'aria-owns': this._menuId
      };
    }

    var title = _react.default.createElement("div", _extends({
      ref: this.saveSubMenuTitle,
      style: style,
      className: prefixCls + "-title"
    }, titleMouseEvents, titleClickEvents, {
      "aria-expanded": isOpen
    }, ariaOwns, {
      "aria-haspopup": "true",
      title: typeof props.title === 'string' ? props.title : undefined
    }), props.title, _react.default.createElement("i", {
      className: prefixCls + "-arrow"
    }));

    var children = this.renderChildren(props.children);
    var getPopupContainer = props.parentMenu.isRootMenu ? props.parentMenu.props.getPopupContainer : function (triggerNode) {
      return triggerNode.parentNode;
    };
    var popupPlacement = popupPlacementMap[props.mode];
    var popupAlign = props.popupOffset ? {
      offset: props.popupOffset
    } : {};
    var popupClassName = props.mode === 'inline' ? '' : props.popupClassName;
    var disabled = props.disabled,
        triggerSubMenuAction = props.triggerSubMenuAction,
        subMenuOpenDelay = props.subMenuOpenDelay,
        forceSubMenuRender = props.forceSubMenuRender,
        subMenuCloseDelay = props.subMenuCloseDelay,
        builtinPlacements = props.builtinPlacements;

    _util.menuAllProps.forEach(function (key) {
      return delete props[key];
    }); // Set onClick to null, to ignore propagated onClick event


    delete props.onClick;
    return _react.default.createElement("li", _extends({}, props, mouseEvents, {
      className: className,
      role: "menuitem"
    }), isInlineMode && title, isInlineMode && children, !isInlineMode && _react.default.createElement(_rcTrigger.default, {
      prefixCls: prefixCls,
      popupClassName: prefixCls + "-popup " + popupClassName,
      getPopupContainer: getPopupContainer,
      builtinPlacements: Object.assign({}, _placements.default, builtinPlacements),
      popupPlacement: popupPlacement,
      popupVisible: isOpen,
      popupAlign: popupAlign,
      popup: children,
      action: disabled ? [] : [triggerSubMenuAction],
      mouseEnterDelay: subMenuOpenDelay,
      mouseLeaveDelay: subMenuCloseDelay,
      onPopupVisibleChange: this.onPopupVisibleChange,
      forceRender: forceSubMenuRender
    }, title));
  };

  return SubMenu;
}(_react.default.Component);

exports.SubMenu = SubMenu;

_defineProperty(SubMenu, "propTypes", {
  parentMenu: _propTypes.default.object,
  title: _propTypes.default.node,
  // children: PropTypes.any,
  children: _propTypes.default.node,
  selectedKeys: _propTypes.default.array,
  openKeys: _propTypes.default.array,
  onClick: _propTypes.default.func,
  onOpenChange: _propTypes.default.func,
  rootPrefixCls: _propTypes.default.string,
  eventKey: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  active: _propTypes.default.bool,
  // TODO: remove
  onItemHover: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  triggerSubMenuAction: _propTypes.default.string,
  onDeselect: _propTypes.default.func,
  onDestroy: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onTitleMouseEnter: _propTypes.default.func,
  onTitleMouseLeave: _propTypes.default.func,
  onTitleClick: _propTypes.default.func,
  popupOffset: _propTypes.default.array,
  isOpen: _propTypes.default.bool,
  store: _propTypes.default.object,
  mode: _propTypes.default.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  manualRef: _propTypes.default.func
});

_defineProperty(SubMenu, "defaultProps", {
  onMouseEnter: _util.noop,
  onMouseLeave: _util.noop,
  onTitleMouseEnter: _util.noop,
  onTitleMouseLeave: _util.noop,
  onTitleClick: _util.noop,
  manualRef: _util.noop,
  mode: 'vertical',
  title: ''
});

var connected = (0, _miniStore.connect)(function (_ref, _ref2) {
  var openKeys = _ref.openKeys,
      activeKey = _ref.activeKey,
      selectedKeys = _ref.selectedKeys;
  var eventKey = _ref2.eventKey,
      subMenuKey = _ref2.subMenuKey;
  return {
    isOpen: openKeys.indexOf(eventKey) > -1,
    active: activeKey[subMenuKey] === eventKey,
    selectedKeys: selectedKeys
  };
})(SubMenu);
connected.isSubMenu = true;
var _default = connected;
exports.default = _default;