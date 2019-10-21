import React from 'react';
import PropTypes from 'prop-types';
import DateRangeBasePicker from './DateRangeBasePicker.js';
import DateRangePanel from './panel/DateRangePanel.js';
import TimeSelectPanel from './panel/TimeSelectPanel.js';
import TimePanel from './panel/TimePanel';
import { converSelectRange } from './TimePicker';

export default class DateRangePicker extends DateRangeBasePicker {
  static get propTypes() {
    return Object.assign({}, {
      separator: PropTypes.string,
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
      onError: PropTypes.func
    }, DateRangeBasePicker.propTypes);
  }

  static get defaultProps() {
    return Object.assign({}, DateRangePanel.defaultProps, DateRangeBasePicker.defaultProps);
  }

  constructor(props) {
    super(props, props.showTime ? 'datetimerange' : 'daterange', {});
  }

  isDateValid(value) {
    const dateValid = super.isDateValid(value) && DateRangePanel.isValid(value, this.props.disabledDate);
    // 带时间的日期范围面板，需要检查时间的合法性
    if(this.props.showTime) {
      const startTime = value && value.length >= 2 ? value[0] : null;
      const endTime = value && value.length >= 2 ? value[1] : null;
      const startTimeSelectValid = startTime && this.props.startTimeSelectMode === 'TimeSelect' && TimeSelectPanel.isValid(this.dateToStr(startTime).split(" ")[1], this.props.startTimeSelectModeProps);
      const startTimePickerValid = startTime && this.props.startTimeSelectMode === 'TimePicker' && TimePanel.isValid(startTime, converSelectRange({selectableRange:this.props.startTimeSelectableRange}));
      const endTimeSelectValid = endTime && this.props.endTimeSelectMode === 'TimeSelect' && TimeSelectPanel.isValid(this.dateToStr(endTime).split(" ")[1], this.props.endTimeSelectModeProps);
      const endTimePickerValid = endTime && this.props.endTimeSelectMode === 'TimePicker' && TimePanel.isValid(endTime, converSelectRange({selectableRange:this.props.endTimeSelectableRange}));
      return dateValid && ((startTimeSelectValid || startTimePickerValid) && (endTimeSelectValid || endTimePickerValid))
    }else{
      return dateValid
    }
  }

  getFormatSeparator = () => {
    return this.props.separator;
  }

  onError = (value) => {
    return this.props.onError && typeof this.props.onError === "function" ? this.props.onError(value) : undefined;
  }

  pickerPanel(state) {
    const value = state.value && this.isDateValid(state.value) ? state.value : null;
    return (
      <DateRangePanel
        {...this.props}
        value={value}
        onPick={this.onPicked}
        onCancelPicked={this.onCancelPicked}
        dateToStr={this.dateToStr}
      />
    );
  }
}
