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
  isValidValueArr,
  setTime,
  equalYearAndMonth,
  diffDate
} from '../../../utils/date';
import Locale from '../../../utils/date/locale';

const isInputValid = (text, date, disabledDate) => {
  if(text.trim() === '' || !isValidValueArr(date) || !DateRangePanel.isValid(date, disabledDate)) return false;
  return true;
};

const setRightDate = (dateA, dateB) => {
  if(equalYearAndMonth(dateA,dateB)){
    return nextMonth(dateB);
  }else{
    return dateB;
  }
};

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
      defaultEndTimeValue: PropTypes.instanceOf(Date),
      prefixCls: PropTypes.string
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
      defaultEndTimeValue: null,
      prefixCls: 'fishd'
    };
  }

  constructor(props) {
    super(props);

    this.state = Object.assign({}, {
      rangeState: {
        firstSelectedValue: null,
        endDate: null,
        selecting: false,
      },
    }, this.propsToState(props));
  }

  propsToState(props) {
    const state = {};
    state.leftDate = isValidValueArr(props.value) ? props.value[0] : new Date();
    state.rightDate = isValidValueArr(props.value) ? setRightDate(props.value[0], props.value[1]) : nextMonth(new Date());
    state.minDate = isValidValueArr(props.value) ? toDate(props.value[0]) : null;
    state.maxDate = isValidValueArr(props.value) ? toDate(props.value[1]) : null;
    state.minDateInputText = isValidValueArr(props.value) ? formatDate(props.value[0], dateFormat(props.format)) : '';
    state.maxDateInputText = isValidValueArr(props.value) ? formatDate(props.value[1], dateFormat(props.format)) : '';
    state.minTime = isValidValueArr(props.value) ? toDate(props.value[0]) : toDate(props.defaultStartTimeValue);
    state.maxTime = isValidValueArr(props.value) ? toDate(props.value[1]) : toDate(props.defaultEndTimeValue);
    return state;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.propsToState(nextProps));
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
    const {minDate, maxDate} = this.state;
    const text = type === 'min' ? 'minDateInputText' : 'maxDateInputText';
    const value = type === 'min' ? 'minDate' : 'maxDate';

    const inputText = e.target.value;
    const ndate = parseDate(inputText, dateFormat(format));

    if (!isInputValid(inputText, type === 'min'?[ndate, maxDate]:[minDate, ndate], disabledDate)) {
      this.setState({
        [text]: inputText,
      });
    } else {
      this.setState({
        [text]: inputText,
        [value]: new Date(ndate)
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
          [`${type}TimpickerVisisble`]: false,
        });
      } else {
        this.setState({
          maxTime: new Date(value),
          [`${type}TimpickerVisisble`]: false
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
      [type]: new Date(date.setFullYear(year)),
    }, () => {
      // 切换完年份，若左边日历小于等于右边日历，保持右边日历是左边日历的下一年
      const { leftDate, rightDate } = this.state;
      if(type === 'leftDate'){
        if(leftDate >= rightDate) {
          this.setState({
            rightDate: new Date(rightDate.setFullYear(leftDate.getFullYear() + 1))
          });
        }
      }else if(type === 'rightDate') {
        if(leftDate >= rightDate) {
          this.setState({
            leftDate: new Date(leftDate.setFullYear(rightDate.getFullYear() - 1))
          });
        }
      }
    });
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
    const { isShowTime, onPick, format, maxDateRange, onError } = this.props;

    if(maxDateRange && maxDateRange > 0) {
      if(minDate && maxDate && diffDate(minDate, maxDate) + 1 > maxDateRange) {
        onError('最大选择范围不能超过'+maxDateRange+'天');
        return;
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
      onPick([minDate, maxDate], false, true);
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
      renderExtraFooter,
      prefixCls
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
      maxTime
    } = this.state;

    const t = Locale.t;

    return (
      <div
        className={classNames(
          `${prefixCls}-picker-panel`,
          `${prefixCls}-date-range-picker`,
          {
            'has-sidebar': shortcuts && shortcutsPlacement === 'left',
            'has-time': isShowTime
          })}
      >
        <div className={`${prefixCls}-picker-panel__body-wrapper`}>
          {
            shortcutsPlacement === 'left' && Array.isArray(shortcuts) && (
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
              isShowTime && (
                <div className={`${prefixCls}-date-range-picker__time-header`}>
                  <span className={`${prefixCls}-date-range-picker__editors-wrap is-left`}>
                    <span className={`${prefixCls}-date-range-picker__time-picker-wrap`}>
                      <Input
                        placeholder={Locale.t('datepicker.startDate')}
                        className={`${prefixCls}-date-range-picker__editor`}
                        value={minDateInputText}
                        onChange={value => this.handleDateInputChange(value, 'min')}
                        onBlur={value => this.handleDateInputBlur(value, 'min')}
                      />
                    </span>
                    <span className={`${prefixCls}-date-range-picker__time-picker-wrap`}>
                      <TimePicker
                        className={`${prefixCls}-date-range-picker__editor`}
                        placeholder={Locale.t('datepicker.startTime')}
                        format={timeFormat(format)}
                        getPopupContainer={(node) => node.parentNode}
                        isShowTrigger={false}
                        isAllowClear={false}
                        isDisabled={this.timePickerDisable()}
                        value={minTime}
                        onChange={value => this.handleTimeInputChange(value, 'min')}
                        isShowCurrent={isShowTimeCurrent}
                        selectableRange={startTimeSelectableRange}
                      />
                    </span>
                  </span>
                  <span className={`${prefixCls}-date-range-picker__editors-wrap is-right`}>
                    <span className={`${prefixCls}-date-range-picker__time-picker-wrap`}>
                      <Input
                        placeholder={Locale.t('datepicker.endDate')}
                        className={`${prefixCls}-date-range-picker__editor`}
                        value={maxDateInputText}
                        readOnly={!minDate}
                        onChange={value => this.handleDateInputChange(value, 'max')}
                        onBlur={value => this.handleDateInputBlur(value, 'max')}
                      />
                    </span>
                    <span className={`${prefixCls}-date-range-picker__time-picker-wrap`}>
                      <TimePicker
                        className={`${prefixCls}-date-range-picker__editor`}
                        placeholder={Locale.t('datepicker.endTime')}
                        format={timeFormat(format)}
                        getPopupContainer={(node) => node.parentNode}
                        isShowTrigger={false}
                        isAllowClear={false}
                        isDisabled={this.timePickerDisable()}
                        value={maxTime}
                        onChange={value => this.handleTimeInputChange(value, 'max')}
                        isShowCurrent={isShowTimeCurrent}
                        selectableRange={endTimeSelectableRange}
                      />
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
                  className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__prev-btn`}>
                </Icon>
                <Icon
                  type="left"
                  onClick={this.prevMonth.bind(this, 'leftDate', leftDate, ()=>{})}
                  className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__prev-btn`}>
                </Icon>
                <YearAndMonthPopover
                  value={leftDate.getFullYear()}
                  sourceData={YEARS_ARRAY(yearCount)}
                  onChange={this.handleChangeYear.bind(this, 'leftDate', leftDate)}
                >
                  <span className={`${prefixCls}-date-range-picker__header-label`}>{`${leftDate.getFullYear()} ${t('datepicker.year')}`}</span>
                </YearAndMonthPopover>
                <YearAndMonthPopover
                  value={leftDate.getMonth() + 1}
                  sourceData={MONTH_ARRRY}
                  onChange={this.handleChangeMonth.bind(this, 'leftDate', leftDate)}
                >
                  <span className={`${prefixCls}-date-range-picker__header-label`}>{t(`datepicker.month${leftDate.getMonth() + 1}`)}</span>
                </YearAndMonthPopover>
                <Icon
                  type="right-double"
                  onClick={this.nextYear.bind(this, 'leftDate', leftDate, this.handleLeftNextYear)}
                  className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__next-btn`}>
                </Icon>
                <Icon
                  type="right"
                  onClick={this.nextMonth.bind(this, 'leftDate', leftDate, this.handleLeftNextMonth)}
                  className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__next-btn`}>
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
            <div className={`${prefixCls}-picker-panel__content ${prefixCls}-date-range-picker__content is-right`}>
              <div className={`${prefixCls}-date-range-picker__header`}>
                <Icon
                  type="left-double"
                  onClick={this.prevYear.bind(this, 'rightDate', rightDate, this.handleRightPrevYear)}
                  className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__prev-btn`}>
                </Icon>
                <Icon
                  type="left"
                  onClick={this.prevMonth.bind(this, 'rightDate', rightDate, this.handleRightPrevMonth)}
                  className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__prev-btn`}>
                </Icon>
                <YearAndMonthPopover
                  value={rightDate.getFullYear()}
                  sourceData={YEARS_ARRAY(yearCount)}
                  onChange={this.handleChangeYear.bind(this, 'rightDate', rightDate)}
                >
                  <span className={`${prefixCls}-date-range-picker__header-label`}>{`${rightDate.getFullYear()} ${t('datepicker.year')}`}</span>
                </YearAndMonthPopover>
                <YearAndMonthPopover
                  value={rightDate.getMonth() + 1}
                  sourceData={MONTH_ARRRY}
                  onChange={this.handleChangeMonth.bind(this, 'rightDate', rightDate)}
                >
                  <span className={`${prefixCls}-date-range-picker__header-label`}>{t(`datepicker.month${rightDate.getMonth() + 1}`)}</span>
                </YearAndMonthPopover>
                <Icon
                  type="right-double"
                  onClick={this.nextYear.bind(this, 'rightDate', rightDate, ()=>{})}
                  className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__next-btn`}>
                </Icon>
                <Icon
                  type="right"
                  onClick={this.nextMonth.bind(this, 'rightDate', rightDate, ()=>{})}
                  className={`${prefixCls}-picker-panel__icon-btn ${prefixCls}-date-range-picker__next-btn`}>
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
              className={`${prefixCls}-picker-panel__extra-footer`}
            >
              {renderExtraFooter()}
            </div>
          )
        }
        {
          isShowTime && (
            <div className={`${prefixCls}-picker-panel__footer`}>
              <Button
                className={`${prefixCls}-picker-panel__btn cancel`}
                onClick={this.handleCancel}>{ Locale.t('datepicker.cancel') }
              </Button>
              <Button
                type="primary"
                className={classNames(`${prefixCls}-picker-panel__btn confirm`, {'disabled': this.confirmBtnDisabled()})}
                onClick={this.handleConfirm}
                disabled={this.confirmBtnDisabled()}>{ Locale.t('datepicker.confirm') }
              </Button>
            </div>
          )
        }
      </div>
    );
  }
}

DateRangePanel.isValid = (value, disabledDate) => {
  if(value && value.length >= 2 && value[0] > value[1]) return false;
  return typeof disabledDate === 'function' && (value && value.length >= 2) ? !(disabledDate(value[0]) || disabledDate(value[1])) : true;
};
