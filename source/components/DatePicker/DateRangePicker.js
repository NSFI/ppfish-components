import React from 'react';
import PropTypes from 'prop-types';
import DateRangeBasePicker from './DateRangeBasePicker.js';
import DateRangePanel from './panel/DateRangePanel.js';

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
    return Object.assign({}, DateRangeBasePicker.defaultProps);
  }

  constructor(props) {
    super(props, props.showTime ? 'datetimerange' : 'daterange', {});
  }

  isDateValid(value) {
    return super.isDateValid(value) && DateRangePanel.isValid(value, this.props.disabledDate);
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
