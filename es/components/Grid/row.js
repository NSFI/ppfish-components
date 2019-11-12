"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}; /// <reference module="dom">
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82


var enquire;

if (typeof window !== 'undefined') {
  var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
    return {
      media: mediaQuery,
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };

  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  enquire = require('enquire.js');
}

var responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
var responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};

var Row =
/** @class */
function (_super) {
  __extends(Row, _super);

  function Row() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      screens: {}
    };
    return _this;
  }

  Row.prototype.componentDidMount = function () {
    var _this = this;

    Object.keys(responsiveMap).map(function (screen) {
      return enquire.register(responsiveMap[screen], {
        match: function match() {
          if (typeof _this.props.gutter !== 'object') {
            return;
          }

          _this.setState(function (prevState) {
            var _a;

            return {
              screens: __assign(__assign({}, prevState.screens), (_a = {}, _a[screen] = true, _a))
            };
          });
        },
        unmatch: function unmatch() {
          if (typeof _this.props.gutter !== 'object') {
            return;
          }

          _this.setState(function (prevState) {
            var _a;

            return {
              screens: __assign(__assign({}, prevState.screens), (_a = {}, _a[screen] = false, _a))
            };
          });
        },
        // Keep a empty destory to avoid triggering unmatch when unregister
        destroy: function destroy() {}
      });
    });
  };

  Row.prototype.componentWillUnmount = function () {
    Object.keys(responsiveMap).map(function (screen) {
      return enquire.unregister(responsiveMap[screen]);
    });
  };

  Row.prototype.getGutter = function () {
    var gutter = this.props.gutter;

    if (typeof gutter === 'object') {
      for (var i = 0; i <= responsiveArray.length; i++) {
        var breakpoint = responsiveArray[i];

        if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
          return gutter[breakpoint];
        }
      }
    }

    return gutter;
  };

  Row.prototype.render = function () {
    var _a;

    var _b = this.props,
        type = _b.type,
        justify = _b.justify,
        align = _b.align,
        className = _b.className,
        style = _b.style,
        children = _b.children,
        _c = _b.prefixCls,
        prefixCls = _c === void 0 ? 'fishd-row' : _c,
        others = __rest(_b, ["type", "justify", "align", "className", "style", "children", "prefixCls"]);

    var gutter = this.getGutter();
    var classes = (0, _classnames.default)((_a = {}, _a[prefixCls] = !type, _a[prefixCls + "-" + type] = type, _a[prefixCls + "-" + type + "-" + justify] = type && justify, _a[prefixCls + "-" + type + "-" + align] = type && align, _a), className);
    var rowStyle = gutter > 0 ? __assign({
      marginLeft: gutter / -2,
      marginRight: gutter / -2
    }, style) : style;
    var cols = React.Children.map(children, function (col) {
      if (!col) {
        return null;
      }

      if (col.props && gutter > 0) {
        return (0, React.cloneElement)(col, {
          style: __assign({
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2
          }, col.props.style)
        });
      }

      return col;
    });

    var otherProps = __assign({}, others);

    delete otherProps.gutter;
    return React.createElement("div", __assign({}, otherProps, {
      className: classes,
      style: rowStyle
    }), cols);
  };

  Row.defaultProps = {
    gutter: 0
  };
  Row.propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    prefixCls: PropTypes.string
  };
  return Row;
}(React.Component);

var _default = Row;
exports.default = _default;