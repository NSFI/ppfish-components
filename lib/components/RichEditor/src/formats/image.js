"use strict";

exports.__esModule = true;
exports.default = exports.getAttrs = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.function.name");

var _quill = _interopRequireDefault(require("quill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Embed = _quill.default.import('blots/embed');

var getAttrs = function getAttrs(node) {
  var value = {};

  if (node.hasAttributes()) {
    var attrs = node.attributes;

    for (var i = attrs.length - 1; i >= 0; i--) {
      value[attrs[i].name] = attrs[i].value;
    }
  }

  return value;
};

exports.getAttrs = getAttrs;

var ImageBlot =
/*#__PURE__*/
function (_Embed) {
  _inheritsLoose(ImageBlot, _Embed);

  function ImageBlot() {
    return _Embed.apply(this, arguments) || this;
  }

  ImageBlot.create = function create(value) {
    var node = _Embed.create.call(this);

    if (Object.prototype.toString.call(value) == "[object Object]") {
      Object.keys(value).forEach(function (key) {
        try {
          node.setAttribute(key, value[key]);
        } catch (e) {
          console.error(e); // eslint-disable-line
        }
      });
    }

    return node;
  };

  ImageBlot.formats = function formats(node) {
    return getAttrs(node);
  };

  ImageBlot.value = function value(node) {
    return getAttrs(node);
  };

  var _proto = ImageBlot.prototype;

  _proto.format = function format(name, value) {
    _Embed.prototype.format.call(this, name, value);
  };

  return ImageBlot;
}(Embed);

ImageBlot.blotName = 'myImage';
ImageBlot.tagName = 'img';
var _default = ImageBlot;
exports.default = _default;