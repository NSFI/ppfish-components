# 富文本编辑器

一种可内嵌于浏览器，所见即所得的文本编辑器。

## 何时使用

适用于有富文本编辑需求的场景，如设置链接、格式化字体、插入图片、插入表情等。

## 基本使用

:::demo 基本使用方式。

```js
  componentDidMount() {
    this.editorRef.focus();
  }

  render() {
    return (
      <RichEditor ref={(el) => { this.editorRef = el; }} value="初始内容a<br/>初始内容b"/>
    );
  }
```
:::


## API

### Props

|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| className | 容器类名 | String | - |
| toolbar | 定制工具栏。可选的值有：<br/>`'link', 'bold', 'italic', 'underline', 'color', 'align', {'list': 'ordered'}, {'list': 'bullet'}, 'emoji', 'image', 'size', 'clean'`。<br/>可以将一个或多个子项放在一个数组中分组展示。| Array | `[['link', 'bold', 'italic', 'underline'], ['color'], ['align'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['size'], ['clean']]` |
| placeholder | 内容为空时的占位内容。 | String | - |
| value | 默认显示的内容，改变 `value` 将会改变编辑器的内容。<br/>可以是普通 String 或 HTML String | String | - |
| extendLinkModule | 扩展链接模块，通过此属性可以个性化定制链接。接收的数据格式为： `{'yourModuleName': {className: '', url: ''}}`。其中 `className` 为该模块的类名， `url` 为自定义的链接，必须包含用于分隔协议的双斜线 '//' 。 | Object | - |
| onChange | 内容改变时的回调函数 | function(content, delta, source, editor) | - |
| onFocus | 获取焦点时的回调函数 | function(range, source, editor) | - |
| onBlur | 失去焦点时的回调函数 | function(previousRange, source, editor) | - |


### Component Node Method

|方法|说明|
|:-|:-|
| focus() | 使编辑器获取焦点 |
| blur() | 使编辑器失去焦点 |
| getEditor() | 返回 Editor Instance |


### Editor Instance Method

|方法|说明|
|:-|:-|
| getLength() | 返回编辑器内容的长度，以字符为单位，不包括 HTML 标签 |
| getText() | 返回编辑器的字符串内容，不包括 HTML 标签 |
| getSelection() | 返回当前选区的范围，如果编辑器处于 unfocus 状态，则返回 null |
| getBounds() | 返回给定位置处的相对于编辑器容器的像素位置和选区的尺寸 |


_Props 的更多介绍可以参考：_
[React-Quill](https://github.com/zenoamaro/react-quill)  

_更多方法的支持及文档介绍可以参考：_
[Quill API](https://quilljs.com/docs/api)
