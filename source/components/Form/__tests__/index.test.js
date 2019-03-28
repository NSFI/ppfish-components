import React from 'react';
import { shallow, mount } from 'enzyme';
import Form from '../Form.tsx';

describe('Form', () => {
  it('hideRequiredMark', () => {
    const wrapper = shallow(
      <Form hideRequiredMark />
    );
    expect(wrapper.hasClass('fishd-form-hide-required-mark')).toBe(true);
  });

  it('Map props to field', () => {
    const Input = require('../../Input').default
    class TestForm extends React.Component {
      render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
          <Form>
            <Form.Item>
              {getFieldDecorator('testField')(<Input />)}
            </Form.Item>
          </Form>
        );
      }
    }

    const options = {
      mapPropsToFields: (props) => ({
        testField: Form.createFormField(({ value: props.testProp }))
      })
    }
    const mapSpy = jest.spyOn(options, 'mapPropsToFields');
    const WrappedTest = Form.create(options)(TestForm);
    const wrapper = mount(
      <WrappedTest testProp={234} />
    );

    expect(mapSpy).toBeCalled()
    expect(wrapper.find('input').prop('value')).toBe(234);

    wrapper.setProps({ testProp: "fff" });
    expect(wrapper.find('input').prop('value')).toBe('fff');

  });

  describe('wrappedComponentRef', () => {
    it('warns on functional component', () => {
      if (process.env.REACT === '15') {
        return;
      }
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const TestForm = () => <Form />;
      const Wrapped = Form.create()(TestForm);
      mount(<Wrapped wrappedComponentRef={() => {}} />);
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
      spy.mockRestore();
    });

    it('get component ref', () => {
      class TestForm extends React.Component { // eslint-disable-line
        render() {
          return <Form />;
        }
      }
      const Wrapped = Form.create()(TestForm);
      let form;
      mount(<Wrapped wrappedComponentRef={node => form = node} />);
      expect(form).toBeInstanceOf(TestForm);
    });
  });
});
