/**
 * Created by qingze
 * User: qingze
 * Date: 2017/10/25
 * Time: 下午7:41
 **/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {thousandSplit} from '../../utils';

class Counter extends Component {
  static propTypes = {
    commas: PropTypes.bool,
    timeout: PropTypes.number,
    steps: PropTypes.number,
    visible: PropTypes.bool,
    value: PropTypes.number
  };

  static defaultProps = {
    visible: true,
    commas: true, //是否使用千位分隔符 默认开启
    timeout: 500, //变化总时间
    steps: 10, //变化多少次数字
    value: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      visible: props.visible,
      targetValue: props.value,
      originalValue: props.value,
      currentValue: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      currentStep: 0,
      originalValue: this.state.currentValue || 0,
      targetValue: nextProps.value || 0
    });

    clearInterval(this._interval);

    this._interval = setInterval(() => {
      if (this.state.currentStep >= this.props.steps) {
        clearInterval(this._interval);
      }
      this.setState({
        currentValue: this.getValue(this.state.currentStep / this.props.steps),
        currentStep: this.state.currentStep + 1
      });
    }, this.props.timeout / this.props.steps);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  getValue(percent) {
    const diff = this.state.targetValue - this.state.originalValue;
    return (diff * percent) + this.state.originalValue;
  }

  render() {
    const {visible, currentValue} = this.state;
    if (!visible) {
      return null;
    }
    let value = Math.round(currentValue);
    if (this.props.commas) {
      value = thousandSplit(value);
    }
    return (
      <span className="counter">
        {value}
      </span>
    );
  }
}

export default Counter;
