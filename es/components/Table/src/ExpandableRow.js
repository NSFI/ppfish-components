function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import ExpandIcon from './ExpandIcon';

var ExpandableRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExpandableRow, _React$Component);

  function ExpandableRow() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ExpandableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ExpandableRow)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "hasExpandIcon", function (columnIndex) {
      var expandRowByClick = _this.props.expandRowByClick;
      return !_this.expandIconAsCell && !expandRowByClick && columnIndex === _this.expandIconColumnIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "handleExpandChange", function (record, event) {
      var _this$props = _this.props,
          onExpandedChange = _this$props.onExpandedChange,
          expanded = _this$props.expanded,
          rowKey = _this$props.rowKey;

      if (_this.expandable) {
        onExpandedChange(!expanded, record, event, rowKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRowClick", function (record, index, event) {
      var _this$props2 = _this.props,
          expandRowByClick = _this$props2.expandRowByClick,
          onRowClick = _this$props2.onRowClick;

      if (expandRowByClick) {
        _this.handleExpandChange(record, event);
      }

      if (onRowClick) {
        onRowClick(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderExpandIcon", function () {
      var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          expanded = _this$props3.expanded,
          record = _this$props3.record,
          needIndentSpaced = _this$props3.needIndentSpaced,
          expandIcon = _this$props3.expandIcon;

      if (expandIcon) {
        return expandIcon({
          prefixCls: prefixCls,
          expanded: expanded,
          record: record,
          needIndentSpaced: needIndentSpaced,
          expandable: _this.expandable,
          onExpand: _this.handleExpandChange
        });
      }

      return React.createElement(ExpandIcon, {
        expandable: _this.expandable,
        prefixCls: prefixCls,
        onExpand: _this.handleExpandChange,
        needIndentSpaced: needIndentSpaced,
        expanded: expanded,
        record: record
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderExpandIconCell", function (cells) {
      if (!_this.expandIconAsCell) {
        return;
      }

      var prefixCls = _this.props.prefixCls;
      cells.push(React.createElement("td", {
        className: "".concat(prefixCls, "-expand-icon-cell"),
        key: "rc-table-expand-icon-cell"
      }, _this.renderExpandIcon()));
    });

    return _this;
  }

  _createClass(ExpandableRow, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleDestroy();
    }
  }, {
    key: "handleDestroy",
    value: function handleDestroy() {
      var _this$props4 = this.props,
          onExpandedChange = _this$props4.onExpandedChange,
          rowKey = _this$props4.rowKey,
          record = _this$props4.record;

      if (this.expandable) {
        onExpandedChange(false, record, null, rowKey, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          childrenColumnName = _this$props5.childrenColumnName,
          expandedRowRender = _this$props5.expandedRowRender,
          indentSize = _this$props5.indentSize,
          record = _this$props5.record,
          fixed = _this$props5.fixed,
          expanded = _this$props5.expanded;
      this.expandIconAsCell = fixed !== 'right' ? this.props.expandIconAsCell : false;
      this.expandIconColumnIndex = fixed !== 'right' ? this.props.expandIconColumnIndex : -1;
      var childrenData = record[childrenColumnName];
      this.expandable = !!(childrenData || expandedRowRender);
      var expandableRowProps = {
        indentSize: indentSize,
        expanded: expanded,
        // not used in TableRow, but it's required to re-render TableRow when `expanded` changes
        onRowClick: this.handleRowClick,
        hasExpandIcon: this.hasExpandIcon,
        renderExpandIcon: this.renderExpandIcon,
        renderExpandIconCell: this.renderExpandIconCell
      };
      return this.props.children(expandableRowProps);
    }
  }]);

  return ExpandableRow;
}(React.Component);

_defineProperty(ExpandableRow, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  record: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  indentSize: PropTypes.number,
  needIndentSpaced: PropTypes.bool.isRequired,
  expandRowByClick: PropTypes.bool,
  expanded: PropTypes.bool.isRequired,
  expandIconAsCell: PropTypes.bool,
  expandIconColumnIndex: PropTypes.number,
  childrenColumnName: PropTypes.string,
  expandedRowRender: PropTypes.func,
  expandIcon: PropTypes.func,
  onExpandedChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  children: PropTypes.func.isRequired
});

export default connect(function (_ref, _ref2) {
  var expandedRowKeys = _ref.expandedRowKeys;
  var rowKey = _ref2.rowKey;
  return {
    expanded: !!~expandedRowKeys.indexOf(rowKey)
  };
})(ExpandableRow);