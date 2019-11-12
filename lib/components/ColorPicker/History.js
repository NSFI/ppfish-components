"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _color = _interopRequireDefault(require("./helpers/color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var History =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(History, _React$Component);

  function History() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = History.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        colorHistory = _this$props.colorHistory,
        maxHistory = _this$props.maxHistory;
    var renderColors = [].concat(colorHistory);

    if (colorHistory.length < maxHistory) {
      renderColors = [].concat(renderColors, new Array(maxHistory - colorHistory.length));
    }

    return _react.default.createElement("div", {
      className: prefixCls + "-history"
    }, renderColors.map(function (obj, key) {
      if (obj) {
        var props = {};

        if (typeof obj === 'object') {
          var _RGB = new _color.default(obj.color).RGB,
              r = _RGB[0],
              g = _RGB[1],
              b = _RGB[2];
          var RGBA = [r, g, b];
          RGBA.push(obj.alpha / 100);
          props = {
            key: key,
            onClick: function onClick() {
              return _this.props.onHistoryClick(obj);
            },
            className: prefixCls + "-history-color",
            style: {
              background: "rgba(" + RGBA.join(',') + ")"
            }
          };
        } else if (typeof obj === 'string') {
          props = {
            key: key,
            onClick: function onClick() {
              return _this.props.onHistoryClick({
                color: obj,
                alpha: 100
              });
            },
            className: prefixCls + "-history-color",
            style: {
              background: obj
            }
          };
        }

        return _react.default.createElement("span", props);
      } else {
        var _props = {
          key: key,
          className: prefixCls + "-history-color"
        };
        return _react.default.createElement("span", _props);
      }
    }));
  };

  return History;
}(_react.default.Component);

exports.default = History;

_defineProperty(History, "propTypes", {
  colorHistory: _propTypes.default.array,
  maxHistory: _propTypes.default.number,
  onHistoryClick: _propTypes.default.func,
  prefixCls: _propTypes.default.string
});