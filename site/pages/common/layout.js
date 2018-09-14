import React from 'react';
import {Link} from 'react-router';
import PropTypes from "prop-types";
import {Row, Col} from '../../../source/components';
import locales from '../../locales';

export default class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    hideFooter: PropTypes.bool,
  };

  static defaultProps = {
    hideFooter: false
  };

  static loadSDK(callback) {
    // algolia：https://community.algolia.com/docsearch/documentation/docsearch-FAQ/customize-configuration-file/
    // algolia doc search配置文件：https://github.com/algolia/docsearch-configs/blob/master/configs/ppfish.json
    const e = document.createElement('script');
    e.type = 'text/javascript';
    e.async = false;
    e.src = '//cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js';
    e.onload = callback;
    document.head.appendChild(e);
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setMenuHighlight();
    this.initSearchBox();
  }

  getLocale(key) {
    const map = locales || {};
    return key.split('.').reduce((a, b) => {
      const parent = map[a];
      if (b) {
        return (parent || {})[b];
      }
      return parent;
    });
  }

  setMenuHighlight() {
    const current = location.hash;
    const HIGHLIGHT_CLS = 'active';
    const menuItems = document.querySelectorAll('.nav-item a');

    function setHighlight(menuItems, cls) {
      Array.from(menuItems).forEach(menuItem => {
        const key = menuItem.getAttribute('href');
        if (key && current.indexOf(key) > -1) {
          menuItem.classList.add(cls);
        } else {
          menuItem.classList.remove(cls);
        }
      });
    }

    setHighlight(menuItems, HIGHLIGHT_CLS);
  }

  initSearchBox() {
    Layout.loadSDK(() => {
      window.docsearch({
        apiKey: 'ddba94e7e0f7ae0fee63b1645548fc00',
        indexName: 'ppfish',
        inputSelector: '#search-box input',
        debug: false // Set debug to true if you want to inspect the dropdown
      });
    });
  }

  render() {
    const {children, hideFooter} = this.props;
    return (
      <div className="app">
        <header className="fish-header">
          <Row>
            <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4} className="header-title">
              <Link to="/home" rel="noopener noreferrer">
                <img src={'//ysf.nosdn.127.net/unanqvsjrxhnpwqrulcuumqxicpwsojh'} alt="fish-disgn"/>
              </Link>
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={19} xxl={20} className="header-navbar">
              <div id="search-box" className="search-box">
                <img src={require('../../assets/fd-web-1.2-icon@2x.svg')} className="search-icon"/>
                <input type="text" placeholder="在 Fish Design 中搜索" className="ant-input"/>
              </div>
              <ul className="nav">
                <li className="nav-item">
                  <Link to="/home" rel="noopener noreferrer">{this.getLocale('misc.home')}</Link>
                </li>
                {/*
                <li className="nav-item">
                  <Link to="#/spec" rel="noopener noreferrer">{this.getLocale('misc.spec')}</Link>
                </li>
                */}
                <li className="nav-item">
                  <Link to="/components">{this.getLocale('misc.component')}</Link>
                </li>
                {/*
                <li className="nav-item">
                  <Link>{this.getLocale('misc.demo')}</Link>
                </li>
                */}
                <span className="nav-version">
                    {this.getLocale('misc.version')}
                  </span>
              </ul>
            </Col>
          </Row>
        </header>
        <div className="main">
          {children}
        </div>
        {
          !hideFooter &&
          <footer className="footer">
            <div className="logo">
              <img src={'//ysf.nosdn.127.net/cipiqsfpsbyreuwspfkybadithmnnlmc'} alt="logo"/>
              <h3>Fish Design</h3>
              <p className="version">- {this.getLocale('misc.version')} -</p>
            </div>
            <div className="link-list">
              <Link to="/home" className="link-item">首页</Link>
              {/*<Link to="/home" className="link-item">设计语言</Link>*/}
              <Link to="/components" className="link-item">组件</Link>
              {/*<Link className="link-item">演示环境</Link>*/}
              <a href="http://jira.netease.com/projects/YSFCOMP/summary" target="_blank" className="link-item">问题反馈</a>
            </div>
            <div className="github">
              <a href="//github.com/NSFI/ppfish-components" target="_blank">
                <img src={require('../../assets/fd-web-5.2-logo@2x.svg')} alt="github"/>
                <span>GitHub</span>
              </a>
            </div>
          </footer>
        }
      </div>
    );
  }
}
