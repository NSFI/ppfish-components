"use strict";

exports.__esModule = true;
exports.createChainedFunction = createChainedFunction;
exports.getScroll = getScroll;
exports.getStyle = getStyle;
exports.guid = guid;
exports.decodeHTML = exports.shallowEqualArrays = exports.shallowEqual = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

/**
 * 以浅拷贝的方式判断两个对象是否相等
 * @param objA
 * @param objB
 * @returns {bool}
 */
var shallowEqual = function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
};

exports.shallowEqual = shallowEqual;

var shallowEqualArrays = function shallowEqualArrays(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
};
/**
 * 将HTML代码片段转化为编码后的字符串
 * @param htmlFragment
 * @returns {string}
 */


exports.shallowEqualArrays = shallowEqualArrays;

var decodeHTML = function decodeHTML(htmlFragment) {
  var temp = document.createElement("div");
  temp.innerHTML = htmlFragment;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
};

exports.decodeHTML = decodeHTML;

function createChainedFunction() {
  var args = [].slice.call(arguments, 0);

  if (args.length === 1) {
    return args[0];
  }

  return function chainedFunction() {
    for (var i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}

function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  var prop = top ? 'pageYOffset' : 'pageXOffset';
  var method = top ? 'scrollTop' : 'scrollLeft';
  var isWindow = target === window;
  var ret = isWindow ? target[prop] : target[method]; // ie6,7,8 standard mode

  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
}

var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;

var camelCase = function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};
/**
 * 获取元素的样式
 * @param  {[type]} element   [description] 元素标签
 * @param  {[type]} styleName [description] 样式名
 * @return {[type]}           [description]
 */


function getStyle(element, styleName) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') styleName = 'cssFloat';

  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}
/**
 * 生成全局唯一的id
 * @param  {String} [prefix=''] 前缀字符串
 * @return {String}
 *
 * @example
 * guid(); // j7jv509c
 * guid('prefix-'); // prefix-j7jv509d
 */


var timestamp = Date.now();

function guid(prefix) {
  prefix = prefix || '';
  return prefix + (timestamp++).toString(36);
}