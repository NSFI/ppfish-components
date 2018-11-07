# Divider 分割线 【交互：缺失 | 视觉：徐剑杰 |开发：卿泽】

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 水平分割线

:::demo 默认为水平分割线，可在中间加入文字。

```js
render(){
  return(
     <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <Divider />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <Divider>With Text</Divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <Divider dashed />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
      </div>
  )
}
```
:::

## 垂直分割线

:::demo 使用 `type="vertical"` 设置为行内的垂直分割线。

```js
render(){
  return(
    <div>
        Text
        <Divider type="vertical" />
        <a href="#">Link</a>
        <Divider type="vertical" />
        <a href="#">Link</a>
      </div>
  )
}
```
:::

## 标题位置

:::demo 修改分割线标题的位置。

```js
render(){
  return(
      <div>
        <Divider orientation="left">Left Text</Divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <Divider orientation="right">Right Text</Divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
      </div>
  )
}
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 分割线样式类 | String | - |
| dashed | 是否虚线 | Boolean | false |
| orientation | 分割线标题的位置 | Enum {'left','right','center'} | `center` |
| style | 分割线样式对象 | Object | - |
| type | 水平还是垂直类型 | Enum: {'horizontal', 'vertical'} | `horizontal` |
