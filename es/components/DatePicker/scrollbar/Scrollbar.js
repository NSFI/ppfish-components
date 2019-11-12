"use strict";

exports.__esModule = true;
exports.Scrollbar = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _resizeEvent = require("../libs/utils/resize-event");

var _scrollarWidth = require("./scrollar-width");

var _Bar = require("./Bar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Scrollbar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Scrollbar, _React$Component);

  function Scrollbar(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };
    _this.update = _this._update.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Scrollbar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.native) return;
    var rafId = requestAnimationFrame(this.update);

    this.cleanRAF = function () {
      cancelAnimationFrame(rafId);
    };
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    this.resizeDom = _reactDom.default.findDOMNode(this.refs.resize);

    if (!this.props.noresize) {
      (0, _resizeEvent.addResizeListener)(this.resizeDom, this.update);

      this.cleanResize = function () {
        (0, _resizeEvent.removeResizeListener)(_this2.resizeDom, _this2.update);
      };
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cleanRAF();
    this.cleanResize && this.cleanResize();
  };

  _proto.handleScroll = function handleScroll() {
    var wrap = this.wrap;
    this.setState({
      moveY: wrap.scrollTop * 100 / wrap.clientHeight,
      moveX: wrap.scrollLeft * 100 / wrap.clientWidth
    });
  };

  _proto._update = function _update() {
    var heightPercentage, widthPercentage;
    var wrap = this.wrap;
    if (!wrap) return;
    heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
    widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;
    var sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
    var sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';
    this.setState({
      sizeHeight: sizeHeight,
      sizeWidth: sizeWidth
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    /* eslint-disable */
    var _this$props = this.props,
        native = _this$props.native,
        viewStyle = _this$props.viewStyle,
        wrapStyle = _this$props.wrapStyle,
        viewClass = _this$props.viewClass,
        children = _this$props.children,
        viewComponent = _this$props.viewComponent,
        wrapClass = _this$props.wrapClass,
        noresize = _this$props.noresize,
        className = _this$props.className,
        prefixCls = _this$props.prefixCls,
        others = _objectWithoutPropertiesLoose(_this$props, ["native", "viewStyle", "wrapStyle", "viewClass", "children", "viewComponent", "wrapClass", "noresize", "className", "prefixCls"]);

    var _this$state = this.state,
        moveX = _this$state.moveX,
        moveY = _this$state.moveY,
        sizeWidth = _this$state.sizeWidth,
        sizeHeight = _this$state.sizeHeight;
    /* eslint-enable */

    var style = wrapStyle;
    var gutter = (0, _scrollarWidth.getScrollBarWidth)();

    if (gutter) {
      var gutterWith = "-" + gutter + "px";

      if (Array.isArray(wrapStyle)) {
        style = Object.assign.apply(null, [].concat(wrapStyle, [{
          marginRight: gutterWith,
          marginBottom: gutterWith
        }]));
      } else {
        style = Object.assign({}, wrapStyle, {
          marginRight: gutterWith,
          marginBottom: gutterWith
        });
      }
    }

    var view = _react.default.createElement(viewComponent, {
      className: (0, _classnames.default)(prefixCls + "-scrollbar__view", viewClass),
      style: viewStyle,
      ref: 'resize'
    }, children);

    var nodes;

    if (!native) {
      var wrap = _react.default.createElement("div", _extends({}, others, {
        ref: "wrap",
        key: 0,
        style: style,
        onScroll: this.handleScroll.bind(this),
        className: (0, _classnames.default)(wrapClass, prefixCls + "-scrollbar__wrap", gutter ? '' : prefixCls + "-scrollbar__wrap--hidden-default")
      }), view);

      nodes = [wrap, _react.default.createElement(_Bar.Bar, {
        key: 1,
        move: moveX,
        size: sizeWidth,
        getParentWrap: function getParentWrap() {
          return _this3.wrap;
        }
      }), _react.default.createElement(_Bar.Bar, {
        key: 2,
        move: moveY,
        size: sizeHeight,
        getParentWrap: function getParentWrap() {
          return _this3.wrap;
        },
        vertical: true
      })];
    } else {
      nodes = [_react.default.createElement("div", _extends({}, others, {
        key: 0,
        ref: "wrap",
        className: (0, _classnames.default)(wrapClass, prefixCls + "-scrollbar__wrap"),
        style: style
      }), view)];
    }

    return _react.default.createElement('div', {
      className: (0, _classnames.default)(prefixCls + "-scrollbar", className)
    }, nodes);
  };

  _createClass(Scrollbar, [{
    key: "wrap",
    get: function get() {
      return this.refs.wrap;
    }
  }]);

  return Scrollbar;
}(_react.default.Component);

exports.Scrollbar = Scrollbar;
Scrollbar.propTypes = {
  native: _propTypes.default.bool,
  wrapStyle: _propTypes.default.object,
  wrapClass: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  viewClass: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  viewStyle: _propTypes.default.object,
  className: _propTypes.default.string,
  viewComponent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  noresize: _propTypes.default.bool,
  prefixCls: _propTypes.default.string
};
Scrollbar.defaultProps = {
  viewComponent: 'div',
  prefixCls: 'fishd'
};