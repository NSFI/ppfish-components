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
  // 通用组件
  Object.keys(componentList.list).map((group) => (
    Object.keys(componentList.list[group]).map(key => {
      plainComponentList.push({
        url: `#/components/${key}`,
        key,
        value: componentList.list[group][key],
      });
    })
  ));
  // 业务组件
  Object.keys(componentList.business).map((group) => (
    Object.keys(componentList.business[group]).map(key => {
      plainComponentList.push({
        url: `#/components/${key}`,
        key,
        value: componentList.business[group][key],
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
