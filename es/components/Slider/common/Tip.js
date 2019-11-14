function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip/index.js';

var Tip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tip, _React$Component);

  function Tip() {
    _classCallCheck(this, Tip);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tip).apply(this, arguments));
  }

  _createClass(Tip, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          visible = _this$props.visible,
          position = _this$props.position,
          vertical = _this$props.vertical,
          title = _this$props.title,
          prefixCls = _this$props.prefixCls;
      var tipStyle = {
        position: 'absolute'
      };

      if (position) {
        if (vertical) {
          tipStyle.top = position;
          tipStyle.height = 10;
          tipStyle.width = 5;
        } else {
          tipStyle.left = position - 5;
          tipStyle.width = 10;
          tipStyle.height = 5;
        }
      }

      return React.createElement(Tooltip, {
        title: title,
        visible: visible
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-all-handle"),
        style: tipStyle
      }));
    }
  }]);

  return Tip;
}(React.Component);

_defineProperty(Tip, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  position: PropTypes.number,
  vertical: PropTypes.bool,
  visible: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
});

export { Tip as default };