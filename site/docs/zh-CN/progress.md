# 进度条

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时；
- 当需要显示一个操作完成的百分比时。

## 进度条

:::demo 标准的进度条。

```js
render(){
  return (
    <div>
      <Progress percent={30} />
      <Progress percent={50} status="active" />
      <Progress percent={70} status="exception" />
      <Progress percent={100} />
      <Progress percent={50} showInfo={false} />
    </div>
  )
}
```
:::

## 小型进度条

:::demo 适合放在较狭窄的区域内。

```js
render(){
  return (
    <div style={{ width: 170 }}>
      <Progress percent={30} size="small" />
      <Progress percent={50} size="small" status="active" />
      <Progress percent={70} size="small" status="exception" />
      <Progress percent={100} size="small" />
    </div>
  )
}
```
:::

## 进度圈

:::demo 圈形的进度。

```js
render(){
  return(
    <div>
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={70} status="exception" />
      <Progress type="circle" percent={100} />
    </div>
  )
}
```
:::

<style>
  .fishd-progress-circle-wrap,
  .fishd-progress-line-wrap {
    margin-right: 8px;
    margin-bottom: 5px;
  }
</style>

## 小型进度圈

:::demo 小一号的圈形进度。

```js
render(){
  return(
    <div>
      <Progress type="circle" percent={30} width={80} />
      <Progress type="circle" percent={70} width={80} status="exception" />
      <Progress type="circle" percent={100} width={80} />
    </div>
  )
}
```
:::

## 进度圈动态展示

:::demo 会动的进度条才是好进度条。

```js
  state = {
    percent: 0,
  }

  increase = () => {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  }

  decline = () => {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  }

  render() {
    const ButtonGroup = Button.Group;
    return (
      <div>
        <Progress type="circle" percent={this.state.percent} />
        <ButtonGroup>
          <Button onClick={this.decline}> - </Button>
          <Button onClick={this.increase}> + </Button>
        </ButtonGroup>
      </div>
    );
  }
```
:::

## 自定义文字格式

:::demo `format` 属性指定格式。

```js
render(){
  return(
    <div>
      <Progress type="circle" percent={75} format={percent => `${percent} Days`} />
      <Progress type="circle" percent={100} format={() => 'Done'} />
    </div>
  )
}
```
:::

<style>
  div.fishd-progress-circle,
  div.fishd-progress-line {
    margin-right: 8px;
    margin-bottom: 8px;
  }
</style>

## 动态展示

:::demo 会动的进度条才是好进度条。

```js
  state = {
    percent: 0,
  }

  increase = () => {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  }

  decline = () => {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  }

  render() {
  const ButtonGroup = Button.Group;
    return (
      <div>
        <Progress percent={this.state.percent} />
        <ButtonGroup>
          <Button onClick={this.decline}> - </Button>
          <Button onClick={this.increase}> + </Button>
        </ButtonGroup>
      </div>
    );
  }
```
:::


## 仪表盘

:::demo 通过设置 `type=dashboard`，可以很方便地实现仪表盘样式的进度条。

```js
render(){
  return(
    <Progress type="dashboard" percent={75} />
  )
}
```
:::

## 分段进度条

:::demo 标准的进度条。

```js
render(){
  return(
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} successPercent={30} />
    </Tooltip>
  )
}
```
:::

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | string | - |
| format | 内容的模板函数 | function(percent, successPercent) | `percent => percent + '%'` |
| gapDegree `(type=circle)` | 圆形进度条缺口角度，可取值 0 ~ 360 | number | 0 |
| gapPosition `(type=circle)` | 圆形进度条缺口位置 | Enum{ 'top', 'bottom', 'left', 'right' } | `top` |
| percent | 百分比 | number | 0 |
| showInfo | 是否显示进度数值或状态图标 | boolean | true |
| status | 状态，可选：`success` `exception` `active` | string | - |
| strokeWidth `(type=line)` | 进度条线的宽度，单位 px | number | 10 |
| strokeWidth `(type=circle)` | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 |
| successPercent | 已完成的分段百分比，`type="line"` 时有效 | number | 0 |
| type | 类型，可选 `line` `circle` `dashboard` | string | line |
| width `(type=circle)` | 圆形进度条画布宽度，单位 px | number | 132 |
