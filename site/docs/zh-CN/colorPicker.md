# ColorPicker 颜色选择器

## 何时使用

用于颜色选择。

## 基本用法

:::demo 基本使用 

```js
onChangeColor=(cl)=>{
  console.log(cl);
};

render(){
  return(<ColorPicker onChange={this.onChangeColor} defaultColor="#1890ff"/>)
}
```
:::

## 关闭透明度

:::demo 关闭透明度选择

```js
render(){
  return(<ColorPicker enableAlpha={false} defaultColor="#1890ff"/>)
}
```
:::

## 自定义trigger

:::demo 自定义trigger的显示

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

:::demo 受控的组件

```js
state={
  color:'#1890ff',
  alpha: 100
}

onColorChange=(obj)=>{
  this.setState({
    color:obj.color,
    alpha:obj.alpha
  })
};

onClose=()=>{
  console.log('close');
};

onOpen=()=>{
  console.log('open');
};

render(){
  return(<ColorPicker  onChange={this.onColorChange} onClose={this.onClose} onOpen={this.onOpen} color={this.state.color} alpha={this.state.alpha}/>  )
}
```
:::

## 历史记录

:::demo 可以使用`enableHistory`开启历史记录功能 

```js
render(){
  return(<ColorPicker enableHistory={true}  defaultColor="#1890ff"/>)
}
```
:::

## 取色器面板单独使用

:::demo 
```js
render(){
  const ColorPickerPanel =ColorPicker.Panel;
  return(
    <div className="panel-demo"> 
        <ColorPickerPanel enableAlpha={false} color={'#345679'} mode="RGB"/>
        <ColorPickerPanel alpha={80} color={'#477898'} mode="HSB"/>
    </div>
  )
}
```
:::

<style>
.panel-demo .rc-color-picker-panel{
   display:inline-block;
   margin-right:20px;
}
</style>

## API

### ColorPicker

| 参数                 |说明                                                 | 类型                                                                      | 默认值                                               |
|:---------------------|:------------------------------------------------------------|:--------------------------------------------------------------------------|:------------------------------------------------------|
| children             | additional trigger appended to picker                       |Node                                                                      | `<span className='react-colorpicker-trigger'></span>` |
| className            | 额外的className                    |String                                                                    | ''                                                    | 
| alpha                | 颜色opacity值                                       |Number                                                                    | `100`                                                 | 
| color                | 取色板当前的颜色值                        |String                                                                    | `#ff0000`                                             | 
| defaultAlpha         | 默认的opacity值                                        |Number                                                                    | `100`                                                 | 
| defaultColor         | 默认的的颜色值                        |String                                                                    | `#ff0000`                                             | 
| enableAlpha          | 是否开启opacity                                      |Boolean                                                                   | `true`                                                |
| enableHistory        | 开启历史记录                                     |Boolean                                                                    |     false                                                  | 
| onChange             | 颜色更改                                           |Function                                                                  | noop                                                  | 
| onClose              | 弹出框关闭                               |Function                                                                  | noop                                                  | 
| onOpen               | 弹出框打开                                |Function                                                                  | noop                                                  |
| getPopupContainer    | container                   |Function():Element                                                        | `function(){return document.body;}`                   | 

### ColorPicker.Panel

| 参数         |  说明                                    |类型      | 默认值      |
|:-------------|:-----------------------------------------------|:---------|:----------|
| alpha        | 颜色opacity值                           | Number   | `100`     | 
| className    | 额外的className       | String   | `''`      |
| color        | 取色板当前的颜色值           | String   | `#ff0000` |
| defaultAlpha | 默认的opacity值                           | Number   | `100`     |
| defaultColor | 默认的的颜色值           | String   | `#ff0000` |
| enableAlpha  | 是否开启opacity                         | Boolean  | `true`    | 
| onBlur       | 失焦事件                        | Function |           |
| onChange     | 颜色值改变事件                      | Function |           |
| onFocus      | 聚焦事件                      | Function |           |
