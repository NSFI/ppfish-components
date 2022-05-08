import {Quill} from '../quill';
import { quill } from './fileDrop';

const Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');

class CustomClipboard extends Clipboard {
  quill: quill & {
    scrollIntoView: Function
  };
  options?: {
    pastePlainText?: boolean;
    pasteFormater?: Function;
  };

  constructor(quill, options) {
    super(quill, options);
  }

  onPaste (range, { text, html }) {
    if (this.options) {
      const { pastePlainText, pasteFormater } = this.options;
      let newText = text;
      let newHtml = html ? html : text; // fix: empty html string on Windows

      if (pastePlainText) {
        newHtml = text;

        if (pasteFormater) {
          newHtml = pasteFormater(newHtml);
        }

        newText = newHtml.innerText ? newHtml.innerText() : newHtml;

        const delta = new Delta().retain(range.index).delete(range.length).insert(newText),
          index = newText.length + range.index,
          length = 0;

        this.quill.updateContents(delta, 'silent');
        this.quill.setSelection(index, length, 'silent');
        this.quill.scrollIntoView();
      } else if (pasteFormater) {
        newHtml = pasteFormater(newHtml);
        newText = newHtml.innerText ? newHtml.innerText() : newHtml;
        super.onPaste(range, { text: newText, html: newHtml });
      } else {
        super.onPaste(range, { text, html });
      }
    } else {
      super.onPaste(range, { text, html });
    }
  }
}

export default CustomClipboard;
