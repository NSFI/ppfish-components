function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint react/no-did-mount-set-state: 0 */
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { isFlexSupported } from './utils';
import './assets/index.less';

var Steps =
/*#__PURE__*/
function (_Component) {
  _inherits(Steps, _Component);

  function Steps(props) {
    var _this;

    _classCallCheck(this, Steps);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Steps).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "calcStepOffsetWidth", function () {
      if (isFlexSupported()) {
        return;
      } // Just for IE9


      var domNode = findDOMNode(_assertThisInitialized(_this));

      if (domNode.children.length > 0) {
        if (_this.calcTimeout) {
          clearTimeout(_this.calcTimeout);
        }

        _this.calcTimeout = setTimeout(function () {
          // +1 for fit edge bug of digit width, like 35.4px
          var lastStepOffsetWidth = (domNode.lastChild.offsetWidth || 0) + 1; // Reduce shake bug

          if (_this.state.lastStepOffsetWidth === lastStepOffsetWidth || Math.abs(_this.state.lastStepOffsetWidth - lastStepOffsetWidth) <= 3) {
            return;
          }

          _this.setState({
            lastStepOffsetWidth: lastStepOffsetWidth
          });
        });
      }
    });

    _this.state = {
      flexSupported: true,
      lastStepOffsetWidth: 0
    };
    _this.calcStepOffsetWidth = debounce(_this.calcStepOffsetWidth, 150);
    return _this;
  }

  _createClass(Steps, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.calcStepOffsetWidth();

      if (!isFlexSupported()) {
        this.setState({
          flexSupported: false
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.calcStepOffsetWidth();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.calcTimeout) {
        clearTimeout(this.calcTimeout);
      }

      if (this.calcStepOffsetWidth && this.calcStepOffsetWidth.cancel) {
        this.calcStepOffsetWidth.cancel();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          className = _this$props.className,
          children = _this$props.children,
          direction = _this$props.direction,
          labelPlacement = _this$props.labelPlacement,
          iconPrefix = _this$props.iconPrefix,
          status = _this$props.status,
          size = _this$props.size,
          current = _this$props.current,
          progressDot = _this$props.progressDot,
          initial = _this$props.initial,
          icons = _this$props.icons,
          restProps = _objectWithoutProperties(_this$props, ["prefixCls", "style", "className", "children", "direction", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot", "initial", "icons"]);

      var _this$state = this.state,
          lastStepOffsetWidth = _this$state.lastStepOffsetWidth,
          flexSupported = _this$state.flexSupported;
      var filteredChildren = React.Children.toArray(children).filter(function (c) {
        return !!c;
      });
      var lastIndex = filteredChildren.length - 1;
      var adjustedlabelPlacement = progressDot ? 'vertical' : labelPlacement;
      var classString = classNames(prefixCls, "".concat(prefixCls, "-").concat(direction), className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size), _defineProperty(_classNames, "".concat(prefixCls, "-label-").concat(adjustedlabelPlacement), direction === 'horizontal'), _defineProperty(_classNames, "".concat(prefixCls, "-dot"), !!progressDot), _classNames));
      return React.createElement("div", _extends({
        className: classString,
        style: style
      }, restProps), Children.map(filteredChildren, function (child, index) {
        if (!child) {
          return null;
        }

        var stepNumber = initial + index;

        var childProps = _objectSpread({
          stepNumber: "".concat(stepNumber + 1),
          prefixCls: prefixCls,
          iconPrefix: iconPrefix,
          wrapperStyle: style,
          progressDot: progressDot,
          icons: icons
        }, child.props);

        if (!flexSupported && direction !== 'vertical' && index !== lastIndex) {
          childProps.itemWidth = "".concat(100 / lastIndex, "%");
          childProps.adjustMarginRight = -Math.round(lastStepOffsetWidth / lastIndex + 1);
        } // fix tail color


        if (status === 'error' && index === current - 1) {
          childProps.className = "".concat(prefixCls, "-next-error");
        }

        if (!child.props.status) {
          if (stepNumber === current) {
            childProps.status = status;
          } else if (stepNumber < current) {
            childProps.status = 'finish';
          } else {
            childProps.status = 'wait';
          }
        }

        return cloneElement(child, childProps);
      }));
    }
  }]);

  return Steps;
}(Component);

_defineProperty(Steps, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  iconPrefix: PropTypes.string,
  direction: PropTypes.string,
  labelPlacement: PropTypes.string,
  children: PropTypes.node,
  status: PropTypes.string,
  size: PropTypes.string,
  progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  style: PropTypes.object,
  initial: PropTypes.number,
  current: PropTypes.number,
  icons: PropTypes.shape({
    finish: PropTypes.node,
    error: PropTypes.node
  })
});

_defineProperty(Steps, "defaultProps", {
  prefixCls: 'fishd-steps',
  iconPrefix: 'fishd',
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  initial: 0,
  current: 0,
  status: 'process',
  size: '',
  progressDot: false
});

export { Steps as default };