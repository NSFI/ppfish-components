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

import React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker.js';
import TimePanel from './panel/TimePanel.js';
import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import debounce from 'lodash/debounce';
export var converSelectRange = function converSelectRange(props) {
  var selectableRange = [];

  if (props.selectableRange) {
    var ranges = props.selectableRange;
    var parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
    var format = DEFAULT_FORMATS.timerange;
    ranges = Array.isArray(ranges) ? ranges : [ranges];
    selectableRange = ranges.map(function (range) {
      return parser(range, format);
    });
  }

  return selectableRange;
};

var TimePicker =
/*#__PURE__*/
function (_BasePicker) {
  _inherits(TimePicker, _BasePicker);

  _createClass(TimePicker, null, [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        // '18:30:00 - 20:30:00' or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        selectableRange: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        isShowCurrent: PropTypes.bool,
        footer: PropTypes.func,
        onValueChange: PropTypes.func
      }, BasePicker.propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return Object.assign({}, {
        isShowCurrent: false
      }, BasePicker.defaultProps);
    }
  }]);

  function TimePicker(props) {
    var _this;

    _classCallCheck(this, TimePicker);

    //props, type, state
    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimePicker).call(this, props, 'time', {}));

    _defineProperty(_assertThisInitialized(_this), "onSelectionChange", function (start, end) {
      _this.refs.inputRoot.input.setSelectionRange(start, end);

      _this.refs.inputRoot.input.focus();
    });

    _this._onSelectionChange = debounce(_this.onSelectionChange, 200);
    return _this;
  }

  _createClass(TimePicker, [{
    key: "isDateValid",
    value: function isDateValid(value) {
      return _get(_getPrototypeOf(TimePicker.prototype), "isDateValid", this).call(this, value) && TimePanel.isValid(value, converSelectRange(this.props));
    }
  }, {
    key: "pickerPanel",
    value: function pickerPanel(state) {
      var value = state.value && this.isDateValid(state.value) ? state.value : null;
      return React.createElement(TimePanel, _extends({}, this.props, {
        selectableRange: converSelectRange(this.props),
        onSelectRangeChange: this._onSelectionChange,
        value: value,
        onPicked: this.onPicked,
        onCancelPicked: this.onCancelPicked
      }));
    }
  }]);

  return TimePicker;
}(BasePicker);

export { TimePicker as default };