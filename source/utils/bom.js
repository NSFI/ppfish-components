// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
export const getInternetExplorerVersion = () => {
  let rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer') {
    let ua = navigator.userAgent;
    let re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
};

export const isWebkit = () => {
  const agent = navigator.userAgent.toLowerCase();
  const index = agent.indexOf('chrome/');
  const version = parseInt(agent.slice(index + 7, index + 9));
  if (index > 0 && version >= 50) {
    return true;
  } else {
    return false;
  }
};

/**
 * 全屏
 * @param  {[type]} element [需要全屏展示的元素]
 * @return {[type]}         [description]
 */
export const fullscreen = function(element) {
  let func = element.requestFullscreen || element.msRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullScreen;

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
  return !!(document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled);
};
