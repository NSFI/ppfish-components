import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Input from '../Input';
import Icon from '../Icon/index.tsx';
import { MountBody } from './MountBody';
import { PLACEMENT_MAP, HAVE_TRIGGER_TYPES, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import { Component } from './libs';
import { EventRegister } from './libs/internal';
import { Errors, require_condition, IDGenerator } from './libs/utils';
import KEYCODE from '../../utils/KeyCode';

import 'element-theme-default/lib/date-picker.css';

const idGen = new IDGenerator();
const haveTriggerType = (type) => {
  return HAVE_TRIGGER_TYPES.indexOf(type) !== -1
};
const isValidValue = (value) => {
  if (value instanceof Date) return true;
  if (Array.isArray(value) && value.length !== 0 && value[0] instanceof Date) return true;
  return false
};
// only considers date-picker's value: Date or [Date, Date]
const valueEquals = function (a, b) {
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);

  let isEqual = (a, b)=>{ // equal if a, b date is equal or both is null or undefined
    let equal = false;
    if (a && b) equal = a.getTime() === b.getTime();
    else equal = a === b && a == null
    return equal
  };
  if (aIsArray && bIsArray) {
    return isEqual(a[0], b[0]) && isEqual(a[1], b[1])
  }
  if (!aIsArray && !bIsArray) {
    return isEqual(a, b)
  }
  return false;
};

export default class BasePicker extends Component {

  static get propTypes() {
    return {
      align: PropTypes.oneOf(['left', 'center', 'right']),
      format: PropTypes.string,
      isShowTrigger: PropTypes.bool,
      isReadOnly: PropTypes.bool,
      isDisabled: PropTypes.bool,
      placeholder: PropTypes.string,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      // (Date|Date[]|null)=>(), null when click on clear icon
      onChange: PropTypes.func,
      // time select pannel:
      value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.arrayOf(PropTypes.instanceOf(Date))
      ])
    }
  }

  static get defaultProps() {
    return {
      value: null,
      onFocus: () => {},
      onBlur: () =>{},
    }
  }

  constructor(props, _type, state) {
    require_condition(typeof _type === 'string');
    super(props);

    this.type = _type; // type need to be set first
    this.state = Object.assign({}, state, {
      pickerVisible: false,
      confirmValue: props.value // 增加一个confirmValue记录每次确定的值，当点击"取消"或者空白处时，恢复这个值
    }, this.propsToState(props));

    this.clickOutsideId = 'clickOutsideId_' + idGen.next();
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

  // ---: start, abstract methods
  // (state, props)=>ReactElement
  pickerPanel(state, props) {
    throw new Errors.MethodImplementationRequiredError(props);
  }

  getFormatSeparator() {
    return undefined;
  }
  // ---: end, abstract methods

  componentWillReceiveProps(nextProps) {
    this.setState(this.propsToState(nextProps));
  }

  /**
   * onPicked should only be called from picker pannel instance
   * and should never return a null date instance
   *
   * @param value: Date|Date[]|null
   * @param isKeepPannel: boolean = false
   */
  onPicked = (value, isKeepPannel, isConfirmValue) => {//only change input value on picked triggered
    //let hasChanged = !valueEquals(this.state.value, value);
    this.setState({
      pickerVisible: isKeepPannel,
      value,
      text: this.dateToStr(value)
    });

    if(isConfirmValue) {
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
      value: this.state.confirmValue ? new Date(this.state.confirmValue) : null,
      text: this.state.confirmValue ? this.dateToStr(new Date(this.state.confirmValue)) : ''
    });
  }

  dateToStr(date) {
    if (!isValidValue(date)) return '';
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
    return this.props.format || DEFAULT_FORMATS[this.type]
  }

  triggerClass() {
    return this.type.includes('time') ? 'shangjiantou' : 'xiajiantou';
  }

  calcIsShowTrigger() {
    if (this.props.isShowTrigger != null) {
      return !!this.props.isShowTrigger;
    } else {
      return haveTriggerType(this.type);
    }
  }

  togglePickerVisible() {
    this.setState({
      pickerVisible: !this.state.pickerVisible
    })
  }

  isDateValid(date) {
    return date == null || isValidValue(date)
  }

  // return true on condition
  //  * input is parsable to date
  //  * also meet your other condition
  isInputValid(value) {
    const parseable = this.parseDate(value);
    if (!parseable) {
      return false
    }

    const isdatevalid = this.isDateValid(parseable);
    if (!isdatevalid) {
      return false
    }
    return true
  }

  // 聚焦
  handleFocus = () => {
    this.isInputFocus = true;
    if (haveTriggerType(this.type) && !this.state.pickerVisible) {
      this.setState({ pickerVisible: true }, () => {
        this.props.onFocus(this);
      })
    }
  }

  // 失焦
  handleBlur = () => {
    this.isInputFocus = false;
    this.props.onBlur(this);
  }

  validatorAndSetValue = (value) => {
    if (this.isDateValid(value)) {
      this.onPicked(value, false, true);
    } else {
      this.onCancelPicked();
    }
  }

  // 键盘事件
  handleKeydown = (evt) => {
    const keyCode = evt.keyCode;
    // tab esc
    if (keyCode === KEYCODE.TAB || keyCode === KEYCODE.ESC) {
      this.setState({ pickerVisible: false });
      evt.stopPropagation();
    }
    // enter
    if (keyCode === KEYCODE.ENTER) {
      this.validatorAndSetValue(evt.target.value);
    }
  }

  // 点击空白区域
  handleClickOutside = (evt) => {
    const { value, pickerVisible } = this.state;
    if (!this.isInputFocus && !pickerVisible) {
      return;
    }
    if (this.domRoot.contains(evt.target)) return;
    if (this.pickerProxy && this.pickerProxy.contains(evt)) return;
    this.validatorAndSetValue(value);
  }

  // 点击清空图标
  handleClickCloseIcon = () => {
    const { isReadOnly, isDisabled } = this.props;
    const { text } = this.state;

    if (isReadOnly || isDisabled) return;
    if (!text) {
      this.togglePickerVisible()
    } else {
      this.setState(
        {
          text: '',
          value: null,
          pickerVisible: false,
          confirmValue: null
        }
      );
      this.props.onChange(null);
      this.context.form && this.context.form.onFieldChange();
    }
  }

  render() {
    const { isReadOnly, placeholder, isDisabled } = this.props;
    const { pickerVisible, value, text } = this.state;

    const prefixIcon = () => {
      if(this.calcIsShowTrigger()) {
        return (
          <Icon
            type={this.triggerClass()}
          />
        )
      }else{
        return null;
      }
    };

    const suffixIcon = () => {
      if(text) {
        return (
          <Icon
            type="filter"
            onClick={this.handleClickCloseIcon}
          />
        )
      }else{
        return null;
      }
    };

    const createPickerPanel = () => {
      if (pickerVisible) {
        /* eslint-disable */
        let {placeholder, onFocus, onBlur, onChange, ...others} = this.props;
        /* eslint-enable */
        return (
          <MountBody ref={e => this.pickerProxy = e}>
            {
              this.pickerPanel(
                this.state,
                {
                  ...others,
                  ... {
                    getPopperRefElement: () => ReactDOM.findDOMNode(this.refs.inputRoot),
                    popperMixinOption: {
                      placement: PLACEMENT_MAP[this.props.align] || PLACEMENT_MAP.left
                    }
                  }
                }
              )
            }
          </MountBody>
        )
      } else {
        return null
      }
    };

    return (
      <span
        className={this.classNames('el-date-editor', {
          'is-have-trigger': this.calcIsShowTrigger(),
          'is-active': pickerVisible,
          'is-filled': !!value
        })}

        ref={v => this.domRoot = v}
      >

        <EventRegister
          id={this.clickOutsideId}
          target={document}
          eventName="click"
          func={this.handleClickOutside} />

        <Input
          className={this.classNames(`el-date-editor el-date-editor--${this.type}`)}
          readOnly={isReadOnly}
          disabled={isDisabled}
          type="text"
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeydown}
          onChange={e => {
            const iptxt = e.target.value;
            const nstate = { text: iptxt };
            if (iptxt.trim() === '' || !this.isInputValid(iptxt)) {
              nstate.value = null;
            } else {//only set value on a valid date input
              nstate.value = this.parseDate(iptxt);
            }
            this.setState(nstate)
          }}
          ref="inputRoot"
          value={text}
          prefix={prefixIcon()}
          suffix={suffixIcon()}
        />

        {createPickerPanel()}
      </span>
    )
  }
}

BasePicker.contextTypes = {
  form: PropTypes.any
};
