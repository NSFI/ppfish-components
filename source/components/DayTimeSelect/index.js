import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.less';

const formatInitTimeRange = (arr, defaultValue) => {
  let rangeArr = [];
  let startTime = arr[0];
  let endTime = arr[1];
  for(startTime; startTime <= endTime; startTime += 1){
    rangeArr.push({
      value: parseInt(startTime),
      isChecked: defaultValue.indexOf(parseInt(startTime)) >= 0
    });
  }
  return rangeArr;
};

const getSelectTimeArr = (timeRangeArr) => {
  let result = [];
  let arr = timeRangeArr.filter((each)=>each.isChecked === true);
  for (let item of arr) {
    result.push(item.value);
  }
  return result;
};

class DayTimeSelect extends Component {

  static propTypes = {
    timeRange: PropTypes.array,  // 选择时间范围
    value: PropTypes.array,      // 默认值
    disable: PropTypes.bool,     // 是否禁用
    onChange: PropTypes.func,    // 时间发生变化的回调
  };

  static defaultProps = {
    timeRange: [1,24],
    value: [],
    disable: false,
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      timeRangeArr: formatInitTimeRange(this.props.timeRange, this.props.value)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        timeRangeArr: formatInitTimeRange(nextProps.timeRange, nextProps.value)
      });
    }
  }

  handleClick(item) {
    if(this.props.disable){
      return;
    }
    const { timeRangeArr } = this.state;
    let arr = timeRangeArr.slice();
    arr.filter((each)=>each.value == item.value)[0].isChecked = !item.isChecked;
    this.setState({
      timeRangeArr: arr
    }, () => {
      this.props.onChange(getSelectTimeArr(timeRangeArr));
    });
  }

  render() {
    const { timeRangeArr } = this.state;
    const { disable } = this.props;
    return (
      <div className="day-time-select">
        <ul>
          {
            timeRangeArr.map((each)=>
              <li key={each.value}
                  className={"day-time-select-item " + (!each.isChecked ? "": "checked") + (!disable ? "" : " disabled")}
                  onClick={this.handleClick.bind(this, each)}
              >
                <span>{each.value + ':00'}</span>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default DayTimeSelect;
