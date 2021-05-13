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
var Inline = Quill.import('blots/inline');
var setAttr = function (node, value) {
    if (typeof value == 'string' || typeof value == 'number') {
        node.style.fontSize = value;
    }
    else if (Object.prototype.toString.call(value) == "[object Object]") {
        if (value.editable != null) {
            node.setAttribute('contenteditable', value.editable);
        }
        if (value.fontSize != null) {
            node.style.fontSize = value.fontSize;
        }
    }
    return node;
};
// 自定义span标签的字体大小和contenteditable属性
var CustomAttrBlot = /** @class */ (function (_super) {
    __extends(CustomAttrBlot, _super);
    function CustomAttrBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAttrBlot.create = function (value) {
        var node = _super.create.call(this);
        return setAttr(node, value);
    };
    CustomAttrBlot.formats = function (node) {
        // 返回值不能为 null（Fix bug: Cannot read property 'mutations' of undefined）
        return {
            fontSize: node.style.fontSize,
            editable: node.getAttribute('contenteditable')
        };
    };
    CustomAttrBlot.prototype.format = function (name, value) {
        if (name !== this.statics.blotName || !value) {
            _super.prototype.format.call(this, name, value);
        }
        else {
            setAttr(this.domNode, value);
        }
    };
    return CustomAttrBlot;
}(Inline));
CustomAttrBlot.blotName = 'customAttr';
CustomAttrBlot.tagName = 'span';
export default CustomAttrBlot;
