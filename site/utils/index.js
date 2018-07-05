import componentList from '../componentsPage';

export const getPlainComponentList = () => {
  const plainComponentList = [];
  // 开发指南
  Object.keys(componentList.documents).map(key => {
    plainComponentList.push({
      url: `#/components/${key}`,
      key,
      value: componentList.documents[key],
    });
  });
  // 基础组件
  Object.keys(componentList.list).map((group) => (
    Object.keys(componentList.list[group]).map(key => {
      plainComponentList.push({
        url: `#/components/${key}`,
        key,
        value: componentList.list[group][key],
      });
    })
  ));
  // 设计规范
  Object.keys(componentList.patterns).map((group) => (
    Object.keys(componentList.patterns[group]).map(key => {
      plainComponentList.push({
        url: `#/components/${key}`,
        key,
        value: componentList.patterns[group][key],
      });
    })
  ));

  return plainComponentList;
};
