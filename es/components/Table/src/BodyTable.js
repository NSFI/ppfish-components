"use strict";

exports.__esModule = true;
exports.default = BodyTable;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.fixed");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

var _BaseTable = _interopRequireDefault(require("./BaseTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BodyTable(props, _ref) {
  var table = _ref.table;
  var _table$props = table.props,
      prefixCls = _table$props.prefixCls,
      scroll = _table$props.scroll;
  var columns = props.columns,
      fixed = props.fixed,
      tableClassName = props.tableClassName,
      getRowKey = props.getRowKey,
      handleBodyScroll = props.handleBodyScroll,
      handleWheel = props.handleWheel,
      expander = props.expander,
      isAnyColumnsFixed = props.isAnyColumnsFixed;
  var saveRef = table.saveRef;
  var useFixedHeader = table.props.useFixedHeader;
  var bodyStyle = Object.assign({}, table.props.bodyStyle);
  var innerBodyStyle = {};

  if (scroll.x || fixed) {
    bodyStyle.overflowX = bodyStyle.overflowX || 'scroll'; // Fix weired webkit render bug
    // https://github.com/ant-design/ant-design/issues/7783

    bodyStyle.WebkitTransform = 'translate3d (0, 0, 0)';
  }

  if (scroll.y) {
    // maxHeight will make fixed-Table scrolling not working
    // so we only set maxHeight to body-Table here
    if (fixed) {
      innerBodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
      innerBodyStyle.overflowY = bodyStyle.overflowY || 'scroll';
    } else {
      bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
    }

    bodyStyle.overflowY = bodyStyle.overflowY || 'scroll';
    useFixedHeader = true; // Add negative margin bottom for scroll bar overflow bug

    var scrollbarWidth = (0, _utils.measureScrollbar)();

    if (scrollbarWidth > 0 && fixed) {
      bodyStyle.marginBottom = "-" + scrollbarWidth + "px";
      bodyStyle.paddingBottom = '0px';
    }
  }

  var baseTable = _react.default.createElement(_BaseTable.default, {
    tableClassName: tableClassName,
    hasHead: !useFixedHeader,
    hasBody: true,
    fixed: fixed,
    columns: columns,
    expander: expander,
    getRowKey: getRowKey,
    isAnyColumnsFixed: isAnyColumnsFixed
  });

  if (fixed && columns.length) {
    var refName;

    if (columns[0].fixed === 'left' || columns[0].fixed === true) {
      refName = 'fixedColumnsBodyLeft';
    } else if (columns[0].fixed === 'right') {
      refName = 'fixedColumnsBodyRight';
    }

    delete bodyStyle.overflowX;
    delete bodyStyle.overflowY;
    return _react.default.createElement("div", {
      key: "bodyTable",
      className: prefixCls + "-body-outer",
      style: Object.assign({}, bodyStyle)
    }, _react.default.createElement("div", {
      className: prefixCls + "-body-inner",
      style: innerBodyStyle,
      ref: saveRef(refName),
      onWheel: handleWheel,
      onScroll: handleBodyScroll
    }, baseTable));
  }

  return _react.default.createElement("div", {
    key: "bodyTable",
    className: prefixCls + "-body",
    style: bodyStyle,
    ref: saveRef('bodyTable'),
    onWheel: handleWheel,
    onScroll: handleBodyScroll
  }, baseTable);
}

BodyTable.propTypes = {
  fixed: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  columns: _propTypes.default.array.isRequired,
  tableClassName: _propTypes.default.string.isRequired,
  handleWheel: _propTypes.default.func.isRequired,
  handleBodyScroll: _propTypes.default.func.isRequired,
  getRowKey: _propTypes.default.func.isRequired,
  expander: _propTypes.default.object.isRequired,
  isAnyColumnsFixed: _propTypes.default.bool
};
BodyTable.contextTypes = {
  table: _propTypes.default.any
};