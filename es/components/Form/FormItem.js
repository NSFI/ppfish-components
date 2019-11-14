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
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import intersperse from 'intersperse';
import Animate from 'rc-animate';
import { Row, Col } from '../Grid';
import warning from '../../utils/warning';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';

var FormItem =
/** @class */
function (_super) {
  __extends(FormItem, _super);

  function FormItem() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.helpShow = false;

    _this.onHelpAnimEnd = function (_key, helpShow) {
      _this.helpShow = helpShow;

      if (!helpShow) {
        _this.setState({});
      }
    }; // Resolve duplicated ids bug between different forms
    // https://github.com/ant-design/ant-design/issues/7351


    _this.onLabelClick = function (e) {
      var label = _this.props.label;

      var id = _this.props.id || _this.getId();

      if (!id) {
        return;
      }

      var formItemNode = ReactDOM.findDOMNode(_this);
      var control = formItemNode.querySelector("[id=\"" + id + "\"]");

      if (control) {
        // Only prevent in default situation
        // Avoid preventing event in `label={<a href="xx">link</a>}``
        if (typeof label === 'string') {
          e.preventDefault();
        }

        if (control.focus) {
          control.focus();
        }
      }
    };

    return _this;
  }

  FormItem.prototype.componentDidMount = function () {
    warning(this.getControls(this.props.children, true).length <= 1, '`Form.Item` cannot generate `validateStatus` and `help` automatically, ' + 'while there are more than one `getFieldDecorator` in it.');
  };

  FormItem.prototype.getHelpMessage = function () {
    var help = this.props.help;

    if (help === undefined && this.getOnlyControl()) {
      var errors = this.getField().errors;

      if (errors) {
        return intersperse(errors.map(function (e, index) {
          return React.isValidElement(e.message) ? React.cloneElement(e.message, {
            key: index
          }) : e.message;
        }), ' ');
      }

      return '';
    }

    return help;
  };

  FormItem.prototype.getControls = function (children, recursively) {
    var controls = [];
    var childrenArray = React.Children.toArray(children);

    for (var i = 0; i < childrenArray.length; i++) {
      if (!recursively && controls.length > 0) {
        break;
      }

      var child = childrenArray[i];

      if (child.type && (child.type === FormItem || child.type.displayName === 'FormItem')) {
        continue;
      }

      if (!child.props) {
        continue;
      }

      if (FIELD_META_PROP in child.props) {
        // And means FIELD_DATA_PROP in chidl.props, too.
        controls.push(child);
      } else if (child.props.children) {
        controls = controls.concat(this.getControls(child.props.children, recursively));
      }
    }

    return controls;
  };

  FormItem.prototype.getOnlyControl = function () {
    var child = this.getControls(this.props.children, false)[0];
    return child !== undefined ? child : null;
  };

  FormItem.prototype.getChildProp = function (prop) {
    var child = this.getOnlyControl();
    return child && child.props && child.props[prop];
  };

  FormItem.prototype.getId = function () {
    return this.getChildProp('id');
  };

  FormItem.prototype.getMeta = function () {
    return this.getChildProp(FIELD_META_PROP);
  };

  FormItem.prototype.getField = function () {
    return this.getChildProp(FIELD_DATA_PROP);
  };

  FormItem.prototype.renderHelp = function () {
    var prefixCls = this.props.prefixCls;
    var help = this.getHelpMessage();
    var children = help ? React.createElement("div", {
      className: prefixCls + "-explain",
      key: "help"
    }, help) : null;

    if (children) {
      this.helpShow = !!children;
    }

    return React.createElement(Animate, {
      transitionName: "show-help",
      component: "",
      transitionAppear: true,
      key: "help",
      onEnd: this.onHelpAnimEnd
    }, children);
  };

  FormItem.prototype.renderExtra = function () {
    var _a = this.props,
        prefixCls = _a.prefixCls,
        extra = _a.extra;
    return extra ? React.createElement("div", {
      className: prefixCls + "-extra"
    }, extra) : null;
  };

  FormItem.prototype.getValidateStatus = function () {
    var onlyControl = this.getOnlyControl();

    if (!onlyControl) {
      return '';
    }

    var field = this.getField();

    if (field.validating) {
      return 'validating';
    }

    if (field.errors) {
      return 'error';
    }

    var fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;

    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return 'success';
    }

    return '';
  };

  FormItem.prototype.renderValidateWrapper = function (c1, c2, c3) {
    var props = this.props;
    var onlyControl = this.getOnlyControl;
    var validateStatus = props.validateStatus === undefined && onlyControl ? this.getValidateStatus() : props.validateStatus;
    var classes = this.props.prefixCls + "-item-control";

    if (validateStatus) {
      classes = classNames(this.props.prefixCls + "-item-control", {
        'has-feedback': props.hasFeedback || validateStatus === 'validating',
        'has-success': validateStatus === 'success',
        'has-warning': validateStatus === 'warning',
        'has-error': validateStatus === 'error',
        'is-validating': validateStatus === 'validating'
      });
    }

    return React.createElement("div", {
      className: classes
    }, React.createElement("span", {
      className: this.props.prefixCls + "-item-children"
    }, c1), c2, c3);
  };

  FormItem.prototype.renderWrapper = function (children) {
    var _a = this.props,
        prefixCls = _a.prefixCls,
        wrapperCol = _a.wrapperCol;
    var className = classNames(prefixCls + "-item-control-wrapper", wrapperCol && wrapperCol.className);
    return React.createElement(Col, __assign({}, wrapperCol, {
      className: className,
      key: "wrapper"
    }), children);
  };

  FormItem.prototype.isRequired = function () {
    var required = this.props.required;

    if (required !== undefined) {
      return required;
    }

    if (this.getOnlyControl()) {
      var meta = this.getMeta() || {};
      var validate = meta.validate || [];
      return validate.filter(function (item) {
        return !!item.rules;
      }).some(function (item) {
        return item.rules.some(function (rule) {
          return rule.required;
        });
      });
    }

    return false;
  };

  FormItem.prototype.renderLabel = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        label = _b.label,
        labelCol = _b.labelCol,
        colon = _b.colon,
        id = _b.id;
    var context = this.context;
    var required = this.isRequired();
    var labelColClassName = classNames(prefixCls + "-item-label", labelCol && labelCol.className);
    var labelClassName = classNames((_a = {}, _a[prefixCls + "-item-required"] = required, _a));
    var labelChildren = label; // Keep label is original where there should have no colon

    var haveColon = colon && !context.vertical; // Remove duplicated user input colon

    if (haveColon && typeof label === 'string' && label.trim() !== '') {
      labelChildren = label.replace(/[：|:]\s*$/, '');
    }

    return label ? React.createElement(Col, __assign({}, labelCol, {
      className: labelColClassName,
      key: "label"
    }), React.createElement("label", {
      htmlFor: id || this.getId(),
      className: labelClassName,
      title: typeof label === 'string' ? label : '',
      onClick: this.onLabelClick
    }, labelChildren)) : null;
  };

  FormItem.prototype.renderChildren = function () {
    var children = this.props.children;
    return [this.renderLabel(), this.renderWrapper(this.renderValidateWrapper(children, this.renderHelp(), this.renderExtra()))];
  };

  FormItem.prototype.renderFormItem = function (children) {
    var _a;

    var props = this.props;
    var prefixCls = props.prefixCls;
    var style = props.style;
    var itemClassName = (_a = {}, _a[prefixCls + "-item"] = true, _a[prefixCls + "-item-with-help"] = this.helpShow, _a[prefixCls + "-item-no-colon"] = !props.colon, _a["" + props.className] = !!props.className, _a);
    return React.createElement(Row, {
      className: classNames(itemClassName),
      style: style
    }, children);
  };

  FormItem.prototype.render = function () {
    var children = this.renderChildren();
    return this.renderFormItem(children);
  };

  FormItem.defaultProps = {
    hasFeedback: false,
    prefixCls: 'fishd-form',
    colon: true
  };
  FormItem.propTypes = {
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelCol: PropTypes.object,
    help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    validateStatus: PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
    hasFeedback: PropTypes.bool,
    wrapperCol: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
    colon: PropTypes.bool
  };
  FormItem.contextTypes = {
    vertical: PropTypes.bool
  };
  return FormItem;
}(React.Component);

export default FormItem;