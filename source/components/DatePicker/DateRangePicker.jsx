import React from 'react';
import PropTypes from 'prop-types';
import DateRangeBasePicker from './DateRangeBasePicker.jsx';
import DateRangePanel from './panel/DateRangePanel.jsx';
import { pick } from './libs/utils';

export default class DateRangePicker extends DateRangeBasePicker {
  static get propTypes() {
    return Object.assign({}, {
        rangeSeparator: PropTypes.string
      },
      DateRangeBasePicker.propTypes,
      // default value is been defined in ./constants file
      pick(DateRangePanel.propTypes,
        [
          'value',
          'shortcuts',
          'disabledDate',
          'isShowTime',
          'firstDayOfWeek',
          'yearCount',
          'shortcutsPlacement',
          'renderExtraFooter',
          'maxDateRange',
          'onError'
        ]
      )
    )
  }

  static get defaultProps() {
    return Object.assign({}, DateRangeBasePicker.defaultProps);
  }

  constructor(props) {
    super(props, props.isShowTime ? 'datetimerange' : 'daterange', {});
  }

  isDateValid(value) {
    return super.isDateValid(value) && DateRangePanel.isValid(value, this.props.disabledDate);
  }

  getFormatSeparator = () => {
    return this.props.rangeSeparator;
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
