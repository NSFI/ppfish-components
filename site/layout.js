import React from 'react';
import { Row, Col } from 'antd';
import locales from './locales';

const githubSrc = require('./assets/github.png');

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setMenuHighlight();
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
        if ( key && current === key ) {
          menuItem.classList.add(cls);
        } else {
          menuItem.classList.remove(cls);
        }
      });
    }
    setHighlight(menuItems, HIGHLIGHT_CLS);
  }

  render() {
    const {children, className} = this.props;
    return (
      <div className="app">
        <header className="header">
          <Row>
            <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4}>
              <h1>
                LOGO
              </h1>
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={19} xxl={20}>
              <ul className="nav">
                <li className="nav-item">
                  <a href="#/home/" rel="noopener noreferrer">首页</a>
                </li>
                <li className="nav-item">
                  <a href="#/spec/" rel="noopener noreferrer">设计语言</a>
                </li>
                <li className="nav-item">
                  <a href="#/components/">{this.getLocale('misc.component')}</a>
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
            <p className="footer-main-title">PPFish</p>
          </div>
          <div className="footer-social">
            <a href="//github.com/NSFI/ppfish-components" target="_blank" rel="noopener noreferrer">
              <img src={githubSrc}/>
            </a>
          </div>
        </footer>
        <div id="slider-container"></div>
      </div>
    );
  }
}
