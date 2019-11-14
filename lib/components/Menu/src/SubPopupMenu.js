"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveKey = getActiveKey;
exports.saveRef = saveRef;
exports["default"] = exports.SubPopupMenu = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _utils = require("../../../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

var _DOMWrap = _interopRequireDefault(require("./DOMWrap"));

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function allDisabled(arr) {
  if (!arr.length) {
    return true;
  }

  return arr.every(function (c) {
    return !!c.props.disabled;
  });
}

function updateActiveKey(store, menuId, activeKey) {
  var state = store.getState();
  store.setState({
    activeKey: _objectSpread({}, state.activeKey, _defineProperty({}, menuId, activeKey))
  });
}

function getEventKey(props) {
  // when eventKey not available ,it's menu and return menu id '0-menu-'
  return props.eventKey || '0-menu-';
}

function getActiveKey(props, originalActiveKey) {
  var activeKey = originalActiveKey;
  var children = props.children,
      eventKey = props.eventKey;

  if (activeKey) {
    var found;
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (c && !c.props.disabled && activeKey === (0, _util.getKeyFromChildrenIndex)(c, eventKey, i)) {
        found = true;
      }
    });

    if (found) {
      return activeKey;
    }
  }

  activeKey = null;

  if (props.defaultActiveFirst) {
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (!activeKey && c && !c.props.disabled) {
        activeKey = (0, _util.getKeyFromChildrenIndex)(c, eventKey, i);
      }
    });
    return activeKey;
  }

  return activeKey;
}

function saveRef(c) {
  if (c) {
    var index = this.instanceArray.indexOf(c);

    if (index !== -1) {
      // update component if it's already inside instanceArray
      this.instanceArray[index] = c;
    } else {
      // add component if it's not in instanceArray yet;
      this.instanceArray.push(c);
    }
  }
}

var SubPopupMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SubPopupMenu, _React$Component);

  function SubPopupMenu(_props) {
    var _this;

    _classCallCheck(this, SubPopupMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SubPopupMenu).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e, callback) {
      var keyCode = e.keyCode;
      var handled;

      _this.getFlatInstanceArray().forEach(function (obj) {
        if (obj && obj.props.active && obj.onKeyDown) {
          handled = obj.onKeyDown(e);
        }
      });

      if (handled) {
        return 1;
      }

      var activeItem = null;

      if (keyCode === _utils.KeyCode.UP || keyCode === _utils.KeyCode.DOWN) {
        activeItem = _this.step(keyCode === _utils.KeyCode.UP ? -1 : 1);
      }

      if (activeItem) {
        e.preventDefault();
        updateActiveKey(_this.props.store, getEventKey(_this.props), activeItem.props.eventKey);

        if (typeof callback === 'function') {
          callback(activeItem);
        }

        return 1;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onItemHover", function (e) {
      var key = e.key,
          hover = e.hover;
      updateActiveKey(_this.props.store, getEventKey(_this.props), hover ? key : null);
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselect", function (selectInfo) {
      _this.props.onDeselect(selectInfo);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (selectInfo) {
      _this.props.onSelect(selectInfo);
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      _this.props.onClick(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onOpenChange", function (e) {
      _this.props.onOpenChange(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onDestroy", function (key) {
      /* istanbul ignore next */
      _this.props.onDestroy(key);
    });

    _defineProperty(_assertThisInitialized(_this), "getFlatInstanceArray", function () {
      return _this.instanceArray;
    });

    _defineProperty(_assertThisInitialized(_this), "getOpenTransitionName", function () {
      return _this.props.openTransitionName;
    });

    _defineProperty(_assertThisInitialized(_this), "step", function (direction) {
      var children = _this.getFlatInstanceArray();

      var activeKey = _this.props.store.getState().activeKey[getEventKey(_this.props)];

      var len = children.length;

      if (!len) {
        return null;
      }

      if (direction < 0) {
        children = children.concat().reverse();
      } // find current activeIndex


      var activeIndex = -1;
      children.every(function (c, ci) {
        if (c && c.props.eventKey === activeKey) {
          activeIndex = ci;
          return false;
        }

        return true;
      });

      if (!_this.props.defaultActiveFirst && activeIndex !== -1 && allDisabled(children.slice(activeIndex, len - 1))) {
        return undefined;
      }

      var start = (activeIndex + 1) % len;
      var i = start;

      do {
        var child = children[i];

        if (!child || child.props.disabled) {
          i = (i + 1) % len;
        } else {
          return child;
        }
      } while (i !== start);

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderCommonMenuItem", function (child, i, extraProps) {
      var state = _this.props.store.getState();

      var props = _this.props;
      var key = (0, _util.getKeyFromChildrenIndex)(child, props.eventKey, i);
      var childProps = child.props;
      var isActive = key === state.activeKey;

      var newChildProps = _objectSpread({
        mode: props.mode,
        level: props.level,
        inlineIndent: props.inlineIndent,
        renderMenuItem: _this.renderMenuItem,
        rootPrefixCls: props.prefixCls,
        index: i,
        parentMenu: props.parentMenu,
        // customized ref function, need to be invoked manually in child's componentDidMount
        manualRef: childProps.disabled ? undefined : (0, _utils.createChainedFunction)(child.ref, saveRef.bind(_assertThisInitialized(_this))),
        eventKey: key,
        active: !childProps.disabled && isActive,
        multiple: props.multiple,
        onClick: function onClick(e) {
          (childProps.onClick || _util.noop)(e);

          _this.onClick(e);
        },
        onItemHover: _this.onItemHover,
        openTransitionName: _this.getOpenTransitionName(),
        openAnimation: props.openAnimation,
        subMenuOpenDelay: props.subMenuOpenDelay,
        subMenuCloseDelay: props.subMenuCloseDelay,
        forceSubMenuRender: props.forceSubMenuRender,
        onOpenChange: _this.onOpenChange,
        onDeselect: _this.onDeselect,
        onSelect: _this.onSelect,
        builtinPlacements: props.builtinPlacements
      }, extraProps);

      if (props.mode === 'inline') {
        newChildProps.triggerSubMenuAction = 'click';
      }

      return _react["default"].cloneElement(child, newChildProps);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMenuItem", function (c, i, subMenuKey) {
      /* istanbul ignore if */
      if (!c) {
        return null;
      }

      var state = _this.props.store.getState();

      var extraProps = {
        openKeys: state.openKeys,
        selectedKeys: state.selectedKeys,
        triggerSubMenuAction: _this.props.triggerSubMenuAction,
        subMenuKey: subMenuKey
      };
      return _this.renderCommonMenuItem(c, i, extraProps);
    });

    _props.store.setState({
      activeKey: _objectSpread({}, _props.store.getState().activeKey, _defineProperty({}, _props.eventKey, getActiveKey(_props, _props.activeKey)))
    });

    _this.instanceArray = [];
    return _this;
  }

  _createClass(SubPopupMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // invoke customized ref to expose component to mixin
      if (this.props.manualRef) {
        this.props.manualRef(this);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.visible || nextProps.visible;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var props = this.props;
      var originalActiveKey = 'activeKey' in props ? props.activeKey : props.store.getState().activeKey[getEventKey(props)];
      var activeKey = getActiveKey(props, originalActiveKey);

      if (activeKey !== originalActiveKey) {
        updateActiveKey(props.store, getEventKey(props), activeKey);
      }
    } // all keyboard events callbacks run from here at first

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = _extends({}, this.props);

      this.instanceArray = [];
      var className = (0, _classnames["default"])(props.prefixCls, props.className, "".concat(props.prefixCls, "-").concat(props.mode));
      var domProps = {
        className: className,
        // role could be 'select' and by default set to menu
        role: props.role || 'menu'
      };

      if (props.id) {
        domProps.id = props.id;
      }

      if (props.focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.onKeyDown;
      }

      var prefixCls = props.prefixCls,
          eventKey = props.eventKey,
          visible = props.visible;

      _util.menuAllProps.forEach(function (key) {
        return delete props[key];
      }); // Otherwise, the propagated click event will trigger another onClick


      delete props.onClick;
      return (// ESLint is not smart enough to know that the type of `children` was checked.

        /* eslint-disable */
        _react["default"].createElement(_DOMWrap["default"], _extends({}, props, {
          tag: "ul",
          hiddenClassName: "".concat(prefixCls, "-hidden"),
          visible: visible
        }, domProps), _react["default"].Children.map(props.children, function (c, i) {
          return _this2.renderMenuItem(c, i, eventKey || '0-menu-');
        }))
        /*eslint-enable */

      );
    }
  }]);

  return SubPopupMenu;
}(_react["default"].Component);

exports.SubPopupMenu = SubPopupMenu;

_defineProperty(SubPopupMenu, "propTypes", {
  onSelect: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onDeselect: _propTypes["default"].func,
  onOpenChange: _propTypes["default"].func,
  onDestroy: _propTypes["default"].func,
  openTransitionName: _propTypes["default"].string,
  openAnimation: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  openKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  visible: _propTypes["default"].bool,
  // children: PropTypes.any,
  children: _propTypes["default"].node,
  parentMenu: _propTypes["default"].object,
  eventKey: _propTypes["default"].string,
  store: _propTypes["default"].shape({
    getState: _propTypes["default"].func,
    setState: _propTypes["default"].func
  }),
  // adding in refactor
  focusable: _propTypes["default"].bool,
  multiple: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  defaultActiveFirst: _propTypes["default"].bool,
  activeKey: _propTypes["default"].string,
  selectedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  defaultSelectedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  defaultOpenKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  level: _propTypes["default"].number,
  mode: _propTypes["default"].oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  triggerSubMenuAction: _propTypes["default"].oneOf(['click', 'hover']),
  inlineIndent: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  manualRef: _propTypes["default"].func
});

_defineProperty(SubPopupMenu, "defaultProps", {
  prefixCls: 'rc-menu',
  className: '',
  mode: 'vertical',
  level: 1,
  inlineIndent: 24,
  visible: true,
  focusable: true,
  style: {},
  manualRef: _util.noop
});

var _default = (0, _miniStore.connect)()(SubPopupMenu);

exports["default"] = _default;