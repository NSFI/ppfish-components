var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import RcMenu, { Divider, ItemGroup } from './src';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import { polyfill } from 'react-lifecycles-compat';
import animation from '../../utils/openAnimation';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import './style/index.less';

var Menu =
/** @class */
function (_super) {
  __extends(Menu, _super);

  function Menu(props, context) {
    var _this = _super.call(this, props) || this;

    _this.inlineOpenKeys = [];

    _this.handleClick = function (e) {
      _this.handleOpenChange([]);

      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e);
      }
    };

    _this.handleOpenChange = function (openKeys) {
      _this.setOpenKeys(openKeys);

      var onOpenChange = _this.props.onOpenChange;

      if (onOpenChange) {
        onOpenChange(openKeys);
      }
    };

    warning(!('onOpen' in props || 'onClose' in props), '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' + 'see: https://u.ant.design/menu-on-open-change.');
    warning(!('inlineCollapsed' in props && props.mode !== 'inline'), '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.');
    _this.switchModeFromInline = true;
    var openKeys;

    if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    } else if ('openKeys' in props) {
      openKeys = props.openKeys;
    }

    _this.state = {
      openKeys: openKeys || []
    };
    return _this;
  }

  Menu.getDerivedStateFromProps = function (nextProps, prevState) {
    var newState = {};

    if ('openKeys' in nextProps) {
      newState['openKeys'] = nextProps.openKeys;
    }

    return newState;
  };

  Menu.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
    if ('openKeys' in this.props) return;
    var newState = {};

    if (prevProps.mode === 'inline' && this.props.mode !== 'inline') {
      this.switchModeFromInline = true;
    }

    if (this.props.inlineCollapsed && !prevProps.inlineCollapsed || this.context.siderCollapsed && !this.siderCollapsed) {
      var menuNode = findDOMNode(this);
      this.switchModeFromInline = !!prevState.openKeys.length && !!menuNode.querySelectorAll("." + this.props.prefixCls + "-submenu-open").length;
      this.inlineOpenKeys = this.state.openKeys;
      newState['openKeys'] = [];
      this.siderCollapsed = this.context.siderCollapsed;
      this.setState(newState);
    } else if (!this.props.inlineCollapsed && prevProps.inlineCollapsed || !this.context.siderCollapsed && this.siderCollapsed) {
      newState['openKeys'] = this.inlineOpenKeys;
      this.siderCollapsed = this.context.siderCollapsed;
      this.inlineOpenKeys = [];
      this.setState(newState);
    }
  };

  Menu.prototype.getChildContext = function () {
    return {
      inlineCollapsed: this.getInlineCollapsed(),
      menuTheme: this.props.theme
    };
  };

  Menu.prototype.setOpenKeys = function (openKeys) {
    if (!('openKeys' in this.props)) {
      this.setState({
        openKeys: openKeys
      });
    }
  };

  Menu.prototype.getRealMenuMode = function () {
    var inlineCollapsed = this.getInlineCollapsed();

    if (this.switchModeFromInline && inlineCollapsed) {
      return 'inline';
    }

    var mode = this.props.mode;
    return inlineCollapsed ? 'vertical' : mode;
  };

  Menu.prototype.getInlineCollapsed = function () {
    var inlineCollapsed = this.props.inlineCollapsed;

    if (this.context.siderCollapsed !== undefined) {
      return this.context.siderCollapsed;
    }

    return inlineCollapsed;
  };

  Menu.prototype.getMenuOpenAnimation = function (menuMode) {
    var _this = this;

    var _a = this.props,
        openAnimation = _a.openAnimation,
        openTransitionName = _a.openTransitionName;
    var menuOpenAnimation = openAnimation || openTransitionName;

    if (openAnimation === undefined && openTransitionName === undefined) {
      switch (menuMode) {
        case 'horizontal':
          menuOpenAnimation = 'slide-up';
          break;

        case 'vertical':
        case 'vertical-left':
        case 'vertical-right':
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchModeFromInline) {
            menuOpenAnimation = '';
            this.switchModeFromInline = false;
          } else {
            menuOpenAnimation = 'zoom-big';
          }

          break;

        case 'inline':
          menuOpenAnimation = __assign(__assign({}, animation), {
            leave: function leave(node, done) {
              return animation.leave(node, function () {
                // Make sure inline menu leave animation finished before mode is switched
                _this.switchModeFromInline = false;

                _this.setState({}); // when inlineCollapsed change false to true, all submenu will be unmounted,
                // so that we don't need handle animation leaving.


                if (_this.getRealMenuMode() === 'vertical') {
                  return;
                }

                done();
              });
            }
          });
          break;

        default:
      }
    }

    return menuOpenAnimation;
  };

  Menu.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        className = _b.className,
        theme = _b.theme;
    var menuMode = this.getRealMenuMode();
    var menuOpenAnimation = this.getMenuOpenAnimation(menuMode);
    var menuClassName = classNames(className, prefixCls + "-" + theme, (_a = {}, _a[prefixCls + "-inline-collapsed"] = this.getInlineCollapsed(), _a));
    var menuProps = {
      openKeys: this.state.openKeys,
      onOpenChange: this.handleOpenChange,
      className: menuClassName,
      mode: menuMode
    };

    if (menuMode !== 'inline') {
      // closing vertical popup submenu after click it
      menuProps.onClick = this.handleClick;
      menuProps.openTransitionName = menuOpenAnimation;
    } else {
      menuProps.openAnimation = menuOpenAnimation;
    } // https://github.com/ant-design/ant-design/issues/8587


    var collapsedWidth = this.context.collapsedWidth;

    if (this.getInlineCollapsed() && (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px')) {
      return null;
    }

    return React.createElement(RcMenu, __assign({}, this.props, menuProps));
  };

  Menu.Divider = Divider;
  Menu.Item = Item;
  Menu.SubMenu = SubMenu;
  Menu.ItemGroup = ItemGroup;
  Menu.defaultProps = {
    prefixCls: 'fishd-menu',
    className: '',
    theme: 'light',
    focusable: false
  };
  Menu.childContextTypes = {
    inlineCollapsed: PropTypes.bool,
    menuTheme: PropTypes.string
  };
  Menu.contextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };
  return Menu;
}(React.Component);

polyfill(Menu);
export default Menu;