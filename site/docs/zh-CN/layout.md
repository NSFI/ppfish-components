# Layout 布局 【交互：李东岳 | 视觉：徐剑杰 |开发：王晓玲】

协助进行页面级整体布局。

## 设计规则

### 交互

- 一级导航和末级的导航需要在可视化的层面被强调出来；
- 当前项应该在呈现上优先级最高；
- 当导航收起的时候，当前项的样式自动赋予给它的上一个层级；
- 左侧导航栏的收放交互同时支持手风琴和全展开的样式，根据业务的要求进行适当的选择。

### 视觉

导航样式上需要根据信息层级合理的选择样式：

- **大色块强调**

  建议用于底色为深色系时，当前页面父级的导航项。

- **高亮火柴棍**

  当导航栏底色为浅色系时使用，可用于当前页面对应导航项，建议尽量在导航路径的最终项使用。

- **字体高亮变色**

  从可视化层面，字体高亮的视觉强化力度低于大色块，通常在当前项的上一级使用。

- **字体放大**

  `12px`、`14px` 是导航的标准字号，14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。

## 组件概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

> 注意：采用 flex 布局实现，请注意[浏览器兼容性](http://caniuse.com/#search=flex)问题。

## 基本结构

:::demo 典型的页面布局。

```js
render(){
  const { Header, Footer, Sider, Content } = Layout;
  return(
      <div id="components-layout-demo-basic">
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
    
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
    
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Content>Content</Content>
            <Sider>Sider</Sider>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
    
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
  )
}
```
:::

<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .fishd-layout-header,
#components-layout-demo-basic .fishd-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .fishd-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .fishd-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .fishd-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}

#components-layout-demo-basic > .fishd-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .fishd-layout:last-child {
  margin: 0;
}
</style>

## 侧边布局

:::demo 侧边两列式布局。页面横向空间有限时，侧边导航可收起。

侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。内容根据浏览器终端进行自适应，能提高横向空间的使用率，但是整个页面排版不稳定。侧边导航的模式层级扩展性强，一、二、三级导航项目可以更为顺畅且具关联性的被展示，同时侧边导航可以固定，使得用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。但这类导航横向页面内容的空间会被牺牲一部份。

```js
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Demo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout className="components-layout-demo-side">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <Icon type="logo" className="img-icon-14 fishdicon" />
            {
              !this.state.collapsed ? <span className="logo-text">Fish Design</span> : null
            }
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <IconBargraph className="img-icon-14 fishdicon" />
              <span>功能项一</span>
            </Menu.Item>
            <Menu.Item key="2">
              <IconGrid className="img-icon-14 fishdicon"  />
              <span>功能项二</span>
            </Menu.Item>
            <Menu.Item key="3">
              <IconFolder className="img-icon-14 fishdicon"/>
              <span>功能项三</span>
            </Menu.Item>
            <Menu.Item key="4">
              <IconBookmark className="img-icon-14 fishdicon" />
              <span>功能项四</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><IconBookmark className="img-icon-14 fishdicon" /><span>功能项四</span></span>}
            >
              <Menu.Item key="5">子功能01</Menu.Item>
              <Menu.Item key="6">子功能02</Menu.Item>
              <Menu.Item key="7">子功能03</Menu.Item>
            </SubMenu>
            <Menu.Item key="8">
              <IconPie className="img-icon-14 fishdicon" />
              <span>功能项五</span>
            </Menu.Item>
            <Menu.Item key="9">
              <IconFile className="img-icon-14 fishdicon" />
              <span>功能项六</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content>
            <div className="components-layout-demo-side-content">
              内容模块
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Fish Design
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
ReactDOM.render(<Demo {...context.props}/>,mountNode);
```
```less
.components-layout-demo-side {
  border: 1px solid #F2F2F5;
  .logo {
    height: 60px;
    padding-top: 18px;
    padding-left: 18px;
    background: #337EFF;
    img {
      width: 26px;
      height: 26px;
    }
    .logo-text {
       display: inline-block;
       color: #fff;
       position: relative;
       bottom: 6px;
       left: 6px;
    }
  }
  &-content {
    text-align: center;
    line-height: 280px;
    min-height: 280px;
  }
  .fishd-layout-sider-trigger { 
    position:relative
  }
}
```
:::

## 自定义触发器

:::demo 要使用自定义触发器，可以设置 `trigger={null}` 来隐藏默认设定。

```js
const { Header, Sider, Content } = Layout;

class Demo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const MenuItemGroup = Menu.ItemGroup;
    return (
      <Layout className="components-layout-demo-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <Icon type="logo" className="img-icon-14 fishdicon" />
            {
              !this.state.collapsed ? <span className="logo-text">Fish Design</span> : null
            }
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <MenuItemGroup key="g1" title="功能分类1">
              <Menu.Item key="1">
                <IconBargraph className="img-icon-14 fishdicon" />
                <span>功能项一</span>
              </Menu.Item>
              <Menu.Item key="2">
                <IconGrid className="img-icon-14 fishdicon"  />
                <span>功能项二</span>
              </Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup key="g2" title="功能分类2">
              <Menu.Item key="3">
                <IconFolder className="img-icon-14 fishdicon" />
                <span>功能项三</span>
              </Menu.Item>
              <Menu.Item key="4">
                <IconBookmark className="img-icon-14 fishdicon"/>
                <span>功能项四</span>
              </Menu.Item>
              <Menu.Item key="5">
                <IconPie className="img-icon-14 fishdicon"  />
                <span>功能项五</span>
              </Menu.Item>
              <Menu.Item key="6">
                <IconFile className="img-icon-14 fishdicon"  />
                <span>功能项六</span>
              </Menu.Item>
            </MenuItemGroup>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-line-right' : 'menu-line'}
              onClick={this.toggle}
            />
            <span className="trigger-split-line"/>
          </Header>
          <Content>
            <div className="components-layout-demo-custom-trigger-content">
              内容模块
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
ReactDOM.render(<Demo {...context.props}/>,mountNode);
```
```less
.components-layout-demo-custom-trigger {
  border: 1px solid #F2F2F5;
  .logo {
    height: 60px;
    padding-top: 18px;
    padding-left: 18px;
    background: #337EFF;
    img {
      width: 26px;
      height: 26px;
    }
    .logo-text {
       display: inline-block;
       color: #fff;
       position: relative;
       bottom: 6px;
       left: 6px;
    }
  }
  &-content {
    text-align: center;
    line-height: 280px;
    min-height: 280px;
  }
  .trigger {
    font-size: 16px;
    color: #999;
    line-height: 64px;
    padding: 0 22px;
    cursor: pointer;
    transition: color .3s;
    &:hover {
      color: #1890ff;
    }
  }
  .trigger-split-line {
    display: inline-block;
    width: 1px;
    height: 30px;
    background: #EBEDF0;
    position: relative;
    top: 8px;
  }
}
```
:::

## 响应式布局

:::demo Layout.Sider 支持响应式布局。

> 说明：配置 `breakpoint` 属性即生效，视窗宽度小于 `breakpoint` 时 Sider 缩小为 `collapsedWidth` 宽度，若将 `collapsedWidth` 设置为零，会出现特殊 trigger。

```js
render(){
  const { Header, Content, Footer, Sider } = Layout;
  return(
    <Layout className="components-layout-demo-responsive">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo">
          <Icon type="logo" className="img-icon-14 fishdicon" />
          <span className="logo-text">Fish Design</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <IconBargraph className="img-icon-14 fishdicon"  />
            <span>功能项一</span>
          </Menu.Item>
          <Menu.Item key="2">
            <IconGrid className="img-icon-14 fishdicon" />
            <span>功能项二</span>
          </Menu.Item>
          <Menu.Item key="3">
            <IconFolder className="img-icon-14 fishdicon" />
            <span>功能项三</span>
          </Menu.Item>
          <Menu.Item key="4">
            <IconBookmark className="img-icon-14 fishdicon" />
            <span>功能项四</span>
          </Menu.Item>
          <Menu.Item key="5">
            <IconPie className="img-icon-14 fishdicon" />
            <span>功能项五</span>
          </Menu.Item>
          <Menu.Item key="6">
            <IconFile className="img-icon-14 fishdicon"  />
            <span>功能项六</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}></Header>
        <Content>
          <div className="components-layout-demo-responsive-content">
            内容模块
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Fish Design
        </Footer>
      </Layout>
    </Layout>
  )
}
```
```less
.components-layout-demo-responsive {
  border: 1px solid #F2F2F5;
  .logo {
    height: 60px;
    padding-top: 18px;
    padding-left: 18px;
    background: #337EFF;
    img {
      width: 26px;
      height: 26px;
    }
    .logo-text {
       display: inline-block;
       color: #fff;
       position: relative;
       bottom: 6px;
       left: 6px;
    }
  }
  &-content {
    text-align: center;
    line-height: 280px;
    min-height: 280px;
  }
}
```
:::

## API

```html
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

布局容器。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器 className | String | - |
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | Boolean | false |
| style | 指定样式 | Object | - |

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

### Layout.Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breakpoint | 触发响应式布局的[断点](/components/grid#api) | Enum {'xs', 'sm', 'md', 'lg', 'xl', 'xxl'} | - |
| className | 容器 className | String | - |
| collapsed | 当前收起状态 | Boolean | false |
| collapsedWidth | 收缩宽度，设置为 0 会出现特殊 trigger | Number | 64 |
| collapsible | 是否可收起 | Boolean | false |
| defaultCollapsed | 是否默认收起 | Boolean | false |
| onBreakpoint | 触发响应式布局[断点](/components/grid#api)时的回调 | (broken) => Void | - |
| onCollapse | 展开、收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => Void | - |
| reverseArrow | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用 | Boolean | false |
| style | 指定样式 | Object | - | - |
| theme | 主题颜色 | Enum {'light', 'dark'} | "dark" |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | String \| ReactNode | - |
| width | 宽度 | Number \| String | 160 |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```
