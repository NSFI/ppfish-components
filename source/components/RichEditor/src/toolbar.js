import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import emojiList from './emojiList.js';
import ColorPicker from '../../ColorPicker/index.js';

let genEmoji = (data) => {
  let colSize = 10,
      resPath = 'http://ysf.space/sdk/res/portrait/emoji/',
      tmpObj = {},
      result = [];

  data.forEach((item, index) => {
    let grpIndex = parseInt(item.id / colSize, 10);

    if (typeof tmpObj[grpIndex] == 'undefined') {
      tmpObj[grpIndex] = [];
    }

    tmpObj[grpIndex].push(
      <button
        key={"emoji_" + grpIndex + "_" + index}
        className={"ql-emoji emoji-img " + item.className}
        value={item.title + "__" + resPath + item.imgName + ".png"}
        title={item.title}
      />
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

let emojiHTML = genEmoji(emojiList);

class CustomToolbar extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    toolbar: PropTypes.array,
    extendLinkModule: PropTypes.object
  };

  static defaultProps = {
    className: '',
    toolbar: [],
    extendLinkModule: {}
  };

  constructor(props) {
    super(props);

    this.defaultValue = '14px';
    this.state = {
      showSizePanel: false,
      showEmojiPanel: false,
    };
  }

  componentWillMount() {
    let emojiImg = new Image();
    emojiImg.src = '//ysf.nosdn.127.net/wwfttuqcqzrxhhyjacexkgalzzkwqagy';

    this.handlePanelStatus();
  }

  getModuleHTML = (mType, key, extendLinkModule) => {
    let mValue = null;

    if (typeof mType === 'object') {
      let obj = mType;
      mType = Object.keys(obj)[0];
      mValue = obj[mType];
    }

    // 处理扩展的链接模块
    if (mType in extendLinkModule) {
      return <button className={'item ql-' + mType + ' custom-entry ' + extendLinkModule[mType].className} key={key}/>;
    }

    const { showSizePanel, showEmojiPanel } = this.state;
    let sizePanelClass = classNames({
      'hide': !showSizePanel,
      'custom-size-panel': true
    });
    let emojiPanelClass = classNames({
      'hide': !showEmojiPanel,
      'custom-emoji-panel': true
    });
    let value = null;

    switch(mType) {
      case 'link':
        value = <button className="item ql-link" key={key}/>;
        break;
      case 'bold':
        value = <button className="item ql-bold" key={key}/>;
        break;
      case 'italic':
        value = <button className="item ql-italic" key={key}/>;
        break;
      case 'underline':
        value = <button className="item ql-underline" key={key}/>;
        break;
      case 'color':
        // value = <select className="item ql-color" key={key} />;
        value = (
          <ColorPicker key={key} enableHistory={true} enableAlpha={false} onChange={this.handleColorChange} >
            <div className="item custom-color">
              <button className="ql-customColor" style={{display: 'none'}}/>
            </div>
          </ColorPicker>
        );
        break;
      case 'align':
        if (mValue instanceof Array && mValue.length) {
          value = (
            <select className="item ql-align" key={key}>
              <option />
              {
                mValue.map((val, idx) => {
                  return <option key={key+'_option_'+idx} value={val} />;
                })
              }
            </select>
          );
        } else {
          value = <select className="item ql-align" key={key} />;
        }

        break;
      case 'list':
        value = <button type="button" className="item ql-list" value={mValue} key={key}/>;
        break;
      case 'emoji':
        value = (
          <div className="item custom-emoji iconfont icon-emoticon-smile" key={key} onClick={this.toggleEmojiPanel}>
            <div className={emojiPanelClass} >
              <div className="custom-emoji-con">
                { emojiHTML }
              </div>
            </div>
          </div>
        );
        break;
      case 'image':
        // value = <button className="item ql-image iconfont icon-picture" key={key}/>;
        value = <button className="item ql-image" key={key}/>;
        break;
      case 'size':
        if (mValue instanceof Array && mValue.length) {
          value = (
            <div className="item custom-size iconfont icon-FontSize" key={key} onClick={this.toggleSizePanel}>
              <div className={sizePanelClass}>
                {
                  mValue.map((val, idx) => {
                    return (
                      <button
                        key={key+'_csize_'+idx}
                        type="button"
                        className="ql-customSize size-item"
                        value={val}
                        style={{fontSize: val}}
                      >{val}</button>
                    );
                  })
                }
              </div>
            </div>
          );
        } else {
          value = (
            <div className="item custom-size iconfont icon-FontSize" key={key} onClick={this.toggleSizePanel}>
              <div className={sizePanelClass}>
                <button type="button" className="ql-customSize size-item" value="32px" style={{fontSize: '32px'}}>32px</button>
                <button type="button" className="ql-customSize size-item" value="24px" style={{fontSize: '24px'}}>24px</button>
                <button type="button" className="ql-customSize size-item" value="18px" style={{fontSize: '18px'}}>18px</button>
                <button type="button" className="ql-customSize size-item" value="16px" style={{fontSize: '16px'}}>16px</button>
                <button type="button" className="ql-customSize size-item" value="13px" style={{fontSize: '13px'}}>13px</button>
                <button type="button" className="ql-customSize size-item" value="12px" style={{fontSize: '12px'}}>12px</button>
              </div>
            </div>
          );
        }

        break;
      case 'clean':
        // value = <button className="item ql-clean iconfont icon-eraser" key={key}/>;
        value = <button className="item ql-clean" key={key}/>;
        break;
      case 'strike':
        value = <button className="item ql-strike" key={key}/>;
        break;
      case 'blockquote':
        value = <button className="item ql-blockquote" key={key}/>;
        break;
      case 'code-block':
        value = <button className="item ql-code-block" key={key}/>;
        break;
      case 'header':
        if (typeof mValue === 'string' || typeof mValue === 'number') {
          value = <button type="button" className="item ql-header" value={mValue} key={key}/>;
        } else if (mValue instanceof Array && mValue.length){
          value = (
            <select className="item ql-header" defaultValue="normal" key={key}>
              {
                mValue.map((val, idx) => <option key={key+'_option_'+idx} value={val} />)
              }
              <option value="normal" />
            </select>
          );
        }

        break;
      case 'script':
        value = <button type="button" className="item ql-script" value={mValue} key={key}/>;
        break;
      case 'indent':
        value = <button type="button" className="item ql-indent" value={mValue} key={key}/>;
        break;
      case 'direction':
        value = <button type="button" className="item ql-direction" value={mValue} key={key} />;
        break;
      case 'background':
        value = <select className="item ql-background" key={key} />;
        break;
      case 'font':
        value = <select className="item ql-font" key={key} />;
        break;
      default:
        break;
    }

    return value;
  };

  genToolbar = (toolbar, extendLinkModule) => {
    let result = [];

    toolbar.forEach((item, index) => {
      // 分组展示的项目
      if (item instanceof Array) {
        let grpItems = item.map((mType, subindex) => {
          return this.getModuleHTML(mType, 'toolbar_' + index + '_sub_' + subindex, extendLinkModule);
        });

        result.push(
          <div className="toolbar-grp" key={'toolbar_' + index}>
            { grpItems }
          </div>
        );
      } else {  // 单个展示的项目
        result.push(
          this.getModuleHTML(item, 'toolbar_' + index, extendLinkModule)
        );
      }
    });

    return result;
  };

  handlePanelStatus = () => {
    window.addEventListener('click', (e) => {
      this.setState({
        showSizePanel: false,
        showEmojiPanel: false
      });
    }, false);
  };

  handleColorChange = ({color}) => {
    let btn = document.querySelector('.ql-customColor');
    btn.setAttribute("value", color);
    btn.click();
  };

  toggleSizePanel = (e) => {
    let clsVal = e.target.classList.value;

    if (clsVal.indexOf('item') > -1 ||
        clsVal.indexOf('ql-customSize') > -1) {
      this.setState({
        showSizePanel: !this.state.showSizePanel,
        showEmojiPanel: false,
      });
    }

    e.stopPropagation();
  };

  toggleEmojiPanel = (e) => {
    let clsVal = e.target.classList.value;

    if (clsVal.indexOf('item') > -1 ||
        clsVal.indexOf('ql-emoji') > -1) {
      this.setState({
        showSizePanel: false,
        showEmojiPanel: !this.state.showEmojiPanel
      });
    }

    e.stopPropagation();
  };

  render() {
    const { className, toolbar, extendLinkModule } = this.props;

    return (
      <div id="toolbar" className={className}>
        { this.genToolbar(toolbar, extendLinkModule) }
      </div>
    );
  }
}

export default CustomToolbar;
