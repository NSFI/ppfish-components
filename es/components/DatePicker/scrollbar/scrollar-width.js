"use strict";

exports.__esModule = true;
exports.getScrollBarWidth = getScrollBarWidth;
var scrollBarWidth;

function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  var outer = document.createElement('div');
  outer.className = 'fishd-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);
  var widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';
  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);
  var widthWithScroll = inner.offsetWidth;
  scrollBarWidth = widthNoScroll - widthWithScroll;
  outer.parentNode.removeChild(outer);
  return scrollBarWidth;
}