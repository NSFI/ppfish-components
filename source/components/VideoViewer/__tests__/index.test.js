import React from 'react';
import { shallow, render, mount } from 'enzyme';
import VideoViewer from '../index';

describe('<VideoViewer />', () => {
  let wrapper;
  let refVideo;
  const props = {
    maskClosable: false,
    visible: false,
    mask: true,
    draggable: true,
    width: 600
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    refVideo = React.createRef();
    wrapper = mount(<VideoViewer {...props}>
        <VideoViewer.Video ref={refVideo} src="http://pic.qiantucdn.com/58pic/shipin/13/38/13/13381368.mp4" />
      </VideoViewer>);
  });

  test('组件能够被正确渲染', () => {
    const inst = wrapper.instance();
    expect(inst).toBeInstanceOf(VideoViewer);
    wrapper.setProps({visible: true});
    // 由于antd Modal使用React.createPortal实现，需要测试document.body内是否插入正确的DOM节点
    const modalRoot = global.document.querySelector('.ant-modal');
    expect(modalRoot.querySelector('video')).toBeTruthy();
  });

  test('组件能够被正常关闭', () => {
    wrapper.setProps({visible: false});
    expect(wrapper.find('Modal').prop('visible')).toBe(false);
  });

});
