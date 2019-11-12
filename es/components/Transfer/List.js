"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _PureRenderMixin = _interopRequireDefault(require("../Checkbox/src/PureRenderMixin"));

var _Search = _interopRequireDefault(require("./Search"));

var _Item = _interopRequireDefault(require("./Item"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _triggerEvent = _interopRequireDefault(require("../../utils/triggerEvent"));

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

// case sensitive
function isIEorEDGE() {
  return document.documentMode || /Edge/.test(navigator.userAgent);
}

function noop() {}

function isRenderResultPlainObject(result) {
  return result && !React.isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]';
}

var TransferList =
/** @class */
function (_super) {
  __extends(TransferList, _super);

  function TransferList(props) {
    var _this = _super.call(this, props) || this;

    _this.handleSelect = function (selectedItem, direction) {
      var _a = _this.props,
          checkedKeys = _a.checkedKeys,
          mode = _a.mode;

      if (mode === 'single') {
        if (direction === 'right') {
          return;
        }

        _this.props.handleSelect(selectedItem, true);
      } else {
        var result = checkedKeys.some(function (key) {
          return key === selectedItem.key;
        });

        _this.props.handleSelect(selectedItem, !result);
      }
    }; // single模式下，点击目标列表中的关闭按钮


    _this.handleClose = function (selectedItem) {
      _this.props.handleClose(selectedItem);
    };

    _this.handleFilter = function (e) {
      _this.props.handleFilter(e);

      if (!e.target.value) {
        return;
      } // Manually trigger scroll event for lazy search bug
      // https://github.com/ant-design/ant-design/issues/5631


      _this.triggerScrollTimer = window.setTimeout(function () {
        var transferNode = ReactDOM.findDOMNode(_this);
        var listNode = transferNode.querySelectorAll('.fishd-transfer-list-content')[0];

        if (listNode) {
          (0, _triggerEvent.default)(listNode, 'scroll');
        }
      }, 0);

      _this.fixIERepaint();
    };

    _this.handleClear = function () {
      _this.props.handleClear();

      _this.fixIERepaint();
    };

    _this.matchFilter = function (text, item) {
      var _a = _this.props,
          filter = _a.filter,
          filterOption = _a.filterOption;

      if (filterOption) {
        return filterOption(filter, item);
      }

      return text.indexOf(filter) >= 0;
    };

    _this.renderItem = function (item) {
      var _a = _this.props.render,
          render = _a === void 0 ? noop : _a;
      var renderResult = render(item);
      var isRenderResultPlain = isRenderResultPlainObject(renderResult);
      return {
        renderedText: isRenderResultPlain ? renderResult.value : renderResult,
        renderedEl: isRenderResultPlain ? renderResult.label : renderResult
      };
    };

    _this.saveNotFoundRef = function (node) {
      _this.notFoundNode = node;
    };

    _this.state = {
      mounted: false
    };
    return _this;
  }

  TransferList.prototype.componentDidMount = function () {
    var _this = this;

    this.timer = window.setTimeout(function () {
      _this.setState({
        mounted: true
      });
    }, 0);
  };

  TransferList.prototype.componentWillUnmount = function () {
    clearTimeout(this.timer);
    clearTimeout(this.triggerScrollTimer);
    clearTimeout(this.fixIERepaintTimer);
  };

  TransferList.prototype.shouldComponentUpdate = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return _PureRenderMixin.default.shouldComponentUpdate.apply(this, args);
  };

  TransferList.prototype.getCheckStatus = function (filteredDataSource) {
    var checkedKeys = this.props.checkedKeys;

    if (checkedKeys.length === 0) {
      return 'none';
    } else if (filteredDataSource.every(function (item) {
      return checkedKeys.indexOf(item.key) >= 0;
    })) {
      return 'all';
    }

    return 'part';
  }; // Fix IE/Edge repaint
  // https://github.com/ant-design/ant-design/issues/9697
  // https://stackoverflow.com/q/27947912/3040605


  TransferList.prototype.fixIERepaint = function () {
    var _this = this;

    if (!isIEorEDGE()) {
      return;
    }

    this.fixIERepaintTimer = window.setTimeout(function () {
      if (_this.notFoundNode) {
        _this.notFoundNode.className = _this.notFoundNode.className;
      }
    }, 0);
  };

  TransferList.prototype.render = function () {
    var _a;

    var _this = this;

    var _b = this.props,
        mode = _b.mode,
        direction = _b.direction,
        prefixCls = _b.prefixCls,
        dataSource = _b.dataSource,
        titleText = _b.titleText,
        checkedKeys = _b.checkedKeys,
        lazy = _b.lazy,
        _c = _b.body,
        body = _c === void 0 ? noop : _c,
        _d = _b.footer,
        footer = _d === void 0 ? noop : _d,
        showSearch = _b.showSearch,
        style = _b.style,
        filter = _b.filter,
        searchPlaceholder = _b.searchPlaceholder,
        notFoundContent = _b.notFoundContent,
        itemUnit = _b.itemUnit,
        itemsUnit = _b.itemsUnit,
        onScroll = _b.onScroll; // Custom Layout

    var footerDom = footer(__assign({}, this.props));
    var bodyDom = body(__assign({}, this.props));
    var listCls = (0, _classnames.default)(prefixCls, (_a = {}, _a[prefixCls + "-with-footer"] = !!footerDom, _a));
    var filteredDataSource = [];
    var totalDataSource = [];
    var showItems = dataSource.map(function (item) {
      var _a = _this.renderItem(item),
          renderedText = _a.renderedText,
          renderedEl = _a.renderedEl;

      if (filter && filter.trim() && !_this.matchFilter(renderedText, item)) {
        return null;
      } // all show items


      totalDataSource.push(item);

      if (!item.disabled) {
        // response to checkAll items
        filteredDataSource.push(item);
      }

      var checked = checkedKeys.indexOf(item.key) >= 0;
      return React.createElement(_Item.default, {
        mode: mode,
        direction: direction,
        key: item.key,
        item: item,
        lazy: lazy,
        renderedText: renderedText,
        renderedEl: renderedEl,
        checked: checked,
        prefixCls: prefixCls,
        onClick: _this.handleSelect,
        onClose: _this.handleClose
      });
    });
    var unit = dataSource.length > 1 ? itemsUnit : itemUnit;
    var search = showSearch ? React.createElement("div", {
      className: prefixCls + "-body-search-wrapper"
    }, React.createElement(_Search.default, {
      prefixCls: prefixCls + "-search",
      onChange: this.handleFilter,
      handleClear: this.handleClear,
      placeholder: searchPlaceholder,
      value: filter
    })) : null;
    var listBody = bodyDom || React.createElement("div", {
      className: showSearch ? prefixCls + "-body " + prefixCls + "-body-with-search" : prefixCls + "-body"
    }, search, React.createElement(_rcAnimate.default, {
      component: "ul",
      componentProps: {
        onScroll: onScroll
      },
      className: prefixCls + "-content",
      transitionName: this.state.mounted ? prefixCls + "-content-item-highlight" : '',
      transitionLeave: false
    }, showItems), React.createElement("div", {
      className: prefixCls + "-body-not-found",
      ref: this.saveNotFoundRef
    }, notFoundContent));
    var listFooter = footerDom ? React.createElement("div", {
      className: prefixCls + "-footer"
    }, footerDom) : null;
    var checkStatus = this.getCheckStatus(filteredDataSource);
    var checkedAll = checkStatus === 'all';
    var checkAllCheckbox = React.createElement(_Checkbox.default, {
      ref: "checkbox",
      checked: checkedAll,
      indeterminate: checkStatus === 'part',
      onChange: function onChange() {
        return _this.props.handleSelectAll(filteredDataSource, checkedAll);
      }
    });
    return React.createElement("div", {
      className: listCls,
      style: style
    }, React.createElement("div", {
      className: prefixCls + "-header"
    }, mode === 'multiple' ? checkAllCheckbox : null, React.createElement("span", {
      className: prefixCls + "-header-title"
    }, titleText), React.createElement("span", {
      className: prefixCls + "-header-selected"
    }, mode === 'multiple' ? checkedKeys.length + "/" + totalDataSource.length : "" + totalDataSource.length, " ", unit)), listBody, listFooter);
  };

  TransferList.defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
    lazy: {}
  };
  return TransferList;
}(React.Component);

var _default = TransferList;
exports.default = _default;