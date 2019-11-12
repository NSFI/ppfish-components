"use strict";

exports.__esModule = true;
exports.default = exports.VERTICAL = exports.HORIZONTAL = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _SortableComposition = require("./SortableComposition");

exports.HORIZONTAL = _SortableComposition.HORIZONTAL;
exports.VERTICAL = _SortableComposition.VERTICAL;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SortableItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SortableItem, _React$Component);

  function SortableItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SortableItem.prototype;

  _proto.render = function render() {
    return _react.default.createElement("div", _extends({}, this.props, {
      className: "fishd-list-sortable-item"
    }), this.props.children);
  };

  return SortableItem;
}(_react.default.Component);

_defineProperty(SortableItem, "propTypes", {
  children: _propTypes.default.node
});

var _default = (0, _SortableComposition.SortableComposition)(SortableItem);

exports.default = _default;