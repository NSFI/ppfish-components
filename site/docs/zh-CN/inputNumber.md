# InputNumber 数字输入框 【交互：刘莹莹 | 视觉：徐剑杰 |开发：卿泽】

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。


## 数字输入框
:::demo

```js
onChange = (value) => {
  console.log('changed', value);
}

render(){
  return (
     <InputNumber min={1} max={10} defaultValue={3} onChange={this.onChange} />
  )
}
```
:::

## 三种大小

:::demo 三种大小的数字输入框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `40px` 和 `24px` ，默认高度为 `32px`。

```js

onChange = (value) => {
  console.log('changed', value);
}

render(){
  return(
    <div>
        <InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={this.onChange} />
        <InputNumber min={1} max={100000} defaultValue={3} onChange={this.onChange} />
        <InputNumber size="small" min={1} max={100000} defaultValue={3} onChange={this.onChange} />
      </div>
  )
}
```
:::

<style>
.fishd-input-number {
  margin-right: 10px;
}
</style>

## 不可用

:::demo 点击按钮切换可用状态。

```js
class Demo extends React.Component {
  state = {
    disabled: true,
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    return (
      <div>
        <InputNumber min={1} max={10} disabled={this.state.disabled} defaultValue={3} />
        <div style={{ marginTop: 20 }}>
          <Button onClick={this.toggle} type="primary">Toggle disabled</Button>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Demo {...context.props}/>,mountNode);
```
:::

## 小数

:::demo 和原生的数字输入框一样，value 的精度由 step 的小数位数决定。

```js
onChange = (value) => {
  console.log('changed', value);
}

render(){
  return (
     <InputNumber min={0} max={10} step={0.1} onChange={this.onChange} />
  )
}
```
:::

## 格式化展示

:::demo 通过 `formatter` 格式化数字，以展示具有具体含义的数据，往往需要配合 `parser` 一起使用。

```js
onChange = (value) => {
  console.log('changed', value);
}

render(){
  return (
    <div>
        <InputNumber
          defaultValue={1000}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          onChange={this.onChange}
        />
        <InputNumber
          defaultValue={100}
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
          onChange={this.onChange}
        />
      </div>
  )
}
```
:::

## 超出边界
:::demo 当通过受控将 value 超出边界时，提供警告样式。
```js
state = {
  value: 100
}

setValue = (val) => {
  this.setState({
    value: val
  })
}

render() {
  const {value} = this.state;
  return(
    <div>
    <InputNumber min={1} max={10} value={value} onChange={this.setValue} />
      <Button
        type="primary"
        onClick={() => {
          this.setValue(100);
        }}
      >
        Reset
      </Button>
    </div>
  )
}

```
:::


## 前置/后置标签

:::demo 用于配置一些固定组合
```js
render() {
  const { Option } = Select;

  const selectBefore = (
    <Select defaultValue="add" className="select-before">
      <Option value="add">+</Option>
      <Option value="minus">-</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue="USD" className="select-after">
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  );

  return (
    <div>
      <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
      <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} defaultValue={100} />
      <InputNumber addonBefore={<Icon type="Settingx" />} defaultValue={100} />
      <InputNumber addonAfter={<Icon type="Settingx" />} defaultValue={100} />
    </div> 
  )
}

```
:::

<style>
.fishd-input-number-group-wrapper {
  margin: 0 10px 10px 0;
}

.select-before {
  width: 70px;
}

.select-after {
  width: 70px;
}
</style> 

## 无边框

:::demo 没有边框。

```js
render() {
  return <InputNumber min={1} max={10} defaultValue={3} bordered={false} />
}
```
:::

## 键盘行为

:::demo 使用 keyboard 属性可以控制键盘行为。
```js
state = {
  keyboard: false
}

setKeyboard = (val) => {
  this.setState({
    keyboard: val
  })
}

render() {
  const {keyboard} = this.state;
  return(
    <div>
    <InputNumber min={1} max={10} defaultValue={3} keyboard={keyboard} />
      <Checkbox
        onChange={() => {
          this.setKeyboard(!keyboard);
        }}
        checked={keyboard}
      >
        Toggle keyboard
      </Checkbox>
    </div>
  )
}
```  


:::


## API

属性如下

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签	| ReactNode | - |
| addonBefore | 带标签的 input，设置前置标签 | ReactNode | - |
| autoFocus | 自动获取焦点 | Boolean | false |
| bordered | 是否有边框	| boolean | true |
| className | 自定义类名 | String | - |
| controls | 是否显示增减按钮	| boolean | true |
| decimalSeparator | 小数点 | string | - |
| defaultValue | 初始值 | Number | - |
| disabled | 禁用 | Boolean | false |
| formatter | 指定输入框展示值的格式 | (value: Number \| String) => String | - |
| keyboard | 是否启用键盘快捷行为	| boolean | true |
| max | 最大值 | Number | Infinity |
| min | 最小值 | Number | -Infinity |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | (String) => Number | - |
| precision | 数值精度 | Number | - |
| readOnly | 只读	| boolean | false |
| size | 输入框大小 | String | - |
| step | 每次改变步数，可以为小数 | Number | String | 1 |
| stringMode | 字符值模式，开启后支持高精度小数。同时 onChange 将返回 string 类型	| boolean | false |
| style | 自定义样式 | Object | - |
| value | 当前值 | Number | - |
| onChange | 变化回调 | (value: Number \| String) =>  Void | - |
| onPressEnter | 按下回车的回调	| function(e) | - |
| onStep | 点击上下箭头的回调	| (value: number, info: { offset: number, type: 'up' | 'down' }) => void	| - |
| placeholder | 默认文字 | String | - |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
