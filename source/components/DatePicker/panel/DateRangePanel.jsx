import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { PopperBase } from './PopperBase';
import { MountBody } from '../MountBody';
import Input from '../../Input';
import TimePanel from './TimePanel';
import YearAndMonthPopover from './YearAndMonthPopover';
import { SELECTION_MODES, toDate, prevMonth, nextMonth, formatDate, parseDate, MONTH_ARRRY, YEARS_ARRAY } from '../utils';
import { DateTable } from '../basic';
import { PLACEMENT_MAP } from '../constants';
import Locale from '../locale';

const prevYear = (date) => {
  let d = toDate(date);
  d.setFullYear(date.getFullYear() - 1);
  return d;
};

const nextYear = (date) => {
  let d = toDate(date);
  d.setFullYear(date.getFullYear() + 1);
  return d;
};

export default class DateRangePanel extends PopperBase {
  static get propTypes() {
    return Object.assign({
      // user picked date value
      /*
      value: null | [Date, null | false]
      */
      value: PropTypes.any,
      // ([value1, value2]|null, isKeepPanel)=>()
      onPick: PropTypes.func.isRequired,
      onCancelPicked: PropTypes.func.isRequired,
      isShowTime: PropTypes.bool,
      // Array[{text: String, onClick: (picker)=>()}]
      shortcuts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired
        })
      ),
      // (Date)=>bool, if true, disabled
      disabledDate: PropTypes.func,
      firstDayOfWeek: PropTypes.range(0, 6),
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object
    }, PopperBase.propTypes)
  }

  constructor(props) {
    super(props);

    this.state = {
      ...{
        minTimePickerVisible: false,
        maxTimePickerVisible: false,
        minPickerWidth: 0,    // not used in code right now, due to some reason, for more details see comments in DatePannel that marked with todo.
        maxPickerWidth: 0,
      },
      ...this.mapPropsToState(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.mapPropsToState(nextProps))
  }

  mapPropsToState = (props) => {
    const { value } = props;
    let state = {
      rangeState: {
        endDate: null,
        selecting: false,
      }
    };
    if (!value) {
      state = {
        ...state,
        ...{
          minDate: null,
          maxDate: null,
          leftDate: new Date(),
          rightDate: nextMonth(new Date())
        }
      }
    } else {
      if (value[0] && value[1]) {
        state.minDate = toDate(value[0]);
        state.maxDate = toDate(value[1]);
      }
      if (value[0]) {
        state.leftDate = toDate(value[0]);
        state.rightDate = nextMonth(toDate(value[0]));
      } else {
        state.leftDate = new Date();
        state.rightDate = nextMonth(new Date());
      }
    }

    return state;
  }

  handleRangePick({ minDate, maxDate }, isClose) {
    const { isShowTime, onPick } = this.props;
    this.setState({ minDate, maxDate });
    if (!isClose) return;
    if (!isShowTime) {
      onPick([minDate, maxDate], false)
    }
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

  // 点击改变年份
  handleChangeYear(type, date, year) {
    this.setState({
      [type]: new Date(date.setFullYear(year)),
    })
  }

  handleChangeMonth(type, date, month){
    this.setState({
      [type]: new Date((date.setMonth(parseInt(month.slice(0,-1)) - 1)))
    })
  }

  //todo: wired way to do sth like this? try to come up with a better option
  handleChangeRange({ endDate }) {
    const { rangeState, minDate } = this.state;
    if (endDate <= minDate) endDate = null;

    rangeState.endDate = endDate;
    this.setState({
      maxDate: endDate,
    })
  }

  handleShortcutClick(shortcut) {
    shortcut.onClick()
  }

  get minVisibleDate() {
    let { minDate } = this.state;
    return minDate ? formatDate(minDate) : ''
  }

  get maxVisibleDate() {
    let { maxDate, minDate } = this.state;
    let d = maxDate || minDate;
    return d ? formatDate(d) : ''
  }

  get minVisibleTime() {
    let { minDate } = this.state;
    return minDate ? formatDate(minDate, 'HH:mm:ss') : ''
  }

  get maxVisibleTime() {
    let { maxDate, minDate } = this.state;
    let d = maxDate || minDate;
    return d ? formatDate(d, 'HH:mm:ss') : ''
  }

  get btnDisabled() {
    let {minDate, maxDate, rangeState: { selecting }} = this.state;
    return !(minDate && maxDate && !selecting);
  }

  setTime(date, value) {
    let oldDate = new Date(date.getTime());
    let hour = value.getHours();
    let minute = value.getMinutes();
    let second = value.getSeconds();
    oldDate.setHours(hour);
    oldDate.setMinutes(minute);
    oldDate.setSeconds(second);
    return new Date(oldDate.getTime());
  }

  handleMinTimePick(pickedDate, isKeepPanel) {
    let minDate = this.state.minDate || new Date();
    if (pickedDate) {
      minDate = this.setTime(minDate, pickedDate);
    }
    this.setState({minDate, minTimePickerVisible: isKeepPanel,})
  }

  handleMaxTimePick(pickedDate, isKeepPanel) {
    let {minDate, maxDate} = this.state;
    if (!maxDate) {
      const now = new Date();
      if (now >= minDate) {
        maxDate = new Date();
      }
    }

    if (maxDate && pickedDate) {
      maxDate = this.setTime(maxDate, pickedDate);
    }
    this.setState({
      maxDate,
      maxTimePickerVisible: isKeepPanel,
    })
  }

  handleDateChange(value, type) {
    const parsedValue = parseDate(value, 'yyyy-MM-dd');
    let {minDate, maxDate} = this.state
    if (parsedValue) {
      const target = new Date(type === 'min' ? minDate : maxDate);
      if (target) {
        target.setFullYear(parsedValue.getFullYear());
        target.setMonth(parsedValue.getMonth(), parsedValue.getDate())
      }
      if (type === 'min') {
        if (target < maxDate) {
          this.setState({minDate: new Date(target.getTime())})
        }
      } else {
        if (target > minDate) {
          maxDate = new Date(target.getTime());
          if (minDate && minDate > maxDate) {
            minDate = null
          }
          this.setState({minDate, maxDate})
        }
      }
    }
  }

  handleTimeChange(value, type) {
    const parsedValue = parseDate(value, 'HH:mm:ss');
    if (parsedValue) {
      const target = new Date(type === 'min' ? this.minDate : this.maxDate);
      if (target) {
        target.setHours(parsedValue.getHours());
        target.setMinutes(parsedValue.getMinutes());
        target.setSeconds(parsedValue.getSeconds());
      }
      let {minDate, maxDate} = this.state;
      if (type === 'min') {
        if (target < maxDate) {
          minDate = new Date(target.getTime());
        }
      } else {
        if (target > minDate) {
          maxDate = new Date(target.getTime());
        }
      }
      this.setState({
        minDate,
        maxDate,
        [`${type}TimpickerVisisble`]: false
      })
    }
  }

  handleClear() {
    let {onPick} = this.props;
    let minDate = null,
      maxDate = null,
      date = new Date();

    this.setState({minDate, maxDate, date});
    onPick([], false)
  }

  handleConfirm(){
    let {minDate, maxDate} = this.state;
    this.props.onPick([minDate, maxDate], false);
  }

  render() {
    const { shortcuts, disabledDate, firstDayOfWeek, isShowTime } = this.props;
    const { leftDate, rightDate, rangeState, minDate, maxDate, minTimePickerVisible, maxTimePickerVisible, minPickerWidth, maxPickerWidth } = this.state;

    const t = Locale.t;

    return (
      <div
        ref="root"
        className={this.classNames('el-picker-panel el-date-range-picker', {
          'has-sidebar': shortcuts,
          'has-time': isShowTime
        })}
      >
        <div className="el-picker-panel__body-wrapper">
          {
            Array.isArray(shortcuts) && (
              <div className="el-picker-panel__sidebar">
                {
                  shortcuts.map((e, idx) => {
                    return (
                      <button
                        key={idx}
                        type="button"
                        className="el-picker-panel__shortcut"
                        onClick={() => this.handleShortcutClick(e)}>{e.text}</button>
                    )
                  })
                }
              </div>
            )
          }
          <div className="el-picker-panel__body">
            {
              isShowTime && (
                <div className="el-date-range-picker__time-header">
                  <span className="el-date-range-picker__editors-wrap">
                    <span className="el-date-range-picker__time-picker-wrap">
                      <Input
                        ref="minInput"
                        placeholder={Locale.t('el.datepicker.startDate')}
                        className="el-date-range-picker__editor"
                        value={this.minVisibleDate}
                        onChange={value => this.handleDateChange(value, 'min')}
                      />
                    </span>
                    <span className="el-date-range-picker__time-picker-wrap">
                      <Input
                        ref="timeIptStart"
                        placeholder={Locale.t('el.datepicker.startTime')}
                        className="el-date-range-picker__editor"
                        value={this.minVisibleTime}
                        onFocus={()=>{
                          this.setState({
                            minTimePickerVisible: !minTimePickerVisible
                          })
                        }}
                        onChange={value => this.handleTimeChange(value, 'min')}
                      />
                      {
                        minTimePickerVisible && (
                          <MountBody>
                            <TimePanel
                              pickerWidth={minPickerWidth}
                              ref="minTimePicker"
                              currentDate={minDate}
                              onPicked={this.handleMinTimePick.bind(this)}
                              getPopperRefElement={() => ReactDOM.findDOMNode(this.refs.timeIptStart)}
                              popperMixinOption={
                                {
                                  placement: PLACEMENT_MAP[this.props.align] || PLACEMENT_MAP.left
                                }
                              }
                              onCancel={() => this.setState({ minTimePickerVisible: false })}
                            />
                          </MountBody>
                        )
                      }
                    </span>
                  </span>
                  <span className="el-icon-arrow-right"></span>
                  <span className="el-date-range-picker__editors-wrap is-right">
                    <span className="el-date-range-picker__time-picker-wrap">
                      <Input
                        size="small"
                        placeholder={Locale.t('el.datepicker.endDate')}
                        className="el-date-range-picker__editor"
                        value={this.maxVisibleDate}
                        readOnly={!minDate}
                        onChange={value => this.handleDateInput(value, 'max')}
                      />
                    </span>
                    <span className="el-date-range-picker__time-picker-wrap">
                      <Input
                        size="small"
                        ref="maxInput"
                        placeholder={Locale.t('el.datepicker.endTime')}
                        className="el-date-range-picker__editor"
                        value={this.maxVisibleTime}
                        onFocus={() => {
                          if (minDate) {
                            this.setState({
                              maxTimePickerVisible: !maxTimePickerVisible
                            })
                          }
                        }}
                        readOnly={!minDate}
                        onChange={value => this.handleTimeChange(value, 'max')}
                      />
                      {
                        maxTimePickerVisible && (
                          <MountBody>
                            <TimePanel
                              pickerWidth={maxPickerWidth}
                              ref="maxTimePicker"
                              currentDate={maxDate}
                              onPicked={this.handleMaxTimePick.bind(this)}
                              getPopperRefElement={() => ReactDOM.findDOMNode(this.refs.maxInput)}
                              popperMixinOption={
                                {
                                  placement: PLACEMENT_MAP[this.props.align] || PLACEMENT_MAP.left
                                }
                              }
                              onCancel={() => this.setState({ maxTimePickerVisible: false })}
                            />
                          </MountBody>
                        )
                      }
                    </span>
                  </span>
                </div>
              )
            }
            <div className="el-picker-panel__content el-date-range-picker__content is-left">
              <div className="el-date-range-picker__header">
                <button
                  type="button"
                  onClick={this.prevYear.bind(this, 'leftDate', leftDate)}
                  className="el-picker-panel__icon-btn el-date-range-picker__prev-btn el-icon-d-arrow-left">
                </button>
                <button
                  type="button"
                  onClick={this.prevMonth.bind(this, 'leftDate', leftDate)}
                  className="el-picker-panel__icon-btn el-date-range-picker__prev-btn el-icon-arrow-left">
                </button>
                <YearAndMonthPopover
                  value={leftDate.getFullYear()}
                  sourceData={YEARS_ARRAY()}
                  onChange={this.handleChangeYear.bind(this, 'leftDate', leftDate)}
                >
                  <span className="el-date-range-picker__header-label">{`${leftDate.getFullYear()} ${t('el.datepicker.year')}`}</span>
                </YearAndMonthPopover>
                <YearAndMonthPopover
                  value={leftDate.getMonth() + 1}
                  sourceData={MONTH_ARRRY}
                  onChange={this.handleChangeMonth.bind(this, 'leftDate', leftDate)}
                >
                  <span className="el-date-range-picker__header-label">{t(`el.datepicker.month${leftDate.getMonth() + 1}`)}</span>
                </YearAndMonthPopover>
                <button
                  type="button"
                  onClick={this.handleLeftNextYear}
                  className="el-picker-panel__icon-btn el-date-range-picker__next-btn el-icon-d-arrow-right">
                </button>
                <button
                  type="button"
                  onClick={this.handleLeftNextMonth}
                  className="el-picker-panel__icon-btn el-date-range-picker__next-btn el-icon-arrow-right">
                </button>
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
            <div className="el-picker-panel__content el-date-range-picker__content is-right">
              <div className="el-date-range-picker__header">
                <button
                  type="button"
                  onClick={this.handleRightPrevYear}
                  className="el-picker-panel__icon-btn el-date-range-picker__prev-btn el-icon-d-arrow-left">
                </button>
                <button
                  type="button"
                  onClick={this.handleRightPrevMonth}
                  className="el-picker-panel__icon-btn el-date-range-picker__prev-btn el-icon-arrow-left">
                </button>
                <YearAndMonthPopover
                  value={rightDate.getFullYear()}
                  sourceData={YEARS_ARRAY()}
                  onChange={this.handleChangeYear.bind(this, 'rightDate', rightDate)}
                >
                  <span className="el-date-range-picker__header-label">{`${rightDate.getFullYear()} ${t('el.datepicker.year')}`}</span>
                </YearAndMonthPopover>
                <YearAndMonthPopover
                  value={rightDate.getMonth() + 1}
                  sourceData={MONTH_ARRRY}
                  onChange={this.handleChangeMonth.bind(this, 'rightDate', rightDate)}
                >
                  <span className="el-date-range-picker__header-label">{t(`el.datepicker.month${rightDate.getMonth() + 1}`)}</span>
                </YearAndMonthPopover>
                <button
                  type="button"
                  onClick={this.nextYear.bind(this, 'rightDate', rightDate)}
                  className="el-picker-panel__icon-btn el-date-range-picker__next-btn el-icon-d-arrow-right">
                </button>
                <button
                  type="button"
                  onClick={this.nextMonth.bind(this, 'rightDate', rightDate)}
                  className="el-picker-panel__icon-btn el-date-range-picker__next-btn el-icon-arrow-right">
                </button>
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
            <div className="el-picker-panel__footer">
              <a
                className="el-picker-panel__link-btn"
                onClick={()=> this.handleClear()}>{ Locale.t('el.datepicker.clear') }
              </a>
              <button
                type="button"
                className="el-picker-panel__btn"
                onClick={()=> this.handleConfirm()}
                disabled={this.btnDisabled}>{ Locale.t('el.datepicker.confirm') }</button>
            </div>
          )
        }
      </div>
    )
  }
}



DateRangePanel.defaultProps = {

}
