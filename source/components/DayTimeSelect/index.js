import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.less';

const formatInitTimeRange = (arr, defaultValue) => {
  let rangeArr = [];
  let startTime = arr[0];
  let endTime = arr[1];
  for(startTime; startTime <= endTime; startTime += 1){
    rangeArr.push({
      value: startTime,
      isChecked: defaultValue.indexOf(startTime) >= 0
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
    timeRange: PropTypes.array,
    defaultValue: PropTypes.array,
    disable: PropTypes.bool,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      timeRangeArr: formatInitTimeRange(this.props.timeRange, this.props.defaultValue)
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
                  className={"day-time-select-item " + (!each.isChecked ? "": "checked") + (!disable ? "" : "disabled")}
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
