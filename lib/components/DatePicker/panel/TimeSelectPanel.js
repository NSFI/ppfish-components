"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _scrollbar = require("../scrollbar");

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimeSelectPanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimeSelectPanel, _React$Component);

  _createClass(TimeSelectPanel, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ('value' in nextProps && !(0, _isEqual["default"])(nextProps.vlaue, prevState.prevPropValue)) {
        return {
          prevPropValue: nextProps.vlaue
        };
      }

      return null;
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        prefixCls: _propTypes["default"].string,
        value: _propTypes["default"].string,
        //basePicker
        onPicked: _propTypes["default"].func.isRequired,
        //basePicker
        start: _propTypes["default"].string,
        end: _propTypes["default"].string,
        step: _propTypes["default"].string,
        minTime: _propTypes["default"].string,
        maxTime: _propTypes["default"].string,
        dateParser: _propTypes["default"].func.isRequired
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        prefixCls: 'fishd',
        start: '09:00',
        end: '18:00',
        step: '00:30',
        minTime: '',
        maxTime: '',
        onPicked: function onPicked() {}
      };
    }
  }]);

  function TimeSelectPanel(props) {
    var _this;

    _classCallCheck(this, TimeSelectPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeSelectPanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "items", function () {
      return getItems(_this.props);
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToOption", function () {
      var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "selected";

      var menu = _this.timeSelectRoot.querySelector(".".concat(_this.props.prefixCls, "-picker-panel__content"));

      var selected = menu.getElementsByClassName(className)[0];
      selected && (0, _domScrollIntoView["default"])(selected, menu, {
        offsetTop: 74,
        alignWithTop: true
      });
    });

    _this.state = {};
    return _this;
  }

  _createClass(TimeSelectPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollToOption();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.scrollToOption();
    }
  }, {
    key: "handleClick",
    value: function handleClick(item) {
      var _this$props = this.props,
          onPicked = _this$props.onPicked,
          dateParser = _this$props.dateParser;

      if (!item.disabled) {
        onPicked(dateParser(item.value), false, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          value = _this$props2.value,
          prefixCls = _this$props2.prefixCls;
      return _react["default"].createElement("div", {
        ref: function ref(node) {
          return _this2.timeSelectRoot = node;
        },
        className: "".concat(prefixCls, "-picker-panel time-select-panel")
      }, _react["default"].createElement(_scrollbar.Scrollbar, {
        wrapClass: "".concat(prefixCls, "-picker-panel__content"),
        noresize: true
      }, this.items().map(function (item, idx) {
        return _react["default"].createElement("div", {
          key: idx,
          className: (0, _classnames["default"])('time-select-item', {
            selected: value === item.value,
            disabled: item.disabled
          }),
          disabled: item.disabled,
          onClick: function onClick() {
            return _this2.handleClick(item);
          }
        }, item.value);
      })));
    }
  }]);

  return TimeSelectPanel;
}(_react["default"].Component);

TimeSelectPanel.isValid = function (value, _ref) {
  var start = _ref.start,
      end = _ref.end,
      step = _ref.step,
      minTime = _ref.minTime,
      maxTime = _ref.maxTime;
  var items = getItems({
    start: start,
    end: end,
    step: step,
    minTime: minTime,
    maxTime: maxTime
  });
  return !!items.filter(function (e) {
    return !e.disabled;
  }).find(function (e) {
    return e.value === value;
  });
};

var getItems = function getItems(_ref2) {
  var start = _ref2.start,
      end = _ref2.end,
      step = _ref2.step,
      minTime = _ref2.minTime,
      maxTime = _ref2.maxTime;
  var result = [];

  if (start && end && step) {
    var current = start;

    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        disabled: compareTime(current, minTime || '-1:-1') <= 0 || compareTime(current, maxTime || '100:100') >= 0
      });
      current = nextTime(current, step);
    }
  }

  return result;
};

var parseTime = function parseTime(time) {
  var values = (time || '').split(':');

  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);
    return {
      hours: hours,
      minutes: minutes
    };
  }

  return null;
};

var compareTime = function compareTime(time1, time2) {
  var value1 = parseTime(time1);
  var value2 = parseTime(time2);
  var minutes1 = value1.minutes + value1.hours * 60;
  var minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

var formatTime = function formatTime(time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
};

var nextTime = function nextTime(time, step) {
  var timeValue = parseTime(time);
  var stepValue = parseTime(step);
  var next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };
  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;
  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;
  return formatTime(next);
};

var _default = TimeSelectPanel;
exports["default"] = _default;