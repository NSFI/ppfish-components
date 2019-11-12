"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _BaseSelector = _interopRequireWildcard(require("../Base/BaseSelector"));

var _util = require("../util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Selector = (0, _BaseSelector.default)('single');

var SingleSelector =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SingleSelector, _React$Component);

  function SingleSelector() {
    var _this;

    _this = _React$Component.call(this) || this;

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      _this.selectorRef.current.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      _this.selectorRef.current.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelection", function () {
      var _this$props = _this.props,
          selectorValueList = _this$props.selectorValueList,
          placeholder = _this$props.placeholder,
          prefixCls = _this$props.prefixCls;
      var innerNode;

      if (selectorValueList.length) {
        var _selectorValueList$ = selectorValueList[0],
            label = _selectorValueList$.label,
            value = _selectorValueList$.value;
        innerNode = _react.default.createElement("span", {
          key: "value",
          title: (0, _util.toTitle)(label),
          className: prefixCls + "-selection-selected-value"
        }, label || value);
      } else {
        innerNode = _react.default.createElement("span", {
          key: "placeholder",
          className: prefixCls + "-selection__placeholder"
        }, placeholder);
      }

      return _react.default.createElement("span", {
        className: prefixCls + "-selection__rendered"
      }, innerNode);
    });

    _this.selectorRef = (0, _util.createRef)();
    return _this;
  }

  var _proto = SingleSelector.prototype;

  _proto.render = function render() {
    return _react.default.createElement(Selector, _extends({}, this.props, {
      ref: this.selectorRef,
      renderSelection: this.renderSelection
    }));
  };

  return SingleSelector;
}(_react.default.Component);

_defineProperty(SingleSelector, "propTypes", Object.assign({}, _BaseSelector.selectorPropTypes));

var _default = SingleSelector;
exports.default = _default;