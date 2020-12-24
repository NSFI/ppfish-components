import Quill from 'quill';
const Inline = Quill.import('blots/inline');


interface setAttrType {
  node: HTMLElement,
  value: string | number | {
    editable?: boolean | string,
    fontSize: string | number,
  }
}

const setAttr = (node: setAttrType['node'], value: setAttrType['value']): HTMLElement => {
  if (typeof value == 'string' || typeof value == 'number') {
    node.style.fontSize = value as string;
  } else if (Object.prototype.toString.call(value) == "[object Object]") {
    if (value.editable != null) {
      node.setAttribute('contenteditable', (value.editable as string));
    }

    if (value.fontSize != null) {
      node.style.fontSize = (value.fontSize as string);
    }
  }

  return node;
};

// 自定义span标签的字体大小和contenteditable属性
class CustomAttrBlot extends Inline {
  static blotName: string;
  static tagName: string;

  statics: {
    blotName: string,
  }
  domNode: HTMLElement;

  static create(value): HTMLElement {
    let node = super.create();

    return setAttr(node, value);
  }

  static formats(node: HTMLElement): {
    fontSize: string,
    editable: string,
  } {
    // 返回值不能为 null（Fix bug: Cannot read property 'mutations' of undefined）
    return {
      fontSize: node.style.fontSize,
      editable: node.getAttribute('contenteditable')
    };
  }

  format(name?: any, value?: string) {
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
