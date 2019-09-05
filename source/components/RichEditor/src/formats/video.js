import Quill from 'quill';
import { getAttrs } from './image.js';
import message from '../../../message/index.tsx';
const BlockEmbed = Quill.import('blots/block/embed');

class Video extends BlockEmbed {
  static create(value) {
    let node = super.create(value);

    if (Object.prototype.toString.call(value) == "[object Object]") {
      // 默认带控制条
      if (value['controls'] === false) {
        delete value['controls'];
      } else {
        value['controls'] = true;
      }

      Object.keys(value).forEach((key) => {
        let valType = typeof value[key];
        if (valType == 'function' || valType == 'object') {
          return;
        }

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

Video.blotName = 'myVideo';
Video.className = 'ql-video';
Video.tagName = 'video';

export default Video;
