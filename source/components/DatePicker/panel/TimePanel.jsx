import React from 'react';
import PropTypes from 'prop-types';
import TimeSpinner from '../basic/TimeSpinner'
import { PopperBase } from './PopperBase'
import Locale from '../locale'
import { limitRange, isLimitRange, parseDate } from '../utils';

export default class TimePanel extends PopperBase {

  static get propTypes() {
    return Object.assign({},
      {
        selectableRange: TimeSpinner.propTypes.selectableRange,
        onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange
      }, {
        pickerWidth: PropTypes.number,
        currentDate: PropTypes.instanceOf(Date),
        isShowCurrent: PropTypes.bool,
        /*
        onPicked: (value, isKeepPannelOpen)=>()
        @param value: Date|null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: PropTypes.func.isRequired,
        onCancelPicked: PropTypes.func.isRequired,
      }, PopperBase.propTypes)
  }

  static get defaultProps() {
    return {
      popperMixinOption: {}
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
    const { format, currentDate } = props;

    const state = {
      format: format || 'HH:mm:ss',
      currentDate: currentDate || parseDate('00:00:00', 'HH:mm:ss'),
      confirmButtonDisabled: false,
      currentButtonDisabled: isLimitRange(new Date(), props.selectableRange, 'HH:mm:ss')
    };
    state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;

    return state;
  };

  // 判断值的合法性
  isValid = (value) => {
    return TimePanel.isValid(value, this.props);
  }

  // type: string,  one of [hours, minutes, seconds]
  // date: {type: number}
  handleChange = (date) => {
    const {currentDate} = this.state;
    const {selectableRange} = this.props;
    if (date.hours !== undefined) {
      currentDate.setHours(date.hours);
    }
    if (date.minutes !== undefined) {
      currentDate.setMinutes(date.minutes);
    }
    if (date.seconds !== undefined) {
      currentDate.setSeconds(date.seconds);
    }
    if(!this.isValid){
      this.setState({
        confirmButtonDisabled: true,
        currentDate: currentDate
      });
    }else{
      this.setState({
        confirmButtonDisabled: false,
        currentDate: currentDate
      });
      this.handleConfirm(true, false); //收起面板，不保存值
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
    const {onPicked, selectableRange} = this.props;
    const value = new Date();
    const date = new Date(limitRange(value, selectableRange, 'HH:mm:ss'));
    onPicked(date, false, true);
  }

  render() {
    const {isShowSeconds, currentDate, confirmButtonDisabled, currentButtonDisabled} = this.state;
    const {onSelectRangeChange, selectableRange, isShowCurrent} = this.props;

    const hours = currentDate ? currentDate.getHours() : null;
    const minutes = currentDate ? currentDate.getMinutes() : null;
    const seconds = currentDate ? currentDate.getSeconds() : null;

    const $t = Locale.t;

    return (
      <div
        ref="root"
        className="el-time-panel">
        <div className={this.classNames('el-time-panel__content', { 'has-seconds': isShowSeconds })}>
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
        <div className="el-time-panel__footer">
          {
            isShowCurrent ?
              <button
                type="button"
                disabled={currentButtonDisabled}
                className={this.className('el-time-panel__btn confirm', {'disabled' : currentButtonDisabled})}
                onClick={this.handleCurrent}>{$t('el.datepicker.now')}
              </button>
              :
              null
          }
          <button
            type="button"
            className="el-time-panel__btn cancel"
            onClick={this.handleCancel}>{$t('el.datepicker.cancel')}
          </button>
          <button
            type="button"
            disabled={confirmButtonDisabled}
            className={this.className('el-time-panel__btn confirm', {'disabled' : confirmButtonDisabled})}
            onClick={() => this.handleConfirm(false, true)}>{$t('el.datepicker.confirm')}
          </button>
        </div>
      </div>
    );
  }
}

TimePanel.isValid = (value, { selectableRange }) => {
  return isLimitRange(value, selectableRange, 'HH:mm:ss');
}
