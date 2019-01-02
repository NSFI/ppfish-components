import DateUtils from './date';
import Locale from './locale';

const t = Locale.t;
const weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

DateUtils.i18n = {
  dayNamesShort: weeks.map(week => t(`fishd.datepicker.weeks.${ week }`)),
  dayNames: weeks.map(week => t(`fishd.datepicker.weeks.${ week }`)),
  monthNamesShort: months.map(month => t(`fishd.datepicker.months.${ month }`)),
  monthNames: months.map((month, index) => t(`fishd.datepicker.month${ index + 1 }`))
};

// 时间format
export const timeFormat = (format) => {
  if (format && format.indexOf('ss') === -1) {
    return 'HH:mm';
  } else {
    return 'HH:mm:ss';
  }
};

// 日期format
export const dateFormat = (format) => {
  if (format) return format.replace('HH:mm', '').replace(':ss', '').trim();
  else return 'yyyy-MM-dd';
};

// 月份数组
export const MONTH_ARRRY = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

// 年份数组
export const YEARS_ARRAY = (N=50) => {
  const result = [];
  const currentYearNum = (new Date()).getFullYear();
  const start = Math.max(currentYearNum - parseInt(N / 2), 0);
  for(let i = 0; i < N; i++) {
    result.push(start + i);
  }
  return result;
};

// 判断两个日期是否相等
export const equalDate = function (dateA, dateB) {
  return dateA === dateB || new Date(dateA).getTime() === new Date(dateB).getTime();
};

// 判断两个日期数组是否相等
export const equalDateArr = function (arrA, arrB) {
  return (
    arrA === arrB ||
    Array.isArray(arrA) && Array.isArray(arrB) && arrA.length === 2 && arrB.length === 2 &&
    equalDate(arrA[0],arrB[0]) && equalDate(arrA[1],arrB[1])
  );
};

// 判断两个日期的年\月是否相等
export const equalYearAndMonth = function (dateA, dateB) {
  return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
};

// 判断两个日期差(天)
export const diffDate = (dateA, dateB) => {
  const time = dateB.getTime() - dateA.getTime();
  const days = parseInt(time / (1000 * 60 * 60 * 24));
  return days;
};

// Date对象
export const toDate = function(date) {
  return isValidValue(date) ? new Date(date) : null;
};

// 判断值的合法性：Date合法
export const isValidValue = (value) => {
  if (value instanceof Date) return true;
  return false;
};

// 判断值的合法性：[Date,Date]合法
export const isValidValueArr = (value) => {
  if (Array.isArray(value) && value.length >= 2 && value[0] instanceof Date && value[1] instanceof Date) return true;
  return false;
};

// Date对象->string
export const formatDate = function (date, format) {
  date = toDate(date);
  if (!date) return '';
  return DateUtils.format(date, format || 'yyyy-MM-dd');
};

// string->Date对象
export const parseDate = function (string, format) {
  return DateUtils.parse(string, format || 'yyyy-MM-dd');
};

// 只改变时间，不改变日期
export const setTime = (oldDate, newDate) => {
  let old = new Date(oldDate.getTime());
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();
  let second = newDate.getSeconds();
  let milliSeconds = newDate.getMilliseconds();
  old.setHours(hour);
  old.setMinutes(minute);
  old.setSeconds(second);
  old.setMilliseconds(milliSeconds);
  return new Date(old.getTime());
};

export const getDayCountOfMonth = function (year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

export const getFirstDayOfMonth = function (date) {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

export const DAY_DURATION = 86400000;

// return date corresponding to the first cell on datetable
export const getStartDateOfMonth = function (year, month, offsetWeek = 0) {
  const result = new Date(year, month, 1);
  const day = result.getDay();

  if (day === offsetWeek) {
    result.setTime(result.getTime() - DAY_DURATION * 7);
  } else {
    const offset = getOffsetToWeekOrigin(day, offsetWeek);
    result.setTime(result.getTime() - DAY_DURATION * offset);
  }

  return result;
};

/**
 *
 * @export
 * @param {any} day , first day of current month, 0 - 6
 * @param {number} [offsetWeek=0, 0-6, 0 sunday, 6 saturday]
 * @returns
 */
export function getOffsetToWeekOrigin(day, offsetWeek = 0) {
  let offset = day >= offsetWeek ? day - offsetWeek : 7 + day - offsetWeek;
  offset = offset === 0 ? 7 : offset; // if the two days collide, we force 7 days padding
  return offset;
}

export const getWeekNumber = function (src) {
  const date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

// http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
export function getDateOfISOWeek(w, y) {
  let simple = new Date(y, 0, 1 + (w - 1) * 7);
  let dow = simple.getDay();
  let ISOweekStart = simple;
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

export const prevYear = (date) => {
  let d = toDate(date);
  d.setFullYear(date.getFullYear() - 1);
  return d;
};

export const nextYear = (date) => {
  let d = toDate(date);
  d.setFullYear(date.getFullYear() + 1);
  return d;
};

export const prevMonth = function (src) {
  let clone = new Date(src.getTime());
  const year = clone.getFullYear();
  const month = clone.getMonth();
  const date = clone.getDate();

  const newYear = month === 0 ? year - 1 : year;
  const newMonth = month === 0 ? 11 : month - 1;

  const newMonthDayCount = getDayCountOfMonth(newYear, newMonth);
  if (newMonthDayCount < date) {
    clone.setDate(newMonthDayCount);
  }

  clone.setMonth(newMonth);
  clone.setFullYear(newYear);

  return clone;
};

export const nextMonth = function (src) {
  let clone = new Date(src.getTime());
  const year = clone.getFullYear();
  const month = clone.getMonth();
  const date = clone.getDate();

  const newYear = month === 11 ? year + 1 : year;
  const newMonth = month === 11 ? 0 : month + 1;

  const newMonthDayCount = getDayCountOfMonth(newYear, newMonth);
  if (newMonthDayCount < date) {
    clone.setDate(newMonthDayCount);
  }

  clone.setMonth(newMonth);
  clone.setFullYear(newYear);
  return clone;
};

export const getRangeHours = function (ranges) {
  const newArray = function (start, end) {
    let result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };
  const hours = [];
  let disabledHours = [];

  (ranges || []).forEach(range => {
    const value = range.map(date => date.getHours());

    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });

  if (disabledHours.length) {
    for (let i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1;
    }
  } else {
    for (let i = 0; i < 24; i++) {
      hours[i] = false;
    }
  }

  return hours;
};

export const limitRange = function(date, ranges, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!ranges || !ranges.length) return date;

  const len = ranges.length;

  date = DateUtils.parse(DateUtils.format(date, format), format);
  for (let i = 0; i < len; i++) {
    const range = ranges[i];
    if (date >= range[0] && date <= range[1]) {
      return date;
    }
  }

  let maxDate = ranges[0][0];
  let minDate = ranges[0][0];

  ranges.forEach(range => {
    minDate = new Date(Math.min(range[0], minDate));
    maxDate = new Date(Math.max(range[1], maxDate));
  });

  return date < minDate ? minDate : maxDate;
};

// 判断日期是否在范围以内
export const isLimitRange = function(date, ranges, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!ranges || !ranges.length) return true;

  const len = ranges.length;

  date = DateUtils.parse(DateUtils.format(date, format), format);
  for (let i = 0; i < len; i++) {
    const range = ranges[i];
    if (date >= range[0] && date <= range[1]) {
      return true;
    }
  }

  return false;
};

export function hasClass(target, classname) {
  return target.classList.contains(classname);
}

export const SELECTION_MODES = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  RANGE: 'range'
};

export function deconstructDate(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    week: getWeekNumber(date)
  };
}
