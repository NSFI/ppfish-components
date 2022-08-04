import { Quill } from '../quill';

const Embed = Quill.import('blots/embed');

interface createType {
  url: string;
  name: string;
  iconUrl?: string;
}

class Attach extends Embed {
  static blotName: string;
  static tagName: string;
  static formatCursor: boolean;
  static className: string;

  statics: {
    blotName: string;
    formatCursor: boolean;
  };
  domNode: HTMLElement;

  static create(data: createType): HTMLElement {
    this.formatCursor = false;
    const node = super.create(data);
    const defaultImage = data.iconUrl;
    const img = document.createElement('img');
    img.src = defaultImage;
    img.setAttribute('class', 'attach_icon');
    img.style.cssText = 'width: 25px;height: 25px;';
    node.appendChild(img);

    const ALabel = document.createElement('a');

    ALabel.innerText = data.name;
    ALabel.href = data.url;
    ALabel.target = '_blank';
    ALabel.style.cssText = `
      margin-left: 4px;
      vertical-align: middle;
      text-decoration: none;
      display: inline;
    `;
    ALabel.setAttribute('download', data.name || '');
    node.appendChild(ALabel);

    node.style.cssText = `display:inline-block;border:1px solid #ddd;padding:4px;margin: 4px;user-select: text;`;
    node.setAttribute('contenteditable', 'false');
    node.setAttribute('data-title', data.name);
    node.setAttribute('data-href', data.url);
    node.setAttribute('data-iconUrl', defaultImage);
    return node;
  }

  static formats(node: HTMLElement): {
    'data-href'?: string;
    'data-title'?: string;
    'data-iconUrl'?: string;
  } {
    return {
      'data-href': node.getAttribute('data-href') || node.getAttribute('href'),
      'data-title': node.getAttribute('data-title') || node.getAttribute('title'),
      'data-iconUrl': node.getAttribute('data-iconUrl') || node.getAttribute('iconUrl'),
    };
  }

  format(name: string, data) {
    this.statics.formatCursor = true;
    if (data) {
      this.domNode.setAttribute(name, data && data.toString());
      const label = this.domNode.querySelector('a');

      if (name === 'data-iconUrl') {
        const img = this.domNode.querySelector('img');
        img.src = data;
      } else if (name === 'data-href') {
        label.setAttribute('href', data && data.toString());
      } else if (name === 'data-title') {
        label.innerText = data;
        label.setAttribute('download', data || '');
      }
    }
    super.format(name, data);
  }
}

Attach.blotName = 'attach';
Attach.tagName = 'div';
Attach.className = 'attach_file';

export { Attach as default };
