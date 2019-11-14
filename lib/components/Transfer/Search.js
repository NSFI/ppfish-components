"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Input = _interopRequireDefault(require("../Input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
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
    }, React.createElement(_Icon["default"], {
      type: "close-circle-fill"
    })) : React.createElement("span", {
      className: prefixCls + "-action"
    }, React.createElement(_Icon["default"], {
      type: "search-line"
    }));
    return React.createElement("div", null, React.createElement(_Input["default"], {
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

var _default = Search;
exports["default"] = _default;