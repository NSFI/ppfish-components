# 日期选择器

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 基本

:::demo 最简单的用法，在浮层中可以选择或者输入日期。

```js

onChange=(date, dateString)=> {
  console.log(date, dateString);
}

render(){
  const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
  return(
      <div className="code-box-demo">
       <DatePicker onChange={this.onChange} />
        <br />
        <MonthPicker onChange={this.onChange} placeholder="Select month" />
        <br />
        <RangePicker onChange={this.onChange} />
        <br />
        <WeekPicker onChange={this.onChange} placeholder="Select week" />
      </div>
  )
}
```
:::

## 日期格式

:::demo 使用 `format` 属性，可以自定义日期显示格式。

```js
render(){
  const { MonthPicker, RangePicker } = DatePicker;
  const dateFormat = 'YYYY/MM/DD';
  const monthFormat = 'YYYY/MM';
  return(
  <div className="code-box-demo">
    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
    <br />
    <MonthPicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} />
    <br />
    <RangePicker
      defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
  </div>)
 }
```
:::

## 三种大小

:::demo 三种大小的输入框，若不设置，则为 `default`。


```js
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { size } = this.state;
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    return (
      <div className="code-box-demo">
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br /><br />
        <DatePicker size={size} />
        <br />
        <MonthPicker size={size} placeholder="Select Month" />
        <br />
        <RangePicker size={size} />
        <br />
        <WeekPicker size={size} placeholder="Select Week" />
      </div>
    );
  }
```
:::

## 日期时间选择

:::demo 增加选择时间功能，当 `showTime` 为一个对象时，其属性会传递给内建的 `TimePicker`。

```js
onChange=(value, dateString)=> {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

onOk=(value)=> {
  console.log('onOk: ', value);
};

render(){
  const { RangePicker } = DatePicker;
  return(
    <div className="code-box-demo">
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
          onChange={this.onChange}
          onOk={this.onOk}
        />
        <br />
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['Start Time', 'End Time']}
          onChange={this.onChange}
          onOk={this.onOk}
        />
      </div>
  )
}
```
:::

## 禁用

:::demo 选择框的不可用状态。

```js

render(){
  const { MonthPicker, RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  return(
  <div className="code-box-demo">
    <DatePicker defaultValue={moment('2015-06-06', dateFormat)} disabled />
    <br />
    <MonthPicker defaultValue={moment('2015-06', 'YYYY-MM')} disabled />
    <br />
    <RangePicker
      defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
      disabled
    />
  </div>)
}
```
:::

## 不可选择日期和时间

:::demo 可用 `disabledDate` 和 `disabledTime` 分别禁止选择部分日期和时间，其中 `disabledTime` 需要和 `showTime` 一起使用。

```js
range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
};

disabledDateTime = ()=> {
  return {
    disabledHours: () => this.range(0, 24).splice(4, 20),
    disabledMinutes: () => this.range(30, 60),
    disabledSeconds: () => [55, 56],
  };
};

disabledRangeTime = (_, type) => {
  if (type === 'start') {
    return {
      disabledHours: () => this.range(0, 60).splice(4, 20),
      disabledMinutes: () => this.range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => this.range(0, 60).splice(20, 4),
    disabledMinutes: () => this.range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

render(){
  const { MonthPicker, RangePicker } = DatePicker;
  return(
  <div className="code-box-demo">
    <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      disabledDate={this.disabledDate}
      disabledTime={this.disabledDateTime}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
    />
    <br />
    <MonthPicker disabledDate={this.disabledDate} placeholder="Select month" />
    <br />
    <RangePicker
      disabledDate={this.disabledDate}
      disabledTime={this.disabledRangeTime}
      showTime={{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
      }}
      format="YYYY-MM-DD HH:mm:ss"
    />
  </div>)
}
```
:::

## 自定义日期范围选择

:::demo 当 `RangePicker` 无法满足业务需求时，可以使用两个 `DatePicker` 实现类似的功能。
> * 通过设置 `disabledDate` 方法，来约束开始和结束日期。
> * 通过 `open` `onOpenChange` 来优化交互。

```js
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div className="code-box-demo">
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    );
  }
```
:::

## 预设范围

:::demo RangePicker 可以设置常用的 预设范围 提高用户体验。

```js

onChange=(dates, dateStrings)=> {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
};

render(){
  const RangePicker = DatePicker.RangePicker;
  return(
  <div className="code-box-demo">
    <RangePicker
      ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
      onChange={this.onChange}
    />
    <br />
    <RangePicker
      ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={this.onChange}
    />
  </div>)
}
```
:::

## 额外的页脚

:::demo 在浮层中加入额外的页脚，以满足某些定制信息的需求。

```js
render(){
  const { RangePicker, MonthPicker } = DatePicker;
  return(
    <div className="code-box-demo">
        <DatePicker renderExtraFooter={() => 'extra footer'} />
        <DatePicker renderExtraFooter={() => 'extra footer'} showTime />
        <RangePicker renderExtraFooter={() => 'extra footer'} />
        <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
        <MonthPicker renderExtraFooter={() => 'extra footer'} placeholder="Select month" />
    </div>
  )
}
```
:::

## 受控面板

:::demo 通过组合 `mode` 与 `onPanelChange` 控制要展示的面板。

```js
  state = {
    mode: ['month', 'month'],
    modeDatePicker:'time',
    value: [],
  };

  handlePanelChange = (value, mode) => {
    this.setState({
      value,
      mode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  };

  handleOpenChange = (open) => {
    if (open) {
      this.setState({ modeDatePicker: 'time' });
    }
  };

  handleDatePanelChange = (value, modeDatePicker) => {
    this.setState({ modeDatePicker });
  };
  
  render() {
    const { value, mode, modeDatePicker } = this.state;
    const { RangePicker } = DatePicker;
    return (
      <div className="code-box-demo">
      <DatePicker
        mode={modeDatePicker}
        showTime
        onOpenChange={this.handleOpenChange}
        onPanelChange={this.handleDatePanelChange}
      />
      <br />
      <RangePicker
         placeholder={['Start month', 'End month']}
         format="YYYY-MM"
         value={value}
         mode={mode}
         onPanelChange={this.handlePanelChange}
      />
      </div>
    );
  }
```
:::

## 定制日期单元格

:::demo 使用 `dateRender` 可以自定义日期单元格的内容和样式。

```js
render(){
  const { RangePicker } = DatePicker;
  return(
  <div className="code-box-demo">
    <DatePicker
      dateRender={(current) => {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-calendar-date" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
    <RangePicker
      dateRender={(current) => {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-calendar-date" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
  </div>)
}
```
:::

## API

日期类组件包括以下四种形式。

- DatePicker
- MonthPicker
- RangePicker
- WeekPicker

### 国际化配置

默认配置为 en-US，如果你需要设置其他语言，推荐在入口处使用我们提供的国际化组件,详见：[LocaleProvider国际化](http://ant.design/components/locale-provider-cn/)。

如有特殊需求（仅修改单一组件的语言），请使用 locale 参数，参考：[默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)。

```js
import locale from 'antd/lib/date-picker/locale/zh_CN';

<DatePicker locale={locale} />
```

**注意：**DatePicker、MonthPicker、RangePicker、WeekPicker 部分 locale 是从 value 中读取，所以请先正确设置 moment 的 locale。

```js
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/src/locale/zh-cn';
// import 'moment/locale/zh-cn'; if you are using webpack 1

<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
```

### 共同的 API

以下 API 为 DatePicker、MonthPicker、RangePicker, WeekPicker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | boolean | true |
| autoFocus | 自动获取焦点 | boolean | false |
| className | 选择器 className | string | '' |
| dateRender | 自定义日期单元格的内容 | function(currentDate: moment, today: moment) => React.ReactNode | - |
| disabled | 禁用 | boolean | false |
| disabledDate | 不可选择的日期 | (currentDate: moment) => boolean | 无 |
| dropdownClassName | 额外的弹出日历 className | string | - |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |
| locale | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |
| open | 控制弹层是否展开 | boolean | - |
| placeholder | 输入框提示文字 | string\|RangePicker\[] | - |
| popupStyle | 额外的弹出日历样式 | object | {} |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | string | 无 |
| style | 自定义输入框样式 | object | {} |
| onOpenChange | 弹出日历和关闭日历的回调 | function(status) | 无 |

### 共同的方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| disabledTime | 不可选择的时间 | function(date) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-MM-DD" |
| mode | 日期面板的状态 | `time|date|month|year` | 'date' |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker/#API) |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/) | moment() |
| showToday | 是否展示“今天”按钮 | boolean | true |
| value | 日期 | [moment](http://momentjs.com/) | 无 |
| onChange | 时间发生变化的回调 | function(date: moment, dateString: string) | 无 |
| onOk | 点击确定按钮的回调 | function() | - |
| onPanelChange | 日期面板变化时的回调 | function(value, mode) | - |

### MonthPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-MM" |
| monthCellContentRender | 自定义的月份内容渲染方法 | function(date, locale): ReactNode | - |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| value | 日期 | [moment](http://momentjs.com/) | 无 |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | - |

### WeekPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | - |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-wo" |
| value | 日期 | [moment](http://momentjs.com/) | - |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | - |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/)\[] | 无 |
| disabledTime | 不可选择的时间 | function(dates: [moment, moment], partial: `'start'|'end'`) | 无 |
| format | 展示的日期格式 | string | "YYYY-MM-DD HH:mm:ss" |
| ranges       | 预设时间范围快捷选择 | { \[range: string]: [moment](http://momentjs.com/)\[] } \| () => { \[range: string]: [moment](http://momentjs.com/)\[] } | 无 |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker/#API) |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/)\[] | [moment(), moment()] |
| value | 日期 | [moment](http://momentjs.com/)\[] | 无 |
| onCalendarChange | 待选日期发生变化的回调 | function(dates: [moment, moment], dateStrings: [string, string]) | 无 |
| onChange | 日期范围发生变化的回调 | function(dates: [moment, moment], dateStrings: [string, string]) | 无 |
| onOk | 点击确定按钮的回调 | function() | - |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
