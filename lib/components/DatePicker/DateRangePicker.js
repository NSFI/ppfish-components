"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateRangeBasePicker2 = _interopRequireDefault(require("./DateRangeBasePicker.js"));

var _DateRangePanel = _interopRequireDefault(require("./panel/DateRangePanel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DateRangePicker =
/*#__PURE__*/
function (_DateRangeBasePicker) {
  _inheritsLoose(DateRangePicker, _DateRangeBasePicker);

  _createClass(DateRangePicker, null, [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        separator: _propTypes.default.string,
        yearCount: _propTypes.default.number,
        shortcuts: _propTypes.default.arrayOf(_propTypes.default.shape({
          text: _propTypes.default.string.isRequired,
          onClick: _propTypes.default.func.isRequired
        })),
        disabledDate: _propTypes.default.func,
        firstDayOfWeek: _propTypes.default.number,
        footer: _propTypes.default.func,
        onError: _propTypes.default.func
      }, _DateRangeBasePicker2.default.propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return Object.assign({}, _DateRangeBasePicker2.default.defaultProps);
    }
  }]);

  function DateRangePicker(props) {
    var _this;

    _this = _DateRangeBasePicker.call(this, props, props.showTime ? 'datetimerange' : 'daterange', {}) || this;

    _defineProperty(_assertThisInitialized(_this), "getFormatSeparator", function () {
      return _this.props.separator;
    });

    return _this;
  }

  var _proto = DateRangePicker.prototype;

  _proto.isDateValid = function isDateValid(value) {
    return _DateRangeBasePicker.prototype.isDateValid.call(this, value) && _DateRangePanel.default.isValid(value, this.props.disabledDate);
  };

  _proto.pickerPanel = function pickerPanel(state) {
    var value = state.value && this.isDateValid(state.value) ? state.value : null;
    return _react.default.createElement(_DateRangePanel.default, _extends({}, this.props, {
      value: value,
      onPick: this.onPicked,
      onCancelPicked: this.onCancelPicked,
      dateToStr: this.dateToStr
    }));
  };

  return DateRangePicker;
}(_DateRangeBasePicker2.default);

exports.default = DateRangePicker;