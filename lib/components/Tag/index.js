"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _index = _interopRequireDefault(require("../Icon/index"));

var _CheckableTag = _interopRequireDefault(require("./CheckableTag"));

require("./style/index.less");

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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var Tag =
/** @class */
function (_super) {
  __extends(Tag, _super);

  function Tag() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      closing: false,
      closed: false,
      visible: true
    };

    _this.handleIconClick = function (e) {
      var onClose = _this.props.onClose;

      if (onClose) {
        onClose(e);
      }

      if (e.defaultPrevented || 'visible' in _this.props) {
        return;
      }

      _this.setState({
        visible: false
      });
    };

    _this.close = function () {
      if (_this.state.closing || _this.state.closed) {
        return;
      }

      var dom = ReactDOM.findDOMNode(_this);
      dom.style.width = dom.getBoundingClientRect().width + "px"; // It's Magic Code, don't know why

      dom.style.width = dom.getBoundingClientRect().width + "px";

      _this.setState({
        closing: true
      });
    };

    _this.show = function () {
      _this.setState({
        closed: false
      });
    };

    _this.animationEnd = function (_, existed) {
      if (!existed && !_this.state.closed) {
        _this.setState({
          closed: true,
          closing: false
        });

        var afterClose = _this.props.afterClose;

        if (afterClose) {
          afterClose();
        }
      } else {
        _this.setState({
          closed: false
        });
      }
    };

    return _this;
  }

  Tag.getDerivedStateFromProps = function (nextProps) {
    return 'visible' in nextProps ? {
      visible: nextProps.visible
    } : null;
  };

  Tag.prototype.componentDidUpdate = function (_prevProps, prevState) {
    if (prevState.visible && !this.state.visible) {
      this.close();
    } else if (!prevState.visible && this.state.visible) {
      this.show();
    }
  };

  Tag.prototype.isPresetColor = function (color) {
    return false; // if (!color) { return false; }
    // return (
    //   /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/
    //   .test(color)
    // );
  };

  Tag.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        closable = _b.closable,
        color = _b.color,
        className = _b.className,
        children = _b.children,
        style = _b.style,
        autoShowClose = _b.autoShowClose,
        otherProps = __rest(_b, ["prefixCls", "closable", "color", "className", "children", "style", "autoShowClose"]);

    var isPresetColor = this.isPresetColor(color);
    var classString = (0, _classnames["default"])(prefixCls, (_a = {}, _a[prefixCls + "-" + color] = isPresetColor, _a[prefixCls + "-has-color"] = color && !isPresetColor, _a[prefixCls + "-close"] = this.state.closing, _a), className); // fix https://fb.me/react-unknown-prop

    var divProps = (0, _omit["default"])(otherProps, ['onClose', 'afterClose', 'visible']);

    var tagStyle = __assign({
      backgroundColor: color && !isPresetColor ? color : null
    }, style);

    var closeIcon = null;

    if (closable) {
      if (autoShowClose) {
        closeIcon = React.createElement(_index["default"], {
          type: "close-modal-line",
          onClick: this.handleIconClick
        });
      } else {
        closeIcon = React.createElement(_index["default"], {
          type: "close-modal-line",
          onClick: this.handleIconClick,
          className: "invisible"
        });
      }
    }

    var tag = this.state.closed ? null : React.createElement("div", __assign({
      "data-show": !this.state.closing
    }, divProps, {
      className: classString,
      style: tagStyle
    }), children, closeIcon);
    return React.createElement(_rcAnimate["default"], {
      component: "",
      showProp: "data-show",
      transitionName: prefixCls + "-zoom",
      transitionAppear: true,
      onEnd: this.animationEnd
    }, tag);
  };

  Tag.CheckableTag = _CheckableTag["default"];
  Tag.defaultProps = {
    prefixCls: 'fishd-tag',
    closable: false,
    autoShowClose: true
  };
  return Tag;
}(React.Component);

(0, _reactLifecyclesCompat.polyfill)(Tag);
var _default = Tag;
exports["default"] = _default;