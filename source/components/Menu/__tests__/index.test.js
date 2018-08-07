import React from 'react';
import { mount } from 'enzyme';
import Menu from '../index.tsx';

const { SubMenu } = Menu;
const prefixCls = 'fishd-menu';

describe('Menu', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('If has select nested submenu item ,the menu items on the grandfather level should be highlight', () => {
    const wrapper = mount(
      <Menu defaultSelectedKeys={['1-3-2']} mode="vertical">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="1-1">Option 1</Menu.Item>
          <Menu.Item key="1-2">Option 2</Menu.Item>
          <SubMenu key="1-3" title="submenu1-3">
            <Menu.Item key="1-3-1">Option 3</Menu.Item>
            <Menu.Item key="1-3-2">Option 4</Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.' + prefixCls + '-submenu-selected').length).toBe(1);
  });

  it('should accept defaultOpenKeys in mode horizontal', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
  });

  it('should accept defaultOpenKeys in mode inline', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
  });

  it('should accept defaultOpenKeys in mode vertical', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="vertical">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
  });

  it('horizontal', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="horizontal" openTransitionName="">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
    wrapper.setProps({ openKeys: [] });
    wrapper.update();
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).toBe(true);
    wrapper.setProps({ openKeys: ['1'] });
    wrapper.update();
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
  });

  it('inline', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="inline" openAnimation="">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
    wrapper.setProps({ openKeys: [] });
    wrapper.update();
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).toBe(true);
    wrapper.setProps({ openKeys: ['1'] });
    wrapper.update();
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
  });

  it('vertical', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="vertical" openTransitionName="">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
    wrapper.setProps({ openKeys: [] });
    wrapper.update();
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).toBe(true);
    wrapper.setProps({ openKeys: ['1'] });
    wrapper.update();
    expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
  });

  // https://github.com/ant-design/ant-design/pulls/4677
  // https://github.com/ant-design/ant-design/issues/4692
  // TypeError: Cannot read property 'indexOf' of undefined
  it('pr #4677 and issue #4692', () => {
    const wrapper = mount(
      <Menu mode="horizontal">
        <SubMenu title="submenu">
          <Menu.Item key="1">menu1</Menu.Item>
          <Menu.Item key="2">menu2</Menu.Item>
        </SubMenu>
      </Menu>
    );
    wrapper.update();
    // just expect no error emit
  });

  it('should always follow openKeys when mode is switched', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).toBe(false);
    wrapper.setProps({ mode: 'vertical' });
    wrapper.update();
    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).toBe(false);
    wrapper.setProps({ mode: 'inline' });
    wrapper.update();
    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).toBe(false);
  });

  it('should always follow openKeys when inlineCollapsed is switched', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="inline">
        <Menu.Item key="menu1">
          <span>Option</span>
        </Menu.Item>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">
            Option
          </Menu.Item>
          <Menu.Item key="submenu2">
            Option
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-inline')).toBe(true);
    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).toBe(false);

    wrapper.setProps({ inlineCollapsed: true });
    // 动画结束后套样式;
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('ul.' + prefixCls + '-root').at(0).hasClass(prefixCls + '-vertical')).toBe(true);
    expect(wrapper.find('ul.' + prefixCls + '-sub').length).toBe(0);

    wrapper.setProps({ inlineCollapsed: false });
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-inline')).toBe(true);
    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).toBe(false);
  });

  it('inlineCollapsed should works well when specify a not existed default openKeys', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['not-existed']} mode="inline">
        <Menu.Item key="menu1">
          <span>Option</span>
        </Menu.Item>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">
            Option
          </Menu.Item>
          <Menu.Item key="submenu2">
            Option
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
    expect(wrapper.find('.' + prefixCls + '-sub').length).toBe(0);
    wrapper.setProps({ inlineCollapsed: true });
    jest.runAllTimers();
    wrapper.update();
    wrapper.find('.' + prefixCls + '-submenu-title').at(0).simulate('mouseEnter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.' + prefixCls + '-submenu').at(0).hasClass(prefixCls + '-submenu-vertical')).toBe(true);
    expect(wrapper.find('.' + prefixCls + '-submenu').at(0).hasClass(prefixCls + '-submenu-open')).toBe(true);
    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-vertical')).toBe(true);
    expect(wrapper.find('ul.' + prefixCls + '-sub').at(0).hasClass(prefixCls + '-hidden')).toBe(false);
  });

  describe('open submenu when click submenu title', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    const toggleMenu = (wrapper, index, event) => {
      wrapper.find('.' + prefixCls + '-submenu-title').at(index).simulate(event);
      jest.runAllTimers();
      wrapper.update();
    };

    it('inline', () => {
      const wrapper = mount(
        <Menu mode="inline">
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );
      expect(wrapper.find('.' + prefixCls + '-sub').length).toBe(0);
      toggleMenu(wrapper, 0, 'click');
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().length).toBe(1);
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
      toggleMenu(wrapper, 0, 'click');
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).toBe(true);
    });


    it('vertical', () => {
      const wrapper = mount(
        <Menu mode="vertical">
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );
      expect(wrapper.find('.' + prefixCls + '-sub').length).toBe(0);
      toggleMenu(wrapper, 0, 'mouseenter');
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().length).toBe(1);
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
      toggleMenu(wrapper, 0, 'mouseleave');
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).toBe(true);
    });

    it('horizontal', () => {
      jest.useFakeTimers();
      const wrapper = mount(
        <Menu mode="horizontal">
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );
      expect(wrapper.find('.' + prefixCls + '-sub').length).toBe(0);
      toggleMenu(wrapper, 0, 'mouseenter');
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().length).toBe(1);
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).not.toBe(true);
      toggleMenu(wrapper, 0, 'mouseleave');
      expect(wrapper.find('.' + prefixCls + '-sub').hostNodes().at(0).hasClass(prefixCls + '-hidden')).toBe(true);
    });
  });
});
