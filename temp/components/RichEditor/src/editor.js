var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
import PlainClipboard from "./modules/plainClipboard";
import ImageDrop from "./modules/imageDrop";
import FileDrop from "./modules/fileDrop";
import ConfigConsumer from '../../Config/Consumer';
Quill.register(EmojiBlot);
Quill.register(LinkBlot);
Quill.register(ImageBlot);
Quill.register(CustomSizeBlot);
Quill.register(VideoBlot);
Quill.register("modules/imageDrop", ImageDrop, true);
Quill.register("modules/fileDrop", FileDrop, true);
Quill.register(Quill.import('attributors/style/align'), true);
Quill.register(Quill.import('attributors/style/direction'), true);
var getImageSize = function (url, callback) {
    var newImage = document.createElement("img");
    newImage.onload = function () {
        // callback(this.width, this.height);
        callback(this.width, this.height);
    };
    newImage.src = url;
};
var Range = /** @class */ (function () {
    function Range(index, length) {
        if (length === void 0) { length = 0; }
        this.index = index;
        this.length = length;
    }
    return Range;
}());
var RichEditor = /** @class */ (function (_super) {
    __extends(RichEditor, _super);
    function RichEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.formatFontTag = function (value) {
            if (!value)
                return value;
            var fontTagStart = /(<\s*?)font(\s+)(.*?)(>)/gi, fontTagEnd = /(<\s*?\/\s*?)font(\s*?>)/gi;
            value = value.replace(fontTagStart, function ($0, $1, $2, $3, $4) {
                var tagStyle = ' style="', tagAttr = " ";
                $3.replace(/(\w+-?\w+)\s*=\s*["']\s*(.*?)\s*["']/gi, function ($0, $1, $2) {
                    var key = $1, value = $2;
                    switch (key) {
                        case "color": {
                            tagStyle += "color:" + value + ";";
                            break;
                        }
                        case "size": {
                            // font标签size属性的value是数字类型，取值范围是[1,7]。
                            var size2pxMap = {
                                "1": "12px",
                                "2": "13px",
                                "3": "16px",
                                "4": "18px",
                                "5": "24px",
                                "6": "32px",
                                "7": "48px"
                            }, sizeWithUnit = _this.defaultFontSize, val = value && value.trim();
                            // value非数字或不在[1,7]范围内时，取默认字体大小
                            if (!/^\d+$/.test(val) || parseInt(val) > 7 || parseInt(val) < 1) {
                                sizeWithUnit = _this.defaultFontSize;
                            }
                            else {
                                sizeWithUnit = size2pxMap[val] || _this.defaultFontSize;
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
        _this.focus = function () {
            if (!_this.reactQuillRef)
                return;
            _this.reactQuillRef.focus();
        };
        _this.blur = function () {
            if (!_this.reactQuillRef)
                return;
            _this.reactQuillRef.blur();
        };
        _this.getEditor = function () {
            if (!_this.reactQuillRef)
                return;
            return _this.reactQuillRef.getEditor();
        };
        _this.handleLinkModalOk = function () {
            var el = _this.linkModalInputRef.input, val = el.value.trim();
            if (val) {
                if (val.length > 1000) {
                    message.error(_this.Locale.linkToolongError);
                    return;
                }
                var quill = _this.getEditor();
                quill.formatText(_this.state.curRange, "link", {
                    // type: 'default',
                    url: val
                }, "user");
                quill.setSelection(_this.state.curRange); // 设置超链接后恢复选区
                _this.setState({
                    value: quill.getRawHTML(),
                    showLinkModal: false,
                    defaultInputLink: _this.defaultLinkPrefix
                });
            }
            else {
                message.error(_this.Locale.linkEmptyTip);
            }
        };
        _this.handleLinkModalCancel = function () {
            _this.setState({
                showLinkModal: false,
                defaultInputLink: _this.defaultLinkPrefix
            });
        };
        _this.handleVideoModalOk = function () {
            var val = null;
            if (_this.videoModalInputRef) {
                val = _this.videoModalInputRef.input.value.trim();
            }
            if (val) {
                if (val.length > 1000) {
                    message.error(_this.Locale.videoLinkTooLongError);
                    return;
                }
                if (val.indexOf("//") < 0) {
                    message.error(_this.Locale.videoUrlFormattingError);
                    return;
                }
                var quill = _this.getEditor(), range = _this.state.curRange
                    ? _this.state.curRange
                    : quill.getSelection(true), videoTagAttrs = _this.props.videoTagAttrs;
                _this.insertVideo(range.index, __assign(__assign({}, videoTagAttrs), { src: val }));
                _this.videoModalInputRef && (_this.videoModalInputRef.input.value = "");
                _this.setState({
                    value: quill.getRawHTML(),
                    showVideoModal: false,
                    curRange: null
                });
            }
            else {
                message.error(_this.Locale.noVideoUrlErrorTip);
            }
        };
        _this.handleVideoModalCancel = function () {
            if (_this.videoModalInputRef) {
                _this.videoModalInputRef.input.value = "";
            }
            _this.setState({
                curVideoType: _this.defaultVideoType,
                showVideoModal: false,
                curRange: null
            });
        };
        _this.handleImageModalCancel = function () {
            _this.setState({
                showImageModal: false,
                curRange: null
            });
        };
        _this.handleAttachmentModalCancel = function () {
            _this.setState({
                showAttachmentModal: false,
                curRange: null
            });
        };
        _this.handlePickLocalImage = function () {
            var customInsertImage = _this.props.customInsertImage, toolbarCtner = _this.state.toolbarCtner, quill = _this.getEditor(), fileInput = toolbarCtner.querySelector("input.ql-image[type=file]");
            var handleInsertImage = function (info) {
                if (info.src == undefined) {
                    message.error(_this.Locale.noPicSrcTip);
                    return;
                }
                info.src = info.src && info.src.trim();
                var range = _this.state.curRange
                    ? _this.state.curRange
                    : quill.getSelection(true);
                if (info.width == undefined || info.height == undefined) {
                    getImageSize(info.src, function (naturalWidth, naturalHeight) {
                        info.width = naturalWidth;
                        info.height = naturalHeight;
                        quill.insertEmbed(range.index, "myImage", info);
                        quill.setSelection(range.index + 1, "silent");
                        _this.setState({
                            value: quill.getRawHTML(),
                            curRange: null
                        });
                    });
                }
                else {
                    quill.insertEmbed(range.index, "myImage", info);
                    quill.setSelection(range.index + 1, "silent");
                    _this.setState({
                        value: quill.getRawHTML(),
                        curRange: null
                    });
                }
            };
            var getImageCb = function (imgList) {
                if (Array.isArray(imgList)) {
                    imgList.forEach(function (imgInfo) {
                        handleInsertImage(imgInfo);
                    });
                }
                else {
                    handleInsertImage(imgList);
                }
            };
            _this.setState({
                showImageModal: false
            });
            if (customInsertImage && typeof customInsertImage === "function") {
                customInsertImage(getImageCb);
            }
            else {
                if (fileInput == null) {
                    fileInput = document.createElement("input");
                    fileInput.setAttribute("type", "file");
                    fileInput.setAttribute("accept", "image/jpg, image/jpeg, image/png, image/gif, image/bmp");
                    fileInput.setAttribute("multiple", "multiple");
                    fileInput.classList.add("ql-image");
                    fileInput.addEventListener("change", function () {
                        if (fileInput.files != null && fileInput.files.length) {
                            for (var i = 0, len = fileInput.files.length; i < len; i++) {
                                var reader = new FileReader();
                                reader.onload = function (e) {
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
        _this.handlePickLocalFile = function () {
            var customInsertAttachment = _this.props.customInsertAttachment, quill = _this.getEditor();
            var handleInsertFile = function (file) {
                if (!file || !file.url || !file.name) {
                    message.error(_this.Locale.noFileInfoTip);
                    return;
                }
                var range = _this.state.curRange
                    ? _this.state.curRange
                    : quill.getSelection(true);
                if (!range)
                    return;
                // 继承列表的样式
                var curFormat = quill.getFormat(range), listFormat = {};
                if (curFormat && curFormat.list) {
                    listFormat.list = curFormat.list;
                }
                var displayFileName = (_this.Locale.file) + file.name, contentsDelta = [
                    {
                        insert: displayFileName,
                        attributes: __assign(__assign({}, listFormat), { link: {
                                type: "attachment",
                                url: file.url && file.url.trim(),
                                name: file.name
                            } })
                    },
                    {
                        insert: "\n",
                        attributes: __assign({}, listFormat)
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
            var getFileCb = function (fileList) {
                if (Array.isArray(fileList)) {
                    fileList
                        .sort(function (a, b) {
                        // 单次插入多个不同类型的文件时，按”视频 -> 图片 -> 其他文件“的顺序排列
                        var order = ["other", "image", "video"];
                        return order.indexOf(b.type) - order.indexOf(a.type);
                    })
                        .forEach(function (file) {
                        handleInsertFile(file);
                        _this.setState({
                            value: quill.getRawHTML(),
                            curRange: null
                        });
                    });
                }
                else {
                    handleInsertFile(fileList);
                    _this.setState({
                        value: quill.getRawHTML(),
                        curRange: null
                    });
                }
            };
            _this.setState({
                showAttachmentModal: false
            });
            if (customInsertAttachment &&
                typeof customInsertAttachment === "function") {
                customInsertAttachment(getFileCb);
            }
        };
        _this.insertVideo = function (rangeIndex, attrs) {
            var quill = _this.getEditor(), prevChar = quill.getText(rangeIndex - 1, 1), nextChar = quill.getText(rangeIndex + 1, 1), videoNode = document.createElement("video");
            videoNode.onerror = function () {
                message.error(_this.Locale.VideoCantPlayTip);
            };
            videoNode.src = attrs.src && attrs.src.trim();
            videoNode = null;
            if (rangeIndex > 0 && prevChar != "\n") {
                // 在一行的中间插入视频
                if (nextChar && nextChar != "\n") {
                    quill.insertText(rangeIndex, "\n"); // 插入视频前换行，避免丢失文字
                    quill.insertEmbed(rangeIndex + 1, "myVideo", attrs);
                    quill.setSelection(rangeIndex + 1, "silent");
                }
                else {
                    // 在一行的末尾插入视频
                    quill.insertEmbed(rangeIndex + 1, "myVideo", attrs);
                    quill.insertText(rangeIndex + 2, "\n"); // 插入视频后换行，避免丢失光标
                    quill.setSelection(rangeIndex + 2, "silent");
                }
            }
            else {
                // 一行的开头插入视频
                quill.insertEmbed(rangeIndex, "myVideo", attrs);
                quill.setSelection(rangeIndex + 1, "silent");
            }
        };
        _this.handlePickLocalVideo = function () {
            var _a = _this.props, customInsertVideo = _a.customInsertVideo, videoTagAttrs = _a.videoTagAttrs, quill = _this.getEditor(); // 获取选区前先聚焦
            var handleVideoInsert = function (info) {
                if (info.src == undefined) {
                    message.error(_this.Locale.noVideoLinkErrorTip);
                    return;
                }
                info.src = info.src && info.src.trim();
                var range = _this.state.curRange
                    ? _this.state.curRange
                    : quill.getSelection(true);
                _this.insertVideo(range.index, __assign(__assign({}, videoTagAttrs), info));
            };
            var getVideoCb = function (videoList) {
                if (Array.isArray(videoList)) {
                    videoList.forEach(function (videoInfo) {
                        handleVideoInsert(videoInfo);
                    });
                }
                else {
                    handleVideoInsert(videoList);
                }
                _this.setState({
                    value: quill.getRawHTML(),
                    curRange: null
                });
            };
            _this.setState({
                showVideoModal: false
            });
            if (customInsertVideo && typeof customInsertVideo === "function") {
                customInsertVideo(getVideoCb);
            }
        };
        _this.handleInsertEmoji = function (e) {
            var toolbarCtner = _this.state.toolbarCtner, target = e.target, clsList = target.classList.value;
            if ((clsList.indexOf("emoji-item") > -1 ||
                clsList.indexOf("emoji-extend-item") > -1) &&
                target.hasAttribute("value")) {
                var el = toolbarCtner.querySelector('button.ql-emoji[data-role="emoji"]');
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
        _this.handleFormatBackground = function (e) {
            var toolbarCtner = _this.state.toolbarCtner, target = e.target;
            if (target.classList.value.indexOf("background-item") > -1 &&
                target.hasAttribute("value")) {
                var el = toolbarCtner.querySelector('button.ql-background[data-role="background"]');
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
        _this.handleFormatColor = function (e) {
            var toolbarCtner = _this.state.toolbarCtner, target = e.target;
            if (target.classList.value.indexOf("color-item") > -1 &&
                target.hasAttribute("value")) {
                var el = toolbarCtner.querySelector('button.ql-color[data-role="color"]');
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
        _this.handleFormatSize = function (value) {
            var quill = _this.getEditor();
            quill &&
                quill.format("customAttr", {
                    fontSize: value
                });
        };
        _this.handleInsertValue = function (e) {
            var toolbarCtner = _this.state.toolbarCtner, target = e.target;
            if (target.classList.value.indexOf("insert-value-item") > -1 &&
                target.hasAttribute("value")) {
                var el = toolbarCtner.querySelector('button.ql-customInsertValue[data-role="customInsertValue"]');
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
        _this.handleChange = function (value, delta, source, editor) {
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(value, delta, source, editor);
            }
        };
        _this.handleShowTooltip = function (root) {
            if (!root)
                return;
            root.classList.remove("ql-editing");
            root.classList.remove("ql-hidden");
            root.classList.remove("custom-hide");
            root.classList.add("custom-show");
        };
        _this.handleHideTooltip = function (root) {
            if (!root)
                return;
            root.classList.remove("custom-show");
            root.classList.add("ql-hidden");
            root.classList.add("custom-hide");
        };
        _this.handleSelectionChange = function (nextSelection, source, editor) {
            // let { toolbarCtner } = this.state;
            var onSelectionChange = _this.props.onSelectionChange;
            onSelectionChange && onSelectionChange(nextSelection, source, editor);
            var quill = _this.getEditor();
            if (!quill)
                return;
            // 格式刷
            if (_this.prevSelectionFormat && nextSelection) {
                // 清除当前选区的格式
                quill.removeFormat(nextSelection.index, nextSelection.length);
                // 设置当前选区的格式
                Object.keys(_this.prevSelectionFormat).forEach(function (name) {
                    quill.format(name, _this.prevSelectionFormat[name]);
                });
                // 取消格式刷高亮
                _this.setState({
                    formatPainterActive: false
                });
                // 重置保存的格式
                _this.prevSelectionFormat = null;
            }
            var tooltip = quill.theme && quill.theme.tooltip;
            if (!tooltip)
                return;
            // 光标定位到超链接上时展示tooltip
            if (nextSelection && nextSelection.length === 0 && source === "user") {
                var _a = quill.scroll.descendant(LinkBlot, nextSelection.index), link = _a[0], offset = _a[1];
                if (link != null) {
                    // 附件的超链接不可编辑
                    if (link.domNode.dataset.qlLinkType == "attachment") {
                        return;
                    }
                    tooltip.linkRange = new Range(nextSelection.index - offset, link.length());
                    _this.linkRange = tooltip.linkRange; // 保存到当前实例，在编辑/删除超链接的事件回调中使用
                    var preview = LinkBlot.formats(link.domNode).url;
                    tooltip.preview.textContent = preview;
                    tooltip.preview.setAttribute("href", preview);
                    // 需要在显示后设置位置
                    _this.handleShowTooltip(tooltip.root);
                    _this.handleTooltipPosition(tooltip, quill.getBounds(tooltip.linkRange));
                    return;
                }
            }
            _this.handleHideTooltip(tooltip.root);
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
        _this.handleVideoTypeChange = function (e) {
            _this.setState({
                curVideoType: e.target.value || _this.defaultVideoType
            });
        };
        _this.getCurrentSize = function () {
            var quill = _this.getEditor();
            if (!quill)
                return null;
            var formats = quill.getFormat(), customAttr = formats && formats.customAttr, customAttrType = Object.prototype.toString.call(customAttr);
            if (!customAttr)
                return _this.defaultFontSize;
            if (customAttrType == "[object Object]") {
                return customAttr.fontSize || _this.defaultFontSize;
            }
            if (customAttrType == "[object Array]") {
                var len = customAttr.length;
                if (len) {
                    var fontSize = customAttr[0].fontSize, hasMultiFontSize = false;
                    for (var i = 0; i < len; i++) {
                        // 选中的富文本有多种字体大小时不高亮字号
                        if (customAttr[i].fontSize != fontSize) {
                            hasMultiFontSize = true;
                            break;
                        }
                    }
                    if (hasMultiFontSize) {
                        return null;
                    }
                    else {
                        return fontSize;
                    }
                }
                else {
                    return _this.defaultFontSize;
                }
            }
            return null;
        };
        _this.handleSaveSelectionFormat = function () {
            var quill = _this.getEditor();
            if (!quill)
                return null;
            _this.prevSelectionFormat = quill.getFormat();
            // 格式刷高亮
            _this.setState({
                formatPainterActive: true
            });
        };
        _this.handleUnsaveSelectionFormat = function () {
            if (_this.prevSelectionFormat) {
                _this.prevSelectionFormat = null;
            }
            // 取消格式刷高亮
            _this.setState({
                formatPainterActive: false
            });
        };
        // 变更伪类的content
        _this.changePseudoElementText = function () {
            var _a = _this.Locale, accessLink = _a.accessLink, edit = _a.edit, deleteText = _a.deleteText;
            var editorCtner = _this.editorCtner;
            var elEdit = editorCtner.querySelector('.ql-snow .ql-tooltip a.ql-action');
            var elDelete = editorCtner.querySelector('.ql-snow .ql-tooltip a.ql-remove');
            var elAccessLink = editorCtner.querySelector('.ql-snow .ql-tooltip');
            elEdit && elEdit.setAttribute('data-after-content', edit);
            elDelete && elDelete.setAttribute('data-before-content', deleteText);
            elAccessLink && elAccessLink.setAttribute('data-before-content', accessLink);
        };
        // 变更编辑器placeholder
        _this.changeEditorPlaceholder = function () {
            var _a;
            var root = (_a = _this.getEditor()) === null || _a === void 0 ? void 0 : _a.root;
            root && root.setAttribute('data-placeholder', _this.props.placeholder || _this.Locale.placeholder);
        };
        _this.reactQuillNode = document.body;
        _this.defaultFontSize = "14px";
        _this.defaultLinkPrefix = "https://";
        _this.Locale = {};
        var _a = _this.props, value = _a.value, customLink = _a.customLink, supportFontTag = _a.supportFontTag, pastePlainText = _a.pastePlainText, customInsertVideo = _a.customInsertVideo;
        // 粘贴时将富文本转为纯文本
        if (pastePlainText) {
            Quill.register("modules/clipboard", PlainClipboard, true);
        }
        // this.urlValidator = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,63}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/i;
        _this.onBlurHandler = null;
        var formatValue = value;
        if (supportFontTag) {
            formatValue = _this.formatFontTag(value);
        }
        _this.defaultVideoType = "video_link";
        if (customInsertVideo && typeof customInsertVideo === "function") {
            _this.isSupportCustomInsertVideo = true;
            _this.defaultVideoType = "video_local";
        }
        // 格式刷保存的格式
        _this.prevSelectionFormat = null;
        _this.state = {
            lastValue: value,
            value: formatValue || "",
            loading: false,
            showLinkModal: false,
            showVideoModal: false,
            showImageModal: false,
            toolbarCtner: null,
            curRange: null,
            curVideoType: _this.defaultVideoType,
            defaultInputLink: _this.defaultLinkPrefix,
            linkModalTitle: "",
            formatPainterActive: false
        };
        _this.handlers = {
            link: function (value, fromAction) {
                var onClickToolbarBtn = _this.props.onClickToolbarBtn;
                if (typeof onClickToolbarBtn == "function" &&
                    onClickToolbarBtn("link") === false) {
                    return;
                }
                var quill = _this.getEditor(), range = quill.getSelection();
                if (range && range.length !== 0) {
                    // 附件不能设置超链接
                    var _a = quill.scroll.descendant(LinkBlot, range.index), link = _a[0], offset = _a[1];
                    if (link && link.domNode.dataset.qlLinkType == "attachment") {
                        return;
                    }
                    var newState = {
                        value: quill.getRawHTML(),
                        showLinkModal: true,
                        defaultInputLink: _this.defaultLinkPrefix,
                        curRange: range
                    };
                    // 点击编辑链接触发
                    if (fromAction) {
                        newState["defaultInputLink"] = value;
                        newState["linkModalTitle"] = _this.Locale.editLink;
                    }
                    else {
                        newState["linkModalTitle"] = _this.Locale.insertLink;
                    }
                    _this.setState(newState);
                }
                else {
                    message.error(_this.Locale.noSelectionText);
                }
            },
            video: function (value) {
                var onClickToolbarBtn = _this.props.onClickToolbarBtn;
                if (typeof onClickToolbarBtn == "function" &&
                    onClickToolbarBtn("video") === false) {
                    return;
                }
                var quill = _this.getEditor();
                _this.setState({
                    value: quill.getRawHTML(),
                    showVideoModal: true,
                    curRange: quill.getSelection() // 防止插入视频时光标定位错误
                });
            },
            emoji: function (value) {
                var quill = _this.getEditor(), range = quill.getSelection(), mValue = JSON.parse(value);
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
            image: function () {
                var onClickToolbarBtn = _this.props.onClickToolbarBtn;
                if (typeof onClickToolbarBtn == "function" &&
                    onClickToolbarBtn("image") === false) {
                    return;
                }
                var quill = _this.getEditor();
                _this.setState({
                    value: quill.getRawHTML(),
                    showImageModal: true,
                    curRange: quill.getSelection()
                });
            },
            attachment: function () {
                var onClickToolbarBtn = _this.props.onClickToolbarBtn;
                if (typeof onClickToolbarBtn == "function" &&
                    onClickToolbarBtn("attachment") === false) {
                    return;
                }
                var quill = _this.getEditor();
                _this.setState({
                    value: quill.getRawHTML(),
                    showAttachmentModal: true,
                    curRange: quill.getSelection()
                });
            },
            clean: function () {
                var Parchment = Quill.imports.parchment;
                var quill = _this.getEditor(), range = quill.getSelection();
                if (range == null)
                    return;
                if (range.length == 0) {
                    var formats = quill.getFormat();
                    Object.keys(formats).forEach(function (name) {
                        // Clean functionality in existing apps only clean inline formats
                        if (Parchment.query(name, Parchment.Scope.INLINE) != null) {
                            quill.format(name, false);
                        }
                    });
                }
                else {
                    quill.removeFormat(range, Quill.sources.USER);
                }
            },
            // 处理定制的插入值
            customInsertValue: function (value) {
                var quill = _this.getEditor(), range = quill.getSelection(), mValue = JSON.parse(value);
                if (!range)
                    return;
                if (mValue.editable === false) {
                    quill.insertText(range.index, mValue.value, {
                        customAttr: { editable: false }
                    });
                }
                else {
                    quill.insertText(range.index, mValue.value);
                }
            }
        };
        // 处理定制的超链接
        Object.keys(customLink).forEach(function (moduleName) {
            var that = _this;
            _this.handlers[moduleName + "Entry"] = function () {
                var _this = this;
                var range = this.quill.getSelection(), url = customLink[moduleName].url;
                if (range.length !== 0) {
                    // 附件不能设置超链接
                    var _a = this.quill.scroll.descendant(LinkBlot, range.index), link = _a[0], offset = _a[1];
                    if (link && link.domNode.dataset.qlLinkType == "attachment") {
                        return;
                    }
                    if (url) {
                        // 异步获取URL
                        if (Object.prototype.toString.call(url) == "[object Function]") {
                            var format = this.quill.getFormat(), prevValue = format && format.link && format.link.url;
                            url(function (value) {
                                _this.quill.format("link", {
                                    type: moduleName + "Entry",
                                    url: value
                                });
                            }, prevValue);
                        }
                        else {
                            this.quill.format("link", {
                                type: moduleName + "Entry",
                                url: url
                            });
                        }
                    }
                }
                else {
                    message.error(that.Locale.noSelectionText);
                }
            };
        });
        return _this;
    }
    RichEditor.getDerivedStateFromProps = function (nextProps, prevState) {
        var newState = {};
        if (nextProps.value !== prevState.lastValue) {
            newState["lastValue"] = newState["value"] = nextProps.value;
        }
        if (nextProps.loading !== prevState.loading) {
            newState["loading"] = nextProps.loading;
        }
        return newState;
    };
    RichEditor.prototype.componentDidMount = function () {
        var _this = this;
        /* eslint-disable react/no-did-mount-set-state */
        this.setState({
            toolbarCtner: findDOMNode(this.toolbarRef)
        }, function () {
            if (!_this.reactQuillRef)
                return;
            _this.reactQuillNode = findDOMNode(_this.reactQuillRef);
            _this.onBlurHandler = addEventListener(_this.reactQuillNode.querySelector(".ql-editor"), "blur", function () {
                if (!_this.reactQuillRef)
                    return;
                var quill = _this.reactQuillRef.getEditor(), range = quill.getSelection();
                if (typeof _this.props.onBlur == "function") {
                    _this.props.onBlur(range, "user", quill);
                }
            });
            // 编辑超链接
            _this.onClickActionHandler = addEventListener(_this.reactQuillNode.querySelector("a.ql-action"), "click", function (event) {
                if (!_this.reactQuillRef)
                    return;
                var quill = _this.reactQuillRef.getEditor();
                if (!quill)
                    return;
                var tooltip = quill.theme && quill.theme.tooltip;
                if (tooltip && _this.linkRange != null) {
                    tooltip.linkRange = _this.linkRange;
                    quill.setSelection(_this.linkRange);
                    _this.handlers.link(tooltip.preview.getAttribute("href"), true);
                }
                // if (this.root.classList.contains('ql-editing')) {
                //   this.save();
                // } else {
                //   this.edit('link', this.preview.textContent);
                // }
                event.preventDefault();
            });
            // 删除超链接
            _this.onClickRemoveHandler = addEventListener(_this.reactQuillNode.querySelector("a.ql-remove"), "click", function (event) {
                if (!_this.reactQuillRef)
                    return;
                var quill = _this.reactQuillRef.getEditor();
                if (!quill)
                    return;
                var tooltip = quill.theme && quill.theme.tooltip;
                if (tooltip && _this.linkRange != null) {
                    tooltip.linkRange = _this.linkRange;
                    quill.formatText(tooltip.linkRange, "link", false, "user");
                    quill.focus();
                    delete tooltip.linkRange;
                    _this.linkRange = null;
                }
                event.preventDefault();
            });
        });
        this.changePseudoElementText();
        setTimeout(function () {
            _this.changeEditorPlaceholder();
        }, 10);
        /* eslint-enable react/no-did-mount-set-state */
    };
    RichEditor.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        /* eslint-disable react/no-did-update-set-state */
        if (prevState.lastValue != this.state.lastValue &&
            this.props.supportFontTag) {
            this.setState({
                value: this.formatFontTag(this.state.lastValue)
            });
        }
        this.changePseudoElementText();
        this.changeEditorPlaceholder();
        /* eslint-enable react/no-did-update-set-state */
    };
    RichEditor.prototype.componentWillUnmount = function () {
        this.onBlurHandler && this.onBlurHandler.remove();
        this.onClickActionHandler && this.onClickActionHandler.remove();
        this.onClickRemoveHandler && this.onClickRemoveHandler.remove();
    };
    RichEditor.prototype.handleTooltipPosition = function (tooltip, reference) {
        var left = reference.left + reference.width / 2 - tooltip.root.offsetWidth / 2;
        // root.scrollTop should be 0 if scrollContainer !== root
        var top = reference.bottom + tooltip.quill.root.scrollTop;
        tooltip.root.style.left = left + "px";
        tooltip.root.style.top = top + "px";
        tooltip.root.classList.remove("ql-flip");
        var containerBounds = tooltip.boundsContainer.getBoundingClientRect();
        var rootBounds = tooltip.root.getBoundingClientRect();
        var shift = 0, offset = 15;
        if (rootBounds.right > containerBounds.right) {
            shift = containerBounds.right - rootBounds.right;
            tooltip.root.style.left = left + shift - offset + "px";
        }
        if (rootBounds.left < containerBounds.left) {
            shift = containerBounds.left - rootBounds.left;
            tooltip.root.style.left = left + shift + offset + "px";
        }
        if (rootBounds.bottom > containerBounds.bottom) {
            var height = rootBounds.bottom - rootBounds.top;
            var verticalShift = reference.bottom - reference.top + height;
            tooltip.root.style.top = top - verticalShift + "px";
            tooltip.root.classList.add("ql-flip");
        }
        return shift;
    };
    RichEditor.prototype.render = function () {
        var _this = this;
        var _a = this.state, loading = _a.loading, value = _a.value, showLinkModal = _a.showLinkModal, showVideoModal = _a.showVideoModal, showImageModal = _a.showImageModal, showAttachmentModal = _a.showAttachmentModal, toolbarCtner = _a.toolbarCtner, curVideoType = _a.curVideoType, defaultInputLink = _a.defaultInputLink, linkModalTitle = _a.linkModalTitle;
        var _b = this.props, className = _b.className, prefixCls = _b.prefixCls, toolbar = _b.toolbar, placeholder = _b.placeholder, customLink = _b.customLink, customInsertValue = _b.customInsertValue, resizable = _b.resizable, style = _b.style, getPopupContainer = _b.getPopupContainer, customEmoji = _b.customEmoji, insertImageTip = _b.insertImageTip, insertAttachmentTip = _b.insertAttachmentTip, insertVideoTip = _b.insertVideoTip, insertLinkTip = _b.insertLinkTip, onChange = _b.onChange, onSelectionChange = _b.onSelectionChange, popoverPlacement = _b.popoverPlacement, tooltipPlacement = _b.tooltipPlacement, imageDrop = _b.imageDrop, fileDrop = _b.fileDrop, customDropImage = _b.customDropImage, customDropFile = _b.customDropFile, pastePlainText = _b.pastePlainText, restProps = __rest(_b, ["className", "prefixCls", "toolbar", "placeholder", "customLink", "customInsertValue", "resizable", "style", "getPopupContainer", "customEmoji", "insertImageTip", "insertAttachmentTip", "insertVideoTip", "insertLinkTip", "onChange", "onSelectionChange", "popoverPlacement", "tooltipPlacement", "imageDrop", "fileDrop", "customDropImage", "customDropFile", "pastePlainText"]);
        delete restProps.customInsertImage;
        var cls = classNames("" + prefixCls, {
            resizable: resizable
        }, className);
        if (value) {
            restProps.value = value;
        }
        // 上传本地视频时Modal无确认和取消按钮
        var videoFooter = {};
        if (curVideoType == "video_local") {
            videoFooter["footer"] = null;
        }
        var moduleOpts = {
            toolbar: {
                container: toolbarCtner,
                handlers: this.handlers
            }
        };
        // fileDrop 为 true 时，使 imageDrop 失效
        if (fileDrop && customDropFile) {
            // customDropFile 自定义文件上传逻辑，必选
            moduleOpts["fileDrop"] = {
                customDropFile: customDropFile
            };
        }
        else if (imageDrop) {
            // customDropImage 不存在时，将图片文件转为 dataUrl 格式
            moduleOpts["imageDrop"] = {
                customDropImage: customDropImage
            };
        }
        if (pastePlainText) {
            moduleOpts["clipboard"] = {
                pastePlainText: true
            };
        }
        return (React.createElement(ConfigConsumer, { componentName: 'RichEditor' }, function (Locale) {
            _this.Locale = Locale;
            return (React.createElement("div", { className: cls, style: style, ref: function (el) { return (_this.editorCtner = el); } },
                React.createElement(Modal, { title: linkModalTitle || _this.Locale.linkModalTitle, className: prefixCls + "-link-modal", visible: showLinkModal, onOk: _this.handleLinkModalOk, onCancel: _this.handleLinkModalCancel, destroyOnClose: true },
                    React.createElement("span", { className: "text" }, Locale.HyperlinkAddress),
                    React.createElement(Input, { ref: function (el) { return (_this.linkModalInputRef = el); }, style: { width: "420px" }, defaultValue: defaultInputLink }),
                    insertLinkTip ? React.createElement("div", { className: "tip" }, insertLinkTip) : null),
                React.createElement(Modal, { title: Locale.insertPicture, className: prefixCls + "-image-modal", visible: showImageModal, footer: null, onCancel: _this.handleImageModalCancel },
                    React.createElement(Button, { type: "primary", onClick: _this.handlePickLocalImage }, Locale.selectLocalImage),
                    insertImageTip ? React.createElement("div", { className: "tip" }, Locale.inserImageTip || insertImageTip) : null),
                React.createElement(Modal, { title: Locale.insertAttachment, className: prefixCls + "-image-modal", visible: showAttachmentModal, footer: null, onCancel: _this.handleAttachmentModalCancel },
                    React.createElement(Button, { type: "primary", onClick: _this.handlePickLocalFile }, Locale.selectLocalFile),
                    insertAttachmentTip ? (React.createElement("div", { className: "tip" }, insertAttachmentTip)) : null),
                React.createElement(Modal, __assign({ title: Locale.insertVideo, className: prefixCls + "-video-modal", visible: showVideoModal }, videoFooter, { onOk: _this.handleVideoModalOk, onCancel: _this.handleVideoModalCancel }),
                    React.createElement(Radio.Group, { style: { marginBottom: 24 }, onChange: _this.handleVideoTypeChange, value: curVideoType },
                        _this.isSupportCustomInsertVideo ? (React.createElement(Radio, { value: "video_local" }, Locale.localVideo)) : null,
                        React.createElement(Radio, { value: "video_link" }, Locale.videoLink)),
                    curVideoType == "video_local" ? (React.createElement(React.Fragment, null,
                        React.createElement(Button, { style: { display: "block" }, type: "primary", onClick: _this.handlePickLocalVideo }, Locale.selectLocalVideo),
                        insertVideoTip ? (insertVideoTip === true
                            ? React.createElement("div", { className: "tip" }, React.createElement(React.Fragment, null,
                                React.createElement("span", null, Locale.rule1),
                                React.createElement("br", null),
                                React.createElement("span", null, Locale.rule2)))
                            : insertVideoTip) : null)) : (React.createElement(Input, { ref: function (el) { return (_this.videoModalInputRef = el); }, style: { width: "434px" }, placeholder: Locale.PleaseEnterTheVideolinkURL }))),
                React.createElement(CustomToolbar, { ref: function (el) { return (_this.toolbarRef = el); }, className: "editor-head", toolbar: toolbar, customEmoji: customEmoji, customLink: customLink, customInsertValue: customInsertValue, handleInsertEmoji: _this.handleInsertEmoji, handleFormatColor: _this.handleFormatColor, handleFormatBackground: _this.handleFormatBackground, handleFormatSize: _this.handleFormatSize, handleInsertValue: _this.handleInsertValue, popoverPlacement: popoverPlacement, tooltipPlacement: tooltipPlacement, getPopupContainer: getPopupContainer, getCurrentSize: _this.getCurrentSize, formatPainterActive: _this.state.formatPainterActive, saveSelectionFormat: _this.handleSaveSelectionFormat, unsaveSelectionFormat: _this.handleUnsaveSelectionFormat }),
                React.createElement(ReactQuill, __assign({}, restProps, { ref: function (el) { return (_this.reactQuillRef = el); }, bounds: _this.editorCtner, className: "editor-body", modules: moduleOpts, 
                    // placeholder={Locale.placeholder}
                    onChange: _this.handleChange, onSelectionChange: _this.handleSelectionChange })),
                loading ? (React.createElement(Spin, { style: {
                        position: "absolute",
                        width: "100%",
                        background: "rgba(255, 255, 255, 0.75)"
                    } })) : null));
        }));
    };
    RichEditor.defaultProps = {
        customEmoji: [],
        customLink: {},
        customInsertValue: {},
        insertImageTip: true,
        insertVideoTip: true,
        placeholder: '',
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
        getPopupContainer: function () { return document.body; }
    };
    return RichEditor;
}(Component));
polyfill(RichEditor);
export { Quill };
export default RichEditor;
