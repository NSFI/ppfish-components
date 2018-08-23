import React from 'react';
import Loadable from 'react-loadable';
import {Spin} from '../../../source/components';
import {getPlainComponentList} from "../../utils";

const plainComponentList = getPlainComponentList();

export default Loadable({
  loader: () => import('../../../libs/markdown/index').then(object => object.default),
  render(Markdown, props) {
    const menuItem = plainComponentList.find(itm => itm.key === props.params.demo);
    if (menuItem || !props.params.demo) {
      //import react/demo
      if (menuItem && menuItem.value.type === 'react') {
        const Demo = menuItem.value.component.default;
        return <Demo {...props}/>;
      } else {
        class Demo extends Markdown {
          static defaultProps = menuItem && menuItem.value.props ? menuItem.value.props : {};

          document() {
            let markdown;
            try {
              markdown = require(`../../docs/zh-CN/${props.params.demo}.md`);
            } catch (e) {
              markdown = require(`../../docs/zh-CN/${plainComponentList[0].key}.md`);
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
  loading: () => (
    <Spin.Container style={{height: 540}}>
      <Spin tip="组件正在加载..."/>
    </Spin.Container>
  )
});
