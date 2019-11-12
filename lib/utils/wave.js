"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _Event = _interopRequireDefault(require("css-animation/lib/Event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Wave =
/** @class */
function (_super) {
  __extends(Wave, _super);

  function Wave() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.onClick = function (node) {
      if (node.className.indexOf('-leave') >= 0) {
        return;
      }

      _this.removeExtraStyleNode();

      var insertExtraNode = _this.props.insertExtraNode;
      var extraNode = document.createElement('div');
      extraNode.className = 'fishd-click-animating-node';
      var attributeName = insertExtraNode ? 'fishd-click-animating' : 'fishd-click-animating-without-extra-node';
      node.removeAttribute(attributeName);
      node.setAttribute(attributeName, 'true'); // Get wave color from target

      var waveColor = getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
      getComputedStyle(node).getPropertyValue('border-color') || getComputedStyle(node).getPropertyValue('background-color'); // Not white or transparnt or grey

      if (waveColor && waveColor !== '#ffffff' && waveColor !== 'rgb(255, 255, 255)' && _this.isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
      waveColor !== 'transparent') {
        extraNode.style.borderColor = waveColor;
        _this.styleForPesudo = document.createElement('style');
        _this.styleForPesudo.innerHTML = "[fishd-click-animating-without-extra-node]:after { border-color: " + waveColor + "; }";
        document.body.appendChild(_this.styleForPesudo);
      }

      if (insertExtraNode) {
        node.appendChild(extraNode);
      }

      var transitionEnd = function transitionEnd() {
        node.removeAttribute(attributeName);

        _this.removeExtraStyleNode();

        if (insertExtraNode) {
          node.removeChild(extraNode);
        }

        _Event.default.removeEndEventListener(node, transitionEnd);
      };

      _Event.default.addEndEventListener(node, transitionEnd);
    };

    _this.bindAnimationEvent = function (node) {
      if (node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
        return;
      }

      var onClick = function onClick(e) {
        // Fix radio button click twice
        if (e.target.tagName === 'INPUT') {
          return;
        }

        setTimeout(function () {
          return _this.onClick(node);
        }, 0);
      };

      node.addEventListener('click', onClick, true);
      return {
        cancel: function cancel() {
          node.removeEventListener('click', onClick, true);
        }
      };
    };

    return _this;
  }

  Wave.prototype.isNotGrey = function (color) {
    var match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);

    if (match && match[1] && match[2] && match[3]) {
      return !(match[1] === match[2] && match[2] === match[3]);
    }

    return true;
  };

  Wave.prototype.removeExtraStyleNode = function () {
    if (this.styleForPesudo && document.body.contains(this.styleForPesudo)) {
      document.body.removeChild(this.styleForPesudo);
      this.styleForPesudo = null;
    }
  };

  Wave.prototype.componentDidMount = function () {
    this.instance = this.bindAnimationEvent((0, _reactDom.findDOMNode)(this));
  };

  Wave.prototype.componentWillUnmount = function () {
    if (this.instance) {
      this.instance.cancel();
    }
  };

  Wave.prototype.render = function () {
    return this.props.children;
  };

  return Wave;
}(React.Component);

var _default = Wave;
exports.default = _default;