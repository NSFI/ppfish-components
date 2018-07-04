import React from 'react';
import copy from 'copy-to-clipboard';
import {message} from 'antd';
import './style.less';

export default class RuleColor extends React.Component {


  handleClick = (copyText) => {
    copy(copyText);
    message.success('copied:' + copyText);
  };

  render(){
    return (
      <div>
        <h1 className='global-title'>Fish Design 色彩方案</h1>

        <h3 id='main-color-title'>主色</h3>
        <p >比较轻透的蓝色（七鱼官网新主色）优点：轻透、饱和度不回过高，看久了不容易疲劳。</p>
        <div className='main-color-container'>
          <div className='main-color-item' onClick={() => {this.handleClick('#337EFF')}}>
            Blue
            <div className='value'>#337EFF</div>
          </div>
        </div>

        <h3 id='aux-color-title'>辅助色</h3>
        <p>除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。</p>
        <div className='aux-color-container' onClick={this.click}>
          <div className='aux-color-item palatte-1' onClick={() => { this.handleClick('#F24957') }}>
            方案一
            <div className='value'>#F24957</div>
          </div>
          <div className='aux-color-item palatte-2' onClick={() => { this.handleClick('#26BD71') }}>
            方案二
            <div className='value'>#26BD71</div>
          </div>
          <div className='aux-color-item palatte-3' onClick={() => { this.handleClick('#FFAF0F') }}>
            方案三
            <div className='value'>#FFAF0F</div>
          </div>
          <div className='aux-color-item palatte-4' onClick={() => { this.handleClick('#8875FF') }}>
            方案四
            <div className='value'>#8875FF</div>
          </div>
        </div>

        <h3 id='neu-color-title'>中性色</h3>
        <p>中性色用于文本、背景和边框颜色，用来表现层次结构。</p>
        <div className='neu-color-container'>
          <div className='neu-color-left'>
            <div className='neu-color-item palatte-1' onClick={() => { this.handleClick('#222222') }}>
              #3 Black
              <div className='value'>#222222</div>
            </div>
            <div className='neu-color-item palatte-2' onClick={() => { this.handleClick('#666666') }}>
              #6 Black
              <div className='value'>#666666</div>
            </div>
            <div className='neu-color-item palatte-3' onClick={() => { this.handleClick('#999999') }}>
              #9 Black
              <div className='value'>#999999</div>
            </div>
          </div>
          <div className='neu-color-right'>
            <div className='neu-color-item palatte-4' onClick={() => { this.handleClick('#CCCCCC') }}>
              #C Black
              <div className='value'>#CCCCCC</div>
            </div>
            <div className='neu-color-item palatte-5' onClick={() => { this.handleClick('#F2F2F5') }}>
              Light Black
              <div className='value'>#F2F2F5</div>
            </div>
            <div className='neu-color-item palatte-6' onClick={() => { this.handleClick('#F7F7FA') }}>
              Extra Light Black
              <div className='value'>#F7F7FA</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
