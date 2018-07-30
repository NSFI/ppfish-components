import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../Input';
import { PopperBase } from './PopperBase';
import YearAndMonthPopover from './YearAndMonthPopover';
import TimePicker from '../TimePicker';
import { SELECTION_MODES, deconstructDate, formatDate, parseDate, toDate, MONTH_ARRRY, YEARS_ARRAY } from '../utils';
import { DateTable, MonthTable, YearTable } from '../basic';
import Locale from '../locale';

const PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date',
}

export default class DatePanel extends PopperBase {

  static get propTypes() {
    return Object.assign({
      value: PropTypes.instanceOf(Date),
      isShowTime: PropTypes.bool,
      showWeekNumber: PropTypes.bool,
      format: PropTypes.string,
      // Array[{text: String, onClick: (picker)=>()}]
      shortcuts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          // ()=>()
          onClick: PropTypes.func.isRequired
        })
      ),
      shortcutsPlacement: PropTypes.string,
      selectionMode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(e => SELECTION_MODES[e])),
      disabledDate: PropTypes.func,
      firstDayOfWeek: PropTypes.range(0, 6),
      onPick: PropTypes.func.isRequired,
    }, PopperBase.propTypes)
  }

  static get defaultProps() {
    return {
      value: null,
      isShowTime: false,
      showWeekNumber: false,
      shortcutsPlacement: 'left',
      selectionMode: SELECTION_MODES.DAY,
      firstDayOfWeek: 0
    }
  }

  constructor(props) {
    super(props);

    let currentView = PICKER_VIEWS.DATE;
    switch (props.selectionMode) {
      case SELECTION_MODES.MONTH:
        currentView = PICKER_VIEWS.MONTH; break;
      case SELECTION_MODES.YEAR:
        currentView = PICKER_VIEWS.YEAR; break;
    }

    this.state = {
      currentView,
      timePickerVisible: false,
      pickerWidth: 0,
      date: props.value ? new Date(props.value) : new Date() // current view's date
    };
  }

  componentWillReceiveProps(nextProps) {
    let date = new Date();
    if (nextProps.value){
      date = toDate(nextProps.value)
    }
    this.setState({ date })
  }

  prevYear = () => {
    this.updateState(() => {
      const { date, currentView } = this.state;
      const { year } = deconstructDate(date);

      if (currentView === 'year') {
        date.setFullYear(year - 10)
      } else {
        date.setFullYear(year - 1)
      }
    })
  }

  nextYear = () => {
    this.updateState(() => {
      const { date, currentView } = this.state;
      const { year } = deconstructDate(date);

      if (currentView === 'year') {
        date.setFullYear(year + 10)
      } else {
        date.setFullYear(year + 1)
      }
    })
  }

  prevMonth = () => {
    this.updateState(() => {
      const { date } = this.state;
      const { month, year } = deconstructDate(date);

      if (month == 0) {
        date.setFullYear(year - 1);
        date.setMonth(11)
      } else {
        date.setMonth(month - 1)
      }
    })
  }

  nextMonth = () => {
    this.updateState(() => {
      const { date } = this.state;
      const { month, year } = deconstructDate(date);

      if (month == 11) {
        date.setFullYear(year + 1);
        date.setMonth(0)
      } else {
        date.setMonth(month + 1)
      }
    })
  }

  updateState(cb) {
    cb(this.state);
    this.setState({});
  }

  handleShortcutClick(shortcut) {
    shortcut.onClick();
  }

  handleYearPick(year) {
    this.updateState(state => {
      const { onPick, selectionMode } = this.props;
      const { date } = state;
      date.setFullYear(year);
      if (selectionMode === SELECTION_MODES.YEAR) {
          onPick(new Date(year, 0))
        } else {
          state.currentView = PICKER_VIEWS.MONTH
      }
    })
  }

  handleMonthPick(month) {
    this.updateState(state => {
      const { date } = state;
      const { selectionMode } = this.props;
      const { year } = deconstructDate(date);

      if (selectionMode !== SELECTION_MODES.MONTH) {
        date.setMonth(month);
        state.currentView = PICKER_VIEWS.DATE
      } else {
        date.setMonth(month);
        date.setFullYear(year);
        this.props.onPick(new Date(year, month, 1));
      }
    })
  }

  handleDatePick(value) {
    this.updateState(state => {
      const { date } = state;
      const { selectionMode, isShowTime, onPick } = this.props;
      const pdate = value.date;
      if (selectionMode === SELECTION_MODES.DAY) {
        if (!isShowTime) {
          onPick(new Date(pdate.getTime()))
        }
        date.setTime(pdate.getTime())
      } else if (selectionMode === SELECTION_MODES.WEEK) {
        onPick(pdate)
      }
    })
  }

  handleTimePick(pickedDate, isKeepPanel) {
    this.updateState(state=>{
      if (pickedDate) {
        let oldDate = state.date;
        oldDate.setHours(pickedDate.getHours());
        oldDate.setMinutes(pickedDate.getMinutes());
        oldDate.setSeconds(pickedDate.getSeconds());
      }
      state.timePickerVisible = isKeepPanel
    })
  }

  changeToNow = () => {
    const now = new Date();
    this.props.onPick(now);
    this.setState({ date: now });
  }

  confirm = () => {
    this.props.onPick(new Date(this.state.date.getTime()))
  }

  resetView() {
    let {selectionMode} = this.props;

    this.updateState(state=>{
      if (selectionMode === SELECTION_MODES.MONTH) {
        state.currentView = PICKER_VIEWS.MONTH
      } else if (selectionMode === SELECTION_MODES.YEAR) {
        state.currentView = PICKER_VIEWS.YEAR
      } else {
        state.currentView = PICKER_VIEWS.DATE
      }
    })
  }

  yearLabel() {
    const { currentView, date } = this.state;
    const { year } = deconstructDate(date);
    const yearTranslation = Locale.t('el.datepicker.year');
    if (currentView === 'year') {
      const startYear = Math.floor(year / 10) * 10;
      if (yearTranslation) {
        return startYear + ' ' + yearTranslation + '-' + (startYear + 9) + ' ' + yearTranslation
      }
      return startYear + ' - ' + (startYear + 9)
    }
    return year + ' ' + yearTranslation
  }

  get visibleTime(){
    return formatDate(this.state.date, this.timeFormat)
  }

  set visibleTime(val){
    if (val) {
      const ndate = val;
      let {date} = this.state;
      if (ndate) {
        ndate.setFullYear(date.getFullYear());
        ndate.setMonth(date.getMonth());
        ndate.setDate(date.getDate());
        this.setState({date: ndate, timePickerVisible: false})
      }
    }
  }

  get visibleDate(){
    return formatDate(this.state.date, this.dateFormat);
  }

  set visibleDate(val){
    const ndate = parseDate(val, this.dateFormat);
    if (!ndate) {
      return
    }
    let {disabledDate} = this.props;
    let {date} = this.state;
    if (typeof disabledDate === 'function' && disabledDate(ndate)) {
      return;
    }
    ndate.setHours(date.getHours());
    ndate.setMinutes(date.getMinutes());
    ndate.setSeconds(date.getSeconds());
    this.setState({date: ndate});
    this.resetView();
  }

  get timeFormat() {
    let {format} = this.props;
    if (format && format.indexOf('ss') === -1) {
      return 'HH:mm'
    } else {
      return 'HH:mm:ss'
    }
  }

  get dateFormat(){
    if (this.props.format) return this.props.format.replace('HH:mm', '').replace(':ss', '').trim();
    else return 'yyyy-MM-dd'
  };

  // end: ------ public methods
  _pickerContent() {
    const { value, selectionMode, disabledDate, showWeekNumber } = this.props;
    const { date } = this.state;
    const { currentView } = this.state;
    let result = null;

    switch (currentView) {
      case PICKER_VIEWS.DATE:
        result = (<DateTable
          onPick={this.handleDatePick.bind(this)}
          date={date}
          value={value}
          selectionMode={selectionMode}
          disabledDate={disabledDate}
          showWeekNumber={showWeekNumber}
        />);

        break;
      case PICKER_VIEWS.YEAR:
        result = (<YearTable
          ref="yearTable"
          value={value}
          date={date}
          onPick={this.handleYearPick.bind(this)}
          disabledDate={disabledDate}
        />);
        break;
      case PICKER_VIEWS.MONTH:
        result = (<MonthTable
          value={value}
          date={date}
          onPick={this.handleMonthPick.bind(this)}
          disabledDate={disabledDate}
        />);
        break;
      default:
        throw new Error('invalid currentView value')
    }

    return result;
  }

  handleChangeYear = (year) => {
    const { date } = this.state;
    this.setState({
      date: new Date(date.setFullYear(year)),
    })
  }

  handleChangeMonth = (month) => {
    const { date } = this.state;
    this.setState({
      date: new Date((date.setMonth(parseInt(month.slice(0,-1)) - 1)))
    })
  }

  render() {
    const { isShowTime, shortcuts, shortcutsPlacement } = this.props;
    const { currentView, date, pickerWidth, timePickerVisible } = this.state;
    const { month } = deconstructDate(date);
    const t = Locale.t;

    return (
      <div
        ref="root"
        className={this.classNames('el-picker-panel el-date-picker', {
          'has-sidebar': shortcuts,
          'has-time': isShowTime
        })}
      >

        <div className="el-picker-panel__body-wrapper">
          {
            Array.isArray(shortcuts) && (
              <div className={this.className('el-picker-panel__sidebar', shortcutsPlacement)}>
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
                <div className="el-date-picker__time-header">
                  <span className="el-date-picker__editor-wrap">
                    <Input
                      placeholder={t('el.datepicker.selectDate')}
                      value={this.visibleDate}
                      onChange={date=>this.visibleDate=date}
                    />
                  </span>
                  <span className="el-date-picker__editor-wrap">
                    <TimePicker
                      placeholder={t('el.datepicker.selectTime')}
                      className="el-date-range-picker__editor"
                      isShowTrigger={false}
                      isAllowClear={false}
                      value={date}
                      onFocus={()=> this.setState({timePickerVisible: !this.state.timePickerVisible})}
                      onChange={date=>this.visibleTime=date}
                    />
                  </span>
                </div>
              )
            }

            {
              currentView !== 'time' && (
                <div className="el-date-picker__header">
                  <button
                    type="button"
                    onClick={this.prevYear}
                    className="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left">
                  </button>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <button
                        type="button"
                        onClick={this.prevMonth}
                        className="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left">
                      </button>)
                  }
                  <YearAndMonthPopover
                    value={date.getFullYear()}
                    sourceData={YEARS_ARRAY()}
                    onChange={this.handleChangeYear}
                  >
                    <span className="el-date-picker__header-label">{this.yearLabel()}</span>
                  </YearAndMonthPopover>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <YearAndMonthPopover
                        value={date.getMonth() + 1}
                        sourceData={MONTH_ARRRY}
                        onChange={this.handleChangeMonth}
                      >
                        <span
                          className={
                            this.classNames('el-date-picker__header-label', {
                              active: currentView === 'month'
                            })
                          }
                        >{t(`el.datepicker.month${month + 1}`)}</span>
                      </YearAndMonthPopover>
                    )
                  }
                  <button
                    type="button"
                    onClick={this.nextYear}
                    className="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right">
                  </button>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <button
                        type="button"
                        onClick={this.nextMonth}
                        className="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right">
                      </button>
                    )
                  }
                </div>
              )
            }
            <div className="el-picker-panel__content">
              {this._pickerContent()}
            </div>
          </div>
        </div>

        {
          isShowTime && currentView === PICKER_VIEWS.DATE && (
            <div
              className="el-picker-panel__footer">
              <a
                href="JavaScript:"
                className="el-picker-panel__link-btn"
                onClick={this.changeToNow}>{t('el.datepicker.now')}
              </a>
              <button
                type="button"
                className="el-picker-panel__btn"
                onClick={this.confirm}>{t('el.datepicker.confirm')}</button>
            </div>
          )
        }
      </div>
    )
  }
}
