function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import Color from "./helpers/color";

var History =
/*#__PURE__*/
function (_React$Component) {
  _inherits(History, _React$Component);

  function History() {
    _classCallCheck(this, History);

    return _possibleConstructorReturn(this, _getPrototypeOf(History).apply(this, arguments));
  }

  _createClass(History, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          colorHistory = _this$props.colorHistory,
          maxHistory = _this$props.maxHistory;

      var renderColors = _toConsumableArray(colorHistory);

      if (colorHistory.length < maxHistory) {
        renderColors = [].concat(_toConsumableArray(renderColors), _toConsumableArray(new Array(maxHistory - colorHistory.length)));
      }

      return React.createElement("div", {
        className: "".concat(prefixCls, "-history")
      }, renderColors.map(function (obj, key) {
        if (obj) {
          var props = {};

          if (_typeof(obj) === 'object') {
            var _RGB = _slicedToArray(new Color(obj.color).RGB, 3),
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
              className: "".concat(prefixCls, "-history-color"),
              style: {
                background: "rgba(".concat(RGBA.join(','), ")")
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
              className: "".concat(prefixCls, "-history-color"),
              style: {
                background: obj
              }
            };
          }

          return React.createElement("span", props);
        } else {
          var _props = {
            key: key,
            className: "".concat(prefixCls, "-history-color")
          };
          return React.createElement("span", _props);
        }
      }));
    }
  }]);

  return History;
}(React.Component);

_defineProperty(History, "propTypes", {
  colorHistory: PropTypes.array,
  maxHistory: PropTypes.number,
  onHistoryClick: PropTypes.func,
  prefixCls: PropTypes.string
});

export { History as default };