import { render, mount, shallow } from 'enzyme';
import React from 'react';
import { plainComponents } from "../../site/componentsPage/index.js";

const disableDemoTest = false;
const getDemoContainer = (demoName) => {
  if (!demoName) return null;
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

type Options = {
  skip?: boolean;
};

export default function demoTest(compName, options: Options = {}) {
  let demoName = compName.substr(0, 1).toLowerCase() + compName.substr(1);
  let testMethod = (disableDemoTest || options.skip === true) ? test.skip : test;

  const menuItem = plainComponents.find(item => item.key.toLowerCase() === demoName.toLowerCase());
  testMethod(`Renders ${compName} demo correctly`, () => {
    const Container = getDemoContainer(demoName);
    expect(Container).not.toBeNull();
    const wrapper = render(<Container {...menuItem.props}/>);
    expect(wrapper).toMatchSnapshot();
  });
}
