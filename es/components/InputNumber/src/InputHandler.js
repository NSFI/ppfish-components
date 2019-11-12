"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rmcFeedback = _interopRequireDefault(require("rmc-feedback"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var InputHandler =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(InputHandler, _Component);

  function InputHandler() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = InputHandler.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        disabled = _this$props.disabled,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "disabled"]);

    return _react.default.createElement(_rmcFeedback.default, {
      disabled: disabled,
      activeClassName: prefixCls + "-handler-active"
    }, _react.default.createElement("span", otherProps));
  };

  return InputHandler;
}(_react.Component);

InputHandler.propTypes = {
  prefixCls: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  onTouchStart: _propTypes.default.func,
  onTouchEnd: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func
};
var _default = InputHandler;
exports.default = _default;