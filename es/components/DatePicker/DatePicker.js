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

import React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker.js';
import DatePanel from './panel/DatePanel.js';
import { SELECTION_MODES } from '../../utils/date';

var DatePicker =
/*#__PURE__*/
function (_BasePicker) {
  _inherits(DatePicker, _BasePicker);

  _createClass(DatePicker, null, [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        shortcuts: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired
        })),
        disabledDate: PropTypes.func,
        firstDayOfWeek: PropTypes.number,
        footer: PropTypes.func,
        showTime: PropTypes.bool,
        yearCount: PropTypes.number,
        showWeekNumber: PropTypes.bool,
        mode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(function (e) {
          return SELECTION_MODES[e];
        }))
      }, BasePicker.propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return Object.assign({}, BasePicker.defaultProps);
    }
  }]);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var type = props.showTime ? 'datetime' : 'date';

    switch (props.mode) {
      // case SELECTION_MODES.YEAR:
      //   type = 'year'; break;
      // case SELECTION_MODES.MONTH:
      //   type = 'month'; break;
      case SELECTION_MODES.WEEK:
        type = 'week';
        break;
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props, type, {}));
  }

  _createClass(DatePicker, [{
    key: "isDateValid",
    value: function isDateValid(value) {
      return _get(_getPrototypeOf(DatePicker.prototype), "isDateValid", this).call(this, value) && DatePanel.isValid(value, this.props.disabledDate);
    }
  }, {
    key: "pickerPanel",
    value: function pickerPanel(state) {
      var value = state.value && this.isDateValid(state.value) ? state.value : null;
      return React.createElement(DatePanel, _extends({}, this.props, {
        value: value,
        onPick: this.onPicked,
        onCancelPicked: this.onCancelPicked
      }));
    }
  }]);

  return DatePicker;
}(BasePicker);

export { DatePicker as default };