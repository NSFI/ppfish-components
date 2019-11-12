"use strict";

exports.__esModule = true;
exports.getOffsetToWeekOrigin = getOffsetToWeekOrigin;
exports.getDateOfISOWeek = getDateOfISOWeek;
exports.hasClass = hasClass;
exports.deconstructDate = deconstructDate;
exports.SELECTION_MODES = exports.isLimitRange = exports.limitRange = exports.getRangeHours = exports.nextMonth = exports.prevMonth = exports.nextYear = exports.prevYear = exports.getWeekNumber = exports.getStartDateOfMonth = exports.DAY_DURATION = exports.getFirstDayOfMonth = exports.getDayCountOfMonth = exports.setTime = exports.parseDate = exports.formatDate = exports.isValidValueArr = exports.isValidValue = exports.toDate = exports.diffDate = exports.equalYearAndMonth = exports.equalDateArr = exports.equalDate = exports.YEARS_ARRAY = exports.MONTH_ARRRY = exports.dateFormat = exports.timeFormat = void 0;

require("core-js/modules/es6.regexp.replace");

var _date = _interopRequireDefault(require("./date"));

var _locale = _interopRequireDefault(require("./locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = _locale.default.t;
var weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
_date.default.i18n = {
  dayNamesShort: weeks.map(function (week) {
    return t("fishd.datepicker.weeks." + week);
  }),
  dayNames: weeks.map(function (week) {
    return t("fishd.datepicker.weeks." + week);
  }),
  monthNamesShort: months.map(function (month) {
    return t("fishd.datepicker.months." + month);
  }),
  monthNames: months.map(function (month, index) {
    return t("fishd.datepicker.month" + (index + 1));
  })
}; // 时间format

var timeFormat = function timeFormat(format) {
  if (format && format.indexOf('ss') === -1) {
    return 'HH:mm';
  } else {
    return 'HH:mm:ss';
  }
}; // 日期format


exports.timeFormat = timeFormat;

var dateFormat = function dateFormat(format) {
  if (format) return format.replace('HH:mm', '').replace(':ss', '').trim();else return 'yyyy-MM-dd';
}; // 月份数组


exports.dateFormat = dateFormat;
var MONTH_ARRRY = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']; // 年份数组

exports.MONTH_ARRRY = MONTH_ARRRY;

var YEARS_ARRAY = function YEARS_ARRAY(N) {
  if (N === void 0) {
    N = 50;
  }

  var result = [];
  var currentYearNum = new Date().getFullYear();
  var start = Math.max(currentYearNum - parseInt(N / 2), 0);

  for (var i = 0; i < N; i++) {
    result.push(start + i);
  }

  return result;
}; // 判断两个日期是否相等


exports.YEARS_ARRAY = YEARS_ARRAY;

var equalDate = function equalDate(dateA, dateB) {
  return dateA === dateB || new Date(dateA).getTime() === new Date(dateB).getTime();
}; // 判断两个日期数组是否相等


exports.equalDate = equalDate;

var equalDateArr = function equalDateArr(arrA, arrB) {
  return arrA === arrB || Array.isArray(arrA) && Array.isArray(arrB) && arrA.length === 2 && arrB.length === 2 && equalDate(arrA[0], arrB[0]) && equalDate(arrA[1], arrB[1]);
}; // 判断两个日期的年\月是否相等


exports.equalDateArr = equalDateArr;

var equalYearAndMonth = function equalYearAndMonth(dateA, dateB) {
  return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
}; // 判断两个日期差(天)


exports.equalYearAndMonth = equalYearAndMonth;

var diffDate = function diffDate(dateA, dateB) {
  var time = dateB.getTime() - dateA.getTime();
  var days = parseInt(time / (1000 * 60 * 60 * 24));
  return days;
}; // Date对象


exports.diffDate = diffDate;

var toDate = function toDate(date) {
  return isValidValue(date) ? new Date(date) : null;
}; // 判断值的合法性：Date合法


exports.toDate = toDate;

var isValidValue = function isValidValue(value) {
  if (value instanceof Date) return true;
  return false;
}; // 判断值的合法性：[Date,Date]合法


exports.isValidValue = isValidValue;

var isValidValueArr = function isValidValueArr(value) {
  if (Array.isArray(value) && value.length >= 2 && value[0] instanceof Date && value[1] instanceof Date) return true;
  return false;
}; // Date对象->string


exports.isValidValueArr = isValidValueArr;

var formatDate = function formatDate(date, format) {
  date = toDate(date);
  if (!date) return '';
  return _date.default.format(date, format || 'yyyy-MM-dd');
}; // string->Date对象


exports.formatDate = formatDate;

var parseDate = function parseDate(string, format) {
  return _date.default.parse(string, format || 'yyyy-MM-dd');
}; // 只改变时间，不改变日期


exports.parseDate = parseDate;

var setTime = function setTime(oldDate, newDate) {
  var old = new Date(oldDate.getTime());
  var hour = newDate.getHours();
  var minute = newDate.getMinutes();
  var second = newDate.getSeconds();
  var milliSeconds = newDate.getMilliseconds();
  old.setHours(hour);
  old.setMinutes(minute);
  old.setSeconds(second);
  old.setMilliseconds(milliSeconds);
  return new Date(old.getTime());
};

exports.setTime = setTime;

var getDayCountOfMonth = function getDayCountOfMonth(year, month) {
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

exports.getDayCountOfMonth = getDayCountOfMonth;

var getFirstDayOfMonth = function getFirstDayOfMonth(date) {
  var temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

exports.getFirstDayOfMonth = getFirstDayOfMonth;
var DAY_DURATION = 86400000; // return date corresponding to the first cell on datetable

exports.DAY_DURATION = DAY_DURATION;

var getStartDateOfMonth = function getStartDateOfMonth(year, month, offsetWeek) {
  if (offsetWeek === void 0) {
    offsetWeek = 0;
  }

  var result = new Date(year, month, 1);
  var day = result.getDay();

  if (day === offsetWeek) {
    result.setTime(result.getTime() - DAY_DURATION * 7);
  } else {
    var offset = getOffsetToWeekOrigin(day, offsetWeek);
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


exports.getStartDateOfMonth = getStartDateOfMonth;

function getOffsetToWeekOrigin(day, offsetWeek) {
  if (offsetWeek === void 0) {
    offsetWeek = 0;
  }

  var offset = day >= offsetWeek ? day - offsetWeek : 7 + day - offsetWeek;
  offset = offset === 0 ? 7 : offset; // if the two days collide, we force 7 days padding

  return offset;
}

var getWeekNumber = function getWeekNumber(src) {
  var date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0); // Thursday in current week decides the year.

  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); // January 4 is always in week 1.

  var week1 = new Date(date.getFullYear(), 0, 4); // Adjust to Thursday in week 1 and count number of weeks from date to week 1.

  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}; // http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number


exports.getWeekNumber = getWeekNumber;

function getDateOfISOWeek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

var prevYear = function prevYear(date) {
  var d = toDate(date);
  d.setFullYear(date.getFullYear() - 1);
  return d;
};

exports.prevYear = prevYear;

var nextYear = function nextYear(date) {
  var d = toDate(date);
  d.setFullYear(date.getFullYear() + 1);
  return d;
};

exports.nextYear = nextYear;

var prevMonth = function prevMonth(src) {
  var clone = new Date(src.getTime());
  var year = clone.getFullYear();
  var month = clone.getMonth();
  var date = clone.getDate();
  var newYear = month === 0 ? year - 1 : year;
  var newMonth = month === 0 ? 11 : month - 1;
  var newMonthDayCount = getDayCountOfMonth(newYear, newMonth);

  if (newMonthDayCount < date) {
    clone.setDate(newMonthDayCount);
  }

  clone.setMonth(newMonth);
  clone.setFullYear(newYear);
  return clone;
};

exports.prevMonth = prevMonth;

var nextMonth = function nextMonth(src) {
  var clone = new Date(src.getTime());
  var year = clone.getFullYear();
  var month = clone.getMonth();
  var date = clone.getDate();
  var newYear = month === 11 ? year + 1 : year;
  var newMonth = month === 11 ? 0 : month + 1;
  var newMonthDayCount = getDayCountOfMonth(newYear, newMonth);

  if (newMonthDayCount < date) {
    clone.setDate(newMonthDayCount);
  }

  clone.setMonth(newMonth);
  clone.setFullYear(newYear);
  return clone;
};

exports.nextMonth = nextMonth;

var getRangeHours = function getRangeHours(ranges) {
  var newArray = function newArray(start, end) {
    var result = [];

    for (var i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  };

  var hours = [];
  var disabledHours = [];
  (ranges || []).forEach(function (range) {
    var value = range.map(function (date) {
      return date.getHours();
    });
    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });

  if (disabledHours.length) {
    for (var i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1;
    }
  } else {
    for (var _i = 0; _i < 24; _i++) {
      hours[_i] = false;
    }
  }

  return hours;
};

exports.getRangeHours = getRangeHours;

var limitRange = function limitRange(date, ranges, format) {
  if (format === void 0) {
    format = 'yyyy-MM-dd HH:mm:ss';
  }

  if (!ranges || !ranges.length) return date;
  var len = ranges.length;
  date = _date.default.parse(_date.default.format(date, format), format);

  for (var i = 0; i < len; i++) {
    var range = ranges[i];

    if (date >= range[0] && date <= range[1]) {
      return date;
    }
  }

  var maxDate = ranges[0][0];
  var minDate = ranges[0][0];
  ranges.forEach(function (range) {
    minDate = new Date(Math.min(range[0], minDate));
    maxDate = new Date(Math.max(range[1], maxDate));
  });
  return date < minDate ? minDate : maxDate;
}; // 判断日期是否在范围以内


exports.limitRange = limitRange;

var isLimitRange = function isLimitRange(date, ranges, format) {
  if (format === void 0) {
    format = 'yyyy-MM-dd HH:mm:ss';
  }

  if (!ranges || !ranges.length) return true;
  var len = ranges.length;
  date = _date.default.parse(_date.default.format(date, format), format);

  for (var i = 0; i < len; i++) {
    var range = ranges[i];

    if (date >= range[0] && date <= range[1]) {
      return true;
    }
  }

  return false;
};

exports.isLimitRange = isLimitRange;

function hasClass(target, classname) {
  return target.classList.contains(classname);
}

var SELECTION_MODES = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  RANGE: 'range'
};
exports.SELECTION_MODES = SELECTION_MODES;

function deconstructDate(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    week: getWeekNumber(date)
  };
}