# VideoViewer 视频播放器 【交互:蒋蕊遥 |视觉: 徐剑杰 |开发: 王晓玲】

播放视频

## 何时使用

适用于在系统中播放视频内容。

## 播放器

### 带封面的播放器

:::demo 播放器组件`VideoViewer.Video`，`poster`指定播放器封面。

```js
  render() {
    return(
      <VideoViewer.Video
        poster='http://ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf'
        sources={[{
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          type:'video/mp4'
        }]}
        download={true}
        downloadSrc="http://vjs.zencdn.net/v/oceans.mp4"
        width={600}
      />
    )
  }
```
:::

### 不带封面的播放器

:::demo 播放器组件`VideoViewer.Video`。不指定封面时，默认展示视频第一帧。

```js
  render() {
    return(
      <VideoViewer.Video
        sources={[{
          src: "http://www.w3school.com.cn/i/movie.ogg",
          type:'video/ogg'
        }]}
        download={true}
        downloadSrc="http://www.w3school.com.cn/i/movie.ogg"
        width={600}
       />
    )
  }
```
:::

## 缩略图

### 正常状态

:::demo `VideoViewer`组件封装了`VideoViewer.VideoModal`和`VideoViewer.Video`，实现了点击缩略图在模态框中播放视频。
`modalProps` 传入`VideoViewer.VideoModal`的参数；`videoProps`传入`VideoViewer.Video`的参数

```js
  render() {
    return(
      <div className="source">
        <div className="block">
          <VideoViewer
            poster="http://ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf"
            modalProps={{
              width: 640
            }}
            videoProps={{
              sources:[{
                src:'http://vjs.zencdn.net/v/oceans.mp4',
                type:'video/mp4'
              }],
              download: true,
              downloadSrc: "http://vjs.zencdn.net/v/oceans.mp4",
              width:640
            }}
          />
        </div>
        <div className="block">
          <VideoViewer
            modalProps={{
              width: 600
            }}
            videoProps={{
              sources:[{
                src: "http://www.w3school.com.cn/i/movie.ogg",
                type:'video/ogg'
              }],
              download: true,
              downloadSrc: "http://www.w3school.com.cn/i/movie.ogg",
              width: 600
            }}
          />
        </div>
      </div>
    )
  }
```
:::

### 其他状态

:::demo 当视频由于某些原因无法播放时，通过 `failedMessage` 展示缩略图的其他状态, 当设置了`failedMessage`时，缩略图将不可点击并播放

```js
  render() {
    return(
      <div className="source">
        <div className="block">
          <VideoViewer
            failedMessage="已过期"
            poster="http://ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf"
            modalProps={{
              width: 640
            }}
            videoProps={{
              sources:[{
                src:'http://vjs.zencdn.net/v/oceans.mp4',
                type:'video/mp4'
              }],
              download: true,
              downloadSrc: "http://vjs.zencdn.net/v/oceans.mp4",
              width:640
            }}
          />
        </div>
        <div className="block">
          <VideoViewer
            failedMessage="状态描述"
            modalProps={{
              width: 600
            }}
            videoProps={{
              sources:[{
                src: "http://www.w3school.com.cn/i/movie.ogg",
                type:'video/ogg'
              }],
              download: true,
              downloadSrc: "http://www.w3school.com.cn/i/movie.ogg",
              width: 600
            }}
          />
        </div>
      </div>
    )
  }
```
:::

## 自行控制视频

:::demo 可以用自定义的等组件，将播放器模态框`VideoViewer.VideoModal`和播放器`VideoViewer.Video`配合使用，自行控制视频。

```js
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.video = React.createRef();
  }

  open = () => {
    this.setState({
      visible: true,
    },() => {
      const video = this.video && this.video.current;
      const player = video && video.getVideoPlayer();
      if (player && typeof player.play === 'function') {
         player.play();
      }
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
      <div className="source">
        <div className="block">
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
              autoplay={true}
              bigPlayButton={false}
              sources={[{
                src: 'http://vjs.zencdn.net/v/oceans.mp4',
                type: 'video/mp4'
              }]}
              width={600}
            />
          </VideoViewer.VideoModal>
        </div>
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
| width	  | 缩略图的宽度 | String \| Number |  240  |
| height	| 缩略图的高度 | String \| Number |  135  |
| poster  | 缩略图背景画面。通常传入一个URL | String	|  ''  |
| failedMessage	| 当视频不能正常播放的描述信息。注意：当值为null时，缩略图可以正常点击并播放视频，传入其他值则不可点击并播放视频  | String |  null  |
| modalProps   | `VideoViewer.VideoModal`参数对象  | Object   | -  |
| videoProps   | `VideoViewer.Video`参数对象 | Object | - |
| onThumbClick | 点击缩略图的回调 | (e) => Void | - |

### VideoViewer.VideoModal

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| width	    | 设置模态框的宽度  | String \| Number |  640 |
| afterClose| 模态框关闭的回调    | (e) => Void   | —   |
| draggable | 模态框是否支持拖动  | Boolean  |  false  |
| mask      | 模态框关闭的遮罩是否可见   | Boolean   | false  |
| onCancel  | 点击遮罩层或右上角叉或取消按钮的回调   | (e) => Void   | -  |
| visible   | 模态框是否可见 | Boolean | false |

更多模态框配置项，请查看 [`Modal`](https://nsfi.github.io/ppfish-components/#/components/modal)。其中title、footer不支持配置。

### VideoViewer.Video

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| width	    | 设置视频播放器的宽度 | String \| Number |  640  |
| height	  | 设置视频播放器的高度 | String \| Number |  360  |
| poster    | 播放前显示的视频画面，播放开始之后自动移除。通常传入一个URL（如果未设置该属性，将使用视频的第一帧来代替） | String	|  ''  |
| source    | 资源文件，详情见 [videojs](https://docs.videojs.com/tutorial-options.html#sources) | Array |  []  |
| autoplay  | 播放器准备好之后，是否自动播放 | Boolean | false  |
| loop	    | 是否循环播放 | Boolean   |  false  |
| muted	    | 是否静音 |  Boolean  |  false  |
| preload  	| 预加载('auto':自动; 'metadata':元数据信息,比如视频长度，尺寸等; 'none':不预加载任何数据，直到用户开始播放才开始下载) | Enum {'auto', 'none', 'metadata'}  | 'auto' |
| download	| 是否显示下载按钮 | Boolean  |  false  |
| downloadSrc | 下载地址 | String | '' |
| bigPlayButton	| 是否显示开始大按钮 | Boolean  |  true  |

#### 方法
| 名称     | 描述    |
|---------- |-------- |
| getVideoPlayer | 获取视频播放器对象 |

更多videojs配置项及配置项详情，请查看 [`videojs配置`](https://docs.videojs.com/tutorial-options.html#standard-video-element-options)。

> 注意：
1. VideoViewer.Video 是基于 [videojs](https://docs.videojs.com/)实现, 如有配置疑问，请参考[videojs文档](https://docs.videojs.com/)
2. 如果有特殊需求，也可以使用原生video标签或者第三方视频组件代替VideoViewer.Video作为模态框内容。

