"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataToArray = dataToArray;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.transformArguments = transformArguments;
exports.isNumeric = exports.transitionEnd = exports.trnasitionStr = void 0;

function dataToArray(vars) {
  if (Array.isArray(vars)) {
    return vars;
  }

  return [vars];
}

var trnasitionEndObject = {
  transition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd otransitionend'
};
var trnasitionStr = Object.keys(trnasitionEndObject).filter(function (key) {
  if (typeof document === 'undefined') {
    return false;
  }

  var html = document.getElementsByTagName('html')[0];
  return key in (html ? html.style : {});
})[0];
exports.trnasitionStr = trnasitionStr;
var transitionEnd = trnasitionEndObject[trnasitionStr];
exports.transitionEnd = transitionEnd;

function addEventListener(target, eventType, callback, options) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, options);
  } else if (target.attachEvent) {
    target.attachEvent("on".concat(eventType), callback);
  }
}

function removeEventListener(target, eventType, callback, options) {
  if (target.removeEventListener) {
    target.removeEventListener(eventType, callback, options);
  } else if (target.attachEvent) {
    target.detachEvent("on".concat(eventType), callback);
  }
}

function transformArguments(arg, cb) {
  var result;

  if (typeof arg === 'function') {
    result = arg(cb);
  } else {
    result = arg;
  }

  if (Array.isArray(result)) {
    if (result.length === 2) {
      return result;
    }

    return [result[0], result[1]];
  }

  return [result];
}

var isNumeric = function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value); // eslint-disable-line
};

exports.isNumeric = isNumeric;