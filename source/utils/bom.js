/**
 * 全屏
 * @param  {[type]} element [需要全屏展示的元素]
 * @return {[type]}         [description]
 */
export const fullscreen = function(element) {
  let func = (
    element.requestFullscreen ||
    element.msRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullScreen
  );

  if (Object.prototype.toString.call(func) == "[object Function]") {
    func.call(element);
  }
};

/**
 * 退出全屏
 * @return {[type]} [description]
 */
export const exitfullscreen = function() {
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
export const addFullscreenchangeEvent = function(element, fn) {
  element.addEventListener("fullscreenchange", fn);
  element.addEventListener("mozfullscreenchange", fn);
  element.addEventListener("webkitfullscreenchange", fn);
  element.addEventListener("msfullscreenchange", fn);
};

/**
 * 检查是否处于全屏状态
 * @return {[Boolean]} [description]
 */
export const checkFullscreen = function() {
  return !!(
    document.fullscreenEnabled ||
    window.fullScreen ||
    document.webkitIsFullScreen ||
    document.msFullscreenEnabled
  );
};

let cached;

export const getScrollBarSize = function(fresh) {
  if (fresh || cached === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

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

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
};
