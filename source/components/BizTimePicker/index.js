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
  { text: '这个月', value: [moment(), moment().endOf('month')] }
];

// 时间传进来有两种格式：{ text: '今天', value: [moment(), moment()] } 或 [moment, moment]
const getValueFromTime = (value) => {
  let result = [];
  if(Array.isArray(value) && value.length === 2) {
    result = value;
  }else if(value instanceof Object && 'value' in value) {
    result = value.value;
  }
  return result;
};

const getShowDateFromValue = (value, format) => {
  let result = { text: null, value: null };
  if(value instanceof Object && 'text' in value && 'value' in value) {
    result = value;
  }else if(Array.isArray(value) && value.length === 2) {
    result = { text: `${value[0].format(format)} ~ ${value[1].format(format)}` , value: value};
  }
  return result;
};

class BizTimePicker extends React.Component {

  static propTypes = {
    className: PropTypes.string,          //选择器 className
    prefixCls: PropTypes.string,          //前缀
    clickAreaStyle: PropTypes.object,     //点击区域的样式
    quickTimeOption: PropTypes.array,     //快速选择时间选项
    defaultValue: PropTypes.oneOfType([   //默认时间
      PropTypes.array,
      PropTypes.object,
    ]),
    value: PropTypes.array,
    open: PropTypes.bool,               //用于手动控制浮层显隐
    disabled: PropTypes.bool,           //禁用
    maxDateRange: PropTypes.number,     //最大可选择的日期范围，单位 天
    onOpenChange: PropTypes.func,       //弹出或关闭浮层的回调
    onChange: PropTypes.func,
    format: PropTypes.string,
    disabledDate: PropTypes.func,
    renderExtraFooter: PropTypes.func,
    showTime: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    onOk: PropTypes.func,
    getPopupContainer: PropTypes.func
  }

  static defaultProps = {
    className: '',
    prefixCls: 'biz-time-picker',
    quickTimeOption: defaultQuickTimeOption,
    defaultValue: defaultQuickTimeOption[0],
    open: false,
    disabled: false,
    maxDateRange: null,
    onOpenChange: () => {},
    onChange: () => {},
    format: 'YYYY/MM/DD',
    disabledDate: () => {},
    renderExtraFooter: null,
    showTime: false,
    onOk: ()=>{}
  }

  constructor(props) {
    super(props);
    const value = getValueFromTime(props.value || props.defaultValue);
    if( value[0] && !moment.isMoment(value[0]) || !value[1] && moment.isMoment(value[1]) ) {
      throw new Error('The value/defaultValue of BizTimePicker must be a moment object array');
    }
    this.state = {
      showDate: getShowDateFromValue(props.value || props.defaultValue || props.quickTimeOption[0], props.format),
      open: props.open
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      this.setState({
        showDate: getShowDateFromValue(value, this.props.format) || this.state.showDate,
      });
    }
    if('open' in nextProps && this.props.open != nextProps.open){
      this.setState({
        open: nextProps.open,
      });
    }
  }

  // 快速时间选择
  handleQickTime(item) {
    this.setState({
      showDate: item,
      open: false,
    }, () => {
      this.props.onChange(this.state.showDate);
    });
  }

  // 自定义时间选择
  handleCustomerTimeChange = (date, dateString) => {
    const maxRange = this.props.maxDateRange;
    if(maxRange && maxRange > 0) {
      if(date.length === 2 && date[1].diff(date[0],'days') + 1 > maxRange) {
        message.error('最大选择范围不能超过'+maxRange+'天');
        return;
      }
    }
    const timeString = dateString[0] + ' ~ ' + dateString[1];

    // 不需要选时间时，直接关闭弹出层
    if(!this.props.showTime) {
      this.setState({
        open: false,
      });
    }

    this.setState({
      showDate: {
        text: timeString,
        value: date
      },
    }, () => {
      this.props.onChange(this.state.showDate);
    });
  }

  // 打开、关闭Popover
  handleVisibleChange = (open) => {
    if(!this.props.disabled) {
      this.setState({ open }, () => {
        this.props.onOpenChange(open);
      });
    }
  }

  // 点击时间选择的确定按钮
  handleClickOk = (value) => {
    this.setState({
      open: false,
    },() => {
      this.props.onOk(value);
    });
  }

  render() {
    const {
      className,
      prefixCls,
      quickTimeOption,
      clickAreaStyle,
      defaultValue,
      disabled,
      maxDateRange,
      onChange,
      onOpenChange,
      getPopupContainer,

      disabledDate,
      format,
      renderExtraFooter,
      showTime,
      onOk
    } = this.props;
    const { showDate, open } = this.state;

    const clickAreaClass = classNames({
      [`${prefixCls}-click-area`]: true,
      'disabled': disabled
    });
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
            allowClear={false}
            autoFocus={false}
            disabledDate={disabledDate}
            format={format}
            renderExtraFooter={renderExtraFooter}
            showTime={showTime}
            onOk={this.handleClickOk}
            value={showDate.value}
            getCalendarContainer={()=>this.refs['time-picker-customer-time']}
            onChange={this.handleCustomerTimeChange}
          />
        </div>
      </div>
    );

    return (
      <div className={[`${prefixCls}-container`, className].join(' ')} >
        <Popover
          placement="bottomLeft"
          trigger="click"
          content={content}
          visible={open}
          onVisibleChange={this.handleVisibleChange}
          getPopupContainer={getPopupContainer}
        >
          <div className={clickAreaClass} style={clickAreaStyle}>
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
