/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

/**
 * format
 *
 * @param {String} string
 * @param {Array} ...args
 * @return {String}
 */

export default function(string, ...args) {
  let values

  if ((args as any[]).length === 1 && typeof args[0] === 'object') {
    values = args[0];
  }

  if (!args || !args.hasOwnProperty) {
    values = {};
  }

  if(!string) return;

  return string.replace(RE_NARGS, (match, prefix, i, index) => {
    let result;

    if (string[index - 1] === '{' &&
      string[index + match.length] === '}') {
      return i;
    } else {
      result = Object.prototype.hasOwnProperty.call(values, i) ? values[i] : null;
      if (result === null || result === undefined) {
        return '';
      }

      return result;
    }
  });
}
