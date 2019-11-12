"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _warning = _interopRequireDefault(require("../../utils/warning"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var __assign = void 0 && (void 0).__assign || function () {
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

var Popover =
/** @class */
function (_super) {
  __extends(Popover, _super);

  function Popover() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.saveTooltip = function (node) {
      _this.tooltip = node;
    };

    return _this;
  }

  Popover.prototype.getPopupDomNode = function () {
    return this.tooltip.getPopupDomNode();
  };

  Popover.prototype.getOverlay = function () {
    var _a = this.props,
        title = _a.title,
        prefixCls = _a.prefixCls,
        content = _a.content;
    (0, _warning.default)(!('overlay' in this.props), 'Popover[overlay] is removed, please use Popover[content] instead, ' + 'see: https://u.ant.design/popover-content');
    return React.createElement("div", null, title && React.createElement("div", {
      className: prefixCls + "-title"
    }, title), React.createElement("div", {
      className: prefixCls + "-inner-content"
    }, content));
  };

  Popover.prototype.render = function () {
    var props = __assign({}, this.props);

    delete props.title;
    return React.createElement(_Tooltip.default, __assign({}, props, {
      ref: this.saveTooltip,
      overlay: this.getOverlay()
    }));
  };

  Popover.defaultProps = {
    prefixCls: 'fishd-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {}
  };
  return Popover;
}(React.Component);

var _default = Popover;
exports.default = _default;