# ColorPicker 颜色选择器 【交互：李东岳 | 视觉：徐剑杰 |开发：卿泽】

## 何时使用

用于颜色选择。

## 基本用法

:::demo 使用`onChange`回调获取`alpha`以及`color`值

```js
onChangeColor=({color,alpha}) => {
  console.log(`color:${color}`,`alpha:${alpha}`);
};

render(){
  return(
    <div>
      <h3>默认设置</h3>
      <ColorPicker onChange={this.onChangeColor} className="demo-color-picker"/>
      <h3>开启透明度设置</h3>
      <ColorPicker enableAlpha onChange={this.onChangeColor}/>
    </div>
)
}
```

```less
.demo-color-picker{
  margin-bottom: 30px;
}


```
:::

## 快速选择

:::demo 弹出层快捷选择颜色，使用`onChange`回调获取color`值

```js
onChangeColor=({color,alpha}) => {
  console.log(`color:${color}`);
};

render(){
  return(<ColorPicker quickMode onChange={this.onChangeColor}/>)
}
```
:::

## 面板选择

:::demo 颜色选择面板组件、可选择默认配置颜色以及自定义颜色

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
| className            | 额外的className                    |String                                                                    | -                                                  | 
| color                | 取色板当前的颜色值                        |String                                                                    | '#33bbff'                                            | 
| colorHistory         | 颜色选择历史记录,组件初始化的时候会进行同步                              |Array< {color,alpha}\|String >                                                               | []                                                  |
| colorMap             | 快捷入口的颜色列表                                |Array< String >                                                               | ['#33bbff', '#337eff', '#8a73ff', '#bb67e6', '#f290b6', '#f24957', '#cc613d', '#faa702', '#ffe500', '#aacc00', '#26bf40', '#3dd9af']                                                  |
| defaultAlpha         | 默认的opacity值                                        |Number                                                                    | 100                                                | 
| defaultColor         | 默认的的颜色值                        |String                                                                    | '#33bbff'                                             | 
| disabled             | 是否禁用                                |Boolean                                                               | false                                                  |
| enableAlpha          | 是否开启opacity                                      |Boolean                                                                   | false                                                |
| enableHistory        | 开启历史记录                                     |Boolean                                                                    |     true                                                  | 
| getPopupContainer    | 选定弹出框的相对位置节点                   |() => HTMLElement                                                        | () => document.body                   | 
| onChange             | 颜色更改                                           |({color,alpha}）=> Void                                                                  | noop                                                  | 
| onVisibleChange      | 弹出框显示隐藏                               |(visible）=> Void                                                                  | noop                                                  | 
| quickMode            | 是否使用快捷入口模式                                |Boolean                                                               | false                                                  |
| style                | 自定义样式                                |Object                                                               | {}                                                  |
| popupStyle           | 弹出层自定义样式                                |Object                                                               | {}                                                  |
| esc                  | 是否ESC关闭弹出框 | Boolean | true |

### ColorPicker.QuickPanel

| 参数                 |说明                                                 | 类型                                                                      | 默认值                                               |
|:---------------------|:------------------------------------------------------------|:--------------------------------------------------------------------------|:------------------------------------------------------|
| alpha                | 颜色opacity值                                       |Number                                                                    | 100                                                 | 
| className            | 额外的className                    |String                                                                    | -                                                  | 
| color                | 取色板当前的颜色值                        |String                                                                    | '#33bbff'                                            | 
| colorHistory         | 自定义颜色选择弹窗中的颜色选择历史记录,组件初始化的时候会进行同步                              |Array< {color,alpha}\|String >                                                               | []                                                  |
| colorMap             | 快捷入口的颜色列表                                |Array< String >                                                               | ['#33bbff', '#337eff', '#8a73ff', '#bb67e6', '#f290b6', '#f24957', '#cc613d', '#faa702', '#ffe500', '#aacc00', '#26bf40', '#3dd9af', '#333333', '#666666', '#999999', '#cccccc']                                                  |
| defaultAlpha         | 自定义颜色选择默认的opacity值                                        |Number                                                                    | 100                                                | 
| defaultColor         | 默认的的颜色值                        |String                                                                    | '#33bbff'                                             | 
| disabled             | 是否禁用                                |Boolean                                                               | false                                                  |
| enableAlpha          | 自定义颜色选择是否开启opacity                                      |Boolean                                                                   | false                                                |
| enableHistory        | 自定义颜色选择是否开启历史记录                                     |Boolean                                                                    |     true                                                  | 
| getPopupContainer    | 自定义颜色选择弹出框的相对位置节点                   |() => HTMLElement                                                        | () => document.body                   | 
| onChange             | 颜色更改                                           |({color,alpha}）=> Void                                                                  | noop                                                  | 
| onVisibleChange      | 自定义颜色选择框显示隐藏                               |(visible）=> Void                                                                  | noop                                                  | 
| userSelectColor      | 提供用户使用自定义颜色选择                                |Boolean                                                               | true                                                  |
| style                | 自定义样式                                |Object                                                               | {}                                                  |
| popupStyle           | 弹出层自定义样式                                |Object                                                               | {}                                                  |
| esc                  | 是否ESC关闭弹出框 | Boolean | true |
