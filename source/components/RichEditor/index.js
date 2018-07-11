import React, { Component, PureComponent } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CustomToolbar from './toolbar.js';
import CustomSizeBlot from './formatSizeBlot.js';
import EmojiBlot from './formatEmojiBlot.js';
import EntryBlot from './formatEntryBlot.js';
import 'react-quill/dist/quill.snow.css';
import './index.less';

Quill.register(CustomSizeBlot);
Quill.register(EmojiBlot);
Quill.register(EntryBlot);

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
      value: this.props.value
    };

    this.modules = {
      toolbar: {
        container: "#toolbar",
        handlers: {
          'link': function(value) {
            let range = this.quill.getSelection();

            if (range.length !== 0) {
              let href = prompt('插入链接');
              this.quill.format('link', href);
            } else {
              // TODO: 提示没有选中文本
            }
          },
          'emoji': function(value) {
            let vList = value.split('__');
            let range = this.quill.getSelection();
            this.quill.insertEmbed(range.index, 'emoji', {
              alt: vList[0],
              src: vList[1]
            });
            this.quill.setSelection(range.index + 1);
          },
          'entry': function(value) {
            this.quill.format('entry', 'qiyu://action.qiyukf.com?command=applyHumanStaff');
            // TODO: 抽象为插件
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
    let { value } = this.state;

    return (
      <div className="m-rich-editor">
        <CustomToolbar
          className={'editor-head'}
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
