/**
 * 全屏
 * @param  {[type]} element [description] 需要全屏展示的元素
 * @return {[type]}         [description]
 */
export const fullscreen = function(element) {
    var func = element.requestFullscreen || element.msRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullScreen;

    if (Object.prototype.toString.call(func) == "[object Function]") {
        func.call(element);
    }
}

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
}
