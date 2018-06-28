# 图片查看器

预览图片，对图片进行等比缩放、全屏显示、放大、缩小、旋转90度、保存等操作。

## 何时使用

当页面中的图片因大小比例、展示角度等原因不适合观看，或想连续观看一组图片时，可以用图片查看器调整或观看。

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
                this.props.source.map((each, index)=>
                  <div key={each.size} className="item" onClick={this.handleOpen.bind(this, index)}>
                    <img src={each.url} alt={each.url} width="60px" height="60px" />
                    <div>{each.size}</div>
                  </div>
                )
              }
            </div>
          </div>
          <PicturePreview
            visible={visible}
            activeIndex={activeIndex}
            source={this.props.source}
            dots={false}
            controller={false}
          />
        </div>
    );
  }
```
:::


## API
|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| visible | 是否展示图片查看器 | Boolean | false |
| activeIndex | 当前展示第几张图片 | Number | 0 |
| source | 设置图片的源数据 | Array | [{url:'', size: "200*200"}] |
| dots | 是否显示面板指示点 | Boolean | false |
| controller | 是否显示图片控制条 | Boolean | false |
| onClose | 关闭显示预览后的回调函数 | Function | () => {} |

**注意：** `dots` 和 `controller` 不可同时设置为 `true`。
