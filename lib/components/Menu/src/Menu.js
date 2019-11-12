"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _SubPopupMenu = _interopRequireWildcard(require("./SubPopupMenu"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Menu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Menu, _React$Component);

  function Menu(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (selectInfo) {
      var props = _this.props;

      if (props.selectable) {
        // root menu
        var selectedKeys = _this.store.getState().selectedKeys;

        var selectedKey = selectInfo.key;

        if (props.multiple) {
          selectedKeys = selectedKeys.concat([selectedKey]);
        } else {
          selectedKeys = [selectedKey];
        }

        if (!('selectedKeys' in props)) {
          _this.store.setState({
            selectedKeys: selectedKeys
          });
        }

        props.onSelect(Object.assign({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      _this.props.onClick(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e, callback) {
      _this.innerMenu.getWrappedInstance().onKeyDown(e, callback);
    });

    _defineProperty(_assertThisInitialized(_this), "onOpenChange", function (event) {
      var props = _this.props;

      var openKeys = _this.store.getState().openKeys.concat();

      var changed = false;

      var processSingle = function processSingle(e) {
        var oneChanged = false;

        if (e.open) {
          oneChanged = openKeys.indexOf(e.key) === -1;

          if (oneChanged) {
            openKeys.push(e.key);
          }
        } else {
          var index = openKeys.indexOf(e.key);
          oneChanged = index !== -1;

          if (oneChanged) {
            openKeys.splice(index, 1);
          }
        }

        changed = changed || oneChanged;
      };

      if (Array.isArray(event)) {
        // batch change call
        event.forEach(processSingle);
      } else {
        processSingle(event);
      }

      if (changed) {
        if (!('openKeys' in _this.props)) {
          _this.store.setState({
            openKeys: openKeys
          });
        }

        props.onOpenChange(openKeys);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselect", function (selectInfo) {
      var props = _this.props;

      if (props.selectable) {
        var selectedKeys = _this.store.getState().selectedKeys.concat();

        var selectedKey = selectInfo.key;
        var index = selectedKeys.indexOf(selectedKey);

        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }

        if (!('selectedKeys' in props)) {
          _this.store.setState({
            selectedKeys: selectedKeys
          });
        }

        props.onDeselect(Object.assign({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getOpenTransitionName", function () {
      var props = _this.props;
      var transitionName = props.openTransitionName;
      var animationName = props.openAnimation;

      if (!transitionName && typeof animationName === 'string') {
        transitionName = props.prefixCls + "-open-" + animationName;
      }

      return transitionName;
    });

    _this.isRootMenu = true;
    var _selectedKeys = _props.defaultSelectedKeys;
    var _openKeys = _props.defaultOpenKeys;

    if ('selectedKeys' in _props) {
      _selectedKeys = _props.selectedKeys || [];
    }

    if ('openKeys' in _props) {
      _openKeys = _props.openKeys || [];
    }

    _this.store = (0, _miniStore.create)({
      selectedKeys: _selectedKeys,
      openKeys: _openKeys,
      activeKey: {
        '0-menu-': (0, _SubPopupMenu.getActiveKey)(_props, _props.activeKey)
      }
    });
    return _this;
  }

  var _proto = Menu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateMiniStore();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateMiniStore();
  };

  _proto.updateMiniStore = function updateMiniStore() {
    if ('selectedKeys' in this.props) {
      this.store.setState({
        selectedKeys: this.props.selectedKeys || []
      });
    }

    if ('openKeys' in this.props) {
      this.store.setState({
        openKeys: this.props.openKeys || []
      });
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var props = Object.assign({}, this.props);
    props.className += " " + props.prefixCls + "-root";
    props = Object.assign({}, props, {
      onClick: this.onClick,
      onOpenChange: this.onOpenChange,
      onDeselect: this.onDeselect,
      onSelect: this.onSelect,
      openTransitionName: this.getOpenTransitionName(),
      parentMenu: this
    });
    return _react.default.createElement(_miniStore.Provider, {
      store: this.store
    }, _react.default.createElement(_SubPopupMenu.default, _extends({}, props, {
      ref: function ref(c) {
        return _this2.innerMenu = c;
      }
    }), this.props.children));
  };

  return Menu;
}(_react.default.Component);

_defineProperty(Menu, "propTypes", {
  defaultSelectedKeys: _propTypes.default.arrayOf(_propTypes.default.string),
  defaultActiveFirst: _propTypes.default.bool,
  selectedKeys: _propTypes.default.arrayOf(_propTypes.default.string),
  defaultOpenKeys: _propTypes.default.arrayOf(_propTypes.default.string),
  openKeys: _propTypes.default.arrayOf(_propTypes.default.string),
  mode: _propTypes.default.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  getPopupContainer: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onDeselect: _propTypes.default.func,
  onDestroy: _propTypes.default.func,
  openTransitionName: _propTypes.default.string,
  openAnimation: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  subMenuOpenDelay: _propTypes.default.number,
  subMenuCloseDelay: _propTypes.default.number,
  forceSubMenuRender: _propTypes.default.bool,
  triggerSubMenuAction: _propTypes.default.string,
  level: _propTypes.default.number,
  selectable: _propTypes.default.bool,
  multiple: _propTypes.default.bool,
  // children: PropTypes.any,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  activeKey: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  builtinPlacements: _propTypes.default.object
});

_defineProperty(Menu, "defaultProps", {
  selectable: true,
  onClick: _util.noop,
  onSelect: _util.noop,
  onOpenChange: _util.noop,
  onDeselect: _util.noop,
  defaultSelectedKeys: [],
  defaultOpenKeys: [],
  subMenuOpenDelay: 0.1,
  subMenuCloseDelay: 0.1,
  triggerSubMenuAction: 'hover',
  prefixCls: 'rc-menu',
  className: '',
  mode: 'vertical',
  style: {},
  builtinPlacements: {}
});

var _default = Menu;
exports.default = _default;