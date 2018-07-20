import EventObject from './EventObject';

/**
 * 获取同级的相邻节点
 * @param {object} elem - 节点
 * @returns {Array} 相邻节点数组
 */
export const getSiblings = (elem) => {
  let siblings = [];
  let sibling = elem.parentNode.firstChild;
  for (; sibling; sibling = sibling.nextSibling)
    if (sibling.nodeType === 1 && sibling !== elem)
      siblings.push(sibling);
  return siblings;
};
// Check if node is equal to root or in the subtree of root
export const contains = (root, n) => {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};

export const addEventListener = (target, eventType, callback) => {
  function wrapCallback(e) {
    const ne = new EventObject(e);
    callback.call(target, ne);
  }

  if (target.addEventListener) {
    target.addEventListener(eventType, wrapCallback, false);
    return {
      remove() {
        target.removeEventListener(eventType, wrapCallback, false);
      },
    };
  } else if (target.attachEvent) {
    target.attachEvent(`on${eventType}`, wrapCallback);
    return {
      remove() {
        target.detachEvent(`on${eventType}`, wrapCallback);
      },
    };
  }
};
