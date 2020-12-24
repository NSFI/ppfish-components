import React from 'react';
import { shallow, render, mount } from 'enzyme';
import RichEditor from '../index';

xdescribe('<RichEditor />', () => {
  let wrapper,
      props = {
        value: "初始内容a<br/>初始内容b"
      };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    wrapper = mount(<RichEditor {...props} />);
  });

  test('组件能够被正常渲染', () => {
    const inst = wrapper.instance();
    expect(inst).toBeInstanceOf(RichEditor);
    expect(inst.getEditor().constructor.name).toBe('Quill');
    expect(wrapper.find('.fishd-richeditor').exists()).toBe(true);
    expect(wrapper.find('.editor-head').exists()).toBe(true);
    expect(wrapper.find('.editor-body').exists()).toBe(true);
    expect(wrapper.state()).toEqual({
      value: "初始内容a<br/>初始内容b"
    });
  });
});
