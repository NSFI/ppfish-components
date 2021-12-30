import React from 'react';
import { mount, render } from 'enzyme';
import Radio from '../Radio';
import RadioGroup from '../Group';

describe('Radio', () => {
  function createRadioGroup(props) {
    return (
      <RadioGroup {...props}>
        <Radio value="A">A</Radio>
        <Radio value="B">B</Radio>
        <Radio value="C">C</Radio>
      </RadioGroup>
    );
  }

  function createRadioGroupByOption(props) {
    const options = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
    ];

    return <RadioGroup {...props} options={options} />;
  }

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <RadioGroup onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Radio />
      </RadioGroup>,
    );

    wrapper.simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('fire change events when value changes', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        onChange,
      }),
    );
    const radios = wrapper.find('input');

    // uncontrolled component
    radios.at(0).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);

    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(2);

    // controlled component
    wrapper.setProps({ value: 'C' });
    expect(wrapper.find('.fishd-radio-wrapper').at(2).text()).toBe('C');
  });

  it("won't fire change events when value not changes", () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        onChange,
      }),
    );
    const radios = wrapper.find('input');

    // uncontrolled component
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);

    // controlled component
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('optional should correct render', () => {
    const wrapper = mount(createRadioGroupByOption({}));
    const radios = wrapper.find('input');

    expect(radios.length).toBe(3);
  });

  it('all children should have a name property', () => {
    const GROUP_NAME = 'radiogroup';
    const wrapper = mount(createRadioGroup({ name: GROUP_NAME }));

    expect(
      wrapper.find('input[type="radio"]').forEach(el => {
        expect(el.props().name).toEqual(GROUP_NAME);
      }),
    );
  });

  it('passes prefixCls down to radio', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange' },
    ];

    const wrapper = render(<RadioGroup prefixCls="my-radio" options={options} />);

    expect(wrapper).toMatchSnapshot();
  });
});
