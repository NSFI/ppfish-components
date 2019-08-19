import React from 'react';
import {Link} from 'react-router';
import lottie from 'lottie-web';
import conciseData from '../../assets/lottie/concise.json';
import immediateData from '../../assets/lottie/immediate.json';
import elegentData from '../../assets/lottie/elegent.json';
import adaptabilityData from '../../assets/lottie/adaptability.json';
import Layout from '../common/layout';
import './index.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let lottieItems = [{
      id: 'lottie_concise',
      data: conciseData
    }, {
      id: 'lottie_immediate',
      data: immediateData
    }, {
      id: 'lottie_elegent',
      data: elegentData
    }, {
      id: 'lottie_adaptability',
      data: adaptabilityData
    }];

    lottieItems.forEach((item) => {
      let el = document.getElementById(item.id);
      if (!el) return;

      let animation = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: item.data
      });

      el.addEventListener('mouseenter', function() {
        animation.setDirection(1);
        animation.play();
      });

      el.addEventListener('mouseleave', function() {
        animation.setDirection(-1);
        animation.play();
      });
    });
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
              <p className="desc">基于 React 实现的高质量的企业级 UI 组件库，<br/>帮助设计者与开发者快速构建系统。</p>
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
                <div id="lottie_concise" className="lottie-item" />
                <h3>简洁｜Concise</h3>
                <i className="split-icon"/>
                <p>如无必要 勿增实体：慎重筛选客户当前需要信息内容</p>
              </div>
              <div className="principle">
                <div id="lottie_immediate" className="lottie-item" />
                <h3>直接｜Immediate</h3>
                <i className="split-icon"/>
                <p>提供用户操作后的直接反馈，保证用户的操作结果符合预期</p>
              </div>
              <div className="principle">
                <div id="lottie_elegent" className="lottie-item" />
                <h3>优雅｜Elegent</h3>
                <i className="split-icon"/>
                <p>设计方案追求优雅，給使用者有质感的操作感受</p>
              </div>
              <div className="principle">
                <div id="lottie_adaptability" className="lottie-item" />
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
                <Link to="/components/contributing/">
                  <img src={'//ysf.nosdn.127.net/xjupeqkvqvzvofkzalfzyfhpqmjvofrw'} alt="贡献指南"/>
                  贡献指南
                </Link>
              </div>
              <div className="resource-item">
                <Link to="/components/changelog/">
                  <img src={'//ysf.nosdn.127.net/zespbluoxdooiuwbodfuzzniuikphxzu'} alt="更新日志"/>
                  更新日志
                </Link>
              </div>
              <div className="resource-item">
                <Link to="/components/">
                  <img src={'//ysf.nosdn.127.net/cwknzqyaxbjnbwsldapbridnbtwqzcho'} alt="组件库"/>
                  组件库
                </Link>
              </div>
              <div className="resource-item">
                <a href="//axure.yixin.im/view?id=11388&pid=4&mid=434#fishdesign___" target="_blank">
                  <img src={'//ysf.nosdn.127.net/pdkitmnnpikavbkzscsxsgoilftykxza'} alt="资源下载"/>
                  资源下载
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
