"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = confirm;

require("core-js/modules/es6.object.assign");

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../Icon/index"));

var _Modal = _interopRequireDefault(require("./Modal"));

var _ActionButton = _interopRequireDefault(require("./ActionButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var _this = void 0;

var IS_REACT_16 = !!ReactDOM.createPortal;

var ConfirmDialog = function ConfirmDialog(props) {
  var onCancel = props.onCancel,
      onOk = props.onOk,
      close = props.close,
      zIndex = props.zIndex,
      afterClose = props.afterClose,
      visible = props.visible,
      esc = props.esc;
  var iconType = props.iconType || 'hints-descriptions';
  var okType = props.okType || 'primary';
  var prefixCls = props.prefixCls || 'fishd-confirm'; // 默认为 true，保持向下兼容

  var okCancel = 'okCancel' in props ? props.okCancel : true;
  var width = props.width || 416;
  var style = props.style || {}; // 默认为 false，保持旧版默认行为

  var maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  var okText = props.okText || '确定';
  var cancelText = props.cancelText || '取消';
  var classString = (0, _classnames.default)(prefixCls, prefixCls + "-" + props.type, props.className);
  var cancelButton = okCancel && React.createElement(_ActionButton.default, {
    actionFn: onCancel,
    closeModal: close
  }, cancelText);
  return React.createElement(_Modal.default, {
    className: classString,
    onCancel: close.bind(_this, {
      triggerCancel: true
    }),
    visible: visible,
    title: "",
    transitionName: "fishd-modal-zoom",
    footer: "",
    maskTransitionName: "",
    maskClosable: maskClosable,
    style: style,
    width: width,
    zIndex: zIndex,
    afterClose: afterClose,
    esc: esc
  }, React.createElement("div", {
    className: prefixCls + "-body-wrapper"
  }, React.createElement("div", {
    className: prefixCls + "-body"
  }, React.createElement(_index.default, {
    type: iconType
  }), React.createElement("span", {
    className: prefixCls + "-title"
  }, props.title), React.createElement("div", {
    className: prefixCls + "-content"
  }, props.content)), React.createElement("div", {
    className: prefixCls + "-btns"
  }, cancelButton, React.createElement(_ActionButton.default, {
    type: okType,
    actionFn: onOk,
    closeModal: close,
    autoFocus: true
  }, okText))));
};

function confirm(config) {
  var div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (IS_REACT_16) {
      render(__assign(__assign({}, config), {
        close: close,
        visible: false,
        afterClose: destroy.bind.apply(destroy, __spreadArrays([this], args))
      }));
    } else {
      destroy.apply(void 0, args);
    }
  }

  function destroy() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    var triggerCancel = args && args.length && args.some(function (param) {
      return param && param.triggerCancel;
    });

    if (config.onCancel && triggerCancel) {
      config.onCancel.apply(config, args);
    }
  }

  function render(props) {
    ReactDOM.render(React.createElement(ConfirmDialog, __assign({}, props)), div);
  }

  render(__assign(__assign({}, config), {
    visible: true,
    close: close
  }));
  return {
    destroy: close
  };
}