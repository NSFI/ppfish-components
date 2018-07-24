# Icon 图标

语义化的矢量图形。

## 何时使用

显示矢量图标的地方。

## 基本

:::demo 最基础的使用方式。
```js
render(){
  return(<div className="code-box-demo">
    <Icon type="color" />
    <Icon type="duanxin" />
  </div>)
}
```
:::

## 带旋转动画

:::demo 带旋转动画的使用方式。
```js
render(){
  return(<div className="code-box-demo">
    <Icon type="color" spin={true} />
  </div>)
}
```
:::

## API

由于图标字体本质上还是文字，可以使用 `style` 和 `className` 设置图标的大小和颜色。

```jsx
<Icon type="question" style={{ fontSize: 16, color: '#08c' }} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spin | 是否有旋转动画 | boolean | false |
| style | 设置图标的样式，例如 fontSize 和 color | object | - |
| type | 图标类型 | string | - |

```

<style>
.code-box-demo .fishdicon {
  font-size: 24px;
  margin: 12px 0 16px 30px;
}
</style>
