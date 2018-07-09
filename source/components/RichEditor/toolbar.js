import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
          <button className="item" onClick={this.toggleEmojiPanel}/>
          <div className={emojiPanelClass} >
            <div className="custom-emoji-con">
              <div className="emoji-row">
                <button className="ql-emoji emoji-icon-01" value="[可爱]__http://ysf.space/sdk/res/portrait/emoji/emoji_01.png" title="[可爱]" />
                <i className="emoji-icon-00" src="http://ysf.space/sdk/res/portrait/emoji/emoji_00.png" title="[大笑]" alt="[大笑]"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="toolbar-grp">
          <button className="item ql-image" />
        </div>

        <div className="toolbar-grp">
          <div className="item custom-size" onClick={this.toggleSizePanel}></div>
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
          <button className="item ql-clean" />
        </div>

        <div className="toolbar-grp">
          <button className="item ql-entry" />
        </div>
      </div>
    );
  }
}

export default CustomToolbar;
