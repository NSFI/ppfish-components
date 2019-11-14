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

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

var Notice =
/*#__PURE__*/
function (_Component) {
  _inherits(Notice, _Component);

  function Notice() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Notice);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Notice)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      _this.clearCloseTimer();

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "startCloseTimer", function () {
      if (_this.props.duration) {
        _this.closeTimer = setTimeout(function () {
          _this.close();
        }, _this.props.duration * 1000);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearCloseTimer", function () {
      if (_this.closeTimer) {
        clearTimeout(_this.closeTimer);
        _this.closeTimer = null;
      }
    });

    return _this;
  }

  _createClass(Notice, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startCloseTimer();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.duration !== prevProps.duration || this.props.update) {
        this.restartCloseTimer();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearCloseTimer();
    }
  }, {
    key: "restartCloseTimer",
    value: function restartCloseTimer() {
      this.clearCloseTimer();
      this.startCloseTimer();
    }
  }, {
    key: "render",
    value: function render() {
      var _className;

      var props = this.props;
      var componentClass = "".concat(props.prefixCls, "-notice");
      var className = (_className = {}, _defineProperty(_className, "".concat(componentClass), 1), _defineProperty(_className, "".concat(componentClass, "-closable"), props.closable), _defineProperty(_className, props.className, !!props.className), _className);
      return React.createElement("div", {
        className: classNames(className),
        style: props.style,
        onMouseEnter: this.clearCloseTimer,
        onMouseLeave: this.startCloseTimer
      }, React.createElement("div", {
        className: "".concat(componentClass, "-content")
      }, props.children), props.closable ? React.createElement("a", {
        tabIndex: "0",
        onClick: this.close,
        className: "".concat(componentClass, "-close")
      }, props.closeIcon || React.createElement("span", {
        className: "".concat(componentClass, "-close-x")
      })) : null);
    }
  }]);

  return Notice;
}(Component);

_defineProperty(Notice, "propTypes", {
  duration: PropTypes.number,
  onClose: PropTypes.func,
  children: PropTypes.node,
  update: PropTypes.bool,
  closeIcon: PropTypes.node
});

_defineProperty(Notice, "defaultProps", {
  onEnd: function onEnd() {},
  onClose: function onClose() {},
  duration: 1.5,
  style: {
    right: '50%'
  }
});

export { Notice as default };