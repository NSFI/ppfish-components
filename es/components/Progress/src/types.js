"use strict";

exports.__esModule = true;
exports.propTypes = exports.defaultProps = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1
};
exports.defaultProps = defaultProps;
var propTypes = {
  className: _propTypes.default.string,
  percent: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  prefixCls: _propTypes.default.string,
  strokeColor: _propTypes.default.string,
  strokeLinecap: _propTypes.default.oneOf(['butt', 'round', 'square']),
  strokeWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  style: _propTypes.default.object,
  trailColor: _propTypes.default.string,
  trailWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
exports.propTypes = propTypes;