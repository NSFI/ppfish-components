# 音频播放器

音频播放器

## 何时使用

网页中播放音频

## 基本使用

:::demo 

```js
render() {
  return(
    <div style={{width:400}}>
      <AudioPlayer
        src="http://media.58pic.com/audio/audio_preivew/14/00/65/58pic_audio_14006549.wav"
        title="这是一个demo"
      />
    </div>
    
  )
}
```
:::

## 简洁版
:::demo 通过设置 `controllVolume=false` 去掉音量控制按钮; 设置 `download=false` 去掉下载按钮。

```js
render() {
  return(
    <div style={{width:350}}>
      <AudioPlayer
        src="http://media.58pic.com/audio/audio_preivew/14/00/65/58pic_audio_14006549.wav"
        controllVolume={false}
        download={false}
      />
    </div>
    
  )
}
```
:::

## API
| 属性      | 说明    | 类型      | 默认值   |
|---------- |-------- |----------   |-------- |
| title   | 鼠标hover之后展示的音频描述 | string | '' |
| src |  音频元素的当前来源 | string | '' |
| className | 设置类名 | string | '' |
| controllVolume | 是否需要手动控制音量 | boolean | true |
| download | 是否需要下载按钮 | boolean | true |

支持常用的H5 audio 标签属性和事件

| 属性      | 说明    | 类型      | 默认值   |
|---------- |-------- |----------   |-------- |
| loop | 设置音频是否应在结束时重新播放 | boolean | false |
| preload  | 音频是否应该在页面加载后进行加载。 可选值有：`auto`指示一旦页面加载，则开始加载音频；`metadata`指示当页面加载后仅加载音频的元数据；`none` 指示页面加载后不应加载音频。 | string | 'metadata' |
| autoPlay | 设置是否在加载完成后随即播放音频 | boolean | false |
| muted | 设置音频是否静音 | boolean | false |
| volume  | 设置音频的当前音量, 必须是介于 0.0 与 1.0 之间的数字。例如：1.0 是最高音量（默认）0.5 是一半音量 （50%）0.0 是静音  | number |  1.0  |
| onLoadedMetadata     | 当浏览器已加载音频的元数据时的回调   | function   |   () => {}    |
| onCanPlay  | 当浏览器能够开始播放音频时的回调    | function    |  () => {}   |
| onCanPlayThrough  | 当浏览器可在不因缓冲而停顿的情况下进行播放时的回调    | function   |  () => {}  |
| onAbort  | 当音频的加载已放弃时(如切换到其他资源)的回调  | function    |  () => {}   |
| onEnded  | 当目前的播放列表已结束时的回调  | function    |  () => {}   |
| onError  | 当在音频加载期间发生错误时的回调    | function    |  () => {}   |
| onPause  | 当音频暂停时的回调  | function    |  () => {}   |
| onPlay  | 当音频已开始或不再暂停时的回调   | function    |  () => {}   |
| onSeeked  | 当用户已移动/跳跃到音频中的新位置时的回调   | function    |  () => {}   |

其他H5 audio属性和事件配置参见 [H5 audio属性说明](http://www.w3school.com.cn/jsref/dom_obj_audio.asp)。
