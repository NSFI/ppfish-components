"use strict";

exports.__esModule = true;
exports.default = void 0;

var _quill = _interopRequireDefault(require("quill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Embed = _quill.default.import('blots/embed');

var EmojiBlot =
/*#__PURE__*/
function (_Embed) {
  _inheritsLoose(EmojiBlot, _Embed);

  function EmojiBlot() {
    return _Embed.apply(this, arguments) || this;
  }

  EmojiBlot.create = function create(value) {
    var node = _Embed.create.call(this);

    if (value.type === 'defaultEmoji') {
      node.setAttribute('class', 'portrait_icon');
      node.setAttribute('data-id', value.id);
    } else if (value.type === 'customEmoji') {
      node.setAttribute('class', 'custom_icon');
    }

    node.setAttribute('data-type', value.type);
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.src);
    node.setAttribute('width', value.width);
    node.setAttribute('height', value.height);
    return node;
  };

  EmojiBlot.formats = function formats(node) {
    return {
      id: node.getAttribute('data-id'),
      type: node.getAttribute('data-type'),
      alt: node.getAttribute('alt'),
      src: node.getAttribute('src'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height')
    };
  };

  EmojiBlot.value = function value(node) {
    return {
      id: node.getAttribute('data-id'),
      type: node.getAttribute('data-type'),
      alt: node.getAttribute('alt'),
      src: node.getAttribute('src'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height')
    };
  };

  return EmojiBlot;
}(Embed);

EmojiBlot.blotName = 'emoji';
EmojiBlot.tagName = 'img';
var _default = EmojiBlot;
exports.default = _default;