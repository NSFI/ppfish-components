import * as React from 'react';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import emojiList from './emojiList';
// import ColorPicker from '../../ColorPicker/index.js';
import Tooltip, { TooltipPlacement } from '../../Tooltip/index';
import Popover from '../../Popover/index';
import Tabs from '../../Tabs/index';
import Input from '../../Input/index';
import Icon from '../../Icon/index';

declare module 'react' {
  interface ImgHTMLAttributes<T> {
    value?: string;
  }
}

import { CustomToolbarProps, EmojiInferface, CustomToolbarState } from './interface'

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
let defaultEmojis = genEmoji(emojiList);

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
  private curSizeList: Array<string>
  private curInsertValueList: Array<any>
  public toolbarCtner: HTMLDivElement

  constructor(props: CustomToolbarProps) {
    super(props);

    this.defaultSizes = ['32px', '24px', '20px', '18px', '16px', '14px', '13px', '12px'];
    this.curInsertValueList = [];
    this.state = {
      curSize: null,
      sizePopoverVisible: false,
      curIVSearchValue: ''
    };
  }

  componentDidMount() {
    let emojiImg = new Image();
    emojiImg.src = '//ysf.qiyukf.net/wwfttuqcqzrxhhyjacexkgalzzkwqagy';
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
      getPopupContainer
    } = this.props;
    let mValue: any = null, value: JSX.Element | null = null, tooltip: string | null = null;

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
                  placeholder={customModule.searchPlaceholder ? customModule.searchPlaceholder : "请输入关键字"}
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
              }) : <div className="insert-value-empty">暂无数据</div>
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
          tooltip = '超链接';
          break;
        }
        case 'bold': {
          const boldCls = classNames('action ql-bold', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-bold`]: true
          });
          value = <button className={boldCls} key={key} />;
          tooltip = '粗体';
          break;
        }
        case 'italic': {
          const italicCls = classNames('action ql-italic', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-tilt`]: true
          });
          value = <button className={italicCls} key={key} />;
          tooltip = '斜体';
          break;
        }
        case 'underline': {
          const underlineCls = classNames('action ql-underline', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-underline`]: true
          });
          value = <button className={underlineCls} key={key} />;
          tooltip = '下划线';
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
                title="文字颜色"
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
          tooltip = '无序列表';

          if (mValue == 'ordered') {
            listIconType = 'richeditor-numberlis';
            tooltip = '有序列表';
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
          let content = (
            <div className="emoji-ctner">
              <div className="emoji-con" onClick={handleInsertEmoji}>
                {defaultEmojis}
              </div>
            </div>
          );

          if (customEmoji && customEmoji.length) {
            let tabPanes = [
              <TabPane tab="默认表情" key="emoji_default">
                <div className="emoji-ctner">
                  <div className="emoji-con" onClick={handleInsertEmoji}>
                    {defaultEmojis}
                  </div>
                </div>
              </TabPane>
            ];

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

            content = (
              <Tabs defaultActiveKey="emoji_default">
                {tabPanes}
              </Tabs>
            );
          }

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
                title="插入表情"
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
          tooltip = '插入表情';
          break;
        }
        case 'image': {
          const imageCls = classNames('action ql-image', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-picture`]: true
          });
          value = <button className={imageCls} key={key} />;
          tooltip = '插入图片';
          break;
        }
        case 'attachment': {
          const cls = classNames('action ql-attachment', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-annexx`]: true
          });
          value = <button className={cls} key={key} />;
          tooltip = '插入附件';
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
                title="文字大小"
                mouseEnterDelay={0.3}
              >
                <div className="item">
                  <div className={sizeCls} />
                </div>
              </Tooltip>
            </Popover>
          );

          tooltip = '文字大小';

          break;
        }
        case 'clean': {
          const cleanCls = classNames('action ql-clean', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-richeditor-clear`]: true
          });

          value = <button className={cleanCls} key={key} />;
          tooltip = '清除格式';
          break;
        }
        case 'formatPainter': {
          const cls = classNames('action ql-formatPainter', {
            [`${iconPrefix}`]: true,
            'ql-active': this.props.formatPainterActive,
            [`${iconPrefix}-richeditor-brushx`]: true
          });

          value = <button className={cls} key={key} onClick={this.handleFormatPainterClick} />;
          tooltip = '格式刷';
          break;
        }
        case 'strike': {
          value = <button className="action ql-strike" key={key} />;
          tooltip = '删除线';
          break;
        }
        case 'blockquote': {
          value = <button className="action ql-blockquote" key={key} />;
          tooltip = '块引用';
          break;
        }
        case 'code-block': {
          value = <button className="action ql-code-block" key={key} />;
          tooltip = '代码块';
          break;
        }
        case 'script': {
          value = <button type="button" className="action ql-script" value={mValue} key={key} />;
          if (mValue == 'super') {
            tooltip = '上脚标';
          } else {
            tooltip = '下脚标';
          }

          break;
        }
        case 'indent': {
          value = <button type="button" className="action ql-indent" value={mValue} key={key} />;

          if (mValue == '-1') {
            tooltip = '减少缩进';
          } else {
            tooltip = '增加缩进';
          }

          break;
        }
        case 'direction': {
          value = <button type="button" className="action ql-direction" value={mValue} key={key} />;
          tooltip = '文字方向';
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
                title="背景色"
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

          tooltip = '背景色';
          break;
        }
        case 'video': {
          value = <button type="button" className="action ql-video" value={mValue} key={key} />;
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
        default: {
          break;
        }
      }
    }

    let mTypesHasPopover = ['background', 'color', 'emoji', 'size'];
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

  render() {
    const { className, style, toolbar } = this.props;

    return (
      <div className={className} ref={node => this.toolbarCtner = node} style={style}>
        {this.genToolbar(toolbar)}
      </div>
    );
  }
}

export default CustomToolbar;
