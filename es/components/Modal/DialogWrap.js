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

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _Dialog = _interopRequireDefault(require("./Dialog"));

var _utils = require("../../utils");

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

var IS_REACT_16 = 'createPortal' in ReactDOM;

var DialogWrap =
/** @class */
function (_super) {
  __extends(DialogWrap, _super);

  function DialogWrap() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.saveDialog = function (node) {
      _this._component = node;
    };

    _this.getComponent = function (extra) {
      if (extra === void 0) {
        extra = {};
      }

      return React.createElement(_Dialog.default, __assign({
        ref: _this.saveDialog
      }, _this.props, extra, {
        key: "dialog"
      }));
    }; // fix issue #10656

    /*
    * Custom container should not be return, because in the Portal component, it will remove the
    * return container element here, if the custom container is the only child of it's component,
    * like issue #10656, It will has a conflict with removeChild method in react-dom.
    * So here should add a child (div element) to custom container.
    * */


    _this.getContainer = function () {
      var container = document.createElement('div');

      if (_this.props.getContainer) {
        _this.props.getContainer().appendChild(container);
      } else {
        document.body.appendChild(container);
      }

      return container;
    };

    return _this;
  }

  DialogWrap.prototype.shouldComponentUpdate = function (_a) {
    var visible = _a.visible;
    return !!(this.props.visible || visible);
  };

  DialogWrap.prototype.componentWillUnmount = function () {
    if (IS_REACT_16) {
      return;
    }

    if (this.props.visible) {
      this.renderComponent({
        afterClose: this.removeContainer,
        onClose: function onClose() {},
        visible: false
      });
    } else {
      this.removeContainer();
    }
  };

  DialogWrap.prototype.render = function () {
    var _this = this;

    var visible = this.props.visible;
    var portal = null;

    if (!IS_REACT_16) {
      return React.createElement(_utils.ContainerRender, {
        parent: this,
        visible: visible,
        autoDestroy: false,
        getComponent: this.getComponent,
        getContainer: this.getContainer
      }, function (_a) {
        var renderComponent = _a.renderComponent,
            removeContainer = _a.removeContainer;
        _this.renderComponent = renderComponent;
        _this.removeContainer = removeContainer;
        return null;
      });
    }

    if (visible || this._component) {
      portal = React.createElement(_utils.Portal, {
        getContainer: this.getContainer
      }, this.getComponent());
    }

    return portal;
  };

  DialogWrap.defaultProps = {
    visible: false
  };
  return DialogWrap;
}(React.Component);

var _default = DialogWrap;
exports.default = _default;