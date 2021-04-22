import Element from './element';
import {
  CLASS_BTN_DISABLED,
  CLASS_CLOSE_BTN,
  CLASS_SKIP_BTN,
  CLASS_NEXT_STEP_BTN,
  CLASS_POPOVER_DESCRIPTION,
  CLASS_POPOVER_FOOTER,
  CLASS_POPOVER_TIP,
  CLASS_POPOVER_TITLE,
  CLASS_PREV_STEP_BTN,
  ID_POPOVER,
  POPOVER_HTML,
} from '../common/constants';
import { createNodeFromString } from '../common/utils';

/**
 * Popover that is displayed on top of the highlighted element
 */
export default class Popover extends Element {
  /**
   * @param {Object} options
   * @param {Window} window
   * @param {Document} document
   */
  constructor(options, window, document) {
    super();

    this.options = {
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
      prevBtnText: '上一步',
      ...options,
    };

    this.options.doneBtnText += ` (${this.options.totalCount}/${this.options.totalCount})`;
    this.options.nextBtnText += ` (${this.options.currentIndex+1}/${this.options.totalCount})`;
    this.window = window;
    this.document = document;
  }

  /**
   * Prepares the dom element for popover
   * @private
   */
  attachNode() {
    let popover = this.document.getElementById(ID_POPOVER);
    if (popover) {
      popover.parentElement.removeChild(popover);
    }

    popover = createNodeFromString(POPOVER_HTML(this.options.className));
    document.body.appendChild(popover);

    this.node = popover;
    this.tipNode = popover.querySelector(`.${CLASS_POPOVER_TIP}`);
    this.titleNode = popover.querySelector(`.${CLASS_POPOVER_TITLE}`);
    this.descriptionNode = popover.querySelector(`.${CLASS_POPOVER_DESCRIPTION}`);
    this.footerNode = popover.querySelector(`.${CLASS_POPOVER_FOOTER}`);
    this.nextBtnNode = popover.querySelector(`.${CLASS_NEXT_STEP_BTN}`);
    this.prevBtnNode = popover.querySelector(`.${CLASS_PREV_STEP_BTN}`);
    this.closeBtnNode = popover.querySelector(`.${CLASS_CLOSE_BTN}`);
    this.skipBtnNode = popover.querySelector(`.${CLASS_SKIP_BTN}`);
  }

  /**
   * Gets the title node for the popover
   * @returns {Element | null | *}
   * @public
   */
  getTitleNode() {
    return this.titleNode;
  }

  /**
   * Gets the description node for the popover
   * @returns {Element | null | *}
   * @public
   */
  getDescriptionNode() {
    return this.descriptionNode;
  }

  /**
   * Hides the popover
   * @public
   */
  hide() {
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
  setInitialState() {
    this.node.style.display = 'block';
    this.node.style.left = '0';
    this.node.style.top = '0';
    this.node.style.bottom = '';
    this.node.style.right = '';

    // Remove the positional classes from tip
    this.node
      .querySelector(`.${CLASS_POPOVER_TIP}`)
      .className = CLASS_POPOVER_TIP;
  }

  /**
   * Shows the popover at the given position
   * @param {Position} position
   * @public
   */
  show(position) {
    this.attachNode();
    this.setInitialState();

    // Set the title and descriptions
    this.titleNode.innerHTML = this.options.title;
    this.descriptionNode.innerHTML = this.options.description || '';

    this.renderFooter();

    // Position the popover around the given position
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
        this.positionOnBottom(position);
        // this.autoPosition(position);
        break;
    }

    // Bring the popover in view port once it is displayed
    this.bringInView();
  }

  /**
   * Enables, disables buttons, sets the text and
   * decides if to show them or not
   * @private
   */
  renderFooter() {
    this.nextBtnNode.innerHTML = this.options.nextBtnText;
    this.prevBtnNode.innerHTML = this.options.prevBtnText;
    this.skipBtnNode.innerHTML = this.options.skipBtnText;

    const hasSteps = this.options.totalCount && this.options.totalCount !== 1;

    // If there was only one item, hide the buttons
    if (!this.options.showButtons) {
      this.footerNode.style.display = 'none';
      return;
    }

    // If this is just a single highlighted element i.e. there
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
  positionOnLeft(elementPosition) {
    const popoverWidth = this.getSize().width;
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    this.node.style.left = `${elementPosition.left - popoverWidth - popoverMargin}px`;
    this.node.style.top = `${(elementPosition.top + this.options.offset) - this.options.padding}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    this.tipNode.classList.add('right');
  }

  /**
   * Shows the popover on the left of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnLeftBottom(elementPosition) {
    const popoverDimensions = this.getSize();

    const popoverWidth = popoverDimensions.width;
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    this.node.style.left = `${elementPosition.left - popoverWidth - popoverMargin}px`;
    this.node.style.top = `
    ${(elementPosition.bottom + this.options.padding + this.options.offset) - popoverDimensions.height}px`;
    this.node.style.bottom = '';
    this.node.style.right = '';

    this.tipNode.classList.add('right', 'position-bottom');
  }

  /**
   * Shows the popover on the left center of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnLeftCenter(elementPosition) {
    const popoverDimensions = this.getSize();

    const popoverWidth = popoverDimensions.width;
    const popoverHeight = popoverDimensions.height;
    const popoverCenter = popoverHeight / 2;

    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element
    const elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
    const topCenterPosition = (elementPosition.top - popoverCenter) + elementCenter + this.options.offset;

    this.node.style.left = `${elementPosition.left - popoverWidth - popoverMargin}px`;
    this.node.style.top = `${topCenterPosition}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    this.tipNode.classList.add('right', 'position-center');
  }

  /**
   * Shows the popover on the right of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnRight(elementPosition) {
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    this.node.style.left = `${elementPosition.right + popoverMargin}px`;
    this.node.style.top = `${(elementPosition.top + this.options.offset) - this.options.padding}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    this.tipNode.classList.add('left');
  }

  /**
   * Shows the popover on the right of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnRightCenter(elementPosition) {
    const popoverDimensions = this.getSize();
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    const popoverHeight = popoverDimensions.height;
    const popoverCenter = popoverHeight / 2;
    const elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
    const topCenterPosition = (elementPosition.top - popoverCenter) + elementCenter + this.options.offset;

    this.node.style.left = `${elementPosition.right + popoverMargin}px`;
    this.node.style.top = `${topCenterPosition}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    this.tipNode.classList.add('left', 'position-center');
  }

  /**
   * Shows the popover on the right of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnRightBottom(elementPosition) {
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element
    const popoverDimensions = this.getSize();

    this.node.style.left = `${elementPosition.right + popoverMargin}px`;
    this.node.style.top = `
    ${(elementPosition.bottom + this.options.padding + this.options.offset) - popoverDimensions.height}px`;
    this.node.style.bottom = '';
    this.node.style.right = '';

    this.tipNode.classList.add('left', 'position-bottom');
  }

  /**
   * Shows the popover on the top of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnTop(elementPosition) {
    const popoverHeight = this.getSize().height;
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    this.node.style.top = `${elementPosition.top - popoverHeight - popoverMargin}px`;
    this.node.style.left = `${(elementPosition.left - this.options.padding) + this.options.offset}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    this.tipNode.classList.add('bottom');
  }

  /**
   * Shows the popover on the top center of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnTopCenter(elementPosition) {
    const dimensions = this.getSize();
    const popoverHeight = dimensions.height;
    const popoverWidth = dimensions.width / 2;

    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element
    const nodeCenter = this.options.offset + elementPosition.left + ((elementPosition.right - elementPosition.left) / 2);

    this.node.style.top = `${elementPosition.top - popoverHeight - popoverMargin}px`;
    this.node.style.left = `${nodeCenter - popoverWidth - this.options.padding}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    // Add the tip at the top center
    this.tipNode.classList.add('bottom', 'position-center');
  }

  /**
   * Shows the popover on the top right of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnTopRight(elementPosition) {
    const dimensions = this.getSize();
    const popoverHeight = dimensions.height;
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    this.node.style.top = `${elementPosition.top - popoverHeight - popoverMargin}px`;
    this.node.style.left = `
    ${(elementPosition.right + this.options.padding + this.options.offset) - dimensions.width}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    // Add the tip at the top center
    this.tipNode.classList.add('bottom', 'position-right');
  }

  /**
   * Shows the popover on the bottom of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnBottom(elementPosition) {
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    this.node.style.top = `${elementPosition.bottom + popoverMargin}px`;
    this.node.style.left = `${(elementPosition.left - this.options.padding) + this.options.offset}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    this.tipNode.classList.add('top');
  }

  /**
   * Shows the popover on the bottom-center of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnBottomCenter(elementPosition) {
    const popoverWidth = this.getSize().width / 2;
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element
    const nodeCenter = this.options.offset + elementPosition.left + ((elementPosition.right - elementPosition.left) / 2);

    this.node.style.top = `${elementPosition.bottom + popoverMargin}px`;
    this.node.style.left = `${nodeCenter - popoverWidth - this.options.padding}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    // Add the tip at the top center
    this.tipNode.classList.add('top', 'position-center');
  }

  /**
   * Shows the popover on the bottom-right of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnBottomRight(elementPosition) {
    const dimensions = this.getSize();
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    this.node.style.top = `${elementPosition.bottom + popoverMargin}px`;
    this.node.style.left = `
    ${(elementPosition.right + this.options.padding + this.options.offset) - dimensions.width}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    // Add the tip at the top center
    this.tipNode.classList.add('top', 'position-right');
  }

  /**
   * Shows the popover on the mid-center of the given position
   * @param {Position} elementPosition
   * @private
   */
  positionOnMidCenter(elementPosition) {
    const popoverDimensions = this.getSize();
    const popoverHeight = popoverDimensions.height;
    const popoverWidth = popoverDimensions.width / 2;
    const popoverCenter = popoverHeight / 2;

    const elementCenter = (elementPosition.bottom - elementPosition.top) / 2;
    const topCenterPosition = (elementPosition.top - popoverCenter) + elementCenter + this.options.offset;
    const nodeCenter = this.options.offset + elementPosition.left + ((elementPosition.right - elementPosition.left) / 2);

    this.node.style.top = `${topCenterPosition}px`;
    this.node.style.left = `${nodeCenter - popoverWidth - this.options.padding}px`;
    this.node.style.right = '';
    this.node.style.bottom = '';

    // Add the tip at the top center
    this.tipNode.classList.add('mid-center');
  }

  /**
   * Automatically positions the popover around the given position
   * such that the element and popover remain in view
   * @todo add the left and right positioning decisions
   * @param {Position} elementPosition
   * @private
   */
  autoPosition(elementPosition) {
    const pageSize = this.getFullPageSize();
    const popoverSize = this.getSize();

    const pageHeight = pageSize.height;
    const popoverHeight = popoverSize.height;
    const popoverMargin = this.options.padding + 10;  // adding 10 to give it a little distance from the element

    const pageHeightAfterPopOver = elementPosition.bottom + popoverHeight + popoverMargin;

    // If adding popover would go out of the window height, then show it to the top
    if (pageHeightAfterPopOver >= pageHeight) {
      this.positionOnTop(elementPosition);
    } else {
      this.positionOnBottom(elementPosition);
    }
  }
}
