import { hasDOM } from './dom';

const animationEndEventNames = {
    WebkitAnimation: 'webkitAnimationEnd',
    OAnimation: 'oAnimationEnd',
    animation: 'animationend',
};

const transitionEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    OTransition: 'oTransitionEnd',
    transition: 'transitionend',
};

/**
 * 是否支持某些动效事件，如果支持，返回相应的end事件名
 * @private
 * @param  {Object<String>} names
 * @return {Object|false}
 */
function _supportEnd(names) {
  if (!hasDOM) {
      return false;
  }

  const el = document.createElement('div');
  let ret = false;

  for (let key in names) {
    if (names.hasOwnProperty(key)) {
      if (el.style[key] !== undefined) {
        ret = { end: names[key] };
        break;
      }
    }
  }

  return ret;
}

/**
 * 是否支持animation以及动画结束事件名
 * @type {Object|false}
 * @property {String} end 动画结束事件名
 */
const animation = _supportEnd(animationEndEventNames);

/**
 * 是否支持transition以及过滤效果结束事件名
 * @type {Object|false}
 * @property {String} end 过渡效果结束事件名
 */
const transition = _supportEnd(transitionEventNames);

export default {
  animation,
  transition
};
