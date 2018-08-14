import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Scrollbar } from '../scrollbar';
import scrollIntoView from 'dom-scroll-into-view';

export default class TimeSelectPanel extends React.Component {

  static get propTypes() {
    return {
      value: PropTypes.string,                   //base
      onPicked: PropTypes.func.isRequired,       //base
      start: PropTypes.string,
      end: PropTypes.string,
      step: PropTypes.string,
      minTime: PropTypes.string,
      maxTime: PropTypes.string,
      dateParser: PropTypes.func.isRequired,
    }
  }

  static get defaultProps() {
    return {
      start: '09:00',
      end: '18:00',
      step: '00:30',
      minTime: '',
      maxTime: '',
      onPicked() { },
    }
  }

  constructor(props) {
    super(props);
  }

  isValid = (value) => {
    return TimeSelectPanel.isValid(value, this.props);
  }

  handleClick(item) {
    const { onPicked, dateParser } = this.props;
    if (!item.disabled) {
      onPicked(dateParser(item.value), false, true);
    }
  }

  items = () => {
    return getItems(this.props);
  }

  scrollToOption(className="selected") {
    const menu = this.timeSelectRoot.querySelector('.fishd-picker-panel__content');
    const selected = menu.getElementsByClassName(className)[0];
    selected && scrollIntoView(selected, menu,  {
      offsetTop: 74,
      alignWithTop: true,
    });
  }

  componentDidMount() {
    this.scrollToOption();
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this._timer);
    if (nextProps.value !== this.props.value) {
      this._timer = setTimeout(() => this.scrollToOption(), 0)
    }
  }

  render() {
    const { value } = this.props;

    return (
      <div
        ref={node => this.timeSelectRoot = node}
        className="fishd-picker-panel time-select">
        <Scrollbar wrapClass="fishd-picker-panel__content" noresize={true}>
          {
            this.items().map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={classNames('time-select-item', { selected: value === item.value, disabled: item.disabled })}
                  disabled={item.disabled}
                  onClick={() => this.handleClick(item)}
                >
                  {item.value}
                </div>
              )
            })
          }
        </Scrollbar>
      </div>
    )
  }
}

TimeSelectPanel.isValid = (value, { start, end, step, minTime, maxTime }) => {
  const items = getItems({ start, end, step, minTime, maxTime });
  return !!items.filter(e => !e.disabled).find(e => e.value === value)
}

const getItems = ({ start, end, step, minTime, maxTime }) => {
  const result = [];

  if (start && end && step) {
    let current = start;
    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        disabled: compareTime(current, minTime || '-1:-1') <= 0 || compareTime(current, maxTime || '100:100') >= 0
      });
      current = nextTime(current, step);
    }
  }
  return result;
}

const parseTime = function (time) {
  const values = (time || '').split(':');
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10);
    const minutes = parseInt(values[1], 10);

    return {
      hours,
      minutes
    };
  }
  /* istanbul ignore next */
  return null;
};

const compareTime = function (time1, time2) {
  const value1 = parseTime(time1);
  const value2 = parseTime(time2);

  const minutes1 = value1.minutes + value1.hours * 60;
  const minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};


const formatTime = function (time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
};

const nextTime = (time, step) => {
  const timeValue = parseTime(time);
  const stepValue = parseTime(step);

  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};
