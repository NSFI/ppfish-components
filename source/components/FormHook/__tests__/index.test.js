import React, { Component, useState } from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import scrollIntoView from 'scroll-into-view-if-needed';
import Form from '..';
import * as Util from '../util';

import Input from '../../Input';
import Button from '../../Button';
import Select from '../../Select';

import mountTest from '../../../../tools/tests/mountTest';
import { sleep } from '../../../../tools/tests/utils';

jest.mock('scroll-into-view-if-needed');

describe('FormHook', () => {
  mountTest(Form);
  mountTest(Form.Item);

  scrollIntoView.mockImplementation(() => {});
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  async function change(wrapper, index, value, executeMockTimer) {
    wrapper.find(Input).at(index).simulate('change', { target: { value } });
    await sleep(200);

    if (executeMockTimer) {
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      await sleep(1);
    }
  }

  beforeEach(() => {
    jest.useRealTimers();
    scrollIntoView.mockReset();
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
    scrollIntoView.mockRestore();
  });

  describe('noStyle Form.Item', () => {
    it('work', async () => {
      jest.useFakeTimers();

      const onChange = jest.fn();

      const wrapper = mount(
        <Form>
          <Form.Item>
            <Form.Item name="test" rules={[{ required: true }]}>
              <Input onChange={onChange} />
            </Form.Item>
          </Form.Item>
        </Form>,
      );

      await change(wrapper, 0, '', true);
      expect(wrapper.find('.fishd-formHook-item-with-help').length).toBeTruthy();
      expect(wrapper.find('.has-error').length).toBeTruthy();

      expect(onChange).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should clean up', async () => {
      jest.useFakeTimers();

      const Demo = () => {
        const [form] = Form.useForm();

        return (
          <Form form={form} initialValues={{ aaa: '2' }}>
            <Form.Item name="aaa">
              <Input
                onChange={async () => {
                  await sleep(0);
                  try {
                    await form.validateFields();
                  } catch (e) {
                    // do nothing
                  }
                }}
              />
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
              {() => {
                const aaa = form.getFieldValue('aaa');

                if (aaa === '1') {
                  return (
                    <Form.Item name="bbb" rules={[{ required: true, message: 'aaa' }]}>
                      <Input />
                    </Form.Item>
                  );
                }

                return (
                  <Form.Item>
                    <Form.Item name="ccc" rules={[{ required: true, message: 'ccc' }]} noStyle>
                      <Input />
                    </Form.Item>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Form>
        );
      };

      const wrapper = mount(<Demo />);
      await change(wrapper, 0, '1', true);
      expect(wrapper.find('.fishd-formHook-item-explain').text()).toEqual('aaa');
      await change(wrapper, 0, '2', true);
      expect(wrapper.find('.fishd-formHook-item-explain').text()).toEqual('ccc');
      await change(wrapper, 0, '1', true);
      expect(wrapper.find('.fishd-formHook-item-explain').text()).toEqual('aaa');

      jest.useRealTimers();
    });
  });

  it('`shouldUpdate` should work with render props', () => {
    mount(
      <Form>
        <Form.Item>{() => null}</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Form.Item' +
      '`children` of render props only work with `shouldUpdate` or `dependencies`.',
    );
  });
  it("`shouldUpdate` shouldn't work with `dependencies`", () => {
    mount(
      <Form>
        <Form.Item shouldUpdate dependencies={[]}>
          {() => null}
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Form.Item' +
      "`shouldUpdate` and `dependencies` shouldn't be used together." +
      ' See https://ant.design/components/form/#dependencies.',
    );
  });

  it('`name` should not work with render props', () => {
    mount(
      <Form>
        <Form.Item name="test" shouldUpdate>
          {() => null}
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Form.Item' +
      "Do not use `name` with `children` of render props since it's not a field."
    );
  });

  it('children is array has name props', () => {
    mount(
      <Form>
        <Form.Item name="test">
          <div>one</div>
          <div>two</div>
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Form.Item'+ ' `children` is array of render props cannot have `name`.'
    );
  });

  describe('scrollToField', () => {
    function test(name, genForm) {
      it(name, () => {
        let callGetForm;

        const Demo = () => {
          const { props, getForm } = genForm();
          callGetForm = getForm;

          return (
            <Form name="scroll" {...props}>
              <Form.Item name="test">
                <Input />
              </Form.Item>
            </Form>
          );
        };

        const wrapper = mount(<Demo />, { attachTo: document.body });

        expect(scrollIntoView).not.toHaveBeenCalled();
        const form = callGetForm();
        form.scrollToField('test', {
          block: 'start',
        });

        const inputNode = document.getElementById('scroll_test');
        expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
          block: 'start',
          scrollMode: 'if-needed',
        });

        wrapper.unmount();
      });
    }

    // hooks
    test('useForm', () => {
      const [form] = Form.useForm();
      return {
        props: { form },
        getForm: () => form,
      };
    });

    // ref
    test('ref', () => {
      let form;
      return {
        props: {
          ref: instance => {
            form = instance;
          },
        },
        getForm: () => form,
      };
    });
  });

  it('scrollToFirstError', async () => {
    const onFinishFailed = jest.fn();

    const wrapper = mount(
      <Form scrollToFirstError={{ block: 'center' }} onFinishFailed={onFinishFailed}>
        <Form.Item name="test" rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
      { attachTo: document.body },
    );

    expect(scrollIntoView).not.toHaveBeenCalled();
    wrapper.find('form').simulate('submit');
    await sleep(50);
    const inputNode = document.getElementById('test');
    expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
      block: 'center',
      scrollMode: 'if-needed',
    });
    expect(onFinishFailed).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('Form.Item should support data-*、aria-* and custom attribute', () => {
    const wrapper = mount(
      <Form>
        <Form.Item data-text="123" aria-hidden="true" cccc="bbbb">
          text
        </Form.Item>
      </Form>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('warning when use `name` but children is not validate element', () => {
    mount(
      <Form>
        <Form.Item name="warning">text</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Form.Item' +
      '`name` is only used for validate React element. ' +
      'If you are using Form.Item as layout display, please remove `name` instead.',
    );
  });

  it('dynamic change required', () => {
    const wrapper = mount(
      <Form>
        <Form.Item label="light" name="light" valuePropName="checked">
          <input type="checkbox" />
        </Form.Item>
        <Form.Item
          label="bamboo"
          name="bamboo"
          dependencies={['light']}
          rules={[({ getFieldValue }) => ({ required: getFieldValue('light') })]}
        >
          <input />
        </Form.Item>
      </Form>,
    );

    expect(wrapper.find('.fishd-formHook-item-required')).toHaveLength(0);

    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.find('.fishd-formHook-item-required')).toHaveLength(1);
  });

  describe('should show related className when customize help', () => {
    it('normal', () => {
      const wrapper = mount(
        <Form>
          <Form.Item help="good">
            <input />
          </Form.Item>
        </Form>,
      );

      expect(wrapper.exists('.fishd-formHook-item-with-help')).toBeTruthy();
    });

    it('empty string', () => {
      const wrapper = mount(
        <Form>
          <Form.Item help={true}>
            <input />
          </Form.Item>
        </Form>,
      );

      expect(wrapper.exists('.fishd-formHook-item-with-help')).toBeTruthy();
    });
  });

  // https://github.com/ant-design/ant-design/issues/20706
  it('Error change should work', async () => {
    jest.useFakeTimers();

    const wrapper = mount(
      <Form>
        <Form.Item
          name="name"
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                if (value === 'p') {
                  return Promise.reject(new Error('not a p'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>,
    );

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < 3; i += 1) {
      await change(wrapper, 0, '', true);
      expect(wrapper.find('.fishd-formHook-item-explain').first().text()).toEqual("'name' is required");

      await change(wrapper, 0, 'p', true);
      await sleep(100);
      wrapper.update();
      expect(wrapper.find('.fishd-formHook-item-explain').first().text()).toEqual('not a p');
    }
    /* eslint-enable */

    jest.useRealTimers();
  });

  // https://github.com/ant-design/ant-design/issues/20813
  it('should update help directly when provided', () => {
    function App() {
      const [message, updateMessage] = React.useState('');
      return (
        <Form>
          <Form.Item label="hello" help={message}>
            <Input />
          </Form.Item>
          <Button onClick={() => updateMessage('bamboo')} />
        </Form>
      );
    }

    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.fishd-formHook-item').first().hasClass('fishd-formHook-item-with-help')).toBeTruthy();
    expect(wrapper.find('.fishd-formHook-item-explain').text()).toEqual('bamboo');
  });

  it('warning when use `dependencies` but `name` is empty & children is not a render props', () => {
    mount(
      <Form>
        <Form.Item dependencies={[]}>text</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Form.Item' + 'Must set `name` or use render props when `dependencies` is set.',
    );
  });

  // https://github.com/ant-design/ant-design/issues/20948
  it('not repeat render when Form.Item is not a real Field', async () => {
    const shouldNotRender = jest.fn();
    const StaticInput = () => {
      shouldNotRender();
      return <Input />;
    };

    const shouldRender = jest.fn();
    const DynamicInput = () => {
      shouldRender();
      return <Input />;
    };

    const formRef = React.createRef();

    mount(
      <div>
        <Form ref={formRef}>
          <Form.Item>
            <StaticInput />
          </Form.Item>
          <Form.Item name="light">
            <DynamicInput />
          </Form.Item>
        </Form>
      </div>,
    );

    expect(shouldNotRender).toHaveBeenCalledTimes(1);
    expect(shouldRender).toHaveBeenCalledTimes(1);

    formRef.current.setFieldsValue({ light: 'bamboo' });
    await Promise.resolve();
    expect(shouldNotRender).toHaveBeenCalledTimes(1);
    expect(shouldRender).toHaveBeenCalledTimes(2);
  });

  it('empty help should also render', () => {
    const wrapper = mount(
      <Form.Item help="">
        <input />
      </Form.Item>,
    );
    expect(wrapper.find('.fishd-formHook-item-explain').length).toBeTruthy();
  });

  it('Form.Item with `help` should display error style when validate failed', async () => {
    jest.useFakeTimers();

    const wrapper = mount(
      <Form>
        <Form.Item name="test" help="help" rules={[{ required: true, message: 'message' }]}>
          <Input />
        </Form.Item>
      </Form>,
    );

    await change(wrapper, 0, '', true);

    expect(wrapper.find('.fishd-formHook-item').first().hasClass('has-error')).toBeTruthy();
    expect(wrapper.find('.fishd-formHook-item-explain').text()).toEqual('help');

    jest.useRealTimers();
  });

  it('clear validation message when ', async () => {
    jest.useFakeTimers();

    const wrapper = mount(
      <Form>
        <Form.Item name="username" rules={[{ required: true, message: 'message' }]}>
          <Input />
        </Form.Item>
      </Form>,
    );
    await change(wrapper, 0, '1', true);
    expect(wrapper.find('.fishd-formHook-item-explain').length).toBeFalsy();

    await change(wrapper, 0, '', true);
    expect(wrapper.find('.fishd-formHook-item-explain').length).toBeTruthy();

    await change(wrapper, 0, '123', true);
    await sleep(800);
    wrapper.update();
    expect(wrapper.find('.fishd-formHook-item-explain').length).toBeFalsy();

    jest.useRealTimers();
  });

  // https://github.com/ant-design/ant-design/issues/21167
  it('`require` without `name`', () => {
    const wrapper = mount(
      <Form.Item label="test" required>
        <input />
      </Form.Item>,
    );

    expect(wrapper.find('.fishd-formHook-item-required')).toHaveLength(1);
  });

  it('0 is a validate Field', () => {
    const wrapper = mount(
      <Form.Item name={0}>
        <input />
      </Form.Item>,
    );

    expect(wrapper.find('Field')).toHaveLength(1);
  });

  it('`null` triggers warning and is treated as `undefined`', () => {
    const wrapper = mount(
      <Form.Item name={null}>
        <input />
      </Form.Item>,
    );

    expect(wrapper.find('Field')).toHaveLength(0);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Form.Item' + '`null` is passed as `name` property',
    );
  });

  // https://github.com/ant-design/ant-design/issues/21415
  it('Component.props.onChange is null', () => {
    // eslint-disable-next-line react/prefer-stateless-function
    class CustomComponent extends Component {
      static defaultProps = {
        onChange: null,
      };

      render() {
        return <input {...this.props} />;
      }
    }
    expect(() => {
      const wrapper = mount(
        <Form>
          <Form.Item name="custom">
            <CustomComponent />
          </Form.Item>
        </Form>,
      );
      wrapper.find(CustomComponent).simulate('change', { value: '123' });
    }).not.toThrow();
  });

  it('change `help` should not warning', () => {
    const Demo = () => {
      const [error, setError] = React.useState(null);

      return (
        <Form>
          <Form.Item
            help={error ? 'This is an error msg' : undefined}
            validateStatus={error ? 'error' : ''}
            label="Username"
            name="username"
          >
            <input />
          </Form.Item>

          <Form.Item>
            <button type="button" onClick={() => setError(!error)}>
              Trigger
            </button>
          </Form.Item>
        </Form>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('`label` support template', async () => {
    const wrapper = mount(
      // eslint-disable-next-line no-template-curly-in-string
      <Form validateMessages={{ required: '${label} is good!' }}>
        <Form.Item name="test" label="Bamboo" rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    wrapper.find('form').simulate('submit');
    await sleep(100);
    wrapper.update();
    await sleep(100);
    expect(wrapper.find('.fishd-formHook-item-explain').first().text()).toEqual('Bamboo is good!');
  });

  it('`name` support template when label is not provided', async () => {
    const wrapper = mount(
      // eslint-disable-next-line no-template-curly-in-string
      <Form validateMessages={{ required: '${label} is good!' }}>
        <Form.Item name="Bamboo" rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    wrapper.find('form').simulate('submit');
    await sleep(100);
    wrapper.update();
    await sleep(100);
    expect(wrapper.find('.fishd-formHook-item-explain').first().text()).toEqual('Bamboo is good!');
  });

  it('`messageVariables` support validate', async () => {
    const wrapper = mount(
      // eslint-disable-next-line no-template-curly-in-string
      <Form validateMessages={{ required: '${label} is good!' }}>
        <Form.Item name="test" messageVariables={{ label: 'Bamboo' }} rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    wrapper.find('form').simulate('submit');
    await sleep(100);
    wrapper.update();
    await sleep(100);
    expect(wrapper.find('.fishd-formHook-item-explain').first().text()).toEqual('Bamboo is good!');
  });

  it('validation message should has alert role', async () => {
    // https://github.com/ant-design/ant-design/issues/25711
    const wrapper = mount(
      // eslint-disable-next-line no-template-curly-in-string
      <Form validateMessages={{ required: 'name is good!' }}>
        <Form.Item name="test" rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    wrapper.find('form').simulate('submit');
    await sleep(100);
    wrapper.update();
    await sleep(100);
    expect(wrapper.find('.fishd-formHook-item-explain div').getDOMNode().getAttribute('role')).toBe(
      'alert',
    );
  });

  it('return same form instance', () => {
    const instances = new Set();

    const App = () => {
      const [form] = Form.useForm();
      instances.add(form);
      const [, forceUpdate] = React.useState({});
      return (
        <button
          type="button"
          onClick={() => {
            forceUpdate({});
          }}
        >
          Refresh
        </button>
      );
    };

    const wrapper = mount(<App />);
    for (let i = 0; i < 5; i += 1) {
      wrapper.find('button').simulate('click');
    }
    expect(instances.size).toEqual(1);
  });

  it('avoid re-render', async () => {
    let renderTimes = 0;

    const MyInput = ({ value = '', ...props }) => {
      renderTimes += 1;
      return <input value={value} {...props} />;
    };

    const Demo = () => (
      <Form>
        <Form.Item name="username" rules={[{ required: true }]}>
          <MyInput />
        </Form.Item>
      </Form>
    );

    const wrapper = mount(<Demo />);
    renderTimes = 0;

    wrapper.find('input').simulate('change', {
      target: {
        value: 'a',
      },
    });

    await sleep();

    expect(renderTimes).toEqual(1);
    expect(wrapper.find('input').props().value).toEqual('a');
  });

  it('warning with `defaultValue`', () => {
    mount(
      <Form>
        <Form.Item name="light">
          <input defaultValue="should warning" />
        </Form.Item>
      </Form>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Form.Item `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.',
    );
  });

  it('Remove Field should also reset error', async () => {
    class Demo extends React.Component {
      state = {
        showA: true,
      };

      render() {
        return (
          <Form>
            {this.state.showA ? (
              <Form.Item name="a" help="error">
                <input />
              </Form.Item>
            ) : (
              <Form.Item name="b">
                <input />
              </Form.Item>
            )}
          </Form>
        );
      }
    }

    const wrapper = mount(<Demo />);
    await Promise.resolve();
    expect(wrapper.find('.fishd-formHook-item').last().hasClass('fishd-formHook-item-with-help')).toBeTruthy();

    wrapper.setState({ showA: false });
    await Promise.resolve();
    wrapper.update();
    expect(wrapper.find('.fishd-formHook-item').last().hasClass('fishd-formHook-item-with-help')).toBeFalsy();
  });

  it('no warning of initialValue & getValueProps & preserve', () => {
    mount(
      <Form>
        <Form.Item initialValue="bamboo" getValueProps={() => null} preserve={false}>
          <Input />
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should customize id work', () => {
    const wrapper = mount(
      <Form>
        <Form.Item name="light">
          <Input id="bamboo" />
        </Form.Item>
      </Form>,
    );

    expect(wrapper.find('input').prop('id')).toEqual('bamboo');
  });

  it('Form validateTrigger', () => {
    const wrapper = mount(
      <Form validateTrigger="onBlur">
        <Form.Item name="light">
          <Input />
        </Form.Item>
      </Form>,
    );

    expect(wrapper.find('input').prop('onBlur')).toBeTruthy();
  });

  describe('Form item hidden', () => {
    it('should work', () => {
      const wrapper = mount(
        <Form>
          <Form.Item name="light" hidden>
            <Input />
          </Form.Item>
        </Form>,
      );
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('noStyle should not work when hidden', () => {
      const wrapper = mount(
        <Form>
          <Form.Item name="light" hidden noStyle>
            <Input />
          </Form.Item>
        </Form>,
      );
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('legacy hideRequiredMark', () => {
    const wrapper = mount(
      <Form hideRequiredMark>
        <Form.Item name="light" required>
          <Input />
        </Form.Item>
      </Form>,
    );

    expect(wrapper.find('form').hasClass('fishd-formHook-hide-required-mark')).toBeTruthy();
  });

  it('_internalItemRender api test', () => {
    const wrapper = mount(
      <Form>
        <Form.Item
          name="light"
          _internalItemRender={{
            mark: 'pro_table_render',
            render: (_, doms) => (
              <div id="_test">
                {doms.input}
                {doms.errorList}
                {doms.extra}
              </div>
            ),
          }}
        >
          <input defaultValue="should warning" />
        </Form.Item>
      </Form>,
    );
    expect(wrapper.find('#_test').exists()).toBeTruthy();
  });

  it('Form Item element id will auto add form_item prefix if form name is empty and item name is in the black list', async () => {
    const mockFn = jest.spyOn(Util, 'getFieldId');
    const itemName = 'parentNode';
    // mock getFieldId old logic,if form name is empty ,and item name is parentNode,will get parentNode
    mockFn.mockImplementation(() => itemName);
    const { Option } = Select;
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Form>
            <Form.Item name={itemName}>
              <Select
                className="form_item_parentNode"
                defaultValue="lucy"
                open={open}
                style={{ width: 120 }}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Form>
          <button
            type="button"
            onClick={() => {
              setOpen(true);
            }}
          >
            {open ? 'show' : 'hidden'}
          </button>
        </>
      );
    };

    const wrapper = mount(<Demo />, { attachTo: document.body });
    expect(mockFn).toHaveBeenCalled();
    expect(Util.getFieldId()).toBe(itemName);

    // make sure input id is parentNode
    expect(wrapper.find(`#${itemName}`).exists()).toBeTruthy();
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(wrapper.find('button').text()).toBe('show');

    mockFn.mockRestore();
    // https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/update.html
    // setProps instead of update
    wrapper.setProps({});
    expect(wrapper.find(`#form_item_${itemName}`).exists()).toBeTruthy();
    wrapper.unmount();
  });

  describe('tooltip', () => {
    it('ReactNode', () => {
      const wrapper = mount(
        <Form>
          <Form.Item label="light" tooltip={<span>Bamboo</span>}>
            <Input />
          </Form.Item>
        </Form>,
      );

      const tooltipProps = wrapper.find('ForwardRef(InternalTooltip)').props();
      expect(tooltipProps.title).toEqual(<span>Bamboo</span>);
    });

    it('config', () => {
      const wrapper = mount(
        <Form>
          <Form.Item label="light" tooltip={{ title: 'Bamboo' }}>
            <Input />
          </Form.Item>
        </Form>,
      );
      const tooltipProps = wrapper.find('ForwardRef(InternalTooltip)').props();
      expect(tooltipProps.title).toEqual('Bamboo');
    });
  });

  it('warningOnly validate', async () => {
    jest.useFakeTimers();

    const wrapper = mount(
      <Form>
        <Form.Item>
          <Form.Item name="test" rules={[{ required: true, warningOnly: true }]}>
            <Input />
          </Form.Item>
        </Form.Item>
      </Form>,
    );

    await change(wrapper, 0, '', true);
    expect(wrapper.find('.fishd-formHook-item-with-help').length).toBeTruthy();
    expect(wrapper.find('.has-warning').length).toBeTruthy();

    jest.useRealTimers();
  });

  it('not warning when remove on validate', async () => {
    jest.useFakeTimers();
    let rejectFn = null;

    const wrapper = mount(
      <Form>
        <Form.Item>
          <Form.Item
            noStyle
            name="test"
            rules={[
              {
                validator: () =>
                  new Promise((_, reject) => {
                    rejectFn = reject;
                  }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Item>
      </Form>,
    );

    await change(wrapper, 0, '', true);

    wrapper.unmount();

    // Delay validate failed
    rejectFn(new Error('delay failed'));

    expect(errorSpy).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  describe('form colon', () => {
    it('default colon', () => {
      const wrapper = mount(
        <Form>
          <Form.Item label="姓名">
            <input />
          </Form.Item>
        </Form>,
      );

      expect(wrapper.exists('.fishd-formHook-item-no-colon')).toBeFalsy();
    });

    it('set Form.Item colon false', () => {
      const wrapper = mount(
        <Form colon>
          <Form.Item colon={false} label="姓名">
            <Input />
          </Form.Item>
        </Form>,
      );

      expect(wrapper.find('.fishd-formHook-item-no-colon')).toBeTruthy();
    });

    it('set Form colon false', () => {
      const wrapper = mount(
        <Form colon={false}>
          <Form.Item label="姓名">
            <Input />
          </Form.Item>
        </Form>,
      );

      expect(wrapper.find('.fishd-formHook-item-no-colon')).toBeTruthy();
    });
  });
});
