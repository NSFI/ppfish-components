"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Column() {}

Column.propTypes = {
  className: _propTypes.default.string,
  colSpan: _propTypes.default.number,
  title: _propTypes.default.node,
  dataIndex: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  fixed: _propTypes.default.oneOf([true, 'left', 'right']),
  render: _propTypes.default.func,
  onCellClick: _propTypes.default.func,
  onCell: _propTypes.default.func,
  onHeaderCell: _propTypes.default.func
};
var _default = Column;
exports.default = _default;