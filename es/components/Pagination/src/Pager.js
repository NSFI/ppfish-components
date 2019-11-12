"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pager = function Pager(props) {
  var prefixCls = props.rootPrefixCls + "-item";
  var cls = prefixCls + " " + prefixCls + "-" + props.page;

  if (props.active) {
    cls = cls + " " + prefixCls + "-active";
  }

  if (props.className) {
    cls = cls + " " + props.className;
  }

  var handleClick = function handleClick() {
    props.onClick(props.page);
  };

  var handleKeyPress = function handleKeyPress(e) {
    props.onKeyPress(e, props.onClick, props.page);
  };

  return _react.default.createElement("li", {
    title: props.showTitle ? props.page : null,
    className: cls,
    onClick: handleClick,
    onKeyPress: handleKeyPress,
    tabIndex: "0"
  }, props.itemRender(props.page, 'page', _react.default.createElement("a", null, props.page)));
};

Pager.propTypes = {
  page: _propTypes.default.number,
  active: _propTypes.default.bool,
  last: _propTypes.default.bool,
  locale: _propTypes.default.object,
  className: _propTypes.default.string,
  showTitle: _propTypes.default.bool,
  rootPrefixCls: _propTypes.default.string,
  onClick: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  itemRender: _propTypes.default.func
};
var _default = Pager;
exports.default = _default;