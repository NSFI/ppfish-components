import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input/index.tsx';
import Icon from '../Icon/index.tsx';
import Trigger from 'rc-trigger';
import {HAVE_TRIGGER_TYPES, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS} from './constants';
import {Errors, require_condition} from './libs/utils';
import KEYCODE from '../../utils/KeyCode';
import {isValidValue, isValidValueArr, equalDateArr} from '../../utils/date';
import placements from './placements';
import isEqual from 'lodash/isEqual';

const haveTriggerType = (type) => {
  return HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};

const isInputValid = (text, date) => {
  if (text.trim() === '' || !isValidValue(date)) return false;
  return true;
};

const $type = Symbol('type');
class DateRangeBasePicker extends React.Component {

  static get propTypes() {
    return {
      className: PropTypes.string,
      startPlaceholder: PropTypes.string,
      endPlaceholder: PropTypes.string,
      separator: PropTypes.string,
      format: PropTypes.string,
      placement: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
      prefixCls: PropTypes.string,
      getPopupContainer: PropTypes.func,
      showTrigger: PropTypes.bool,
      allowClear: PropTypes.bool,
      disabled: PropTypes.bool,
      esc: PropTypes.bool,
      value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onVisibleChange: PropTypes.func,
      style: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      separator: '至',
      placement: 'bottomLeft',
      prefixCls: 'fishd',
      showTrigger: true,
      allowClear: true,
      disabled: false,
      esc: true,
      onFocus: () => {},
      onBlur: () => {},
      onChange: () => {},
      onVisibleChange: () => {}
    };
  }

  static dateToStr(date, type, format, separator) {
    if (!date || !isValidValue(date)) return '';
    const tdate = date;
    const formatter = (
      TYPE_VALUE_RESOLVER_MAP['date']
    ).formatter;
    const result = formatter(tdate, format || DEFAULT_FORMATS[type], separator);
    return result;
  }


  static propToState({ value,format,separator },state) {

    const type = state[$type];
    return {
      value: value && isValidValueArr(value) ? value : null,
      text:
        value && isValidValueArr(value)
          ? [
            DateRangeBasePicker.dateToStr(value[0], type, format, separator),
            DateRangeBasePicker.dateToStr(value[1], type, format, separator)
          ]
          : "",
      confirmValue: value && isValidValueArr(value) ? value : null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 只 value 受控
    if ('value' in nextProps && !isEqual(prevState.prevPropValue, nextProps.value)) {
      let state = DateRangeBasePicker.propToState(nextProps, prevState);
      state.prevPropValue = nextProps.value;
      return state;
    }
    return null;
  }

  constructor(props, _type, state) {
    require_condition(typeof _type === 'string');
    super(props);

    this.type = _type;
    this.inputClick = false;
    this.state = {
      pickerVisible: false,
      value: props.value && isValidValueArr(props.value) ? props.value : null,
      text: (
        props.value && isValidValueArr(props.value) ?
        [this.dateToStr(props.value[0]), this.dateToStr(props.value[1])] : ''
      ),
      // 增加一个confirmValue记录每次确定的值，当点击"取消"或者空白处时，恢复这个值
      confirmValue: props.value && isValidValueArr(props.value) ? props.value : null
    };
  }

  isDateValid(date) {
    return date === null || isValidValueArr(date);
  }

  pickerPanel(state, props) {
    throw new Errors.MethodImplementationRequiredError(props);
  }

  getFormatSeparator() {
    return undefined;
  }

  onError() {
    return undefined;
  }

  onPicked = (value, isKeepPannel = false, isConfirmValue = true) => {
    // 当为日期范围选择面板时，把结束时间默认设置为23:59:59:999
    if(this.type == 'daterange' && value && value.length === 2) {
      value[1] = new Date(value[1].setHours(23,59,59,999));
    }

    this.setState({
      pickerVisible: isKeepPannel,
      value,
      text: value && value.length === 2 ? [this.dateToStr(value[0]), this.dateToStr(value[1])] : '',
    }, ()=> {
      this.props.onVisibleChange(isKeepPannel);
    });

    if (isConfirmValue) {
      this.setState({
        confirmValue: value
      });
      this.props.onChange(value);
    }
  }

  onCancelPicked = () => {
    this.setState({
      pickerVisible: false,
      value: this.state.confirmValue && this.state.confirmValue.length === 2 ? this.state.confirmValue : null,
      text: (
        this.state.confirmValue && this.state.confirmValue.length === 2 ?
        [this.dateToStr(new Date(this.state.confirmValue[0])), this.dateToStr(new Date(this.state.confirmValue[1]))] : ''
      )
    }, ()=> {
      this.props.onVisibleChange(false);
    });
  }

  getFormat() {
    return this.props.format || DEFAULT_FORMATS[this.type];
  }

  dateToStr = (date) => {
    return DateRangeBasePicker.dateToStr(date, this.type, this.getFormat(), this.getFormatSeparator());
  }

  parseDate = (dateStr) => {
    if (!dateStr) return null;
    const type = this.type;
    const parser = (
      TYPE_VALUE_RESOLVER_MAP['date']
    ).parser;
    return parser(dateStr, this.getFormat(), this.getFormatSeparator());
  }

  togglePickerVisible() {
    this.setState({
      pickerVisible: !this.state.pickerVisible
    }, ()=> {
      this.props.onVisibleChange(!this.state.pickerVisible);
    });
  }

  // 聚焦
  handleFocus = (e) => {
    this.props.onFocus(e);
  }

  // 失焦
  handleBlur = (e) => {
    this.props.onBlur(e);
  }

  // 键盘事件
  handleKeydown = (evt) => {
    const keyCode = evt.keyCode;
    // esc
    if (this.props.esc && keyCode === KEYCODE.ESC) {
      this.setState({
        pickerVisible: false
      }, ()=> {
        this.props.onVisibleChange(false);
      });
      this.refInputRoot.blur();
      evt.stopPropagation();
    }
    // enter
    if (keyCode === KEYCODE.ENTER) {
      this.setState({
        pickerVisible: false
      }, ()=>{
        this.saveValidInputValue();
      });
      this.refInputRoot.blur();
    }
  }

  // 点击清空图标
  handleClickCloseIcon = (e) => {
    e && e.stopPropagation();
    const {disabled, allowClear} = this.props;
    const {text} = this.state;

    if (disabled || !allowClear) return;
    if (!text) {
      this.togglePickerVisible();
    } else {
      this.setState({
          text: '',
          value: null,
          pickerVisible: false,
          confirmValue: null
      },()=> {
        this.props.onVisibleChange(false);
        this.props.onChange(null);
      });
    }
  }

  // 面板打开或关闭的回调
  onVisibleChange = (visible) => {
    if(this.inputClick && !visible){
      this.inputClick = false;
      return;
    }
    this.inputClick = false;

    this.setState({
      pickerVisible: visible,
    }, () => {
      if(!visible) {
        this.saveValidInputValue();
      }else{
        this.props.onVisibleChange(visible);
      }
    });
  }

  // 保存合法的输入值
  saveValidInputValue = () => {
    const {value, confirmValue} = this.state;

    if(value && value.length === 2 && this.onError) {
      const error = this.onError([value[0], value[1]]);
      if(error) {
        this.setState({
          pickerVisible: error,
        });
        return;
      }
    }

    if (this.isDateValid(value) && !equalDateArr(value, confirmValue)) {
      this.onPicked(value, false, true);
    }else{
      this.onCancelPicked();
    }
  }

  render() {
    const {
      startPlaceholder,
      endPlaceholder,
      separator,
      showTrigger,
      allowClear,
      disabled,
      className,
      placement,
      prefixCls,
      getPopupContainer,
      style
    } = this.props;
    const {pickerVisible, value, text} = this.state;

    const calcIsShowTrigger = () => {
      if (showTrigger !== null) {
        return !!showTrigger;
      } else {
        return haveTriggerType(this.type);
      }
    };

    const triggerClass = () => {
      return this.type.includes('date') || this.type.includes('week') ? 'date-line' : 'time-line';
    };

    // 前缀图标
    const prefixIcon = () => {
      if (calcIsShowTrigger()) {
        return (
          <Icon
            className={classNames(`${prefixCls}-date-picker-icon`, 'prefix-iconfont')}
            type={triggerClass()}
          />
        );
      } else {
        return null;
      }
    };

    // 后缀图标
    const suffixIcon = () => {
      if (text && allowClear) {
        return (
          <Icon
            className={classNames(`${prefixCls}-date-picker-icon`, 'suffix-iconfont')}
            type="close-circle-fill"
            onClick={this.handleClickCloseIcon}
          />
        );
      } else {
        return null;
      }
    };

    // 下拉面板
    const getPickerPanel = () => {
      return this.pickerPanel(this.state);
    };

    // 选择框
    const getInputPanel = () => {
      return (
        <span
          className={classNames(`${prefixCls}-date-editor`, className, {
            'is-have-trigger': calcIsShowTrigger(),
            'is-active': pickerVisible,
            'is-filled': !!value,
            'is-disable': disabled
          })}
          style={{...style}}
          onClick={() => this.inputClick = true}
        >
          <div className={classNames(`${prefixCls}-date-editor--${this.type}`, {
            'is-active': pickerVisible,
            'disabled': disabled
          })}>
            <Input
              disabled={disabled}
              type="text"
              placeholder={startPlaceholder}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeydown}
              onChange={e => {
                const inputValue = e.target.value;
                const ndate = this.parseDate(inputValue);
                if (!isInputValid(inputValue, ndate)) {
                  this.setState({
                    text: [inputValue, this.state.text[1]],
                    pickerVisible: true
                  });
                } else {//only set value on a valid date input
                  this.setState({
                    text: [inputValue, this.state.text[1]],
                    value: [ndate, this.state.value[1]],
                    pickerVisible: true
                  });
                }
              }}
              ref={e => this.refInputRoot = e}
              value={text && text.length == 2 ? text[0] : ''}
              prefix={prefixIcon()}
            />
            <span className={classNames("range-separator", {'disabled': disabled})}>{separator}</span>
            <Input
              className={`${prefixCls}-date-range-picker-second-input`}
              disabled={disabled}
              type="text"
              placeholder={endPlaceholder}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeydown}
              onChange={e => {
                const inputValue = e.target.value;
                const ndate = this.parseDate(inputValue);
                if (!isInputValid(inputValue, ndate)) {
                  this.setState({
                    text: [this.state.text[0], inputValue],
                    pickerVisible: true
                  });
                } else {//only set value on a valid date input
                  this.setState({
                    text: [this.state.text[0], inputValue],
                    value: [this.state.value[0], ndate],
                    pickerVisible: true
                  });
                }
              }}
              value={text && text.length == 2 ? text[1] : ''}
              suffix={suffixIcon()}
            />
          </div>
        </span>
      );
    };

    return (
      <Trigger
        action={disabled ? [] : ['click']}
        builtinPlacements={placements}
        ref={node => this.trigger = node}
        getPopupContainer={getPopupContainer}
        onPopupVisibleChange={this.onVisibleChange}
        popup={getPickerPanel()}
        popupPlacement={placement}
        popupVisible={pickerVisible}
        prefixCls={`${prefixCls}-date-time-picker-popup`}
        destroyPopupOnHide={true}
      >
        {getInputPanel()}
      </Trigger>
    );
  }
}

export default DateRangeBasePicker;
