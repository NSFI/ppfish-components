# Dropdown 下拉菜单 【交互：缺失 | 视觉：徐剑杰 |开发：卿泽】

向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。


## 基本

:::demo 最简单的下拉菜单。

```js
render(){
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://qi.163.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.163.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://email.163.com/">3rd menu item</a>
      </Menu.Item>
    </Menu>
  );
  return(
  <Dropdown overlay={menu}>
    <a className="fishd-dropdown-link">
      Hover me <Icon type="bottom" style={{fontSize:12}}/>
    </a>
  </Dropdown>
  )
}
```
:::


## 弹出位置

:::demo 支持 6 个弹出位置。

```js

render(){
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.163.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://you.163.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://qi.163.com/">3rd menu item</a>
      </Menu.Item>
    </Menu>
  );
  return(
  <div className="components-dropdown-demo-placement">
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottomCenter">
      <Button>bottomCenter</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottomRight">
      <Button>bottomRight</Button>
    </Dropdown>
    <br />
    <Dropdown overlay={menu} placement="topLeft">
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="topCenter">
      <Button>topCenter</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="topRight">
      <Button>topRight</Button>
    </Dropdown>
  </div>
  )
}
```
:::

## 右键菜单

:::demo 默认是移入触发菜单，可以点击触发。

```js

render(){
  const menu = (
    <Menu>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  return (
  <Dropdown overlay={menu} trigger={['contextMenu']}>
    <span style={{ userSelect: 'none' }}>Right Click on Me</span>
  </Dropdown>)
}

```
:::

## 带下拉框的按钮

:::demo 左边是按钮，右边是额外的相关功能菜单。

```js

handleButtonClick=(e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
}

 handleMenuClick=(e) => {
  message.info('Click on menu item.');
  console.log('click', e);
}

render(){
  const menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );
  return(
  <div>
    <Dropdown.Button onClick={this.handleButtonClick} overlay={menu}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button style={{ marginLeft: 8 }} type={"primary"} onClick={this.handleButtonClick} overlay={menu}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      onClick={this.handleButtonClick}
      overlay={menu}
      disabled
      style={{ marginLeft: 8 }}
    >
      Dropdown
    </Dropdown.Button>
    <Dropdown overlay={menu}>
      <Button style={{ marginLeft: 8 }}>
        Button <Icon type="bottom" style={{fontSize:12}}/>
      </Button>
    </Dropdown>
    <Dropdown overlay={menu}>
      <Button type={"primary"} style={{ marginLeft: 8 }}>
        Button <Icon type="bottom" style={{fontSize:12}}/>
      </Button>
    </Dropdown>
  </div>)
}
```
:::

## 触发事件

:::demo 点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

```js
onClick =  ({ key }) => {
  message.info(`Click on item ${key}`);
};

render(){
  const menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd memu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  return(
  <Dropdown overlay={menu}>
    <a className="fishd-dropdown-link" >
      Hover me, Click menu item <Icon type="bottom" style={{fontSize:12}}/>
    </a>
  </Dropdown>
  )
}
```
:::

## 其他元素

:::demo 分割线和不可用菜单项。

```js

render(){
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a target="_blank" rel="noopener noreferrer" href="http://www.163.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="http://qi.163.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>3rd menu item（disabled）</Menu.Item>
    </Menu>
  );
  return (
  <Dropdown overlay={menu}>
    <a className="fishd-dropdown-link" >
      Hover me <Icon type="bottom" style={{fontSize:12}}/>
    </a>
  </Dropdown>
  )
}
```
:::

## 菜单隐藏方式

:::demo 默认是点击关闭菜单，可以关闭此功能。

```js
  state = {
    visible: false,
  };

  handleMenuClick = (e) => {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  }
  
  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }
  
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Clicking me will not close the menu.</Menu.Item>
        <Menu.Item key="2">Clicking me will not close the menu also.</Menu.Item>
        <Menu.Item key="3">Clicking me will close the menu</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <a className="fishd-dropdown-link">
          Hover me <Icon type="bottom" style={{fontSize:12}}/>
        </a>
      </Dropdown>
    );
  }
```
:::


## 多级菜单

:::demo 传入的菜单里有多个层级。

```js
render(){
  const SubMenu = Menu.SubMenu;
  const menu = (
    <Menu>
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
      <SubMenu title="sub menu">
        <Menu.Item>3rd menu item</Menu.Item>
        <Menu.Item>4th menu item</Menu.Item>
      </SubMenu>
      <SubMenu title="disabled sub menu" disabled>
        <Menu.Item>5d menu item</Menu.Item>
        <Menu.Item>6th menu item</Menu.Item>
      </SubMenu>
    </Menu>
  );
  return(
  <Dropdown overlay={menu}>
    <a className="fishd-dropdown-link" >
      Cascading menu <Icon type="bottom" style={{fontSize:12}}/>
    </a>
  </Dropdown>
  )
};
```
:::

## 触发方式

:::demo 默认是移入触发菜单，可以点击触发。

```js
render(){
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.163.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://qi.163.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  return(
  <Dropdown overlay={menu} trigger={['click']}>
    <a className="fishd-dropdown-link">
      Click me <Icon type="bottom" style={{fontSize:12}}/>
    </a>
  </Dropdown>
  )
}
```
:::

## API

属性如下

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | String | - |
| disabled | 菜单是否禁用 | Boolean | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) |  () => HTMLElement | () => document.body |
| onVisibleChange | 菜单显示状态改变时调用，参数为 visible | (visible) => Void | - |
| overlay | 菜单 | [Menu](https://nsfi.github.io/ppfish-components/#/components/menu) | - |
| placement | 菜单弹出位置 | Enum {'bottomLeft', 'bottomCenter' ,'bottomRight' ,'topLeft' ,'topCenter', 'topRight'}| 'bottomLeft' |
| style | 自定义样式 | Object | - |
| trigger | 触发下拉的行为 | Array<`click` | `hover` | `contextMenu`> | ['hover'] |
| visible | 菜单是否显示 | Boolean | - |

`overlay` 菜单使用 [Menu](https://nsfi.github.io/ppfish-components/#/components/menu/)，还包括菜单项 `Menu.Item`，分割线 `Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。
>
> Dropdown 下的 Menu 默认不可选中。如果需要菜单可选中，可以指定 `<Menu selectable>`.

## Dropdown.Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | String | - |
| disabled | 菜单是否禁用 | Boolean | - |
| onClick | 点击左侧按钮的回调，和 [Button](https://nsfi.github.io/ppfish-components/#/components/button/) 一致 | () => Void | - |
| onVisibleChange | 菜单显示状态改变时调用，参数为 visible | (visible) => Void | - |
| overlay | 菜单 | [Menu](https://nsfi.github.io/ppfish-components/#/components/menu/) | - |
| placement | 菜单弹出位置 | Enum {'bottomLeft', 'bottomCenter' ,'bottomRight' ,'topLeft' ,'topCenter', 'topRight'} | 'bottomLeft' |
| size | 按钮大小，和 [Button](https://nsfi.github.io/ppfish-components/#/components/button/) 一致 | String | 'default' |
| style | 自定义样式 | Object | - |
| trigger | 触发下拉的行为 | Array<`click` \| `hover` \| `contextMenu`> | ['hover'] |
| type | 按钮类型，和 [Button](https://nsfi.github.io/ppfish-components/#/components/button/) 一致 | String | 'default' |
| visible | 菜单是否显示 | Boolean | - |

<style>
.components-dropdown-demo-placement .fishd-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
