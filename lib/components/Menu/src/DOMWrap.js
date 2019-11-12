"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DOMWrap =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DOMWrap, _React$Component);

  function DOMWrap() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DOMWrap.prototype;

  _proto.render = function render() {
    var props = Object.assign({}, this.props);

    if (!props.visible) {
      props.className += " " + props.hiddenClassName;
    }

    var Tag = props.tag;
    delete props.tag;
    delete props.hiddenClassName;
    delete props.visible;
    return _react.default.createElement(Tag, props);
  };

  return DOMWrap;
}(_react.default.Component);

exports.default = DOMWrap;

_defineProperty(DOMWrap, "propTypes", {
  tag: _propTypes.default.string,
  hiddenClassName: _propTypes.default.string,
  visible: _propTypes.default.bool
});

_defineProperty(DOMWrap, "defaultProps", {
  tag: 'div',
  className: ''
});