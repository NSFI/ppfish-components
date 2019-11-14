"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getAttrs = void 0;

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

var Embed = _quill["default"]["import"]('blots/embed');

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
  _inherits(ImageBlot, _Embed);

  function ImageBlot() {
    _classCallCheck(this, ImageBlot);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImageBlot).apply(this, arguments));
  }

  _createClass(ImageBlot, [{
    key: "format",
    value: function format(name, value) {
      _get(_getPrototypeOf(ImageBlot.prototype), "format", this).call(this, name, value);
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(ImageBlot), "create", this).call(this);

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
    }
  }, {
    key: "formats",
    value: function formats(node) {
      return getAttrs(node);
    }
  }, {
    key: "value",
    value: function value(node) {
      return getAttrs(node);
    }
  }]);

  return ImageBlot;
}(Embed);

ImageBlot.blotName = 'myImage';
ImageBlot.tagName = 'img';
var _default = ImageBlot;
exports["default"] = _default;