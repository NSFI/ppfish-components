import {Quill} from '../quill';
import { quill } from './fileDrop';

const Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');

class PlainClipboard extends Clipboard {
  quill: quill & {
    scrollIntoView: Function
  };
  options?: {pastePlainText: any};
  constructor(quill, options) {
    super(quill, options);
  }

  onPaste (range, { text, html }) {
    if (this.options && this.options.pastePlainText) {
      const delta = new Delta().retain(range.index).delete(range.length).insert(text),
        index = text.length + range.index,
        length = 0;

      this.quill.updateContents(delta, 'silent');
      this.quill.setSelection(index, length, 'silent');
      this.quill.scrollIntoView();
    } else {
      super.onPaste(range, { text, html });
    }
  }
}

export default PlainClipboard;
