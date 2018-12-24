import React from 'react';
import {mount} from 'enzyme';
import ColorPicker from '../index';

describe('<ColorPicker />', () => {
  const props = {
    onVisibleChange: jest.fn(),
  };
  let wrapper;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
  });

  test('ColorPicker组件能够被正确渲染', () => {
    wrapper = mount((
      <ColorPicker {...props}/>
    ));
    const inst = wrapper.instance();
    expect(inst).toBeInstanceOf(ColorPicker);
    expect(wrapper.find('.fishd-color-picker-wrap').exists()).toBe(true);
  });

  test('ColorPicker组件能够被正常打开', () => {
    wrapper.find('.fishd-color-picker-trigger').simulate('click');
    expect(wrapper.state('visible')).toBe(true);
    expect(props.onVisibleChange).toBeCalled();
  });

  test('ColorPicker组件正常开关历史记录', () => {
    expect(wrapper.find('.fishd-color-picker-panel-history').exists()).toBe(true);
    wrapper.setProps({enableHistory: false});
    expect(wrapper.find('.fishd-color-picker-panel-history').exists()).toBe(false);
  });

  test('ColorPicker组件能正确设置历史记录个数', () => {
    wrapper.setProps({enableHistory: true, maxHistory: 10});
    expect(wrapper.find('.fishd-color-picker-panel-history-color').length).toEqual(10);
  });

  test('ColorPicker组件正常开关透明度', () => {
    expect(wrapper.find('.fishd-color-picker-panel-alpha').exists()).toBe(false);
    wrapper.setProps({enableAlpha: true});
    expect(wrapper.find('.fishd-color-picker-panel-alpha').exists()).toBe(true);
  });

  test('ColorPicker组件能够被正常关闭', () => {
    wrapper.find('.fishd-color-picker-trigger').simulate('click');
    expect(wrapper.state('visible')).toBe(false);
    expect(props.onVisibleChange).toBeCalled();
  });
});
