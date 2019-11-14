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

import Quill from 'quill';
var Inline = Quill["import"]('blots/inline');

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
  _inherits(CustomAttrBlot, _Inline);

  function CustomAttrBlot() {
    _classCallCheck(this, CustomAttrBlot);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomAttrBlot).apply(this, arguments));
  }

  _createClass(CustomAttrBlot, [{
    key: "format",
    value: function format(name, value) {
      if (name !== this.statics.blotName || !value) {
        _get(_getPrototypeOf(CustomAttrBlot.prototype), "format", this).call(this, name, value);
      } else {
        setAttr(this.domNode, value);
      }
    }
  }], [{
    key: "create",
    value: function create(value) {
      var node = _get(_getPrototypeOf(CustomAttrBlot), "create", this).call(this);

      return setAttr(node, value);
    }
  }, {
    key: "formats",
    value: function formats(node) {
      // 返回值不能为 null（Fix bug: Cannot read property 'mutations' of undefined）
      return {
        fontSize: node.style.fontSize,
        editable: node.getAttribute('contenteditable')
      };
    }
  }]);

  return CustomAttrBlot;
}(Inline);

CustomAttrBlot.blotName = 'customAttr';
CustomAttrBlot.tagName = 'span';
export default CustomAttrBlot;