"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("omit.js"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultSizeMap = {
  small: {
    width: 90,
    height: 60
  },
  "default": {
    width: 150,
    height: 100
  },
  large: {
    width: 240,
    height: 160
  }
};
var Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

var noop = function noop() {};

var ImageLoader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ImageLoader, _React$Component);

  _createClass(ImageLoader, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _prevState$prevProps = prevState.prevProps,
          prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;
      var newState = {
        prevProps: nextProps
      };

      if (prevProps.src !== nextProps.src) {
        newState.status = nextProps.src ? Status.LOADING : Status.PENDING;
      }

      return newState;
    }
  }]);

  function ImageLoader(props) {
    var _this;

    _classCallCheck(this, ImageLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageLoader).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "base64Img", function (cls) {
      var placeholderSize = _this.props.placeholderSize;
      var sizeProps = {
        width: '100%'
      };

      if (_typeof(placeholderSize) === 'object') {
        sizeProps = Object.assign({}, sizeProps, placeholderSize);
      } else if (['small', 'default', 'large'].indexOf(placeholderSize) > -1) {
        sizeProps = Object.assign({}, sizeProps, defaultSizeMap[placeholderSize]);
      }

      return _react["default"].createElement("div", {
        className: cls,
        style: _objectSpread({}, sizeProps)
      });
    });

    _this.state = {
      status: props.src ? Status.LOADING : Status.PENDING,
      prevProps: props
    };
    return _this;
  }

  _createClass(ImageLoader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.status === Status.LOADING) {
        this.createLoader();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.status === Status.LOADING && !this.img) {
        this.createLoader();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.destroyLoader();
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var prefixCls = this.props.prefixCls;
      var className = "".concat(prefixCls, " ").concat(prefixCls, "-").concat(this.state.status);

      if (this.props.className) {
        className = "".concat(className, " ").concat(this.props.className);
      }

      return className;
    }
  }, {
    key: "createLoader",
    value: function createLoader() {
      this.destroyLoader(); // We can only have one loader at a time.

      this.img = new Image();
      this.img.onload = this.handleLoad.bind(this);
      this.img.onerror = this.handleError.bind(this);
      this.img.src = this.props.src;
    }
  }, {
    key: "destroyLoader",
    value: function destroyLoader() {
      if (this.img) {
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
    }
  }, {
    key: "handleLoad",
    value: function handleLoad(event) {
      this.destroyLoader();
      this.setState({
        status: Status.LOADED
      });
      if (this.props.onLoad) this.props.onLoad(event);
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      this.destroyLoader();
      this.setState({
        status: Status.FAILED
      });
      if (this.props.onError) this.props.onError(error);
    }
  }, {
    key: "renderImg",
    value: function renderImg() {
      var _this$props = this.props,
          src = _this$props.src,
          imgProps = _this$props.imgProps;
      var otherProps = (0, _omit["default"])(imgProps, ['src']);
      return _react["default"].createElement("img", _extends({
        src: src
      }, otherProps));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          style = _this$props2.style,
          preLoader = _this$props2.preLoader,
          failedLoader = _this$props2.failedLoader;
      var wrapperProps = {
        className: this.getClassName()
      };

      if (style) {
        wrapperProps.style = style;
      }

      var content = null;

      switch (this.state.status) {
        case Status.LOADED:
          // 加载成功
          content = this.renderImg();
          break;

        case Status.FAILED:
          // 使用自定义加载失败图片
          if (failedLoader) {
            if (typeof failedLoader === 'function') {
              content = failedLoader();
            } else {
              content = failedLoader;
            } // 使用系统预置加载失败图片

          } else {
            content = this.base64Img('failed-img');
          }

          break;

        default:
          // 使用自定义占位图片
          if (preLoader) {
            if (typeof preLoader === 'function') {
              content = preLoader();
            } else {
              content = preLoader;
            } // 使用系统预置占位图片

          } else {
            content = this.base64Img('preload-img');
          }

          break;
      }

      return _react["default"].createElement("div", wrapperProps, content);
    }
  }]);

  return ImageLoader;
}(_react["default"].Component);

_defineProperty(ImageLoader, "propTypes", {
  className: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,
  placeholderSize: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  style: _propTypes["default"].object,
  preLoader: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  failedLoader: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  src: _propTypes["default"].string,
  onLoad: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  imgProps: _propTypes["default"].object
});

_defineProperty(ImageLoader, "defaultProps", {
  prefixCls: 'fishd-image-loader',
  placeholderSize: 'default',
  onLoad: noop,
  onError: noop
});

(0, _reactLifecyclesCompat.polyfill)(ImageLoader);
var _default = ImageLoader;
exports["default"] = _default;