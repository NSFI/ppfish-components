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
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import RcCheckbox from './src/Checkbox';
import { shallowEqual } from '../../utils';

var Checkbox =
/** @class */
function (_super) {
  __extends(Checkbox, _super);

  function Checkbox() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.saveCheckbox = function (node) {
      _this.rcCheckbox = node;
    };

    return _this;
  }

  Checkbox.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
  };

  Checkbox.prototype.focus = function () {
    this.rcCheckbox.focus();
  };

  Checkbox.prototype.blur = function () {
    this.rcCheckbox.blur();
  };

  Checkbox.prototype.render = function () {
    var _a, _b;

    var _c = this,
        props = _c.props,
        context = _c.context;

    var prefixCls = props.prefixCls,
        className = props.className,
        children = props.children,
        indeterminate = props.indeterminate,
        style = props.style,
        onMouseEnter = props.onMouseEnter,
        onMouseLeave = props.onMouseLeave,
        restProps = __rest(props, ["prefixCls", "className", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave"]);

    var checkboxGroup = context.checkboxGroup;

    var checkboxProps = __assign({}, restProps);

    if (checkboxGroup) {
      checkboxProps.onChange = function () {
        return checkboxGroup.toggleOption({
          label: children,
          value: props.value
        });
      };

      checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
    }

    var classString = classNames(className, (_a = {}, _a[prefixCls + "-wrapper"] = true, _a));
    var checkboxClass = classNames((_b = {}, _b[prefixCls + "-indeterminate"] = indeterminate, _b));
    return React.createElement("label", {
      className: classString,
      style: style,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, React.createElement(RcCheckbox, __assign({}, checkboxProps, {
      prefixCls: prefixCls,
      className: checkboxClass,
      ref: this.saveCheckbox
    })), children !== undefined ? React.createElement("span", null, children) : null);
  };

  Checkbox.defaultProps = {
    prefixCls: 'fishd-checkbox',
    indeterminate: false
  };
  Checkbox.contextTypes = {
    checkboxGroup: PropTypes.any
  };
  return Checkbox;
}(React.Component);

export default Checkbox;