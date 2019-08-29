import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import ReactQuill, { Quill } from '../quill/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addEventListener } from '../../../utils';
import {polyfill} from 'react-lifecycles-compat';
import Spin from '../../Spin/index.tsx';
import Radio from '../../Radio/index.tsx';
import Modal from '../../Modal/index.tsx';
import Input from '../../Input/index.tsx';
import Button from '../../Button/index.tsx';
import message from '../../message/index.tsx';
import CustomToolbar from './toolbar.js';
import CustomSizeBlot from './formats/size.js';
import EmojiBlot from './formats/emoji.js';
import LinkBlot from './formats/link.js';
import ImageBlot from './formats/image.js';
import VideoBlot from './formats/video.js';
import PlainClipboard from './plainClipboard.js';
import '../style/index.less';

Quill.register(EmojiBlot);
Quill.register(LinkBlot);
Quill.register(ImageBlot);
Quill.register(CustomSizeBlot);
Quill.register(VideoBlot);

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
    customInsertValue: PropTypes.object,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    prefixCls: PropTypes.string,
    loading: PropTypes.bool,
    resizable: PropTypes.bool,
    supportFontTag: PropTypes.bool,
    pastePlainText: PropTypes.bool,
    style: PropTypes.object,
    toolbar: PropTypes.array,
    value: PropTypes.string,
    insertImageTip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    insertVideoTip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    popoverPlacement: PropTypes.string,
    tooltipPlacement: PropTypes.string,
    videoTagAttrs: PropTypes.object,
    customInsertImage: PropTypes.func,
    customInsertVideo: PropTypes.func,
    getPopupContainer: PropTypes.func,
    onChange: PropTypes.func,
    onClickToolbarBtn: PropTypes.func,
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
    customInsertValue: {},
    insertImageTip: '支持jpg、jpeg、png、gif、bmp格式的图片，最佳显示高度不超过400px，宽度不超过270px。',
    insertVideoTip: (
      <React.Fragment>
        <span>1、单个视频不超过10M，支持MP4、MPEG4、H264、AAC、WebM、VP8、Vorbis、OggTheora格式。受微信限制，微信端仅支持发送MP4格式视频。</span>
        <br/>
        <span>2、最佳显示高度不超过400px, 宽度不超过270px。</span>
      </React.Fragment>
    ),
    placeholder: '请输入内容',
    prefixCls: 'fishd-richeditor',
    popoverPlacement: 'top',
    tooltipPlacement: 'bottom',
    loading: false,
    resizable: false,
    pastePlainText: false,
    toolbar: [
      ['link', 'bold', 'italic', 'underline'],
      ['size'], ['color'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['emoji'], ['image'], ['clean']
    ],
    getPopupContainer: () => document.body
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};

    if (nextProps.value !== prevState.lastValue) {
      newState['lastValue'] = newState['value'] = nextProps.value;
    }

    if (nextProps.loading !== prevState.loading) {
      newState['loading'] = nextProps.loading;
    }

    return newState;
  }

  constructor(props) {
    super(props);

    let { value, customLink, supportFontTag, pastePlainText, customInsertVideo } = this.props;

    // 粘贴时将富文本转为纯文本
    if (pastePlainText) {
      Quill.register('modules/clipboard', PlainClipboard, true);
    }

    // this.urlValidator = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,63}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/i;
    this.onBlurHandler = null;
    let formatValue = value;
    if (supportFontTag) {
      formatValue = this.formatFontTag(value);
    }

    if (customInsertVideo && (typeof customInsertVideo === "function")) {
      this.isSupportCustomInsertVideo = true;
    }

    this.state = {
      lastValue: value,
      value: formatValue || '',
      loading: false,
      showLinkModal: false,
      showVideoModal: false,
      showImageModal: false,
      toolbarCtner: null,
      curVideoType: "video_link"
    };
    this.handlers = {
      myLink: (value) => {
        let { onClickToolbarBtn } = this.props;
        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('link') === false) {
          return;
        }

        let quill = this.getEditor(),
          range = quill.getSelection();

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
        let { onClickToolbarBtn } = this.props;
        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('video') === false) {
          return;
        }

        let quill = this.getEditor();
        this.setState({
          value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
          showVideoModal: true
        });
      },
      emoji: (value) => {
        let quill = this.getEditor(),
          range = quill.getSelection(),
          mValue = JSON.parse(value);

        quill.insertEmbed(range.index, 'emoji', {
          type: mValue.type,
          alt: mValue.alt,
          src: mValue.src,
          width: mValue.width,
          height: mValue.height,
          id: mValue.id
        });
        quill.setSelection(range.index + 1);
      },
      // customColor: (color) => {
      //   let quill = this.getEditor(),
      //     range = quill.getSelection();

      //   if (range.length !== 0) {
      //     quill.format('color', color);
      //   }
      // },
      image: () => {
        let { onClickToolbarBtn } = this.props;
        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('image') === false) {
          return;
        }

        let quill = this.getEditor();
        this.setState({
          value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
          showImageModal: true,
          curRange: quill.getSelection()
        });
      },
      clean: () => {
        const { parchment: Parchment } = Quill.imports;

        let quill = this.getEditor(),
          range = quill.getSelection();

        if (range == null) return;
        if (range.length == 0) {
          let formats = quill.getFormat();
          Object.keys(formats).forEach((name) => {
            // Clean functionality in existing apps only clean inline formats
            if (Parchment.query(name, Parchment.Scope.INLINE) != null) {
              quill.format(name, false);
            }
          });
        } else {
          quill.removeFormat(range, Quill.sources.USER);
        }
      },
      // 处理定制的插入值
      customInsertValue: (value) => {
        let quill = this.getEditor(),
          range = quill.getSelection(),
          mValue = JSON.parse(value);

        if (!range) return;

        if (mValue.editable === false) {
          quill.insertText(range.index, mValue.value, {
            customAttr: { editable: false }
          });
        } else {
          quill.insertText(range.index, mValue.value);
        }
      }
    };

    // 处理定制的超链接
    Object.keys(customLink).forEach((moduleName) => {
      this.handlers[`${moduleName}Entry`] = function() {
        let range = this.quill.getSelection();
        if (range.length !== 0) {
          this.quill.format('myLink', {
            type: `${moduleName}Entry`,
            url: customLink[moduleName].url
          });
        } else {
          message.error('没有选中文本');
        }
      };
    });
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      toolbarCtner: findDOMNode(this.toolbarRef)
    }, () => {
      if (!this.reactQuillRef) return;

      this.onBlurHandler = addEventListener(
        findDOMNode(this.reactQuillRef).querySelector('.ql-editor'),
        'blur',
        () => {
          if (!this.reactQuillRef) return;

          let editor = this.reactQuillRef.getEditor(),
            range = editor.getSelection();

          if (typeof this.props.onBlur == "function") {
            this.props.onBlur(range, 'user', editor);
          }
        }
      );
    });
    /* eslint-enable react/no-did-mount-set-state */
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* eslint-disable react/no-did-update-set-state */
    if ((prevState.lastValue != this.state.lastValue) && this.props.supportFontTag) {
      this.setState({
        value: this.formatFontTag(this.state.lastValue)
      });
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  componentWillUnmount() {
    if (this.onBlurHandler) {
      this.onBlurHandler.remove();
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

  handleLinkModalOk = () => {
    let el = this.linkModalInputRef.input,
        val = el.value;

    if (val) {
      if (val.length > 1000) {
        message.error('链接地址不得超过1000个字');
        return;
      }

      let quill = this.getEditor();
      quill.format('myLink', {
        // type: 'default',
        url: val
      });
      el.value = 'http://';

      this.setState({
        value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
        showLinkModal: false
      });
    } else {
      message.error('链接地址不得为空');
    }
  };

  handleLinkModalCancel = () => {
    if (this.linkModalInputRef) {
      this.linkModalInputRef.input.value = 'http://';
    }

    this.setState({
      showLinkModal: false
    });
  };

  handleVideoModalOk = () => {
    let val = null;

    if (this.videoModalInputRef) {
      val = this.videoModalInputRef.input.value;
    }

    if (val) {
      if (val.length > 1000) {
        message.error('视频链接不得超过1000个字');
        return;
      }

      if (val.indexOf('//') < 0) {
        message.error('视频链接URL格式错误');
        return;
      }

      let quill = this.getEditor(),
        range = quill.getSelection(true), // 获取选区前先聚焦
        { videoTagAttrs } = this.props;

      this.insertVideo(range.index, {
        ...videoTagAttrs,
        src: val
      });
  
      this.videoModalInputRef && (this.videoModalInputRef.input.value = '');

      this.setState({
        value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
        showVideoModal: false
      });
    } else {
      message.error('视频链接URL不得为空');
    }
  };

  handleVideoModalCancel = () => {
    if (this.videoModalInputRef) {
      this.videoModalInputRef.input.value = '';
    }

    this.setState({
      curVideoType: "video_link",
      showVideoModal: false
    });
  };

  handleImageModalCancel = () => {
    this.setState({
      showImageModal: false,
      curRange: null
    });
  };

  handlePickLocalImage = () => {
    let { customInsertImage } = this.props,
      { toolbarCtner } = this.state,
      quill = this.getEditor(),
      fileInput = toolbarCtner.querySelector('input.ql-image[type=file]');
    const getImageCb = (attrs) => {
      if (attrs.src == undefined) {
        message.error('请设置图片源地址');
        return;
      }

      let range = this.state.curRange ? this.state.curRange : quill.getSelection(true);
      if (attrs.width == undefined || attrs.height == undefined) {
        getImageSize(attrs.src, (naturalWidth, naturalHeight) => {
          attrs.width = naturalWidth;
          attrs.height = naturalHeight;

          quill.insertEmbed(range.index, 'myImage', attrs);
          quill.setSelection(range.index + 1, 'silent');

          this.setState({
            value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
            curRange: null
          });
        });
      } else {
        quill.insertEmbed(range.index, 'myImage', attrs);
        quill.setSelection(range.index + 1, 'silent');

        this.setState({
          value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
          curRange: null
        });
      }
    };

    this.setState({
      showImageModal: false
    });

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

  insertVideo = (rangeIndex, attrs) => {
    let quill = this.getEditor(),
      prevChar = quill.getText(rangeIndex - 1, 1),
      nextChar = quill.getText(rangeIndex + 1, 1);

    if ((rangeIndex > 0) && (prevChar != '\n')) {
      // 在一行的中间插入视频
      if (nextChar && (nextChar != '\n')) {
        quill.insertText(rangeIndex, '\n');  // 插入视频前换行，避免丢失文字
        quill.insertEmbed(rangeIndex + 1, 'myVideo', attrs);
        quill.setSelection(rangeIndex + 1, 'silent');
      } else {
        // 在一行的末尾插入视频
        quill.insertEmbed(rangeIndex + 1, 'myVideo', attrs);
        quill.insertText(rangeIndex + 2, '\n');  // 插入视频后换行，避免丢失光标
        quill.setSelection(rangeIndex + 2, 'silent');
      }
    } else {
      // 一行的开头插入视频
      quill.insertEmbed(rangeIndex, 'myVideo', attrs);
      quill.setSelection(rangeIndex + 1, 'silent');
    }
  };

  handlePickLocalVideo = () => {
    let { customInsertVideo, videoTagAttrs } = this.props,
      quill = this.getEditor(),
      range = quill.getSelection(true); // 获取选区前先聚焦

    const getVideoCb = (attrs) => {
      if (attrs.src == undefined) {
        message.error('请设置视频源地址');
        return;
      }

      this.insertVideo(range.index, {
        ...videoTagAttrs,
        ...attrs
      });

      this.setState({
        value: quill.getHTML(), // 使 RichEditor 与 Quill 同步
      });
    };

    this.setState({
      showVideoModal: false
    });

    if (customInsertVideo && (typeof customInsertVideo === "function")) {
      customInsertVideo(getVideoCb);
    }
  };

  handleInsertEmoji = (e) => {
    let { toolbarCtner } = this.state,
      target = e.target,
      clsList = target.classList.value;

    if (
      (clsList.indexOf('emoji-item') > -1 || clsList.indexOf('emoji-extend-item') > -1)
      && target.hasAttribute('value')
    ) {
      let el = toolbarCtner.querySelector('button.ql-emoji[data-role="emoji"]');
      if (el == null) {
        el = document.createElement('button');
        toolbarCtner.querySelector('.custom-emoji').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'emoji');
      el.setAttribute('value', target.value);
      el.classList.add('ql-emoji', 'hide');
      el.click();
    }
  };

  handleFormatBackground = (e) => {
    let { toolbarCtner } = this.state,
      target = e.target;

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
    let { toolbarCtner } = this.state,
      target = e.target;

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
    let { toolbarCtner } = this.state,
      target = e.target;

    if (target.classList.value.indexOf('size-item') > -1 && target.hasAttribute('value')) {
      let el = toolbarCtner.querySelector('button.ql-customAttr[data-role="customSize"]');
      if (el == null) {
        el = document.createElement('button');
        toolbarCtner.querySelector('.custom-size').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'customSize');
      el.setAttribute('value', target.value);
      el.classList.add('ql-customAttr', 'hide');
      el.click();
    }
  };

  handleInsertValue = (e) => {
    let { toolbarCtner } = this.state,
      target = e.target;

    if (target.classList.value.indexOf('insert-value-item') > -1 && target.hasAttribute('value')) {
      let el = toolbarCtner.querySelector('button.ql-customInsertValue[data-role="customInsertValue"]');
      if (el == null) {
        el = document.createElement('button');
        toolbarCtner.querySelector('.custom-insert-value').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'customInsertValue');
      el.setAttribute('value', target.value);
      el.classList.add('ql-customInsertValue', 'hide');
      el.click();
    }
  };

  handleChange = (value, delta, source, editor) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value, delta, source, editor);
    }
  };

  handleSelectionChange = (nextSelection, source, editor) => {
    // let { toolbarCtner } = this.state;
    // let quill = this.getEditor();

    // FixBug: 取消高亮区分。a标签添加自定义属性后接带自定义属性的img标签时，在MAC和安卓版的微信公众号中超链接会异常显示出HTML标签。
    // 区分默认的超链接和自定义超链接的高亮
    // if (nextSelection) {
    //   let curFormat;
		// 	if (nextSelection.index > 0 && quill.getText(nextSelection.index - 1, 1)!='\n') {
		// 		curFormat = quill.getFormat(nextSelection.index - 1, 1);
		// 	} else {
		// 		curFormat = quill.getFormat(nextSelection.index, 1);
		// 	}

    //   toolbarCtner.querySelector('.link-active')
    //   && toolbarCtner.querySelector('.link-active').classList.remove('link-active');


    //   if ('myLink' in curFormat) {
    //     let linkType = curFormat['myLink'].type || 'default';
    //     if (linkType == 'default') {
    //       toolbarCtner.querySelector('.ql-myLink')
    //       && toolbarCtner.querySelector('.ql-myLink').classList.add('link-active');
    //     } else {
    //       toolbarCtner.querySelector(`.ql-${linkType}`)
    //       && toolbarCtner.querySelector(`.ql-${linkType}`).classList.add('link-active');
    //     }
		// 	}
    // }

    const { onSelectionChange } = this.props;
    onSelectionChange && onSelectionChange(nextSelection, source, editor);
  };

  handleVideoTypeChange = (e) => {
    this.setState({
      curVideoType: e.target.value || "video_link"
    });
  };

  render() {
    const {
      loading,
      value,
      showLinkModal,
      showVideoModal,
      showImageModal,
      toolbarCtner,
      curVideoType
    } = this.state;
    const {
      className, prefixCls,
      toolbar, placeholder,
      customLink,
      customInsertValue,
      resizable, style,
      getPopupContainer,
      customEmoji,
      insertImageTip,
      insertVideoTip,
      onChange,
      onSelectionChange,
      popoverPlacement,
      tooltipPlacement,
      ...restProps
    } = this.props;
    delete restProps.customInsertImage;
    const cls = classNames(`${prefixCls}`, {
      'resizable': resizable,
    }, className);

    if (value) {
      restProps.value = value;
    }

    // 上传本地视频时Modal无确认和取消按钮
    let videoFooter = {};
    if (curVideoType == "video_local") {
      videoFooter['footer'] = null;
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
          title="插入图片"
          className={`${prefixCls}-image-modal`}
          visible={showImageModal}
          footer={null}
          onCancel={this.handleImageModalCancel}
        >
          <Button type="primary" onClick={this.handlePickLocalImage}>选择本地图片</Button>
          <div className="tip">{insertImageTip}</div>
        </Modal>
        <Modal
          title="插入视频"
          className={`${prefixCls}-video-modal`}
          visible={showVideoModal}
          {...videoFooter}
          onOk={this.handleVideoModalOk}
          onCancel={this.handleVideoModalCancel}
        >
          <Radio.Group
            style={{marginBottom: 24}}
            onChange={this.handleVideoTypeChange}
            value={curVideoType}
          >
            <Radio value="video_link">视频链接</Radio>
            {this.isSupportCustomInsertVideo ? <Radio value="video_local">本地视频</Radio> : null}
          </Radio.Group>
          {
            curVideoType == "video_local" ? 
            <React.Fragment>
              <Button
                style={{display: 'block'}}
                type="primary"
                onClick={this.handlePickLocalVideo}
              >选择本地视频</Button>
              <div className="tip">{insertVideoTip}</div>
            </React.Fragment> : 
            <Input
              ref={el => this.videoModalInputRef = el}
              style={{ width: '434px' }}
              placeholder="请输入视频链接URL"
            />
          }
        </Modal>
        <CustomToolbar
          ref={el => this.toolbarRef = el}
          className={'editor-head'}
          toolbar={toolbar}
          customEmoji={customEmoji}
          customLink={customLink}
          customInsertValue={customInsertValue}
          handleInsertEmoji={this.handleInsertEmoji}
          handleFormatColor={this.handleFormatColor}
          handleFormatBackground={this.handleFormatBackground}
          handleFormatSize={this.handleFormatSize}
          handleInsertValue={this.handleInsertValue}
          popoverPlacement={popoverPlacement}
          tooltipPlacement={tooltipPlacement}
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
          onSelectionChange={this.handleSelectionChange}
        />
        {
          loading ? 
          <Spin style={{
            position: 'absolute',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.75)'
          }}/> : null
        }
      </div>
    );
  }
}
polyfill(RichEditor);
export { Quill };
export default RichEditor;
