function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import ReactDOM from 'react-dom';
import scrollIntoView from 'dom-scroll-into-view';
import has from 'lodash/has';
import createBaseForm from './createBaseForm';
import { mixin as formMixin } from './createForm';
import { getParams } from './utils';

function computedStyle(el, prop) {
  var getComputedStyle = window.getComputedStyle;
  var style = // If we have getComputedStyle
  getComputedStyle ? // Query it
  // TODO: From CSS-Query notes, we might need (node, null) for FF
  getComputedStyle(el) : // Otherwise, we are in IE and use currentStyle
  el.currentStyle;

  if (style) {
    return style[// Switch to camelCase for CSSOM
    // DEV: Grabbed from jQuery
    // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
    // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
    prop.replace(/-(\w)/gi, function (word, letter) {
      return letter.toUpperCase();
    })];
  }

  return undefined;
}

function getScrollableContainer(n) {
  var node = n;
  var nodeName;
  /* eslint no-cond-assign:0 */

  while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
    var overflowY = computedStyle(node, 'overflowY'); // https://stackoverflow.com/a/36900407/3040605

    if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
      return node;
    }

    node = node.parentNode;
  }

  return nodeName === 'body' ? node.ownerDocument : node;
}

var mixin = {
  getForm: function getForm() {
    return _objectSpread({}, formMixin.getForm.call(this), {
      validateFieldsAndScroll: this.validateFieldsAndScroll
    });
  },
  validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
    var _this = this;

    var _getParams = getParams(ns, opt, cb),
        names = _getParams.names,
        callback = _getParams.callback,
        options = _getParams.options;

    var newCb = function newCb(error, values) {
      if (error) {
        var validNames = _this.fieldsStore.getValidFieldsName();

        var firstNode;
        var firstTop;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = validNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var name = _step.value;

            if (has(error, name)) {
              var instance = _this.getFieldInstance(name);

              if (instance) {
                var node = ReactDOM.findDOMNode(instance);
                var top = node.getBoundingClientRect().top;

                if (node.type !== 'hidden' && (firstTop === undefined || firstTop > top)) {
                  firstTop = top;
                  firstNode = node;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (firstNode) {
          var c = options.container || getScrollableContainer(firstNode);
          scrollIntoView(firstNode, c, _objectSpread({
            onlyScrollIfNeeded: true
          }, options.scroll));
        }
      }

      if (typeof callback === 'function') {
        callback(error, values);
      }
    };

    return this.validateFields(names, options, newCb);
  }
};

function createDOMForm(option) {
  return createBaseForm(_objectSpread({}, option), [mixin]);
}

export default createDOMForm;