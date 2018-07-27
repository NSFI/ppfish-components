import React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker';
import TimePanel from './panel/TimePanel';
import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import { debounce } from 'throttle-debounce';

import 'element-theme-default/lib/time-picker.css';

function converSelectRange(props) {
  let selectableRange = []
  if (props.selectableRange) {
    let ranges = props.selectableRange;
    const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
    const format = DEFAULT_FORMATS.timerange;

    ranges = Array.isArray(ranges) ? ranges : [ranges];
    selectableRange = ranges.map(range => parser(range, format));
  }
  return selectableRange;
}

export default class TimePicker extends BasePicker {
  // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
  static get propTypes() {
    return Object.assign({}, {
      // '18:30:00 - 20:30:00'
      // or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
      selectableRange: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      isShowCurrent: PropTypes.bool
    }, BasePicker.propTypes);
  }

  static get defaultProps() {
    return Object.assign({}, {isShowCurrent: false}, BasePicker.defaultProps);
  }

  constructor(props) {
    super(props, 'time', {});
    this._onSelectionChange = debounce(200, this.onSelectionChange)
  }

  onSelectionChange = (start, end) => {
    // this.refs.inputRoot.refs.input.setSelectionRange(start, end);
    // this.refs.inputRoot.refs.input.focus();
  }

  pickerPanel(state, props) {
    return (
      <TimePanel
        {...props}
        isShowCurrent={props.isShowCurrent}
        currentDate={state.value}
        selectableRange={converSelectRange(props)}
        onCancelPicked={this.onCancelPicked}
        onPicked={this.onPicked}
        onSelectRangeChange={this._onSelectionChange}
      />
    )
  }
}
