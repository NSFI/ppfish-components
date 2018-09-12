import React, { Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import ReactQuill, { Quill } from '../quill/index.js';
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
    customLink: PropTypes.object
  };

  static defaultProps = {
    customLink: {},
    placeholder: '',
    prefixCls: 'fishd-richeditor',
    toolbar: [
      ['link', 'bold', 'italic', 'underline'],
      ['color'], ['align'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['emoji'], ['image'], ['size'], ['clean']
    ],
    value: '',
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {}
  };

  constructor(props) {
    super(props);

    let { value, customLink } = this.props;

    this.state = {
      value: value,
      toolbarCtner: null
    };
    this.handlers = {
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
    };

    Object.keys(customLink).forEach((name) => {
      this.handlers[name] = function() {
        this.quill.format('entry', customLink[name].url);
      };
    });
  }

  componentDidMount() {
    this.setState({
      toolbarCtner: findDOMNode(this.toolbarRef)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
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
    const { value, toolbarCtner } = this.state;
    const {
      className, prefixCls, toolbar, placeholder, customLink,
      onChange, onFocus, onBlur
    } = this.props;
    const cls = classNames({
      [`${prefixCls}`]: true
    }, className);

    return (
      <div className={cls}>
        <CustomToolbar
          ref={el => this.toolbarRef = el}
          className={'editor-head'}
          toolbar={toolbar}
          customLink={customLink}
        />
        <ReactQuill
          ref={el => this.reactQuillRef = el}
          className={'editor-body'}
          modules={{
            toolbar: {
              container: toolbarCtner,
              handlers: this.handlers
            }
          }}
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
