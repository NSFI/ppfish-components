import React, { Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import ReactQuill, { Quill } from '../quill/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from '../../Modal/index.tsx';
import Input from '../../Input/index.tsx';
import Button from '../../Button/index.tsx';
import message from '../../message/index.tsx';
import CustomToolbar from './toolbar.js';
import CustomSizeBlot from './formats/size.js';
import EmojiBlot from './formats/emoji.js';
import LinkBlot from './formats/link.js';
import ImageBlot from './formats/image.js';
import '../style/index.less';

const EMOJI_VALUE_DIVIDER = '///***';
const { delta: Delta, parchment: Parchment } = Quill.imports;

Quill.register(CustomSizeBlot);
Quill.register(EmojiBlot);
Quill.register(LinkBlot);
Quill.register(ImageBlot);

const getImageSize = function(url, callback) {
  let newImage;
  newImage = document.createElement('img');
  newImage.onload = function() {
    callback(this.width, this.height);
  };
  newImage.src = url;
};

class RichEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    customEmoji: PropTypes.array,
    customLink: PropTypes.object,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    prefixCls: PropTypes.string,
    resizable: PropTypes.bool,
    supportFontTag: PropTypes.bool,
    style: PropTypes.object,
    toolbar: PropTypes.array,
    value: PropTypes.string,
    insertImageTip: PropTypes.string,
    customInsertImage: PropTypes.func,
    getPopupContainer: PropTypes.func,
    onChange: PropTypes.func,
    onSelectionChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
  };

  static defaultProps = {
    customEmoji: [],
    customLink: {},
    insertImageTip: '支持jpg、jpeg、png、gif、bmp格式的图片，最佳显示高度不超过400px，宽度不超过270px。',
    placeholder: '请输入内容',
    prefixCls: 'fishd-richeditor',
    resizable: false,
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

    let { value, customLink, supportFontTag } = this.props;

    if (supportFontTag) {
      value = this.formatFontTag(value);
    }

    this.state = {
      value: value || '',
      showLinkModal: false,
      showVideoModal: false,
      showImageModal: false,
      toolbarCtner: null,
    };
    this.handlers = {
      myLink: (value) => {
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
      video: (value) => {
        let quill = this.getEditor();
        this.setState({
          value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
          showVideoModal: true
        });
      },
      emoji: function(value) {
        let vList = value.split(EMOJI_VALUE_DIVIDER);
        let range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'emoji', {
          type: vList[0],
          alt: vList[1],
          src: vList[2],
          width: vList[3],
          height: vList[4],
          id: vList[5]
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
          this.quill.format('myLink', customLink[name].url);
        } else {
          message.error('没有选中文本');
        }
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
      let newValue = nextProps.value;

      if (this.props.supportFontTag) {
        newValue = this.formatFontTag(nextProps.value);
      }

      this.setState({
        value: newValue
      });
    }
  }

  formatFontTag = (value) => {
    if (!value) return value;

    let fontTagStart = /(<\s*?)font(\s+)(.*?)(>)/gi,
        fontTagEnd = /(<\s*?\/\s*?)font(\s*?>)/gi;

    value = value.replace(fontTagStart, ($0, $1, $2, $3, $4) => {
      let tagStyle = ' style="',
          tagAttr = ' ';

      $3.replace(/(\w+-?\w+)\s*=\s*["']\s*(.*?)\s*["']/gi, ($0, $1, $2) => {
        let key = $1, value = $2;

        switch (key) {
          case 'color': {
            tagStyle += 'color:' + value + ';';
            break;
          }
          case 'size': {
            tagStyle += 'font-size:' + value + ';';
            break;
          }
          case 'face': {
            tagStyle += 'font-family:' + value + ';';
            break;
          }
          default: {
            tagAttr += key + '=' + value;
            break;
          }
        }
      });

      tagStyle += '"';

      return $1 + 'span' + $2 + tagStyle + tagAttr + $4;
    });

    return value.replace(fontTagEnd, '$1span$2');
  };

  focus = () => {
    if (!this.reactQuillRef) return;
    this.reactQuillRef.focus();
  };

  blur = () => {
    if (!this.reactQuillRef) return;
    this.reactQuillRef.blur();
  };

  getEditor = () => {
    if (!this.reactQuillRef) return;
    return this.reactQuillRef.getEditor();
  };

  // 检查输入的内容是否全部为空字符（空格、回车符、制表符）
  isEmptyContents = () => {
    let quill = this.reactQuillRef.getEditor(),
      delta = quill.getContents();

    if (delta && delta.ops && delta.ops.length == 1) {
      let obj = delta.ops[0];
      if (obj.hasOwnProperty('attributes') || !obj.hasOwnProperty('insert')) {
        return false;
      }

      let inputChars = [...obj['insert']];
      let notEmpty = inputChars.some((val) => {
        return val!==' ' && val!=='\t' && val!=='\n';
      });

      return !notEmpty;
    }

    return false;
  }

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
      quill.format('myLink', val);
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

  handleVideoModalOk = () => {
    let el = this.videoModalInputRef.input,
        val = el.value;

    if (val) {
      if (val.length > 1000) {
        message.error('视频地址不得超过1000个字');
        return;
      }

      let urlRe = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
      if (!urlRe.test(val)) {
        message.error('请输入视频地址');
        return;
      }

      let quill = this.getEditor();
      quill.format('video', val);
      el.value = 'http://';

      this.setState({
        value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
        showVideoModal: false
      });
    }
  };

  handleVideoModalCancel = () => {
    this.videoModalInputRef.input.value = 'http://';
    this.setState({
      showVideoModal: false
    });
  };

  handleImageModalCancel = () => {
    this.setState({
      showImageModal: false
    });
  };

  handlePickLocalImage = () => {
    let { customInsertImage } = this.props;
    let { toolbarCtner } = this.state;
    let quill = this.getEditor();
    let fileInput = toolbarCtner.querySelector('input.ql-image[type=file]');
    const getImageCb = (attrs) => {
      if (attrs.src == undefined) {
        message.error('请设置所插入图片的 src 属性');
        return;
      }

      let range = quill.getSelection(true);

      // quill.updateContents(new Delta()
      //   .retain(range.index)
      //   .delete(range.length)
      //   .insert({ image: url })
      // , 'user');

      if (attrs.width == undefined || attrs.height == undefined) {
        getImageSize(attrs.src, (naturalWidth, naturalHeight) => {
          attrs.width = naturalWidth;
          attrs.height = naturalHeight;

          quill.insertEmbed(range.index, 'myImage', attrs);
          quill.setSelection(range.index + 1, 'silent');

          this.setState({
            value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
            showImageModal: false
          });
        });
      } else {
        quill.insertEmbed(range.index, 'myImage', attrs);
        quill.setSelection(range.index + 1, 'silent');

        this.setState({
          value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
          showImageModal: false
        });
      }
    };

    if (customInsertImage && (typeof customInsertImage === "function")) {
      customInsertImage(getImageCb);
    } else {
      if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/jpg, image/jpeg, image/png, image/gif, image/bmp');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', () => {
          if (fileInput.files != null && fileInput.files[0] != null) {
            let reader = new FileReader();
            reader.onload = (e) => {
              getImageCb({src: e.target.result});
              fileInput.value = "";
            };
            reader.readAsDataURL(fileInput.files[0]);
          }
        });
        toolbarCtner.appendChild(fileInput);
      }
      fileInput.click();
    }
  };

  handleInsertEmoji = (e) => {
    let { toolbarCtner } = this.state;
    let target = e.target,
        clsList = target.classList.value;

    if ((clsList.indexOf('emoji-item') > -1 || clsList.indexOf('emoji-extend-item') > -1) && target.hasAttribute('value')) {
      let el = toolbarCtner.querySelector('button.ql-emoji[data-role="emoji"]');
      if (el == null) {
        el = document.createElement('button');
        toolbarCtner.querySelector('.custom-emoji').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'emoji');
      el.setAttribute('value', target.getAttribute('value'));
      el.classList.add('ql-emoji', 'hide');
      el.click();
    }
  };

  handleFormatBackground = (e) => {
    let { toolbarCtner } = this.state;
    let target = e.target;
    if (target.classList.value.indexOf('background-item') > -1 && target.hasAttribute('value')) {
      let el = toolbarCtner.querySelector('button.ql-background[data-role="background"]');
      if (el == null) {
        el = document.createElement('button');
        toolbarCtner.querySelector('.custom-background').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'background');
      el.setAttribute('value', target.value);
      el.classList.add('ql-background', 'hide');
      el.click();
    }
  };

  handleFormatColor = (e) => {
    let { toolbarCtner } = this.state;
    let target = e.target;
    if (target.classList.value.indexOf('color-item') > -1 && target.hasAttribute('value')) {
      let el = toolbarCtner.querySelector('button.ql-color[data-role="color"]');
      if (el == null) {
        el = document.createElement('button');
        toolbarCtner.querySelector('.custom-color').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'color');
      el.setAttribute('value', target.value);
      el.classList.add('ql-color', 'hide');
      el.click();
    }
  };

  handleFormatSize = (e) => {
    let { toolbarCtner } = this.state;
    let target = e.target;
    if (target.classList.value.indexOf('size-item') > -1 && target.hasAttribute('value')) {
      let el = toolbarCtner.querySelector('button.ql-customSize[data-role="customSize"]');
      if (el == null) {
        el = document.createElement('button');
        toolbarCtner.querySelector('.custom-size').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'customSize');
      el.setAttribute('value', target.value);
      el.classList.add('ql-customSize', 'hide');
      el.click();
    }
  };

  handleChange = (value, delta, source, editor) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value, delta, source, editor);
    }
  };

  render() {
    const { value, showLinkModal, showVideoModal, showImageModal, toolbarCtner } = this.state;
    const {
      className, prefixCls,
      toolbar, placeholder,
      customLink, resizable,
      style,
      getPopupContainer,
      customEmoji,
      insertImageTip,
      onChange,
      onSelectionChange,
      ...restProps
    } = this.props;
    delete restProps.customInsertImage;
    const cls = classNames(`${prefixCls}`, {
      'resizable': resizable,
    }, className);

    if (value) {
      restProps.value = value;
    }

    return (
      <div className={cls} style={style}>
        <Modal
          title="插入超链接"
          className={`${prefixCls}-link-modal`}
          visible={showLinkModal}
          onOk={this.handleLinkModalOk}
          onCancel={this.handleLinkModalCancel}
        >
          <span className="text">超链接地址</span>
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
          <div className="image-modal-text">{insertImageTip}</div>
        </Modal>
        <Modal
          title="插入视频"
          className={`${prefixCls}-video-modal`}
          visible={showVideoModal}
          onOk={this.handleVideoModalOk}
          onCancel={this.handleVideoModalCancel}
        >
          <span className="text">视频地址</span>
          <Input ref={el => this.videoModalInputRef = el} style={{ width: '434px' }} defaultValue="http://" />
        </Modal>
        <CustomToolbar
          ref={el => this.toolbarRef = el}
          className={'editor-head'}
          toolbar={toolbar}
          customEmoji={customEmoji}
          customLink={customLink}
          handleInsertEmoji={this.handleInsertEmoji}
          handleFormatColor={this.handleFormatColor}
          handleFormatBackground={this.handleFormatBackground}
          handleFormatSize={this.handleFormatSize}
          getPopupContainer={getPopupContainer}
        />
        <ReactQuill
          {...restProps}
          ref={el => this.reactQuillRef = el}
          className={'editor-body'}
          modules={{
            toolbar: {
              container: toolbarCtner,
              handlers: this.handlers
            }
          }}
          placeholder={placeholder}
          onChange={this.handleChange}
          onSelectionChange={onSelectionChange}
        />
      </div>
    );
  }
}

export default RichEditor;
