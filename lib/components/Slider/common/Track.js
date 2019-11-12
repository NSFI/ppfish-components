"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
var Track = function Track(props) {
  var className = props.className,
      included = props.included,
      vertical = props.vertical,
      offset = props.offset,
      length = props.length,
      style = props.style;
  var positonStyle = vertical ? {
    bottom: offset + "%",
    height: length + "%"
  } : {
    left: offset + "%",
    width: length + "%"
  };
  var elStyle = Object.assign({}, style, {}, positonStyle);
  return included ? _react.default.createElement("div", {
    className: className,
    style: elStyle
  }) : null;
};

var _default = Track;
exports.default = _default;