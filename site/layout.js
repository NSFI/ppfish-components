import React from 'react';
import {Row, Col} from 'antd';
import locales from './locales';
import PropTypes from "prop-types";

const githubSrc = require('./assets/github.png');
const searchIcon = require('./assets/search.svg');

export default class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setMenuHighlight();
    this.initSearchBox();
  }

  getLocale(key) {
    const map = locales['zh-CN'] || {};
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

  loadSDK(callback) {
    const e = document.createElement('script');
    e.type = 'text/javascript';
    e.async = false;
    e.src = '//cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js';
    e.onload = callback;
    document.head.appendChild(e);
  }

  initSearchBox() {
    this.loadSDK(() => {
      window.docsearch({
        apiKey: 'ddba94e7e0f7ae0fee63b1645548fc00',
        indexName: 'ppfish',
        inputSelector: '#search-box input',
        debug: false // Set debug to true if you want to inspect the dropdown
      });
    });
  }

  render() {
    const {children} = this.props;
    return (
      <div className="app">
        <header className="header">
          <Row>
            <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4} className="header-title">
              <h1>PPFish Design</h1>
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={19} xxl={20} className="header-navbar">
              <div id="search-box" className="search-box">
                <img src={searchIcon} className="search-icon" /><input type="text" placeholder="在 ppfish 中搜索" className="ant-input"/>
              </div>
              <ul className="nav">
                <li className="nav-item">
                  <a href="#/home" rel="noopener noreferrer">{this.getLocale('misc.home')}</a>
                </li>
                {/*
                <li className="nav-item">
                  <a href="#/spec" rel="noopener noreferrer">{this.getLocale('misc.spec')}</a>
                </li>
                */}
                <li className="nav-item">
                  <a href="#/components">{this.getLocale('misc.component')}</a>
                </li>
                {/*
                <li className="nav-item">
                  <a>{this.getLocale('misc.demo')}</a>
                </li>
                */}
                <li className="nav-item">
                  <a>{this.getLocale('misc.version')}</a>
                </li>
              </ul>
            </Col>
          </Row>
        </header>
        <div className="main">
          {children}
        </div>
        <footer className="footer">
          <div className="footer-main">
            <p className="footer-main-title">PPFish Design</p>
          </div>
          <div className="footer-social">
            <a href="//github.com/NSFI/ppfish-components" target="_blank" rel="noopener noreferrer">
              <img src={githubSrc}/>
            </a>
          </div>
        </footer>
      </div>
    );
  }
}
