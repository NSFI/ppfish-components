"use strict";

exports.__esModule = true;
exports.sanitize = sanitize;
exports.default = void 0;

var _quill = _interopRequireDefault(require("quill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Inline = _quill.default.import('blots/inline');

var Link =
/*#__PURE__*/
function (_Inline) {
  _inheritsLoose(Link, _Inline);

  function Link() {
    return _Inline.apply(this, arguments) || this;
  }

  Link.create = function create(value) {
    this.formatCursor = false;

    var node = _Inline.create.call(this, value);

    node.setAttribute('target', '_blank');
    node.setAttribute('href', value && value.url); // node.setAttribute('data-type', value && value.type || 'default');

    return node;
  };

  Link.formats = function formats(node) {
    // 修复在超链接后输入回车光标被异常添加超链接的问题
    var domChildren = node.children; // let containsCursor = /<\s*span\s*class\s*=\s*['"]\s*ql-cursor\s*['"]\s*>\s*\ufeff\s*<\s*\/\s*span\s*>/gi;

    if (!this.formatCursor && domChildren && domChildren.length == 1 && domChildren[0].innerText == "\uFEFF") {
      return;
    }

    return {
      // type: node.getAttribute('data-type') || 'default',
      url: node.getAttribute('href')
    };
  } // static sanitize(url) {
  //   return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  // }
  ;

  var _proto = Link.prototype;

  _proto.format = function format(name, value) {
    if (name !== this.statics.blotName || !value) {
      _Inline.prototype.format.call(this, name, value);
    } else {
      // 在超链接内输入回车时需要为光标添加超链接
      this.statics.formatCursor = true;
      this.domNode.setAttribute('href', value && value.url); // this.domNode.setAttribute('data-type', value && value.type || 'default');
    }
  };

  return Link;
}(Inline);

exports.default = Link;
Link.blotName = 'myLink';
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