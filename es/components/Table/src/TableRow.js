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

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _classnames = _interopRequireDefault(require("classnames"));

var _TableCell = _interopRequireDefault(require("./TableCell"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

var TableRow =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TableRow, _React$Component);

  TableRow.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.visible || !prevState.visible && nextProps.visible) {
      return {
        shouldRender: true,
        visible: nextProps.visible
      };
    }

    return {
      visible: nextProps.visible
    };
  };

  function TableRow(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

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

  var _proto = TableRow.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.state.shouldRender) {
      this.saveRowRef();
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !!(this.props.visible || nextProps.visible);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.state.shouldRender && !this.rowRef) {
      this.saveRowRef();
    }
  };

  _proto.setExpanedRowHeight = function setExpanedRowHeight() {
    var _Object$assign;

    var _this$props6 = this.props,
        store = _this$props6.store,
        rowKey = _this$props6.rowKey;

    var _store$getState = store.getState(),
        expandedRowsHeight = _store$getState.expandedRowsHeight;

    var height = this.rowRef.getBoundingClientRect().height;
    expandedRowsHeight = Object.assign({}, expandedRowsHeight, (_Object$assign = {}, _Object$assign[rowKey] = height, _Object$assign));
    store.setState({
      expandedRowsHeight: expandedRowsHeight
    });
  };

  _proto.setRowHeight = function setRowHeight() {
    var _Object$assign2;

    var _this$props7 = this.props,
        store = _this$props7.store,
        rowKey = _this$props7.rowKey;

    var _store$getState2 = store.getState(),
        fixedColumnsBodyRowsHeight = _store$getState2.fixedColumnsBodyRowsHeight;

    var height = this.rowRef.getBoundingClientRect().height;
    store.setState({
      fixedColumnsBodyRowsHeight: Object.assign({}, fixedColumnsBodyRowsHeight, (_Object$assign2 = {}, _Object$assign2[rowKey] = height, _Object$assign2))
    });
  };

  _proto.getStyle = function getStyle() {
    var _this$props8 = this.props,
        height = _this$props8.height,
        visible = _this$props8.visible;

    if (height && height !== this.style.height) {
      this.style = Object.assign({}, this.style, {
        height: height
      });
    }

    if (!visible && !this.style.display) {
      this.style = Object.assign({}, this.style, {
        display: 'none'
      });
    }

    return this.style;
  };

  _proto.saveRowRef = function saveRowRef() {
    this.rowRef = _reactDom.default.findDOMNode(this);
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
  };

  _proto.render = function render() {
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
      className += " " + prefixCls + "-hover";
    }

    if (clicked) {
      className += " " + prefixCls + "-click";
    }

    var cells = [];
    renderExpandIconCell(cells);

    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];
      (0, _utils.warningOnce)(column.onCellClick === undefined, 'column[onCellClick] is deprecated, please use column[onCell] instead.');
      cells.push(_react.default.createElement(_TableCell.default, {
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
        rowProps = _objectWithoutPropertiesLoose(_ref, ["className", "style"]);

    var style = {
      height: height
    };

    if (!visible) {
      style.display = 'none';
    }

    style = Object.assign({}, style, {}, customStyle);
    var rowClassName = (0, _classnames.default)(prefixCls, className, prefixCls + "-level-" + indent, customClassName);
    return _react.default.createElement(BodyRow, _extends({
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
  };

  return TableRow;
}(_react.default.Component);

_defineProperty(TableRow, "propTypes", {
  onRow: _propTypes.default.func,
  onRowClick: _propTypes.default.func,
  onRowDoubleClick: _propTypes.default.func,
  onRowContextMenu: _propTypes.default.func,
  onRowMouseEnter: _propTypes.default.func,
  onRowMouseLeave: _propTypes.default.func,
  record: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  onHover: _propTypes.default.func,
  columns: _propTypes.default.array,
  activeRowByClick: _propTypes.default.bool,
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  index: _propTypes.default.number,
  rowKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  className: _propTypes.default.string,
  indent: _propTypes.default.number,
  indentSize: _propTypes.default.number,
  hasExpandIcon: _propTypes.default.func,
  hovered: _propTypes.default.bool.isRequired,
  clicked: _propTypes.default.bool.isRequired,
  visible: _propTypes.default.bool.isRequired,
  store: _propTypes.default.object.isRequired,
  fixed: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  renderExpandIcon: _propTypes.default.func,
  renderExpandIconCell: _propTypes.default.func,
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
  expandedRow: _propTypes.default.bool,
  isAnyColumnsFixed: _propTypes.default.bool,
  ancestorKeys: _propTypes.default.array.isRequired
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

(0, _reactLifecyclesCompat.polyfill)(TableRow);

var _default = (0, _miniStore.connect)(function (state, props) {
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

exports.default = _default;