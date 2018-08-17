import React from 'react';
import { mount, render } from 'enzyme';
import Layout from '../index.tsx';

const { Sider, Content } = Layout;

describe('Layout', () => {
  it('detect the sider as children', async () => {
    const wrapper = mount(
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.fishd-layout').hasClass('fishd-layout-has-sider')).toBe(true);
  });

  it('detect the sider inside the children', async () => {
    const wrapper = mount(
      <Layout>
        <div><Sider>Sider</Sider></div>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.fishd-layout').hasClass('fishd-layout-has-sider')).toBe(true);
  });

  it('detect fishd-layout-sider-has-trigger class in sider when fishd-layout-sider-trigger div tag exists', async () => {
    const wrapper = mount(
      <Layout>
        <div><Sider collapsible>Sider</Sider></div>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.fishd-layout-sider').hasClass('fishd-layout-sider-has-trigger')).toBe(true);
  });

  it('should have 50% width of sidebar', async () => {
    const wrapper = mount(
      <Layout>
        <div><Sider width="50%">Sider</Sider></div>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.fishd-layout-sider').at(0).prop('style').width).toBe('50%');
    expect(wrapper.find('.fishd-layout-sider').at(0).prop('style').flex).toBe('0 0 50%');
  });

  it('detect fishd-layout-sider-zero-width class in sider when its width is 0%', async () => {
    const wrapper = mount(
      <Layout>
        <div><Sider width="0%">Sider</Sider></div>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.fishd-layout-sider').hasClass('fishd-layout-sider-zero-width')).toBe(true);
  });

  it('detect fishd-layout-sider-dark as default theme', async () => {
    const wrapper = mount(
      <Sider>Sider</Sider>
    );
    expect(wrapper.find('.fishd-layout-sider').hasClass('fishd-layout-sider-dark'));
  });

  it('detect fishd-layout-sider-light when set light theme', async () => {
    const wrapper = mount(
      <Sider theme="light">Sider</Sider>
    );
    expect(wrapper.find('.fishd-layout-sider').hasClass('fishd-layout-sider-light'));
  });

  it('renders string width correctly', () => {
    const wrapper = render(
      <Sider width="200">Sider</Sider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should be controlled by collapsed', () => {
    const wrapper = mount(
      <Sider>Sider</Sider>
    );
    expect(wrapper.instance().state.collapsed).toBe(false);
    wrapper.setProps({ collapsed: true });
    expect(wrapper.instance().state.collapsed).toBe(true);
  });
});

describe('Sider onBreakpoint', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: () => {},
          removeListener: () => {},
        };
      }),
    });
  });

  it('should trigger onBreakpoint', async () => {
    const onBreakpoint = jest.fn();

    mount(
      <Sider breakpoint="md" onBreakpoint={onBreakpoint}>Sider</Sider>
    );
    expect(onBreakpoint).toBeCalledWith(true);
  });
});
