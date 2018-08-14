import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DateTable } from '../basic';
import Input from '../../Input/index.tsx';
import Icon from '../../Icon/index.tsx';
import Button from '../../Button/index.tsx';
import TimePicker from '../TimePicker.jsx';
import YearAndMonthPopover from './YearAndMonthPopover.jsx';

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
  MONTH_ARRRY,
  YEARS_ARRAY,
  isValidValue,
  setTime,
  equalYearAndMonth,
  diffDate
} from '../../../utils/date';
import Locale from '../../../utils/date/locale';

const isInputValid = (text, date, disabledDate) => {
  if(text.trim() === '' || !isValidValue(date) || typeof disabledDate === 'function' && disabledDate(date)) return false;
  return true;
}

const setRightDate = (dateA, dateB) => {
  if(equalYearAndMonth(dateA,dateB)){
    return nextMonth(dateB);
  }else{
    return dateB
  }
}

export default class DateRangePanel extends React.Component {
  static get propTypes() {
    return {
      format: PropTypes.string,                  //base
      value: PropTypes.array,                    //base
      onPick: PropTypes.func.isRequired,         //base
      onCancelPicked: PropTypes.func.isRequired, //base
      yearCount: PropTypes.number,
      shortcuts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired
        })
      ),
      shortcutsPlacement: PropTypes.string,
      disabledDate: PropTypes.func,
      firstDayOfWeek: PropTypes.number,
      renderExtraFooter: PropTypes.func,
      maxDateRange: PropTypes.number,
      onError: PropTypes.func,
      // 时间面板
      isShowTime: PropTypes.bool,
      isShowTimeCurrent: PropTypes.bool,
      startTimeSelectableRange: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      endTimeSelectableRange: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      defaultStartTimeValue: PropTypes.instanceOf(Date),
      defaultEndTimeValue: PropTypes.instanceOf(Date)
    }
  }

  static get defaultProps() {
    return {
      yearCount: 50,
      shortcutsPlacement: 'left',
      firstDayOfWeek: 0,
      maxDateRange: null,
      onError: () => {},
      isShowTime: false,
      isShowTimeCurrent: false,
      defaultStartTimeValue: null,
      defaultEndTimeValue: null
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      rangeState: {
        endDate: null,
        selecting: false,
      },
      minTimePickerVisible: false,
      maxTimePickerVisible: false,
      leftDate: isValidValue(props.value) ? props.value[0] : new Date(),
      rightDate: isValidValue(props.value) ? setRightDate(props.value[0], props.value[1]) : nextMonth(new Date()),
      minDate: isValidValue(props.value) ? toDate(props.value[0]) : null,
      maxDate: isValidValue(props.value) ? toDate(props.value[1]) : null,
      minDateInputText: isValidValue(props.value) ? formatDate(props.value[0], dateFormat(props.format)) : '',
      maxDateInputText: isValidValue(props.value) ? formatDate(props.value[1], dateFormat(props.format)) : '',
      minTime: isValidValue(props.value) ? toDate(props.value[0]) : toDate(props.defaultStartTimeValue),
      maxTime: isValidValue(props.value) ? toDate(props.value[1]) : toDate(props.defaultEndTimeValue)
    }
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if (value && isValidValue(value)){
      this.setState({
        minDate: toDate(nextProps.value[0]),
        maxDate: toDate(nextProps.value[1]),
      });
    }
  }

  // 鼠标移动选择结束时间的回调
  handleChangeRange({ endDate }) {
    const { minDate, maxDate } = this.state;
    // 向前选择
    if (endDate <= minDate) {
      this.setState({
        minDate: new Date(endDate)
      });
      if(!maxDate) {
        this.setState({
          maxDate: new Date(minDate)
        })
      }
      // 向后选择
    }else{
      this.setState({
        maxDate: new Date(endDate),
      })
    }
  }

  // 日期时间都选择，确定按钮才可点击
  confirmBtnDisabled = () => {
    const {minDate, maxDate, minTime, maxTime} = this.state;
    return !(minDate && maxDate && minTime && maxTime);
  }

  // 未选择日期时，时间不可选
  timePickerDisable = () => {
    const {minDate, maxDate, minDateInputText, maxDateInputText} = this.state;
    return !(minDate && maxDate && minDateInputText && maxDateInputText);
  }

  // 开始日期或结束日期发生改变
  handleDateInputChange(e, type) {
    const {disabledDate,format} = this.props;
    const text = type === 'min' ? 'minDateInputText' : 'maxDateInputText';
    const value = type === 'min' ? 'minDate' : 'maxDate';
    const dateValue = type === 'min' ? 'leftDate' : 'rightDate';

    const inputText = e.target.value;
    const ndate = parseDate(inputText, dateFormat(format));

    if (!isInputValid(inputText, ndate, disabledDate)) {
      this.setState({
        [text]: inputText,
      })
    } else {
      this.setState({
        [text]: inputText,
        [value]: new Date(ndate),
        [dateValue]: new Date(ndate)
      })
    }
  }

  // 开始时间或结束时间发生改变
  handleTimeInputChange(value, type) {
    if (value) {
      if (type === 'min') {
        this.setState({
          minTime: new Date(value),
          [`${type}TimpickerVisisble`]: false,
        })
      } else {
        this.setState({
          maxTime: new Date(value),
          [`${type}TimpickerVisisble`]: false
        })
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
    }, callback)
  }

  // 下一年
  nextYear(type, date, callback=()=>{}) {
    this.setState({
      [type]: nextYear(date),
    }, callback)
  }

  // 上个月
  prevMonth(type, date, callback=()=>{}) {
    this.setState({
      [type]: prevMonth(date)
    }, callback)
  }

  // 下个月
  nextMonth(type, date, callback=()=>{}) {
    this.setState({
      [type]: nextMonth(date)
    }, callback)
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
      [type]: new Date(date.setFullYear(year)),
    }, () => {
      // 切换完年份，若左边日历小于等于右边日历，保持右边日历是左边日历的下一年
      const { leftDate, rightDate } = this.state;
      if(type === 'leftDate'){
        if(leftDate >= rightDate) {
          this.setState({
            rightDate: new Date(rightDate.setFullYear(leftDate.getFullYear() + 1))
          })
        }
      }else if(type === 'rightDate') {
        if(leftDate >= rightDate) {
          this.setState({
            leftDate: new Date(leftDate.setFullYear(rightDate.getFullYear() - 1))
          })
        }
      }
    })
  }

  // 切换月份
  handleChangeMonth(type, date, month){
    this.setState({
      [type]: new Date((date.setMonth(parseInt(month.slice(0,-1)) - 1)))
    }, ()=>{
      // 切换完月份，若左边日历小于等于右边日历，保持右边日历是左边日历的下一月
      const { leftDate, rightDate } = this.state;
      if(type === 'leftDate'){
        if(leftDate >= rightDate) {
          this.setState({
            rightDate: nextMonth(leftDate)
          })
        }
      }else if(type === 'rightDate') {
        if(leftDate >= rightDate) {
          this.setState({
            leftDate: prevMonth(rightDate)
          })
        }
      }
    })
  }

  // 点击日期
  handleRangePick({ minDate, maxDate }, isClose) {
    const { isShowTime, onPick, format, maxDateRange, onError } = this.props;

    if(maxDateRange && maxDateRange > 0) {
      if(minDate && maxDate && diffDate(minDate, maxDate) + 1 > maxDateRange) {
        onError('最大选择范围不能超过'+maxDateRange+'天');
        return;
      }else{
        onError(null);
      }
    }

    this.setState({
      minDate: minDate ? new Date(minDate) : null,
      maxDate: maxDate ? new Date(maxDate) : null,
      minDateInputText: formatDate(minDate, dateFormat(format)),
      maxDateInputText: formatDate(maxDate, dateFormat(format)),
    });

    if (!isClose) return;
    if (!isShowTime) {
      onPick([minDate, maxDate], false, true)
    }
  }

  // 点击确定按钮
  handleConfirm = () => {
    const { minDate, maxDate, minTime, maxTime } = this.state;
    const pickedMinTime = setTime(new Date(minDate), minTime);
    const pickedMaxTime = setTime(new Date(maxDate), maxTime);
    this.props.onPick([pickedMinTime, pickedMaxTime], false, true);
  }

  // 点击取消按钮
  handleCancel = () => {
    this.props.onCancelPicked();
  }

  render() {
    const {
      shortcuts,
      shortcutsPlacement,
      disabledDate,
      firstDayOfWeek,
      format,
      yearCount,
      isShowTime,
      isShowTimeCurrent,
      startTimeSelectableRange,
      endTimeSelectableRange,
      renderExtraFooter
    } = this.props;
    const {
      rangeState,
      minTimePickerVisible,
      maxTimePickerVisible,
      leftDate,
      rightDate,
      minDate,
      maxDate,
      minDateInputText,
      maxDateInputText,
      minTime,
      maxTime
    } = this.state;

    const t = Locale.t;

    return (
      <div
        className={classNames('fishd-picker-panel fishd-date-range-picker', {
          'has-sidebar': shortcuts && shortcutsPlacement === 'left',
          'has-time': isShowTime
        })}
      >
        <div className="fishd-picker-panel__body-wrapper">
          {
            shortcutsPlacement === 'left' && Array.isArray(shortcuts) && (
              <div className="fishd-picker-panel__sidebar">
                {
                  shortcuts.map((e, idx) => {
                    return (
                      <button
                        key={idx}
                        type="button"
                        className="fishd-picker-panel__shortcut"
                        onClick={() => this.handleShortcutClick(e)}>{e.text}
                      </button>
                    )
                  })
                }
              </div>
            )
          }
          <div className="fishd-picker-panel__body">
            {
              isShowTime && (
                <div className="fishd-date-range-picker__time-header">
                  <span className="fishd-date-range-picker__editors-wrap is-left">
                    <span className="fishd-date-range-picker__time-picker-wrap">
                      <Input
                        placeholder={Locale.t('fishd.datepicker.startDate')}
                        className="fishd-date-range-picker__editor"
                        value={minDateInputText}
                        onChange={value => this.handleDateInputChange(value, 'min')}
                      />
                    </span>
                    <span className="fishd-date-range-picker__time-picker-wrap">
                      <TimePicker
                        className="fishd-date-range-picker__editor"
                        placeholder={Locale.t('fishd.datepicker.startTime')}
                        format={timeFormat(format)}
                        getPopupContainer={(node) => node.parentNode}
                        isShowTrigger={false}
                        isAllowClear={false}
                        isDisabled={this.timePickerDisable()}
                        value={minTime}
                        onFocus={()=>{
                          this.setState({
                            minTimePickerVisible: !minTimePickerVisible
                          })
                        }}
                        onChange={value => this.handleTimeInputChange(value, 'min')}
                        isShowCurrent={isShowTimeCurrent}
                        selectableRange={startTimeSelectableRange}
                      />
                    </span>
                  </span>
                  <span className="fishd-icon-arrow-right" />
                  <span className="fishd-date-range-picker__editors-wrap is-right">
                    <span className="fishd-date-range-picker__time-picker-wrap">
                      <Input
                        placeholder={Locale.t('fishd.datepicker.endDate')}
                        className="fishd-date-range-picker__editor"
                        value={maxDateInputText}
                        readOnly={!minDate}
                        onChange={value => this.handleDateInputChange(value, 'max')}
                      />
                    </span>
                    <span className="fishd-date-range-picker__time-picker-wrap">
                      <TimePicker
                        className="fishd-date-range-picker__editor"
                        placeholder={Locale.t('fishd.datepicker.endTime')}
                        format={timeFormat(format)}
                        getPopupContainer={(node) => node.parentNode}
                        isShowTrigger={false}
                        isAllowClear={false}
                        isDisabled={this.timePickerDisable()}
                        value={maxTime}
                        onFocus={()=>{
                          this.setState({
                            maxTimePickerVisible: !maxTimePickerVisible
                          })
                        }}
                        onChange={value => this.handleTimeInputChange(value, 'max')}
                        isShowCurrent={isShowTimeCurrent}
                        selectableRange={endTimeSelectableRange}
                      />
                    </span>
                  </span>
                </div>
              )
            }
            <div className="fishd-picker-panel__content fishd-date-range-picker__content is-left">
              <div className="fishd-date-range-picker__header">
                <Icon
                  type="left-double"
                  onClick={this.prevYear.bind(this, 'leftDate', leftDate, ()=>{})}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__prev-btn">
                </Icon>
                <Icon
                  type="left"
                  onClick={this.prevMonth.bind(this, 'leftDate', leftDate, ()=>{})}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__prev-btn">
                </Icon>
                <YearAndMonthPopover
                  value={leftDate.getFullYear()}
                  sourceData={YEARS_ARRAY(yearCount)}
                  onChange={this.handleChangeYear.bind(this, 'leftDate', leftDate)}
                >
                  <span className="fishd-date-range-picker__header-label">{`${leftDate.getFullYear()} ${t('fishd.datepicker.year')}`}</span>
                </YearAndMonthPopover>
                <YearAndMonthPopover
                  value={leftDate.getMonth() + 1}
                  sourceData={MONTH_ARRRY}
                  onChange={this.handleChangeMonth.bind(this, 'leftDate', leftDate)}
                >
                  <span className="fishd-date-range-picker__header-label">{t(`fishd.datepicker.month${leftDate.getMonth() + 1}`)}</span>
                </YearAndMonthPopover>
                <Icon
                  type="right-double"
                  onClick={this.nextYear.bind(this, 'leftDate', leftDate, this.handleLeftNextYear)}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__next-btn">
                </Icon>
                <Icon
                  type="right"
                  onClick={this.nextMonth.bind(this, 'leftDate', leftDate, this.handleLeftNextMonth)}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__next-btn">
                </Icon>
              </div>
              <DateTable
                selectionMode={SELECTION_MODES.RANGE}
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
            <div className="fishd-picker-panel__content fishd-date-range-picker__content is-right">
              <div className="fishd-date-range-picker__header">
                <Icon
                  type="left-double"
                  onClick={this.prevYear.bind(this, 'rightDate', rightDate, this.handleRightPrevYear)}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__prev-btn">
                </Icon>
                <Icon
                  type="left"
                  onClick={this.prevMonth.bind(this, 'rightDate', rightDate, this.handleRightPrevMonth)}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__prev-btn">
                </Icon>
                <YearAndMonthPopover
                  value={rightDate.getFullYear()}
                  sourceData={YEARS_ARRAY(yearCount)}
                  onChange={this.handleChangeYear.bind(this, 'rightDate', rightDate)}
                >
                  <span className="fishd-date-range-picker__header-label">{`${rightDate.getFullYear()} ${t('fishd.datepicker.year')}`}</span>
                </YearAndMonthPopover>
                <YearAndMonthPopover
                  value={rightDate.getMonth() + 1}
                  sourceData={MONTH_ARRRY}
                  onChange={this.handleChangeMonth.bind(this, 'rightDate', rightDate)}
                >
                  <span className="fishd-date-range-picker__header-label">{t(`fishd.datepicker.month${rightDate.getMonth() + 1}`)}</span>
                </YearAndMonthPopover>
                <Icon
                  type="right-double"
                  onClick={this.nextYear.bind(this, 'rightDate', rightDate, ()=>{})}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__next-btn">
                </Icon>
                <Icon
                  type="right"
                  onClick={this.nextMonth.bind(this, 'rightDate', rightDate, ()=>{})}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__next-btn">
                </Icon>
              </div>
              <DateTable
                selectionMode={SELECTION_MODES.RANGE}
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
          typeof renderExtraFooter === 'function' && renderExtraFooter() && (
            <div
              className="fishd-picker-panel__extra-footer"
            >
              {renderExtraFooter()}
            </div>
          )
        }
        {
          isShowTime && (
            <div className="fishd-picker-panel__footer">
              <Button
                className="fishd-picker-panel__btn cancel"
                onClick={this.handleCancel}>{ Locale.t('fishd.datepicker.cancel') }
              </Button>
              <Button
                type="primary"
                className={classNames("fishd-picker-panel__btn", "confirm", {'disabled': this.confirmBtnDisabled()})}
                onClick={this.handleConfirm}
                disabled={this.confirmBtnDisabled()}>{ Locale.t('fishd.datepicker.confirm') }
              </Button>
            </div>
          )
        }
      </div>
    )
  }
}
