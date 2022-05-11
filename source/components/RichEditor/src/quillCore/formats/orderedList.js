import Block from '../blots/block';
import Container from '../blots/container';
import Quill from '../core/quill';

class ListContainer extends Container {}
ListContainer.blotName = 'ordered-list-container';
ListContainer.tagName = 'OL';

// 新建类似 list 需要注意的问题
// 使用时 toolbar 的 active 问题
// 编辑时初始值的转换是否正常

class ListItem extends Block {
  static create(value) {
    const node = super.create();
    node.setAttribute('data-list', value);
    return node;
  }

  static formats(domNode) {
    return domNode.getAttribute('data-list') || undefined;
  }

  static register() {
    Quill.register(ListContainer);
  }

  constructor(scroll, domNode) {
    super(scroll, domNode);
    // const ui = domNode.ownerDocument.createElement('span');
    // const listEventHandler = e => {
    //   if (!scroll.isEnabled()) return;
    //   const format = this.statics.formats(domNode, scroll);
    //   if (format === 'checked') {
    //     this.format('list', 'unchecked');
    //     e.preventDefault();
    //   } else if (format === 'unchecked') {
    //     this.format('list', 'checked');
    //     e.preventDefault();
    //   }
    // };
    // ui.addEventListener('mousedown', listEventHandler);
    // ui.addEventListener('touchstart', listEventHandler);
    // this.attachUI(ui);
  }

  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute('data-list', value);
    } else {
      super.format(name, value);
    }
  }
}
ListItem.blotName = 'orderedList';
ListItem.tagName = 'LI';
ListItem.className = 'ordered-li';


ListContainer.allowedChildren = [ListItem];
ListItem.requiredContainer = ListContainer;

export { ListContainer, ListItem as default };
