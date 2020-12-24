import Quill from 'quill';
const Inline = Quill.import('blots/inline');

interface createType {
  url: string,
  type: string | null,
  name: string
}

class Link extends Inline {
  static blotName: string;
  static tagName: string;
  static formatCursor: boolean;

  statics: {
    blotName: string,
    formatCursor: boolean,
  };
  domNode: HTMLElement;
  static create(data: createType): HTMLElement {
    this.formatCursor = false;
    const node: HTMLElement = super.create(data);

    if (data) {
      node.setAttribute('target', '_blank');
      node.setAttribute('href', data.url);

      if (data.type != null) {
        node.setAttribute('data-ql-link-type', data.type);
        if (data.type == 'attachment') {
          node.setAttribute('download', data.name || "");
          node.setAttribute('contenteditable', "false");
        }
      }
    }

    return node;
  }

  static formats(node: HTMLElement): {
    url?: string,
    type?: string,
    name?: string,
  } {
    // 修复在超链接后输入回车光标被异常添加超链接的问题
    let domChildren = node.children;
    // let containsCursor = /<\s*span\s*class\s*=\s*['"]\s*ql-cursor\s*['"]\s*>\s*\ufeff\s*<\s*\/\s*span\s*>/gi;
    if (!this.formatCursor && domChildren && domChildren.length == 1 && (domChildren[0] as HTMLElement).innerText == "\ufeff") {
      return {};
    }

    return {
      url: node.getAttribute('href'),
      type: node.getAttribute('data-ql-link-type'),
      name: node.getAttribute('download')
    };
  }

  // static sanitize(url) {
  //   return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  // }

  format(name: string, data?: createType) {
    if (name !== this.statics.blotName || !data) {
      super.format(name, data);
    } else {
      // 在超链接内输入回车时需要为光标添加超链接
      this.statics.formatCursor = true;
      if (data) {
        this.domNode.setAttribute('href', data.url);

        if (data.type != null) {
          this.domNode.setAttribute('data-ql-link-type', data.type);
          if (data.type == 'attachment') {
            this.domNode.setAttribute('contenteditable', "false");
            this.domNode.setAttribute('download', data.name || "");
          }
        }
      }
    }
  }
}
Link.blotName = 'link';
Link.tagName = 'A';
Link.formatCursor = false;  // 是否为光标添加超链接
// Link.SANITIZED_URL = 'about:blank';
// Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

function sanitize(url: string, protocols: string): boolean {
  const anchor = document.createElement('a');
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

export { Link as default, sanitize };
