import React from 'react';
import { mount } from 'enzyme';
import PicturePreview from '../PicturePreview';

describe('<PicturePreview />', () => {
  let wrapper,
    onClose = jest.fn(),
    props = {
      visible: true,
      source: [
        {
          src: '//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe',
          name: 'pic1',
        },
        {
          src: '//ysf.qiyukf.net/080b89be8a980ab9951a1b0de643d939',
          name: 'pic2',
        },
        {
          src: '//ysf.qiyukf.net/260c0731b07b2933fe04f1a4d629450c',
          name: 'pic3',
        },
      ],
      activeIndex: 0,
      onClose,
      draggable: false,
      toolbar: false,
      mask: true
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

  it('组件能够被正常渲染', () => {
    expect(wrapper.find('.fishd-picturepreview-root').exists()).toBe(true);
    expect(wrapper.find('.toolbar').exists()).toBe(true);
    expect(wrapper.find('.fishdicon.fishdicon-arrow-line-Bold.next').exists()).toBe(true);
    expect(wrapper.find('.fishdicon.fishdicon-arrow-line-Bold.prev').exists()).toBe(true);
    expect(wrapper.find('.canvas>img').length).toBe(props.source.length);
    expect(wrapper.find('.toolbarTitle').text()).toBe('1/3');
  });

  test('组件能够被正常关闭', () => {
    wrapper.find('.fishdicon-picture-close').simulate('click');
    expect(wrapper.find('.fishd-picturepreview-root').hasClass('fishd-picturepreview-hide')).toBe(
      true,
    );
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.fishd-picturepreview-root').prop('data-show')).toBe(false);
    expect(onClose).toHaveBeenCalled();
  });

  test('能够正常切换图片', () => {
    // 检查 activeIndex 是否为第一张图片
    expect(wrapper.find('.canvas img.active').prop('src')).toBe(props.source[0].src);


    // 向左切换图片
    wrapper.find('.fishdicon.fishdicon-arrow-line-Bold.prev').simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.canvas img.active').prop('src')).toBe(props.source[2].src);


    wrapper.find('.fishdicon.fishdicon-arrow-line-Bold.prev').simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.canvas img.active').prop('src')).toBe(props.source[1].src);

    // 向右切换图片

    wrapper.find('.fishdicon.fishdicon-arrow-line-Bold.next').simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.canvas img.active').prop('src')).toBe(props.source[2].src);

    wrapper.find('.fishdicon.fishdicon-arrow-line-Bold.next').simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.canvas img.active').prop('src')).toBe(props.source[0].src);

    wrapper.find('.fishdicon.fishdicon-arrow-line-Bold.next').simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.canvas img.active').prop('src')).toBe(props.source[1].src);
  });

  test('能够正常显示和隐藏图片控制条', () => {
    // 默认为隐藏状态
    expect(wrapper.find('.toolbar').hasClass('fishd-picturepreview-hide')).toBe(true);

    // 切换为显示状态
    props.toolbar = true;
    wrapper = mount(<PicturePreview {...props} />);
    expect(wrapper.find('.toolbar').hasClass('fishd-picturepreview-hide')).toBe(false);
  });

  test('能够正常隐藏遮罩', () => {
    // 默认有
    expect(wrapper.find('.fishd-picturepreview-mask').exists()).toBe(true);

    // 切换为隐藏
    props.mask = false;
    wrapper = mount(<PicturePreview {...props} />);
    expect(wrapper.find('.fishd-picturepreview-mask').exists()).toBe(false);
  });

  test('能够通过activeIndex改变默认图片', () => {
    // 默认有
    expect(wrapper.find('.canvas img.active').prop('src')).toBe(props.source[0].src);

    // 切换
    props.activeIndex = 1
    wrapper = mount(<PicturePreview {...props} />);
    expect(wrapper.find('.canvas img.active').prop('src')).toBe(props.source[1].src);
  });
});
