# AudioPlayer 音频播放器 【交互：翁宇宇 | 视觉：徐剑杰 | 开发：王晓玲】

提供音频文件的播放、控制等

## 何时使用

网页中播放音频

## 基本使用

:::demo 

```js
render() {
  return(
    <div style={{width:400}}>
      <AudioPlayer
        src="https://ysf.nosdn.127.net/26952087D69B79839F17040A5DC2E775.wav"
        title="这是一个demo"
      />
    </div>
    
  )
}
```
:::

## 大小

:::demo 

```js
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  
  render() {
    const size = this.state.size;
    return(
      <div style={{width:400}}>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br /><br />
        <AudioPlayer
          size={size}
          src="https://ysf.nosdn.127.net/26952087D69B79839F17040A5DC2E775.wav"
          title="这是一个demo"
        />
      </div>
      
    )
  }
```
:::

## 最简洁版
:::demo 通过设置 `controlVolume=false` 去掉音量控制按钮；`controlProgress=false` 去掉进度控制；`displayTime=false` 去掉时间

```js
render() {
  return(
    <div style={{width:56}}>
      <AudioPlayer
        src="https://ysf.nosdn.127.net/6DB6A44FF040D96551EC00507730FC4D.wav"
        controlVolume={false}
        controlProgress={false}
        displayTime={false}
      />
    </div>
    
  )
}
```
:::

## 支持调节播放速度
:::demo 通过设置 `playbackRate="1.0"` 设置默认播放速度
通过设置 `playbackRates=["2.0", "1.0", "0.5"]` 设置播放速度选择列表

```js
render() {
  return(
    <div style={{width:350}}>
      <AudioPlayer
        src="https://ysf.nosdn.127.net/6DB6A44FF040D96551EC00507730FC4D.wav"
        download={true}
        size={"small"}
        rateOptions={{
          decimal: 1,
          range: [2, 1, 0.5]
        }}
      />
    </div>

  )
}
```
:::

## 支持下载
:::demo 通过设置 `download=true` 设置音频可下载

```js
render() {
  return(
    <div style={{width:350}}>
      <AudioPlayer
        src="https://ysf.nosdn.127.net/6DB6A44FF040D96551EC00507730FC4D.wav"
        download={true}
      />
    </div>
    
  )
}
```
:::

## API
| 属性      | 说明    | 类型      | 默认值   |
|---------- |-------- |----------   |-------- |
| className | 设置类名 | String | '' |
| controlVolume | 是否需要手动控制音量 | Boolean | true |
| controlProgress | 是否需要手动控制播放进度 | Boolean | true |
| displayTime | 是否显示时间 | Boolean | true |
| download | 是否需要下载按钮 | Boolean | false |
| src |  音频元素的当前来源 | String | '' |
| title   | 鼠标hover之后展示的音频描述 | String | '' |
| size   | 设置音频播放器的大小 | Enum {'small', 'default'} | 'default' |

支持常用的H5 audio 标签属性和事件

| 属性      | 说明    | 类型      | 默认值   |
|---------- |-------- |----------   |-------- |
| autoPlay | 设置是否在加载完成后随即播放音频 | Boolean | false |
| loop | 设置音频是否应在结束时重新播放 | Boolean | false |
| muted | 设置音频是否静音 | Boolean | false |
| onAbort  | 当音频的加载已放弃时(如切换到其他资源)的回调  | 	(e) => Void  |  -  |
| onCanPlay  | 当浏览器能够开始播放音频时的回调    | 	(e) => Void   |  -  |
| onCanPlayThrough  | 当浏览器可在不因缓冲而停顿的情况下进行播放时的回调    | 	(e) => Void  | - |
| onEnded  | 当目前的播放列表已结束时的回调  | 	(e) => Void    |  -  |
| onError  | 当在音频加载期间发生错误时的回调    | 	(e) => Void   | - |
| onLoadedMetadata     | 当浏览器已加载音频的元数据时的回调   | 	(e) => Void  |   -   |
| onPause  | 当音频暂停时的回调  | 	(e) => Void   |  -  |
| onPlay  | 当音频已开始或不再暂停时的回调   |	(e) => Void   |  -  |
| onSeeked  | 当用户已移动/跳跃到音频中的新位置时的回调   | 	(e) => Void   | -  |
| preload  | 音频是否应该在页面加载后进行加载。 可选值有：`auto`指示一旦页面加载，则开始加载音频；`metadata`指示当页面加载后仅加载音频的元数据；`none` 指示页面加载后不应加载音频。 | Enum {'auto', 'metadata', 'none'} | 'metadata' |
| volume  | 设置音频的当前音量, 必须是介于 0.0 与 1.0 之间的数字。例如：1.0 是最高音量（默认）0.5 是一半音量 （50%）0.0 是静音  | Number |  1.0  |
| rateOptions | rateOptions.value，设置音频的默认播放速度，值为假值时播放速度为 1 ，但不展示播放速度；rateOptions.suffix，设置展示的播放速度的单位；rateOptions.decimal，设置展示的播放速度的数字精度；rateOptions.range，设置音频播放速度的选择范围，值为[]时不展示选择范围| {value: Number, suffix: String, decimal: Number, range: Array\<Number\>} |  {value: 0, suffix: 'x', decimal: 1, range: []}  |

其他H5 audio属性和事件配置参见 [H5 audio属性说明](http://www.w3school.com.cn/jsref/dom_obj_audio.asp)。
