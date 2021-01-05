import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  toDate,
  getFirstDayOfMonth,
  getDayCountOfMonth,
  getWeekNumber,
  getStartDateOfMonth,
  DAY_DURATION,
  SELECTION_MODES,
  deconstructDate,
  hasClass,
  getOffsetToWeekOrigin
} from '../../../utils/date';
import Locale from '../../../utils/date/locale';
import ConfigConsumer from '../../Config/Consumer';

function isFunction(func) {
  return typeof func === 'function';
}

const clearHours = function (time) {
  const cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default class DateTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tableRows: [[], [], [], [], [], []],
    };
  }

  getOffsetWeek(){
    return this.props.firstDayOfWeek % 7;
  }

  WEEKS() {
    // 0-6
    const week = this.getOffsetWeek();
    return WEEKS.slice(week).concat(WEEKS.slice(0, week));
  }

  getStartDate() {
    const ds = deconstructDate(this.props.date);
    return getStartDateOfMonth(ds.year, ds.month, this.getOffsetWeek());
  }

  getRows() {
    const {date, disabledDate, showWeekNumber, minDate, maxDate, mode, firstDayOfWeek} = this.props;
    const {tableRows} = this.state;

    const ndate = new Date(date.getTime());
    let day = getFirstDayOfMonth(ndate); // day of first day
    const dateCountOfMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth());
    // dates count in december is always 31, so offset year is not neccessary
    const dateCountOfLastMonth = getDayCountOfMonth(
      ndate.getFullYear(),
      (ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1)
    );
    const offsetDaysToWeekOrigin = getOffsetToWeekOrigin(day, firstDayOfWeek);

    //tableRows: [ [], [], [], [], [], [] ]
    const rows = tableRows;
    let count = 1;
    let firstDayPosition;

    const startDate = this.getStartDate();
    const now = clearHours(new Date());


    for (let i = 0; i < 6; i++) { // rows
      const row = rows[i];
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
      if (showWeekNumber) {//prepend week info to the head of each row array
        row[0] = {
          type: 'week',
          text: '第'+ getWeekNumber(new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))) + '周'
        };
      }

      for (let j = 0; j < 7; j++) {  // columns
        let cell = row[showWeekNumber ? j + 1 : j];
        if (!cell) {
          row[showWeekNumber ? j + 1 : j]  = {
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

        const index = i * 7 + j;//current date offset
        const time = startDate.getTime() + DAY_DURATION * index;
        cell.inRange = time >= clearHours(minDate) && time <= clearHours(maxDate);
        cell.start = minDate && time === clearHours(minDate);
        cell.end = maxDate && time === clearHours(maxDate);
        const isToday = time === now;

        if (isToday) {
          cell.type = 'today';
        }

        if (i === 0) {//handle first row of date, this row only contains all or some pre-month dates
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
          if (count <= dateCountOfMonth) {//in current dates
            cell.text = count++;
            if (count === 2) {
              firstDayPosition = i * 7 + j;
            }
          } else {// next month
            cell.text = count++ - dateCountOfMonth;
            cell.type = 'next-month';
          }
        }

        cell.disabled = isFunction(disabledDate) && disabledDate(new Date(time), SELECTION_MODES.DAY);
      }

      if (mode === SELECTION_MODES.WEEK) {
        const start = showWeekNumber ? 1 : 0;
        const end = showWeekNumber ? 7 : 6;
        const isWeekActive = this.isWeekActive(row[start + 1]);

        row[start].inRange = isWeekActive;
        row[start].start = isWeekActive;
        row[end].inRange = isWeekActive;
        row[end].end = isWeekActive;
        row.isWeekActive = isWeekActive;
      }
    }

    rows.firstDayPosition = firstDayPosition;

    return rows;
  }

  // calc classnames for cell
  getCellClasses(cell) {
    const {mode, date, value} = this.props;

    let classes = [];
    if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
      classes.push('available');
      if (cell.type === 'today') {
        classes.push('today');
      }
    } else {
      classes.push(cell.type);
    }

    if (mode === 'day'
      && (cell.type === 'normal' || cell.type === 'today')
      && value
      && value.getFullYear() === date.getFullYear()
      && value.getMonth() === date.getMonth()
      && value.getDate() === Number(cell.text)) {
      classes.push('current');
    }

    if (cell.inRange && ((cell.type === 'normal' || cell.type === 'today') || mode === 'week')) {
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

  getMarkedRangeRows() {
    const {showWeekNumber, minDate, maxDate, mode, rangeState} = this.props;
    const rows = this.getRows();
    if (!(mode === SELECTION_MODES.RANGE && rangeState.selecting && rangeState.endDate instanceof Date)) return rows;

    for (let i = 0, k = rows.length; i < k; i++) {
      const row = rows[i];
      for (let j = 0, l = row.length; j < l; j++) {
        if (showWeekNumber && j === 0) continue;

        const cell = row[j];
        const index = i * 7 + j + (showWeekNumber ? -1 : 0);
        const time = this.getStartDate().getTime() + DAY_DURATION * index;

        cell.inRange = minDate && maxDate && time >= clearHours(minDate) && time <= clearHours(maxDate);
        cell.start = minDate && time === clearHours(minDate.getTime());
        cell.end = maxDate && time === clearHours(maxDate.getTime());
      }
    }

    return rows;
  }

  isWeekActive(cell) {
    if (this.props.mode !== SELECTION_MODES.WEEK) return false;
    if (!this.props.value) return false;

    const newDate = new Date(this.props.date.getTime());// date view
    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    if (cell.type === 'prev-month') {
      newDate.setMonth(month === 0 ? 11 : month - 1);
      newDate.setFullYear(month === 0 ? year - 1 : year);
    }

    if (cell.type === 'next-month') {
      newDate.setMonth(month === 11 ? 0 : month + 1);
      newDate.setFullYear(month === 11 ? year + 1 : year);
    }
    newDate.setDate(parseInt(cell.text, 10));

    // current date value
    return getWeekNumber(newDate) === deconstructDate(new Date(this.props.value.getTime() + DAY_DURATION)).week;
  }

  handleMouseMove = (event) => {
    const {showWeekNumber, onChangeRange, rangeState, mode} = this.props;

    const getDateOfCell = (row, column, showWeekNumber) => {
      const startDate = this.getStartDate();
      return new Date(startDate.getTime() + (row * 7 + (column - (showWeekNumber ? 1 : 0))) * DAY_DURATION);
    };

    if (!(mode === SELECTION_MODES.RANGE && rangeState.selecting)) return;

    const getTarget = () => {
      const tag = event.target.tagName;
      if(tag === 'SPAN') {
        return event.target.parentNode.parentNode;
      }
      if(tag === 'DIV') {
        return event.target.parentNode;
      }

      if(tag === 'TD') {
        return event.target;
      }
      return null;
    };
    let target = getTarget();

    if (!target || target.tagName !== 'TD') return;

    const column = target.cellIndex;
    const row = target.parentNode.rowIndex - 1;

    rangeState.endDate = getDateOfCell(row, column, showWeekNumber);
    onChangeRange(rangeState);
  }

  handleClick = (event) => {
    const getTarget = () => {
      const tag = event.target.tagName;
      if(tag === 'SPAN') {
        return event.target.parentNode.parentNode;
      }
      if(tag === 'DIV') {
        return event.target.parentNode;
      }

      if(tag === 'TD') {
        return event.target;
      }
      return null;
    };
    let target = getTarget();

    if (!target || target.tagName !== 'TD') return;
    if (hasClass(target, 'disabled') || hasClass(target, 'week')) return;

    const {mode, showWeekNumber, date, onPick, rangeState} = this.props;
    const {year, month} = deconstructDate(date);

    if (mode === 'week') {
      target = showWeekNumber ? target.parentNode.cells[1] : target.parentNode.cells[0];
    }

    const cellIndex = target.cellIndex;
    const rowIndex = target.parentNode.rowIndex - 1;

    const cell = this.getRows()[rowIndex][cellIndex];
    const text = cell.text;
    const className = target.className;

    const newDate = new Date(year, month, 1);

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
      if(!rangeState.selecting) {
        rangeState.firstSelectedValue = toDate(newDate);
        onPick({ minDate: toDate(newDate), maxDate: null }, false);
      }else{
        onPick({
          minDate: new Date(Math.min(rangeState.firstSelectedValue, toDate(newDate))),
          maxDate: new Date(Math.max(rangeState.firstSelectedValue, toDate(newDate)))
          },
          true
        );
      }
      rangeState.selecting = !rangeState.selecting;
    } else if (mode === SELECTION_MODES.DAY || mode === SELECTION_MODES.WEEK) {
      onPick({ date: newDate });
    }
  }

  render() {
    const $t = Locale.t;
    const {mode, showWeekNumber, prefixCls} = this.props;

    return (
      <ConfigConsumer componentName="DatePicker">
        {
          (Locale) => (
            <table
              cellSpacing="0"
              cellPadding="0"
              onClick={this.handleClick}
              onMouseMove={this.handleMouseMove}
              className={classNames(`${prefixCls}-date-table`, { 'is-week-mode': mode === 'week' })}
            >
              <tbody>

              <tr>
                {showWeekNumber && <th>{Locale.week}</th>}
                {
                  this.WEEKS().map((e, idx)=> <th key={idx}>{Locale['weeks'][e]}</th> )
                }
              </tr>

              {
                this.getMarkedRangeRows().map((row, idx) => {
                  return (
                    <tr
                      key={idx}
                      className={classNames(`${prefixCls}-date-table__row`, { 'current': row.isWeekActive })}>
                      {
                        row.map((cell, idx) => (
                          <td className={this.getCellClasses(cell)} key={idx}>
                            <div><span>{cell.text}</span></div>
                          </td>
                        ))
                      }
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          )
        }
      </ConfigConsumer>
    );
  }
}

DateTable.propTypes = {
  disabledDate: PropTypes.func,
  showWeekNumber: PropTypes.bool,
  //minDate, maxDate: only valid in range mode. control date's start, end info
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  mode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(e => SELECTION_MODES[e])),
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
    selecting: PropTypes.bool,
  }),
  firstDayOfWeek: PropTypes.number,
  prefixCls: PropTypes.string
};

DateTable.defaultProps = {
  mode: 'day',
  firstDayOfWeek: 0,
  prefixCls: 'fishd'
};
