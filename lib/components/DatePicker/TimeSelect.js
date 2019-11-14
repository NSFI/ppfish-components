"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BasePicker2 = _interopRequireDefault(require("./BasePicker.js"));

var _TimeSelectPanel = _interopRequireDefault(require("./panel/TimeSelectPanel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TimeSelect =
/*#__PURE__*/
function (_BasePicker) {
  _inherits(TimeSelect, _BasePicker);

  _createClass(TimeSelect, null, [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        start: _propTypes["default"].string,
        end: _propTypes["default"].string,
        step: _propTypes["default"].string,
        minTime: _propTypes["default"].string,
        maxTime: _propTypes["default"].string
      }, _BasePicker2["default"].propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return Object.assign({}, _BasePicker2["default"].defaultProps);
    }
  }]);

  function TimeSelect(props) {
    _classCallCheck(this, TimeSelect);

    //props, type, state
    return _possibleConstructorReturn(this, _getPrototypeOf(TimeSelect).call(this, props, 'timeselect', {}));
  }

  _createClass(TimeSelect, [{
    key: "isDateValid",
    value: function isDateValid(value) {
      return _get(_getPrototypeOf(TimeSelect.prototype), "isDateValid", this).call(this, value) && _TimeSelectPanel["default"].isValid(this.dateToStr(value), this.props);
    }
  }, {
    key: "pickerPanel",
    value: function pickerPanel(state) {
      var _this = this;

      var value = state.value && this.isDateValid(state.value) ? this.dateToStr(state.value) : null;
      return _react["default"].createElement(_TimeSelectPanel["default"], _extends({}, this.props, {
        value: value,
        onPicked: this.onPicked,
        dateParser: function dateParser(str) {
          return str ? _this.parseDate(str) : null;
        }
      }));
    }
  }]);

  return TimeSelect;
}(_BasePicker2["default"]);

exports["default"] = TimeSelect;