# Tabs 标签页 【交互：蒋蕊遥 |视觉：徐剑杰 |开发：高志友】

选项卡切换组件。

## 何时使用

适用于二级及以上菜单，用于区分多个平级的页面，以分类承载更多页面信息。

Fish Design 提供了四种不同样式的选项卡，分别用于不同的场景。

- 标准线条式页签，用于容器内部的主功能切换，支持纵向排版，这是最常用的 Tabs。  
- 卡片式页签，提供可关闭的样式，常用于容器顶部，支持纵向排版。  
- 分段式页签，一般仅在页面顶部使用，不适用于纵向排版。
- 无边框分段式页签，常用于较低层级的菜单，一般仅在页面顶部使用，不适用于纵向排版。

## 标准线条式页签

:::demo 默认选中第一项。
可以设置禁用某一项。

```js
render(){
  const TabPane = Tabs.TabPane;
  return(
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
      <TabPane tab="Tab 2" disabled key="2">Tab 2</TabPane>
      <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
    </Tabs>
  );
}
```
:::

## 滚动

:::demo 可以左右、上下滚动，容纳更多页签。

```js
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }

  handleModeChange = (e) => {
    const mode = e.target.value;
    this.setState({ mode });
  }

  render() {
    const { mode } = this.state;
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group>
        <Tabs
          defaultActiveKey="1"
          tabPosition={mode}
          style={{ height: 220 }}
        >
          <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
          <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
          <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
          <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
          <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
          <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
          <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
          <TabPane tab="Tab 10" key="10">Content of tab 10</TabPane>
          <TabPane tab="Tab 11" key="11">Content of tab 11</TabPane>
        </Tabs>
      </div>
    );
  }
```
:::

## 大小

:::demo 大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。

```js
  state = { size: 'small' };

  onChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { TabPane } = Tabs;
    const { size } = this.state;
    return (
      <div>
        <Radio.Group value={size} onChange={this.onChange} style={{ marginBottom: 16 }}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
        <Tabs defaultActiveKey="1" size={size}>
          <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
        </Tabs>
      </div>
    );
  }

```
:::

## 排版

:::demo 有上、下、左、右四种排版方式，`tabPosition = "left" | "right" | "top" | "bottom"`。

```js
  state = {
    tabPosition: 'top',
  }

  changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  }

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <div>
          <Radio.Group value={this.state.tabPosition} onChange={this.changeTabPosition} style={{ marginBottom: 16 }}>
            <Radio.Button value="top">top</Radio.Button>
            <Radio.Button value="bottom">bottom</Radio.Button>
            <Radio.Button value="left">left</Radio.Button>
            <Radio.Button value="right">right</Radio.Button>
          </Radio.Group>
        </div>
        <Tabs tabPosition={this.state.tabPosition}>
          <TabPane tab="Tab 1" key="1">Content of Tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
        </Tabs>
      </div>
    );
  }
```
:::


## 图标

:::demo 有图标的页签。

```js

  render(){
    const TabPane = Tabs.TabPane;
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><img className="img-icon-14" src="./static/icons/demo-phone.svg" />Tab 1</span>} key="1">Tab 1</TabPane>
        <TabPane tab={<span><img className="img-icon-14" src="./static/icons/demo-mail.svg" />Tab 2</span>} key="2">Tab 2</TabPane>
      </Tabs>
    );
  }
```
:::

## 附加内容

:::demo 可以在页签右边添加附加操作。

```js

  render(){
    const TabPane = Tabs.TabPane;
    const operations = <Button>Extra Action</Button>;
    return (
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
        <TabPane tab="Tab 2" key="2">Tab 2</TabPane>
      </Tabs>
    );
  }
```
:::

## 卡片式页签

:::demo 常用于容器顶部，支持纵向排版。

```js
callback=(key) => {
  console.log(key);
}

render(){
  const TabPane = Tabs.TabPane;
  return (
    <Tabs onChange={this.callback} type="card">
      <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
      <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
      <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
    </Tabs>
  );
}
```
:::

## 可增删的卡片式页签

:::demo 支持新增和关闭页签。
使用 `closable={false}` 禁止关闭。

```js
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
      </Tabs>
    );
  }
```
:::

## 自定义新增页签触发按钮

:::demo 隐藏默认的页签增加图标，给自定义触发按钮绑定事件。

```js
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.add}>ADD</Button>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }
```
:::

## 分段式页签

:::demo 分段式页签，不适用于纵向排版。

```js
render(){
  const TabPane = Tabs.TabPane;
  return(
    <Tabs defaultActiveKey="1" type="section">
      <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
      <TabPane tab="Tab 2" key="2">Tab 2</TabPane>
      <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
    </Tabs>
  )
}
```
:::

## 无边框分段式页签

:::demo 无边框分段式页签，不适用于纵向排版。

```js
render(){
  const TabPane = Tabs.TabPane;
  return(
    <Tabs defaultActiveKey="1" type="borderless-section">
      <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
      <TabPane tab="Tab 2" key="2">Tab 2</TabPane>
      <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
    </Tabs>
  )
}
```
:::

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前激活 tab 面板的 key | String | - |
| animated | 是否使用动画切换 Tabs，在 `tabPosition="top" \| "bottom"` 时有效 | Boolean \| {inkBar: Boolean, tabPane: Boolean} | false, 当 type="line" 时为 true |
| className | 容器类名 | String | - |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | String | 第一个面板 |
| hideAdd | 是否隐藏加号图标，在 `type="editable-card"` 时有效 | Boolean | false |
| loading | 是否显示 Loading 状态，异步加载数据时可选择使用 | Boolean | false |
| onChange | 切换面板的回调 | (activeKey) => Void | - |
| onEdit | 新增和删除页签的回调，在 `type="editable-card"` 时有效 | (targetKey, action) => Void | - |
| onNextClick | next 按钮被点击的回调 | () => Void | - |
| onPrevClick | prev 按钮被点击的回调 | () => Void | - |
| onTabClick | tab 被点击的回调 | () => Void | - |
| size | 大小 | Enum {'default', 'large', 'small'} | 'default' |
| style | 容器样式 | Object | - |
| tabBarExtraContent | tab bar 上额外的元素 | ReactNode | - |
| tabBarGutter | tabs 之间的间隙，在 `type="section" \| "borderless-section"` 时无效 | Number | - |
| tabBarStyle | tab bar 的样式 | Object | - |
| tabPosition | 页签位置 | Enum {'top', 'right', 'bottom', 'left'} | 'top' |
| type | 页签的基本样式 | Enum {'line', 'card', 'editable-card', 'section', 'borderless-section'} | 'line' |

### Tabs.TabPane

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closable | 页签是否可以被关闭，在 `type="editable-card"` 时有效 | Boolean | true |
| forceRender | 被隐藏时是否渲染 DOM 结构 | Boolean | false |
| key | 对应 activeKey | String | - |
| tab | 选项卡头显示文字 | String \| ReactNode | - |
