"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _TimeSpinner = _interopRequireDefault(require("../basic/TimeSpinner.js"));

var _date = require("../../../utils/date");

var _constants = require("../constants");

var _locale = _interopRequireDefault(require("../../../utils/date/locale"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  _inherits(TimePanel, _React$Component);

  _createClass(TimePanel, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ("value" in nextProps && !(0, _isEqual["default"])(nextProps.value, prevState.prevPropValue)) {
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
        prefixCls: _propTypes["default"].string,
        format: _propTypes["default"].string,
        //basePicker
        value: _propTypes["default"].instanceOf(Date),
        //basePicker
        onPicked: _propTypes["default"].func.isRequired,
        //basePicker
        onCancelPicked: _propTypes["default"].func.isRequired,
        //basePicker
        selectableRange: _TimeSpinner["default"].propTypes.selectableRange,
        onSelectRangeChange: _TimeSpinner["default"].propTypes.onSelectRangeChange,
        isShowCurrent: _propTypes["default"].bool,
        footer: _propTypes["default"].func,
        onValueChange: _propTypes["default"].func
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
      var $t = _locale["default"].t;
      return _react["default"].createElement("div", {
        ref: "root",
        className: "".concat(prefixCls, "-picker-panel ").concat(prefixCls, "-time-panel")
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])("".concat(prefixCls, "-time-panel__content"), {
          'has-seconds': isShowSeconds
        })
      }, _react["default"].createElement(_TimeSpinner["default"], {
        ref: "spinner",
        isShowSeconds: isShowSeconds,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        selectableRange: selectableRange,
        onSelectRangeChange: onSelectRangeChange,
        onChange: this.handleChange
      })), typeof footer == 'function' && footer() && _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-time-panel__extra-footer")
      }, footer()), _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-time-panel__footer")
      }, _react["default"].createElement("div", null, isShowCurrent ? _react["default"].createElement("button", {
        type: "button",
        disabled: currentButtonDisabled,
        className: (0, _classnames["default"])("".concat(prefixCls, "-time-panel__btn confirm"), {
          'disabled': currentButtonDisabled
        }),
        onClick: this.handleCurrent
      }, $t('datepicker.now')) : null), _react["default"].createElement("div", null, _react["default"].createElement("button", {
        type: "button",
        className: "".concat(prefixCls, "-time-panel__btn cancel"),
        onClick: this.handleCancel
      }, $t('datepicker.cancel')), _react["default"].createElement("button", {
        type: "button",
        disabled: confirmButtonDisabled,
        className: (0, _classnames["default"])("".concat(prefixCls, "-time-panel__btn confirm"), {
          'disabled': confirmButtonDisabled
        }),
        onClick: function onClick() {
          return _this2.handleConfirm(false, true);
        }
      }, $t('datepicker.confirm')))));
    }
  }]);

  return TimePanel;
}(_react["default"].Component);

_defineProperty(TimePanel, "isValid", function (value, selectableRange) {
  return value === null || (0, _date.isLimitRange)(value, selectableRange, _constants.DEFAULT_FORMATS.time);
});

var _default = TimePanel;
exports["default"] = _default;