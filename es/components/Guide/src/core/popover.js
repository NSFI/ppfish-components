function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Element from './element';
import { CLASS_BTN_DISABLED, CLASS_CLOSE_BTN, CLASS_SKIP_BTN, CLASS_NEXT_STEP_BTN, CLASS_POPOVER_DESCRIPTION, CLASS_POPOVER_FOOTER, CLASS_POPOVER_TIP, CLASS_POPOVER_TITLE, CLASS_PREV_STEP_BTN, ID_POPOVER, POPOVER_HTML } from '../common/constants';
import { createNodeFromString } from '../common/utils';
/**
 * Popover that is displayed on top of the highlighted element
 */

var Popover =
/*#__PURE__*/
function (_Element) {
  _inherits(Popover, _Element);

  /**
   * @param {Object} options
   * @param {Window} window
   * @param {Document} document
   */
  function Popover(options, window, document) {
    var _this;

    _classCallCheck(this, Popover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Popover).call(this));
    _this.options = _objectSpread({
      isFirst: true,
      isLast: true,
      totalCount: 1,
      currentIndex: 0,
      offset: 0,
      showButtons: true,
      skipBtnText: '跳过',
      doneBtnText: '知道了',
      startBtnText: '下一步',
      nextBtnText: '下一步',
      prevBtnText: '上一步'
    }, options);
    _this.options.doneBtnText += " (".concat(_this.options.totalCount, "/").concat(_this.options.totalCount, ")");
    _this.options.nextBtnText += " (".concat(_this.options.currentIndex + 1, "/").concat(_this.options.totalCount, ")");
    _this.window = window;
    _this.document = document;
    return _this;
  }
  /**
   * Prepares the dom element for popover
   * @private
   */


  _createClass(Popover, [{
    key: "attachNode",
    value: function attachNode() {
      var popover = this.document.getElementById(ID_POPOVER);

      if (popover) {
        popover.parentElement.removeChild(popover);
      }

      popover = createNodeFromString(POPOVER_HTML(this.options.className));
      document.body.appendChild(popover);
      this.node = popover;
      this.tipNode = popover.querySelector(".".concat(CLASS_POPOVER_TIP));
      this.titleNode = popover.querySelector(".".concat(CLASS_POPOVER_TITLE));
      this.descriptionNode = popover.querySelector(".".concat(CLASS_POPOVER_DESCRIPTION));
      this.footerNode = popover.querySelector(".".concat(CLASS_POPOVER_FOOTER));
      this.nextBtnNode = popover.querySelector(".".concat(CLASS_NEXT_STEP_BTN));
      this.prevBtnNode = popover.querySelector(".".concat(CLASS_PREV_STEP_BTN));
      this.closeBtnNode = popover.querySelector(".".concat(CLASS_CLOSE_BTN));
      this.skipBtnNode = popover.querySelector(".".concat(CLASS_SKIP_BTN));
    }
    /**
     * Gets the title node for the popover
     * @returns {Element | null | *}
     * @public
     */

  }, {
    key: "getTitleNode",
    value: function getTitleNode() {
      return this.titleNode;
    }
    /**
     * Gets the description node for the popover
     * @returns {Element | null | *}
     * @public
     */

  }, {
    key: "getDescriptionNode",
    value: function getDescriptionNode() {
      return this.descriptionNode;
    }
    /**
     * Hides the popover
     * @public
     */

  }, {
    key: "hide",
    value: function hide() {
      // If hide is called when the node isn't created yet
      if (!this.node) {
        return;
      }

      this.node.style.display = 'none';
    }
    /**
     * Sets the default state for the popover
     * @private
     */

  }, {
    key: "setInitialState",
    value: function setInitialState() {
      this.node.style.display = 'block';
      this.node.style.left = '0';
      this.node.style.top = '0';
      this.node.style.bottom = '';
      this.node.style.right = ''; // Remove the positional classes from tip

      this.node.querySelector(".".concat(CLASS_POPOVER_TIP)).className = CLASS_POPOVER_TIP;
    }
    /**
     * Shows the popover at the given position
     * @param {Position} position
     * @public
     */

  }, {
    key: "show",
    value: function show(position) {
      this.attachNode();
      this.setInitialState(); // Set the title and descriptions

      this.titleNode.innerHTML = this.options.title;
      this.descriptionNode.innerHTML = this.options.description || '';
      this.renderFooter(); // Position the popover around the given position

      switch (this.options.position) {
        case 'leftTop':
          this.positionOnLeft(position);
          break;

        case 'left':
          this.positionOnLeftCenter(position);
          break;

        case 'leftBottom':
          this.positionOnLeftBottom(position);
          break;

        case 'rightTop':
          this.positionOnRight(position);
          break;

        case 'right':
          this.positionOnRightCenter(position);
          break;

        case 'rightBottom':
          this.positionOnRightBottom(position);
          break;

        case 'topLeft':
          this.positionOnTop(position);
          break;

        case 'top':
          this.positionOnTopCenter(position);
          break;

        case 'topRight':
          this.positionOnTopRight(position);
          break;

        case 'bottomLeft':
          this.positionOnBottom(position);
          break;

        case 'bottom':
          this.positionOnBottomCenter(position);
          break;

        case 'bottomRight':
          this.positionOnBottomRight(position);
          break;

        case 'midCenter':
          this.positionOnMidCenter(position);
          break;

        case 'auto':
        default:
          this.positionOnBottom(position); // this.autoPosition(position);

          break;
      } // Bring the popover in view port once it is displayed


      this.bringInView();
    }
    /**
     * Enables, disables buttons, sets the text and
     * decides if to show them or not
     * @private
     */

  }, {
    key: "renderFooter",
    value: function renderFooter() {
      this.nextBtnNode.innerHTML = this.options.nextBtnText;
      this.prevBtnNode.innerHTML = this.options.prevBtnText;
      this.skipBtnNode.innerHTML = this.options.skipBtnText;
      var hasSteps = this.options.totalCount && this.options.totalCount !== 1; // If there was only one item, hide the buttons

      if (!this.options.showButtons) {
        this.footerNode.style.display = 'none';
        return;
      } // If this is just a single highlighted element i.e. there
      // are no other steps to go to – just hide the navigation buttons


      if (!hasSteps) {
        this.footerNode.style.display = 'none';
        this.closeBtnNode.style.display = 'block';
      } else {
        this.closeBtnNode.style.display = 'none';
        this.footerNode.style.display = 'block';
      }

      if (this.options.isFirst) {
        this.prevBtnNode.classList.add(CLASS_BTN_DISABLED);
        this.nextBtnNode.innerHTML = this.options.startBtnText;
      } else {
        this.prevBtnNode.classList.remove(CLASS_BTN_DISABLED);
      }

      if (this.options.isLast) {
        this.nextBtnNode.innerHTML = this.options.doneBtnText;
      } else {
        this.nextBtnNode.innerHTML = this.options.nextBtnText;
      }
    }
    /**
     * Shows the popover on the left of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnLeft",
    value: function positionOnLeft(elementPosition) {
      var popoverWidth = this.getSize().width;
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      this.node.style.left = "".concat(elementPosition.left - popoverWidth - popoverMargin, "px");
      this.node.style.top = "".concat(elementPosition.top + this.options.offset - this.options.padding, "px");
      this.node.style.right = '';
      this.node.style.bottom = '';
      this.tipNode.classList.add('right');
    }
    /**
     * Shows the popover on the left of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnLeftBottom",
    value: function positionOnLeftBottom(elementPosition) {
      var popoverDimensions = this.getSize();
      var popoverWidth = popoverDimensions.width;
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      this.node.style.left = "".concat(elementPosition.left - popoverWidth - popoverMargin, "px");
      this.node.style.top = "\n    ".concat(elementPosition.bottom + this.options.padding + this.options.offset - popoverDimensions.height, "px");
      this.node.style.bottom = '';
      this.node.style.right = '';
      this.tipNode.classList.add('right', 'position-bottom');
    }
    /**
     * Shows the popover on the left center of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnLeftCenter",
    value: function positionOnLeftCenter(elementPosition) {
      var popoverDimensions = this.getSize();
      var popoverWidth = popoverDimensions.width;
      var popoverHeight = popoverDimensions.height;
      var popoverCenter = popoverHeight / 2;
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      var elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
      var topCenterPosition = elementPosition.top - popoverCenter + elementCenter + this.options.offset;
      this.node.style.left = "".concat(elementPosition.left - popoverWidth - popoverMargin, "px");
      this.node.style.top = "".concat(topCenterPosition, "px");
      this.node.style.right = '';
      this.node.style.bottom = '';
      this.tipNode.classList.add('right', 'position-center');
    }
    /**
     * Shows the popover on the right of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnRight",
    value: function positionOnRight(elementPosition) {
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      this.node.style.left = "".concat(elementPosition.right + popoverMargin, "px");
      this.node.style.top = "".concat(elementPosition.top + this.options.offset - this.options.padding, "px");
      this.node.style.right = '';
      this.node.style.bottom = '';
      this.tipNode.classList.add('left');
    }
    /**
     * Shows the popover on the right of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnRightCenter",
    value: function positionOnRightCenter(elementPosition) {
      var popoverDimensions = this.getSize();
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      var popoverHeight = popoverDimensions.height;
      var popoverCenter = popoverHeight / 2;
      var elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
      var topCenterPosition = elementPosition.top - popoverCenter + elementCenter + this.options.offset;
      this.node.style.left = "".concat(elementPosition.right + popoverMargin, "px");
      this.node.style.top = "".concat(topCenterPosition, "px");
      this.node.style.right = '';
      this.node.style.bottom = '';
      this.tipNode.classList.add('left', 'position-center');
    }
    /**
     * Shows the popover on the right of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnRightBottom",
    value: function positionOnRightBottom(elementPosition) {
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      var popoverDimensions = this.getSize();
      this.node.style.left = "".concat(elementPosition.right + popoverMargin, "px");
      this.node.style.top = "\n    ".concat(elementPosition.bottom + this.options.padding + this.options.offset - popoverDimensions.height, "px");
      this.node.style.bottom = '';
      this.node.style.right = '';
      this.tipNode.classList.add('left', 'position-bottom');
    }
    /**
     * Shows the popover on the top of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnTop",
    value: function positionOnTop(elementPosition) {
      var popoverHeight = this.getSize().height;
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      this.node.style.top = "".concat(elementPosition.top - popoverHeight - popoverMargin, "px");
      this.node.style.left = "".concat(elementPosition.left - this.options.padding + this.options.offset, "px");
      this.node.style.right = '';
      this.node.style.bottom = '';
      this.tipNode.classList.add('bottom');
    }
    /**
     * Shows the popover on the top center of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnTopCenter",
    value: function positionOnTopCenter(elementPosition) {
      var dimensions = this.getSize();
      var popoverHeight = dimensions.height;
      var popoverWidth = dimensions.width / 2;
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      var nodeCenter = this.options.offset + elementPosition.left + (elementPosition.right - elementPosition.left) / 2;
      this.node.style.top = "".concat(elementPosition.top - popoverHeight - popoverMargin, "px");
      this.node.style.left = "".concat(nodeCenter - popoverWidth - this.options.padding, "px");
      this.node.style.right = '';
      this.node.style.bottom = ''; // Add the tip at the top center

      this.tipNode.classList.add('bottom', 'position-center');
    }
    /**
     * Shows the popover on the top right of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnTopRight",
    value: function positionOnTopRight(elementPosition) {
      var dimensions = this.getSize();
      var popoverHeight = dimensions.height;
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      this.node.style.top = "".concat(elementPosition.top - popoverHeight - popoverMargin, "px");
      this.node.style.left = "\n    ".concat(elementPosition.right + this.options.padding + this.options.offset - dimensions.width, "px");
      this.node.style.right = '';
      this.node.style.bottom = ''; // Add the tip at the top center

      this.tipNode.classList.add('bottom', 'position-right');
    }
    /**
     * Shows the popover on the bottom of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnBottom",
    value: function positionOnBottom(elementPosition) {
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      this.node.style.top = "".concat(elementPosition.bottom + popoverMargin, "px");
      this.node.style.left = "".concat(elementPosition.left - this.options.padding + this.options.offset, "px");
      this.node.style.right = '';
      this.node.style.bottom = '';
      this.tipNode.classList.add('top');
    }
    /**
     * Shows the popover on the bottom-center of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnBottomCenter",
    value: function positionOnBottomCenter(elementPosition) {
      var popoverWidth = this.getSize().width / 2;
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      var nodeCenter = this.options.offset + elementPosition.left + (elementPosition.right - elementPosition.left) / 2;
      this.node.style.top = "".concat(elementPosition.bottom + popoverMargin, "px");
      this.node.style.left = "".concat(nodeCenter - popoverWidth - this.options.padding, "px");
      this.node.style.right = '';
      this.node.style.bottom = ''; // Add the tip at the top center

      this.tipNode.classList.add('top', 'position-center');
    }
    /**
     * Shows the popover on the bottom-right of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnBottomRight",
    value: function positionOnBottomRight(elementPosition) {
      var dimensions = this.getSize();
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      this.node.style.top = "".concat(elementPosition.bottom + popoverMargin, "px");
      this.node.style.left = "\n    ".concat(elementPosition.right + this.options.padding + this.options.offset - dimensions.width, "px");
      this.node.style.right = '';
      this.node.style.bottom = ''; // Add the tip at the top center

      this.tipNode.classList.add('top', 'position-right');
    }
    /**
     * Shows the popover on the mid-center of the given position
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "positionOnMidCenter",
    value: function positionOnMidCenter(elementPosition) {
      var popoverDimensions = this.getSize();
      var popoverHeight = popoverDimensions.height;
      var popoverWidth = popoverDimensions.width / 2;
      var popoverCenter = popoverHeight / 2;
      var elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
      var topCenterPosition = elementPosition.top - popoverCenter + elementCenter + this.options.offset;
      var nodeCenter = this.options.offset + elementPosition.left + (elementPosition.right - elementPosition.left) / 2;
      this.node.style.top = "".concat(topCenterPosition, "px");
      this.node.style.left = "".concat(nodeCenter - popoverWidth - this.options.padding, "px");
      this.node.style.right = '';
      this.node.style.bottom = ''; // Add the tip at the top center

      this.tipNode.classList.add('mid-center');
    }
    /**
     * Automatically positions the popover around the given position
     * such that the element and popover remain in view
     * @todo add the left and right positioning decisions
     * @param {Position} elementPosition
     * @private
     */

  }, {
    key: "autoPosition",
    value: function autoPosition(elementPosition) {
      var pageSize = this.getFullPageSize();
      var popoverSize = this.getSize();
      var pageHeight = pageSize.height;
      var popoverHeight = popoverSize.height;
      var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

      var pageHeightAfterPopOver = elementPosition.bottom + popoverHeight + popoverMargin; // If adding popover would go out of the window height, then show it to the top

      if (pageHeightAfterPopOver >= pageHeight) {
        this.positionOnTop(elementPosition);
      } else {
        this.positionOnBottom(elementPosition);
      }
    }
  }]);

  return Popover;
}(Element);

export { Popover as default };