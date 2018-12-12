# ImageLoader 图片加载器 【交互：缺失 |视觉：徐剑杰 |开发：吴圣筑】

加载图片组件

## 何时使用

图片处于准备、加载中状态时，使用合适的预加载占位图有助于缓解用户的焦虑。图片加载失败后使用组件预置的加载失败占位图替代浏览器提供的默认失败图。

## 基本使用

:::demo 基本使用方式。图片请求过程中展示预加载占位图，展示时间取决于图片请求耗时。

```js
render(){
  return(
    <ImageLoader
      src="http://blog.qiyukf.com/wp-content/uploads/2018/01/pexels-photo-821754-e1517317444456.jpeg"
    />
  )
}
```
:::

## 图片加载的四种状态

:::display demo仅作为演示使用，展示图片加载的四种状态。

```js
  constructor(props){
    super(props);
    this.state = {
      status: 'pending',
    }
  }
  
  handleStatusChange = (e) => {
    const status = e.target.value;
    this.setState({ 
      status,
    });
  }
  
  renderImg = () => {
    switch (this.state.status) {
      case 'pending':
        return <div className="fishd-image-loader fishd-image-loader-pending">
          <div className="preload-img" style={{
            width: 150,
            height: 100
          }}></div>
        </div>;
      case 'loading':
        return <div className="fishd-image-loader fishd-image-loader-loading">
          <div className="preload-img" style={{
            width: 150,
            height: 100
          }}></div>
        </div>;
      case 'failed':
        return <div className="fishd-image-loader fishd-image-loader-failed">
          <div className="failed-img" style={{
            width: 150,
            height: 100
          }}></div>
        </div>;
      default:
        return <div className="fishd-image-loader fishd-image-loader-loaded">
          <img src="http://blog.qiyukf.com/wp-content/uploads/2018/01/pexels-photo-821754-e1517317444456.jpeg" />
        </div>;
    }
  }
  
  render() {
    return(
      <div>
        <Radio.Group defaultValue="pending" onChange={this.handleStatusChange}>
          <Radio.Button value="pending">准备</Radio.Button>
          <Radio.Button value="loading">加载中</Radio.Button>
          <Radio.Button value="loaded">加载成功</Radio.Button>
          <Radio.Button value="failed">加载失败</Radio.Button>
        </Radio.Group>
        <br /><br />
        {this.renderImg()}
      </div>
    )
  }
```
:::

## 自定义占位图尺寸

:::demo 占位图尺寸，只对准备、加载中、加载失败三种状态有效。预置了三种大小，'large'代表240\*160、'default'代表150\*100、'small'代表90\*60，也可以自定义成{width: 200, height: 200}。

```js
render(){
  return(
    <ImageLoader
      src="http://blog.qiyukf.com/wp-content/uploads/2018/01/pexels-photo-821754-e1517317444456.jpeg"
      placeholderSize="small"
    />
  )
}
```
:::

## 设置图片

:::demo 占位图只在图片请求未完成时可见，图片请求成功后会显示实际图片。除了src以外的其他图片属性，包括图片大小等，可以通过imgProps设置。

```js
render(){
  return(
    <ImageLoader
      src="http://blog.qiyukf.com/wp-content/uploads/2018/01/pexels-photo-821754-e1517317444456.jpeg"
      imgProps={{
        width: 200,
        height: 200
      }}
    />
  )
}
```
:::

## 图片加载失败

:::demo 图片加载失败显示组件提供的加载失败图，也可以通过failedLoader自行设置加载失败图，设置方法同下方demo：自行设置预加载图片。

```js
render(){
  return(
    <ImageLoader
      src="http://error.url"
      onError={() => {console.log('image load failed!')}}
    />
  )
}
```
:::

## 自行设置预加载图片

:::demo 自行设置预加载图片，建议使用小图，使用base64作为图片地址。

```js
render(){
  const preLoader = () => {
    const preUrl = "data:image/png;base64,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";
    return (
      <div style={{'maxWidth': '100%'}}>
        <img src={preUrl} style={{'width': '100%'}} />
      </div>
    );
  };
  return(
    <ImageLoader
      src="https://ysf.nosdn.127.net/45689D5A40BE0BCB962C8878CFDEEFA8"
      preLoader={preLoader}
      style={{'maxWidth': '100%'}}
      imgProps={{style : {'width': '100%'}}}
    />
  )
}
```
:::


## API
| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| className  | 图片外层容器class    | String   | - |
| src  | 图片地址   | String   |  —   |
| imgProps  | 除图片地址以外的其他图片属性，同原生 image 标签的属性，见：[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)  | Object   | —   |
| placeholderSize  | 占位图尺寸，预置了三种大小，'large'代表240\*160、'default'代表150\*100、'small'代表90\*60，也可以自定义成{width: 200, height: 200}  | Enum {'large', 'default', 'small'}\|Object   | 'default'   |
| onError  | 图片加载失败的回调    | (e) => Void   | - |
| onLoad  | 图片加载成功的回调    | (e) => Void   | -  |
| preLoader  | 自定义请求中占位图   | ReactNode\|() => ReactNode |  -  |
| failedLoader  | 自定义加载失败占位图   | ReactNode\|() => ReactNode |  -  |
| style  | 图片外层容器样式对象    | Object   |  —   |
