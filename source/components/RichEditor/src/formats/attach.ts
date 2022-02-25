import Quill from "quill";

const BlockEmbed = Quill.import("blots/block/embed");

interface createType {
  url: string;
  name: string;
  iconUrl?: string
}

class Attach extends BlockEmbed {
  static blotName: string;
  static tagName: string;
  static formatCursor: boolean;

  statics: {
    blotName: string;
    formatCursor: boolean;
  };
  domNode: HTMLElement;

  static create(data: createType): HTMLElement {
    this.formatCursor = false;
    let node = super.create(data);

    const defaultImage = data.iconUrl

    const img = document.createElement("img");
    img.src = defaultImage;
    img.style.cssText = "width: 25px;height: 25px; display: inline-Block;";
    node.appendChild(img);

    const ALabel = document.createElement("a");
    ALabel.style.cssText = `
      margin-left: 4px;
      vertical-align: middle;
      text-decoration: none;
      `;

    ALabel.innerText = data.name;
    ALabel.href = data.url;
    ALabel.target = "_blank";
    ALabel.setAttribute('download', data.name || "");
    node.appendChild(ALabel);

    node.style.cssText = `display:inline-block;border:1px solid #ddd;padding:4px;margin: 4px;user-select: text;`;
    node.setAttribute("contenteditable", "false");
    node.setAttribute("title", data.name);
    node.setAttribute('href', data.url);
    node.setAttribute('iconUrl', defaultImage);

    return node;
  }

  static formats(
    node: HTMLElement
  ): {
    href?: string;
    title?: string;
    iconUrl?: string;
  } {
    return {
      href: node.getAttribute("href"),
      title: node.getAttribute("title"),
      iconUrl: node.getAttribute("iconUrl")
    };
  }

  format(name: string, data) {
    this.statics.formatCursor = true;
    if (data) {
      this.domNode.setAttribute(name, data && data.toString());
      const label = this.domNode.querySelector('a')

      if(name === 'iconUrl'){
        const img = this.domNode.querySelector('img');
        img.src = data
      }else if (name === 'href') {
        label.setAttribute(name, data && data.toString());
      }else if(name === 'title'){
        label.innerText = data
        label.setAttribute('download', data || "");
      }
    }
    super.format(name, data);
  }
}

Attach.blotName = "attach";
Attach.tagName = "div";

export {Attach as default};
