"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BasePicker2 = _interopRequireDefault(require("./BasePicker.js"));

var _DatePanel = _interopRequireDefault(require("./panel/DatePanel.js"));

var _date = require("../../utils/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DatePicker =
/*#__PURE__*/
function (_BasePicker) {
  _inheritsLoose(DatePicker, _BasePicker);

  _createClass(DatePicker, null, [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        shortcuts: _propTypes.default.arrayOf(_propTypes.default.shape({
          text: _propTypes.default.string.isRequired,
          onClick: _propTypes.default.func.isRequired
        })),
        disabledDate: _propTypes.default.func,
        firstDayOfWeek: _propTypes.default.number,
        footer: _propTypes.default.func,
        showTime: _propTypes.default.bool,
        yearCount: _propTypes.default.number,
        showWeekNumber: _propTypes.default.bool,
        mode: _propTypes.default.oneOf(Object.keys(_date.SELECTION_MODES).map(function (e) {
          return _date.SELECTION_MODES[e];
        }))
      }, _BasePicker2.default.propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return Object.assign({}, _BasePicker2.default.defaultProps);
    }
  }]);

  function DatePicker(props) {
    var type = props.showTime ? 'datetime' : 'date';

    switch (props.mode) {
      // case SELECTION_MODES.YEAR:
      //   type = 'year'; break;
      // case SELECTION_MODES.MONTH:
      //   type = 'month'; break;
      case _date.SELECTION_MODES.WEEK:
        type = 'week';
        break;
    }

    return _BasePicker.call(this, props, type, {}) || this;
  }

  var _proto = DatePicker.prototype;

  _proto.isDateValid = function isDateValid(value) {
    return _BasePicker.prototype.isDateValid.call(this, value) && _DatePanel.default.isValid(value, this.props.disabledDate);
  };

  _proto.pickerPanel = function pickerPanel(state) {
    var value = state.value && this.isDateValid(state.value) ? state.value : null;
    return _react.default.createElement(_DatePanel.default, _extends({}, this.props, {
      value: value,
      onPick: this.onPicked,
      onCancelPicked: this.onCancelPicked
    }));
  };

  return DatePicker;
}(_BasePicker2.default);

exports.default = DatePicker;