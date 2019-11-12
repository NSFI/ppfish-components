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

var _classnames2 = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PanelContent =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(PanelContent, _Component);

  function PanelContent(props) {
    return _Component.call(this, props) || this;
  }

  var _proto = PanelContent.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.isActive || nextProps.isActive;
  };

  _proto.render = function render() {
    var _classnames;

    this._isActived = this._isActived || this.props.isActive;

    if (!this._isActived) {
      return null;
    }

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        isActive = _this$props.isActive,
        children = _this$props.children;
    var contentCls = (0, _classnames2.default)((_classnames = {}, _classnames[prefixCls + "-content"] = true, _classnames[prefixCls + "-content-active"] = isActive, _classnames[prefixCls + "-content-inactive"] = !isActive, _classnames));
    return _react.default.createElement("div", {
      className: contentCls,
      role: "tabpanel"
    }, _react.default.createElement("div", {
      className: prefixCls + "-content-box"
    }, children));
  };

  return PanelContent;
}(_react.Component);

_defineProperty(PanelContent, "propTypes", {
  prefixCls: _propTypes.default.string,
  isActive: _propTypes.default.bool,
  children: _propTypes.default.node
});

var _default = PanelContent;
exports.default = _default;