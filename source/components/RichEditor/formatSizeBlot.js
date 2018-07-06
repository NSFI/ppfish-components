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

  constructor(props) {
    super(props);
    this.defaultValue = '14px';
  }

  format(name, value) {
    if (name === 'customSize') {
      if (value) {
        this.domNode.style.fontSize = value;
      } else {
        this.domNode.style.fontSize = this.defaultValue;
      }
    } else {
      super.format(name, value);
    }
  }
}
CustomSizeBlot.blotName = 'customSize';
CustomSizeBlot.tagName = 'span';

export default CustomSizeBlot;
