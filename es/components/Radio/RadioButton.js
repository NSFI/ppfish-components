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
import * as PropTypes from 'prop-types';
import Radio from './Radio'; // case sensitive

var RadioButton =
/** @class */
function (_super) {
  __extends(RadioButton, _super);

  function RadioButton() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  RadioButton.prototype.render = function () {
    var radioProps = __assign({}, this.props);

    if (this.context.radioGroup) {
      radioProps.onChange = this.context.radioGroup.onChange;
      radioProps.checked = this.props.value === this.context.radioGroup.value;
      radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
    }

    return React.createElement(Radio, __assign({}, radioProps));
  };

  RadioButton.defaultProps = {
    prefixCls: 'fishd-radio-button'
  };
  RadioButton.contextTypes = {
    radioGroup: PropTypes.any
  };
  return RadioButton;
}(React.Component);

export default RadioButton;