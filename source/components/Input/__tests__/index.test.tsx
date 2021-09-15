import React from 'react';
import { mount } from 'enzyme';
import Input from '../index';
import Form from '../../Form';

describe('Input', () => {
  it('should support maxLength', () => {
    const wrapper = mount(<Input maxLength={3} />);
    const input = wrapper.at(0).find('.fishd-input').render();
    expect(input.attr('maxlength')).toBe('3');
  });

  it('should support focus() blur(), and can get input element', function () {
    const ref = React.createRef<any>();
    mount(<Input ref={ref} />);
    ref.current.focus();
    ref.current.blur();
    expect(ref.current.input instanceof HTMLInputElement).toBe(true);
  });

  it('should support size', () => {
    const wrapper = mount(<Input size="large" />);
    expect(wrapper.find('input').hasClass('fishd-input-lg')).toBe(true);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support className when has suffix', () => {
    const wrapper = mount(<Input suffix="suffix" className="my-class-name" />);
    expect(wrapper.getDOMNode().className.includes('my-class-name')).toBe(true);
    expect(wrapper.find('input').getDOMNode().className.includes('my-class-name')).toBe(false);
  });

  it('should support className when has prefix', () => {
    const wrapper = mount(<Input prefix="prefix" className="my-class-name" />);
    expect(wrapper.getDOMNode().className.includes('my-class-name')).toBe(true);
    expect(wrapper.find('input').getDOMNode().className.includes('my-class-name')).toBe(false);
  });

  it('should be reset when wrapped in form.getFieldDecorator without initialValue', () => {
    const Demo = props => {
      const { form } = props;
      const { getFieldDecorator } = form;
      const reset = () => {
        form.resetFields();
      };
      return (
        <Form>
          <Form.Item>{getFieldDecorator('input')(<Input />)}</Form.Item>
          <Form.Item>{getFieldDecorator('textarea')(<Input.TextArea />)}</Form.Item>
          <button type="button" onClick={reset}>
            reset
          </button>
        </Form>
      );
    };
    const WrapDemo = Form.create()(Demo);

    const wrapper = mount(<WrapDemo />);
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    wrapper.find('textarea').simulate('change', { target: { value: '222' } });
    expect(wrapper.find('input').prop('value')).toBe('111');
    expect(wrapper.find('textarea').prop('value')).toBe('222');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('input').prop('value')).toBe('');
    expect(wrapper.find('textarea').prop('value')).toBe('');
  });
});
