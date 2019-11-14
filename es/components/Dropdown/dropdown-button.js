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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import Button from '../Button';
import Dropdown from './dropdown';
import classNames from 'classnames';
var ButtonGroup = Button.Group;

var DropdownButton =
/** @class */
function (_super) {
  __extends(DropdownButton, _super);

  function DropdownButton() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  DropdownButton.prototype.render = function () {
    var _a = this.props,
        type = _a.type,
        disabled = _a.disabled,
        onClick = _a.onClick,
        children = _a.children,
        prefixCls = _a.prefixCls,
        className = _a.className,
        overlay = _a.overlay,
        trigger = _a.trigger,
        align = _a.align,
        visible = _a.visible,
        onVisibleChange = _a.onVisibleChange,
        placement = _a.placement,
        getPopupContainer = _a.getPopupContainer,
        restProps = __rest(_a, ["type", "disabled", "onClick", "children", "prefixCls", "className", "overlay", "trigger", "align", "visible", "onVisibleChange", "placement", "getPopupContainer"]);

    var dropdownProps = {
      align: align,
      overlay: overlay,
      disabled: disabled,
      trigger: disabled ? [] : trigger,
      onVisibleChange: onVisibleChange,
      placement: placement,
      getPopupContainer: getPopupContainer
    };

    if ('visible' in this.props) {
      dropdownProps.visible = visible;
    }

    return React.createElement(ButtonGroup, __assign({}, restProps, {
      className: classNames(prefixCls, className)
    }), React.createElement(Button, {
      type: type,
      disabled: disabled,
      onClick: onClick
    }, children), React.createElement(Dropdown, __assign({}, dropdownProps), React.createElement(Button, {
      type: type,
      icon: "more-point"
    })));
  };

  DropdownButton.defaultProps = {
    placement: 'bottomRight',
    type: 'default',
    prefixCls: 'fishd-dropdown-button'
  };
  return DropdownButton;
}(React.Component);

export default DropdownButton;