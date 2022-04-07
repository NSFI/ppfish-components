import { Quill } from "../../../quill";

// BEGIN allow image alignment styles
const ATTRIBUTES = ['alt', 'height', 'width', 'style', 'data-size'];

let BaseImageFormat = Quill.import('formats/image');
class Image extends BaseImageFormat {
  static formats (domNode) {
    if (domNode.__handling && domNode.__formats) {
      return domNode.__formats;
    }

    return ATTRIBUTES.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  format (name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }

  handling (handling) {
    this.domNode.__formats = this.constructor.formats(this.domNode);
    this.domNode.__handling = handling;
  }
}

export { Image, ATTRIBUTES };
