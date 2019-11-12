"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _color = _interopRequireDefault(require("./helpers/color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Preview =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Preview, _React$Component);

  function Preview() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var value = e.target.value;
      var color = new _color.default(value);

      _this.props.onChange(color);

      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "getPrefixCls", function () {
      return _this.props.rootPrefixCls + "-preview";
    });

    return _this;
  }

  var _proto = Preview.prototype;

  _proto.render = function render() {
    var prefixCls = this.getPrefixCls();
    var hex = this.props.color.toHexString();
    return _react.default.createElement("div", {
      className: prefixCls
    }, _react.default.createElement("span", {
      style: {
        backgroundColor: hex,
        opacity: this.props.alpha / 100
      }
    }), _react.default.createElement("input", {
      type: "color",
      value: hex,
      onChange: this.onChange,
      onClick: this.props.onInputClick
    }));
  };

  return Preview;
}(_react.default.Component);

exports.default = Preview;

_defineProperty(Preview, "propTypes", {
  alpha: _propTypes.default.number,
  color: _propTypes.default.object,
  onChange: _propTypes.default.func,
  onInputClick: _propTypes.default.func,
  rootPrefixCls: _propTypes.default.string
});