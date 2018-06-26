import React from 'react';
import {Row, Col} from 'antd';
import locales from './locales';
import PropTypes from "prop-types";

const githubSrc = require('./assets/github.png');

export default class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };

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
        if (key && current.indexOf(key) > -1) {
          menuItem.classList.add(cls);
        } else {
          menuItem.classList.remove(cls);
        }
      });
    }

    setHighlight(menuItems, HIGHLIGHT_CLS);
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
