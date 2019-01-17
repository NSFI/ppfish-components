# Drawer 抽屉组件 【交互：李东岳 |视觉：徐剑杰 |开发：王晓玲】

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
    visible: false
  };
}

onChange = (bool) => {
  console.log(bool);
}

onSwitch = () => {
  this.setState({
    visible: !this.state.visible,
  });
}

onCloseClick = () => {
  this.setState({
    visible: !this.state.visible,
  });
}

drawerBaiscDemo = () => {  
  return (
    <div>
      <Drawer
        handler={false}
        level={null}
        width="30vw"
        visible={this.state.visible}
        closed={true}
        mask={false}
        onChange={this.onChange}
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
              title={<span>Navigation One</span>}
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
              title={<span>Navigation Two</span>}
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
              title={<span>Navigation Three</span>}
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
          {!this.state.visible ? '打开抽屉' : '关闭抽屉'}
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
                title={<span>Navigation One</span>}
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
                title={<span>Navigation Two</span>}
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
                title={<span>Navigation Three</span>}
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
      isOpen: false
    };
  }

  handleDrawerChange = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  drawerWithCustomerButton = () => {
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

    return (
      <div>
        <Drawer
          placement="right"
          width="20vw"
          visible={this.state.isOpen}
          handler={<div className="drawer-handle" style={style}>{this.state.isOpen ? '收起' : '展开'}</div>}
          onHandleClick={this.handleDrawerChange}
        >
          <Menu
            style={{height: '200%'}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.SubMenu
              key="sub1"
              title={<span>Navigation One</span>}
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
              title={<span>Navigation Two</span>}
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
              title={<span>Navigation Three</span>}
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Drawer>
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
    visible: false,
    visibleChild: false,
    visibleChildren: false,
  }
}

onClick = () => {
  this.setState({
    visible: !this.state.visible,
  });
}

onChildClick = () => {
  this.setState({
    visibleChild: !this.state.visibleChild,
  })
}

onChildrenClick = () => {
  this.setState({
    visibleChildren: !this.state.visibleChildren,
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
        visible={this.state.visible}
        onMaskClick={this.onClick}
        level={null}
      >
        <div>
          <Button type="primary" onClick={this.onChildClick}>打开子级</Button>
          <Drawer
            width="320"
            handler={false}
            visible={this.state.visibleChild}
            onMaskClick={this.onChildClick}
          >
            <div>
              二级抽屉
              <Button type="primary" onClick={this.onChildrenClick}>打开子级</Button>
              <Drawer
                width="200"
                handler={false}
                visible={this.state.visibleChildren}
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

## 加入拖拽功能

- 抽屉组件可以与其他组件配合使用，实现复杂的功能；
- 下面示例中使用的拖拽组件文档链接请参考：https://github.com/STRML/react-resizable
- 注意：
  - 从左、右两边弹出时，拖拽的实现会有些差别，详情见下面的示例;
  - 拖拽时为了避免内容被选中，抽屉组件增加了禁止选中的样式，如果你需要选中里面的内容，请参考下面的`onResizeStart`和`onResizeStop`方法

### 从左边弹出

:::demo

```js
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      width: 450,
    };
  }

  onChange = (bool) => {
    console.log(bool);
  }

  onTouchEnd = () => {
    this.setState({
      visible: false,
    });
  }

  onSwitch = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onCloseClick = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onResize = (e, { size }) => {
    this.setState({
      width: size.width,
    })
  }
  
  onResizeStart = () => {
    document.querySelector('.drawer').style['user-select'] = 'none';
  }

  onResizeStop = () => {
    document.querySelector('.drawer').style['user-select'] = 'auto';
  }

  drawerDrag = () => {
    return (
      <div>
        <Drawer
          handler={false}
          level={null}
          width={this.state.width}
          visible={this.state.visible}
          closed={true}
          onChange={this.onChange}
          onMaskClick={this.onTouchEnd}
          onCloseClick={this.onCloseClick}
          placement="left"
        >
          <Resizable
            width={this.state.width}
            height={0}
            onResize={this.onResize}
            onResizeStart={this.onResizeStart}
            onResizeStop={this.onResizeStop}
          >
            <div>
              <Menu
                style={{ height: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                <Menu.SubMenu
                  key="sub1"
                  title={<span>Navigation One</span>}
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
                  title={<span>Navigation Two</span>}
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
                  title={<span>Navigation Three</span>}
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </Resizable>
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
            {!this.state.visible ? '打开抽屉' : '关闭抽屉'}
          </Button>
        </div>
      </div>
    );
  }
  
  render() {
    //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考上面的 drawerDrag
    return(
      <div className="browser-mockup">
        <iframe src="./demo/drawerDragLeft.html" height={450}></iframe>
      </div>
    )
  }
```

```less
.react-resizable {
  position: relative;
}

.react-resizable-handle {
  position: absolute;
  width: 10px;
  height: 100%;
  bottom: 0;
  right: -5px;
  cursor: col-resize;
}
```
:::

### 从右边弹出

:::demo

```js
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      drawerWidth: 450,
      resizeWidth: document.body.offsetWidth - 450
    };
  }

  onChange = (bool) => {
    console.log(bool);
  }

  onTouchEnd = () => {
    this.setState({
      visible: false,
    });
  }

  onSwitch = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onCloseClick = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onResize = (e, { size }) => {
    this.setState({
      resizeWidth: size.width,
      drawerWidth: document.body.offsetWidth - size.width
    })
  }

  drawerDrag = () => {
    return (
      <div>
        <Drawer
          handler={false}
          level={null}
          width={this.state.drawerWidth}
          visible={this.state.visible}
          closed={true}
          onChange={this.onChange}
          onMaskClick={this.onTouchEnd}
          onCloseClick={this.onCloseClick}
        >
          <Resizable
            width={this.state.resizeWidth}
            height={0}
            minConstraints={[document.body.offsetWidth - 1000, 0]}
            maxConstraints={[document.body.offsetWidth - 300, 0]}
            onResize={this.onResize}
            draggableOpts={{
              offsetParent: document.body
            }}
          >
            <div>
              <Menu
                style={{ height: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                <Menu.SubMenu
                  key="sub1"
                  title={<span>Navigation One</span>}
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
                  title={<span>Navigation Two</span>}
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
                  title={<span>Navigation Three</span>}
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </Resizable>
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
            {!this.state.visible ? '打开抽屉' : '关闭抽屉'}
          </Button>
        </div>
      </div>
    );
  }
  
  render() {
    //为了演示效果，该demo已打包为单独的页面嵌入iframe，核心代码可参考上面的 drawerDrag
    return(
      <div className="browser-mockup">
        <iframe src="./demo/drawerDragRight.html" height={450}></iframe>
      </div>
    )
  }
```

```less
.react-resizable {
  position: relative;
}

.react-resizable-handle {
  position: absolute;
  width: 10px;
  height: 100%;
  bottom: 0;
  left: -5px;
  cursor: col-resize;
}
```
:::

## API

| 参数      | 说明          | 类型      |  默认值  |
|---------- |-------------- |---------- |-------- |
| className | 对话框外层容器的类名 | String | - |
| closed | 是否展示关闭按钮 | Boolean | false |
| duration | 过渡效果需要的时间 | String | '.3s' |  
| ease | 过渡效果的时间曲线 | String | 'cubic-bezier(0.78, 0.14, 0.15, 0.86)' |
| getContainer | 指定Drawer挂载的HTML节点 | () => ReactNode | () => document.body |
| handler | 是否显示触发按钮或自定义触发按钮样式 | Boolean \| ReactNode | `<div className="drawer-handle"><i className="drawer-handle-icon" /></div>` |
| height | 高度 | String \| Number | - |
| level | 随着抽屉移动的元素 | Enum {'all',null,className,id,tagName} | 'all' |
| mask | 是否展示遮罩 | Boolean | true |
| maskStyle | 遮罩样式 | Object | - |
| onChange | 展开或收起的回调 | (status:Boolean) => Void | - |
| onCloseClick | 点击关闭按钮的回调 | (e) => Void | - |
| onHandleClick | 点击触发按钮的回调 | (e) => Void | - |
| onMaskClick | 点击遮罩的回调 | (e) => Void | - |
| placement | 抽屉的方向 | Enum {'left', 'right', 'top', 'bottom'} | 'right' |
| style | 可用于设置 Drawer 的样式，调整浮层位置等 | Object | - |
| visible | 打开或关闭抽屉 | Boolean | false | 
| width | 宽度 | String \| Number | - |
