import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class EmojiBlot extends Embed {
  static create(value) {
    let node = super.create();
    node.setAttribute('width', '24px');
    node.setAttribute('height', '24px');
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.src);
    return node;
  }

  static formats(node) {
    return {
      alt: node.getAttribute('alt'),
      src: node.getAttribute('src')
    };
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      src: node.getAttribute('src')
    };
  }
}

EmojiBlot.blotName = 'emoji';
EmojiBlot.tagName = 'img';

export default EmojiBlot;
