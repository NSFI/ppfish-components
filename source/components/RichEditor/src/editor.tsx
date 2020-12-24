import React, { Component, ReactInstance, ImgHTMLAttributes } from "react";
import { findDOMNode } from "react-dom";
import ReactQuill, { Quill } from "./quill/index";
import PropTypes from "prop-types";
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
import PlainClipboard from "./modules/plainClipboard";
import ImageDrop from "./modules/imageDrop";
import FileDrop from "./modules/fileDrop";

import {RichEditorProps, RichEditorState} from './interface'

Quill.register(EmojiBlot);
Quill.register(LinkBlot);
Quill.register(ImageBlot);
Quill.register(CustomSizeBlot);
Quill.register(VideoBlot);
Quill.register("modules/imageDrop", ImageDrop, true);
Quill.register("modules/fileDrop", FileDrop, true);
Quill.register(Quill.import('attributors/style/align'), true);
Quill.register(Quill.import('attributors/style/direction'), true);

const getImageSize = function(
  url: string,
  callback: (width: number|string, height: number|string) => void
) {
  let newImage = document.createElement("img");
  newImage.onload = function(this: GlobalEventHandlers & {width?: number|string, height?: number|string}) {
    // callback(this.width, this.height);
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
    reactQuillNode: Element | Text
    defaultFontSize: string
    
    defaultVideoType: string
    isSupportCustomInsertVideo: boolean
    prevSelectionFormat: any
    handlers: {
        link: Function,
        video: Function,
        emoji: Function,
        image: Function,
        attachment: Function,
        clean: Function,
        customInsertValue: Function
    }
    editorCtner: HTMLDivElement
    linkModalInputRef: any
    videoModalInputRef: any
    toolbarRef: React.ReactInstance
    reactQuillRef: ReactQuill
    onClickRemoveHandler: any
    onClickActionHandler: any
    onBlurHandler: any
    linkRange: any


  static defaultProps = {
    customEmoji: [],
    customLink: {},
    customInsertValue: {},
    insertImageTip:
      "支持jpg、jpeg、png、gif、bmp格式的图片，最佳显示高度不超过400px，宽度不超过270px。",
    insertVideoTip: (
      <React.Fragment>
        <span>1、单个视频不超过10M，支持MP4、3GP格式视频。</span>
        <br />
        <span>2、最佳显示高度不超过400px, 宽度不超过270px。</span>
      </React.Fragment>
    ),
    placeholder: "请输入内容",
    prefixCls: "fishd-richeditor",
    popoverPlacement: "top",
    tooltipPlacement: "bottom",
    loading: false,
    imageDrop: false,
    fileDrop: false,
    resizable: false,
    pastePlainText: false,
    toolbar: [
      ["link", "bold", "italic", "underline"],
      ["size"],
      ["color"],
      [{ align: "" }, { align: "center" }, { align: "right" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["emoji"],
      ["image"],
      ["clean", "formatPainter"]
    ],
    getPopupContainer: () => document.body
  };

  static getDerivedStateFromProps(nextProps: RichEditorProps, prevState: any) {
    let newState = {};

    if (nextProps.value !== prevState.lastValue) {
      newState["lastValue"] = newState["value"] = nextProps.value;
    }

    if (nextProps.loading !== prevState.loading) {
      newState["loading"] = nextProps.loading;
    }

    return newState;
  }

  constructor(props: RichEditorProps) {
    super(props);
    this.reactQuillNode = document.body;
    this.defaultFontSize = "14px";

    let {
      value,
      customLink,
      supportFontTag,
      pastePlainText,
      customInsertVideo
    } = this.props;

    // 粘贴时将富文本转为纯文本
    if (pastePlainText) {
      Quill.register("modules/clipboard", PlainClipboard, true);
    }

    // this.urlValidator = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,63}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/i;
    this.onBlurHandler = null;
    let formatValue = value;
    if (supportFontTag) {
      formatValue = this.formatFontTag(value);
    }

    this.defaultVideoType = "video_link";
    if (customInsertVideo && typeof customInsertVideo === "function") {
      this.isSupportCustomInsertVideo = true;
      this.defaultVideoType = "video_local";
    }

    // 格式刷保存的格式
    this.prevSelectionFormat = null;

    this.state = {
      lastValue: value,
      value: formatValue || "",
      loading: false,
      showLinkModal: false,
      showVideoModal: false,
      showImageModal: false,
      toolbarCtner: null,
      curRange: null,
      curVideoType: this.defaultVideoType,
      defaultInputLink: "http://",
      linkModalTitle: "插入超链接",
      formatPainterActive: false
    };
    this.handlers = {
      link: (value, fromAction) => {
        let { onClickToolbarBtn } = this.props;
        if (
          typeof onClickToolbarBtn == "function" &&
          onClickToolbarBtn("link") === false
        ) {
          return;
        }

        let quill = this.getEditor(),
          range = quill.getSelection();

        if (range && range.length !== 0) {
          // 附件不能设置超链接
          let [link, offset] = quill.scroll.descendant(LinkBlot, range.index);
          if (link && link.domNode.dataset.qlLinkType == "attachment") {
            return;
          }

          let newState = {
            value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
            showLinkModal: true,
            defaultInputLink: "http://",
            curRange: range
          };

          // 点击编辑链接触发
          if (fromAction) {
            newState["defaultInputLink"] = value;
            newState["linkModalTitle"] = "编辑超链接";
          } else {
            newState["linkModalTitle"] = "插入超链接";
          }

          this.setState(newState);
        } else {
          message.error("没有选中文本");
        }
      },
      video: value => {
        let { onClickToolbarBtn } = this.props;
        if (
          typeof onClickToolbarBtn == "function" &&
          onClickToolbarBtn("video") === false
        ) {
          return;
        }

        let quill = this.getEditor();
        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          showVideoModal: true,
          curRange: quill.getSelection() // 防止插入视频时光标定位错误
        });
      },
      emoji: value => {
        let quill = this.getEditor(),
          range = quill.getSelection(),
          mValue = JSON.parse(value);

        quill.insertEmbed(range.index, "emoji", {
          type: mValue.type,
          alt: mValue.alt,
          src: mValue.src && mValue.src.trim(),
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
        if (
          typeof onClickToolbarBtn == "function" &&
          onClickToolbarBtn("image") === false
        ) {
          return;
        }

        let quill = this.getEditor();
        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          showImageModal: true,
          curRange: quill.getSelection()
        });
      },
      attachment: () => {
        let { onClickToolbarBtn } = this.props;
        if (
          typeof onClickToolbarBtn == "function" &&
          onClickToolbarBtn("attachment") === false
        ) {
          return;
        }

        let quill = this.getEditor();
        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          showAttachmentModal: true,
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
          Object.keys(formats).forEach(name => {
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
      customInsertValue: value => {
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
    Object.keys(customLink).forEach(moduleName => {
      this.handlers[`${moduleName}Entry`] = function() {
        let range = this.quill.getSelection(),
          url = customLink[moduleName].url;
        if (range.length !== 0) {
          // 附件不能设置超链接
          let [link, offset] = this.quill.scroll.descendant(
            LinkBlot,
            range.index
          );
          if (link && link.domNode.dataset.qlLinkType == "attachment") {
            return;
          }

          if (url) {
            // 异步获取URL
            if (Object.prototype.toString.call(url) == "[object Function]") {
              let format = this.quill.getFormat(),
                prevValue = format && format.link && format.link.url;

              url(value => {
                this.quill.format("link", {
                  type: `${moduleName}Entry`,
                  url: value
                });
              }, prevValue);
            } else {
              this.quill.format("link", {
                type: `${moduleName}Entry`,
                url
              });
            }
          }
        } else {
          message.error("没有选中文本");
        }
      };
    });
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState(
      {
        toolbarCtner: findDOMNode(this.toolbarRef)
      },
      () => {
        if (!this.reactQuillRef) return;
        this.reactQuillNode = findDOMNode(this.reactQuillRef) as Element;

        this.onBlurHandler = addEventListener(
          this.reactQuillNode.querySelector(".ql-editor"),
          "blur",
          () => {
            if (!this.reactQuillRef) return;

            let quill = this.reactQuillRef.getEditor(),
              range = quill.getSelection();

            if (typeof this.props.onBlur == "function") {
              this.props.onBlur(range, "user", quill);
            }
          }
        );

        // 编辑超链接
        this.onClickActionHandler = addEventListener(
          this.reactQuillNode.querySelector("a.ql-action"),
          "click",
          event => {
            if (!this.reactQuillRef) return;

            let quill = this.reactQuillRef.getEditor();
            if (!quill) return;

            let tooltip = quill.theme && quill.theme.tooltip;
            if (tooltip && this.linkRange != null) {
              tooltip.linkRange = this.linkRange;
              quill.setSelection(this.linkRange);
              this.handlers.link(tooltip.preview.getAttribute("href"), true);
            }

            // if (this.root.classList.contains('ql-editing')) {
            //   this.save();
            // } else {
            //   this.edit('link', this.preview.textContent);
            // }

            event.preventDefault();
          }
        );

        // 删除超链接
        this.onClickRemoveHandler = addEventListener(
          this.reactQuillNode.querySelector("a.ql-remove"),
          "click",
          event => {
            if (!this.reactQuillRef) return;

            let quill = this.reactQuillRef.getEditor();
            if (!quill) return;

            let tooltip = quill.theme && quill.theme.tooltip;
            if (tooltip && this.linkRange != null) {
              tooltip.linkRange = this.linkRange;
              quill.formatText(tooltip.linkRange, "link", false, "user");
              quill.focus();
              delete tooltip.linkRange;
              this.linkRange = null;
            }

            event.preventDefault();
          }
        );
      }
    );
    /* eslint-enable react/no-did-mount-set-state */
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* eslint-disable react/no-did-update-set-state */
    if (
      prevState.lastValue != this.state.lastValue &&
      this.props.supportFontTag
    ) {
      this.setState({
        value: this.formatFontTag(this.state.lastValue)
      });
    }
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
        tagAttr = " ";

      $3.replace(/(\w+-?\w+)\s*=\s*["']\s*(.*?)\s*["']/gi, ($0, $1, $2) => {
        let key = $1,
          value = $2;

        switch (key) {
          case "color": {
            tagStyle += "color:" + value + ";";
            break;
          }
          case "size": {
            // font标签size属性的value是数字类型，取值范围是[1,7]。
            let size2pxMap = {
                "1": "12px",
                "2": "13px",
                "3": "16px",
                "4": "18px",
                "5": "24px",
                "6": "32px",
                "7": "48px"
              },
              sizeWithUnit = this.defaultFontSize,
              val = value && value.trim();

            // value非数字或不在[1,7]范围内时，取默认字体大小
            if (!/^\d+$/.test(val) || parseInt(val) > 7 || parseInt(val) < 1) {
              sizeWithUnit = this.defaultFontSize;
            } else {
              sizeWithUnit = size2pxMap[val] || this.defaultFontSize;
            }

            tagStyle += "font-size:" + sizeWithUnit + ";";
            break;
          }
          case "face": {
            tagStyle += "font-family:" + value + ";";
            break;
          }
          default: {
            tagAttr += key + "=" + value;
            break;
          }
        }
      });

      tagStyle += '"';

      return $1 + "span" + $2 + tagStyle + tagAttr + $4;
    });

    return value.replace(fontTagEnd, "$1span$2");
  };

  focus = () => {
    if (!this.reactQuillRef) return;
    this.reactQuillRef.focus();
  };

  blur = () => {
    if (!this.reactQuillRef) return;
    this.reactQuillRef.blur();
  };

  getEditor = ():ReactQuill|undefined => {
    if (!this.reactQuillRef) return;
    return this.reactQuillRef.getEditor() as ReactQuill;
  };

  handleLinkModalOk = () => {
    let el = this.linkModalInputRef.input,
      val = el.value.trim();

    if (val) {
      if (val.length > 1000) {
        message.error("链接地址不得超过1000个字");
        return;
      }

      let quill = this.getEditor();
      quill.formatText(
        this.state.curRange,
        "link",
        {
          // type: 'default',
          url: val
        },
        "user"
      );
      quill.setSelection(this.state.curRange); // 设置超链接后恢复选区

      this.setState({
        value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
        showLinkModal: false,
        defaultInputLink: "http://"
      });
    } else {
      message.error("链接地址不得为空");
    }
  };

  handleLinkModalCancel = () => {
    this.setState({
      showLinkModal: false,
      defaultInputLink: "http://"
    });
  };

  handleVideoModalOk = () => {
    let val = null;

    if (this.videoModalInputRef) {
      val = this.videoModalInputRef.input.value.trim();
    }

    if (val) {
      if (val.length > 1000) {
        message.error("视频链接不得超过1000个字");
        return;
      }

      if (val.indexOf("//") < 0) {
        message.error("视频链接URL格式错误");
        return;
      }

      let quill = this.getEditor(),
        range = this.state.curRange
          ? this.state.curRange
          : quill.getSelection(true), // 获取选区前先聚焦
        { videoTagAttrs } = this.props;

      this.insertVideo(range.index, {
        ...videoTagAttrs,
        src: val
      });

      this.videoModalInputRef && (this.videoModalInputRef.input.value = "");

      this.setState({
        value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
        showVideoModal: false,
        curRange: null
      });
    } else {
      message.error("视频链接URL不得为空");
    }
  };

  handleVideoModalCancel = () => {
    if (this.videoModalInputRef) {
      this.videoModalInputRef.input.value = "";
    }

    this.setState({
      curVideoType: this.defaultVideoType,
      showVideoModal: false,
      curRange: null
    });
  };

  handleImageModalCancel = () => {
    this.setState({
      showImageModal: false,
      curRange: null
    });
  };

  handleAttachmentModalCancel = () => {
    this.setState({
      showAttachmentModal: false,
      curRange: null
    });
  };

  handlePickLocalImage = () => {
    let { customInsertImage } = this.props,
      { toolbarCtner } = this.state,
      quill = this.getEditor(),
      fileInput = toolbarCtner.querySelector("input.ql-image[type=file]");

    const handleInsertImage = info => {
      if (info.src == undefined) {
        message.error("请设置图片源地址");
        return;
      }

      info.src = info.src && info.src.trim();

      let range = this.state.curRange
        ? this.state.curRange
        : quill.getSelection(true);
      if (info.width == undefined || info.height == undefined) {
        getImageSize(info.src, (naturalWidth, naturalHeight) => {
          info.width = naturalWidth;
          info.height = naturalHeight;

          quill.insertEmbed(range.index, "myImage", info);
          quill.setSelection(range.index + 1, "silent");

          this.setState({
            value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
            curRange: null
          });
        });
      } else {
        quill.insertEmbed(range.index, "myImage", info);
        quill.setSelection(range.index + 1, "silent");

        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          curRange: null
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
    });

    if (customInsertImage && typeof customInsertImage === "function") {
      customInsertImage(getImageCb);
    } else {
      if (fileInput == null) {
        fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute(
          "accept",
          "image/jpg, image/jpeg, image/png, image/gif, image/bmp"
        );
        fileInput.setAttribute("multiple", "multiple");
        fileInput.classList.add("ql-image");
        fileInput.addEventListener("change", () => {
          if (fileInput.files != null && fileInput.files.length) {
            for (let i = 0, len = fileInput.files.length; i < len; i++) {
              let reader = new FileReader();
              reader.onload = e => {
                getImageCb({ src: e.target.result });
                fileInput.value = "";
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
    let { customInsertAttachment } = this.props,
      quill = this.getEditor();

    const handleInsertFile = file => {
      if (!file || !file.url || !file.name) {
        message.error("文件信息读取失败");
        return;
      }

      let range = this.state.curRange
        ? this.state.curRange
        : quill.getSelection(true);
      if (!range) return;

      // 继承列表的样式
      let curFormat = quill.getFormat(range),
        listFormat: {list?:any} = {};

      if (curFormat && curFormat.list) {
        listFormat.list = curFormat.list;
      }

      let displayFileName = "[文件] " + file.name,
        contentsDelta: any[] = [
          {
            insert: displayFileName,
            attributes: {
              ...listFormat,
              link: {
                type: "attachment",
                url: file.url && file.url.trim(),
                name: file.name
              }
            }
          },
          {
            insert: "\n",
            attributes: {
              ...listFormat
            }
          }
        ];

      // 在开头插入时不能使用retain
      if (range.index > 0) {
        contentsDelta.unshift({ retain: range.index });
      }

      // 插入附件
      quill.updateContents(contentsDelta, "silent");
      quill.setSelection(range.index + displayFileName.length + 1, "silent");
    };

    const getFileCb = fileList => {
      if (Array.isArray(fileList)) {
        fileList
          .sort((a, b) => {
            // 单次插入多个不同类型的文件时，按”视频 -> 图片 -> 其他文件“的顺序排列
            let order = ["other", "image", "video"];
            return order.indexOf(b.type) - order.indexOf(a.type);
          })
          .forEach(file => {
            handleInsertFile(file);
            this.setState({
              value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
              curRange: null
            });
          });
      } else {
        handleInsertFile(fileList);
        this.setState({
          value: quill.getRawHTML(), // 使 RichEditor 与 Quill 同步
          curRange: null
        });
      }
    };

    this.setState({
      showAttachmentModal: false
    });

    if (
      customInsertAttachment &&
      typeof customInsertAttachment === "function"
    ) {
      customInsertAttachment(getFileCb);
    }
  };

  insertVideo = (rangeIndex, attrs) => {
    let quill = this.getEditor(),
      prevChar = quill.getText(rangeIndex - 1, 1),
      nextChar = quill.getText(rangeIndex + 1, 1),
      videoNode = document.createElement("video");

    videoNode.onerror = () => {
      message.error("视频无法播放");
    };
    videoNode.src = attrs.src && attrs.src.trim();
    videoNode = null;

    if (rangeIndex > 0 && prevChar != "\n") {
      // 在一行的中间插入视频
      if (nextChar && nextChar != "\n") {
        quill.insertText(rangeIndex, "\n"); // 插入视频前换行，避免丢失文字
        quill.insertEmbed(rangeIndex + 1, "myVideo", attrs);
        quill.setSelection(rangeIndex + 1, "silent");
      } else {
        // 在一行的末尾插入视频
        quill.insertEmbed(rangeIndex + 1, "myVideo", attrs);
        quill.insertText(rangeIndex + 2, "\n"); // 插入视频后换行，避免丢失光标
        quill.setSelection(rangeIndex + 2, "silent");
      }
    } else {
      // 一行的开头插入视频
      quill.insertEmbed(rangeIndex, "myVideo", attrs);
      quill.setSelection(rangeIndex + 1, "silent");
    }
  };

  handlePickLocalVideo = () => {
    let { customInsertVideo, videoTagAttrs } = this.props,
      quill = this.getEditor(); // 获取选区前先聚焦

    const handleVideoInsert = info => {
      if (info.src == undefined) {
        message.error("请设置视频源地址");
        return;
      }

      info.src = info.src && info.src.trim();

      let range = this.state.curRange
        ? this.state.curRange
        : quill.getSelection(true);
      this.insertVideo(range.index, {
        ...videoTagAttrs,
        ...info
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
        curRange: null
      });
    };

    this.setState({
      showVideoModal: false
    });

    if (customInsertVideo && typeof customInsertVideo === "function") {
      customInsertVideo(getVideoCb);
    }
  };

  handleInsertEmoji = e => {
    let { toolbarCtner } = this.state,
      target = e.target,
      clsList = target.classList.value;

    if (
      (clsList.indexOf("emoji-item") > -1 ||
        clsList.indexOf("emoji-extend-item") > -1) &&
      target.hasAttribute("value")
    ) {
      let el = toolbarCtner.querySelector('button.ql-emoji[data-role="emoji"]');
      if (el == null) {
        el = document.createElement("button");
        toolbarCtner.querySelector(".custom-emoji").appendChild(el);
      }

      el.setAttribute("type", "button");
      el.setAttribute("data-role", "emoji");
      el.setAttribute("value", target.getAttribute("value"));
      el.classList.add("ql-emoji", "hide");
      el.click();
    }
  };

  handleFormatBackground = e => {
    let { toolbarCtner } = this.state,
      target = e.target;

    if (
      target.classList.value.indexOf("background-item") > -1 &&
      target.hasAttribute("value")
    ) {
      let el = toolbarCtner.querySelector(
        'button.ql-background[data-role="background"]'
      );
      if (el == null) {
        el = document.createElement("button");
        toolbarCtner.querySelector(".custom-background").appendChild(el);
      }

      el.setAttribute("type", "button");
      el.setAttribute("data-role", "background");
      el.setAttribute("value", target.getAttribute("value"));
      el.classList.add("ql-background", "hide");
      el.click();
    }
  };

  handleFormatColor = e => {
    let { toolbarCtner } = this.state,
      target = e.target;

    if (
      target.classList.value.indexOf("color-item") > -1 &&
      target.hasAttribute("value")
    ) {
      let el = toolbarCtner.querySelector('button.ql-color[data-role="color"]');
      if (el == null) {
        el = document.createElement("button");
        toolbarCtner.querySelector(".custom-color").appendChild(el);
      }

      el.setAttribute("type", "button");
      el.setAttribute("data-role", "color");
      el.setAttribute("value", target.getAttribute("value"));
      el.classList.add("ql-color", "hide");
      el.click();
    }
  };

  handleFormatSize = value => {
    let quill = this.getEditor();
    quill &&
      quill.format("customAttr", {
        fontSize: value
      });
  };

  handleInsertValue = e => {
    let { toolbarCtner } = this.state,
      target = e.target;

    if (
      target.classList.value.indexOf("insert-value-item") > -1 &&
      target.hasAttribute("value")
    ) {
      let el = toolbarCtner.querySelector(
        'button.ql-customInsertValue[data-role="customInsertValue"]'
      );
      if (el == null) {
        el = document.createElement("button");
        toolbarCtner.querySelector(".custom-insert-value").appendChild(el);
      }

      el.setAttribute("type", "button");
      el.setAttribute("data-role", "customInsertValue");
      el.setAttribute("value", target.getAttribute("value"));
      el.classList.add("ql-customInsertValue", "hide");
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
    root.classList.remove("ql-editing");
    root.classList.remove("ql-hidden");
    root.classList.remove("custom-hide");
    root.classList.add("custom-show");
  };

  handleHideTooltip = root => {
    if (!root) return;
    root.classList.remove("custom-show");
    root.classList.add("ql-hidden");
    root.classList.add("custom-hide");
  };

  handleTooltipPosition(tooltip, reference) {
    let left =
      reference.left + reference.width / 2 - tooltip.root.offsetWidth / 2;
    // root.scrollTop should be 0 if scrollContainer !== root
    let top = reference.bottom + tooltip.quill.root.scrollTop;
    tooltip.root.style.left = left + "px";
    tooltip.root.style.top = top + "px";
    tooltip.root.classList.remove("ql-flip");
    let containerBounds = tooltip.boundsContainer.getBoundingClientRect();
    let rootBounds = tooltip.root.getBoundingClientRect();
    let shift = 0,
      offset = 15;
    if (rootBounds.right > containerBounds.right) {
      shift = containerBounds.right - rootBounds.right;
      tooltip.root.style.left = left + shift - offset + "px";
    }
    if (rootBounds.left < containerBounds.left) {
      shift = containerBounds.left - rootBounds.left;
      tooltip.root.style.left = left + shift + offset + "px";
    }
    if (rootBounds.bottom > containerBounds.bottom) {
      let height = rootBounds.bottom - rootBounds.top;
      let verticalShift = reference.bottom - reference.top + height;
      tooltip.root.style.top = top - verticalShift + "px";
      tooltip.root.classList.add("ql-flip");
    }
    return shift;
  }

  handleSelectionChange = (nextSelection, source, editor) => {
    // let { toolbarCtner } = this.state;
    const { onSelectionChange } = this.props;
    onSelectionChange && onSelectionChange(nextSelection, source, editor);

    let quill = this.getEditor();
    if (!quill) return;

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
        formatPainterActive: false
      });

      // 重置保存的格式
      this.prevSelectionFormat = null;
    }

    let tooltip = quill.theme && quill.theme.tooltip;
    if (!tooltip) return;

    // 光标定位到超链接上时展示tooltip
    if (nextSelection && nextSelection.length === 0 && source === "user") {
      let [link, offset] = quill.scroll.descendant(
        LinkBlot,
        nextSelection.index
      );
      if (link != null) {
        // 附件的超链接不可编辑
        if (link.domNode.dataset.qlLinkType == "attachment") {
          return;
        }

        tooltip.linkRange = new Range(
          nextSelection.index - offset,
          link.length()
        );
        this.linkRange = tooltip.linkRange; // 保存到当前实例，在编辑/删除超链接的事件回调中使用
        let preview = LinkBlot.formats(link.domNode).url;
        tooltip.preview.textContent = preview;
        tooltip.preview.setAttribute("href", preview);
        // 需要在显示后设置位置
        this.handleShowTooltip(tooltip.root);
        this.handleTooltipPosition(tooltip, quill.getBounds(tooltip.linkRange));
        return;
      }
    }
    this.handleHideTooltip(tooltip.root);

    // FixBug: 取消高亮区分。a标签添加自定义属性后接带自定义属性的img标签时，在MAC和安卓版的微信公众号中超链接会异常显示出HTML标签。
    // 区分默认的超链接按钮和自定义超链接按钮的高亮
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
  };

  handleVideoTypeChange = e => {
    this.setState({
      curVideoType: e.target.value || this.defaultVideoType
    });
  };

  getCurrentSize = () => {
    let quill = this.getEditor();
    if (!quill) return null;

    let formats = quill.getFormat(),
      customAttr = formats && formats.customAttr,
      customAttrType = Object.prototype.toString.call(customAttr);

    if (!customAttr) return this.defaultFontSize;

    if (customAttrType == "[object Object]") {
      return customAttr.fontSize || this.defaultFontSize;
    }

    if (customAttrType == "[object Array]") {
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
      formatPainterActive: true
    });
  };

  handleUnsaveSelectionFormat = () => {
    if (this.prevSelectionFormat) {
      this.prevSelectionFormat = null;
    }

    // 取消格式刷高亮
    this.setState({
      formatPainterActive: false
    });
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
      linkModalTitle
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
      ...restProps
    } = this.props;
    delete restProps.customInsertImage;
    const cls = classNames(
      `${prefixCls}`,
      {
        resizable: resizable
      },
      className
    );

    if (value) {
      restProps.value = value;
    }

    // 上传本地视频时Modal无确认和取消按钮
    let videoFooter = {};
    if (curVideoType == "video_local") {
      videoFooter["footer"] = null;
    }

    let moduleOpts = {
      toolbar: {
        container: toolbarCtner,
        handlers: this.handlers
      }
    };

    // fileDrop 为 true 时，使 imageDrop 失效
    if (fileDrop && customDropFile) {
      // customDropFile 自定义文件上传逻辑，必选
      moduleOpts["fileDrop"] = {
        customDropFile
      };
    } else if (imageDrop) {
      // customDropImage 不存在时，将图片文件转为 dataUrl 格式
      moduleOpts["imageDrop"] = {
        customDropImage
      };
    }

    if (pastePlainText) {
      moduleOpts["clipboard"] = {
        pastePlainText: true
      };
    }

    return (
      <div className={cls} style={style} ref={el => (this.editorCtner = el)}>
        <Modal
          title={linkModalTitle}
          className={`${prefixCls}-link-modal`}
          visible={showLinkModal}
          onOk={this.handleLinkModalOk}
          onCancel={this.handleLinkModalCancel}
          destroyOnClose
        >
          <span className="text">超链接地址</span>
          <Input
            ref={el => (this.linkModalInputRef = el)}
            style={{ width: "434px" }}
            defaultValue={defaultInputLink}
          />
          {insertLinkTip ? <div className="tip">{insertLinkTip}</div> : null}
        </Modal>
        <Modal
          title="插入图片"
          className={`${prefixCls}-image-modal`}
          visible={showImageModal}
          footer={null}
          onCancel={this.handleImageModalCancel}
        >
          <Button type="primary" onClick={this.handlePickLocalImage}>
            选择本地图片
          </Button>
          {insertImageTip ? <div className="tip">{insertImageTip}</div> : null}
        </Modal>
        <Modal
          title="插入附件"
          className={`${prefixCls}-image-modal`}
          visible={showAttachmentModal}
          footer={null}
          onCancel={this.handleAttachmentModalCancel}
        >
          <Button type="primary" onClick={this.handlePickLocalFile}>
            选择本地文件
          </Button>
          {insertAttachmentTip ? (
            <div className="tip">{insertAttachmentTip}</div>
          ) : null}
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
            style={{ marginBottom: 24 }}
            onChange={this.handleVideoTypeChange}
            value={curVideoType}
          >
            {this.isSupportCustomInsertVideo ? (
              <Radio value="video_local">本地视频</Radio>
            ) : null}
            <Radio value="video_link">视频链接</Radio>
          </Radio.Group>
          {curVideoType == "video_local" ? (
            <React.Fragment>
              <Button
                style={{ display: "block" }}
                type="primary"
                onClick={this.handlePickLocalVideo}
              >
                选择本地视频
              </Button>
              {insertVideoTip ? (
                <div className="tip">{insertVideoTip}</div>
              ) : null}
            </React.Fragment>
          ) : (
            <Input
              ref={el => (this.videoModalInputRef = el)}
              style={{ width: "434px" }}
              placeholder="请输入视频链接URL"
            />
          )}
        </Modal>
        <CustomToolbar
          ref={el => (this.toolbarRef = el)}
          className={"editor-head"}
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
          getCurrentSize={this.getCurrentSize}
          formatPainterActive={this.state.formatPainterActive}
          saveSelectionFormat={this.handleSaveSelectionFormat}
          unsaveSelectionFormat={this.handleUnsaveSelectionFormat}
        />
        <ReactQuill
          {...restProps}
          ref={el => (this.reactQuillRef = el)}
          bounds={this.editorCtner}
          className={"editor-body"}
          modules={moduleOpts}
          placeholder={placeholder}
          onChange={this.handleChange}
          onSelectionChange={this.handleSelectionChange}
        />
        {loading ? (
          <Spin
            style={{
              position: "absolute",
              width: "100%",
              background: "rgba(255, 255, 255, 0.75)"
            }}
          />
        ) : null}
      </div>
    );
  }
}
polyfill(RichEditor);
export { Quill };
export default RichEditor;
