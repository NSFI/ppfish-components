"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_VALUE_RESOLVER_MAP = exports.RANGE_PARSER = exports.RANGE_FORMATTER = exports.DATE_PARSER = exports.DATE_FORMATTER = exports.HAVE_TRIGGER_TYPES = exports.DEFAULT_FORMATS = exports.RANGE_SEPARATOR = void 0;

var _date = require("../../utils/date");

var RANGE_SEPARATOR = ' - ';
exports.RANGE_SEPARATOR = RANGE_SEPARATOR;
var DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  week: 'yyyywWW',
  time: 'HH:mm:ss',
  timerange: 'HH:mm:ss',
  timeselect: 'HH:mm',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
};
exports.DEFAULT_FORMATS = DEFAULT_FORMATS;
var HAVE_TRIGGER_TYPES = ['date', 'datetime', 'time', 'timeselect', 'week', 'month', 'year', 'daterange', 'timerange', 'datetimerange'];
exports.HAVE_TRIGGER_TYPES = HAVE_TRIGGER_TYPES;

var DATE_FORMATTER = function DATE_FORMATTER(value, format) {
  return (0, _date.formatDate)(value, format);
};

exports.DATE_FORMATTER = DATE_FORMATTER;

var DATE_PARSER = function DATE_PARSER(text, format) {
  return (0, _date.parseDate)(text, format);
};

exports.DATE_PARSER = DATE_PARSER;

var RANGE_FORMATTER = function RANGE_FORMATTER(value, format) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RANGE_SEPARATOR;

  if (Array.isArray(value) && value.length === 2) {
    var start = value[0];
    var end = value[1];

    if (start && end) {
      return (0, _date.formatDate)(start, format) + separator + (0, _date.formatDate)(end, format);
    }
  }

  return '';
};

exports.RANGE_FORMATTER = RANGE_FORMATTER;

var RANGE_PARSER = function RANGE_PARSER(text, format) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RANGE_SEPARATOR;
  var array = text.split(separator);

  if (array.length === 2) {
    var range1 = array[0];
    var range2 = array[1];
    return [(0, _date.parseDate)(range1, format), (0, _date.parseDate)(range2, format)];
  }

  return [];
};

exports.RANGE_PARSER = RANGE_PARSER;
var TYPE_VALUE_RESOLVER_MAP = {
  "default": {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      if (text === undefined || text === '') return null;
      return text;
    }
  },
  week: {
    formatter: function formatter(value, format) {
      if (value instanceof Date) {
        if (!format) {
          var weekNumber = (0, _date.getWeekNumber)(value);
          return value.getFullYear() + 'w' + (weekNumber > 9 ? weekNumber : '0' + weekNumber);
        } else {
          var str = '';

          if (format.indexOf('W') === -1) {
            // 当周面板format为具体日期，展示为日期范围格式
            str = RANGE_FORMATTER([value, new Date(value.getTime() + 3600 * 24 * 6 * 1000)], format);
          } else {
            str = DATE_FORMATTER(value, format);

            if (str) {
              var weekno = (0, _date.deconstructDate)(new Date(value.getTime() + _date.DAY_DURATION)).week;
              str = /WW/.test(str) ? str.replace(/WW/, weekno < 10 ? "0".concat(weekno) : weekno) : str.replace(/W/, weekno);
            }
          }

          return str;
        }
      }

      return '';
    },
    parser: function parser(text, format) {
      var weekno = function weekno(matcher, src) {
        var str = src.substr(matcher.index, matcher.length);

        if (/\d\d?/.test(str)) {
          return {
            week: Number(str),
            isValid: true
          };
        } else {
          return {
            week: -1,
            isValid: false
          };
        }
      };

      var date = DATE_PARSER(text, format);
      var matcher = format.match(/(WW?)/);
      var wn = null;
      if (!matcher) return date;else {
        if (text.length > format.length) return '';

        switch (matcher.length) {
          case 1:
            wn = weekno(matcher, text);
            if (!wn.isValid) return '';
            break;

          case 2:
            wn = weekno(matcher, text);
            if (!wn.isValid) return '';
            break;

          default:
            throw new Error('never reach here');
        }

        return (0, _date.getDateOfISOWeek)(wn.week, date.getFullYear());
      }
    }
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  timeselect: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_FORMATTER
  },
  number: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      var result = Number(text);

      if (!isNaN(text)) {
        return result;
      } else {
        return null;
      }
    }
  }
};
exports.TYPE_VALUE_RESOLVER_MAP = TYPE_VALUE_RESOLVER_MAP;