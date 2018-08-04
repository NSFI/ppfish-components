import React from 'react';
import PropTypes from 'prop-types';
import { PopperBase } from './PopperBase'
import TimeSpinner from '../basic/TimeSpinner';
import { limitRange, parseDate } from '../utils';
import Locale from '../locale';

const MIN_TIME = parseDate('00:00:00', 'HH:mm:ss');
const MAX_TIME = parseDate('23:59:59', 'HH:mm:ss');

const isDisabled = function (minTime, maxTime) {
  const minValue = minTime.getHours() * 3600 +
    minTime.getMinutes() * 60 +
    minTime.getSeconds();
  const maxValue = maxTime.getHours() * 3600 +
    maxTime.getMinutes() * 60 +
    maxTime.getSeconds();

  return minValue > maxValue;
};

const calcTime = function (time) {
  time = Array.isArray(time) ? time : [time];
  const minTime = time[0] || new Date();
  const date = new Date();
  date.setHours(date.getHours() + 1);
  const maxTime = time[1] || date;

  if (minTime > maxTime) return calcTime();
  return { minTime, maxTime };
};

export default class TimeRangePanel extends PopperBase {

  static get propTypes() {
    return Object.assign(
      {
        pickerWidth: PropTypes.number,
        currentDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        /*
        onPicked: (value, isKeepPannelOpen)=>()
        @param value: Date| Date[] |null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancelPicked: PropTypes.func.isRequired,
        // (start, end)=>(), index range indicate which field [hours, minutes, seconds] changes
        onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange,
      }, PopperBase.propTypes);
  }

  static get defaultProps() {
    return {
      popperMixinOption: {}
    };
  }

  constructor(props) {
    super(props);

    this.state = Object.assign(
      {
        visible: false,
        width: 0
      },
      this.mapPropsToState(props)
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.mapPropsToState(nextProps));
  }

  mapPropsToState = props => {
    const { currentDates, format } = props;
    const { minTime, maxTime } = calcTime(currentDates);

    const state = {
      format: format || 'HH:mm:ss',
      minTime,
      maxTime,
      minSelectableRange: [[MIN_TIME, maxTime]],
      maxSelectableRange: [[minTime, MAX_TIME]],
      btnDisabled: isDisabled(minTime, maxTime)
    };
    state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;

    return state;
  };

  // type = hours | minutes | seconds
  // date: {type: number}
  handleChange(date , field) {
    const ndate = this.state[field];

    if (date.hours !== undefined) {
      ndate.setHours(date.hours);
    }

    if (date.minutes !== undefined) {
      ndate.setMinutes(date.minutes);
    }

    if (date.seconds !== undefined) {
      ndate.setSeconds(date.seconds);
    }

    const state = {
      [field]: ndate
    };

    const { minTime, maxTime } = this.state;
    state.minSelectableRange = [[MIN_TIME, maxTime]];
    state.maxSelectableRange = [[minTime, MAX_TIME]];

    state.minTime = limitRange(minTime, state.minSelectableRange);
    state.maxTime = limitRange(maxTime, state.maxSelectableRange);

    this.setState(state);
    this.handleConfirm(true, false);

  }

  // 点击确定按钮
  handleConfirm = (isKeepPannelOpen, isConfirmValue) => {
    const { minTime, maxTime } = this.state;
    const { onPicked } = this.props;

    onPicked([minTime, maxTime], isKeepPannelOpen, isConfirmValue);
  }

  // 点击取消按钮
  handleCancel = () => {
    this.props.onCancelPicked();
  }

  render() {
    const {
      isShowSeconds,
      minTime,
      maxTime,
      btnDisabled,
      minSelectableRange,
      maxSelectableRange
    } = this.state;
    const { onSelectRangeChange } = this.props;
    const $t = Locale.t;

    const maxHours = maxTime.getHours();
    const maxMinutes = maxTime.getMinutes();
    const maxSeconds = maxTime.getSeconds();
    const minHours = minTime.getHours();
    const minMinutes = minTime.getMinutes();
    const minSeconds = minTime.getSeconds();
    return (
      <div
        ref="root"
        className="fishd-time-range-picker fishd-picker-panel"
        style={{ minWidth: '330px' }}
      >
        <div className="fishd-time-range-picker__content">
          <div className="fishd-time-range-picker__cell">
            <div className="fishd-time-range-picker__header">
              {$t('fishd.datepicker.startTime')}
            </div>
            <div
              className={this.classNames(
                'fishd-time-range-picker__body fishd-time-panel__content',
                { 'has-seconds': isShowSeconds }
              )}
            >
              <TimeSpinner
                ref="minSpinner"
                onChange={date => this.handleChange(date, 'minTime')}
                isShowSeconds={isShowSeconds}
                hours={minHours}
                minutes={minMinutes}
                seconds={minSeconds}
                selectableRange={minSelectableRange}
                onSelectRangeChange={onSelectRangeChange}
              />
            </div>
          </div>
          <div className="fishd-time-range-picker__cell">
            <div className="fishd-time-range-picker__header">
              {$t('fishd.datepicker.endTime')}
            </div>
            <div
              className={this.classNames(
                'fishd-time-range-picker__body fishd-time-panel__content',
                { 'has-seconds': isShowSeconds }
              )}
            >
              <TimeSpinner
                ref="maxSpinner"
                onChange={date => this.handleChange(date, 'maxTime')}
                isShowSeconds={isShowSeconds}
                hours={maxHours}
                minutes={maxMinutes}
                seconds={maxSeconds}
                selectableRange={maxSelectableRange}
                onSelectRangeChange={(start, end) =>
                  onSelectRangeChange(start + 11, end + 11)}
              />
            </div>
          </div>
        </div>
        <div className="fishd-time-panel__footer">
          <button
            type="button"
            className="fishd-time-panel__btn cancel"
            onClick={this.handleCancel}
          >
            {$t('fishd.datepicker.cancel')}
          </button>
          <button
            type="button"
            className="fishd-time-panel__btn confirm"
            onClick={() => this.handleConfirm(false, true)}
            disabled={btnDisabled}
          >
            {$t('fishd.datepicker.confirm')}
          </button>
        </div>
      </div>
    );
  }
}
