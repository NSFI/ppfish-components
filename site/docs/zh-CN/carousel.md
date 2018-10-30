# Carousel 走马灯 【交互：李东岳 |视觉：徐剑杰 |开发：高志友】

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 基本

:::demo 最简单的用法。

```js
onChange = (a, b, c) => {
  console.log(a, b, c);
};

render() {
  return (
    <Carousel afterChange={this.onChange}>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  );
}
```
:::

## 垂直

:::demo 垂直显示。

```js

render() {
  return (
    <Carousel dotsPosition="right" >
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  );
}
```
:::

## 渐显

:::demo 切换效果为渐显。

```js

render() {
  return (
    <Carousel effect="fade">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  );
}
```

:::

## 自动切换

:::demo 定时切换下一张。

```js
render() {
  return (
    <Carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  );
}
```
:::

## 手动切换

:::demo 手动切换。

```js
render() {
  return (
    <Carousel arrows>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  );
}
```
:::


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterChange | 切换面板的回调 | (current) => Void | - |
| arrows | 是否显示切换箭头 | Boolean | false |
| autoplay | 是否自动切换 | Boolean | false |
| autoplaySpeed | 每次切换的间隔时间，单位毫秒 | Number | 3000 |
| beforeChange | 切换面板的回调 | (from, to) => Void | - |
| className | 容器类名 | String | - |
| dots | 是否显示面板指示点 | Boolean | true |
| dotsPosition | 面板指示点的显示位置 | Enum {'top', 'right', 'bottom', 'left'} | 'bottom' |
| easing | 动画效果 | String | 'linear' |
| effect | 动画效果函数 | Enum {'scrollx', 'fade'} | 'scrollx' |
| nextArrow | 自定义“切换到下一个”按钮 | HTMLElement | - |
| prevArrow | 自定义“切换到上一个”按钮 | HTMLElement | - |
| style | 容器样式 | Object | - |

## 方法

| 名称 | 描述 |
| --- | --- |
| goTo(slideNumber) | 切换到指定面板 |
| next() | 切换到下一面板 |
| prev() | 切换到上一面板 |

更多参数可参考：<https://github.com/akiran/react-slick>
