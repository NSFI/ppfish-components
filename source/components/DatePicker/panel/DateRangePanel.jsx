import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PopperBase } from './PopperBase';
import { DateTable } from '../basic';
import Input from '../../Input';
import Icon from '../../Icon/index.tsx';
import TimePicker from '../TimePicker';
import YearAndMonthPopover from './YearAndMonthPopover';
import {
  SELECTION_MODES,
  toDate,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  formatDate,
  parseDate,
  MONTH_ARRRY,
  YEARS_ARRAY,
  isValidValue,
  setDate,
  equalYearAndMonth
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

export default class DateRangePanel extends PopperBase {
  static get propTypes() {
    return Object.assign({
      value: PropTypes.array,
      isShowTime: PropTypes.bool,
      format: PropTypes.string,
      shortcuts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired
        })
      ),
      shortcutsPlacement: PropTypes.string,
      disabledDate: PropTypes.func,
      firstDayOfWeek: PropTypes.number,
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object,
      onPick: PropTypes.func.isRequired,
      onCancelPicked: PropTypes.func.isRequired,
    }, PopperBase.propTypes)
  }

  static get defaultProps() {
    return {
      value: null,
      isShowTime: false,
      shortcutsPlacement: 'left',
      firstDayOfWeek: 0
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
      minDateInputText: isValidValue(props.value) ? formatDate(props.value[0], this.dateFormat()) : '',
      maxDateInputText: isValidValue(props.value) ? formatDate(props.value[1], this.dateFormat()) : '',
      minTimeInputText: isValidValue(props.value) ? toDate(props.value[0]) : null,
      maxTimeInputText: isValidValue(props.value) ? toDate(props.value[1]) : null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if (value && isValidValue(value)){
      this.setState({
        minDate: toDate(nextProps.value[0]),
        maxDate: toDate(nextProps.value[1]),
        // leftDate: toDate(nextProps.value[0]),
        // rightDate:  setRightDate(nextProps.value[0], nextProps.value[1])
      });
    }
  }

  timeFormat = () => {
    let {format} = this.props;
    if (format && format.indexOf('ss') === -1) {
      return 'HH:mm'
    } else {
      return 'HH:mm:ss'
    }
  }

  dateFormat = () => {
    if (this.props.format) return this.props.format.replace('HH:mm', '').replace(':ss', '').trim();
    else return 'yyyy-MM-dd'
  };

  //todo: wired way to do sth like this? try to come up with a better option
  handleChangeRange({ endDate }) {
    const { rangeState, minDate } = this.state;
    if (endDate <= minDate) endDate = null;

    rangeState.endDate = endDate;
    this.setState({
      maxDate: endDate,
    })
  }

  // 日期时间都选择，确定按钮才可点击
  confirmBtnDisabled = () => {
    const {minDate, maxDate, minDateInputText, maxDateInputText, minTimeInputText, maxTimeInputText} = this.state;
    return !(minDate && maxDate && minDateInputText && maxDateInputText && minTimeInputText && maxTimeInputText);
  }

  // 未选择日期时，时间不可选
  timePickerDisable = () => {
    const {minDate, maxDate, minDateInputText, maxDateInputText} = this.state;
    return !(minDate && maxDate && minDateInputText && maxDateInputText);
  }

  // 开始日期或结束日期发生改变
  handleDateInputChange(e, type) {
    const {disabledDate} = this.props;
    const {minDate, maxDate} = this.state;
    const text = type === 'min' ? 'minDateInputText' : 'maxDateInputText';
    const value = type === 'min' ? 'minDate' : 'maxDate';
    const dateValue = type === 'min' ? 'leftDate' : 'rightDate';
    const stateDate = type === 'min' ? minDate : maxDate;

    const inputText = e.target.value;
    const ndate = parseDate(inputText, this.dateFormat());
    if (!isInputValid(inputText, ndate, disabledDate)) {
      this.setState({
        [text]: inputText,
      })
    } else {//only set value on a valid date input
      this.setState({
        [text]: inputText,
        [value]: setDate(stateDate, ndate), // 日期变化的时候，时间保持不变,
        [dateValue]: ndate,
      })
    }
  }

  // 开始时间或结束时间发生改变
  handleTimeInputChange(value, type) {
    const { minDate, maxDate } = this.state;
    if (value) {
      const target = type === 'min' ? minDate : maxDate;
      if (target) {
        target.setHours(value.getHours());
        target.setMinutes(value.getMinutes());
        target.setSeconds(value.getSeconds());
      }
      if (type === 'min') {
        if (target < maxDate) {
          this.setState({
            minDate: new Date(target.getTime()),
            minDateInputText: formatDate(new Date(target.getTime())),
            minTimeInputText: new Date(target.getTime()),
            [`${type}TimpickerVisisble`]: false,
          })
        }
      } else {
        if (target > minDate) {
          this.setState({
            maxDate: new Date(target.getTime()),
            maxDateInputText: formatDate(new Date(target.getTime())),
            maxTimeInputText: new Date(target.getTime()),
            [`${type}TimpickerVisisble`]: false
          })
        }
      }
    }
  }

  // 点击快捷选项
  handleShortcutClick(shortcut) {
    shortcut.onClick();
  }

  prevYear(type, date) {
    this.setState({
      [type]: prevYear(date),
    })
  }

  nextYear(type, date) {
    this.setState({
      [type]: nextYear(date),
    })
  }

  prevMonth(type, date) {
    this.setState({
      [type]: prevMonth(date)
    })
  }

  nextMonth(type, date) {
    this.setState({
      [type]: nextMonth(date)
    })
  }

  // 左边日历的next year btn特殊处理：当左右两边年份相等时，需要同时切换右边日历
  handleLeftNextYear = () => {
    const { leftDate, rightDate } = this.state;

    this.nextYear('leftDate', leftDate);
    if(rightDate.getFullYear() == leftDate.getFullYear()) {
      this.nextYear('rightDate', rightDate);
    }
  }

  // 左边日历的next month btn特殊处理：当左右两边月份相等时，需要同时切换右边日历
  handleLeftNextMonth = () => {
    const { leftDate, rightDate } = this.state;

    this.nextMonth('leftDate', leftDate);
    if(rightDate.getFullYear() == leftDate.getFullYear() && rightDate.getMonth() == leftDate.getMonth()) {
      this.nextMonth('rightDate', rightDate);
    }
  }

  // 右边日历的prev year btn特殊处理：当左右两边年份相等时，需要同时切换左边日历
  handleRightPrevYear = () => {
    const { leftDate, rightDate } = this.state;

    this.prevYear('rightDate', rightDate);
    if(rightDate.getFullYear() == leftDate.getFullYear()) {
      this.prevYear('leftDate', leftDate);
    }
  }

  // 右边日历的prev month btn特殊处理：当左右两边月份相等时，需要同时切换左边日历
  handleRightPrevMonth = () => {
    const { leftDate, rightDate } = this.state;

    this.prevMonth('rightDate', rightDate);
    if(rightDate.getFullYear() == leftDate.getFullYear() && rightDate.getMonth() == leftDate.getMonth()) {
      this.prevMonth('leftDate', leftDate);
    }
  }

  // 切换年份
  handleChangeYear(type, date, year) {
    this.setState({
      [type]: new Date(date.setFullYear(year)),
    })
  }

  // 切换月份
  handleChangeMonth(type, date, month){
    this.setState({
      [type]: new Date((date.setMonth(parseInt(month.slice(0,-1)) - 1)))
    })
  }

  // 点击日期
  handleRangePick({ minDate, maxDate }, isClose) {
    const { isShowTime, onPick } = this.props;
    this.setState({
      minDate: setDate(new Date(this.state.minDate), new Date(minDate)), // 日期变化，时间不变
      maxDate: setDate(new Date(this.state.maxDate), new Date(maxDate)),
      minDateInputText: formatDate(minDate),
      maxDateInputText: formatDate(maxDate),
    });
    if (!isClose) return;
    if (!isShowTime) {
      onPick([minDate, maxDate], false, true)
    }
  }

  // 点击确定按钮
  handleConfirm = () => {
    const { minDate, maxDate } = this.state;
    this.props.onPick([minDate, maxDate], false, true);
  }

  // 点击取消按钮
  handleCancel = () => {
    this.props.onCancelPicked();
  }

  render() {
    const { shortcuts, shortcutsPlacement, disabledDate, firstDayOfWeek, isShowTime } = this.props;
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
      minTimeInputText,
      maxTimeInputText
    } = this.state;

    const t = Locale.t;

    return (
      <div
        ref="root"
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
                        onClick={() => this.handleShortcutClick(e)}>{e.text}</button>
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
                        ref="minInput"
                        placeholder={Locale.t('fishd.datepicker.startDate')}
                        className="fishd-date-range-picker__editor"
                        value={minDateInputText}
                        onChange={value => this.handleDateInputChange(value, 'min')}
                      />
                    </span>
                    <span className="fishd-date-range-picker__time-picker-wrap">
                      <TimePicker
                        placeholder={Locale.t('fishd.datepicker.startTime')}
                        className="fishd-date-range-picker__editor"
                        isShowTrigger={false}
                        isAllowClear={false}
                        format={this.timeFormat()}
                        isDisabled={this.timePickerDisable()}
                        value={minTimeInputText}
                        onFocus={()=>{
                          this.setState({
                            minTimePickerVisible: !minTimePickerVisible
                          })
                        }}
                        onChange={value => this.handleTimeInputChange(value, 'min')}
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
                        placeholder={Locale.t('fishd.datepicker.endTime')}
                        className="fishd-date-range-picker__editor"
                        isShowTrigger={false}
                        isAllowClear={false}
                        format={this.timeFormat()}
                        isDisabled={this.timePickerDisable()}
                        value={maxTimeInputText}
                        onFocus={()=>{
                          this.setState({
                            maxTimePickerVisible: !maxTimePickerVisible
                          })
                        }}
                        onChange={value => this.handleTimeInputChange(value, 'max')}
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
                  onClick={this.prevYear.bind(this, 'leftDate', leftDate)}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__prev-btn">
                </Icon>
                <Icon
                  type="left"
                  onClick={this.prevMonth.bind(this, 'leftDate', leftDate)}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__prev-btn">
                </Icon>
                <YearAndMonthPopover
                  value={leftDate.getFullYear()}
                  sourceData={YEARS_ARRAY()}
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
                  onClick={this.handleLeftNextYear}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__next-btn">
                </Icon>
                <Icon
                  type="right"
                  onClick={this.handleLeftNextMonth}
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
                  onClick={this.handleRightPrevYear}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__prev-btn">
                </Icon>
                <Icon
                  type="left"
                  onClick={this.handleRightPrevMonth}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__prev-btn">
                </Icon>
                <YearAndMonthPopover
                  value={rightDate.getFullYear()}
                  sourceData={YEARS_ARRAY()}
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
                  onClick={this.nextYear.bind(this, 'rightDate', rightDate)}
                  className="fishd-picker-panel__icon-btn fishd-date-range-picker__next-btn">
                </Icon>
                <Icon
                  type="right"
                  onClick={this.nextMonth.bind(this, 'rightDate', rightDate)}
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
          isShowTime && (
            <div className="fishd-picker-panel__footer">
              <button
                type="button"
                className="fishd-picker-panel__btn cancel"
                onClick={this.handleCancel}>{ Locale.t('fishd.datepicker.cancel') }
              </button>
              <button
                type="button"
                className={classNames("fishd-picker-panel__btn", "confirm", {'disabled': this.confirmBtnDisabled()})}
                onClick={this.handleConfirm}
                disabled={this.confirmBtnDisabled()}>{ Locale.t('fishd.datepicker.confirm') }
              </button>
            </div>
          )
        }
      </div>
    )
  }
}
