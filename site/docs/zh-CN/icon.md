# Icon 图标 【视觉：徐剑杰 |开发：吴圣筑】

语义化的矢量图形。

## 何时使用

显示矢量图标的地方。

## 图表列表

> 点击图标即可复制代码。
  
:::display 最基础的使用方式。
```js

class IconItem extends React.Component{
  
    handleClick = () => {
      const copyText = `<Icon type="${this.props.type}" />`;
      copy(copyText);
      message.success("copied:" + copyText);
    };
    
    render(){
      return(
        <div className="demo-icon-item" onClick={this.handleClick}>
        <Icon type={this.props.type}/>
        <p>{this.props.type}</p>
        </div>
      )
    }
}


class Demo extends React.Component{
  
  render(){
    return(<div className="code-box-demo" >
      <IconItem type="play" />
      <IconItem type="stop" />
      <IconItem type="sound-mute"/>
      <IconItem type="sound-medium" />
      <IconItem type="sound-loud"/>
      <IconItem type="sound-drag" />
      <IconItem type="tip" />
      <IconItem type="lock-line" />
      <IconItem type="more-point" />
      <IconItem type="arrow-double-line-re" />
      <IconItem type="arrow-line-regular" />
      <IconItem type="arrow-line-Bold" />
      <IconItem type="menu-line-right" />
      <IconItem type="empty-basis" />
      <IconItem type="hints-descriptions-o" />
      <IconItem type="hints-notification-o" />
      <IconItem type="hints-error-o" />
      <IconItem type="hints-warning-o" />
      <IconItem type="hints-success-o" />
      <IconItem type="form-minus" />
      <IconItem type="arrow-line" />
      <IconItem type="drag-drawer" />
      <IconItem type="drag" />
      <IconItem type="folder-open-line" />
      <IconItem type="folder-close-line" />
      <IconItem type="plus-square" />
      <IconItem type="minus-square" />
      <IconItem type="file-line" />
      <IconItem type="image-line" />
      <IconItem type="home-line" />
      <IconItem type="user-line" />
      <IconItem type="steps-hook" />
      <IconItem type="left-fill" />
      <IconItem type="upload-plus" />
      <IconItem type="upload-cloud" />
      <IconItem type="upload-line" />
      <IconItem type="delete-line" />
      <IconItem type="clip-line" />
      <IconItem type="watch-line" />
      <IconItem type="hints-alone-success" />
      <IconItem type="hints-alone-error" />
      <IconItem type="hints-warning" />
      <IconItem type="hints-success" />
      <IconItem type="hints-error" />
      <IconItem type="hints-notification" />
      <IconItem type="hints-descriptions" />
      <IconItem type="Settingx" />
      <IconItem type="bottom" />
      <IconItem type="top" />
      <IconItem type="menu-line" />
      <IconItem type="search-line" />
      <IconItem type="load-line" />
      <IconItem type="download-line" />
      <IconItem type="stop-line" />
      <IconItem type="right-fill" />
      <IconItem type="up-fill" />
      <IconItem type="down-fill" />
      <IconItem type="down-bolder" />
      <IconItem type="left" />
      <IconItem type="right" />
      <IconItem type="time-line" />
      <IconItem type="date-line" />
      <IconItem type="z-a" />
      <IconItem type="a-z" />
      <IconItem type="up-double" />
      <IconItem type="filter" />
      <IconItem type="right-double" />
      <IconItem type="left-double" />
      <IconItem type="check-half" />
      <IconItem type="down-double" />
      <IconItem type="close-tag-line" />
      <IconItem type="close-modal-line" />
      <IconItem type="close-circle-fill" />
      <IconItem type="check-line" />
      <IconItem type="check-full" />
      <IconItem type="check-empty" />
    </div>)
  }
}

ReactDOM.render(<Demo {...context.props}/>,mountNode);
```
:::

## 带旋转动画

:::demo 带旋转动画的使用方式。
```js
render(){
  return(<div className="code-box-demo">
    <Icon type="load-line" spinning={true} />
  </div>)
}
```
:::

## API

由于图标字体本质上还是文字，可以使用 `style` 和 `className` 设置图标的大小和颜色。

```html
<Icon type="time-line" style={{ fontSize: 16, color: '#08c' }} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spinning | 是否有旋转动画 | Boolean | false |
| style | 设置图标的样式，例如 fontSize 和 color | Object | - |
| type | 图标类型 | String | - |

<style>
.code-box-demo .fishdicon {
  font-size: 24px;
}

.demo-icon-item{
  display:inline-block;
  width:150px;
  padding-top:30px;
  text-align:center;
  transition: background 0.3s ease-in-out;
  cursor:pointer;
}

.demo-icon-item p{
  margin-top:20px;
}

.demo-icon-item:hover{
  background:#ebf2ff;
}
</style>
