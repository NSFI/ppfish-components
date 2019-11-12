"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OptGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(OptGroup, _React$Component);

  function OptGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  return OptGroup;
}(_react.default.Component);

exports.default = OptGroup;

_defineProperty(OptGroup, "isSelectOptGroup", true);