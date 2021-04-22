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
var Embed = Quill.import('blots/embed');
export var getAttrs = function (node) {
    var value = {};
    if (node.hasAttributes()) {
        var attrs = node.attributes;
        for (var i = attrs.length - 1; i >= 0; i--) {
            value[attrs[i].name] = attrs[i].value;
        }
    }
    return value;
};
var ImageBlot = /** @class */ (function (_super) {
    __extends(ImageBlot, _super);
    function ImageBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageBlot.create = function (value) {
        var node = _super.create.call(this);
        if (Object.prototype.toString.call(value) == "[object Object]") {
            Object.keys(value).forEach(function (key) {
                try {
                    node.setAttribute(key, value[key]);
                }
                catch (e) {
                    console.error(e); // eslint-disable-line
                }
            });
        }
        return node;
    };
    ImageBlot.formats = function (node) {
        return getAttrs(node);
    };
    ImageBlot.value = function (node) {
        return getAttrs(node);
    };
    ImageBlot.prototype.format = function (name, value) {
        _super.prototype.format.call(this, name, value);
    };
    return ImageBlot;
}(Embed));
ImageBlot.blotName = 'myImage';
ImageBlot.tagName = 'img';
export default ImageBlot;
