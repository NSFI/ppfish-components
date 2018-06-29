# 输入滑动条

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## 基本

:::demo 基本滑动条。当 `range` 为 `true` 时，渲染为双滑块。当 `disabled` 为 `true` 时，滑块处于不可用状态。

```js
  state = {
    disabled: false,
  };

  handleDisabledChange = (disabled) => {
    this.setState({ disabled });
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="code-box-demo">
        <Slider defaultValue={30} disabled={disabled} />
        <Slider range defaultValue={[20, 50]} disabled={disabled} />
        Disabled: <Switch size="small" checked={disabled} onChange={this.handleDisabledChange} />
      </div>
    );
  }
```
:::

## 带输入框的滑块

:::demo 和 [数字输入框](/components/input-number/) 组件保持同步。

```js
  state = {
    inputValue: 0,
  }

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue}/>
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={20}
              style={{marginLeft: 16}}
              value={this.state.inputValue}
              onChange={this.onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Slider min={0} max={1} onChange={this.onChange} value={this.state.inputValue} step={0.01}/>
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={1}
              style={{marginLeft: 16}}
              step={0.01}
              value={this.state.inputValue}
              onChange={this.onChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
```
:::

## 带 icon 的滑块

:::demo 滑块左右可以设置图标来表达业务含义。

```js
  state = {
    value: 0,
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const max =20;
    const min =0;
    const { value } = this.state;
    const mid = ((max - min) / 2).toFixed(5);
    const preColor = value >= mid ? '' : 'rgba(0, 0, 0, .45)';
    const nextColor = value >= mid ? 'rgba(0, 0, 0, .45)' : '';
    return (
      <div className="icon-wrapper">
        <Icon style={{ color: preColor }} type="frown-o" />
        <Slider max={20} min={0} onChange={this.handleChange} value={value} />
        <Icon style={{ color: nextColor }} type="smile-o" />
      </div>
    );
  }
```
:::

<style>
.icon-wrapper {
  position: relative;
  padding: 0px 30px;
}

.icon-wrapper .anticon {
  position: absolute;
  top: -2px;
  width: 16px;
  height: 16px;
  line-height: 1;
  font-size: 16px;
  color: rgba(0, 0, 0, .25);
}

.icon-wrapper .anticon:first-child {
  left: 0;
}

.icon-wrapper .anticon:last-child {
  right: 0;
}
</style>

## 自定义提示

:::demo 使用 `tipFormatter` 可以格式化 `Tooltip` 的内容，设置 `tipFormatter={null}`，则隐藏 `Tooltip`。

```js
formatter=(value)=> {
  return `${value}%`;
}

render(){
  return(
      <div>
        <Slider tipFormatter={this.formatter} />
        <Slider tipFormatter={null} />
      </div>
  )
}
```
:::


## 事件

:::demo 当 Slider 的值发生改变时，会触发 `onChange` 事件，并把改变后的值作为参数传入。在 `onmouseup` 时，会触发 `onAfterChange` 事件，并把当前值作为参数传入。

```js
onChange=(value)=> {
  console.log('onChange: ', value);
}

onAfterChange=(value) =>{
  console.log('onAfterChange: ', value);
}

render(){
  return(
      <div>
        <Slider defaultValue={30} onChange={this.onChange} onAfterChange={this.onAfterChange} />
        <Slider range step={10} defaultValue={[20, 50]} onChange={this.onChange} onAfterChange={this.onAfterChange} />
      </div>
  )
}
```
:::

## 带标签的滑块

:::demo 使用 `marks` 属性标注分段式滑块，使用 `value` / `defaultValue` 指定滑块位置。当 `included=false` 时，表明不同标记间为并列关系。当 `step=null` 时，Slider 的可选值仅有 `marks` 标出来的部分。

```js
render(){
  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  };
  return(
  <div id="components-slider-demo-mark">
    <h4>included=true</h4>
    <Slider marks={marks} defaultValue={37} />
    <Slider range marks={marks} defaultValue={[26, 37]} />

    <h4>included=false</h4>
    <Slider marks={marks} included={false} defaultValue={37} />

    <h4>marks & step</h4>
    <Slider marks={marks} step={10} defaultValue={37} />

    <h4>step=null</h4>
    <Slider marks={marks} step={null} defaultValue={37} />
  </div>)
  }
```
:::


<style>
#components-slider-demo-mark h4 {
  margin: 0 0 16px;
}
#components-slider-demo-mark .ant-slider-with-marks {
  margin-bottom: 44px;
}
</style>

## 垂直

:::demo 垂直方向的 Slider。

```js
render(){
  const style = {
    float: 'left',
    height: 300,
    marginLeft: 70,
  };
  
  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  };
  return(
  <div style={{ height: 300 }}>
    <div style={style}>
      <Slider vertical defaultValue={30} />
    </div>
    <div style={style}>
      <Slider vertical range step={10} defaultValue={[20, 50]} />
    </div>
    <div style={style}>
      <Slider vertical range marks={marks} defaultValue={[26, 37]} />
    </div>
  </div>)
}
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持清除, 单选模式有效 | boolean | false |
| defaultValue | 设置初始取值。当 `range` 为 `false` 时，使用 `number`，否则用 `[number, number]` | number\|number\[] | 0 or [0, 0] |
| disabled | 值为 `true` 时，滑块为禁用状态 | boolean | false |
| dots | 是否只能拖拽到刻度上 | boolean | false |
| included | `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 | boolean | true |
| marks | 刻度标记，key 的类型必须为 `number` 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式 | object | { number: string\|ReactNode } or { number: { style: object, label: string\|ReactNode } } |
| max | 最大值 | number | 100 |
| min | 最小值 | number | 0 |
| range | 双滑块模式 | boolean | false |
| step | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 `null`，此时 Slider 的可选值仅有 marks 标出来的部分。 | number\|null | 1 |
| tipFormatter | Slider 会把当前值传给 `tipFormatter`，并在 Tooltip 中显示 `tipFormatter` 的返回值，若为 null，则隐藏 Tooltip。 | Function\|null | IDENTITY |
| value | 设置当前取值。当 `range` 为 `false` 时，使用 `number`，否则用 `[number, number]` | number\|number\[] |  |
| vertical | 值为 `true` 时，Slider 为垂直方向 | Boolean | false |
| onAfterChange | 与 `onmouseup` 触发时机一致，把当前值作为参数传入。 | Function(value) | NOOP |
| onChange | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。 | Function(value) | NOOP |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

<style>
.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>
