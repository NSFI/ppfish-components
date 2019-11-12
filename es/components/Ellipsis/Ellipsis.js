"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = exports.cutStrByFullLength = exports.getStrFullLength = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.split");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../Tooltip/index.js"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint react/no-did-mount-set-state: 0 */

/* eslint no-param-reassign: 0 */
var isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;
var TooltipOverlayStyle = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word'
};

var getStrFullLength = function getStrFullLength(str) {
  if (str === void 0) {
    str = '';
  }

  return str.split('').reduce(function (pre, cur) {
    var charCode = cur.charCodeAt(0);

    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }

    return pre + 2;
  }, 0);
};

exports.getStrFullLength = getStrFullLength;

var cutStrByFullLength = function cutStrByFullLength(str, maxLength) {
  if (str === void 0) {
    str = '';
  }

  var showLength = 0;
  return str.split('').reduce(function (pre, cur) {
    var charCode = cur.charCodeAt(0);

    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }

    if (showLength <= maxLength) {
      return pre + cur;
    }

    return pre;
  }, '');
};

exports.cutStrByFullLength = cutStrByFullLength;

var EllipsisText = function EllipsisText(_ref) {
  var text = _ref.text,
      length = _ref.length,
      tooltip = _ref.tooltip,
      fullWidthRecognition = _ref.fullWidthRecognition,
      tooltipProps = _ref.tooltipProps,
      other = _objectWithoutPropertiesLoose(_ref, ["text", "length", "tooltip", "fullWidthRecognition", "tooltipProps"]);

  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }

  var textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;

  if (textLength <= length || length < 0) {
    return _react.default.createElement("span", other, text);
  }

  var tail = '...';
  var displayText;

  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  if (tooltip) {
    return _react.default.createElement(_index.default, _extends({}, tooltipProps, {
      overlayStyle: TooltipOverlayStyle,
      title: text
    }), _react.default.createElement("span", null, displayText, tail));
  }

  return _react.default.createElement("span", other, displayText, tail);
};

EllipsisText.propTypes = {
  text: _propTypes.default.string,
  length: _propTypes.default.number,
  tooltip: _propTypes.default.bool,
  fullWidthRecognition: _propTypes.default.bool,
  tooltipProps: _propTypes.default.object
};

var Ellipsis =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Ellipsis, _Component);

  function Ellipsis() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      text: '',
      targetCount: 0,
      isEllipsisActive: false
    });

    _defineProperty(_assertThisInitialized(_this), "detectEllipsisActive", function (node) {
      _this.setState({
        isEllipsisActive: node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "computeLine", function () {
      var lines = _this.props.lines;

      if (lines && !isSupportLineClamp) {
        var text = _this.shadowChildren.innerText || _this.shadowChildren.textContent;
        var lineHeight = parseInt(getComputedStyle(_this.root).lineHeight, 10);
        var targetHeight = lines * lineHeight;
        _this.content.style.height = targetHeight + "px";
        var totalHeight = _this.shadowChildren.offsetHeight;
        var shadowNode = _this.shadow.firstChild;

        if (totalHeight <= targetHeight) {
          _this.setState({
            text: text,
            targetCount: text.length
          });

          return;
        } // bisection


        var len = text.length;
        var mid = Math.ceil(len / 2);

        var count = _this.bisection(targetHeight, mid, 0, len, text, shadowNode);

        _this.setState({
          text: text,
          targetCount: count
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "bisection", function (th, m, b, e, text, shadowNode) {
      var suffix = '...';
      var mid = m;
      var end = e;
      var begin = b;
      shadowNode.innerHTML = text.substring(0, mid) + suffix;
      var sh = shadowNode.offsetHeight;

      if (sh <= th) {
        shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
        sh = shadowNode.offsetHeight;

        if (sh > th || mid === begin) {
          return mid;
        }

        begin = mid;

        if (end - begin === 1) {
          mid = 1 + begin;
        } else {
          mid = Math.floor((end - begin) / 2) + begin;
        }

        return _this.bisection(th, mid, begin, end, text, shadowNode);
      }

      if (mid - 1 < 0) {
        return mid;
      }

      shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
      sh = shadowNode.offsetHeight;

      if (sh <= th) {
        return mid - 1;
      }

      end = mid;
      mid = Math.floor((end - begin) / 2) + begin;
      return _this.bisection(th, mid, begin, end, text, shadowNode);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRoot", function (n) {
      _this.root = n;
    });

    _defineProperty(_assertThisInitialized(_this), "handleContent", function (n) {
      _this.content = n;
    });

    _defineProperty(_assertThisInitialized(_this), "handleNode", function (n) {
      _this.node = n;
    });

    _defineProperty(_assertThisInitialized(_this), "handleShadow", function (n) {
      _this.shadow = n;
    });

    _defineProperty(_assertThisInitialized(_this), "handleShadowChildren", function (n) {
      _this.shadowChildren = n;
    });

    return _this;
  }

  var _proto = Ellipsis.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.node) {
      this.computeLine();
    } // detect ellipsis active in width/lines mode


    if (this.props.width || this.props.lines) {
      var target;

      if (this.props.width) {
        target = this.widthNode;
      } else if (this.props.lines && isSupportLineClamp) {
        target = this.lineClampNode;
      } else {
        return;
      }

      this.detectEllipsisActive(target);
      this.resizeObserver = new _resizeObserverPolyfill.default(function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === target) {
            _this2.detectEllipsisActive(target);
          }
        });
      });
      this.resizeObserver.observe(target);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(perProps) {
    var lines = this.props.lines;

    if (lines !== perProps.lines) {
      this.computeLine();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect();
  };

  _proto.render = function render() {
    var _classNames,
        _this3 = this;

    var _this$state = this.state,
        text = _this$state.text,
        targetCount = _this$state.targetCount,
        isEllipsisActive = _this$state.isEllipsisActive;

    var _this$props = this.props,
        children = _this$props.children,
        lines = _this$props.lines,
        length = _this$props.length,
        width = _this$props.width,
        className = _this$props.className,
        tooltip = _this$props.tooltip,
        style = _this$props.style,
        fullWidthRecognition = _this$props.fullWidthRecognition,
        prefix = _this$props.prefix,
        tooltipProps = _this$props.tooltipProps,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["children", "lines", "length", "width", "className", "tooltip", "style", "fullWidthRecognition", "prefix", "tooltipProps"]);

    var cls = (0, _classnames.default)(prefix + "-ellipsis", className, (_classNames = {}, _classNames[prefix + "-width-mode"] = width, _classNames[prefix + "-line"] = lines && !isSupportLineClamp, _classNames[prefix + "-lineClamp"] = lines && isSupportLineClamp, _classNames)); // 一种限制都没有返回原值

    if (!lines && !length && !width) {
      return _react.default.createElement("span", _extends({
        className: cls
      }, restProps), children);
    } // 宽度限制


    if (width) {
      var node = _react.default.createElement("span", _extends({
        ref: function ref(node) {
          return _this3.widthNode = node;
        },
        className: cls
      }, restProps, {
        style: Object.assign({}, style, {
          maxWidth: width
        })
      }), children);

      return tooltip ? _react.default.createElement(_index.default, _extends({}, tooltipProps, {
        overlayStyle: TooltipOverlayStyle,
        title: isEllipsisActive ? children : null
      }), node) : node;
    } // 字数限制


    if (length) {
      return _react.default.createElement(EllipsisText, _extends({
        className: cls,
        tooltipProps: tooltipProps,
        length: length,
        text: children || '',
        tooltip: tooltip,
        fullWidthRecognition: fullWidthRecognition
      }, restProps));
    } //行数限制


    var id = "fishd-ellipsis-" + ("" + new Date().getTime() + Math.floor(Math.random() * 100)); // support document.body.style.webkitLineClamp

    if (isSupportLineClamp) {
      var _style = "#" + id + "{-webkit-line-clamp:" + lines + ";-webkit-box-orient: vertical;}";

      var _node = _react.default.createElement("div", _extends({
        ref: function ref(node) {
          return _this3.lineClampNode = node;
        },
        id: id,
        className: cls
      }, restProps), _react.default.createElement("style", null, _style), children);

      return tooltip ? _react.default.createElement(_index.default, _extends({}, tooltipProps, {
        overlayStyle: TooltipOverlayStyle,
        title: isEllipsisActive ? children : null
      }), _node) : _node;
    }

    var childNode = _react.default.createElement("span", {
      ref: this.handleNode
    }, targetCount > 0 && text.substring(0, targetCount), targetCount > 0 && targetCount < text.length && '...');

    return _react.default.createElement("div", _extends({}, restProps, {
      ref: this.handleRoot,
      className: cls
    }), _react.default.createElement("div", {
      ref: this.handleContent
    }, tooltip ? _react.default.createElement(_index.default, {
      overlayStyle: TooltipOverlayStyle,
      title: text
    }, childNode) : childNode, _react.default.createElement("div", {
      className: prefix + "-shadow",
      ref: this.handleShadowChildren
    }, children), _react.default.createElement("div", {
      className: prefix + "-shadow",
      ref: this.handleShadow
    }, _react.default.createElement("span", null, text))));
  };

  return Ellipsis;
}(_react.Component);

exports.default = Ellipsis;

_defineProperty(Ellipsis, "defaultProps", {
  prefix: 'fishd-ellipsis',
  fullWidthRecognition: false,
  tooltip: true,
  tooltipProps: {}
});

_defineProperty(Ellipsis, "propTypes", {
  prefix: _propTypes.default.string,
  lines: _propTypes.default.number,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  length: _propTypes.default.number,
  tooltip: _propTypes.default.bool,
  tooltipProps: _propTypes.default.object,
  fullWidthRecognition: _propTypes.default.bool,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node
});