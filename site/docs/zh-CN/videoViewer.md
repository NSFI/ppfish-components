# 视频查看器

播放视频

## 何时使用

当需要在浮出层的独立区域内播放视频时

## 基本使用

:::demo 最简单的用法。

```js
  state = { visible: false }

  open = () => {
    this.setState({
      visible: true,
    });
  }
  
  onClose = (a, b, c) => {
    console.log(a, b, c);
  };
  
  render() {
    return(
      <div>
        <Button type="primary" onClick={this.open}>Play</Button>
        <VideoViewer 
            visible={this.state.visible}
            autoplay={true}
            afterClose={this.onClose}
            draggable={true}
        >
          <video src="http://www.w3school.com.cn/i/movie.ogg" controls></video>
        </VideoViewer>
      </div>
    )
  }
```
:::

## API

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| children  | 视频播放器 | ReactNode|Node  |  —   |
| visible | 模态框是否可见 | boolean | 无 |
| draggable  | 模态框是否支持拖动  | boolean  |  false  |
| afterClose  | 模态框关闭的回调    | func   | —   |

更多模态框配置项，请查看 [`Modal`](#/components/modal/)。

推荐使用H5 video标签作为children
```
<video src="http://www.w3school.com.cn/i/movie.ogg" controls></video>
```
video支持的属性说明

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| autoplay | 如果出现该属性，则视频在就绪后马上播放。 | autoplay	|  —   |
| controls| 如果出现该属性，则向用户显示控件，比如播放按钮。 | controls |  —   |
| height	| 设置视频播放器的高度。 |  pixels   |  —   |
| loop 	| 如果出现该属性，则当媒介文件完成播放后再次开始播放。 | loop |  —   |
| muted	| 规定视频的音频输出应该被静音。 |  muted  |  —   |
| poster	| 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。 |  URL  |  —   |
| preload	| 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 | preload  |
| src	| 要播放的视频的 URL。 |  url  |  —   |
| width	| 设置视频播放器的宽度。 | pixels |  —   |

## 待讨论
- draggable
