function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import TableCell from './TableCell';
import { warningOnce } from './utils';

var noop = function noop() {};

var TableRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TableRow, _React$Component);

  _createClass(TableRow, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.visible || !prevState.visible && nextProps.visible) {
        return {
          shouldRender: true,
          visible: nextProps.visible
        };
      }

      return {
        visible: nextProps.visible
      };
    }
  }]);

  function TableRow(props) {
    var _this;

    _classCallCheck(this, TableRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableRow).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onRowClick", function (event) {
      var _this$props = _this.props,
          store = _this$props.store,
          record = _this$props.record,
          index = _this$props.index,
          onRowClick = _this$props.onRowClick,
          activeRowByClick = _this$props.activeRowByClick,
          rowKey = _this$props.rowKey; // 点击高亮功能

      activeRowByClick && store.setState({
        currentClickedKey: rowKey
      });

      if (onRowClick) {
        onRowClick(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRowDoubleClick", function (event) {
      var _this$props2 = _this.props,
          record = _this$props2.record,
          index = _this$props2.index,
          onRowDoubleClick = _this$props2.onRowDoubleClick;

      if (onRowDoubleClick) {
        onRowDoubleClick(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (event) {
      var _this$props3 = _this.props,
          record = _this$props3.record,
          index = _this$props3.index,
          onRowContextMenu = _this$props3.onRowContextMenu;

      if (onRowContextMenu) {
        onRowContextMenu(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (event) {
      var _this$props4 = _this.props,
          record = _this$props4.record,
          index = _this$props4.index,
          onRowMouseEnter = _this$props4.onRowMouseEnter,
          onHover = _this$props4.onHover,
          rowKey = _this$props4.rowKey;
      onHover(true, rowKey);

      if (onRowMouseEnter) {
        onRowMouseEnter(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (event) {
      var _this$props5 = _this.props,
          record = _this$props5.record,
          index = _this$props5.index,
          onRowMouseLeave = _this$props5.onRowMouseLeave,
          onHover = _this$props5.onHover,
          rowKey = _this$props5.rowKey;
      onHover(false, rowKey);

      if (onRowMouseLeave) {
        onRowMouseLeave(record, index, event);
      }
    });

    _this.shouldRender = props.visible;
    _this.state = {};
    return _this;
  }

  _createClass(TableRow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.shouldRender) {
        this.saveRowRef();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !!(this.props.visible || nextProps.visible);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.shouldRender && !this.rowRef) {
        this.saveRowRef();
      }
    }
  }, {
    key: "setExpanedRowHeight",
    value: function setExpanedRowHeight() {
      var _this$props6 = this.props,
          store = _this$props6.store,
          rowKey = _this$props6.rowKey;

      var _store$getState = store.getState(),
          expandedRowsHeight = _store$getState.expandedRowsHeight;

      var height = this.rowRef.getBoundingClientRect().height;
      expandedRowsHeight = _objectSpread({}, expandedRowsHeight, _defineProperty({}, rowKey, height));
      store.setState({
        expandedRowsHeight: expandedRowsHeight
      });
    }
  }, {
    key: "setRowHeight",
    value: function setRowHeight() {
      var _this$props7 = this.props,
          store = _this$props7.store,
          rowKey = _this$props7.rowKey;

      var _store$getState2 = store.getState(),
          fixedColumnsBodyRowsHeight = _store$getState2.fixedColumnsBodyRowsHeight;

      var height = this.rowRef.getBoundingClientRect().height;
      store.setState({
        fixedColumnsBodyRowsHeight: _objectSpread({}, fixedColumnsBodyRowsHeight, _defineProperty({}, rowKey, height))
      });
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$props8 = this.props,
          height = _this$props8.height,
          visible = _this$props8.visible;

      if (height && height !== this.style.height) {
        this.style = _objectSpread({}, this.style, {
          height: height
        });
      }

      if (!visible && !this.style.display) {
        this.style = _objectSpread({}, this.style, {
          display: 'none'
        });
      }

      return this.style;
    }
  }, {
    key: "saveRowRef",
    value: function saveRowRef() {
      this.rowRef = ReactDOM.findDOMNode(this);
      var _this$props9 = this.props,
          isAnyColumnsFixed = _this$props9.isAnyColumnsFixed,
          fixed = _this$props9.fixed,
          expandedRow = _this$props9.expandedRow,
          ancestorKeys = _this$props9.ancestorKeys;

      if (!isAnyColumnsFixed) {
        return;
      }

      if (!fixed && expandedRow) {
        this.setExpanedRowHeight();
      }

      if (!fixed && ancestorKeys.length >= 0) {
        this.setRowHeight();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.shouldRender) {
        return null;
      }

      var _this$props10 = this.props,
          prefixCls = _this$props10.prefixCls,
          columns = _this$props10.columns,
          record = _this$props10.record,
          rowKey = _this$props10.rowKey,
          index = _this$props10.index,
          onRow = _this$props10.onRow,
          indent = _this$props10.indent,
          indentSize = _this$props10.indentSize,
          hovered = _this$props10.hovered,
          clicked = _this$props10.clicked,
          height = _this$props10.height,
          visible = _this$props10.visible,
          components = _this$props10.components,
          hasExpandIcon = _this$props10.hasExpandIcon,
          renderExpandIcon = _this$props10.renderExpandIcon,
          renderExpandIconCell = _this$props10.renderExpandIconCell;
      var BodyRow = components.body.row;
      var BodyCell = components.body.cell;
      var className = this.props.className;

      if (hovered) {
        className += " ".concat(prefixCls, "-hover");
      }

      if (clicked) {
        className += " ".concat(prefixCls, "-click");
      }

      var cells = [];
      renderExpandIconCell(cells);

      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        warningOnce(column.onCellClick === undefined, 'column[onCellClick] is deprecated, please use column[onCell] instead.');
        cells.push(React.createElement(TableCell, {
          prefixCls: prefixCls,
          record: record,
          indentSize: indentSize,
          indent: indent,
          index: index,
          column: column,
          key: column.key || column.dataIndex,
          expandIcon: hasExpandIcon(i) && renderExpandIcon(),
          component: BodyCell
        }));
      }

      var _ref = onRow(record, index) || {},
          customClassName = _ref.className,
          customStyle = _ref.style,
          rowProps = _objectWithoutProperties(_ref, ["className", "style"]);

      var style = {
        height: height
      };

      if (!visible) {
        style.display = 'none';
      }

      style = _objectSpread({}, style, {}, customStyle);
      var rowClassName = classNames(prefixCls, className, "".concat(prefixCls, "-level-").concat(indent), customClassName);
      return React.createElement(BodyRow, _extends({
        onClick: this.onRowClick,
        onDoubleClick: this.onRowDoubleClick,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onContextMenu: this.onContextMenu
      }, rowProps, {
        className: rowClassName,
        style: style,
        "data-row-key": rowKey
      }), cells);
    }
  }]);

  return TableRow;
}(React.Component);

_defineProperty(TableRow, "propTypes", {
  onRow: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  onRowContextMenu: PropTypes.func,
  onRowMouseEnter: PropTypes.func,
  onRowMouseLeave: PropTypes.func,
  record: PropTypes.object,
  prefixCls: PropTypes.string,
  onHover: PropTypes.func,
  columns: PropTypes.array,
  activeRowByClick: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  indent: PropTypes.number,
  indentSize: PropTypes.number,
  hasExpandIcon: PropTypes.func,
  hovered: PropTypes.bool.isRequired,
  clicked: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  renderExpandIcon: PropTypes.func,
  renderExpandIconCell: PropTypes.func,
  components: PropTypes.shape({
    table: PropTypes.any,
    header: PropTypes.shape({
      wrapper: PropTypes.any,
      row: PropTypes.any,
      cell: PropTypes.any
    }),
    body: PropTypes.shape({
      wrapper: PropTypes.any,
      row: PropTypes.any,
      cell: PropTypes.any
    })
  }),
  expandedRow: PropTypes.bool,
  isAnyColumnsFixed: PropTypes.bool,
  ancestorKeys: PropTypes.array.isRequired
});

_defineProperty(TableRow, "defaultProps", {
  onRow: noop,
  onHover: noop,
  hasExpandIcon: noop,
  renderExpandIcon: noop,
  renderExpandIconCell: noop
});

function getRowHeight(state, props) {
  var expandedRowsHeight = state.expandedRowsHeight,
      fixedColumnsBodyRowsHeight = state.fixedColumnsBodyRowsHeight;
  var fixed = props.fixed,
      rowKey = props.rowKey;

  if (!fixed) {
    return null;
  }

  if (expandedRowsHeight[rowKey]) {
    return expandedRowsHeight[rowKey];
  }

  if (fixedColumnsBodyRowsHeight[rowKey]) {
    return fixedColumnsBodyRowsHeight[rowKey];
  }

  return null;
}

polyfill(TableRow);
export default connect(function (state, props) {
  var currentHoverKey = state.currentHoverKey,
      currentClickedKey = state.currentClickedKey,
      expandedRowKeys = state.expandedRowKeys;
  var rowKey = props.rowKey,
      ancestorKeys = props.ancestorKeys;
  var visible = ancestorKeys.length === 0 || ancestorKeys.every(function (k) {
    return ~expandedRowKeys.indexOf(k);
  });
  return {
    visible: visible,
    hovered: currentHoverKey === rowKey,
    clicked: currentClickedKey === rowKey,
    height: getRowHeight(state, props)
  };
})(TableRow);