import React from 'react';
import { mount } from 'enzyme';
import Tag from '../index';

describe('Tag', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be closable', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Tag closable onClose={onClose} />
    );
    expect(wrapper.find('.fishdicon-close-modal-line').length).toBe(1);
    expect(wrapper.find('.fishd-tag').length).toBe(1);
    wrapper.find('.fishdicon-close-modal-line').simulate('click');
    expect(onClose).toBeCalled();
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.fishd-tag').length).toBe(0);
  });

  it('should not be closed when prevent default', () => {
    const onClose = (e) => {
      e.preventDefault();
    };
    const wrapper = mount(
      <Tag closable onClose={onClose} />
    );
    expect(wrapper.find('.fishdicon-close-modal-line').length).toBe(1);
    expect(wrapper.find('.fishd-tag').length).toBe(1);
    wrapper.find('.fishdicon-close-modal-line').simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.fishd-tag').length).toBe(1);
  });

  it('can be controlled by visible', () => {
    const wrapper = mount(
      <Tag visible />
    );
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setProps({ visible: false });
    jest.runAllTimers();
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setProps({ visible: true });
    jest.runAllTimers();
    expect(wrapper.render()).toMatchSnapshot();
  });
});
