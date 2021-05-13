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
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.create = function (data) {
        this.formatCursor = false;
        var node = _super.create.call(this, data);
        if (data) {
            node.setAttribute('target', '_blank');
            node.setAttribute('href', data.url);
            if (data.type != null) {
                node.setAttribute('data-ql-link-type', data.type);
                if (data.type == 'attachment') {
                    node.setAttribute('download', data.name || "");
                    node.setAttribute('contenteditable', "false");
                }
            }
        }
        return node;
    };
    Link.formats = function (node) {
        // 修复在超链接后输入回车光标被异常添加超链接的问题
        var domChildren = node.children;
        // let containsCursor = /<\s*span\s*class\s*=\s*['"]\s*ql-cursor\s*['"]\s*>\s*\ufeff\s*<\s*\/\s*span\s*>/gi;
        if (!this.formatCursor && domChildren && domChildren.length == 1 && domChildren[0].innerText == "\ufeff") {
            return {};
        }
        return {
            url: node.getAttribute('href'),
            type: node.getAttribute('data-ql-link-type'),
            name: node.getAttribute('download')
        };
    };
    // static sanitize(url) {
    //   return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
    // }
    Link.prototype.format = function (name, data) {
        if (name !== this.statics.blotName || !data) {
            _super.prototype.format.call(this, name, data);
        }
        else {
            // 在超链接内输入回车时需要为光标添加超链接
            this.statics.formatCursor = true;
            if (data) {
                this.domNode.setAttribute('href', data.url);
                if (data.type != null) {
                    this.domNode.setAttribute('data-ql-link-type', data.type);
                    if (data.type == 'attachment') {
                        this.domNode.setAttribute('contenteditable', "false");
                        this.domNode.setAttribute('download', data.name || "");
                    }
                }
            }
        }
    };
    return Link;
}(Inline));
Link.blotName = 'link';
Link.tagName = 'A';
Link.formatCursor = false; // 是否为光标添加超链接
// Link.SANITIZED_URL = 'about:blank';
// Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];
function sanitize(url, protocols) {
    var anchor = document.createElement('a');
    anchor.href = url;
    var protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
    return protocols.indexOf(protocol) > -1;
}
export { Link as default, sanitize };
