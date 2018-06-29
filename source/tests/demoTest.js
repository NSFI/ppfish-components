import glob from 'glob';
import { render } from 'enzyme';

export default function demoTest(component, options = {}) {
  const files = glob.sync(`./source/components/${component}/demo/App.js`);

  files.forEach((file) => {
    let testMethod = options.skip === true ? test.skip : test;
    
    if (Array.isArray(options.skip) && options.skip.some(c => file.includes(c))) {
      testMethod = test.skip;
    }

    testMethod(`renders ${file} correctly`, () => {
      const demo = require(`../.${file}`); // eslint-disable-line global-require, import/no-dynamic-require
      const wrapper = render(demo);
      expect(wrapper).toMatchSnapshot();
    });
  });
}
