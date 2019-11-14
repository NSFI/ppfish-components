function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { ANIMATION_DURATION_MS, ID_OVERLAY, OVERLAY_HTML } from '../common/constants';
import { createNodeFromString } from '../common/utils';
/**
 * Responsible for overlay creation and manipulation i.e.
 * cutting out the visible part, animating between the sections etc
 */

var Overlay =
/*#__PURE__*/
function () {
  /**
   * @param {Object} options
   * @param {Window} window
   * @param {Document} document
   */
  function Overlay(options, window, document) {
    _classCallCheck(this, Overlay);

    this.options = options;
    this.highlightedElement = null; // currently highlighted dom element (instance of Element)

    this.lastHighlightedElement = null; // element that was highlighted before current one

    this.hideTimer = null;
    this.window = window;
    this.document = document;
    this.removeNode = this.removeNode.bind(this);
  }
  /**
   * Prepares the overlay
   * @private
   */


  _createClass(Overlay, [{
    key: "attachNode",
    value: function attachNode() {
      var pageOverlay = this.document.getElementById(ID_OVERLAY);

      if (!pageOverlay) {
        pageOverlay = createNodeFromString(OVERLAY_HTML);
        document.body.appendChild(pageOverlay);
      }

      this.node = pageOverlay;
      this.node.style.opacity = '0';

      if (!this.options.animate) {
        // For non-animation cases remove the overlay because we achieve this overlay by having
        // a higher box-shadow on the stage. Why are we doing it that way? Because the stage that
        // is shown "behind" the highlighted element to make it pop out of the screen, it introduces
        // some stacking contexts issues. To avoid those issues we just make the stage background
        // transparent and achieve the overlay using the shadow so to make the element below it visible
        // through the stage even if there are stacking issues.
        if (this.node.parentElement) {
          this.node.parentElement.removeChild(this.node);
        }
      }
    }
    /**
     * Highlights the dom element on the screen
     * @param {Element} element
     * @public
     */

  }, {
    key: "highlight",
    value: function highlight(element) {
      if (!element || !element.node) {
        // console.warn('Invalid element to highlight. Must be an instance of `Element`');
        return;
      } // If highlighted element is not changed from last time


      if (element.isSame(this.highlightedElement)) {
        return;
      } // There might be hide timer from last time
      // which might be getting triggered


      this.window.clearTimeout(this.hideTimer); // Trigger the hook for highlight started

      element.onHighlightStarted(); // Old element has been deselected

      if (this.highlightedElement && !this.highlightedElement.isSame(this.lastHighlightedElement)) {
        this.highlightedElement.onDeselected();
      } // get the position of element around which we need to draw


      var position = element.getCalculatedPosition();

      if (!position.canHighlight()) {
        return;
      }

      this.lastHighlightedElement = this.highlightedElement;
      this.highlightedElement = element;
      this.show(); // Element has been highlighted

      this.highlightedElement.onHighlighted();
    }
    /**
     * Shows the overlay on whole screen
     * @public
     */

  }, {
    key: "show",
    value: function show() {
      var _this = this;

      if (this.node && this.node.parentElement) {
        return;
      }

      this.attachNode();
      window.setTimeout(function () {
        _this.node.style.opacity = "".concat(_this.options.opacity);
        _this.node.style.position = 'fixed';
        _this.node.style.left = '0';
        _this.node.style.top = '0';
        _this.node.style.bottom = '0';
        _this.node.style.right = '0';
      });
    }
    /**
     * Returns the currently selected element
     * @returns {null|*}
     * @public
     */

  }, {
    key: "getHighlightedElement",
    value: function getHighlightedElement() {
      return this.highlightedElement;
    }
    /**
     * Gets the element that was highlighted before current element
     * @returns {null|*}
     * @public
     */

  }, {
    key: "getLastHighlightedElement",
    value: function getLastHighlightedElement() {
      return this.lastHighlightedElement;
    }
    /**
     * Removes the overlay and cancel any listeners
     * @public
     */

  }, {
    key: "clear",
    value: function clear() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // Callback for when overlay is about to be reset
      if (this.options.onReset) {
        this.options.onReset(this.highlightedElement);
      } // Deselect the highlighted element if any


      if (this.highlightedElement) {
        var hideStage = true;
        this.highlightedElement.onDeselected(hideStage);
      }

      this.highlightedElement = null;
      this.lastHighlightedElement = null;

      if (!this.node) {
        return;
      } // Clear any existing timers and remove node


      this.window.clearTimeout(this.hideTimer);

      if (this.options.animate && !immediate) {
        this.node.style.opacity = '0';
        this.hideTimer = this.window.setTimeout(this.removeNode, ANIMATION_DURATION_MS);
      } else {
        this.removeNode();
      }
    }
    /**
     * Removes the overlay node if it exists
     * @private
     */

  }, {
    key: "removeNode",
    value: function removeNode() {
      if (this.node && this.node.parentElement) {
        this.node.parentElement.removeChild(this.node);
      }
    }
    /**
     * Refreshes the overlay i.e. sets the size according to current window size
     * And moves the highlight around if necessary
     * @public
     */

  }, {
    key: "refresh",
    value: function refresh() {
      // If no highlighted element, cancel the refresh
      if (!this.highlightedElement) {
        return;
      } // Reposition the stage and show popover


      this.highlightedElement.showPopover();
      this.highlightedElement.showStage();
    }
  }]);

  return Overlay;
}();

export { Overlay as default };