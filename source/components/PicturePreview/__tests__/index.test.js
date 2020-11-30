import React from 'react';
import { shallow, render, mount } from 'enzyme';
import PicturePreview from '../index';

xdescribe('<PicturePreview />', () => {
  let wrapper,
  props = {
    visible: true,
    source: [
      {
        "src": "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe",
        "name": "pic1"
      },
      {
        "src": "//ysf.qiyukf.net/080b89be8a980ab9951a1b0de643d939",
        "name": "pic2"
      },
      {
        "src": "//ysf.qiyukf.net/260c0731b07b2933fe04f1a4d629450c",
        "name": "pic3"
      }
    ],
    activeIndex: 0,
    onClose: jest.fn(),
    dragable: false,
    toolbar: false
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    wrapper = mount(<PicturePreview {...props} />);
  });

  test('组件能够被正常渲染', () => {
    const inst = wrapper.instance();
    expect(inst).toBeInstanceOf(PicturePreview);
    expect(wrapper.find('.fishd-picturepreview-content-wrap').exists()).toBe(true);
    // expect(wrapper.find('.slick-slide').length).toBe(props.source.length);
    expect(wrapper.state('activeIndex')).toBe(props.activeIndex);
    expect(wrapper.state('visible')).toBe(props.visible);
    expect(wrapper.state('isFullscreen')).toBe(false);
    expect(wrapper.state('isDisableDengbi')).toBe(false);
    expect(wrapper.state('isDisableFangda')).toBe(false);
    expect(wrapper.state('isDisableSuoxiao')).toBe(false);
  });

  test('组件能够被正常关闭', () => {
    wrapper.find('.fishdicon-close-modal-line').simulate('click');
    expect(wrapper.state('visible')).toBe(false);
    expect(props.onClose).toBeCalled();
  });

  test('能够正常切换图片', () => {
    // 检查 activeIndex 是否为第一张图片
    // expect(wrapper.find('.slick-current img').prop('src')).toBe(props.source[0].url);
    expect(wrapper.state('activeIndex')).toBe(0);

    // 向左切换图片
    wrapper.find('.fishdicon-left').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(2);

    wrapper.find('.fishdicon-left').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(1);

    // 向右切换图片
    wrapper.find('.fishdicon-right').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(2);

    wrapper.find('.fishdicon-right').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(0);

    wrapper.find('.fishdicon-right').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(1);
  });

  xtest('能够正常显示和隐藏图片控制条', () => {
    // 默认为隐藏状态
    expect(wrapper.find('.ctrl-wrap').hasClass('hide')).toBe(true);

    // 切换为显示状态
    props.controller = true;
    wrapper = mount(<PicturePreview {...props} />);
    expect(wrapper.find('.ctrl-wrap').hasClass('hide')).toBe(false);
  });
});
