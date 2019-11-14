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

var InputElement =
/** @class */
function (_super) {
  __extends(InputElement, _super);

  function InputElement() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.focus = function () {
      _this.ele.focus ? _this.ele.focus() : ReactDOM.findDOMNode(_this.ele).focus();
    };

    _this.blur = function () {
      _this.ele.blur ? _this.ele.blur() : ReactDOM.findDOMNode(_this.ele).blur();
    };

    _this.saveRef = function (ele) {
      _this.ele = ele;
      var childRef = _this.props.children.ref;

      if (typeof childRef === 'function') {
        childRef(ele);
      }
    };

    return _this;
  }

  InputElement.prototype.render = function () {
    return React.cloneElement(this.props.children, __assign(__assign({}, this.props), {
      ref: this.saveRef
    }), null);
  };

  return InputElement;
}(React.Component);

export default InputElement;