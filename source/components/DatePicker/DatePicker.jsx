import React from 'react';
import BasePicker from './BasePicker.jsx';
import DatePanel from './panel/DatePanel';
import { pick } from './libs/utils';
import { SELECTION_MODES } from '../../utils/date';

export default class DatePicker extends BasePicker {
  static get propTypes() {
    return Object.assign(
      {},
      BasePicker.propTypes,
      pick(DatePanel.propTypes,
        ['value', 'shortcuts', 'selectionMode', 'disabledDate', 'showWeekNumber', 'firstDayOfWeek', 'isShowTime', 'yearCount']
      )
    );
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    let type = props.isShowTime ? 'datetime' : 'date';
    switch (props.selectionMode) {
      case SELECTION_MODES.YEAR:
        type = 'year'; break;
      case SELECTION_MODES.MONTH:
        type = 'month'; break;
      case SELECTION_MODES.WEEK:
        type = 'week'; break;
    }
    super(props, type, {})
  }

  isDateValid(value) {
    return super.isDateValid(value) && DatePanel.isValid(value, this.props.disabledDate);
  }

  pickerPanel(state, props) {
    const value = state.value && this.isDateValid(state.value) ? state.value : null;
    return (
      <DatePanel
        {...props}
        value={value}
        onPick={this.onPicked}
        onCancelPicked={this.onCancelPicked}
      />
    )
  }
}
