function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import Color from './helpers/color';

var Preview =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Preview, _React$Component);

  function Preview() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Preview)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var value = e.target.value;
      var color = new Color(value);

      _this.props.onChange(color);

      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "getPrefixCls", function () {
      return "".concat(_this.props.rootPrefixCls, "-preview");
    });

    return _this;
  }

  _createClass(Preview, [{
    key: "render",
    value: function render() {
      var prefixCls = this.getPrefixCls();
      var hex = this.props.color.toHexString();
      return React.createElement("div", {
        className: prefixCls
      }, React.createElement("span", {
        style: {
          backgroundColor: hex,
          opacity: this.props.alpha / 100
        }
      }), React.createElement("input", {
        type: "color",
        value: hex,
        onChange: this.onChange,
        onClick: this.props.onInputClick
      }));
    }
  }]);

  return Preview;
}(React.Component);

_defineProperty(Preview, "propTypes", {
  alpha: PropTypes.number,
  color: PropTypes.object,
  onChange: PropTypes.func,
  onInputClick: PropTypes.func,
  rootPrefixCls: PropTypes.string
});

export { Preview as default };