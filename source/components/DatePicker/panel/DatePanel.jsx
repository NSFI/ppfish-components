import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../Input';
import Icon from '../../Icon/index.tsx';
import { PopperBase } from './PopperBase';
import YearAndMonthPopover from './YearAndMonthPopover';
import TimePicker from '../TimePicker';
import { DateTable, MonthTable, YearTable } from '../basic';
import { SELECTION_MODES, deconstructDate, formatDate, parseDate, toDate, MONTH_ARRRY, YEARS_ARRAY } from '../utils';
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
      date: props.value ? new Date(props.value) : new Date(),  // 默认当前日历视图
      dateInputText: formatDate(props.value, this.dateFormat), // 日期输入框的值 string，当props.value为null时，值为''
      timeInputText: toDate(props.value), // 时间输入组件的值 Date，当props.value为null时，值为null
      confirmBtnDisabled: !props.value    // 确定按钮是否禁用
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value){
      const date = toDate(nextProps.value);
      this.setState({ date });
    }
  }

  // 判断值的合法性
  isValid = (value) => {
    return DatePanel.isValid(value, this.props.disabledDate);
  }

  updateState(cb) {
    cb(this.state);
    this.setState({});
  }

  // handleYearPick(year) {
  //   this.updateState(state => {
  //     const { onPick, selectionMode } = this.props;
  //     const { date } = state;
  //     date.setFullYear(year);
  //     if (selectionMode === SELECTION_MODES.YEAR) {
  //         onPick(new Date(year, 0))
  //       } else {
  //         state.currentView = PICKER_VIEWS.MONTH
  //     }
  //   })
  // }
  //
  // handleMonthPick(month) {
  //   this.updateState(state => {
  //     const { date } = state;
  //     const { selectionMode } = this.props;
  //     const { year } = deconstructDate(date);
  //
  //     if (selectionMode !== SELECTION_MODES.MONTH) {
  //       date.setMonth(month);
  //       state.currentView = PICKER_VIEWS.DATE
  //     } else {
  //       date.setMonth(month);
  //       date.setFullYear(year);
  //       this.props.onPick(new Date(year, month, 1));
  //     }
  //   })
  // }

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
        throw new Error('invalid currentView value')
    }

    return result;
  }

  // 日期变化
  handleDateInputChange = (e) => {
    const {disabledDate} = this.props;
    const {date} = this.state;
    const iptxt = e.target.value;
    const ndate = parseDate(iptxt, this.dateFormat);
    // 日期变化的时候，时间保持不变
    ndate.setHours(date.getHours());
    ndate.setMinutes(date.getMinutes());
    ndate.setSeconds(date.getSeconds());
    if (iptxt.trim() === '' || !ndate || typeof disabledDate === 'function' && disabledDate(ndate)) {
      //only set value on a valid date input
      this.setState({
        dateInputText: iptxt,
      })
    }else{
      this.setState({
        date: ndate,
        dateInputText: iptxt,
        confirmBtnDisabled: !this.state.timeInputText
      });
    }
    this.resetView();
  }

  // 时间变化
  handleTimeInputChange = (val) => {
    if (val) {
      const ndate = val;
      let {date} = this.state;
      if (ndate) {
        ndate.setFullYear(date.getFullYear());
        ndate.setMonth(date.getMonth());
        ndate.setDate(date.getDate());
        this.setState({
          date: ndate,
          timePickerVisible: false,
          timeInputText: ndate,
          confirmBtnDisabled: !this.state.dateInputText
        })
      }
    }
  }

  // 点击快捷按钮
  handleShortcutClick(shortcut) {
    shortcut.onClick();
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

  // 切换年份
  handleChangeYear = (year) => {
    const { date } = this.state;
    this.setState({
      date: new Date(date.setFullYear(year)),
    })
  }

  // 切换月份
  handleChangeMonth = (month) => {
    const { date } = this.state;
    this.setState({
      date: new Date((date.setMonth(parseInt(month.slice(0,-1)) - 1)))
    })
  }

  // 点击日
  handleDatePick(value) {
    this.updateState(state => {
      const { date } = state;
      const { selectionMode, isShowTime, onPick } = this.props;
      const pdate = value.date;
      if (selectionMode === SELECTION_MODES.DAY) {
        if (!isShowTime) {
          onPick(new Date(pdate.getTime()))
        }
        pdate.setHours(date.getHours());
        pdate.setMinutes(date.getMinutes());
        pdate.setSeconds(date.getSeconds());
        date.setTime(pdate.getTime());
        state.dateInputText = formatDate(date, this.dateFormat); // 点击日，左侧日期输入框的值同步变化
        state.confirmButtonDisabled = !state.timeInputText; // 日期、时间都选择，确定按钮才可点击
      } else if (selectionMode === SELECTION_MODES.WEEK) {
        onPick(pdate)
      }
    })
  }

  // 点击确定按钮
  handleConfirm = () => {
    this.props.onPick(new Date(this.state.date.getTime()))
  }

  // 点击取消按钮
  handleCancel = () => {
    this.props.onCancelPicked();
  }

  render() {
    const { isShowTime, shortcuts, shortcutsPlacement } = this.props;
    const { currentView, date, dateInputText, timeInputText, confirmBtnDisabled } = this.state;
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
                      value={dateInputText}
                      onChange={this.handleDateInputChange}
                    />
                  </span>
                  <span className="el-date-picker__editor-wrap">
                    <TimePicker
                      placeholder={t('el.datepicker.selectTime')}
                      className="el-date-range-picker__editor"
                      isShowTrigger={false}
                      isAllowClear={false}
                      value={timeInputText}
                      onFocus={()=> this.setState({timePickerVisible: !this.state.timePickerVisible})}
                      onChange={this.handleTimeInputChange}
                    />
                  </span>
                </div>
              )
            }

            {
              currentView !== 'time' && (
                <div className="el-date-picker__header">
                  <Icon
                    type="left-double"
                    onClick={this.prevYear}
                    className="el-picker-panel__icon-btn el-date-picker__prev-btn">
                  </Icon>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <Icon
                        type="left"
                        onClick={this.prevMonth}
                        className="el-picker-panel__icon-btn el-date-picker__prev-btn">
                      </Icon>)
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
                  <Icon
                    type="right-double"
                    onClick={this.nextYear}
                    className="el-picker-panel__icon-btn el-date-picker__next-btn">
                  </Icon>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <Icon
                        type="right"
                        onClick={this.nextMonth}
                        className="el-picker-panel__icon-btn el-date-picker__next-btn">
                      </Icon>
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
              <button
                type="button"
                className="el-picker-panel__btn cancel"
                onClick={this.handleCancel}>{t('el.datepicker.cancel')}
              </button>
              <button
                type="button"
                className={this.className("el-picker-panel__btn", "confirm", {'disabled': confirmBtnDisabled})}
                onClick={this.handleConfirm}>{t('el.datepicker.confirm')}
              </button>
            </div>
          )
        }
      </div>
    )
  }
}

DatePanel.isValid = (value, disabledDate) => {
  return typeof disabledDate === 'function' && (value instanceof Date) ? !disabledDate(value) : true;
}
