import React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker';
import TimeSelectPanel from './panel/TimeSelectPanel';

// import 'element-theme-default/lib/time-select.css';

export default class TimeSelect extends BasePicker {

  static get propTypes() {
    return Object.assign({}, {
      start: PropTypes.string,
      end: PropTypes.string,
      step: PropTypes.string,
      minTime: PropTypes.string,
      maxTime: PropTypes.string,
    }, BasePicker.propTypes)
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps);
  }

  constructor(props) {
    // props, type, state
    super(props, 'timeselect', {});
  }

  isDateValid(value) {
    return super.isDateValid(value) && TimeSelectPanel.isValid(this.dateToStr(value), this.panelProps());
  }

  panelProps(props){
    const ps = props || this.props;
    return {...ps};
  }

  pickerPanel(state, props) {
    const value = state.value ? this.dateToStr(state.value) : null;
    return (
      <TimeSelectPanel
        {...this.panelProps(props)}
        value={value}
        onPicked={this.onPicked}
        dateParser={(str) => {
          return str ? this.parseDate(str) : null;
        }}
      />
    )
  }
}
