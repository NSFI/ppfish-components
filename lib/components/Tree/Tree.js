"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _rcTree = _interopRequireWildcard(require("../TreeSelect/rcTree"));

var _DirectoryTree = _interopRequireDefault(require("./DirectoryTree"));

var _classnames = _interopRequireDefault(require("classnames"));

var _openAnimation = _interopRequireDefault(require("../../utils/openAnimation"));

var _Icon = _interopRequireDefault(require("../Icon"));

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

var Tree =
/** @class */
function (_super) {
  __extends(Tree, _super);

  function Tree() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.renderSwitcherIcon = function (_a) {
      var isLeaf = _a.isLeaf,
          expanded = _a.expanded,
          loading = _a.loading;
      var _b = _this.props,
          prefixCls = _b.prefixCls,
          showLine = _b.showLine; // if (loading) {
      //   return (
      //     <Icon
      //       type="load-line" spin={true}
      //       className={`${prefixCls}-switcher-loading-icon`}
      //     />
      //   );
      // }

      if (showLine) {
        if (isLeaf) {
          return React.createElement(_Icon["default"], {
            type: "file-line",
            className: prefixCls + "-switcher-line-icon"
          });
        }

        return React.createElement(_Icon["default"], {
          type: expanded ? 'minus-square' : 'plus-square',
          className: prefixCls + "-switcher-line-icon"
        });
      } else {
        if (isLeaf) {
          return null;
        }

        return React.createElement(_Icon["default"], {
          type: "down-fill",
          className: prefixCls + "-switcher-icon"
        });
      }
    };

    return _this;
  }

  Tree.prototype.render = function () {
    var _this = this;

    var props = this.props;
    var prefixCls = props.prefixCls,
        className = props.className,
        style = props.style,
        showIcon = props.showIcon,
        required = props.required;
    var checkable = props.checkable;
    return React.createElement(_rcTree["default"], __assign({}, props, {
      ref: function ref(node) {
        return _this.tree = node;
      },
      className: (0, _classnames["default"])(!showIcon && prefixCls + "-icon-hide", className),
      checkable: checkable ? React.createElement("span", {
        className: prefixCls + "-checkbox-inner"
      }) : checkable,
      switcherIcon: this.renderSwitcherIcon,
      required: required,
      style: style
    }), this.props.children);
  };

  Tree.TreeNode = _rcTree.TreeNode;
  Tree.DirectoryTree = _DirectoryTree["default"];
  Tree.defaultProps = {
    autoExpandParent: true,
    checkable: false,
    defaultExpandAll: false,
    defaultExpandParent: true,
    required: false,
    openAnimation: __assign(__assign({}, _openAnimation["default"]), {
      appear: null
    }),
    prefixCls: 'fishd-tree',
    showIcon: false
  };
  return Tree;
}(React.Component);

var _default = Tree;
exports["default"] = _default;