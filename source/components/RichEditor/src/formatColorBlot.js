import Quill from 'quill';
const Inline = Quill.import('blots/inline');

class CustomColorBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.style.color = value;
    return node;
  }

  static formats(node) {
    return node.style.color;
  }

  static value(node) {
    return node.style.color;
  }

  constructor(props) {
    super(props);
    this.defaultValue = '14px';
  }

  format(name, value) {
    if (name === 'customColor') {
      if (value) {
        this.domNode.style.color = value;
      } else {
        this.domNode.style.color = this.defaultValue;
      }
    } else {
      super.format(name, value);
    }
  }
}

CustomColorBlot.blotName = 'customColor';
CustomColorBlot.tagName = 'span';

export default CustomColorBlot;
