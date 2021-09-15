import React from 'react';
import { mount } from 'enzyme';
import Input from '../index';
import { act } from 'react-dom/test-utils';

const globalTimeout = global.setTimeout;
const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => globalTimeout(resolve, timeout));
  });
};

const { TextArea, Counter } = Input;

describe('TextArea', () => {
  const originalGetComputedStyle = window.getComputedStyle;
  let scrollHeightCalledCount = 1;
  const mockScrollHeightGet = jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get');
  beforeAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: node => ({
        getPropertyValue: prop => {
          if (prop === 'box-sizing') {
            return originalGetComputedStyle(node)[prop] || 'border-box';
          }
          return originalGetComputedStyle(node)[prop];
        },
      }),
    });
    mockScrollHeightGet.mockImplementation(() => {
      scrollHeightCalledCount += 1;
      return scrollHeightCalledCount * 20;
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: originalGetComputedStyle,
    });
    mockScrollHeightGet.mockRestore();
  });

  it('should support focus() blur() resizeTextarea(), and can get textarea element', () => {
    const ref = React.createRef<any>();
    mount(<TextArea ref={ref} />);
    ref.current.focus();
    ref.current.blur();
    ref.current.resizeTextarea();
    expect(ref.current.textAreaRef instanceof HTMLTextAreaElement).toBe(true);
  });

  it('should auto calculate height according to content length', async () => {
    const wrapper = mount(
      <TextArea value="" readOnly autosize={{ minRows: 2, maxRows: 6 }} wrap="off" />,
    );
    wrapper.setProps({ value: '1111\n2222\n3333' });
    await sleep(0);
    const prevHeight = wrapper.getDOMNode<HTMLTextAreaElement>().style.height;

    wrapper.setProps({ value: '1111' });
    await sleep(0);
    const currHeight = wrapper.getDOMNode<HTMLTextAreaElement>().style.height;

    expect(prevHeight).not.toBe(currHeight);
  });

  it('should support onPressEnter and onKeyDown', () => {
    const fakeHandleKeyDown = jest.fn();
    const fakeHandlePressEnter = jest.fn();
    const wrapper = mount(
      <TextArea onKeyDown={fakeHandleKeyDown} onPressEnter={fakeHandlePressEnter} />,
    );
    /** KeyCode 65 is A */
    wrapper.find('textarea').simulate('keydown', { keyCode: 65 });
    expect(fakeHandleKeyDown).toHaveBeenCalledTimes(1);
    expect(fakeHandlePressEnter).toHaveBeenCalledTimes(0);

    /** KeyCode 13 is Enter */
    wrapper.find('textarea').simulate('keydown', { keyCode: 13 });
    expect(fakeHandleKeyDown).toHaveBeenCalledTimes(2);
    expect(fakeHandlePressEnter).toHaveBeenCalledTimes(1);
  });

  it('should support disabled', () => {
    const wrapper = mount(<TextArea disabled />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  describe('maxLength', () => {
    it('should support maxLength', () => {
      const wrapper = mount(<TextArea maxLength={10} />);
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('maxLength should not block control', () => {
      const wrapper = mount(<TextArea maxLength={1} value="light" />);
      expect(wrapper.find('textarea').props().value).toEqual('light');
    });

    it('should exceed maxLength when use IME', () => {
      const onChange = jest.fn();

      const wrapper = mount(<TextArea maxLength={1} onChange={onChange} />);
      // mock 输入法
      wrapper.find('textarea').simulate('compositionStart');
      wrapper.find('textarea').simulate('change', { target: { value: 'zhu' } });
      wrapper.find('textarea').simulate('compositionEnd', { currentTarget: { value: '竹' } });
      wrapper.find('textarea').simulate('change', { target: { value: '竹' } });

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ target: expect.objectContaining({ value: '竹' }) }),
      );
    });
  });

  it('when prop value not in this.props, resizeTextarea should be called', async () => {
    const wrapper = mount(<TextArea aria-label="textarea" autosize />);

    const prevHeight = wrapper.getDOMNode<HTMLTextAreaElement>().style.height;
    wrapper.find('textarea').simulate('change', {
      target: {
        value: 'test',
      },
    });
    await sleep(0);
    const currHeight = wrapper.getDOMNode<HTMLTextAreaElement>().style.height;
    expect(prevHeight).not.toBe(currHeight);
  });

  it('handleKeyDown', () => {
    const onPressEnter = jest.fn();
    const onKeyDown = jest.fn();
    const wrapper = mount(
      <TextArea onPressEnter={onPressEnter} onKeyDown={onKeyDown} aria-label="textarea" />,
    );
    wrapper.find('textarea').simulate('keydown', { keyCode: 13 });
    expect(onPressEnter).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should display defaultValue when value is undefined', () => {
    const wrapper = mount(<TextArea defaultValue="Light" />);
    const value = wrapper.getDOMNode<HTMLTextAreaElement>().value;
    expect(value).toBe('Light');
  });

  describe('Counter', () => {
    it('click outside should also get focus', () => {
      const ref = React.createRef<any>();
      const wrapper = mount(<Counter value={111} limit={100} ref={ref} />);
      const onFocus = jest.spyOn(ref.current.textarea, 'focus');
      wrapper.find('.fishd-input-counter').simulate('click');
      expect(onFocus).toHaveBeenCalled();
    });

    it('should support focus() blur() textarea', () => {
      const ref = React.createRef<any>();
      mount(<Counter limit={100} ref={ref} />);
      ref.current.focus();
      ref.current.blur();
      ref.current.textarea.focus();
      ref.current.textarea.blur();
      ref.current.textarea.resizeTextarea();
    });
  });
});
