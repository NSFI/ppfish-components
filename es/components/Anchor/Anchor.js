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
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Affix from '../Affix';
import { getScroll, addEventListener } from '../../utils';
import raf from 'raf';

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element, container) {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  var rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }

    return rect.top - container.getBoundingClientRect().top;
  }

  return rect.top;
}

function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;

  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }

  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}

var sharpMatcherRegx = /#([^#]+)$/;

function scrollTo(href, offsetTop, getContainer, callback) {
  if (offsetTop === void 0) {
    offsetTop = 0;
  }

  if (callback === void 0) {
    callback = function callback() {};
  }

  var container = getContainer();
  var scrollTop = getScroll(container, true);
  var sharpLinkMatch = sharpMatcherRegx.exec(href);

  if (!sharpLinkMatch) {
    return;
  }

  var targetElement = document.getElementById(sharpLinkMatch[1]);

  if (!targetElement) {
    return;
  }

  var eleOffsetTop = getOffsetTop(targetElement, container);
  var targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
  var startTime = Date.now();

  var frameFunc = function frameFunc() {
    var timestamp = Date.now();
    var time = timestamp - startTime;
    var nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);

    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      container.scrollTop = nextScrollTop;
    }

    if (time < 450) {
      raf(frameFunc);
    } else {
      callback();
    }
  };

  raf(frameFunc);
}

var Anchor =
/** @class */
function (_super) {
  __extends(Anchor, _super);

  function Anchor() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      activeLink: null
    };
    _this.links = [];

    _this.handleScroll = function () {
      if (_this.animating) {
        return;
      }

      var _a = _this.props,
          offsetTop = _a.offsetTop,
          bounds = _a.bounds;

      _this.setState({
        activeLink: _this.getCurrentAnchor(offsetTop, bounds)
      });
    };

    _this.handleScrollTo = function (link) {
      var _a = _this.props,
          offsetTop = _a.offsetTop,
          getContainer = _a.getContainer;
      _this.animating = true;

      _this.setState({
        activeLink: link
      });

      scrollTo(link, offsetTop, getContainer, function () {
        _this.animating = false;
      });
    };

    _this.updateInk = function () {
      if (typeof document === 'undefined') {
        return;
      }

      var prefixCls = _this.props.prefixCls;
      var anchorNode = ReactDOM.findDOMNode(_this);
      var activeLinkNode = anchorNode.getElementsByClassName(prefixCls + "-link-active")[0];

      if (activeLinkNode) {
        _this.inkNode.style.top = activeLinkNode.offsetTop + "px";
        _this.inkNode.style.height = activeLinkNode.offsetHeight + "px";
      }
    };

    _this.saveInkNode = function (node) {
      _this.inkNode = node;
    };

    return _this;
  }

  Anchor.prototype.getChildContext = function () {
    var _this = this;

    var fishdAnchor = {
      registerLink: function registerLink(link) {
        if (!_this.links.includes(link)) {
          _this.links.push(link);
        }
      },
      unregisterLink: function unregisterLink(link) {
        var index = _this.links.indexOf(link);

        if (index !== -1) {
          _this.links.splice(index, 1);
        }
      },
      activeLink: this.state.activeLink,
      scrollTo: this.handleScrollTo,
      onClick: this.props.onClick
    };
    return {
      fishdAnchor: fishdAnchor
    };
  };

  Anchor.prototype.componentDidMount = function () {
    var getContainer = this.props.getContainer;
    this.scrollEvent = addEventListener(getContainer(), 'scroll', this.handleScroll);
    this.handleScroll();
  };

  Anchor.prototype.componentWillUnmount = function () {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  };

  Anchor.prototype.componentDidUpdate = function () {
    this.updateInk();
  };

  Anchor.prototype.getCurrentAnchor = function (offsetTop, bounds) {
    if (offsetTop === void 0) {
      offsetTop = 0;
    }

    if (bounds === void 0) {
      bounds = 5;
    }

    var activeLink = '';

    if (typeof document === 'undefined') {
      return activeLink;
    }

    var linkSections = [];
    var getContainer = this.props.getContainer;
    var container = getContainer();
    this.links.forEach(function (link) {
      var sharpLinkMatch = sharpMatcherRegx.exec(link.toString());

      if (!sharpLinkMatch) {
        return;
      }

      var target = document.getElementById(sharpLinkMatch[1]);

      if (target) {
        var top_1 = getOffsetTop(target, container);

        if (top_1 < offsetTop + bounds) {
          linkSections.push({
            link: link,
            top: top_1
          });
        }
      }
    });

    if (linkSections.length) {
      var maxSection = linkSections.reduce(function (prev, curr) {
        return curr.top > prev.top ? curr : prev;
      });
      return maxSection.link;
    }

    return '';
  };

  Anchor.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        _c = _b.className,
        className = _c === void 0 ? '' : _c,
        style = _b.style,
        offsetTop = _b.offsetTop,
        affix = _b.affix,
        showInkInFixed = _b.showInkInFixed,
        children = _b.children,
        getContainer = _b.getContainer,
        inkPosition = _b.inkPosition;
    var activeLink = this.state.activeLink;
    var inkClass = classNames(prefixCls + "-ink-ball", {
      visible: activeLink,
      left: inkPosition === 'left',
      right: inkPosition === 'right'
    });
    var wrapperClass = classNames(className, prefixCls + "-wrapper");
    var anchorClass = classNames(prefixCls, {
      'fixed': !affix && !showInkInFixed
    });

    var wrapperStyle = __assign({
      maxHeight: offsetTop ? "calc(100vh - " + offsetTop + "px)" : '100vh'
    }, style);

    var inkNodeClass = classNames((_a = {}, _a[prefixCls + "-ink"] = true, _a[prefixCls + "-ink-left"] = inkPosition === 'left', _a[prefixCls + "-ink-right"] = inkPosition === 'right', _a));
    var anchorContent = React.createElement("div", {
      className: wrapperClass,
      style: wrapperStyle
    }, React.createElement("div", {
      className: anchorClass
    }, React.createElement("div", {
      className: inkNodeClass
    }, React.createElement("span", {
      className: inkClass,
      ref: this.saveInkNode
    })), children));
    return !affix ? anchorContent : React.createElement(Affix, {
      offsetTop: offsetTop,
      target: getContainer
    }, anchorContent);
  };

  Anchor.defaultProps = {
    prefixCls: 'fishd-anchor',
    inkPosition: 'left',
    affix: true,
    showInkInFixed: false,
    getContainer: getDefaultContainer
  };
  Anchor.childContextTypes = {
    fishdAnchor: PropTypes.object
  };
  return Anchor;
}(React.Component);

export default Anchor;