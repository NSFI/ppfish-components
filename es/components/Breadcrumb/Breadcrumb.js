"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

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

function getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }

  var paramsKeys = Object.keys(params).join('|');
  var name = route.breadcrumbName.replace(new RegExp(":(" + paramsKeys + ")", 'g'), function (replacement, key) {
    return params[key] || replacement;
  });
  return name;
}

function defaultItemRender(route, params, routes, paths) {
  var isLastItem = routes.indexOf(route) === routes.length - 1;
  var name = getBreadcrumbName(route, params);
  return isLastItem ? React.createElement("span", null, name) : React.createElement("a", {
    href: "#/" + paths.join('/')
  }, name);
}

var Breadcrumb =
/** @class */
function (_super) {
  __extends(Breadcrumb, _super);

  function Breadcrumb() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Breadcrumb.prototype.componentDidMount = function () {
    var props = this.props;
    (0, _warning.default)(!('linkRender' in props || 'nameRender' in props), '`linkRender` and `nameRender` are removed, please use `itemRender` instead, ' + 'see: https://u.ant.design/item-render.');
  };

  Breadcrumb.prototype.render = function () {
    var crumbs;
    var _a = this.props,
        separator = _a.separator,
        prefixCls = _a.prefixCls,
        style = _a.style,
        className = _a.className,
        routes = _a.routes,
        _b = _a.params,
        params = _b === void 0 ? {} : _b,
        children = _a.children,
        _c = _a.itemRender,
        itemRender = _c === void 0 ? defaultItemRender : _c,
        maxWidth = _a.maxWidth,
        size = _a.size;

    if (routes && routes.length > 0) {
      var paths_1 = [];
      crumbs = routes.map(function (route) {
        route.path = route.path || '';
        var path = route.path.replace(/^\//, '');
        Object.keys(params).forEach(function (key) {
          path = path.replace(":" + key, params[key]);
        });

        if (path) {
          paths_1.push(path);
        }

        return React.createElement(_BreadcrumbItem.default, {
          separator: separator,
          key: route.breadcrumbName || path,
          maxWidth: maxWidth
        }, itemRender(route, params, routes, paths_1));
      });
    } else if (children) {
      crumbs = React.Children.map(children, function (element, index) {
        if (!element) {
          return element;
        }

        (0, _warning.default)(element.type && element.type.__FISHD_BREADCRUMB_ITEM, 'Breadcrumb only accepts Breadcrumb.Item as it\'s children');
        return (0, React.cloneElement)(element, {
          separator: separator,
          maxWidth: maxWidth,
          key: index
        });
      });
    }

    var cls = (0, _classnames.default)(className, prefixCls, {
      'small': size === 'small'
    });
    return React.createElement("div", {
      className: cls,
      style: style
    }, crumbs);
  };

  Breadcrumb.defaultProps = {
    prefixCls: 'fishd-breadcrumb',
    separator: React.createElement(_Icon.default, {
      type: "arrow-line-regular"
    }),
    size: 'default'
  };
  Breadcrumb.propTypes = {
    prefixCls: _propTypes.default.string,
    size: _propTypes.default.string,
    separator: _propTypes.default.node,
    routes: _propTypes.default.array,
    params: _propTypes.default.object,
    linkRender: _propTypes.default.func,
    nameRender: _propTypes.default.func
  };
  return Breadcrumb;
}(React.Component);

var _default = Breadcrumb;
exports.default = _default;