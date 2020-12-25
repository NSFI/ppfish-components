import * as React from 'react';
import PropTypes from 'prop-types';
import BasePicker, { Mode } from './BasePicker';
import DatePanel from './panel/DatePanel';
import TimeSelectPanel from './panel/TimeSelectPanel';
import TimePanel from './panel/TimePanel';
import { converSelectRange } from './TimePicker';
import { SELECTION_MODES } from '../../utils/date';
import DateRangePicker from './DateRangePicker';

type DatePickerProps = {
  placeholder: string;
  value: Date;
  mode?: Mode;
  showTime?: boolean;
};

export default class DatePicker extends BasePicker {
  static DateRangePicker = DateRangePicker;

  static get propTypes() {
    return Object.assign(
      {},
      {
        placeholder: PropTypes.string,
        value: PropTypes.instanceOf(Date),
        mode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(e => SELECTION_MODES[e]))
      },
      BasePicker.propTypes
    );
  }

  static get defaultProps() {
    return Object.assign({}, DatePanel.defaultProps, BasePicker.defaultProps);
  }

  constructor(props: DatePickerProps) {
    let type = props.showTime ? 'datetime' : 'date';
    switch (props.mode) {
      // case SELECTION_MODES.YEAR:
      //   type = 'year'; break;
      // case SELECTION_MODES.MONTH:
      //   type = 'month'; break;
      case SELECTION_MODES.WEEK:
        type = 'week';
        break;
    }
    super(props, type, {});
  }

  isDateValid(value) {
    // 带时间的日期面板，需要检查时间的合法性
    const dateValid = super.isDateValid(value) && DatePanel.isValid(value, this.props.disabledDate);
    if (this.props.showTime) {
      const timeSelectValid =
        this.props.timeSelectMode === 'TimeSelect' &&
        TimeSelectPanel.isValid(
          this.dateToStr(value).split(' ')[1],
          this.props.timeSelectModeProps
        );
      const timePickerValid =
        this.props.timeSelectMode === 'TimePicker' &&
        TimePanel.isValid(
          value,
          converSelectRange({
            selectableRange: this.props.timeSelectableRange
          })
        );
      return dateValid && (timeSelectValid || timePickerValid);
    } else {
      return dateValid;
    }
  }

  pickerPanel(state) {
    const value = state.value && this.isDateValid(state.value) ? state.value : null;
    return (
      <DatePanel
        {...this.props}
        value={value}
        onPick={this.onPicked}
        onCancelPicked={this.onCancelPicked}
      />
    );
  }
}
