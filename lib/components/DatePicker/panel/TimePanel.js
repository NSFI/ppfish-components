"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _TimeSpinner = _interopRequireDefault(require("../basic/TimeSpinner.js"));

var _date = require("../../../utils/date");

var _constants = require("../constants");

var _locale = _interopRequireDefault(require("../../../utils/date/locale"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapPropsToState = function mapPropsToState(props) {
  var format = props.format,
      value = props.value,
      selectableRange = props.selectableRange;
  var state = {
    format: format || _constants.DEFAULT_FORMATS.time,
    currentDate: value || (0, _date.parseDate)('00:00:00', _constants.DEFAULT_FORMATS.time),
    confirmButtonDisabled: value === null || !TimePanel.isValid(value, selectableRange),
    currentButtonDisabled: !(0, _date.isLimitRange)(new Date(), selectableRange, _constants.DEFAULT_FORMATS.time)
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;
  return state;
};

var TimePanel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TimePanel, _React$Component);

  TimePanel.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if ("value" in nextProps && !(0, _isEqual.default)(nextProps.value, prevState.prevPropValue)) {
      var state = mapPropsToState(nextProps);
      state.prevPropValue = nextProps.value;
      return state;
    }

    return null;
  };

  _createClass(TimePanel, null, [{
    key: "propTypes",
    get: function get() {
      return {
        prefixCls: _propTypes.default.string,
        format: _propTypes.default.string,
        //basePicker
        value: _propTypes.default.instanceOf(Date),
        //basePicker
        onPicked: _propTypes.default.func.isRequired,
        //basePicker
        onCancelPicked: _propTypes.default.func.isRequired,
        //basePicker
        selectableRange: _TimeSpinner.default.propTypes.selectableRange,
        onSelectRangeChange: _TimeSpinner.default.propTypes.onSelectRangeChange,
        isShowCurrent: _propTypes.default.bool,
        footer: _propTypes.default.func,
        onValueChange: _propTypes.default.func
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

    _this = _React$Component.call(this, props) || this;

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
      var date = new Date((0, _date.limitRange)(currentDate, selectableRange, _constants.DEFAULT_FORMATS.time));
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

  var _proto = TimePanel.prototype;

  _proto.render = function render() {
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
    var $t = _locale.default.t;
    return _react.default.createElement("div", {
      ref: "root",
      className: prefixCls + "-picker-panel " + prefixCls + "-time-panel"
    }, _react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls + "-time-panel__content", {
        'has-seconds': isShowSeconds
      })
    }, _react.default.createElement(_TimeSpinner.default, {
      ref: "spinner",
      isShowSeconds: isShowSeconds,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      selectableRange: selectableRange,
      onSelectRangeChange: onSelectRangeChange,
      onChange: this.handleChange
    })), typeof footer == 'function' && footer() && _react.default.createElement("div", {
      className: prefixCls + "-time-panel__extra-footer"
    }, footer()), _react.default.createElement("div", {
      className: prefixCls + "-time-panel__footer"
    }, _react.default.createElement("div", null, isShowCurrent ? _react.default.createElement("button", {
      type: "button",
      disabled: currentButtonDisabled,
      className: (0, _classnames.default)(prefixCls + "-time-panel__btn confirm", {
        'disabled': currentButtonDisabled
      }),
      onClick: this.handleCurrent
    }, $t('datepicker.now')) : null), _react.default.createElement("div", null, _react.default.createElement("button", {
      type: "button",
      className: prefixCls + "-time-panel__btn cancel",
      onClick: this.handleCancel
    }, $t('datepicker.cancel')), _react.default.createElement("button", {
      type: "button",
      disabled: confirmButtonDisabled,
      className: (0, _classnames.default)(prefixCls + "-time-panel__btn confirm", {
        'disabled': confirmButtonDisabled
      }),
      onClick: function onClick() {
        return _this2.handleConfirm(false, true);
      }
    }, $t('datepicker.confirm')))));
  };

  return TimePanel;
}(_react.default.Component);

_defineProperty(TimePanel, "isValid", function (value, selectableRange) {
  return value === null || (0, _date.isLimitRange)(value, selectableRange, _constants.DEFAULT_FORMATS.time);
});

var _default = TimePanel;
exports.default = _default;