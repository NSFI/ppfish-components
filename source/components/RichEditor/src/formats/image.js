import Quill from 'quill';

const Embed = Quill.import('blots/embed');
export const getAttrs = (node) => {
  let value = {};

  if (node.hasAttributes()) {
    let attrs = node.attributes;

    for (let i=attrs.length-1; i>=0; i--) {
      value[attrs[i].name] = attrs[i].value;
    }
  }

  return value;
};

class ImageBlot extends Embed {
  static create(value) {
    let node = super.create();

    if (Object.prototype.toString.call(value) == "[object Object]") {
      Object.keys(value).forEach((key) => {
        try {
          node.setAttribute(key, value[key]);
        } catch(e) {
          console.error(e); // eslint-disable-line
        }
      });
    }

    return node;
  }

  static formats(node) {
    return getAttrs(node);
  }

  static value(node) {
    return getAttrs(node);
  }

  format(name, value) {
    super.format(name, value);
  }
}

ImageBlot.blotName = 'myImage';
ImageBlot.tagName = 'img';

export default ImageBlot;
