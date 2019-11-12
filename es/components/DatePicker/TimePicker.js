"use strict";

exports.__esModule = true;
exports.default = exports.converSelectRange = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BasePicker2 = _interopRequireDefault(require("./BasePicker.js"));

var _TimePanel = _interopRequireDefault(require("./panel/TimePanel.js"));

var _constants = require("./constants");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var converSelectRange = function converSelectRange(props) {
  var selectableRange = [];

  if (props.selectableRange) {
    var ranges = props.selectableRange;
    var parser = _constants.TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
    var format = _constants.DEFAULT_FORMATS.timerange;
    ranges = Array.isArray(ranges) ? ranges : [ranges];
    selectableRange = ranges.map(function (range) {
      return parser(range, format);
    });
  }

  return selectableRange;
};

exports.converSelectRange = converSelectRange;

var TimePicker =
/*#__PURE__*/
function (_BasePicker) {
  _inheritsLoose(TimePicker, _BasePicker);

  _createClass(TimePicker, null, [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        // '18:30:00 - 20:30:00' or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        selectableRange: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
        isShowCurrent: _propTypes.default.bool,
        footer: _propTypes.default.func,
        onValueChange: _propTypes.default.func
      }, _BasePicker2.default.propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return Object.assign({}, {
        isShowCurrent: false
      }, _BasePicker2.default.defaultProps);
    }
  }]);

  function TimePicker(props) {
    var _this;

    //props, type, state
    _this = _BasePicker.call(this, props, 'time', {}) || this;

    _defineProperty(_assertThisInitialized(_this), "onSelectionChange", function (start, end) {
      _this.refs.inputRoot.input.setSelectionRange(start, end);

      _this.refs.inputRoot.input.focus();
    });

    _this._onSelectionChange = (0, _debounce.default)(_this.onSelectionChange, 200);
    return _this;
  }

  var _proto = TimePicker.prototype;

  _proto.isDateValid = function isDateValid(value) {
    return _BasePicker.prototype.isDateValid.call(this, value) && _TimePanel.default.isValid(value, converSelectRange(this.props));
  };

  _proto.pickerPanel = function pickerPanel(state) {
    var value = state.value && this.isDateValid(state.value) ? state.value : null;
    return _react.default.createElement(_TimePanel.default, _extends({}, this.props, {
      selectableRange: converSelectRange(this.props),
      onSelectRangeChange: this._onSelectionChange,
      value: value,
      onPicked: this.onPicked,
      onCancelPicked: this.onCancelPicked
    }));
  };

  return TimePicker;
}(_BasePicker2.default);

exports.default = TimePicker;