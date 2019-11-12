"use strict";

exports.__esModule = true;
exports.getScrollBarSize = exports.checkFullscreen = exports.addFullscreenchangeEvent = exports.exitfullscreen = exports.fullscreen = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

/**
 * 全屏
 * @param  {[type]} element [需要全屏展示的元素]
 * @return {[type]}         [description]
 */
var fullscreen = function fullscreen(element) {
  var func = element.requestFullscreen || element.msRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullScreen;

  if (Object.prototype.toString.call(func) == "[object Function]") {
    func.call(element);
  }
};
/**
 * 退出全屏
 * @return {[type]} [description]
 */


exports.fullscreen = fullscreen;

var exitfullscreen = function exitfullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
/**
 * 监听全屏变化事件
 * @param {[type]}   element [要监听全屏变化的元素]
 * @param {Function} fn      [回调函数]
 */


exports.exitfullscreen = exitfullscreen;

var addFullscreenchangeEvent = function addFullscreenchangeEvent(element, fn) {
  element.addEventListener("fullscreenchange", fn);
  element.addEventListener("mozfullscreenchange", fn);
  element.addEventListener("webkitfullscreenchange", fn);
  element.addEventListener("msfullscreenchange", fn);
};
/**
 * 检查是否处于全屏状态
 * @return {[Boolean]} [description]
 */


exports.addFullscreenchangeEvent = addFullscreenchangeEvent;

var checkFullscreen = function checkFullscreen() {
  return !!(document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled);
};

exports.checkFullscreen = checkFullscreen;
var cached;

var getScrollBarSize = function getScrollBarSize(fresh) {
  if (fresh || cached === undefined) {
    var inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';
    var outer = document.createElement('div');
    var outerStyle = outer.style;
    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);
    cached = widthContained - widthScroll;
  }

  return cached;
};

exports.getScrollBarSize = getScrollBarSize;