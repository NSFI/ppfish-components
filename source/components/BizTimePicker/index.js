import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DatePicker, Popover, message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './index.less';

const { RangePicker } = DatePicker;

// 默认快速选择时间选项
const defaultQuickTimeOption = [
  { text: '今天', value: [moment(), moment()] },
  { text: '这个月', value: [moment(), moment().endOf('month')] },
];

// 默认时间传进来有两种格式：{ text: '今天', value: [moment(), moment()] } 或 [moment, moment]
const getValueFromDefaultTime = (defaultValue) => {
  let result = [];
  if(Array.isArray(defaultValue) && defaultValue.length === 2) {
    result = defaultValue;
  }else if(defaultValue instanceof Object && 'value' in defaultValue) {
    result = defaultValue.value;
  }
  return result;
};

const getShowDateFromValue = (value) => {
  let result = { text: null, value: null };
  if(value instanceof Object && 'text' in value && 'value' in value) {
    result = value;
  }else if(Array.isArray(value) && value.length === 2) {
    result = { text: value, value: value}
  }
  return result;
};

// const getShowDateFromValue = (value) => {
//   const [start, end] = value;
//   // value could be an empty array, then we should not reset showDate
//   if (!start && !end) {
//     return;
//   }
//   const newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
//   return [start, newEnd];
// };

class BizTimePicker extends React.Component {

  static propTypes = {
    prefixCls: PropTypes.string,         //前缀
    clickAreaStyle: PropTypes.object,   //点击区域的样式
    defaultValue: PropTypes.oneOfType([  //默认时间
      PropTypes.array,
      PropTypes.object,
    ]),
    value: PropTypes.array,              //value值
    quickTimeOption: PropTypes.array,  //快速选择时间选项
    maxDateRange: PropTypes.number,    //最大可选择的日期范围，单位 天
    dateFormat: PropTypes.string,      //日期展示格式
    allowClear: PropTypes.bool,        //是否显示日历的清除按钮
    open: PropTypes.bool,              //用于手动控制浮层显隐
    disabledDate: PropTypes.func,       //不可选择的日期
    onChange: PropTypes.func,           //时间发生变化的回调
    onOpenChange: PropTypes.func,       //弹出或关闭浮层的回调
  }

  static defaultProps = {
    prefixCls: 'biz-time-picker',
    clickAreaStyle: null,
    defaultValue: defaultQuickTimeOption[0],
    value: null,
    quickTimeOption: defaultQuickTimeOption,
    maxDateRange: null,
    dateFormat: "YYYY/MM/DD",
    allowClear: false,
    open: false,
    disabledDate: () => {},
    onChange: () => {},
    onOpenChange: ()=>{},
  }

  constructor(props) {
    super(props);
    const value = props.value || getValueFromDefaultTime(props.defaultValue) || [];
    if( value[0] && !moment.isMoment(value[0]) || !value[1] && moment.isMoment(value[1]) ) {
      throw new Error('The value/defaultValue of BizTimePicker must be a moment object array');
    }
    this.state = {
      value,
      showDate: getShowDateFromValue(props.value || props.defaultValue || []),
      open: props.open,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      this.setState({
        value,
        showDate: getShowDateFromValue(value) || this.state.showDate,
      });
    }
    if('open' in nextProps && this.props.open != nextProps.open){
      this.setState({
        open: nextProps.open,
      });
    }
  }

  handleQickTime(item) {
    this.setState({
      showDate: item,
      open: false,
    }, () => {
      this.props.onChange(item);
    });
  }

  handleCustomerTime = (date, dateString) => {
    const maxRange = this.props.maxDateRange;
    if(maxRange && maxRange > 0) {
      if(date.length === 2 && (date[1].valueOf() - date[0].valueOf()) / 86400000 + 1 > maxRange){
        message.error('最大选择范围不能超过'+maxRange+'天');
        return;
      }
    }
    const timeString = dateString[0] + ' ~ ' + dateString[1];
    this.setState({
      showDate: {
        text: timeString,
        value: timeString
      },
      open: false,
    }, () => {
      this.props.onChange(this.state.showDate);
    });
  }

  handleVisibleChange = (open) => {
    this.setState({ open },()=>{
      this.props.onOpenChange(this.state.open);
    });
  }

  render() {
    const {
      prefixCls,
      quickTimeOption,
      dateFormat,
      allowClear,
      disabledDate,
      clickAreaStyle,
    } = this.props;
    const { showDate, open, value } = this.state;

    const clickAreaIconClass = classNames({
      [`${prefixCls}-click-area-icon`]: true,
      'icon-active': open
    });

    const content = (
      <div className={`${prefixCls}-content`}>
        {
          quickTimeOption.map((item, index) =>
            <a
              className={(item.text === showDate.text) ? "quick-picker-item quick-picker-item-active" : "quick-picker-item"}
              key={`quick-item-${index}`}
              onClick={this.handleQickTime.bind(this, item)}>
              <span>{item.text}</span>
              {
                item.text === showDate.text ? <i className="iconfont icon-duigou" /> : null
              }
            </a>
          )
        }
        <div className={`${prefixCls}-customer-time`} ref="time-picker-customer-time">
          <div className={`${prefixCls}-customer-time-text`}>自定义时间</div>
          <RangePicker
            allowClear={allowClear}
            disabledDate={disabledDate}
            format={dateFormat}
            getCalendarContainer={()=>this.refs['time-picker-customer-time']}
            onChange={this.handleCustomerTime}
          />
        </div>
      </div>
    );

    return (
      <div className={`${prefixCls}-container`} ref="time-picker-container">
        <Popover
          placement="bottomLeft"
          content={content}
          trigger="click"
          visible={open}
          onVisibleChange={this.handleVisibleChange}
          getPopupContainer={()=>this.refs['time-picker-container']}
        >
          <div className={`${prefixCls}-click-area`} style={clickAreaStyle}>
            <span className={`${prefixCls}-click-area-text`}>{showDate.text}</span>
            <span className={clickAreaIconClass} >
              <i className="iconfont icon-xiajiantou" />
            </span>
          </div>
        </Popover>
      </div>
    );
  }
}

export default BizTimePicker;
