import React from 'react';
import {shallow, render, mount} from 'enzyme';
import BizTimePicker from '../index';

describe('<BizTimePicker />', () => {
  let wrapper;
  const props = {
    className: 'my-time-picker',
    open: false
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    wrapper = mount((
      <BizTimePicker {...props}/>
    ));
  });

  test('BizTimePicker组件能够被正确渲染', () => {
    const inst = wrapper.instance();
    expect(inst).toBeInstanceOf(BizTimePicker);
    expect(wrapper.find('.my-time-picker').exists()).toBe(true);
    expect(wrapper.find('.biz-time-picker-click-area').exists()).toBe(true);
  });

  test('BizTimePicker组件能够正常展开', () => {
    wrapper.find('.biz-time-picker-click-area').simulate('click');
    expect(wrapper.state('open')).toBe(true);
  });

  test('BizTimePicker组件能被正常禁用', () => {
    expect(wrapper.find('.biz-time-picker-click-area').hasClass('disabled')).toBe(false);
    props.disabled = true;
    wrapper = mount(<BizTimePicker {...props} />);
    expect(wrapper.find('.biz-time-picker-click-area').hasClass('disabled')).toBe(true);
  });

});
