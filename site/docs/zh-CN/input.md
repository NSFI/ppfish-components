# 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 基本使用

:::demo 基本使用。

```js
render(){
  return(<Input placeholder="Basic usage" />)
}
```
:::

## 三种大小

:::demo 我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `40px`、`32px` 和 `24px`。

```js
render(){
  return(
    <div className="example-input">
        <Input size="large" placeholder="large size" />
        <Input placeholder="default size" />
        <Input size="small" placeholder="small size" />
    </div>
  )
}
```
:::

<style>
.example-input .fishd-input {
  width: 200px;
  margin: 0 8px 8px 0;
}
</style>

## 前置/后置标签

:::demo 用于配置一些固定组合。

```js
render(){
  const Option = Select.Option;
  const selectBefore = (
    <Select defaultValue="Http://" style={{ width: 100 }}>
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com" style={{ width: 80 }}>
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );
  return(
    <div>
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input addonAfter={<Icon type="stop-line" />} defaultValue="mysite" />
        </div>
    </div>
  )
}
```
:::

## 输入框组合

:::demo 输入框的组合展现。

注意：使用 `compact` 模式时，不需要通过 `Col` 来控制宽度。

```js
  state = {
    dataSource: [],
    options : [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }]
  };

  handleChange = (value) => {
    this.setState({
      dataSource: !value || value.indexOf('@') >= 0 ? [] : [
        `${value}@gmail.com`,
        `${value}@163.com`,
        `${value}@qq.com`,
      ],
    });
  };

  render() {
    const InputGroup = Input.Group;
    const Option = Select.Option;
    return (
      <div>
        <InputGroup size="large">
          <Col span={5}>
            <Input defaultValue="0571" />
          </Col>
          <Col span={8}>
            <Input defaultValue="26888888" />
          </Col>
        </InputGroup>
        <br />
        <InputGroup compact>
          <Input style={{ width: '20%' }} defaultValue="0571" />
          <Input style={{ width: '30%' }} defaultValue="26888888" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Zhejiang">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Option1">
            <Option value="Option1">Option1</Option>
            <Option value="Option2">Option2</Option>
          </Select>
          <Input style={{ width: '50%' }} defaultValue="input content" />
          <InputNumber />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Input style={{ width: '50%' }} defaultValue="input content" />
          <DatePicker style={{width:300}}/>
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Option1-1">
            <Option value="Option1-1">Option1-1</Option>
            <Option value="Option1-2">Option1-2</Option>
          </Select>
          <Select defaultValue="Option2-2">
            <Option value="Option2-1">Option2-1</Option>
            <Option value="Option2-2">Option2-2</Option>
          </Select>
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="1">
            <Option value="1">Between</Option>
            <Option value="2">Except</Option>
          </Select>
          <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
          <Input style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
          <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Sign Up" style={{width:100}}>
            <Option value="Sign Up">Sign Up</Option>
            <Option value="Sign In">Sign In</Option>
          </Select>
          <AutoComplete
            dataSource={this.state.dataSource}
            style={{ width: 200 }}
            onChange={this.handleChange}
            placeholder="Email"
          />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select style={{ width: 150}} defaultValue="Home">
            <Option value="Home">Home</Option>
            <Option value="Company">Company</Option>
          </Select>
          <Cascader style={{ width:300 }} options={this.state.options} placeholder="Select Address" />
        </InputGroup>
      </div>
    );
  }
```
:::

## 搜索框

:::demo 带有搜索按钮的输入框。

```js
render(){
  const Search = Input.Search;
  return(
    <div>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <br /><br />
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          enterButton
        />
        <br /><br />
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
      </div>
  )
}
```
:::

## 文本域

:::demo 用于多行输入。

```js
render(){
  return(
    <Input.TextArea rows={4} />
  )
}

```
:::

## 适应文本高度的文本域

:::demo `autosize` 属性适用于 `textarea` 节点，并且只有高度会自动变化。另外 `autosize` 可以设定为一个对象，指定最小行数和最大行数。

```js
render(){
  const { TextArea } = Input;
  return(
    <div>
        <TextArea placeholder="Autosize height based on content lines" autosize />
        <div style={{ margin: '24px 0' }} />
        <TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
    </div>
  )
}
```
:::

## 计数器

:::demo 计数器是文本域的特殊表现形式。

```js
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onChange = (e) => {
    this.setState({ name: e.target.value });
  }
  render(){
    const { Counter } = Input;
    return(
      <div>
          <Counter 
            placeholder="Autosize height based on content lines" 
            limit={50} 
            value={this.state.name}
            autosize 
            onChange={this.onChange}
          />
          <div style={{ margin: '24px 0' }} />
          <Counter 
            placeholder="Autosize height with minimum and maximum number of lines" 
            limit={500} 
            autosize={{ minRows: 2, maxRows: 6 }} 
          />
      </div>
    )
  }
```
:::

## 前缀和后缀

:::demo 在输入框上添加前缀或后缀图标。

```js
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }

  render() {
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle-fill" onClick={this.emitEmpty} /> : null;
    return (
      <Input
        placeholder="Enter your username"
        prefix={<Icon type="date-line" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
        value={userName}
        onChange={this.onChangeUserName}
        ref={node => this.userNameInput = node}
      />
    );
  }
```
:::

<style>
.fishdicon-close-circle-fill {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  font-size: 12px;
}
.fishdicon-close-circle-fill:hover {
  color: #999;
}
.fishdicon-close-circle-fill:active {
  color: #666;
}
</style>

## API

### Input

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | string\|ReactNode |  |
| addonBefore | 带标签的 input，设置前置标签 | string\|ReactNode |  |
| defaultValue | 输入框默认内容 | string |  |
| disabled | 是否禁用状态，默认为 false | boolean | false |
| id | 输入框的 id | string |  |
| prefix | 带有前缀图标的 input | string\|ReactNode |  |
| size | 控件大小。注：标准表单内的输入框大小限制为 `large`。可选 `large` `default` `small` | string | `default` |
| suffix | 带有后缀图标的 input | string\|ReactNode |  |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`)。 | string | `text` |
| value | 输入框内容 | string |  |
| onPressEnter | 按下回车的回调 | function(e) |  |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 和 `options` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

Input 的其他属性和 React 自带的 [input](https://facebook.github.io/react/docs/events.html#supported-events) 一致。

### Input.TextArea

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autosize | 自适应内容高度，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean\|object | false |
| defaultValue | 输入框默认内容 | string |  |
| value | 输入框内容 | string |  |
| onPressEnter | 按下回车的回调 | function(e) |  |

`Input.TextArea` 的其他属性和浏览器自带的 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 一致。

### Input.Counter

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| limit | 输入框字符限制数量 | number |  |

`Input.Counter` 的其他属性和`Input.TextArea`一致。

#### Input.Search

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enterButton | 是否有确认按钮，可设为按钮文字 | boolean\|ReactNode | false |
| onSearch | 点击搜索或按下回车键时的回调 | function(value) |  |

其余属性和 Input 一致。

#### Input.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| compact | 是否用紧凑模式 | boolean | false |
| size | `Input.Group` 中所有的 `Input` 的大小，可选 `large` `default` `small` | string | `default` |

```html
<Input.Group>
  <Input />
  <Input />
</Input.Group>
```
