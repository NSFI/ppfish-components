"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = require("react-dom");

var _classnames = _interopRequireDefault(require("classnames"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _utils = require("./utils");

require("./assets/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Steps =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Steps, _Component);

  function Steps(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "calcStepOffsetWidth", function () {
      if ((0, _utils.isFlexSupported)()) {
        return;
      } // Just for IE9


      var domNode = (0, _reactDom.findDOMNode)(_assertThisInitialized(_this));

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
    _this.calcStepOffsetWidth = (0, _debounce.default)(_this.calcStepOffsetWidth, 150);
    return _this;
  }

  var _proto = Steps.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.calcStepOffsetWidth();

    if (!(0, _utils.isFlexSupported)()) {
      this.setState({
        flexSupported: false
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.calcStepOffsetWidth();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.calcTimeout) {
      clearTimeout(this.calcTimeout);
    }

    if (this.calcStepOffsetWidth && this.calcStepOffsetWidth.cancel) {
      this.calcStepOffsetWidth.cancel();
    }
  };

  _proto.render = function render() {
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
        restProps = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "style", "className", "children", "direction", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot", "initial", "icons"]);

    var _this$state = this.state,
        lastStepOffsetWidth = _this$state.lastStepOffsetWidth,
        flexSupported = _this$state.flexSupported;

    var filteredChildren = _react.default.Children.toArray(children).filter(function (c) {
      return !!c;
    });

    var lastIndex = filteredChildren.length - 1;
    var adjustedlabelPlacement = progressDot ? 'vertical' : labelPlacement;
    var classString = (0, _classnames.default)(prefixCls, prefixCls + "-" + direction, className, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-label-" + adjustedlabelPlacement] = direction === 'horizontal', _classNames[prefixCls + "-dot"] = !!progressDot, _classNames));
    return _react.default.createElement("div", _extends({
      className: classString,
      style: style
    }, restProps), _react.Children.map(filteredChildren, function (child, index) {
      if (!child) {
        return null;
      }

      var stepNumber = initial + index;
      var childProps = Object.assign({
        stepNumber: "" + (stepNumber + 1),
        prefixCls: prefixCls,
        iconPrefix: iconPrefix,
        wrapperStyle: style,
        progressDot: progressDot,
        icons: icons
      }, child.props);

      if (!flexSupported && direction !== 'vertical' && index !== lastIndex) {
        childProps.itemWidth = 100 / lastIndex + "%";
        childProps.adjustMarginRight = -Math.round(lastStepOffsetWidth / lastIndex + 1);
      } // fix tail color


      if (status === 'error' && index === current - 1) {
        childProps.className = prefixCls + "-next-error";
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

      return (0, _react.cloneElement)(child, childProps);
    }));
  };

  return Steps;
}(_react.Component);

exports.default = Steps;

_defineProperty(Steps, "propTypes", {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  iconPrefix: _propTypes.default.string,
  direction: _propTypes.default.string,
  labelPlacement: _propTypes.default.string,
  children: _propTypes.default.node,
  status: _propTypes.default.string,
  size: _propTypes.default.string,
  progressDot: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  style: _propTypes.default.object,
  initial: _propTypes.default.number,
  current: _propTypes.default.number,
  icons: _propTypes.default.shape({
    finish: _propTypes.default.node,
    error: _propTypes.default.node
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