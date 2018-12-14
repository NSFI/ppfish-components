# Anchor 锚点 【交互：李东岳 | 视觉：徐剑杰 |开发：卿泽】

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 基本

:::demo 最简单的用法。

```js

  render() {
    const {Link} = Anchor;
    const layoutFixedHeader = () => { (
      <div>
        <Anchor inkPosition={'left'} style={{
          width: 150,
          position: 'absolute',
          right: 50,
          top: 50
        }}>
          <Link href="#内容项1" title="内容项-1">
            <Link href="#内容项1-1" title="内容项-1-1"/>
            <Link href="#内容项1-2" title="内容项-1-2"/>
            <Link href="#内容项1-3" title="内容项-1-3"/>
          </Link>
          <Link href="#内容项2" title="内容项-2"/>
          <Link href="#内容项3" title="内容项-3"/>
        </Anchor>
        <div style={{padding: '0 24px 24px'}}>
          <p id={'内容项1'}>内容项 1</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项1-1'}>内容项1-1</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项1-2'}>内容项1-2</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项1-3'}>内容项1-3</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项2'}>内容项 2</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p id={'内容项3'}>内容项 3</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
        </div>
      </div>
    );
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

> 提供一级子内容项样式，保证当内容下有多个子内容项时，支持快速定位（业务可自定义内容项层级）
  
### Anchor

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| affix | 固定模式 | Boolean | true |
| bounds | 锚点区域边界 | Number | 5(px) |
| className | 额外class | String | - |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | Number |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | Number |  |
| onClick | `click` 事件的 handler | (e: Event, link: Object) => Void | - |
| showInkInFixed | 固定模式是否显示蓝条 | Boolean | false |
| inkPosition | 锚点位置选择 | Enum {'left', 'right'} | 'left' |
| style | 额外样式 | Object | - |

### Anchor.Link

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 锚点链接 | String |  |
| title | 文字内容 | String\|ReactNode |  |
