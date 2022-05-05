import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import ReactQuill, { Quill } from "./quill/index";
import classNames from "classnames";
import { addEventListener } from "../../../utils";
import { polyfill } from "react-lifecycles-compat";
import Spin from "../../Spin/index";
import Radio from "../../Radio/index";
import Modal from "../../Modal/index";
import Input from "../../Input/index";
import Button from "../../Button/index";
import message from "../../message/index";
import CustomToolbar from "./toolbar";
import CustomSizeBlot from "./formats/size";
import EmojiBlot from "./formats/emoji";
import LinkBlot from "./formats/link";
import ImageBlot from "./formats/image";
import VideoBlot from "./formats/video";
import CustomClipboard from "./modules/customClipboard";
import ImageDrop from "./modules/imageDrop";
import FileDrop from "./modules/fileDrop";
import ImageResize from "./modules/imageResize";
import TableUI, { isTable } from "./modules/table";
import attachBlot from "./formats/attach";
import SearchedStringBlot from "./formats/SearchBlot";
import SearchedStringActiveBlot from "./formats/SearchActiveBlot";

import { RichEditorProps, RichEditorState } from './interface';
import ConfigConsumer from '../../Config/Consumer';
import { LocaleProperties } from '../../Locale';
import FindModal from "./findModal";

Quill.register(SearchedStringBlot);
Quill.register(SearchedStringActiveBlot);
Quill.register(EmojiBlot);
Quill.register(LinkBlot);
Quill.register(ImageBlot);
Quill.register(VideoBlot);
Quill.register(attachBlot);
Quill.register(CustomSizeBlot);
Quill.register('modules/imageDrop', ImageDrop, true);
Quill.register('modules/fileDrop', FileDrop, true);
Quill.register("modules/resize", ImageResize, true);
Quill.register(Quill.import('attributors/style/align'), true);
Quill.register(Quill.import('attributors/style/direction'), true);
Quill.register({'modules/tableUI': TableUI}, true);

const getImageSize = function (
  url: string,
  callback: (width: number | string, height: number | string) => void,
) {
  let newImage = document.createElement('img');
  newImage.onload = function (
    this: GlobalEventHandlers & { width?: number | string; height?: number | string },
  ) {
    callback(this.width, this.height);
  };
  newImage.src = url;
};

class Range {
  index: number;

  length: number;

  constructor(index: number, length = 0) {
    this.index = index;
    this.length = length;
  }
}

class RichEditor extends Component<RichEditorProps, RichEditorState> {
  reactQuillNode: Element | Text;

  defaultFontSize: string;

  defaultLinkPrefix: string;

  Locale: LocaleProperties['RichEditor'];

  defaultVideoType: string;

  isSupportCustomInsertVideo: boolean;

  prevSelectionFormat: any;

  handlers: {
    link: Function;
    video: Function;
    emoji: Function;
    fullscreen: Function,
    image: Function;
    attachment: Function;
    clean: Function;
    customInsertValue: Function
    findAndReplace: Function
    undo: Function
    redo: Function
    customTable: Function;
  };

  editorCtner: HTMLDivElement;

  linkModalInputRef: any;

  videoModalInputRef: any;

  toolbarRef: React.ReactInstance;

  reactQuillRef: ReactQuill;

  onClickRemoveHandler: any;

  onClickActionHandler: any;

  onBlurHandler: any;

  linkRange: any;

  static defaultProps = {
    customEmoji: [],
    customLink: {},
    customInsertValue: {},
    insertImageTip: true, // 为true时展示对应语言的默认值
    insertImageModalVisible: true,
    insertAttachmentModalVisible: true,
    insertVideoTip: true, // 为true时展示对应语言的默认值
    placeholder: '',
    prefixCls: 'fishd-richeditor',
    popoverPlacement: 'top',
    tooltipPlacement: 'bottom',
    loading: false,
    imageDrop: false,
    fileDrop: false,
    resizable: false,
    pastePlainText: false,
    imageResize: false,
    pasteFormater: null,
    toolbar: [
      ['link', 'bold', 'italic', 'underline'],
      ['size'],
      ['color'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['emoji'],
      ['image'],
      ['clean', 'formatPainter'],
    ],
    getPopupContainer: () => document.body,
  };

  historyConfig = {
      delay: 0, // 设置为 0, 每一个字符都会被记录
      maxStack: 100,
      userOnly: true
  }

  private imageSizeParams: any = {
      parchment: {
        image: {
          attribute: ['width', 'height'],
          limit: {
            ratio: true,
            minWidth: 50
          }
        }
      },
    }

  static getDerivedStateFromProps(nextProps: RichEditorProps, prevState: any) {
    let newState = {};

    if (nextProps.value !== prevState.lastValue) {
      newState['lastValue'] = newState['value'] = nextProps.value;
    }

    if (nextProps.loading !== prevState.loading) {
      newState['loading'] = nextProps.loading;
    }

    return newState;
  }

  constructor(props: RichEditorProps) {
    super(props);
    this.reactQuillNode = document.body;
    this.defaultFontSize = '14px';
    this.defaultLinkPrefix = 'https://';
    this.Locale = {};

    let { value, customLink, supportFontTag, pastePlainText,pasteFormater, customInsertVideo } = this.props;

    // 粘贴时的功能扩展
    if (pastePlainText || pasteFormater) {
      Quill.register('modules/clipboard', CustomClipboard, true);
    }
    this.onBlurHandler = null;
    let formatValue = value;
    if (supportFontTag) {
      formatValue = this.formatFontTag(value);
    }

    this.defaultVideoType = 'video_link';
    if (customInsertVideo && typeof customInsertVideo === 'function') {
      this.isSupportCustomInsertVideo = true;
      this.defaultVideoType = 'video_local';
    }

    // 格式刷保存的格式
    this.prevSelectionFormat = null;

    this.state = {
      lastValue: value,
      value: formatValue || '',
      loading: false,
      showLinkModal: false,
      showVideoModal: false,
      showImageModal: false,
      toolbarCtner: null,
      curRange: null,
      curVideoType: this.defaultVideoType,
      defaultInputLink: this.defaultLinkPrefix,
      linkModalTitle: "",
      formatPainterActive: false,
      insertTableDisabled: false,
      fullScreen: false,
      findVisible: false
    };
    this.handlers = {
      link: (value, fromAction) => {
        let { onClickToolbarBtn } = this.props;
        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('link') === false) {
          return;
        }

        let quill = this.getEditor(),
          range = quill.getSelection();

        if (range && range.length !== 0) {
          // 附件不能设置超链接
          let [link, offset] = quill.scroll.descendant(LinkBlot, range.index);
          if (link && link.domNode.dataset.qlLinkType == 'attachment') {
            return;
          }

          let newState = {
            value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
            showLinkModal: true,
            defaultInputLink: this.defaultLinkPrefix,
            curRange: range,
          };

          // 点击编辑链接触发
          if (fromAction) {
            newState['defaultInputLink'] = value;
            newState['linkModalTitle'] = this.Locale.editLink;
          } else {
            newState['linkModalTitle'] = this.Locale.insertLink;
          }

          this.setState(newState);
        } else {
          message.error(this.Locale.noSelectionText);
        }
      },
      video: value => {
        let { onClickToolbarBtn } = this.props;
        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('video') === false) {
          return;
        }

        let quill = this.getEditor();
        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          showVideoModal: true,
          curRange: quill.getSelection(), // 防止插入视频时光标定位错误
        });
      },
      fullscreen: value => {
        this.setState(prev => ({
          fullScreen: !prev.fullScreen
        }), () => {
          document.body.style.overflow = this.state.fullScreen ? 'hidden' : 'auto';
        });
      },
      emoji: value => {
        let quill = this.getEditor(),
          range = quill.getSelection(),
          mValue = JSON.parse(value);

        quill.insertEmbed(range.index, 'emoji', {
          type: mValue.type,
          alt: mValue.alt,
          src: mValue.src && mValue.src.trim(),
          width: mValue.width,
          height: mValue.height,
          id: mValue.id,
        });
        quill.setSelection(range.index + 1);
      },
      image: () => {
        let { onClickToolbarBtn, insertImageModalVisible } = this.props;
        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('image') === false) {
          return;
        }

        let showImageModal = true;
        if (!insertImageModalVisible) {
          showImageModal = false;
          this.handlePickLocalImage();
        }

        let quill = this.getEditor();
        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          showImageModal,
          curRange: quill.getSelection(),
        });
      },
      attachment: () => {
        let { onClickToolbarBtn, insertAttachmentModalVisible } = this.props;
        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('attachment') === false) {
          return;
        }

        let showAttachmentModal = true;
        if (!insertAttachmentModalVisible) {
          showAttachmentModal = false;
          this.handlePickLocalFile();
        }

        let quill = this.getEditor();
        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          showAttachmentModal,
          curRange: quill.getSelection(),
        });
      },
      clean: () => {
        const { parchment: Parchment } = Quill.imports;

        let quill = this.getEditor(),
          range = quill.getSelection();
        if (range == null) return;
        // 只在有选中的时候 clean, 原方案removeFormat 会清除图片,自定义格式, 或者清除失败的情况
        if (range.length !== 0) {
          let formatArr = ['strike','bold','link','color','background','underline','font','size','direction',
            'customAttr'];
          const {index, length} = range;
          quill.format( 'blockquote', false);
          quill.format( 'code-block', false); // 全选时,或者选中再加一个空白行 可能会失败
          quill.format( 'indent', false);
          quill.format( 'italic', false);
          quill.format( 'script', false);
          quill.format( 'align', false);
          quill.format( 'list', false);
          quill.format( 'orderedList', false);
          formatArr.forEach(type => {
            quill.formatText(index, length, type, false);
          });

          // 兼容 code-block 全选, 半全选 格式化失败的问题
          let start = index;
          quill.getContents(index, length).forEach((delta, line, all) => {
            let lineLength = (delta.insert && delta.insert.length) || 0;

            const attributes = delta.attributes;
            if (attributes) {
              // 遗漏点: 如果先选择背景色和字体颜色, 在方法, 清除格式的时候, 只有这里判断
              if (attributes['code-block'] || attributes['customAttr']) {
                quill.removeFormat(start, lineLength);
              }
            }

            start += lineLength;
          });
        }
      },
      undo: () => {
        let quill = this.getEditor();
        quill && quill.history.undo();
      },
      redo: ()=>{
        let quill = this.getEditor();
        quill && quill.history.redo();
      },
      // 处理定制的插入值
      customInsertValue: value => {
        let quill = this.getEditor(),
          range = quill.getSelection(),
          mValue = JSON.parse(value);

        if (!range) return;

        if (mValue.editable === false) {
          quill.insertText(range.index, mValue.value, {
            customAttr: { editable: false },
          });
        } else {
          quill.insertText(range.index, mValue.value);
        }
      },
      findAndReplace: val=>{
        this.setState(prev => ({
          findVisible: !prev.findVisible
        }));
      },
      customTable: value => {
        let { onClickToolbarBtn } = this.props;
        if (
          typeof onClickToolbarBtn == "function" &&
          onClickToolbarBtn("table") === false
        ) {
          return;
        }

        const quill = this.getEditor();
        if (!quill) return;

        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          curRange: quill.getSelection() // 保存range，用于判断插入表格时光标是否在表格内
        });
      },
    };

    // 处理定制的超链接
    Object.keys(customLink).forEach(moduleName => {
      const that = this;
      this.handlers[`${moduleName}Entry`] = function () {
        let range = this.quill.getSelection(),
          url = customLink[moduleName].url;
        if (range.length !== 0) {
          // 附件不能设置超链接
          let [link, offset] = this.quill.scroll.descendant(LinkBlot, range.index);
          if (link && link.domNode.dataset.qlLinkType == 'attachment') {
            return;
          }

          if (url) {
            // 异步获取URL
            if (Object.prototype.toString.call(url) == '[object Function]') {
              let format = this.quill.getFormat(),
                prevValue = format && format.link && format.link.url;

              url(value => {
                this.quill.format('link', {
                  type: `${moduleName}Entry`,
                  url: value,
                });
              }, prevValue);
            } else {
              this.quill.format('link', {
                type: `${moduleName}Entry`,
                url,
              });
            }
          }
        } else {
          message.error(that.Locale.noSelectionText);
        }
      };
    });
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState(
      {
        toolbarCtner: findDOMNode(this.toolbarRef),
      },
      () => {
        if (!this.reactQuillRef) return;
        this.reactQuillNode = findDOMNode(this.reactQuillRef) as Element;

        this.onBlurHandler = addEventListener(
          this.reactQuillNode.querySelector('.ql-editor'),
          'blur',
          () => {
            if (!this.reactQuillRef) return;

            let quill = this.reactQuillRef.getEditor(),
              range = quill.getSelection();

            if (typeof this.props.onBlur == 'function') {
              this.props.onBlur(range, 'user', quill);
            }
          },
        );

        // 编辑超链接
        this.onClickActionHandler = addEventListener(
          this.reactQuillNode.querySelector('a.ql-action'),
          'click',
          event => {
            if (!this.reactQuillRef) return;

            let quill = this.reactQuillRef.getEditor();
            if (!quill) return;

            let tooltip = quill.theme && quill.theme.tooltip;
            if (tooltip && this.linkRange != null) {
              tooltip.linkRange = this.linkRange;
              quill.setSelection(this.linkRange);
              this.handlers.link(tooltip.preview.getAttribute('href'), true);
            }

            event.preventDefault();
          },
        );

        // 删除超链接
        this.onClickRemoveHandler = addEventListener(
          this.reactQuillNode.querySelector('a.ql-remove'),
          'click',
          event => {
            if (!this.reactQuillRef) return;

            let quill = this.reactQuillRef.getEditor();
            if (!quill) return;

            let tooltip = quill.theme && quill.theme.tooltip;
            if (tooltip && this.linkRange != null) {
              tooltip.linkRange = this.linkRange;
              quill.formatText(tooltip.linkRange, 'link', false, 'user');
              quill.focus();
              delete tooltip.linkRange;
              this.linkRange = null;
            }

            event.preventDefault();
          },
        );
      },
    );
    this.changePseudoElementText();
    setTimeout(() => {
      this.changeEditorPlaceholder();
    }, 10);
    /* eslint-enable react/no-did-mount-set-state */
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* eslint-disable react/no-did-update-set-state */
    if (prevState.lastValue != this.state.lastValue && this.props.supportFontTag) {
      this.setState({
        value: this.formatFontTag(this.state.lastValue),
      });
    }
    this.changePseudoElementText();
    this.changeEditorPlaceholder();
    /* eslint-enable react/no-did-update-set-state */
  }

  componentWillUnmount() {
    this.onBlurHandler && this.onBlurHandler.remove();
    this.onClickActionHandler && this.onClickActionHandler.remove();
    this.onClickRemoveHandler && this.onClickRemoveHandler.remove();
  }

  formatFontTag = value => {
    if (!value) return value;

    let fontTagStart = /(<\s*?)font(\s+)(.*?)(>)/gi,
      fontTagEnd = /(<\s*?\/\s*?)font(\s*?>)/gi;

    value = value.replace(fontTagStart, ($0, $1, $2, $3, $4) => {
      let tagStyle = ' style="',
        tagAttr = ' ';

      $3.replace(/(\w+-?\w+)\s*=\s*["']\s*(.*?)\s*["']/gi, ($0, $1, $2) => {
        let key = $1,
          value = $2;

        switch (key) {
          case 'color': {
            tagStyle += 'color:' + value + ';';
            break;
          }
          case 'size': {
            // font标签size属性的value是数字类型，取值范围是[1,7]。
            let size2pxMap = {
                '1': '12px',
                '2': '13px',
                '3': '16px',
                '4': '18px',
                '5': '24px',
                '6': '32px',
                '7': '48px',
              },
              sizeWithUnit = this.defaultFontSize,
              val = value && value.trim();

            // value非数字或不在[1,7]范围内时，取默认字体大小
            if (!/^\d+$/.test(val) || parseInt(val) > 7 || parseInt(val) < 1) {
              sizeWithUnit = this.defaultFontSize;
            } else {
              sizeWithUnit = size2pxMap[val] || this.defaultFontSize;
            }

            tagStyle += 'font-size:' + sizeWithUnit + ';';
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

  getEditor = (): ReactQuill | undefined => {
    if (!this.reactQuillRef) return;
    return this.reactQuillRef.getEditor() as ReactQuill;
  };

  _closeFindModal = () => {
    this.setState({
      findVisible: false
    });
  }

  // 提供给外部的关闭操作
  closeFindModal = () => {
    return new Promise(resolve=>{
      this.setState({
        findVisible: false
      }, () => resolve(''));
    });
  }

  handleLinkModalOk = () => {
    let el = this.linkModalInputRef.input,
      val = el.value.trim();

    if (val) {
      if (val.length > 1000) {
        message.error(this.Locale.linkToolongError);
        return;
      }

      let quill = this.getEditor();
      quill.formatText(
        this.state.curRange,
        'link',
        {
          // type: 'default',
          url: val,
        },
        'user',
      );
      quill.setSelection(this.state.curRange); // 设置超链接后恢复选区

      this.setState({
        value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
        showLinkModal: false,
        defaultInputLink: this.defaultLinkPrefix,
      });
    } else {
      message.error(this.Locale.linkEmptyTip);
    }
  };

  handleLinkModalCancel = () => {
    this.setState({
      showLinkModal: false,
      defaultInputLink: this.defaultLinkPrefix,
    });
  };

  handleVideoModalOk = () => {
    let val = null;

    if (this.videoModalInputRef) {
      val = this.videoModalInputRef.input.value.trim();
    }

    if (val) {
      if (val.length > 1000) {
        message.error(this.Locale.videoLinkTooLongError);
        return;
      }

      if (val.indexOf('//') < 0) {
        message.error(this.Locale.videoUrlFormattingError);
        return;
      }

      let quill = this.getEditor(),
        range = this.state.curRange ? this.state.curRange : quill.getSelection(true), // 获取选区前先聚焦
        { videoTagAttrs } = this.props;

      this.insertVideo(range.index, {
        ...videoTagAttrs,
        src: val,
      });

      this.videoModalInputRef && (this.videoModalInputRef.input.value = '');

      this.setState({
        value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
        showVideoModal: false,
        curRange: null,
      });
    } else {
      message.error(this.Locale.noVideoUrlErrorTip);
    }
  };

  handleVideoModalCancel = () => {
    if (this.videoModalInputRef) {
      this.videoModalInputRef.input.value = '';
    }

    this.setState({
      curVideoType: this.defaultVideoType,
      showVideoModal: false,
      curRange: null,
    });
  };

  handleImageModalCancel = () => {
    this.setState({
      showImageModal: false,
      curRange: null,
    });
  };

  handleAttachmentModalCancel = () => {
    this.setState({
      showAttachmentModal: false,
      curRange: null,
    });
  };

  // 图片选择回调
  handlePickLocalImage = () => {
    let { customInsertImage } = this.props,
      { toolbarCtner } = this.state,
      quill = this.getEditor(),
      fileInput = toolbarCtner.querySelector('input.ql-image[type=file]');

    const handleInsertImage = info => {
      if (info.src == undefined) {
        message.error(this.Locale.noPicSrcTip);
        return;
      }

      info.src = info.src && info.src.trim();

      let range = this.state.curRange ? this.state.curRange : quill.getSelection(true);
      if (info.width == undefined || info.height == undefined) {
        getImageSize(info.src, (naturalWidth, naturalHeight) => {
          info.width = naturalWidth;
          info.height = naturalHeight;

          quill.insertEmbed(range.index, "image", info);
          quill.setSelection(range.index + 1, "silent");

          this.setState({
            value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
            curRange: null,
          });
        });
      } else {
        quill.insertEmbed(range.index, "image", info);
        quill.setSelection(range.index + 1, "silent");

        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          curRange: null,
        });
      }
    };

    const getImageCb = imgList => {
      if (Array.isArray(imgList)) {
        imgList.forEach(imgInfo => {
          handleInsertImage(imgInfo);
        });
      } else {
        handleInsertImage(imgList);
      }
    };

    this.setState({
      showImageModal: false
    }, ()=>{
      if(this.state.fullScreen){
        document.body.style.overflow = 'hidden';
      }
    });

    if (customInsertImage && typeof customInsertImage === 'function') {
      customInsertImage(getImageCb);
    } else {
      if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/jpg, image/jpeg, image/png, image/gif, image/bmp');
        fileInput.setAttribute('multiple', 'multiple');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', () => {
          if (fileInput.files != null && fileInput.files.length) {
            for (let i = 0, len = fileInput.files.length; i < len; i++) {
              let reader = new FileReader();
              reader.onload = e => {
                getImageCb({ src: e.target.result });
                fileInput.value = '';
              };
              reader.readAsDataURL(fileInput.files[i]);
            }
          }
        });
        toolbarCtner.appendChild(fileInput);
      }
      fileInput.click();
    }
  };

  handlePickLocalFile = () => {
    let { customInsertAttachment , attachmentIconMap = {} } = this.props,
      quill = this.getEditor();

    const handleInsertFile = (file, rangeIndex) => {
      if (!file || !file.url || !file.name) {
        message.error(this.Locale.noFileInfoTip);
        return;
      }
      let  nextChar = quill.getText(rangeIndex + 1, 1);

      const attrs = {
        url: file.url && file.url.trim(),
        name: file.name,
        iconUrl: attachmentIconMap[file.type] || attachmentIconMap['default']
          || "//res.qiyukf.net/operation/2edfafe507a11ad70724973bb505addd"
      };

      // 插入附件
      // 在一行的中间插入
      if (nextChar && nextChar != "\n") {
        quill.insertText(rangeIndex, "\n"); // 插入前换行，避免丢失文字
        quill.insertEmbed(rangeIndex + 1, "attach", attrs);
        quill.setSelection(rangeIndex + 1, "silent");
      } else {
        // 在一行的末尾插入
        quill.insertEmbed(rangeIndex + 1, "attach", attrs);
        quill.insertText(rangeIndex + 2, "\n"); // 插入后换行，避免丢失光标
        quill.setSelection(rangeIndex + 2, "silent");
      }
    };

    const getFileCb = fileList => {
      let range = this.state.curRange
        ? this.state.curRange
        : quill.getSelection(true);
      if (Array.isArray(fileList)) {
        fileList
          .sort((a, b) => {
            // 单次插入多个不同类型的文件时，按”视频 -> 图片 -> 其他文件“的顺序排列
            let order = ['other', 'image', 'video'];
            return order.indexOf(b.type) - order.indexOf(a.type);
          })
          .forEach((file, index) => {
            handleInsertFile(file, range.index );
            this.setState({
              value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
              curRange: null,
            });
          });
      } else {
        handleInsertFile(fileList, range.index);
        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          curRange: null,
        });
      }
    };

    this.setState({
      showAttachmentModal: false,
    });

    if (customInsertAttachment && typeof customInsertAttachment === 'function') {
      customInsertAttachment(getFileCb);
    }
  };

  insertVideo = (rangeIndex, attrs) => {
    let quill = this.getEditor(),
      prevChar = quill.getText(rangeIndex - 1, 1),
      nextChar = quill.getText(rangeIndex + 1, 1),
      videoNode = document.createElement('video');

    videoNode.onerror = () => {
      message.error(this.Locale.VideoCantPlayTip);
    };
    videoNode.src = attrs.src && attrs.src.trim();
    videoNode = null;

    if (rangeIndex > 0 && prevChar != '\n') {
      // 在一行的中间插入视频
      if (nextChar && nextChar != '\n') {
        quill.insertText(rangeIndex, '\n'); // 插入视频前换行，避免丢失文字
        quill.insertEmbed(rangeIndex + 1, 'myVideo', attrs);
        quill.setSelection(rangeIndex + 1, 'silent');
      } else {
        // 在一行的末尾插入视频
        quill.insertEmbed(rangeIndex + 1, 'myVideo', attrs);
        quill.insertText(rangeIndex + 2, '\n'); // 插入视频后换行，避免丢失光标
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
      quill = this.getEditor(); // 获取选区前先聚焦

    const handleVideoInsert = info => {
      if (info.src == undefined) {
        message.error(this.Locale.noVideoLinkErrorTip);
        return;
      }

      info.src = info.src && info.src.trim();

      let range = this.state.curRange ? this.state.curRange : quill.getSelection(true);
      this.insertVideo(range.index, {
        ...videoTagAttrs,
        ...info,
      });
    };

    const getVideoCb = videoList => {
      if (Array.isArray(videoList)) {
        videoList.forEach(videoInfo => {
          handleVideoInsert(videoInfo);
        });
      } else {
        handleVideoInsert(videoList);
      }

      this.setState({
        value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
        curRange: null,
      });
    };

    this.setState({
      showVideoModal: false,
    });

    if (customInsertVideo && typeof customInsertVideo === 'function') {
      customInsertVideo(getVideoCb);
    }
  };

  handleInsertEmoji = e => {
    let { toolbarCtner } = this.state,
      target = e.target,
      clsList = target.classList.value;

    if (
      (clsList.indexOf('emoji-item') > -1 || clsList.indexOf('emoji-extend-item') > -1) &&
      target.hasAttribute('value')
    ) {
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

  handleFormatBackground = e => {
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
      el.setAttribute('value', target.getAttribute('value'));
      el.classList.add('ql-background', 'hide');
      el.click();
    }
  };

  handleFormatColor = e => {
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
      el.setAttribute('value', target.getAttribute('value'));
      el.classList.add('ql-color', 'hide');
      el.click();
    }
  };

  handleFormatSize = value => {
    let quill = this.getEditor();
    quill &&
      quill.format('customAttr', {
        fontSize: value,
      });
  };

  handleInsertTable = (row: number, col: number) => {
    let quill = this.getEditor();
    if (quill) {
      quill.focus();
      const table = quill.getModule('table');
      table.insertTable(row, col);
    }
  };

  handleFormatLineHeight = value => {
    let quill = this.getEditor();
    quill && quill.format("customAttr", {
      lineHeight: value
    });
  };

  handleInsertValue = e => {
    let { toolbarCtner } = this.state,
      target = e.target;

    if (target.classList.value.indexOf('insert-value-item') > -1 && target.hasAttribute('value')) {
      let el = toolbarCtner.querySelector(
        'button.ql-customInsertValue[data-role="customInsertValue"]',
      );
      if (el == null) {
        el = document.createElement('button');
        toolbarCtner.querySelector('.custom-insert-value').appendChild(el);
      }

      el.setAttribute('type', 'button');
      el.setAttribute('data-role', 'customInsertValue');
      el.setAttribute('value', target.getAttribute('value'));
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

  handleShowTooltip = root => {
    if (!root) return;
    root.classList.remove('ql-editing');
    root.classList.remove('ql-hidden');
    root.classList.remove('custom-hide');
    root.classList.add('custom-show');
  };

  handleHideTooltip = root => {
    if (!root) return;
    root.classList.remove('custom-show');
    root.classList.add('ql-hidden');
    root.classList.add('custom-hide');
  };

  handleTooltipPosition(tooltip, reference) {
    let left = reference.left + reference.width / 2 - tooltip.root.offsetWidth / 2;
    // root.scrollTop should be 0 if scrollContainer !== root
    let top = reference.bottom + tooltip.quill.root.scrollTop;
    tooltip.root.style.left = left + 'px';
    tooltip.root.style.top = top + 'px';
    tooltip.root.classList.remove('ql-flip');
    let containerBounds = tooltip.boundsContainer.getBoundingClientRect();
    let rootBounds = tooltip.root.getBoundingClientRect();
    let shift = 0,
      offset = 15;
    if (rootBounds.right > containerBounds.right) {
      shift = containerBounds.right - rootBounds.right;
      tooltip.root.style.left = left + shift - offset + 'px';
    }
    if (rootBounds.left < containerBounds.left) {
      shift = containerBounds.left - rootBounds.left;
      tooltip.root.style.left = left + shift + offset + 'px';
    }
    if (rootBounds.bottom > containerBounds.bottom) {
      let height = rootBounds.bottom - rootBounds.top;
      let verticalShift = reference.bottom - reference.top + height;
      tooltip.root.style.top = top - verticalShift + 'px';
      tooltip.root.classList.add('ql-flip');
    }
    return shift;
  }

  handleSelectionChange = (nextSelection, source, editor) => {
    const { onSelectionChange } = this.props;
    onSelectionChange && onSelectionChange(nextSelection, source, editor);

    let quill = this.getEditor();
    if (!quill) return;

    // 处理插入表格按钮的禁用状态，禁止嵌套插入表格
    if (isTable(quill, quill.getSelection() || this.state.curRange)) {
      this.setState({
        insertTableDisabled: true
      });
    } else {
      this.setState({
        insertTableDisabled: false
      });
    }

    // 格式刷
    if (this.prevSelectionFormat && nextSelection) {
      // 清除当前选区的格式
      quill.removeFormat(nextSelection.index, nextSelection.length);

      // 设置当前选区的格式
      Object.keys(this.prevSelectionFormat).forEach(name => {
        quill.format(name, this.prevSelectionFormat[name]);
      });

      // 取消格式刷高亮
      this.setState({
        formatPainterActive: false,
      });

      // 重置保存的格式
      this.prevSelectionFormat = null;
    }

    let tooltip = quill.theme && quill.theme.tooltip;
    if (!tooltip) return;

    // 光标定位到超链接上时展示tooltip
    if (nextSelection && nextSelection.length === 0 && source === 'user') {
      let [link, offset] = quill.scroll.descendant(LinkBlot, nextSelection.index);
      if (link != null) {
        // 附件的超链接不可编辑
        if (link.domNode.dataset.qlLinkType == 'attachment') {
          return;
        }

        tooltip.linkRange = new Range(nextSelection.index - offset, link.length());
        this.linkRange = tooltip.linkRange; // 保存到当前实例，在编辑/删除超链接的事件回调中使用
        let preview = LinkBlot.formats(link.domNode).url;
        tooltip.preview.textContent = preview;
        tooltip.preview.setAttribute('href', preview);
        // 需要在显示后设置位置
        this.handleShowTooltip(tooltip.root);
        this.handleTooltipPosition(tooltip, quill.getBounds(tooltip.linkRange));
        return;
      }
    }
    this.handleHideTooltip(tooltip.root);
  };

  handleVideoTypeChange = e => {
    this.setState({
      curVideoType: e.target.value || this.defaultVideoType,
    });
  };

  getCurrentLineHeight = ()=>{
    let quill = this.getEditor();
    if (!quill) return null;
    let formats = quill.getFormat();

    if(formats && formats.customAttr && formats.customAttr.lineHeight){
      return formats.customAttr.lineHeight;
    }

    return null;
  }

  getCurrentSize = () => {
    let quill = this.getEditor();
    if (!quill) return null;

    let formats = quill.getFormat(),
      customAttr = formats && formats.customAttr,
      customAttrType = Object.prototype.toString.call(customAttr);

    if (!customAttr) return this.defaultFontSize;

    if (customAttrType == '[object Object]') {
      return customAttr.fontSize || this.defaultFontSize;
    }

    if (customAttrType == '[object Array]') {
      let len = customAttr.length;
      if (len) {
        let fontSize = customAttr[0].fontSize,
          hasMultiFontSize = false;

        for (let i = 0; i < len; i++) {
          // 选中的富文本有多种字体大小时不高亮字号
          if (customAttr[i].fontSize != fontSize) {
            hasMultiFontSize = true;
            break;
          }
        }

        if (hasMultiFontSize) {
          return null;
        } else {
          return fontSize;
        }
      } else {
        return this.defaultFontSize;
      }
    }

    return null;
  };

  handleSaveSelectionFormat = () => {
    let quill = this.getEditor();
    if (!quill) return null;

    this.prevSelectionFormat = quill.getFormat();

    // 格式刷高亮
    this.setState({
      formatPainterActive: true,
    });
  };

  handleUnsaveSelectionFormat = () => {
    if (this.prevSelectionFormat) {
      this.prevSelectionFormat = null;
    }

    // 取消格式刷高亮
    this.setState({
      formatPainterActive: false,
    });
  };

  // 变更伪类的content
  changePseudoElementText = () => {
    const { accessLink, edit, deleteText } = this.Locale;
    const editorCtner = this.editorCtner;
    const elEdit = editorCtner.querySelector('.ql-snow .ql-tooltip a.ql-action');
    const elDelete = editorCtner.querySelector('.ql-snow .ql-tooltip a.ql-remove');
    const elAccessLink = editorCtner.querySelector('.ql-snow .ql-tooltip');

    elEdit && elEdit.setAttribute('data-after-content', edit);
    elDelete && elDelete.setAttribute('data-before-content', deleteText);
    elAccessLink && elAccessLink.setAttribute('data-before-content', accessLink);
  };

  // 变更编辑器placeholder
  changeEditorPlaceholder = () => {
    const root = this.getEditor()?.root;
    root &&
      root.setAttribute('data-placeholder', this.props.placeholder || this.Locale.placeholder);
  };

  render() {
    const {
      loading,
      value,
      showLinkModal,
      showVideoModal,
      showImageModal,
      showAttachmentModal,
      toolbarCtner,
      curVideoType,
      defaultInputLink,
      linkModalTitle,
      fullScreen,
      findVisible
    } = this.state;
    const {
      className,
      prefixCls,
      toolbar,
      placeholder,
      customLink,
      customInsertValue,
      resizable,
      style,
      getPopupContainer,
      customEmoji,
      insertImageTip,
      insertAttachmentTip,
      insertVideoTip,
      insertLinkTip,
      onChange,
      onSelectionChange,
      popoverPlacement,
      tooltipPlacement,
      imageDrop,
      fileDrop,
      customDropImage,
      customDropFile,
      pastePlainText,
      pasteFormater,
      imageResize,
      attachmentIconMap,
      historyConfig,
      ...restProps
    } = this.props;
    delete restProps.customInsertImage;
    const cls = classNames(
      `${prefixCls}`,
      {
        fullScreen,
        resizable: resizable,
      },
      className,
    );
    if (value) {
      restProps.value = value;
    }

    // 上传本地视频时Modal无确认和取消按钮
    let videoFooter = {};
    if (curVideoType == 'video_local') {
      videoFooter['footer'] = null;
    }

    let moduleOpts = {
      toolbar: {
        container: toolbarCtner,
        handlers: this.handlers
      },
      history: historyConfig || this.historyConfig,
      table: true,
      tableUI: {
        Locale: this.Locale
      },
    };

    // fileDrop 为 true 时，使 imageDrop 失效
    if (fileDrop && customDropFile) {
      // customDropFile 自定义文件上传逻辑，必选
      moduleOpts["fileDrop"] = {
        customDropFile,
        attachmentIconMap
      };
    } else if (imageDrop) {
      // customDropImage 不存在时，将图片文件转为 dataUrl 格式
      moduleOpts['imageDrop'] = {
        customDropImage,
      };
    }

    if(imageResize){
      moduleOpts["resize"] = this.imageSizeParams;
    }

    if (pastePlainText || pasteFormater) {
      const clipboardOpt = {};

      if (pastePlainText) {
        clipboardOpt['pastePlainText'] = true;
      }

      if (pasteFormater) {
        clipboardOpt['pasteFormater'] = pasteFormater;
      }

      moduleOpts["clipboard"] = clipboardOpt;
    }

    return (
      <ConfigConsumer componentName="RichEditor">
        {(Locale: LocaleProperties['RichEditor']) => {
          this.Locale = Locale;
          return (
            <div className={cls} style={style} ref={el => (this.editorCtner = el)}>
              <Modal
                title={linkModalTitle || this.Locale.linkModalTitle}
                className={`${prefixCls}-link-modal`}
                visible={showLinkModal}
                onOk={this.handleLinkModalOk}
                onCancel={this.handleLinkModalCancel}
                destroyOnClose
              >
                <span className="text">{Locale.HyperlinkAddress}</span>
                <Input
                  ref={el => (this.linkModalInputRef = el)}
                  style={{ width: '420px' }}
                  defaultValue={defaultInputLink}
                />
                {insertLinkTip ? <div className="tip">{insertLinkTip}</div> : null}
              </Modal>
              <Modal
                title={Locale.insertPicture}
                className={`${prefixCls}-image-modal`}
                visible={showImageModal}
                footer={null}
                onCancel={this.handleImageModalCancel}
              >
                <Button type="primary" onClick={this.handlePickLocalImage}>
                  {Locale.selectLocalImage}
                </Button>
                {insertImageTip ? (
                  <div className="tip">
                    {insertImageTip === true ? Locale.insertImageTip : insertImageTip}
                  </div>
                ) : null}
              </Modal>
              <Modal
                title={Locale.insertAttachment}
                className={`${prefixCls}-image-modal`}
                visible={showAttachmentModal}
                footer={null}
                onCancel={this.handleAttachmentModalCancel}
              >
                <Button type="primary" onClick={this.handlePickLocalFile}>
                  {Locale.selectLocalFile}
                </Button>
                {insertAttachmentTip ? <div className="tip">{insertAttachmentTip}</div> : null}
              </Modal>
              <Modal
                title={Locale.insertVideo}
                className={`${prefixCls}-video-modal`}
                visible={showVideoModal}
                {...videoFooter}
                onOk={this.handleVideoModalOk}
                onCancel={this.handleVideoModalCancel}
              >
                <Radio.Group
                  style={{ marginBottom: 24 }}
                  onChange={this.handleVideoTypeChange}
                  value={curVideoType}
                >
                  {this.isSupportCustomInsertVideo ? (
                    <Radio value="video_local">{Locale.localVideo}</Radio>
                  ) : null}
                  <Radio value="video_link">{Locale.videoLink}</Radio>
                </Radio.Group>
                {curVideoType == 'video_local' ? (
                  <React.Fragment>
                    <Button
                      style={{ display: 'block' }}
                      type="primary"
                      onClick={this.handlePickLocalVideo}
                    >
                      {Locale.selectLocalVideo}
                    </Button>
                    {insertVideoTip ? (
                      <div className="tip">
                        {insertVideoTip === true ? (
                          <React.Fragment>
                            <span>{Locale.rule1}</span>
                            <br />
                            <span>{Locale.rule2}</span>
                          </React.Fragment>
                        ) : (
                          insertVideoTip
                        )}
                      </div>
                    ) : null}
                  </React.Fragment>
                ) : (
                  <Input
                    ref={el => (this.videoModalInputRef = el)}
                    style={{ width: '434px' }}
                    placeholder={Locale.PleaseEnterTheVideolinkURL}
                  />
                )}
              </Modal>
              <CustomToolbar
                ref={el => (this.toolbarRef = el)}
                className={'editor-head'}
                toolbar={toolbar}
                customEmoji={customEmoji}
                customLink={customLink}
                customInsertValue={customInsertValue}
                handleInsertEmoji={this.handleInsertEmoji}
                handleFormatColor={this.handleFormatColor}
                handleFormatBackground={this.handleFormatBackground}
                handleFormatSize={this.handleFormatSize}
                handleInsertTable={this.handleInsertTable}
                  handleFormatLineHeight={this.handleFormatLineHeight}handleInsertValue={this.handleInsertValue}
                popoverPlacement={popoverPlacement}
                tooltipPlacement={tooltipPlacement}
                getPopupContainer={getPopupContainer}
                getCurrentSize={this.getCurrentSize}
                getCurrentLineHeight={this.getCurrentLineHeight}formatPainterActive={this.state.formatPainterActive}
                insertTableDisabled={this.state.insertTableDisabled}saveSelectionFormat={this.handleSaveSelectionFormat}
                unsaveSelectionFormat={this.handleUnsaveSelectionFormat}
              fullScreen={fullScreen}/>
              <ReactQuill
                {...restProps}
                ref={el => (this.reactQuillRef = el)}
                bounds={this.editorCtner}
                className={'editor-body'}
                modules={moduleOpts}
                // placeholder={Locale.placeholder}
                onChange={this.handleChange}
                onSelectionChange={this.handleSelectionChange}/>
                {
                  findVisible ? <FindModal
                                  locale={this.Locale}
                                  closeFindModal={this._closeFindModal}
                                  getEditor={this.getEditor}/>
                    : null
              }
              {loading ? (
                <Spin
                  style={{
                    position: 'absolute',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.75)',
                  }}
                />
              ) : null}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}
polyfill(RichEditor);
export { Quill };
export default RichEditor;
