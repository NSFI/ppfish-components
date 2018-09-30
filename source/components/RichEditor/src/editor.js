import React, { Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import ReactQuill, { Quill } from '../quill/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from '../../Modal/index.tsx';
import Input from '../../Input/index.tsx';
import Button from '../../Button/index.tsx';
import message from '../../Message/index.tsx';
import CustomToolbar from './toolbar.js';
import CustomSizeBlot from './formats/size.js';
import EmojiBlot from './formats/emoji.js';
import LinkBlot from './formats/link.js';
import '../style/index.less';

const { delta: Delta, parchment: Parchment } = Quill.imports;

Quill.register(CustomSizeBlot);
Quill.register(EmojiBlot);
Quill.register(LinkBlot);

class RichEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    customLink: PropTypes.object,
    defaultValue: PropTypes.string,
    maxWidth: PropTypes.string,
    maxHeight: PropTypes.string,
    placeholder: PropTypes.string,
    prefixCls: PropTypes.string,
    resizable: PropTypes.bool,
    toolbar: PropTypes.array,
    value: PropTypes.string,
    getPopupContainer: PropTypes.func,
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
    placeholder: '请输入内容',
    prefixCls: 'fishd-richeditor',
    resizable: true,
    toolbar: [
      ['link', 'bold', 'italic', 'underline'],
      ['size'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['emoji'], ['image'], ['clean']
    ],
    getPopupContainer: () => document.body
  };

  constructor(props) {
    super(props);

    let { value, customLink } = this.props;

    this.toolbarCtner = null;
    this.state = {
      value: value || '',
      showLinkModal: false,
      showImageModal: false,
    };
    this.handlers = {
      link: (value) => {
        let quill = this.getEditor();
        let range = quill.getSelection();

        if (range.length !== 0) {
          this.setState({
            value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
            showLinkModal: true
          });
        } else {
          message.error('没有选中文本');
        }
      },
      emoji: function(value) {
        let vList = value.split('__');
        let range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'emoji', {
          alt: vList[0],
          src: vList[1]
        });
        this.quill.setSelection(range.index + 1);
      },
      customColor: function(color) {
        let range = this.quill.getSelection();
        if (range.length !== 0) {
          this.quill.format('color', color);
        }
      },
      image: () => {
        let quill = this.getEditor();
        this.setState({
          value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
          showImageModal: true
        });
      },
      clean: function() {
        let range = this.quill.getSelection();
        if (range == null) return;
        if (range.length == 0) {
          let formats = this.quill.getFormat();
          Object.keys(formats).forEach((name) => {
            // Clean functionality in existing apps only clean inline formats
            if (Parchment.query(name, Parchment.Scope.INLINE) != null) {
              this.quill.format(name, false);
            }
          });
        } else {
          this.quill.removeFormat(range, Quill.sources.USER);
        }
      },
    };

    Object.keys(customLink).forEach((name) => {
      this.handlers[`${name}Entry`] = function() {
        let range = this.quill.getSelection();
        if (range.length !== 0) {
          this.quill.format('link', customLink[name].url);
        } else {
          message.error('没有选中文本');
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
    let el = this.linkModalInputRef.input,
        val = el.value;

    if (val) {
      if (val.length > 1000) {
        message.error('链接地址不得超过1000个字');
        return;
      }

      let urlRe = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
      if (!urlRe.test(val)) {
        message.error('请输入链接地址');
        return;
      }

      let quill = this.getEditor();
      quill.format('link', val);
      el.value = 'http://';

      this.setState({
        value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
        showLinkModal: false
      });
    }
  };

  handleLinkModalCancel = () => {
    this.linkModalInputRef.input.value = 'http://';
    this.setState({
      showLinkModal: false
    });
  };

  handleImageModalCancel = () => {
    this.setState({
      showImageModal: false
    });
  };

  handlePickLocalImage = () => {
    let quill = this.getEditor();
    let fileInput = this.toolbarCtner.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/jpg, image/jpeg, image/png, image/gif, image/bmp');
      fileInput.classList.add('ql-image');
      fileInput.addEventListener('change', () => {
        if (fileInput.files != null && fileInput.files[0] != null) {
          let reader = new FileReader();
          reader.onload = (e) => {
            let range = quill.getSelection(true);
            quill.updateContents(new Delta()
              .retain(range.index)
              .delete(range.length)
              .insert({ image: e.target.result })
            , 'user');
            quill.setSelection(range.index + 1, 'silent');
            fileInput.value = "";

            this.setState({
              value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
              showImageModal: false
            });
          };
          reader.readAsDataURL(fileInput.files[0]);
        }
      });
      this.toolbarCtner.appendChild(fileInput);
    }
    fileInput.click();
  };

  handleInsertEmoji = (e) => {
    let target = e.target,
        clsList = target.classList.value;

    if ((clsList.indexOf('emoji-item') > -1 || clsList.indexOf('emoji-item-custom') > -1) && target.hasAttribute('value')) {
      let el = this.toolbarCtner.querySelector('button.ql-emoji[data-role="emoji"]');
      if (el == null) {
        el = document.createElement('button');
        this.toolbarCtner.querySelector('.custom-emoji').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'emoji');
      el.setAttribute('value', target.getAttribute('value'));
      el.classList.add('ql-emoji', 'hide');
      el.click();
    }
  };

  handleFormatColor = (e) => {
    let target = e.target;
    if (target.classList.value.indexOf('color-item') > -1 && target.hasAttribute('value')) {
      let el = this.toolbarCtner.querySelector('button.ql-color[data-role="color"]');
      if (el == null) {
        el = document.createElement('button');
        this.toolbarCtner.querySelector('.custom-color').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'color');
      el.setAttribute('value', target.value);
      el.classList.add('ql-color', 'hide');
      el.click();
    }
  };

  handleFormatSize = (e) => {
    let target = e.target;
    if (target.classList.value.indexOf('size-item') > -1 && target.hasAttribute('value')) {
      let el = this.toolbarCtner.querySelector('button.ql-customSize[data-role="customSize"]');
      if (el == null) {
        el = document.createElement('button');
        this.toolbarCtner.querySelector('.custom-size').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'customSize');
      el.setAttribute('value', target.value);
      el.classList.add('ql-customSize', 'hide');
      el.click();
    }
  };

  render() {
    const { value, showLinkModal, showImageModal } = this.state;
    const {
      className, prefixCls,
      value: propsValue,
      toolbar, placeholder,
      customLink, resizable,
      maxWidth, maxHeight,
      getPopupContainer,
      ...restProps
    } = this.props;
    const cls = classNames(`${prefixCls}`, {
      'resizable': resizable,
    }, className);

    return (
      <div className={cls} style={{maxWidth: maxWidth, maxHeight: maxHeight}}>
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
        <Modal
          title="选择插入图片"
          className={`${prefixCls}-image-modal`}
          visible={showImageModal}
          footer={null}
          onCancel={this.handleImageModalCancel}
        >
          <Button type="primary" onClick={this.handlePickLocalImage}>选择本地图片</Button>
          <div className="image-modal-text">支持jpg、jpeg、png、gif、bmp格式的图片，最佳显示高度不超过400px，宽度不超过270px。</div>
        </Modal>
        <CustomToolbar
          ref={el => this.toolbarRef = el}
          className={'editor-head'}
          toolbar={toolbar}
          customLink={customLink}
          handleInsertEmoji={this.handleInsertEmoji}
          handleFormatColor={this.handleFormatColor}
          handleFormatSize={this.handleFormatSize}
          getPopupContainer={getPopupContainer}
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
