import React from 'react';
import PropTypes from 'prop-types';
import DateRangeBasePicker from './DateRangeBasePicker';
import DateRangePanel from './panel/DateRangePanel';
import { pick } from './libs/utils';

export default class DateRangePicker extends DateRangeBasePicker {
  static get propTypes() {
    return Object.assign({}, {
        rangeSeparator: PropTypes.string
      },
      DateRangeBasePicker.propTypes,
      // default value is been defined in ./constants file
      pick(DateRangePanel.propTypes,
        ['value', 'isShowTime', 'shortcuts', 'firstDayOfWeek', 'yearCount']
      )
    )
  }

  static get defaultProps() {
    return Object.assign({}, DateRangeBasePicker.defaultProps)
  }

  constructor(props) {
    super(props, props.isShowTime ? 'datetimerange' : 'daterange', {});
  }

  getFormatSeparator = () => {
    return this.props.rangeSeparator;
  }

  // isDateValid(value) {
  //   return super.isDateValid(value) && DateRangePanel.isValid(value, this.panelProps());
  // }
  //
  // panelProps(props){
  //   const ps = props || this.props;
  //   return {...ps};
  // }

  pickerPanel(state, props) {
    let value = state.value;
    if (value instanceof Date) {
      value = [value, null]
    }
    return (
      <DateRangePanel
        {...props}
        value={value}
        onPick={this.onPicked}
        onCancelPicked={this.onCancelPicked}
        dateToStr={this.dateToStr}
      />
    )
  }
}
