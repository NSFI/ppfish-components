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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createDOMForm from './RcForm/createDOMForm';
import createFormField from './RcForm/createFormField';
import omit from 'omit.js';
import FormItem from './FormItem';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import './style/index.less';

var Form =
/** @class */
function (_super) {
  __extends(Form, _super);

  function Form(props) {
    return _super.call(this, props) || this;
  }

  Form.prototype.getChildContext = function () {
    var layout = this.props.layout;
    return {
      vertical: layout === 'vertical'
    };
  };

  Form.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        hideRequiredMark = _b.hideRequiredMark,
        _c = _b.className,
        className = _c === void 0 ? '' : _c,
        layout = _b.layout;
    var formClassName = classNames(prefixCls, (_a = {}, _a[prefixCls + "-horizontal"] = layout === 'horizontal', _a[prefixCls + "-vertical"] = layout === 'vertical', _a[prefixCls + "-inline"] = layout === 'inline', _a[prefixCls + "-hide-required-mark"] = hideRequiredMark, _a), className);
    var formProps = omit(this.props, ['prefixCls', 'className', 'layout', 'form', 'hideRequiredMark']);
    return React.createElement("form", __assign({}, formProps, {
      className: formClassName
    }));
  };

  Form.defaultProps = {
    prefixCls: 'fishd-form',
    layout: 'horizontal',
    hideRequiredMark: false,
    onSubmit: function onSubmit(e) {
      e.preventDefault();
    }
  };
  Form.propTypes = {
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    hideRequiredMark: PropTypes.bool
  };
  Form.childContextTypes = {
    vertical: PropTypes.bool
  };
  Form.Item = FormItem;
  Form.createFormField = createFormField;

  Form.create = function (options) {
    if (options === void 0) {
      options = {};
    }

    return createDOMForm(__assign(__assign({
      fieldNameProp: 'id'
    }, options), {
      fieldMetaProp: FIELD_META_PROP,
      fieldDataProp: FIELD_DATA_PROP
    }));
  };

  return Form;
}(React.Component);

export default Form;