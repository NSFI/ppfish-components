# Icon 图标 【视觉：徐剑杰 |开发：吴圣筑】

语义化的矢量图形。

## 何时使用

显示矢量图标的地方。

## 基本

:::demo 最基础的使用方式。
```js

class Demo extends React.Component{

  handleClick = (e) => {
    const target = e.target;
    if ( target.tagName === 'I' ) {
      const lastCls = Array.from(target.classList).pop().replace('fishdicon-', '');
      const copyText = `<Icon type="${lastCls}" />`;
      copy(copyText);
      message.success("copied:" + copyText);
    }
  };
  
  render(){
    return(<div className="code-box-demo" onClick={this.handleClick}>
      <Icon type="play" />
      <Icon type="stop" />
      <Icon type="sound-mute"/>
      <Icon type="sound-medium" />
      <Icon type="sound-loud"/>
      <Icon type="sound-drag" />
      <Icon type="tip" />
      <Icon type="lock-line" />
      <Icon type="more-point" />
      <Icon type="arrow-double-line-re" />
      <Icon type="arrow-line-regular" />
      <Icon type="arrow-line-Bold" />
      <Icon type="menu-line-right" />
      <Icon type="empty-basis" />
      <Icon type="hints-descriptions-o" />
      <Icon type="hints-notification-o" />
      <Icon type="hints-error-o" />
      <Icon type="hints-warning-o" />
      <Icon type="hints-success-o" />
      <Icon type="form-minus" />
      <Icon type="arrow-line" />
      <Icon type="drag-drawer" />
      <Icon type="drag" />
      <Icon type="folder-open-line" />
      <Icon type="folder-close-line" />
      <Icon type="plus-square" />
      <Icon type="minus-square" />
      <Icon type="file-line" />
      <Icon type="image-line" />
      <Icon type="home-line" />
      <Icon type="user-line" />
      <Icon type="steps-hook" />
      <Icon type="left-fill" />
      <Icon type="upload-plus" />
      <Icon type="upload-cloud" />
      <Icon type="upload-line" />
      <Icon type="delete-line" />
      <Icon type="clip-line" />
      <Icon type="watch-line" />
      <Icon type="hints-alone-success" />
      <Icon type="hints-alone-error" />
      <Icon type="hints-warning" />
      <Icon type="hints-success" />
      <Icon type="hints-error" />
      <Icon type="hints-notification" />
      <Icon type="hints-descriptions" />
      <Icon type="Settingx" />
      <Icon type="bottom" />
      <Icon type="top" />
      <Icon type="menu-line" />
      <Icon type="search-line" />
      <Icon type="load-line" />
      <Icon type="download-line" />
      <Icon type="stop-line" />
      <Icon type="right-fill" />
      <Icon type="up-fill" />
      <Icon type="down-fill" />
      <Icon type="down-bolder" />
      <Icon type="left" />
      <Icon type="right" />
      <Icon type="time-line" />
      <Icon type="date-line" />
      <Icon type="z-a" />
      <Icon type="a-z" />
      <Icon type="up-double" />
      <Icon type="filter" />
      <Icon type="right-double" />
      <Icon type="left-double" />
      <Icon type="check-half" />
      <Icon type="down-double" />
      <Icon type="close-tag-line" />
      <Icon type="close-modal-line" />
      <Icon type="close-circle-fill" />
      <Icon type="check-line" />
      <Icon type="check-full" />
      <Icon type="check-empty" />
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
<Icon type="question" style={{ fontSize: 16, color: '#08c' }} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spinning | 是否有旋转动画 | Boolean | false |
| style | 设置图标的样式，例如 fontSize 和 color | Object | - |
| type | 图标类型 | String | - |

<style>
.code-box-demo .fishdicon {
  font-size: 24px;
  margin: 12px 0 16px 30px;
}
</style>
