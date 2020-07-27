export default class FileDrop {
  constructor(quill, options = {}) {
    this.quill = quill;
    this.customDropFile = options.customDropFile || null;
    this.handleDrop = this.handleDrop.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.quill.root.addEventListener('drop', this.handleDrop, false);
    this.quill.root.addEventListener('paste', this.handlePaste, false);
  }

  handleDrop(evt) {
    evt.preventDefault();
    if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
      if (document.caretRangeFromPoint) {
        const selection = document.getSelection();
        const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.startContainer, range.startOffset,
            range.startContainer, range.startOffset
          );
        }
      }

      if (this.customDropFile && typeof this.customDropFile == 'function') {
        this.customDropFile(evt.dataTransfer.files, this.insert.bind(this));
      }
    }
  }

  handlePaste(evt) {
    evt.preventDefault();
    if (evt.clipboardData && evt.clipboardData.items && evt.clipboardData.items.length) {
      // 不处理粘贴的富文本内容，只处理粘贴的文件
      for (let i=0, len=evt.clipboardData.items.length; i<len; i++) {
        let item = evt.clipboardData.items[i];
        if (item.kind != 'file') {
          return;
        }
      }

      if (this.customDropFile && typeof this.customDropFile == 'function') {
        this.customDropFile(evt.clipboardData.items, this.insert.bind(this));
      }
    }
  }

  handleFileInsert(fileInfo) {
    if (!(fileInfo.url || fileInfo.src)) return;

    const range = this.quill.getSelection() || {},
      index = (range.index != undefined) ? range.index : this.quill.getLength(),
      curFormat = this.quill.getFormat(range);

    if (fileInfo.type == 'image') {			// 插入图片
      if (!fileInfo.src) {
        return;
      }

      // 继承列表的样式
      let listFormat = {};
      if (curFormat && curFormat.list) {
        listFormat.list = curFormat.list;
      }

      let delta = [
        { insert: { 'myImage': fileInfo }, attributes: { ...listFormat } },
        { insert: ' ' } // 在图片后添加一个空格，避免图片与附件相邻时，再在图片后拖入附件，图片异常添加附件的样式
      ];

      if (index > 0) {
        delta.unshift({ retain: index });
      }

      this.quill.updateContents(delta);
      this.quill.setSelection(index + 2);
    } else if (fileInfo.type == 'video') {	// 插入视频
      if (!fileInfo.src) {
        return;
      }
      this.quill.insertEmbed(index, 'myVideo', fileInfo);
      this.quill.setSelection(index + 2);
    } else {								// 插入附件
      if (!fileInfo.url || !fileInfo.name) {
        return;
      }

      // 继承列表的样式
      let listFormat = {};
      if (curFormat && curFormat.list) {
        listFormat.list = curFormat.list;
      }

      let displayFileName = '[文件] ' + fileInfo.name,
        delta = [
          {
            insert: displayFileName,
            attributes: {
              ...listFormat,
              'link': {
                type: 'attachment',
                url: fileInfo.url,
                name: fileInfo.name
              }
            }
          },
          { insert: '\n', attributes: { ...listFormat } }
        ];

      if (index > 0) {
        delta.unshift({ retain: index });
      }

      this.quill.updateContents(delta);
      this.quill.setSelection(index + displayFileName.length + 1, 'silent');
    }
  }

  insert(fileList) {
    if (Array.isArray(fileList)) {
      fileList.sort((a, b) => {
        // 单次插入多个不同类型的文件时，按”视频 -> 图片 -> 其他文件“的顺序排列
        let order = ['other', 'image', 'video'];
        return order.indexOf(b.type) - order.indexOf(a.type);
      }).forEach((file) => {
        file && this.handleFileInsert(file);
      });
    } else {
      fileList && this.handleFileInsert(fileList);
    }
  }
}
