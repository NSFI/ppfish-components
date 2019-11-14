function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { Provider, create } from 'mini-store';
import { default as SubPopupMenu, getActiveKey } from './SubPopupMenu';
import { noop } from './util';

var Menu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(_props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this, _props));

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

        props.onSelect(_objectSpread({}, selectInfo, {
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

        props.onDeselect(_objectSpread({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getOpenTransitionName", function () {
      var props = _this.props;
      var transitionName = props.openTransitionName;
      var animationName = props.openAnimation;

      if (!transitionName && typeof animationName === 'string') {
        transitionName = "".concat(props.prefixCls, "-open-").concat(animationName);
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

    _this.store = create({
      selectedKeys: _selectedKeys,
      openKeys: _openKeys,
      activeKey: {
        '0-menu-': getActiveKey(_props, _props.activeKey)
      }
    });
    return _this;
  }

  _createClass(Menu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMiniStore();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateMiniStore();
    }
  }, {
    key: "updateMiniStore",
    value: function updateMiniStore() {
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = _extends({}, this.props);

      props.className += " ".concat(props.prefixCls, "-root");
      props = _objectSpread({}, props, {
        onClick: this.onClick,
        onOpenChange: this.onOpenChange,
        onDeselect: this.onDeselect,
        onSelect: this.onSelect,
        openTransitionName: this.getOpenTransitionName(),
        parentMenu: this
      });
      return React.createElement(Provider, {
        store: this.store
      }, React.createElement(SubPopupMenu, _extends({}, props, {
        ref: function ref(c) {
          return _this2.innerMenu = c;
        }
      }), this.props.children));
    }
  }]);

  return Menu;
}(React.Component);

_defineProperty(Menu, "propTypes", {
  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
  defaultActiveFirst: PropTypes.bool,
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
  openKeys: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  getPopupContainer: PropTypes.func,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  onDestroy: PropTypes.func,
  openTransitionName: PropTypes.string,
  openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subMenuOpenDelay: PropTypes.number,
  subMenuCloseDelay: PropTypes.number,
  forceSubMenuRender: PropTypes.bool,
  triggerSubMenuAction: PropTypes.string,
  level: PropTypes.number,
  selectable: PropTypes.bool,
  multiple: PropTypes.bool,
  // children: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  activeKey: PropTypes.string,
  prefixCls: PropTypes.string,
  builtinPlacements: PropTypes.object
});

_defineProperty(Menu, "defaultProps", {
  selectable: true,
  onClick: noop,
  onSelect: noop,
  onOpenChange: noop,
  onDeselect: noop,
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

export default Menu;