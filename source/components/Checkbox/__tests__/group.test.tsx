import React from 'react';
import { mount, render } from 'enzyme';
import Checkbox from '../index';
import { Row } from '../../Grid';

describe('CheckboxGroup', () => {
  it('should work basically', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group options={['Apple', 'Pear', 'Orange']} onChange={onChange} />,
    );
    wrapper.find('.fishd-checkbox-input').at(0).simulate('change');
    expect(onChange).toBeCalledWith(['Apple']);
    wrapper.find('.fishd-checkbox-input').at(1).simulate('change');
    expect(onChange).toBeCalledWith(['Apple', 'Pear']);
    wrapper.find('.fishd-checkbox-input').at(2).simulate('change');
    expect(onChange).toBeCalledWith(['Apple', 'Pear', 'Orange']);
    wrapper.find('.fishd-checkbox-input').at(1).simulate('change');
    expect(onChange).toBeCalledWith(['Apple', 'Orange']);
  });

  it('does not trigger onChange callback of both Checkbox and CheckboxGroup when CheckboxGroup is disabled', () => {
    const onChangeGroup = jest.fn();

    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
    ];

    const groupWrapper = mount(
      <Checkbox.Group options={options} onChange={onChangeGroup} disabled />,
    );
    groupWrapper.find('.fishd-checkbox-input').at(0).simulate('change');
    expect(onChangeGroup).not.toBeCalled();
    groupWrapper.find('.fishd-checkbox-input').at(1).simulate('change');
    expect(onChangeGroup).not.toBeCalled();
  });

  it('does not prevent onChange callback from Checkbox when CheckboxGroup is not disabled', () => {
    const onChangeGroup = jest.fn();

    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', disabled: true },
    ];

    const groupWrapper = mount(<Checkbox.Group options={options} onChange={onChangeGroup} />);
    groupWrapper.find('.fishd-checkbox-input').at(0).simulate('change');
    expect(onChangeGroup).toBeCalledWith(['Apple']);
    groupWrapper.find('.fishd-checkbox-input').at(1).simulate('change');
    expect(onChangeGroup).toBeCalledWith(['Apple']);
  });

  it('passes prefixCls down to checkbox', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange' },
    ];

    const wrapper = render(<Checkbox.Group prefixCls="my-checkbox" options={options} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should be controlled by value', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange' },
    ];

    const wrapper = mount(<Checkbox.Group options={options} />);
    expect(wrapper.find('.fishd-checkbox-checked').length).toBe(0);
    wrapper.setProps({ value: ['Apple'] });
    wrapper.update();
    expect(wrapper.find('.fishd-checkbox-checked').length).toBe(1);
  });

  it('should trigger onChange in sub Checkbox', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group>
        <Checkbox value="my" onChange={onChange} />
      </Checkbox.Group>,
    );
    wrapper.find('.fishd-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].target.value).toEqual('my');
  });

  it('onChange should filter removed value', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group defaultValue={[1]} onChange={onChange}>
        <Checkbox key={1} value={1} />
        <Checkbox key={2} value={2} />
      </Checkbox.Group>,
    );

    wrapper.setProps({
      children: [<Checkbox key={2} value={2} />],
    });

    wrapper.find('.fishd-checkbox-input').at(0).simulate('change');

    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('checkbox should register value again after value changed', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group defaultValue={[1]} onChange={onChange}>
        <Checkbox key={1} value={1} />
      </Checkbox.Group>,
    );

    wrapper.setProps({
      children: [<Checkbox key={1} value={2} />],
    });
    expect((wrapper.find('.fishd-checkbox-input').at(0).getDOMNode() as any).checked).toBe(false);
  });

  it('onChange should keep the order of the original values', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group onChange={onChange}>
        <Checkbox key={1} value={1} />
        <Checkbox key={2} value={2} />
        <Checkbox key={3} value={3} />
        <Checkbox key={4} value={4} />
      </Checkbox.Group>,
    );

    wrapper.find('.fishd-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalledWith([1]);
    wrapper.find('.fishd-checkbox-input').at(1).simulate('change');
    expect(onChange).toHaveBeenCalledWith([1, 2]);
    wrapper.find('.fishd-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalledWith([2]);
    wrapper.find('.fishd-checkbox-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalledWith([1, 2]);
  });

  // skipgroup
  // it('Table rowSelection', () => {
  //   const onChange = jest.fn();
  //   const wrapper = mount(
  //   <Checkbox.Group onChange={onChange}>
  //     <Table
  //       dataSource={[{ key: 1, value: '1' }]}
  //       columns={[{ title: 'title', dataIndex: 'value' }]}
  //       rowSelection={{}}
  //     />
  //   </Checkbox.Group>,
  // );
  //   wrapper.find('.fishd-checkbox-input').at(1).simulate('change');
  //   expect(onChange).not.toHaveBeenCalled();
  // });

  it('should get div ref', () => {
    mount(
      <Checkbox.Group
        options={['Apple', 'Pear', 'Orange']}
        ref={node => {
          expect(node.nodeName).toBe('DIV');
        }}
      />,
    );
  });
});
