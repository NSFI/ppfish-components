# FormHook 表单 【交互：叶婧婕 |视觉：徐剑杰 |开发：张煜| 维护：张煜】

> 此组件于 2.1.0 版本新增, 使用时注意版本支持

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 基本使用

:::demo 基本的表单数据域控制展示，包含布局、初始化、验证、提交。

```js

const Demo = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <FormHook
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <FormHook.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input/>
      </FormHook.Item>

      <FormHook.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input/>
      </FormHook.Item>

      <FormHook.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </FormHook.Item>

      <FormHook.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

:::

## 表单方法调用

:::demo 通过 FormHook.useForm 对表单数据域进行交互。 注意 useForm 是 React Hooks 的实现，只能用于函数组件，class 组件请查看下面的例子。

```js
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Demo = () => {
  const [form] = FormHook.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <FormHook {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <FormHook.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input/>
      </FormHook.Item>
      <FormHook.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </FormHook.Item>
      <FormHook.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input/>
            </Form.Item>
          ) : null
        }
      </FormHook.Item>
      <FormHook.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

```less
#control-hooks .fishd-btn {
  margin-right: 8px;
}
```

:::

## Class 表单方法调用

:::demo 表单方法调用（Class component） 。 我们推荐使用 Form.useForm 创建表单数据域进行控制。如果是在 class component 下，你也可以通过 ref 获取数据域。

```js
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};


class Demo extends React.Component {
  formRef = React.createRef();

  onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        this.formRef.current.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        this.formRef.current.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        this.formRef.current.setFieldsValue({ note: 'Hi there!' });
    }
  };

  onFinish = (values: any) => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  render() {
    return (
      <FormHook {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <FormHook.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input/>
        </FormHook.Item>
        <FormHook.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={this.onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </FormHook.Item>
        <FormHook.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <FormHook.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input/>
              </FormHook.Item>
            ) : null
          }
        </FormHook.Item>
        <FormHook.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={this.onFill}>
            Fill form
          </Button>
        </FormHook.Item>
      </FormHook>
    );
  }
}

ReactDOM.render(<Demo/>, mountNode);
```

```less
#control-ref .fishd-btn {
  margin-right: 8px;
}
```

:::

## 表单布局

:::demo 表单有三种布局。

```js

const FormLayoutDemo = () => {
  const [form] = FormHook.useForm();
  const [formLayout, setFormLayout] = React.useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
        wrapperCol: { span: 14, offset: 4 },
      }
      : null;

  return (
    <FormHook
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
    >
      <FormHook.Item label="Form Layout" name="layout">
        <Radio.Group value={formLayout}>
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
        </Radio.Group>
      </FormHook.Item>
      <FormHook.Item label="Field A">
        <Input placeholder="input placeholder"/>
      </FormHook.Item>
      <FormHook.Item label="Field B">
        <Input placeholder="input placeholder"/>
      </FormHook.Item>
      <FormHook.Item {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<FormLayoutDemo/>, mountNode);
```

:::

## 非阻塞校验

:::demo rule 添加 warningOnly 后校验不再阻塞表单提交。

```js
const Demo = () => {
  const [form] = FormHook.useForm();

  const onFinish = () => {
    message.success('Submit success!');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFill = () => {
    form.setFieldsValue({
      url: 'https://www.163.com/',
    });
  }


  return (
    <FormHook
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      name="non-blocking"
    >
      <FormHook.Item
        name="url"
        label="URL"
        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
      >
        <Input placeholder="input placeholder"/>
      </FormHook.Item>
      <FormHook.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onFill}>
          Fill
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

```less
#non-blocking .fishd-btn {
  margin-right: 8px;
}
```

:::

## 动态增减表单项

:::demo 动态增加、减少表单项。add 方法参数可用于设置初始值。

```js
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const DynamicFieldSet = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <FormHook name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
      <FormHook.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 passengers'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <React.Fragment>
            {fields.map((field, index) => (
              <FormHook.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={field.key}
              >
                <FormHook.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="passenger name" style={{ width: '60%' }}/>
                </FormHook.Item>
                {fields.length > 1 ? (
                  <Icon type="form-minus" className="dynamic-delete-button"
                        onClick={() => remove(field.name)}/>
                ) : null}
              </FormHook.Item>
            ))}
            <FormHook.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
              >
                <Icon type="upload-plus"/>
                Add field
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add('The head item', 0);
                }}
                style={{ width: '60%', marginTop: '20px' }}
              >
                <Icon type="upload-plus"/>
                Add field at head
              </Button>
              <FormHook.ErrorList errors={errors}/>
            </FormHook.Item>
          </React.Fragment>
        )}
      </FormHook.List>
      <FormHook.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<DynamicFieldSet/>, mountNode);
```

```less
.dynamic-delete-button {
  position: relative;
  top: 4px;
  margin: 0 8px;
  color: #999;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
```

:::

## 动态增减嵌套字段

:::demo 嵌套表单字段需要对 field 进行拓展，将 field.name 应用于控制字段。

```js

const Demo = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <FormHook name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <FormHook.List name="users">
        {(fields, { add, remove }) => (
          <React.Fragment>
            {fields.map(({ key, name, ...restField }) => (
              <div className="form-item-space" key={key}>
                <FormHook.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name"/>
                </FormHook.Item>
                <FormHook.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name"/>
                </FormHook.Item>
                <Icon type="form-minus" onClick={() => remove(name)}/>
              </div>
            ))}
            <FormHook.Item>
              <Button className="add-button" type="dashed" onClick={() => add()}>
                <Icon type="upload-plus"/>
                Add field
              </Button>
            </FormHook.Item>
          </React.Fragment>
        )}
      </FormHook.List>
      <FormHook.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

```less
.form-item-space {
  display: flex;
  margin-bottom: 8px;
  gap: 8px;

  > i {
    padding-top: 8px;
  }
}

.add-button {
  width: 100%;
}
```

:::

## 复杂的动态增减表单项

:::demo 这个例子演示了一个表单中包含多个表单控件的情况。

```js

const { Option } = Select;

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};

const Demo = () => {
  const [form] = FormHook.useForm();

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <FormHook layout={"horizontal"} form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <FormHook.Item name="area" label="Area" rules={[{ required: true, message: 'Missing area' }]}>
        <Select options={areas} onChange={handleChange}/>
      </FormHook.Item>
      <FormHook.List name="sights">
        {(fields, { add, remove }) => (
          <React.Fragment>
            {fields.map(field => (
              <div key={field.key} className="form-item-space">
                <FormHook.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }
                >
                  {() => (
                    <FormHook.Item
                      {...field}
                      label="Sight"
                      name={[field.name, 'sight']}
                      rules={[{ required: true, message: 'Missing sight' }]}
                    >
                      <Select disabled={!form.getFieldValue('area')} style={{ width: 130 }}>
                        {(sights[form.getFieldValue('area')] || []).map(item => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </FormHook.Item>
                  )}
                </FormHook.Item>
                <FormHook.Item
                  {...field}
                  label="Price"
                  name={[field.name, 'price']}
                  rules={[{ required: true, message: 'Missing price' }]}
                >
                  <Input/>
                </FormHook.Item>
                <Icon type="form-minus" onClick={() => remove(field.name)}/>
              </div>
            ))}

            <FormHook.Item>
              <Button type="dashed" onClick={() => add()} className='add-button'>
                <Icon type="upload-plus"/>
                Add sights
              </Button>
            </FormHook.Item>
          </React.Fragment>
        )}
      </FormHook.List>
      <FormHook.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

```less
.form-item-space {
  display: flex;
  margin-bottom: 8px;
  gap: 8px;
  align-items: center;

  > i {
    padding-top: 8px;
  }
}

.add-button {
  width: 100%;
}
```

:::

## 嵌套结构与校验信息

:::demo name 属性支持嵌套数据结构。通过 validateMessages 或 message 自定义校验信息模板，模板内容可参考此处。

```js

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const Demo = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <FormHook {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <FormHook.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </FormHook.Item>
      <FormHook.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input/>
      </FormHook.Item>
      <FormHook.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber/>
      </FormHook.Item>
      <FormHook.Item name={['user', 'website']} label="Website">
        <Input/>
      </FormHook.Item>
      <FormHook.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea/>
      </FormHook.Item>
      <FormHook.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

:::

## 复杂一点的控件

`style` 进行内联布局，或者添加 `noStyle` 作为纯粹的无样式绑定组件（类似 3.x 中的 `getFieldDecorator`）。

```
- <Form.Item label="Field" name="field">
-   <Input />
- </Form.Item>
+ <Form.Item label="Field">
+   <Form.Item name="field" noStyle><Input /></Form.Item> // 直接包裹才会绑定表单
+   <span>description</span>
+ </Form.Item>
```

这里展示了三种典型场景：

* `Username`：输入框后面有描述文案或其他组件，在 `Form.Item` 内使用 `<Form.Item name="field" noStyle />` 去绑定对应子控件。

* `Address`：有两个控件，在 `Form.Item` 内使用两个 `<Form.Item name="field" noStyle />` 分别绑定对应控件。

* `BirthDate`：有两个内联控件，错误信息展示各自控件下，使用两个 `<Form.Item name="field" />` 分别绑定对应控件，并修改 `style` 使其内联布局。

> 注意，在 label 对应的 Form.Item 上不要在指定 `name` 属性，这个 Item 只作为布局作用。

更复杂的封装复用方式可以参考下面的 `自定义表单控件` 演示。

:::demo

```js

const { Option } = Select;


const Demo = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <FormHook name="complex-form" onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <FormHook.Item label="Username">
        <FormHook.Item
          name="username"
          noStyle
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <Input style={{ width: 160 }} placeholder="Please input"/>
        </FormHook.Item>
        <Tooltip title="Useful information">
          <span style={{ marginLeft: 8, color: '#1890ff' }}>Need Help?</span>
        </Tooltip>
      </FormHook.Item>
      <FormHook.Item label="Address">
        <Input.Group compact>
          <FormHook.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Province is required' }]}
          >
            <Select style={{ width: 160 }} placeholder="Select province">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
          </FormHook.Item>
          <FormHook.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input style={{ width: '50%' }} placeholder="Input street"/>
          </FormHook.Item>
        </Input.Group>
      </FormHook.Item>
      <FormHook.Item label="BirthDate" style={{ marginBottom: 0 }}>
        <FormHook.Item
          name="year"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="Input birth year"/>
        </FormHook.Item>
        <FormHook.Item
          name="month"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="Input birth month"/>
        </FormHook.Item>
      </FormHook.Item>
      <FormHook.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

:::

## 自定义表单控件

:::demo 自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

> * 提供受控属性 `value` 或其它与 [`valuePropName`](https://ant.design/components/form-cn/#Form.Item) 的值同名的属性。
>
> * 提供 `onChange` 事件或 [`trigger`](https://ant.design/components/form-cn/#Form.Item) 的值同名的事件。

```js
const { Option } = Select;
const { useState } = React
const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('rmb');

  const triggerChange = (changedValue) => {
    onChange && onChange({
      number,
      currency,
      ...value,
      ...changedValue,
    });
  };

  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || '0', 10);

    if (Number.isNaN(number)) {
      return;
    }

    if (!('number' in value)) {
      setNumber(newNumber);
    }

    triggerChange({
      number: newNumber,
    });
  };

  const onCurrencyChange = (newCurrency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }

    triggerChange({
      currency: newCurrency,
    });
  };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{
          width: 100,
        }}
      />
      <Select
        value={value.currency || currency}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};

const Demo = () => {
  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };

  const checkPrice = (_, value) => {
    if (value.number > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Price must be greater than zero!'));
  };

  return (
    <FormHook
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      <FormHook.Item
        name="price"
        label="Price"
        rules={[
          {
            validator: checkPrice,
          },
        ]}
      >
        <PriceInput/>
      </FormHook.Item>
      <FormHook.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

:::

## 表单数据存储于上层组件

:::demo

通过 `onFieldsChange` 和 `fields`
，可以把表单的数据存储到上层组件或者 [Redux](https://github.com/reactjs/redux)、[dva](https://github.com/dvajs/dva)
中，更多可参考 [rc-field-form 示例](https://rc-field-form.react-component.now.sh/?selectedKind=rc-field-form&selectedStory=StateForm-redux&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)。

**注意：** 将表单数据存储于外部容器[并非好的实践](https://github.com/reduxjs/redux/issues/1287#issuecomment-175351978)，如无必要请避免使用。

```js
const { useState } = React
const CustomizedForm = ({ onChange, fields }) => (
  <FormHook
    name="global_state"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <FormHook.Item
      name="username"
      label="Username"
      rules={[
        {
          required: true,
          message: 'Username is required!',
        },
      ]}
    >
      <Input/>
    </FormHook.Item>
  </FormHook>
);

const Demo = () => {
  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: 'Ant Design',
    },
  ]);
  return (
    <React.Fragment>
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
    </React.Fragment>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

```less
.language-bash {
  max-width: 400px;
  border-radius: 6px;
  margin-top: 24px;
}

```

:::

## 多表单联动

:::demo

通过 `Form.Provider` 在表单间处理数据。本例子中，Modal 的确认按钮在 Form 之外，通过 `form.submit`
方法调用表单提交功能。反之，则推荐使用 `<Button htmlType="submit" />` 调用 web 原生提交逻辑。

```js
const { useState, useRef, useEffect } = React

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const ModalForm = ({ visible, onCancel }) => {
  const [form] = FormHook.useForm();
  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
      <FormHook form={form} layout="vertical" name="userForm">
        <FormHook.Item
          name="name"
          label="User Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
        </FormHook.Item>
        <FormHook.Item
          name="age"
          label="User Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber/>
        </FormHook.Item>
      </FormHook>
    </Modal>
  );
};


const Demo = () => {
  const [visible, setVisible] = useState(false);

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  return (
    <FormHook.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'userForm') {
          const { basicForm } = forms;
          const users = basicForm.getFieldValue('users') || [];
          basicForm.setFieldsValue({
            users: [...users, values],
          });
          setVisible(false);
        }
      }}
    >
      <FormHook {...layout} name="basicForm" onFinish={onFinish}>
        <FormHook.Item
          name="group"
          label="Group Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
        </FormHook.Item>
        <FormHook.Item
          label="User List"
          shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
        >
          {({ getFieldValue }) => {
            const users = getFieldValue('users') || [];
            return users.length ? (
              <ul>
                {users.map((user, index) => (
                  <li key={index} className="user">
                    <Avatar icon="user-line"/>
                    {user.name} - {user.age}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text">
                ( No user yet. )
              </div>
            );
          }}
        </FormHook.Item>
        <FormHook.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button
            htmlType="button"
            style={{
              margin: '0 8px',
            }}
            onClick={showUserModal}
          >
            Add User
          </Button>
        </FormHook.Item>
      </FormHook>

      <ModalForm visible={visible} onCancel={hideUserModal}/>
    </FormHook.Provider>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

```less
ul {
  list-style: none;
}

.user {
  margin-bottom: 8px;

  .fishd-avatar {
    margin-right: 8px;
  }
}

```

:::

## 内联登录栏

:::demo

内联登录栏，常用在顶部导航栏中。

```js
const { useState, useEffect } = React

const HorizontalLoginForm = () => {
  const [form] = FormHook.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  return (
    <FormHook form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <FormHook.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<Icon type="user-line"/>} placeholder="Username"/>
      </FormHook.Item>
      <FormHook.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          prefix={<Icon type="lock-line"/>}
          type="password"
          placeholder="Password"
        />
      </FormHook.Item>
      <FormHook.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Log in
          </Button>
        )}
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<HorizontalLoginForm/>, mountNode);
```

:::

## 登录框

:::demo 普通的登录框，可以容纳更多的元素。

```js
const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <FormHook
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <FormHook.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<Icon type="user-line"/>} placeholder="Username"/>
      </FormHook.Item>
      <FormHook.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<Icon type="lock-line"/>}
          type="password"
          placeholder="Password"
        />
      </FormHook.Item>
      <FormHook.Item>
        <FormHook.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </FormHook.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </FormHook.Item>

      <FormHook.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or
        <a href="">register now!</a>
      </FormHook.Item>
    </FormHook>
  );
};


ReactDOM.render(<NormalLoginForm/>, mountNode);
```

```less
.login-form {
  max-width: 300px;
}

.login-form-forgot {
  float: right;
}

.login-form-button {
  width: 100%;
}

```

:::

## 注册新用户

:::demo 用户填写必须的信息以注册新用户。

```js
const { Option } = Select;
const { useState } = React;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegistrationForm = () => {
  const [form] = FormHook.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <FormHook.Item name="prefix" noStyle>
      <Select
        style={{
          width: 100
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </FormHook.Item>
  );
  const suffixSelector = (
    <FormHook.Item name="suffix" noStyle>
      <Select
        style={{
          width: 100,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </FormHook.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <FormHook
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <FormHook.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input/>
      </FormHook.Item>

      <FormHook.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input type="password"/>
      </FormHook.Item>

      <FormHook.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input type="password"/>
      </FormHook.Item>

      <FormHook.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input/>
      </FormHook.Item>

      <FormHook.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please select your habitual residence!',
          },
        ]}
      >
        <Cascader options={residences}/>
      </FormHook.Item>

      <FormHook.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </FormHook.Item>

      <FormHook.Item
        name="donation"
        label="Donation"
        rules={[
          {
            required: true,
            message: 'Please input donation amount!',
          },
        ]}
      >
        <InputNumber
          addonAfter={suffixSelector}
          style={{
            width: '100%',
          }}
        />
      </FormHook.Item>

      <FormHook.Item
        name="website"
        label="Website"
        rules={[
          {
            required: true,
            message: 'Please input website!',
          },
        ]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
          <Input/>
        </AutoComplete>
      </FormHook.Item>

      <FormHook.Item
        name="intro"
        label="Intro"
        rules={[
          {
            required: true,
            message: 'Please input Intro',
          },
        ]}
      >
        <Input.TextArea/>
      </FormHook.Item>

      <FormHook.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </FormHook.Item>

      <FormHook.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <FormHook.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input/>
            </FormHook.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </FormHook.Item>

      <FormHook.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the
          <a href="">agreement</a>
        </Checkbox>
      </FormHook.Item>
      <FormHook.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<RegistrationForm/>, mountNode);
```

:::

## 高级搜索

:::demo 三列栅格式的表单排列方式，常用于数据表格的高级搜索。

有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。

```js
const { Option } = Select;
const { useState } = React;
const AdvancedSearchForm = () => {
  const [expand, setExpand] = useState(false);
  const [form] = FormHook.useForm();

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];

    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <FormHook.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            {i % 3 !== 1 ? (
              <Input placeholder="placeholder"/>
            ) : (
              <Select>
                <Option value="1">1</Option>
                <Option value="2">
                  longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                </Option>
              </Select>
            )}
          </FormHook.Item>
        </Col>,
      );
    }

    return children;
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <FormHook
      form={form}
      name="advanced_search"
      className="advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24} className='fields'>{getFields()}</Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <a
            style={{
              fontSize: 12,
            }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <Icon type="top"/> : <Icon type="bottom"/>} Collapse
          </a>
        </Col>
      </Row>
    </FormHook>
  );
};

ReactDOM.render(
  <div>
    <AdvancedSearchForm/>
    <div className="search-result-list">Search Result List</div>
  </div>,
  mountNode,
);

```

```less
.advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 2px;

  & .fishd-formHook-item {
    display: flex;
  }

  & .fishd-formHook-item-control-wrapper {
    flex: 1;
  }
}


.search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.fields {
  display: flex;
  flex-flow: row wrap;
}
```

:::

## 弹出层中的新建表单

:::demo 当用户访问一个展示了某个列表的页面，想新建一项但又不想跳转页面时，可以用 Modal 弹出一个表单，用户填写必要信息后创建新的项。

```js
const { useState } = React
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = FormHook.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <FormHook
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <FormHook.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input/>
        </FormHook.Item>
        <FormHook.Item name="description" label="Description">
          <Input type="textarea"/>
        </FormHook.Item>
        <FormHook.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </FormHook.Item>
      </FormHook>
    </Modal>
  );
};
const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

ReactDOM.render(<CollectionsPage/>, mountNode);

```

:::

## 时间类控件

:::demo 时间类组件的 value 类型为 Date 对象。

```js
const { DateRangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const TimeRelatedForm = () => {
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    console.log('Received values of form: ', fieldsValue);
  };

  return (
    <FormHook name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
      <FormHook.Item name="date-picker" label="DatePicker" {...config}>
        <DatePicker/>
      </FormHook.Item>
      <FormHook.Item name="date-time-picker" label="DatePicker[showTime]" {...config}>
        <DatePicker showTime format="yyyy-MM-dd HH:mm:ss"/>
      </FormHook.Item>
      <FormHook.Item name="range-picker" label="RangePicker" {...rangeConfig}>
        <DateRangePicker/>
      </FormHook.Item>
      <FormHook.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
        <DateRangePicker showTime format="yyyy-MM-dd HH:mm:ss"/>
      </FormHook.Item>
      <FormHook.Item name="time-picker" label="TimePicker" {...config}>
        <TimePicker/>
      </FormHook.Item>
      <FormHook.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<TimeRelatedForm/>, mountNode);
```

:::

## 自行处理表单数据

:::demo Form 具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择自行处理数据。

```js
const { DateRangePicker } = DatePicker;
const { useState } = React;

function validatePrimeNumber(number) {
  if (number === 11) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }

  return {
    validateStatus: 'error',
    errorMsg: 'The prime between 8 and 12 is 11!',
  };
}

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
  },
};

const RawForm = () => {
  const [number, setNumber] = useState({
    value: 11,
  });
  const tips =
    'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.';

  const onNumberChange = (value) => {
    setNumber({ ...validatePrimeNumber(value), value });
  };

  return (
    <FormHook>
      <FormHook.Item
        {...formItemLayout}
        label="Prime between 8 & 12"
        validateStatus={number.validateStatus}
        help={number.errorMsg || tips}
      >
        <InputNumber min={8} max={12} value={number.value} onChange={onNumberChange}/>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<RawForm/>, mountNode);
```

:::

## 自定义校验

:::demo

我们提供了 `validateStatus` `help` `hasFeedback` 等属性，你可以不通过 Form 自己定义校验的时机和内容。

1. `validateStatus`: 校验状态，可选 'success', 'warning', 'error', 'validating'。

2. `hasFeedback`：用于给输入框添加反馈图标。

3. `help`：设置校验文案。

```js
const { DateRangePicker } = DatePicker;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

ReactDOM.render(
  <FormHook {...formItemLayout}>
    <FormHook.Item
      label="Fail"
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error"/>
    </FormHook.Item>

    <FormHook.Item label="Warning" validateStatus="warning">
      <Input placeholder="Warning" id="warning" prefix={<Icon type="empty-basis"/>}/>
    </FormHook.Item>

    <FormHook.Item
      label="Validating"
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Input placeholder="I'm the content is being validated" id="validating"/>
    </FormHook.Item>

    <FormHook.Item label="Success" hasFeedback validateStatus="success">
      <Input placeholder="I'm the content" id="success"/>
    </FormHook.Item>

    <FormHook.Item label="Warning" hasFeedback validateStatus="warning">
      <Input placeholder="Warning" id="warning2"/>
    </FormHook.Item>

    <FormHook.Item
      label="Fail"
      hasFeedback
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error2"/>
    </FormHook.Item>

    <FormHook.Item label="Success" hasFeedback validateStatus="success">
      <DatePicker
        style={{
          width: '100%',
        }}
      />
    </FormHook.Item>

    <FormHook.Item label="Warning" hasFeedback validateStatus="warning">
      <TimePicker
        style={{
          width: '100%',
        }}
      />
    </FormHook.Item>

    <FormHook.Item label="Error" hasFeedback validateStatus="error">
      <DateRangePicker
        style={{
          width: '100%',
        }}
      />
    </FormHook.Item>

    <FormHook.Item label="Error" hasFeedback validateStatus="error">
      <Select placeholder="I'm Select" allowClear>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    </FormHook.Item>

    <FormHook.Item
      label="Validating"
      hasFeedback
      validateStatus="error"
      help="Something breaks the rule."
    >
      <Cascader
        placeholder="I'm Cascader"
        options={[
          {
            value: 'xx',
            label: 'xx',
          },
        ]}
        allowClear
      />
    </FormHook.Item>

    <FormHook.Item label="Warning" hasFeedback validateStatus="warning" help="Need to be checked">
      <TreeSelect
        placeholder="I'm TreeSelect"
        treeData={[
          {
            value: 'xx',
            title: 'xx',
          },
        ]}
        style={{ width: '100%' }}
      />
    </FormHook.Item>

    <FormHook.Item
      label="inline"
      style={{
        marginBottom: 0,
      }}
    >
      <FormHook.Item
        validateStatus="error"
        help="Please select right date"
        style={{
          display: 'inline-block',
          width: 'calc(50% - 12px)',
        }}
      >
        <DatePicker/>
      </FormHook.Item>
      <span
        style={{
          display: 'inline-block',
          width: '24px',
          lineHeight: '32px',
          textAlign: 'center',
        }}
      >
        -
      </span>
      <FormHook.Item
        style={{
          display: 'inline-block',
          width: 'calc(50% - 12px)',
        }}
      >
        <DatePicker/>
      </FormHook.Item>
    </FormHook.Item>

    <FormHook.Item label="Success" hasFeedback validateStatus="success">
      <InputNumber
        style={{
          width: '100%',
        }}
      />
    </FormHook.Item>

    <FormHook.Item label="Success" hasFeedback validateStatus="success">
      <Input placeholder="with allowClear"/>
    </FormHook.Item>

    <FormHook.Item label="Warning" hasFeedback validateStatus="warning">
      <Input type="password" placeholder="with input password"/>
    </FormHook.Item>

    <FormHook.Item label="Error" hasFeedback validateStatus="error">
      <Input type="password" placeholder="with input password and allowClear"/>
    </FormHook.Item>

    <FormHook.Item label="Fail" validateStatus="error" hasFeedback help="Should have something">
      <Input.TextArea/>
    </FormHook.Item>
  </FormHook>,
  mountNode,
);
```

:::

## 动态校验规则

:::demo 根据不同情况执行不同的校验规则。

```js
const { useState, useEffect } = React
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};

const DynamicRule = () => {
  const [form] = FormHook.useForm();
  const [checkNick, setCheckNick] = useState(false);
  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick]);

  const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <FormHook form={form} name="dynamic_rule">
      <FormHook.Item
        {...formItemLayout}
        name="username"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name"/>
      </FormHook.Item>
      <FormHook.Item
        {...formItemLayout}
        name="nickname"
        label="Nickname"
        rules={[
          {
            required: checkNick,
            message: 'Please input your nickname',
          },
        ]}
      >
        <Input placeholder="Please input your nickname"/>
      </FormHook.Item>
      <FormHook.Item {...formTailLayout}>
        <Checkbox checked={checkNick} onChange={onCheckboxChange}>
          Nickname is required
        </Checkbox>
      </FormHook.Item>
      <FormHook.Item {...formTailLayout}>
        <Button type="primary" onClick={onCheck}>
          Check
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<DynamicRule/>, mountNode);
```

:::

## 校验其他组件

:::demo 以上演示没有出现的表单控件对应的校验演示。

```js
const { useState, useEffect } = React


const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};


const Demo = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <FormHook
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
    >
      <FormHook.Item label="Plain Text">
        <span className="ant-form-text">China</span>
      </FormHook.Item>
      <FormHook.Item
        name="select"
        label="Select"
        hasFeedback
        rules={[{ required: true, message: 'Please select your country!' }]}
      >
        <Select placeholder="Please select a country">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
      </FormHook.Item>

      <FormHook.Item
        name="select-multiple"
        label="Select[multiple]"
        rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
      >
        <Select mode="multiple" placeholder="Please select favourite colors">
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
        </Select>
      </FormHook.Item>

      <FormHook.Item label="InputNumber">
        <FormHook.Item name="input-number" noStyle>
          <InputNumber min={1} max={10}/>
        </FormHook.Item>
        <span className="ant-form-text">machines</span>
      </FormHook.Item>

      <FormHook.Item name="switch" label="Switch" valuePropName="checked">
        <Switch/>
      </FormHook.Item>

      <FormHook.Item name="slider" label="Slider">
        <Slider
          marks={{
            0: 'A',
            20: 'B',
            40: 'C',
            60: 'D',
            80: 'E',
            100: 'F',
          }}
        />
      </FormHook.Item>

      <FormHook.Item name="radio-group" label="Radio.Group">
        <Radio.Group>
          <Radio value="a">item 1</Radio>
          <Radio value="b">item 2</Radio>
          <Radio value="c">item 3</Radio>
        </Radio.Group>
      </FormHook.Item>

      <FormHook.Item
        name="radio-button"
        label="Radio.Button"
        rules={[{ required: true, message: 'Please pick an item!' }]}
      >
        <Radio.Group>
          <Radio.Button value="a">item 1</Radio.Button>
          <Radio.Button value="b">item 2</Radio.Button>
          <Radio.Button value="c">item 3</Radio.Button>
        </Radio.Group>
      </FormHook.Item>

      <FormHook.Item name="checkbox-group" label="Checkbox.Group">
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value="A" style={{ lineHeight: '32px' }}>
                A
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                B
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C" style={{ lineHeight: '32px' }}>
                C
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="D" style={{ lineHeight: '32px' }}>
                D
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E" style={{ lineHeight: '32px' }}>
                E
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="F" style={{ lineHeight: '32px' }}>
                F
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </FormHook.Item>

      <FormHook.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button><Icon type="upload-line"/>Click to upload
          </Button>
        </Upload>
      </FormHook.Item>

      <FormHook.Item label="Dragger">
        <FormHook.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="fishd-upload-drag-icon">
              <Icon type="upload-cloud"/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </FormHook.Item>
      </FormHook.Item>

      <FormHook.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormHook.Item>
    </FormHook>
  );
};

ReactDOM.render(<Demo/>, mountNode);
```

:::

## API

### Form

| 参数 | 说明 | 类型  | 默认值 |
| --- | --- |-----------------------------------------------------------------------------------------------------| -- |
| component | 设置 Form 渲染元素，为 `false` 则不创建 DOM 节点 | ComponentType \| false | form |  
| fields | 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。| FieldData                                                                                           | \- |  
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | FormInstance                                                                                        | \- |  |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object                                                                                              | \- |  
| labelAlign | label 标签的文本对齐方式 | `left` \| `right` | `right` |  
| labelWrap | label 标签的文本换行方式 | boolean | false | 
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](#/components/grid)                                                                         | \- |  
| layout | 表单布局 | `horizontal` \| `vertical` \| `inline` | `horizontal` |  
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string| \- |  
| preserve | 当字段被删除时保留字段值 | boolean                                                                                             | true | 
| requiredMark | 必选样式。此为 Form 配置，Form.Item 无法单独配置 | boolean                                                                                             | false | true | 
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) | false |  
| validateMessages | 验证提示模板，说明见下 | [ValidateMessages](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts) | \- |  
| validateTrigger | 统一设置字段触发验证的时机 | string \| string\[\] | `onChange` | 
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](#/components/grid)                                       | \- |  
| onFieldsChange | 字段更新时触发回调事件 | function(changedFields, allFields)                                                                  | \- |  
| onFinish | 提交表单且数据验证成功后回调事件 | function(values)                                                                                    | \- |  
| onFinishFailed | 提交表单且数据验证失败后回调事件 | function({ values, errorFields, outOfDate })                                                        | \- |  
| onValuesChange | 字段值更新时触发回调事件 | function(changedValues, allValues)                                                                  | \- |  

### validateMessages

Form
为验证提供了[默认的错误提示信息](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts)，你可以通过配置 `validateMessages`
属性，修改对应的提示模板。一种常见的使用方式，是配置国际化提示信息：

```
const validateMessages = {
  required: "'${name}' 是必选字段",
  // ...
};

<Form validateMessages={validateMessages} />;
```

### Form.Item

表单字段组件，用于数据双向绑定、校验、布局等。

| 参数 | 说明 | 类型                                    | 默认值 |
| --- | --- |---------------------------------------| --- |
| dependencies | 设置依赖字段，说明见下 | NamePath[]                            | \- |  
| extra | 额外的提示信息，和 `help` 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | ReactNode                             | \- |  
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any\[\]) => any              | \- |  
| getValueProps | 为子元素添加额外的属性 | (value: any) => any                   | \- | 
| hasFeedback | 配合 `validateStatus` 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean                               | false |  
| help | 提示信息，如不设置，则会根据校验规则自动生成 | ReactNode                             | \- |  
| hidden | 是否隐藏字段（依然会收集和校验字段） | boolean                               | false |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string                                | \- |  
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准 | string                                | \- |
| label | `label` 标签的文本 | ReactNode                             | \- |  
| labelAlign | 标签文本对齐方式 | `left` \| `right` | `right` |  
| labelCol | `label` 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。你可以通过 Form 的 `labelCol` 进行统一设置，，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 | [object](#/components/grid)           | \- |  
| messageVariables | 默认验证字段的信息 | Record<string, string>                | \- | 
| name | 字段名，支持数组 | NamePath                              | \- |  
| normalize | 组件获取值后进行转换，再放入 Form 中。不支持异步 | (value, prevValue, prevValues) => any | \- |  
| noStyle | 为 `true` 时不带样式，作为纯字段控件使用 | boolean                               | false |  
| preserve | 当字段被删除时保留字段值 | boolean                               | true | 
| required | 必填样式设置。如不设置，则会根据校验规则自动生成 | boolean                               | false |  
| rules | 校验规则，设置字段的校验逻辑。 | Rule[]                                | \- |  
| shouldUpdate | 自定义字段更新逻辑，说明见下 | boolean \| (prevValue, curValue) => boolean | false |  
| tooltip | 配置提示信息 | ReactNode \| [TooltipProps & { icon: ReactNode }](#/components/tooltip) | \- | 
| trigger | 设置收集字段值变更的时机。点击[此处](https://ant-design.gitee.io/components/form-cn/#components-form-demo-customized-form-controls)查看示例 | string                                | `onChange` |  
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 `parallel` 时会并行校验 | boolean  \| `parallel` | false | 
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string                                | \- |  
| validateTrigger | 设置字段校验的时机 | string                                \| string[] | `onChange` |  
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked'。该属性为 `getValueProps` 的封装，自定义 `getValueProps` 后会失效 | string                                | `value` |  
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`。你可以通过 Form 的 `wrapperCol` 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 | [object](#/components/grid)           | \- |

被设置了 `name` 属性的 `Form.Item` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被
Form 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做数据收集同步（你可以使用 Form 的 `onValuesChange`），但还是可以继续监听 `onChange` 事件。

2. 你不能用控件的 `value` 或 `defaultValue` 等属性来设置表单域的值，默认值可以用 Form 里的 `initialValues` 来设置。注意 `initialValues` 不能被 `setState`
   动态更新，你需要用 `setFieldsValue` 来更新。

3. 你不应该用 `setState`，可以使用 `form.setFieldsValue` 来动态改变表单值。

### dependencies

当字段间存在依赖关系时使用。如果一个字段设置了 `dependencies`
属性。那么它所依赖的字段更新时，该字段将自动触发更新与校验。一种常见的场景，就是注册用户表单的“密码”与“确认密码”字段。“确认密码”校验依赖于“密码”字段，设置 `dependencies`
后，“密码”字段更新会重新触发“校验密码”的校验逻辑。

`dependencies` 不应和 `shouldUpdate` 一起使用，因为这可能带来更新逻辑的混乱。

`dependencies` 支持使用 render props 类型 children 的 `Form.Item`。

### shouldUpdate

Form 通过增量更新方式，只更新被修改的字段相关组件以达到性能优化目的。大部分场景下，你只需要编写代码或者与 `dependencies`
属性配合校验即可。而在某些特定场景，例如修改某个字段值后出现新的字段选项、或者纯粹希望表单任意变化都对某一个区域进行渲染。你可以通过 `shouldUpdate` 修改 Form.Item 的更新逻辑。

当 `shouldUpdate` 为 `true` 时，Form 的任意变化都会使该 Form.Item 重新渲染。这对于自定义渲染一些区域十分有帮助：

```
<Form.Item shouldUpdate>
  {() => {
    return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
  }}
</Form.Item>
```

当 `shouldUpdate` 为方法时，表单的每次数值更新都会调用该方法，提供原先的值与当前的值以供你比较是否需要更新。这对于是否根据值来渲染额外字段十分有帮助：

```
<Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
  {() => {
    return (
      <Form.Item name="other">
        <Input />
      </Form.Item>
    );
  }}
</Form.Item>
```

### messageVariables

你可以通过 `messageVariables` 修改 Form.Item 的默认验证信息。

```
<Form>
  <Form.Item messageVariables={{ another: 'good' }} label="user">
    <Input />
  </Form.Item>
  <Form.Item messageVariables={{ label: 'good' }} label={<span>user</span>}>
    <Input />
  </Form.Item>
</Form>
```

### Form.List

为字段提供数组化管理。

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- |
| children | 渲染函数 | (fields: Field\[\], operation: { add, remove, move }, meta: { errors }) => React.ReactNode | \- |  
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准 | any\[\] | \- | 
| name | 字段名，支持数组 | NamePath | \- |  
| rules | 校验规则，仅支持自定义规则。需要配合 `ErrorList` 一同使用。 | { validator, message }\[\] | \- |

```
<Form.List>
  {fields =>
    fields.map(field => (
      <Form.Item {...field}>
        <Input />
      </Form.Item>
    ))
  }
</Form.List>
```

注意：Form.List 下的字段不应该配置 `initialValue`，你始终应该通过 Form.List 的 `initialValue` 或者 Form 的 `initialValues` 来配置。

### Form.List operation

Form.List 渲染表单相关操作函数。

| 参数     | 说明 | 类型                                                 | 默认值                              |
|--------| --- |----------------------------------------------------|----------------------------------| 
| add    | 新增表单项 | (defaultValue?: any, insertIndex?: number) => void | insertIndex                      |
| move   | 移动表单项 | (from: number, to: number) => void                 | \-   |  
| remove | 删除表单项 | (index: number \| number\[\]) => void              | number\[\] |

### Form.ErrorList

错误展示组件，仅限配合 Form.List 的 rules 一同使用。参考`动态增减表单项`示例

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| errors | 错误列表 | ReactNode\[\] | \- |

### Form.Provider

提供表单间联动功能，其下设置 `name` 的 Form 更新时，会自动触发对应事件。参考`多表单联动`示例

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFormChange | 子表单字段更新时触发 | function(formName: string, info: { changedFields, forms }) | \- |
| onFormFinish | 子表单提交时触发 | function(formName: string, info: { values, forms }) | \- |

```
<Form.Provider
  onFormFinish={name => {
    if (name === 'form1') {
      // Do something...
    }
  }}
>
  <Form name="form1">...</Form>
  <Form name="form2">...</Form>
</Form.Provider>
```

### FormInstance

| 名称 | 说明 | 类型 |
| --- | --- | --- | 
| getFieldError | 获取对应字段名的错误信息 | (name: NamePath) => string\[\] |  
| getFieldInstance | 获取对应字段实例 | (name: NamePath) => any |
| getFieldsError | 获取一组字段名对应的错误信息，返回为数组形式 | (nameList?: NamePath[]) => FieldError\[\] |  
| getFieldsValue | 获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值，当调用 `getFieldsValue(true)` 时返回所有值 | (nameList?: NamePath[], filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any |  
| getFieldValue | 获取对应字段名的值 | (name: NamePath) => any |  
| isFieldsTouched | 检查一组字段是否被用户操作过，`allTouched` 为 `true` 时检查是否所有字段都被操作过 | (nameList?: NamePath[], allTouched?: boolean) => boolean |  
| isFieldTouched | 检查对应字段是否被用户操作过 | (name: NamePath) => boolean |  
| isFieldValidating | 检查对应字段是否正在校验 | (name: NamePath) => boolean |  
| resetFields | 重置一组字段到 `initialValues` | (fields?: NamePath[]) => void |  
| scrollToField | 滚动到对应字段位置 | (name: NamePath, options: [ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)) => void |  
| setFields | 设置一组字段状态 | (fields: FieldData[]) => void |  
| setFieldsValue | 设置表单的值（该值将直接传入 form store 中。如果你不希望传入对象被修改，请克隆后传入） | (values) => void |  
| submit | 提交表单，与点击 `submit` 按钮效果相同 | () => void |  
| validateFields | 触发表单验证 | (nameList?: NamePath[]) => Promise |  

#### validateFields 返回示例

```
validateFields()
  .then(values => {
    /*
  values:
    {
      username: 'username',
      password: 'password',
    }
  */
  })
  .catch(errorInfo => {
    /*
    errorInfo:
      {
        values: {
          username: 'username',
          password: 'password',
        },
        errorFields: [
          { name: ['password'], errors: ['Please input your Password!'] },
        ],
        outOfDate: false,
      }
    */
  });
```

### Interface

#### NamePath

`string | number | (string | number)[]`

#### FieldData

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| errors | 错误信息 | string\[\] |
| name | 字段名称 | NamePath[] |
| touched | 是否被用户操作过 | boolean |
| validating | 是否正在校验 | boolean |
| value | 字段对应值 | any |

#### Rule

Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据：

```
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
```

| 名称              | 说明                                                            | 类型                       |
|-----------------|---------------------------------------------------------------|--------------------------| 
| defaultField    | 仅在 `type` 为 `array` 类型时有效，用于指定数组元素的校验规则                       | rule                     |  
| enum            | 是否匹配枚举中的值（需要将 `type` 设置为 `enum`）                              | any\[\]                  |  
| fields          | 仅在 `type` 为 `array` 或 `object` 类型时有效，用于指定子元素的校验规则             | Record<string, rule\>    |  
| len             | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度              | number                   |  
| max             | 必须设置 `type`：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | number                   |  
| message         | 错误信息，不设置时会通过模板自动生成                                            | string                   |  
| min             | 必须设置 `type`：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | number                   |  
| pattern         | 正则表达式匹配                                                       | RegExp                   |  
| required        | 是否为必选字段                                                       | boolean                  |  
| transform       | 将字段值转换成目标值后进行校验                                               | (value) => any           |  
| type            | 类型，常见有 `string` \| `number` \| `boolean` \| `url` \| `email`。更多请参考[此处](https://github.com/yiminghe/async-validator#type) | string |  
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 `validateTrigger` 的子集                | string \| string\[\] |  
| validator       | 自定义校验，接收 Promise 作为返回值。                                       | (rule, value) => Promise |  
| warningOnly     | 仅警告，不阻塞表单提交                                                   | boolean                  | 
| whitespace      | 如果字段仅包含空格则校验不通过，只在 `type: 'string'` 时生效                       | boolean                  |  

### 校验规则

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| Enum | 枚举类型 | String | - |
| len | 字段长度 | Number | - |
| max | 最大长度 | Number | - |
| message | 校验文案 | String \| ReactNode | - |
| min | 最小长度 | Number | - |
| pattern | 正则表达式校验 | RegExp | - |
| required | 是否必选 | Boolean | false |
| transform | 校验前转换字段值 | (value) => transformedValue:any | - |
| type | 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type) | Enum | 'string' |
| validator | 自定义校验（注意，[callback 必须被调用](https://github.com/ant-design/ant-design/issues/5155)） | (rule, value, callback) => Void | - |
| whitespace | 必选时，空格是否会被视为错误 | Boolean | false |

## FAQ

### 自定义 validator 没有效果

这是由于你的 `validator` 有错误导致 `callback` 没有执行到。你可以选择通过 `async` 返回一个 promise 或者使用 `try...catch` 进行错误捕获：

```
validator: async (rule, value) => {
  throw new Error('Something wrong!');
}

// or

validator(rule, value, callback) => {
  try {
    throw new Error('Something wrong!');
  } catch (err) {
    callback(err);
  }
}
```

### name 为数组时的转换规则？

当 `name` 为数组时，会按照顺序填充路径。当存在数字且 form store 中没有该字段时会自动转变成数组。因而如果需要数组为 key 时请使用 string 如：`['1', 'name']`。

### 为何在 Modal 中调用 form 控制台会报错？

> Warning: Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop?

这是因为你在调用 form 方法时，Modal 还未初始化导致 form 没有关联任何 Form 组件。你可以通过给 Modal 设置 `forceRender`
将其预渲染。示例点击[此处](https://codesandbox.io/s/antd-reproduction-template-ibu5c)。

### 为什么 Form.Item 下的子组件 `defaultValue` 不生效？

当你为 Form.Item 设置 `name` 属性后，子组件会转为受控模式。因而 `defaultValue` 不会生效。你需要在 Form 上通过 `initialValues` 设置默认值。

### 为什么第一次调用 `ref` 的 From 为空？

`ref` 仅在节点被加载时才会被赋值，请参考 React
官方文档：[https://reactjs.org/docs/refs-and-the-dom.html#accessing-refs](https://reactjs.org/docs/refs-and-the-dom.html#accessing-refs)

### 为什么 `resetFields` 会重新 mount 组件？

`resetFields` 会重置整个 Field，因而其子组件也会重新 mount 从而消除自定义组件可能存在的副作用（例如异步数据、状态等等）。

### Form 的 initialValues 与 Item 的 initialValue 区别？

在大部分场景下，我们总是推荐优先使用 Form 的 `initialValues`。只有存在动态字段时你才应该使用 Item 的 `initialValue`。默认值遵循以下规则：

1. Form 的 `initialValues` 拥有最高优先级

2. Field 的 `initialValue` 次之 \*. 多个同 `name` Item 都设置 `initialValue` 时，则 Item 的 `initialValue` 不生效

### 为什么字段设置 `rules` 后更改值 `onFieldsChange` 会触发三次？

字段除了本身的值变化外，校验也是其状态之一。因而在触发字段变化会经历以下几个阶段：

1. Trigger value change

2. Rule validating

3. Rule validated

在触发过程中，调用 `isFieldValidating` 会经历 `false` > `true` > `false` 的变化过程。

### 为什么 Form.List 不支持 `label` 还需要使用 ErrorList 展示错误？

Form.List 本身是 renderProps，内部样式非常自由。因而默认配置 `label` 和 `error` 节点很难与之配合。如果你需要 antd 样式的 `label`，可以通过外部包裹 Form.Item 来实现。

### 为什么 Form.Item 的 `dependencies` 对 Form.List 下的字段没有效果？

Form.List 下的字段需要包裹 Form.List 本身的 `name`，比如：

```
<Form.List name="users">
  {fields =>
    fields.map(field => (
      <React.Fragment key={field.key}>
        <Form.Item name={[field.name, 'name']} {...someRest1} />
        <Form.Item name={[field.name, 'age']} {...someRest1} />
      </React.Fragment>
    ))
  }
</Form.List>
```

依赖则是：`['users', 0, 'name']`

### 为什么 `normalize` 不能是异步方法？

React 中异步更新会导致受控组件交互行为异常。当用户交互触发 `onChange` 后，通过异步改变值会导致组件 `value` 不会立刻更新，使得组件呈现假死状态。如果你需要异步触发变更，请通过自定义组件实现内部异步状态。

### 自定义表单控件 `scrollToFirstError` 和 `scrollToField` 失效？

类似问题：[#28370](https://github.com/ant-design/ant-design/issues/28370) [#27994](https://github.com/ant-design/ant-design/issues/27994)

滚动依赖于表单控件元素上绑定的 `id` 字段，如果自定义控件没有将 `id`
赋到正确的元素上，这个功能将失效。你可以参考这个 [codesandbox](https://codesandbox.io/s/antd-reproduction-template-forked-25nul?file=/index.js)。

### `setFieldsValue` 不会触发 `onFieldsChange` 和 `onValuesChange`？

是的，change 事件仅当用户交互才会触发。该设计是为了防止在 change 事件中调用 `setFieldsValue` 导致的循环问题。

### 有更多参考文档吗？

* 你可以阅读[《antd v4 Form 使用心得》](https://zhuanlan.zhihu.com/p/375753910)获得一些使用帮助以及建议。

* 想在 DatePicker、Switch 也使用
  before、after？可以参考[《如何优雅的对 Form.Item 的 children 增加 before、after》](https://zhuanlan.zhihu.com/p/422752055)。
