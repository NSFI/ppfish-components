"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../../utils");

var _miniStore = require("mini-store");

var _merge = _interopRequireDefault(require("lodash/merge"));

var _componentClasses = _interopRequireDefault(require("component-classes"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _utils2 = require("./utils");

var _ColumnManager = _interopRequireDefault(require("./ColumnManager"));

var _HeadTable = _interopRequireDefault(require("./HeadTable"));

var _BodyTable = _interopRequireDefault(require("./BodyTable"));

var _ExpandableTable = _interopRequireDefault(require("./ExpandableTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  _createClass(Table, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.columns && nextProps.columns !== prevState.columns) {
        return {
          columns: nextProps.columns,
          children: null
        };
      } else if (nextProps.children !== prevState.children) {
        return {
          columns: null,
          children: nextProps.children
        };
      }

      return null;
    }
  }]);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "getRowKey", function (record, index) {
      var rowKey = _this.props.rowKey;
      var key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
      (0, _utils2.warningOnce)(key !== undefined, 'Each record in table should have a unique `key` prop,' + 'or set `rowKey` to an unique primary key.');
      return key === undefined ? index : key;
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowResize", function () {
      _this.syncFixedTableRowHeight();

      _this.setScrollPositionClassName();
    });

    _defineProperty(_assertThisInitialized(_this), "syncFixedTableRowHeight", function () {
      var tableRect = _this.tableNode.getBoundingClientRect(); // If tableNode's height less than 0, suppose it is hidden and don't recalculate rowHeight.
      // see: https://github.com/ant-design/ant-design/issues/4836


      if (tableRect.height !== undefined && tableRect.height <= 0) {
        return;
      }

      var prefixCls = _this.props.prefixCls;
      var headRows = _this.headTable ? _this.headTable.querySelectorAll('thead') : _this.bodyTable.querySelectorAll('thead');
      var bodyRows = _this.bodyTable.querySelectorAll(".".concat(prefixCls, "-row")) || [];
      var fixedColumnsHeadRowsHeight = [].map.call(headRows, function (row) {
        return row.getBoundingClientRect().height || 'auto';
      });

      var state = _this.store.getState();

      var fixedColumnsBodyRowsHeight = [].reduce.call(bodyRows, function (acc, row) {
        var rowKey = row.getAttribute('data-row-key');
        var height = row.getBoundingClientRect().height || state.fixedColumnsBodyRowsHeight[rowKey] || 'auto';
        acc[rowKey] = height;
        return acc;
      }, {});

      if ((0, _utils.shallowEqual)(state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) && (0, _utils.shallowEqual)(state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)) {
        return;
      }

      _this.store.setState({
        fixedColumnsHeadRowsHeight: fixedColumnsHeadRowsHeight,
        fixedColumnsBodyRowsHeight: fixedColumnsBodyRowsHeight
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleBodyScrollLeft", function (e) {
      // Fix https://github.com/ant-design/ant-design/issues/7635
      if (e.currentTarget !== e.target) {
        return;
      }

      var target = e.target;
      var _this$props$scroll = _this.props.scroll,
          scroll = _this$props$scroll === void 0 ? {} : _this$props$scroll;

      var _assertThisInitialize = _assertThisInitialized(_this),
          headTable = _assertThisInitialize.headTable,
          bodyTable = _assertThisInitialize.bodyTable,
          fixedColumnsBodyLeft = _assertThisInitialize.fixedColumnsBodyLeft,
          fixedColumnsBodyRight = _assertThisInitialize.fixedColumnsBodyRight;

      var scrollLeft = target.scrollLeft;

      if (target === fixedColumnsBodyLeft) {
        // left fixed column
        if (scrollLeft !== _this.lastLeftScrollLeft && scroll.x) {
          _this.setScrollPositionClassName();
        }

        _this.lastLeftScrollLeft = scrollLeft;
      } else if (target === fixedColumnsBodyRight) {
        // right fixed column
        if (scrollLeft !== _this.lastRightScrollLeft && scroll.x) {
          _this.setScrollPositionClassName();
        }

        _this.lastRightScrollLeft = scrollLeft;
      } else {
        // table column
        if (scrollLeft !== _this.lastScrollLeft && scroll.x) {
          if (target === bodyTable && headTable) {
            headTable.scrollLeft = scrollLeft;
          } else if (target === headTable && bodyTable) {
            bodyTable.scrollLeft = scrollLeft;
          }

          _this.setScrollPositionClassName();
        } // Remember last scrollLeft for scroll direction detecting.


        _this.lastScrollLeft = scrollLeft;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBodyScrollTop", function (e) {
      var target = e.target; // Fix https://github.com/ant-design/ant-design/issues/9033

      if (e.currentTarget !== target) {
        return;
      }

      var _this$props$scroll2 = _this.props.scroll,
          scroll = _this$props$scroll2 === void 0 ? {} : _this$props$scroll2;

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          headTable = _assertThisInitialize2.headTable,
          bodyTable = _assertThisInitialize2.bodyTable,
          fixedColumnsBodyLeft = _assertThisInitialize2.fixedColumnsBodyLeft,
          fixedColumnsBodyRight = _assertThisInitialize2.fixedColumnsBodyRight;

      var scrollTop = target.scrollTop;

      if (scrollTop !== _this.lastScrollTop && scroll.y && target !== headTable) {
        if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
          fixedColumnsBodyLeft.scrollTop = scrollTop;
        }

        if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
          fixedColumnsBodyRight.scrollTop = scrollTop;
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      } // Remember last scrollTop for scroll direction detecting.


      _this.lastScrollTop = scrollTop;
    });

    _defineProperty(_assertThisInitialized(_this), "handleBodyScroll", function (e) {
      _this.handleBodyScrollLeft(e);

      _this.handleBodyScrollTop(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleWheel", function (event) {
      var _this$props$scroll3 = _this.props.scroll,
          scroll = _this$props$scroll3 === void 0 ? {} : _this$props$scroll3;

      if (window.navigator.userAgent.match(/Trident\/7\./) && scroll.y) {
        event.preventDefault();
        var wd = event.deltaY;
        var target = event.target;

        var _assertThisInitialize3 = _assertThisInitialized(_this),
            bodyTable = _assertThisInitialize3.bodyTable,
            fixedColumnsBodyLeft = _assertThisInitialize3.fixedColumnsBodyLeft,
            fixedColumnsBodyRight = _assertThisInitialize3.fixedColumnsBodyRight;

        var scrollTop = 0;

        if (_this.lastScrollTop) {
          scrollTop = _this.lastScrollTop + wd;
        } else {
          scrollTop = wd;
        }

        if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
          fixedColumnsBodyLeft.scrollTop = scrollTop;
        }

        if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
          fixedColumnsBodyRight.scrollTop = scrollTop;
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (name) {
      return function (node) {
        _this[name] = node;
      };
    });

    ['onRowClick', 'onRowDoubleClick', 'onRowContextMenu', 'onRowMouseEnter', 'onRowMouseLeave'].forEach(function (name) {
      (0, _utils2.warningOnce)(props[name] === undefined, "".concat(name, " is deprecated, please use onRow instead."));
    });
    (0, _utils2.warningOnce)(props.getBodyWrapper === undefined, 'getBodyWrapper is deprecated, please use custom components instead.');
    _this.columnManager = new _ColumnManager["default"](props.columns, props.children);
    _this.store = (0, _miniStore.create)({
      currentHoverKey: null,
      fixedColumnsHeadRowsHeight: [],
      fixedColumnsBodyRowsHeight: {}
    });

    _this.setScrollPosition('left');

    _this.debouncedWindowResize = (0, _utils2.debounce)(_this.handleWindowResize, 150);
    return _this;
  }

  _createClass(Table, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        table: {
          props: this.props,
          columnManager: this.columnManager,
          saveRef: this.saveRef,
          components: (0, _merge["default"])({
            table: 'table',
            header: {
              wrapper: 'thead',
              row: 'tr',
              cell: 'th'
            },
            body: {
              wrapper: 'tbody',
              row: 'tr',
              cell: 'td'
            }
          }, this.props.components)
        }
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.columnManager.isAnyColumnsFixed()) {
        this.handleWindowResize();
        this.resizeEvent = (0, _utils.addEventListener)(window, 'resize', this.debouncedWindowResize);
      } // https://github.com/ant-design/ant-design/issues/11635


      if (this.headTable) {
        this.headTable.scrollLeft = 0;
      }

      if (this.bodyTable) {
        this.bodyTable.scrollLeft = 0;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.columnManager.isAnyColumnsFixed()) {
        this.handleWindowResize();

        if (!this.resizeEvent) {
          this.resizeEvent = (0, _utils.addEventListener)(window, 'resize', this.debouncedWindowResize);
        }
      } // when table changes to empty, reset scrollLeft


      if (prevProps.data.length > 0 && this.props.data.length === 0 && this.hasScrollX()) {
        this.resetScrollX();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.resizeEvent) {
        this.resizeEvent.remove();
      }

      if (this.debouncedWindowResize) {
        this.debouncedWindowResize.cancel();
      }
    }
  }, {
    key: "setScrollPosition",
    value: function setScrollPosition(position) {
      this.scrollPosition = position;

      if (this.tableNode) {
        var prefixCls = this.props.prefixCls;

        if (position === 'both') {
          (0, _componentClasses["default"])(this.tableNode).remove(new RegExp("^".concat(prefixCls, "-scroll-position-.+$"))).add("".concat(prefixCls, "-scroll-position-left")).add("".concat(prefixCls, "-scroll-position-right"));
        } else {
          (0, _componentClasses["default"])(this.tableNode).remove(new RegExp("^".concat(prefixCls, "-scroll-position-.+$"))).add("".concat(prefixCls, "-scroll-position-").concat(position));
        }
      }
    }
  }, {
    key: "setScrollPositionClassName",
    value: function setScrollPositionClassName() {
      var node = this.bodyTable;
      var scrollToLeft = node.scrollLeft === 0;
      var scrollToRight = node.scrollLeft + 1 >= node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width;

      if (scrollToLeft && scrollToRight) {
        this.setScrollPosition('both');
      } else if (scrollToLeft) {
        this.setScrollPosition('left');
      } else if (scrollToRight) {
        this.setScrollPosition('right');
      } else if (this.scrollPosition !== 'middle') {
        this.setScrollPosition('middle');
      }
    }
  }, {
    key: "resetScrollX",
    value: function resetScrollX() {
      if (this.headTable) {
        this.headTable.scrollLeft = 0;
      }

      if (this.bodyTable) {
        this.bodyTable.scrollLeft = 0;
      }
    }
  }, {
    key: "hasScrollX",
    value: function hasScrollX() {
      var _this$props$scroll4 = this.props.scroll,
          scroll = _this$props$scroll4 === void 0 ? {} : _this$props$scroll4;
      return 'x' in scroll;
    }
  }, {
    key: "renderMainTable",
    value: function renderMainTable() {
      var _this$props = this.props,
          scroll = _this$props.scroll,
          prefixCls = _this$props.prefixCls;
      var isAnyColumnsFixed = this.columnManager.isAnyColumnsFixed();
      var scrollable = isAnyColumnsFixed || scroll.x || scroll.y;
      var table = [this.renderTable({
        columns: this.columnManager.groupedColumns(),
        isAnyColumnsFixed: isAnyColumnsFixed
      }), this.renderEmptyText(), this.renderFooter()];
      return scrollable ? _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-scroll")
      }, table) : table;
    }
  }, {
    key: "renderLeftFixedTable",
    value: function renderLeftFixedTable() {
      var prefixCls = this.props.prefixCls;
      return _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-fixed-left")
      }, this.renderTable({
        columns: this.columnManager.leftColumns(),
        fixed: 'left'
      }));
    }
  }, {
    key: "renderRightFixedTable",
    value: function renderRightFixedTable() {
      var prefixCls = this.props.prefixCls;
      return _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-fixed-right")
      }, this.renderTable({
        columns: this.columnManager.rightColumns(),
        fixed: 'right'
      }));
    }
  }, {
    key: "renderTable",
    value: function renderTable(options) {
      var columns = options.columns,
          fixed = options.fixed,
          isAnyColumnsFixed = options.isAnyColumnsFixed;
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          _this$props2$scroll = _this$props2.scroll,
          scroll = _this$props2$scroll === void 0 ? {} : _this$props2$scroll;
      var tableClassName = scroll.x || fixed ? "".concat(prefixCls, "-fixed") : '';

      var headTable = _react["default"].createElement(_HeadTable["default"], {
        key: "head",
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        handleBodyScrollLeft: this.handleBodyScrollLeft,
        expander: this.expander
      });

      var bodyTable = _react["default"].createElement(_BodyTable["default"], {
        key: "body",
        columns: columns,
        fixed: fixed,
        tableClassName: tableClassName,
        getRowKey: this.getRowKey,
        handleWheel: this.handleWheel,
        handleBodyScroll: this.handleBodyScroll,
        expander: this.expander,
        isAnyColumnsFixed: isAnyColumnsFixed
      });

      return [headTable, bodyTable];
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var _this$props3 = this.props,
          title = _this$props3.title,
          prefixCls = _this$props3.prefixCls;
      return title ? _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-title"),
        key: "title"
      }, title(this.props.data)) : null;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this$props4 = this.props,
          footer = _this$props4.footer,
          prefixCls = _this$props4.prefixCls;
      return footer ? _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-footer"),
        key: "footer"
      }, footer(this.props.data)) : null;
    }
  }, {
    key: "renderEmptyText",
    value: function renderEmptyText() {
      var _this$props5 = this.props,
          emptyText = _this$props5.emptyText,
          prefixCls = _this$props5.prefixCls,
          data = _this$props5.data;

      if (data.length) {
        return null;
      }

      var emptyClassName = "".concat(prefixCls, "-placeholder");
      return _react["default"].createElement("div", {
        className: emptyClassName,
        key: "emptyText"
      }, typeof emptyText === 'function' ? emptyText() : emptyText);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var prefixCls = props.prefixCls;

      if (this.state.columns) {
        this.columnManager.reset(props.columns);
      } else if (this.state.children) {
        this.columnManager.reset(null, props.children);
      }

      var className = props.prefixCls;

      if (props.className) {
        className += " ".concat(props.className);
      }

      if (props.useFixedHeader || props.scroll && props.scroll.y) {
        className += " ".concat(prefixCls, "-fixed-header");
      }

      if (this.scrollPosition === 'both') {
        className += " ".concat(prefixCls, "-scroll-position-left ").concat(prefixCls, "-scroll-position-right");
      } else {
        className += " ".concat(prefixCls, "-scroll-position-").concat(this.scrollPosition);
      }

      var hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
      var hasRightFixed = this.columnManager.isAnyColumnsRightFixed();
      var dataAndAriaProps = (0, _utils2.getDataAndAriaProps)(props);
      return _react["default"].createElement(_miniStore.Provider, {
        store: this.store
      }, _react["default"].createElement(_ExpandableTable["default"], _extends({}, props, {
        columnManager: this.columnManager,
        getRowKey: this.getRowKey
      }), function (expander) {
        _this2.expander = expander;
        return _react["default"].createElement("div", _extends({
          ref: _this2.saveRef('tableNode'),
          className: className,
          style: props.style,
          id: props.id
        }, dataAndAriaProps), _this2.renderTitle(), _react["default"].createElement("div", {
          className: "".concat(prefixCls, "-content")
        }, _this2.renderMainTable(), hasLeftFixed && _this2.renderLeftFixedTable(), hasRightFixed && _this2.renderRightFixedTable()));
      }));
    }
  }]);

  return Table;
}(_react["default"].Component);

_defineProperty(Table, "propTypes", _objectSpread({
  data: _propTypes["default"].array,
  useFixedHeader: _propTypes["default"].bool,
  columns: _propTypes["default"].array,
  prefixCls: _propTypes["default"].string,
  bodyStyle: _propTypes["default"].object,
  style: _propTypes["default"].object,
  rowKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  rowClassName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  onRow: _propTypes["default"].func,
  onHeaderRow: _propTypes["default"].func,
  onRowClick: _propTypes["default"].func,
  onRowDoubleClick: _propTypes["default"].func,
  onRowContextMenu: _propTypes["default"].func,
  onRowMouseEnter: _propTypes["default"].func,
  onRowMouseLeave: _propTypes["default"].func,
  showHeader: _propTypes["default"].bool,
  title: _propTypes["default"].func,
  id: _propTypes["default"].string,
  footer: _propTypes["default"].func,
  emptyText: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  scroll: _propTypes["default"].object,
  rowRef: _propTypes["default"].func,
  getBodyWrapper: _propTypes["default"].func,
  children: _propTypes["default"].node,
  components: _propTypes["default"].shape({
    table: _propTypes["default"].any,
    header: _propTypes["default"].shape({
      wrapper: _propTypes["default"].any,
      row: _propTypes["default"].any,
      cell: _propTypes["default"].any
    }),
    body: _propTypes["default"].shape({
      wrapper: _propTypes["default"].any,
      row: _propTypes["default"].any,
      cell: _propTypes["default"].any
    })
  })
}, _ExpandableTable["default"].PropTypes));

_defineProperty(Table, "childContextTypes", {
  table: _propTypes["default"].any,
  components: _propTypes["default"].any
});

_defineProperty(Table, "defaultProps", {
  data: [],
  useFixedHeader: false,
  rowKey: 'key',
  rowClassName: function rowClassName() {
    return '';
  },
  onRow: function onRow() {},
  onHeaderRow: function onHeaderRow() {},
  prefixCls: 'rc-table',
  bodyStyle: {},
  style: {},
  showHeader: true,
  scroll: {},
  rowRef: function rowRef() {
    return null;
  },
  emptyText: function emptyText() {
    return 'No Data';
  }
});

(0, _reactLifecyclesCompat.polyfill)(Table);
var _default = Table;
exports["default"] = _default;