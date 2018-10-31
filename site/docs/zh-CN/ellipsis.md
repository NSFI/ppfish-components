# Ellipsis 文本自动省略号 【交互：无 | 视觉：无 | 开发：卿泽】

文本过长自动处理省略号，支持按照文本框宽度、文本长度和最大行数三种方式截取。

## 按照字符数省略

:::demo 通过设置 `length` 属性指定文本最长长度，如果超过这个长度会自动截取。

```js
render(){
  const article = 'There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.';
  return(
      <div>
        <h4>限制字数</h4>
        <Ellipsis length={100}>{article}</Ellipsis>
        <h4 style={{ marginTop: 24 }}>显示ToolTip</h4>
        <Ellipsis length={100} tooltip>{article}</Ellipsis>
      </div>
  )
}
```
:::

## 按照宽度省略

:::demo 通过设置 `width` 属性指定文本最大宽度，如果超过这个宽度会自动截取。

```js
render(){
  const article = 'There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.';
  return(
      <div>
        <h4>限制宽度</h4>
        <Ellipsis width={300}>{article}</Ellipsis>
        <h4 style={{ marginTop: 24 }}>显示ToolTip</h4>
        <Ellipsis width={300} tooltip>{article}</Ellipsis>
      </div>
  )
}
```
:::

## 按照行数省略

:::demo 通过设置 `lines` 属性指定文本最长长度，如果超过这个长度会自动截取。

```js
render(){
  const article = 'There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.';
  return(
      <div style={{width:300}}>
        <h4>限制行数</h4>
        <Ellipsis lines={3}>{article}</Ellipsis>
        <h4 style={{ marginTop: 24 }}>显示ToolTip</h4>
        <Ellipsis lines={3} tooltip>{article}</Ellipsis>
      </div>
  )
}
```
:::

## API

> 注意： length/width/lines 属性代表三种模式：限制字数、限制宽度、限制行数 ，使用时三选一

参数 | 说明 | 类型 | 默认值
----|------|-----|------
tooltip | 移动到文本展示完整内容的提示 | Boolean | false
length | 在按照长度截取下的文本最大字符数，超过则截取省略 | Number | -
lines | 在按照行数截取下最大的行数，超过则截取省略 | Number | `1`
fullWidthRecognition | length模式下,是否将全角字符的长度视为2来计算字符串长度 | Boolean | false
className | 额外class | String | -
style | 额外样式 | Object | -
width | 限制宽度大小 | String \| Number | -
