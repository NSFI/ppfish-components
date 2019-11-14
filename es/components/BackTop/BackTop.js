var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

import * as React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import { getScroll, addEventListener } from '../../utils';
import raf from 'raf';

var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;

  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

function noop() {}

function getDefaultTarget() {
  return window;
}

var BackTop =
/** @class */
function (_super) {
  __extends(BackTop, _super);

  function BackTop(props) {
    var _this = _super.call(this, props) || this;

    _this.getCurrentScrollTop = function () {
      var getTarget = _this.props.target || getDefaultTarget;
      var targetNode = getTarget();

      if (targetNode === window) {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      }

      return targetNode.scrollTop;
    };

    _this.scrollToTop = function (e) {
      var scrollTop = _this.getCurrentScrollTop();

      var startTime = Date.now();

      var frameFunc = function frameFunc() {
        var timestamp = Date.now();
        var time = timestamp - startTime;

        _this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));

        if (time < 450) {
          raf(frameFunc);
        }
      };

      raf(frameFunc);
      (_this.props.onClick || noop)(e);
    };

    _this.handleScroll = function () {
      var _a = _this.props,
          visibilityHeight = _a.visibilityHeight,
          _b = _a.target,
          target = _b === void 0 ? getDefaultTarget : _b;
      var scrollTop = getScroll(target(), true);

      _this.setState({
        visible: scrollTop > visibilityHeight
      });
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  BackTop.prototype.setScrollTop = function (value) {
    var getTarget = this.props.target || getDefaultTarget;
    var targetNode = getTarget();

    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    } else {
      targetNode.scrollTop = value;
    }
  };

  BackTop.prototype.componentDidMount = function () {
    var getTarget = this.props.target || getDefaultTarget;
    this.scrollEvent = addEventListener(getTarget(), 'scroll', this.handleScroll);
    this.handleScroll();
  };

  BackTop.prototype.componentWillUnmount = function () {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  };

  BackTop.prototype.render = function () {
    var _a = this.props,
        _b = _a.prefixCls,
        prefixCls = _b === void 0 ? 'fishd-back-top' : _b,
        _c = _a.className,
        className = _c === void 0 ? '' : _c,
        children = _a.children;
    var classString = classNames(prefixCls, className);
    var defaultElement = React.createElement("div", {
      className: prefixCls + "-content"
    }, React.createElement("div", {
      className: prefixCls + "-icon"
    })); // fix https://fb.me/react-unknown-prop

    var divProps = omit(this.props, ['prefixCls', 'className', 'children', 'visibilityHeight', 'target']);
    var backTopBtn = this.state.visible ? React.createElement("div", __assign({}, divProps, {
      className: classString,
      onClick: this.scrollToTop
    }), children || defaultElement) : null;
    return React.createElement(Animate, {
      component: "",
      transitionName: "fade"
    }, backTopBtn);
  };

  BackTop.defaultProps = {
    visibilityHeight: 400
  };
  return BackTop;
}(React.Component);

export default BackTop;