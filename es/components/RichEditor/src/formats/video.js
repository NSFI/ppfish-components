"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

var _quill = _interopRequireDefault(require("quill"));

var _image = require("./image.js");

var _index = _interopRequireDefault(require("../../../message/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var BlockEmbed = _quill.default.import('blots/block/embed');

var Video =
/*#__PURE__*/
function (_BlockEmbed) {
  _inheritsLoose(Video, _BlockEmbed);

  function Video() {
    return _BlockEmbed.apply(this, arguments) || this;
  }

  Video.create = function create(value) {
    var node = _BlockEmbed.create.call(this, value);

    if (Object.prototype.toString.call(value) == "[object Object]") {
      // 默认带控制条
      if (value['controls'] === false) {
        delete value['controls'];
      } else {
        value['controls'] = true;
      }

      Object.keys(value).forEach(function (key) {
        var valType = typeof value[key];

        if (valType == 'function' || valType == 'object') {
          return;
        }

        try {
          node.setAttribute(key, value[key]);
        } catch (e) {
          console.error(e); // eslint-disable-line
        }
      });
    }

    return node;
  };

  Video.formats = function formats(node) {
    return (0, _image.getAttrs)(node);
  };

  Video.value = function value(node) {
    return (0, _image.getAttrs)(node);
  };

  var _proto = Video.prototype;

  _proto.format = function format(name, value) {
    _BlockEmbed.prototype.format.call(this, name, value);
  };

  return Video;
}(BlockEmbed);

Video.blotName = 'myVideo';
Video.className = 'ql-video';
Video.tagName = 'video';
var _default = Video;
exports.default = _default;