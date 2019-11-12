"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Responsible for validating positions and is used
 * when manipulating positions across the application
 */
var Position =
/*#__PURE__*/
function () {
  /**
   * @param {number} left
   * @param {number} top
   * @param {number} right
   * @param {number} bottom
   */
  function Position(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$left = _ref.left,
        left = _ref$left === void 0 ? 0 : _ref$left,
        _ref$top = _ref.top,
        top = _ref$top === void 0 ? 0 : _ref$top,
        _ref$right = _ref.right,
        right = _ref$right === void 0 ? 0 : _ref$right,
        _ref$bottom = _ref.bottom,
        bottom = _ref$bottom === void 0 ? 0 : _ref$bottom;

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }
  /**
   * Checks if the position is valid to be highlighted
   * @returns {boolean}
   * @public
   */


  var _proto = Position.prototype;

  _proto.canHighlight = function canHighlight() {
    return this.left < this.right && this.top < this.bottom;
  };

  return Position;
}();

exports.default = Position;