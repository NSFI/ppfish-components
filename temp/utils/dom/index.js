import EventObject from './EventObject';

/**
 * 是否能使用 DOM 方法
 * @type {Boolean}
 */
export const hasDOM =
    typeof window !== 'undefined' &&
    !!window.document &&
    !!document.createElement;

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

/**
 * 节点是否包含指定 className
 * @param  {Element}  node
 * @param  {String}  className
 * @return {Boolean}
 *
 * @example
 * dom.hasClass(document.body, 'foo');
 */
export function hasClass(node, className) {
  /* istanbul ignore if */
  if (!hasDOM || !node) {
    return false;
  }

  if (node.classList) {
    return node.classList.contains(className);
  } else {
    return node.className.indexOf(className) > -1;
  }
}

/**
 * 添加 className
 * @param {Element} node
 * @param {String} className
 *
 * @example
 * dom.addClass(document.body, 'foo');
 */
export function addClass(node, className, _force) {
  /* istanbul ignore if */
  if (!hasDOM || !node) {
    return;
  }

  if (node.classList) {
    node.classList.add(className);
  } else if (_force === true || !hasClass(node, className)) {
    node.className += ` ${className}`;
  }
}

/**
 * 移除 className
 * @param  {Element} node
 * @param  {String} className
 *
 * @example
 * dom.removeClass(document.body, 'foo');
 */
export function removeClass(node, className, _force) {
  /* istanbul ignore if */
  if (!hasDOM || !node) {
    return;
  }

  if (node.classList) {
    node.classList.remove(className);
  } else if (_force === true || hasClass(node, className)) {
    node.className = node.className
        .replace(className, '')
        .replace(/\s+/g, ' ')
        .trim();
  }
}
