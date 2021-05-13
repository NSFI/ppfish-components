var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var FileDrop = /** @class */ (function () {
    function FileDrop(quill, options) {
        if (options === void 0) { options = { customDropFile: undefined }; }
        this.quill = quill;
        this.customDropFile = options.customDropFile || null;
        this.handleDrop = this.handleDrop.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.quill.root.addEventListener('drop', this.handleDrop, false);
        this.quill.root.addEventListener('paste', this.handlePaste, false);
    }
    FileDrop.prototype.handleDrop = function (evt) {
        evt.preventDefault();
        if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
            if (document.caretRangeFromPoint) {
                var selection = document.getSelection();
                var range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
                if (selection && range) {
                    selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset);
                }
            }
            if (this.customDropFile && typeof this.customDropFile == 'function') {
                this.customDropFile(evt.dataTransfer.files, this.insert.bind(this));
            }
        }
    };
    FileDrop.prototype.handlePaste = function (evt) {
        if (evt.clipboardData && evt.clipboardData.items && evt.clipboardData.items.length) {
            var hasFile = false, len = evt.clipboardData.items.length;
            for (var i = 0; i < len; i++) {
                var item = evt.clipboardData.items[i];
                if (item.kind == 'file') {
                    hasFile = true;
                    break;
                }
            }
            // 粘贴文件时禁止浏览器执行默认动作，防止粘贴后插入两次文件。粘贴非文件时执行浏览器默认的动作。
            if (hasFile) {
                evt.preventDefault();
                if (this.customDropFile && typeof this.customDropFile == 'function') {
                    this.customDropFile(evt.clipboardData.items, this.insert.bind(this));
                }
            }
        }
    };
    FileDrop.prototype.handleFileInsert = function (fileInfo) {
        if (!(fileInfo.url || fileInfo.src))
            return;
        var range = this.quill.getSelection() || {}, index = (range.index != undefined) ? range.index : this.quill.getLength(), curFormat = this.quill.getFormat(range);
        if (fileInfo.type == 'image') { // 插入图片
            if (!fileInfo.src) {
                return;
            }
            // 继承列表的样式
            var listFormat = {
                list: undefined,
            };
            if (curFormat && curFormat.list) {
                listFormat.list = curFormat.list;
            }
            var delta = [
                { insert: { 'myImage': fileInfo }, attributes: __assign({}, listFormat) },
                { insert: ' ' } // 在图片后添加一个空格，避免图片与附件相邻时，再在图片后拖入附件，图片异常添加附件的样式
            ];
            if (index > 0) {
                delta.unshift({ retain: index });
            }
            this.quill.updateContents(delta);
            this.quill.setSelection(index + 2);
        }
        else if (fileInfo.type == 'video') { // 插入视频
            if (!fileInfo.src) {
                return;
            }
            this.quill.insertEmbed(index, 'myVideo', fileInfo);
            this.quill.setSelection(index + 2);
        }
        else { // 插入附件
            if (!fileInfo.url || !fileInfo.name) {
                return;
            }
            // 继承列表的样式
            var listFormat = {
                list: undefined,
            };
            if (curFormat && curFormat.list) {
                listFormat.list = curFormat.list;
            }
            var displayFileName = '[文件] ' + fileInfo.name, delta = [
                {
                    insert: displayFileName,
                    attributes: __assign(__assign({}, listFormat), { 'link': {
                            type: 'attachment',
                            url: fileInfo.url,
                            name: fileInfo.name
                        } })
                },
                { insert: '\n', attributes: __assign({}, listFormat) }
            ];
            if (index > 0) {
                delta.unshift({ retain: index });
            }
            this.quill.updateContents(delta);
            this.quill.setSelection(index + displayFileName.length + 1, 'silent');
        }
    };
    FileDrop.prototype.insert = function (fileList) {
        var _this = this;
        if (Array.isArray(fileList)) {
            fileList.sort(function (a, b) {
                // 单次插入多个不同类型的文件时，按”视频 -> 图片 -> 其他文件“的顺序排列
                var order = ['other', 'image', 'video'];
                return order.indexOf(b.type) - order.indexOf(a.type);
            }).forEach(function (file) {
                file && _this.handleFileInsert(file);
            });
        }
        else {
            fileList && this.handleFileInsert(fileList);
        }
    };
    return FileDrop;
}());
export default FileDrop;
