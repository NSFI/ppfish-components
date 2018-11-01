import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class ImageBlot extends Embed {
  static create(value) {
    let node = super.create();

    if (typeof value == 'object') {
      Object.keys(value).forEach((key) => {
        node.setAttribute(key, value[key]);
      });
    }

    return node;
  }

  static formats(node) {
    let attrs = node.getAttributeNames(),
        value = {};

    attrs.forEach((attr) => {
      value[attr] = node.getAttribute(attr);
    });

    return value;
  }

  static value(node) {
    let attrs = node.getAttributeNames(),
        value = {};

    attrs.forEach((attr) => {
      value[attr] = node.getAttribute(attr);
    });

    return value;
  }

  format(name, value) {
    super.format(name, value);
  }
}

ImageBlot.blotName = 'myImage';
ImageBlot.tagName = 'img';

export default ImageBlot;
