"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var AnchorLink =
/** @class */
function (_super) {
  __extends(AnchorLink, _super);

  function AnchorLink() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.handleClick = function (e) {
      var _a = _this.context.fishdAnchor,
          scrollTo = _a.scrollTo,
          onClick = _a.onClick;
      var _b = _this.props,
          href = _b.href,
          title = _b.title;

      if (onClick) {
        onClick(e, {
          title: title,
          href: href
        });
      }

      scrollTo(href);
    };

    return _this;
  }

  AnchorLink.prototype.componentDidMount = function () {
    this.context.fishdAnchor.registerLink(this.props.href);
  };

  AnchorLink.prototype.componentDidUpdate = function (prevProps) {
    if (this.props.href !== prevProps.href) {
      this.context.fishdAnchor.unregisterLink(prevProps.href);
      this.context.fishdAnchor.registerLink(this.props.href);
    }
  };

  AnchorLink.prototype.componentWillUnmount = function () {
    this.context.fishdAnchor.unregisterLink(this.props.href);
  };

  AnchorLink.prototype.render = function () {
    var _a, _b;

    var _c = this.props,
        prefixCls = _c.prefixCls,
        href = _c.href,
        title = _c.title,
        children = _c.children;
    var active = this.context.fishdAnchor.activeLink === href;
    var wrapperClassName = (0, _classnames.default)(prefixCls + "-link", (_a = {}, _a[prefixCls + "-link-active"] = active, _a));
    var titleClassName = (0, _classnames.default)(prefixCls + "-link-title", (_b = {}, _b[prefixCls + "-link-title-active"] = active, _b));

    if (children) {
      return React.createElement("div", {
        className: prefixCls + "-link-group"
      }, React.createElement("div", {
        className: wrapperClassName
      }, React.createElement("a", {
        className: titleClassName,
        // href={href}
        title: typeof title === 'string' ? title : '',
        onClick: this.handleClick
      }, title)), React.createElement("div", {
        className: prefixCls + "-children"
      }, children));
    }

    return React.createElement("div", {
      className: wrapperClassName
    }, React.createElement("a", {
      className: titleClassName,
      // href={href}
      title: typeof title === 'string' ? title : '',
      onClick: this.handleClick
    }, title));
  };

  AnchorLink.defaultProps = {
    prefixCls: 'fishd-anchor',
    href: '#'
  };
  AnchorLink.contextTypes = {
    fishdAnchor: PropTypes.object
  };
  return AnchorLink;
}(React.Component);

var _default = AnchorLink;
exports.default = _default;