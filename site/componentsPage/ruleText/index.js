import React from 'react';
import copy from 'copy-to-clipboard';
import { message } from '../../../source/components';
import './style.less';

export default class RuleText extends React.Component {


  handleClick = (copyText) => {
    copy(copyText);
    message.success('copied:' + copyText);
  }

  render() {
    return (
      <div id='typography-text'>
        <h1 className='global-title'>Typography 字体</h1>
        <p className='desc'>文字色主要用于各层级的文本来使用。</p>

        <h3 id='text-color-title'>文字色</h3>
        <div className='text-color-container'>
          <div className='text-color-item' onClick={() => {this.handleClick('#333333')}}>
            #3 Black
            <div className='value'>#333333</div>
          </div>
          <div className='text-color-item' onClick={() => {this.handleClick('#666666')}}>
            #6 Black
            <div className='value'>#666666</div>
          </div>
          <div className='text-color-item' onClick={() => {this.handleClick('#999999')}}>
            #9 Black
            <div className='value'>#999999</div>
          </div>
          <div className='text-color-item' onClick={()  => {this.handleClick('#CCCCCC')}}>
            #C Black
            <div className='value'>#CCCCCC</div>
          </div>
        </div>

        <h3 id='ch-font-title'>中文字体</h3>
        <div className='ch-font-container'>
          <div className='font-item font-PingFang'>
            苹方
            <div className='name'>PingFang SC</div>
          </div>
          <div className='font-item font-Microsoft'>
            微软雅黑
            <div className='name'>Microsoft YaHei</div>
          </div>
        </div>

        <h3 id='eng-font-title'>英文字体</h3>
        <div className='eng-font-container'>
          <div className='font-item font-Arial'>
            Arial
            <div className='name'>Arial</div>
          </div>
          <div className='font-item font-Helvetica'>
            Helvetica Neue
            <div className='name'>Helvetica Neue</div>
          </div>
        </div>

        <h3 id='text-rule-title'>字体使用规范</h3>
        <table className='text-rule-table'>
          <tbody>
            <tr>
              <td className='h1'>页面标题</td>
              <td className='h1'>网易七鱼</td>
              <td className='color-dark-light'>20px</td>
            </tr>
            <tr>
              <td className='h2'>大标题</td>
              <td className='h2'>网易七鱼</td>
              <td className='color-dark-light'>18px</td>
            </tr>
            <tr>
              <td className='h3'>列表标题</td>
              <td className='h3'>网易七鱼</td>
              <td className='color-dark-light'>16px</td>
            </tr>
            <tr>
              <td className='regular-text'>正文</td>
              <td className='regular-text'>网易七鱼</td>
              <td className='color-dark-light'>14px</td>
            </tr>
            <tr>
              <td className='small-text'>正文/小标题/辅助文字</td>
              <td className='small-text'>网易七鱼</td>
              <td className='color-dark-light'>12px</td>
            </tr>
          </tbody>
        </table>

      </div>
    )
  }
}
