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

var _enhancer = _interopRequireDefault(require("./enhancer"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Line =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Line, _Component);

  function Line() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        className = _this$props.className,
        percent = _this$props.percent,
        prefixCls = _this$props.prefixCls,
        strokeColor = _this$props.strokeColor,
        strokeLinecap = _this$props.strokeLinecap,
        strokeWidth = _this$props.strokeWidth,
        style = _this$props.style,
        trailColor = _this$props.trailColor,
        trailWidth = _this$props.trailWidth,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["className", "percent", "prefixCls", "strokeColor", "strokeLinecap", "strokeWidth", "style", "trailColor", "trailWidth"]);

    delete restProps.gapPosition;
    var pathStyle = {
      strokeDasharray: '100px, 100px',
      strokeDashoffset: 100 - percent + "px",
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s linear'
    };
    var center = strokeWidth / 2;
    var right = 100 - strokeWidth / 2;
    var pathString = "M " + (strokeLinecap === 'round' ? center : 0) + "," + center + "\n           L " + (strokeLinecap === 'round' ? right : 100) + "," + center;
    var viewBoxString = "0 0 100 " + strokeWidth;
    return _react.default.createElement("svg", _extends({
      className: prefixCls + "-line " + className,
      viewBox: viewBoxString,
      preserveAspectRatio: "none",
      style: style
    }, restProps), _react.default.createElement("path", {
      className: prefixCls + "-line-trail",
      d: pathString,
      strokeLinecap: strokeLinecap,
      stroke: trailColor,
      strokeWidth: trailWidth || strokeWidth,
      fillOpacity: "0"
    }), _react.default.createElement("path", {
      className: prefixCls + "-line-path",
      d: pathString,
      strokeLinecap: strokeLinecap,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      fillOpacity: "0",
      ref: function ref(path) {
        _this.path = path;
      },
      style: pathStyle
    }));
  };

  return Line;
}(_react.Component);

Line.propTypes = _types.propTypes;
Line.defaultProps = _types.defaultProps;

var _default = (0, _enhancer.default)(Line);

exports.default = _default;