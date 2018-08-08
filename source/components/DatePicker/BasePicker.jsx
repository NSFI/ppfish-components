import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input';
import Icon from '../Icon/index.tsx';
import { MountBody } from './MountBody';
import { PLACEMENT_MAP, HAVE_TRIGGER_TYPES, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import { EventRegister } from './libs/internal';
import { Errors, require_condition, IDGenerator } from './libs/utils';
import KEYCODE from '../../utils/KeyCode';
import { isValidValue } from '../../utils/date';

const idGen = new IDGenerator();
const haveTriggerType = (type) => {
  return HAVE_TRIGGER_TYPES.indexOf(type) !== -1
};
const isInputValid = (text, date) => {
  if(text.trim() === '' || !isValidValue(date)) return false;
  return true;
}

export default class BasePicker extends React.Component {

  static get propTypes() {
    return {
      placeholder: PropTypes.string,
      format: PropTypes.string,
      align: PropTypes.oneOf(['left', 'right']),
      isShowTrigger: PropTypes.bool,
      isAllowClear: PropTypes.bool,
      isDisabled: PropTypes.bool,
      value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.arrayOf(PropTypes.instanceOf(Date))
      ]),
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
    }
  }

  static get defaultProps() {
    return {
      placeholder: '',
      align: 'left',
      isShowTrigger: true,
      isAllowClear: true,
      isDisabled: false,
      value: null,
      onFocus: () => {},
      onBlur: () =>{},
      onChange: () => {},
    }
  }

  constructor(props, _type, state) {
    require_condition(typeof _type === 'string');
    super(props);

    this.type = _type; // type need to be set first
    this.state = Object.assign({}, state, {
      pickerVisible: false,
      confirmValue: props.value, // 增加一个confirmValue记录每次确定的值，当点击"取消"或者输入不合法时，恢复这个值
    }, this.propsToState(props))

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


  isDateValid(date) {
    return date == null || isValidValue(date);
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
  onPicked = (value, isKeepPannel=false, isConfirmValue=true) => {//only change input value on picked triggered
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
    return this.props.format || DEFAULT_FORMATS[this.type]
  }

  triggerClass() {
    return this.type.includes('time') ? 'time-line' : 'date-line';
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
      if (this.isDateValid(this.state.value)) {
        this.onPicked(this.state.value, false, true);
        this.refs.inputRoot.blur();
      }
    }
  }

  // 点击空白区域
  handleClickOutside = (evt) => {
    const { value, pickerVisible } = this.state;
    if (!this.isInputFocus && !pickerVisible) {
      return
    }
    if (this.domRoot.contains(evt.target)) return;
    if (this.pickerProxy && this.pickerProxy.contains(evt)) return;

    if (this.isDateValid(value)) {
      this.onPicked(value, false, true);
    } else {
      this.onCancelPicked();
    }
  }

  // 点击清空图标
  handleClickCloseIcon = () => {
    const { isDisabled, isAllowClear } = this.props;
    const { text } = this.state;

    if (isDisabled || !isAllowClear) return;
    if (!text) {
      this.togglePickerVisible();
    } else {
      this.setState(
        {
          text: '',
          value: null,
          pickerVisible: false,
          confirmValue: null
        },() => {
          this.props.onChange(null);
          this.context.form && this.context.form.onFieldChange();
        }
      );
    }
  }

  render() {
    const { isAllowClear, placeholder, isDisabled } = this.props;
    const { pickerVisible, value, text } = this.state;

    const prefixIcon = () => {
      if(this.calcIsShowTrigger()) {
        return (
          <Icon
            className="prefix-iconfont"
            type={this.triggerClass()}
          />
        )
      }else{
        return null;
      }
    };

    const suffixIcon = () => {
      if(text && isAllowClear) {
        return (
          <Icon
            className="suffix-iconfont"
            type="close-circle-fill"
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
          <MountBody ref={e => this.pickerProxy = e} getPopupContainer={() => this.domRoot}>
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
        className={classNames('fishd-date-editor', {
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
          func={this.handleClickOutside}
        />

        <Input
          className={classNames(`fishd-date-editor fishd-date-editor--${this.type}`)}
          disabled={isDisabled}
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
              })
            } else {//only set value on a valid date input
              this.setState({
                text: inputValue,
                value: ndate
              })
            }
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
