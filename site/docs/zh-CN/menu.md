# Menu 导航菜单 【交互：刘莹莹 |视觉：徐剑杰 |开发：高志友】

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

## 水平菜单

:::demo 水平的顶部导航菜单。

```js
  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="demo-mail" />Nav1
        </Menu.Item>
        <Menu.Item key="pie">
          <Icon type="demo-pie" />Nav2
        </Menu.Item>
        <SubMenu title={<span><Icon type="demo-grid" />Nav3 - Submenu</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="disable" disabled>
          Nav4 - Disabled
        </Menu.Item>
        <Menu.Item key="fishd">
          <a href="https://www.163.com" target="_blank" rel="noopener noreferrer">Nav5 - Link</a>
        </Menu.Item>
      </Menu>
    );
  }
```
:::

## 垂直内嵌式菜单

:::demo 垂直菜单，子菜单内嵌在菜单区域。

```js
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="demo-mail" />Navigation One</span>}>
          <MenuItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="demo-pie" />Navigation Two</span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="demo-grid" />Navigation Three</span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
```
:::


## 垂直弹出式菜单

:::demo 子菜单是弹出的形式。

```js
handleClick=(e)=> {
  console.log('click', e);
};

render(){
  const SubMenu = Menu.SubMenu;
  const MenuItemGroup = Menu.ItemGroup;
  return(
      <Menu onClick={this.handleClick} style={{ width: 256 }} mode="vertical">
        <SubMenu key="sub1" title={<span>Navigation One</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Iteom 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span>Navigation Two</span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span>Navigation Three</span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
  )
}
```
:::

## 只展开当前父级菜单

:::demo 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。

```js
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    const SubMenu = Menu.SubMenu;
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
      >
        <SubMenu key="sub1" title={<span>Navigation One</span>}>
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span>Navigation Two</span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span>Navigation Three</span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
```
:::

## 切换主题

:::demo 内建了两套主题 `light|dark`，默认 `light`。

```js
  state = {
    theme: 'dark',
    current: '1',
  }

  changeTheme = (e) => {
    this.setState({
      theme: e.target.value,
    });
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    const SubMenu = Menu.SubMenu;
    return (
      <div>
        <Radio.Group onChange={this.changeTheme} defaultValue="dark" style={{ marginBottom: 10 }}>
          <Radio.Button value="dark">Dark</Radio.Button>
          <Radio.Button value="light">Light</Radio.Button>
        </Radio.Group>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" title={<span>Navigation One</span>}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span>Navigtion Two</span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span>Navigation Three</span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
```
:::


## API

```html
<Menu>
  <Menu.Item>菜单项</Menu.Item>
  <SubMenu title="子菜单">
    <Menu.Item>子菜单项</Menu.Item>
  </SubMenu>
</Menu>
```

### Menu

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | String | - |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 | Array<String> | - |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | Array<String> | - |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | Boolean | false |
| inlineCollapsed | inline 时菜单是否收起状态 | Boolean | - |
| inlineIndent | inline 模式的菜单缩进宽度 | Number | 24 |
| mode | 菜单类型 | Enum {'vertical', 'vertical-right', 'horizontal', 'inline'} | 'vertical' |
| multiple | 是否允许多选 | Boolean | false |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | Array<String> | - |
| selectable | 是否允许选中 | Boolean | true |
| selectedKeys | 当前选中的菜单项 key 数组 | Array<String> | - |
| style | 根节点样式 | Object | - |
| subMenuCloseDelay | 用户鼠标离开子菜单后关闭延时，单位：秒 | Number | 0.1 |
| subMenuOpenDelay | 用户鼠标进入子菜单后开启延时，单位：秒 | Number | 0 |
| theme | 主题颜色 | Enum {'light', 'dark'} | 'light' |
| onClick | 点击 MenuItem 调用此函数 | ({ item, key, keyPath }) => Void | - |
| onDeselect | 取消选中时调用，仅在 multiple 生效 | ({ item, key, selectedKeys }) => Void | - |
| onOpenChange | SubMenu 展开/关闭的回调 | (openKeys: Array<String>) => Void | - |
| onSelect | 被选中时调用 | ({ item, key, selectedKeys }) => Void | - |

> More options in [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | Boolean | false |
| key | item 的唯一标志 | String | - |

### Menu.SubMenu

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子菜单的菜单项 | Array<MenuItem \| SubMenu> | - |
| disabled | 是否禁用 | Boolean | false |
| key | 唯一标志 | String | - |
| title | 子菜单项值 | String \| ReactNode | - |
| onTitleClick | 点击子菜单标题 | ({ key, domEvent }) => Void | - |

### Menu.ItemGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 分组的菜单项 | Array<MenuItem> | - |
| title | 分组标题 | String \| ReactNode | - |

### Menu.Divider

菜单项分割线，只用在弹出菜单内。
