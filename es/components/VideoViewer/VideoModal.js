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

var _omit = _interopRequireDefault(require("omit.js"));

var _index = _interopRequireDefault(require("../Modal/index.js"));

var _index2 = _interopRequireDefault(require("../Icon/index.js"));

require("./style/VideoModal.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VideoModal =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(VideoModal, _Component);

  function VideoModal(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleOnClose", function () {
      _this.props.onCancel();
    });

    return _this;
  }

  var _proto = VideoModal.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        children = _this$props.children,
        closable = _this$props.closable,
        _this$props$wrapClass = _this$props.wrapClassName,
        wrapClassName = _this$props$wrapClass === void 0 ? '' : _this$props$wrapClass,
        maskStyle = _this$props.maskStyle;
    var MODAL_WRAP = prefixCls + "-modal-wrap";
    var otherProps = (0, _omit.default)(this.props, ['prefixCls', 'wrapClassName', 'title', 'footer', 'maskStyle', 'closable']);
    var modalProps = Object.assign({}, otherProps, {
      wrapClassName: wrapClassName + " " + MODAL_WRAP,
      className: 'fishd-modal',
      maskStyle: maskStyle ? maskStyle : {
        backgroundColor: 'rgba(0,0,0,0.2)'
      },
      // 不显示Modal自带的关闭按钮
      closable: false,
      title: null,
      footer: null
    });

    var content = _react.default.createElement("div", {
      className: prefixCls + "-content"
    }, children, _react.default.createElement("div", {
      className: prefixCls + "-header"
    }, closable ? _react.default.createElement(_index2.default, {
      type: "picture-close",
      className: "icon-close",
      onClick: this.handleOnClose
    }) : null));

    return _react.default.createElement(_index.default, modalProps, _react.default.createElement("div", {
      className: prefixCls + "-inner"
    }, content));
  };

  return VideoModal;
}(_react.Component);

_defineProperty(VideoModal, "propTypes", {
  prefixCls: _propTypes.default.string,
  children: _propTypes.default.node,
  wrapClassName: _propTypes.default.string,
  maskStyle: _propTypes.default.object,
  visible: _propTypes.default.bool.isRequired,
  draggable: _propTypes.default.bool,
  mask: _propTypes.default.bool,
  closable: _propTypes.default.bool,
  onCancel: _propTypes.default.func,
  afterClose: _propTypes.default.func,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
});

_defineProperty(VideoModal, "defaultProps", {
  prefixCls: 'fishd-video-modal',
  visible: false,
  draggable: false,
  closable: true,
  mask: false,
  width: 640
});

var _default = VideoModal;
exports.default = _default;