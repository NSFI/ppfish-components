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
    img.setAttribute('class', 'attach_icon');
    node.appendChild(img);

    const ALabel = document.createElement("a");

    ALabel.innerText = data.name;
    ALabel.href = data.url;
    ALabel.target = "_blank";
    ALabel.setAttribute('class', 'attach_text');
    ALabel.setAttribute('download', data.name || "");
    node.appendChild(ALabel);

    node.setAttribute("contenteditable", "false");
    node.setAttribute("title", data.name);
    node.setAttribute('href', data.url);
    node.setAttribute('iconUrl', defaultImage);
    node.setAttribute('class', 'attach_file');

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
