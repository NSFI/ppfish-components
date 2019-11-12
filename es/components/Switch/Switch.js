"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Switch = _interopRequireDefault(require("./src/Switch"));

var _omit = _interopRequireDefault(require("omit.js"));

var _wave = _interopRequireDefault(require("../../utils/wave"));

require("./style/Switch.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Switch =
/** @class */
function (_super) {
  __extends(Switch, _super);

  function Switch() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.saveSwitch = function (node) {
      _this.rcSwitch = node;
    };

    return _this;
  }

  Switch.prototype.focus = function () {
    this.rcSwitch.focus();
  };

  Switch.prototype.blur = function () {
    this.rcSwitch.blur();
  };

  Switch.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        size = _b.size,
        loading = _b.loading,
        _c = _b.className,
        className = _c === void 0 ? '' : _c;
    var classes = (0, _classnames.default)(className, (_a = {}, _a[prefixCls + "-small"] = size === 'small', _a[prefixCls + "-large"] = size === 'large', _a[prefixCls + "-loading"] = loading, _a));
    return React.createElement(_wave.default, {
      insertExtraNode: true
    }, React.createElement(_Switch.default, __assign({}, (0, _omit.default)(this.props, ['loading']), {
      className: classes,
      ref: this.saveSwitch
    })));
  };

  Switch.defaultProps = {
    prefixCls: 'fishd-switch'
  };
  Switch.propTypes = {
    prefixCls: PropTypes.string,
    // HACK: https://github.com/ant-design/ant-design/issues/5368
    // size=default and size=large are the same
    size: PropTypes.oneOf(['small', 'default', 'large']),
    className: PropTypes.string
  };
  return Switch;
}(React.Component);

var _default = Switch;
exports.default = _default;