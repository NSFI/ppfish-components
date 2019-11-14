"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ColGroup;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ColGroup(props, _ref) {
  var table = _ref.table;
  var _table$props = table.props,
      prefixCls = _table$props.prefixCls,
      expandIconAsCell = _table$props.expandIconAsCell;
  var fixed = props.fixed;
  var cols = [];

  if (expandIconAsCell && fixed !== 'right') {
    cols.push(_react["default"].createElement("col", {
      className: "".concat(prefixCls, "-expand-icon-col"),
      key: "rc-table-expand-icon-col"
    }));
  }

  var leafColumns;

  if (fixed === 'left') {
    leafColumns = table.columnManager.leftLeafColumns();
  } else if (fixed === 'right') {
    leafColumns = table.columnManager.rightLeafColumns();
  } else {
    leafColumns = table.columnManager.leafColumns();
  }

  cols = cols.concat(leafColumns.map(function (c) {
    return _react["default"].createElement("col", {
      key: c.key || c.dataIndex,
      style: {
        width: c.width,
        minWidth: c.width
      }
    });
  }));
  return _react["default"].createElement("colgroup", null, cols);
}

ColGroup.propTypes = {
  fixed: _propTypes["default"].string
};
ColGroup.contextTypes = {
  table: _propTypes["default"].any
};