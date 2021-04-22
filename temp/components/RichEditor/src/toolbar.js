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
import * as React from 'react';
import { PureComponent } from 'react';
import classNames from 'classnames';
import emojiList from './emojiList';
// import ColorPicker from '../../ColorPicker/index.js';
import Tooltip from '../../Tooltip/index';
import Popover from '../../Popover/index';
import Tabs from '../../Tabs/index';
import Input from '../../Input/index';
import Icon from '../../Icon/index';
import ConfigConsumer from '../../Config/Consumer';
var TabPane = Tabs.TabPane;
var COLORS = [
    '#E53333', '#E56600', '#FF9900',
    '#64451D', '#DFC5A4', '#FFE500',
    '#009900', '#006600', '#99BB00',
    '#B8D100', '#60D978', '#00D5FF',
    '#337FE5', '#003399', '#4C33E5',
    '#9933E5', '#CC33E5', '#EE33EE',
    '#ffffff', '#cccccc', '#999999',
    '#666666', '#333333', '#000000',
];
var defaultBackgrounds = [];
var defaultColors = [];
COLORS.forEach(function (color, index) {
    defaultBackgrounds.push(React.createElement("button", { className: "background-item", key: "default_background_" + index, value: color, title: color, style: { backgroundColor: color } }));
    defaultColors.push(React.createElement("button", { className: "color-item", key: "default_color_" + index, value: color, title: color, style: { backgroundColor: color } }));
});
var EMOJI_DEFAULT_WIDTH = 24;
var EMOJI_DEFAULT_HEIGHT = 24;
var EMOJI_COSTOM_WIDTH = 74;
var EMOJI_COSTOM_HEIGHT = 74;
var genEmoji = function (data) {
    var colSize = 10, resPath = '//qiyukf.com/sdk/res/portrait/emoji/', tmpObj = {}, result = [];
    data.forEach(function (item, index) {
        var grpIndex = parseInt((item.id / colSize).toString(), 10);
        if (typeof tmpObj[grpIndex] == 'undefined') {
            tmpObj[grpIndex] = [];
        }
        tmpObj[grpIndex].push(React.createElement("div", { className: "emoji-item-ctner", key: "emoji_" + grpIndex + "_" + index },
            React.createElement("button", { className: "emoji-item " + item.className, value: JSON.stringify({
                    type: "defaultEmoji",
                    alt: item.title,
                    src: resPath + item.imgName + ".png",
                    width: EMOJI_DEFAULT_WIDTH,
                    height: EMOJI_DEFAULT_HEIGHT,
                    id: "emoticon_" + item.className.replace('-', '_')
                }), title: item.title })));
    });
    Object.keys(tmpObj).forEach(function (key) {
        result.push(React.createElement("div", { className: "emoji-row", key: "emoji_row_" + key }, tmpObj[key]));
    });
    return result;
};
var defaultEmojis = genEmoji(emojiList);
var genCustomEmoji = function (data) {
    if (!(data && data.length))
        return;
    var sortedData = data.sort(function (a, b) {
        if (typeof a.id != "number" || typeof b.id != "number") {
            return 0;
        }
        else {
            return a.id - b.id;
        }
    });
    return sortedData.map(function (item, index) {
        return (React.createElement("img", { key: "emoji_extend_" + index, className: "emoji-extend-item " + item.className, value: JSON.stringify({
                type: "customEmoji",
                alt: item.title,
                src: item.url,
                width: EMOJI_DEFAULT_WIDTH,
                height: EMOJI_DEFAULT_HEIGHT
            }), title: item.title, src: item.url, width: EMOJI_COSTOM_WIDTH, height: EMOJI_COSTOM_HEIGHT, alt: item.title }));
    });
};
var CustomToolbar = /** @class */ (function (_super) {
    __extends(CustomToolbar, _super);
    function CustomToolbar(props) {
        var _this = _super.call(this, props) || this;
        _this.handleIVSearchChange = function (e) {
            var value = e.target.value;
            _this.setState({
                curIVSearchValue: value ? value : ''
            });
        };
        _this.handleClearIVSearch = function () {
            _this.setState({
                curIVSearchValue: ''
            });
        };
        _this.getModuleHTML = function (mType, key) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            var _s = _this.props, iconPrefix = _s.iconPrefix, handleInsertEmoji = _s.handleInsertEmoji, handleFormatBackground = _s.handleFormatBackground, handleFormatColor = _s.handleFormatColor, handleInsertValue = _s.handleInsertValue, prefixCls = _s.prefixCls, customEmoji = _s.customEmoji, customLink = _s.customLink, customInsertValue = _s.customInsertValue, popoverPlacement = _s.popoverPlacement, tooltipPlacement = _s.tooltipPlacement, getPopupContainer = _s.getPopupContainer;
            var mValue = null, value = null, tooltip = null;
            var Locale = _this.Locale;
            // mType 对象格式：
            // {'align': 'right'}
            // {size: ['32px', '24px', '18px', '16px', '13px', '12px']}
            if (typeof mType === 'object') {
                var obj = mType;
                mType = Object.keys(obj)[0];
                mValue = obj[mType];
            }
            // 处理定制的链接模块
            if (mType in customLink) {
                var customModule = customLink[mType] || {}, cls = classNames('action custom-entry', (_a = {},
                    _a["ql-" + mType + "Entry"] = true,
                    _a["" + iconPrefix] = true,
                    _a[iconPrefix + "-richeditor-transfer"] = true,
                    _a["" + customModule.className] = !!customModule.className,
                    _a));
                value = React.createElement("button", { className: cls, key: key });
                if (customModule.title) {
                    tooltip = customModule.title;
                }
            }
            else if (mType in customInsertValue) { // 处理定制的插入值
                var customModule = customInsertValue[mType] || {}, cls = classNames('action custom-insert-value ql-customInsertValue', (_b = {},
                    _b["" + customModule.className] = !!customModule.className,
                    _b)), mValue_1 = customModule.option || [], editable_1 = true;
                if (customModule.editable != undefined) {
                    editable_1 = customModule.editable;
                }
                if (Array.isArray(mValue_1) && mValue_1.length) {
                    _this.curInsertValueList = mValue_1;
                }
                var filteredValueList = _this.curInsertValueList || [];
                if (customModule.showSearch && _this.curInsertValueList && _this.curInsertValueList.length) {
                    filteredValueList = _this.curInsertValueList.filter(function (item) {
                        return (item.title &&
                            item.title.toLowerCase().indexOf(_this.state.curIVSearchValue.toLowerCase()) > -1);
                    });
                }
                var content = (React.createElement("div", { className: "insert-value-con", onClick: handleInsertValue },
                    customModule.showSearch ?
                        React.createElement("div", { className: "insert-value-search" },
                            React.createElement(Input, { placeholder: customModule.searchPlaceholder ? customModule.searchPlaceholder : (Locale.enterKeyWordPlease), suffix: _this.state.curIVSearchValue ?
                                    React.createElement(Icon, { className: "insert-value-icon-clear", type: "close-circle-fill", onClick: _this.handleClearIVSearch }) : null, value: _this.state.curIVSearchValue, onChange: _this.handleIVSearchChange })) : null,
                    filteredValueList.length ?
                        filteredValueList.map(function (item, index) {
                            return (React.createElement("button", { className: "insert-value-item", key: "insert_value_" + index, title: item.title, value: JSON.stringify({
                                    value: item.value,
                                    editable: item.editable != undefined ? item.editable : editable_1
                                }) }, item.title));
                        }) : React.createElement("div", { className: "insert-value-empty" }, Locale.temporarilyNoData)));
                value = (React.createElement(Popover, { trigger: "click", overlayClassName: prefixCls + "-insert-value-popover", content: content, title: null, key: key, placement: popoverPlacement, getPopupContainer: getPopupContainer },
                    React.createElement(Tooltip, { trigger: "hover", placement: tooltipPlacement, title: customInsertValue[mType].title ? customInsertValue[mType].title : null, mouseEnterDelay: 0.3 },
                        React.createElement("div", { className: "item" },
                            React.createElement("div", { className: cls },
                                React.createElement("button", { type: "button", "data-role": "customInsertValue", value: "", className: "ql-customInsertValue hide" }))))));
                tooltip = customInsertValue[mType].title || '';
            }
            else {
                switch (mType) {
                    case 'link': {
                        var linkCls = classNames('action ql-link', (_c = {},
                            _c["" + iconPrefix] = true,
                            _c[iconPrefix + "-richeditor-link"] = true,
                            _c));
                        value = React.createElement("button", { className: linkCls, key: key });
                        tooltip = Locale.hyperlinks;
                        break;
                    }
                    case 'bold': {
                        var boldCls = classNames('action ql-bold', (_d = {},
                            _d["" + iconPrefix] = true,
                            _d[iconPrefix + "-richeditor-bold"] = true,
                            _d));
                        value = React.createElement("button", { className: boldCls, key: key });
                        tooltip = Locale.bold;
                        break;
                    }
                    case 'italic': {
                        var italicCls = classNames('action ql-italic', (_e = {},
                            _e["" + iconPrefix] = true,
                            _e[iconPrefix + "-richeditor-tilt"] = true,
                            _e));
                        value = React.createElement("button", { className: italicCls, key: key });
                        tooltip = Locale.italic;
                        break;
                    }
                    case 'underline': {
                        var underlineCls = classNames('action ql-underline', (_f = {},
                            _f["" + iconPrefix] = true,
                            _f[iconPrefix + "-richeditor-underline"] = true,
                            _f));
                        value = React.createElement("button", { className: underlineCls, key: key });
                        tooltip = Locale.underline;
                        break;
                    }
                    case 'color': {
                        var colorCls = classNames('action custom-color', (_g = {},
                            _g["" + iconPrefix] = true,
                            _g[iconPrefix + "-richeditor-color"] = true,
                            _g));
                        var colorHTML = defaultColors;
                        if (Array.isArray(mValue) && mValue.length) {
                            colorHTML = mValue.map(function (color, index) {
                                return (React.createElement("button", { className: "color-item", key: "custom_color_" + index, value: color, title: color, style: { backgroundColor: color } }));
                            });
                        }
                        var content = (React.createElement("div", { className: "color-con", onClick: handleFormatColor }, colorHTML));
                        value = (React.createElement(Popover, { trigger: "click", overlayClassName: prefixCls + "-color-popover", content: content, title: null, key: key, placement: popoverPlacement, getPopupContainer: getPopupContainer },
                            React.createElement(Tooltip, { trigger: "hover", placement: tooltipPlacement, title: Locale.fontColor, mouseEnterDelay: 0.3 },
                                React.createElement("div", { className: "item" },
                                    React.createElement("div", { className: colorCls },
                                        React.createElement("button", { type: "button", "data-role": "color", value: "", className: "ql-color hide" }))))));
                        // value = <div className="item"><select className="ql-color" /></div>;
                        // value = (
                        //   <div className="custom-color" key={key}>
                        //     <ColorPicker
                        //       className={"custom-color-picker"}
                        //       enableHistory={true}
                        //       enableAlpha={false}
                        //       onClose={this.handleColorSelect.bind(this)}
                        //     >
                        //       <button className="ql-customColor" />
                        //     </ColorPicker>
                        //   </div>
                        // );
                        tooltip = Locale.fontColor;
                        break;
                    }
                    case 'align': {
                        if (typeof mValue === 'string') {
                            var alignIconType = 'richeditor-align-lef';
                            tooltip = Locale.alignLeft;
                            if (mValue == 'right') {
                                alignIconType = 'richeditor-align-rig';
                                tooltip = Locale.alignRight;
                            }
                            else if (mValue == 'center') {
                                alignIconType = 'richeditor-align-mid';
                                tooltip = Locale.alignCenter;
                            }
                            else if (mValue == 'justify') {
                                alignIconType = 'richeditor-align-all';
                                tooltip = Locale.alignJustified;
                            }
                            var alignCls = classNames('action ql-align', (_h = {},
                                _h["" + iconPrefix] = true,
                                _h[iconPrefix + "-" + alignIconType] = true,
                                _h));
                            value = React.createElement("button", { type: "button", className: alignCls, value: mValue, key: key });
                        }
                        // else if (mValue instanceof Array && mValue.length) {
                        //   value = (
                        //     <div className="item" key={key}>
                        //       <select className="ql-align">
                        //         <option />
                        //         {
                        //           mValue.map((val, idx) => {
                        //             return <option key={key+'_option_'+idx} value={val} />;
                        //           })
                        //         }
                        //       </select>
                        //     </div>
                        //   );
                        //   tooltip = '对齐';
                        // } else {
                        //   value = <div className="item" key={key}><select className="ql-align" /></div>;
                        //   tooltip = '对齐';
                        // }
                        break;
                    }
                    case 'list': {
                        var listIconType = 'richeditor-list';
                        tooltip = Locale.unOrderedList;
                        if (mValue == 'ordered') {
                            listIconType = 'richeditor-numberlis';
                            tooltip = Locale.orderedList;
                        }
                        var listCls = classNames('action ql-list', (_j = {},
                            _j["" + iconPrefix] = true,
                            _j[iconPrefix + "-" + listIconType] = true,
                            _j));
                        value = React.createElement("button", { type: "button", className: listCls, value: mValue, key: key });
                        break;
                    }
                    case 'emoji': {
                        var emojiCls = classNames('action custom-emoji', (_k = {},
                            _k["" + iconPrefix] = true,
                            _k[iconPrefix + "-richeditor-expressio"] = true,
                            _k));
                        var content = (React.createElement("div", { className: "emoji-ctner" },
                            React.createElement("div", { className: "emoji-con", onClick: handleInsertEmoji }, defaultEmojis)));
                        if (customEmoji && customEmoji.length) {
                            var tabPanes_1 = [
                                React.createElement(TabPane, { tab: Locale.defaultEmoji, key: "emoji_default" },
                                    React.createElement("div", { className: "emoji-ctner" },
                                        React.createElement("div", { className: "emoji-con", onClick: handleInsertEmoji }, defaultEmojis)))
                            ];
                            customEmoji.forEach(function (item, index) {
                                tabPanes_1.push(React.createElement(TabPane, { tab: item.name, key: 'custom_emoji_' + index },
                                    React.createElement("div", { className: "emoji-ctner" },
                                        React.createElement("div", { className: "emoji-con", onClick: handleInsertEmoji }, genCustomEmoji(item.data)))));
                            });
                            content = (React.createElement(Tabs, { defaultActiveKey: "emoji_default" }, tabPanes_1));
                        }
                        value = (React.createElement(Popover, { trigger: "click", overlayClassName: prefixCls + "-emoji-popover", content: content, title: null, key: key, placement: popoverPlacement, getPopupContainer: getPopupContainer },
                            React.createElement(Tooltip, { trigger: "hover", placement: tooltipPlacement, title: Locale.insertEmoji, mouseEnterDelay: 0.3 },
                                React.createElement("div", { className: "item" },
                                    React.createElement("div", { className: emojiCls },
                                        React.createElement("button", { type: "button", "data-role": "emoji", value: "", className: "ql-emoji hide" }))))));
                        tooltip = Locale.insertEmoji;
                        break;
                    }
                    case 'image': {
                        var imageCls = classNames('action ql-image', (_l = {},
                            _l["" + iconPrefix] = true,
                            _l[iconPrefix + "-richeditor-picture"] = true,
                            _l));
                        value = React.createElement("button", { className: imageCls, key: key });
                        tooltip = Locale.insertPicture;
                        break;
                    }
                    case 'attachment': {
                        var cls = classNames('action ql-attachment', (_m = {},
                            _m["" + iconPrefix] = true,
                            _m[iconPrefix + "-richeditor-annexx"] = true,
                            _m));
                        value = React.createElement("button", { className: cls, key: key });
                        tooltip = Locale.insertAttachment;
                        break;
                    }
                    case 'size': {
                        var sizeCls = classNames('action custom-size', (_o = {},
                            _o["" + iconPrefix] = true,
                            _o[iconPrefix + "-richeditor-size"] = true,
                            _o));
                        _this.curSizeList = _this.defaultSizes;
                        if (Array.isArray(mValue) && mValue.length) {
                            _this.curSizeList = mValue;
                        }
                        var content = (React.createElement("div", { className: "size-con", key: "custom_size_content", onClick: _this.handleSizeItemClick }, _this.curSizeList && _this.curSizeList.map(function (size, index) {
                            var sizeItemCls = classNames('size-item', {
                                'active': size && (_this.state.curSize == size.trim())
                            });
                            return (React.createElement("button", { className: sizeItemCls, key: "custom_size_" + index, value: size, style: { fontSize: size } }, size));
                        })));
                        value = (React.createElement(Popover, { trigger: "click", overlayClassName: prefixCls + "-size-popover", content: content, title: null, key: key, visible: _this.state.sizePopoverVisible, placement: popoverPlacement, getPopupContainer: getPopupContainer, onVisibleChange: _this.handleSizePopoverVisibleChange },
                            React.createElement(Tooltip, { trigger: "hover", placement: tooltipPlacement, title: Locale.fontSize, mouseEnterDelay: 0.3 },
                                React.createElement("div", { className: "item" },
                                    React.createElement("div", { className: sizeCls })))));
                        tooltip = Locale.fontSize;
                        break;
                    }
                    case 'clean': {
                        var cleanCls = classNames('action ql-clean', (_p = {},
                            _p["" + iconPrefix] = true,
                            _p[iconPrefix + "-richeditor-clear"] = true,
                            _p));
                        value = React.createElement("button", { className: cleanCls, key: key });
                        tooltip = Locale.clearFormat;
                        break;
                    }
                    case 'formatPainter': {
                        var cls = classNames('action ql-formatPainter', (_q = {},
                            _q["" + iconPrefix] = true,
                            _q['ql-active'] = _this.props.formatPainterActive,
                            _q[iconPrefix + "-richeditor-brushx"] = true,
                            _q));
                        value = React.createElement("button", { className: cls, key: key, onClick: _this.handleFormatPainterClick });
                        tooltip = Locale.brushFormat;
                        break;
                    }
                    case 'strike': {
                        value = React.createElement("button", { className: "action ql-strike", key: key });
                        tooltip = Locale.strike;
                        break;
                    }
                    case 'blockquote': {
                        value = React.createElement("button", { className: "action ql-blockquote", key: key });
                        tooltip = Locale.blockquote;
                        break;
                    }
                    case 'code-block': {
                        value = React.createElement("button", { className: "action ql-code-block", key: key });
                        tooltip = Locale.codeBlock;
                        break;
                    }
                    case 'script': {
                        value = React.createElement("button", { type: "button", className: "action ql-script", value: mValue, key: key });
                        if (mValue == 'super') {
                            tooltip = Locale.superSciprt;
                        }
                        else {
                            tooltip = Locale.subScript;
                        }
                        break;
                    }
                    case 'indent': {
                        value = React.createElement("button", { type: "button", className: "action ql-indent", value: mValue, key: key });
                        if (mValue == '-1') {
                            tooltip = Locale.decreaseIndent;
                        }
                        else {
                            tooltip = Locale.increaseIndent;
                        }
                        break;
                    }
                    case 'direction': {
                        value = React.createElement("button", { type: "button", className: "action ql-direction", value: mValue, key: key });
                        tooltip = Locale.textDirection;
                        break;
                    }
                    case 'background': {
                        // value = <div className="item" key={key}><select className="ql-background" /></div>;
                        var backgroundCls = classNames('action custom-background', (_r = {},
                            _r["" + iconPrefix] = true,
                            _r[iconPrefix + "-richeditor-fontbkcol"] = true,
                            _r));
                        var backgroundHTML = defaultBackgrounds;
                        if (Array.isArray(mValue) && mValue.length) {
                            backgroundHTML = mValue.map(function (color, index) {
                                return (React.createElement("button", { className: "background-item", key: "custom_background_" + index, value: color, title: color, style: { backgroundColor: color } }));
                            });
                        }
                        var content = (React.createElement("div", { className: "background-con", onClick: handleFormatBackground }, backgroundHTML));
                        value = (React.createElement(Popover, { trigger: "click", overlayClassName: prefixCls + "-background-popover", content: content, title: null, key: key, placement: popoverPlacement, getPopupContainer: getPopupContainer },
                            React.createElement(Tooltip, { trigger: "hover", placement: tooltipPlacement, title: Locale.backgroundColor, mouseEnterDelay: 0.3 },
                                React.createElement("div", { className: "item" },
                                    React.createElement("div", { className: backgroundCls },
                                        React.createElement("button", { type: "button", "data-role": "background", value: "", className: "ql-background hide" }))))));
                        tooltip = Locale.backgroundColor;
                        break;
                    }
                    case 'video': {
                        value = React.createElement("button", { type: "button", className: "action ql-video", value: mValue, key: key });
                        tooltip = Locale.insertVideo;
                        break;
                    }
                    // case 'header': {
                    //   if (typeof mValue === 'string' || typeof mValue === 'number') {
                    //     value = <button type="button" className="ql-header" value={mValue} key={key}/>;
                    //   } else if (mValue instanceof Array && mValue.length){
                    //     value = (
                    //       // <div className="item" key={key}>
                    //         <select className="ql-header" defaultValue="normal">
                    //           {
                    //             mValue.map((val, idx) => <option key={key+'_option_'+idx} value={val} />)
                    //           }
                    //           <option value="normal" />
                    //         </select>
                    //       // </div>
                    //     );
                    //   }
                    //   tooltip = '标题';
                    //   break;
                    // }
                    // case 'font': {
                    //   value = <select className="ql-font" />;
                    //   tooltip = '字体';
                    //   break;
                    // }
                    default: {
                        break;
                    }
                }
            }
            var mTypesHasPopover = ['background', 'color', 'emoji', 'size'];
            if (value && (mTypesHasPopover.indexOf(mType) < 0) && !(mType in customInsertValue)) {
                value = (React.createElement(Tooltip, { key: key, trigger: "hover", placement: tooltipPlacement, title: tooltip, mouseEnterDelay: 0.3 },
                    React.createElement("div", { className: "item" }, value)));
            }
            return value;
        };
        _this.handleFormatPainterClick = function () {
            var _a = _this.props, formatPainterActive = _a.formatPainterActive, saveSelectionFormat = _a.saveSelectionFormat, unsaveSelectionFormat = _a.unsaveSelectionFormat;
            if (formatPainterActive) {
                unsaveSelectionFormat && unsaveSelectionFormat();
            }
            else {
                saveSelectionFormat && saveSelectionFormat();
            }
        };
        _this.handleSizeItemClick = function (e) {
            var handleFormatSize = _this.props.handleFormatSize, target = e.target;
            if (target.classList.value.indexOf('size-item') > -1 && target.hasAttribute('value')) {
                handleFormatSize && handleFormatSize(target.getAttribute('value'));
                _this.setState({
                    sizePopoverVisible: false
                });
            }
        };
        _this.genToolbar = function (toolbar) {
            var result = [];
            toolbar.forEach(function (item, index) {
                // 分组展示的项目
                if (item instanceof Array) {
                    var grpItems = item.map(function (mType, subindex) {
                        return _this.getModuleHTML(mType, 'toolbar_' + index + '_sub_' + subindex);
                    });
                    result.push(React.createElement("div", { className: "toolbar-grp", key: 'toolbar_' + index }, grpItems));
                }
                else { // 单个展示的项目
                    result.push(_this.getModuleHTML(item, 'toolbar_' + index));
                }
            });
            return result;
        };
        // handleColorSelect = ({color}) => {
        //   let btn = this.toolbarCtner.querySelector('.ql-customColor');
        //   btn.setAttribute('value', color);
        //   btn.click();
        // };
        _this.handleSizePopoverVisibleChange = function (visible) {
            _this.setState({
                sizePopoverVisible: visible
            });
            if (!visible)
                return;
            var getCurrentSize = _this.props.getCurrentSize, curSize = getCurrentSize && getCurrentSize();
            if (curSize != _this.state.curSize) {
                _this.setState({
                    curSize: curSize
                });
            }
        };
        _this.defaultSizes = ['32px', '24px', '20px', '18px', '16px', '14px', '13px', '12px'];
        _this.curInsertValueList = [];
        _this.state = {
            curSize: null,
            sizePopoverVisible: false,
            curIVSearchValue: ''
        };
        return _this;
    }
    CustomToolbar.prototype.componentDidMount = function () {
        var emojiImg = new Image();
        emojiImg.src = '//ysf.qiyukf.net/wwfttuqcqzrxhhyjacexkgalzzkwqagy';
    };
    CustomToolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, toolbar = _a.toolbar;
        return (React.createElement(ConfigConsumer, { componentName: "RichEditor" }, function (Locale) {
            _this.Locale = Locale;
            return (React.createElement("div", { className: className, ref: function (node) { return _this.toolbarCtner = node; }, style: style }, _this.genToolbar(toolbar)));
        }));
    };
    CustomToolbar.defaultProps = {
        className: '',
        iconPrefix: 'fishdicon',
        toolbar: [],
        customEmoji: [],
        customLink: {},
        customInsertValue: {},
        prefixCls: 'fishd-richeditor',
        popoverPlacement: 'top',
        tooltipPlacement: 'bottom',
        formatPainterActive: false,
        getPopupContainer: function () { return document.body; }
    };
    return CustomToolbar;
}(PureComponent));
export default CustomToolbar;
