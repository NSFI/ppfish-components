"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _TableRow = _interopRequireDefault(require("./TableRow"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpandableTable =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ExpandableTable, _React$Component);

  function ExpandableTable(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleExpandChange", function (expanded, record, event, rowKey, destroy) {
      if (destroy === void 0) {
        destroy = false;
      }

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      var _this$props = _this.props,
          onExpandedRowsChange = _this$props.onExpandedRowsChange,
          onExpand = _this$props.onExpand;

      var _this$store$getState = _this.store.getState(),
          expandedRowKeys = _this$store$getState.expandedRowKeys;

      if (expanded) {
        // row was expanded
        expandedRowKeys = [].concat(expandedRowKeys, [rowKey]);
      } else {
        // row was collapse
        var expandedRowIndex = expandedRowKeys.indexOf(rowKey);

        if (expandedRowIndex !== -1) {
          expandedRowKeys = (0, _utils.remove)(expandedRowKeys, rowKey);
        }
      }

      if (!_this.props.expandedRowKeys) {
        _this.store.setState({
          expandedRowKeys: expandedRowKeys
        });
      } // De-dup of repeat call


      if (!_this.latestExpandedRows || !(0, _shallowequal.default)(_this.latestExpandedRows, expandedRowKeys)) {
        _this.latestExpandedRows = expandedRowKeys;
        onExpandedRowsChange(expandedRowKeys);
      }

      if (!destroy) {
        onExpand(expanded, record);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderExpandIndentCell", function (rows, fixed) {
      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          expandIconAsCell = _this$props2.expandIconAsCell;

      if (!expandIconAsCell || fixed === 'right' || !rows.length) {
        return;
      }

      var iconColumn = {
        key: 'rc-table-expand-icon-cell',
        className: prefixCls + "-expand-icon-th",
        title: '',
        rowSpan: rows.length
      };
      rows[0].unshift(Object.assign({}, iconColumn, {
        column: iconColumn
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderRows", function (renderRows, rows, record, index, indent, fixed, parentKey, ancestorKeys) {
      var _this$props3 = _this.props,
          expandedRowClassName = _this$props3.expandedRowClassName,
          expandedRowRender = _this$props3.expandedRowRender,
          childrenColumnName = _this$props3.childrenColumnName;
      var childrenData = record[childrenColumnName];
      var nextAncestorKeys = [].concat(ancestorKeys, [parentKey]);
      var nextIndent = indent + 1;

      if (expandedRowRender) {
        rows.push(_this.renderExpandedRow(record, index, expandedRowRender, expandedRowClassName(record, index, indent), nextAncestorKeys, nextIndent, fixed));
      }

      if (childrenData) {
        rows.push.apply(rows, renderRows(childrenData, nextIndent, nextAncestorKeys));
      }
    });

    var data = props.data,
        _childrenColumnName = props.childrenColumnName,
        defaultExpandAllRows = props.defaultExpandAllRows,
        _expandedRowKeys = props.expandedRowKeys,
        defaultExpandedRowKeys = props.defaultExpandedRowKeys,
        getRowKey = props.getRowKey;
    var finnalExpandedRowKeys = [];

    var _rows = [].concat(data);

    if (defaultExpandAllRows) {
      for (var i = 0; i < _rows.length; i++) {
        var row = _rows[i];
        finnalExpandedRowKeys.push(getRowKey(row, i));
        _rows = _rows.concat(row[_childrenColumnName] || []);
      }
    } else {
      finnalExpandedRowKeys = _expandedRowKeys || defaultExpandedRowKeys;
    }

    _this.columnManager = props.columnManager;
    _this.store = props.store;

    _this.store.setState({
      expandedRowsHeight: {},
      expandedRowKeys: finnalExpandedRowKeys
    });

    return _this;
  }

  var _proto = ExpandableTable.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.handleUpdated();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if ('expandedRowKeys' in this.props) {
      this.store.setState({
        expandedRowKeys: this.props.expandedRowKeys
      });
    }

    this.handleUpdated();
  };

  _proto.handleUpdated = function handleUpdated() {
    // We should record latest expanded rows to avoid multiple rows remove
    // cause `onExpandedRowsChange` trigger many times
    this.latestExpandedRows = null;
  };

  _proto.renderExpandedRow = function renderExpandedRow(record, index, _render, className, ancestorKeys, indent, fixed) {
    var _this2 = this;

    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        expandIconAsCell = _this$props4.expandIconAsCell,
        indentSize = _this$props4.indentSize;
    var parentKey = ancestorKeys[ancestorKeys.length - 1];
    var rowKey = parentKey + "-extra-row";
    var components = {
      body: {
        row: 'tr',
        cell: 'td'
      }
    };
    var colCount;

    if (fixed === 'left') {
      colCount = this.columnManager.leftLeafColumns().length;
    } else if (fixed === 'right') {
      colCount = this.columnManager.rightLeafColumns().length;
    } else {
      colCount = this.columnManager.leafColumns().length;
    }

    var columns = [{
      key: 'extra-row',
      render: function render() {
        var _this2$store$getState = _this2.store.getState(),
            expandedRowKeys = _this2$store$getState.expandedRowKeys;

        var expanded = !!~expandedRowKeys.indexOf(parentKey);
        return {
          props: {
            colSpan: colCount
          },
          children: fixed !== 'right' ? _render(record, index, indent, expanded) : '&nbsp;'
        };
      }
    }];

    if (expandIconAsCell && fixed !== 'right') {
      columns.unshift({
        key: 'expand-icon-placeholder',
        render: function render() {
          return null;
        }
      });
    }

    return _react.default.createElement(_TableRow.default, {
      key: rowKey,
      columns: columns,
      className: className,
      rowKey: rowKey,
      ancestorKeys: ancestorKeys,
      prefixCls: prefixCls + "-expanded-row",
      indentSize: indentSize,
      indent: indent,
      fixed: fixed,
      components: components,
      expandedRow: true
    });
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        data = _this$props5.data,
        childrenColumnName = _this$props5.childrenColumnName,
        children = _this$props5.children;
    var needIndentSpaced = data.some(function (record) {
      return record[childrenColumnName];
    });
    return children({
      props: this.props,
      needIndentSpaced: needIndentSpaced,
      renderRows: this.renderRows,
      handleExpandChange: this.handleExpandChange,
      renderExpandIndentCell: this.renderExpandIndentCell
    });
  };

  return ExpandableTable;
}(_react.default.Component);

_defineProperty(ExpandableTable, "propTypes", {
  expandIconAsCell: _propTypes.default.bool,
  expandedRowKeys: _propTypes.default.array,
  expandedRowClassName: _propTypes.default.func,
  defaultExpandAllRows: _propTypes.default.bool,
  defaultExpandedRowKeys: _propTypes.default.array,
  expandIconColumnIndex: _propTypes.default.number,
  expandedRowRender: _propTypes.default.func,
  expandIcon: _propTypes.default.func,
  childrenColumnName: _propTypes.default.string,
  indentSize: _propTypes.default.number,
  onExpand: _propTypes.default.func,
  onExpandedRowsChange: _propTypes.default.func,
  columnManager: _propTypes.default.object.isRequired,
  store: _propTypes.default.object.isRequired,
  prefixCls: _propTypes.default.string.isRequired,
  data: _propTypes.default.array,
  children: _propTypes.default.func.isRequired,
  getRowKey: _propTypes.default.func.isRequired
});

_defineProperty(ExpandableTable, "defaultProps", {
  expandIconAsCell: false,
  expandedRowClassName: function expandedRowClassName() {
    return '';
  },
  expandIconColumnIndex: 0,
  defaultExpandAllRows: false,
  defaultExpandedRowKeys: [],
  childrenColumnName: 'children',
  indentSize: 15,
  onExpand: function onExpand() {},
  onExpandedRowsChange: function onExpandedRowsChange() {}
});

(0, _reactLifecyclesCompat.polyfill)(ExpandableTable);

var _default = (0, _miniStore.connect)()(ExpandableTable);

exports.default = _default;