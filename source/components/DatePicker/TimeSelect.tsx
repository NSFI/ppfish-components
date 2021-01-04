import * as React from 'react';
import PropTypes from 'prop-types';
import BasePicker, { BasePickerProps } from './BasePicker';
import TimeSelectPanel from './panel/TimeSelectPanel';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

export type TimeSelectProps = {
  start?: string;
  end?: string;
  step?: string;
  minTime?: string;
  maxTime?: string;
};

export type TimeProps = TimeSelectProps & BasePickerProps;

export default class TimeSelect extends BasePicker {
  static get propTypes() {
    return Object.assign(
      {},
      {
        start: PropTypes.string,
        end: PropTypes.string,
        step: PropTypes.string,
        minTime: PropTypes.string,
        maxTime: PropTypes.string
      },
      BasePicker.propTypes
    );
  }

  static get defaultProps() {
    return Object.assign({}, BasePicker.defaultProps);
  }

  constructor(props: TimeProps) {
    //props, type, state
    super(props, 'timeselect', {});
  }

  isDateValid(value) {
    return (
      super.isDateValid(value) &&
      // @ts-ignore
      TimeSelectPanel.isValid(this.dateToStr(value), this.props)
    );
  }

  pickerPanel(state) {
    const value = state.value && this.isDateValid(state.value) ? this.dateToStr(state.value) : null;
    return (
      <ConfigConsumer componentName="DatePicker">
        {
          (Locales: LocaleProperties["DatePicker"]) => (
            <TimeSelectPanel
              {...this.props}
              value={value}
              onPicked={this.onPicked}
              dateParser={str => {
                return str ? this.parseDate(str) : null;
              }}
            />
        )
      }
      </ConfigConsumer>
    );
  }
}
