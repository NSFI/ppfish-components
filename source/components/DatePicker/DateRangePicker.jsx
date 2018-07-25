import React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker'
import DateRangePanel from './panel/DateRangePanel';
import { pick } from './libs/utils'

export default class DateRangePicker extends BasePicker {
  static get propTypes() {
    return Object.assign({}, {
      rangeSeparator: PropTypes.string
      },
      BasePicker.propTypes,
      // default value is been defined in ./constants file
      pick(DateRangePanel.propTypes,
        ['value', 'isShowTime', 'shortcuts', 'firstDayOfWeek']
      )
    )
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    super(props, 'daterange', {});
  }

  getFormatSeparator(){
    return this.props.rangeSeparator;
  }

  pickerPanel(state, props) {
    let value = state.value;
    if (value instanceof Date) {
      value = [value, null]
    }
    return (
      <DateRangePanel
        {...props}
        value={value}
        onPick={this.onPicked.bind(this)}
      />
    )
  }
}
