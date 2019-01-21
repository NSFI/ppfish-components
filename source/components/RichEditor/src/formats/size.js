import Quill from 'quill';
const Inline = Quill.import('blots/inline');
const setAttr = (node, value) => {
  if (typeof value == 'string' || typeof value == 'number') {
    node.style.fontSize = value;
  } else if (Object.prototype.toString.call(value) == "[object Object]") {
    if (value.editable != null) {
      node.setAttribute('contenteditable', value.editable);
    } else {
      node.setAttribute('contenteditable', true);
    }
    node.style.fontSize = value.fontSize;
  }

  return node;
};

// 自定义span标签的字体大小和contenteditable属性
class CustomAttrBlot extends Inline {
  static create(value) {
    let node = super.create();

    return setAttr(node, value);
  }

  static formats(node) {
    return {
      fontSize: node.style.fontSize,
      editable: node.getAttribute('contenteditable')
    };
  }

  static value(node) {
    return {
      fontSize: node.style.fontSize,
      editable: node.getAttribute('contenteditable')
    };
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      setAttr(this.domNode, value);
    }
  }
}

CustomAttrBlot.blotName = 'customAttr';
CustomAttrBlot.tagName = 'span';

export default CustomAttrBlot;
