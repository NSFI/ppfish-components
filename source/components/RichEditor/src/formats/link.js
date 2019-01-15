import Quill from 'quill';
const Inline = Quill.import('blots/inline');

class Link extends Inline {
  static create(value) {
    this.formatCursor = false;
    const node = super.create(value);
    node.setAttribute('target', '_blank');
    node.setAttribute('href', value && value.url);
    node.setAttribute('data-type', value && value.type || 'default');
    return node;
  }

  static formats(node) {
    // 修复在超链接后输入回车光标被异常添加超链接的问题
    let domChildren = node.children;
    // let containsCursor = /<\s*span\s*class\s*=\s*['"]\s*ql-cursor\s*['"]\s*>\s*\ufeff\s*<\s*\/\s*span\s*>/gi;
    if (!this.formatCursor && domChildren && domChildren.length==1 && domChildren[0].innerText=="\ufeff") {
      return;
    }

    return {
      type: node.getAttribute('data-type') || 'default',
      url: node.getAttribute('href')
    };
  }

  // static sanitize(url) {
  //   return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  // }

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      // 在超链接内输入回车时需要为光标添加超链接
      this.statics.formatCursor = true;
      this.domNode.setAttribute('href', value && value.url);
      this.domNode.setAttribute('data-type', value && value.type || 'default');
    }
  }
}
Link.blotName = 'myLink';
Link.tagName = 'A';
Link.formatCursor = false;  // 是否为光标添加超链接
// Link.SANITIZED_URL = 'about:blank';
// Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

function sanitize(url, protocols) {
  const anchor = document.createElement('a');
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

export { Link as default, sanitize };
