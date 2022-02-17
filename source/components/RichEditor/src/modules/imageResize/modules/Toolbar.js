import BaseModule from './BaseModule';
import { Quill } from "../../../quill";

const Parchment = Quill.import('parchment');

// Quill.js 2.x support
const ClassAttributor = Parchment.ClassAttributor
  ? Parchment.ClassAttributor
  : Parchment.Attributor.Class;
const ImageFormatClass = new ClassAttributor('imagestyle', 'ql-resize-style');

export default class Toolbar extends BaseModule {
  onCreate () {
    // Setup Toolbar
    this.toolbar = document.createElement('div');
    Object.assign(this.toolbar.style, this.options.styles.toolbar);
    this.overlay.appendChild(this.toolbar);
    // Setup Buttons
    this._defineAlignments();
    this._addToolbarButtons();
  }

  _defineAlignments () {
    this.alignments = [
      {
        icon: `<svg viewbox="0 0 18 18">
                <path class="ql-fill" d="M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z"/>
                <path class="ql-fill" d="M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z"/>
                <path class="ql-fill" d="M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z"/>
                <path class="ql-fill" d="M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z"/>
                <rect class="ql-fill" x="2" y="6" width="8" height="6" rx="1" ry="1"/>
              </svg>`  ,
        apply: () => {
          ImageFormatClass.add(this.activeEle, 'left');
        },
        isApplied: () => ImageFormatClass.value(this.activeEle) === 'left'
      },
      {
        icon: `<svg viewbox="0 0 18 18">
                <path class="ql-fill" d="M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z"/>
                <path class="ql-fill" d="M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z"/>
                <rect class="ql-fill" x="3" y="6" width="12" height="6" rx="1" ry="1"/>
              </svg>`,
        apply: () => {
          ImageFormatClass.add(this.activeEle, 'center');
        },
        isApplied: () => ImageFormatClass.value(this.activeEle) === 'center'
      },
      {
        icon: `<svg viewbox="0 0 18 18">
                <path class="ql-fill" d="M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z"/>
                <path class="ql-fill" d="M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z"/>
                <path class="ql-fill" d="M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z"/>
                <path class="ql-fill" d="M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z"/>
                <rect class="ql-fill" x="8" y="6" width="8" height="6" rx="1" ry="1"
                transform="translate(24 18) rotate(-180)"/>
              </svg>`,
        apply: () => {
          ImageFormatClass.add(this.activeEle, 'right');
        },
        isApplied: () => ImageFormatClass.value(this.activeEle) === 'right'
      },
      {
        icon:`<svg viewbox="0 0 18 18">
                <path class="ql-fill" d="M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z"/>
                <path class="ql-fill" d="M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z"/>
                <rect class="ql-fill" x="2" y="6" width="14" height="6" rx="1" ry="1"/>
              </svg>`,
        apply: () => {
          ImageFormatClass.add(this.activeEle, 'full');
        },
        isApplied: () => ImageFormatClass.value(this.activeEle) === 'full'
      }
    ];
  }

  _addToolbarButtons () {
    const buttons = [];
    this.alignments.forEach((alignment, idx) => {
      const button = document.createElement('span');
      buttons.push(button);
      button.innerHTML = alignment.icon;
      button.addEventListener('click', () => {
        // deselect all buttons
        buttons.forEach(button => (button.style.filter = ''));
        if (alignment.isApplied()) {
          // If applied, unapply
          ImageFormatClass.remove(this.activeEle);
        } else {
          // otherwise, select button and apply
          this._selectButton(button);
          alignment.apply();
        }
        // image may change position; redraw drag handles
        this.requestUpdate();
      });
      Object.assign(button.style, this.options.styles.toolbarButton);
      if (idx > 0) {
        button.style.borderLeftWidth = '0';
      }
      // console.log(button)
      Object.assign(
        button.children[0].style,
        this.options.styles.toolbarButtonSvg
      );
      if (alignment.isApplied()) {
        // select button if previously applied
        this._selectButton(button);
      }
      this.toolbar.appendChild(button);
    });

    // Edit button
    // const button = document.createElement('span')
    // button.innerHTML = IconPencil
    // Object.assign(button.style, this.options.styles.toolbarButton)
    // button.style.borderLeftWidth = '0'
    // button.addEventListener('click', () => {
    //   this.quill.emitter.emit('resize-edit', this.activeEle, this.blot)
    // })
    // this.toolbar.appendChild(button)
  }

  _selectButton (button) {
    button.style.filter = 'invert(20%)';
  }
}
