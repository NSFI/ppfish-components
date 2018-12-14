# VideoViewer 视频播放器 【交互:蒋蕊遥 |视觉: 徐剑杰 |开发: 吴圣筑】

播放视频

## 何时使用

适用于在系统中播放视频内容。

## 基本使用

:::demo `modalOption` 传入VideoModal参数；`videoOption`传入Video参数

```js
  render() {
    return(
      <VideoViewer
        poster="http://ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf"
        modalOption={{
          mask: true,
          maskClosable: false,
          width: 640
        }}
        videoOption={{
          sources:[{
            src:'http://vjs.zencdn.net/v/oceans.mp4',
            type:'video/mp4'
          }],
          download: true,
          downloadSrc: "http://vjs.zencdn.net/v/oceans.mp4"
        }}
      />
    )
  }
```
:::

## 缩略图的其他状态

:::demo 当视频由于某些原因无法播放时，通过 `failedMessage` 展示缩略图的其他状态, 当设置了`failedMessage`时，缩略图将不可点击并播放

```js
  render() {
    return(
      <div className="source">
        <div className="block">
          <VideoViewer
            failedMessage="已过期"
            poster="http://ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf"
            modalOption={{
              mask: true,
              draggable: true,
              maskClosable: false,
              width: 800,
              height: 500
            }}
            videoOption={{
              sources:[{
                src: 'http://vjs.zencdn.net/v/oceans.mp4',
                type: 'video/mp4'
              }],
              width:800,
              height: 500        
            }}
          />
        </div>
        <div className="block">
          <VideoViewer
            failedMessage="状态描述"
            poster="http://ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf"
          />
        </div>
      </div>
    )
  }
```
:::

## 播放器单独使用

:::demo 直接使用播放器 `VideoViewer.Video`。

```js
  render() {
    return(
      <div>
        <VideoViewer.Video
          poster='http://ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf'
          sources={[{
            src: 'http://vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4'
          }]}
          width={600}
        />
      </div>
    )
  }
```
:::

## 自行控制视频

:::demo 可以用自定义的按钮等组件，和播放器模态框`VideoViewer.VideoModal`及播放器`VideoViewer.Video`配合使用，自行控制视频。

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
  }
  
  onClose = () => {
    const video = this.video && this.video.current;
    const player = video.getVideoPlayer();
    if (player && typeof player.paused === 'function') {
       player.pause();
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
        <Button type="primary" onClick={this.open}>点击播放视频</Button>
        <VideoViewer.VideoModal
          mask={true}
          draggable={true}
          maskClosable={false}
          visible={this.state.visible}
          afterClose={this.onClose}
          onCancel={this.handleCancel}
          width={600}
        >
          <VideoViewer.Video
            ref={this.video}
            autoPlay={true}
            sources={[{
              src: 'http://vjs.zencdn.net/v/oceans.mp4',
              type: 'video/mp4'
            }]}
            width={600}
          />
        </VideoViewer.VideoModal>
      </div>
    )
  }
```
:::

<style>
.source {
  display: flex
}

.block + .block {
  margin-left: 20px;
}
</style>

## API

### VideoViewer

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| afterClose  | 模态框关闭的回调    | (e) => Void   | —   |
| draggable  | 模态框是否支持拖动  | Boolean  |  false  |
| mask  | 模态框关闭的遮罩是否可见   | Boolean   | false  |
| onCancel  | 点击遮罩层或右上角叉或取消按钮的回调   | (e) => Void   | -  |
| visible | 模态框是否可见 | Boolean | false |
| width	| 设置模态框的宽度  | String \| Number |  520  |

更多模态框配置项，请查看 [`Modal`](https://nsfi.github.io/ppfish-components/#/components/modal)。其中title、footer不支持配置。

### VideoViewer.Video
| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| autoPlay | 如果出现该属性，则视频在就绪后马上播放。 | Boolean	|  true  |
| controls| 如果出现该属性，则向用户显示控件，比如播放按钮。 | Boolean |  true  |
| height	| 设置视频播放器的高度。 | Number   |  —  |
| loop 	| 如果出现该属性，则当媒介文件完成播放后再次开始播放。 | Boolean |  —  |
| muted	| 规定视频的音频输出应该被静音。 |  Boolean  |  —  |
| poster	| 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。 | String  |  —  |
| preload	| 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoPlay"，则忽略该属性。 | Boolean  |
| src	| 要播放的视频的 URL。 | String  |  —  |
| width	| 设置视频播放器的宽度。 | Number |  —  |

注意：
1. VideoViewer.Video是使用H5原生video标签封装的，可以使用video标签支持的所有属性，但类型有所不同。由于React中DOM属性需要写成驼峰风格，autoplay需要写成`autoPlay`。
1. 如果有特殊需求，也可以使用原生video标签或者第三方视频组件代替VideoViewer.Video作为模态框内容。
```
<VideoViewer.Video src="http://www.w3school.com.cn/i/movie.ogg" />
<video src="http://www.w3school.com.cn/i/movie.ogg" controls autoPlay />
```

