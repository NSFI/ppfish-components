import React, { Component, PureComponent } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CustomToolbar from './toolbar.js';
import CustomSizeBlot from './formatSizeBlot.js';
import EmojiBlot from './formatEmojiBlot.js';
import 'react-quill/dist/quill.snow.css';
import './index.less';

Quill.register(CustomSizeBlot);
Quill.register(EmojiBlot);

console.log(Quill.imports);

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
          'emoji': function(value) {
            let vList = value.split('__');
            let range = this.quill.getSelection();
            this.quill.insertEmbed(range.index, 'emoji', {
              alt: vList[0],
              src: vList[1]
            });
            this.quill.setSelection(range.index+1, 0);
          }
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
