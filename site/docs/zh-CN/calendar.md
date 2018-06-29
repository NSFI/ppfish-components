# 日历

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

## 基本

:::demo 一个通用的日历面板，支持年/月切换。


```js
onPanelChange=(value, mode)=> {
  console.log(value, mode);
}

render(){
  return(<Calendar onPanelChange={this.onPanelChange} />)
}
```
:::

## 卡片模式

:::demo 用于嵌套在空间有限的容器中。

```js

onPanelChange=(value, mode)=> {
  console.log(value, mode);
};

render(){
  return(
  <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
    <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
  </div>
  )
}
```
:::

## 通知事项日历

:::demo 一个复杂的应用示例，用 `dateCellRender` 和 `monthCellRender` 函数来自定义需要渲染的数据。

```js
getListData=(value)=> {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ]; break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ]; break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ]; break;
    default:
  }
  return listData || [];
};

dateCellRender=(value)=> {
  const listData = this.getListData(value);
  return (
    <ul className="events">
      {
        listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))
      }
    </ul>
  );
};

getMonthData=(value)=> {
  if (value.month() === 8) {
    return 1394;
  }
};

monthCellRender=(value)=> {
  const num = this.getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

render(){
  return(<Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />)
}
```
:::

<style>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>

## 选择功能

:::demo 一个通用的日历面板，支持年/月切换。

```js
  state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
  }

  onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  }

  onPanelChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} />
        <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
      </div>
    );
  }
```
:::

## API

**注意：**Calendar 部分 locale 是从 value 中读取，所以请先正确设置 moment 的 locale。

```js
// 默认语言为 en-US，所以如果需要使用其他语言，推荐在入口文件全局设置 locale
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

<Calendar
  dateCellRender={dateCellRender}
  monthCellRender={monthCellRender}
  onPanelChange={onPanelChange}
  onSelect={onSelect}
/>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dateCellRender | 自定义渲染日期单元格，返回内容会被追加到单元格 | function(date: moment): ReactNode | 无 |
| dateFullCellRender | 自定义渲染日期单元格，返回内容覆盖单元格 | function(date: moment): ReactNode | 无 |
| defaultValue | 默认展示的日期 | [moment](http://momentjs.com/) | 默认日期 |
| disabledDate | 不可选择的日期 | (currentDate: moment) => boolean | 无 |
| fullscreen | 是否全屏显示 | boolean | true |
| locale | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |
| mode | 初始模式，`month/year` | string | month |
| monthCellRender | 自定义渲染月单元格，返回内容会被追加到单元格 | function(date: moment): ReactNode | 无 |
| monthFullCellRender | 自定义渲染月单元格，返回内容覆盖单元格 | function(date: moment): ReactNode | 无 |
| validRange | 设置可以显示的日期 | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)] | 无 |
| value | 展示日期 | [moment](http://momentjs.com/) | 当前日期 |
| onPanelChange | 日期面板变化回调 | function(date: moment, mode: string) | 无 |
| onSelect | 点击选择日期回调 | function(date: moment） | 无 |
