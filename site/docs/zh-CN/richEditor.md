# RichEditor 富文本编辑器 【交互：李东岳 |视觉：徐剑杰 |开发：高志友 | 维护：高志友、张艳玲】

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
        value={`<p><a target="_blank" href="https://nsfi.github.io/ppfish-components/#/home">Fish Design</a> 是基于 React 实现的高质量的 UI 组件库。</p><p><br></p><p>它的设计原则是简洁、直接、优雅和适应性。</p><p><br></p><p>欢迎使用或<a target="_blank" href="https://github.com/NSFI/ppfish-components/">贡献代码</a><img class="portrait_icon" data-id="emoticon_emoji_132" data-type="defaultEmoji" alt="[玫瑰]" src="//qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png" width="24" height="24"></p>`}
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
    this.toolbar = [['link', 'bold', 'italic', 'underline'], [{size: ['32px', '24px', '18px']}], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean', 'formatPainter']];
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
    this.toolbar = [['link', 'bold', 'italic', 'underline'], ['size'], [{'color': ['#000', '#333', 'red', 'green', 'blue']}], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean', 'formatPainter']];
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
              url: '//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe',
              title: 'pic1'
            },
            {
              id: 1,
              className: 'e1',
              url: '//ysf.qiyukf.net/080b89be8a980ab9951a1b0de643d939',
              title: 'pic2'
            },
            {
              id: 2,
              className: 'e2',
              url: '//ysf.qiyukf.net/260c0731b07b2933fe04f1a4d629450c',
              title: 'pic3'
            },
            {
              id: 3,
              className: 'e3',
              url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe",
              title: "pic4"
            },
            {
              id: 4,
              className: 'e4',
              url: "//ysf.qiyukf.net/080b89be8a980ab9951a1b0de643d939",
              title: "pic5"
            },
            {
              id: 5,
              className: 'e5',
              url: '//ysf.qiyukf.net/260c0731b07b2933fe04f1a4d629450c',
              title: 'pic6'
            },
          ]
        }]}
      />
    );
  }
```
:::


## 扩展插入文本功能

:::demo 扩展工具栏，添加“插入文本”按钮，支持在光标位置处插入自定义文本，可设置该文本是否可编辑（默认可编辑）。

```js

  constructor(props) {
    super(props);
    this.toolbar = [
      ['link', 'bold', 'italic', 'underline'], ['size'], ['color'],
      [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['emoji'], ['image'], ['clean', 'formatPainter'], ['myValue']
    ];
  }

  render() {
    return (
      <RichEditor
        customInsertValue={{
          'myValue': {
            'className': 'my-value',
            'title': '插入变量',
            'editable': false,
            'showSearch': true,
            'option': [
              {'value': '${value1}', 'title': 'LongLongLongLongLongLongLongLongLongLongLongTitle1'},
              {'value': '${value2}', 'title': 'Title2'},
              {'value': '${value3}', 'title': 'Title3', 'editable': true},
              {'value': '${value4}', 'title': 'Title4'},
              {'value': '${value5}', 'title': 'Title5'},
              {'value': '${value6}', 'title': 'Title6'},
              {'value': '${value7}', 'title': 'Title7'},
              {'value': '${value8}', 'title': 'Title8'},
              {'value': '${value9}', 'title': 'Title9'},
              {'value': '${value10}', 'title': 'Title10', 'editable': true}
            ]
          }
        }}
        toolbar={this.toolbar}
        value={`<p><a target="_blank" href="https://nsfi.github.io/ppfish-components/#/home">Fish Design</a> 是基于 React 实现的高质量的 UI 组件库。</p><p><br></p><p>它的设计原则是简洁、直接、优雅和适应性。</p><p><br></p><p>欢迎使用或<a target="_blank" href="https://github.com/NSFI/ppfish-components/">贡献代码</a><img class="portrait_icon" data-id="emoticon_emoji_132" data-type="defaultEmoji" alt="[玫瑰]" src="//qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png" width="24" height="24"></p>`}
      />
    );
  }
```
:::

## 扩展添加超链接功能

:::demo 扩展工具栏，添加定制超链接的按钮。

```js

  constructor(props) {
    super(props);
    this.toolbar = [['link', 'bold', 'italic', 'underline'], ['size'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean', 'formatPainter'], ['mylink']];
  }

  render() {
    return (
      <RichEditor
        customLink={{
          'mylink': {
            'className': 'my-link',
            'title': '自定义超链接',
            'url': 'https://nsfi.github.io/ppfish-components/#/home'
          }
        }}
        toolbar={this.toolbar}
        value={`<p><a target="_blank" href="https://nsfi.github.io/ppfish-components/#/home">Fish Design</a> 是基于 React 实现的高质量的 UI 组件库。</p><p><br></p><p>它的设计原则是简洁、直接、优雅和适应性。</p><p><br></p><p>欢迎使用或<a target="_blank" href="https://github.com/NSFI/ppfish-components/">贡献代码</a><img class="portrait_icon" data-id="emoticon_emoji_132" data-type="defaultEmoji" alt="[玫瑰]" src="//qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png" width="24" height="24"></p>`}
      />
    );
  }
```
:::


## 自定义异步插入超链接

:::demo 扩展工具栏，添加定制超链接的按钮，自定义异步插入超链接。

```js

  constructor(props) {
    super(props);
    this.toolbar = [['link', 'bold', 'italic', 'underline'], ['size'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean', 'formatPainter'], ['mylink']];

    this.state = {
      showModal: false,
      prevValue: null
    };
  }

  getUrl = (cb, prevValue) => {
    this.setState({
      showModal: true,
      prevValue
    });

    this.formatLink = cb;
  };

  handleOk = () => {
    let value = this.inputRef.input.value;

    if (!value) {
      message.error('超链接不得为空');
      return;
    }

    if (this.formatLink) this.formatLink(value);
    this.setState({
      showModal: false
    });
  };

  handleCancel = () => {
    this.setState({
      showModal: false
    });
  };

  saveInputRef = (node) => {
    this.inputRef = node;
  };

  render() {
    return (
      <React.Fragment>
        <RichEditor
          customLink={{
            'mylink': {
              'className': 'my-link',
              'title': '自定义超链接',
              'url': this.getUrl
            }
          }}
          toolbar={this.toolbar}
          value={`<p><a target="_blank" href="https://nsfi.github.io/ppfish-components/#/home">Fish Design</a> 是基于 React 实现的高质量的 UI 组件库。</p><p><br></p><p>它的设计原则是简洁、直接、优雅和适应性。</p><p><br></p><p>欢迎使用或<a target="_blank" href="https://github.com/NSFI/ppfish-components/">贡献代码</a><img class="portrait_icon" data-id="emoticon_emoji_132" data-type="defaultEmoji" alt="[玫瑰]" src="//qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png" width="24" height="24"></p>`}
        />
        <Modal
          title="异步插入超链接"
          destroyOnClose
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            ref={this.saveInputRef}
            placeholder="请输入超链接"
            defaultValue={this.state.prevValue}
          />
        </Modal>
      </React.Fragment>
    );
  }
```
:::


## 自定义插入图片

:::demo 自定义插入图片，支持附带扩展属性。不配合customInsertImage一起使用时，会将图片转为dataUrl的格式插入。

```js
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  getImageUrl = (callback) => {
    this.setState({
      loading: true
    });

    // 模拟上传图片至服务器并设置图片URL的异步过程
    setTimeout(() => {
      let imageUrl = "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe";
      callback({
        src: imageUrl,
        alt: 'image alt',
        title: 'image title',
        width: 200,
        height: 100,
        'data-test': 'test'
      });

      this.setState({
        loading: false
      });
    }, 1000);
  }

  render() {
    return (
      <RichEditor
        customInsertImage={this.getImageUrl}
        loading={this.state.loading}
      />
    );
  }
```
:::


## 自定义拖入/粘贴图片

:::demo 自定义拖入/粘贴图片，支持附带扩展属性。不配合customDropImage一起使用时，会将图片转为dataUrl的格式插入。

```js
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  getImageUrl = (files, callback) => {
    // 排除非图片类型的文件
    let imgFiles = [].filter.call(files, (file) => {
      return (file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i));
    });

    if (!(imgFiles && imgFiles.length)) return;

    this.setState({
      loading: true
    });

    [].forEach.call(imgFiles, (file, index) => {
      // 模拟上传图片至服务器并设置图片URL的异步过程
      setTimeout(() => {
        let imageUrl = "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe";
        callback({
          src: imageUrl,
          alt: 'image alt',
          title: 'image title' + index,
          width: 200,
          height: 100,
          'data-test': 'test'
        });

        if (index == (imgFiles.length - 1)) {
          this.setState({
            loading: false
          });
        }
      }, 1000);
    });
  }

  render() {
    return (
      <RichEditor
        imageDrop
        customDropImage={this.getImageUrl}
        loading={this.state.loading}
      />
    );
  }
```
:::


## 自定义插入视频

:::demo 自定义插入视频。

```js
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  getVideoUrl = (callback) => {
    this.setState({
      loading: true
    });

    // 模拟上传视频获取URL的异步过程
    setTimeout(() => {
      callback({
        'src': "https://www.runoob.com/try/demo_source/mov_bbb.mp4",
        'data-test': 'test',
      });
      this.setState({
        loading: false
      });
    }, 1000);
  };

  handleClickToolbarBtn = (type) => {
    // if (type == 'video') return false;
  };

  render() {
    return (
      <RichEditor
        toolbar={[
          ['link', 'bold', 'italic', 'underline'], 
          ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], 
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['emoji'], ['image'], ['video'], ['size'], ['clean', 'formatPainter']
        ]}
        customInsertVideo={this.getVideoUrl}
        loading={this.state.loading}
        videoTagAttrs={{
          'data-test-default': 'test-default'
        }}
        onClickToolbarBtn={this.handleClickToolbarBtn}
      />
    );
  }
```
:::



## 自定义插入附件

:::demo 自定义插入附件。单次插入多个不同类型的文件时，按”视频 -> 图片 -> 其他文件“的顺序排列

```js
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  getFilesInfo = (callback) => {
    this.setState({
      loading: true
    });

    // 模拟上传文件至服务器并设置URL的异步过程
    setTimeout(() => {
      let files = [{
        name: '普通文件.doc',
        type: 'other',
        url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe"
      },{
        name: '普通文件.pdf',
        type: 'other',
        url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe"
      },{
        name: '图片文件.jpg',
        type: 'image',
        url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe"
      },{
        name: '视频文件.mp4',
        type: 'video',
        url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe"
      },{
        name: '普通文件.txt',
        type: 'other',
        url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe"
      }]
      callback(files);

      this.setState({
        loading: false
      });
    }, 1000);
  }

  render() {
    return (
      <RichEditor
        toolbar={[
          ['link', 'bold', 'italic', 'underline'],
          ['size'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['emoji'], ['image', 'attachment'], ['clean', 'formatPainter'], ['mylink']
        ]}
        attachmentIconMap={{
            video: '//res.qiyukf.net/operation/2edfafe507a11ad70724973bb505addd',
            default: '//res.qiyukf.net/operation/2edfafe507a11ad70724973bb505addd'
        }}
        customInsertAttachment={this.getFilesInfo}
        insertAttachmentTip="支持docx、xlsx、pdf、pptx等常见文件格式，单个文件大小不得超过10M。"
        loading={this.state.loading}
        customLink={{
          'mylink': {
            'className': 'my-link',
            'title': '自定义超链接',
            'url': 'https://nsfi.github.io/ppfish-components/#/home'
          }
        }}
        value={`
        <p>附件测试, 文件类型的图片需自定义：<br/></p>
        <div contenteditable="false" title="未知文件" href="//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe" iconurl="//res.qiyukf.net/operation/2edfafe507a11ad70724973bb505addd" class="attach_file"><img src="//res.qiyukf.net/operation/2edfafe507a11ad70724973bb505addd" class="attach_icon"><a href="//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe" target="_blank" class="attach_text" download="未知文件">未知文件</a></div>
        `}
      />
    );
  }
```
:::


## 自定义拖入/粘贴文件

:::demo 自定义拖入/粘贴文件，图片和视频以内容的形式插入，支持附带扩展属性，其他类型的文件以附件的形式插入。单次插入多个不同类型的文件时，按”视频 -> 图片 -> 其他文件“的顺序排列。

```js
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  getFileUrl = (files, callback) => {
    if (!(files && files.length)) return;

    // 根据file.type过滤掉拖入/粘贴的非文件内容
    // ...

    this.setState({
      loading: true
    });

    // 模拟上传文件至服务器并设置URL的异步过程
    setTimeout(() => {
      let filesInfo = [
        {
          name: '普通文件.doc',
          type: 'other',
          url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe"
        },
        {
          name: '普通文件.pdf',
          type: 'other',
          url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe"
        },
        {
          type: 'image',
          src: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe",
          // 添加其他可选属性
          width: 200,
          height: 100,
          alt: 'image alt',
          title: 'image title',
          'data-test': 'test-image'
        },
        {
          type: 'video',
          src: "//www.runoob.com/try/demo_source/mov_bbb.mp4",
          // 添加其他可选属性
          width: 300,
          'data-test': 'test-video'
        },
        {
          name: '普通文件.txt',
          type: 'other',
          url: "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe"
        }
      ];
      callback(filesInfo);

      this.setState({
        loading: false
      });
    }, 1000);
  }

  render() {
    return (
      <RichEditor
        toolbar={[
          ['link', 'bold', 'italic', 'underline'],
          ['size'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['emoji'], ['image', 'attachment'], ['clean', 'formatPainter']
        ]}
        fileDrop
        customDropFile={this.getFileUrl}
        loading={this.state.loading}
      />
    );
  }
```
:::



## 拖拽编辑器改变大小

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

## 查找与替换

:::demo

```js
 toolbar = [['link', 'bold', 'italic', 'underline'],['fullscreen'],['findAndReplace'], ['size'], ['color'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean', 'formatPainter']];

  render() {
    return (
      <RichEditor
        value={`倘若当时没有失掉那件首饰，她现在会走到什么样的境界?谁知道?谁知道?人生真是古怪，真是变化无常啊。无论是害您或者救您，只消一点点小事。
            她每天吃晚饭的时候，就在那张小圆桌跟前和她的丈夫对面坐下了，桌上盖的白布要三天才换一回，丈夫把那只汤池的盖子一揭开，就用一种高兴的神气说道：“哈!好肉汤!世上没有比它更好的……”因此她又梦想那些丰盛精美的筵席了，梦想那些光辉灿烂的银器皿了，梦想那些满绣着仙境般的园林和其间的古装仕女以及古怪飞禽的壁衣了;她梦想那些用名贵的盘子盛着的佳肴美味了，梦想那些在吃着一份肉色粉红的鲈鱼或者一份松鸡翅膀的时候带着朗爽的微笑去细听的情话了。
            她用陶醉的姿态舞着，用兴奋的动作舞着，她沉醉在欢乐里，她满意于自己的容貌的胜利，满意于自己的成绩的光荣;满意于那一切阿谀赞叹和那场使得女性认为异常完备而且甜美的凯歌，一种幸福的祥云包围着她。所以她什么都不思虑了。
`       }
        toolbar={this.toolbar}
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
        value={`<p><a target="_blank" href="https://nsfi.github.io/ppfish-components/#/home">Fish Design</a> 是基于 React 实现的高质量的 UI 组件库。</p><p><br></p><p><font color="#26BD71" size="5">它的设计原则是简洁、直接、优雅和适应性。</font></p><p><br></p><p>欢迎使用或<a target="_blank" href="https://github.com/NSFI/ppfish-components/">贡献代码</a><img class="portrait_icon" data-id="emoticon_emoji_132" data-type="defaultEmoji" alt="[玫瑰]" src="//qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png" width="24" height="24"></p>`}
      />
    );
  }
```
:::

## 支持图片缩放

:::demo 图片的缩放

```js
 toolbar = [['link', 'bold', 'italic', 'underline'],['fullscreen'], ['size'], ['color'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean', 'formatPainter']];

  render() {
    return (
      <RichEditor
        imageResize={true}
        toolbar={this.toolbar}
        value={`<img height="87" width="200" class="upload-img" data-group="ysf" data-size="11317" data-url="//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe" src="//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe">`}
      />
    );
  }
```
:::


## 插入不可编辑的文本

:::demo 通过单击外部按钮，在光标位置处插入自定义的文本，同时可以设置该文本不可编辑，设置为不可编辑的文本只能被整体删除。

```js
  componentDidMount() {
    window.rEditor2 = this.rEditor = this.editorRef;
  }

  handleInsertText = () => {
    let quill = this.rEditor.getEditor();
    if (!quill) return;

    let range = quill.getSelection();

    if (!range) {
      message.warning('编辑器处于未聚焦状态');
      return;
    }

    if (range.length > 0) {
      quill.deleteText(range.index, range.length);
    }

    quill.insertText(range.index, '【自定义文本】', {
      customAttr: {editable: false}
    });
  };

  render() {
    return (
      <div>
      <Button style={{marginBottom: 10}} onClick={this.handleInsertText}>插入文本</Button>
      <RichEditor
        ref={el => this.editorRef = el}
        value={`
          <p>
            <span>此文本可编辑</span><br>
            <span style="color:red;font-size:16px" contenteditable="false">此文本不可编辑</span><br>
            <span contenteditable="true">此文本可编辑</span>
          </p>
        `}
      />
      </div>
    );
  }
```
:::

## 支持粘贴纯文本

:::demo 支持在粘贴时将富文本转为纯文本。

```js
  render() {
    return (
      <RichEditor
        pastePlainText
        value={`<p><a target="_blank" href="https://nsfi.github.io/ppfish-components/#/home">Fish Design</a> 是基于 React 实现的高质量的 UI 组件库。</p><p><br></p><p>它的设计原则是简洁、直接、优雅和适应性。</p><p><br></p><p>欢迎使用或<a target="_blank" href="https://github.com/NSFI/ppfish-components/">贡献代码</a><img class="portrait_icon" data-id="emoticon_emoji_132" data-type="defaultEmoji" alt="[玫瑰]" src="//qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png" width="24" height="24"></p>`}
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
    this.toolbar = [['link', 'bold', 'italic', 'underline'], ['size'], ['color'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['clean', 'formatPainter']];
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
      ['link', 'bold', 'italic', 'underline', 'strike'], ['undo' , 'redo'], ['lineHeight'], ['fullscreen'], ['color', 'background'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}], ['size'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image','attachment'], ['video'], ['strike'], ['blockquote'], ['code-block'], [{'script': 'sub'}, {'script': 'super'}], [{'indent': '-1'}, {'indent': '+1'}], [{direction: "rtl"}], ['clean', 'formatPainter']
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

__请注意：默认情况下，使用编辑器内置的插入、拖入/粘贴图片功能时，图片将以Data URL的形式嵌入到页面中，此时后端保存该图片将占用较大的空间，因此推荐使用自定义的方式将图片上传到服务器并设置图片的URL。详情可参考 API `customInsertImage` 和 `customDropImage`，及 demo “自定义插入图片” 和 “自定义拖入/粘贴图片”。__

|属性|说明|类型|默认值|
|:-|:-|:-|:-|
| className | 容器类名 | String | - |
| customEmoji | 定制表情包 | Array< Object {name: String, id: Number, [className]: String, url: String, [title]: String} > | - |
| customDropFile | 自定义拖入/粘贴文件，`fileDrop` 为 true 时有效。通过此接口可以在拖入/粘贴文件时自定义获取文件URL的逻辑。接口接收一个函数，它的第一个参数为拖拽进来的函数列表，第二个参数为一个回调函数，调用该函数可以将文件URL插入到组件中。回调函数接收一个文件信息列表，每个文件信息对象都有一个 type 属性，用于标明文件类型，可选值为 'image'、'video'、'other'（默认值）。当 type 取值为 'image' 或 'video'时，该对象的 src 属性为必选，可选属性有 width、height等。当 type 取值为 'other' 时，该对象的 url 和 name 属性为必选。单次插入多个不同类型的文件时，按”视频 -> 图片 -> 其他文件“的顺序排列。 | (files: DataTransferItemList \| ClipboardDataItemList, <br/>callback: ([<br/>{type: 'image' \| 'video', src: String[, otherAttrs: String \| Number]} \| <br/>{ type: 'other', url: String, name: String}<br/>]) => Void) => Void | - |
| customDropImage | 自定义拖入/粘贴图片，`imageDrop` 为 true 时有效。通过此接口可以在拖入/粘贴图片时自定义获取图片URL的逻辑。 | (files: DataTransferItemList \| ClipboardDataItemList, callback: ({src: String[, otherAttrs: String \| Number]}) => Void) => Void | - |
| imageResize | 图片可以缩放大小，`imageResize` 为 true 时有效。 | Boolean | false |
| customInsertAttachment | 自定义插入附件。通过此接口可以在点击工具栏中的插入附件按钮时自定义获取附件URL的逻辑。参数中的 type 用于标明文件的类型，用于在插入多个不同类型的文件时对它们进行排序。type的可选值有 'image'、'video'、'other'（默认值）。| (callback: (files: [{name: String, type: 'image' \| 'video' \| 'other', url: String}]) => Void) => Void | - |
| customInsertImage | 自定义插入图片。通过此接口可以在点击工具栏中的插入图片按钮时自定义获取图片URL的逻辑。 | (callback: ({src: String[, otherAttrs: String \| Number]} \| [{src: String[, otherAttrs: String \| Number]}]) => Void) => Void | - |
| customInsertValue | 扩展插入文本功能。数据格式为： `{'yourModuleName': {className: String, title: String, [editable]: Boolean, [showSearch]: Boolean, [searchPlaceholder]: String, option: Array< Object {value: String, title: String, [editable]: Boolean} >}}`。`className` 为该模块的类名，用于定制图标；`title` 为鼠标 hover 时展示的名称；`editable` 用于设置所有选项插入的文本是否可编辑，默认为 true；`showSearch` 用于设置选项标题是否支持搜索，默认为 false；`searchPlaceholder` 用于设置搜索的占位符，默认为“请输入关键字”；`option` 为选项列表，`option.editable` 用于设置单个选项插入的文本值是否可编辑，优先级比 `editable` 高。| Object | - |
| customInsertVideo | 自定义插入视频，通过此接口可以自定义插入视频前获取视频的过程，如上传本地视频到服务器、异步获取视频源地址等。 | (({src: String} \| [{src: String}]) => Void) => Void | - |
| customLink | 扩展添加超链接功能。数据格式为： `{'yourModuleName': {className: String, url: String \| Function, title: String}}`。 `className` 为该模块的类名，可选；`url` 为自定义的超链接或可以返回超链接的函数，该函数有两个参数，第一个参数为设置超链接的回调函数，第二个参数为当前选中富文本的超链接，必选；`title` 为鼠标 hover 时展示的名称，可选。 | Object | - |
| defaultValue | 编辑器的初始内容，组件不受控 | String \| `HTML String` | - |
| fileDrop | 是否支持以拖入/粘贴的方式插入文件，需要搭配 `customDropFile` 使用，自定义文件的上传逻辑。`fileDrop` 存在时，`imageDrop` 会失效。插入时图片和视频文件将以富文本内容的形式插入，其他类型的文件将以超链接附件的形式插入。 | Boolean | false |
| getPopupContainer | 弹出菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | () => HTMLElement | () => document.body |
| imageDrop | 是否支持以拖入/粘贴的方式插入图片，搭配 `customDropImage` 使用时，可以自定义图片的上传逻辑，否则图片将以Data URL的形式嵌入到页面中。`fileDrop` 存在时，`imageDrop` 会失效。 | Boolean | false |
| insertAttachmentModalVisible | 插入附件时是否展示弹窗提示。置为false时，点击插入附件按钮会直接调用插入附件的方法 | Boolean | true |
| insertAttachmentTip | 插入附件的文字提示 | String \| HTMLElement | - |
| insertImageModalVisible | 插入图片时是否展示弹窗提示。置为false时，点击插入图片按钮会直接调用插入图片的方法 | Boolean | true |
| insertImageTip | 插入图片的文字提示 | String \| HTMLElement | '支持jpg、jpeg、png、gif、bmp格式的图片，最佳显示高度不超过400px，宽度不超过270px。' |
| insertLinkTip | 插入超链接的文字提示 | String \| HTMLElement | - |
| insertVideoTip | 插入视频的文字提示 | String \| HTMLElement | `<span>1、单个视频不超过10M，支持MP4、3GP格式视频。</span><br/><span>2、最佳显示高度不超过400px, 宽度不超过270px。</span>` |
| loading | 是否展示加载中的状态 | Boolean | false |
| onBlur | 失去焦点时的回调 | (previousRange, source, editor) => Void | - |
| onChange | 内容改变时的回调 | (content, delta, source, editor) => Void | - |
| onClickToolbarBtn | 点击工具栏按钮的回调，返回 false 时将不再弹出模态框，可用于禁止对应的按钮功能。只支持对插入超链接、图片、视频、附件按钮的点击回调，回调参数对应的 type 分别为'link'、'image'、'video'、'attachment'。 | (type) => Void | - |
| onFocus | 获取焦点时的回调 | (range, source, editor) => Void | - |
| onKeyDown | 按键按下时的回调，对特殊按键如 `backspace` 、 `delete` 或 `enter` 无效 | (event) => Void | - |
| onKeyPress | 按键按下并释放后的回调，对特殊按键如 `shift` 或 `enter` 无效 | (event) => Void | - |
| onKeyUp | 按键释放后的回调 | (event) => Void | - |
| onSelectionChange | 选区改变时的回调 | (range, source, editor) => Void | - |
| pastePlainText | 在粘贴富文本时，将其转换为纯文本 | Boolean | false |
| placeholder | 内容为空时的占位内容 | String | '请输入内容' |
| popoverPlacement | 气泡框弹出位置 | Enum {'top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'} | 'top' |
| resizable | 是否支持拖拽改变编辑区域的大小 | Boolean | false |
| style | 容器样式 | Object | - |
| supportFontTag | 是否支持 font 标签。设为 true 时，编辑器会将输入的 font 标签替换为 span 标签，并用 CSS 设定文本样式。 | Boolean | false |
| toolbar | 定制工具栏。数组类型，可选的元素值有：`'link', 'bold', 'italic', 'underline', 'color', {'color': ['#000', '#333', 'red', 'green', 'blue']}, 'background', {'background': ['#000', '#333', 'red', 'green', 'blue']}, {'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}, {'list': 'ordered'}, {'list': 'bullet'}, 'emoji', 'image', 'undo' , 'redo', 'lineHeight', 'fullscreen', 'size', {size: ['32px', '24px', '18px', '16px', '13px', '12px']}, 'clean', 'formatPainter', 'strike', 'blockquote', 'code-block', {'script': 'sub'}, {'script': 'super'}, {'indent': '-1'}, {'indent': '+1'}, {direction: "rtl"}, 'video'`。<br/>可以将一个或多个子项放在一个数组中分组展示。| Array | `[['link', 'bold', 'italic', 'underline'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['size'], ['clean', 'formatPainter']]` |
| tooltipPlacement | tooltip 弹出位置 | Enum {'top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'} | 'bottom' |
| value | 编辑器的内容，组件受控，改变 `value` 将会改变编辑器的内容 | String \| `HTML String` | - |
| videoTagAttrs | 设置插入的视频标签的属性，可用于设置视频的width、height、poster及自定义属性等。 | Object | - |
| attachmentIconMap | 插入的附件, 前面的图片样式, 如果不传递, 会自动使用默认图片, 如果类型是default, 则会将其当成默认图片 | Object | - |
| historyConfig | 撤销, 恢复的配置 | Object | - |

## 方法

### RichEditor

|方法|说明|
|:-|:-|
| blur() | 使编辑器失去焦点 |
| focus() | 使编辑器获取焦点 |
| getEditor() | 返回 Quill 实例。请不要强制改变 Quill 实例的状态，以免造成 RichEditor 和 Quill 不同步。请不要缓存 Quill 实例，否则通过该实例获取的内容可能不是最新的。 |

### Quill

|方法|说明|
|:-|:-|
| deleteText(index: Number, length: Number) | 删除指定位置的文本，[详情](https://quilljs.com/docs/api/#deletetext) |
| getBounds() | 返回给定位置处的相对于编辑器容器的像素位置和选区的尺寸 |
| getContents() | 返回 [Quill Delta](https://quilljs.com/docs/delta/) 格式的完整内容 |
| getHTML() | 返回编辑器的完整 HTML 内容，不包含标签中的 contenteditable 属性，保存富文本数据时应使用此 API |
| getRawHTML() | 返回编辑器的完整 HTML 内容，包含标签中的 contenteditable 属性 |
| getLength() | 返回编辑器内容的长度，以字符为单位，不包括 HTML 标签。默认会多加一个回车符的长度。 |
| getSelection() | 返回当前选区的范围，如果编辑器处于 unfocus 状态，则返回 null |
| getText() | 返回编辑器的字符串内容，不包括 HTML 标签。默认会在末尾包含一个回车符。 |
| insertText(index: Number, text: String, formats: { [String]: any }) | 在指定位置插入文本，[详情](https://quilljs.com/docs/api/#inserttext) |
| isEmptyContents() | 检查输入的内容是否全部为空字符（空格、回车符和制表符） |
