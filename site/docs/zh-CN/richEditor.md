# 富文本编辑器

一种可内嵌于浏览器，所见即所得的文本编辑器。

## 何时使用

适用于有富文本编辑需求的场景，如设置链接、格式化字体、插入图片、插入表情等。

## 基本使用

:::demo 基本使用方式。

```js
  render() {
    return (
      <RichEditor value="初始内容a<br/>初始内容b"/>
    );
  }
```
:::


## API

### Props

|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| className | 应用在编辑器外层 DOM 元素的 class。<br/>如有多个 class，需要以空格分隔。 | String | `''` |
| toolbar | 定制工具栏。<br/>可选的值有：<br/>`'link', 'bold', 'italic', 'underline', 'color', 'align', {'list': 'ordered'}, {'list': 'bullet'}, 'emoji', 'image', 'size', 'clean'`。<br/>可以将一个或多个子项放在一个 Array 中以达到分组展示的效果。| Array | `[['link', 'bold', 'italic', 'underline'], ['color'], ['align'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['size'], ['clean']]` |
| placeholder | 内容为空时的占位内容。 | String | `''` |
| value | 默认显示的内容，改变 `value` 将会改变编辑器的内容。<br/>可以是普通 String 或 HTML String | String | `''` |
| extendLinkModule | 扩展链接模块，通过此属性可以个性化定制链接。<br/>接收的数据格式为：<br/>`{entry:{className:'iconfont icon-consult', url:'http://qiyukf.com'}, moduleName:{className:'', url:''}, ...}`。<br/>其中`entry`、`moduleName`为自定义的模块名，`className`为应用在该模块上的样式，用于定义该模块的图标等，`url`为自定义的链接。<br/>_注意：<br/>`url`中必须包含用于分隔协议的双斜线'//'。自定义的模块名需要在`toolbar`中引用才会显示，引用方式与内置模块的引用方式一致。_ | Object | `{}` |
| onChange | 内容改变时的回调函数 | function(content, delta, source, editor) | `noop` |
| onFocus | 获取焦点时的回调函数 | function(range, source, editor) | `noop` |
| onBlur | 失去焦点时的回调函数 | function(previousRange, source, editor) | `noop` |


### Editor Node Method

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
| getHTML() | 返回编辑器的完整 HTML 内容 |
| getSelection() | 返回当前选区的范围，如果编辑器处于 unfocus 状态，则返回 null |
| getBounds() | 返回给定位置处的相对于编辑器容器的像素位置和选区的尺寸 |


_上述 Props 的更多介绍可以参考：_
[React-Quill](https://github.com/zenoamaro/react-quill)  

_更多方法的支持及文档介绍可以参考：_
[Quill API](https://quilljs.com/docs/api)
