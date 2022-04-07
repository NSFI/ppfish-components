import Quill from '../quillCore/quill';
import { positionElements, Placement } from 'positioning';
import '../../style/table.less';

interface Range {
  index: number;
  length: number;
}

enum QuillEvents {
  EDITOR_CHANGE = 'editor-change',
  SCROLL_BEFORE_UPDATE = 'scroll-before-update',
  SCROLL_BLOT_MOUNT = 'scroll-blot-mount',
  SCROLL_BLOT_UNMOUNT = 'scroll-blot-unmount',
  SCROLL_OPTIMIZE = 'scroll-optimize',
  SCROLL_UPDATE = 'scroll-update',
  SELECTION_CHANGE = 'selection-change',
  TEXT_CHANGE = 'text-change',
}

enum QuillSources {
  API = 'api',
  SILENT = 'silent',
  USER = 'user',
}

const DEFAULT_PLACEMENT: Placement[] = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
  'auto',
];

const iconAddColRight =
  '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M73.142857 336.64h526.628572v43.885714H73.142857zM73.142857 643.657143h526.628572v43.885714H73.142857zM336.457143 117.028571h43.885714v789.942858h-43.885714zM204.8 73.142857h614.4a131.657143 131.657143 0 0 1 131.657143 131.657143v614.4a131.657143 131.657143 0 0 1-131.657143 131.657143H204.8A131.657143 131.657143 0 0 1 73.142857 819.2V204.8A131.84 131.84 0 0 1 204.8 73.142857z m0 43.885714a87.771429 87.771429 0 0 0-87.771429 87.771429v614.4a87.771429 87.771429 0 0 0 87.771429 87.771429h614.4a87.771429 87.771429 0 0 0 87.771429-87.771429V204.8a87.771429 87.771429 0 0 0-87.771429-87.771429zM819.2 73.142857h-219.428571v877.714286h219.428571a131.657143 131.657143 0 0 0 131.657143-131.657143V204.8A131.84 131.84 0 0 0 819.2 73.142857z m44.068571 460.982857h-65.828571v65.828572H753.371429v-65.828572h-65.828572V490.057143h65.828572v-65.828572h44.068571v65.828572h65.828571z" /></svg>';
const iconAddColLeft =
  '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M380.342857 336.457143h526.811429v43.885714H380.342857z m0 307.2h526.811429v43.885714H380.342857zM643.657143 117.028571h43.885714v789.942858h-43.885714zM204.8 73.142857h614.582857A131.474286 131.474286 0 0 1 950.857143 204.8v614.4a131.657143 131.657143 0 0 1-131.657143 131.657143H204.8A131.657143 131.657143 0 0 1 73.142857 819.2V204.8A131.657143 131.657143 0 0 1 204.8 73.142857z m0 43.885714a87.588571 87.588571 0 0 0-87.588571 87.771429v614.4a87.588571 87.588571 0 0 0 87.588571 87.771429h614.582857a87.771429 87.771429 0 0 0 87.771429-87.771429V204.8a87.771429 87.771429 0 0 0-87.771429-87.771429zM204.8 73.142857A131.657143 131.657143 0 0 0 73.142857 204.8v614.4a131.657143 131.657143 0 0 0 131.657143 131.657143h219.428571V73.142857z m131.84 460.8h-65.828571v65.828572h-43.885715v-65.828572h-65.828571v-43.885714h65.828571v-65.828572h43.885715v65.828572h65.828571z" /></svg>';
const iconAddRowAbove =
  '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M73.142857 599.771429h877.714286v43.885714H73.142857zM336.457143 380.342857h43.885714v526.628572h-43.885714z m307.2 0h43.885714v526.628572h-43.885714zM204.8 73.142857h614.4a131.657143 131.657143 0 0 1 131.657143 131.657143v614.4a131.657143 131.657143 0 0 1-131.657143 131.657143H204.8A131.657143 131.657143 0 0 1 73.142857 819.2V204.8A131.657143 131.657143 0 0 1 204.8 73.142857z m0 43.885714a87.771429 87.771429 0 0 0-87.771429 87.771429v614.4a87.588571 87.588571 0 0 0 87.771429 87.771429h614.4a87.588571 87.588571 0 0 0 87.771429-87.771429V204.8a87.771429 87.771429 0 0 0-87.771429-87.771429zM819.2 73.142857H204.8A131.657143 131.657143 0 0 0 73.142857 204.8v219.428571h877.714286v-219.428571A131.657143 131.657143 0 0 0 819.2 73.142857z m-219.428571 197.485714h-65.828572v65.828572h-43.885714v-65.828572h-65.828572v-43.885714h65.828572V160.914286h43.885714v65.828571h65.828572z" /></svg>';
const iconAddRowBelow =
  '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M204.8 73.142857h614.4a131.657143 131.657143 0 0 1 131.657143 131.657143v614.4a131.657143 131.657143 0 0 1-131.657143 131.657143H204.8A131.657143 131.657143 0 0 1 73.142857 819.2V204.8A131.84 131.84 0 0 1 204.8 73.142857z m0 43.885714a87.771429 87.771429 0 0 0-87.771429 87.771429v614.4a87.771429 87.771429 0 0 0 87.771429 87.771429h614.4a87.771429 87.771429 0 0 0 87.771429-87.771429V204.8a87.771429 87.771429 0 0 0-87.771429-87.771429zM73.142857 336.457143h877.714286v44.068571H73.142857zM336.64 117.028571h43.885714v526.628572h-43.885714z m307.017143 0h44.068571v526.628572H643.657143zM73.142857 599.771429v219.428571a131.657143 131.657143 0 0 0 131.657143 131.657143h614.4a131.657143 131.657143 0 0 0 131.657143-131.657143v-219.428571z m526.628572 197.485714h-65.645715v65.828571H490.057143v-65.828571h-65.828572v-43.885714h65.828572v-65.828572h44.068571v65.828572h65.645715z" /></svg>';
const iconRemoveCol =
  '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M925.996 99.038c-25.47-25.6-60.121-39.822-96.323-39.822H194.198c-75.12 0.13-136.016 61.026-136.145 136.146v635.345c0 36.073 14.351 70.723 39.822 96.323 25.6 25.73 60.25 40.081 96.323 40.081h635.475c36.072 0 70.723-14.351 96.323-39.951 25.6-25.6 39.951-60.122 39.951-96.324V195.362c0-36.073-14.351-70.724-39.951-96.324z m-365.77 494.287L512 545.228l-48.226 48.097-32.194-31.935 48.355-48.226-48.226-48.097 32.194-32.194L512 480.97l48.097-48.097 32.194 32.194-48.097 48.097 48.226 48.226-32.194 31.935zM103.434 195.362c0-24.049 9.568-47.192 26.635-64.13 17.066-17.066 40.08-26.634 64.129-26.634h136.145v226.91H103.434V195.361z m0 181.656h226.91V649.31h-226.91V377.02z m90.764 544.84c-24.049 0-47.192-9.567-64.13-26.634-17.066-17.066-26.634-40.08-26.634-64.258V694.69h226.91v227.168H194.197z m726.238-90.763c0 24.048-9.438 47.192-26.505 64.259-17.066 17.066-40.21 26.634-64.258 26.505H693.527V694.69h226.91v136.404z m0-181.786H693.527V377.02h226.91v272.29zM693.527 331.507V104.598h136.146c24.048 0 47.192 9.438 64.258 26.505 17.067 17.067 26.635 40.21 26.505 64.259v136.145H693.527z" /></svg>';
const iconRemoveRow =
  '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M925.99596 99.038384c-25.470707-25.6-60.121212-39.822222-96.323233-39.822222H194.19798c-36.072727 0-70.723232 14.351515-96.323233 39.822222-25.6 25.6-39.822222 60.121212-39.822222 96.323232v635.474748c0 36.072727 14.351515 70.723232 39.822222 96.323232C123.474747 952.759596 158.125253 967.111111 194.19798 967.111111h635.474747c36.072727 0 70.723232-14.351515 96.323233-39.951515 25.6-25.6 39.951515-60.121212 39.951515-96.323232V195.361616c0-36.072727-14.351515-70.723232-39.951515-96.323232z m-550.270707 5.559596h272.290909v227.167677H375.725253V104.59798z m56.242424 360.468687l31.935353-32.19394 48.09697 48.226263 48.09697-48.226263 32.193939 32.19394-48.09697 48.096969 48.226263 48.226263-32.193939 31.935354-48.226263-48.09697-48.226263 48.09697-31.935353-31.935354 48.226262-48.226263-48.096969-48.096969zM103.434343 195.361616c0-24.048485 9.567677-47.191919 26.634344-64.129293 17.066667-17.066667 40.080808-26.634343 64.129293-26.634343h136.145454v227.167677H103.434343V195.361616z m817.002021 635.733333c0 24.048485-9.567677 47.191919-26.634344 64.258586-17.066667 17.066667-40.080808 26.634343-64.129293 26.634344H194.19798c-24.048485 0-47.191919-9.567677-64.258586-26.634344C112.872727 878.157576 103.434343 855.014141 103.434343 830.836364V694.690909h226.909091v226.909091h45.381819V694.690909h272.290909v226.909091h45.381818V694.690909h226.909091v136.40404z m0-499.329292H693.527273V104.59798h136.145454c24.048485 0 47.191919 9.567677 64.129293 26.634343 17.066667 17.066667 26.634343 40.080808 26.634344 64.129293v136.404041z" /></svg>';
const iconRemoveTable =
  '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#595959" d="M764.42168889 830.5152c0 30.23530667-24.61013333 54.84430222-54.84316444 54.84430222H314.42147555c-30.23416889 0-54.84316445-24.61013333-54.84316444-54.84430222V248.32796445h504.84337778v582.18723555zM369.26577778 149.89084445c0-6.32832 4.92202667-11.25034667 11.25034667-11.25034667H644.18702222c6.32832 0 11.25034667 4.92202667 11.25034667 11.25034667v33.04675555H369.26577778V149.89084445z m559.68768 33.04675555H720.82773333V149.89084445c0-42.1888-34.45191111-76.64071111-76.64071111-76.64071112H380.51612445c-42.1888 0-76.64071111 34.45191111-76.64071112 76.64071112v33.04675555h-208.82773333c-18.28181333 0-33.04789333 14.76608-33.04789333 33.04675555s14.76608 33.04675555 33.04675555 33.04675556h98.43825778v581.48408889c0 66.79779555 54.14001778 120.93781333 120.93667555 120.93781333h395.1570489c66.79665778 0 120.93667555-54.14001778 120.93667555-120.93781333V248.32796445h98.43825778c18.28067555 0 33.04675555-14.76494222 33.04675555-33.04675556s-14.76608-32.34360889-33.04675555-32.34360889zM512 786.21923555c18.28181333 0 33.04675555-14.76608 33.04675555-33.04789333v-351.56195555c0-18.28181333-14.76494222-33.04675555-33.04675555-33.04675556s-33.04675555 14.76494222-33.04675555 33.04675556v351.56195555c0 18.28181333 14.76494222 33.04789333 33.04675555 33.04789333m-153.98456889 0c18.28181333 0 33.04675555-14.76608 33.04675556-33.04789333v-351.56195555c0-18.28181333-14.76494222-33.04675555-33.04675556-33.04675556s-33.04675555 14.76494222-33.04675556 33.04675556v351.56195555c0.70314667 18.28181333 15.46922667 33.04789333 33.04675556 33.04789333m307.96913778 0c18.28067555 0 33.04675555-14.76608 33.04675556-33.04789333v-351.56195555c0-18.28181333-14.76608-33.04675555-33.04675556-33.04675556s-33.04675555 14.76494222-33.04675556 33.04675556v351.56195555c0 18.28181333 14.76494222 33.04789333 33.04675556 33.04789333" /></svg>';

export interface MenuItem {
  title: string;
  icon: string;
  handler: () => void;
}

export interface TableUIOptions {
  maxRowCount?: number;
}

export default class TableUI {
  TOGGLE_TEMPLATE = `<svg width="9" height="9" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g><path d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z"/><path d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z"/><path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"/></g></svg>`;
  DEFAULTS: TableUIOptions = {
    maxRowCount: -1,
  };

  quill: Quill;
  options: any;
  toggle: HTMLElement;
  menu: HTMLElement;
  position: any;
  table: any;

  menuItems: MenuItem[] = [
    {
      title: 'Insert column right',
      icon: iconAddColRight,
      handler: () => {
        if (
          !(this.options.maxRowCount > 0) ||
          this.getColCount() < this.options.maxRowCount
        ) {
          this.table.insertColumnRight();
        }
      },
    },
    {
      title: 'Insert column left',
      icon: iconAddColLeft,
      handler: () => {
        if (
          !(this.options.maxRowCount > 0) ||
          this.getColCount() < this.options.maxRowCount
        ) {
          this.table.insertColumnLeft();
        }
      },
    },
    {
      title: 'Insert row above',
      icon: iconAddRowAbove,
      handler: () => {
        this.table.insertRowAbove();
      },
    },
    {
      title: 'Insert row below',
      icon: iconAddRowBelow,
      handler: () => {
        this.table.insertRowBelow();
      },
    },
    {
      title: 'Delete column',
      icon: iconRemoveCol,
      handler: () => {
        this.table.deleteColumn();
      },
    },
    {
      title: 'Delete row',
      icon: iconRemoveRow,
      handler: () => {
        this.table.deleteRow();
      },
    },
    {
      title: 'Delete table',
      icon: iconRemoveTable,
      handler: () => {
        this.table.deleteTable();
      },
    },
  ];

  constructor(quill: Quill, options: any) {
    this.quill = quill;
    this.options = { ...this.DEFAULTS, ...options };
    this.table = quill.getModule('table');
    if (!this.table) {
      console.error('"table" module not found');
      return;
    }

    this.toggle = quill.addContainer('ql-table-toggle');
    this.toggle.classList.add('ql-table-toggle_hidden');
    this.toggle.innerHTML = this.TOGGLE_TEMPLATE;
    this.toggle.addEventListener('click', this.toggleClickHandler);
    this.quill.on(QuillEvents.EDITOR_CHANGE, this.editorChangeHandler);
    this.quill.root.addEventListener('contextmenu', this.contextMenuHandler);
  }

  editorChangeHandler = (
    type: QuillEvents,
    range: Range,
    oldRange: Range,
    source: QuillSources
  ) => {
    if (type === QuillEvents.SELECTION_CHANGE) {
      this.detectButton(range);
    }
  };

  contextMenuHandler = (evt: MouseEvent) => {
    if (!this.isTable()) {
      return true;
    }
    evt.preventDefault();
    this.showMenu();
  };

  toggleClickHandler = (e) => {
    this.toggleMenu();

    e.preventDefault();
    e.stopPropagation();
  };

  docClickHandler = () => this.hideMenu;

  isTable(range?: Range) {
    if (!range) {
      range = this.quill.getSelection();
    }
    if (!range) {
      return false;
    }
    const formats = this.quill.getFormat(range.index);

    return !!(formats['table'] && !range.length);
  }

  getColCount(range: Range = null) {
    if (!range) {
      range = this.quill.getSelection();
    }
    if (!range) {
      return 0;
    }
    const [table] = this.table.getTable(range);
    if (!table) {
      return 0;
    }
    const maxColumns = table.rows().reduce((max, row) => {
      return Math.max(row.children.length, max);
    }, 0);
    return maxColumns;
  }

  showMenu() {
    this.hideMenu();
    this.menu = this.quill.addContainer('ql-table-menu');

    this.menuItems.forEach((it) => {
      this.menu.appendChild(this.createMenuItem(it));
    });
    positionElements(this.toggle, this.menu, DEFAULT_PLACEMENT, false);
    document.addEventListener('click', this.docClickHandler);
  }

  hideMenu() {
    if (this.menu) {
      this.menu.remove();
      this.menu = null;
      document.removeEventListener('click', this.docClickHandler);
    }
  }

  createMenuItem(item: MenuItem) {
    const node = document.createElement('div');
    node.classList.add('ql-table-menu__item');

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('ql-table-menu__item-icon');
    iconSpan.innerHTML = item.icon;

    const textSpan = document.createElement('span');
    textSpan.classList.add('ql-table-menu__item-text');
    textSpan.innerText = item.title;

    node.appendChild(iconSpan);
    node.appendChild(textSpan);
    node.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.quill.focus();
        item.handler();
        this.hideMenu();
        this.detectButton(this.quill.getSelection());
      },
      false
    );
    return node;
  }

  detectButton(range: Range) {
    if (range == null) {
      return;
    }

    const show = this.isTable(range);
    if (show) {
      const [cell, offset] = this.quill.getLine(range.index);
      const containerBounds = this.quill.container.getBoundingClientRect();
      let bounds = cell.domNode.getBoundingClientRect();
      bounds = {
        bottom: bounds.bottom - containerBounds.top,
        height: bounds.height,
        left: bounds.left - containerBounds.left,
        right: bounds.right - containerBounds.left,
        top: bounds.top - containerBounds.top,
        width: bounds.width,
      };

      this.showToggle(bounds);
    } else {
      this.hideToggle();
      this.hideMenu();
    }
  }

  showToggle(position: any) {
    this.position = position;
    this.toggle.classList.remove('ql-table-toggle_hidden');
    this.toggle.style.top = `${position.top}px`;
    this.toggle.style.left = `${position.left}px`;
  }

  hideToggle() {
    this.toggle.classList.add('ql-table-toggle_hidden');
  }

  toggleMenu() {
    if (this.menu) {
      this.hideToggle();
    } else {
      this.showMenu();
    }
  }

  destroy() {
    this.hideMenu();
    this.quill.off(QuillEvents.EDITOR_CHANGE, this.editorChangeHandler);
    this.quill.root.removeEventListener('contextmenu', this.contextMenuHandler);
    this.toggle.removeEventListener('click', this.toggleClickHandler);
    this.toggle.remove();
    this.toggle = null;
    this.options = this.DEFAULTS;
    this.menu = null;
    this.table = null;
    this.quill = null;
  }
}
