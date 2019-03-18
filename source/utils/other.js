/**
 * 以浅拷贝的方式判断两个对象是否相等
 * @param objA
 * @param objB
 * @returns {bool}
 */
export const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
};

export const shallowEqualArrays = (arrA, arrB) => {
  if (arrA === arrB) {
    return true;
  }

  const len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
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
export const decodeHTML = (htmlFragment) => {
  let temp = document.createElement("div");
  temp.innerHTML = htmlFragment;
  let output = temp.innerText || temp.textContent;
  temp = null;
  return output;
};

export function createChainedFunction() {
  let args = [].slice.call(arguments, 0);
  if (args.length === 1) {
    return args[0];
  }

  return function chainedFunction() {
    for (let i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}


export function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? target[prop] : target[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
}


const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const camelCase = function(name) {
  return name.replace(
    SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => offset
    ? letter.toUpperCase()
    : letter).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/**
 * 获取元素的样式
 * @param  {[type]} element   [description] 元素标签
 * @param  {[type]} styleName [description] 样式名
 * @return {[type]}           [description]
 */
export function getStyle(element, styleName) {
  if (!element || !styleName)
    return null;

  styleName = camelCase(styleName);

  if (styleName === 'float')
    styleName = 'cssFloat';

  try {
    const computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed
      ? computed[styleName]
      : null;
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
let timestamp = Date.now();
export function guid(prefix) {
  prefix = prefix || '';
  return prefix + (timestamp++).toString(36);
}
