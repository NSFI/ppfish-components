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
|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| className | 应用在编辑器外层 DOM 元素的 class，多个 class 以空格分隔 | String | `''` |
| toolbar | 定制工具栏，可选值有： `'link', 'bold', 'italic', 'underline', 'color', {'list': 'ordered'}, {'list': 'bullet'}, 'emoji', 'image', 'size', 'clean', 'entry'`| Array | `[['link', 'bold', 'italic', 'underline'], ['color'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['size'], ['clean'], ['entry']]` |
| placeholder | 内容为空时的占位文案 | String | `''` |
| value | 默认显示的内容，可以是普通 String 或 HTML String | String | `''` |
| onChange | 内容改变时的回调函数 | Function | `() => {}` |
