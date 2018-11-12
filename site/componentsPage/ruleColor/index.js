import React from "react";
import copy from "copy-to-clipboard";
import {message} from "../../../source/components";
import "./style.less";

export default class RuleColor extends React.Component {


  handleClick = (copyText) => {
    copy(copyText);
    message.success("copied:" + copyText);
  };

  render() {
    return (
      <div id="color">
        <h1 className="global-title md-heading">Color 色彩</h1>
        <h3 id="main-color-title" className="md-heading">主色</h3>
        <p className="desc md-paragraph">FishDesign 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。</p>
        <div className="main-color-container">
          <div className="main-color-item" onClick={() => {
            this.handleClick("#337EFF");
          }}>
            Blue
            <div className="value">#337EFF</div>
          </div>
        </div>
        <h3 id="aux-color-title" className="md-heading">辅助色</h3>
        <p className="desc md-paragraph">除了主色外的场景色，需要在不同的场景中使用（例如警告色表示警告的操作）。</p>
        <div className="aux-color-container">
          <div className="aux-color-item" onClick={() => {
            this.handleClick("#F24957");
          }}>
            Danger
            <div className="value">#F24957</div>
          </div>
          <div className="aux-color-item" onClick={() => {
            this.handleClick("#26BD71");
          }}>
            Success
            <div className="value">#26BD71</div>
          </div>
          <div className="aux-color-item" onClick={() => {
            this.handleClick("#FFAF0F");
          }}>
            Warning
            <div className="value">#FFAF0F</div>
          </div>
          <div className="aux-color-item" onClick={() => {
            this.handleClick("#337EFF");
          }}>
            Info
            <div className="value">#337EFF</div>
          </div>
        </div>

        <h3 id="neu-color-title" className="md-heading">中性色</h3>
        <p className="desc md-paragraph">中性色用于文本、背景和边框颜色，用来表现层次结构。</p>
        <div className="neu-color-container">
          <div className="left">
            <div className="neu-color-item" onClick={() => {
              this.handleClick("#222222");
            }}>
              #3 Black
              <div className="value">#222222</div>
            </div>
            <div className="neu-color-item" onClick={() => {
              this.handleClick("#666666");
            }}>
              #6 Black
              <div className="value">#666666</div>
            </div>
            <div className="neu-color-item" onClick={() => {
              this.handleClick("#999999");
            }}>
              #9 Black
              <div className="value">#999999</div>
            </div>
          </div>
          <div className="right">
            <div className="neu-color-item" onClick={() => {
              this.handleClick("#CCCCCC");
            }}>
              #C Black
              <div className="value">#CCCCCC</div>
            </div>
            <div className="neu-color-item" onClick={() => {
              this.handleClick("#F2F2F5");
            }}>
              Light Black
              <div className="value">#F2F2F5</div>
            </div>
            <div className="neu-color-item" onClick={() => {
              this.handleClick("#F7F7FA");
            }}>
              Extra Light Black
              <div className="value">#F7F7FA</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
