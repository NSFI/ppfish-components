import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import emojiList from './emojiList.js';
import ColorPicker from '../../ColorPicker/index.js';

let genEmoji = (data) => {
  let colSize = 10,
      resPath = '//ysf.space/sdk/res/portrait/emoji/',
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
    iconPrefix: PropTypes.string,
    toolbar: PropTypes.array,
    customLink: PropTypes.object
  };

  static defaultProps = {
    className: '',
    iconPrefix: 'fishdicon',
    toolbar: [],
    customLink: {}
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
  }

  componentDidMount() {
    this.handlePanelStatus();
  }

  getModuleHTML = (mType, key, customLink) => {
    let mValue = null;
    let { iconPrefix } = this.props;

    if (typeof mType === 'object') {
      let obj = mType;
      mType = Object.keys(obj)[0];
      mValue = obj[mType];
    }

    // 处理扩展的链接模块
    if (mType in customLink) {
      let entryClass = classNames('item custom-entry', {
        [`ql-${mType}`]: !showSizePanel,
        [`${iconPrefix}`]: true,
        [`${iconPrefix}-richeditor-transfer`]: true
      }, customLink[mType].className);

      return <button className={entryClass} key={key}/>;
    }

    const { showSizePanel, showEmojiPanel } = this.state;
    let value = null;

    switch(mType) {
      case 'link': {
        const linkCls = classNames('item ql-link', {
          [`${iconPrefix}`]: true,
          [`${iconPrefix}-richeditor-link`]: true
        });
        value = <button className={linkCls} key={key}/>;
        break;
      }
      case 'bold': {
        const boldCls = classNames('item ql-bold', {
          [`${iconPrefix}`]: true,
          [`${iconPrefix}-richeditor-bold`]: true
        });
        value = <button className={boldCls} key={key}/>;
        break;
      }
      case 'italic': {
        const italicCls = classNames('item ql-italic', {
          [`${iconPrefix}`]: true,
          [`${iconPrefix}-richeditor-tilt`]: true
        });
        value = <button className={italicCls} key={key}/>;
        break;
      }
      case 'underline': {
        const underlineCls = classNames('item ql-underline', {
          [`${iconPrefix}`]: true,
          [`${iconPrefix}-richeditor-underline`]: true
        });
        value = <button className={underlineCls} key={key}/>;
        break;
      }
      case 'color': {
        value = <select className="item ql-color" key={key} />;
        // value = (
        //   <div className="item custom-color" key={key}>
        //     <ColorPicker className={"custom-color-picker"} enableHistory={true} enableAlpha={false} onClose={this.handleColorSelect.bind(this)} >
        //       <button className="ql-customColor" />
        //     </ColorPicker>
        //   </div>
        // );
        break;
      }
      case 'align': {
        if (typeof mValue === 'string') {
          let alignIconType = 'richeditor-align-lef';
          if (mValue == 'right') {
            alignIconType = 'richeditor-align-rig';
          } else if (mValue == 'center') {
            alignIconType = 'richeditor-align-mid';
          } else if (mValue == 'justify') {
            alignIconType = 'richeditor-align-all';
          }

          const alignCls = classNames('item ql-align', {
            [`${iconPrefix}`]: true,
            [`${iconPrefix}-${alignIconType}`]: true
          });
          value = <button type="button" className={alignCls} value={mValue} key={key}/>;
        } else if (mValue instanceof Array && mValue.length) {
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
      }
      case 'list': {
        const listIconType = mValue == 'ordered' ? 'richeditor-numberlis' : 'richeditor-list';
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
        const emojiPanelCls = classNames({
          'hide': !showEmojiPanel,
          'custom-emoji-panel': true
        });

        value = (
          <div className={emojiCls} key={key} onClick={this.toggleEmojiPanel}>
            <div className={emojiPanelCls} >
              <div className="custom-emoji-con">
                { emojiHTML }
              </div>
            </div>
          </div>
        );
        break;
      }
      case 'image': {
        const imageCls = classNames('item ql-image', {
          [`${iconPrefix}`]: true,
          [`${iconPrefix}-richeditor-picture`]: true
        });
        value = <button className={imageCls} key={key}/>;
        break;
      }
      case 'size': {
        const sizeCls = classNames('item custom-size', {
          [`${iconPrefix}`]: true,
          [`${iconPrefix}-richeditor-size`]: true
        });
        const sizePanelCls = classNames({
          'hide': !showSizePanel,
          'custom-size-panel': true
        });

        if (mValue instanceof Array && mValue.length) {
          value = (
            <div className={sizeCls} key={key} onClick={this.toggleSizePanel}>
              <div className={sizePanelCls}>
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
            <div className={sizeCls} key={key} onClick={this.toggleSizePanel}>
              <div className={sizePanelCls}>
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
      }
      case 'clean': {
        const cleanCls = classNames('item ql-clean', {
          [`${iconPrefix}`]: true,
          [`${iconPrefix}-richeditor-clear`]: true
        });

        value = <button className={cleanCls} key={key}/>;
        break;
      }
      case 'strike': {
        value = <button className="item ql-strike" key={key}/>;
        break;
      }
      case 'blockquote': {
        value = <button className="item ql-blockquote" key={key}/>;
        break;
      }
      case 'code-block': {
        value = <button className="item ql-code-block" key={key}/>;
        break;
      }
      case 'header': {
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
      }
      case 'script': {
        value = <button type="button" className="item ql-script" value={mValue} key={key}/>;
        break;
      }
      case 'indent': {
        value = <button type="button" className="item ql-indent" value={mValue} key={key}/>;
        break;
      }
      case 'direction': {
        value = <button type="button" className="item ql-direction" value={mValue} key={key} />;
        break;
      }
      case 'background': {
        value = <select className="item ql-background" key={key} />;
        break;
      }
      case 'font': {
        value = <select className="item ql-font" key={key} />;
        break;
      }
      default: {
        break;
      }
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

  handlePanelStatus = () => {
    window.addEventListener('click', (e) => {
      this.setState({
        showSizePanel: false,
        showEmojiPanel: false
      });
    }, false);
  };

  // handleColorSelect = ({color}) => {
  //   let btn = this.toolbarCtner.querySelector('.ql-customColor');
  //   btn.setAttribute('value', color);
  //   btn.click();
  // };

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
    const { className, toolbar, customLink } = this.props;

    return (
      <div className={className} ref={node => this.toolbarCtner = node}>
        { this.genToolbar(toolbar, customLink) }
      </div>
    );
  }
}

export default CustomToolbar;
