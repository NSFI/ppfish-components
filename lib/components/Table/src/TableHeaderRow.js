"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function TableHeaderRow(_ref) {
  var row = _ref.row,
      index = _ref.index,
      height = _ref.height,
      components = _ref.components,
      onHeaderRow = _ref.onHeaderRow,
      prefixCls = _ref.prefixCls;
  var HeaderRow = components.header.row;
  var HeaderCell = components.header.cell;
  var rowProps = onHeaderRow(row.map(function (cell) {
    return cell.column;
  }), index);
  var customStyle = rowProps ? rowProps.style : {};
  var style = Object.assign({
    height: height
  }, customStyle);
  return _react.default.createElement(HeaderRow, _extends({}, rowProps, {
    style: style
  }), row.map(function (cell, i) {
    var column = cell.column,
        cellProps = _objectWithoutPropertiesLoose(cell, ["column"]);

    var customProps = column.onHeaderCell ? column.onHeaderCell(column) : {};

    if (column.align) {
      var _classNames;

      customProps.style = Object.assign({}, customProps.style, {
        textAlign: column.align
      });
      customProps.className = (0, _classnames.default)(customProps.className, column.className, (_classNames = {}, _classNames[prefixCls + "-align-" + column.align] = !!column.align, _classNames));
    }

    return _react.default.createElement(HeaderCell, _extends({}, cellProps, customProps, {
      key: column.key || column.dataIndex || i
    }));
  }));
}

TableHeaderRow.propTypes = {
  row: _propTypes.default.array,
  index: _propTypes.default.number,
  prefixCls: _propTypes.default.string,
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  components: _propTypes.default.shape({
    table: _propTypes.default.any,
    header: _propTypes.default.shape({
      wrapper: _propTypes.default.any,
      row: _propTypes.default.any,
      cell: _propTypes.default.any
    }),
    body: _propTypes.default.shape({
      wrapper: _propTypes.default.any,
      row: _propTypes.default.any,
      cell: _propTypes.default.any
    })
  }),
  onHeaderRow: _propTypes.default.func
};

function getRowHeight(state, props) {
  var fixedColumnsHeadRowsHeight = state.fixedColumnsHeadRowsHeight;
  var columns = props.columns,
      rows = props.rows,
      fixed = props.fixed;
  var headerHeight = fixedColumnsHeadRowsHeight[0];

  if (!fixed) {
    return null;
  }

  if (headerHeight && columns) {
    if (headerHeight === 'auto') {
      return 'auto';
    }

    return headerHeight / rows.length;
  }

  return null;
}

var _default = (0, _miniStore.connect)(function (state, props) {
  return {
    height: getRowHeight(state, props)
  };
})(TableHeaderRow);

exports.default = _default;