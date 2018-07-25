import React from 'react';
import BasePicker from './BasePicker';
import DatePanel from './panel/DatePanel';
import { pick } from './libs/utils';
import { SELECTION_MODES } from './utils';

import 'element-theme-default/lib/date-picker.css';

export default class DatePicker extends BasePicker {
  static get propTypes() {
    return Object.assign(
      {},
      BasePicker.propTypes,
      pick(DatePanel.propTypes,
        ['value', 'shortcuts', 'selectionMode', 'disabledDate', 'showWeekNumber', 'firstDayOfWeek', 'isShowTime']
      )
    );
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    let type = 'date'
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

  pickerPanel(state, props) {
    return (
      <DatePanel
        {...props}
        value={state.value}
        onPick={this.onPicked.bind(this)}
      />
    )
  }
}
