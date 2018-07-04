import Loadable from 'react-loadable';
import componentList from './componentsPage';
import BizLoading from '../source/components/BizLoading';
import React from 'react';

const menuList = [];
Object.keys(componentList.documents).map(key => {
  menuList.push({
    key,
    value: componentList.documents[key],
  });
});
// 基础组件
Object.keys(componentList.list).map((group) => (
  Object.keys(componentList.list[group]).map(key => {
    menuList.push({
      key,
      value: componentList.list[group][key],
    });
  })
));
// 设计规范
Object.keys(componentList.patterns).map((group) => (
  Object.keys(componentList.patterns[group]).map(key => {
    menuList.push({
      key,
      value: componentList.patterns[group][key],
    });
  })
));

export default Loadable({
  loader: () => import('../libs/markdown'),
  render(Markdown, props) {
    const menuItem = menuList.find(itm => itm.key === props.params.demo);
    if (menuItem || !props.params.demo) {
      //import react/demo
      if (menuItem && menuItem.value.type === 'react') {
        const Demo = menuItem.value.component;
        return <Demo {...props}/>;
      } else {
        class Demo extends Markdown {
          document() {
            let markdown;
            try {
              markdown = require(`./docs/zh-CN/${props.params.demo}.md`);
            } catch (e) {
              markdown = require(`./docs/zh-CN/quickStart.md`);
            }
            return markdown;
          }
        }

        return <Demo {...props}/>;
      }
    } else {
      location.assign('/#/home');
      return null;
    }
  },
  loading: () => <BizLoading/>
});
