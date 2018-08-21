import React from 'react';
import {Link} from 'react-router';
import Layout from '../common/layout';
import './index.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <div className="m-home-page">
          <div className="banner">
            <div className="left-logo">
              <img className="logo" src={'//ysf.nosdn.127.net/kornketgjocydxcldzywnyfdtclwugdl'} alt="logo"/>
            </div>
            <div className="right-desc">
              <h1 className="title">Fish Design</h1>
              <p className="desc">基于React实现的高质量的UI组件库</p>
              <div className="button-group">
                <Link to="/components/" className="button start">Start</Link>
                <a href="http://github.com/NSFI/ppfish-components/" target="_blank" className="button github">&nbsp;</a>
              </div>
            </div>
          </div>
          <div className="design" id="design">
            <h2 className="title">设计原则</h2>
            <div className="design-list">
              <div className="principle">
                <img src={'//ysf.nosdn.127.net/wswhgoggxhbdrtkxefigwmwgefgicdcd'} alt="简洁｜Concise"/>
                <h3>简洁｜Concise</h3>
                <i className="split-icon"/>
                <p>如无必要 勿增实体：慎重筛选客户当前需要信息内容</p>
              </div>
              <div className="principle">
                <img src={'//ysf.nosdn.127.net/ryatctvlcqyowiegkfbgcaiiqrxcnfha'} alt="直接｜Immediate"/>
                <h3>直接｜Immediate</h3>
                <i className="split-icon"/>
                <p>提供用户操作后的直接反馈，保证用户的操作结果符合预期</p>
              </div>
              <div className="principle">
                <img src={'//ysf.nosdn.127.net/xvbiyraokrdcmhrtoxddexqcognzsube'} alt="优雅｜Elegent"/>
                <h3>优雅｜Elegent</h3>
                <i className="split-icon"/>
                <p>设计方案追求优雅，給使用者有质感的操作感受</p>
              </div>
              <div className="principle">
                <img src={'//ysf.nosdn.127.net/xvrqcrjowyhsnnpqdanllorwtsjlfqhu'} alt="适应性｜Adaptability"/>
                <h3>适应性｜Adaptability</h3>
                <i className="split-icon"/>
                <p>设计方案提供可扩展能力及适应性，适应不同模式的企业使用</p>
              </div>
            </div>
          </div>
          <div className="resource">
            <h2 className="title">资源中心</h2>
            <div className="resource-list">
              <div className="resource-item">
                <img src={'//ysf.nosdn.127.net/xjupeqkvqvzvofkzalfzyfhpqmjvofrw'} alt="贡献指南"/>
                <Link to="/components/contributing/">贡献指南</Link>
              </div>
              <div className="resource-item">
                <img src={'//ysf.nosdn.127.net/zespbluoxdooiuwbodfuzzniuikphxzu'} alt="更新日志"/>
                <Link to="/components/changelog/">更新日志</Link>
              </div>
              <div className="resource-item">
                <img src={'//ysf.nosdn.127.net/cwknzqyaxbjnbwsldapbridnbtwqzcho'} alt="组件库"/>
                <Link to="/components/">组件库</Link>
              </div>
              <div className="resource-item">
                <img src={'//ysf.nosdn.127.net/pdkitmnnpikavbkzscsxsgoilftykxza'} alt="资源下载"/>
                <a href="http://axure.yixin.im/view?pid=176&mid=489&id=4937" target="_blank">资源下载</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
