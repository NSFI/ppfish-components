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
