"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _enhancer = _interopRequireDefault(require("./enhancer"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Circle =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Circle, _Component);

  function Circle() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Circle.prototype;

  _proto.getPathStyles = function getPathStyles() {
    var _this$props = this.props,
        percent = _this$props.percent,
        strokeWidth = _this$props.strokeWidth,
        _this$props$gapDegree = _this$props.gapDegree,
        gapDegree = _this$props$gapDegree === void 0 ? 0 : _this$props$gapDegree,
        gapPosition = _this$props.gapPosition;
    var radius = 50 - strokeWidth / 2;
    var beginPositionX = 0;
    var beginPositionY = -radius;
    var endPositionX = 0;
    var endPositionY = -2 * radius;

    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
        break;

      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
        break;

      case 'bottom':
        beginPositionY = radius;
        endPositionY = 2 * radius;
        break;

      default:
    }

    var pathString = "M 50,50 m " + beginPositionX + "," + beginPositionY + "\n     a " + radius + "," + radius + " 0 1 1 " + endPositionX + "," + -endPositionY + "\n     a " + radius + "," + radius + " 0 1 1 " + -endPositionX + "," + endPositionY;
    var len = Math.PI * 2 * radius;
    var trailPathStyle = {
      strokeDasharray: len - gapDegree + "px " + len + "px",
      strokeDashoffset: "-" + gapDegree / 2 + "px",
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    };
    var strokePathStyle = {
      strokeDasharray: percent / 100 * (len - gapDegree) + "px " + len + "px",
      strokeDashoffset: "-" + gapDegree / 2 + "px",
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s' // eslint-disable-line

    };
    return {
      pathString: pathString,
      trailPathStyle: trailPathStyle,
      strokePathStyle: strokePathStyle
    };
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        strokeWidth = _this$props2.strokeWidth,
        trailWidth = _this$props2.trailWidth,
        strokeColor = _this$props2.strokeColor,
        percent = _this$props2.percent,
        trailColor = _this$props2.trailColor,
        strokeLinecap = _this$props2.strokeLinecap,
        style = _this$props2.style,
        className = _this$props2.className,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["prefixCls", "strokeWidth", "trailWidth", "strokeColor", "percent", "trailColor", "strokeLinecap", "style", "className"]);

    var _this$getPathStyles = this.getPathStyles(),
        pathString = _this$getPathStyles.pathString,
        trailPathStyle = _this$getPathStyles.trailPathStyle,
        strokePathStyle = _this$getPathStyles.strokePathStyle;

    delete restProps.percent;
    delete restProps.gapDegree;
    delete restProps.gapPosition;
    return _react.default.createElement("svg", _extends({
      className: prefixCls + "-circle " + className,
      viewBox: "0 0 100 100",
      style: style
    }, restProps), _react.default.createElement("path", {
      className: prefixCls + "-circle-trail",
      d: pathString,
      stroke: trailColor,
      strokeWidth: trailWidth || strokeWidth,
      fillOpacity: "0",
      style: trailPathStyle
    }), _react.default.createElement("path", {
      className: prefixCls + "-circle-path",
      d: pathString,
      strokeLinecap: strokeLinecap,
      stroke: strokeColor,
      strokeWidth: this.props.percent === 0 ? 0 : strokeWidth,
      fillOpacity: "0",
      ref: function ref(path) {
        _this.path = path;
      },
      style: strokePathStyle
    }));
  };

  return Circle;
}(_react.Component);

Circle.propTypes = Object.assign({}, _types.propTypes, {
  gapPosition: _propTypes.default.oneOf(['top', 'bottom', 'left', 'right'])
});
Circle.defaultProps = Object.assign({}, _types.defaultProps, {
  gapPosition: 'top'
});

var _default = (0, _enhancer.default)(Circle);

exports.default = _default;