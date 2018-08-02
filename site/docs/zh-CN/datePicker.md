# DatePicker 日期选择器

用于选择某个日期、日期范围、某个日期的具体时间点、日期时间点范围；多用于表单输入、筛选等场景。

## 日期选择

以「日」为基本单位，基础的日期选择控件

:::demo 基本单位由`type`属性指定。

```js

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleValueChange = (date) => {
    console.debug('DatePicker changed: ', date)
    this.setState({value: date})
  }
  
  render() {
    const {value} = this.state;
  
    return (
      <DatePicker
        value={value}
        placeholder="请选择日期"
        onChange={this.handleValueChange}
        />
    )
  }

```
:::

## 禁用

:::demo 通过设置 `isDisabled` 为 `true` 禁用选择框 

```js
  
  render() {
    return (
      <DatePicker
         placeholder="请选择日期"
         isDisabled={true}
        />
    )
  }

```
:::

## 不可选择的日期

:::demo 禁用日期通过 `disabledDate` 设置，传入函数

```js

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleValueChange = (date) => {
    console.debug('DatePicker changed: ', date)
    this.setState({value: date})
  }
  
  render() {
    const {value} = this.state;
  
    return (
      <DatePicker
        value={value}
        placeholder="请选择日期"
        onChange={this.handleValueChange}
        disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
        />
    )
  }

```
:::

## 选择周

:::demo 通过 `selectionMode` 设置不同的日期单位
```js

constructor(props) {
  super(props);
  this.state = {};
}

render() {
  const {value1} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">周</span>
        <DatePicker
          value={value1}
          placeholder="选择周"
          onChange={date=>{
            console.debug('week DatePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          format="yyyy 第 WW 周"
          selectionMode="week"
          />
      </div>
    </div>
  )
}
```
:::

## 带快捷选项的日期面板

当展示结果关注绝对时间、且快捷选项较多时使用。快捷选项不建议太多。

:::demo 快捷选项需配置 `shortcuts`

```js

constructor(props) {
  super(props)
  this.state = {}
}

render() {
  const {value2} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">带快捷选项</span>
        <DatePicker
          ref={e=>this.datepicker2 = e}
          value={value2}
          align="left"
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker2 changed: ', date)
            this.setState({value2: date})

          }}
          shortcuts={[{
            text: '今天',
            onClick: (picker)=> {
              this.setState({value2: new Date()})
              this.datepicker2.togglePickerVisible()
            }
          }, {
            text: '昨天',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              this.setState({value2: date})
              this.datepicker2.togglePickerVisible()
            }
          }, {
            text: '一周前',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              this.setState({value2: date})
              this.datepicker2.togglePickerVisible()
            }
          }]}
          />
      </div>
    </div>
  )
}

```
:::

## 带时间的日期面板

:::demo 通过设置`isShowTime`，即可在同一个选择器里同时进行日期和时间的选择。快捷选项的使用方法与 Date Picker 相同。
```js

constructor(props) {
  super(props)
  this.state = {}
}

render() {
  const {value1, value2} = this.state

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">默认</span>
        <DatePicker
          value={value1}
          isShowTime={true}
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
          />
      </div>
      <div className="block">
        <span className="demonstration">带快捷选项</span>
        <DatePicker
          ref={e=>this.datepicker2 = e}
          isShowTime={true}
          value={value2}
          align="left"
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker2 changed: ', date)
            this.setState({value2: date})

          }}
          shortcuts={[{
            text: '今天',
            onClick: (picker)=> {
              this.setState({value2: new Date()})
              this.datepicker2.togglePickerVisible()
            }
          }, {
            text: '昨天',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              this.setState({value2: date})
              this.datepicker2.togglePickerVisible()
            }
          }, {
            text: '一周前',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              this.setState({value2: date})
              this.datepicker2.togglePickerVisible()
            }
          }]}
          />
      </div>
    </div>
  )
}

```
:::

## 日期范围选择器

可在一个选择器中便捷地选择一个日期范围

:::demo
```js
constructor(props) {
  super(props);
  this.state = {value: null};
}

render() {
  const {value} = this.state;

  return (
    <DateRangePicker
      value={value}
      startPlaceholder="请选择开始日期"
      endPlaceholder="请选择结束日期"
      onChange={date=>{
        console.debug('DateRangePicker changed: ', date)
        this.setState({value: date})
      }}
      />
  )
}

```
:::

禁用

:::demo
```js

render() {

  return (
    <DateRangePicker
      isDisabled={true}
      />
  )
}

```
:::

## 带快速选择的日期范围面板

:::demo
```js
constructor(props) {
  super(props);
  this.state = {value2: null}
}

render() {
  const {value2} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">带快捷选项</span>
        <DateRangePicker
          value={value2}
          placeholder="选择日期范围"
          align="left"
          ref={e=>this.daterangepicker2 = e}
          onChange={date=>{
            console.debug('DateRangePicker2 changed: ', date)
            this.setState({value2: date})
          }}
          shortcuts={[{
            text: '最近一周',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: '最近一个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: '最近三个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }]}
          />
      </div>
    </div>
  )
}

```
:::


## 带时间的日期范围面板

:::demo 可在一个选择器中便捷地选择一个日期范围和时间范围
```js
constructor(props) {
  super(props);
  this.state = {value1: null, value2: null}
}

render() {
  const {value1, value2} = this.state

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">默认</span>
        <DateRangePicker
          format="yyyy-MM-dd HH:mm:ss"
          value={value1}
          placeholder="选择日期范围"
          isShowTime={true}
          onChange={date=>{
            console.debug('DateRangePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">带快捷选项</span>
        <DateRangePicker
          value={value2}
          isShowTime={true}
          placeholder="选择日期范围"
          align="left"
          ref={e=>this.daterangepicker2 = e}
          onChange={date=>{
            console.debug('DateRangePicker2 changed: ', date)
            this.setState({value2: date})
          }}
          shortcuts={[{
            text: '最近一周',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: '最近一个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }, {
            text: '最近三个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              this.setState({value2: [start, end]})
              this.daterangepicker2.togglePickerVisible()
            }
          }]}
          />
      </div>
    </div>
  )
}

```
:::


## API 公共参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| format | 时间日期格式化 | string | 年 `yyyy`，月 `MM`，日 `dd`，小时 `HH`，分 `mm`，秒 `ss` | yyyy-MM-dd |
| align | 对齐方式 | string | 'left', 'right' | 'left' |
| isShowTrigger | 是否显示前缀图标 | boolean | - | true |
| isAllowClear | 是否显示清除按钮 | boolean | - | true |
| isDisabled | 是否禁用 | boolean | - | false |
| isShowTime | 是否显示时间选择器 | boolean | - | false |
| disabledDate | 禁用日期 | (Date, selectionMode)=>boolean | - | - |
| value | - | Date/null/[Date,Date] | — | - |
| firstDayOfWeek | 周起始日 | Number | 0 到 6 | 0 |
| shortcuts | 快捷选项 | {text: string, onClick: ()=>()}[] | - | - |
| shortcutsPlacement | 快捷选项的位置 | string | 'left', 'top' | 'left' |
| showWeekNumber | 是否展示周数 | boolean | - | false |
| onFocus | focus 事件触发 | (SyntheticEvent)=>() | - | - |
| onBlur | blur 事件触发 | (SyntheticEvent)=>() | - | - |
| onChange | 确认选定的值时触发 | func:(value)=>() | - | - |

## DatePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| placeholder | 占位内容 | string | - | - |
| selectionMode | 日期类型 | string, one of ['week', 'day'] | - | 'day' |

## DateRangePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| startPlaceholder | 开始日期的占位内容 | string | - | '选择开始日期' |
| endPlaceholder | 结束日期的占位内容 | string | - | '选择结束日期' |
| rangeSeparator | 分隔符 | string | - | ' 至 ' |
