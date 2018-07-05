import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CustomToolbar from './toolbar.js';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';

console.log(Quill.imports);

// 自定义模块
var Module = Quill.import('core/module');
class CustomModule extends Module {}
// Quill.register('modules/custom-module', CustomModule);


// 字体
var FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = [
  'sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'
];
// Quill.register(FontAttributor, true);


// 背景色，文字色，字体样式
var BackgroundClass = Quill.import('attributors/class/background');
var ColorClass = Quill.import('attributors/class/color');
var SizeStyle = Quill.import('attributors/style/size');
// Quill.register(BackgroundClass, true);
// Quill.register(ColorClass, true);
// Quill.register(SizeStyle, true);


// 字体加粗
var Bold = Quill.import('formats/bold');
Bold.tagName = 'B';   // 自定义使用的HTML标签，Quill uses <strong> by default
// Quill.register(Bold, true);


// 插入表情
let BlockEmbed = Quill.import('blots/block/embed');
class EmojiBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    debugger;
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    return node;
  }

  static value(node) {
    debugger;
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    };
  }
}
EmojiBlot.blotName = 'emoji';
EmojiBlot.tagName = 'img';
Quill.register(EmojiBlot);

let Inline = Quill.import('blots/inline');
// 自定义字体大小
class CustomSizeBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.style.fontSize = value;
    return node;
  }

  static formats(node) {
    return node.style.fontSize;
  }

  static value(node) {
    return node.style.fontSize;
  }

  constructor(props) {
    super(props);

    this.defaultValue = '14px';
  }

  format(name, value) {
    if (name === 'customSize') {
      if (value) {
        this.domNode.style.fontSize = value;
      } else {
        this.domNode.style.fontSize = this.defaultValue;
      }
    } else {
      super.format(name, value);
    }
  }
}
CustomSizeBlot.blotName = 'customSize';
CustomSizeBlot.tagName = 'span';
Quill.register(CustomSizeBlot);


class RichEditor extends Component {
  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
  };

  constructor(props) {
    super(props);

    this.state = { text: '初始内容a<br/>初始内容a' };
    this.modules = {
      toolbar: {
        container: "#toolbar",
        handlers: {
          'insertStar': function insertStar() {
            const cursorPosition = this.quill.getSelection().index;
            this.quill.insertText(cursorPosition, "★");
            this.quill.setSelection(cursorPosition + 1);
          },
          'link': function(value) {
            if (value) {
              var href = prompt('Enter the URL');
              this.quill.format('link', href);
            } else {
              this.quill.format('link', false);
            }
          },
          // 'customSize': function(value) {
          //   let sec = this.quill.getSelection();
          //   debugger;
          //   this.quill.format('customSize', value);
          // }
        }
      }
    };
  }

  handleChange = (value) => {
    // this.setState({ text: value })
  };

  render() {
    return (
      <div className="m-rich-editor">
        <CustomToolbar className={'editor-head'}/>
        <ReactQuill
          className={'editor-body'}
          value={this.state.text}
          placeholder={'placeholder'}
          modules={this.modules}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default RichEditor;
