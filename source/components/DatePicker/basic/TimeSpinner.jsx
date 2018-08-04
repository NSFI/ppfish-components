import React from 'react';
import { debounce } from 'throttle-debounce';
import { PropTypes, Component } from '../libs';
import { getRangeHours } from '../utils';
import { Scrollbar } from '../scrollbar';

function range(end) {
  let r = [];
  for (let i = 0; i < end; i++) {
    r.push(i);
  }
  return r;
}

const isNumber = (value) => typeof value === 'number';
const validateHour = (value) => isNumber(value) && value >= 0 && value <= 23;
const validateMinOrSec = (value) => isNumber(value) && value >= 0 && value <= 59;

function propsToState(props) {
  const { hours, minutes, seconds, selectableRange } = props;
  const state = {};
  const setOnValid = (isValid, cb) => isValid && cb(state);
  setOnValid(validateHour(hours), state => state.hours = hours);
  setOnValid(validateMinOrSec(minutes), state => state.minutes = minutes);
  setOnValid(validateMinOrSec(seconds), state => state.seconds = seconds);
  state.hoursList = getRangeHours(selectableRange);
  state.minutesLisit = range(60);
  state.secondsList = range(60);
  return state;
}

const SCROLL_AJUST_VALUE = 85;
const calcScrollTop = value => Math.max(
  0,
  (value - 2.5) * 32 + SCROLL_AJUST_VALUE
)

export default class TimeSpinner extends Component {

  static get propTypes() {
    return {
      hours: PropTypes.number,
      minutes: PropTypes.number,
      seconds: PropTypes.number,
      isShowSeconds: PropTypes.bool,
      //[[datefrom, dateend]...]
      selectableRange: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.instanceOf(Date))
      ),
      /*
      type: one of [hours, minutes, seconds]
      onChange: ({type})=>()
      */
      onChange: PropTypes.func.isRequired,
      onSelectRangeChange: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isShowSeconds: true,
      onSelectRangeChange: ()=>{}
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    Object.assign(this.state, propsToState(props));
    this.ajustScrollTop = this._ajustScrollTop.bind(this);
    this.handleScroll = debounce(20, this._handleScroll.bind(this));
  }

  componentDidMount() {
    this.ajustScrollTop(this.state);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(propsToState(nextProps), () => {
      this.ajustScrollTop(this.state);
    });
  }

  emitSelectRange(type) {
    const { onSelectRangeChange } = this.props;
    if (type === 'hours') {
      onSelectRangeChange(0, 3);
    } else if (type === 'minutes') {
      onSelectRangeChange(3, 5);
    } else if (type === 'seconds') {
      onSelectRangeChange(6, 9);
    }
  }

  _handleScroll(_type) {
    const value = Math.min(
      Math.floor(
        (this.refs[_type].refs.wrap.scrollTop - SCROLL_AJUST_VALUE) / 32 + 3
      ),
      59
    );
    this.handleChange(_type, value);
  }

  // type: hours, minutes, seconds
  handleChange(type, value, disabled) {
    if (disabled) return;
    this.state[type] = value;
    const changed = {};
    changed[type] = value;
    this.setState({}, () => {
      this.ajustScrollTop(this.state);
    });
    this.props.onChange(changed);
  }

  _ajustScrollTop({ hours, minutes, seconds }) {
    if (hours != null) {
      this.refs.hours.refs.wrap.scrollTop = calcScrollTop(hours)
    }
    if (minutes != null) {
      this.refs.minutes.refs.wrap.scrollTop = calcScrollTop(minutes)
    }
    if (this.props.isShowSeconds && seconds != null) {
      this.refs.seconds.refs.wrap.scrollTop = calcScrollTop(seconds)
    }
  }

  render() {
    const {
      hoursList,
      minutesLisit,
      secondsList,
      hours,
      minutes,
      seconds
    } = this.state;
    const { isShowSeconds } = this.props;

    return (
      <div
        className={this.classNames('fishd-time-spinner', {
          'has-seconds': isShowSeconds
        })}
      >
        <Scrollbar
          onMouseEnter={() => this.emitSelectRange('hours')}
          onWheel={() => {
            this.handleScroll('hours');
          }}
          ref="hours"
          className="fishd-time-spinner__wrapper"
          wrapStyle={{ maxHeight: 'inherit' }}
          viewClass="fishd-time-spinner__list"
          viewComponent="ul"
        >
          {hoursList.map((disabled, idx) => {
            return (
              <li
                key={idx}
                onClick={() => this.handleChange('hours', idx, disabled)}
                className={this.classNames('fishd-time-spinner__item', {
                  active: idx === hours,
                  disabled: disabled
                })}
              >
                {idx}
              </li>
            );
          })}
        </Scrollbar>
        <Scrollbar
          onMouseEnter={() => this.emitSelectRange('minutes')}
          onWheel={() => this.handleScroll('minutes')}
          ref="minutes"
          className="fishd-time-spinner__wrapper"
          wrapStyle={{ maxHeight: 'inherit' }}
          viewClass="fishd-time-spinner__list"
          viewComponent="ul"
        >
          {minutesLisit.map((minute) => {
            return (
              <li
                key={minute}
                onClick={() => this.handleChange('minutes', minute)}
                className={this.classNames('fishd-time-spinner__item', {
                  active: minute === minutes
                })}
              >
                {minute}
              </li>
            );
          })}
        </Scrollbar>
        {isShowSeconds &&
        <Scrollbar
          onMouseEnter={() => this.emitSelectRange('seconds')}
          onWheel={() => this.handleScroll('seconds')}
          ref="seconds"
          className="fishd-time-spinner__wrapper"
          wrapStyle={{ maxHeight: 'inherit' }}
          viewClass="fishd-time-spinner__list"
          viewComponent="ul"
        >
          {secondsList.map((sec) => {
            return (
              <li
                key={sec}
                onClick={() => this.handleChange('seconds', sec)}
                className={this.classNames('fishd-time-spinner__item', {
                  active: sec === seconds
                })}
              >
                {sec}
              </li>
            );
          })}
        </Scrollbar>}
      </div>
    );
  }
}
