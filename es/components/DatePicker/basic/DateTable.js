function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toDate, getFirstDayOfMonth, getDayCountOfMonth, getWeekNumber, getStartDateOfMonth, DAY_DURATION, SELECTION_MODES, deconstructDate, hasClass, getOffsetToWeekOrigin } from '../../../utils/date';
import Locale from '../../../utils/date/locale';

function isFunction(func) {
  return typeof func === 'function';
}

var clearHours = function clearHours(time) {
  var cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

var _WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

var DateTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateTable, _React$Component);

  function DateTable(props) {
    var _this;

    _classCallCheck(this, DateTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateTable).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (event) {
      var _this$props = _this.props,
          showWeekNumber = _this$props.showWeekNumber,
          onChangeRange = _this$props.onChangeRange,
          rangeState = _this$props.rangeState,
          mode = _this$props.mode;

      var getDateOfCell = function getDateOfCell(row, column, showWeekNumber) {
        var startDate = _this.getStartDate();

        return new Date(startDate.getTime() + (row * 7 + (column - (showWeekNumber ? 1 : 0))) * DAY_DURATION);
      };

      if (!(mode === SELECTION_MODES.RANGE && rangeState.selecting)) return;

      var getTarget = function getTarget() {
        var tag = event.target.tagName;

        if (tag === 'SPAN') {
          return event.target.parentNode.parentNode;
        }

        if (tag === 'DIV') {
          return event.target.parentNode;
        }

        if (tag === 'TD') {
          return event.target;
        }

        return null;
      };

      var target = getTarget();
      if (!target || target.tagName !== 'TD') return;
      var column = target.cellIndex;
      var row = target.parentNode.rowIndex - 1;
      rangeState.endDate = getDateOfCell(row, column, showWeekNumber);
      onChangeRange(rangeState);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      var getTarget = function getTarget() {
        var tag = event.target.tagName;

        if (tag === 'SPAN') {
          return event.target.parentNode.parentNode;
        }

        if (tag === 'DIV') {
          return event.target.parentNode;
        }

        if (tag === 'TD') {
          return event.target;
        }

        return null;
      };

      var target = getTarget();
      if (!target || target.tagName !== 'TD') return;
      if (hasClass(target, 'disabled') || hasClass(target, 'week')) return;
      var _this$props2 = _this.props,
          mode = _this$props2.mode,
          showWeekNumber = _this$props2.showWeekNumber,
          date = _this$props2.date,
          onPick = _this$props2.onPick,
          rangeState = _this$props2.rangeState;

      var _deconstructDate = deconstructDate(date),
          year = _deconstructDate.year,
          month = _deconstructDate.month;

      if (mode === 'week') {
        target = showWeekNumber ? target.parentNode.cells[1] : target.parentNode.cells[0];
      }

      var cellIndex = target.cellIndex;
      var rowIndex = target.parentNode.rowIndex - 1;

      var cell = _this.getRows()[rowIndex][cellIndex];

      var text = cell.text;
      var className = target.className;
      var newDate = new Date(year, month, 1);

      if (className.indexOf('prev') !== -1) {
        if (month === 0) {
          newDate.setFullYear(year - 1);
          newDate.setMonth(11);
        } else {
          newDate.setMonth(month - 1);
        }
      } else if (className.indexOf('next') !== -1) {
        if (month === 11) {
          newDate.setFullYear(year + 1);
          newDate.setMonth(0);
        } else {
          newDate.setMonth(month + 1);
        }
      }

      newDate.setDate(parseInt(text, 10));

      if (mode === SELECTION_MODES.RANGE) {
        if (!rangeState.selecting) {
          rangeState.firstSelectedValue = toDate(newDate);
          onPick({
            minDate: toDate(newDate),
            maxDate: null
          }, false);
        } else {
          onPick({
            minDate: new Date(Math.min(rangeState.firstSelectedValue, toDate(newDate))),
            maxDate: new Date(Math.max(rangeState.firstSelectedValue, toDate(newDate)))
          }, true);
        }

        rangeState.selecting = !rangeState.selecting;
      } else if (mode === SELECTION_MODES.DAY || mode === SELECTION_MODES.WEEK) {
        onPick({
          date: newDate
        });
      }
    });

    _this.state = {
      tableRows: [[], [], [], [], [], []]
    };
    return _this;
  }

  _createClass(DateTable, [{
    key: "getOffsetWeek",
    value: function getOffsetWeek() {
      return this.props.firstDayOfWeek % 7;
    }
  }, {
    key: "WEEKS",
    value: function WEEKS() {
      // 0-6
      var week = this.getOffsetWeek();
      return _WEEKS.slice(week).concat(_WEEKS.slice(0, week));
    }
  }, {
    key: "getStartDate",
    value: function getStartDate() {
      var ds = deconstructDate(this.props.date);
      return getStartDateOfMonth(ds.year, ds.month, this.getOffsetWeek());
    }
  }, {
    key: "getRows",
    value: function getRows() {
      var _this$props3 = this.props,
          date = _this$props3.date,
          disabledDate = _this$props3.disabledDate,
          showWeekNumber = _this$props3.showWeekNumber,
          minDate = _this$props3.minDate,
          maxDate = _this$props3.maxDate,
          mode = _this$props3.mode,
          firstDayOfWeek = _this$props3.firstDayOfWeek;
      var tableRows = this.state.tableRows;
      var ndate = new Date(date.getTime());
      var day = getFirstDayOfMonth(ndate); // day of first day

      var dateCountOfMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth()); // dates count in december is always 31, so offset year is not neccessary

      var dateCountOfLastMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1);
      var offsetDaysToWeekOrigin = getOffsetToWeekOrigin(day, firstDayOfWeek); //tableRows: [ [], [], [], [], [], [] ]

      var rows = tableRows;
      var count = 1;
      var firstDayPosition;
      var startDate = this.getStartDate();
      var now = clearHours(new Date());

      for (var i = 0; i < 6; i++) {
        // rows
        var row = rows[i];
        /*
        cell: {
          type: string, one of 'week' | 'normal'
          text: String,
          row: number,  row index,
          column: number, column index;
          inRange: boolean,
          start: boolean,
          end: boolean,
          disabled: boolean
        }
        */

        if (showWeekNumber) {
          //prepend week info to the head of each row array
          row[0] = {
            type: 'week',
            text: '第' + getWeekNumber(new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))) + '周'
          };
        }

        for (var j = 0; j < 7; j++) {
          // columns
          var cell = row[showWeekNumber ? j + 1 : j];

          if (!cell) {
            row[showWeekNumber ? j + 1 : j] = {
              row: i,
              column: j,
              type: 'normal',
              inRange: false,
              start: false,
              end: false
            };
            cell = row[showWeekNumber ? j + 1 : j];
          }

          cell.type = 'normal';
          var index = i * 7 + j; //current date offset

          var time = startDate.getTime() + DAY_DURATION * index;
          cell.inRange = time >= clearHours(minDate) && time <= clearHours(maxDate);
          cell.start = minDate && time === clearHours(minDate);
          cell.end = maxDate && time === clearHours(maxDate);
          var isToday = time === now;

          if (isToday) {
            cell.type = 'today';
          }

          if (i === 0) {
            //handle first row of date, this row only contains all or some pre-month dates
            if (j >= offsetDaysToWeekOrigin) {
              cell.text = count++;

              if (count === 2) {
                firstDayPosition = i * 7 + j;
              }
            } else {
              cell.text = dateCountOfLastMonth - offsetDaysToWeekOrigin + j + 1;
              cell.type = 'prev-month';
            }
          } else {
            if (count <= dateCountOfMonth) {
              //in current dates
              cell.text = count++;

              if (count === 2) {
                firstDayPosition = i * 7 + j;
              }
            } else {
              // next month
              cell.text = count++ - dateCountOfMonth;
              cell.type = 'next-month';
            }
          }

          cell.disabled = isFunction(disabledDate) && disabledDate(new Date(time), SELECTION_MODES.DAY);
        }

        if (mode === SELECTION_MODES.WEEK) {
          var start = showWeekNumber ? 1 : 0;
          var end = showWeekNumber ? 7 : 6;
          var isWeekActive = this.isWeekActive(row[start + 1]);
          row[start].inRange = isWeekActive;
          row[start].start = isWeekActive;
          row[end].inRange = isWeekActive;
          row[end].end = isWeekActive;
          row.isWeekActive = isWeekActive;
        }
      }

      rows.firstDayPosition = firstDayPosition;
      return rows;
    } // calc classnames for cell

  }, {
    key: "getCellClasses",
    value: function getCellClasses(cell) {
      var _this$props4 = this.props,
          mode = _this$props4.mode,
          date = _this$props4.date,
          value = _this$props4.value;
      var classes = [];

      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('available');

        if (cell.type === 'today') {
          classes.push('today');
        }
      } else {
        classes.push(cell.type);
      }

      if (mode === 'day' && (cell.type === 'normal' || cell.type === 'today') && value && value.getFullYear() === date.getFullYear() && value.getMonth() === date.getMonth() && value.getDate() === Number(cell.text)) {
        classes.push('current');
      }

      if (cell.inRange && (cell.type === 'normal' || cell.type === 'today' || mode === 'week')) {
        classes.push('in-range');
      }

      if (cell.start && (cell.type === 'normal' || cell.type === 'today' || mode === 'week') && !cell.disabled) {
        classes.push('start-date');
      }

      if (cell.end && (cell.type === 'normal' || cell.type === 'today' || mode === 'week') && !cell.disabled) {
        classes.push('end-date');
      }

      if (cell.disabled) {
        classes.push('disabled');
      }

      return classes.join(' ');
    }
  }, {
    key: "getMarkedRangeRows",
    value: function getMarkedRangeRows() {
      var _this$props5 = this.props,
          showWeekNumber = _this$props5.showWeekNumber,
          minDate = _this$props5.minDate,
          maxDate = _this$props5.maxDate,
          mode = _this$props5.mode,
          rangeState = _this$props5.rangeState;
      var rows = this.getRows();
      if (!(mode === SELECTION_MODES.RANGE && rangeState.selecting && rangeState.endDate instanceof Date)) return rows;

      for (var i = 0, k = rows.length; i < k; i++) {
        var row = rows[i];

        for (var j = 0, l = row.length; j < l; j++) {
          if (showWeekNumber && j === 0) continue;
          var cell = row[j];
          var index = i * 7 + j + (showWeekNumber ? -1 : 0);
          var time = this.getStartDate().getTime() + DAY_DURATION * index;
          cell.inRange = minDate && maxDate && time >= clearHours(minDate) && time <= clearHours(maxDate);
          cell.start = minDate && time === clearHours(minDate.getTime());
          cell.end = maxDate && time === clearHours(maxDate.getTime());
        }
      }

      return rows;
    }
  }, {
    key: "isWeekActive",
    value: function isWeekActive(cell) {
      if (this.props.mode !== SELECTION_MODES.WEEK) return false;
      if (!this.props.value) return false;
      var newDate = new Date(this.props.date.getTime()); // date view

      var year = newDate.getFullYear();
      var month = newDate.getMonth();

      if (cell.type === 'prev-month') {
        newDate.setMonth(month === 0 ? 11 : month - 1);
        newDate.setFullYear(month === 0 ? year - 1 : year);
      }

      if (cell.type === 'next-month') {
        newDate.setMonth(month === 11 ? 0 : month + 1);
        newDate.setFullYear(month === 11 ? year + 1 : year);
      }

      newDate.setDate(parseInt(cell.text, 10)); // current date value

      return getWeekNumber(newDate) === deconstructDate(new Date(this.props.value.getTime() + DAY_DURATION)).week;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var $t = Locale.t;
      var _this$props6 = this.props,
          mode = _this$props6.mode,
          showWeekNumber = _this$props6.showWeekNumber,
          prefixCls = _this$props6.prefixCls;
      return React.createElement("table", {
        cellSpacing: "0",
        cellPadding: "0",
        onClick: this.handleClick,
        onMouseMove: this.handleMouseMove,
        className: classNames("".concat(prefixCls, "-date-table"), {
          'is-week-mode': mode === 'week'
        })
      }, React.createElement("tbody", null, React.createElement("tr", null, showWeekNumber && React.createElement("th", null, "\u5468"), this.WEEKS().map(function (e, idx) {
        return React.createElement("th", {
          key: idx
        }, $t("datepicker.weeks.".concat(e)));
      })), this.getMarkedRangeRows().map(function (row, idx) {
        return React.createElement("tr", {
          key: idx,
          className: classNames("".concat(prefixCls, "-date-table__row"), {
            'current': row.isWeekActive
          })
        }, row.map(function (cell, idx) {
          return React.createElement("td", {
            className: _this2.getCellClasses(cell),
            key: idx
          }, React.createElement("div", null, React.createElement("span", null, cell.text)));
        }));
      })));
    }
  }]);

  return DateTable;
}(React.Component);

export { DateTable as default };
DateTable.propTypes = {
  disabledDate: PropTypes.func,
  showWeekNumber: PropTypes.bool,
  //minDate, maxDate: only valid in range mode. control date's start, end info
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  mode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(function (e) {
    return SELECTION_MODES[e];
  })),
  // date view model, all visual view derive from this info
  date: PropTypes.instanceOf(Date).isRequired,
  // current date value, use picked.
  value: PropTypes.instanceOf(Date),

  /*
  (data, closePannel: boolean)=>()
    data:
      if mode = range: // notify when ranges is change
        minDate: Date|null,
        maxDate: Date|null
      if mode = date
        date: Date
      if mode = week:
        year: number
        week: number,
        value: string,
        date: Date
  */
  onPick: PropTypes.func.isRequired,

  /*
  ({
    endDate: Date,
    selecting: boolean,
  })=>()
  */
  onChangeRange: PropTypes.func,
  rangeState: PropTypes.shape({
    endDate: PropTypes.date,
    selecting: PropTypes.bool
  }),
  firstDayOfWeek: PropTypes.number,
  prefixCls: PropTypes.string
};
DateTable.defaultProps = {
  mode: 'day',
  firstDayOfWeek: 0,
  prefixCls: 'fishd'
};