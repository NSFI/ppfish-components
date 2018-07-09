import glob from 'glob';
import { render } from 'enzyme';
import { getPlainComponentList } from "../../site/utils/index.js";
import Markdown from '../../libs/markdown/index.js';

const plainComponentList = getPlainComponentList();
const getDemo = (demoName) => {
  if (!demoName) {
    return null;
  }

  const menuItem = plainComponentList.find(item => item.key === demoName);
  if (menuItem && menuItem.value.type === 'markdown') {
    class Demo extends Markdown {
      static defaultProps = menuItem.value && menuItem.value.props ? menuItem.value.props : {};

      document() {
        let markdown = null;
        
        try {
          markdown = require(`../../site/docs/zh-CN/${demoName}.md`);
        } catch (e) {
          throw e;
        }

        return markdown;
      }
    }

    return Demo;
  }

  return null;
};

export default function demoTest(compName, options = {}) {
  let demoName = compName.substr(0, 1).toLowerCase() + compName.substr(1);
  let testMethod = options.skip === true ? test.skip : test;

  testMethod(`Renders ${compName} demo correctly`, () => {
    const wrapper = render(getDemo(demoName));
    expect(wrapper).toMatchSnapshot();
  });
}
