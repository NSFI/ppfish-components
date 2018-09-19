# Badge 徽标记

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 基本

:::demo 简单的徽章展示，当 `count` 为 `0` 时，默认不显示，但是可以使用 `showZero` 修改为显示。


```js

render(){
 return(<div>
    <Badge count={5}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={0} showZero>
      <a href="#" className="head-example" />
    </Badge>
  </div>)
  }
```

:::

<style>
.fishd-badge:not(.fishd-badge-status) {
  margin-right: 20px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
}
</style>


## 独立使用

:::demo 不包裹任何元素即是独立使用，可自定样式展现。

> 在右上角的 badge 则限定为红色。

```js
render(){
  return(<div>
    <Badge count={25} />
    <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
    <Badge count={109} style={{ backgroundColor: '#52c41a' }} />
  </div>)
}
```
:::

## 封顶数字

:::demo 超过 `overflowCount` 的会显示为 `${overflowCount}+` 或 `...`
默认的 `overflowCount` 为 `99`,
默认的 `overflowType` 为 `plus`,

```js

render(){
  return(
  <div>
    <Badge count={99}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={100}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={99} overflowCount={10}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={1000} overflowCount={999} overflowType='ellipsis'>
      <a href="#" className="head-example" />
    </Badge>
  </div>)
 }
```
:::

## 讨嫌的小红点

:::demo 没有具体的数字。

```js
render(){
  return(
    <div>
      <Badge dot>
        <Icon type="demo-phone" />
      </Badge>
      <Badge count={0} dot>
        <Icon type="demo-phone" />
      </Badge>
      <Badge dot>
        <a href="#">Link something</a>
      </Badge>
    </div>
  )
 }
```
:::

<style>
.fishdicon-notification {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
}
</style>

## 可点击

:::demo 用 a 标签进行包裹即可。

```js

render(){
  return(
  <a href="#">
    <Badge count={5}>
      <span className="head-example" />
    </Badge>
  </a>)
}
```
:::

## 动态

:::demo 展示动态变化的效果。

```js
  state = {
    count: 5,
    show: true,
  }

  increase = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  }

  decline = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  }

  onChange = (show) => {
    this.setState({ show });
  }

  render() {
    const ButtonGroup = Button.Group;
    return (
      <div>
        <div>
          <Badge count={this.state.count}>
            <a href="#" className="head-example" />
          </Badge>
          <ButtonGroup>
            <Button onClick={this.decline}>
              <Icon type="minus" />
            </Button>
            <Button onClick={this.increase}>
              <Icon type="plus" />
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ marginTop: 10 }}>
          <Badge dot={this.state.show}>
            <a href="#" className="head-example" />
          </Badge>
          <Switch onChange={this.onChange} checked={this.state.show} />
        </div>
      </div>
    );
  }
```
:::

## 状态点

:::demo 用于表示状态的小圆点。

```js
render(){
  return(
  <div>
    <Badge status="success" />
    <Badge status="error" />
    <Badge status="default" />
    <Badge status="processing" />
    <Badge status="warning" />
    <br />
    <Badge status="success" text="Success" />
    <br />
    <Badge status="error" text="Error" />
    <br />
    <Badge status="default" text="Default" />
    <br />
    <Badge status="processing" text="Processing" />
    <br />
    <Badge status="warning" text="Warning" />
  </div>)
 }
```
:::

## 自定义标题

:::demo 设置鼠标放在状态点上时显示的文字


```js

render(){
  return(
  <div>
    <Badge count={5} title="Custom hover text">
      <a href="#" className="head-example" />
    </Badge>
  </div>)
  }
```
:::

<style>
.fishd-badge:not(.fishd-badge-status) {
  margin-right: 20px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee !important;
  display: inline-block;
}


</style>

## API

```jsx
<Badge count={5}>
  <a href="#" className="head-example" />
</Badge>
```

```jsx
<Badge count={5} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 类名 | String | - | - |
| count | 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 | Number \| ReactNode | - |
| dot | 不展示数字，只有一个小红点 | Boolean | false |
| offset | 设置状态点的位置偏移，格式为 `[x, y]` | Number[] | - |
| overflowCount | 展示封顶的数字值 | Number | 99 |
| overflowTyle | 展示封顶展示形式 '+' 或 '...' | Enum {'plus', 'ellipsis'} | 'plus' |
| showZero | 当数值为 0 时，是否展示 Badge | Boolean | false |
| status | 设置 Badge 为状态点 | Enum {'success', 'processing', 'default', 'error', 'warning'} | - |
| text | 在设置了 `status` 的前提下有效，设置状态点的文本 | String | '' |
| title | 设置鼠标放在状态点上时显示的文字 | String | `count` |
