import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../../Input/index.tsx';
import Icon from '../../Icon/index.tsx';
import Button from '../../Button/index.tsx';
import YearAndMonthPopover from './YearAndMonthPopover.jsx';
import TimePicker from '../TimePicker.jsx';
import { DateTable } from '../basic';
import {
  SELECTION_MODES,
  deconstructDate,
  formatDate,
  parseDate,
  toDate,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  timeFormat,
  dateFormat,
  MONTH_ARRRY,
  YEARS_ARRAY,
  isValidValue,
  setTime
} from '../../../utils/date';
import Locale from '../../../utils/date/locale';

const PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date',
};

const isInputValid = (text, date, disabledDate) => {
  if(text.trim() === '' || !isValidValue(date) || !DatePanel.isValid(date, disabledDate)) return false;
  return true;
};

export default class DatePanel extends React.Component {

  static get propTypes() {
    return {
      prefixCls: PropTypes.string,
      format: PropTypes.string,                  //basePicker
      value: PropTypes.instanceOf(Date),         //basePicker
      onPick: PropTypes.func.isRequired,         //basePicker
      onCancelPicked: PropTypes.func.isRequired, //basePicker
      yearCount: PropTypes.number,
      showWeekNumber: PropTypes.bool,
      shortcuts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired
        })
      ),
      selectionMode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(e => SELECTION_MODES[e])),
      disabledDate: PropTypes.func,
      firstDayOfWeek: PropTypes.number,
      renderExtraFooter: PropTypes.func,
      //时间面板
      isShowTime: PropTypes.bool,
      isShowTimeCurrent: PropTypes.bool,
      timeSelectableRange: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      defaultTimeValue: PropTypes.instanceOf(Date)
    };
  }

  static get defaultProps() {
    return {
      prefixCls: 'fishd',
      yearCount: 50,
      showWeekNumber: false,
      selectionMode: SELECTION_MODES.DAY,
      firstDayOfWeek: 0,
      isShowTime: false,
      isShowTimeCurrent: false,
      defaultTimeValue: null
    };
  }

  constructor(props) {
    super(props);

    let currentView = PICKER_VIEWS.DATE;
    // switch (props.selectionMode) {
    //   case SELECTION_MODES.MONTH:
    //     currentView = PICKER_VIEWS.MONTH; break;
    //   case SELECTION_MODES.YEAR:
    //     currentView = PICKER_VIEWS.YEAR; break;
    // }

    this.state = Object.assign({}, {
      currentView,
    }, this.propsToState(props));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.propsToState(nextProps));
  }

  propsToState(props) {
    const state = {};
    state.currentDate = isValidValue(props.value) ? toDate(props.value) : new Date();  // 日历视图
    state.date = toDate(props.value);                                                  // 日期
    state.dateInputText = formatDate(props.value, dateFormat(props.format));           // 日期输入框的值(string)，当props.value为null时，值为''
    state.time = toDate(props.value || props.defaultTimeValue);                        // 时间
    return state;
  }

  // 年份、月份面板先注释掉，需要时再打开
  _pickerContent() {
    const { selectionMode, disabledDate, showWeekNumber, firstDayOfWeek } = this.props;
    const { date, currentDate } = this.state;
    const { currentView } = this.state;
    let result = null;

    switch (currentView) {
      case PICKER_VIEWS.DATE:
        result = (
          <DateTable
            onPick={this.handleDatePick}
            date={currentDate}
            value={date}
            selectionMode={selectionMode}
            disabledDate={disabledDate}
            showWeekNumber={showWeekNumber}
            firstDayOfWeek={firstDayOfWeek}
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
        throw new Error('invalid currentView value');
    }

    return result;
  }

  // 日期时间都选择，确定按钮才可点击
  confirmBtnDisabled = () => {
    const {date, time} = this.state;
    return !(date && time);
  }

  // 未选择日期时，时间不可选
  timePickerDisable = () => {
    const {date, dateInputText} = this.state;
    return !(date && dateInputText);
  }

  // 日期输入框变化
  handleDateInputChange = (e) => {
    const {disabledDate, format} = this.props;

    const inputText = e.target.value;
    let ndate = parseDate(inputText, dateFormat(format));
    if (!isInputValid(inputText, ndate, disabledDate)) {
      this.setState({
        dateInputText: inputText,
      });
    }else{//only set value on a valid date input
      this.setState({
        dateInputText: inputText,
        date: new Date(ndate),
        currentDate: new Date(ndate)
      });
    }
  }

  // 日期输入框失焦时，重置入合法值
  handleDateInputBlur = (e) => {
    const {date} = this.state;
    this.setState({
      dateInputText: formatDate(date, dateFormat(this.props.format))
    });
  }

  // 时间输入框变化
  handleTimeInputChange = (val) => {
    if (val) {
      this.setState({
        time: new Date(val),
      });
    }
  }

  // 点击快捷按钮
  handleShortcutClick(shortcut) {
    shortcut.onClick();
  }

  // 上一年
  prevYear = () => {
    this.setState({
      currentDate: prevYear(this.state.currentDate)
    });
  }

  // 下一年
  nextYear = () => {
    this.setState({
      currentDate: nextYear(this.state.currentDate)
    });
  }

  // 上一月
  prevMonth = () => {
    this.setState({
      currentDate: prevMonth(this.state.currentDate)
    });
  }

  // 下一月
  nextMonth = () => {
    this.setState({
      currentDate: nextMonth(this.state.currentDate)
    });
  }

  // 切换年份
  handleChangeYear = (year) => {
    const { currentDate } = this.state;
    this.setState({
      currentDate: new Date(new Date(currentDate).setFullYear(year)),
    });
  }

  // 切换月份
  handleChangeMonth = (month) => {
    const { currentDate } = this.state;
    this.setState({
      currentDate: new Date((new Date(currentDate).setMonth(parseInt(month.slice(0,-1)) - 1)))
    });
  }

  // 点击日期
  handleDatePick = (value) => {
    const { selectionMode, isShowTime, onPick, format } = this.props;
    const pdate = value.date;

    if (selectionMode === SELECTION_MODES.DAY) {
      if (!isShowTime) {
        onPick(pdate);
      }
      this.setState({
        date: new Date(pdate),
        dateInputText: formatDate(pdate, dateFormat(format)), // 点击日期，左侧日期输入框的值同步变化
        currentDate: pdate
      });
    } else if (selectionMode === SELECTION_MODES.WEEK) {
      onPick(pdate);
    }
  }

  // 点击确定按钮
  handleConfirm = () => {
    const { date, time } = this.state;
    const pickedTime = setTime(date, time);
    this.props.onPick(pickedTime, false, true);
  }

  // 点击取消按钮
  handleCancel = () => {
    this.props.onCancelPicked();
  }

  render() {
    const {
      format,
      shortcuts,
      yearCount,
      isShowTime,
      isShowTimeCurrent,
      timeSelectableRange,
      renderExtraFooter,
      prefixCls
    } = this.props;
    const { currentView, currentDate, dateInputText, time } = this.state;
    const { month } = deconstructDate(currentDate);
    const t = Locale.t;

    return (
      <div
        className={classNames(
          `${prefixCls}-picker-panel`,
          `${prefixCls}-date-picker`,
          {
            'has-sidebar': shortcuts,
            'has-time': isShowTime
          })
        }
      >

        <div className={`${prefixCls}-picker-panel__body-wrapper`}>
          {
            Array.isArray(shortcuts) && (
              <div className={classNames(`${prefixCls}-picker-panel__sidebar`)}>
                {
                  shortcuts.map((e, idx) => {
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`${prefixCls}-picker-panel__shortcut`}
                        onClick={() => this.handleShortcutClick(e)}>{e.text}</button>
                    );
                  })
                }
              </div>
            )
          }
          <div className={`${prefixCls}-picker-panel__body`}>
            {
              isShowTime && (
                <div className={`${prefixCls}-date-picker__time-header`}>
                  <span className={`${prefixCls}-date-picker__editor-wrap`}>
                    <Input
                      placeholder={t('datepicker.selectDate')}
                      value={dateInputText}
                      onChange={this.handleDateInputChange}
                      onBlur={this.handleDateInputBlur}
                    />
                  </span>
                  <span className={`${prefixCls}-date-picker__editor-wrap`}>
                    <TimePicker
                      className={`${prefixCls}-date-picker-time__editor`}
                      placeholder={t('datepicker.selectTime')}
                      format={timeFormat(format)}
                      getPopupContainer={(node) => node.parentNode}
                      isShowTrigger={false}
                      isAllowClear={false}
                      isDisabled={this.timePickerDisable()}
                      value={time}
                      onChange={this.handleTimeInputChange}
                      isShowCurrent={isShowTimeCurrent}
                      selectableRange={timeSelectableRange}
                    />
                  </span>
                </div>
              )
            }

            {
              currentView !== 'time' && (
                <div className={`${prefixCls}-date-picker__header`}>
                  <Icon
                    type="left-double"
                    onClick={this.prevYear}
                    className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-picker__prev-btn`}>
                  </Icon>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <Icon
                        type="left"
                        onClick={this.prevMonth}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-picker__prev-btn`}>
                      </Icon>)
                  }
                  <YearAndMonthPopover
                    value={currentDate.getFullYear()}
                    sourceData={YEARS_ARRAY(yearCount)}
                    onChange={this.handleChangeYear}
                  >
                    <span className={`${prefixCls}-date-picker__header-label`}>{`${currentDate.getFullYear()} ${t('datepicker.year')}`}</span>
                  </YearAndMonthPopover>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <YearAndMonthPopover
                        value={currentDate.getMonth() + 1}
                        sourceData={MONTH_ARRRY}
                        onChange={this.handleChangeMonth}
                      >
                        <span
                          className={
                            classNames(`${prefixCls}-date-picker__header-label`, {
                              active: currentView === 'month'
                            })
                          }
                        >{t(`datepicker.month${month + 1}`)}</span>
                      </YearAndMonthPopover>
                    )
                  }
                  <Icon
                    type="right-double"
                    onClick={this.nextYear}
                    className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-picker__next-btn`}>
                  </Icon>
                  {
                    currentView === PICKER_VIEWS.DATE && (
                      <Icon
                        type="right"
                        onClick={this.nextMonth}
                        className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-picker__next-btn`}>
                      </Icon>
                    )
                  }
                </div>
              )
            }
            <div className={`${prefixCls}-picker-panel__content`}>
              {this._pickerContent()}
            </div>
          </div>
        </div>
        {
          typeof renderExtraFooter == 'function' && renderExtraFooter() && (
            <div
              className={`${prefixCls}-picker-panel__extra-footer`}
            >
              {renderExtraFooter()}
            </div>
          )
        }
        {
          isShowTime && currentView === PICKER_VIEWS.DATE && (
            <div
              className={`${prefixCls}-picker-panel__footer`}
            >
              <Button
                className={`${prefixCls}-picker-panel__btn cancel`}
                onClick={this.handleCancel}>{t('datepicker.cancel')}
              </Button>
              <Button
                type="primary"
                className={`${prefixCls}-picker-panel__btn confirm`}
                onClick={this.handleConfirm}
                disabled={this.confirmBtnDisabled()}>{t('datepicker.confirm')}
              </Button>
            </div>
          )
        }
      </div>
    );
  }
}

DatePanel.isValid = (value, disabledDate) => {
  return typeof disabledDate === 'function' && (value instanceof Date) ? !disabledDate(value) : true;
};
