import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import AutoComplete from '../index';
import Input from '../../Input';
import focusTest from '../../../../tools/tests/focusTest';

describe('AutoComplete with Custom Input Element Render', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  focusTest(AutoComplete, () => document.querySelector('.fishd-autocomplete-select'));

  it('AutoComplete with custom Input render perfectly', async () => {
    const wrapper = mount(
      <AutoComplete dataSource={['12345', '23456', '34567']}>
        <textarea />
      </AutoComplete>,
    );

    expect(wrapper.find('textarea').length).toBe(1);

    await act(async () => {
      wrapper.find('textarea').simulate('change', { target: { value: '123' } });
      jest.runAllTimers();
    });

    wrapper.update();

    // should not filter data source defaultly
    expect(wrapper.find('.fishd-autocomplete-select-dropdown-menu-item').hostNodes().length).toBe(
      3,
    );
  });

  it('AutoComplete should work when dataSource is object array', async () => {
    const wrapper = mount(
      <AutoComplete
        dataSource={[
          { text: 'text', value: 'value' },
          { text: 'abc', value: 'xxx' },
        ]}
      >
        <input />
      </AutoComplete>,
    );
    expect(wrapper.find('input').length).toBe(1);
    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
    });
    wrapper.update();
    // should not filter data source defaultly
    expect(wrapper.find('.fishd-autocomplete-select-dropdown-menu-item').hostNodes().length).toBe(
      2,
    );
  });

  it('legacy AutoComplete.Option should be compatiable', async () => {
    const wrapper = mount(
      <AutoComplete>
        <AutoComplete.Option value="111">111</AutoComplete.Option>
        <AutoComplete.Option value="222">222</AutoComplete.Option>
      </AutoComplete>,
    );

    expect(wrapper.find('input').length).toBe(1);

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: '1' } });
      jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find('.fishd-autocomplete-select-dropdown-menu-item').hostNodes().length).toBe(
      2,
    );
  });

  it('should not override custom input className', () => {
    const wrapper = mount(
      <AutoComplete>
        <Input className="custom" />
      </AutoComplete>,
    );
    expect(wrapper.find('input').hasClass('custom')).toBe(true);
  });

  it('child.ref should work', () => {
    const mockRef = jest.fn();
    mount(
      <AutoComplete dataSource={[]}>
        <input ref={mockRef} />
      </AutoComplete>,
    );
    expect(mockRef).toHaveBeenCalled();
  });

  it('AutoComplete throws error when contains invalid dataSource', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => {
      mount(
        //@ts-ignore
        <AutoComplete dataSource={[() => {}]}>
          <textarea />
        </AutoComplete>,
      );
    }).toThrow();
    //@ts-ignore
    console.error.mockRestore();
  });
});
