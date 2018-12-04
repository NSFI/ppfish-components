import Quill from 'quill';
const Inline = Quill.import('blots/inline');

// 自定义字体大小
class CustomSizeBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.style.fontSize = value;
    return node;
  }

  static formats(node) {
    return node.style.fontSize;
  }

  static value(node) {
    return node.style.fontSize;
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.style.fontSize = value;
    }
  }
}

CustomSizeBlot.blotName = 'customSize';
CustomSizeBlot.tagName = 'span';

export default CustomSizeBlot;
