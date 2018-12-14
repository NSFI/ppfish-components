# Button 按钮 【交互：刘莹莹 |视觉：徐剑杰 |开发：吴圣筑】

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 按钮类型

:::demo 按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮,主按钮在同一个操作区域最多出现一次。
```js
render(){
 return(<div className="components-button-demo-basic">
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="danger">Danger</Button>
  </div>)
}
```

```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

[class^="components-button-demo-"] .fishd-btn-group {
  margin-right: 8px;
}

[class^="components-button-demo-"] .fishd-btn-group > .fishd-btn {
  margin-right: 0;
}
```
:::

## 按钮组合

:::demo 可以将多个 `Button` 放入 `Button.Group` 的容器中。通过设置 `size` 为 `large` `small` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。

```js

render(){
  const ButtonGroup = Button.Group;
  return(<div className="components-button-demo-button-group">
    <h4>Basic</h4>
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button>OK</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button disabled>L</Button>
      <Button disabled>M</Button>
      <Button disabled>R</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button>L</Button>
      <Button>M</Button>
      <Button>R</Button>
    </ButtonGroup>

    <h4>With Icon</h4>
    <ButtonGroup>
      <Button type="primary">
        <Icon type="left" />Go back
      </Button>
      <Button type="primary">
        Go forward<Icon type="right" />
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button type="primary" icon="upload-cloud" />
      <Button type="primary" icon="download-line" />
    </ButtonGroup>
  </div>)
}
```
```less
.components-button-demo-button-group {
  h4 {
    margin: 16px 0;
    font-size: 14px;
    line-height: 1;
    font-weight: normal;
    &:first-child {
      margin-top: 0;
    }
  }
  .fishd-btn-group {
    margin-right: 8px;
  }
}

[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

[class^="components-button-demo-"] .fishd-btn-group {
  margin-right: 8px;
}

[class^="components-button-demo-"] .fishd-btn-group > .fishd-btn {
  margin-right: 0;
}
```
:::


## 不可用状态

:::demo 添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

```js
render(){
  return(<div className="components-button-demo-disabled">
    <Button type="primary">Primary</Button>
    <Button type="primary" disabled>Primary(disabled)</Button>
    <br />
    <Button>Default</Button>
    <Button disabled>Default(disabled)</Button>
    <br />
    <div style={{ padding: '8px 8px 0 8px', background: 'rgb(190, 200, 200)' }}>
      <Button ghost>Ghost</Button>
      <Button ghost disabled>Ghost(disabled)</Button>
    </div>
  </div>)
}
```
```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

[class^="components-button-demo-"] .fishd-btn-group {
  margin-right: 8px;
}

[class^="components-button-demo-"] .fishd-btn-group > .fishd-btn {
  margin-right: 0;
}
```

:::


## 幽灵按钮

:::demo 幽灵按钮将其他按钮的内容反色，背景变为透明，常用在有色背景上。

```js
render(){
  return(
  <div style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }} className="components-button-demo-ghost">
    <Button type="primary" ghost>Primary</Button>
    <Button ghost>Default</Button>
    <Button type="danger" ghost>danger</Button>
  </div>);
}
```
```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

[class^="components-button-demo-"] .fishd-btn-group {
  margin-right: 8px;
}

[class^="components-button-demo-"] .fishd-btn-group > .fishd-btn {
  margin-right: 0;
}
```

:::

## 图标按钮

:::demo 当需要在 `Button` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 `Button` 内使用 `Icon` 组件。

如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。

```js
render(){
  return(<div className="components-button-demo-icon">
    <Button type="primary" shape="circle" icon="search-line" />
    <Button type="primary" icon="search-line">Search</Button>
    <Button shape="circle" icon="search-line" />
    <Button icon="search-line">Search</Button>
  </div>)
}
```
```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

[class^="components-button-demo-"] .fishd-btn-group {
  margin-right: 8px;
}

[class^="components-button-demo-"] .fishd-btn-group > .fishd-btn {
  margin-right: 0;
}
```

:::


## 加载中状态

:::demo 添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

```js
  constructor(){
    super();
    this.state = {
      loading: false,
      iconLoading: false,
    }
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

  render() {
    return (
      <span className="components-button-demo-loading">
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <br />
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
          Click me!
        </Button>
        <Button type="primary" icon="download-line" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
          Click me!
        </Button>
        <br />
        <Button shape="circle" loading />
        <Button type="primary" shape="circle" loading />
      </span>
    );
  }
```
```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

[class^="components-button-demo-"] .fishd-btn-group {
  margin-right: 8px;
}

[class^="components-button-demo-"] .fishd-btn-group > .fishd-btn {
  margin-right: 0;
}
```
:::

## 多个按钮组合

:::demo 按钮组合使用时，推荐使用1个主操作 + n 个次操作，3个以上操作时把更多操作放到 `Dropdown.Button` 中组合使用。


```js

handleMenuClick=(e) => {
  console.log('click', e);
}

render(){
  const menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );
  return(
  <div className="components-button-demo-multiple">
    <Button type="primary">primary</Button>
    <Button>secondary</Button>
    <Dropdown overlay={menu}>
      <Button>
        Actions <Icon type="down" />
      </Button>
    </Dropdown>
  </div>)
}
```
```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

[class^="components-button-demo-"] .fishd-btn-group {
  margin-right: 8px;
}

[class^="components-button-demo-"] .fishd-btn-group > .fishd-btn {
  margin-right: 0;
}
```
:::


## 按钮尺寸

:::demo 按钮有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。


```js

  state = {
    size: 'large',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const size = this.state.size;
    return (
      <div className="components-button-demo-size">
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br /><br />
        <Button type="primary" size={size}>Primary</Button>
        <Button size={size}>Normal</Button>
        <Button type="danger" size={size}>Danger</Button>
        <br />
        <Button type="primary" shape="circle" icon="download-line" size={size} />
        <Button type="primary" icon="download-line" size={size}>下载</Button>
        <br />
        <Button.Group size={size}>
          <Button type="primary">
            <Icon type="left" />Backward
          </Button>
          <Button type="primary">
            Forward<Icon type="right" />
          </Button>
        </Button.Group>
      </div>
    );
  }
```
```less
[class^="components-button-demo-"] .fishd-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

[class^="components-button-demo-"] .fishd-btn-group {
  margin-right: 8px;
}

[class^="components-button-demo-"] .fishd-btn-group > .fishd-btn {
  margin-right: 0;
}
```
:::

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 按钮失效状态 | Boolean | false |
| ghost | 幽灵属性，使按钮背景透明 | Boolean | false |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | String | - |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | Enum | 'button' |
| icon | 设置按钮的图标类型 | String | - |
| loading | 设置按钮载入状态 | Boolean \| { delay: Number } | false |
| onClick | `click` 事件的 handler | () => Void | - |
| shape | 设置按钮形状 | Enum {'circle', 'circle-outline'} | - |
| size | 设置按钮大小 | Enum {'small', 'large', 'default'} | 'default' |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | String | - |
| type | 设置按钮类型 | Enum {'primary', 'dashed', 'danger', 'default'} | 'default' |

`<Button>Hello world!</Button>` 最终会被渲染为 `<button><span>Hello world!</span></button>`，并且除了上表中的属性，其它属性都会直接传到 `<button></button>`。

`<Button href="http://example.com">Hello world!</Button>` 则会渲染为 `<a href="http://example.com"><span>Hello world!</span></a>`。
