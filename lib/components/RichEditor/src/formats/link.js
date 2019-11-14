"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = sanitize;
exports["default"] = void 0;

var _quill = _interopRequireDefault(require("quill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Inline = _quill["default"]["import"]('blots/inline');

var Link =
/*#__PURE__*/
function (_Inline) {
  _inherits(Link, _Inline);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, _getPrototypeOf(Link).apply(this, arguments));
  }

  _createClass(Link, [{
    key: "format",
    // static sanitize(url) {
    //   return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
    // }
    value: function format(name, value) {
      if (name !== this.statics.blotName || !value) {
        _get(_getPrototypeOf(Link.prototype), "format", this).call(this, name, value);
      } else {
        // 在超链接内输入回车时需要为光标添加超链接
        this.statics.formatCursor = true;
        this.domNode.setAttribute('href', value && value.url); // this.domNode.setAttribute('data-type', value && value.type || 'default');
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      this.formatCursor = false;

      var node = _get(_getPrototypeOf(Link), "create", this).call(this, value);

      node.setAttribute('target', '_blank');
      node.setAttribute('href', value && value.url); // node.setAttribute('data-type', value && value.type || 'default');

      return node;
    }
  }, {
    key: "formats",
    value: function formats(node) {
      // 修复在超链接后输入回车光标被异常添加超链接的问题
      var domChildren = node.children; // let containsCursor = /<\s*span\s*class\s*=\s*['"]\s*ql-cursor\s*['"]\s*>\s*\ufeff\s*<\s*\/\s*span\s*>/gi;

      if (!this.formatCursor && domChildren && domChildren.length == 1 && domChildren[0].innerText == "\uFEFF") {
        return;
      }

      return {
        // type: node.getAttribute('data-type') || 'default',
        url: node.getAttribute('href')
      };
    }
  }]);

  return Link;
}(Inline);

exports["default"] = Link;
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