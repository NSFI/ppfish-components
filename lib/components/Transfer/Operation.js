"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("../Button"));

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

var Operation =
/** @class */
function (_super) {
  __extends(Operation, _super);

  function Operation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Operation.prototype.render = function () {
    var _a = this.props,
        mode = _a.mode,
        arrowText = _a.arrowText,
        moveToLeft = _a.moveToLeft,
        moveToRight = _a.moveToRight,
        _b = _a.leftArrowText,
        leftArrowText = _b === void 0 ? '' : _b,
        _c = _a.rightArrowText,
        rightArrowText = _c === void 0 ? '' : _c,
        leftActive = _a.leftActive,
        rightActive = _a.rightActive,
        className = _a.className,
        style = _a.style;

    if (mode === 'single') {
      return React.createElement("div", {
        className: className,
        style: style
      }, arrowText);
    } else {
      return React.createElement("div", {
        className: className,
        style: style
      }, React.createElement(_Button["default"], {
        type: "primary",
        size: "small",
        disabled: !rightActive,
        onClick: moveToRight,
        icon: "right"
      }, rightArrowText), React.createElement(_Button["default"], {
        type: "primary",
        size: "small",
        disabled: !leftActive,
        onClick: moveToLeft,
        icon: "left"
      }, leftArrowText));
    }
  };

  return Operation;
}(React.Component);

var _default = Operation;
exports["default"] = _default;