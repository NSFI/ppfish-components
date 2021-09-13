import React from 'react';
import { shallow, mount } from 'enzyme';
import Dropdown from '../index';
import Menu from '../../Menu/index';

describe('DropdownButton', () => {
  it('pass appropriate props to Dropdown', () => {
    const props = {
      align: {
        offset: [10, 20],
      },
      overlay: (
        <Menu>
          <Menu.Item>foo</Menu.Item>
        </Menu>
      ),
      disabled: false,
      trigger: ['hover'] as ('hover' | 'click' | 'contextMenu')[],
      visible: true,
      onVisibleChange: () => {},
    };

    const wrapper = shallow(<Dropdown.Button {...props} />);
    const dropdownProps = wrapper.find(Dropdown).props();

    Object.keys(props).forEach(key => {
      expect(dropdownProps[key]).toBe(props[key]); // eslint-disable-line
    });
  });

  it("don't pass visible to Dropdown if it's not exits", () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = shallow(<Dropdown.Button overlay={menu} />);
    const dropdownProps = wrapper.find(Dropdown).props();

    expect('visible' in dropdownProps).toBe(false);
  });

  it('should support overlayClassName and overlayStyle', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const overlayClassName = 'custom-classname';
    const wrapper = mount(
      <Dropdown.Button
        overlayClassName={overlayClassName}
        overlayStyle={{ color: 'red' }}
        overlay={menu}
        visible
      />,
    );
    const node = wrapper.find('.fishd-dropdown').at(0).render();
    expect(node.hasClass(overlayClassName)).toBe(true);
    expect(node.attr('style')).toContain('color: red');
  });

  it('should pass mouseEnterDelay and mouseLeaveDelay to Dropdown', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(
      <Dropdown.Button mouseEnterDelay={1} mouseLeaveDelay={2} overlay={menu} />,
    );
    const props = wrapper.find('Dropdown').props() as any;
    expect(props.mouseEnterDelay).toBe(1);
    expect(props.mouseLeaveDelay).toBe(2);
  });
});
