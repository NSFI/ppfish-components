"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _classnames = _interopRequireDefault(require("classnames"));

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

function noop() {}

function getDataOrAriaProps(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if ((key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') && key.substr(0, 7) !== 'data-__') {
      prev[key] = props[key];
    }

    return prev;
  }, {});
}

var Alert =
/** @class */
function (_super) {
  __extends(Alert, _super);

  function Alert(props) {
    var _this = _super.call(this, props) || this;

    _this.handleClose = function (e) {
      e.preventDefault();
      var dom = ReactDOM.findDOMNode(_this);
      dom.style.height = dom.offsetHeight + "px"; // Magic code
      // 重复一次后才能正确设置 height

      dom.style.height = dom.offsetHeight + "px";

      _this.setState({
        closing: false
      });

      (_this.props.onClose || noop)(e);
    };

    _this.animationEnd = function () {
      _this.setState({
        closed: true,
        closing: true
      });

      (_this.props.afterClose || noop)();
    };

    _this.state = {
      closing: true,
      closed: false
    };
    return _this;
  }

  Alert.prototype.render = function () {
    var _a;

    var _b = this.props,
        closable = _b.closable,
        description = _b.description,
        type = _b.type,
        _c = _b.prefixCls,
        prefixCls = _c === void 0 ? 'fishd-alert' : _c,
        message = _b.message,
        closeText = _b.closeText,
        showIcon = _b.showIcon,
        banner = _b.banner,
        _d = _b.className,
        className = _d === void 0 ? '' : _d,
        style = _b.style,
        iconType = _b.iconType; // banner模式默认有 Icon

    showIcon = banner && showIcon === undefined ? true : showIcon; // banner模式默认为警告

    type = banner && type === undefined ? 'warning' : type || 'info';

    if (!iconType) {
      switch (type) {
        case 'success':
          iconType = 'hints-success';
          break;

        case 'info':
          iconType = 'hints-notification';
          break;

        case 'error':
          iconType = 'hints-error';
          break;

        case 'warning':
          iconType = 'hints-warning';
          break;
        // 展示空icon

        default:
          iconType = 'default';
      } // use outline icon in alert with description


      if (!!description) {
        iconType += '-o';
      }
    }

    var alertCls = (0, _classnames.default)(prefixCls, (_a = {}, _a[prefixCls + "-" + type] = true, _a[prefixCls + "-close"] = !this.state.closing, _a[prefixCls + "-with-description"] = !!description, _a[prefixCls + "-no-icon"] = !showIcon, _a[prefixCls + "-banner"] = !!banner, _a), className); // closeable when closeText is assigned

    if (closeText) {
      closable = true;
    }

    var closeIcon = closable ? React.createElement("a", {
      onClick: this.handleClose,
      className: prefixCls + "-close-icon"
    }, closeText || React.createElement(_Icon.default, {
      type: "close-modal-line"
    })) : null;
    var dataOrAriaProps = getDataOrAriaProps(this.props);
    return this.state.closed ? null : React.createElement(_rcAnimate.default, {
      component: "",
      showProp: "data-show",
      transitionName: prefixCls + "-slide-up",
      onEnd: this.animationEnd
    }, React.createElement("div", __assign({
      "data-show": this.state.closing,
      className: alertCls,
      style: style
    }, dataOrAriaProps), showIcon ? React.createElement(_Icon.default, {
      className: prefixCls + "-icon",
      type: iconType
    }) : null, React.createElement("span", {
      className: prefixCls + "-message"
    }, message), React.createElement("span", {
      className: prefixCls + "-description"
    }, description), closeIcon));
  };

  return Alert;
}(React.Component);

var _default = Alert;
exports.default = _default;