# Drawer 抽屉组件

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

## 何时使用

* 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
* 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## 基础用法

:::demo

```js
constructor(props) {
  super(props);
  this.state = {
    open: false
  };
}

onChange = (bool) => {
  console.log(bool);
}

onTouchEnd = () => {
  this.setState({
    open: false,
  });
}

onSwitch = () => {
  this.setState({
    open: !this.state.open,
  });
}

onCloseClick = () => {
  this.setState({
    open: !this.state.open,
  });
}

drawerBaiscDemo = () => {  
  return (
    <div>
      <Drawer
        handler={false}
        level={null}
        width="30vw"
        visible={this.state.open}
        close={true}
        onChange={this.onChange}
        onMaskClick={this.onTouchEnd}
        onCloseClick={this.onCloseClick}
      >
        <div>
          <Menu
            style={{ height: '200%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.SubMenu
              key="sub1"
              title={<span><Icon type="mail" /><span>Navigation One</span></span>}
            >
              <Menu.ItemGroup key="g1" title="Item 1">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Item 2">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub2"
              title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}
            >
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub4"
              title={<span><Icon type="setting" /><span>Navigation Three</span></span>}
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Drawer>
      <div
        style={{
          width: '100%', height: 450,
          textAlign: 'center', lineHeight: '450px',
        }}
      >
        内容区块
        <Button
          type="primary"
          onClick={this.onSwitch}
          style={{marginLeft: 20}}
        >
          {!this.state.open ? '打开抽屉' : '关闭抽屉'}
        </Button>
      </div>
    </div>
  )
}

render() {
  //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考上面的 drawerBaiscDemo
  return(
    <div className="browser-mockup">
      <iframe src="./demo/drawerBasic.html" height={450}></iframe>
    </div>
  )
}
```
:::


## 带触发按钮的抽屉

提供左、右、上、下四种位置可供选择

:::demo 带触发按钮的抽屉，点击触发按钮抽屉滑出，点击遮罩区或再次点击触发按钮关闭。`handler` 控制是否显示触发按钮，默认为false

```js
  constructor(props) {
    super(props);
    this.state = {
      placement: 'right',
      childShow: true,
      height: null,
    };
  }
  
  onChange = (value) => {
    this.setState({
      placement: value,
      width: value === 'right' || value === 'left' ? '20vw' : null,
      childShow: false, // 删除子级，删除切换时的过渡动画。。。
    }, () => {
      this.setState({
        childShow: true,
      });
    });
  }
  
  drawerWithButton = () => {
    return (
      <div >
        {this.state.childShow && (
          <Drawer
            placement={this.state.placement}
            width={this.state.width}
          >
            <Menu
              style={{ height: '200%' }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <Menu.SubMenu
                key="sub1"
                title={<span><Icon type="mail" /><span>Navigation One</span></span>}
              >
                <Menu.ItemGroup key="g1" title="Item 1">
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="Item 2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub2"
                title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}
              >
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </Menu.SubMenu>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub4"
                title={<span><Icon type="setting" /><span>Navigation Three</span></span>}
              >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Drawer>
        )}
        <div
          style={{
            width: '100%', height: 450,
            textAlign: 'center', lineHeight: '450px',
          }}
        >
          选择位置：
          <Select
            style={{ width: 200, marginLeft: 20 }}
            defaultValue={this.state.placement}
            onChange={this.onChange}
          >
            <Option value="left">左边 left</Option>
            <Option value="top">上面 top</Option>
            <Option value="right">右边 right</Option>
            <Option value="bottom">下面 bottom</Option>
          </Select>
        </div>
      </div>
    )
  }

  render() {
    //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考上面的 drawerWithButton
    return(
      <div className="browser-mockup">
        <iframe src="./demo/drawerWithButton.html" height={450}></iframe>
      </div>
    )
  }
```
:::

## 自定义触发按钮的样式

:::demo

```js
  constructor(props) {
    super(props);
    this.state = {
      placement: 'right',
      childShow: true,
      width: '20vw',
      height: null,
      isOpen: false
    };
  }

  handleDrawerChange = (status) => {
    this.setState({
      isOpen: status
    });
  }

  drawerWithCustomerButton = () => {
    const customerHandler = () => {
      const style = {
        width: 102,
        height: 32,
        left: -102,
        lineHeight: 32,
        fontSize: 14,
        color: '#fff',
        backgroundColor: '#337EFF',
        border: '1px solid #337EFF',
        borderRadius: '2px 2px 0 0',
      };

      if(this.state.isOpen){
        return (
          <div className="drawer-handle" style={style}>收起</div>
        );
      }else{
        return (
          <div className="drawer-handle" style={style}>展开</div>
        );
      }
    };

    return (
      <div >
        {this.state.childShow && (
          <Drawer
            placement={this.state.placement}
            width={this.state.width}
            handler={customerHandler()}
            onChange={this.handleDrawerChange}
          >
            <Menu
              style={{ height: '200%' }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <Menu.SubMenu
                key="sub1"
                title={<span><Icon type="mail" /><span>Navigation One</span></span>}
              >
                <Menu.ItemGroup key="g1" title="Item 1">
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="Item 2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub2"
                title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}
              >
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </Menu.SubMenu>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sub4"
                title={<span><Icon type="setting" /><span>Navigation Three</span></span>}
              >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Drawer>
        )}
        <div
          style={{
            width: '100%', height: 450,
            textAlign: 'center', lineHeight: '450px',
          }}
        >
          自定义触发按钮的样式
        </div>
      </div>
    );
  }
  
  render() {
    //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码参考上面。
    return(
      <div className="browser-mockup">
        <iframe src="./demo/drawerWithCustomerButton.html" height={450}></iframe>
      </div>
    )
  }
```
:::

## 多层抽屉

:::demo

```js
constructor(props) {
  super(props);
  this.state = {
    open: false,
    openChild: false,
    openChildren: false,
  }
}

onClick = () => {
  this.setState({
    open: !this.state.open,
  });
}

onChildClick = () => {
  this.setState({
    openChild: !this.state.openChild,
  })
}

onChildrenClick = () => {
  this.setState({
    openChildren: !this.state.openChildren,
  });
}

drawerMultipleDemo = () => {
  return (
    <div >
      <div
        style={{
          width: '100%', height: 450,
          textAlign: 'center', lineHeight: '450px',
        }}
      >
        <Button type="primary" onClick={this.onClick}>打开抽屉</Button>
      </div>
      <Drawer
        width="520"
        handler={false}
        visible={this.state.open}
        onMaskClick={this.onClick}
        level={null}
      >
        <div>
          <Button type="primary" onClick={this.onChildClick}>打开子级</Button>
          <Drawer
            width="320"
            handler={false}
            visible={this.state.openChild}
            onMaskClick={this.onChildClick}
          >
            <div>
              二级抽屉
              <Button type="primary" onClick={this.onChildrenClick}>打开子级</Button>
              <Drawer
                width="200"
                handler={false}
                visible={this.state.openChildren}
                onMaskClick={this.onChildrenClick}
              >
                <div>
                  三级抽屉
                </div>
              </Drawer>
            </div>
          </Drawer>
        </div>
      </Drawer>
    </div>
  )
}
render() {
  //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考上面的 drawerMultipleDemo
  return(
    <div className="browser-mockup">
      <iframe src="./demo/drawerMultiple.html" height={450}></iframe>
    </div>
  )
}
```
:::

<style>
.browser-mockup {
    border-top: 2em solid rgba(230, 230, 230, 0.7);
    -webkit-box-shadow: 0 0.1em 0.5em 0 rgba(0, 0, 0, 0.28);
    box-shadow: 0 0.1em 0.5em 0 rgba(0, 0, 0, 0.28);
    position: relative;
    border-radius: 3px 3px 0 0;
}
.browser-mockup:before {
    display: block;
    position: absolute;
    content: '';
    top: -1.25em;
    left: 1em;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #f44;
    -webkit-box-shadow: 0 0 0 2px #f44, 1.5em 0 0 2px #9b3, 3em 0 0 2px #fb5;
    box-shadow: 0 0 0 2px #f44, 1.5em 0 0 2px #9b3, 3em 0 0 2px #fb5;
}
.browser-mockup:after {
    display: block;
    position: absolute;
    content: '';
    top: -1.6em;
    left: 5.5em;
    width: calc(100% - 6em);
    height: 1.2em;
    border-radius: 2px;
    background-color: white;
}
.browser-mockup iframe {
    width: 100%;
    border: 0;
}
</style>

## API

| 参数      | 说明          | 类型      |  默认值  |
|---------- |-------------- |---------- |-------- |
| className | 对话框外层容器的类名 | String | - |
| width | 宽度 | String \| Number | - |
| height | 高度 | String \| Number | - |
| visible | Drawer 是否可见 | Boolean | false | 
| placement | 抽屉的方向 | Enum {'left', 'right', 'top', 'bottom'} | 'right' |
| getContainer | 指定Drawer挂载的HTML节点 | () => ReactNode | () => document.body |
| style | 可用于设置 Drawer 的样式，调整浮层位置等 | Object | - |
| mask | 是否展示遮罩 | Boolean | true |
| closed | 是否展示关闭按钮 | Boolean | false |
| maskStyle | 遮罩样式 | Object | - |
| handler | 是否显示触发按钮或自定义触发按钮样式 | Boolean \| ReactNode | `<div className="drawer-handle"><i className="drawer-handle-icon" /></div>` |
| level | 随着抽屉移动的元素 | Enum {'all',null,className,id,tagName} | 'all' |
| onChange | 展开或收起的回调 | (status:Boolean) => Void | - |
| onMaskClick | 点击遮罩的回调 | (e) => Void | - |
| onHandleClick | 点击触发按钮的回调 | (e) => Void | - |
| onCloseClick | 点击关闭按钮的回调 | (e) => Void | - |
