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

// console.log(Quill.imports);

class RichEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    toolbar: PropTypes.array,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    extendLinkModule: PropTypes.object
  };

  static defaultProps = {
    className: '',
    toolbar: [['link', 'bold', 'italic', 'underline'], ['color'], ['align'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['size'], ['clean']],
    placeholder: '',
    value: '',
    extendLinkModule: {},
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {}
  };

  constructor(props) {
    super(props);

    let { value, extendLinkModule } = this.props;

    this.state = { 
      value: value
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
          }
        }
      }
    };

    for (let name in extendLinkModule) {
      this.modules.toolbar.handlers[name] = function() {
        this.quill.format('entry', extendLinkModule[name].url);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  focus = () => {
    this.reactQuillRef.focus();
  };

  blur = () => {
    this.reactQuillRef.blur();
  };

  getEditor = () => {
    return this.reactQuillRef.getEditor();
  };

  render() {
    let { value } = this.state;
    let { className, toolbar, placeholder, extendLinkModule, onChange, onFocus, onBlur } = this.props;

    return (
      <div className={className ? ('m-rich-editor ' + className) : 'm-rich-editor'}>
        <CustomToolbar
          className={'editor-head'}
          toolbar={toolbar}
          extendLinkModule={extendLinkModule}
        />
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el; }}
          className={'editor-body'}
          modules={this.modules}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    );
  }
}

export default RichEditor;
