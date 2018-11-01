# RichEditor 富文本编辑器 【交互：李东岳 |视觉：徐剑杰 |开发：高志友】

一种可内嵌于浏览器，所见即所得的文本编辑器。

## 何时使用

当用户对于信息内容及内容的格式有更复杂的要求时，使用富文本编辑器进行内容编辑。

## 基本使用

:::demo 基本使用方式。

```js

  componentDidMount() {
    window.rEditor = this.editorRef;
  }

  onChange = (content, delta, source, editor) => {
    //console.log('content: ', content);
    //console.log('delta: ', delta);
    //console.log('source: ', source);
    //console.log('editor: ', editor);
  }

  render() {
    return (
      <RichEditor
        ref={el => this.editorRef = el}
        onChange={this.onChange}
        value={`<p><a href="https://nsfi.github.io/ppfish-components/#/home" target="_blank"><span style="font-size: 16px;">Fish Design</span></a><span style="font-size: 16px;"> 是基于 React 实现的高质量的 UI 组件库。</span></p><p><br></p><p><span style="font-size: 16px;">它的设计原则是简洁、直接、优雅和适应性。</span></p><p><br></p><p><span style="font-size: 16px;">欢迎使用或</span><a href="https://github.com/NSFI/ppfish-components/" target="_blank"><span style="font-size: 16px;">贡献代码</span></a><span style="font-size: 16px;"><img width="24px" height="24px" alt="玫瑰" src="http://qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png"></span></p><p><br></p>`}
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
        customLink={{'mylink': {className: 'my-link', url: 'qiyu://action.qiyukf.com?command=applyHumanStaff', title: '设置为转人工入口'}}}
        toolbar={this.toolbar}
      />
    );
  }
```
:::

## 定制文字大小

:::demo 定制文字大小。

```js

  constructor(props) {
    super(props);
    this.toolbar = [['link', 'bold', 'italic', 'underline'], [{size: ['32px', '24px', '18px']}], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean']];
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

## 定制文字颜色

:::demo 定制文字颜色。

```js

  constructor(props) {
    super(props);
    this.toolbar = [['link', 'bold', 'italic', 'underline'], ['size'], [{'color': ['#000', '#333', 'red', 'green', 'blue']}], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean']];
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

## 定制表情包

:::demo 定制表情包。

```js

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RichEditor
        customEmoji={[{
          name: '自定义表情1',
          data: [
            {
              id: 0,
              className: 'e0',
              url: '//ysf.nosdn.127.net/xcdbmadptmoftklqvwwxzwlvlorxnzin',
              title: 'pic1'
            },
            {
              id: 1,
              className: 'e1',
              url: '//ysf.nosdn.127.net/ausunifcvhchdzbexjvxcswemqeojqdf',
              title: 'pic2'
            },
            {
              id: 2,
              className: 'e2',
              url: '//ysf.nosdn.127.net/ijonlnhjaleturyoittndfkpuhbchdkd',
              title: 'pic3'
            },
            {
              id: 3,
              className: 'e3',
              url: "//ysf.nosdn.127.net/bqwiuevkyaimbmqcjvealfhejvxzbbth",
              title: "pic4"
            },
            {
              id: 4,
              className: 'e4',
              url: "//ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf",
              title: "pic5"
            },
            {
              id: 5,
              className: 'e5',
              url: '//ysf.nosdn.127.net/xcdbmadptmoftklqvwwxzwlvlorxnzin',
              title: 'pic6'
            },
          ]
        }]}
      />
    );
  }
```
:::

## 拖拽改变大小

:::demo 拖拽改变大小。

```js

  render() {
    return (
      <RichEditor
        resizable
      />
    );
  }
```
:::

## 自定义插入图片

:::demo 自定义插入图片，支持附带扩展属性。

```js
  
  getImageUrl = (callback) => {
    setTimeout(() => {
      let imageUrl = "//ysf.nosdn.127.net/xcdbmadptmoftklqvwwxzwlvlorxnzin";
      callback({
        src: imageUrl,
        alt: 'image alt',
        title: 'image title',
        width: 200,
        height: 200,
        'data-url': imageUrl,
        'data-size': 123,
        'data-group': 'abc',
      });
    }, 1000);
  }

  render() {
    return (
      <RichEditor
        customInsertImage={this.getImageUrl}
      />
    );
  }
```
:::

## 支持使用 font 标签

:::demo 将 value 中的 font 标签替换为 span 标签，并用 CSS 设定文本样式。

```js

  render() {
    return (
      <RichEditor
        supportFontTag
        value={`<p><a href="https://nsfi.github.io/ppfish-components/#/home" target="_blank"><font size="16px">Fish Design</font></a><font size="16px"> 是基于 React 实现的高质量的<font size="16px" color="red"> UI 组件库</font>。</font></p><p><br></p><p><font size="16px">它的设计原则是简洁、直接、优雅和适应性。</font></p><p><br></p><p><font size="16px">欢迎使用或</font><a href="https://github.com/NSFI/ppfish-components/" target="_blank"><font size="16px">贡献代码</font></a><font size="16px"><img width="24px" height="24px" alt="玫瑰" src="http://qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png"></font></p><p><br></p>`}
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
      <RichEditor
        toolbar={this.toolbar}
      />
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
      ['link', 'bold', 'italic', 'underline'], ['color', 'background'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}], ['size'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['video'], ['strike'], ['blockquote'], ['code-block'], [{'script': 'sub'}, {'script': 'super'}], [{'indent': '-1'}, {'indent': '+1'}], [{direction: "rtl"}], ['clean']
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
| customEmoji | 定制表情包 | Array<Object {name: String, id: Number, [className]: String, url: String, [title]: String}> | - |
| customInsertImage | 自定义插入图片。通过此接口可以自己实现插入图片前获取图片的过程。 | (callback: (attrs: Object {src: String, [otherAttr]: String \| Number}) => Void) => Void | - |
| customLink | 定制文本链接。数据格式为： `{'yourModuleName': {className: String, url: String, title: String}}`。 `className` 为该模块的类名，可选。 `url` 为自定义的链接，必须包含用于分隔协议的双斜线 '//'。`title` 为鼠标 hover 时展示的名称，可选。 | Object | - |
| defaultValue | 编辑器的初始内容，组件不受控 | String \| `HTML String` | - |
| getPopupContainer | 弹出菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | () => HTMLElement | () => document.body |
| insertImageTip | 插入图片的文字提示 | String | '支持jpg、jpeg、png、gif、bmp格式的图片，最佳显示高度不超过400px，宽度不超过270px。' |
| onBlur | 失去焦点时的回调 | (previousRange, source, editor) => Void | - |
| onChange | 内容改变时的回调 | (content, delta, source, editor) => Void | - |
| onFocus | 获取焦点时的回调 | (range, source, editor) => Void | - |
| onKeyDown | 按键按下时的回调，对特殊按键如 `backspace` 、 `delete` 或 `enter` 无效 | (event) => Void | - |
| onKeyPress | 按键按下并释放后的回调，对特殊按键如 `shift` 或 `enter` 无效 | (event) => Void | - |
| onKeyUp | 按键释放后的回调 | (event) => Void | - |
| onSelectionChange | 选区改变时的回调 | (range, source, editor) => Void | - |
| placeholder | 内容为空时的占位内容 | String | '请输入内容' |
| resizable | 是否支持拖拽改变编辑区域的大小 | Boolean | false |
| style | 容器样式 | Object | - |
| supportFontTag | 是否支持 font 标签。设为 true 时，编辑器会将输入的 font 标签替换为 span 标签，并用 CSS 设定文本样式。 | Boolean | false |
| toolbar | 定制工具栏。数组类型，可选的元素值有：`'link', 'bold', 'italic', 'underline', 'color', {'color': ['#000', '#333', 'red', 'green', 'blue']}, 'background', {'background': ['#000', '#333', 'red', 'green', 'blue']}, {'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}, {'list': 'ordered'}, {'list': 'bullet'}, 'emoji', 'image', 'size', {size: ['32px', '24px', '18px', '16px', '13px', '12px']}, 'clean', 'strike', 'blockquote', 'code-block', {'script': 'sub'}, {'script': 'super'}, {'indent': '-1'}, {'indent': '+1'}, {direction: "rtl"}, 'video'`。<br/>可以将一个或多个子项放在一个数组中分组展示。| Array | `[['link', 'bold', 'italic', 'underline'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['size'], ['clean']]` |
| value | 编辑器的内容，组件受控，改变 `value` 将会改变编辑器的内容 | String \| `HTML String` | - |

### 方法

#### RichEditor 实例

|方法|说明|
|:-|:-|
| blur() | 使编辑器失去焦点 |
| focus() | 使编辑器获取焦点 |
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
