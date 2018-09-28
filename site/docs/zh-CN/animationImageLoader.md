# AnimationImageLoader 逐帧动画

长图制作逐帧动画

## 何时使用

动画使用场景，导航页、展示页等

## 基本使用

:::demo AnimationImageLoader组件图片素材由`src`属性来定义，默认为展示图片。

```js
render(){
  return(
    <AnimationImageLoader/>
  )
}
```
:::

## API
| 属性      | 说明    | 类型      | 默认值   |
|---------- |-------- |----------   |-------- |
| src     | 动画图地址   | String   |    示例图     |
| zoom  | 缩放比例    | number    | 0.5   |
| extraCls  | 额外的class    | String   | —   |
