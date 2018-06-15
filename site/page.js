import React from 'react';
import ScrollToTop from 'react-scroll-up';
import locales from './locales';
import pages from './pages';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    window.addEventListener("hashchange", () => {
      window.scrollTo(0, 0);

      this.setPage();
    }, false);
  }

  componentDidMount() {
    this.setPage();
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

  getPage() {
    const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);

    if (routes) {
      return routes[2];
    }

    return 'quick-start';
  }

  setPage(fn) {
    this.setState({page: this.getPage()}, fn);
  }

  //根据page参数获取对应的页的markdown文件并解析
  getComponent(page) {
    this.components = this.components || Object.assign(Object.values(pages.components).reduce((a, b) => {
      return Object.assign(a, b);
    }, {}), pages.documents);

    const result = this.components[page] || this.components['quick-start'];
    if (result) {
      return React.createElement(result, {
        locale: {
          show: this.getLocale('markdown.show'),
          hide: this.getLocale('markdown.hide')
        }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <h1>
              LOGO
            </h1>
            <ul className="nav">
              <li className="nav-item">
                <a href="/"
                   rel="noopener noreferrer">首页</a>
              </li>
              <li className="nav-item">
                <a href="/spec" rel="noopener noreferrer">设计语言</a>
              </li>
              <li className="nav-item">
                <a className="active">{this.getLocale('misc.component')}</a>
              </li>
            </ul>
          </div>
        </header>
        <div className="main container">
          <nav className="side-nav">
            <ul>
              <li className="nav-item">
                <a>{this.getLocale('misc.development')}</a>
                <ul className="pure-menu-list sub-nav">
                  {
                    Object.keys(pages.documents).map(page => {
                      return (
                        <li className="nav-item" key={page}>
                          <a href={`#/${page}`}
                             className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}</a>
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
              <li className="nav-item">
                <a>{this.getLocale('misc.components')}</a>
                {
                  Object.keys(pages.components).map(group => {
                    return (
                      <div className="nav-group" key={group}>
                        <div className="nav-group__title">{group}</div>
                        <ul className="pure-menu-list">
                          {
                            Object.keys(pages.components[group]).map(page => {
                              return (
                                <li key={page} className="nav-item">
                                  <a href={`#/${page}`}
                                     className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}</a>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    );
                  })
                }
              </li>
            </ul>
          </nav>
          <div className="content">
            {this.getComponent(this.state.page)}
            <ScrollToTop showUnder={210}>
              <div className="page-component-up">
                <i className="el-icon-caret-top"></i>
              </div>
            </ScrollToTop>
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="footer-main">
              <p className="footer-main-title">PPFish</p>
            </div>
            <div className="footer-social">
              <a href="//github.com/NSFI/ppfish-components" target="_blank" rel="noopener noreferrer">
                <img src={require('./assets/github.png')}/>
              </a>
            </div>
          </div>
        </footer>
        <div id="slider-container"></div>
      </div>
    );
  }
}
