import { Quill } from '../quill';

const Embed = Quill.import('blots/embed');
export const getAttrs = (node: Element): object => {
  const value = {};

  if (node.hasAttributes()) {
    const attrs = node.attributes;

    for (let i = attrs.length - 1; i >= 0; i--) {
      value[attrs[i].name] = attrs[i].value;
    }
  }

  return value;
};

class ImageBlot extends Embed {
  static blotName: string;
  static tagName: string;

  static create(value: object): HTMLElement {
    const node: HTMLElement = super.create();

    if (Object.prototype.toString.call(value) == '[object Object]') {
      Object.keys(value).forEach(key => {
        try {
          node.setAttribute(key, value[key]);
        } catch (e) {
          console.error(e); // eslint-disable-line
        }
      });
    } else if (typeof value == 'string') {
      node.setAttribute('src', value);
    }

    return node;
  }

  static formats(node: HTMLElement): object {
    return getAttrs(node);
  }

  static value(node: HTMLElement): object {
    return getAttrs(node);
  }

  format(name, value) {
    super.format(name, value);
  }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

export default ImageBlot;
