import React, { Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import ReactQuill, { Quill } from '../quill/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from '../../Modal/index.tsx';
import Input from '../../Input/index.tsx';
import message from '../../Message/index.tsx';
import CustomToolbar from './toolbar.js';
import CustomSizeBlot from './formatSizeBlot.js';
import EmojiBlot from './formatEmojiBlot.js';
import '../style/index.less';

Quill.register(CustomSizeBlot);
Quill.register(EmojiBlot);

class RichEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    customLink: PropTypes.object,
    defaultValue: PropTypes.string,
    toolbar: PropTypes.array,
    placeholder: PropTypes.string,
    prefixCls: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChangeSelection: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
  };

  static defaultProps = {
    customLink: {},
    placeholder: '',
    prefixCls: 'fishd-richeditor',
    toolbar: [
      ['link', 'bold', 'italic', 'underline'],
      ['size'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['emoji'], ['image'], ['clean']
    ],
    value: ''
  };

  constructor(props) {
    super(props);

    let { value, customLink } = this.props;

    this.toolbarCtner = null;
    this.state = {
      value: value,
      showLinkModal: false
    };
    this.handlers = {
      'link': (value) => {
        let quill = this.getEditor();
        let range = quill.getSelection();

        if (range.length !== 0) {
          this.setState({
            showLinkModal: true
          });
        } else {
          message.info('没有选中文本');
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
      }
    };

    Object.keys(customLink).forEach((name) => {
      this.handlers[`${name}Entry`] = function() {
        let range = this.quill.getSelection();
        if (range.length !== 0) {
          this.quill.format('link', customLink[name].url);
        }
      };
    });
  }

  componentDidMount() {
    this.toolbarCtner = findDOMNode(this.toolbarRef);
    this.forceUpdate();
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

  handleLinkModalOk = () => {
    let el = this.linkModalInputRef.input;
    if (el.value) {
      let quill = this.getEditor();
      quill.format('link', el.value);
      el.value = 'http://';

      this.setState({
        value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
        showLinkModal: false
      });
    }
  };

  handleLinkModalCancel = () => {
    this.setState({
      showLinkModal: false
    });
  };

  render() {
    const { value, showLinkModal } = this.state;
    const {
      className, prefixCls,
      value: propsValue,
      toolbar, placeholder,
      customLink, ...restProps
    } = this.props;
    const cls = classNames({
      [`${prefixCls}`]: true
    }, className);

    return (
      <div className={cls}>
        <Modal
          title="插入超链接"
          className={`${prefixCls}-link-modal`}
          visible={showLinkModal}
          onOk={this.handleLinkModalOk}
          onCancel={this.handleLinkModalCancel}
        >
          <span className="link-modal-text">超链接地址</span>
          <Input ref={el => this.linkModalInputRef = el} style={{ width: '434px' }} defaultValue="http://" />
        </Modal>
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
              container: this.toolbarCtner,
              handlers: this.handlers
            }
          }}
          value={value}
          placeholder={placeholder}
          {...restProps}
        />
      </div>
    );
  }
}

export default RichEditor;
