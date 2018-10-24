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

const haveTriggerType = (type) => {
  return HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};
const isInputValid = (text, date) => {
  if (text.trim() === '' || !isValidValue(date)) return false;
  return true;
};

export default class BasePicker extends React.Component {

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
      value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.arrayOf(PropTypes.instanceOf(Date))
      ]),
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
      onFocus: () => {
      },
      onBlur: () => {
      },
      onChange: () => {
      },
      onVisibleChange: () => {
      }
    };
  }

  constructor(props, _type, state) {
    require_condition(typeof _type === 'string');
    super(props);

    this.type = _type; // type need to be set first
    this.state = Object.assign({}, state, {
      pickerVisible: false,
      lastRightActionIsInput: false,
      confirmValue: this.isDateValid(props.value) ? props.value : null, // 增加一个confirmValue记录每次确定的值，当点击"取消"或者输入不合法时，恢复这个值
    }, this.propsToState(props));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.propsToState(nextProps));
  }

  propsToState(props) {
    const state = {};
    if (this.isDateValid(props.value)) {
      state.text = this.dateToStr(props.value);
      state.value = props.value;
    } else {
      state.text = '';
      state.value = null;
    }
    return state;
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

  /**
   * onPicked should only be called from picker pannel instance
   * and should never return a null date instance
   *
   * @param value: Date|Date[]|null
   * @param isKeepPannel: boolean = false
   */
  onPicked = (value, isKeepPannel = false, isConfirmValue = true) => {
    this.setState({
      pickerVisible: isKeepPannel,
      value,
      text: this.dateToStr(value),
      lastRightActionIsInput: false,
    });

    if (isConfirmValue) {
      this.setState({
        confirmValue: value
      });
      this.props.onChange(value);
      this.context.form && this.context.form.onFieldChange();
    }
  }

  onCancelPicked = () => {
    this.setState({
      pickerVisible: false,
      lastRightActionIsInput: false,
      value: this.state.confirmValue ? this.state.confirmValue : null,
      text: this.state.confirmValue ? this.dateToStr(this.state.confirmValue) : ''
    });
  }

  dateToStr(date) {
    if (!date || !isValidValue(date)) return '';
    const tdate = date;
    const formatter = (
      TYPE_VALUE_RESOLVER_MAP[this.type] ||
      TYPE_VALUE_RESOLVER_MAP['default']
    ).formatter;
    const result = formatter(tdate, this.getFormat(), this.getFormatSeparator());
    return result;
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
    });
  }

  // 保存合法的输入值
  saveValidInputValue = () => {
    const {value, confirmValue} = this.state;

    if (this.isDateValid(value) && !equalDate(value, confirmValue)) {
      this.onPicked(value, false, true);
    }
  }

  // 聚焦
  handleFocus = (e) => {
    this.props.onFocus(e);
  }

  // 失焦
  handleBlur = (e) => {
    if (this.state.lastRightActionIsInput) {
      this.saveValidInputValue();
      this.setState({
        lastRightActionIsInput: false
      });
    }
    this.props.onBlur(e);
  }

  // 键盘事件
  handleKeydown = (evt) => {
    const keyCode = evt.keyCode;
    // tab esc
    if (keyCode === KEYCODE.TAB || keyCode === KEYCODE.ESC) {
      this.setState({pickerVisible: false});
      evt.stopPropagation();
    }
    // enter
    if (keyCode === KEYCODE.ENTER) {
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
          this.props.onChange(null);
          this.context.form && this.context.form.onFieldChange();
        }
      );
    }
  }

  // 面板打开关闭的回调
  onVisibleChange = (visible) => {
    this.setState({
      pickerVisible: visible
    }, () => {
      this.props.onVisibleChange(visible);
    });
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
            className="prefix-iconfont"
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
            className="suffix-iconfont"
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
        >

        <Input
          className={classNames(`${prefixCls}-date-editor--${this.type}`)}
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
                text: inputValue
              });
            } else {//only set value on a valid date input
              this.setState({
                text: inputValue,
                value: ndate,
                lastRightActionIsInput: true
              });
            }
          }}
          ref="inputRoot"
          value={text}
          prefix={prefixIcon()}
          suffix={suffixIcon()}
        />
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

BasePicker.contextTypes = {
  form: PropTypes.any
};
