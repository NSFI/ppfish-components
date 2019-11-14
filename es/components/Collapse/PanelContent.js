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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var PanelContent =
/*#__PURE__*/
function (_Component) {
  _inherits(PanelContent, _Component);

  function PanelContent(props) {
    _classCallCheck(this, PanelContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(PanelContent).call(this, props));
  }

  _createClass(PanelContent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.isActive || nextProps.isActive;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      this._isActived = this._isActived || this.props.isActive;

      if (!this._isActived) {
        return null;
      }

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          isActive = _this$props.isActive,
          children = _this$props.children;
      var contentCls = classnames((_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-content"), true), _defineProperty(_classnames, "".concat(prefixCls, "-content-active"), isActive), _defineProperty(_classnames, "".concat(prefixCls, "-content-inactive"), !isActive), _classnames));
      return React.createElement("div", {
        className: contentCls,
        role: "tabpanel"
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-content-box")
      }, children));
    }
  }]);

  return PanelContent;
}(Component);

_defineProperty(PanelContent, "propTypes", {
  prefixCls: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.node
});

export default PanelContent;