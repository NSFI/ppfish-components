# 自定义时间选择器

快速时间选择与日期选择的组合组件

## 何时使用

当需要能快速选择时间段，同时能进行日期选择时，可以用自定义时间选择器

## 基本使用

:::demo 基本使用方式。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }
  
  render() {
    return (
      <BizTimePicker
        format='YYYY-MM-DD'
        className="my-time-picker-demo"
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 禁用

:::demo 通过设置 `disabled` 为 `true` 禁用组件。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }
  
  render() {
    return (
      <BizTimePicker
        className="my-time-picker-demo"
        onChange={this.handleTimeChange}
        disabled={true}
      />
    );
  }
```
:::

## 自定义点击区域的样式

:::demo 使用`clickAreaStyle`来自定义点击区域的样式。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }
  
  render() {
    return (
      <BizTimePicker
        clickAreaStyle={{boxShadow:"none",border:"1px solid #d4d6d9"}}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 自定义快速选择时间

:::demo 使用`quickTimeOption`来自定义快速选择时间。注意：`value`必须为[moment](http://momentjs.cn/docs/#/displaying/format/)数组，代表快速选择时间的[startTime, endTime]
```js
  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    const quickTimeOption = [
      { text: '今天', value: [moment(), moment()]},
      { text: '过去7天', value: [moment().subtract(7, 'days'), moment()] },
      { text: '过去30天', value: [moment().subtract(30, 'days'), moment()] }
    ];
    return (
      <BizTimePicker
        clickAreaStyle={{boxShadow:"none",border:"1px solid #d4d6d9"}}
        quickTimeOption={quickTimeOption}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 设置默认时间

:::demo `defaultValue`用来设置默认时间。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    const quickTimeOption = [
      { text: '今天', value: [moment(), moment()]},
      { text: '过去7天', value: [moment().subtract(7, 'days'), moment()] },
      { text: '过去30天', value: [moment().subtract(30, 'days'), moment()] }
    ];
    return (
      <BizTimePicker
        clickAreaStyle={{boxShadow:"none",border:"1px solid #d4d6d9"}}
        quickTimeOption={quickTimeOption}
        defaultValue={quickTimeOption[1]}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

:::demo `defaultValue`支持两种格式，数组或对象。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    const quickTimeOption = [
      { text: '今天', value: [moment(), moment()]},
      { text: '过去7天', value: [moment().subtract(7, 'days'), moment()] },
      { text: '过去30天', value: [moment().subtract(30, 'days'), moment()] }
    ];
    return (
      <BizTimePicker
        clickAreaStyle={{boxShadow:"none",border:"1px solid #d4d6d9"}}
        quickTimeOption={quickTimeOption}
        defaultValue={[moment().subtract(7, 'days'), moment()]}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 设置最大可选择的日期范围

:::demo `maxDateRange`用来设置最大可选择的日期范围。当选择范围超过设置值时，将会报错提示。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    return (
      <BizTimePicker
        maxDateRange={31}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 手动控制浮层显隐

:::demo 通过设置`open`手动控制浮层显隐。
```js
  
  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    return (
      <BizTimePicker
        onChange={this.handleTimeChange}
        open={true}
      />
    );
  }
```
:::

## 不可选择的日期

:::demo 通过`disabledDate`设置不可选择的日期。
```js
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    return (
      <BizTimePicker
        disabledDate={this.disabledDate}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 额外的页脚

:::demo 在日历面板中加入额外的页脚，以满足某些定制信息的需求。
```js

  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    return (
      <BizTimePicker
        renderExtraFooter={() => 'extra footer'} 
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 增加选择时间功能

:::demo 增加选择时间功能，当 showTime 为一个对象时，其属性会传递给内建的 [TimePicker](https://nsfi.github.io/ppfish-components/#/components/timePicker)。
```js

  handleTimeChange = (time) => {
    console.log(time);
  }
  
  handleOk = (value) => {
    console.log('onOk: ', value);
  }

  render() {
    return (
      <BizTimePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={this.handleTimeChange}
        onOk={this.handleOk}
      />
    );
  }
```
:::

## API

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| className | 选择器 className | string | '' |
| clickAreaStyle  | 点击区域的样式    | object  | - |
| quickTimeOption | 快速选择时间选项,格式参考默认值（注意`value`必须为`moment`对象数组） | array | [text: '今天', value: [moment(), moment()] ,text: '这个月', value: [moment(), moment().endOf('month')]]|
| defaultValue  | 默认时间，支持两种格式，例如：`{ text: '今天', value: [moment(), moment()] } ` 或 `[moment(), moment()] `| moment[]/object   | quickTimeOption[0]   |
| value | 日期，支持两种格式, 例如：`{ text: '今天', value: [moment(), moment()] } ` 或 `[moment(), moment()] ` | moment[]/object | - |
| open  | 用于手动控制浮层显隐    |  boolean   | false   |
| disabled | 禁用 | boolean | false |
| maxDateRange  | 最大可选择的日期范围，单位 天    | number   | null   |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | - |
| onChange  | 时间发生变化的回调   | function(value)   | - |
| onOpenChange | 弹出和关闭的回调 | function(status) | - |

## 自定义时间 RangePicker API

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| disabledDate | 不可选择的时间 | function(dates: moment, moment, partial: 'start' 'end') | - |
| format | 展示的日期格式 | string | "YYYY/MM/DD" | 
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| showTime | 增加时间选择功能 | Object/boolean | - |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒 | moment[] | moment(), moment() |
| onOk  | 点击确定按钮的回调    | function()  | - |

