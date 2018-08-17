import React, { Component, PureComponent } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CustomToolbar from './toolbar.js';
import CustomSizeBlot from './formatSizeBlot.js';
import EmojiBlot from './formatEmojiBlot.js';
import EntryBlot from './formatEntryBlot.js';
import '../style/index.less';

Quill.register(CustomSizeBlot);
Quill.register(EmojiBlot);
Quill.register(EntryBlot);

class RichEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    toolbar: PropTypes.array,
    placeholder: PropTypes.string,
    prefixCls: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    extendLinkModule: PropTypes.object
  };

  static defaultProps = {
    className: '',
    toolbar: [
      ['link', 'bold', 'italic', 'underline'],
      ['color'], ['align'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['emoji'], ['image'], ['size'], ['clean'],
      // ['strike', 'blockquote', 'code-block'],
      // [{'header': 1}, {'header': 2}, {'header': [1, 2, 3, 4, 5, 6]}],
      // [{'script': 'sub'}, {'script': 'super'}],
      // [{'indent': '-1'}, {'indent': '+1'}],
      // ['background'], ['font'],
      // [{direction: "rtl"}],[{size: ['32px', '24px', '18px', '16px', '13px', '12px']}],
      // [{'align': ['right', 'center', 'justify']}],
    ],
    placeholder: '',
    prefixCls: 'fishd-richeditor',
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
          },
          'customColor': function(color) {
            let range = this.quill.getSelection();

            if (range.length !== 0) {
              // 此处使用内置的ColorBlot设置字体颜色，可以自定义CustomColorBlot添加更多扩展功能
              this.quill.format('color', color);
            }
          },
        }
      }
    };

    Object.keys(extendLinkModule).forEach((name) => {
      this.modules.toolbar.handlers[name] = function() {
        this.quill.format('entry', extendLinkModule[name].url);
      };
    });
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
    let { className, prefixCls, toolbar, placeholder, extendLinkModule,
          onChange, onFocus, onBlur } = this.props;

    return (
      <div className={className ? (prefixCls + ' ' + className) : prefixCls}>
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
