"use strict";

exports.__esModule = true;
exports.default = void 0;

var _quill = _interopRequireDefault(require("quill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Clipboard = _quill.default.import('modules/clipboard');

var Delta = _quill.default.import('delta');

var PlainClipboard =
/*#__PURE__*/
function (_Clipboard) {
  _inheritsLoose(PlainClipboard, _Clipboard);

  function PlainClipboard() {
    return _Clipboard.apply(this, arguments) || this;
  }

  var _proto = PlainClipboard.prototype;

  _proto.onPaste = function onPaste(e) {
    e.preventDefault();
    var range = this.quill.getSelection(),
        text = e.clipboardData.getData('text/plain'),
        delta = new Delta().retain(range.index).delete(range.length).insert(text),
        index = text.length + range.index,
        length = 0;
    this.quill.updateContents(delta, 'silent');
    this.quill.setSelection(index, length, 'silent');
    this.quill.scrollIntoView();
  };

  return PlainClipboard;
}(Clipboard);

var _default = PlainClipboard;
exports.default = _default;