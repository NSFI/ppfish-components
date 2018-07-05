import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
let Inline = Quill.import('blots/inline');
class EmojiBlot extends Inline { }
EmojiBlot.blotName = 'emoji';
EmojiBlot.tagName = 'img';
Quill.register(EmojiBlot);


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


const CustomToolbar = (props) => {
  let showSizePanel = () => {
    // debugger;
  };

  return (
    <div id="toolbar" className={props.className}>
      <div className="toolbar-grp">
        <button className="item ql-link" />
        <button className="item ql-bold" />
        <button className="item ql-italic" />
        <button className="item ql-underline" />
      </div>

      <div className="toolbar-grp">
        <select className="item ql-color">
        {
          /*
          <option value="red" />
          <option value="green" />
          <option value="blue" />
          <option value="orange" />
          <option value="violet" />
          <option value="#d0d1d2" />
          <option value="black" />        
           */
        }
        </select>
      </div>

      <div className="toolbar-grp">
        <select className="item ql-align"></select>
        {
          /*
        <button className="ql-align" />
        <button className="ql-align" value="center" />
        <button className="ql-align" value="right" />
           */
        }
      </div>

      <div className="toolbar-grp">
        <button type="button" className="item ql-list" value="ordered" />
        <button type="button" className="item ql-list" value="bullet" />
      </div>

      <div className="toolbar-grp">
        <button className="item ql-emoji" />
      </div>

      <div className="toolbar-grp">
        <button className="item ql-image" />
      </div>

      <div className="toolbar-grp">
        <div className="item custom-size" onClick={showSizePanel}></div>
        <div className="custom-size-panel hide">
          <button type="button" className="ql-customSize item" value="32px">32px</button>
          <button type="button" className="ql-customSize item" value="24px">24px</button>
          <button type="button" className="ql-customSize item" value="18px">18px</button>
          <button type="button" className="ql-customSize item" value="16px">16px</button>
          <button type="button" className="ql-customSize item" value="13px">13px</button>
          <button type="button" className="ql-customSize item" value="12px">12px</button>
        </div>
      </div>

      <div className="toolbar-grp">
        <button className="item ql-clean" />
      </div>

      <div className="toolbar-grp">
        <button className="item ql-entry" />
      </div>

      <div className="toolbar-grp">
        <button className="item ql-insertStar">
          <span className="octicon octicon-star" />
        </button>
      </div>
    </div>
  );
};

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
    )
  }
}

export default RichEditor;
