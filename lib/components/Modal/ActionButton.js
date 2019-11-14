"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

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

var ActionButton =
/** @class */
function (_super) {
  __extends(ActionButton, _super);

  function ActionButton(props) {
    var _this = _super.call(this, props) || this;

    _this.onClick = function () {
      var _a = _this.props,
          actionFn = _a.actionFn,
          closeModal = _a.closeModal;

      if (actionFn) {
        var ret = void 0;

        if (actionFn.length) {
          ret = actionFn(closeModal);
        } else {
          ret = actionFn();

          if (!ret) {
            closeModal();
          }
        }

        if (ret && ret.then) {
          _this.setState({
            loading: true
          });

          ret.then(function () {
            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            } // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
            // this.setState({ loading: false });


            closeModal.apply(void 0, args);
          }, function () {
            // See: https://github.com/ant-design/ant-design/issues/6183
            _this.setState({
              loading: false
            });
          });
        }
      } else {
        closeModal();
      }
    };

    _this.state = {
      loading: false
    };
    return _this;
  }

  ActionButton.prototype.componentDidMount = function () {
    if (this.props.autoFocus) {
      var $this_1 = ReactDOM.findDOMNode(this);
      this.timeoutId = setTimeout(function () {
        return $this_1.focus();
      });
    }
  };

  ActionButton.prototype.componentWillUnmount = function () {
    clearTimeout(this.timeoutId);
  };

  ActionButton.prototype.render = function () {
    var _a = this.props,
        type = _a.type,
        children = _a.children;
    var loading = this.state.loading;
    return React.createElement(_Button["default"], {
      type: type,
      onClick: this.onClick,
      loading: loading
    }, children);
  };

  return ActionButton;
}(React.Component);

var _default = ActionButton;
exports["default"] = _default;