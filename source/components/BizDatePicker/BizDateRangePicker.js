import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from '../Popover/index.tsx';
import { message } from 'antd';
import Icon from '../Icon/index.tsx';
import { DatePicker } from '../DatePicker';
import { formatDate, isValidValue, diffDate } from "../../utils/date/index";

// 默认快速选择时间选项
const defaultQuickTimeOption = [
  { text: '今天', value: [new Date(new Date().setHours(0,0,0,0)), new Date(new Date().setHours(23,59,59,59))]},
  { text: '过去7天', value: [new Date(new Date().setHours(0,0,0,0)-7*24*60*60*1000), new Date(new Date().setHours(23,59,59,59))] }
];

// value传进来有两种格式：{ text: '今天', value: [Date, Date] } 或 [Date, Date]
const getShowDateFromValue = (value, format) => {
  let result = { text: null, value: null };
  if(value instanceof Object && 'text' in value && 'value' in value) {
    result = value;
  }else if(isValidValue(value)) {
    result = { text: `${formatDate(value[0], format)} ~ ${formatDate(value[1], format)}`  , value: value};
  }
  return result;
};

class BizDatePicker extends React.Component {

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    format: PropTypes.string,
    quickTimeOption: PropTypes.array,
    defaultValue: PropTypes.object,
    value: PropTypes.object,
    open: PropTypes.bool,               //用于手动控制浮层显隐
    disabled: PropTypes.bool,
    isShowTime: PropTypes.bool,
    disabledDate: PropTypes.func,
    onOpenChange: PropTypes.func,       //弹出或关闭浮层的回调
    onChange: PropTypes.func,
    rangeSeparator: PropTypes.string,
    maxDateRange: PropTypes.number
  }

  static defaultProps = {
    prefixCls: 'biz-date-picker',
    className: '',
    format: 'yyyy-MM-dd',
    quickTimeOption: defaultQuickTimeOption,
    defaultValue: defaultQuickTimeOption[0],
    open: false,
    disabled: false,
    isShowTime: false,
    disabledDate: () => {},
    onOpenChange: () => {},
    onChange: () => {},
    maxDateRange: null
  }

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue;
    this.state = {
      showDate: getShowDateFromValue(value, props.format),
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
  handleCustomerTimeChange = (date) => {
    const maxRange = this.props.maxDateRange;
    if(maxRange && maxRange > 0) {
      if(diffDate(date[0], date[1]) + 1 > maxRange) {
        message.error('最大选择范围不能超过'+maxRange+'天');
        return;
      }
    }

    // 不需要选时间时，直接关闭弹出层
    if(!this.props.isShowTime) {
      this.setState({
        open: false,
      });
    }

    this.setState({
      showDate: {
        text: formatDate(date[0], this.props.format) + ' ~ ' + formatDate(date[1], this.props.format),
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

  render() {
    const {
      className,
      prefixCls,
      quickTimeOption,
      disabled,
      disabledDate,
      format,
      isShowTime,
      rangeSeparator
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
            <li
              className={classNames("quick-picker-item",{"is-active": item.text === showDate.text})}
              key={`quick-item-${index}`}
              onClick={this.handleQickTime.bind(this, item)}>
              <span>{item.text}</span>
              {
                item.text === showDate.text ? <Icon className="iconfont" type="check-line" /> : null
              }
            </li>
          )
        }
        <li className={`${prefixCls}-customer-time`}>
          <DatePicker.DateRangePicker
            format={format}
            isShowTrigger={true}
            isAllowClear={false}
            isShowTime={isShowTime}
            disabledDate={disabledDate}
            onChange={this.handleCustomerTimeChange}
            value={showDate.value}
            rangeSeparator={rangeSeparator}
          />
        </li>
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
          getPopupContainer={node => node.parentNode}
        >
          <div className={clickAreaClass}>
            <span className={`${prefixCls}-click-area-text`}>{showDate.text}</span>
            <span className={clickAreaIconClass} >
              <Icon
                className="iconfont"
                type="down-fill"
                onClick={this.handleClickCloseIcon}
              />
            </span>
          </div>
        </Popover>
      </div>
    );
  }
}

export default BizDatePicker;
