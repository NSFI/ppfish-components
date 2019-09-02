import Quill from 'quill';

const Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');

class PlainClipboard extends Clipboard {
  onPaste (e) {
    e.preventDefault();

    const range = this.quill.getSelection(),
      text = e.clipboardData.getData('text/plain'),
      delta = new Delta().retain(range.index).delete(range.length).insert(text),
      index = text.length + range.index,
      length = 0;

    this.quill.updateContents(delta, 'silent');
    this.quill.setSelection(index, length, 'silent');
    this.quill.scrollIntoView();
  }
}

export default PlainClipboard;
