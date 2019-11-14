function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { addResizeListener, removeResizeListener } from '../libs/utils/resize-event';
import { getScrollBarWidth } from './scrollar-width';
import { Bar } from './Bar';
export var Scrollbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Scrollbar, _React$Component);

  function Scrollbar(props) {
    var _this;

    _classCallCheck(this, Scrollbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scrollbar).call(this, props));
    _this.state = {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };
    _this.update = _this._update.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Scrollbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this["native"]) return;
      var rafId = requestAnimationFrame(this.update);

      this.cleanRAF = function () {
        cancelAnimationFrame(rafId);
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      this.resizeDom = ReactDOM.findDOMNode(this.refs.resize);

      if (!this.props.noresize) {
        addResizeListener(this.resizeDom, this.update);

        this.cleanResize = function () {
          removeResizeListener(_this2.resizeDom, _this2.update);
        };
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanRAF();
      this.cleanResize && this.cleanResize();
    }
  }, {
    key: "handleScroll",
    value: function handleScroll() {
      var wrap = this.wrap;
      this.setState({
        moveY: wrap.scrollTop * 100 / wrap.clientHeight,
        moveX: wrap.scrollLeft * 100 / wrap.clientWidth
      });
    }
  }, {
    key: "_update",
    value: function _update() {
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      /* eslint-disable */
      var _this$props = this.props,
          _native = _this$props["native"],
          viewStyle = _this$props.viewStyle,
          wrapStyle = _this$props.wrapStyle,
          viewClass = _this$props.viewClass,
          children = _this$props.children,
          viewComponent = _this$props.viewComponent,
          wrapClass = _this$props.wrapClass,
          noresize = _this$props.noresize,
          className = _this$props.className,
          prefixCls = _this$props.prefixCls,
          others = _objectWithoutProperties(_this$props, ["native", "viewStyle", "wrapStyle", "viewClass", "children", "viewComponent", "wrapClass", "noresize", "className", "prefixCls"]);

      var _this$state = this.state,
          moveX = _this$state.moveX,
          moveY = _this$state.moveY,
          sizeWidth = _this$state.sizeWidth,
          sizeHeight = _this$state.sizeHeight;
      /* eslint-enable */

      var style = wrapStyle;
      var gutter = getScrollBarWidth();

      if (gutter) {
        var gutterWith = "-".concat(gutter, "px");

        if (Array.isArray(wrapStyle)) {
          style = Object.assign.apply(null, [].concat(_toConsumableArray(wrapStyle), [{
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

      var view = React.createElement(viewComponent, {
        className: classNames("".concat(prefixCls, "-scrollbar__view"), viewClass),
        style: viewStyle,
        ref: 'resize'
      }, children);
      var nodes;

      if (!_native) {
        var wrap = React.createElement("div", _extends({}, others, {
          ref: "wrap",
          key: 0,
          style: style,
          onScroll: this.handleScroll.bind(this),
          className: classNames(wrapClass, "".concat(prefixCls, "-scrollbar__wrap"), gutter ? '' : "".concat(prefixCls, "-scrollbar__wrap--hidden-default"))
        }), view);
        nodes = [wrap, React.createElement(Bar, {
          key: 1,
          move: moveX,
          size: sizeWidth,
          getParentWrap: function getParentWrap() {
            return _this3.wrap;
          }
        }), React.createElement(Bar, {
          key: 2,
          move: moveY,
          size: sizeHeight,
          getParentWrap: function getParentWrap() {
            return _this3.wrap;
          },
          vertical: true
        })];
      } else {
        nodes = [React.createElement("div", _extends({}, others, {
          key: 0,
          ref: "wrap",
          className: classNames(wrapClass, "".concat(prefixCls, "-scrollbar__wrap")),
          style: style
        }), view)];
      }

      return React.createElement('div', {
        className: classNames("".concat(prefixCls, "-scrollbar"), className)
      }, nodes);
    }
  }, {
    key: "wrap",
    get: function get() {
      return this.refs.wrap;
    }
  }]);

  return Scrollbar;
}(React.Component);
Scrollbar.propTypes = {
  "native": PropTypes.bool,
  wrapStyle: PropTypes.object,
  wrapClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewStyle: PropTypes.object,
  className: PropTypes.string,
  viewComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  noresize: PropTypes.bool,
  prefixCls: PropTypes.string
};
Scrollbar.defaultProps = {
  viewComponent: 'div',
  prefixCls: 'fishd'
};