import pinyin from 'pinyin';

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


export const listConvertToGroup = (list) => {
  let groupitem = {};
  let group = [];
  if (!list || list.length <= 0) {
    return [];
  }
  list.forEach((item) => {
    let fletter = (pinyin(item.label, {
      style: pinyin.STYLE_NORMAL
    }) || []).join("").toUpperCase()[0];
    fletter = (fletter && fletter >= 'A' && fletter <= 'Z') ? fletter : '#';
    groupitem[fletter] = groupitem[fletter] || [];
    groupitem[fletter].push(item);
  });
  Object.keys(groupitem).forEach(i => {
    group.push({
      label: i,
      list: groupitem[i],
      key: i
    });
  });
  group.sort(function (a, b) {
    return a.label > b.label ? 1 : -1;
  });
  return group;
};
