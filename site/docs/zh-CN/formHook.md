# FormHook 表单 【交互：叶婧婕 |视觉：徐剑杰 |开发：吴圣筑| 维护：吴圣筑】

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 经 `Form.create()` 包装过的组件会自带 `this.props.form` 属性，直接传给 Form 即可。 | Object | - |
| hideRequiredMark | 隐藏所有表单项的必选标记 | Boolean | false |
| layout | 表单布局 | Enum {'horizontal', 'vertical', 'inline'} | 'horizontal' |
| onSubmit | 数据验证成功后回调事件 | (e:Event) => Void | - |

### Form.create(options)

使用方式如下：

```js
class CustomizedForm extends React.Component {
}

CustomizedForm = Form.create({})(CustomizedForm);
```

`options` 的配置项如下。

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| mapPropsToFields | 把父组件的属性映射到表单项上（如：把 Redux store 中的值读出），需要对返回值中的表单域数据用 `Form.createFormField` 标记 | (props) => Object{ fieldName: FormField { value } } |
| validateMessages | 默认校验信息，可用于把默认错误信息改为中文等，格式与 [newMessages](https://github.com/yiminghe/async-validator/blob/master/src/messages.js) 返回值一致 | Object { [nested.path]: String } |
| onFieldsChange | 当 `Form.Item` 子节点的值发生改变时触发，可以把对应的值转存到 Redux store | (props, fields) => Void |
| onValuesChange | 任一表单域的值发生改变时的回调 | (props, changedValues, allValues) => Void |

经过 `Form.create` 之后如果要拿到 `ref`，可以使用 `wrappedComponentRef` 。

```js
class CustomizedForm extends React.Component {
...
}

// use wrappedComponentRef
const EnhancedForm = Form.create()(CustomizedForm);
<EnhancedForm wrappedComponentRef={(form) => this.form = form}/>
this.form // => The instance of CustomizedForm
```

经过 `Form.create` 包装的组件将会自带 `this.props.form` 属性。

> 注意：使用 `getFieldsValue` `getFieldValue` `setFieldsValue` 等时，应确保对应的 field 已经用 `getFieldDecorator` 注册过了。

#### `this.props.form` 提供的 API

| 方法      | 说明                                     | 类型       |
| ------- | -------------------------------------- | -------- |
| getFieldDecorator | 用于和表单进行双向绑定，详见下方描述 | - |
| getFieldError | 获取某个输入控件的 Error | (name) => Void |
| getFieldsError | 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error | (\[names: Array< String >]) => Void |
| getFieldsValue | 获取一组输入控件的值，如不传入参数，则获取全部组件的值 | (\[fieldNames: Array< String >]) => Void |
| getFieldValue | 获取一个输入控件的值 | (fieldName: String) => Void |
| isFieldsTouched | 判断是否任一输入控件经历过 `getFieldDecorator` 的值收集时机 `options.trigger` | (names?: Array< String >) => Boolean |
| isFieldTouched | 判断一个输入控件是否经历过 `getFieldDecorator` 的值收集时机 `options.trigger` | (name: String) => Boolean |
| isFieldValidating | 判断一个输入控件是否在校验状态 | (name) => Void |
| resetFields | 重置一组输入控件的值（为 `initialValue`）与状态，如不传入参数，则重置所有组件 | (\[names: Array< String >]) => Void |
| setFields | 设置一组输入控件的值与 Error。 | ({ [fieldName]: { value: any, errors: [Error] } }) => Void |
| setFieldsValue | 设置一组输入控件的值（注意：不要在 `componentWillReceiveProps` 内使用，否则会导致死循环，[更多](https://github.com/ant-design/ant-design/issues/2985)） | ({ [fieldName]: value }) => Void |
| validateFields | 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件 | (\[fieldNames: Array< String >], [options: Object], callback: (errors, values) => Void) => Void |
| validateFieldsAndScroll | 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 | 参考 `validateFields` |

#### `this.props.form.validateFields/validateFieldsAndScroll(fieldNames, options, callback)` 的参数`options`的配置项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options.first | 若为 true，则每一表单域的都会在碰到第一个失败了的校验规则后停止校验 | Boolean | false |
| options.firstFields | 指定表单域会在碰到第一个失败了的校验规则后停止校验 | Array< String > | \[] |
| options.force | 对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验 | Boolean | false |
| options.scroll | 定义 validateFieldsAndScroll 的滚动行为，详细配置见 [dom-scroll-into-view config](https://github.com/yiminghe/dom-scroll-into-view#function-parameter) | Object | {} |

#### `this.props.form.getFieldDecorator(id, options)`

经过 `getFieldDecorator` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form
接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做同步，但还是可以继续监听 `onChange` 等事件。
2. 你不能用控件的 `value` `defaultValue` 等属性来设置表单域的值，默认值可以用 `getFieldDecorator` 里的 `initialValue`。
3. 你不应该用 `setState`，可以使用 `this.props.form.setFieldsValue` 来动态改变表单值。

特别注意:

1. `getFieldDecorator` 不能用于装饰纯函数组件。
2. 如果使用的是 `react@<15.3.0`，则 `getFieldDecorator` 调用不能位于纯函数组件中: <https://github.com/facebook/react/pull/6534>

参数如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 必填输入控件唯一标志。支持嵌套式的[写法](https://github.com/react-component/form/pull/48)。 | String | - |
| options.getValueFromEvent | 可以把 onChange 的参数（如 event）转化为控件的值 | (..args) => Void | [reference](https://github.com/react-component/form#option-object) |
| options.initialValue | 子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用 `===` 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量)) | any | - |
| options.normalize | 转换默认的 value 给控件，[一个选择全部的例子](https://codepen.io/afc163/pen/JJVXzG?editors=001) | (value, prevValue, allValues) => any | - |
| options.rules | 校验规则，参考下方文档 | Array< Object > | - |
| options.validate | 校验方法 | Array< Object > | - |
| options.validate[n].trigger | Event which is listened to validate. Set to falsy to only validate when call props.validateFields. | String | Array< String > | 'onChange' |
| options.validate[n].rules | Validator rules. see: [async-validator](https://github.com/yiminghe/async-validator) | Array< Object > | - |
| options.trigger | 收集子节点的值的时机 | String | 'onChange' |
| options.validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验 | Boolean | false |
| options.validateTrigger | 校验子节点值的时机 | String \| Array< String > | 'onChange' |
| options.valuePropName | 子节点的值的属性，如 Switch 的是 'checked' | String | 'value' |
| options.getValueProps | Get the component props according to field value. | (value): Object | (value) => ({ value }) |
| options.hidden | Ignore current field while validating or gettting fields | Boolean | false |

### Form.createFormField

用于标记 `mapPropsToFields` 返回的表单域数据，请查看表单数据存储于上层组件的例子。

### Form.Item

注意：

- 一个 Form.Item 建议只放一个被 getFieldDecorator 装饰过的 child，当有多个被装饰过的 child 时，`help` `required` `validateStatus` 无法自动生成。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | String \| ReactNode | - |
| hasFeedback | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | Boolean | false |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | String \| ReactNode | - |
| label | label 标签的文本 | String \| ReactNode | - |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [Object](https://nsfi.github.io/ppfish-components/#/components/grid/) | - |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | Boolean | false |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | String | - |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [Object](https://nsfi.github.io/ppfish-components/#/components/grid/) | - |

### Form.List

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 经过 Form.create 包装的组件自带的 this.props.form 属性 | object | - |
| children | 渲染函数 | (fields: { name, key, initialValue }[], operation: { add, remove }) => React.ReactNode | - |
| initialValues | FormList 的默认值，会传递给 children 渲染函数 | any[] | - |
| name | 字段名 | string | - |

### Form.List operation

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| add | 新增表单项 | (defaultValue?: any, index?: number) => void | list.length |
| remove | 删除表单项 | (index: number) => void | - |
| move | 移动表单项 | (from: number, to: number) => void | - |

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

更多高级用法可研究 [async-validator](https://github.com/yiminghe/async-validator)。
