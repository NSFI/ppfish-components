function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import { CLASS_STAGE_NO_ANIMATION, ID_STAGE, STAGE_HTML, CLASS_STAGE_INDEX } from '../common/constants';
import { createNodeFromString } from '../common/utils';
import Element from './element';
/**
 * Stage behind the highlighted element to give it a little
 * highlight from rest of the page
 */

var Stage =
/*#__PURE__*/
function (_Element) {
  _inherits(Stage, _Element);

  /**
   * @param {Object} options
   * @param {Window} window
   * @param {Document} document
   */
  function Stage(options, window, document) {
    var _this;

    _classCallCheck(this, Stage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stage).call(this));
    _this.options = options;
    _this.window = window;
    _this.document = document;
    return _this;
  }
  /**
   * Prepares the DOM element if not already there
   * @private
   */


  _createClass(Stage, [{
    key: "attachNode",
    value: function attachNode() {
      var stage = this.document.getElementById(ID_STAGE);

      if (!stage) {
        stage = createNodeFromString(STAGE_HTML());
        document.body.appendChild(stage);
      }

      this.node = stage;
      this.currentIndexNode = stage.querySelector(".".concat(CLASS_STAGE_INDEX));

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

  }, {
    key: "hide",
    value: function hide() {
      if (!this.node || !this.node.parentElement) {
        return;
      }

      this.node.parentElement.removeChild(this.node);
    }
    /**
     * Makes it visible and sets the default properties
     * @private
     */

  }, {
    key: "setInitialStyle",
    value: function setInitialStyle() {
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

  }, {
    key: "show",
    value: function show(position) {
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
          this.currentIndexNode.className = "".concat(CLASS_STAGE_INDEX, " left-bottom");
          break;

        case 'rightTop':
          this.currentIndexNode.className = "".concat(CLASS_STAGE_INDEX, " right-top");
          break;

        case 'rightBottom':
          this.currentIndexNode.className = "".concat(CLASS_STAGE_INDEX, " right-bottom");
          break;

        case 'leftTop':
        default:
          this.currentIndexNode.className = "".concat(CLASS_STAGE_INDEX);
          break;
      } // Make it two times the padding because, half will be given on left and half on right


      var requiredPadding = this.options.padding * 2;
      var width = position.right - position.left + requiredPadding;
      var height = position.bottom - position.top + requiredPadding; // Show the stage

      this.node.style.display = 'block';
      this.node.style.position = 'absolute';
      this.node.style.width = "".concat(width, "px");
      this.node.style.height = "".concat(height, "px");
      this.node.style.top = "".concat(position.top - requiredPadding / 2, "px");
      this.node.style.left = "".concat(position.left - requiredPadding / 2, "px");
      this.node.style.backgroundColor = this.options.stageBackground;
    }
  }]);

  return Stage;
}(Element);

export { Stage as default };