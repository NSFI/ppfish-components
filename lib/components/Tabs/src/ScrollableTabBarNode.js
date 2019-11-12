"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames5 = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var _index = require("../../../utils/dom/index.js");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScrollableTabBarNode =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ScrollableTabBarNode, _React$Component);

  function ScrollableTabBarNode(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "prevTransitionEnd", function (e) {
      if (e.propertyName !== 'opacity') {
        return;
      }

      var container = _this.props.getRef('container');

      _this.scrollToActiveTab({
        target: container,
        currentTarget: container
      });
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToActiveTab", function (e) {
      var activeTab = _this.props.getRef('activeTab');

      var navWrap = _this.props.getRef('navWrap');

      if (e && e.target !== e.currentTarget || !activeTab) {
        return;
      } // when not scrollable or enter scrollable first time, don't emit scrolling


      var needToSroll = _this.isNextPrevShown() && _this.lastNextPrevShown;

      _this.lastNextPrevShown = _this.isNextPrevShown();

      if (!needToSroll) {
        return;
      }

      var activeTabWH = _this.getScrollWH(activeTab);

      var navWrapNodeWH = _this.getOffsetWH(navWrap);

      var _assertThisInitialize = _assertThisInitialized(_this),
          offset = _assertThisInitialize.offset;

      var wrapOffset = _this.getOffsetLT(navWrap);

      var activeTabOffset = _this.getOffsetLT(activeTab);

      if (wrapOffset > activeTabOffset) {
        offset += wrapOffset - activeTabOffset;

        _this.setOffset(offset);
      } else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
        offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);

        _this.setOffset(offset);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "prev", function (e) {
      _this.props.onPrevClick(e);

      var navWrapNode = _this.props.getRef('navWrap');

      var navWrapNodeWH = _this.getOffsetWH(navWrapNode);

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          offset = _assertThisInitialize2.offset;

      _this.setOffset(offset + navWrapNodeWH);
    });

    _defineProperty(_assertThisInitialized(_this), "next", function (e) {
      _this.props.onNextClick(e);

      var navWrapNode = _this.props.getRef('navWrap');

      var navWrapNodeWH = _this.getOffsetWH(navWrapNode);

      var _assertThisInitialize3 = _assertThisInitialized(_this),
          offset = _assertThisInitialize3.offset;

      _this.setOffset(offset - navWrapNodeWH);
    });

    _this.offset = 0;
    _this.state = {
      next: false,
      prev: false
    };
    return _this;
  }

  var _proto = ScrollableTabBarNode.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.componentDidUpdate();
    this.debouncedResize = (0, _debounce.default)(function () {
      _this2.setNextPrev();

      _this2.scrollToActiveTab();
    }, 200);
    this.resizeEvent = (0, _index.addEventListener)(window, 'resize', this.debouncedResize);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var props = this.props;

    if (prevProps && prevProps.tabBarPosition !== props.tabBarPosition) {
      this.setOffset(0);
      return;
    }

    var nextPrev = this.setNextPrev(); // wait next, prev show hide

    /* eslint react/no-did-update-set-state:0 */

    if (this.isNextPrevShown(this.state) !== this.isNextPrevShown(nextPrev)) {
      this.setState({}, this.scrollToActiveTab);
    } else if (!prevProps || props.activeKey !== prevProps.activeKey) {
      // can not use props.activeKey
      this.scrollToActiveTab();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }

    if (this.debouncedResize && this.debouncedResize.cancel) {
      this.debouncedResize.cancel();
    }
  };

  _proto.setNextPrev = function setNextPrev() {
    var navNode = this.props.getRef('nav');
    var navNodeWH = this.getScrollWH(navNode);
    var containerWH = this.getOffsetWH(this.props.getRef('container'));
    var navWrapNodeWH = this.getOffsetWH(this.props.getRef('navWrap'));
    var offset = this.offset;
    var minOffset = containerWH - navNodeWH;
    var _this$state = this.state,
        next = _this$state.next,
        prev = _this$state.prev;

    if (minOffset >= 0) {
      next = false;
      this.setOffset(0, false);
      offset = 0;
    } else if (minOffset < offset) {
      next = true;
    } else {
      next = false; // Fix https://github.com/ant-design/ant-design/issues/8861
      // Test with container offset which is stable
      // and set the offset of the nav wrap node

      var realOffset = navWrapNodeWH - navNodeWH;
      this.setOffset(realOffset, false);
      offset = realOffset;
    }

    if (offset < 0) {
      prev = true;
    } else {
      prev = false;
    }

    this.setNext(next);
    this.setPrev(prev);
    return {
      next: next,
      prev: prev
    };
  };

  _proto.getOffsetWH = function getOffsetWH(node) {
    var tabBarPosition = this.props.tabBarPosition;
    var prop = 'offsetWidth';

    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'offsetHeight';
    }

    return node[prop];
  };

  _proto.getScrollWH = function getScrollWH(node) {
    var tabBarPosition = this.props.tabBarPosition;
    var prop = 'scrollWidth';

    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'scrollHeight';
    }

    return node[prop];
  };

  _proto.getOffsetLT = function getOffsetLT(node) {
    var tabBarPosition = this.props.tabBarPosition;
    var prop = 'left';

    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'top';
    }

    return node.getBoundingClientRect()[prop];
  };

  _proto.setOffset = function setOffset(offset, checkNextPrev) {
    if (checkNextPrev === void 0) {
      checkNextPrev = true;
    }

    var target = Math.min(0, offset);

    if (this.offset !== target) {
      this.offset = target;
      var navOffset = {};
      var tabBarPosition = this.props.tabBarPosition;
      var navStyle = this.props.getRef('nav').style;
      var transformSupported = (0, _utils.isTransformSupported)(navStyle);

      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
        if (transformSupported) {
          navOffset = {
            value: "translate3d(0," + target + "px,0)"
          };
        } else {
          navOffset = {
            name: 'top',
            value: target + "px"
          };
        }
      } else {
        if (transformSupported) {
          navOffset = {
            value: "translate3d(" + target + "px,0,0)"
          };
        } else {
          navOffset = {
            name: 'left',
            value: target + "px"
          };
        }
      }

      if (transformSupported) {
        (0, _utils.setTransform)(navStyle, navOffset.value);
      } else {
        navStyle[navOffset.name] = navOffset.value;
      }

      if (checkNextPrev) {
        this.setNextPrev();
      }
    }
  };

  _proto.setPrev = function setPrev(v) {
    if (this.state.prev !== v) {
      this.setState({
        prev: v
      });
    }
  };

  _proto.setNext = function setNext(v) {
    if (this.state.next !== v) {
      this.setState({
        next: v
      });
    }
  };

  _proto.isNextPrevShown = function isNextPrevShown(state) {
    if (state) {
      return state.next || state.prev;
    }

    return this.state.next || this.state.prev;
  };

  _proto.render = function render() {
    var _classnames, _classnames2, _classnames3, _classnames4;

    var _this$state2 = this.state,
        next = _this$state2.next,
        prev = _this$state2.prev;
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        scrollAnimated = _this$props.scrollAnimated,
        navWrapper = _this$props.navWrapper;
    var showNextPrev = prev || next;

    var prevButton = _react.default.createElement("span", {
      onClick: prev ? this.prev : null,
      unselectable: "unselectable",
      className: (0, _classnames5.default)((_classnames = {}, _classnames[prefixCls + "-tab-prev"] = 1, _classnames[prefixCls + "-tab-btn-disabled"] = !prev, _classnames[prefixCls + "-tab-arrow-show"] = showNextPrev, _classnames)),
      onTransitionEnd: this.prevTransitionEnd
    }, _react.default.createElement("span", {
      className: prefixCls + "-tab-prev-icon"
    }));

    var nextButton = _react.default.createElement("span", {
      onClick: next ? this.next : null,
      unselectable: "unselectable",
      className: (0, _classnames5.default)((_classnames2 = {}, _classnames2[prefixCls + "-tab-next"] = 1, _classnames2[prefixCls + "-tab-btn-disabled"] = !next, _classnames2[prefixCls + "-tab-arrow-show"] = showNextPrev, _classnames2))
    }, _react.default.createElement("span", {
      className: prefixCls + "-tab-next-icon"
    }));

    var navClassName = prefixCls + "-nav";
    var navClasses = (0, _classnames5.default)((_classnames3 = {}, _classnames3[navClassName] = true, _classnames3[scrollAnimated ? navClassName + "-animated" : navClassName + "-no-animated"] = true, _classnames3));
    return _react.default.createElement("div", {
      className: (0, _classnames5.default)((_classnames4 = {}, _classnames4[prefixCls + "-nav-container"] = 1, _classnames4[prefixCls + "-nav-container-scrolling"] = showNextPrev, _classnames4)),
      key: "container",
      ref: this.props.saveRef('container')
    }, prevButton, nextButton, _react.default.createElement("div", {
      className: prefixCls + "-nav-wrap",
      ref: this.props.saveRef('navWrap')
    }, _react.default.createElement("div", {
      className: prefixCls + "-nav-scroll"
    }, _react.default.createElement("div", {
      className: navClasses,
      ref: this.props.saveRef('nav')
    }, navWrapper(this.props.children)))));
  };

  return ScrollableTabBarNode;
}(_react.default.Component);

exports.default = ScrollableTabBarNode;
ScrollableTabBarNode.propTypes = {
  getRef: _propTypes.default.func.isRequired,
  saveRef: _propTypes.default.func.isRequired,
  tabBarPosition: _propTypes.default.oneOf(['left', 'right', 'top', 'bottom']),
  prefixCls: _propTypes.default.string,
  scrollAnimated: _propTypes.default.bool,
  onPrevClick: _propTypes.default.func,
  onNextClick: _propTypes.default.func,
  navWrapper: _propTypes.default.func,
  children: _propTypes.default.node
};
ScrollableTabBarNode.defaultProps = {
  tabBarPosition: 'left',
  prefixCls: '',
  scrollAnimated: true,
  onPrevClick: function onPrevClick() {},
  onNextClick: function onNextClick() {},
  navWrapper: function navWrapper(ele) {
    return ele;
  }
};