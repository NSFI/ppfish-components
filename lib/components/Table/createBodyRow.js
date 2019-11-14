"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createTableRow;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

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

function createTableRow(Component) {
  if (Component === void 0) {
    Component = 'tr';
  }

  var BodyRow =
  /** @class */
  function (_super) {
    __extends(BodyRow, _super);

    function BodyRow(props) {
      var _this = _super.call(this, props) || this;

      _this.store = props.store;

      var selectedRowKeys = _this.store.getState().selectedRowKeys;

      _this.state = {
        selected: selectedRowKeys.indexOf(props.rowKey) >= 0
      };
      return _this;
    }

    BodyRow.prototype.componentDidMount = function () {
      this.subscribe();
    };

    BodyRow.prototype.componentWillUnmount = function () {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    };

    BodyRow.prototype.subscribe = function () {
      var _this = this;

      var _a = this.props,
          store = _a.store,
          rowKey = _a.rowKey;
      this.unsubscribe = store.subscribe(function () {
        var selectedRowKeys = _this.store.getState().selectedRowKeys;

        var selected = selectedRowKeys.indexOf(rowKey) >= 0;

        if (selected !== _this.state.selected) {
          _this.setState({
            selected: selected
          });
        }
      });
    };

    BodyRow.prototype.render = function () {
      var _a;

      var rowProps = (0, _omit["default"])(this.props, ['prefixCls', 'rowKey', 'store']);
      var className = (0, _classnames["default"])(this.props.className, (_a = {}, _a[this.props.prefixCls + "-row-selected"] = this.state.selected, _a));
      return React.createElement(Component, __assign({}, rowProps, {
        className: className
      }), this.props.children);
    };

    return BodyRow;
  }(React.Component);

  return BodyRow;
}