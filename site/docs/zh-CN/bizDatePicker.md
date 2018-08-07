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
      <BizDatePicker
        className="my-date-picker-demo"
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
      <BizDatePicker
        className="my-date-picker-demo"
        onChange={this.handleTimeChange}
        disabled={true}
      />
    );
  }
```
:::


## 自定义快速选择时间

:::demo 使用`quickTimeOption`来自定义快速选择时间。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    const quickTimeOption = [
      { text: '今天', value: new Date() },
      { text: '昨天', value: new Date(new Date()-24*60*60*1000) },
      { text: '一周前', value: new Date(new Date()-7*24*60*60*1000) }
    ];
    return (
      <BizDatePicker
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
      { text: '今天', value: new Date() },
      { text: '昨天', value: new Date(new Date()-24*60*60*1000) },
      { text: '一周前', value: new Date(new Date()-7*24*60*60*1000) }
    ];
    return (
      <BizDatePicker
        quickTimeOption={quickTimeOption}
        defaultValue={quickTimeOption[1]}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

:::demo `defaultValue`支持两种格式。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    const quickTimeOption = [
      { text: '今天', value: new Date() },
      { text: '昨天', value: new Date(new Date()-24*60*60*1000) },
      { text: '一周前', value: new Date(new Date()-7*24*60*60*1000) }
    ];
    return (
      <BizDatePicker
        quickTimeOption={quickTimeOption}
        defaultValue={new Date()}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 不可选择的日期

:::demo 通过`disabledDate`设置不可选择的日期。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    return (
      <BizDatePicker
        disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::


## 增加选择时间功能

:::demo 通过设置`isShowTime`增加选择时间功能。注意：需要同时设置format.
```js

  handleTimeChange = (time) => {
    console.log(time);
  }

  render() {
    return (
      <BizDatePicker
        isShowTime={true}
        format="yyyy-MM-dd HH:mm:ss"
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 日期范围选择

:::demo 基本使用方式。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }
  
  render() {
    return (
      <BizDatePicker.BizDateRangePicker
        className="my-time-picker-demo"
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::

## 设置最大可选择的日期范围

:::demo 通过`maxDateRange`设置最大可选择的日期天数。
```js
  handleTimeChange = (time) => {
    console.log(time);
  }
  
  render() {
    return (
      <BizDatePicker.BizDateRangePicker
        className="my-time-picker-demo"
        onChange={this.handleTimeChange}
        maxDateRange={8}
      />
    );
  }
```
:::


## 公共API

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| className | 选择器 className | string | '' |
| open  | 用于手动控制浮层显隐    |  boolean   | false |
| disabled | 禁用 | boolean | false |
| onOpenChange | 弹出和关闭的回调 | function(status) | - |
| format | 时间日期格式化 | string | 年 `yyyy`，月 `MM`，日 `dd`，小时 `HH`，分 `mm`，秒 `ss` | yyyy-MM-dd |
| isShowTime | 是否显示时间选择器 | boolean | - |
| disabledDate | 不可选择的时间 | (Date, selectionMode)=>boolean | - |
| onChange  | 时间发生变化的回调   | function(value)   | - |

## BizDatePicker

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| quickTimeOption | 快速选择时间选项,格式参考默认值 | array |[{ text: '今天', value: new Date() },{ text: '昨天', value: new Date(new Date()-24 * 60 * 60 * 1000)}]|
| defaultValue  | 默认时间，支持两种格式，例如：`{ text: '今天', value: new Date() } ` 或 `Date `| object | quickTimeOption[0]   |
| value | 日期，支持两种格式, 同defaultValue | object | - |

## BizDateRangePicker

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| quickTimeOption | 快速选择时间选项,格式参考默认值 | array |[{ text: '今天', value: [new Date(new Date().setHours(0,0,0,0)), new Date(new Date().setHours(23,59,59,59))]},{text:'过去7天',value: [new Date(new Date().setHours(0,0,0,0)-7*24*60*60*1000), new Date(new Date().setHours(23,59,59,59))]}]|
| defaultValue  | 默认时间，支持两种格式，例如：`{ text: '今天', value: [Date,Date] } ` 或 `[Date,Date]`| object | quickTimeOption[0]   |
| value | 日期，支持两种格式, 同defaultValue | object | - |
| maxDateRange  | 最大可选择的日期范围，单位 天    | number   | null   |
| rangeSeparator | 分隔符 | string | - | '至' |

