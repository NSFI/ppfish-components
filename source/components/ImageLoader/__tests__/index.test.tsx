import React from 'react';
import { mount } from 'enzyme';
import ImageLoader from '../index';
import Icon from '../../Icon';

describe('ImageLoader', () => {
  const originImage = (global as any).Image;
  const demoImgUrl = '//ysf.qiyukf.net/45689D5A40BE0BCB962C8878CFDEEFA8';

  class Image {
    private url: string;

    constructor() {
      this.url = '';
    }

    set src(url) {
      this.url = url;
    }

    onload() {}

    onerror() {}
  }

  (global as any).Image = Image;
  const mockImageSrcSet = jest.spyOn(Image.prototype, 'src', 'set');

  afterEach(() => {
    mockImageSrcSet.mockReset();
  });

  afterAll(() => {
    mockImageSrcSet.mockRestore();
    (global as any).Image = originImage;
  });

  it('should support imgProps', () => {
    mockImageSrcSet.mockImplementation(function () {
      this.onload();
    });
    const imgProps = {
      alt: 'test alt',
      width: 200,
      height: 100,
    };
    const wrapper = mount(<ImageLoader src={demoImgUrl} imgProps={imgProps} />);
    const imgNode = wrapper.find('img').getDOMNode<HTMLImageElement>();
    expect(imgNode.alt).toBe(imgProps.alt);
    expect(imgNode.width).toBe(imgProps.width);
    expect(imgNode.height).toBe(imgProps.height);
  });

  it('should support onLoad', () => {
    mockImageSrcSet.mockImplementation(function () {
      this.onload();
    });
    const onLoad = jest.fn();
    mount(<ImageLoader onLoad={onLoad} src={demoImgUrl} />);
    expect(onLoad).toHaveBeenCalled();
  });

  it('should support onError', () => {
    mockImageSrcSet.mockImplementation(function () {
      this.onerror();
    });
    const onError = jest.fn();
    const wrapper = mount(<ImageLoader onError={onError} src={demoImgUrl} />);
    wrapper.update();
    expect(onError).toHaveBeenCalled();
  });

  it('should update image', () => {
    mockImageSrcSet.mockImplementation(function () {
      this.onload();
    });
    const wrapper = mount(<ImageLoader src={demoImgUrl} />);
    const prevImgNode = wrapper.find('img').getDOMNode<HTMLImageElement>();
    expect(prevImgNode.src).toContain(demoImgUrl);
    const newImgUrl = '//test.img';
    wrapper.setProps({ src: newImgUrl });
    wrapper.update();
    const nextImgNode = wrapper.find('img').getDOMNode<HTMLImageElement>();
    expect(nextImgNode.src).toContain(newImgUrl);
  });

  describe('should support preLoader', () => {
    it('preLoader ReactNode', () => {
      const node = <Icon className="test-node" type="time-line" />;
      const wrapper = mount(<ImageLoader preLoader={node} src={demoImgUrl} />);
      expect(wrapper.find('.test-node').length).not.toBe(0);
    });

    it('preLoader function', () => {
      const renderFunc = () => <Icon className="test-node" type="time-line" />;
      const wrapper = mount(<ImageLoader preLoader={renderFunc} src={demoImgUrl} />);
      expect(wrapper.find('.test-node').length).not.toBe(0);
    });

    it('preLoader default content', () => {
      const wrapper = mount(<ImageLoader src={demoImgUrl} />);
      expect(wrapper.find('.preload-img').length).not.toBe(0);
    });
  });

  describe('should support failedLoader', () => {
    it('failedLoader ReactNode', () => {
      mockImageSrcSet.mockImplementation(function () {
        this.onerror();
      });
      const node = <Icon className="test-node" type="time-line" />;
      const wrapper = mount(<ImageLoader failedLoader={node} src={demoImgUrl} />);
      expect(wrapper.find('.test-node').length).not.toBe(0);
    });

    it('failedLoader function', () => {
      mockImageSrcSet.mockImplementation(function () {
        this.onerror();
      });
      const renderFunc = () => <Icon className="test-node" type="time-line" />;
      const wrapper = mount(<ImageLoader failedLoader={renderFunc} src={demoImgUrl} />);
      expect(wrapper.find('.test-node').length).not.toBe(0);
    });

    it('failedLoader default content', () => {
      mockImageSrcSet.mockImplementation(function () {
        this.onerror();
      });
      const wrapper = mount(<ImageLoader src={demoImgUrl} />);
      expect(wrapper.find('.failed-img').length).not.toBe(0);
    });
  });
});
