# 富文本编辑器

一种可内嵌于浏览器，所见即所得的文本编辑器。

## 何时使用

当用户对于信息内容及内容的格式有更复杂的要求时，使用富文本编辑器进行内容编辑。

## 基本使用

:::demo 基本使用方式。

```js
  
  componentDidMount() {
    window.rEditor = this.richEditor;
  }

  onChange = (content, delta, source, editor) => {
    console.log('content: ', content);
    console.log('delta: ', delta);
    console.log('source: ', source);
    console.log('editor: ', editor);
  }

  render() {
    return (
      <RichEditor
        ref={(node) => this.richEditor = node}
        onChange={this.onChange}
        value="初始内容 Line1<br/>初始内容 Line2"
      />
    );
  }
```
:::

## 定制超链接

:::demo 定制超链接。

```js

  constructor(props) {
    super(props);
    this.toolbar = [['link', 'bold', 'italic', 'underline'], ['size'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean'], ['mylink']];
  }

  render() {
    return (
      <RichEditor
        customLink={{'mylink': {className: 'my-link', url: '//nsfi.github.io/ppfish-components/#/home'}}}
        toolbar={this.toolbar}
      />
    );
  }
```
:::

## 轻量版

:::demo 轻量版。

```js

  constructor(props) {
    super(props);
    this.toolbar = [['link', 'bold', 'italic', 'underline'], ['size'], ['color'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean']];
  }

  render() {
    return (
      <RichEditor toolbar={this.toolbar} />
    );
  }
```
:::

## 完整版

:::demo 完整版。

```js

  constructor(props) {
    super(props);
    this.toolbar = [
      'link', 'bold', 'italic', 'underline', 'color', 'background', 'align', 'font', 'size', {'list': 'ordered'}, {'list': 'bullet'}, 'emoji', 'image', 'strike', 'blockquote', 'code-block', 
      {'header': [1, 2, 3, 4, 5, 6]}, {'script': 'sub'}, {'script': 'super'}, 
      {'indent': '-1'}, {'indent': '+1'}, {direction: "rtl"}, 'clean'
    ];
  }

  render() {
    return (
      <RichEditor
        toolbar={this.toolbar}
      />
    );
  }
```
:::

## API

### 属性

|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| className | 容器类名 | String | - |
| customLink | 定制文本链接。数据格式为： `{'yourModuleName': {className: '', url: ''}}`。 `className` 为该模块的类名，此属性非必填。 `url` 为自定义的链接，必须包含用于分隔协议的双斜线 '//' | Object | - |
| defaultValue | 编辑器的初始内容，组件不受控 | String \| `HTML String` | - |
| placeholder | 内容为空时的占位内容 | String | - |
| toolbar | 定制工具栏。数组类型，可选的元素值有：`'link', 'bold', 'italic', 'underline', 'color', 'align', [{'align': ''}, {'align': 'center'}, {'align': 'right'}], {'align': ['', 'right', 'center', 'justify']}, {'list': 'ordered'}, {'list': 'bullet'}, 'emoji', 'image', 'size', {size: ['32px', '24px', '18px', '16px', '13px', '12px']}, 'clean', 'strike', 'blockquote', 'code-block', {'header': 1}, {'header': 2}, {'header': [1, 2, 3, 4, 5, 6]}, {'script': 'sub'}, {'script': 'super'}, {'indent': '-1'}, {'indent': '+1'}, {direction: "rtl"}, 'background', 'font'`。<br/>可以将一个或多个子项放在一个数组中分组展示。| Array | `[['link', 'bold', 'italic', 'underline'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['size'], ['clean']]` |
| value | 编辑器的内容，组件受控，改变 `value` 将会改变编辑器的内容 | String \| `HTML String` | - |
| onChange | 内容改变时的回调 | (content, delta, source, editor) => any | - |
| onChangeSelection | 选区改变时的回调 | (range, source, editor) => any | - |
| onFocus | 获取焦点时的回调 | (range, source, editor) => any | - |
| onBlur | 失去焦点时的回调 | (previousRange, source, editor) => any | - |
| onKeyPress | 按键按下并释放后的回调，对特殊按键如 `shift` 或 `enter` 无效 | (event) => any | - |
| onKeyDown | 按键按下时的回调，对特殊按键如 `backspace` 、 `delete` 或 `enter` 无效 | (event) => any | - |
| onKeyUp | 按键释放后的回调 | (event) => any | - |

### 方法

#### RichEditor 实例

|方法|说明|
|:-|:-|
| focus() | 使编辑器获取焦点 |
| blur() | 使编辑器失去焦点 |
| getEditor() | 返回 Quill 实例。请不要强制改变 Quill 实例的状态，以免造成 RichEditor 和 Quill 不同步 |

#### Quill 实例

|方法|说明|
|:-|:-|
| getBounds() | 返回给定位置处的相对于编辑器容器的像素位置和选区的尺寸 |
| getContents() | 返回 [Quill Delta](https://quilljs.com/docs/delta/) 格式的完整内容 |
| getHTML() | 返回编辑器的完整 HTML 内容 |
| getLength() | 返回编辑器内容的长度，以字符为单位，不包括 HTML 标签 |
| getSelection() | 返回当前选区的范围，如果编辑器处于 unfocus 状态，则返回 null |
| getText() | 返回编辑器的字符串内容，不包括 HTML 标签 |

### 参考文档

1. [ReactQuill](https://github.com/zenoamaro/react-quill)  
2. [Quill API](https://quilljs.com/docs/api)
