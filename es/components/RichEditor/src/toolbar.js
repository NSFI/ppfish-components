function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import emojiList from './emojiList.js'; // import ColorPicker from '../../ColorPicker/index.js';

import Tooltip from '../../Tooltip/index.js';
import Popover from '../../Popover/index.js';
import Tabs from '../../Tabs/index.js';
var TabPane = Tabs.TabPane;
var COLORS = ['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500', '#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF', '#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE', '#ffffff', '#cccccc', '#999999', '#666666', '#333333', '#000000'];
var defaultBackgrounds = [];
var defaultColors = [];
COLORS.forEach(function (color, index) {
  defaultBackgrounds.push(React.createElement("button", {
    className: "background-item",
    key: "default_background_" + index,
    value: color,
    title: color,
    style: {
      backgroundColor: color
    }
  }));
  defaultColors.push(React.createElement("button", {
    className: "color-item",
    key: "default_color_" + index,
    value: color,
    title: color,
    style: {
      backgroundColor: color
    }
  }));
});
var defaultSizes = ['32px', '24px', '18px', '16px', '13px', '12px'].map(function (size, index) {
  return React.createElement("button", {
    className: "size-item",
    key: "default_size_" + index,
    value: size,
    style: {
      fontSize: size
    }
  }, size);
});
var EMOJI_DEFAULT_WIDTH = 24;
var EMOJI_DEFAULT_HEIGHT = 24;
var EMOJI_COSTOM_WIDTH = 74;
var EMOJI_COSTOM_HEIGHT = 74;

var genEmoji = function genEmoji(data) {
  var colSize = 10,
      resPath = '//qiyukf.com/sdk/res/portrait/emoji/',
      tmpObj = {},
      result = [];
  data.forEach(function (item, index) {
    var grpIndex = parseInt(item.id / colSize, 10);

    if (typeof tmpObj[grpIndex] == 'undefined') {
      tmpObj[grpIndex] = [];
    }

    tmpObj[grpIndex].push(React.createElement("div", {
      className: "emoji-item-ctner",
      key: "emoji_" + grpIndex + "_" + index
    }, React.createElement("button", {
      className: "emoji-item " + item.className,
      value: JSON.stringify({
        type: "defaultEmoji",
        alt: item.title,
        src: resPath + item.imgName + ".png",
        width: EMOJI_DEFAULT_WIDTH,
        height: EMOJI_DEFAULT_HEIGHT,
        id: "emoticon_" + item.className.replace('-', '_')
      }),
      title: item.title
    })));
  });
  Object.keys(tmpObj).forEach(function (key) {
    result.push(React.createElement("div", {
      className: "emoji-row",
      key: "emoji_row_" + key
    }, tmpObj[key]));
  });
  return result;
};

var defaultEmojis = genEmoji(emojiList);

var genCustomEmoji = function genCustomEmoji(data) {
  if (!(data && data.length)) return;
  var sortedData = data.sort(function (a, b) {
    if (typeof a.id != "number" || typeof b.id != "number") {
      return 0;
    } else {
      return a.id - b.id;
    }
  });
  return sortedData.map(function (item, index) {
    return React.createElement("img", {
      key: "emoji_extend_" + index,
      className: "emoji-extend-item " + item.className,
      value: JSON.stringify({
        type: "customEmoji",
        alt: item.title,
        src: item.url,
        width: EMOJI_DEFAULT_WIDTH,
        height: EMOJI_DEFAULT_HEIGHT
      }),
      title: item.title,
      src: item.url,
      width: EMOJI_COSTOM_WIDTH,
      height: EMOJI_COSTOM_HEIGHT,
      alt: item.title
    });
  });
};

var CustomToolbar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(CustomToolbar, _PureComponent);

  function CustomToolbar(props) {
    var _this;

    _classCallCheck(this, CustomToolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomToolbar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getModuleHTML", function (mType, key) {
      var _this$props = _this.props,
          iconPrefix = _this$props.iconPrefix,
          handleInsertEmoji = _this$props.handleInsertEmoji,
          handleFormatBackground = _this$props.handleFormatBackground,
          handleFormatColor = _this$props.handleFormatColor,
          handleFormatSize = _this$props.handleFormatSize,
          handleInsertValue = _this$props.handleInsertValue,
          prefixCls = _this$props.prefixCls,
          customEmoji = _this$props.customEmoji,
          customLink = _this$props.customLink,
          customInsertValue = _this$props.customInsertValue,
          popoverPlacement = _this$props.popoverPlacement,
          tooltipPlacement = _this$props.tooltipPlacement,
          getPopupContainer = _this$props.getPopupContainer;
      var mValue = null,
          value = null,
          tooltip = null; // mType 对象格式：
      // {'align': 'right'}
      // {size: ['32px', '24px', '18px', '16px', '13px', '12px']}

      if (_typeof(mType) === 'object') {
        var obj = mType;
        mType = Object.keys(obj)[0];
        mValue = obj[mType];
      } // 处理定制的链接模块


      if (mType in customLink) {
        var _classNames;

        var customModule = customLink[mType] || {},
            cls = classNames('action custom-entry', (_classNames = {}, _defineProperty(_classNames, "ql-".concat(mType, "Entry"), true), _defineProperty(_classNames, "".concat(iconPrefix), true), _defineProperty(_classNames, "".concat(iconPrefix, "-richeditor-transfer"), true), _defineProperty(_classNames, "".concat(customModule.className), !!customModule.className), _classNames));
        value = React.createElement("button", {
          className: cls,
          key: key
        });

        if (customModule.title) {
          tooltip = customModule.title;
        }
      } else if (mType in customInsertValue) {
        // 处理定制的插入值
        var _customModule = customInsertValue[mType] || {},
            _cls = classNames('action custom-insert-value ql-customInsertValue', _defineProperty({}, "".concat(_customModule.className), !!_customModule.className)),
            _mValue = _customModule.option || [],
            editable = true,
            html = null;

        if (_customModule.editable != undefined) {
          editable = _customModule.editable;
        }

        if (Array.isArray(_mValue) && _mValue.length) {
          html = _mValue.map(function (item, index) {
            return React.createElement("button", {
              className: "insert-value-item",
              key: "insert_value_" + index,
              title: item.title,
              value: JSON.stringify({
                value: item.value,
                editable: item.editable != undefined ? item.editable : editable
              })
            }, item.title);
          });
        }

        var content = React.createElement("div", {
          className: "insert-value-con",
          onClick: handleInsertValue
        }, html);
        value = React.createElement(Popover, {
          trigger: "click",
          overlayClassName: "".concat(prefixCls, "-insert-value-popover"),
          content: content,
          title: null,
          key: key,
          placement: popoverPlacement,
          getPopupContainer: getPopupContainer
        }, React.createElement(Tooltip, {
          trigger: "hover",
          placement: tooltipPlacement,
          title: customInsertValue[mType].title ? customInsertValue[mType].title : null,
          mouseEnterDelay: 0.3
        }, React.createElement("div", {
          className: "item"
        }, React.createElement("div", {
          className: _cls
        }, React.createElement("button", {
          type: "button",
          "data-role": "customInsertValue",
          value: "",
          className: "ql-customInsertValue hide"
        })))));
        tooltip = customInsertValue[mType].title || '';
      } else {
        switch (mType) {
          case 'link':
            {
              var _classNames3;

              var linkCls = classNames('action ql-myLink', (_classNames3 = {}, _defineProperty(_classNames3, "".concat(iconPrefix), true), _defineProperty(_classNames3, "".concat(iconPrefix, "-richeditor-link"), true), _classNames3));
              value = React.createElement("button", {
                className: linkCls,
                key: key
              });
              tooltip = '超链接';
              break;
            }

          case 'bold':
            {
              var _classNames4;

              var boldCls = classNames('action ql-bold', (_classNames4 = {}, _defineProperty(_classNames4, "".concat(iconPrefix), true), _defineProperty(_classNames4, "".concat(iconPrefix, "-richeditor-bold"), true), _classNames4));
              value = React.createElement("button", {
                className: boldCls,
                key: key
              });
              tooltip = '粗体';
              break;
            }

          case 'italic':
            {
              var _classNames5;

              var italicCls = classNames('action ql-italic', (_classNames5 = {}, _defineProperty(_classNames5, "".concat(iconPrefix), true), _defineProperty(_classNames5, "".concat(iconPrefix, "-richeditor-tilt"), true), _classNames5));
              value = React.createElement("button", {
                className: italicCls,
                key: key
              });
              tooltip = '斜体';
              break;
            }

          case 'underline':
            {
              var _classNames6;

              var underlineCls = classNames('action ql-underline', (_classNames6 = {}, _defineProperty(_classNames6, "".concat(iconPrefix), true), _defineProperty(_classNames6, "".concat(iconPrefix, "-richeditor-underline"), true), _classNames6));
              value = React.createElement("button", {
                className: underlineCls,
                key: key
              });
              tooltip = '下划线';
              break;
            }

          case 'color':
            {
              var _classNames7;

              var colorCls = classNames('action custom-color', (_classNames7 = {}, _defineProperty(_classNames7, "".concat(iconPrefix), true), _defineProperty(_classNames7, "".concat(iconPrefix, "-richeditor-color"), true), _classNames7));
              var colorHTML = defaultColors;

              if (Array.isArray(mValue) && mValue.length) {
                colorHTML = mValue.map(function (color, index) {
                  return React.createElement("button", {
                    className: "color-item",
                    key: "custom_color_" + index,
                    value: color,
                    title: color,
                    style: {
                      backgroundColor: color
                    }
                  });
                });
              }

              var _content = React.createElement("div", {
                className: "color-con",
                onClick: handleFormatColor
              }, colorHTML);

              value = React.createElement(Popover, {
                trigger: "click",
                overlayClassName: "".concat(prefixCls, "-color-popover"),
                content: _content,
                title: null,
                key: key,
                placement: popoverPlacement,
                getPopupContainer: getPopupContainer
              }, React.createElement(Tooltip, {
                trigger: "hover",
                placement: tooltipPlacement,
                title: "\u6587\u5B57\u989C\u8272",
                mouseEnterDelay: 0.3
              }, React.createElement("div", {
                className: "item"
              }, React.createElement("div", {
                className: colorCls
              }, React.createElement("button", {
                type: "button",
                "data-role": "color",
                value: "",
                className: "ql-color hide"
              }))))); // value = <div className="item"><select className="ql-color" /></div>;
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

              tooltip = '文字颜色';
              break;
            }

          case 'align':
            {
              if (typeof mValue === 'string') {
                var _classNames8;

                var alignIconType = 'richeditor-align-lef';
                tooltip = '居左';

                if (mValue == 'right') {
                  alignIconType = 'richeditor-align-rig';
                  tooltip = '居右';
                } else if (mValue == 'center') {
                  alignIconType = 'richeditor-align-mid';
                  tooltip = '居中';
                } else if (mValue == 'justify') {
                  alignIconType = 'richeditor-align-all';
                  tooltip = '两端对齐';
                }

                var alignCls = classNames('action ql-align', (_classNames8 = {}, _defineProperty(_classNames8, "".concat(iconPrefix), true), _defineProperty(_classNames8, "".concat(iconPrefix, "-").concat(alignIconType), true), _classNames8));
                value = React.createElement("button", {
                  type: "button",
                  className: alignCls,
                  value: mValue,
                  key: key
                });
              } // else if (mValue instanceof Array && mValue.length) {
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

          case 'list':
            {
              var _classNames9;

              var listIconType = 'richeditor-list';
              tooltip = '无序列表';

              if (mValue == 'ordered') {
                listIconType = 'richeditor-numberlis';
                tooltip = '有序列表';
              }

              var listCls = classNames('action ql-list', (_classNames9 = {}, _defineProperty(_classNames9, "".concat(iconPrefix), true), _defineProperty(_classNames9, "".concat(iconPrefix, "-").concat(listIconType), true), _classNames9));
              value = React.createElement("button", {
                type: "button",
                className: listCls,
                value: mValue,
                key: key
              });
              break;
            }

          case 'emoji':
            {
              var _classNames10;

              var emojiCls = classNames('action custom-emoji', (_classNames10 = {}, _defineProperty(_classNames10, "".concat(iconPrefix), true), _defineProperty(_classNames10, "".concat(iconPrefix, "-richeditor-expressio"), true), _classNames10));

              var _content2 = React.createElement("div", {
                className: "emoji-ctner"
              }, React.createElement("div", {
                className: "emoji-con",
                onClick: handleInsertEmoji
              }, defaultEmojis));

              if (customEmoji && customEmoji.length) {
                var tabPanes = [React.createElement(TabPane, {
                  tab: "\u9ED8\u8BA4\u8868\u60C5",
                  key: "emoji_default"
                }, React.createElement("div", {
                  className: "emoji-ctner"
                }, React.createElement("div", {
                  className: "emoji-con",
                  onClick: handleInsertEmoji
                }, defaultEmojis)))];
                customEmoji.forEach(function (item, index) {
                  tabPanes.push(React.createElement(TabPane, {
                    tab: item.name,
                    key: 'custom_emoji_' + index
                  }, React.createElement("div", {
                    className: "emoji-ctner"
                  }, React.createElement("div", {
                    className: "emoji-con",
                    onClick: handleInsertEmoji
                  }, genCustomEmoji(item.data)))));
                });
                _content2 = React.createElement(Tabs, {
                  defaultActiveKey: "emoji_default"
                }, tabPanes);
              }

              value = React.createElement(Popover, {
                trigger: "click",
                overlayClassName: "".concat(prefixCls, "-emoji-popover"),
                content: _content2,
                title: null,
                key: key,
                placement: popoverPlacement,
                getPopupContainer: getPopupContainer
              }, React.createElement(Tooltip, {
                trigger: "hover",
                placement: tooltipPlacement,
                title: "\u63D2\u5165\u8868\u60C5",
                mouseEnterDelay: 0.3
              }, React.createElement("div", {
                className: "item"
              }, React.createElement("div", {
                className: emojiCls
              }, React.createElement("button", {
                type: "button",
                "data-role": "emoji",
                value: "",
                className: "ql-emoji hide"
              })))));
              tooltip = '插入表情';
              break;
            }

          case 'image':
            {
              var _classNames11;

              var imageCls = classNames('action ql-image', (_classNames11 = {}, _defineProperty(_classNames11, "".concat(iconPrefix), true), _defineProperty(_classNames11, "".concat(iconPrefix, "-richeditor-picture"), true), _classNames11));
              value = React.createElement("button", {
                className: imageCls,
                key: key
              });
              tooltip = '插入图片';
              break;
            }

          case 'size':
            {
              var _classNames12;

              var sizeCls = classNames('action custom-size', (_classNames12 = {}, _defineProperty(_classNames12, "".concat(iconPrefix), true), _defineProperty(_classNames12, "".concat(iconPrefix, "-richeditor-size"), true), _classNames12));
              var sizeHTML = defaultSizes;

              if (Array.isArray(mValue) && mValue.length) {
                sizeHTML = mValue.map(function (size, index) {
                  return React.createElement("button", {
                    className: "size-item",
                    key: "custom_size_" + index,
                    value: size,
                    style: {
                      fontSize: size
                    }
                  }, size);
                });
              }

              var _content3 = React.createElement("div", {
                className: "size-con",
                onClick: handleFormatSize
              }, sizeHTML);

              value = React.createElement(Popover, {
                trigger: "click",
                overlayClassName: "".concat(prefixCls, "-size-popover"),
                content: _content3,
                title: null,
                key: key,
                placement: popoverPlacement,
                getPopupContainer: getPopupContainer
              }, React.createElement(Tooltip, {
                trigger: "hover",
                placement: tooltipPlacement,
                title: "\u6587\u5B57\u5927\u5C0F",
                mouseEnterDelay: 0.3
              }, React.createElement("div", {
                className: "item"
              }, React.createElement("div", {
                className: sizeCls
              }, React.createElement("button", {
                type: "button",
                "data-role": "customSize",
                value: "",
                className: "ql-customAttr hide"
              })))));
              tooltip = '文字大小';
              break;
            }

          case 'clean':
            {
              var _classNames13;

              var cleanCls = classNames('action ql-clean', (_classNames13 = {}, _defineProperty(_classNames13, "".concat(iconPrefix), true), _defineProperty(_classNames13, "".concat(iconPrefix, "-richeditor-clear"), true), _classNames13));
              value = React.createElement("button", {
                className: cleanCls,
                key: key
              });
              tooltip = '清除格式';
              break;
            }

          case 'strike':
            {
              value = React.createElement("button", {
                className: "action ql-strike",
                key: key
              });
              tooltip = '删除线';
              break;
            }

          case 'blockquote':
            {
              value = React.createElement("button", {
                className: "action ql-blockquote",
                key: key
              });
              tooltip = '块引用';
              break;
            }

          case 'code-block':
            {
              value = React.createElement("button", {
                className: "action ql-code-block",
                key: key
              });
              tooltip = '代码块';
              break;
            }

          case 'script':
            {
              value = React.createElement("button", {
                type: "button",
                className: "action ql-script",
                value: mValue,
                key: key
              });

              if (mValue == 'super') {
                tooltip = '上脚标';
              } else {
                tooltip = '下脚标';
              }

              break;
            }

          case 'indent':
            {
              value = React.createElement("button", {
                type: "button",
                className: "action ql-indent",
                value: mValue,
                key: key
              });

              if (mValue == '-1') {
                tooltip = '减少缩进';
              } else {
                tooltip = '增加缩进';
              }

              break;
            }

          case 'direction':
            {
              value = React.createElement("button", {
                type: "button",
                className: "action ql-direction",
                value: mValue,
                key: key
              });
              tooltip = '文字方向';
              break;
            }

          case 'background':
            {
              var _classNames14;

              // value = <div className="item" key={key}><select className="ql-background" /></div>;
              var backgroundCls = classNames('action custom-background', (_classNames14 = {}, _defineProperty(_classNames14, "".concat(iconPrefix), true), _defineProperty(_classNames14, "".concat(iconPrefix, "-richeditor-fontbkcol"), true), _classNames14));
              var backgroundHTML = defaultBackgrounds;

              if (Array.isArray(mValue) && mValue.length) {
                backgroundHTML = mValue.map(function (color, index) {
                  return React.createElement("button", {
                    className: "background-item",
                    key: "custom_background_" + index,
                    value: color,
                    title: color,
                    style: {
                      backgroundColor: color
                    }
                  });
                });
              }

              var _content4 = React.createElement("div", {
                className: "background-con",
                onClick: handleFormatBackground
              }, backgroundHTML);

              value = React.createElement(Popover, {
                trigger: "click",
                overlayClassName: "".concat(prefixCls, "-background-popover"),
                content: _content4,
                title: null,
                key: key,
                placement: popoverPlacement,
                getPopupContainer: getPopupContainer
              }, React.createElement(Tooltip, {
                trigger: "hover",
                placement: tooltipPlacement,
                title: "\u80CC\u666F\u8272",
                mouseEnterDelay: 0.3
              }, React.createElement("div", {
                className: "item"
              }, React.createElement("div", {
                className: backgroundCls
              }, React.createElement("button", {
                type: "button",
                "data-role": "background",
                value: "",
                className: "ql-background hide"
              })))));
              tooltip = '背景色';
              break;
            }

          case 'video':
            {
              value = React.createElement("button", {
                type: "button",
                className: "action ql-video",
                value: mValue,
                key: key
              });
              tooltip = '插入视频';
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

          default:
            {
              break;
            }
        }
      }

      var mTypesHasPopover = ['background', 'color', 'emoji', 'size'];

      if (value && mTypesHasPopover.indexOf(mType) < 0 && !(mType in customInsertValue)) {
        value = React.createElement(Tooltip, {
          key: key,
          trigger: "hover",
          placement: tooltipPlacement,
          title: tooltip,
          mouseEnterDelay: 0.3
        }, React.createElement("div", {
          className: "item"
        }, value));
      }

      return value;
    });

    _defineProperty(_assertThisInitialized(_this), "genToolbar", function (toolbar) {
      var result = [];
      toolbar.forEach(function (item, index) {
        // 分组展示的项目
        if (item instanceof Array) {
          var grpItems = item.map(function (mType, subindex) {
            return _this.getModuleHTML(mType, 'toolbar_' + index + '_sub_' + subindex);
          });
          result.push(React.createElement("div", {
            className: "toolbar-grp",
            key: 'toolbar_' + index
          }, grpItems));
        } else {
          // 单个展示的项目
          result.push(_this.getModuleHTML(item, 'toolbar_' + index));
        }
      });
      return result;
    });

    return _this;
  }

  _createClass(CustomToolbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var emojiImg = new Image();
      emojiImg.src = '//ysf.nosdn.127.net/wwfttuqcqzrxhhyjacexkgalzzkwqagy';
    }
  }, {
    key: "render",
    // handleColorSelect = ({color}) => {
    //   let btn = this.toolbarCtner.querySelector('.ql-customColor');
    //   btn.setAttribute('value', color);
    //   btn.click();
    // };
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          style = _this$props2.style,
          toolbar = _this$props2.toolbar;
      return React.createElement("div", {
        className: className,
        ref: function ref(node) {
          return _this2.toolbarCtner = node;
        },
        style: style
      }, this.genToolbar(toolbar));
    }
  }]);

  return CustomToolbar;
}(PureComponent);

_defineProperty(CustomToolbar, "propTypes", {
  className: PropTypes.string,
  iconPrefix: PropTypes.string,
  prefixCls: PropTypes.string,
  popoverPlacement: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  style: PropTypes.object,
  toolbar: PropTypes.array,
  customEmoji: PropTypes.array,
  customLink: PropTypes.object,
  customInsertValue: PropTypes.object,
  getPopupContainer: PropTypes.func,
  handleInsertEmoji: PropTypes.func,
  handleFormatBackground: PropTypes.func,
  handleFormatColor: PropTypes.func,
  handleFormatSize: PropTypes.func,
  handleInsertValue: PropTypes.func
});

_defineProperty(CustomToolbar, "defaultProps", {
  className: '',
  iconPrefix: 'fishdicon',
  toolbar: [],
  customEmoji: [],
  customLink: {},
  customInsertValue: {},
  prefixCls: 'fishd-richeditor',
  popoverPlacement: 'top',
  tooltipPlacement: 'bottom',
  getPopupContainer: function getPopupContainer() {
    return document.body;
  }
});

export default CustomToolbar;