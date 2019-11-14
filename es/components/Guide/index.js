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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Driver from './src';
import { ESC_KEY_CODE, LEFT_KEY_CODE, RIGHT_KEY_CODE } from './src/common/constants';
import Modal from '../Modal/index.js';
import Button from '../Button/index.js';
import './index.less';

var Guide =
/*#__PURE__*/
function (_Component) {
  _inherits(Guide, _Component);

  function Guide(props) {
    var _this;

    _classCallCheck(this, Guide);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Guide).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "init", function () {
      var _this$props = _this.props,
          steps = _this$props.steps,
          mode = _this$props.mode;
      if (!(steps && steps.length) || mode == 'fixed') return;
      setTimeout(function () {
        if (steps.length == 1) {
          _this.driver.highlight(steps[0]);
        } else {
          _this.driver.defineSteps(_this.props.steps);

          _this.driver.start();
        }
      }, 300);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        visible: false
      }, function () {
        _this.setState({
          currentIndex: 0
        });
      });

      _this.props.onClose && _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleNext", function () {
      var currentIndex = _this.state.currentIndex,
          nextIndex = 0;

      if (currentIndex >= _this.totalCount - 1) {
        nextIndex = _this.totalCount - 1;

        _this.handleClose();
      } else {
        nextIndex = currentIndex + 1;
      }

      _this.setState({
        currentIndex: nextIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePrev", function () {
      var currentIndex = _this.state.currentIndex,
          nextIndex = 0;

      if (currentIndex <= 0) {
        nextIndex = 0;
      } else {
        nextIndex = currentIndex - 1;
      }

      _this.setState({
        currentIndex: nextIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderTitle", function (curStep) {
      if (!curStep.title) return null;

      if (curStep.subtitle) {
        return React.createElement(React.Fragment, null, curStep.title, React.createElement("div", {
          className: "".concat(_this.props.prefixCls, "-fixed-subtitle")
        }, curStep.subtitle));
      } else {
        return curStep.title;
      }
    });

    _this.state = {
      visible: props.visible,
      currentIndex: 0
    };
    _this.totalCount = props.steps.length;

    if (props.mode != 'fixed') {
      var opt = {
        prevBtnText: props.prevBtnText,
        nextBtnText: props.nextBtnText,
        doneBtnText: props.doneBtnText,
        skipBtnText: props.skipBtnText,
        counter: props.counter,
        allowClose: props.allowClose,
        keyboardControl: props.keyboardControl,
        onReset: function onReset(element) {
          _this.handleClose();
        }
      };

      if (!props.mask) {
        opt['opacity'] = 0;
      }

      _this.driver = new Driver(opt);
    } else {
      if (props.keyboardControl) {
        window.addEventListener('keyup', _this.onKeyUp.bind(_assertThisInitialized(_this)), false);
      }
    }

    return _this;
  }

  _createClass(Guide, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var visible = this.state.visible;
      if (!visible) return;
      this.init();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var visible = this.state.visible;

      if (!visible && nextProps.visible) {
        this.setState({
          visible: true
        }, function () {
          _this2.init();
        });
      }
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(event) {
      if (!this.props.keyboardControl || this.props.mode != 'fixed') return;

      if (event.keyCode === ESC_KEY_CODE) {
        this.handleClose();
        return;
      }

      if (event.keyCode === RIGHT_KEY_CODE) {
        this.handleNext();
      } else if (event.keyCode === LEFT_KEY_CODE) {
        this.handlePrev();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          allowClose = _this$props2.allowClose,
          mode = _this$props2.mode,
          mask = _this$props2.mask,
          className = _this$props2.className,
          style = _this$props2.style,
          steps = _this$props2.steps,
          prevBtnText = _this$props2.prevBtnText,
          nextBtnText = _this$props2.nextBtnText,
          doneBtnText = _this$props2.doneBtnText,
          skipBtnText = _this$props2.skipBtnText,
          _this$state = this.state,
          visible = _this$state.visible,
          currentIndex = _this$state.currentIndex,
          rootCls = classNames("".concat(prefixCls, "-fixed"), _defineProperty({}, className, className)),
          isFirstStep = currentIndex <= 0,
          isLastStep = currentIndex >= this.totalCount - 1;

      if (mode != 'fixed') {
        return null;
      }

      return React.createElement(Modal, {
        className: rootCls,
        style: _objectSpread({}, style),
        mask: mask,
        maskClosable: allowClose,
        title: this.renderTitle(steps[currentIndex]),
        visible: visible,
        width: 800,
        footer: React.createElement(React.Fragment, null, React.createElement("div", {
          key: "skip",
          className: "skip",
          onClick: this.handleClose
        }, skipBtnText), isFirstStep ? null : React.createElement(Button, {
          key: "prev",
          onClick: this.handlePrev
        }, prevBtnText), React.createElement(Button, {
          key: "next",
          type: "primary",
          onClick: this.handleNext
        }, isLastStep ? doneBtnText : nextBtnText, " (".concat(currentIndex + 1, "/").concat(steps.length, ")"))),
        onCancel: this.handleClose
      }, steps[currentIndex].content);
    }
  }]);

  return Guide;
}(Component);

_defineProperty(Guide, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  mode: PropTypes.string,
  prevBtnText: PropTypes.string,
  nextBtnText: PropTypes.string,
  doneBtnText: PropTypes.string,
  skipBtnText: PropTypes.string,
  steps: PropTypes.array.isRequired,
  visible: PropTypes.bool,
  counter: PropTypes.bool,
  mask: PropTypes.bool,
  allowClose: PropTypes.bool,
  keyboardControl: PropTypes.bool,
  onClose: PropTypes.func
});

_defineProperty(Guide, "defaultProps", {
  prefixCls: 'fishd-guide',
  mode: 'normal',
  prevBtnText: '上一步',
  nextBtnText: '下一步',
  doneBtnText: '知道了',
  skipBtnText: '跳过',
  allowClose: false,
  keyboardControl: false,
  visible: false,
  counter: true,
  mask: true,
  steps: []
});

export default Guide;