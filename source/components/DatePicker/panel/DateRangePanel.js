import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DateTable } from '../basic';
import Input from '../../Input/index.tsx';
import Icon from '../../Icon/index.tsx';
import Button from '../../Button/index.tsx';
import TimePicker  from '../../TimePicker/index.tsx';
import { converSelectRange } from '../TimePicker.tsx';
import TimePanel from './TimePanel.js';
import TimeSelectPanel from './TimeSelectPanel.js';
import YearAndMonthPopover from './YearAndMonthPopover.js';
import isEqual from 'lodash/isEqual';
import {
  SELECTION_MODES,
  toDate,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  timeFormat,
  dateFormat,
  formatDate,
  parseDate,
  YEARS_ARRAY,
  isValidValue,
  isValidValueArr,
  setTime,
  equalYearAndMonth,
  diffDate
} from '../../../utils/date';
import Locale from '../../../utils/date/locale';
import {TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS} from '../constants';
import ConfigConsumer from '../../Config/Consumer';

const TimeSelect = TimePicker.TimeSelect;

const isInputValid = (text, date, disabledDate) => {
  if(text.trim() === '' || !isValidValueArr(date) || !DateRangePanel.isValid(date, disabledDate)) return false;
  return true;
};

const dateToStr = (date) => {
  if (!date || !isValidValue(date)) return '';
  const tdate = date;
  const formatter = (
    TYPE_VALUE_RESOLVER_MAP['timeselect']
  ).formatter;
  const result = formatter(tdate, DEFAULT_FORMATS['timeselect']);
  return result;
};

class DateRangePanel extends React.Component {
  static get propTypes() {
    return {
      prefixCls: PropTypes.string,
      format: PropTypes.string,                  //basePicker
      value: PropTypes.array,                    //basePicker
      onPick: PropTypes.func.isRequired,         //basePicker
      onCancelPicked: PropTypes.func.isRequired, //basePicker
      yearCount: PropTypes.number,
      shortcuts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired
        })
      ),
      disabledDate: PropTypes.func,
      firstDayOfWeek: PropTypes.number,
      footer: PropTypes.func,
      onError: PropTypes.func,
      defaultPanelMonth: PropTypes.instanceOf(Date),
      scene: PropTypes.oneOf(['past', 'future']),
      // 时间面板
      showTime: PropTypes.bool,
      showTimeCurrent: PropTypes.bool,
      startTimeSelectableRange: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      endTimeSelectableRange: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      defaultStartTimeValue: PropTypes.instanceOf(Date),
      defaultEndTimeValue: PropTypes.instanceOf(Date),
      startTimeSelectMode: PropTypes.oneOf(['TimePicker','TimeSelect']),
      startTimeSelectModeProps: PropTypes.object,
      endTimeSelectMode: PropTypes.oneOf(['TimePicker','TimeSelect']),
      endTimeSelectModeProps: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      prefixCls: 'fishd',
      yearCount: 50,
      firstDayOfWeek: 0,
      onError: () => {},
      defaultPanelMonth: new Date(new Date().setHours(0,0,0,0)),
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
        maxTime: '',
      },
      endTimeSelectMode: 'TimePicker',
      endTimeSelectModeProps: {
        start: '09:00',
        end: '18:00',
        step: '00:30',
        minTime: '',
        maxTime: '',
      }
    };
  }

  static propsToState(props) {
    const setDate = (start, end) => {
      let result = {
        left: start,
        right: end
      };
      // 当开始日期和结束日期在同一个月，根据不同的业务场景设置左右日历
      if(equalYearAndMonth(start, end)){
        if(props.scene === 'past') {
          result = {
            left: prevMonth(end),
            right: end
          };
        }else{
          result = {
            left: start,
            right: nextMonth(start)
          };
        }
      }
      return result;
    };
    const setDefaultDate = (defaultPanelMonth) => {
      let result = {};
      if(props.scene === 'past') {
        result = {
          left: prevMonth(defaultPanelMonth),
          right: defaultPanelMonth
        };
      }else{
        result = {
          left: defaultPanelMonth,
          right: nextMonth(defaultPanelMonth)
        };
      }
      return result;
    };
    const minTime = isValidValueArr(props.value) ? toDate(props.value[0]) : toDate(props.defaultStartTimeValue);
    const maxTime = isValidValueArr(props.value) ? toDate(props.value[1]) : toDate(props.defaultEndTimeValue);
    const minDate = isValidValueArr(props.value) ? toDate(props.value[0]) : null;
    const maxDate = isValidValueArr(props.value) ? toDate(props.value[1]) : null;
    const isSameDate = minDate && maxDate && diffDate(minDate, maxDate) === 0;

    const getTimeRangeOption = {
      minTime: minTime,
      endTimeSelectableRange: props.endTimeSelectableRange,
      endTimeSelectMode: props.endTimeSelectMode,
      endTimeSelectModeProps: props.endTimeSelectModeProps
    };

    const state = {};
    // 左侧日历月份
    state.leftDate = isValidValueArr(props.value)
      ? setDate(props.value[0], props.value[1])["left"]
      : setDefaultDate(props.defaultPanelMonth)["left"];
    // 右侧日历月份
    state.rightDate = isValidValueArr(props.value)
      ? setDate(props.value[0], props.value[1])["right"]
      : setDefaultDate(props.defaultPanelMonth)["right"];
    // 开始日期
    state.minDate = minDate;
    // 结束日期
    state.maxDate = maxDate;
    // 开始日期输入框中的值
    state.minDateInputText = isValidValueArr(props.value) ? formatDate(props.value[0], dateFormat(props.format)) : '';
    // 结束日期输入框中的值
    state.maxDateInputText = isValidValueArr(props.value) ? formatDate(props.value[1], dateFormat(props.format)) : '';
    // 开始时间
    state.minTime = minTime;
    // 结束时间
    state.maxTime = maxTime;
    // 开始时间可选范围
    state.startTimeSelectableRange = props.startTimeSelectableRange;
    // 结束时间可选范围
    state.endTimeSelectableRange =
      props.endTimeSelectMode === "TimePicker" && isSameDate
        ? DateRangePanel.getEndTimeSelectableRange(getTimeRangeOption)
        : props.endTimeSelectableRange;
    state.endTimeSelectModeProps =
      props.endTimeSelectMode === "TimeSelect" && isSameDate
        ? DateRangePanel.getEndTimeSelectableRange(getTimeRangeOption)
        : props.endTimeSelectModeProps;
    return state;
  }

  // 计算结束时间的可选范围
  static getEndTimeSelectableRange = ({
    minTime,
    endTimeSelectableRange,
    endTimeSelectMode,
    endTimeSelectModeProps
  }) => {
    //TimePicker模式下返回endTimeSelectableRange
    if(endTimeSelectMode === 'TimePicker') {
      const propsTimeRangeArr = converSelectRange({selectableRange: endTimeSelectableRange});

      if(!minTime) return endTimeSelectableRange;

      const getTimeString = (date) => {
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      };

      let rangeResult = [];
      if(propsTimeRangeArr && propsTimeRangeArr.length > 0){
        let min = minTime;
        let max = setTime(new Date(minTime), new Date(new Date().setHours(23,59,59)));
        for(let range of propsTimeRangeArr) {
          min = Math.max(min, range[0]);
          max = Math.min(max, range[1]);
          rangeResult.push(`${getTimeString(new Date(min))} - ${getTimeString(new Date(max))}`);
        }
      }else{
        rangeResult = [`${getTimeString(minTime)} - 23:59:59`];
      }
      return rangeResult;
      //TimeSelect模式下返回endTimeSelectModeProps
    }else{
      // let propsResult = endTimeSelectModeProps;
      // propsResult.minTime = dateToStr(minTime);
      let propsResult = Object.assign({}, endTimeSelectModeProps, { minTime: dateToStr(minTime) });
      return propsResult;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    // 只 value 受控
    if ('value' in nextProps && !isEqual(prevState.prevPropValue, nextProps.value)) {
      let state = DateRangePanel.propsToState(nextProps);
      state.prevPropValue = nextProps.value;
      return state;
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = Object.assign({}, {
      rangeState: {
        firstSelectedValue: null,
        endDate: null,
        selecting: false,
      },
    }, DateRangePanel.propsToState(props));
  }

  // 鼠标移动选择结束时间的回调
  handleChangeRange(rangeState) {
    this.setState({
      minDate: new Date(Math.min(rangeState.firstSelectedValue, rangeState.endDate)),
      maxDate: new Date(Math.max(rangeState.firstSelectedValue, rangeState.endDate))
    });
  }

  // 日期时间都选择，确定按钮才可点击
  confirmBtnDisabled = () => {
    const {minDate, maxDate, minTime, maxTime, minDateInputText, maxDateInputText} = this.state;
    return !(minDate && maxDate && minTime && maxTime && minDateInputText && maxDateInputText);
  }

  // 未选择日期时，时间不可选
  timePickerDisable = () => {
    const {minDate, maxDate, minDateInputText, maxDateInputText} = this.state;
    return !(minDate && maxDate && minDateInputText && maxDateInputText);
  }

  // 计算结束时间的可选范围
  getEndTimeSelectableRange = (minTime) => {
    const { endTimeSelectableRange, endTimeSelectMode, endTimeSelectModeProps } = this.props;
    //TimePicker模式下返回endTimeSelectableRange
    return DateRangePanel.getEndTimeSelectableRange({
      minTime, endTimeSelectMode, endTimeSelectModeProps, endTimeSelectableRange
    });
  }

  // 计算最大时间
  getMaxTime = (maxTime, minTime) => {
    const { endTimeSelectMode } = this.props;
    if(endTimeSelectMode === 'TimePicker') {
      return (
        maxTime && TimePanel.isValid(
          maxTime,
          converSelectRange({selectableRange:this.getEndTimeSelectableRange(minTime)})
        ) ? maxTime : null
      );
    }else{
      return (
        maxTime && TimeSelectPanel.isValid(
          `${maxTime.getHours()}:${maxTime.getMinutes()}`,
          this.getEndTimeSelectableRange(minTime)
        ) ? maxTime : null
      );
    }
  }

  // 当开始日期和结束日期为同一天时，需要控制结束时间的可选范围
  setEndTimeRange = () => {
    const { minDate, maxDate, minTime, maxTime } = this.state;
    const { endTimeSelectableRange, endTimeSelectMode, endTimeSelectModeProps } = this.props;
    const isSameDate = minDate && maxDate && diffDate(minDate, maxDate) === 0;

    this.setState({
      maxTime: isSameDate && minTime ? this.getMaxTime(maxTime, minTime) : maxTime,
      endTimeSelectableRange: (
        endTimeSelectMode === 'TimePicker' && isSameDate && minTime ?
        this.getEndTimeSelectableRange(minTime) :
        endTimeSelectableRange
      ),
      endTimeSelectModeProps: (
        endTimeSelectMode === 'TimeSelect' && isSameDate && minTime ?
        this.getEndTimeSelectableRange(minTime) :
        endTimeSelectModeProps
      )
    });
  }

  // 开始日期或结束日期发生改变
  handleDateInputChange(e, type) {
    const {disabledDate,format} = this.props;
    const {minDate, maxDate, minTime, maxTime} = this.state;
    const text = type === 'min' ? 'minDateInputText' : 'maxDateInputText';
    const value = type === 'min' ? 'minDate' : 'maxDate';

    const inputText = e.target.value;
    const ndate = parseDate(inputText, dateFormat(format));
    const getDate = () => {
      const ndateMin = [minTime?setTime(new Date(ndate), minTime):new Date(ndate) , maxDate];
      const ndateMax = [minDate, maxTime?setTime(new Date(ndate), maxTime):new Date(ndate)];
      return type === 'min' ? ndateMin : ndateMax;
    };

    if (!isInputValid(inputText, getDate(), disabledDate)) {
      this.setState({
        [text]: inputText,
      });
    } else {
      this.setState({
        [text]: inputText,
        [value]: new Date(ndate)
      }, () => {
        //当开始日期和结束日期为同一天时，控制结束时间的可选范围
        this.setEndTimeRange();
      });
    }
  }

  // 日期输入框失焦时，重置入合法值
  handleDateInputBlur = (e, type) => {
    const {minDate, maxDate} = this.state;
    if(type === 'min') {
      this.setState({
        minDateInputText: formatDate(minDate, dateFormat(this.props.format))
      });
    }else{
      this.setState({
        maxDateInputText: formatDate(maxDate, dateFormat(this.props.format))
      });
    }
  }

  // 开始时间或结束时间发生改变
  handleTimeInputChange(value, type) {
    if (value) {
      if (type === 'min') {
        this.setState({
          minTime: new Date(value),
        }, () => {
          //当开始日期和结束日期为同一天时，控制结束时间的可选范围
          this.setEndTimeRange();
        });
      } else {
        this.setState({
          maxTime: new Date(value),
        });
      }
    }
  }

  // 点击快捷选项
  handleShortcutClick(shortcut) {
    shortcut.onClick();
  }

  // 上一年
  prevYear(type, date, callback=()=>{}) {
    this.setState({
      [type]: prevYear(date),
    }, callback);
  }

  // 下一年
  nextYear(type, date, callback=()=>{}) {
    this.setState({
      [type]: nextYear(date),
    }, callback);
  }

  // 上个月
  prevMonth(type, date, callback=()=>{}) {
    this.setState({
      [type]: prevMonth(date)
    }, callback);
  }

  // 下个月
  nextMonth(type, date, callback=()=>{}) {
    this.setState({
      [type]: nextMonth(date)
    }, callback);
  }

  // 左边日历的next year btn特殊处理: 左边日历的下一年面板日期大于右边日历，右边日历的年份+1
  handleLeftNextYear = () => {
    const { leftDate, rightDate } = this.state;
    if(leftDate >= rightDate) {
      this.nextYear('rightDate', rightDate);
    }
  }

  // 左边日历的next month btn特殊处理: 左边日历的下一月等于右边日历，右边日历月份+1
  handleLeftNextMonth = () => {
    const { leftDate, rightDate } = this.state;
    if((rightDate.getFullYear() === leftDate.getFullYear()) && (rightDate.getMonth() === (leftDate.getMonth()))) {
      this.nextMonth('rightDate', rightDate);
    }
  }

  // 右边日历的prev year btn特殊处理: 右边日历的上一年面板小于左边日历，左边日历年份-1
  handleRightPrevYear = () => {
    const { leftDate, rightDate } = this.state;
    if(rightDate <= leftDate) {
      this.prevYear('leftDate', leftDate);
    }
  }

  // 右边日历的prev month btn特殊处理： 右边日历的上一月等于左边日历，左边日历的月份-1
  handleRightPrevMonth = () => {
    const { leftDate, rightDate } = this.state;
    if((rightDate.getFullYear() === leftDate.getFullYear()) && (rightDate.getMonth() === leftDate.getMonth())) {
      this.prevMonth('leftDate', leftDate);
    }
  }

  // 切换年份
  handleChangeYear(type, date, year) {
    this.setState({
      [type]: new Date((new Date(date)).setFullYear(year)),
    }, () => {
      // 切换完年份，若左边日历小于等于右边日历，保持右边日历是左边日历的下一年
      const { leftDate, rightDate } = this.state;
      if(type === 'leftDate'){
        if(leftDate >= rightDate) {
          this.setState({
            rightDate: new Date(new Date(rightDate).setFullYear(leftDate.getFullYear() + 1))
          });
        }
      }else if(type === 'rightDate') {
        if(leftDate >= rightDate) {
          this.setState({
            leftDate: new Date(new Date(leftDate).setFullYear(rightDate.getFullYear() - 1))
          });
        }
      }
    });
  }

  // 切换月份
  handleChangeMonth(type, date, month, locales){
    this.setState({
      [type]: new Date((new Date(date)).setMonth((parseInt(locales[month]) - 1)))
    }, ()=>{
      // 切换完月份，若左边日历小于等于右边日历，保持右边日历是左边日历的下一月
      const { leftDate, rightDate } = this.state;
      if(type === 'leftDate'){
        if(leftDate >= rightDate) {
          this.setState({
            rightDate: nextMonth(leftDate)
          });
        }
      }else if(type === 'rightDate') {
        if(leftDate >= rightDate) {
          this.setState({
            leftDate: prevMonth(rightDate)
          });
        }
      }
    });
  }

  // 点击日期
  handleRangePick({ minDate, maxDate }, isClose) {
    const { showTime, onPick, format, onError } = this.props;
    const { minTime, maxTime } = this.state;
    const pickedMinTime = minTime ? setTime(new Date(minDate), minTime) : minDate;
    const pickedMaxTime = maxTime ? setTime(new Date(maxDate), maxTime) : maxDate;

    if(minDate && maxDate && onError && onError([pickedMinTime, pickedMaxTime])) {
      return;
    }

    this.setState({
      minDate: minDate ? new Date(minDate) : null,
      maxDate: maxDate ? new Date(maxDate) : null,
      minDateInputText: formatDate(minDate, dateFormat(format)),
      maxDateInputText: formatDate(maxDate, dateFormat(format)),
    },()=> {
      //当开始日期和结束日期为同一天时，控制结束时间的可选范围
      this.setEndTimeRange();
    });

    if (!isClose) return;
    if (!showTime) {
      //日期范围选择的开始时间为 00：00 结束时间为 23：59
      const pickedMinTime = setTime(new Date(minDate), new Date(new Date().setHours(0,0,0,0)));
      const pickedMaxTime = setTime(new Date(maxDate), new Date(new Date().setHours(23,59,59,999)));
      onPick([pickedMinTime, pickedMaxTime], false, true);
    }
  }

  // 点击确定按钮
  handleConfirm = () => {
    const { onError } = this.props;
    const { minDate, maxDate, minTime, maxTime } = this.state;
    const pickedMinTime = setTime(new Date(minDate), minTime);
    const pickedMaxTime = setTime(new Date(maxDate), maxTime);

    if(pickedMinTime && pickedMaxTime && onError && onError([pickedMinTime, pickedMaxTime])) {
      return;
    }

    this.props.onPick([pickedMinTime, pickedMaxTime], false, true);
  }

  // 点击取消按钮
  handleCancel = () => {
    this.props.onCancelPicked();
  }

  render() {
    const {
      shortcuts,
      disabledDate,
      firstDayOfWeek,
      format,
      yearCount,
      showTime,
      showTimeCurrent,
      footer,
      prefixCls,
      startTimeSelectMode,
      startTimeSelectModeProps,
      endTimeSelectMode
      //, endTimeSelectModeProps  结束时间展示：日期相同时，依据开始时间变更； 不同日期时，时间为默认传入值
    } = this.props;
    const {
      rangeState,
      leftDate,
      rightDate,
      minDate,
      maxDate,
      minDateInputText,
      maxDateInputText,
      minTime,
      maxTime,
      startTimeSelectableRange,
      endTimeSelectableRange,
      endTimeSelectModeProps
    } = this.state;

    const t = Locale.t;

    return (
      <ConfigConsumer componentName="DatePicker">
        {
          (Locales, lang) => (
            <div
              className={classNames(
                `${prefixCls}-picker-panel`,
                `${prefixCls}-date-range-picker`,
                {
                  'has-sidebar': shortcuts,
                  'has-time': showTime
                })}
            >
              <div className={`${prefixCls}-picker-panel__body-wrapper`}>
                {
                  Array.isArray(shortcuts) && (
                    <div className={`${prefixCls}-picker-panel__sidebar`}>
                      {
                        shortcuts.map((e, idx) => {
                          return (
                            <button
                              key={idx}
                              type="button"
                              className={`${prefixCls}-picker-panel__shortcut`}
                              onClick={() => this.handleShortcutClick(e)}>{e.text}
                            </button>
                          );
                        })
                      }
                    </div>
                  )
                }
                <div className={`${prefixCls}-picker-panel__body`}>
                  {
                    showTime && (
                      <div className={`${prefixCls}-date-range-picker__time-header`}>
                        <span className={`${prefixCls}-date-range-picker__editors-wrap is-left`}>
                          <span className={`${prefixCls}-date-range-picker__time-picker-wrap`}>
                            <Input
                              placeholder={Locales.startDate}
                              className={`${prefixCls}-date-range-picker__editor`}
                              value={minDateInputText}
                              onChange={value => this.handleDateInputChange(value, 'min')}
                              onBlur={value => this.handleDateInputBlur(value, 'min')}
                            />
                          </span>
                          <span className={`${prefixCls}-date-range-picker__time-picker-wrap`}>
                            {
                              startTimeSelectMode === 'TimePicker' ?
                                <TimePicker
                                  className={`${prefixCls}-date-range-picker__editor`}
                                  placeholder={Locales.startTime}
                                  format={timeFormat(format)}
                                  getPopupContainer={(node) => node.parentNode}
                                  showTrigger={false}
                                  allowClear={false}
                                  disabled={this.timePickerDisable()}
                                  value={minTime}
                                  onChange={value => this.handleTimeInputChange(value, 'min')}
                                  isShowCurrent={showTimeCurrent}
                                  selectableRange={startTimeSelectableRange}
                                />
                                :
                                <TimePicker.TimeSelect
                                  className={`${prefixCls}-date-range-picker__editor`}
                                  placeholder={Locales.startTime}
                                  getPopupContainer={(node) => node.parentNode}
                                  showTrigger={false}
                                  allowClear={false}
                                  disabled={this.timePickerDisable()}
                                  value={minTime}
                                  onChange={value => this.handleTimeInputChange(value, 'min')}
                                  start={startTimeSelectModeProps.start}
                                  step={startTimeSelectModeProps.step}
                                  end={startTimeSelectModeProps.end}
                                  maxTime={startTimeSelectModeProps.maxTime}
                                  minTime={startTimeSelectModeProps.minTime}
                                />
                            }
                          </span>
                        </span>
                        <span className={`${prefixCls}-date-range-picker__editors-wrap is-right`}>
                          <span className={`${prefixCls}-date-range-picker__time-picker-wrap`}>
                            <Input
                              placeholder={Locales.endDate}
                              className={`${prefixCls}-date-range-picker__editor`}
                              value={maxDateInputText}
                              readOnly={!minDate}
                              onChange={value => this.handleDateInputChange(value, 'max')}
                              onBlur={value => this.handleDateInputBlur(value, 'max')}
                            />
                          </span>
                          <span className={`${prefixCls}-date-range-picker__time-picker-wrap`}>
                            {
                              endTimeSelectMode === 'TimePicker' ?
                                <TimePicker
                                  className={`${prefixCls}-date-range-picker__editor`}
                                  placeholder={Locales.endTime}
                                  format={timeFormat(format)}
                                  getPopupContainer={(node) => node.parentNode}
                                  showTrigger={false}
                                  allowClear={false}
                                  disabled={this.timePickerDisable()}
                                  value={maxTime}
                                  onChange={value => this.handleTimeInputChange(value, 'max')}
                                  isShowCurrent={showTimeCurrent}
                                  selectableRange={endTimeSelectableRange}
                                />
                                :
                                <TimePicker.TimeSelect
                                  className={`${prefixCls}-date-range-picker__editor`}
                                  placeholder={Locales.endTime}
                                  getPopupContainer={(node) => node.parentNode}
                                  showTrigger={false}
                                  allowClear={false}
                                  disabled={this.timePickerDisable()}
                                  value={maxTime}
                                  onChange={value => this.handleTimeInputChange(value, 'max')}
                                  start={endTimeSelectModeProps.start}
                                  step={endTimeSelectModeProps.step}
                                  end={endTimeSelectModeProps.end}
                                  maxTime={endTimeSelectModeProps.maxTime}
                                  minTime={endTimeSelectModeProps.minTime}
                                />
                            }
                          </span>
                        </span>
                      </div>
                    )
                  }
                  <div className={`${prefixCls}-picker-panel__content ${prefixCls}-date-range-picker__content is-left`}>
                    <div className={`${prefixCls}-date-range-picker__header`}>
                      <Icon
                        type="left-double"
                        onClick={this.prevYear.bind(this, 'leftDate', leftDate, ()=>{})}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__prev-btn`} />
                      <Icon
                        type="left"
                        onClick={this.prevMonth.bind(this, 'leftDate', leftDate, ()=>{})}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__prev-btn`} />
                      <YearAndMonthPopover
                        value={leftDate.getFullYear()}
                        sourceData={YEARS_ARRAY(yearCount)}
                        onChange={this.handleChangeYear.bind(this, 'leftDate', leftDate)}
                      >
                        <span className={`${prefixCls}-date-range-picker__header-label`}>
                          {`${leftDate.getFullYear()} ${Locales.year}`}
                        </span>
                      </YearAndMonthPopover>
                      <YearAndMonthPopover
                        value={leftDate.getMonth() + 1}
                        sourceData={Locales.MONTH_ARRAY}
                        onChange={(month) => this.handleChangeMonth.call(this, 'leftDate', leftDate, month, Locales)}
                      >
                        <span className={`${prefixCls}-date-range-picker__header-label`}>
                          {Locales[`month${leftDate.getMonth() + 1}`]}
                        </span>
                      </YearAndMonthPopover>
                      <Icon
                        type="right-double"
                        onClick={this.nextYear.bind(this, 'leftDate', leftDate, this.handleLeftNextYear)}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__next-btn`} />
                      <Icon
                        type="right"
                        onClick={this.nextMonth.bind(this, 'leftDate', leftDate, this.handleLeftNextMonth)}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__next-btn`} />
                    </div>
                    <DateTable
                      mode={SELECTION_MODES.RANGE}
                      date={leftDate}
                      value={minDate}
                      minDate={minDate}
                      maxDate={maxDate}
                      rangeState={rangeState}
                      disabledDate={disabledDate}
                      onChangeRange={this.handleChangeRange.bind(this)}
                      onPick={this.handleRangePick.bind(this)}
                      firstDayOfWeek={firstDayOfWeek}
                    />
                  </div>
                  <div className={`${prefixCls}-picker-panel__content ${prefixCls}-date-range-picker__content is-right`}>
                    <div className={`${prefixCls}-date-range-picker__header`}>
                      <Icon
                        type="left-double"
                        onClick={this.prevYear.bind(this, 'rightDate', rightDate, this.handleRightPrevYear)}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__prev-btn`} />
                      <Icon
                        type="left"
                        onClick={this.prevMonth.bind(this, 'rightDate', rightDate, this.handleRightPrevMonth)}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__prev-btn`} />
                      <YearAndMonthPopover
                        value={rightDate.getFullYear()}
                        sourceData={YEARS_ARRAY(yearCount)}
                        onChange={this.handleChangeYear.bind(this, 'rightDate', rightDate)}
                      >
                        <span className={`${prefixCls}-date-range-picker__header-label`}>
                          {`${rightDate.getFullYear()} ${Locales.year}`}
                        </span>
                      </YearAndMonthPopover>
                      <YearAndMonthPopover
                        value={rightDate.getMonth() + 1}
                        sourceData={Locales.MONTH_ARRAY}
                        onChange={(month) => this.handleChangeMonth.call(this, 'rightDate', rightDate, month, Locales)}
                      >
                        <span className={`${prefixCls}-date-range-picker__header-label`}>
                          {Locales[`month${rightDate.getMonth() + 1}`]}
                        </span>
                      </YearAndMonthPopover>
                      <Icon
                        type="right-double"
                        onClick={this.nextYear.bind(this, 'rightDate', rightDate, ()=>{})}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__next-btn`} />
                      <Icon
                        type="right"
                        onClick={this.nextMonth.bind(this, 'rightDate', rightDate, ()=>{})}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__next-btn`} />
                    </div>
                    <DateTable
                      mode={SELECTION_MODES.RANGE}
                      date={rightDate}
                      value={maxDate}
                      minDate={minDate}
                      maxDate={maxDate}
                      rangeState={rangeState}
                      disabledDate={disabledDate}
                      onChangeRange={this.handleChangeRange.bind(this)}
                      onPick={this.handleRangePick.bind(this)}
                      firstDayOfWeek={firstDayOfWeek}
                    />
                  </div>
                </div>
              </div>
              {
                typeof footer === 'function' && footer() && (
                  <div
                    className={`${prefixCls}-picker-panel__extra-footer`}
                  >
                    {footer()}
                  </div>
                )
              }
              {
                showTime && (
                  <div className={`${prefixCls}-picker-panel__footer`}>
                    <Button
                      className={`${prefixCls}-picker-panel__btn cancel`}
                      onClick={this.handleCancel}>{ Locales.cancel }
                    </Button>
                    <Button
                      type="primary"
                      className={
                        classNames(`${prefixCls}-picker-panel__btn confirm`, {'disabled': this.confirmBtnDisabled()})
                      }
                      onClick={this.handleConfirm}
                      disabled={this.confirmBtnDisabled()}>{ Locales.confirm }
                    </Button>
                  </div>
                )
              }
            </div>
          )
        }
      </ConfigConsumer>
    );
  }
}

DateRangePanel.isValid = (value, disabledDate) => {
  if(value && value.length >= 2 && value[0] > value[1]) return false;
  return (
    typeof disabledDate === 'function' && (value && value.length >= 2) ?
    !(disabledDate(value[0]) || disabledDate(value[1])) : true
  );
};

export default DateRangePanel;
