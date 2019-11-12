"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _index = require("./src/index.js");

var _classnames = _interopRequireDefault(require("classnames"));

require("./style/index.less");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
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

var __assign = void 0 && (void 0).__assign || function () {
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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var statusColorMap = {
  normal: '#108ee9',
  exception: '#ff5500',
  success: '#87d068'
};

var validProgress = function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  } else if (progress > 100) {
    return 100;
  }

  return progress;
};

var Progress =
/** @class */
function (_super) {
  __extends(Progress, _super);

  function Progress() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Progress.prototype.render = function () {
    var _a;

    var props = this.props;

    var prefixCls = props.prefixCls,
        className = props.className,
        _b = props.percent,
        percent = _b === void 0 ? 0 : _b,
        status = props.status,
        format = props.format,
        trailColor = props.trailColor,
        size = props.size,
        successPercent = props.successPercent,
        type = props.type,
        strokeWidth = props.strokeWidth,
        width = props.width,
        showInfo = props.showInfo,
        _c = props.gapDegree,
        gapDegree = _c === void 0 ? 0 : _c,
        gapPosition = props.gapPosition,
        strokeColor = props.strokeColor,
        _d = props.strokeLinecap,
        strokeLinecap = _d === void 0 ? 'round' : _d,
        extraContent = props.extraContent,
        message = props.message,
        operation = props.operation,
        restProps = __rest(props, ["prefixCls", "className", "percent", "status", "format", "trailColor", "size", "successPercent", "type", "strokeWidth", "width", "showInfo", "gapDegree", "gapPosition", "strokeColor", "strokeLinecap", "extraContent", "message", "operation"]);

    var progressStatus = parseInt(successPercent ? successPercent.toString() : percent.toString(), 10) >= 100 && !('status' in props) ? 'success' : status || 'normal';
    var progressInfo;
    var progress;

    var textFormatter = format || function (percentNumber) {
      return percentNumber + "%";
    };

    if (showInfo) {
      var text = void 0;
      var iconType = type === 'circle' || type === 'dashboard' ? 'hints-alone-' : 'hints-';

      if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
        text = textFormatter(validProgress(percent), validProgress(successPercent));
      } else if (progressStatus === 'exception') {
        text = React.createElement(_Icon.default, {
          type: iconType + "error"
        });
      } else if (progressStatus === 'success') {
        text = React.createElement(_Icon.default, {
          type: iconType + "success"
        });
      }

      progressInfo = React.createElement("span", {
        className: prefixCls + "-text"
      }, text);
    }

    if (type === 'line') {
      var percentStyle = {
        width: validProgress(percent) + "%",
        height: strokeWidth || (size === 'small' ? 6 : 8),
        background: strokeColor,
        borderRadius: strokeLinecap === 'square' ? 0 : '100px'
      };
      var successPercentStyle = {
        width: validProgress(successPercent) + "%",
        height: strokeWidth || (size === 'small' ? 6 : 8),
        borderRadius: strokeLinecap === 'square' ? 0 : '100px'
      };
      var successSegment = successPercent !== undefined ? React.createElement("div", {
        className: prefixCls + "-success-bg",
        style: successPercentStyle
      }) : null;
      progress = React.createElement("div", {
        className: prefixCls + "-line-ctner"
      }, React.createElement("div", {
        className: prefixCls + "-basic"
      }, React.createElement("div", {
        className: prefixCls + "-outer"
      }, React.createElement("div", {
        className: prefixCls + "-inner"
      }, React.createElement("div", {
        className: prefixCls + "-bg",
        style: percentStyle
      }, extraContent ? React.createElement("div", {
        className: prefixCls + "-extra"
      }, extraContent) : null), successSegment)), progressInfo), message ? React.createElement("span", {
        className: prefixCls + "-msg"
      }, message) : null, operation ? React.createElement("span", {
        className: prefixCls + "-oper"
      }, operation) : null);
    } else if (type === 'circle' || type === 'dashboard') {
      var circleSize = width || 120;
      var circleStyle = {
        width: circleSize,
        height: circleSize,
        fontSize: circleSize * 0.15 + 6
      };
      var circleWidth = strokeWidth || 6;
      var gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';
      var gapDeg = gapDegree || type === 'dashboard' && 75;
      progress = React.createElement("div", {
        className: prefixCls + "-inner",
        style: circleStyle
      }, React.createElement(_index.Circle, {
        percent: validProgress(percent),
        strokeWidth: circleWidth,
        trailWidth: circleWidth,
        strokeColor: statusColorMap[progressStatus],
        strokeLinecap: strokeLinecap,
        trailColor: trailColor,
        prefixCls: prefixCls,
        gapDegree: gapDeg,
        gapPosition: gapPos
      }), React.createElement("div", {
        className: prefixCls + "-circle-info"
      }, progressInfo, message ? React.createElement("span", {
        className: prefixCls + "-msg"
      }, message) : null));
    }

    var classString = (0, _classnames.default)(prefixCls, (_a = {}, _a[prefixCls + "-" + (type === 'dashboard' && 'circle' || type)] = true, _a[prefixCls + "-status-" + progressStatus] = true, _a[prefixCls + "-show-info"] = showInfo, _a[prefixCls + "-" + size] = size, _a), className);
    return React.createElement("div", __assign({}, restProps, {
      className: classString
    }), progress, (type === 'circle' || type === 'dashboard') && operation ? React.createElement("span", {
      className: prefixCls + "-oper"
    }, operation) : null);
  };

  Progress.defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    prefixCls: 'fishd-progress',
    size: 'default'
  };
  Progress.propTypes = {
    status: _propTypes.default.oneOf(['normal', 'exception', 'active', 'success']),
    type: _propTypes.default.oneOf(['line', 'circle', 'dashboard']),
    showInfo: _propTypes.default.bool,
    percent: _propTypes.default.number,
    width: _propTypes.default.number,
    strokeWidth: _propTypes.default.number,
    strokeLinecap: _propTypes.default.oneOf(['round', 'square']),
    strokeColor: _propTypes.default.string,
    trailColor: _propTypes.default.string,
    format: _propTypes.default.func,
    gapDegree: _propTypes.default.number,
    default: _propTypes.default.oneOf(['default', 'small'])
  };
  return Progress;
}(React.Component);

var _default = Progress;
exports.default = _default;