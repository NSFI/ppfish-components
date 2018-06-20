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

  test('组件能够被正常渲染', () => {
    const wrapper = mount(<PicturePreview {...props} />);

    expect(wrapper.find('.m-picture-preview-content-wrap').exists());
    expect(wrapper.find('.slick-slide').length).toBe(props.source.length);
  });

  test('能够正常的切换图片', () => {
    const wrapper = mount(<PicturePreview {...props} />);

    // 检查 activeIndex
    expect(wrapper.find('.slick-current img').prop('src')).toBe(props.source[props.activeIndex].url);

    // TODO: 左右切换图片
    
  });
});
