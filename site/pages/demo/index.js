import React from 'react';
import Loadable from 'react-loadable';
import {Spin} from '../../../source/components';
import {plainComponents} from '../../componentsPage';

export default Loadable({
  loader: () => import('../../../libs/markdown/index').then(object => object.default),
  render(Markdown, props) {
    const menuItem = plainComponents.find(itm => itm.key === props.params.demo);
    if (menuItem || !props.params.demo) {
      //import react/demo
      if (menuItem && menuItem.type === 'react') {
        const Demo = menuItem.component.default;
        return <div><Demo {...props}/></div>;
      } else {
        class Demo extends Markdown {
          static defaultProps = menuItem && menuItem.props ? menuItem.props : {};

          document() {
            let markdown;
            try {
              markdown = require(`../../docs/zh-CN/${props.params.demo}.md`);
            } catch (e) {
              markdown = require(`../../docs/zh-CN/quickStart.md`);
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
