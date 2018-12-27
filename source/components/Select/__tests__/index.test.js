import React from 'react';
import {mount} from 'enzyme';
import Select from '../index';

describe('<Select />', () => {
  const props = {
    onVisibleChange: jest.fn(),
  };
  let wrapper;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
  });

  test('Select组件能够被正确渲染', () => {
    wrapper = mount((
      <Select {...props}>
        <Select.Option value={1}>1</Select.Option>
        <Select.Option value={2}>2</Select.Option>
        <Select.Option value={3}>3</Select.Option>
      </Select>
    ));
    const inst = wrapper.instance();
    expect(inst).toBeInstanceOf(Select);
    expect(wrapper.find('.fishd-select').exists()).toBe(true);
  });

  test('Select组件能够被正常打开', () => {
    wrapper.find('.fishd-select').simulate('click');
    expect(wrapper.state('visible')).toBe(true);
    expect(onVisibleChange).toHaveBeenCalledWith(true);
  });


  it('Select组件能够visible受控', () => {
    expect(wrapper.instance().getComponent().props.visible).toBe(true);
    wrapper.setProps({ visible: false });
    expect(wrapper.instance().getComponent().props.visible).toBe(false);
  });
});
