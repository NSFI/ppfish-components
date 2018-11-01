# Timeline 时间轴 【交互：蒋蕊遥 | 视觉：徐剑杰 |开发：卿泽】

垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## 基本用法
:::demo 基本的时间轴。
```js
  render() {
    return (
      <Timeline>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
    );
  }
```
:::

## 圆圈颜色
:::demo 圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态。
```js
  render() {
    return (
      <Timeline>
        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item color="red">
          <p>Solve initial network problems 1</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
      </Timeline>
    );
  }
```
:::

## 最后一个及排序
:::demo 当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 `pending` 为真值时展示幽灵节点，如果 `pending` 是 React 元素可用于定制该节点内容，同时 pendingDot 将可以用于定制其轴点。`reverse` 属性用于控制节点排序，为 false 时按正序排列，为 true 时按倒序排列。
```js
  constructor(){
    super();
    this.state = {
      reverse: false,
    };    
  }

  handleClick = () => {
    this.setState({ reverse: !this.state.reverse });
  }

  render() {
    return (
      <div>
        <Timeline pending="Recording..." reverse={this.state.reverse}>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        </Timeline>
        <Button type="primary" style={{ marginTop: 16 }} onClick={this.handleClick}>Toggle Reverse</Button>
      </div>
    );
  }
```
:::

## 自定义时间轴点
:::demo 可以设置为图标或其他自定义元素。
```js
  render() {
    return (
      <Timeline>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<Icon type="bar-chart" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
    );
  }
```
:::

## 交替展现

:::demo 内容在时间轴两侧轮流出现。

```js
render(){
  return(
    <Timeline mode="alternate">
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<Icon type="bar-chart" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Timeline.Item>
        <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<Icon type="bar-chart" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
      </Timeline>
  )
}
```
:::

## 右侧时间轴点

:::demo 时间轴点可以在内容的右边。

```js
render(){
  return(
      <Timeline mode="right">
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<Icon type="bar-chart" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
  )
}
```
:::

## API

```html
<Timeline>
  <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
  <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
  <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
  <Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
</Timeline>
```

### Timeline

时间轴。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置  | Enum {'left', 'alternate', 'right'} | 'left'  |
| pending | 指定最后一个幽灵节点是否存在或内容 | Boolean \| String \| ReactNode | false |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | String \| ReactNode | `<Icon type="load-line" spin />` |
| reverse | 节点排序 | Boolean | false |

### Timeline.Item

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 指定圆圈颜色 `'blue', 'red', 'green'`，或自定义的色值 | String | 'blue' |
| dot | 自定义时间轴点 | String \| ReactNode | - |
