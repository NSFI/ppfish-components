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

var __assign = this && this.__assign || function () {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

function generator(props) {
  return function (BasicComponent) {
    return (
      /** @class */
      function (_super) {
        __extends(Adapter, _super);

        function Adapter() {
          return _super !== null && _super.apply(this, arguments) || this;
        }

        Adapter.prototype.render = function () {
          var prefixCls = props.prefixCls;
          return React.createElement(BasicComponent, __assign({
            prefixCls: prefixCls
          }, this.props));
        };

        return Adapter;
      }(React.Component)
    );
  };
}

var Basic =
/** @class */
function (_super) {
  __extends(Basic, _super);

  function Basic() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Basic.prototype.render = function () {
    var _a = this.props,
        prefixCls = _a.prefixCls,
        className = _a.className,
        children = _a.children,
        others = __rest(_a, ["prefixCls", "className", "children"]);

    var divCls = classNames(className, prefixCls);
    return React.createElement("div", __assign({
      className: divCls
    }, others), children);
  };

  return Basic;
}(React.Component);

var BasicLayout =
/** @class */
function (_super) {
  __extends(BasicLayout, _super);

  function BasicLayout() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      siders: []
    };
    return _this;
  }

  BasicLayout.prototype.getChildContext = function () {
    var _this = this;

    return {
      siderHook: {
        addSider: function addSider(id) {
          _this.setState({
            siders: __spreadArrays(_this.state.siders, [id])
          });
        },
        removeSider: function removeSider(id) {
          _this.setState({
            siders: _this.state.siders.filter(function (currentId) {
              return currentId !== id;
            })
          });
        }
      }
    };
  };

  BasicLayout.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        className = _b.className,
        children = _b.children,
        hasSider = _b.hasSider,
        others = __rest(_b, ["prefixCls", "className", "children", "hasSider"]);

    var divCls = classNames(className, prefixCls, (_a = {}, _a[prefixCls + "-has-sider"] = hasSider || this.state.siders.length > 0, _a));
    return React.createElement("div", __assign({
      className: divCls
    }, others), children);
  };

  BasicLayout.childContextTypes = {
    siderHook: PropTypes.object
  };
  return BasicLayout;
}(React.Component);

var Layout = generator({
  prefixCls: 'fishd-layout'
})(BasicLayout);
var Header = generator({
  prefixCls: 'fishd-layout-header'
})(Basic);
var Footer = generator({
  prefixCls: 'fishd-layout-footer'
})(Basic);
var Content = generator({
  prefixCls: 'fishd-layout-content'
})(Basic);
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
export default Layout;