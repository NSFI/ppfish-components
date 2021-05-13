import { CLASS_STAGE_NO_ANIMATION, ID_STAGE, STAGE_HTML, CLASS_STAGE_INDEX } from '../common/constants';
import { createNodeFromString } from '../common/utils';
import Element from './element';

/**
 * Stage behind the highlighted element to give it a little
 * highlight from rest of the page
 */
export default class Stage extends Element {
  /**
   * @param {Object} options
   * @param {Window} window
   * @param {Document} document
   */
  constructor(options, window, document) {
    super();

    this.options = options;
    this.window = window;
    this.document = document;
  }

  /**
   * Prepares the DOM element if not already there
   * @private
   */
  attachNode() {
    let stage = this.document.getElementById(ID_STAGE);
    if (!stage) {
      stage = createNodeFromString(STAGE_HTML());
      document.body.appendChild(stage);
    }

    this.node = stage;
    this.currentIndexNode = stage.querySelector(`.${CLASS_STAGE_INDEX}`);

    if (!this.options.animate) {
      this.node.classList.add(CLASS_STAGE_NO_ANIMATION);
    } else {
      this.node.classList.remove(CLASS_STAGE_NO_ANIMATION);
    }
  }

  /**
   * Simply hides the stage
   * @public
   */
  hide() {
    if (!this.node || !this.node.parentElement) {
      return;
    }

    this.node.parentElement.removeChild(this.node);
  }

  /**
   * Makes it visible and sets the default properties
   * @private
   */
  setInitialStyle() {
    this.node.style.display = 'block';
    this.node.style.left = '0';
    this.node.style.top = '0';
    this.node.style.bottom = '';
    this.node.style.right = '';
  }

  /**
   * Shows the stage at provided position
   * @param {Position} position
   * @public
   */
  show(position) {
    this.attachNode();
    this.setInitialStyle();

    // 展示或隐藏步骤计数器
    if (this.options.totalCount <= 1 || !this.options.counter) {
      this.currentIndexNode.style.display = 'none';
    } else {
      this.currentIndexNode.innerHTML = this.options.currentIndex + 1;
      this.currentIndexNode.style.display = 'block';
    }

    // 设置步骤计数器的位置
    switch (this.options.counterPosition) {
      case 'leftBottom':
        this.currentIndexNode.className = `${CLASS_STAGE_INDEX} left-bottom`;
        break;
      case 'rightTop':
        this.currentIndexNode.className = `${CLASS_STAGE_INDEX} right-top`;
        break;
      case 'rightBottom':
        this.currentIndexNode.className = `${CLASS_STAGE_INDEX} right-bottom`;
        break;
      case 'leftTop':
      default:
        this.currentIndexNode.className = `${CLASS_STAGE_INDEX}`;
        break;
    }

    // Make it two times the padding because, half will be given on left and half on right
    const requiredPadding = this.options.padding * 2;
    const width = (position.right - position.left) + (requiredPadding);
    const height = (position.bottom - position.top) + (requiredPadding);

    // Show the stage
    this.node.style.display = 'block';
    this.node.style.position = 'absolute';
    this.node.style.width = `${width}px`;
    this.node.style.height = `${height}px`;
    this.node.style.top = `${position.top - (requiredPadding / 2)}px`;
    this.node.style.left = `${position.left - (requiredPadding / 2)}px`;
    this.node.style.backgroundColor = this.options.stageBackground;
  }
}
