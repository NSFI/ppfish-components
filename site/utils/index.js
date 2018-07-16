import componentList from '../componentsPage';

//获取平摊后的组件列表
export const getPlainComponentList = () => {
  const plainComponentList = [];
  Object.keys(componentList).forEach((type) => {
    const depth = getComponentDepth(componentList[type]);
    if (depth === 1) {
      const obj = componentList[type];
      Object.keys(obj).map(key => {
        plainComponentList.push({
          url: `#/components/${key}`,
          key,
          value: obj[key],
        });
      });
    } else if (depth === 2) {
      const obj = componentList[type];
      Object.keys(obj).map((group) => (
        Object.keys(obj[group]).map(key => {
          plainComponentList.push({
            url: `#/components/${key}`,
            key,
            value: obj[group][key],
          });
        })
      ));
    }
  });
  return plainComponentList;
};

//根据type、name获取菜单深度
export const getComponentDepth = (object = {}) => {
  let level = 1;
  const getDepth = (object => {
    const secondObj = object[Object.keys(object)[0]];
    if (!secondObj.type && !secondObj.name) {
      level++;
      getDepth(secondObj);
    }
  });
  getDepth(object);
  return level;
};
