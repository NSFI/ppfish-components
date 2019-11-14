"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Meta = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Grid = require("../Grid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Meta = function Meta(props) {
  var _a = props.prefixCls,
      prefixCls = _a === void 0 ? 'fishd-list' : _a,
      className = props.className,
      avatar = props.avatar,
      title = props.title,
      description = props.description,
      others = __rest(props, ["prefixCls", "className", "avatar", "title", "description"]);

  var classString = (0, _classnames["default"])(prefixCls + "-item-meta", className);
  var content = React.createElement("div", {
    className: prefixCls + "-item-meta-content"
  }, title && React.createElement("h4", {
    className: prefixCls + "-item-meta-title"
  }, title), description && React.createElement("div", {
    className: prefixCls + "-item-meta-description"
  }, description));
  return React.createElement("div", __assign({}, others, {
    className: classString
  }), avatar && React.createElement("div", {
    className: prefixCls + "-item-meta-avatar"
  }, avatar), (title || description) && content);
};

exports.Meta = Meta;

function getGrid(grid, t) {
  return grid[t] && Math.floor(24 / grid[t]);
}

var GridColumns = ['', 1, 2, 3, 4, 6, 8, 12, 24];

var Item =
/** @class */
function (_super) {
  __extends(Item, _super);

  function Item() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Item.prototype.render = function () {
    var _a;

    var grid = this.context.grid;

    var _b = this.props,
        _c = _b.prefixCls,
        prefixCls = _c === void 0 ? 'fishd-list' : _c,
        children = _b.children,
        actions = _b.actions,
        extra = _b.extra,
        className = _b.className,
        others = __rest(_b, ["prefixCls", "children", "actions", "extra", "className"]);

    var classString = (0, _classnames["default"])(prefixCls + "-item", className);
    var metaContent = [];
    var otherContent = [];
    React.Children.forEach(children, function (element) {
      if (element && element.type && element.type === Meta) {
        metaContent.push(element);
      } else {
        otherContent.push(element);
      }
    });
    var contentClassString = (0, _classnames["default"])(prefixCls + "-item-content", (_a = {}, _a[prefixCls + "-item-content-single"] = metaContent.length < 1, _a));
    var content = otherContent.length > 0 ? React.createElement("div", {
      className: contentClassString
    }, otherContent) : null;
    var actionsContent;

    if (actions && actions.length > 0) {
      var actionsContentItem_1 = function actionsContentItem_1(action, i) {
        return React.createElement("li", {
          key: prefixCls + "-item-action-" + i
        }, action, i !== actions.length - 1 && React.createElement("em", {
          className: prefixCls + "-item-action-split"
        }));
      };

      actionsContent = React.createElement("ul", {
        className: prefixCls + "-item-action"
      }, actions.map(function (action, i) {
        return actionsContentItem_1(action, i);
      }));
    }

    var extraContent = React.createElement("div", {
      className: prefixCls + "-item-extra-wrap"
    }, React.createElement("div", {
      className: prefixCls + "-item-main"
    }, metaContent, content, actionsContent), React.createElement("div", {
      className: prefixCls + "-item-extra"
    }, extra));
    var mainContent = grid ? React.createElement(_Grid.Col, {
      span: getGrid(grid, 'column'),
      xs: getGrid(grid, 'xs'),
      sm: getGrid(grid, 'sm'),
      md: getGrid(grid, 'md'),
      lg: getGrid(grid, 'lg'),
      xl: getGrid(grid, 'xl'),
      xxl: getGrid(grid, 'xxl')
    }, React.createElement("div", __assign({}, others, {
      className: classString
    }), extra && extraContent, !extra && metaContent, !extra && content, !extra && actionsContent)) : React.createElement("div", __assign({}, others, {
      className: classString
    }), extra && extraContent, !extra && metaContent, !extra && content, !extra && actionsContent);
    return mainContent;
  };

  Item.Meta = Meta;
  Item.propTypes = {
    column: _propTypes["default"].oneOf(GridColumns),
    xs: _propTypes["default"].oneOf(GridColumns),
    sm: _propTypes["default"].oneOf(GridColumns),
    md: _propTypes["default"].oneOf(GridColumns),
    lg: _propTypes["default"].oneOf(GridColumns),
    xl: _propTypes["default"].oneOf(GridColumns),
    xxl: _propTypes["default"].oneOf(GridColumns)
  };
  Item.contextTypes = {
    grid: _propTypes["default"].any
  };
  return Item;
}(React.Component);

var _default = Item;
exports["default"] = _default;