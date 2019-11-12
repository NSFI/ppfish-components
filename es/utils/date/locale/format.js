"use strict";

exports.__esModule = true;
exports.default = _default;

require("core-js/modules/es6.regexp.replace");

/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 * format
 *
 * @param {String} string
 * @param {Array} ...args
 * @return {String}
 */

function _default(string) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length === 1 && typeof args[0] === 'object') {
    args = args[0];
  }

  if (!args || !args.hasOwnProperty) {
    args = {};
  }

  if (!string) return;
  return string.replace(RE_NARGS, function (match, prefix, i, index) {
    var result;

    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return i;
    } else {
      result = Object.prototype.hasOwnProperty.call(args, i) ? args[i] : null;

      if (result === null || result === undefined) {
        return '';
      }

      return result;
    }
  });
}