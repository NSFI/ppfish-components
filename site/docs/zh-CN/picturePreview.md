# PicturePreview 图片查看器 【交互：翁宇宇 |视觉：徐剑杰 |开发：高志友】

预览图片，对图片进行等比缩放、全屏显示、放大、缩小、旋转90度、保存等操作。

## 何时使用

当图片因大小比例、展示角度等原因不适合观看或想连续观看一组图片时，可以使用图片查看器调整或观看。

## 基本使用

:::demo 基本使用方式。

```js
  constructor() {
    super();

    this.state = {
      visible: false,
      activeIndex: 0
    };
  }

  handleOpen = (index) => {
    this.setState({
      visible: true,
      activeIndex: index
    });
  };

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, activeIndex } = this.state;
    return (
        <div>
          <div className="demo-picpreview">
            <div className="tips">点击图片预览</div>
            <div className="pics">
              {
                this.props.source && this.props.source.map((item, index) =>
                  <div key={'demo_pic_'+index} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={item.src} alt={item.name} width="60px" height="60px" />
                    <div className="name">{item.name}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            activeIndex={activeIndex}
            source={this.props.source}
            visible={visible}
            onClose={this.handleClose}
          />
        </div>
    );
  }
```
:::


## 展示工具栏

:::demo 展示工具栏。

```js
  constructor() {
    super();

    this.state = {
      visible: false,
      activeIndex: 0
    };
  }

  handleOpen = (index) => {
    this.setState({
      visible: true,
      activeIndex: index
    });
  };

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, activeIndex } = this.state;
    return (
        <div>
          <div className="demo-picpreview">
            <div className="tips">点击图片预览</div>
            <div className="pics">
              {
                this.props.source && this.props.source.map((item, index) =>
                  <div key={'demo_pic_'+index} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={item.src} alt={item.name} width="60px" height="60px" />
                    <div className="name">{item.name}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            activeIndex={activeIndex}
            source={this.props.source}
            toolbar={true}
            visible={visible}
            onClose={this.handleClose}
          />
        </div>
    );
  }
```
:::


## 支持拖动

:::demo 支持拖动。

```js
  constructor() {
    super();

    this.state = {
      visible: false,
      activeIndex: 0
    };
  }

  handleOpen = (index) => {
    this.setState({
      visible: true,
      activeIndex: index
    });
  };

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, activeIndex } = this.state;
    return (
        <div>
          <div className="demo-picpreview">
            <div className="tips">点击图片预览</div>
            <div className="pics">
              {
                this.props.source && this.props.source.map((item, index) =>
                  <div key={'demo_pic_'+index} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={item.src} alt={item.name} width="60px" height="60px" />
                    <div className="name">{item.name}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            activeIndex={activeIndex}
            source={this.props.source}
            draggable={true}
            toolbar={true}
            visible={visible}
            onClose={this.handleClose}
          />
        </div>
    );
  }
```
:::


## 隐藏遮罩层

:::demo 隐藏遮罩层。

```js
  constructor() {
    super();

    this.state = {
      visible: false,
      activeIndex: 0
    };
  }

  handleOpen = (index) => {
    this.setState({
      visible: true,
      activeIndex: index
    });
  };

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, activeIndex } = this.state;
    return (
        <div>
          <div className="demo-picpreview">
            <div className="tips">点击图片预览</div>
            <div className="pics">
              {
                this.props.source && this.props.source.map((item, index) =>
                  <div key={'demo_pic_'+index} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={item.src} alt={item.name} width="60px" height="60px" />
                    <div className="name">{item.name}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            activeIndex={activeIndex}
            source={this.props.source}
            draggable={true}
            toolbar={true}
            mask={false}
            visible={visible}
            onClose={this.handleClose}
          />
        </div>
    );
  }
```
:::


## 手动构造子节点

:::demo 手动构造子节点。

```js
  constructor() {
    super();

    this.state = {
      visible: false,
      activeIndex: 0
    };
  }

  handleOpen(index) {
    this.setState({
      visible: true,
      activeIndex: index
    });
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, activeIndex } = this.state;
    const { source } = this.props;
    return (
        <div>
          <div className="demo-picpreview">
            <div className="tips">点击图片预览</div>
            <div className="pics">
              {
                this.props.source && this.props.source.map((item, index) =>
                  <div key={'demo_pic_'+index} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={item.src} alt={item.name} width="60px" height="60px" />
                    <div className="name">{item.name}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            activeIndex={activeIndex}
            visible={visible}
            onClose={this.handleClose}
          >
            {
              source && source.map((item, index) => {
                return (
                  <img key={'pic_' + index} src={item.src} name={item.name}/>
                );
              })
            }
          </PicturePreview>
        </div>
    );
  }
```
:::

## API
|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| activeIndex | 当前展示第几张图片 | Number | 0 |
| className | 图片容器类名 | String | - |
| draggable | 是否可拖动 | Boolean | false |
| esc | 是否允许通过按 ESC 键关闭 | Boolean | true |
| mask | 是否展示遮罩层 | Boolean | true |
| onClose | 关闭后的回调函数 | () => Void | - |
| progress | 是否展示图片总数和当前进度 | Boolean | false |
| source | 设置图片的源数据，可选，格式为 `[{src: ""[, name: ""]}]`。当不设置 source 时可以手动构造子节点，子节点需是 `img` 标签，且包含 `src` 属性。若 source 与子节点同时存在，子节点将被忽略。 | Array | [] |
| style | 图片容器样式 | Object | - |
| toolbar | 是否展示工具栏 | Boolean | false |
| visible | 是否展示图片查看器 | Boolean | false |
| getContainer | 指定 PicturePreview 挂载的 HTML 节点 | (instance) => HTMLElement | () => document.body |
