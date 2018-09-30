# InputNumber 数字输入框 【交互：刘莹莹 | 视觉：徐剑杰 |开发：卿泽】

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。


## 数字输入框
:::demo

```js
onChange = (value) =>{
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

onChange = (value) =>{
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
```
:::

## 小数

:::demo 和原生的数字输入框一样，value 的精度由 step 的小数位数决定。

```js
onChange = (value) =>{
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
onChange = (value) =>{
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

## API

属性如下

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | Boolean | false |
| defaultValue | 初始值 | Number | - |
| disabled | 禁用 | Boolean | false |
| formatter | 指定输入框展示值的格式 | (value: Number \| String) => String | - |
| max | 最大值 | Number | Infinity |
| min | 最小值 | Number | -Infinity |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | (String) => Number | - |
| precision | 数值精度 | Number | - |
| size | 输入框大小 | String | - |
| step | 每次改变步数，可以为小数 | Number\|String | 1 |
| value | 当前值 | Number | - |
| onChange | 变化回调 | (value: Number \| String) =>  Void | - |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
