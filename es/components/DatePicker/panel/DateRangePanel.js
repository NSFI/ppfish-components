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
import { DateTable } from '../basic';
import Input from '../../Input/index.js';
import Icon from '../../Icon/index.js';
import Button from '../../Button/index.js';
import TimePicker from '../../TimePicker/index.js';
import { converSelectRange } from '../TimePicker.js';
import TimePanel from './TimePanel.js';
import TimeSelectPanel from './TimeSelectPanel.js';
import YearAndMonthPopover from './YearAndMonthPopover.js';
import isEqual from 'lodash/isEqual';
import { SELECTION_MODES, toDate, prevYear as _prevYear, nextYear as _nextYear, prevMonth as _prevMonth, nextMonth as _nextMonth, timeFormat, dateFormat, formatDate, parseDate, MONTH_ARRRY, YEARS_ARRAY, isValidValue, isValidValueArr, setTime, equalYearAndMonth, diffDate } from '../../../utils/date';
import Locale from '../../../utils/date/locale';
import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from '../constants';
var TimeSelect = TimePicker.TimeSelect;

var isInputValid = function isInputValid(text, date, disabledDate) {
  if (text.trim() === '' || !isValidValueArr(date) || !DateRangePanel.isValid(date, disabledDate)) return false;
  return true;
};

var dateToStr = function dateToStr(date) {
  if (!date || !isValidValue(date)) return '';
  var tdate = date;
  var formatter = TYPE_VALUE_RESOLVER_MAP['timeselect'].formatter;
  var result = formatter(tdate, DEFAULT_FORMATS['timeselect']);
  return result;
};

var DateRangePanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateRangePanel, _React$Component);

  _createClass(DateRangePanel, null, [{
    key: "propsToState",
    value: function propsToState(props) {
      var setDate = function setDate(start, end) {
        var result = {
          left: start,
          right: end
        }; // 当开始日期和结束日期在同一个月，根据不同的业务场景设置左右日历

        if (equalYearAndMonth(start, end)) {
          if (props.scene === 'past') {
            result = {
              left: _prevMonth(end),
              right: end
            };
          } else {
            result = {
              left: start,
              right: _nextMonth(start)
            };
          }
        }

        return result;
      };

      var setDefaultDate = function setDefaultDate(defaultPanelMonth) {
        var result = {};

        if (props.scene === 'past') {
          result = {
            left: _prevMonth(defaultPanelMonth),
            right: defaultPanelMonth
          };
        } else {
          result = {
            left: defaultPanelMonth,
            right: _nextMonth(defaultPanelMonth)
          };
        }

        return result;
      };

      var minTime = isValidValueArr(props.value) ? toDate(props.value[0]) : toDate(props.defaultStartTimeValue);
      var maxTime = isValidValueArr(props.value) ? toDate(props.value[1]) : toDate(props.defaultEndTimeValue);
      var minDate = isValidValueArr(props.value) ? toDate(props.value[0]) : null;
      var maxDate = isValidValueArr(props.value) ? toDate(props.value[1]) : null;
      var isSameDate = minDate && maxDate && diffDate(minDate, maxDate) === 0;
      var getTimeRangeOption = {
        minTime: minTime,
        endTimeSelectableRange: props.endTimeSelectableRange,
        endTimeSelectMode: props.endTimeSelectMode,
        endTimeSelectModeProps: props.endTimeSelectModeProps
      };
      var state = {}; // 左侧日历月份

      state.leftDate = isValidValueArr(props.value) ? setDate(props.value[0], props.value[1])["left"] : setDefaultDate(props.defaultPanelMonth)["left"]; // 右侧日历月份

      state.rightDate = isValidValueArr(props.value) ? setDate(props.value[0], props.value[1])["right"] : setDefaultDate(props.defaultPanelMonth)["right"]; // 开始日期

      state.minDate = minDate; // 结束日期

      state.maxDate = maxDate; // 开始日期输入框中的值

      state.minDateInputText = isValidValueArr(props.value) ? formatDate(props.value[0], dateFormat(props.format)) : ''; // 结束日期输入框中的值

      state.maxDateInputText = isValidValueArr(props.value) ? formatDate(props.value[1], dateFormat(props.format)) : ''; // 开始时间

      state.minTime = minTime; // 结束时间

      state.maxTime = maxTime; // 开始时间可选范围

      state.startTimeSelectableRange = props.startTimeSelectableRange; // 结束时间可选范围

      state.endTimeSelectableRange = props.endTimeSelectMode === "TimePicker" && isSameDate ? DateRangePanel.getEndTimeSelectableRange(getTimeRangeOption) : props.endTimeSelectableRange;
      state.endTimeSelectModeProps = props.endTimeSelectMode === "TimeSelect" && isSameDate ? DateRangePanel.getEndTimeSelectableRange(getTimeRangeOption) : props.endTimeSelectModeProps;
      return state;
    } // 计算结束时间的可选范围

  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // 只 value 受控
      if ('value' in nextProps && !isEqual(prevState.prevPropValue, nextProps.value)) {
        var state = DateRangePanel.propsToState(nextProps);
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
        value: PropTypes.array,
        //basePicker
        onPick: PropTypes.func.isRequired,
        //basePicker
        onCancelPicked: PropTypes.func.isRequired,
        //basePicker
        yearCount: PropTypes.number,
        shortcuts: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired
        })),
        disabledDate: PropTypes.func,
        firstDayOfWeek: PropTypes.number,
        footer: PropTypes.func,
        onError: PropTypes.func,
        defaultPanelMonth: PropTypes.instanceOf(Date),
        scene: PropTypes.oneOf(['past', 'future']),
        // 时间面板
        showTime: PropTypes.bool,
        showTimeCurrent: PropTypes.bool,
        startTimeSelectableRange: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        endTimeSelectableRange: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        defaultStartTimeValue: PropTypes.instanceOf(Date),
        defaultEndTimeValue: PropTypes.instanceOf(Date),
        startTimeSelectMode: PropTypes.oneOf(['TimePicker', 'TimeSelect']),
        startTimeSelectModeProps: PropTypes.object,
        endTimeSelectMode: PropTypes.oneOf(['TimePicker', 'TimeSelect']),
        endTimeSelectModeProps: PropTypes.object
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        prefixCls: 'fishd',
        yearCount: 50,
        firstDayOfWeek: 0,
        onError: function onError() {},
        defaultPanelMonth: new Date(new Date().setHours(0, 0, 0, 0)),
        scene: 'future',
        showTime: false,
        showTimeCurrent: false,
        defaultStartTimeValue: null,
        defaultEndTimeValue: null,
        startTimeSelectMode: 'TimePicker',
        startTimeSelectModeProps: {
          start: '09:00',
          end: '18:00',
          step: '00:30',
          minTime: '',
          maxTime: ''
        },
        endTimeSelectMode: 'TimePicker',
        endTimeSelectModeProps: {
          start: '09:00',
          end: '18:00',
          step: '00:30',
          minTime: '',
          maxTime: ''
        }
      };
    }
  }]);

  function DateRangePanel(props) {
    var _this;

    _classCallCheck(this, DateRangePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRangePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "confirmBtnDisabled", function () {
      var _this$state = _this.state,
          minDate = _this$state.minDate,
          maxDate = _this$state.maxDate,
          minTime = _this$state.minTime,
          maxTime = _this$state.maxTime,
          minDateInputText = _this$state.minDateInputText,
          maxDateInputText = _this$state.maxDateInputText;
      return !(minDate && maxDate && minTime && maxTime && minDateInputText && maxDateInputText);
    });

    _defineProperty(_assertThisInitialized(_this), "timePickerDisable", function () {
      var _this$state2 = _this.state,
          minDate = _this$state2.minDate,
          maxDate = _this$state2.maxDate,
          minDateInputText = _this$state2.minDateInputText,
          maxDateInputText = _this$state2.maxDateInputText;
      return !(minDate && maxDate && minDateInputText && maxDateInputText);
    });

    _defineProperty(_assertThisInitialized(_this), "getEndTimeSelectableRange", function (minTime) {
      var _this$props = _this.props,
          endTimeSelectableRange = _this$props.endTimeSelectableRange,
          endTimeSelectMode = _this$props.endTimeSelectMode,
          endTimeSelectModeProps = _this$props.endTimeSelectModeProps; //TimePicker模式下返回endTimeSelectableRange

      return DateRangePanel.getEndTimeSelectableRange({
        minTime: minTime,
        endTimeSelectMode: endTimeSelectMode,
        endTimeSelectModeProps: endTimeSelectModeProps,
        endTimeSelectableRange: endTimeSelectableRange
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getMaxTime", function (maxTime, minTime) {
      var endTimeSelectMode = _this.props.endTimeSelectMode;

      if (endTimeSelectMode === 'TimePicker') {
        return maxTime && TimePanel.isValid(maxTime, converSelectRange({
          selectableRange: _this.getEndTimeSelectableRange(minTime)
        })) ? maxTime : null;
      } else {
        return maxTime && TimeSelectPanel.isValid("".concat(maxTime.getHours(), ":").concat(maxTime.getMinutes()), _this.getEndTimeSelectableRange(minTime)) ? maxTime : null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setEndTimeRange", function () {
      var _this$state3 = _this.state,
          minDate = _this$state3.minDate,
          maxDate = _this$state3.maxDate,
          minTime = _this$state3.minTime,
          maxTime = _this$state3.maxTime;
      var _this$props2 = _this.props,
          endTimeSelectableRange = _this$props2.endTimeSelectableRange,
          endTimeSelectMode = _this$props2.endTimeSelectMode,
          endTimeSelectModeProps = _this$props2.endTimeSelectModeProps;
      var isSameDate = minDate && maxDate && diffDate(minDate, maxDate) === 0;

      _this.setState({
        maxTime: isSameDate && minTime ? _this.getMaxTime(maxTime, minTime) : maxTime,
        endTimeSelectableRange: endTimeSelectMode === 'TimePicker' && isSameDate && minTime ? _this.getEndTimeSelectableRange(minTime) : endTimeSelectableRange,
        endTimeSelectModeProps: endTimeSelectMode === 'TimeSelect' && isSameDate && minTime ? _this.getEndTimeSelectableRange(minTime) : endTimeSelectModeProps
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDateInputBlur", function (e, type) {
      var _this$state4 = _this.state,
          minDate = _this$state4.minDate,
          maxDate = _this$state4.maxDate;

      if (type === 'min') {
        _this.setState({
          minDateInputText: formatDate(minDate, dateFormat(_this.props.format))
        });
      } else {
        _this.setState({
          maxDateInputText: formatDate(maxDate, dateFormat(_this.props.format))
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLeftNextYear", function () {
      var _this$state5 = _this.state,
          leftDate = _this$state5.leftDate,
          rightDate = _this$state5.rightDate;

      if (leftDate >= rightDate) {
        _this.nextYear('rightDate', rightDate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLeftNextMonth", function () {
      var _this$state6 = _this.state,
          leftDate = _this$state6.leftDate,
          rightDate = _this$state6.rightDate;

      if (rightDate.getFullYear() === leftDate.getFullYear() && rightDate.getMonth() === leftDate.getMonth()) {
        _this.nextMonth('rightDate', rightDate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRightPrevYear", function () {
      var _this$state7 = _this.state,
          leftDate = _this$state7.leftDate,
          rightDate = _this$state7.rightDate;

      if (rightDate <= leftDate) {
        _this.prevYear('leftDate', leftDate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRightPrevMonth", function () {
      var _this$state8 = _this.state,
          leftDate = _this$state8.leftDate,
          rightDate = _this$state8.rightDate;

      if (rightDate.getFullYear() === leftDate.getFullYear() && rightDate.getMonth() === leftDate.getMonth()) {
        _this.prevMonth('leftDate', leftDate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleConfirm", function () {
      var _this$state9 = _this.state,
          minDate = _this$state9.minDate,
          maxDate = _this$state9.maxDate,
          minTime = _this$state9.minTime,
          maxTime = _this$state9.maxTime;
      var pickedMinTime = setTime(new Date(minDate), minTime);
      var pickedMaxTime = setTime(new Date(maxDate), maxTime);

      _this.props.onPick([pickedMinTime, pickedMaxTime], false, true);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.props.onCancelPicked();
    });

    _this.state = Object.assign({}, {
      rangeState: {
        firstSelectedValue: null,
        endDate: null,
        selecting: false
      }
    }, DateRangePanel.propsToState(props));
    return _this;
  } // 鼠标移动选择结束时间的回调


  _createClass(DateRangePanel, [{
    key: "handleChangeRange",
    value: function handleChangeRange(rangeState) {
      this.setState({
        minDate: new Date(Math.min(rangeState.firstSelectedValue, rangeState.endDate)),
        maxDate: new Date(Math.max(rangeState.firstSelectedValue, rangeState.endDate))
      });
    } // 日期时间都选择，确定按钮才可点击

  }, {
    key: "handleDateInputChange",
    // 开始日期或结束日期发生改变
    value: function handleDateInputChange(e, type) {
      var _this2 = this;

      var _this$props3 = this.props,
          disabledDate = _this$props3.disabledDate,
          format = _this$props3.format;
      var _this$state10 = this.state,
          minDate = _this$state10.minDate,
          maxDate = _this$state10.maxDate;
      var text = type === 'min' ? 'minDateInputText' : 'maxDateInputText';
      var value = type === 'min' ? 'minDate' : 'maxDate';
      var inputText = e.target.value;
      var ndate = parseDate(inputText, dateFormat(format));

      if (!isInputValid(inputText, type === 'min' ? [ndate, maxDate] : [minDate, ndate], disabledDate)) {
        this.setState(_defineProperty({}, text, inputText));
      } else {
        var _this$setState2;

        this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, text, inputText), _defineProperty(_this$setState2, value, new Date(ndate)), _this$setState2), function () {
          //当开始日期和结束日期为同一天时，控制结束时间的可选范围
          _this2.setEndTimeRange();
        });
      }
    } // 日期输入框失焦时，重置入合法值

  }, {
    key: "handleTimeInputChange",
    // 开始时间或结束时间发生改变
    value: function handleTimeInputChange(value, type) {
      var _this3 = this;

      if (value) {
        if (type === 'min') {
          this.setState({
            minTime: new Date(value)
          }, function () {
            //当开始日期和结束日期为同一天时，控制结束时间的可选范围
            _this3.setEndTimeRange();
          });
        } else {
          this.setState({
            maxTime: new Date(value)
          });
        }
      }
    } // 点击快捷选项

  }, {
    key: "handleShortcutClick",
    value: function handleShortcutClick(shortcut) {
      shortcut.onClick();
    } // 上一年

  }, {
    key: "prevYear",
    value: function prevYear(type, date) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      this.setState(_defineProperty({}, type, _prevYear(date)), callback);
    } // 下一年

  }, {
    key: "nextYear",
    value: function nextYear(type, date) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      this.setState(_defineProperty({}, type, _nextYear(date)), callback);
    } // 上个月

  }, {
    key: "prevMonth",
    value: function prevMonth(type, date) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      this.setState(_defineProperty({}, type, _prevMonth(date)), callback);
    } // 下个月

  }, {
    key: "nextMonth",
    value: function nextMonth(type, date) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      this.setState(_defineProperty({}, type, _nextMonth(date)), callback);
    } // 左边日历的next year btn特殊处理: 左边日历的下一年面板日期大于右边日历，右边日历的年份+1

  }, {
    key: "handleChangeYear",
    // 切换年份
    value: function handleChangeYear(type, date, year) {
      var _this4 = this;

      this.setState(_defineProperty({}, type, new Date(new Date(date).setFullYear(year))), function () {
        // 切换完年份，若左边日历小于等于右边日历，保持右边日历是左边日历的下一年
        var _this4$state = _this4.state,
            leftDate = _this4$state.leftDate,
            rightDate = _this4$state.rightDate;

        if (type === 'leftDate') {
          if (leftDate >= rightDate) {
            _this4.setState({
              rightDate: new Date(new Date(rightDate).setFullYear(leftDate.getFullYear() + 1))
            });
          }
        } else if (type === 'rightDate') {
          if (leftDate >= rightDate) {
            _this4.setState({
              leftDate: new Date(new Date(leftDate).setFullYear(rightDate.getFullYear() - 1))
            });
          }
        }
      });
    } // 切换月份

  }, {
    key: "handleChangeMonth",
    value: function handleChangeMonth(type, date, month) {
      var _this5 = this;

      this.setState(_defineProperty({}, type, new Date(new Date(date).setMonth(parseInt(month.slice(0, -1)) - 1))), function () {
        // 切换完月份，若左边日历小于等于右边日历，保持右边日历是左边日历的下一月
        var _this5$state = _this5.state,
            leftDate = _this5$state.leftDate,
            rightDate = _this5$state.rightDate;

        if (type === 'leftDate') {
          if (leftDate >= rightDate) {
            _this5.setState({
              rightDate: _nextMonth(leftDate)
            });
          }
        } else if (type === 'rightDate') {
          if (leftDate >= rightDate) {
            _this5.setState({
              leftDate: _prevMonth(rightDate)
            });
          }
        }
      });
    } // 点击日期

  }, {
    key: "handleRangePick",
    value: function handleRangePick(_ref, isClose) {
      var _this6 = this;

      var minDate = _ref.minDate,
          maxDate = _ref.maxDate;
      var _this$props4 = this.props,
          showTime = _this$props4.showTime,
          onPick = _this$props4.onPick,
          format = _this$props4.format,
          onError = _this$props4.onError;
      var _this$state11 = this.state,
          minTime = _this$state11.minTime,
          maxTime = _this$state11.maxTime;
      var pickedMinTime = minTime ? setTime(new Date(minDate), minTime) : minDate;
      var pickedMaxTime = maxTime ? setTime(new Date(maxDate), maxTime) : maxDate;

      if (minDate && maxDate && onError && onError([pickedMinTime, pickedMaxTime])) {
        return;
      }

      this.setState({
        minDate: minDate ? new Date(minDate) : null,
        maxDate: maxDate ? new Date(maxDate) : null,
        minDateInputText: formatDate(minDate, dateFormat(format)),
        maxDateInputText: formatDate(maxDate, dateFormat(format))
      }, function () {
        //当开始日期和结束日期为同一天时，控制结束时间的可选范围
        _this6.setEndTimeRange();
      });
      if (!isClose) return;

      if (!showTime) {
        //日期范围选择的开始时间为 00：00 结束时间为 23：59
        var _pickedMinTime = setTime(new Date(minDate), new Date(new Date().setHours(0, 0, 0, 0)));

        var _pickedMaxTime = setTime(new Date(maxDate), new Date(new Date().setHours(23, 59, 59, 999)));

        onPick([_pickedMinTime, _pickedMaxTime], false, true);
      }
    } // 点击确定按钮

  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$props5 = this.props,
          shortcuts = _this$props5.shortcuts,
          disabledDate = _this$props5.disabledDate,
          firstDayOfWeek = _this$props5.firstDayOfWeek,
          format = _this$props5.format,
          yearCount = _this$props5.yearCount,
          showTime = _this$props5.showTime,
          showTimeCurrent = _this$props5.showTimeCurrent,
          footer = _this$props5.footer,
          prefixCls = _this$props5.prefixCls,
          startTimeSelectMode = _this$props5.startTimeSelectMode,
          startTimeSelectModeProps = _this$props5.startTimeSelectModeProps,
          endTimeSelectMode = _this$props5.endTimeSelectMode,
          endTimeSelectModeProps = _this$props5.endTimeSelectModeProps;
      var _this$state12 = this.state,
          rangeState = _this$state12.rangeState,
          leftDate = _this$state12.leftDate,
          rightDate = _this$state12.rightDate,
          minDate = _this$state12.minDate,
          maxDate = _this$state12.maxDate,
          minDateInputText = _this$state12.minDateInputText,
          maxDateInputText = _this$state12.maxDateInputText,
          minTime = _this$state12.minTime,
          maxTime = _this$state12.maxTime,
          startTimeSelectableRange = _this$state12.startTimeSelectableRange,
          endTimeSelectableRange = _this$state12.endTimeSelectableRange;
      var t = Locale.t;
      return React.createElement("div", {
        className: classNames("".concat(prefixCls, "-picker-panel"), "".concat(prefixCls, "-date-range-picker"), {
          'has-sidebar': shortcuts,
          'has-time': showTime
        })
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__body-wrapper")
      }, Array.isArray(shortcuts) && React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__sidebar")
      }, shortcuts.map(function (e, idx) {
        return React.createElement("button", {
          key: idx,
          type: "button",
          className: "".concat(prefixCls, "-picker-panel__shortcut"),
          onClick: function onClick() {
            return _this7.handleShortcutClick(e);
          }
        }, e.text);
      })), React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__body")
      }, showTime && React.createElement("div", {
        className: "".concat(prefixCls, "-date-range-picker__time-header")
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__editors-wrap is-left")
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__time-picker-wrap")
      }, React.createElement(Input, {
        placeholder: Locale.t('datepicker.startDate'),
        className: "".concat(prefixCls, "-date-range-picker__editor"),
        value: minDateInputText,
        onChange: function onChange(value) {
          return _this7.handleDateInputChange(value, 'min');
        },
        onBlur: function onBlur(value) {
          return _this7.handleDateInputBlur(value, 'min');
        }
      })), React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__time-picker-wrap")
      }, startTimeSelectMode === 'TimePicker' ? React.createElement(TimePicker, {
        className: "".concat(prefixCls, "-date-range-picker__editor"),
        placeholder: Locale.t('datepicker.startTime'),
        format: timeFormat(format),
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        },
        showTrigger: false,
        allowClear: false,
        disabled: this.timePickerDisable(),
        value: minTime,
        onChange: function onChange(value) {
          return _this7.handleTimeInputChange(value, 'min');
        },
        isShowCurrent: showTimeCurrent,
        selectableRange: startTimeSelectableRange
      }) : React.createElement(TimePicker.TimeSelect, {
        className: "".concat(prefixCls, "-date-range-picker__editor"),
        placeholder: Locale.t('datepicker.startTime'),
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        },
        showTrigger: false,
        allowClear: false,
        disabled: this.timePickerDisable(),
        value: minTime,
        onChange: function onChange(value) {
          return _this7.handleTimeInputChange(value, 'min');
        },
        start: startTimeSelectModeProps.start,
        step: startTimeSelectModeProps.step,
        end: startTimeSelectModeProps.end,
        maxTime: startTimeSelectModeProps.maxTime,
        minTime: startTimeSelectModeProps.minTime
      }))), React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__editors-wrap is-right")
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__time-picker-wrap")
      }, React.createElement(Input, {
        placeholder: Locale.t('datepicker.endDate'),
        className: "".concat(prefixCls, "-date-range-picker__editor"),
        value: maxDateInputText,
        readOnly: !minDate,
        onChange: function onChange(value) {
          return _this7.handleDateInputChange(value, 'max');
        },
        onBlur: function onBlur(value) {
          return _this7.handleDateInputBlur(value, 'max');
        }
      })), React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__time-picker-wrap")
      }, endTimeSelectMode === 'TimePicker' ? React.createElement(TimePicker, {
        className: "".concat(prefixCls, "-date-range-picker__editor"),
        placeholder: Locale.t('datepicker.endTime'),
        format: timeFormat(format),
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        },
        showTrigger: false,
        allowClear: false,
        disabled: this.timePickerDisable(),
        value: maxTime,
        onChange: function onChange(value) {
          return _this7.handleTimeInputChange(value, 'max');
        },
        isShowCurrent: showTimeCurrent,
        selectableRange: endTimeSelectableRange
      }) : React.createElement(TimePicker.TimeSelect, {
        className: "".concat(prefixCls, "-date-range-picker__editor"),
        placeholder: Locale.t('datepicker.endTime'),
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        },
        showTrigger: false,
        allowClear: false,
        disabled: this.timePickerDisable(),
        value: maxTime,
        onChange: function onChange(value) {
          return _this7.handleTimeInputChange(value, 'max');
        },
        start: endTimeSelectModeProps.start,
        step: endTimeSelectModeProps.step,
        end: endTimeSelectModeProps.end,
        maxTime: endTimeSelectModeProps.maxTime,
        minTime: endTimeSelectModeProps.minTime
      })))), React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__content ").concat(prefixCls, "-date-range-picker__content is-left")
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-date-range-picker__header")
      }, React.createElement(Icon, {
        type: "left-double",
        onClick: this.prevYear.bind(this, 'leftDate', leftDate, function () {}),
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-range-picker__prev-btn")
      }), React.createElement(Icon, {
        type: "left",
        onClick: this.prevMonth.bind(this, 'leftDate', leftDate, function () {}),
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-range-picker__prev-btn")
      }), React.createElement(YearAndMonthPopover, {
        value: leftDate.getFullYear(),
        sourceData: YEARS_ARRAY(yearCount),
        onChange: this.handleChangeYear.bind(this, 'leftDate', leftDate)
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__header-label")
      }, "".concat(leftDate.getFullYear(), " ").concat(t('datepicker.year')))), React.createElement(YearAndMonthPopover, {
        value: leftDate.getMonth() + 1,
        sourceData: MONTH_ARRRY,
        onChange: this.handleChangeMonth.bind(this, 'leftDate', leftDate)
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__header-label")
      }, t("datepicker.month".concat(leftDate.getMonth() + 1)))), React.createElement(Icon, {
        type: "right-double",
        onClick: this.nextYear.bind(this, 'leftDate', leftDate, this.handleLeftNextYear),
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-range-picker__next-btn")
      }), React.createElement(Icon, {
        type: "right",
        onClick: this.nextMonth.bind(this, 'leftDate', leftDate, this.handleLeftNextMonth),
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-range-picker__next-btn")
      })), React.createElement(DateTable, {
        mode: SELECTION_MODES.RANGE,
        date: leftDate,
        value: minDate,
        minDate: minDate,
        maxDate: maxDate,
        rangeState: rangeState,
        disabledDate: disabledDate,
        onChangeRange: this.handleChangeRange.bind(this),
        onPick: this.handleRangePick.bind(this),
        firstDayOfWeek: firstDayOfWeek
      })), React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__content ").concat(prefixCls, "-date-range-picker__content is-right")
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-date-range-picker__header")
      }, React.createElement(Icon, {
        type: "left-double",
        onClick: this.prevYear.bind(this, 'rightDate', rightDate, this.handleRightPrevYear),
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-range-picker__prev-btn")
      }), React.createElement(Icon, {
        type: "left",
        onClick: this.prevMonth.bind(this, 'rightDate', rightDate, this.handleRightPrevMonth),
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-range-picker__prev-btn")
      }), React.createElement(YearAndMonthPopover, {
        value: rightDate.getFullYear(),
        sourceData: YEARS_ARRAY(yearCount),
        onChange: this.handleChangeYear.bind(this, 'rightDate', rightDate)
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__header-label")
      }, "".concat(rightDate.getFullYear(), " ").concat(t('datepicker.year')))), React.createElement(YearAndMonthPopover, {
        value: rightDate.getMonth() + 1,
        sourceData: MONTH_ARRRY,
        onChange: this.handleChangeMonth.bind(this, 'rightDate', rightDate)
      }, React.createElement("span", {
        className: "".concat(prefixCls, "-date-range-picker__header-label")
      }, t("datepicker.month".concat(rightDate.getMonth() + 1)))), React.createElement(Icon, {
        type: "right-double",
        onClick: this.nextYear.bind(this, 'rightDate', rightDate, function () {}),
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-range-picker__next-btn")
      }), React.createElement(Icon, {
        type: "right",
        onClick: this.nextMonth.bind(this, 'rightDate', rightDate, function () {}),
        className: "".concat(prefixCls, "-picker-panel__icon-btn ").concat(prefixCls, "-date-range-picker__next-btn")
      })), React.createElement(DateTable, {
        mode: SELECTION_MODES.RANGE,
        date: rightDate,
        value: maxDate,
        minDate: minDate,
        maxDate: maxDate,
        rangeState: rangeState,
        disabledDate: disabledDate,
        onChangeRange: this.handleChangeRange.bind(this),
        onPick: this.handleRangePick.bind(this),
        firstDayOfWeek: firstDayOfWeek
      })))), typeof footer === 'function' && footer() && React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__extra-footer")
      }, footer()), showTime && React.createElement("div", {
        className: "".concat(prefixCls, "-picker-panel__footer")
      }, React.createElement(Button, {
        className: "".concat(prefixCls, "-picker-panel__btn cancel"),
        onClick: this.handleCancel
      }, Locale.t('datepicker.cancel')), React.createElement(Button, {
        type: "primary",
        className: classNames("".concat(prefixCls, "-picker-panel__btn confirm"), {
          'disabled': this.confirmBtnDisabled()
        }),
        onClick: this.handleConfirm,
        disabled: this.confirmBtnDisabled()
      }, Locale.t('datepicker.confirm'))));
    }
  }]);

  return DateRangePanel;
}(React.Component);

_defineProperty(DateRangePanel, "getEndTimeSelectableRange", function (_ref2) {
  var minTime = _ref2.minTime,
      endTimeSelectableRange = _ref2.endTimeSelectableRange,
      endTimeSelectMode = _ref2.endTimeSelectMode,
      endTimeSelectModeProps = _ref2.endTimeSelectModeProps;

  //TimePicker模式下返回endTimeSelectableRange
  if (endTimeSelectMode === 'TimePicker') {
    var propsTimeRangeArr = converSelectRange({
      selectableRange: endTimeSelectableRange
    });
    if (!minTime) return endTimeSelectableRange;

    var getTimeString = function getTimeString(date) {
      return "".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds());
    };

    var rangeResult = [];

    if (propsTimeRangeArr && propsTimeRangeArr.length > 0) {
      var min = minTime;
      var max = setTime(new Date(minTime), new Date(new Date().setHours(23, 59, 59)));
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = propsTimeRangeArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var range = _step.value;
          min = Math.max(min, range[0]);
          max = Math.min(max, range[1]);
          rangeResult.push("".concat(getTimeString(new Date(min)), " - ").concat(getTimeString(new Date(max))));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      rangeResult = ["".concat(getTimeString(minTime), " - 23:59:59")];
    }

    return rangeResult; //TimeSelect模式下返回endTimeSelectModeProps
  } else {
    var propsResult = endTimeSelectModeProps;
    propsResult.minTime = dateToStr(minTime);
    return propsResult;
  }
});

DateRangePanel.isValid = function (value, disabledDate) {
  if (value && value.length >= 2 && value[0] > value[1]) return false;
  return typeof disabledDate === 'function' && value && value.length >= 2 ? !(disabledDate(value[0]) || disabledDate(value[1])) : true;
};

export default DateRangePanel;