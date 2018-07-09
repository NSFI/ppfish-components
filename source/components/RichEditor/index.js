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
    value: PropTypes.string,
  };

  static defaultProps = {
    value: '初始内容a<br/>初始内容a',
  };

  constructor(props) {
    super(props);

    let _this = this;
    this.state = { 
      value: this.props.value,
      showEmojiPanel: false
    };
    this.modules = {
      toolbar: {
        container: "#toolbar",
        handlers: {
          'link': function(value) {
            if (value) {
              let href = prompt('Enter the URL');
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
            // _this.setState({
            //   value: this.quill.getContents(),
            //   showEmojiPanel: false
            // });
          }
        }
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (value) => {
    // this.setState({ text: value })
  };

  render() {
    let { showEmojiPanel, value } = this.state;

    return (
      <div className="m-rich-editor">
        <CustomToolbar
          className={'editor-head'}
          showEmojiPanel={showEmojiPanel}
        />
        <ReactQuill
          className={'editor-body'}
          value={value}
          placeholder={'placeholder'}
          modules={this.modules}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default RichEditor;
