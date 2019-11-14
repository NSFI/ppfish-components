"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../../Input/index.js"));

var _index2 = _interopRequireDefault(require("../../Icon/index.js"));

var _index3 = _interopRequireDefault(require("../../Button/index.js"));

var _index4 = _interopRequireDefault(require("../../TimePicker/index.js"));

var _YearAndMonthPopover = _interopRequireDefault(require("./YearAndMonthPopover.js"));

var _basic = require("../basic");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _date = require("../../../utils/date");

var _locale = _interopRequireDefault(require("../../../utils/date/locale"));

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

var PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date'
};

var isInputValid = function isInputValid(text, date, disabledDate) {
  if (text.trim() === '' || !(0, _date.isValidValue)(date) || !DatePanel.isValid(date, disabledDate)) return false;
  return true;
};

var DatePanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePanel, _React$Component);

  _createClass(DatePanel, null, [{
    key: "propsToState",
    value: function propsToState(_ref) {
      var value = _ref.value,
          format = _ref.format,
          defaultTimeValue = _ref.defaultTimeValue;
      var state = {};
      state.currentDate = (0, _date.isValidValue)(value) ? (0, _date.toDate)(value) : new Date(); // 日历视图

      state.date = (0, _date.toDate)(value); // 日期

      state.dateInputText = (0, _date.formatDate)(value, (0, _date.dateFormat)(format)); // 日期输入框的值(string)，当props.value为null时，值为''

      state.time = (0, _date.toDate)(value || defaultTimeValue); // 时间

      return state;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ('value' in nextProps && !(0, _isEqual["default"])(nextProps.value, prevState.prevPropValue)) {
        var state = DatePanel.propsToState(nextProps);
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
        onPick: _propTypes["default"].func.isRequired,
        //basePicker
        onCancelPicked: _propTypes["default"].func.isRequired,
        //basePicker
        yearCount: _propTypes["default"].number,
        showWeekNumber: _propTypes["default"].bool,
        shortcuts: _propTypes["default"].arrayOf(_propTypes["default"].shape({
          text: _propTypes["default"].string.isRequired,
          onClick: _propTypes["default"].func.isRequired
        })),
        mode: _propTypes["default"].oneOf(Object.keys(_date.SELECTION_MODES).map(function (e) {
          return _date.SELECTION_MODES[e];
        })),
        disabledDate: _propTypes["default"].func,
        firstDayOfWeek: _propTypes["default"].number,
        footer: _propTypes["default"].func,
        //时间面板
        showTime: _propTypes["default"].bool,
        showTimeCurrent: _propTypes["default"].bool,
        timeSelectableRange: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
        defaultTimeValue: _propTypes["default"].instanceOf(Date),
        timeSelectMode: _propTypes["default"].oneOf(['TimePicker', 'TimeSelect']),
        timeSelectModeProps: _propTypes["default"].object
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        prefixCls: 'fishd',
        yearCount: 50,
        showWeekNumber: false,
        mode: _date.SELECTION_MODES.DAY,
        firstDayOfWeek: 0,
        showTime: false,
        showTimeCurrent: false,
        defaultTimeValue: null,
        timeSelectMode: 'TimePicker',
        timeSelectModeProps: {
          start: '09:00',
          end: '18:00',
          step: '00:30',
          minTime: '',
          maxTime: ''
        }
      };
    }
  }]);

  function DatePanel(props) {
    var _this;

    _classCallCheck(this, DatePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "confirmBtnDisabled", function () {
      var _this$state = _this.state,
          date = _this$state.date,
          time = _this$state.time;
      return !(date && time);
    });

    _defineProperty(_assertThisInitialized(_this), "timePickerDisable", function () {
      var _this$state2 = _this.state,
          date = _this$state2.date,
          dateInputText = _this$state2.dateInputText;
      return !(date && dateInputText);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDateInputChange", function (e) {
      var _this$props = _this.props,
          disabledDate = _this$props.disabledDate,
          format = _this$props.format;
      var inputText = e.target.value;
      var ndate = (0, _date.parseDate)(inputText, (0, _date.dateFormat)(format));

      if (!isInputValid(inputText, ndate, disabledDate)) {
        _this.setState({
          dateInputText: inputText
        });
      } else {
        //only set value on a valid date input
        _this.setState({
          dateInputText: inputText,
          date: new Date(ndate),
          currentDate: new Date(ndate)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDateInputBlur", function (e) {
      var date = _this.state.date;

      _this.setState({
        dateInputText: (0, _date.formatDate)(date, (0, _date.dateFormat)(_this.props.format))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleTimeInputChange", function (val) {
      if (val) {
        _this.setState({
          time: new Date(val)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "prevYear", function () {
      _this.setState({
        currentDate: (0, _date.prevYear)(_this.state.currentDate)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "nextYear", function () {
      _this.setState({
        currentDate: (0, _date.nextYear)(_this.state.currentDate)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "prevMonth", function () {
      _this.setState({
        currentDate: (0, _date.prevMonth)(_this.state.currentDate)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "nextMonth", function () {
      _this.setState({
        currentDate: (0, _date.nextMonth)(_this.state.currentDate)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeYear", function (year) {
      var currentDate = _this.state.currentDate;

      _this.setState({
        currentDate: new Date(new Date(currentDate).setFullYear(year))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeMonth", function (month) {
      var currentDate = _this.state.currentDate;

      _this.setState({
        currentDate: new Date(new Date(currentDate).setMonth(parseInt(month.slice(0, -1)) - 1))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDatePick", function (value) {
      var _this$props2 = _this.props,
          mode = _this$props2.mode,
          showTime = _this$props2.showTime,
          onPick = _this$props2.onPick,
          format = _this$props2.format;
      var pdate = value.date;

      if (mode === _date.SELECTION_MODES.DAY) {
        if (!showTime) {
          onPick(pdate);
        }

        _this.setState({
          date: new Date(pdate),
          dateInputText: (0, _date.formatDate)(pdate, (0, _date.dateFormat)(format)),
          // 点击日期，左侧日期输入框的值同步变化
          currentDate: pdate
        });
      } else if (mode === _date.SELECTION_MODES.WEEK) {
        onPick(pdate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleConfirm", function () {
      var _this$state3 = _this.state,
          date = _this$state3.date,
          time = _this$state3.time;
      var pickedTime = (0, _date.setTime)(date, time);

      _this.props.onPick(pickedTime, false, true);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.props.onCancelPicked();
    });

    var currentView = PICKER_VIEWS.DATE; // switch (props.mode) {
    //   case SELECTION_MODES.MONTH:
    //     currentView = PICKER_VIEWS.MONTH; break;
    //   case SELECTION_MODES.YEAR:
    //     currentView = PICKER_VIEWS.YEAR; break;
    // }

    _this.state = Object.assign({}, {
      currentView: currentView
    }, DatePanel.propsToState(props));
    return _this;
  } // 年份、月份面板先注释掉，需要时再打开


  _createClass(DatePanel, [{
    key: "_pickerContent",
    value: function _pickerContent() {
      var _this$props3 = this.props,
          mode = _this$props3.mode,
          disabledDate = _this$props3.disabledDate,
          showWeekNumber = _this$props3.showWeekNumber,
          firstDayOfWeek = _this$props3.firstDayOfWeek;
      var _this$state4 = this.state,
          date = _this$state4.date,
          currentDate = _this$state4.currentDate;
      var currentView = this.state.currentView;
      var result = null;

      switch (currentView) {
        case PICKER_VIEWS.DATE:
          result = _react["default"].createElement(_basic.DateTable, {
            onPick: this.handleDatePick,
            date: currentDate,
            value: date,
            mode: mode,
            disabledDate: disabledDate,
            showWeekNumber: showWeekNumber,
            firstDayOfWeek: firstDayOfWeek
          });
          break;
        // case PICKER_VIEWS.YEAR:
        //   result = (<YearTable
        //     ref="yearTable"
        //     value={value}
        //     date={date}
        //     onPick={this.handleYearPick.bind(this)}
        //     disabledDate={disabledDate}
        //   />);
        //   break;
        // case PICKER_VIEWS.MONTH:
        //   result = (<MonthTable
        //     value={value}
        //     date={date}
        //     onPick={this.handleMonthPick.bind(this)}
        //     disabledDate={disabledDate}
        //   />);
        //   break;

        default:
          throw new Error('invalid currentView value');
      }

      return result;
    } // 日期时间都选择，确定按钮才可点击

  }, {
    key: "handleShortcutClick",
    // 点击快捷按钮
    value: function handleShortcutClick(shortcut) {
      shortcut.onClick();
    } // 上一年

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          format = _this$props4.format,
          shortcuts = _this$props4.shortcuts,
          yearCount = _this$props4.yearCount,
          showTime = _this$props4.showTime,
          showTimeCurrent = _this$props4.showTimeCurrent,
          timeSelectableRange = _this$props4.timeSelectableRange,
          footer = _this$props4.footer,
          prefixCls = _this$props4.prefixCls,
          timeSelectMode = _this$props4.timeSelectMode,
          timeSelectModeProps = _this$props4.timeSelectModeProps;
      var _this$state5 = this.state,
          currentView = _this$state5.currentView,
          currentDate = _this$state5.currentDate,
          dateInputText = _this$state5.dateInputText,
          time = _this$state5.time;

      var _deconstructDate = (0, _date.deconstructDate)(currentDate),
          month = _deconstructDate.month;

      var t = _locale["default"].t;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])("".concat(prefixCls, "-picker-panel"), "".concat(prefixCls, "-date-picker"), {
          'has-sidebar': shortcuts,
          'has-time': showTime
        })
      }, _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__body-wrapper")
      }, Array.isArray(shortcuts) && _react["default"].createElement("div", {
        className: (0, _classnames["default"])("".concat(prefixCls, "-picker-panel__sidebar"))
      }, shortcuts.map(function (e, idx) {
        return _react["default"].createElement("button", {
          key: idx,
          type: "button",
          className: "".concat(prefixCls, "-picker-panel__shortcut"),
          onClick: function onClick() {
            return _this2.handleShortcutClick(e);
          }
        }, e.text);
      })), _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__body")
      }, showTime && _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-date-picker__time-header")
      }, _react["default"].createElement("span", {
        className: "".concat(prefixCls, "-date-picker__editor-wrap")
      }, _react["default"].createElement(_index["default"], {
        placeholder: t('datepicker.selectDate'),
        value: dateInputText,
        onChange: this.handleDateInputChange,
        onBlur: this.handleDateInputBlur
      })), _react["default"].createElement("span", {
        className: "".concat(prefixCls, "-date-picker__editor-wrap")
      }, timeSelectMode === 'TimePicker' ? _react["default"].createElement(_index4["default"], {
        className: "".concat(prefixCls, "-date-picker-time__editor"),
        placeholder: t('datepicker.selectTime'),
        format: (0, _date.timeFormat)(format),
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        },
        showTrigger: false,
        allowClear: false,
        disabled: this.timePickerDisable(),
        value: time,
        onChange: this.handleTimeInputChange,
        isShowCurrent: showTimeCurrent,
        selectableRange: timeSelectableRange
      }) : _react["default"].createElement(_index4["default"].TimeSelect, {
        className: "".concat(prefixCls, "-date-picker-time__editor"),
        placeholder: t('datepicker.selectTime'),
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        },
        showTrigger: false,
        allowClear: false,
        disabled: this.timePickerDisable(),
        value: time,
        onChange: this.handleTimeInputChange,
        start: timeSelectModeProps.start,
        step: timeSelectModeProps.step,
        end: timeSelectModeProps.end,
        maxTime: timeSelectModeProps.maxTime,
        minTime: timeSelectModeProps.minTime
      }))), currentView !== 'time' && _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-date-picker__header")
      }, _react["default"].createElement(_index2["default"], {
        type: "left-double",
        onClick: this.prevYear,
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-picker__prev-btn")
      }), currentView === PICKER_VIEWS.DATE && _react["default"].createElement(_index2["default"], {
        type: "left",
        onClick: this.prevMonth,
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-picker__prev-btn")
      }), _react["default"].createElement(_YearAndMonthPopover["default"], {
        value: currentDate.getFullYear(),
        sourceData: (0, _date.YEARS_ARRAY)(yearCount),
        onChange: this.handleChangeYear
      }, _react["default"].createElement("span", {
        className: "".concat(prefixCls, "-date-picker__header-label")
      }, "".concat(currentDate.getFullYear(), " ").concat(t('datepicker.year')))), currentView === PICKER_VIEWS.DATE && _react["default"].createElement(_YearAndMonthPopover["default"], {
        value: currentDate.getMonth() + 1,
        sourceData: _date.MONTH_ARRRY,
        onChange: this.handleChangeMonth
      }, _react["default"].createElement("span", {
        className: (0, _classnames["default"])("".concat(prefixCls, "-date-picker__header-label"), {
          active: currentView === 'month'
        })
      }, t("datepicker.month".concat(month + 1)))), _react["default"].createElement(_index2["default"], {
        type: "right-double",
        onClick: this.nextYear,
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-picker__next-btn")
      }), currentView === PICKER_VIEWS.DATE && _react["default"].createElement(_index2["default"], {
        type: "right",
        onClick: this.nextMonth,
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-picker__next-btn")
      })), _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__content")
      }, this._pickerContent()))), typeof footer == 'function' && footer() && _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__extra-footer")
      }, footer()), showTime && currentView === PICKER_VIEWS.DATE && _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__footer")
      }, _react["default"].createElement(_index3["default"], {
        className: "".concat(prefixCls, "-picker-panel__btn cancel"),
        onClick: this.handleCancel
      }, t('datepicker.cancel')), _react["default"].createElement(_index3["default"], {
        type: "primary",
        className: "".concat(prefixCls, "-picker-panel__btn confirm"),
        onClick: this.handleConfirm,
        disabled: this.confirmBtnDisabled()
      }, t('datepicker.confirm'))));
    }
  }]);

  return DatePanel;
}(_react["default"].Component);

DatePanel.isValid = function (value, disabledDate) {
  return typeof disabledDate === 'function' && value instanceof Date ? !disabledDate(value) : true;
};

var _default = DatePanel;
exports["default"] = _default;