"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AjaxUploader = _interopRequireDefault(require("./AjaxUploader"));

var _IframeUploader = _interopRequireDefault(require("./IframeUploader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function empty() {}

var Upload =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Upload, _Component);

  function Upload() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      Component: null
    });

    _defineProperty(_assertThisInitialized(_this), "saveUploader", function (node) {
      _this.uploader = node;
    });

    return _this;
  }

  var _proto = Upload.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.supportServerRender) {
      /* eslint react/no-did-mount-set-state:0 */
      this.setState({
        Component: this.getComponent()
      }, this.props.onReady);
    }
  };

  _proto.getComponent = function getComponent() {
    return typeof File !== 'undefined' ? _AjaxUploader.default : _IframeUploader.default;
  };

  _proto.abort = function abort(file) {
    this.uploader.abort(file);
  };

  _proto.render = function render() {
    if (this.props.supportServerRender) {
      var _ComponentUploader = this.state.Component;

      if (_ComponentUploader) {
        return _react.default.createElement(_ComponentUploader, _extends({}, this.props, {
          ref: this.saveUploader
        }));
      }

      return null;
    }

    var ComponentUploader = this.getComponent();
    return _react.default.createElement(ComponentUploader, _extends({}, this.props, {
      ref: this.saveUploader
    }));
  };

  return Upload;
}(_react.Component);

_defineProperty(Upload, "propTypes", {
  component: _propTypes.default.string,
  style: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  action: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  name: _propTypes.default.string,
  multipart: _propTypes.default.bool,
  directory: _propTypes.default.bool,
  onError: _propTypes.default.func,
  onSuccess: _propTypes.default.func,
  onProgress: _propTypes.default.func,
  onStart: _propTypes.default.func,
  data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  headers: _propTypes.default.object,
  accept: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  multiple: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  beforeUpload: _propTypes.default.func,
  customRequest: _propTypes.default.func,
  onReady: _propTypes.default.func,
  withCredentials: _propTypes.default.bool,
  supportServerRender: _propTypes.default.bool
});

_defineProperty(Upload, "defaultProps", {
  component: 'span',
  prefixCls: 'rc-upload',
  data: {},
  headers: {},
  name: 'file',
  multipart: false,
  onReady: empty,
  onStart: empty,
  onError: empty,
  onSuccess: empty,
  supportServerRender: false,
  multiple: false,
  beforeUpload: null,
  customRequest: null,
  withCredentials: false
});

var _default = Upload;
exports.default = _default;