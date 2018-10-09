# ColorPicker 颜色选择器 【交互：缺失 | 视觉：徐剑杰 |开发：卿泽】

## 何时使用

用于颜色选择。

## 基本用法

:::demo 使用`onChange`回调获取`alpha`以及`color`值

```js
onChangeColor=({color,alpha}) => {
  console.log(`color:${color},alpha:${alpha}`);
};

render(){
  return(<ColorPicker onChange={this.onChangeColor}/>)
}
```
:::

## 关闭透明度

:::demo alpha值默认勾选，可使用`enableAlpha`关闭

```js
render(){
  return(<ColorPicker enableAlpha={false}/>)
}
```
:::

## 自定义Children

:::demo 可以自定义Children的显示,会自动给子元素添加对应的`background-color`

```js
render(){
  return(
    <ColorPicker defaultColor="#1890ff">
      <Button>COLOR</Button>
    </ColorPicker>
  )
}
```
:::

## 受控的组件

:::demo 受控的组件，组件显示受`alpha`、`color`控制

```js
state={
  color:'#1890ff',
  alpha: 100
}

onColorChange=(obj) => {
  this.setState({
    color:obj.color,
    alpha:obj.alpha
  })
};

onClose=() => {
  console.log('close');
};

onOpen=() => {
  console.log('open');
};

render(){
  return(<ColorPicker  onChange={this.onColorChange} onClose={this.onClose} onOpen={this.onOpen} color={this.state.color} alpha={this.state.alpha}/>  )
}
```
:::

## 历史记录

:::demo 可以使用`enableHistory`开启历史记录功能，默认关闭

```js
render(){
  return(<ColorPicker enableHistory={true}  defaultColor="#1890ff"/>)
}
```
:::

## 取色器面板单独使用

:::demo 需要单独使用取色器面板的场景
```js
render(){
  const ColorPickerPanel =ColorPicker.Panel;
  return(
    <div className="panel-demo"> 
        <ColorPickerPanel enableAlpha={false} color={'#345679'}/>
        <ColorPickerPanel alpha={80} color={'#477898'}/>
    </div>
  )
}
```
:::

<style>
.panel-demo .u-color-picker-panel{
   display:inline-block;
   margin-right:20px;
}
</style>

## API

### ColorPicker

| 参数                 |说明                                                 | 类型                                                                      | 默认值                                               |
|:---------------------|:------------------------------------------------------------|:--------------------------------------------------------------------------|:------------------------------------------------------|
| children             | additional trigger appended to picker                       | ReactNode                                                                      | `<span className='react-colorpicker-trigger'></span>` |
| className            | 额外的className                    |String                                                                    | -                                                  | 
| alpha                | 颜色opacity值                                       |Number                                                                    | 100                                                 | 
| color                | 取色板当前的颜色值                        |String                                                                    | '#ff0000'                                            | 
| defaultAlpha         | 默认的opacity值                                        |Number                                                                    | 100                                                | 
| defaultColor         | 默认的的颜色值                        |String                                                                    | '#ff0000'                                             | 
| enableAlpha          | 是否开启opacity                                      |Boolean                                                                   | true                                                |
| enableHistory        | 开启历史记录                                     |Boolean                                                                    |     false                                                  | 
| onChange             | 颜色更改                                           |(state）=> Void                                                                  | noop                                                  | 
| onClose              | 弹出框关闭                               |(state）=> Void                                                                  | noop                                                  | 
| onOpen               | 弹出框打开                                |(state）=> Void                                                                   | noop                                                  |
| getPopupContainer    | container                   |() => HTMLElement                                                        | () => document.body                   | 

### ColorPicker.Panel

| 参数         |  说明                                    |类型      | 默认值      |
|:-------------|:-----------------------------------------------|:---------|:----------|
| alpha        | 颜色opacity值                           | Number   | 100     | 
| className    | 额外的className       | String   | -   |
| color        | 取色板当前的颜色值           | String   | '#ff0000' |
| defaultAlpha | 默认的opacity值                           | Number   | 100     |
| defaultColor | 默认的的颜色值           | String   | '#ff0000' |
| enableAlpha  | 是否开启opacity                         | Boolean  | true    | 
| onBlur       | 失焦事件                        | () => Void  |      noop     |
| onChange     | 颜色值改变事件                      | (color,alpha) => Void  |     noop      |
| onFocus      | 聚焦事件                      | () => Void  |      noop     |
