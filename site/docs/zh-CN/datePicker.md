# DatePicker 日期选择器

用于选择某个日期、日期范围、某个日期的具体时间点、日期时间点范围；多用于表单输入、筛选等场景。

## 日期选择器

:::demo 基础的日期选择控件。

```js

  constructor(props) {
    super(props);
    this.state = {
      value1: null,
      value2: new Date()
    };
  }
  
  render() {
    const {value1, value2} = this.state;
  
    return (
      <div className="source">
        <div className="block">
          <span className="demonstration">基本使用</span>
          <DatePicker
            style={{width: 300}}
            value={value1}
            onChange={date=>{
              console.debug('DatePicker1 changed: ', date)
              this.setState({value1: date})
            }}
            />
        </div>
        <div className="block">
          <span className="demonstration">设置默认时间</span>
          <DatePicker
            style={{width: 300}}
            value={value2}
            placeholder="请选择日期"
            onChange={date=>{
              console.debug('DatePicker2 changed: ', date)
              this.setState({value2: date})
            }}
            />
        </div>
      </div>
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
         style={{width: 300}}
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
        style={{width: 300}}
        value={value}
        placeholder="请选择日期"
        onChange={this.handleValueChange}
        disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
      />
    )
  }

```
:::

## 日期选择器额外的页脚
在浮层中加入额外的页脚，以满足某些定制信息的需求

:::demo

```js

  constructor(props) {
    super(props);
    this.state = {};
  }
 
  render() {
    const {value1, value2} = this.state;
  
    return (
      <div className="source">
        <div className="block">
          <span className="demonstration">基本使用</span>
          <DatePicker
            style={{width: 300}}
            value={value1}
            placeholder="请选择日期"
            onChange={date=>{
              console.debug('DatePicker1 changed: ', date)
              this.setState({value1: date})
  
            }}
            renderExtraFooter={() => '额外的页脚信息'}
          />
        </div>
        <div className="block">
          <span className="demonstration">额外的页脚中设置快捷选项</span>
          <DatePicker
            ref={e=>this.datepicker2 = e}
            style={{width: 300}}
            value={value2}
            placeholder="请选择日期"
            onChange={date=>{
              console.debug('DatePicker2 changed: ', date)
              this.setState({value2: date})
            }}
            renderExtraFooter={() => {
              return (
                <div style={{marginLeft: 20}}>
                  <a onClick={()=>{
                    this.setState({value2: new Date()})
                    this.datepicker2.togglePickerVisible()
                  }}>今天</a>
                </div>
              )
            }}
          />
        </div>
      </div>
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
  const {value1, value2, value3} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">基本使用</span>
        <DatePicker
          style={{width: 300}}
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
      <div className="block">
        <span className="demonstration">选择结果格式化为日期范围</span>
        <DatePicker
          style={{width: 300}}
          value={value2}
          placeholder="选择周"
          onChange={date=>{
            console.debug('week DatePicker2 changed: ', date)
            this.setState({value2: date})
          }}
          format="yyyy-MM-dd"
          selectionMode="week"
          />
      </div>
      <div className="block">
        <span className="demonstration">显示周次</span>
        <DatePicker
          style={{width: 300}}
          value={value3}
          placeholder="选择周"
          onChange={date=>{
            console.debug('week DatePicker3 changed: ', date)
            this.setState({value3: date})
          }}
          format="yyyy 第 WW 周"
          selectionMode="week"
          showWeekNumber={true}
          />
      </div>
    </div>
  )
}
```
:::

## 带快捷选项的日期面板

当展示结果关注绝对时间、且快捷选项较多时使用。快捷选项不建议太多。

:::demo 快捷选项需配置 `shortcuts`。

```js

constructor(props) {
  super(props)
  this.state = {
    popupAlign: 'bottomLeft'
  }
}

handleChange = (value) => {
  this.setState({
    popupAlign: value
  })
}

render() {
  const {value1, value2, popupAlign} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">基本使用</span>
        <DatePicker
          style={{width: 300}}
          ref={e=>this.datepicker1 = e}
          value={value1}
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker1 changed: ', date)
            this.setState({value1: date})

          }}
          shortcuts={[{
            text: '今天',
            onClick: (picker)=> {
              this.setState({value1: new Date()})
              this.datepicker1.togglePickerVisible()
            }
          }, {
            text: '昨天',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              this.setState({value1: date})
              this.datepicker1.togglePickerVisible()
            }
          }, {
            text: '一周前',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              this.setState({value1: date})
              this.datepicker1.togglePickerVisible()
            }
          }]}
          />
      </div>
      <div className="block">
        <span className="demonstration">定义面板展开位置</span>
        <span className="demonstration">
          <Select style={{width: 150}} onChange={this.handleChange} placeholder="请选择位置">
            <Select.Option key={"bottomLeft"}>{'bottomLeft'}</Select.Option>
            <Select.Option key={"bottomCenter"}>{'bottomCenter'}</Select.Option>
            <Select.Option key={"bottomRight"}>{'bottomRight'}</Select.Option>
            <Select.Option key={"topLeft"}>{'topLeft'}</Select.Option>
            <Select.Option key={"topCenter"}>{'topCenter'}</Select.Option>
            <Select.Option key={"topRight"}>{'topRight'}</Select.Option>
          </Select>
        </span>
        <DatePicker
          style={{width: 300}}
          ref={e=>this.datepicker2 = e}
          value={value2}
          placeholder="选择日期"
          popupAlign={popupAlign}
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

:::demo 
通过设置`isShowTime`，即可在同一个选择器里同时进行日期和时间的选择。
`defaultTimeValue`用来设置默认时间；
`isShowTimeCurrent`用来设置是否展示时间面板的"现在"快捷选项；
`timeSelectableRange`设置可选择的时间范围；


```js

constructor(props) {
  super(props);
  this.state = {
    value1: null,
    value2: null,
    value3: null,
    value4: null,
    value5: null,
  }
  this.defaultTimeValue = new Date(new Date().setHours(0,0,0,0))
}

render() {
  const {value1, value2, value3, value4, value5} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">默认</span>
        <DatePicker
          style={{width: 310}}
          value={value1}
          isShowTime={true}
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">设置时间面板的默认时间</span>
        <DatePicker
          style={{width: 310}}
          value={value2}
          defaultTimeValue={this.defaultTimeValue}
          isShowTime={true}
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker2 changed: ', date)
            this.setState({value2: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">展示时间面板的"现在"快捷选项</span>
        <DatePicker
          style={{width: 310}}
          value={value3}
          isShowTimeCurrent={true}
          isShowTime={true}
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker3 changed: ', date)
            this.setState({value3: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">设置时间面板的可选时间范围</span>
        <DatePicker
          style={{width: 310}}
          value={value4}
          timeSelectableRange="18:30:00 - 20:30:00"
          isShowTime={true}
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker4 changed: ', date)
            this.setState({value4: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">带快捷选项的日期时间面板</span>
        <DatePicker
          ref={e=>this.datepicker5 = e}
          style={{width: 310}}
          isShowTime={true}
          value={value5}
          align="left"
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker5 changed: ', date)
            this.setState({value5: date})

          }}
          shortcuts={[{
            text: '今天',
            onClick: (picker)=> {
              this.setState({value5: new Date()})
              this.datepicker5.togglePickerVisible()
            }
          }, {
            text: '昨天',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              this.setState({value5: date})
              this.datepicker5.togglePickerVisible()
            }
          }, {
            text: '一周前',
            onClick: (picker)=> {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              this.setState({value5: date})
              this.datepicker5.togglePickerVisible()
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
  this.state = {
    value1: null,
    value2: [new Date(), new Date()]
  };
}

render() {
  const {value1, value2} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">基本使用</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          value={value1}
          onChange={date=>{
            console.debug('DateRangePicker1 changed: ', date)
            this.setState({value1: date})
          }}
        />
      </div>
      <div className="block">
        <span className="demonstration">设置默认时间</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          value={value2}
          onChange={date=>{
            console.debug('DateRangePicker2 changed: ', date)
            this.setState({value2: date})
          }}
        />
      </div>
    </div>
  )
}

```
:::

## 禁用日期范围选择器

:::demo
```js

render() {

  return (
    <DatePicker.DateRangePicker
      style={{width: 400}}
      isDisabled={true}
      />
  )
}

```
:::


## 日期范围选择器额外的页脚
在浮层中加入额外的页脚

:::demo
```js
constructor(props) {
  super(props);
  this.state = {
    value1: null,
    value2: null
  };
}

render() {
  const {value1, value2} = this.state;

  return (
    <div className="source">
      <div className="block">
        <DatePicker.DateRangePicker
          style={{width: 400}}
          value={value1}
          onChange={date=>{
            console.debug('DateRangePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          renderExtraFooter={() => '额外的页脚信息'}
        />
      </div>
    </div>
  )
}

```
:::

## 设置最大可选时间范围

- 根据不同的业务需求，设置最大可选的时间范围
- 超过最大范围的错误信息展示形式可以自定义，如Message或额外的页脚

:::demo
```js
constructor(props) {
  super(props);
  this.state = {
    value1: null,
    value2: null,
    extraFoot: null
  };
}

render() {
  const {value1, value2, extraFoot} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">场景1：Message展示错误信息</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          value={value1}
          onChange={date=>{
            console.debug('DateRangePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          maxDateRange={7}
          onError={(msg) => {
            if(msg){
              message.error(msg)
              }
            }
          }
        />
      </div>
      <div className="block">
        <span className="demonstration">场景2：额外的页脚展示错误信息</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          value={value2}
          onChange={date=>{
            console.debug('DateRangePicker2 changed: ', date)
            this.setState({value2: date})
          }}
          maxDateRange={7}
          onError={(msg) => {
            this.setState({extraFoot: ()=> msg})
          }}
          renderExtraFooter={extraFoot}
          onOpenChange={(status)=> {
            this.setState({extraFoot: null})
          }}
        />
      </div>
    </div>
  )
}

```
:::

## 带快捷选项的日期范围面板

:::demo
```js
constructor(props) {
  super(props);
  this.state = {
    popupAlign: 'bottomLeft'
  }
}

handleChange = (value) => {
  this.setState({
    popupAlign: value
  })
}

render() {
  const {value1, value2, popupAlign} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">左侧自定义</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          value={value1}
          placeholder="选择日期范围"
          ref={e=>this.daterangepicker1 = e}
          onChange={date=>{
            console.debug('DateRangePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          shortcuts={[{
            text: '最近一周',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

              this.setState({value1: [start, end]})
              this.daterangepicker1.togglePickerVisible()
            }
          }, {
            text: '最近一个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

              this.setState({value1: [start, end]})
              this.daterangepicker1.togglePickerVisible()
            }
          }, {
            text: '最近三个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              this.setState({value1: [start, end]})
              this.daterangepicker1.togglePickerVisible()
            }
          }]}
          />
      </div>
      <div className="block">
        <span className="demonstration">定义面板展开位置</span>
        <span className="demonstration">
          <Select style={{width: 150}} onChange={this.handleChange} placeholder="请选择位置">
            <Select.Option key={"bottomLeft"}>{'bottomLeft'}</Select.Option>
            <Select.Option key={"bottomCenter"}>{'bottomCenter'}</Select.Option>
            <Select.Option key={"bottomRight"}>{'bottomRight'}</Select.Option>
            <Select.Option key={"topLeft"}>{'topLeft'}</Select.Option>
            <Select.Option key={"topCenter"}>{'topCenter'}</Select.Option>
            <Select.Option key={"topRight"}>{'topRight'}</Select.Option>
          </Select>
        </span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          value={value2}
          placeholder="选择日期范围"
          popupAlign={popupAlign}
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
  this.state = {
    value1: null, 
    value2: null,
    value3: null, 
    value4: null,
    value5: null
  }
  this.defaultStartTimeValue = new Date(new Date().setHours(0,0,0,0));
  this.defaultEndTimeValue = new Date(new Date().setHours(23,59,59,59));
}

render() {
  const {value1, value2, value3, value4, value5} = this.state;

  return (
    <div className="source">
      <div className="block">
        <span className="demonstration">默认</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
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
        <span className="demonstration">设置默认时间</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          format="yyyy-MM-dd HH:mm:ss"
          value={value2}
          placeholder="选择日期范围"
          isShowTime={true}
          defaultStartTimeValue={this.defaultStartTimeValue}
          defaultEndTimeValue={this.defaultEndTimeValue}
          onChange={date=>{
            console.debug('DateRangePicker2 changed: ', date)
            this.setState({value2: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">展示"现在"快捷选项</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          format="yyyy-MM-dd HH:mm:ss"
          value={value3}
          placeholder="选择日期范围"
          isShowTime={true}
          isShowTimeCurrent={true}
          onChange={date=>{
            console.debug('DateRangePicker3 changed: ', date)
            this.setState({value3: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">设置可选时间范围</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          format="yyyy-MM-dd HH:mm:ss"
          value={value4}
          placeholder="选择日期范围"
          isShowTime={true}
          startTimeSelectableRange="9:00:00 - 20:00:00"
          endTimeSelectableRange="9:00:00 - 20:00:00"
          onChange={date=>{
            console.debug('DateRangePicker4 changed: ', date)
            this.setState({value4: date})
          }}
          />
      </div>
      <div className="block">
        <span className="demonstration">带快捷选项</span>
        <DatePicker.DateRangePicker
          style={{width: 400}}
          value={value5}
          isShowTime={true}
          placeholder="选择日期范围"
          align="left"
          ref={e=>this.daterangepicker5 = e}
          onChange={date=>{
            console.debug('DateRangePicker5 changed: ', date)
            this.setState({value5: date})
          }}
          shortcuts={[{
            text: '最近一周',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

              this.setState({value5: [start, end]})
              this.daterangepicker5.togglePickerVisible()
            }
          }, {
            text: '最近一个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

              this.setState({value5: [start, end]})
              this.daterangepicker5.togglePickerVisible()
            }
          }, {
            text: '最近三个月',
            onClick: ()=> {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              this.setState({value5: [start, end]})
              this.daterangepicker5.togglePickerVisible()
            }
          }]}
          />
      </div>
    </div>
  )
}

```
:::

<style>
.block + .block {
  margin-top: 20px;
}

.demonstration {
  display: inline-block;
  margin-right: 20px;
}
</style>

##  日期格式

- 使用 `format` 指定输入框的格式;
- 请注意大小写;

以下为可用的格式化字串，以 UTC 2018年1月2日 03:04:05 为例：

| 格式      | 含义          | 备注      | 举例                           |
|---------- |-------------- |---------- |--------------------------------  |
| `yyyy` | 年 | - | 2018 |
| `M`  | 月 | 不补0 | 1 |
| `MM` | 月 | 补0 | 01 |
| `W`  | 周 | 仅周选择器的 `format` 可用；不补0 | 1 |
| `WW` | 周 | 仅周选择器的 `format` 可用 | 01 |
| `d`  | 日 | 不补0 | 2 |
| `dd` | 日 | 补0 | 02 |
| `H`  | 小时 | 24小时制；不补0 | 3 |
| `HH` | 小时 | 24小时制；补0 | 03 |
| `m`  | 分钟 | 不补0 | 4 |
| `mm` | 分钟 | 补0 | 04 |
| `s`  | 秒 | 不补0 | 5 |
| `ss` | 秒 | 补0 | 05 |

## API 公共参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 选择器的className | string | - |
| style | 选择框的样式 | object | - |
| format | 时间日期格式化 | string | 年 `yyyy`，月 `MM`，日 `dd`，小时 `HH`，分 `mm`，秒 `ss`, 详情见 `日期格式` | yyyy-MM-dd |
| popupAlign | 弹窗位置 | 'bottomLeft', 'bottomCenter','bottomRight','topLeft', 'topCenter','topLeft' | 'bottomLeft' |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。| Function(triggerNode) | () => document.body |
| isShowTrigger | 是否显示前缀图标 | boolean | - | true |
| isAllowClear | 是否显示清除按钮 | boolean | - | true |
| isDisabled | 是否禁用 | boolean | - | false |
| disabledDate | 禁用日期 | (Date, selectionMode)=>boolean | - | - |
| firstDayOfWeek | 周起始日 | Number | 0 到 6 | 0 |
| yearCount | 可选择的年份总数 | Number | Number | 50 |
| shortcuts | 快捷选项 | {text: string, onClick: ()=>()}[] | - | - |
| renderExtraFooter | 在面板中添加额外的页脚 | ()=>React.ReactNode | - | - |
| onFocus | focus 事件触发 | (SyntheticEvent)=>() | - | - |
| onBlur | blur 事件触发 | (SyntheticEvent)=>() | - | - |
| onChange | 确认选定的值时触发 | function:(value)=>() | - | - |
| onOpenChange | 弹出或关闭日历的回调 | function:(status)=>() | - | - |

## DatePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| placeholder | 占位内容 | string | - | - |
| value | - | Date | Date/null | null |
| selectionMode | 日期类型 | string, one of ['week', 'day'] | - | 'day' |

DatePicker 时间面板的参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| isShowTime | 是否显示时间选择器 | boolean | - | false |
| isShowTimeCurrent | 是否显示时间面板的"现在"快捷按钮 | boolean | - | false |
| defaultTimeValue | 时间面板的默认时间 | Date | - | -
| timeSelectableRange | 时间面板的可选时间段，例如<br>`'18:30:00 - 20:30:00'`<br>或者传入数组<br>`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | string/string[] | - | - |

## DatePicker.DateRangePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| startPlaceholder | 开始日期的占位内容 | string | - | '开始日期' |
| endPlaceholder | 结束日期的占位内容 | string | - | '结束日期' |
| value | - | array | [Date,Date]/null | null |
| rangeSeparator | 分隔符 | string | - | ' 至 ' |
| maxDateRange  | 最大可选择的日期范围，单位 天    | number   | null   | - |
| onError  |  选择日期超过maxDateRange的回调   | function:(message)=>() | - | - |

DateRangePicker 时间面板的参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| isShowTime | 是否显示时间选择器 | boolean | - | false |
| isShowTimeCurrent | 是否显示时间面板的"现在"快捷按钮 | boolean | - | false |
| defaultStartTimeValue | 开始时间面板的默认时间 | Date | - | - |
| defaultEndTimeValue | 结束时间面板的默认时间 | Date | - | - |
| startTimeSelectableRange | 开始时间面板的可选时间段，例如<br>`'18:30:00 - 20:30:00'`<br>或者传入数组<br>`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | string/string[] | - | - |
| endTimeSelectableRange | 结束时间面板的可选时间段，例如<br>`'18:30:00 - 20:30:00'`<br>或者传入数组<br>`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | string/string[] | - | - |
