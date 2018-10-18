# TimePicker 时间选择器 【交互：蒋蕊遥 |视觉：徐剑杰 |开发：王晓玲】

用于选择或输入时间

## 何时使用

用于选择时间点或通过两个时间点面板控制一段时间；多用于表单输入、筛选等场景；

## 选择固定时间点
提供几个固定的时间点供用户选择。

:::demo 使用 `TimeSelect` 标签，分别通过`star`、`end`和`step`指定可选的起始时间、结束时间和步长
```js  
  handleUpdate = (value) => {
    console.debug('time-select update: ', value)
  }
  
  handleFocus = (value) => {
    console.log('time-select focus: ', value)
  }
  
  onBlur = (value) => {
    console.log('time-select blur: ', value)
  }
  
  render() {
    return (
      <TimePicker.TimeSelect
        style={{width: 144}}
        start="08:30"
        step="00:15"
        end="18:30"
        maxTime="12:30"
        placeholder="请选择时间"
        onChange={this.handleUpdate}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        />
    )
  }
```
:::

## 选择固定时间点的禁用状态

:::demo 通过设置 `disabled` 为 `true` 禁用整个选择框
```js  
  render() {
    return (
      <TimePicker.TimeSelect
        style={{width: 144}}
        disabled={true}
        placeholder="请选择时间"
        />
    )
  }
```
:::

## 选择任意时间点

:::demo 使用 `TimePicker` 标签
```js
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }
  
  handleUpdate = (value) => {
    console.debug('time-picker update: ', value)
  }
  
  render() {
    return (
      <TimePicker
        style={{width: 144}}
        onChange={this.handleUpdate}
        selectableRange="18:30:00 - 20:30:00"
        placeholder="请选择时间"
        value={this.state.value}
        />
    )
  }
```
:::

## 带快捷操作的面板

:::demo 通过设置 `showCurrent`，控制是否显示 "此刻" 快捷操作按钮
```js
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(2016, 9, 10, 18, 40)
    }
  }
  
  handleUpdate = (value) => {
    console.debug('time-picker update: ', value)
  }
  
  render() {
    return (
      <TimePicker
        style={{width: 144}}
        showCurrent={true}
        onChange={this.handleUpdate}
        placeholder="请选择时间"
        value={this.state.value}
        />
    )
  }
```
:::

## 选择任意时间点的禁用状态

:::demo 通过设置 `disabled` 为 `true` 禁用整个选择框
```js  
  render() {
    return (
      <TimePicker
        style={{width: 144}}
        disabled={true}
        placeholder="请选择时间"
        />
    )
  }
```
:::

## 时间精度

:::demo 通过设置 `format`，控制不同的时间精度
```js
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(2016, 9, 10, 18, 40)
    }
  }
  
  handleUpdate = (value) => {
    console.debug('time-picker update: ', value)
  }
  
  render() {
    return (
      <TimePicker
        style={{width: 144}}
        onChange={this.handleUpdate}
        selectableRange="18:30:00 - 20:30:00"
        placeholder="请选择时间"
        format="HH:mm"
        value={this.state.value}
        />
    )
  }
```
:::

## 额外的页脚
在浮层中加入额外的页脚，以满足某些定制信息的需求

:::demo
```js
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }
  
  handleUpdate = (value) => {
    console.debug('time-picker update: ', value)
  }
  
  render() {
    return (
      <TimePicker
        style={{width: 144}}
        onChange={this.handleUpdate}
        selectableRange="18:30:00 - 20:30:00"
        placeholder="请选择时间"
        value={this.state.value}
        onValueChange={(value) =>console.log('value changed: ', value)}
        footer={() => '额外的页脚信息'}
        />
    )
  }
```
:::


## API 公共参数
| 参数      | 说明          | 类型      | 默认值  |
|---------- |-------------- |---------- | -------- |
| className | 选择器的className | String | - |
| style | 选择框的样式 | Object | - |
| getPopupContainer | 弹框渲染父节点。默认渲染到 body 上，如果你遇到滚动定位问题，试试修改为滚动的区域，并相对其定位。| () =>ReactNode | () =>document.body |
| placeholder | 占位内容 | String | - |
| format | 时间格式化, 小时 HH，分 mm，秒 ss  | String | 'HH:mm:ss' |
| showTrigger | 是否显示前缀图标 | Boolean | true |
| allowClear | 是否显示清除按钮 | Boolean  | true |
| disabled | 是否禁用 | Boolean | false |
| onFocus | 聚焦时的回调 | (e) => Void | - |
| onBlur | 失焦时的回调 | (e) => Void | - |
| onChange | 确认选定的值时触发 | (value) => Void | - | - |
| onVisibleChange | 弹出或关闭弹窗的回调 | (status:Boolean) => Void | - |

## TimePicker
| 参数      | 说明          | 类型      | 默认值  |
|---------- |-------------- |---------- |-------- |
| showCurrent | 是否显示"现在"快捷按钮 | Boolean | false |
| value | 值 | Date | - |
| selectableRange | 可选时间段，例如<br>`'18:30:00 - 20:30:00'`<br>或者传入数组<br>`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | String \| Array<String> | - |
| footer | 在面板中添加额外的页脚 | () => ReactNode | - |
| onValueChange | 时、分、秒发生变化时的回调 | (date) => Void | - |

## TimePicker.TimeSelect
| 参数      | 说明          | 类型      |  默认值  |
|---------- |-------------- |---------- |-------- |
| value | 值 | Date | - |
| start | 开始时间 | String | '09:00' |
| end | 结束时间 | String | '18:00' |
| step | 间隔时间 | String | '00:30' |
| minTime | 最小时间 | String | - |
| maxTime | 最大时间 | String | - |

