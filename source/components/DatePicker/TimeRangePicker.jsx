import React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker'
import TimeRangePanel from './panel/TimeRangePanel'
import { debounce } from 'throttle-debounce';

export default class TimeRangePicker extends BasePicker {
  static get propTypes() {
    return Object.assign({}, { rangeSeparator: PropTypes.string },
      BasePicker.propTypes);
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps)
  }

  constructor(props) {
    super(props, 'timerange', {})
    this._onSelectionChange = debounce(200, this.onSelectionChange.bind(this))
  }

  onSelectionChange(start, end) {
    // this.refs.inputRoot.refs.input.setSelectionRange(start, end);
    // this.refs.inputRoot.refs.input.focus();
  }

  getFormatSeparator() {
    return this.props.rangeSeparator
  }

  pickerPanel(state, props) {
    return (
      <TimeRangePanel
        {...props}
        currentDates={state.value}
        onCancelPicked={this.onCancelPicked}
        onPicked={this.onPicked}
        onSelectRangeChange={this._onSelectionChange}
      />
    )
  }
}
