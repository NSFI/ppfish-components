/* eslint-disable */
'use strict';

import Quill from '../quillCore/quill';

// 只在console展示错误级别的信息
Quill.debug('error');

function formatOutputHTML(value?: string): string {
  if (!value) return value;

  // 移除HTML标签上的contenteditable属性
  return value.replace(/(<[^&<>]+)(contenteditable\s*=\s*['"]\w*['"])([^&<>]*>)/gi, '$1$3');
}

function xssFilter(value?: string): string {
  if (!value) return value;

  return value.replace(/javascript\s*:/gi, '');
}

const QuillMixin = {
  /**
  Creates an editor on the given element. The editor will
  be passed the configuration, have its events bound,
  */
  createEditor: function($el, config) {
    const editor: any = new Quill($el, config),
      _this = this;

    // 添加与 unprivilegedEditor 相同的方法
    editor.getHTML = function() {
      return xssFilter(formatOutputHTML(editor.root.innerHTML));
    };
    editor.getRawHTML = function() {
      return xssFilter(editor.root.innerHTML);
    };
    editor.isEmptyContents = function() {
      return _this.isEmptyContents(editor);
    };

    if (config.tabIndex !== undefined) {
      this.setEditorTabIndex(editor, config.tabIndex);
    }

    this.hookEditor(editor);

    return editor;
  },

  hookEditor: function(editor) {
    // Expose the editor on change events via a weaker,
    // unprivileged proxy object that does not allow
    // accidentally modifying editor state.
    const unprivilegedEditor = this.makeUnprivilegedEditor(editor);

    this.handleTextChange = function(delta, oldDelta, source) {
      if (this.onEditorChangeText) {
        this.onEditorChangeText(editor.root.innerHTML, delta, source, unprivilegedEditor);
        this.onEditorChangeSelection(editor.getSelection(), source, unprivilegedEditor);
      }
    }.bind(this);

    this.handleSelectionChange = function(range, oldRange, source) {
      if (this.onEditorChangeSelection) {
        this.onEditorChangeSelection(range, source, unprivilegedEditor);
      }
    }.bind(this);

    this.handleEditorChange = function(eventType, rangeOrDelta, oldRangeOrOldDelta, source) {
      if (eventType === Quill.events.SELECTION_CHANGE) {
        this.handleSelectionChange(rangeOrDelta, oldRangeOrOldDelta, source);
      }

      if (eventType === Quill.events.TEXT_CHANGE) {
        this.handleTextChange(rangeOrDelta, oldRangeOrOldDelta, source);
      }
    }.bind(this);

    editor.on('editor-change', this.handleEditorChange);
  },

  unhookEditor: function(editor) {
    editor.off('editor-change');
  },

  setEditorReadOnly: function(editor, value) {
    value ? editor.disable() : editor.enable();
  },

  /*
  Replace the contents of the editor, but keep
  the previous selection hanging around so that
  the cursor won't move.
  */
  setEditorContents: function(editor, value) {
    const sel = editor.getSelection();

    if (typeof value === 'string') {
      editor.setContents(
        editor.clipboard.convert({
          html: `${value}<p><br></p>`,
          text: '\n',
        }),
      );
    } else {
      editor.setContents(value);
    }

    if (sel && editor.hasFocus()) this.setEditorSelection(editor, sel);
  },

  setEditorSelection: function(editor, range) {
    if (range) {
      // Validate bounds before applying.
      const length = editor.getLength();
      range.index = Math.max(0, Math.min(range.index, length - 1));
      range.length = Math.max(0, Math.min(range.length, length - 1 - range.index));
    }
    editor.setSelection(range);
  },

  setEditorTabIndex: function(editor, tabIndex) {
    if (editor.editor && editor.editor.scroll && editor.editor.scroll.domNode) {
      editor.editor.scroll.domNode.tabIndex = tabIndex;
    }
  },

  /*
  Returns an weaker, unprivileged proxy object that only
  exposes read-only accessors found on the editor instance,
  without any state-modificating methods.
  */
  makeUnprivilegedEditor: function(editor) {
    const e = editor,
      _this = this;
    return {
      getLength: function() {
        return e.getLength.apply(e, arguments);
      },
      getText: function() {
        return e.getText.apply(e, arguments);
      },
      getHTML: function() {
        return formatOutputHTML(e.root.innerHTML);
      },
      getRawHTML: function() {
        return e.root.innerHTML;
      },
      getContents: function() {
        return e.getContents.apply(e, arguments);
      },
      getSelection: function() {
        return e.getSelection.apply(e, arguments);
      },
      getBounds: function() {
        return e.getBounds.apply(e, arguments);
      },
      isEmptyContents: function() {
        return _this.isEmptyContents(e);
      },
    };
  },

  /* 检查输入的内容是否全部为空字符（空格、回车符、制表符）*/
  isEmptyContents: function(editor) {
    const delta = editor.getContents();
    if (delta && delta.ops && Array.isArray(delta.ops)) {
      for (let i = 0; i < delta.ops.length; i++) {
        const obj = delta.ops[i];
        if (!obj.hasOwnProperty('insert')) return false;

        // 设置了项目符号时判为非空
        if (obj.hasOwnProperty('attributes')) {
          const attrs = obj['attributes'] || {},
            list = attrs['list'];
          if (list) return false;
        }

        // 输入内容包含非空字符时判为非空
        const insert = obj['insert'];
        if (typeof insert != 'string') return false;

        /**
         * [...insert]
         */
        const insertChars = Array.from(insert);
        if (!insertChars.length) continue;

        const notEmpty = insertChars.some(val => {
          return val !== '' && val !== ' ' && val !== '\t' && val !== '\n' && val !== '\ufeff';
        });
        if (notEmpty) return false;
      }
      return true;
    }
    return false;
  },
};

export default QuillMixin;
