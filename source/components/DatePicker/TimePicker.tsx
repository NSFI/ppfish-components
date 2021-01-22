import * as React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker';
import TimePanel from './panel/TimePanel';
import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import debounce from 'lodash/debounce';
import TimeSelect from './TimeSelect';
import pick from 'lodash/pick';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

export const converSelectRange = props => {
  let selectableRange = [];
  if (props.selectableRange) {
    let ranges = props.selectableRange;
    const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
    const format = DEFAULT_FORMATS.timerange;

    ranges = Array.isArray(ranges) ? ranges : [ranges];
    selectableRange = ranges.map(range => parser(range, format));
  }
  return selectableRange;
};

export default class TimePicker extends BasePicker {
  _onSelectionChange: (range: any) => void;
  refInputRoot;

  static TimeSelect = TimeSelect;

  static get propTypes() {
    return Object.assign(
      {},
      {
        // '18:30:00 - 20:30:00' or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        selectableRange: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.string)
        ]),
        isShowCurrent: PropTypes.bool,
        footer: PropTypes.func,
        onValueChange: PropTypes.func
      },
      BasePicker.propTypes
    );
  }

  static get defaultProps() {
    return Object.assign({}, { isShowCurrent: false }, BasePicker.defaultProps);
  }

  constructor(props) {
    //props, type, state
    super(props, 'time', {});
    this._onSelectionChange = debounce(this.onSelectionChange, 200);
  }

  isDateValid(value) {
    return super.isDateValid(value) && TimePanel.isValid(value, converSelectRange(this.props));
  }

  onSelectionChange = (start, end) => {
    this.refInputRoot.input && this.refInputRoot.input.setSelectionRange(start, end);
    this.refInputRoot.input && this.refInputRoot.input.focus();
  };

  pickerPanel(state) {
    const value = state.value && this.isDateValid(state.value) ? state.value : null;
    return (
      <ConfigConsumer componentName="DatePicker">
        {
          (Locales: LocaleProperties["DatePicker"]) => (
            <TimePanel
              {...this.props}
              selectableRange={converSelectRange(this.props)}
              ONSELECTRANGECHANGE={this._onSelectionChange}
              value={value}
              onPicked={this.onPicked}
              onCancelPicked={this.onCancelPicked}
              Locales={Locales}
            />
          )
        }
      </ConfigConsumer>
    );
  }
}
