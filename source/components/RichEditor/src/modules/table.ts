import Quill from '../quillCore/quill';
import positions from 'position.js';
import { LocaleProperties } from '../../../Locale';
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

export interface MenuItem {
  title: string;
  icon: string;
  handler: () => void;
}

export interface TableUIOptions {
  Locale: LocaleProperties['RichEditor'];
}

export const isTable = (quill, range?: Range) => {
  if (!range) {
    range = quill.getSelection();
  }
  if (!range) {
    return false;
  }
  const formats = quill.getFormat(range.index);

  return !!(formats['table'] && !range.length);
};

export default class TableUI {
  DEFAULTS: TableUIOptions = {
    Locale: {}
  };

  quill: Quill;
  options: any;
  toggle: HTMLElement;
  menu: HTMLElement;
  position: any;
  table: any;
  menuItems: MenuItem[];

  constructor(quill: Quill, options: any) {
    this.quill = quill;
    this.options = { ...this.DEFAULTS, ...options };
    this.table = quill.getModule('table');
    if (!this.table) {
      console.error('"table" module not found');
      return;
    }

    const Locale = this.options.Locale;
    this.menuItems = [
      {
        title: Locale.insertColRight,
        icon: 'fishdicon-youlie',
        handler: () => {
          this.table.insertColumnRight();
        },
      },
      {
        title: Locale.insertColLeft,
        icon: 'fishdicon-zuolie',
        handler: () => {
          this.table.insertColumnLeft();
        },
      },
      {
        title: Locale.insertRowAbove,
        icon: 'fishdicon-shanghang',
        handler: () => {
          this.table.insertRowAbove();
        },
      },
      {
        title: Locale.insertRowBelow,
        icon: 'fishdicon-xiahang',
        handler: () => {
          this.table.insertRowBelow();
        },
      },
      {
        title: Locale.deleteCol,
        icon: 'fishdicon-shanlie',
        handler: () => {
          this.table.deleteColumn();
        },
      },
      {
        title: Locale.deleteRow,
        icon: 'fishdicon-shanhang',
        handler: () => {
          this.table.deleteRow();
        },
      },
      {
        title: Locale.deleteTable,
        icon: 'fishdicon-delete-line',
        handler: () => {
          this.table.deleteTable();
        },
      },
    ];

    this.toggle = quill.addContainer('ql-table-toggle');
    this.toggle.classList.add('fishdicon', 'fishdicon-gengduo2', 'ql-table-toggle_hidden');
    this.toggle.addEventListener('click', this.toggleClickHandler);
    this.quill.on(QuillEvents.EDITOR_CHANGE, this.editorChangeHandler);
    this.quill.root.addEventListener('contextmenu', this.contextMenuHandler);
    // fix: toggle and menu separate from the table
    this.quill.root.addEventListener('scroll', this.scrollHandler);
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
    if (!isTable(this.quill)) {
      return true;
    }
    evt.preventDefault();
    this.showMenu();
  };

  scrollHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    this.hideToggle();
    this.hideMenu();
  };

  toggleClickHandler = (e) => {
    this.toggleMenu();

    e.preventDefault();
    e.stopPropagation();
  };

  docClickHandler = () => this.hideMenu;

  /*
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

  getRowCount(range: Range = null) {
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

    return table.rows().length;
  }
  */

  showMenu() {
    this.hideMenu();
    this.menu = this.quill.addContainer('ql-table-menu');

    this.menuItems.forEach((it) => {
      this.menu.appendChild(this.createMenuItem(it));
    });

    // set menu position
    const position = positions(this.menu, this.toggle, {
      popup: 'top-left',
      anchor: 'bottom-left',
    }, {
      offsetParent: this.quill.container
    });

    // dynamic adjustment when the menu cannot be displayed completely
    if (this.quill.container.clientWidth - position.left < 190) {
      this.menu.style.left = `${this.quill.container.clientWidth - 190}px`;
    } else {
      this.menu.style.left = `${position.left}px`;
    }

    this.menu.style.top = `${position.top}px`;

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
    node.title = item.title;

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('ql-table-menu__item-icon', 'fishdicon', item.icon);

    node.appendChild(iconSpan);
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

    const show = isTable(this.quill, range);
    if (show) {
      const [cell, offset] = this.quill.getLine(range.index);
      const containerBounds = this.quill.container.getBoundingClientRect();
      let bounds = cell.domNode.getBoundingClientRect();

      bounds = {
        bottom: bounds.bottom - containerBounds.top,
        height: bounds.height,
        left: bounds.left - containerBounds.left,
        right: bounds.right - containerBounds.left,
        top: bounds.top - containerBounds.top + this.quill.container.scrollTop,
        width: bounds.width,
      };

      this.showToggle(bounds);
    } else {
      this.hideToggle();
    }

    this.hideMenu();
  }

  showToggle(position: any) {
    this.position = position;
    this.toggle.classList.remove('ql-table-toggle_hidden');
    this.toggle.style.top = `${position.top}px`;
    this.toggle.style.left = `${position.left}px`;
  }

  hideToggle() {
    this.toggle && this.toggle.classList.add('ql-table-toggle_hidden');
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
    this.quill.root.removeEventListener('scroll', this.scrollHandler);
    this.toggle.removeEventListener('click', this.toggleClickHandler);
    this.toggle.remove();
    this.toggle = null;
    this.options = this.DEFAULTS;
    this.menu = null;
    this.table = null;
    this.quill = null;
  }
}
