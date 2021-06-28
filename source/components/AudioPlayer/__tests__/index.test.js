import React from 'react';
import { shallow, render, mount } from 'enzyme';
import AudioPlayer from '../index';

describe('<AudioPlayer />', () => {
  let wrapper;
  const props = {
    source: '//ysf.qiyukf.net/26952087D69B79839F17040A5DC2E775.wav',
    controlVolume: true,
    download: true,
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    wrapper = mount(<AudioPlayer {...props} />);
  });

  test('AudioPlayer组件能够被正确渲染', () => {
    const inst = wrapper.find(AudioPlayer);
    expect(inst).toHaveLength(1);
    expect(wrapper.find('.fishd-audio-player-wrap').exists()).toBe(true);
    expect(wrapper.find('.volume-box').exists()).toBe(true);
    expect(wrapper.find('.download-box').exists()).toBe(true);
  });

  test('AudioPlayer组件能够隐藏控制音量按钮', () => {
    wrapper.setProps({ controlVolume: false });
    expect(wrapper.find('.volume-box').exists()).toBe(false);
  });

  test('AudioPlayer组件能够隐藏下载按钮', () => {
    wrapper.setProps({ download: false });
    expect(wrapper.find('.download-box').exists()).toBe(false);
  });
});
