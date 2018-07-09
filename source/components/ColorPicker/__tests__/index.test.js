import React from 'react';
import {shallow, render, mount} from 'enzyme';
import ColorPicker from '../index';

describe('<ColorPicker />', () => {
  const props = {
    onClose: jest.fn(),
    onOpen: jest.fn(),
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
    expect(wrapper.find('.u-color-picker-wrap').exists()).toBe(true);
  });

  test('ColorPicker组件能够被正常打开', () => {
    wrapper.find('.u-color-picker-trigger').simulate('click');
    expect(wrapper.state('open')).toBe(true);
    expect(props.onOpen).toBeCalled();
  });

  test('ColorPicker组件正常开关历史记录', () => {
    expect(wrapper.find('.u-color-picker-panel-history').exists()).toBe(false);
    wrapper.setProps({enableHistory: true});
    expect(wrapper.find('.u-color-picker-panel-history').exists()).toBe(true);
  });

  test('ColorPicker组件能正确设置历史记录个数', () => {
    wrapper.setProps({maxHistory: 10});
    expect(wrapper.find('.u-color-picker-panel-history-color').length).toEqual(10);
  });

  test('ColorPicker组件正常开关透明度', () => {
    expect(wrapper.find('.u-color-picker-panel-alpha').exists()).toBe(true);
    wrapper.setProps({enableAlpha: false});
    expect(wrapper.find('.u-color-picker-panel-alpha').exists()).toBe(false);
  });

  test('ColorPicker组件能够被正常关闭', () => {
    wrapper.find('.u-color-picker-trigger').simulate('click');
    expect(wrapper.state('open')).toBe(false);
    expect(props.onClose).toBeCalled();
  });
});
