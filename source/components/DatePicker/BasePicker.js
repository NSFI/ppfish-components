import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input/index.tsx';
import Icon from '../Icon/index.tsx';
import Trigger from 'rc-trigger';
import {HAVE_TRIGGER_TYPES, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS} from './constants';
import {Errors, require_condition} from './libs/utils';
import KEYCODE from '../../utils/KeyCode';
import {isValidValue, equalDate} from '../../utils/date';
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
class BasePicker extends React.Component {

  static get propTypes() {
    return {
      className: PropTypes.string,
      placeholder: PropTypes.string,
      format: PropTypes.string,
      placement: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
      prefixCls: PropTypes.string,
      getPopupContainer: PropTypes.func,
      showTrigger: PropTypes.bool,
      allowClear: PropTypes.bool,
      disabled: PropTypes.bool,
      esc: PropTypes.bool,
      value: PropTypes.instanceOf(Date),
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onVisibleChange: PropTypes.func,
      style: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      placeholder: '',
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      "value" in nextProps &&
      !isEqual(nextProps.value, prevState.prevPropValue)
    ) {
      const validDate = isValidValue(nextProps.value)
        ? nextProps.value
        : null;
      const text = isValidValue(nextProps.value)
        ? BasePicker.dateToStr(
            nextProps.value,
            prevState[$type],
            nextProps.format,
            nextProps.separator,// 这个值当前使用的是undefined
          )
        : "";
      let state = {
        value: validDate,
        text: text,
        // 增加一个confirmValue记录每次确定的值，当点击"取消"或者输入不合法时，恢复这个值
        confirmValue: validDate
      };
      state.prevPropValue = nextProps.value;
      return state;
    }
    return null;
  }

  static dateToStr(date, type, format, separator) {
    if (!date || !isValidValue(date)) return '';
    const tdate = date;
    const formatter = (
      TYPE_VALUE_RESOLVER_MAP[type] ||
      TYPE_VALUE_RESOLVER_MAP['default']
    ).formatter;
    const result = formatter(tdate, format || DEFAULT_FORMATS[type], separator);
    return result;
  }

  constructor(props, _type,  state) {
    require_condition(typeof _type === 'string');
    super(props);

    this.type = _type;
    this.inputClick = false;

    this.state = {
      [$type]: _type,
      pickerVisible: false,
      value: null,
      text: "",
      confirmValue: null
    };
  }

  isDateValid(date) {
    return date === null || isValidValue(date);
  }

  pickerPanel(state, props) {
    throw new Errors.MethodImplementationRequiredError(props);
  }

  getFormatSeparator() {
    return undefined;
  }

  onPicked = (value, isKeepPannel = false, isConfirmValue = true) => {
    this.setState({
      pickerVisible: isKeepPannel,
      value,
      text: this.dateToStr(value),
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
    const { confirmValue } = this.state;

    this.setState({
      pickerVisible: false,
      value: confirmValue ? confirmValue : null,
      text: confirmValue ? this.dateToStr(confirmValue) : ''
    }, ()=> {
      this.props.onVisibleChange(false);
    });
  }

  dateToStr(date) {
    return BasePicker.dateToStr(date, this.type, this.props.format, this.getFormatSeparator());
  }

  // (string) => Date | null
  parseDate(dateStr) {
    if (!dateStr) return null;
    const type = this.type;
    const parser = (
      TYPE_VALUE_RESOLVER_MAP[type] ||
      TYPE_VALUE_RESOLVER_MAP['default']
    ).parser;
    return parser(dateStr, this.getFormat(), this.getFormatSeparator());
  }

  getFormat() {
    return this.props.format || DEFAULT_FORMATS[this.type];
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
      this.refs.inputRoot.blur();
      evt.stopPropagation();
    }
    // enter
    if (keyCode === KEYCODE.ENTER) {
      this.setState({
        pickerVisible: false
      }, ()=>{
        this.saveValidInputValue();
      });
      this.refs.inputRoot.blur();
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
      this.setState(
        {
          text: '',
          value: null,
          pickerVisible: false,
          confirmValue: null
        }, () => {
          this.props.onVisibleChange(false);
          this.props.onChange(null);
        }
      );
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

    if (this.isDateValid(value) && !equalDate(value, confirmValue)) {
      this.onPicked(value, false, true);
    }else{
      this.onCancelPicked();
    }
  }

  render() {
    const {
      className,
      placeholder,
      placement,
      prefixCls,
      getPopupContainer,
      showTrigger,
      allowClear,
      disabled,
      style
    } = this.props;
    const {pickerVisible, value, text} = this.state;

    const triggerClass = () => {
      return this.type.includes('date') || this.type.includes('week') ? 'date-line' : 'time-line';
    };

    const calcIsShowTrigger = () => {
      if (showTrigger != null) {
        return !!showTrigger;
      } else {
        return haveTriggerType(this.type);
      }
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
          className={classNames(
            `${prefixCls}-date-editor`,
            className,
            {
              'is-have-trigger': calcIsShowTrigger(),
              'is-active': pickerVisible,
              'is-filled': !!value,
              'is-disable': disabled
            }
          )}
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
              placeholder={placeholder}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeydown}
              onChange={e => {
                const inputValue = e.target.value;
                const ndate = this.parseDate(inputValue);
                if (!isInputValid(inputValue, ndate)) {
                  this.setState({
                    text: inputValue,
                    pickerVisible: true
                  });
                } else {//only set value on a valid date input
                  this.setState({
                    text: inputValue,
                    value: ndate,
                    pickerVisible: true
                  });
                }
              }}
              ref="inputRoot"
              value={text}
              prefix={prefixIcon()}
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

export default BasePicker;
