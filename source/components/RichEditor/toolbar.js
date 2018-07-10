import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import emojiList from './emojiList.js';

let genEmoji = (data) => {
  let colSize = 10,
      resPath = 'http://ysf.space/sdk/res/portrait/emoji/',
      tmpObj = {},
      result = [];

  data.map((item, index) => {
    let grpIndex = parseInt(item.id / colSize, 10);

    if (typeof tmpObj[grpIndex] == 'undefined') {
      tmpObj[grpIndex] = [];
    }

    tmpObj[grpIndex].push(
      <button
        key={"emoji_" + grpIndex + "_" + index}
        className={"ql-emoji emoji-img emoji-" + item.name}
        value={item.title + "__" + resPath + "emoji_" + item.name + ".png"}
        title={item.title}
      />
    );
  });

  for (let key in tmpObj) {
    result.push(
      <div className="emoji-row" key={"emoji_row_" + key}>
        { tmpObj[key] }
      </div>
    );
  }

  return result;
};
let emojiDom = genEmoji(emojiList);


class CustomToolbar extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);

    this.defaultValue = '14px';
    this.state = {
      showSizePanel: false,
      showEmojiPanel: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showEmojiPanel != this.state.showEmojiPanel) {
      this.setState({
        showEmojiPanel: nextProps.showEmojiPanel
      });
    }
  }

  toggleSizePanel = () => {
    this.setState({
      showSizePanel: !this.state.showSizePanel
    });
  };

  closeSizePanel = (e) => {
    if (e.target.tagName.toUpperCase() == 'BUTTON') {
      this.setState({
        showSizePanel: false
      });
    }
  };

  toggleEmojiPanel = () => {
    this.setState({
      showEmojiPanel: !this.state.showEmojiPanel
    });
  };

  closeEmojiPanel = (e) => {
    if (e.target.tagName.toUpperCase() == 'BUTTON') {
      this.setState({
        showEmojiPanel: false
      });
    }
  };

  render() {
    const { showSizePanel, showEmojiPanel } = this.state;
    const { className } = this.props;
    let sizePanelClass = classNames({
        'hide': !showSizePanel,
        'custom-size-panel': true
    });
    let emojiPanelClass = classNames({
        'hide': !showEmojiPanel,
        'custom-emoji-panel': true
    });

    return (
      <div id="toolbar" className={className}>
        <div className="toolbar-grp">
          <button className="item ql-link" />
          <button className="item ql-bold" />
          <button className="item ql-italic" />
          <button className="item ql-underline" />
        </div>

        <div className="toolbar-grp">
          <select className="item ql-color">
          {
            /*
            <option value="red" />
            <option value="green" />
            <option value="blue" />
            <option value="orange" />
            <option value="violet" />
            <option value="#d0d1d2" />
            <option value="black" />        
             */
          }
          </select>
        </div>

        <div className="toolbar-grp">
          <select className="item ql-align"></select>
          {
            /*
          <button className="ql-align" />
          <button className="ql-align" value="center" />
          <button className="ql-align" value="right" />
             */
          }
        </div>

        <div className="toolbar-grp">
          <button type="button" className="item ql-list" value="ordered" />
          <button type="button" className="item ql-list" value="bullet" />
        </div>

        <div className="toolbar-grp">
          <div className="item custom-emoji" onClick={this.toggleEmojiPanel}>
            <i className="iconfont icon-emoticon-smile" />
          </div>
          <div className={emojiPanelClass} >
            <div className="custom-emoji-con" onClick={this.closeEmojiPanel}>
              { emojiDom }
            </div>
          </div>
        </div>

        <div className="toolbar-grp">
          <button className="item ql-image iconfont icon-picture" />
        </div>

        <div className="toolbar-grp">
          <div className="item custom-size iconfont icon-FontSize" onClick={this.toggleSizePanel}></div>
          <div className={sizePanelClass} onClick={this.closeSizePanel}>
            <button type="button" className="ql-customSize item" value="32px" style={{fontSize: '32px'}}>32px</button>
            <button type="button" className="ql-customSize item" value="24px" style={{fontSize: '24px'}}>24px</button>
            <button type="button" className="ql-customSize item" value="18px" style={{fontSize: '18px'}}>18px</button>
            <button type="button" className="ql-customSize item" value="16px" style={{fontSize: '16px'}}>16px</button>
            <button type="button" className="ql-customSize item" value="13px" style={{fontSize: '13px'}}>13px</button>
            <button type="button" className="ql-customSize item" value="12px" style={{fontSize: '12px'}}>12px</button>
          </div>
        </div>

        <div className="toolbar-grp">
          <button className="item ql-clean iconfont icon-eraser" />
        </div>

        <div className="toolbar-grp">
          <button className="item ql-entry custom-entry iconfont icon-consult" />
        </div>
      </div>
    );
  }
}

export default CustomToolbar;
