# Affix 固钉 【交互：李东岳 | 视觉：徐剑杰 |开发：卿泽】

将页面元素钉在可视范围。

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。


## 固定在顶部
:::demo
```js
  state = {
    top: 10,
  }
  render() {
    return (
        <Affix offsetTop={this.state.top}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                top: this.state.top + 10,
              });
            }}
          >
            Affix top
          </Button>
        </Affix>
    );
  }
```
:::

## 自定义固钉触发距离及回调监听

:::demo 可以获得是否固定的状态。

```js

state={
  message:'未固定'
}

render(){
  return(
  <Affix offsetTop={120} onChange={affixed => this.setState({message:affixed ? '固定中...':'未固定'})}>
    <Button type={this.state.message === '未固定'?'danger':'primary'}>{this.state.message}</Button>
  </Affix>)
}
```
:::


## 滚动容器

:::demo 用 `target` 设置 `Affix` 需要监听其滚动事件的元素，默认为 `window`。

```js
  render() {
    return (
      <div className="components-affix-demo-target">
        <div className="scrollable-container" ref={(node) => { this.container = node; }}>
          <div className="background">
            <Affix target={() => this.container}>
              <Button type="primary">
                Fixed at the top of container
              </Button>
            </Affix>
          </div>
        </div>
      </div>
    );
  }
```

```less
.components-affix-demo-target .scrollable-container {
  height: 100px;
  overflow-y: scroll;
}

.components-affix-demo-target .background {
  padding-top: 60px;
  height: 300px;
  background:#F7F8FA;
}

```
:::

## 固定在底部
:::demo
```js
  state = {
    bottom: 10,
  }
  render() {
    return (
        <Affix offsetBottom={this.state.bottom}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                bottom: this.state.bottom + 10,
              });
            }}
          >
            Affix bottom
          </Button>
        </Affix>
    );
  }
```
:::

## API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | Number | - |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | Number | - |
| onChange | 固定状态改变时触发的回调函数 | (affixed) => Void | - |
| target | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |

> **注意：**`Affix` 内的元素不要使用绝对定位，如需要绝对定位的效果，可以直接设置 `Affix` 为绝对定位：

```js
<Affix style={{ position: 'absolute', top: y, left: x}}>
  ...
</Affix>
```
