# 回到顶部

返回页面顶部的操作按钮。

## 何时使用

- 当页面内容区域比较长时；
- 当用户需要频繁返回顶部查看相关内容时。

## 基本

:::demo 最简单的用法。

```js
  render(){
  return(<div>
    <BackTop />
    Scroll down to see the bottom-right
    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
    button.
  </div>)
}
```
:::

## 自定义样式

:::demo 可以自定义回到顶部按钮的样式，限制宽高：`40px * 40px`。

```js
render(){
  return(
    <div id="components-back-top-demo-custom">
      <BackTop>
        <div className="ant-back-top-inner">UP</div>
      </BackTop>
      Scroll down to see the bottom-right
      <strong style={{ color: '#1088e9' }}> blue </strong>
      button.
    </div>
  )
}
```
:::

<style>
#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
</style>


## API

> 有默认样式，距离底部 `50px`，可覆盖。
>
> 自定义样式宽高不大于 40px \* 40px。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | Function | () => window |
| visibilityHeight | 滚动高度达到此参数值才出现 `BackTop` | number | 400 |
| onClick | 点击按钮的回调函数 | Function | - |
