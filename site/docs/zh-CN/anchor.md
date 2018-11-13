# Anchor 锚点 【交互：李东岳 | 视觉：徐剑杰 |开发：卿泽】

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 基本

:::demo 最简单的用法。

```js

render(){
  const {Link} = Anchor;
  const layoutFixedHeader = () => {
      <div style={{background: '#f7f7f7'}}>
        <Anchor style={{
          width: 100,
          float: 'right',
          marginRight: 50,
          marginTop: 50
        }}>
          <Link href="#title1" title="Title-1"/>
          <Link href="#title2" title="Title-2"/>
          <Link href="#title3" title="Title-3"/>
        </Anchor>
        <div style={{padding: 24, marginBottom: 65}}>
          <p id={'title1'}>Title 1</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'title2'}>Title 2</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'title3'}>Title 3</p>
        </div>
      </div>
  }
  //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考上面的footerToolbar
  return(
    <div className="browser-mockup">
      <iframe src="./demo/anchorDemoBasic.html" height={450} width={'100%'}></iframe>
    </div>
  )
}
```
:::

## API

> 注意：该组件不支持`hashHistory` ,[详情](https://github.com/ReactTraining/react-router/issues/394#issuecomment-220221604)

### Anchor-Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| affix | 固定模式 | Boolean | true |
| bounds | 锚点区域边界 | Number | 5(px) |
| className | 额外class | String | - |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | Number |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | Number |  |
| onClick | `click` 事件的 handler | (e: Event, link: Object) => Void | - |
| showInkInFixed | 固定模式是否显示小圆点 | Boolean | false |
| style | 额外样式 | Object | - |

### Link-Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 锚点链接 | String |  |
| title | 文字内容 | String\|ReactNode |  |
