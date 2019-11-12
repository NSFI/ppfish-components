"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _element = _interopRequireDefault(require("./element"));

var _constants = require("../common/constants");

var _utils = require("../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Popover that is displayed on top of the highlighted element
 */
var Popover =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(Popover, _Element);

  /**
   * @param {Object} options
   * @param {Window} window
   * @param {Document} document
   */
  function Popover(options, window, document) {
    var _this;

    _this = _Element.call(this) || this;
    _this.options = Object.assign({
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
    _this.options.doneBtnText += " (" + _this.options.totalCount + "/" + _this.options.totalCount + ")";
    _this.options.nextBtnText += " (" + (_this.options.currentIndex + 1) + "/" + _this.options.totalCount + ")";
    _this.window = window;
    _this.document = document;
    return _this;
  }
  /**
   * Prepares the dom element for popover
   * @private
   */


  var _proto = Popover.prototype;

  _proto.attachNode = function attachNode() {
    var popover = this.document.getElementById(_constants.ID_POPOVER);

    if (popover) {
      popover.parentElement.removeChild(popover);
    }

    popover = (0, _utils.createNodeFromString)((0, _constants.POPOVER_HTML)(this.options.className));
    document.body.appendChild(popover);
    this.node = popover;
    this.tipNode = popover.querySelector("." + _constants.CLASS_POPOVER_TIP);
    this.titleNode = popover.querySelector("." + _constants.CLASS_POPOVER_TITLE);
    this.descriptionNode = popover.querySelector("." + _constants.CLASS_POPOVER_DESCRIPTION);
    this.footerNode = popover.querySelector("." + _constants.CLASS_POPOVER_FOOTER);
    this.nextBtnNode = popover.querySelector("." + _constants.CLASS_NEXT_STEP_BTN);
    this.prevBtnNode = popover.querySelector("." + _constants.CLASS_PREV_STEP_BTN);
    this.closeBtnNode = popover.querySelector("." + _constants.CLASS_CLOSE_BTN);
    this.skipBtnNode = popover.querySelector("." + _constants.CLASS_SKIP_BTN);
  }
  /**
   * Gets the title node for the popover
   * @returns {Element | null | *}
   * @public
   */
  ;

  _proto.getTitleNode = function getTitleNode() {
    return this.titleNode;
  }
  /**
   * Gets the description node for the popover
   * @returns {Element | null | *}
   * @public
   */
  ;

  _proto.getDescriptionNode = function getDescriptionNode() {
    return this.descriptionNode;
  }
  /**
   * Hides the popover
   * @public
   */
  ;

  _proto.hide = function hide() {
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
  ;

  _proto.setInitialState = function setInitialState() {
    this.node.style.display = 'block';
    this.node.style.left = '0';
    this.node.style.top = '0';
    this.node.style.bottom = '';
    this.node.style.right = ''; // Remove the positional classes from tip

    this.node.querySelector("." + _constants.CLASS_POPOVER_TIP).className = _constants.CLASS_POPOVER_TIP;
  }
  /**
   * Shows the popover at the given position
   * @param {Position} position
   * @public
   */
  ;

  _proto.show = function show(position) {
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
  ;

  _proto.renderFooter = function renderFooter() {
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
      this.prevBtnNode.classList.add(_constants.CLASS_BTN_DISABLED);
      this.nextBtnNode.innerHTML = this.options.startBtnText;
    } else {
      this.prevBtnNode.classList.remove(_constants.CLASS_BTN_DISABLED);
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
  ;

  _proto.positionOnLeft = function positionOnLeft(elementPosition) {
    var popoverWidth = this.getSize().width;
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    this.node.style.left = elementPosition.left - popoverWidth - popoverMargin + "px";
    this.node.style.top = elementPosition.top + this.options.offset - this.options.padding + "px";
    this.node.style.right = '';
    this.node.style.bottom = '';
    this.tipNode.classList.add('right');
  }
  /**
   * Shows the popover on the left of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnLeftBottom = function positionOnLeftBottom(elementPosition) {
    var popoverDimensions = this.getSize();
    var popoverWidth = popoverDimensions.width;
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    this.node.style.left = elementPosition.left - popoverWidth - popoverMargin + "px";
    this.node.style.top = "\n    " + (elementPosition.bottom + this.options.padding + this.options.offset - popoverDimensions.height) + "px";
    this.node.style.bottom = '';
    this.node.style.right = '';
    this.tipNode.classList.add('right', 'position-bottom');
  }
  /**
   * Shows the popover on the left center of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnLeftCenter = function positionOnLeftCenter(elementPosition) {
    var popoverDimensions = this.getSize();
    var popoverWidth = popoverDimensions.width;
    var popoverHeight = popoverDimensions.height;
    var popoverCenter = popoverHeight / 2;
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    var elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
    var topCenterPosition = elementPosition.top - popoverCenter + elementCenter + this.options.offset;
    this.node.style.left = elementPosition.left - popoverWidth - popoverMargin + "px";
    this.node.style.top = topCenterPosition + "px";
    this.node.style.right = '';
    this.node.style.bottom = '';
    this.tipNode.classList.add('right', 'position-center');
  }
  /**
   * Shows the popover on the right of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnRight = function positionOnRight(elementPosition) {
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    this.node.style.left = elementPosition.right + popoverMargin + "px";
    this.node.style.top = elementPosition.top + this.options.offset - this.options.padding + "px";
    this.node.style.right = '';
    this.node.style.bottom = '';
    this.tipNode.classList.add('left');
  }
  /**
   * Shows the popover on the right of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnRightCenter = function positionOnRightCenter(elementPosition) {
    var popoverDimensions = this.getSize();
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    var popoverHeight = popoverDimensions.height;
    var popoverCenter = popoverHeight / 2;
    var elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
    var topCenterPosition = elementPosition.top - popoverCenter + elementCenter + this.options.offset;
    this.node.style.left = elementPosition.right + popoverMargin + "px";
    this.node.style.top = topCenterPosition + "px";
    this.node.style.right = '';
    this.node.style.bottom = '';
    this.tipNode.classList.add('left', 'position-center');
  }
  /**
   * Shows the popover on the right of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnRightBottom = function positionOnRightBottom(elementPosition) {
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    var popoverDimensions = this.getSize();
    this.node.style.left = elementPosition.right + popoverMargin + "px";
    this.node.style.top = "\n    " + (elementPosition.bottom + this.options.padding + this.options.offset - popoverDimensions.height) + "px";
    this.node.style.bottom = '';
    this.node.style.right = '';
    this.tipNode.classList.add('left', 'position-bottom');
  }
  /**
   * Shows the popover on the top of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnTop = function positionOnTop(elementPosition) {
    var popoverHeight = this.getSize().height;
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    this.node.style.top = elementPosition.top - popoverHeight - popoverMargin + "px";
    this.node.style.left = elementPosition.left - this.options.padding + this.options.offset + "px";
    this.node.style.right = '';
    this.node.style.bottom = '';
    this.tipNode.classList.add('bottom');
  }
  /**
   * Shows the popover on the top center of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnTopCenter = function positionOnTopCenter(elementPosition) {
    var dimensions = this.getSize();
    var popoverHeight = dimensions.height;
    var popoverWidth = dimensions.width / 2;
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    var nodeCenter = this.options.offset + elementPosition.left + (elementPosition.right - elementPosition.left) / 2;
    this.node.style.top = elementPosition.top - popoverHeight - popoverMargin + "px";
    this.node.style.left = nodeCenter - popoverWidth - this.options.padding + "px";
    this.node.style.right = '';
    this.node.style.bottom = ''; // Add the tip at the top center

    this.tipNode.classList.add('bottom', 'position-center');
  }
  /**
   * Shows the popover on the top right of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnTopRight = function positionOnTopRight(elementPosition) {
    var dimensions = this.getSize();
    var popoverHeight = dimensions.height;
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    this.node.style.top = elementPosition.top - popoverHeight - popoverMargin + "px";
    this.node.style.left = "\n    " + (elementPosition.right + this.options.padding + this.options.offset - dimensions.width) + "px";
    this.node.style.right = '';
    this.node.style.bottom = ''; // Add the tip at the top center

    this.tipNode.classList.add('bottom', 'position-right');
  }
  /**
   * Shows the popover on the bottom of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnBottom = function positionOnBottom(elementPosition) {
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    this.node.style.top = elementPosition.bottom + popoverMargin + "px";
    this.node.style.left = elementPosition.left - this.options.padding + this.options.offset + "px";
    this.node.style.right = '';
    this.node.style.bottom = '';
    this.tipNode.classList.add('top');
  }
  /**
   * Shows the popover on the bottom-center of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnBottomCenter = function positionOnBottomCenter(elementPosition) {
    var popoverWidth = this.getSize().width / 2;
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    var nodeCenter = this.options.offset + elementPosition.left + (elementPosition.right - elementPosition.left) / 2;
    this.node.style.top = elementPosition.bottom + popoverMargin + "px";
    this.node.style.left = nodeCenter - popoverWidth - this.options.padding + "px";
    this.node.style.right = '';
    this.node.style.bottom = ''; // Add the tip at the top center

    this.tipNode.classList.add('top', 'position-center');
  }
  /**
   * Shows the popover on the bottom-right of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnBottomRight = function positionOnBottomRight(elementPosition) {
    var dimensions = this.getSize();
    var popoverMargin = this.options.padding + 10; // adding 10 to give it a little distance from the element

    this.node.style.top = elementPosition.bottom + popoverMargin + "px";
    this.node.style.left = "\n    " + (elementPosition.right + this.options.padding + this.options.offset - dimensions.width) + "px";
    this.node.style.right = '';
    this.node.style.bottom = ''; // Add the tip at the top center

    this.tipNode.classList.add('top', 'position-right');
  }
  /**
   * Shows the popover on the mid-center of the given position
   * @param {Position} elementPosition
   * @private
   */
  ;

  _proto.positionOnMidCenter = function positionOnMidCenter(elementPosition) {
    var popoverDimensions = this.getSize();
    var popoverHeight = popoverDimensions.height;
    var popoverWidth = popoverDimensions.width / 2;
    var popoverCenter = popoverHeight / 2;
    var elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
    var topCenterPosition = elementPosition.top - popoverCenter + elementCenter + this.options.offset;
    var nodeCenter = this.options.offset + elementPosition.left + (elementPosition.right - elementPosition.left) / 2;
    this.node.style.top = topCenterPosition + "px";
    this.node.style.left = nodeCenter - popoverWidth - this.options.padding + "px";
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
  ;

  _proto.autoPosition = function autoPosition(elementPosition) {
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
  };

  return Popover;
}(_element.default);

exports.default = Popover;