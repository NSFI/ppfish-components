import { render, mount, shallow } from 'enzyme';
import React from 'react';

import { getPlainComponentList } from "../../site/utils/index.js";
const plainComponentList = getPlainComponentList();


const getDemoContainer = (demoName) => {
  if (!demoName) {
    return null;
  }

  let demoContainerClass = require(`../../site/docs/zh-CN/${demoName}.md`);
  if (typeof demoContainerClass === 'function') {
    return demoContainerClass;
  } else if (
    demoContainerClass &&
    typeof demoContainerClass === 'object' &&
    typeof demoContainerClass.default === 'function'
  ) {
    return demoContainerClass.default;
  } else {
    return null;
  }
};

export default function demoTest(compName, options = {}) {
  let demoName = compName.substr(0, 1).toLowerCase() + compName.substr(1);
  let testMethod = options.skip === true ? test.skip : test;

  const menuItem = plainComponentList.find(item => item.key === demoName);
  if (menuItem && menuItem.value.type === 'markdown') {
    testMethod(`Renders ${compName} demo correctly`, () => {
      const Container = getDemoContainer(demoName);

      expect(Container).not.toBeNull();
      const wrapper = render(<Container />);

      expect(wrapper).toMatchSnapshot();
    });

  } else {
    xit('skip', () => {});
  }
}
