import React from 'react';
import { shallow, render, mount } from 'enzyme';
import VideoViewer from '../index';

describe('<VideoViewer />', () => {
  const props = {
    maskClosable: false,
    visible: true,
    mask: false,
    draggable: false,
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
  });

  test('组件能够被正确渲染', () => {
    const wrapper = mount((
      <VideoViewer {...props}>
        <VideoViewer.Video src="http://www.w3school.com.cn/i/movie.ogg" />
      </VideoViewer>
    ));
    const inst = wrapper.instance();
    expect(inst).toBeInstanceOf(VideoViewer);
    expect(wrapper.find('.m-video-viewer-inner').exists()).toBe(true);
  });
});
