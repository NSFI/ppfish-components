"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _scrollbar = require("../scrollbar");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _date = require("../../../utils/date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
  state.hoursList = (0, _date.getRangeHours)(selectableRange);
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
  _inheritsLoose(TimeSpinner, _React$Component);

  TimeSpinner.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    // only props has changed
    if (propsChangeTester(nextProps, prevState)) {
      var state = propsToState(nextProps);
      propsChangeSaver(nextProps, state);
      return state;
    }

    return null;
  };

  _createClass(TimeSpinner, null, [{
    key: "propTypes",
    get: function get() {
      return {
        hours: _propTypes.default.number,
        minutes: _propTypes.default.number,
        seconds: _propTypes.default.number,
        isShowSeconds: _propTypes.default.bool,
        //[[datefrom, dateend]...]
        selectableRange: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.instanceOf(Date))),

        /*
        type: one of [hours, minutes, seconds]
        onChange: ({type})=>()
        */
        onChange: _propTypes.default.func.isRequired,
        onSelectRangeChange: _propTypes.default.func,
        prefixCls: _propTypes.default.string
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

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    Object.assign(_this.state, propsToState(props));
    _this.ajustScrollTop = _this._ajustScrollTop.bind(_assertThisInitialized(_this));
    _this.handleScroll = (0, _debounce.default)(_this._handleScroll.bind(_assertThisInitialized(_this)), 20);
    return _this;
  }

  var _proto = TimeSpinner.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.ajustScrollTop(this.state);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    this.ajustScrollTop(this.state);
  };

  _proto.emitSelectRange = function emitSelectRange(type) {
    var onSelectRangeChange = this.props.onSelectRangeChange;

    if (type === 'hours') {
      onSelectRangeChange(0, 3);
    } else if (type === 'minutes') {
      onSelectRangeChange(3, 5);
    } else if (type === 'seconds') {
      onSelectRangeChange(6, 9);
    }
  };

  _proto._handleScroll = function _handleScroll(_type) {
    var value = Math.min(Math.floor((this.refs[_type].refs.wrap.scrollTop - SCROLL_AJUST_VALUE) / 32 + 3), 59);
    this.handleChange(_type, value);
  } // type: hours, minutes, seconds
  ;

  _proto.handleChange = function handleChange(type, value, disabled) {
    var _this2 = this;

    if (disabled) return;
    this.state[type] = value; // eslint-disable-line react/no-direct-mutation-state

    var changed = {};
    changed[type] = value;
    this.setState({}, function () {
      _this2.ajustScrollTop(_this2.state);
    });
    this.props.onChange(changed);
  };

  _proto._ajustScrollTop = function _ajustScrollTop(_ref) {
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
  };

  _proto.render = function render() {
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
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls + "-time-spinner", {
        'has-seconds': isShowSeconds
      })
    }, _react.default.createElement(_scrollbar.Scrollbar, {
      onMouseEnter: function onMouseEnter() {
        return _this3.emitSelectRange('hours');
      },
      onWheel: function onWheel() {
        _this3.handleScroll('hours');
      },
      ref: "hours",
      className: prefixCls + "-time-spinner__wrapper",
      wrapStyle: {
        maxHeight: 'inherit'
      },
      viewClass: prefixCls + "-time-spinner__list",
      viewComponent: "ul"
    }, hoursList.map(function (disabled, idx) {
      return _react.default.createElement("li", {
        key: idx,
        onClick: function onClick() {
          return _this3.handleChange('hours', idx, disabled);
        },
        className: (0, _classnames.default)(prefixCls + "-time-spinner__item", {
          active: idx === hours,
          disabled: disabled
        })
      }, idx);
    })), _react.default.createElement(_scrollbar.Scrollbar, {
      onMouseEnter: function onMouseEnter() {
        return _this3.emitSelectRange('minutes');
      },
      onWheel: function onWheel() {
        return _this3.handleScroll('minutes');
      },
      ref: "minutes",
      className: prefixCls + "-time-spinner__wrapper",
      wrapStyle: {
        maxHeight: 'inherit'
      },
      viewClass: prefixCls + "-time-spinner__list",
      viewComponent: "ul"
    }, minutesLisit.map(function (minute) {
      return _react.default.createElement("li", {
        key: minute,
        onClick: function onClick() {
          return _this3.handleChange('minutes', minute);
        },
        className: (0, _classnames.default)(prefixCls + "-time-spinner__item", {
          active: minute === minutes
        })
      }, minute);
    })), isShowSeconds && _react.default.createElement(_scrollbar.Scrollbar, {
      onMouseEnter: function onMouseEnter() {
        return _this3.emitSelectRange('seconds');
      },
      onWheel: function onWheel() {
        return _this3.handleScroll('seconds');
      },
      ref: "seconds",
      className: prefixCls + "-time-spinner__wrapper",
      wrapStyle: {
        maxHeight: 'inherit'
      },
      viewClass: prefixCls + "-time-spinner__list",
      viewComponent: "ul"
    }, secondsList.map(function (sec) {
      return _react.default.createElement("li", {
        key: sec,
        onClick: function onClick() {
          return _this3.handleChange('seconds', sec);
        },
        className: (0, _classnames.default)(prefixCls + "-time-spinner__item", {
          active: sec === seconds
        })
      }, sec);
    })));
  };

  return TimeSpinner;
}(_react.default.Component);

var _default = TimeSpinner;
exports.default = _default;