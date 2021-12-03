import React from 'react';
import { mount } from 'enzyme';
import Select from '../index';

describe('<Select />', () => {
  const props = {
    onVisibleChange: jest.fn(),
    visible: false,
  };
  let wrapper;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {});

  test('Select组件能够被正确渲染', () => {
    wrapper = mount(
      <Select {...props}>
        <Select.Option value={1}>1</Select.Option>
        <Select.Option value={2}>2</Select.Option>
        <Select.Option value={3}>3</Select.Option>
      </Select>,
    );
    const inst = wrapper.instance();
    expect(inst).toBeInstanceOf(Select);
    expect(wrapper.find('.fishd-select').exists()).toBe(true);
  });

  test('Select组件能够被正常打开', () => {
    wrapper.find('.fishd-select').simulate('click');
    expect(wrapper.state('popupVisible')).toBe(true);
    expect(props.onVisibleChange).toHaveBeenCalledWith(true);
  });

  it('Select组件能够visible受控', () => {
    expect(wrapper.instance().props.visible).toBe(false);
    wrapper.setProps({ visible: true });
    expect(wrapper.instance().props.visible).toBe(true);
  });

  it('Select选项个数为3', () => {
    expect(wrapper.find('.fishd-select-dropdown-option-item').length).toBe(3);
  });

  it('Label可删除的多选操作事件触发正常', () => {
    const triggerValue = { label: '1', title: undefined, key: 1 };
    const onSelect = jest.fn((...args) => {
      console.log(args);
    });
    const onDeselect = jest.fn();
    wrapper = mount(
      <Select labelClear mode={'multiple'} value={[1]} onSelect={onSelect} onDeselect={onDeselect}>
        <Select.Option value={1}>1</Select.Option>
        <Select.Option value={2}>2</Select.Option>
        <Select.Option value={3}>3</Select.Option>
      </Select>,
    );

    wrapper.find('.fishd-select').simulate('click');

    wrapper.find('.fishd-select-dropdown-option-item').at(0).simulate('click');
    expect(onDeselect).toBeCalledWith(expect.objectContaining(triggerValue));

    wrapper.find('.fishd-select-dropdown-option-item').at(0).simulate('click');
    expect(onSelect).toBeCalledWith(expect.objectContaining(triggerValue));

    wrapper.find('.fishd-select-option-clearable-option-close').simulate('click');
    expect(onDeselect).toBeCalledWith(expect.objectContaining(triggerValue));

    expect(onSelect).toBeCalledTimes(1);
    expect(onDeselect).toBeCalledTimes(2);
  });
});
