"use strict";

exports.__esModule = true;
exports.default = void 0;

var _constants = require("../common/constants");

var _utils = require("../common/utils");

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Stage behind the highlighted element to give it a little
 * highlight from rest of the page
 */
var Stage =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(Stage, _Element);

  /**
   * @param {Object} options
   * @param {Window} window
   * @param {Document} document
   */
  function Stage(options, window, document) {
    var _this;

    _this = _Element.call(this) || this;
    _this.options = options;
    _this.window = window;
    _this.document = document;
    return _this;
  }
  /**
   * Prepares the DOM element if not already there
   * @private
   */


  var _proto = Stage.prototype;

  _proto.attachNode = function attachNode() {
    var stage = this.document.getElementById(_constants.ID_STAGE);

    if (!stage) {
      stage = (0, _utils.createNodeFromString)((0, _constants.STAGE_HTML)());
      document.body.appendChild(stage);
    }

    this.node = stage;
    this.currentIndexNode = stage.querySelector("." + _constants.CLASS_STAGE_INDEX);

    if (!this.options.animate) {
      this.node.classList.add(_constants.CLASS_STAGE_NO_ANIMATION);
    } else {
      this.node.classList.remove(_constants.CLASS_STAGE_NO_ANIMATION);
    }
  }
  /**
   * Simply hides the stage
   * @public
   */
  ;

  _proto.hide = function hide() {
    if (!this.node || !this.node.parentElement) {
      return;
    }

    this.node.parentElement.removeChild(this.node);
  }
  /**
   * Makes it visible and sets the default properties
   * @private
   */
  ;

  _proto.setInitialStyle = function setInitialStyle() {
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
  ;

  _proto.show = function show(position) {
    this.attachNode();
    this.setInitialStyle(); // 展示或隐藏步骤计数器

    if (this.options.totalCount <= 1 || !this.options.counter) {
      this.currentIndexNode.style.display = 'none';
    } else {
      this.currentIndexNode.innerHTML = this.options.currentIndex + 1;
      this.currentIndexNode.style.display = 'block';
    } // 设置步骤计数器的位置


    switch (this.options.counterPosition) {
      case 'leftBottom':
        this.currentIndexNode.className = _constants.CLASS_STAGE_INDEX + " left-bottom";
        break;

      case 'rightTop':
        this.currentIndexNode.className = _constants.CLASS_STAGE_INDEX + " right-top";
        break;

      case 'rightBottom':
        this.currentIndexNode.className = _constants.CLASS_STAGE_INDEX + " right-bottom";
        break;

      case 'leftTop':
      default:
        this.currentIndexNode.className = "" + _constants.CLASS_STAGE_INDEX;
        break;
    } // Make it two times the padding because, half will be given on left and half on right


    var requiredPadding = this.options.padding * 2;
    var width = position.right - position.left + requiredPadding;
    var height = position.bottom - position.top + requiredPadding; // Show the stage

    this.node.style.display = 'block';
    this.node.style.position = 'absolute';
    this.node.style.width = width + "px";
    this.node.style.height = height + "px";
    this.node.style.top = position.top - requiredPadding / 2 + "px";
    this.node.style.left = position.left - requiredPadding / 2 + "px";
    this.node.style.backgroundColor = this.options.stageBackground;
  };

  return Stage;
}(_element.default);

exports.default = Stage;