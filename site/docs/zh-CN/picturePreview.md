# 图片查看器

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

  handleOpen(index) {
    this.setState({
      visible: true,
      activeIndex: index
    });
  }

  render() {
    const { visible, activeIndex } = this.state;
    return (
        <div>
          <div className="demo-picpreview">
            <div className="tips">点击图片预览</div>
            <div className="pics">
              {
                this.props.source && this.props.source.map((each, index)=>
                  <div key={'demo_pic_'+index} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={each.url} alt={each.url} width="60px" height="60px" />
                    <div>{each.size}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            activeIndex={activeIndex}
            source={this.props.source}
            visible={visible}
          />
        </div>
    );
  }
```
:::

## 手动构造子节点

:::demo 显示面板指示点。

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

  render() {
    const { visible, activeIndex } = this.state;
    const { source } = this.props;
    return (
        <div>
          <div className="demo-picpreview">
            <div className="tips">点击图片预览</div>
            <div className="pics">
              {
                this.props.source && this.props.source.map((each, index)=>
                  <div key={'demo_pic_'+index} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={each.url} alt={each.url} width="60px" height="60px" />
                    <div>{each.size}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            activeIndex={activeIndex}
            visible={visible}
          >
            <div className="demo-picwarp"><img src={source && source[0].url} width="382" height="680" /></div>
            <div className="demo-picwarp"><img src={source && source[1].url} width="410" height="412" /></div>
            <div className="demo-picwarp"><img src={source && source[2].url} width="895" height="642" /></div>
            <div className="demo-picwarp"><img src={source && source[3].url} width="960" height="600" /></div>
            <div className="demo-picwarp"><img src={source && source[4].url} width="680" height="320" /></div>
          </PicturePreview>
        </div>
    );
  }
```
:::

## 显示面板指示点

:::demo 显示面板指示点。

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

  render() {
    const { visible, activeIndex } = this.state;
    return (
        <div>
          <div className="demo-picpreview">
            <div className="tips">点击图片预览</div>
            <div className="pics">
              {
                this.props.source && this.props.source.map((each, index)=>
                  <div key={'demo_pic_'+index} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={each.url} alt={each.url} width="60px" height="60px" />
                    <div>{each.size}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            activeIndex={activeIndex}
            dots={true}
            source={this.props.source}
            visible={visible}
          />
        </div>
    );
  }
```
:::


## API
|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| activeIndex | 当前展示第几张图片 | Number | 0 |
| className | 容器类名 | String | - |
| dots | 是否显示面板指示点 | Boolean | false |
| source | 设置图片的源数据，可选属性，格式为 `[{url:"xxx", size: "200*300"}]` 。其中 size 是可选属性，格式为 `宽度*高度` ，宽、高均为数字。当不传 size 时会自动计算图片的原始尺寸。当不设置 source 时可以手动构造子节点，若 source 与子节点同时存在，子节点将被忽略。 | Array | [] |
| visible | 是否展示图片查看器 | Boolean | false |
| onClose | 关闭图片查看器后的回调函数 | Function | noop |
