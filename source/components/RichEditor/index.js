import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';

console.log(Quill.imports);

var Module = Quill.import('core/module');
class CustomModule extends Module {}
Quill.register('modules/custom-module', CustomModule);


var FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = [
  'sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'
];
Quill.register(FontAttributor, true);


var BackgroundClass = Quill.import('attributors/class/background');
var ColorClass = Quill.import('attributors/class/color');
var SizeStyle = Quill.import('attributors/style/size');
Quill.register(BackgroundClass, true);
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);


var Bold = Quill.import('formats/bold');
Bold.tagName = 'B';   // 自定义使用的HTML标签，Quill uses <strong> by default
Quill.register(Bold, true);


let Inline = Quill.import('blots/inline');
class EmojiBlot extends Inline { }
EmojiBlot.blotName = 'emoji';
EmojiBlot.tagName = 'img';
Quill.register(EmojiBlot);

class SizeBlot extends Inline {
  static create(value) {
    let node = super.create();
    // node.setAttribute('font-size', value);
    node.style.fontSize = value;
    // debugger;
    return node;
  }

  static formats(node, tmp) {
    return node.style.fontSize;
    // debugger;
    // return SizeBlot.tagName.indexOf(node.tagName) + 1;
  }
}
SizeBlot.blotName = 'size';
SizeBlot.tagName = 'span';
Quill.register(SizeBlot);

const CustomButton = () => <span className="octicon octicon-star" />;
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = () => (
  <div id="toolbar">
    <div className="m-rich-editor-grp">
      <button className="ql-link" />
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
    </div>

    <div className="m-rich-editor-grp">
      <select className="ql-color">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option value="black" />
      </select>
    </div>

    <div className="m-rich-editor-grp">
      <button className="ql-align" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
    </div>

    <div className="m-rich-editor-grp">
      <button type="button" className="ql-list" value="ordered" />
      <button type="button" className="ql-list" value="bullet" />
    </div>

    <div className="m-rich-editor-grp">
      <button className="ql-emoji" />
    </div>

    <div className="m-rich-editor-grp">
      <button className="ql-image" />
    </div>

    <div className="m-rich-editor-grp">
      <select className="ql-size" defaultValue={""} onChange={e => e.persist()}>
        <option value="32px">32px</option>
        <option value="24px">24px</option>
        <option value="18px">18px</option>
        <option value="16px">16px</option>
        <option value="13px">13px</option>
        <option value="12px">12px</option>
      </select>
    </div>

    <div className="m-rich-editor-grp">
      <button className="ql-clean" />
    </div>

    <div className="m-rich-editor-grp">
      <button className="ql-entry" />
    </div>

    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

class RichEditor extends Component {
  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = { text: 'asdfadsf' }; // You can also pass a Quill Delta here
    // this.modules = {
    //   toolbar: [
    //     ['link', 'bold', 'italic', 'underline'],
    //     ['color'],
    //     [{'list': 'ordered'}, {'list': 'bullet'}],
    //     // ['emoji'],
    //     ['image'],
    //     ['size'],
    //     ['clean'],
    //     // ['entry'],
        // [{'header': [1, 2, 3, false] }],
    //   ],
    // };

    this.modules = {
      toolbar: {
        container: "#toolbar",
        handlers: {
          'insertStar': insertStar,
          'link': function(value) {
            if (value) {
              var href = prompt('Enter the URL');
              this.quill.format('link', href);
            } else {
              this.quill.format('link', false);
            }
          },
          // 'size': function(value) {
          //   this.quill.format('size', value);
          //   debugger;
          // }
        }
      }
    };

    // this.formats = [
    //   'link', 'bold', 'italic', 'underline', 
    //   'color', 'size',
    //   'list',
    //   'bullet',
    //   'image',
    //   'header',
    //   'clean',
    //   // 'emoji',
    //   // 'entry',
    //   'indent',
    //   "font",
    //   "strike",
    //   "blockquote",
    // ];

    this.formats = ['italic', 'underline'];
  }

  handleChange = (value) => {
    // this.setState({ text: value })
  };

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          className={'testclass testclass2'}
          value={this.state.text}
          placeholder={'placeholder'}
          modules={this.modules}
          // formats={this.formats}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default RichEditor;
