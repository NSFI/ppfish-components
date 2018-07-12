# 加载动画

加载用动画组件

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 基本使用

:::demo 基本使用方式：使用spin。

```js
render(){
  return(
    <div style={{ margin: 100, height: 100, position: 'relative' }}>
      <BizLoading
      />
    </div>
  )
}
```
:::

## 使用icon

:::demo 使用icon。

```js
render(){
  return(
    <div style={{ margin: 100, height: 100, position: 'relative' }}>
      <BizLoading
        loadingIcon="https://ysf.nosdn.127.net/E33AEE3794A2121463CB6296316DE55A"
      />
    </div>
  )
}
```
:::


## API
| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| loadingIcon  | 加载中动画图    | string\|ReactNode  |  —   |
| extraCls  | 额外的class    | string   | —   |
