var __extends = this && this.__extends || function () {
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

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

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
    var wrapperClassName = classNames(prefixCls + "-link", (_a = {}, _a[prefixCls + "-link-active"] = active, _a));
    var titleClassName = classNames(prefixCls + "-link-title", (_b = {}, _b[prefixCls + "-link-title-active"] = active, _b));

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

export default AnchorLink;