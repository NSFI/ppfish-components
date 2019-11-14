function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
import classNames from 'classnames';
import { addEventListener } from '../../utils';

var FooterToolbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FooterToolbar, _React$Component);

  function FooterToolbar(props) {
    var _this;

    _classCallCheck(this, FooterToolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FooterToolbar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "setToolbarPosition", function () {
      var target = _this.props.target;

      var _getComputedStyle = getComputedStyle(_this.wrapper),
          height = _getComputedStyle.height;

      var wrapperHeight = Number.parseInt(height);
      var targetElement = document.documentElement;

      if (target && typeof target === 'function' && target() !== window) {
        targetElement = target();
      }

      var offsetObj = {
        containerHeight: targetElement.clientHeight,
        containerScrollTop: targetElement.scrollTop
      };
      var offset = offsetObj.containerHeight + offsetObj.containerScrollTop - wrapperHeight;
      var maxOffset = targetElement.scrollHeight - wrapperHeight;

      _this.setState({
        offset: offset > maxOffset ? maxOffset : offset
      });
    });

    _this.state = {
      offset: 0
    };
    return _this;
  }

  _createClass(FooterToolbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setToolbarPosition();
      var target = this.props.target && this.props.target() || window;
      this.scrollListener = addEventListener(target, 'scroll', function () {
        _this2.setToolbarPosition();
      });
      this.resizeListener = addEventListener(target, 'resize', function () {
        _this2.setToolbarPosition();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.scrollListener) {
        this.scrollListener.remove();
      }

      if (this.resizeListener) {
        this.resizeListener.remove();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames,
          _this3 = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          prefixCls = _this$props.prefixCls,
          style = _this$props.style;

      var toolbarStyle = _objectSpread({}, style, {
        position: 'absolute',
        top: this.state.offset
      });

      return React.createElement("div", {
        className: classNames((_classNames = {}, _defineProperty(_classNames, className, true), _defineProperty(_classNames, prefixCls, true), _classNames)),
        style: toolbarStyle,
        ref: function ref(wrapper) {
          _this3.wrapper = wrapper;
        }
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-inner")
      }, children));
    }
  }]);

  return FooterToolbar;
}(React.Component);

_defineProperty(FooterToolbar, "defaultProps", {
  children: null,
  className: '',
  prefixCls: 'fishd-footer-toolbar'
});

_defineProperty(FooterToolbar, "propTypes", {
  children: PropTypes.node,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  target: PropTypes.func,
  style: PropTypes.object
});

export default FooterToolbar;