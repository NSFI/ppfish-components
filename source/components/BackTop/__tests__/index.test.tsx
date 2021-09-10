import React from 'react';
import { mount } from 'enzyme';
import BackTop from '../index';

describe('BackTop', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should scroll to top after click it', () => {
    const wrapper = mount(<BackTop duration={100} visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    jest.runAllTimers();
    expect(document.documentElement.scrollTop).toBe(400);
    wrapper.find('.fishd-back-top').simulate('click');

    jest.runAllTimers();
    expect(document.documentElement.scrollTop).toBeLessThan(1);
    scrollToSpy.mockRestore();
  });

  it('support onClick', () => {
    const onClick = jest.fn();
    const wrapper = mount(<BackTop onClick={onClick} visibilityHeight={-1} />);
    window.scrollTo(0, 400);
    wrapper.find('.fishd-back-top').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
