import Quill from 'quill';
const Inline = Quill.import('blots/inline');

// 设置入口链接
class EntryBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.setAttribute('href', value);
    node.setAttribute('target', '_blank');
    return node;
  }

  static formats(node) {
    return node.getAttribute('href');
  }

  static value(node) {
    return node.getAttribute('href');
  }

  format(name, value) {
    if (name === 'entry' && value) {
      this.domNode.setAttribute('href', value);
      this.domNode.setAttribute('target', '_blank');
    }
  }
}

EntryBlot.blotName = 'entry';
EntryBlot.tagName = 'a';

export default EntryBlot;
