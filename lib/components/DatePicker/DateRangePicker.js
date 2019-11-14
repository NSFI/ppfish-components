"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateRangeBasePicker2 = _interopRequireDefault(require("./DateRangeBasePicker.js"));

var _DateRangePanel = _interopRequireDefault(require("./panel/DateRangePanel.js"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DateRangePicker =
/*#__PURE__*/
function (_DateRangeBasePicker) {
  _inherits(DateRangePicker, _DateRangeBasePicker);

  _createClass(DateRangePicker, null, [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        separator: _propTypes["default"].string,
        yearCount: _propTypes["default"].number,
        shortcuts: _propTypes["default"].arrayOf(_propTypes["default"].shape({
          text: _propTypes["default"].string.isRequired,
          onClick: _propTypes["default"].func.isRequired
        })),
        disabledDate: _propTypes["default"].func,
        firstDayOfWeek: _propTypes["default"].number,
        footer: _propTypes["default"].func,
        onError: _propTypes["default"].func
      }, _DateRangeBasePicker2["default"].propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return Object.assign({}, _DateRangeBasePicker2["default"].defaultProps);
    }
  }]);

  function DateRangePicker(props) {
    var _this;

    _classCallCheck(this, DateRangePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRangePicker).call(this, props, props.showTime ? 'datetimerange' : 'daterange', {}));

    _defineProperty(_assertThisInitialized(_this), "getFormatSeparator", function () {
      return _this.props.separator;
    });

    return _this;
  }

  _createClass(DateRangePicker, [{
    key: "isDateValid",
    value: function isDateValid(value) {
      return _get(_getPrototypeOf(DateRangePicker.prototype), "isDateValid", this).call(this, value) && _DateRangePanel["default"].isValid(value, this.props.disabledDate);
    }
  }, {
    key: "pickerPanel",
    value: function pickerPanel(state) {
      var value = state.value && this.isDateValid(state.value) ? state.value : null;
      return _react["default"].createElement(_DateRangePanel["default"], _extends({}, this.props, {
        value: value,
        onPick: this.onPicked,
        onCancelPicked: this.onCancelPicked,
        dateToStr: this.dateToStr
      }));
    }
  }]);

  return DateRangePicker;
}(_DateRangeBasePicker2["default"]);

exports["default"] = DateRangePicker;