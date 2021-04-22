var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Quill from 'quill';
var Embed = Quill.import('blots/embed');
var EmojiBlot = /** @class */ (function (_super) {
    __extends(EmojiBlot, _super);
    function EmojiBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiBlot.create = function (value) {
        var node = _super.create.call(this);
        if (value.type === 'defaultEmoji') {
            node.setAttribute('class', 'portrait_icon');
            node.setAttribute('data-id', value.id);
        }
        else if (value.type === 'customEmoji') {
            node.setAttribute('class', 'custom_icon');
        }
        node.setAttribute('data-type', value.type);
        node.setAttribute('alt', value.alt);
        node.setAttribute('src', value.src);
        node.setAttribute('width', value.width);
        node.setAttribute('height', value.height);
        return node;
    };
    EmojiBlot.formats = function (node) {
        return {
            id: node.getAttribute('data-id'),
            type: node.getAttribute('data-type'),
            alt: node.getAttribute('alt'),
            src: node.getAttribute('src'),
            width: node.getAttribute('width'),
            height: node.getAttribute('height'),
        };
    };
    EmojiBlot.value = function (node) {
        return {
            id: node.getAttribute('data-id'),
            type: node.getAttribute('data-type'),
            alt: node.getAttribute('alt'),
            src: node.getAttribute('src'),
            width: node.getAttribute('width'),
            height: node.getAttribute('height'),
        };
    };
    return EmojiBlot;
}(Embed));
EmojiBlot.blotName = 'emoji';
EmojiBlot.tagName = 'img';
export default EmojiBlot;
