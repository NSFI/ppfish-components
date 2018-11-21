# Divider 分割线 【交互：李东岳 | 视觉：徐剑杰 |开发：卿泽】

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

## 垂直分割符

:::demo 使用 `type="split"` 设置为行内的垂直分割符。

```js
render(){
  return(
    <div>
        Text
        <Divider type="split" />
        <a href="#">Link</a>
        <Divider type="split" />
        <a href="#">Link</a>
      </div>
  )
}
```
:::

## 垂直分割线

> 在背景色不为`#fff`的情况下需要使用`textStyle`进行背景色重置

:::demo 使用 `type="vertical"` 设置为块内的垂直分割线,父容器需指定高度；背景色更改需要同样样式覆盖text的背景色

```js
render(){
  return(
      <div className="demo-vertical clearfix">
        <Divider type="vertical"/>
        <div className="demo-content">Fishd Design, a design language for background applications, is refined by Fishd UED Team</div>
        <Divider type="vertical" orientation="top">上</Divider>
        <div className="demo-content">Fishd Design, a design language for background applications, is refined by Fishd UED Team</div>
        <Divider type="vertical" >中</Divider>
        <div className="demo-content">Fishd Design, a design language for background applications, is refined by Fishd UED Team</div>
        <Divider type="vertical" orientation="bottom">下</Divider>
        <div className="demo-content">Fishd Design, a design language for background applications, is refined by Fishd UED Team</div>
        <Divider type="vertical"/>
      </div>
  )
}
```

```less
.demo-vertical{
  height: 300px;
 }

.demo-content{
  width:110px;
  height:100%;
  overflow: auto;
  float: left;
}

.fishd-divider{
  float:left;
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
| orientation | 分割线标题的位置,其中`left`/`right`横向类型生效，`top`/`bottom`纵向类型生效 | Enum {'left','right','center','top','bottom'} | `center` |
| style | 分割线样式对象 | Object | - |
| textStyle | 文字区域的样式 | Object | - |
| type | 水平、分隔符、垂直类型 | Enum: {'horizontal', 'split' , 'vertical'} | `horizontal` |
| children | 文本内容，竖向仅支持String | String\| ReactNode | - |
