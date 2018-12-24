import React from 'react';
import { render, mount } from 'enzyme';
import {KeyCode} from '../../../utils';
import Cascader from '../index.tsx';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

function filter(inputValue, path) {
  return path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

describe('Cascader', () => {
  it('popup correctly when panel is hidden', () => {
    const wrapper = mount(
      <Cascader options={options} />
    );
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });

  it('popup correctly when panel is open', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Cascader options={options} onVisibleChange={onVisibleChange} />
    );
    wrapper.find('input').simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    expect(onVisibleChange).toHaveBeenCalledWith(true);
  });

  it('support controlled mode', () => {
    const wrapper = mount(
      <Cascader options={options} />
    );
    wrapper.setProps({
      value: ['zhejiang', 'hangzhou', 'xihu'],
    });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('popup correctly with defaultValue', () => {
    const wrapper = mount(
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />
    );
    wrapper.find('input').simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });

  it('should support popupVisible', () => {
    const wrapper = mount(
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />
    );
    expect(wrapper.find('Trigger').instance().getComponent().props.visible).toBe(false);
    wrapper.setProps({ popupVisible: true });
    expect(wrapper.find('Trigger').instance().getComponent().props.visible).toBe(true);
  });

  it('can be selected', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Cascader options={options} onChange={onChange} />);
    wrapper.find('input').simulate('click');
    let popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    popupWrapper.find('.fishd-cascader-menu').at(0).find('.fishd-cascader-menu-item').at(0)
      .simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    popupWrapper.find('.fishd-cascader-menu').at(1).find('.fishd-cascader-menu-item').at(0)
      .simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    popupWrapper.find('.fishd-cascader-menu').at(2).find('.fishd-cascader-menu-item').at(0)
      .simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'], expect.anything());
  });

  it('backspace should work with `Cascader[showSearch]`', () => {
    const wrapper = mount(<Cascader options={options} showSearch />);
    wrapper.find('input').simulate('change', { target: { value: '123' } });
    expect(wrapper.state('inputValue')).toBe('123');
    wrapper.find('input').simulate('keydown', { keyCode: KeyCode.BACKSPACE });
    // Simulate onKeyDown will not trigger onChange by default, so the value is still '123'
    expect(wrapper.state('inputValue')).toBe('123');
  });

  it('should highlight keyword and filter when search in Cascader', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'z' } });
    expect(wrapper.state('inputValue')).toBe('z');
    const popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(popupWrapper).toMatchSnapshot();
  });

  it('should render not found content', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: '__notfoundkeyword__' } });
    expect(wrapper.state('inputValue')).toBe('__notfoundkeyword__');
    const popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(popupWrapper).toMatchSnapshot();
  });

  it('should support to clear selection', () => {
    const wrapper = mount(<Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />);
    expect(wrapper.find('.fishd-cascader-picker-label').text()).toBe('Zhejiang / Hangzhou');
    wrapper.find('.fishd-cascader-picker-clear').at(0).simulate('click');
    expect(wrapper.find('.fishd-cascader-picker-label').text()).toBe('');
  });

  it('should close popup when clear selection', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Cascader
        options={options}
        popupVisible
        defaultValue={['zhejiang', 'hangzhou']}
        onVisibleChange={onVisibleChange}
      />
    );
    wrapper.find('.fishd-cascader-picker-clear').at(0).simulate('click');
    expect(onVisibleChange).toHaveBeenCalledWith(false);
  });

  it('should clear search input when clear selection', () => {
    const wrapper = mount(
      <Cascader
        options={options}
        defaultValue={['zhejiang', 'hangzhou']}
        showSearch
      />
    );
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'xxx' } });
    expect(wrapper.state('inputValue')).toBe('xxx');
    wrapper.find('.fishd-cascader-picker-clear').at(0).simulate('click');
    expect(wrapper.state('inputValue')).toBe('');
  });

  it('should not trigger visible change when click search input', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Cascader
        options={options}
        showSearch
        onVisibleChange={onVisibleChange}
      />
    );
    wrapper.find('input').simulate('focus');
    expect(onVisibleChange).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('click');
    expect(onVisibleChange).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('click');
    expect(onVisibleChange).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('blur');
    wrapper.setState({ popupVisible: false });
    wrapper.find('input').simulate('click');
    expect(onVisibleChange).toHaveBeenCalledTimes(2);
  });

  it('should change filtered item when options are changed', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('.fishd-cascader-menu-item').length).toBe(2);
    wrapper.setProps({ options: [options[0]] });
    expect(wrapper.find('.fishd-cascader-menu-item').length).toBe(1);
  });
});
