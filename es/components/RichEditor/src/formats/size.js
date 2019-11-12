"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

var _quill = _interopRequireDefault(require("quill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Inline = _quill.default.import('blots/inline');

var setAttr = function setAttr(node, value) {
  if (typeof value == 'string' || typeof value == 'number') {
    node.style.fontSize = value;
  } else if (Object.prototype.toString.call(value) == "[object Object]") {
    if (value.editable != null) {
      node.setAttribute('contenteditable', value.editable);
    } else {
      node.setAttribute('contenteditable', true);
    }

    node.style.fontSize = value.fontSize;
  }

  return node;
}; // 自定义span标签的字体大小和contenteditable属性


var CustomAttrBlot =
/*#__PURE__*/
function (_Inline) {
  _inheritsLoose(CustomAttrBlot, _Inline);

  function CustomAttrBlot() {
    return _Inline.apply(this, arguments) || this;
  }

  CustomAttrBlot.create = function create(value) {
    var node = _Inline.create.call(this);

    return setAttr(node, value);
  };

  CustomAttrBlot.formats = function formats(node) {
    // 返回值不能为 null（Fix bug: Cannot read property 'mutations' of undefined）
    return {
      fontSize: node.style.fontSize,
      editable: node.getAttribute('contenteditable')
    };
  };

  var _proto = CustomAttrBlot.prototype;

  _proto.format = function format(name, value) {
    if (name !== this.statics.blotName || !value) {
      _Inline.prototype.format.call(this, name, value);
    } else {
      setAttr(this.domNode, value);
    }
  };

  return CustomAttrBlot;
}(Inline);

CustomAttrBlot.blotName = 'customAttr';
CustomAttrBlot.tagName = 'span';
var _default = CustomAttrBlot;
exports.default = _default;