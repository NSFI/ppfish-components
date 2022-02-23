import * as React from 'react';
import { PureComponent } from 'react';
import classNames from 'classnames';
import emojiList from './emojiList';
// import ColorPicker from '../../ColorPicker/index.js';
import Tooltip, { TooltipPlacement } from '../../Tooltip/index';
import Popover from '../../Popover/index';
import Tabs from '../../Tabs/index';
import Input from '../../Input/index';
import Icon from '../../Icon/index';
import popoEmojiList from "./popoEmojiList";

declare module 'react' {
  interface ImgHTMLAttributes<T> {
    value?: string;
  }
}

import { CustomToolbarProps, EmojiInferface, CustomToolbarState } from './interface';
import ConfigConsumer from '../../Config/Consumer';
import { LocaleProperties } from '../../Locale';

const TabPane = Tabs.TabPane;
const COLORS: string[] = [
  '#E53333', '#E56600', '#FF9900',
  '#64451D', '#DFC5A4', '#FFE500',
  '#009900', '#006600', '#99BB00',
  '#B8D100', '#60D978', '#00D5FF',
  '#337FE5', '#003399', '#4C33E5',
  '#9933E5', '#CC33E5', '#EE33EE',
  '#ffffff', '#cccccc', '#999999',
  '#666666', '#333333', '#000000',
];
let defaultBackgrounds: Array<JSX.Element> = [];
let defaultColors: Array<JSX.Element> = [];
COLORS.forEach(function (color: string, index: number) {
  defaultBackgrounds.push(
    <button
      className="background-item"
      key={"default_background_" + index}
      value={color}
      title={color}
      style={{ backgroundColor: color }}
    />

  );

  defaultColors.push(
    <button
      className="color-item"
      key={"default_color_" + index}
      value={color}
      title={color}
      style={{ backgroundColor: color }}
    />
  );
});

const EMOJI_DEFAULT_WIDTH = 24;
const EMOJI_DEFAULT_HEIGHT = 24;
const EMOJI_COSTOM_WIDTH = 74;
const EMOJI_COSTOM_HEIGHT = 74;

let genEmoji = (data: Array<EmojiInferface>) => {
  let colSize = 10,
    resPath = '//qiyukf.com/sdk/res/portrait/emoji/',
    tmpObj: { ['grpIndex']?: Array<any> } = {},
    result = [];

  data.forEach((item: EmojiInferface, index: number) => {
    let grpIndex = parseInt((item.id / colSize).toString(), 10);

    if (typeof tmpObj[grpIndex] == 'undefined') {
      tmpObj[grpIndex] = [];
    }

    tmpObj[grpIndex].push(
      <div className="emoji-item-ctner" key={"emoji_" + grpIndex + "_" + index} >
        <button
          className={"emoji-item " + item.className}
          value={
            JSON.stringify({
              type: "defaultEmoji",
              alt: item.title,
              src: resPath + item.imgName + ".png",
              width: EMOJI_DEFAULT_WIDTH,
              height: EMOJI_DEFAULT_HEIGHT,
              id: "emoticon_" + item.className.replace('-', '_')
            })
          }
          title={item.title}
        />
      </div>
    );
  });

  Object.keys(tmpObj).forEach((key) => {
    result.push(
      <div className="emoji-row" key={"emoji_row_" + key}>
        {tmpObj[key]}
      </div>
    );
  });

  return result;
};
let genPoPoEmoji = (data: Array<EmojiInferface>) => {
  let colSize = 10,
    tmpObj: { ['grpIndex']?: Array<any> } = {},
    result = [];

  data.forEach((item: EmojiInferface, index: number) => {
    // 这里从 1 开始
    let grpIndex = parseInt(((item.id-1) / colSize).toString(), 10);

    if (typeof tmpObj[grpIndex] == 'undefined') {
      tmpObj[grpIndex] = [];
    }

    tmpObj[grpIndex].push(
      <div className="emoji-item-ctner" key={"popo-emoji_" + grpIndex + "_" + index} >
        <button
          className={"popo-emoji-item " + item.className}
          value={
            JSON.stringify({
              type: "defaultEmoji",
              alt: item.title,
              src: item.url,
              width: EMOJI_DEFAULT_WIDTH,
              height: EMOJI_DEFAULT_HEIGHT,
              id: "emoticon_" + item.className.replace('-', '_')
            })
          }
          title={item.title}
        />
      </div>
    );
  });

  Object.keys(tmpObj).forEach((key) => {
    result.push(
      <div className="emoji-row" key={"emoji_row_" + key}>
        {tmpObj[key]}
      </div>
    );
  });

  return result;
};

let defaultEmojis = genEmoji(emojiList);
let popoEmojis = genPoPoEmoji(popoEmojiList);


let genCustomEmoji = (data: Array<EmojiInferface>) => {
  if (!(data && data.length)) return;

  let sortedData = data.sort((a, b) => {
    if (typeof a.id != "number" || typeof b.id != "number") {
      return 0;
    } else {
      return a.id - b.id;
    }
  });

  return sortedData.map((item: EmojiInferface, index: number) => {
    return (
      <img
        key={"emoji_extend_" + index}
        className={"emoji-extend-item " + item.className}
        value={
          JSON.stringify({
            type: "customEmoji",
            alt: item.title,
            src: item.url,
            width: EMOJI_DEFAULT_WIDTH,
            height: EMOJI_DEFAULT_HEIGHT
          })
        }
        title={item.title}
        src={item.url}
        width={EMOJI_COSTOM_WIDTH}
        height={EMOJI_COSTOM_HEIGHT}
        alt={item.title}
      />
    );
  });
};

class CustomToolbar extends PureComponent<CustomToolbarProps, CustomToolbarState>{
  static defaultProps = {
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
    getPopupContainer: () => document.body
  };
  private defaultSizes: Array<string>
  private defaultLineHeight: Array<string>
  private curSizeList: Array<string>
  private curInsertValueList: Array<any>
  private Locale: LocaleProperties['RichEditor']
  public toolbarCtner: HTMLDivElement

  constructor (props: CustomToolbarProps) {
    super(props);

    this.defaultSizes = ['32px', '24px', '20px', '18px', '16px', '14px', '13px', '12px'];
    this.defaultLineHeight = ['1', '1.15', '1.42', '1.5','2.0','2.5' ,'3.0'];
    this.curInsertValueList = [];
    this.state = {
      curSize: null,
      sizePopoverVisible: false,
      curLineHeight: '',
      lineHeightPopoverVisible: false,
      curIVSearchValue: ''
    };
  }

  componentDidMount() {
    let emojiImg = new Image();
    emojiImg.src = '//ysf.qiyukf.net/wwfttuqcqzrxhhyjacexkgalzzkwqagy';
    let popoEmojiImg = new Image();
    popoEmojiImg.src = '//res.qiyukf.net/popoEmoji/1db9cdcfa8d23a0d22e0dc49b3fa7670';
  }

  handleIVSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    this.setState({
      curIVSearchValue: value ? value : ''
    });
  };

  handleClearIVSearch = () => {
    this.setState({
      curIVSearchValue: ''
    });
  };

  getModuleHTML = (mType: any, key: any) => {
    let {
      iconPrefix,
      handleInsertEmoji,
      handleFormatBackground,
      handleFormatColor,
      handleInsertValue,
      prefixCls,
      customEmoji,
      customLink,
      customInsertValue,
      popoverPlacement,
      tooltipPlacement,
      getPopupContainer,
      fullScreen
    } = this.props;

    // 兼容全屏时向上显示看不见的问题
    popoverPlacement = fullScreen ? 'bottom' : popoverPlacement

    let mValue: any = null, value: JSX.Element | null = null, tooltip: string | null = null;

    const { Locale } = this;
    // mType 对象格式：
    // {'align': 'right'}
    // {size: ['32px', '24px', '18px', '16px', '13px', '12px']}
    if (typeof mType === 'object') {
      let obj = mType;
      mType = Object.keys(obj)[0];
      mValue = obj[mType];
    }

    // 处理定制的链接模块
    if (mType in customLink) {
      let customModule = customLink[mType] || {},
        cls = classNames('action custom-entry', {
          [`ql-${mType}Entry`]: true,
          [`${iconPrefix}`]: true,
          [`${iconPrefix}-richeditor-transfer`]: true,
          [`${customModule.className}`]: !!customModule.className
        });

      value = <button className={cls} key={key} />;
      if (customModule.title) {
        tooltip = customModule.title;
      }
    } else if (mType in customInsertValue) {  // 处理定制的插入值
      let customModule = customInsertValue[mType] || {},
        cls = classNames('action custom-insert-value ql-customInsertValue', {
          [`${customModule.className}`]: !!customModule.className
        }),
        mValue = customModule.option || [],
        editable = true;

      if (customModule.editable != undefined) {
        editable = customModule.editable;
      }

      if (Array.isArray(mValue) && mValue.length) {
        this.curInsertValueList = mValue;
      }

      let filteredValueList = this.curInsertValueList || [];
      if (customModule.showSearch && this.curInsertValueList && this.curInsertValueList.length) {
        filteredValueList = this.curInsertValueList.filter((item) => {
          return (
            item.title &&
            item.title.toLowerCase().indexOf(this.state.curIVSearchValue.toLowerCase()) > -1
          );
        });
      }

      let content: JSX.Element = (
        <div className="insert-value-con" onClick={handleInsertValue}>
          {
            customModule.showSearch ?
              <div className="insert-value-search">
                <Input
                  placeholder={customModule.searchPlaceholder ? customModule.searchPlaceholder :
                    (Locale.enterKeyWordPlease)}
                  suffix={
                    this.state.curIVSearchValue ?
                      <Icon
                        className="insert-value-icon-clear"
                        type="close-circle-fill"
                        onClick={this.handleClearIVSearch}
                      /> : null
                  }
                  value={this.state.curIVSearchValue}
                  onChange={this.handleIVSearchChange}
                />
              </div> : null
          }
          {
            filteredValueList.length ?
              filteredValueList.map(function (item, index) {
                return (
                  <button
                    className="insert-value-item"
                    key={"insert_value_" + index}
                    title={item.title}
                    value={
                      JSON.stringify({
                        value: item.value,
                        editable: item.editable != undefined ? item.editable : editable
                      })
                    }
                  >
                    {item.title}
                  </button>
                );
              }) : <div className="insert-value-empty">{Locale.temporarilyNoData}</div>
          }
        </div>
      );

      value = (
        <Popover
          trigger="click"
          overlayClassName={`${prefixCls}-insert-value-popover`}
          content={content}
          title={null}
          key={key}
          placement={popoverPlacement}
          getPopupContainer={getPopupContainer as (triggerNode: Element) => HTMLElement}
        >
          <Tooltip
            trigger="hover"
            placement={tooltipPlacement}
            title={customInsertValue[mType].title ? customInsertValue[mType].title : null}
            mouseEnterDelay={0.3}
          >
            <div className="item">
              <div className={cls}>
                <button
                  type="button"
                  data-role="customInsertValue"
                  value=""
                  className="ql-customInsertValue hide"
                />
              </div>
            </div>
          </Tooltip>
        </Popover>
      );

      tooltip = customInsertValue[mType].title || '';
    } else {
      switch (mType) {
        case 'link': {
          const linkCls = classNames('action ql-link', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-link`]: true
          });
          value = <button className={linkCls} key={key} />;
          tooltip = Locale.hyperlinks;
          break;
        }
        case 'bold': {
          const boldCls = classNames('action ql-bold', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-bold`]: true
          });
          value = <button className={boldCls} key={key} />;
          tooltip = Locale.bold;
          break;
        }
        case 'italic': {
          const italicCls = classNames('action ql-italic', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-tilt`]: true
          });
          value = <button className={italicCls} key={key} />;
          tooltip = Locale.italic;
          break;
        }
        case 'underline': {
          const underlineCls = classNames('action ql-underline', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-underline`]: true
          });
          value = <button className={underlineCls} key={key} />;
          tooltip = Locale.underline;
          break;
        }
        case 'color': {
          const colorCls = classNames('action custom-color', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-color`]: true
          });
          let colorHTML = defaultColors;
          if (Array.isArray(mValue) && mValue.length) {
            colorHTML = mValue.map(function (color, index) {
              return (
                <button
                  className="color-item"
                  key={"custom_color_" + index}
                  value={color}
                  title={color}
                  style={{ backgroundColor: color }}
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
              placement={popoverPlacement}
              getPopupContainer={getPopupContainer}
            >
              <Tooltip
                trigger="hover"
                placement={tooltipPlacement}
                title={Locale.fontColor}
                mouseEnterDelay={0.3}
              >
                <div className="item">
                  <div className={colorCls}>
                    <button type="button" data-role="color" value="" className="ql-color hide" />
                  </div>
                </div>
              </Tooltip>
            </Popover>
          );

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
            let alignIconType = 'richeditor-align-lef';
            tooltip = Locale.alignLeft;

            if (mValue == 'right') {
              alignIconType = 'richeditor-align-rig';
              tooltip = Locale.alignRight;
            } else if (mValue == 'center') {
              alignIconType = 'richeditor-align-mid';
              tooltip = Locale.alignCenter;
            } else if (mValue == 'justify') {
              alignIconType = 'richeditor-align-all';
              tooltip = Locale.alignJustified;
            }

            const alignCls = classNames('action ql-align', {
              [`${iconPrefix}`]: true,
              [`${iconPrefix}-${alignIconType}`]: true
            });
            value = <button type="button" className={alignCls} value={mValue} key={key} />;
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
          tooltip = Locale.unOrderedList;

          if (mValue == 'ordered') {
            listIconType = 'richeditor-numberlis';
            tooltip = Locale.orderedList;
          }

          const listCls = classNames('action ql-list', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-${listIconType}`]: true
          });

          value = <button type="button" className={listCls} value={mValue} key={key} />;
          break;
        }
        case 'emoji': {
          const emojiCls = classNames('action custom-emoji', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-expressio`]: true
          });
          let tabPanes = [
            <TabPane tab={Locale.defaultEmoji} key="emoji_default">
              <div className="emoji-ctner">
                <div className="emoji-con" onClick={handleInsertEmoji}>
                  {popoEmojis}
                </div>
              </div>
            </TabPane>,
            <TabPane tab={Locale.emojiEmoji} key="emoji_default_1">
              <div className="emoji-ctner">
                <div className="emoji-con" onClick={handleInsertEmoji}>
                  {defaultEmojis}
                </div>
              </div>
            </TabPane>
          ];
          if (customEmoji && customEmoji.length) {
            customEmoji.forEach((item, index) => {
              tabPanes.push(
                <TabPane tab={item.name} key={'custom_emoji_' + index}>
                  <div className="emoji-ctner">
                    <div className="emoji-con" onClick={handleInsertEmoji}>
                      {genCustomEmoji(item.data)}
                    </div>
                  </div>
                </TabPane>
              );
            });
          }
          let content = (
            <Tabs defaultActiveKey="emoji_default">
              {tabPanes}
            </Tabs>
          );

          value = (
            <Popover
              trigger="click"
              overlayClassName={`${prefixCls}-emoji-popover`}
              content={content}
              title={null}
              key={key}
              placement={popoverPlacement}
              getPopupContainer={getPopupContainer}
            >
              <Tooltip
                trigger="hover"
                placement={tooltipPlacement}
                title={Locale.insertEmoji}
                mouseEnterDelay={0.3}
              >
                <div className="item">
                  <div className={emojiCls}>
                    <button type="button" data-role="emoji" value="" className="ql-emoji hide" />
                  </div>
                </div>
              </Tooltip>
            </Popover>
          );
          tooltip = Locale.insertEmoji;
          break;
        }
        case 'image': {
          const imageCls = classNames('action ql-image', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-picture`]: true
          });
          value = <button className={imageCls} key={key} />;
          tooltip = Locale.insertPicture;
          break;
        }
        case 'attachment': {
          const cls = classNames('action ql-attachment', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-annexx`]: true
          });
          value = <button className={cls} key={key} />;
          tooltip = Locale.insertAttachment;
          break;
        }
        case 'size': {
          const sizeCls = classNames('action custom-size', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-size`]: true
          });

          this.curSizeList = this.defaultSizes;
          if (Array.isArray(mValue) && mValue.length) {
            this.curSizeList = mValue;
          }
          let content = (
            <div className="size-con" key="custom_size_content" onClick={this.handleSizeItemClick}>
              {
                this.curSizeList && this.curSizeList.map((size, index) => {
                  const sizeItemCls = classNames('size-item', {
                    'active': size && (this.state.curSize == size.trim())
                  });

                  return (
                    <button
                      className={sizeItemCls}
                      key={"custom_size_" + index}
                      value={size}
                      style={{ fontSize: size }}
                    >
                      {size}
                    </button>
                  );
                })
              }
            </div>
          );

          value = (
            <Popover
              trigger="click"
              overlayClassName={`${prefixCls}-size-popover`}
              content={content}
              title={null}
              key={key}
              visible={this.state.sizePopoverVisible}
              placement={popoverPlacement}
              getPopupContainer={getPopupContainer}
              onVisibleChange={this.handleSizePopoverVisibleChange}
            >
              <Tooltip
                trigger="hover"
                placement={tooltipPlacement}
                title={Locale.fontSize}
                mouseEnterDelay={0.3}
              >
                <div className="item">
                  <div className={sizeCls} />
                </div>
              </Tooltip>
            </Popover>
          );

          tooltip = Locale.fontSize;

          break;
        }
        case 'clean': {
          const cleanCls = classNames('action ql-clean', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-clear`]: true
          });

          value = <button className={cleanCls} key={key} />;
          tooltip = Locale.clearFormat;
          break;
        }
        case 'formatPainter': {
          const cls = classNames('action ql-formatPainter', {
            [`${iconPrefix}`]: true,
            'ql-active': this.props.formatPainterActive,
            [`${iconPrefix}-richeditor-brushx`]: true
          });

          value = <button className={cls} key={key} onClick={this.handleFormatPainterClick} />;
          tooltip = Locale.brushFormat;
          break;
        }
        case 'strike': {
          value = <button className="action ql-strike" key={key} />;
          tooltip = Locale.strike;
          break;
        }
        case 'blockquote': {
          value = <button className="action ql-blockquote" key={key} />;
          tooltip = Locale.blockquote;
          break;
        }
        case 'code-block': {
          value = <button className="action ql-code-block" key={key} />;
          tooltip = Locale.codeBlock;
          break;
        }
        case 'script': {
          value = <button type="button" className="action ql-script" value={mValue} key={key} />;
          if (mValue == 'super') {
            tooltip = Locale.superSciprt;
          } else {
            tooltip = Locale.subScript;
          }

          break;
        }
        case 'indent': {
          value = <button type="button" className="action ql-indent" value={mValue} key={key} />;

          if (mValue == '-1') {
            tooltip = Locale.decreaseIndent;
          } else {
            tooltip = Locale.increaseIndent;
          }

          break;
        }
        case 'direction': {
          value = <button type="button" className="action ql-direction" value={mValue} key={key} />;
          tooltip = Locale.textDirection;
          break;
        }
        case 'background': {
          // value = <div className="item" key={key}><select className="ql-background" /></div>;
          const backgroundCls = classNames('action custom-background', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-fontbkcol`]: true
          });
          let backgroundHTML = defaultBackgrounds;
          if (Array.isArray(mValue) && mValue.length) {
            backgroundHTML = mValue.map(function (color, index) {
              return (
                <button
                  className="background-item"
                  key={"custom_background_" + index}
                  value={color}
                  title={color}
                  style={{ backgroundColor: color }}
                />
              );
            });
          }
          let content = (
            <div className="background-con" onClick={handleFormatBackground}>
              {backgroundHTML}
            </div>
          );

          value = (
            <Popover
              trigger="click"
              overlayClassName={`${prefixCls}-background-popover`}
              content={content}
              title={null}
              key={key}
              placement={popoverPlacement}
              getPopupContainer={getPopupContainer}
            >
              <Tooltip
                trigger="hover"
                placement={tooltipPlacement}
                title={Locale.backgroundColor}
                mouseEnterDelay={0.3}
              >
                <div className="item">
                  <div className={backgroundCls}>
                    <button type="button" data-role="background" value="" className="ql-background hide" />
                  </div>
                </div>
              </Tooltip>
            </Popover>
          );

          tooltip = Locale.backgroundColor;
          break;
        }
        case 'video': {
          value = <button type="button" className="action ql-video" value={mValue} key={key} />;
          tooltip = Locale.insertVideo;
          break;
        }
        case 'fullscreen': {
          const fullScreenCls = classNames('action ql-fullscreen', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-video-shrink`]: fullScreen,
            [`${iconPrefix}-video-fullscreen`]: !fullScreen,
          });
          value = <button type="button" className={fullScreenCls} value={mValue} key={'fullScreen'} />;
          tooltip = fullScreen ? Locale.exitFullScreen : Locale.fullScreen;
          break;
        }
        // case 'header': {
        //  // 使用原生quill的样式, 弹窗可能会有些不一样, 先不开放此功能, 还有一点是多语言比较麻烦
        //   // [{ header: [ 1,2, 3, 4 ,5, 6, false] }]
        //   if (typeof mValue === 'string' || typeof mValue === 'number') {
        //     value = <button type="button" className="ql-header" value={mValue} key={key}/>;
        //   } else if (mValue instanceof Array && mValue.length){
        //     value = (
        //       <div className="item toolbar-header-item" key={key} >
        //         <select className="ql-header" defaultValue="false">
        //           {
        //             mValue.map((val, idx) => <option key={key+'_option_'+idx} value={val} />)
        //           }
        //         </select>
        //       </div>
        //     );
        //   }
        //   tooltip = '标题';
        //   break;
        // }
        case 'undo' :{
          value = (<button type="button" className={`action ql-undo ${iconPrefix} ${iconPrefix}-richeditor-undo`}
                          value={'undo'} key={key}/>);
          tooltip = Locale.undo;
          break;
        }
        case 'redo': {
          value = (<button type="button" className={`action ql-redo ${iconPrefix} ${iconPrefix}-richeditor-redo`}
                          value={'redo'} key={key}/>);
          tooltip = Locale.redo;
          break;
        }
        case 'lineHeight': {
          const lineHeightCls = classNames('action custom-lineHeight', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-line-height`]: true
          });

          if(Array.isArray(mValue)) {
            this.defaultLineHeight = mValue || this.defaultLineHeight
          }

          let content = (
            <div className="line-height-con" key="line-height_content" onClick={this.handleLineHeightItemClick}>
              {
                this.defaultLineHeight && this.defaultLineHeight.map((height, index) => {
                  const sizeItemCls = classNames('line-height-item', {
                    'active': height && (Number(this.state.curLineHeight) == Number(height))
                  });

                  return (
                    <button
                      className={sizeItemCls}
                      key={"line-height_" + index}
                      value={height}
                    >
                      {height=='1.42'  ? Locale.defaultLineHeight : height}
                    </button>
                  );
                })
              }
            </div>
          );

          value = (
            <Popover
              trigger="click"
              visible={this.state.lineHeightPopoverVisible}
              overlayClassName={`${prefixCls}-line-height-popover`}
              content={content}
              title={null}
              key={key}
              placement={popoverPlacement}
              getPopupContainer={getPopupContainer}
              onVisibleChange={this.handleLineHeightPopoverVisibleChange}
            >
               <div className={lineHeightCls}/>
            </Popover>
          );

          tooltip = Locale.lineHeight;
          break;
        }
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

    let mTypesHasPopover = ['background', 'color', 'emoji', 'size' ,'header'];
    if (value && (mTypesHasPopover.indexOf(mType) < 0) && !(mType in customInsertValue)) {
      value = (
        <Tooltip
          key={key}
          trigger="hover"
          placement={tooltipPlacement}
          title={tooltip}
          mouseEnterDelay={0.3}
        >
          <div className="item">{value}</div>
        </Tooltip>
      );
    }

    return value;
  };

  handleLineHeightItemClick = e=>{
    let { handleFormatLineHeight } = this.props,
      target = e.target;

    if (target.classList.value.indexOf('line-height-item') > -1 && target.hasAttribute('value')) {
      handleFormatLineHeight && handleFormatLineHeight(target.getAttribute('value'));
      this.setState({
        lineHeightPopoverVisible: false
      });
    }
  }

  handleFormatPainterClick = () => {
    let {
      formatPainterActive,
      saveSelectionFormat,
      unsaveSelectionFormat
    } = this.props;

    if (formatPainterActive) {
      unsaveSelectionFormat && unsaveSelectionFormat();
    } else {
      saveSelectionFormat && saveSelectionFormat();
    }
  };

  handleSizeItemClick = (e) => {
    let { handleFormatSize } = this.props,
      target = e.target;

    if (target.classList.value.indexOf('size-item') > -1 && target.hasAttribute('value')) {
      handleFormatSize && handleFormatSize(target.getAttribute('value'));
      this.setState({
        sizePopoverVisible: false
      });
    }
  };

  genToolbar = (toolbar) => {
    let result = [];
    toolbar.forEach((item, index) => {
      // 分组展示的项目
      if (item instanceof Array) {
        let grpItems = item.map((mType, subindex) => {
          return this.getModuleHTML(mType, 'toolbar_' + index + '_sub_' + subindex);
        });

        result.push(
          <div className="toolbar-grp" key={'toolbar_' + index}>
            {grpItems}
          </div>
        );
      } else {  // 单个展示的项目
        result.push(
          this.getModuleHTML(item, 'toolbar_' + index)
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

  handleSizePopoverVisibleChange = (visible) => {
    this.setState({
      sizePopoverVisible: visible
    });

    if (!visible) return;
    let { getCurrentSize } = this.props,
      curSize = getCurrentSize && getCurrentSize();

    if (curSize != this.state.curSize) {
      this.setState({
        curSize
      });
    }
  };

  handleLineHeightPopoverVisibleChange = (visible) => {
    this.setState({
      lineHeightPopoverVisible: visible
    });

    if (!visible) return;

    let { getCurrentLineHeight } = this.props,
      curLineHeight = getCurrentLineHeight && getCurrentLineHeight();

    if (curLineHeight != this.state.curLineHeight) {
      this.setState({
        curLineHeight
      });
    }
  };

  render() {
    const { className, style, toolbar } = this.props;

    return (
      <ConfigConsumer componentName="RichEditor">
        {
          (Locale: LocaleProperties['RichEditor']) => {
            this.Locale = Locale;
            return (
              <div className={className} ref={node => this.toolbarCtner = node} style={style}>
                {this.genToolbar(toolbar)}
              </div>
            );
          }
        }

      </ConfigConsumer>
    );
  }
}

export default CustomToolbar;
