"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _overlay = _interopRequireDefault(require("./core/overlay"));

var _element = _interopRequireDefault(require("./core/element"));

var _popover = _interopRequireDefault(require("./core/popover"));

var _constants = require("./common/constants");

var _stage = _interopRequireDefault(require("./core/stage"));

var _utils = require("./common/utils");

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Plugin class that drives the plugin
 */
var Driver =
/*#__PURE__*/
function () {
  /**
   * @param {Object} options
   */
  function Driver() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Driver);

    this.options = _objectSpread({
      animate: _constants.SHOULD_ANIMATE_OVERLAY,
      // Whether to animate or not
      opacity: _constants.OVERLAY_OPACITY,
      // Overlay opacity
      padding: _constants.OVERLAY_PADDING,
      // Spacing around the element from the overlay
      scrollIntoViewOptions: null,
      // Options to be passed to `scrollIntoView`
      counter: _constants.SHOULD_SHOW_COUNTER,
      allowClose: _constants.SHOULD_OUTSIDE_CLICK_CLOSE,
      // Whether to close overlay on click outside the element
      keyboardControl: _constants.ALLOW_KEYBOARD_CONTROL,
      // Whether to allow controlling through keyboard or not
      overlayClickNext: _constants.SHOULD_OUTSIDE_CLICK_NEXT,
      // Whether to move next on click outside the element
      stageBackground: '#ffffff',
      // Background color for the stage
      onHighlightStarted: function onHighlightStarted() {
        return null;
      },
      // When element is about to be highlighted
      onHighlighted: function onHighlighted() {
        return null;
      },
      // When element has been highlighted
      onDeselected: function onDeselected() {
        return null;
      },
      // When the element has been deselected
      onReset: function onReset() {
        return null;
      },
      // When overlay is about to be cleared
      onNext: function onNext() {
        return null;
      },
      // When next button is clicked
      onPrevious: function onPrevious() {
        return null;
      }
    }, options);
    this.document = document;
    this.window = window;
    this.isActivated = false;
    this.steps = []; // steps to be presented if any

    this.currentStep = 0; // index for the currently highlighted step

    this.currentMovePrevented = false; // If the current move was prevented

    this.overlay = new _overlay["default"](this.options, window, document);
    this.onResize = this.onResize.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.movePrevious = this.movePrevious.bind(this);
    this.preventMove = this.preventMove.bind(this); // Event bindings

    this.bind();
  }
  /**
   * Getter for steps property
   * @readonly
   * @public
   */


  _createClass(Driver, [{
    key: "getSteps",
    value: function getSteps() {
      return this.steps;
    }
    /**
     * Setter for steps property
     * @param steps
     * @public
     */

  }, {
    key: "setSteps",
    value: function setSteps(steps) {
      this.steps = steps;
    }
    /**
     * Binds any DOM events listeners
     * @todo: add throttling in all the listeners
     * @private
     */

  }, {
    key: "bind",
    value: function bind() {
      this.window.addEventListener('resize', this.onResize, false);
      this.window.addEventListener('keyup', this.onKeyUp, false); // Binding both touch and click results in popup getting shown and then immediately get hidden.
      // Adding the check to not bind the click event if the touch is supported i.e. on mobile devices
      // Issue: https://github.com/kamranahmedse/driver.js/issues/150

      if (!('ontouchstart' in document.documentElement)) {
        this.window.addEventListener('click', this.onClick, false);
      }

      this.window.addEventListener('touchstart', this.onClick, false);
    }
    /**
     * Removes the popover if clicked outside the highlighted element
     * or outside the
     * @param e
     * @private
     */

  }, {
    key: "onClick",
    value: function onClick(e) {
      if (!this.isActivated || !this.hasHighlightedElement()) {
        return;
      } // Stop the event propagation on click/tap. `onClick` handles
      // both touch and click events – which on some browsers causes
      // the click to close the tour


      e.stopPropagation();
      var highlightedElement = this.overlay.getHighlightedElement();
      var popover = this.document.getElementById(_constants.ID_POPOVER);
      var clickedHighlightedElement = highlightedElement.node.contains(e.target);
      var clickedPopover = popover && popover.contains(e.target); // Perform the 'Next' operation when clicked outside the highlighted element

      if (!clickedHighlightedElement && !clickedPopover && this.options.overlayClickNext) {
        this.handleNext();
        return;
      } // Remove the overlay If clicked outside the highlighted element


      if (!clickedHighlightedElement && !clickedPopover && this.options.allowClose) {
        this.reset();
        return;
      }

      var nextClicked = e.target.classList.contains(_constants.CLASS_NEXT_STEP_BTN);
      var prevClicked = e.target.classList.contains(_constants.CLASS_PREV_STEP_BTN);
      var closeClicked = e.target.classList.contains(_constants.CLASS_CLOSE_BTN) || e.target.classList.contains(_constants.CLASS_SKIP_BTN);

      if (closeClicked) {
        this.reset();
        return;
      }

      if (nextClicked) {
        this.handleNext();
      } else if (prevClicked) {
        this.handlePrevious();
      }
    }
    /**
     * Handler for the onResize DOM event
     * Makes sure highlighted element stays at valid position
     * @private
     */

  }, {
    key: "onResize",
    value: function onResize() {
      if (!this.isActivated) {
        return;
      }

      this.refresh();
    }
    /**
     * Refreshes and repositions the popover and the overlay
     */

  }, {
    key: "refresh",
    value: function refresh() {
      this.overlay.refresh();
    }
    /**
     * Clears the overlay on escape key process
     * @param event
     * @private
     */

  }, {
    key: "onKeyUp",
    value: function onKeyUp(event) {
      // If driver is not active or keyboard control is disabled
      if (!this.isActivated || !this.options.keyboardControl) {
        return;
      } // If escape was pressed and it is allowed to click outside to close


      if (event.keyCode === _constants.ESC_KEY_CODE) {
        this.reset();
        return;
      } // If there is no highlighted element or there is a highlighted element
      // without popover or if the popover does not allow buttons - ignore


      var highlightedElement = this.getHighlightedElement();

      if (!highlightedElement || !highlightedElement.popover) {
        return;
      }

      if (event.keyCode === _constants.RIGHT_KEY_CODE) {
        this.handleNext();
      } else if (event.keyCode === _constants.LEFT_KEY_CODE) {
        this.handlePrevious();
      }
    }
    /**
     * Moves to the previous step if possible
     * otherwise resets the overlay
     * @public
     */

  }, {
    key: "movePrevious",
    value: function movePrevious() {
      var previousStep = this.steps[this.currentStep - 1];

      if (!previousStep) {
        // this.reset();
        return;
      }

      this.overlay.highlight(previousStep);
      this.currentStep -= 1;
    }
    /**
     * Prevents the current move. Useful in `onNext` if you want to
     * perform some asynchronous task and manually move to next step
     * @public
     */

  }, {
    key: "preventMove",
    value: function preventMove() {
      this.currentMovePrevented = true;
    }
    /**
     * Handles the internal "move to next" event
     * @private
     */

  }, {
    key: "handleNext",
    value: function handleNext() {
      this.currentMovePrevented = false; // Call the bound `onNext` handler if available

      var currentStep = this.steps[this.currentStep];

      if (currentStep && currentStep.options && currentStep.options.onNext) {
        currentStep.options.onNext(this.overlay.highlightedElement);
      }

      if (this.currentMovePrevented) {
        return;
      }

      this.moveNext();
    }
    /**
     * Handles the internal "move to previous" event
     * @private
     */

  }, {
    key: "handlePrevious",
    value: function handlePrevious() {
      this.currentMovePrevented = false; // Call the bound `onPrevious` handler if available

      var currentStep = this.steps[this.currentStep];

      if (currentStep && currentStep.options && currentStep.options.onPrevious) {
        currentStep.options.onPrevious(this.overlay.highlightedElement);
      }

      if (this.currentMovePrevented) {
        return;
      }

      this.movePrevious();
    }
    /**
     * Moves to the next step if possible
     * otherwise resets the overlay
     * @public
     */

  }, {
    key: "moveNext",
    value: function moveNext() {
      var nextStep = this.steps[this.currentStep + 1];

      if (!nextStep) {
        this.reset();
        return;
      }

      this.overlay.highlight(nextStep);
      this.currentStep += 1;
    }
    /**
     * @returns {boolean}
     * @public
     */

  }, {
    key: "hasNextStep",
    value: function hasNextStep() {
      return !!this.steps[this.currentStep + 1];
    }
    /**
     * @returns {boolean}
     * @public
     */

  }, {
    key: "hasPreviousStep",
    value: function hasPreviousStep() {
      return !!this.steps[this.currentStep - 1];
    }
    /**
     * Resets the steps if any and clears the overlay
     * @param {boolean} immediate
     * @public
     */

  }, {
    key: "reset",
    value: function reset() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.currentStep = 0;
      this.isActivated = false;
      this.overlay.clear(immediate);
    }
    /**
     * Checks if there is any highlighted element or not
     * @returns {boolean}
     * @public
     */

  }, {
    key: "hasHighlightedElement",
    value: function hasHighlightedElement() {
      var highlightedElement = this.overlay.getHighlightedElement();
      return highlightedElement && highlightedElement.node;
    }
    /**
     * Gets the currently highlighted element in overlay
     * @returns {Element}
     * @public
     */

  }, {
    key: "getHighlightedElement",
    value: function getHighlightedElement() {
      return this.overlay.getHighlightedElement();
    }
    /**
     * Gets the element that was highlighted before currently highlighted element
     * @returns {Element}
     * @public
     */

  }, {
    key: "getLastHighlightedElement",
    value: function getLastHighlightedElement() {
      return this.overlay.getLastHighlightedElement();
    }
    /**
     * Defines steps to be highlighted
     * @param {array} steps
     * @public
     */

  }, {
    key: "defineSteps",
    value: function defineSteps(steps) {
      this.steps = [];

      for (var counter = 0; counter < steps.length; counter++) {
        var element = this.prepareElementFromStep(steps[counter], steps, counter);

        if (!element) {
          continue;
        }

        this.steps.push(element);
      }
    }
    /**
     * Prepares the step received from the user and returns an instance
     * of Element
     *
     * @param currentStep Step that is being prepared
     * @param allSteps  List of all the steps
     * @param index Index of the current step
     * @returns {null|Element}
     * @private
     */

  }, {
    key: "prepareElementFromStep",
    value: function prepareElementFromStep(currentStep) {
      var allSteps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var elementOptions = _objectSpread({}, this.options);

      var querySelector = currentStep; // If the `currentStep` is step definition
      // then grab the options and element from the definition

      var isStepDefinition = typeof currentStep !== 'string' && !(0, _utils.isDomElement)(currentStep);

      if (!currentStep || isStepDefinition && !currentStep.element) {
        throw new Error("Element is required in step ".concat(index));
      }

      if (isStepDefinition) {
        querySelector = currentStep.element;
        elementOptions = _objectSpread({}, this.options, {}, currentStep);
      } // If the given element is a query selector or a DOM element?


      var domElement = (0, _utils.isDomElement)(querySelector) ? querySelector : this.document.querySelector(querySelector);

      if (!domElement) {
        // console.warn(`Element to highlight ${querySelector} not found`);
        return null;
      }

      var popover = null;

      if (elementOptions.popover && elementOptions.popover.title) {
        var mergedClassNames = [this.options.className, elementOptions.popover.className].filter(function (c) {
          return c;
        }).join(' ');

        var popoverOptions = _objectSpread({}, elementOptions, {}, elementOptions.popover, {
          className: mergedClassNames,
          totalCount: allSteps.length,
          currentIndex: index,
          isFirst: index === 0,
          isLast: allSteps.length === 0 || index === allSteps.length - 1 // Only one item or last item

        });

        popover = new _popover["default"](popoverOptions, this.window, this.document);
      }

      var stageOptions = _objectSpread({}, elementOptions, {
        totalCount: allSteps.length,
        currentIndex: index
      });

      var stage = new _stage["default"](stageOptions, this.window, this.document);
      return new _element["default"]({
        node: domElement,
        options: elementOptions,
        popover: popover,
        stage: stage,
        overlay: this.overlay,
        window: this.window,
        document: this.document
      });
    }
    /**
     * Initiates highlighting steps from first step
     * @param {number} index at which highlight is to be started
     * @public
     */

  }, {
    key: "start",
    value: function start() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (!this.steps || this.steps.length === 0) {
        throw new Error('There are no steps defined to iterate');
      }

      this.isActivated = true;
      this.currentStep = index;
      this.overlay.highlight(this.steps[index]);
    }
    /**
     * Highlights the given element
     * @param {string|{element: string, popover: {}}} selector Query selector or a step definition
     * @public
     */

  }, {
    key: "highlight",
    value: function highlight(selector) {
      this.isActivated = true;
      var element = this.prepareElementFromStep(selector);

      if (!element) {
        return;
      }

      this.overlay.highlight(element);
    }
  }]);

  return Driver;
}();

exports["default"] = Driver;