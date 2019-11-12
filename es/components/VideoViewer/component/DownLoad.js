"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../../Icon/index.js"));

var _index2 = _interopRequireDefault(require("../../Tooltip/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DownLoad =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DownLoad, _Component);

  function DownLoad() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = DownLoad.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        vjsComponent = _this$props.vjsComponent,
        prefixCls = _this$props.prefixCls;
    var src = vjsComponent.options_.playerOptions.downloadSrc;
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls, "fishd-video-js-customer-button")
    }, _react.default.createElement(_index2.default, {
      title: _react.default.createElement("span", {
        style: {
          wordBreak: 'keep-all'
        }
      }, "\u4E0B\u8F7D"),
      getPopupContainer: function getPopupContainer(e) {
        return e.parentNode;
      }
    }, _react.default.createElement("a", {
      download: true,
      href: src,
      target: "_blank",
      rel: "noopener noreferrer"
    }, _react.default.createElement(_index.default, {
      type: "sound-download"
    }))));
  };

  return DownLoad;
}(_react.Component);

exports.default = DownLoad;

_defineProperty(DownLoad, "propTypes", {
  prefixCls: _propTypes.default.string,
  vjsComponent: _propTypes.default.object
});

_defineProperty(DownLoad, "defaultProps", {
  prefixCls: 'fishd-video-viewer-download'
});