/**
 * 深度递归传入的对象，所有string类型的属性，去掉前后空格
 * @param obj
 * @returns {object}
 */
export const deepTrim = (obj) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'string') {
        obj[prop] = obj[prop].trim();
      } else if (typeof obj[prop] === 'object') {
        deepTrim(obj[prop]);
      }
    }
  }
};
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
