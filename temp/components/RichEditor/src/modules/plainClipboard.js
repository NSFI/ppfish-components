var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Quill from 'quill';
var Clipboard = Quill.import('modules/clipboard');
var Delta = Quill.import('delta');
var PlainClipboard = /** @class */ (function (_super) {
    __extends(PlainClipboard, _super);
    function PlainClipboard(quill, options) {
        return _super.call(this, quill, options) || this;
    }
    PlainClipboard.prototype.onPaste = function (e) {
        if (this.options && this.options.pastePlainText) {
            e.preventDefault();
            var range = this.quill.getSelection(), text = e.clipboardData.getData('text/plain'), delta = new Delta().retain(range.index).delete(range.length).insert(text), index = text.length + range.index, length_1 = 0;
            this.quill.updateContents(delta, 'silent');
            this.quill.setSelection(index, length_1, 'silent');
            this.quill.scrollIntoView();
        }
        else {
            _super.prototype.onPaste.call(this, e);
        }
    };
    return PlainClipboard;
}(Clipboard));
export default PlainClipboard;
