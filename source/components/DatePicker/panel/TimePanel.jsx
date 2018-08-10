import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TimeSpinner from '../basic/TimeSpinner';
import { limitRange, isLimitRange, parseDate } from '../../../utils/date';
import Locale from '../../../utils/date/locale';

export default class TimePanel extends React.Component {

  static get propTypes() {
    return {
      format: PropTypes.string,                  //base
      value: PropTypes.instanceOf(Date),         //base
      onPicked: PropTypes.func.isRequired,       //base
      onCancelPicked: PropTypes.func.isRequired, //base
      selectableRange: TimeSpinner.propTypes.selectableRange,
      onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange,
      isShowCurrent: PropTypes.bool,
    }
  }

  static get defaultProps() {
    return {
      isShowCurrent: false,
    }
  }

  constructor(props) {
    super(props);
    this.state = this.mapPropsToState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.mapPropsToState(nextProps))
  }

  mapPropsToState = (props) => {
    const { format, value } = props;
    const state = {
      format: format || 'HH:mm:ss',
      currentDate: value || parseDate('00:00:00', 'HH:mm:ss'),
      confirmButtonDisabled: value == null || !this.isValid(value),
      currentButtonDisabled: isLimitRange(new Date(), props.selectableRange, 'HH:mm:ss')
    };
    state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;

    return state;
  };

  // 判断值的合法性
  isValid = (value) => {
    return TimePanel.isValid(value, this.props.selectableRange);
  }

  // type: string,  one of [hours, minutes, seconds]
  // date: {type: number}
  handleChange = (date) => {
    const {currentDate} = this.state;
    const newDate = new Date(currentDate);

    if (date.hours !== undefined) {
      newDate.setHours(date.hours);
    }
    if (date.minutes !== undefined) {
      newDate.setMinutes(date.minutes);
    }
    if (date.seconds !== undefined) {
      newDate.setSeconds(date.seconds);
    }

    if(!this.isValid(newDate)){
      this.setState({
        confirmButtonDisabled: true,
        currentDate: newDate
      });
    }else{
      this.setState({
        confirmButtonDisabled: false,
        currentDate: newDate
      }, () => {
        this.handleConfirm(true, false); //面板展开，不保存值
      });
    }
  }

  // 点击确定按钮
  handleConfirm = (isKeepPannelOpen, isConfirmValue) => {
    const {currentDate} = this.state;
    const {onPicked, selectableRange} = this.props;
    const date = new Date(limitRange(currentDate, selectableRange, 'HH:mm:ss'));

    onPicked(date, isKeepPannelOpen, isConfirmValue);
  }

  // 点击取消按钮
  handleCancel = () => {
    this.props.onCancelPicked();
  }

  // 点击此刻按钮
  handleCurrent = () => {
    const {onPicked} = this.props;
    const value = new Date();
    onPicked(value, false, true);
  }

  render() {
    const {onSelectRangeChange, selectableRange, isShowCurrent} = this.props;
    const {isShowSeconds, currentDate, confirmButtonDisabled, currentButtonDisabled} = this.state;

    const hours = currentDate ? currentDate.getHours() : null;
    const minutes = currentDate ? currentDate.getMinutes() : null;
    const seconds = currentDate ? currentDate.getSeconds() : null;

    const $t = Locale.t;

    return (
      <div
        ref="root"
        className="fishd-picker-panel fishd-time-panel"
      >
        <div className={classNames('fishd-time-panel__content', { 'has-seconds': isShowSeconds })}>
          <TimeSpinner
            ref="spinner"
            isShowSeconds={isShowSeconds}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            selectableRange={selectableRange}
            onSelectRangeChange={onSelectRangeChange}
            onChange={this.handleChange}
          />
        </div>
        <div className="fishd-time-panel__footer">
          <div>
            {
              isShowCurrent ?
                <button
                  type="button"
                  disabled={currentButtonDisabled}
                  className={classNames('fishd-time-panel__btn confirm', {'disabled' : currentButtonDisabled})}
                  onClick={this.handleCurrent}>{$t('fishd.datepicker.now')}
                </button>
                :
                null
            }
          </div>
          <div>
            <button
              type="button"
              className="fishd-time-panel__btn cancel"
              onClick={this.handleCancel}>{$t('fishd.datepicker.cancel')}
            </button>
            <button
              type="button"
              disabled={confirmButtonDisabled}
              className={classNames('fishd-time-panel__btn confirm', {'disabled' : confirmButtonDisabled})}
              onClick={() => this.handleConfirm(false, true)}>{$t('fishd.datepicker.confirm')}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TimePanel.isValid = (value, selectableRange) => {
  return value == null || isLimitRange(value, selectableRange, 'HH:mm:ss');
}
