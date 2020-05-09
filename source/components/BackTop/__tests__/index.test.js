import React from 'react';
import {mount} from 'enzyme';
import BackTop from '../index.tsx';

describe('BackTop', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  xit('should scroll to top after click it', () => {
    const wrapper = mount(<BackTop visibilityHeight={-1}/>);
    document.documentElement.scrollTop = 400;
    // trigger scroll manually
    wrapper.instance().handleScroll();
    jest.runAllTimers();
    wrapper.find('.fishd-back-top').simulate('click');
    jest.runAllTimers();
    expect(Math.abs(Math.round(document.documentElement.scrollTop))).toBe(0);
  });
});
