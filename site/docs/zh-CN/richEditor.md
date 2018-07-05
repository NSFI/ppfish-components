# 富文本编辑器

富文本编辑器

## 何时使用


## 基本使用

:::demo 基本使用方式。

```js
  render() {
    return (
      <RichEditor/>
    );
  }
```
:::


## API

### Props

|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| className | 应用在编辑器外层 DOM 元素的 class，多个 class 以空格分隔 | String | `''` |
| toolbar | 定制工具栏，可选值有： `'link', 'bold', 'italic', 'underline', 'color', {'list': 'ordered'}, {'list': 'bullet'}, 'emoji', 'image', 'size', 'clean', 'entry'`| Array | `[['link', 'bold', 'italic', 'underline'], ['color'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['size'], ['clean'], ['entry']]` |
| placeholder | 内容为空时的占位文案 | String | `''` |
| value | 默认显示的内容，改变 `value` 将会改变编辑器的内容。可以是普通 String 或 HTML String | String | `''` |
| defaultValue | 默认显示的内容，改变 `defaultValue` 不会改变编辑器的内容。可以是普通 String 或 HTML String | String | `''` |
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




