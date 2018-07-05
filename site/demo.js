import React from 'react';
import Loadable from 'react-loadable';
import {BizLoading} from '../source/components';
import {getPlainComponentList} from "./utils";

const plainComponentList = getPlainComponentList();

export default Loadable({
  loader: () => import('../libs/markdown'),
  render(Markdown, props) {
    const menuItem = plainComponentList.find(itm => itm.key === props.params.demo);
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
              markdown = require(`./docs/zh-CN/${plainComponentList[0].key}.md`);
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
