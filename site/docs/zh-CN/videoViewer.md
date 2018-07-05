# 视频查看器

播放视频

## 何时使用

当需要在浮出层的独立区域内播放视频时

## 基本使用

:::demo 最简单的用法。

```js
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  open = () => {
    this.setState({
      visible: true,
    });
  }
  
  onClose = () => {
    console.log('closed');
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return(
      <div>
        <Button type="primary" onClick={this.open}>Play</Button>
        <VideoViewer
          maskClosable={false}
          visible={this.state.visible}
          mask={true}
          draggable={true}
          afterClose={this.onClose}
          onCancel={this.handleCancel}
        >
          <VideoViewer.Video
            src="http://www.w3school.com.cn/i/movie.ogg"
          />
        </VideoViewer>
      </div>
    )
  }
```
:::

## 自行控制视频

:::demo 自行控制模态框打开和关闭后的视频播放及暂停。

```js
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.video = React.createRef();
  }

  open = () => {
    this.setState({
      visible: true,
    });
    const video = this.video && this.video.current;
    if (video && video.paused) {
        video.play();
    }
  }
  
  onClose = () => {
    console.log('closed');
    const video = this.video && this.video.current;
    if (video && !video.paused) {
        video.pause();
    }
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return(
      <div>
        <Button type="primary" onClick={this.open}>Play</Button>
        <VideoViewer
          maskClosable={false}
          visible={this.state.visible}
          mask={true}
          draggable={true}
          afterClose={this.onClose}
          onCancel={this.handleCancel}
          width={600}
        >
          <VideoViewer.Video
            ref={this.video}
            src="http://pic.qiantucdn.com/58pic/shipin/13/38/13/13381368.mp4"
          />
        </VideoViewer>
      </div>
    )
  }
```
:::

## API

### VideoViewer

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| visible | 模态框是否可见 | boolean | false |
| draggable  | 模态框是否支持拖动  | boolean  |  false  |
| mask  | 模态框关闭的遮罩是否可见   | boolean   | false  |
| onCancel  | 点击遮罩层或右上角叉或取消按钮的回调   | func   | -  |
| afterClose  | 模态框关闭的回调    | func   | —   |
| width	| 设置模态框的宽度  | string|number |  520  |

更多模态框配置项，请查看 [`Modal`](#/components/modal)。其中title、footer不支持配置。

### VideoViewer.Video
| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| src	| 要播放的视频的 URL。 |  string  |  —  |
| autoPlay | 如果出现该属性，则视频在就绪后马上播放。 | boolean	|  true  |
| controls| 如果出现该属性，则向用户显示控件，比如播放按钮。 | boolean |  true  |
| height	| 设置视频播放器的高度。 |  number   |  —  |
| loop 	| 如果出现该属性，则当媒介文件完成播放后再次开始播放。 | boolean |  —  |
| muted	| 规定视频的音频输出应该被静音。 |  boolean  |  —  |
| poster	| 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。 |  string  |  —  |
| preload	| 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoPlay"，则忽略该属性。 | boolean  |
| width	| 设置视频播放器的宽度。 | number |  —  |

注意：
1. VideoViewer.Video是使用H5原生video标签封装的，可以使用video标签支持的所有属性，但类型有所不同。由于React中DOM属性需要写成驼峰风格，autoplay需要写成`autoPlay`。
1. 如果有特殊需求，也可以使用原生video标签或者第三方视频组件代替VideoViewer.Video作为模态框内容。
```
<VideoViewer.Video src="http://www.w3school.com.cn/i/movie.ogg" />
<video src="http://www.w3school.com.cn/i/movie.ogg" controls autoPlay />
```

