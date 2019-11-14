function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  function Position() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$left = _ref.left,
        left = _ref$left === void 0 ? 0 : _ref$left,
        _ref$top = _ref.top,
        top = _ref$top === void 0 ? 0 : _ref$top,
        _ref$right = _ref.right,
        right = _ref$right === void 0 ? 0 : _ref$right,
        _ref$bottom = _ref.bottom,
        bottom = _ref$bottom === void 0 ? 0 : _ref$bottom;

    _classCallCheck(this, Position);

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


  _createClass(Position, [{
    key: "canHighlight",
    value: function canHighlight() {
      return this.left < this.right && this.top < this.bottom;
    }
  }]);

  return Position;
}();

export { Position as default };