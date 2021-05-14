/**
 * Responsible for validating positions and is used
 * when manipulating positions across the application
 */
export default class Position {
  constructor(props) {
    this.left = props.left || 0;
    this.right = props.right || 0;
    this.top = props.top || 0;
    this.bottom = props.bottom || 0;
  }

  /**
   * Checks if the position is valid to be highlighted
   * @returns {boolean}
   * @public
   */
  canHighlight() {
    return this.left < this.right && this.top < this.bottom;
  }
}
