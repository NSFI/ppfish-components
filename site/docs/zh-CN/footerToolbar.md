# 底部工具栏

固定在底部的工具栏。

## 何时使用

固定在内容区域的底部，不随滚动条移动，常用于长页面的数据搜集和提交工作。

## 浮动固定页脚

:::demo

```js

render(){
  const layoutFixedHeader = () => {
      <div style={{background: '#f7f7f7', padding: 24,position:'relative'}}>
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
        <FooterToolbar>
          <Button>取消</Button>
          <Button type="primary" style={{marginLeft:8}}>保存</Button>
        </FooterToolbar>
      </div>
  }
  //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考上面的footerToolbar
  return(
    <div className="browser-mockup">
      <iframe src="./demo/footerToolbar.html" height={450} width={'100%'}></iframe>
    </div>
  )
  
}
```
:::

## 在Layout中的使用方式
:::demo
```js
render() {
  const { Header, Content, Sider } = Layout;
  
  const layoutFixedSider = () => {
   <Layout>
     <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
       <div className="logo" />
       <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
         <Menu.Item key="1">
           <Icon type="demo-pie" />
           <span className="nav-text">nav 1</span>
         </Menu.Item>
         <Menu.Item key="2">
           <Icon type="video-camera" />
           <span className="nav-text">nav 2</span>
         </Menu.Item>
         <Menu.Item key="3">
           <Icon type="download-line" />
           <span className="nav-text">nav 3</span>
         </Menu.Item>
         <Menu.Item key="4">
           <Icon type="bar-chart" />
           <span className="nav-text">nav 4</span>
         </Menu.Item>
         <Menu.Item key="5">
           <Icon type="demo-grid" />
           <span className="nav-text">nav 5</span>
         </Menu.Item>
         <Menu.Item key="6">
           <Icon type="demo-bargraph" />
           <span className="nav-text">nav 6</span>
         </Menu.Item>
         <Menu.Item key="7">
           <Icon type="demo-play" />
           <span className="nav-text">nav 7</span>
         </Menu.Item>
         <Menu.Item key="8">
           <Icon type="Settingx" />
           <span className="nav-text">nav 8</span>
         </Menu.Item>
       </Menu>
     </Sider>
     <Layout style={{ marginLeft: 200 , position:'relative'}}>
       <Header style={{ background: '#fff', padding: 0 }} />
       <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
         <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
           ...
           <br />
           Really
           <br />...<br />...<br />...<br />
           long
           <br />...<br />...<br />...<br />...<br />...<br />...
           <br />...<br />...<br />...<br />...<br />...<br />...
           <br />...<br />...<br />...<br />...<br />...<br />...
           <br />...<br />...<br />...<br />...<br />...<br />...
           <br />...<br />...<br />...<br />...<br />...<br />...
           <br />...<br />...<br />...<br />...<br />...<br />...
           <br />...<br />...<br />...<br />...<br />...<br />
           content
         </div>
       </Content>
       <FooterToolbar>
         <Button>取消</Button>
         <Button type="primary" style={{marginLeft:8}}>保存</Button>
       </FooterToolbar>
     </Layout>
   </Layout>
  }
  
  //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考上面的layoutToolbar
  return(
    <div className="browser-mockup">
      <iframe src="./demo/layoutToolbar.html" height={350}></iframe>
    </div>
  )
}
```
:::

## 指定滚动区域

若滚动区域非`window`，需要指定`target`为指定滚动区域，且设置`position:relative`

:::demo

```js

render(){
  return (
      <div style={{position:'relative',border:'1px solid #ccc'}} id="demo-footertoolbar">
      <div style={{height:300,overflow:'auto',background: '#f7f7f7', padding: 24,marginBottom:65}}>
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
        <FooterToolbar target={() => document.getElementById('demo-footertoolbar')}>
          <Button>取消</Button>
          <Button type="primary">保存</Button>
        </FooterToolbar>
      </div>
 )
}
```
:::

<style>
#demo-footertoolbar .fishd-footer-toolbar-inner{
  text-align:right;
}

#demo-footertoolbar .fishd-footer-toolbar-inner button + button {
  margin-left: 8px;
}
</style>

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
children | 工具栏内容 | ReactNode | -
target | 目标，默认window | () => HTMLElement | () => window
className | 额外的class| String | -
style | 自定义样式 | Object | - |

