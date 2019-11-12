"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BasePicker2 = _interopRequireDefault(require("./BasePicker.js"));

var _TimeSelectPanel = _interopRequireDefault(require("./panel/TimeSelectPanel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TimeSelect =
/*#__PURE__*/
function (_BasePicker) {
  _inheritsLoose(TimeSelect, _BasePicker);

  _createClass(TimeSelect, null, [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        start: _propTypes.default.string,
        end: _propTypes.default.string,
        step: _propTypes.default.string,
        minTime: _propTypes.default.string,
        maxTime: _propTypes.default.string
      }, _BasePicker2.default.propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return Object.assign({}, _BasePicker2.default.defaultProps);
    }
  }]);

  function TimeSelect(props) {
    //props, type, state
    return _BasePicker.call(this, props, 'timeselect', {}) || this;
  }

  var _proto = TimeSelect.prototype;

  _proto.isDateValid = function isDateValid(value) {
    return _BasePicker.prototype.isDateValid.call(this, value) && _TimeSelectPanel.default.isValid(this.dateToStr(value), this.props);
  };

  _proto.pickerPanel = function pickerPanel(state) {
    var _this = this;

    var value = state.value && this.isDateValid(state.value) ? this.dateToStr(state.value) : null;
    return _react.default.createElement(_TimeSelectPanel.default, _extends({}, this.props, {
      value: value,
      onPicked: this.onPicked,
      dateParser: function dateParser(str) {
        return str ? _this.parseDate(str) : null;
      }
    }));
  };

  return TimeSelect;
}(_BasePicker2.default);

exports.default = TimeSelect;