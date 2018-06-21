import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PicturePreview from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('<PicturePreview />', () => {
  const setup = () => {
    const props = {
      visible: true,
      source: [
        {
          "url": "../../../assets/image/material/382_680.png",
          "size": "382*680"
        },
        {
          "url": "../../../assets/image/material/410_412.png",
          "size": "410*412"
        },
        {
          "url": "../../../assets/image/material/895_642.png",
          "size": "895*642"
        },
        {
          "url": "../../../assets/image/material/960_600.png",
          "size": "960*600"
        },
        {
          "url": "../../../assets/image/material/680_320.png",
          "size": "680*320"
        }
      ],
      activeIndex: 0,
      onClose: jest.fn(),
      dots: false,
      controller: false
    };

    return {
      props
    };
  };

  const { props } = setup();
  let wrapper;

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
    expect(wrapper.find('.m-picture-preview-content-wrap').exists()).toBe(true);
    expect(wrapper.find('.slick-slide').length).toBe(props.source.length);
    expect(wrapper.state()).toEqual({
      activeIndex: props.activeIndex,
      visible: props.visible,
      isFullscreen: false,
      isDisableDengbi: false,
      isDisableFangda: false,
      isDisableSuoxiao: false
    });
  });

  test('组件能够被正常关闭', () => {
    wrapper.find('.icon-guanbi').simulate('click');
    expect(wrapper.state('visible')).toBe(false);
    expect(props.onClose).toBeCalled();
  });

  test('能够正常的切换图片', () => {
    // 检查 activeIndex 是否为第一张图片
    expect(wrapper.find('.slick-current img').prop('src')).toBe(props.source[0].url);
    expect(wrapper.state('activeIndex')).toBe(0);

    // 向左切换图片
    wrapper.find('.icon-zuojiantou1').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(4);

    wrapper.find('.icon-zuojiantou1').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(3);

    // 向右切换图片
    wrapper.find('.icon-youjiantou1').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(4);

    wrapper.find('.icon-youjiantou1').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(0);

    wrapper.find('.icon-youjiantou1').simulate('click');
    jest.runAllTimers();
    expect(wrapper.state('activeIndex')).toBe(1);
  });

  test('能够正常的显示和隐藏图片控制条', () => {
    // 检查 activeIndex
    expect(wrapper.find('.slick-current img').prop('src')).toBe(props.source[props.activeIndex].url);
  });
});
