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
import Input from '../../Input/index.js';
import Icon from '../../Icon/index.js';
import Button from '../../Button/index.js';
import TimePicker from '../../TimePicker/index.js';
import YearAndMonthPopover from './YearAndMonthPopover.js';
import { DateTable } from '../basic';
import isEqual from 'lodash/isEqual';
import { SELECTION_MODES, deconstructDate, formatDate, parseDate, toDate, prevYear, nextYear, prevMonth, nextMonth, timeFormat, dateFormat, MONTH_ARRRY, YEARS_ARRAY, isValidValue, setTime } from '../../../utils/date';
import Locale from '../../../utils/date/locale';
var PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date'
};

var isInputValid = function isInputValid(text, date, disabledDate) {
  if (text.trim() === '' || !isValidValue(date) || !DatePanel.isValid(date, disabledDate)) return false;
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
      state.currentDate = isValidValue(value) ? toDate(value) : new Date(); // 日历视图

      state.date = toDate(value); // 日期

      state.dateInputText = formatDate(value, dateFormat(format)); // 日期输入框的值(string)，当props.value为null时，值为''

      state.time = toDate(value || defaultTimeValue); // 时间

      return state;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ('value' in nextProps && !isEqual(nextProps.value, prevState.prevPropValue)) {
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
        prefixCls: PropTypes.string,
        format: PropTypes.string,
        //basePicker
        value: PropTypes.instanceOf(Date),
        //basePicker
        onPick: PropTypes.func.isRequired,
        //basePicker
        onCancelPicked: PropTypes.func.isRequired,
        //basePicker
        yearCount: PropTypes.number,
        showWeekNumber: PropTypes.bool,
        shortcuts: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired
        })),
        mode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(function (e) {
          return SELECTION_MODES[e];
        })),
        disabledDate: PropTypes.func,
        firstDayOfWeek: PropTypes.number,
        footer: PropTypes.func,
        //时间面板
        showTime: PropTypes.bool,
        showTimeCurrent: PropTypes.bool,
        timeSelectableRange: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        defaultTimeValue: PropTypes.instanceOf(Date),
        timeSelectMode: PropTypes.oneOf(['TimePicker', 'TimeSelect']),
        timeSelectModeProps: PropTypes.object
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        prefixCls: 'fishd',
        yearCount: 50,
        showWeekNumber: false,
        mode: SELECTION_MODES.DAY,
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
      var ndate = parseDate(inputText, dateFormat(format));

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
        dateInputText: formatDate(date, dateFormat(_this.props.format))
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
        currentDate: prevYear(_this.state.currentDate)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "nextYear", function () {
      _this.setState({
        currentDate: nextYear(_this.state.currentDate)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "prevMonth", function () {
      _this.setState({
        currentDate: prevMonth(_this.state.currentDate)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "nextMonth", function () {
      _this.setState({
        currentDate: nextMonth(_this.state.currentDate)
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

      if (mode === SELECTION_MODES.DAY) {
        if (!showTime) {
          onPick(pdate);
        }

        _this.setState({
          date: new Date(pdate),
          dateInputText: formatDate(pdate, dateFormat(format)),
          // 点击日期，左侧日期输入框的值同步变化
          currentDate: pdate
        });
      } else if (mode === SELECTION_MODES.WEEK) {
        onPick(pdate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleConfirm", function () {
      var _this$state3 = _this.state,
          date = _this$state3.date,
          time = _this$state3.time;
      var pickedTime = setTime(date, time);

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
          result = React.createElement(DateTable, {
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

      var _deconstructDate = deconstructDate(currentDate),
          month = _deconstructDate.month;

      var t = Locale.t;
      return React.createElement("div", {
        className: classNames("".concat(prefixCls, "-picker-panel"), "".concat(prefixCls, "-date-picker"), {
          'has-sidebar': shortcuts,
          'has-time': showTime
        })
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__body-wrapper")
      }, Array.isArray(shortcuts) && React.createElement("div", {
        className: classNames("".concat(prefixCls, "-picker-panel__sidebar"))
      }, shortcuts.map(function (e, idx) {
        return React.createElement("button", {
          key: idx,
          type: "button",
          className: "".concat(prefixCls, "-picker-panel__shortcut"),
          onClick: function onClick() {
            return _this2.handleShortcutClick(e);
          }
        }, e.text);
      })), React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__body")
      }, showTime && React.createElement("div", {
        className: "".concat(prefixCls, "-date-picker__time-header")
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-picker__editor-wrap")
      }, React.createElement(Input, {
        placeholder: t('datepicker.selectDate'),
        value: dateInputText,
        onChange: this.handleDateInputChange,
        onBlur: this.handleDateInputBlur
      })), React.createElement("span", {
        className: "".concat(prefixCls, "-date-picker__editor-wrap")
      }, timeSelectMode === 'TimePicker' ? React.createElement(TimePicker, {
        className: "".concat(prefixCls, "-date-picker-time__editor"),
        placeholder: t('datepicker.selectTime'),
        format: timeFormat(format),
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
      }) : React.createElement(TimePicker.TimeSelect, {
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
      }))), currentView !== 'time' && React.createElement("div", {
        className: "".concat(prefixCls, "-date-picker__header")
      }, React.createElement(Icon, {
        type: "left-double",
        onClick: this.prevYear,
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-picker__prev-btn")
      }), currentView === PICKER_VIEWS.DATE && React.createElement(Icon, {
        type: "left",
        onClick: this.prevMonth,
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-picker__prev-btn")
      }), React.createElement(YearAndMonthPopover, {
        value: currentDate.getFullYear(),
        sourceData: YEARS_ARRAY(yearCount),
        onChange: this.handleChangeYear
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-picker__header-label")
      }, "".concat(currentDate.getFullYear(), " ").concat(t('datepicker.year')))), currentView === PICKER_VIEWS.DATE && React.createElement(YearAndMonthPopover, {
        value: currentDate.getMonth() + 1,
        sourceData: MONTH_ARRRY,
        onChange: this.handleChangeMonth
      }, React.createElement("span", {
        className: classNames("".concat(prefixCls, "-date-picker__header-label"), {
          active: currentView === 'month'
        })
      }, t("datepicker.month".concat(month + 1)))), React.createElement(Icon, {
        type: "right-double",
        onClick: this.nextYear,
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-picker__next-btn")
      }), currentView === PICKER_VIEWS.DATE && React.createElement(Icon, {
        type: "right",
        onClick: this.nextMonth,
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-picker__next-btn")
      })), React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__content")
      }, this._pickerContent()))), typeof footer == 'function' && footer() && React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__extra-footer")
      }, footer()), showTime && currentView === PICKER_VIEWS.DATE && React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__footer")
      }, React.createElement(Button, {
        className: "".concat(prefixCls, "-picker-panel__btn cancel"),
        onClick: this.handleCancel
      }, t('datepicker.cancel')), React.createElement(Button, {
        type: "primary",
        className: "".concat(prefixCls, "-picker-panel__btn confirm"),
        onClick: this.handleConfirm,
        disabled: this.confirmBtnDisabled()
      }, t('datepicker.confirm'))));
    }
  }]);

  return DatePanel;
}(React.Component);

DatePanel.isValid = function (value, disabledDate) {
  return typeof disabledDate === 'function' && value instanceof Date ? !disabledDate(value) : true;
};

export default DatePanel;