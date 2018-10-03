import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import emojiList from './emojiList.js';
// import ColorPicker from '../../ColorPicker/index.js';
import Tooltip from '../../Tooltip/index.tsx';
import Popover from '../../Popover/index.tsx';

let defaultColors = [
  '#E53333', '#E56600', '#FF9900',
  '#64451D', '#DFC5A4', '#FFE500',
  '#009900', '#006600', '#99BB00',
  '#B8D100', '#60D978', '#00D5FF',
  '#337FE5', '#003399', '#4C33E5',
  '#9933E5', '#CC33E5', '#EE33EE',
  '#ffffff', '#cccccc', '#999999',
  '#666666', '#333333', '#000000',
].map(function(color, index) {
  return (
    <button
      className="color-item"
      key={"default_color_" + index}
      value={color}
      title={color}
      style={{backgroundColor: color}}
    />
  );
});

let defaultSizes = [
  '32px', '24px', '18px', '16px', '13px', '12px'
].map(function(size, index) {
  return (
    <button
      className="size-item"
      key={"default_size_" + index}
      value={size}
      style={{fontSize: size}}
    >
      {size}
    </button>
  );
});

let genEmoji = (data) => {
  let colSize = 10,
      resPath = '//qiyukf.com/sdk/res/portrait/emoji/',
      tmpObj = {},
      result = [];

  data.forEach((item, index) => {
    let grpIndex = parseInt(item.id / colSize, 10);

    if (typeof tmpObj[grpIndex] == 'undefined') {
      tmpObj[grpIndex] = [];
    }

    tmpObj[grpIndex].push(
      <div className="emoji-item-conter">
        <button
          key={"emoji_" + grpIndex + "_" + index}
          className={"emoji-item " + item.className}
          value={item.title + "__" + resPath + item.imgName + ".png"}
          title={item.title}
        />
      </div>
    );
  });

  Object.keys(tmpObj).forEach((key) => {
    result.push(
      <div className="emoji-row" key={"emoji_row_" + key}>
        { tmpObj[key] }
      </div>
    );
  });

  return result;
};
let defaultEmojis = genEmoji(emojiList);

let emojiData = {
  name: '表情包名称',
  data: [
    {
      id: 0,
      className: 'emoji-00',
      url: '//ysf.nosdn.127.net/xcdbmadptmoftklqvwwxzwlvlorxnzin',
      title: '[可爱]'
    },
    {
      id: 1,
      className: 'emoji-01',
      url: '//ysf.nosdn.127.net/ausunifcvhchdzbexjvxcswemqeojqdf',
      title: '[大笑]'
    },
    {
      id: 2,
      className: 'emoji-02',
      url: '//ysf.nosdn.127.net/ijonlnhjaleturyoittndfkpuhbchdkd',
      title: '[色]'
    }
  ]
};
let defaultEmojiWidth = 88;
let defaultEmojiHeight = 88;
let genEmojiBz = (emojiData) => {
  let data = emojiData.data,
      iWidth = defaultEmojiWidth,
      iHeight = defaultEmojiHeight;

  if (!(data && data.length)) return;

  let sortedData = data.sort((a, b) => {
    if (typeof a.id != "number" || typeof b.id != "number") {
      return 0;
    } else {
      return a.id - b.id;
    }
  });

  return sortedData.map((item, index) => {
    return (
      <img
        key={"emoji_bz_" + index}
        className={"emoji-item-custom " + item.className}
        value={item.title + "__" + item.url}
        title={item.title}
        src={item.url}
        width={iWidth}
        height={iHeight}
        alt={item.title}
      />
    );
  });
};
let bzEmojis = genEmojiBz(emojiData);

class CustomToolbar extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    iconPrefix: PropTypes.string,
    prefixCls: PropTypes.string,
    toolbar: PropTypes.array,
    customLink: PropTypes.object,
    getPopupContainer: PropTypes.func,
    handleInsertEmoji: PropTypes.func,
    handleFormatColor: PropTypes.func,
    handleFormatSize: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    iconPrefix: 'fishdicon',
    toolbar: [],
    customLink: {},
    prefixCls: 'fishd-richeditor',
    getPopupContainer: () => document.body
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let emojiImg = new Image();
    emojiImg.src = '//ysf.nosdn.127.net/wwfttuqcqzrxhhyjacexkgalzzkwqagy';
  }

  getModuleHTML = (mType, key, customLink) => {
    let {
      iconPrefix,
      handleInsertEmoji,
      handleFormatColor,
      handleFormatSize,
      prefixCls,
      getPopupContainer
    } = this.props;
    let mValue = null,
        value = null,
        tooltip = null;

    if (typeof mType === 'object') {
      let obj = mType;
      mType = Object.keys(obj)[0];
      mValue = obj[mType];
    }

    // 处理扩展的链接模块
    if (mType in customLink) {
      let entryClass = classNames('item custom-entry', {
        [`ql-${mType}Entry`]: true,
        [`${iconPrefix}`]: true,
        [`${iconPrefix}-richeditor-transfer`]: true
      }, customLink[mType].className);

      value = <button className={entryClass} key={key}/>;
      tooltip = customLink[mType].title || '';
    } else {
      switch(mType) {
        case 'link': {
          const linkCls = classNames('item ql-link', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-link`]: true
          });
          value = <button className={linkCls} key={key}/>;
          tooltip = '超链接';
          break;
        }
        case 'bold': {
          const boldCls = classNames('item ql-bold', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-bold`]: true
          });
          value = <button className={boldCls} key={key}/>;
          tooltip = '粗体';
          break;
        }
        case 'italic': {
          const italicCls = classNames('item ql-italic', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-tilt`]: true
          });
          value = <button className={italicCls} key={key}/>;
          tooltip = '斜体';
          break;
        }
        case 'underline': {
          const underlineCls = classNames('item ql-underline', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-underline`]: true
          });
          value = <button className={underlineCls} key={key}/>;
          tooltip = '下划线';
          break;
        }
        case 'color': {
          const colorCls = classNames('item custom-color', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-color`]: true
          });
          let colorHTML = defaultColors;
          if (Array.isArray(mValue) && mValue.length) {
            colorHTML = mValue.map(function(color, index) {
              return (
                <button
                  className="color-item"
                  key={"custom_color_" + index}
                  value={color}
                  title={color}
                  style={{backgroundColor: color}}
                />
              );
            });
          }
          let content = (
            <div className="color-con" onClick={handleFormatColor}>
              {colorHTML}
            </div>
          );

          value = (
            <Popover
              trigger="click"
              overlayClassName={`${prefixCls}-color-popover`}
              content={content}
              title={null}
              key={key}
              getPopupContainer={getPopupContainer}
            >
              <div className={colorCls}>
                <button type="button" data-role="color" value="" className="ql-color hide" />
              </div>
            </Popover>
          );

          // value = <div className="item"><select className="ql-color" /></div>;

          // value = (
          //   <div className="item custom-color" key={key}>
          //     <ColorPicker className={"custom-color-picker"} enableHistory={true} enableAlpha={false} onClose={this.handleColorSelect.bind(this)} >
          //       <button className="ql-customColor" />
          //     </ColorPicker>
          //   </div>
          // );
          tooltip = '文字颜色';
          break;
        }
        case 'align': {
          if (typeof mValue === 'string') {
            let alignIconType = 'richeditor-align-lef';
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

            const alignCls = classNames('item ql-align', {
              [`${iconPrefix}`]: true,
              [`${iconPrefix}-${alignIconType}`]: true
            });
            value = <button type="button" className={alignCls} value={mValue} key={key}/>;
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
          let listIconType = 'richeditor-list';
          tooltip = '无序列表';

          if (mValue == 'ordered') {
            listIconType = 'richeditor-numberlis';
            tooltip = '有序列表';
          }

          const listCls = classNames('item ql-list', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-${listIconType}`]: true
          });

          value = <button type="button" className={listCls} value={mValue} key={key}/>;
          break;
        }
        case 'emoji': {
          const emojiCls = classNames('item custom-emoji', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-expressio`]: true
          });
          let content = (
            <div className="custom-emoji-con" onClick={handleInsertEmoji}>
              { defaultEmojis }
            </div>
          );

          value = (
            <Popover
              trigger="click"
              overlayClassName={`${prefixCls}-emoji-popover`}
              content={content}
              title={null}
              key={key}
              getPopupContainer={getPopupContainer}
            >
              <div className={emojiCls}>
                <button type="button" data-role="emoji" value="" className="ql-emoji hide" />
              </div>
            </Popover>
          );
          tooltip = '插入表情';
          break;
        }
        case 'image': {
          const imageCls = classNames('item ql-image', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-picture`]: true
          });
          value = <button className={imageCls} key={key}/>;
          tooltip = '插入图片';
          break;
        }
        case 'size': {
          const sizeCls = classNames('item custom-size', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-size`]: true
          });
          let sizeHTML = defaultSizes;
          if (Array.isArray(mValue) && mValue.length) {
            sizeHTML = mValue.map(function(size, index) {
              return (
                <button
                  className="size-item"
                  key={"custom_size_" + index}
                  value={size}
                  style={{fontSize: size}}
                >
                  {size}
                </button>
              );
            });
          }
          let content = (
            <div className="size-con" onClick={handleFormatSize}>
              {sizeHTML}
            </div>
          );

          value = (
            <Popover
              trigger="click"
              overlayClassName={`${prefixCls}-size-popover`}
              content={content}
              title={null}
              key={key}
              getPopupContainer={getPopupContainer}
            >
              <div className={sizeCls} >
                <button type="button" data-role="customSize" value="" className="ql-customSize hide" />
              </div>
            </Popover>
          );

          tooltip = '文字大小';

          break;
        }
        case 'clean': {
          const cleanCls = classNames('item ql-clean', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-clear`]: true
          });

          value = <button className={cleanCls} key={key}/>;
          tooltip = '清除格式';
          break;
        }
        case 'strike': {
          value = <button className="item ql-strike" key={key}/>;
          tooltip = '删除线';
          break;
        }
        case 'blockquote': {
          value = <button className="item ql-blockquote" key={key}/>;
          tooltip = '块引用';
          break;
        }
        case 'code-block': {
          value = <button className="item ql-code-block" key={key}/>;
          tooltip = '代码块';
          break;
        }
        case 'script': {
          value = <button type="button" className="item ql-script" value={mValue} key={key}/>;
          if (mValue == 'super') {
            tooltip = '上脚标';
          } else {
            tooltip = '下脚标';
          }

          break;
        }
        case 'indent': {
          value = <button type="button" className="item ql-indent" value={mValue} key={key}/>;

          if (mValue == '-1') {
            tooltip = '减少缩进';
          } else {
            tooltip = '增加缩进';
          }

          break;
        }
        case 'direction': {
          value = <button type="button" className="item ql-direction" value={mValue} key={key} />;
          tooltip = '文字方向';
          break;
        }
        case 'background': {
          value = <div className="item" key={key}><select className="ql-background" /></div>;
          tooltip = '背景色';
          break;
        }
        // case 'header': {
        //   if (typeof mValue === 'string' || typeof mValue === 'number') {
        //     value = <button type="button" className="item ql-header" value={mValue} key={key}/>;
        //   } else if (mValue instanceof Array && mValue.length){
        //     value = (
        //       // <div className="item" key={key}>
        //         <select className="item ql-header" defaultValue="normal">
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
        //   value = <select className="item ql-font" />;
        //   tooltip = '字体';
        //   break;
        // }
        default: {
          break;
        }
      }
    }

    if (value) {
      value = <Tooltip key={key} placement="bottom" title={tooltip} mouseEnterDelay={2}>{value}</Tooltip>;
    }

    return value;
  };

  genToolbar = (toolbar, customLink) => {
    let result = [];

    toolbar.forEach((item, index) => {
      // 分组展示的项目
      if (item instanceof Array) {
        let grpItems = item.map((mType, subindex) => {
          return this.getModuleHTML(mType, 'toolbar_' + index + '_sub_' + subindex, customLink);
        });

        result.push(
          <div className="toolbar-grp" key={'toolbar_' + index}>
            { grpItems }
          </div>
        );
      } else {  // 单个展示的项目
        result.push(
          this.getModuleHTML(item, 'toolbar_' + index, customLink)
        );
      }
    });

    return result;
  };

  // handleColorSelect = ({color}) => {
  //   let btn = this.toolbarCtner.querySelector('.ql-customColor');
  //   btn.setAttribute('value', color);
  //   btn.click();
  // };

  render() {
    const { className, toolbar, customLink } = this.props;

    return (
      <div className={className} ref={node => this.toolbarCtner = node}>
        { this.genToolbar(toolbar, customLink) }
      </div>
    );
  }
}

export default CustomToolbar;
