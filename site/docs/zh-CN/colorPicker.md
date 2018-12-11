# ColorPicker 颜色选择器 【交互：李东岳 | 视觉：徐剑杰 |开发：卿泽】

## 何时使用

用于颜色选择。

## 基本用法

:::demo 使用`onChange`回调获取`alpha`以及`color`值

```js
onChangeColor=({color,alpha}) => {
  console.log(`color:${color}`);
};

render(){
  return(<ColorPicker onChange={this.onChangeColor}/>)
}
```
:::

## 快捷入口

:::demo 使用`onChange`回调获取`alpha`以及`color`值

```js
onChangeColor=({color,alpha}) => {
  console.log(`color:${color}`);
};

render(){
  return(<ColorPicker quickMode onChange={this.onChangeColor}/>)
}
```
:::

## 快捷入口+自定义方案

:::demo 使用`onChange`回调获取`alpha`以及`color`值

```js

state={
  color:'#33bbff',
}

onChangeColor=({color}) => {
  console.log(`color:${color}`);
  this.setState({
    color
  })
};

render(){
  return(<div>
  <ColorPicker.QuickPanel color={this.state.color} colorHistory={['#33bbff']} onChange={this.onChangeColor}/>
  <div style={{width:100,height:100,color:'#fff',lineHeight:'100px',textAlign:'center',margin:'10px 0',background:this.state.color}}>已选中颜色</div>
</div>)
}
```
:::

## API

### ColorPicker

| 参数                 |说明                                                 | 类型                                                                      | 默认值                                               |
|:---------------------|:------------------------------------------------------------|:--------------------------------------------------------------------------|:------------------------------------------------------|
| alpha                | 颜色opacity值                                       |Number                                                                    | 100                                                 | 
| children             | additional trigger appended to picker                       | ReactNode                                                                      | `<span className='fishd-colorpicker-trigger'></span>` |
| className            | 额外的className                    |String                                                                    | -                                                  | 
| color                | 取色板当前的颜色值                        |String                                                                    | '#33bbff'                                            | 
| defaultAlpha         | 默认的opacity值                                        |Number                                                                    | 100                                                | 
| defaultColor         | 默认的的颜色值                        |String                                                                    | '#33bbff'                                             | 
| enableAlpha          | 是否开启opacity                                      |Boolean                                                                   | false                                                |
| enableHistory        | 开启历史记录                                     |Boolean                                                                    |     true                                                  | 
| getPopupContainer    | 选定弹出框的相对位置节点                   |() => HTMLElement                                                        | () => document.body                   | 
| onChange             | 颜色更改                                           |(state）=> Void                                                                  | noop                                                  | 
| onClose              | 弹出框关闭                               |(state）=> Void                                                                  | noop                                                  | 
| onOpen               | 弹出框打开                                |(state）=> Void                                                                   | noop                                                  |
| colorHistory         | 颜色选择历史记录,组件初始化的时候会进行同步                              |Array< {color,alpha}\|String >                                                               | []                                                  |
| colorMap             | 快捷入口的颜色列表                                |Array< String >                                                               | []                                                  |
