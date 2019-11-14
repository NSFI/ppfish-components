function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Scrollbar } from '../scrollbar';
import debounce from 'lodash/debounce';
import { getRangeHours } from '../../../utils/date';

function range(end) {
  var r = [];

  for (var i = 0; i < end; i++) {
    r.push(i);
  }

  return r;
}

var isNumber = function isNumber(value) {
  return typeof value === 'number';
};

var validateHour = function validateHour(value) {
  return isNumber(value) && value >= 0 && value <= 23;
};

var validateMinOrSec = function validateMinOrSec(value) {
  return isNumber(value) && value >= 0 && value <= 59;
};

function propsToState(props) {
  var hours = props.hours,
      minutes = props.minutes,
      seconds = props.seconds,
      selectableRange = props.selectableRange;
  var state = {};

  var setOnValid = function setOnValid(isValid, cb) {
    return isValid && cb(state);
  };

  setOnValid(validateHour(hours), function (state) {
    return state.hours = hours;
  });
  setOnValid(validateMinOrSec(minutes), function (state) {
    return state.minutes = minutes;
  });
  setOnValid(validateMinOrSec(seconds), function (state) {
    return state.seconds = seconds;
  });
  state.hoursList = getRangeHours(selectableRange);
  state.minutesLisit = range(60);
  state.secondsList = range(60);
  return state;
}

var SCROLL_AJUST_VALUE = 85;

var calcScrollTop = function calcScrollTop(value) {
  return Math.max(0, (value - 2.5) * 32 + SCROLL_AJUST_VALUE);
};

var PROPS_MATTER = ['hours', "minutes", "seconds", "selectableRange"];

var propsChangeTester = function propsChangeTester(props, state) {
  return PROPS_MATTER.some(function (prop) {
    return state['__' + prop] !== props[prop];
  });
};

var propsChangeSaver = function propsChangeSaver(props, state) {
  return PROPS_MATTER.forEach(function (prop) {
    state['__' + prop] = props[prop];
  });
};

var TimeSpinner =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimeSpinner, _React$Component);

  _createClass(TimeSpinner, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // only props has changed
      if (propsChangeTester(nextProps, prevState)) {
        var state = propsToState(nextProps);
        propsChangeSaver(nextProps, state);
        return state;
      }

      return null;
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number,
        isShowSeconds: PropTypes.bool,
        //[[datefrom, dateend]...]
        selectableRange: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))),

        /*
        type: one of [hours, minutes, seconds]
        onChange: ({type})=>()
        */
        onChange: PropTypes.func.isRequired,
        onSelectRangeChange: PropTypes.func,
        prefixCls: PropTypes.string
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        isShowSeconds: true,
        onSelectRangeChange: function onSelectRangeChange() {},
        prefixCls: 'fishd'
      };
    }
  }]);

  function TimeSpinner(props) {
    var _this;

    _classCallCheck(this, TimeSpinner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeSpinner).call(this, props));
    _this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    Object.assign(_this.state, propsToState(props));
    _this.ajustScrollTop = _this._ajustScrollTop.bind(_assertThisInitialized(_this));
    _this.handleScroll = debounce(_this._handleScroll.bind(_assertThisInitialized(_this)), 20);
    return _this;
  }

  _createClass(TimeSpinner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ajustScrollTop(this.state);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      this.ajustScrollTop(this.state);
    }
  }, {
    key: "emitSelectRange",
    value: function emitSelectRange(type) {
      var onSelectRangeChange = this.props.onSelectRangeChange;

      if (type === 'hours') {
        onSelectRangeChange(0, 3);
      } else if (type === 'minutes') {
        onSelectRangeChange(3, 5);
      } else if (type === 'seconds') {
        onSelectRangeChange(6, 9);
      }
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll(_type) {
      var value = Math.min(Math.floor((this.refs[_type].refs.wrap.scrollTop - SCROLL_AJUST_VALUE) / 32 + 3), 59);
      this.handleChange(_type, value);
    } // type: hours, minutes, seconds

  }, {
    key: "handleChange",
    value: function handleChange(type, value, disabled) {
      var _this2 = this;

      if (disabled) return;
      this.state[type] = value; // eslint-disable-line react/no-direct-mutation-state

      var changed = {};
      changed[type] = value;
      this.setState({}, function () {
        _this2.ajustScrollTop(_this2.state);
      });
      this.props.onChange(changed);
    }
  }, {
    key: "_ajustScrollTop",
    value: function _ajustScrollTop(_ref) {
      var hours = _ref.hours,
          minutes = _ref.minutes,
          seconds = _ref.seconds;

      if (hours != null) {
        this.refs.hours.refs.wrap.scrollTop = calcScrollTop(hours);
      }

      if (minutes != null) {
        this.refs.minutes.refs.wrap.scrollTop = calcScrollTop(minutes);
      }

      if (this.props.isShowSeconds && seconds != null) {
        this.refs.seconds.refs.wrap.scrollTop = calcScrollTop(seconds);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          hoursList = _this$state.hoursList,
          minutesLisit = _this$state.minutesLisit,
          secondsList = _this$state.secondsList,
          hours = _this$state.hours,
          minutes = _this$state.minutes,
          seconds = _this$state.seconds;
      var _this$props = this.props,
          isShowSeconds = _this$props.isShowSeconds,
          prefixCls = _this$props.prefixCls;
      return React.createElement("div", {
        className: classNames("".concat(prefixCls, "-time-spinner"), {
          'has-seconds': isShowSeconds
        })
      }, React.createElement(Scrollbar, {
        onMouseEnter: function onMouseEnter() {
          return _this3.emitSelectRange('hours');
        },
        onWheel: function onWheel() {
          _this3.handleScroll('hours');
        },
        ref: "hours",
        className: "".concat(prefixCls, "-time-spinner__wrapper"),
        wrapStyle: {
          maxHeight: 'inherit'
        },
        viewClass: "".concat(prefixCls, "-time-spinner__list"),
        viewComponent: "ul"
      }, hoursList.map(function (disabled, idx) {
        return React.createElement("li", {
          key: idx,
          onClick: function onClick() {
            return _this3.handleChange('hours', idx, disabled);
          },
          className: classNames("".concat(prefixCls, "-time-spinner__item"), {
            active: idx === hours,
            disabled: disabled
          })
        }, idx);
      })), React.createElement(Scrollbar, {
        onMouseEnter: function onMouseEnter() {
          return _this3.emitSelectRange('minutes');
        },
        onWheel: function onWheel() {
          return _this3.handleScroll('minutes');
        },
        ref: "minutes",
        className: "".concat(prefixCls, "-time-spinner__wrapper"),
        wrapStyle: {
          maxHeight: 'inherit'
        },
        viewClass: "".concat(prefixCls, "-time-spinner__list"),
        viewComponent: "ul"
      }, minutesLisit.map(function (minute) {
        return React.createElement("li", {
          key: minute,
          onClick: function onClick() {
            return _this3.handleChange('minutes', minute);
          },
          className: classNames("".concat(prefixCls, "-time-spinner__item"), {
            active: minute === minutes
          })
        }, minute);
      })), isShowSeconds && React.createElement(Scrollbar, {
        onMouseEnter: function onMouseEnter() {
          return _this3.emitSelectRange('seconds');
        },
        onWheel: function onWheel() {
          return _this3.handleScroll('seconds');
        },
        ref: "seconds",
        className: "".concat(prefixCls, "-time-spinner__wrapper"),
        wrapStyle: {
          maxHeight: 'inherit'
        },
        viewClass: "".concat(prefixCls, "-time-spinner__list"),
        viewComponent: "ul"
      }, secondsList.map(function (sec) {
        return React.createElement("li", {
          key: sec,
          onClick: function onClick() {
            return _this3.handleChange('seconds', sec);
          },
          className: classNames("".concat(prefixCls, "-time-spinner__item"), {
            active: sec === seconds
          })
        }, sec);
      })));
    }
  }]);

  return TimeSpinner;
}(React.Component);

export default TimeSpinner;