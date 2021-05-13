var ImageDrop = /** @class */ (function () {
    function ImageDrop(quill, options) {
        if (options === void 0) { options = { customDropImage: undefined }; }
        this.quill = quill;
        this.customDropImage = options.customDropImage || null;
        this.handleDrop = this.handleDrop.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.quill.root.addEventListener('drop', this.handleDrop, false);
        this.quill.root.addEventListener('paste', this.handlePaste, false);
    }
    ImageDrop.prototype.handleDrop = function (evt) {
        evt.preventDefault();
        if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
            if (document.caretRangeFromPoint) {
                var selection = document.getSelection();
                var range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
                if (selection && range) {
                    selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset);
                }
            }
            if (this.customDropImage && typeof this.customDropImage == 'function') {
                this.customDropImage(evt.dataTransfer.files, this.insert.bind(this));
            }
            else {
                this.readFiles(evt.dataTransfer.files, this.insert.bind(this));
            }
        }
    };
    ImageDrop.prototype.handlePaste = function (evt) {
        var _this = this;
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
                if (this.customDropImage && typeof this.customDropImage == 'function') {
                    this.customDropImage(evt.clipboardData.items, this.insert.bind(this));
                }
                else {
                    this.readFiles(evt.clipboardData.items, function (attrs) {
                        // 等待 this.quill.getSelection() 返回有效的 index
                        setTimeout(function () { return _this.insert(attrs); }, 0);
                    });
                }
            }
        }
    };
    ImageDrop.prototype.insert = function (attrs) {
        var range = this.quill.getSelection() || {}, index = (range.index != undefined) ? range.index : this.quill.getLength();
        if (!attrs.src)
            return;
        this.quill.insertEmbed(index, 'myImage', attrs);
        this.quill.setSelection(index + 1);
    };
    // Extract image URIs a list of files from evt.dataTransfer or evt.clipboardData
    ImageDrop.prototype.readFiles = function (files, callback) {
        // check each file for an image
        [].forEach.call(files, function (file) {
            if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
                // Note that some file formats such as psd start with image/* but are not readable
                return;
            }
            var reader = new FileReader();
            reader.onload = function (evt) {
                callback({
                    src: evt.target.result
                });
            };
            // read the clipboard item or file
            var blob = file.getAsFile ? file.getAsFile() : file;
            if (blob instanceof Blob) {
                reader.readAsDataURL(blob);
            }
        });
    };
    return ImageDrop;
}());
export default ImageDrop;
