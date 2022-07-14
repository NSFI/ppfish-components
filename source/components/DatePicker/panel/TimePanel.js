import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TimeSpinner from '../basic/TimeSpinner.js';
import { limitRange, isLimitRange, parseDate } from '../../../utils/date';
import { DEFAULT_FORMATS } from '../constants';
import isEqual from 'lodash/isEqual';
import ConfigConsumer from '../../Config/Consumer';

const mapPropsToState = (props) => {
  const { format, value, selectableRange } = props;
  const state = {
    format: format || DEFAULT_FORMATS.time,
    currentDate: value || parseDate('00:00:00', DEFAULT_FORMATS.time),
    confirmButtonDisabled: value === null || !TimePanel.isValid(value, selectableRange),
    currentButtonDisabled: !isLimitRange(new Date(), selectableRange, DEFAULT_FORMATS.time)
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;

  return state;
};
class TimePanel extends React.Component {

  static get propTypes() {
    return {
      prefixCls: PropTypes.string,
      format: PropTypes.string,                  //basePicker
      value: PropTypes.instanceOf(Date),         //basePicker
      onPicked: PropTypes.func.isRequired,       //basePicker
      onCancelPicked: PropTypes.func.isRequired, //basePicker
      selectableRange: TimeSpinner.propTypes.selectableRange,
      onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange,
      isShowCurrent: PropTypes.bool,
      footer: PropTypes.func,
      onValueChange: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      prefixCls: 'fishd',
      isShowCurrent: false,
      onValueChange: ()=>{},
    };
  }

  static isValid = (value, selectableRange) => {
    return value === null || isLimitRange(value, selectableRange, DEFAULT_FORMATS.time);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if ("value" in nextProps && !isEqual(nextProps.value, prevState.prevPropValue)) {
      let state = mapPropsToState(nextProps);
      state.prevPropValue = nextProps.value;
      return state;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = mapPropsToState(props);
  }

  handleChange = (date) => {
    const { currentDate } = this.state;
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

    if(!TimePanel.isValid(newDate, this.props.selectableRange)){
      this.setState({
        confirmButtonDisabled: true,
        currentDate: newDate
      },()=> {
        this.props.onValueChange(newDate);
      });
    }else{
      this.setState({
        confirmButtonDisabled: false,
        currentDate: newDate
      }, () => {
        this.props.onValueChange(newDate);
        this.handleConfirm(true, false); //面板展开，不保存值
      });
    }
  }

  // 点击确定按钮
  handleConfirm = (isKeepPannelOpen, isConfirmValue) => {
    const { currentDate } = this.state;
    const { onPicked, selectableRange } = this.props;
    const date = new Date(limitRange(currentDate, selectableRange, DEFAULT_FORMATS.time));

    onPicked(date, isKeepPannelOpen, isConfirmValue);
  }

  // 点击取消按钮
  handleCancel = () => {
    this.props.onCancelPicked();
  }

  // 点击此刻按钮
  handleCurrent = () => {
    const { onPicked } = this.props;
    const value = new Date();
    onPicked(value, false, true);
  }

  render() {
    const {onSelectRangeChange, selectableRange, isShowCurrent, footer, prefixCls} = this.props;
    const {isShowSeconds, currentDate, confirmButtonDisabled, currentButtonDisabled} = this.state;

    const hours = currentDate ? currentDate.getHours() : null;
    const minutes = currentDate ? currentDate.getMinutes() : null;
    const seconds = currentDate ? currentDate.getSeconds() : null;

    return (
      <ConfigConsumer componentName="DatePicker">
        {
          (Locales) => (
            <div
              className={`${prefixCls}-picker-panel ${prefixCls}-time-panel`}
            >
              <div className={classNames(`${prefixCls}-time-panel__content`, { 'has-seconds': isShowSeconds })}>
                <TimeSpinner
                  isShowSeconds={isShowSeconds}
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                  selectableRange={selectableRange}
                  onSelectRangeChange={onSelectRangeChange}
                  onChange={this.handleChange}
                />
              </div>
              {
                typeof footer == 'function' && footer() && (
                  <div
                    className={`${prefixCls}-time-panel__extra-footer`}
                  >
                    {footer()}
                  </div>
                )
              }
              <div className={`${prefixCls}-time-panel__footer`}>
                <div>
                  {
                    isShowCurrent ?
                      <button
                        type="button"
                        disabled={currentButtonDisabled}
                        className={
                          classNames(`${prefixCls}-time-panel__btn confirm`, {'disabled' : currentButtonDisabled})
                        }
                        onClick={this.handleCurrent}>{Locales.now}
                      </button>
                      :
                      null
                  }
                </div>
                <div>
                  <button
                    type="button"
                    className={`${prefixCls}-time-panel__btn cancel`}
                    onClick={this.handleCancel}>{Locales.cancel}
                  </button>
                  <button
                    type="button"
                    disabled={confirmButtonDisabled}
                    className={classNames(`${prefixCls}-time-panel__btn confirm`, {'disabled' : confirmButtonDisabled})}
                    onClick={() => this.handleConfirm(false, true)}>{Locales.confirm}
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </ConfigConsumer>
    );
  }
}

export default TimePanel;
