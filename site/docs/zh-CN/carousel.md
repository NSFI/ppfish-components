# 走马灯

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 基本

:::demo 最简单的用法。

```js
onChange=(a, b, c)=> {
  console.log(a, b, c);
};

render(){
  return(<Carousel afterChange={this.onChange}>
             <div><h3>1</h3></div>
             <div><h3>2</h3></div>
             <div><h3>3</h3></div>
             <div><h3>4</h3></div>
           </Carousel>)
}
```
:::

## 垂直

:::demo 垂直显示。

```js

render(){
  return( <Carousel vertical>
             <div><h3>1</h3></div>
             <div><h3>2</h3></div>
             <div><h3>3</h3></div>
             <div><h3>4</h3></div>
           </Carousel>)
}
```
:::

## 渐显

:::demo 切换效果为渐显。

```js

render(){
  return( <Carousel effect="fade">
             <div><h3>1</h3></div>
             <div><h3>2</h3></div>
             <div><h3>3</h3></div>
             <div><h3>4</h3></div>
           </Carousel>)
}
```

:::

## 自动切换

:::demo 定时切换下一张。

```js
render(){
  return(<Carousel autoplay>
             <div><h3>1</h3></div>
             <div><h3>2</h3></div>
             <div><h3>3</h3></div>
             <div><h3>4</h3></div>
           </Carousel>)
}
```
:::

<style>
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}
</style>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterChange | 切换面板的回调 | function(current) | 无 |
| autoplay | 是否自动切换 | boolean | false |
| beforeChange | 切换面板的回调 | function(from, to) | 无 |
| dots | 是否显示面板指示点 | boolean | true |
| easing | 动画效果 | string | linear |
| effect | 动画效果函数，可取 scrollx, fade | string | scrollx |
| vertical | 垂直显示 | boolean | false |

## 方法

| 名称 | 描述 |
| --- | --- |
| goTo(slideNumber) | 切换到指定面板 |
| next() | 切换到下一面板 |
| prev() | 切换到上一面板 |

更多参数可参考：<https://github.com/akiran/react-slick>
