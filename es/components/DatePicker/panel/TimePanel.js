function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TimeSpinner from '../basic/TimeSpinner.js';
import { limitRange, isLimitRange, parseDate } from '../../../utils/date';
import { DEFAULT_FORMATS } from '../constants';
import Locale from '../../../utils/date/locale';
import isEqual from 'lodash/isEqual';

var mapPropsToState = function mapPropsToState(props) {
  var format = props.format,
      value = props.value,
      selectableRange = props.selectableRange;
  var state = {
    format: format || DEFAULT_FORMATS.time,
    currentDate: value || parseDate('00:00:00', DEFAULT_FORMATS.time),
    confirmButtonDisabled: value === null || !TimePanel.isValid(value, selectableRange),
    currentButtonDisabled: !isLimitRange(new Date(), selectableRange, DEFAULT_FORMATS.time)
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;
  return state;
};

var TimePanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimePanel, _React$Component);

  _createClass(TimePanel, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ("value" in nextProps && !isEqual(nextProps.value, prevState.prevPropValue)) {
        var state = mapPropsToState(nextProps);
        state.prevPropValue = nextProps.value;
        return state;
      }

      return null;
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        prefixCls: PropTypes.string,
        format: PropTypes.string,
        //basePicker
        value: PropTypes.instanceOf(Date),
        //basePicker
        onPicked: PropTypes.func.isRequired,
        //basePicker
        onCancelPicked: PropTypes.func.isRequired,
        //basePicker
        selectableRange: TimeSpinner.propTypes.selectableRange,
        onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange,
        isShowCurrent: PropTypes.bool,
        footer: PropTypes.func,
        onValueChange: PropTypes.func
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        prefixCls: 'fishd',
        isShowCurrent: false,
        onValueChange: function onValueChange() {}
      };
    }
  }]);

  function TimePanel(props) {
    var _this;

    _classCallCheck(this, TimePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (date) {
      var currentDate = _this.state.currentDate;
      var newDate = new Date(currentDate);

      if (date.hours !== undefined) {
        newDate.setHours(date.hours);
      }

      if (date.minutes !== undefined) {
        newDate.setMinutes(date.minutes);
      }

      if (date.seconds !== undefined) {
        newDate.setSeconds(date.seconds);
      }

      if (!TimePanel.isValid(newDate, _this.props.selectableRange)) {
        _this.setState({
          confirmButtonDisabled: true,
          currentDate: newDate
        }, function () {
          _this.props.onValueChange(newDate);
        });
      } else {
        _this.setState({
          confirmButtonDisabled: false,
          currentDate: newDate
        }, function () {
          _this.props.onValueChange(newDate);

          _this.handleConfirm(true, false); //面板展开，不保存值

        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleConfirm", function (isKeepPannelOpen, isConfirmValue) {
      var currentDate = _this.state.currentDate;
      var _this$props = _this.props,
          onPicked = _this$props.onPicked,
          selectableRange = _this$props.selectableRange;
      var date = new Date(limitRange(currentDate, selectableRange, DEFAULT_FORMATS.time));
      onPicked(date, isKeepPannelOpen, isConfirmValue);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.props.onCancelPicked();
    });

    _defineProperty(_assertThisInitialized(_this), "handleCurrent", function () {
      var onPicked = _this.props.onPicked;
      var value = new Date();
      onPicked(value, false, true);
    });

    _this.state = mapPropsToState(props);
    return _this;
  }

  _createClass(TimePanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          onSelectRangeChange = _this$props2.onSelectRangeChange,
          selectableRange = _this$props2.selectableRange,
          isShowCurrent = _this$props2.isShowCurrent,
          footer = _this$props2.footer,
          prefixCls = _this$props2.prefixCls;
      var _this$state = this.state,
          isShowSeconds = _this$state.isShowSeconds,
          currentDate = _this$state.currentDate,
          confirmButtonDisabled = _this$state.confirmButtonDisabled,
          currentButtonDisabled = _this$state.currentButtonDisabled;
      var hours = currentDate ? currentDate.getHours() : null;
      var minutes = currentDate ? currentDate.getMinutes() : null;
      var seconds = currentDate ? currentDate.getSeconds() : null;
      var $t = Locale.t;
      return React.createElement("div", {
        ref: "root",
        className: "".concat(prefixCls, "-picker-panel ").concat(prefixCls, "-time-panel")
      }, React.createElement("div", {
        className: classNames("".concat(prefixCls, "-time-panel__content"), {
          'has-seconds': isShowSeconds
        })
      }, React.createElement(TimeSpinner, {
        ref: "spinner",
        isShowSeconds: isShowSeconds,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        selectableRange: selectableRange,
        onSelectRangeChange: onSelectRangeChange,
        onChange: this.handleChange
      })), typeof footer == 'function' && footer() && React.createElement("div", {
        className: "".concat(prefixCls, "-time-panel__extra-footer")
      }, footer()), React.createElement("div", {
        className: "".concat(prefixCls, "-time-panel__footer")
      }, React.createElement("div", null, isShowCurrent ? React.createElement("button", {
        type: "button",
        disabled: currentButtonDisabled,
        className: classNames("".concat(prefixCls, "-time-panel__btn confirm"), {
          'disabled': currentButtonDisabled
        }),
        onClick: this.handleCurrent
      }, $t('datepicker.now')) : null), React.createElement("div", null, React.createElement("button", {
        type: "button",
        className: "".concat(prefixCls, "-time-panel__btn cancel"),
        onClick: this.handleCancel
      }, $t('datepicker.cancel')), React.createElement("button", {
        type: "button",
        disabled: confirmButtonDisabled,
        className: classNames("".concat(prefixCls, "-time-panel__btn confirm"), {
          'disabled': confirmButtonDisabled
        }),
        onClick: function onClick() {
          return _this2.handleConfirm(false, true);
        }
      }, $t('datepicker.confirm')))));
    }
  }]);

  return TimePanel;
}(React.Component);

_defineProperty(TimePanel, "isValid", function (value, selectableRange) {
  return value === null || isLimitRange(value, selectableRange, DEFAULT_FORMATS.time);
});

export default TimePanel;