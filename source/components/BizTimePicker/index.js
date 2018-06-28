import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Popover, message } from 'antd';
import { formatTimestamp, getTimeFromTimestamp } from '../../utils';

import './index.less';

const { RangePicker } = DatePicker;

//默认快速选择时间选项
const defaultQuickTimeOption = [
  { text: '昨天', value: 1, endDate: '昨天' },
  { text: '过去7天', value: 7, endDate: '昨天' },
  { text: '过去30天', value: 30, endDate: '昨天' },
];

//默认时间传进来有两种格式：{ text: '昨天', value: 1, endDate: '昨天' } 或 [startTime, endTime]
const formatDefaultTime = (param) => {
  let result = { text: null, value: null };
  if(param instanceof Array){
    if(param.length === 2){
      const time = getTimeFromTimestamp(param[0],param[1]);
      result = { text: time, value: time };
    }
  }else if(param instanceof Object && 'text' in param && 'value' in param){
    result = param;
  }
  return result;
};

class BizTimePicker extends React.Component {

  static propTypes = {
    quickTimeOption: PropTypes.array,  //快速选择时间选项
    maxDateRange: PropTypes.number,    //最大可选择的日期范围，单位 天
    dateFormat: PropTypes.string,      //日期展示格式
    allowClear: PropTypes.bool,        //是否显示日历的清除按钮
    visible: PropTypes.bool,           //用于手动控制浮层显隐
    defaultTime: PropTypes.oneOfType([  //默认时间
      PropTypes.array,
      PropTypes.object,
    ]),
    clickAreaStyle: PropTypes.object,   //点击区域的样式
    disabledDate: PropTypes.func,       //不可选择的日期
    onChange: PropTypes.func,           //时间发生变化的回调
    onOpenChange: PropTypes.func,       //弹出或关闭浮层的回调
  }

  static defaultProps = {
    quickTimeOption: defaultQuickTimeOption,
    maxDateRange: null,
    dateFormat: "YYYY/MM/DD",
    allowClear: false,
    visible: false,
    defaultTime: null,
    clickAreaStyle: null,
    disabledDate: () => {},
    onChange: () => {},
    onOpenChange: ()=>{},
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.defaultTime ? formatDefaultTime(this.props.defaultTime) : formatDefaultTime(this.props.quickTimeOption[0]),
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.visible !== nextProps.visible){
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  handleQickTime(item) {
    this.setState({
      currentTime: item,
      visible: false,
    }, () => {
      this.props.onChange(formatTimestamp(item), item);
    });
  }

  handleCustomerTime(date, dateString) {
    const maxRange = this.props.maxDateRange;
    if(maxRange && maxRange > 0) {
      if(date.length === 2 && (date[1].valueOf() - date[0].valueOf()) / 86400000 + 1 > maxRange){
        message.error('最大选择范围不能超过'+maxRange+'天');
        return;
      }
    }
    const timeString = dateString[0] + ' ~ ' + dateString[1];
    this.setState({
      currentTime: {
        text: timeString,
        value: timeString
      },
      visible: false,
    }, () => {
      this.props.onChange(formatTimestamp(this.state.currentTime.value));
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible },()=>{
      this.props.onOpenChange(this.state.visible);
    });
  }

  render() {
    const {quickTimeOption, dateFormat, allowClear, disabledDate, clickAreaStyle} = this.props;
    const {currentTime, visible} = this.state;
    const content = (
      <div className="time-picker-content">
        {
          quickTimeOption.map((item, index) =>
            <a
              className={(item.text === currentTime.text)? "quick-picker-item quick-picker-item-active" : "quick-picker-item"}
              key={`quick-item-${index}`}
              onClick={this.handleQickTime.bind(this, item)}>
              <span>{item.text}</span>
              {
                item.text === currentTime.text ? <i className="iconfont icon-duigou" /> : null
              }
            </a>
          )
        }
        <div className="time-picker-customer-time" ref="time-picker-customer-time">
          <div className="time-picker-customer-time-text">自定义时间</div>
          <RangePicker
            allowClear={allowClear}
            disabledDate={disabledDate}
            format={dateFormat}
            getCalendarContainer={()=>this.refs['time-picker-customer-time']}
            onChange={this.handleCustomerTime.bind(this)}
          />
        </div>
      </div>
    );

    return (
      <div className="time-picker-container" ref="time-picker-container">
        <Popover
          placement="bottomLeft"
          content={content}
          trigger="click"
          visible={visible}
          onVisibleChange={this.handleVisibleChange.bind(this)}
          getPopupContainer={()=>this.refs['time-picker-container']}
        >
          <div className="time-picker-click-area" style={clickAreaStyle}>
            <span className="time-picker-click-area-text">{currentTime.text}</span>
            <span className={visible ? "time-picker-click-area-icon icon-active" : "time-picker-click-area-icon"} >
              <i className="iconfont icon-xiajiantou" />
            </span>
          </div>
        </Popover>
      </div>
    );
  }
}

export default BizTimePicker;
