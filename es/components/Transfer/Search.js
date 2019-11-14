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

import * as React from 'react';
import Icon from '../Icon';
import Input from '../Input';

var Search =
/** @class */
function (_super) {
  __extends(Search, _super);

  function Search() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.handleChange = function (e) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(e);
      }
    };

    _this.handleClear = function (e) {
      e.preventDefault();
      var handleClear = _this.props.handleClear;

      if (handleClear) {
        handleClear(e);
      }
    };

    return _this;
  }

  Search.prototype.render = function () {
    var _a = this.props,
        placeholder = _a.placeholder,
        value = _a.value,
        prefixCls = _a.prefixCls;
    var icon = value && value.length > 0 ? React.createElement("a", {
      href: "#",
      className: prefixCls + "-action",
      onClick: this.handleClear
    }, React.createElement(Icon, {
      type: "close-circle-fill"
    })) : React.createElement("span", {
      className: prefixCls + "-action"
    }, React.createElement(Icon, {
      type: "search-line"
    }));
    return React.createElement("div", null, React.createElement(Input, {
      placeholder: placeholder,
      className: prefixCls,
      value: value,
      ref: "input",
      onChange: this.handleChange
    }), icon);
  };

  Search.defaultProps = {
    placeholder: ''
  };
  return Search;
}(React.Component);

export default Search;