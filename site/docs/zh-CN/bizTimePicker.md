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
        clickAreaStyle={{boxShadow:"none",border:"1px solid #d4d6d9"}}
        onChange={this.handleTimeChange}
      />
    );
  }
```
:::




## API
| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| clickAreaStyle  | 点击区域的样式    | object  | - |
| defaultTime  | 默认时间，支持两种格式，例如：{ text: '昨天', value: 1, endDate: '昨天' } 或 [startTime, endTime] | array/object   | quickTimeOption[0]   |
| quickTimeOption | 快速选择时间选项（格式见默认值：text代表显示文本，endDate代表结束日期，可选择的有"今天"、"昨天"、"前天"，value代表到结束日期的天数） | array | [{ text: '昨天', value: 1, endDate: '昨天' },{ text: '过去7天', value: 7, endDate: '昨天' },{ text: '过去30天', value: 30, endDate: '昨天' }]|
| maxDateRange  | 最大可选择的日期范围，单位 天    | number   | null   |
| dateFormat  | 日期展示格式 | string   | "YYYY/MM/DD"   |
| allowClear  | 	是否显示日历的清除按钮    | bool   | false   |
| visible  | 用于手动控制浮层显隐    | bool   | false   |
| disabledDate  | 不可选择的日期    | (currentDate: moment) => boolean   | - |
| onChange  | 时间发生变化的回调   | function([startTime,endTime], quickTimeOptionItem)   | - |
| onOpenChange  | 弹出或关闭浮层的回调 | function(status)   | - |

