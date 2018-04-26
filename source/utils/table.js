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

/**
 * 设置Table列表激活样式
 * @description 策划要求：被点击的列表加载active样式
 * @param {object} node - 所需要添加样式的节点或子节点
 */
export const setRowActive = (node) => {
  node.classList.add('row-active');
  getSiblings(node).map((i) => i.classList.remove('row-active'));
};
