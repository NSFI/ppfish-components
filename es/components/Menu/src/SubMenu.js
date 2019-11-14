function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import { KeyCode } from '../../../utils';
import classNames from 'classnames';
import { connect } from 'mini-store';
import SubPopupMenu from './SubPopupMenu';
import placements from './placements';
import Animate from 'rc-animate';
import { noop, loopMenuItemRecursively, getMenuIdFromSubMenuEventKey, menuAllProps } from './util';
var guid = 0;
var popupPlacementMap = {
  horizontal: 'bottomLeft',
  vertical: 'rightTop',
  'vertical-left': 'rightTop',
  'vertical-right': 'leftTop'
};

var updateDefaultActiveFirst = function updateDefaultActiveFirst(store, eventKey, defaultActiveFirst) {
  var menuId = getMenuIdFromSubMenuEventKey(eventKey);
  var state = store.getState();
  store.setState({
    defaultActiveFirst: _objectSpread({}, state.defaultActiveFirst, _defineProperty({}, menuId, defaultActiveFirst))
  });
};

export var SubMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SubMenu, _React$Component);

  function SubMenu(_props) {
    var _this;

    _classCallCheck(this, SubMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SubMenu).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onDestroy", function (key) {
      _this.props.onDestroy(key);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var keyCode = e.keyCode;
      var menu = _this.menuInstance;
      var _this$props = _this.props,
          isOpen = _this$props.isOpen,
          store = _this$props.store;

      if (keyCode === KeyCode.ENTER) {
        _this.onTitleClick(e);

        updateDefaultActiveFirst(store, _this.props.eventKey, true);
        return true;
      }

      if (keyCode === KeyCode.RIGHT) {
        if (isOpen) {
          menu.onKeyDown(e);
        } else {
          _this.triggerOpenChange(true); // need to update current menu's defaultActiveFirst value


          updateDefaultActiveFirst(store, _this.props.eventKey, true);
        }

        return true;
      }

      if (keyCode === KeyCode.LEFT) {
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

      if (isOpen && (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN)) {
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
      return "".concat(_this.props.rootPrefixCls, "-submenu");
    });

    _defineProperty(_assertThisInitialized(_this), "getActiveClassName", function () {
      return "".concat(_this.getPrefixCls(), "-active");
    });

    _defineProperty(_assertThisInitialized(_this), "getDisabledClassName", function () {
      return "".concat(_this.getPrefixCls(), "-disabled");
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedClassName", function () {
      return "".concat(_this.getPrefixCls(), "-selected");
    });

    _defineProperty(_assertThisInitialized(_this), "getOpenClassName", function () {
      return "".concat(_this.props.rootPrefixCls, "-submenu-open");
    });

    _defineProperty(_assertThisInitialized(_this), "saveMenuInstance", function (c) {
      // children menu instance
      _this.menuInstance = c;
    });

    _defineProperty(_assertThisInitialized(_this), "addKeyPath", function (info) {
      return _objectSpread({}, info, {
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
      loopMenuItemRecursively(_this.props.children, _this.props.selectedKeys, ret);
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

      var popupMenu = ReactDOM.findDOMNode(_this.menuInstance);

      if (popupMenu.offsetWidth >= _this.subMenuTitle.offsetWidth) {
        return;
      }
      /* istanbul ignore next */


      popupMenu.style.minWidth = "".concat(_this.subMenuTitle.offsetWidth, "px");
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

  _createClass(SubMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
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
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
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
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(children) {
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
        eventKey: "".concat(props.eventKey, "-menu-"),
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
        defaultActiveFirst: props.store.getState().defaultActiveFirst[getMenuIdFromSubMenuEventKey(props.eventKey)],
        multiple: props.multiple,
        prefixCls: props.rootPrefixCls,
        id: this._menuId,
        manualRef: this.saveMenuInstance
      };
      var haveRendered = this.haveRendered;
      this.haveRendered = true;
      this.haveOpened = this.haveOpened || baseProps.visible || baseProps.forceSubMenuRender; // never rendered not planning to, don't render

      if (!this.haveOpened) {
        return React.createElement("div", null);
      } // don't show transition on first rendering (no animation for opened menu)
      // show appear transition if it's not visible (not sure why)
      // show appear transition if it's not inline mode


      var transitionAppear = haveRendered || !baseProps.visible || !baseProps.mode === 'inline';
      baseProps.className = " ".concat(baseProps.prefixCls, "-sub");
      var animProps = {};

      if (baseProps.openTransitionName) {
        animProps.transitionName = baseProps.openTransitionName;
      } else if (_typeof(baseProps.openAnimation) === 'object') {
        animProps.animation = _objectSpread({}, baseProps.openAnimation);

        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }

      return React.createElement(Animate, _extends({}, animProps, {
        showProp: "visible",
        component: "",
        transitionAppear: transitionAppear
      }), React.createElement(SubPopupMenu, _extends({}, baseProps, {
        id: this._menuId
      }), children));
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var props = _objectSpread({}, this.props);

      var isOpen = props.isOpen;
      var prefixCls = this.getPrefixCls();
      var isInlineMode = props.mode === 'inline';
      var className = classNames(prefixCls, "".concat(prefixCls, "-").concat(props.mode), (_classNames = {}, _defineProperty(_classNames, props.className, !!props.className), _defineProperty(_classNames, this.getOpenClassName(), isOpen), _defineProperty(_classNames, this.getActiveClassName(), props.active || isOpen && !isInlineMode), _defineProperty(_classNames, this.getDisabledClassName(), props.disabled), _defineProperty(_classNames, this.getSelectedClassName(), this.isChildrenSelected()), _classNames));

      if (!this._menuId) {
        if (props.eventKey) {
          this._menuId = "".concat(props.eventKey, "$Menu");
        } else {
          this._menuId = "$__$".concat(++guid, "$Menu");
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

      var title = React.createElement("div", _extends({
        ref: this.saveSubMenuTitle,
        style: style,
        className: "".concat(prefixCls, "-title")
      }, titleMouseEvents, titleClickEvents, {
        "aria-expanded": isOpen
      }, ariaOwns, {
        "aria-haspopup": "true",
        title: typeof props.title === 'string' ? props.title : undefined
      }), props.title, React.createElement("i", {
        className: "".concat(prefixCls, "-arrow")
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
      menuAllProps.forEach(function (key) {
        return delete props[key];
      }); // Set onClick to null, to ignore propagated onClick event

      delete props.onClick;
      return React.createElement("li", _extends({}, props, mouseEvents, {
        className: className,
        role: "menuitem"
      }), isInlineMode && title, isInlineMode && children, !isInlineMode && React.createElement(Trigger, {
        prefixCls: prefixCls,
        popupClassName: "".concat(prefixCls, "-popup ").concat(popupClassName),
        getPopupContainer: getPopupContainer,
        builtinPlacements: Object.assign({}, placements, builtinPlacements),
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
    }
  }]);

  return SubMenu;
}(React.Component);

_defineProperty(SubMenu, "propTypes", {
  parentMenu: PropTypes.object,
  title: PropTypes.node,
  // children: PropTypes.any,
  children: PropTypes.node,
  selectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  onClick: PropTypes.func,
  onOpenChange: PropTypes.func,
  rootPrefixCls: PropTypes.string,
  eventKey: PropTypes.string,
  multiple: PropTypes.bool,
  active: PropTypes.bool,
  // TODO: remove
  onItemHover: PropTypes.func,
  onSelect: PropTypes.func,
  triggerSubMenuAction: PropTypes.string,
  onDeselect: PropTypes.func,
  onDestroy: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTitleMouseEnter: PropTypes.func,
  onTitleMouseLeave: PropTypes.func,
  onTitleClick: PropTypes.func,
  popupOffset: PropTypes.array,
  isOpen: PropTypes.bool,
  store: PropTypes.object,
  mode: PropTypes.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  manualRef: PropTypes.func
});

_defineProperty(SubMenu, "defaultProps", {
  onMouseEnter: noop,
  onMouseLeave: noop,
  onTitleMouseEnter: noop,
  onTitleMouseLeave: noop,
  onTitleClick: noop,
  manualRef: noop,
  mode: 'vertical',
  title: ''
});

var connected = connect(function (_ref, _ref2) {
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
export default connected;