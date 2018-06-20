import React from 'react';
import { BackTop, Row, Col } from 'antd';
import Layout from './layout';
import locales from './locales';
import pages from './pages';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    window.addEventListener("hashchange", this.setComponentShow, false);
  }

  componentDidMount() {
    this.setPage();
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.setComponentShow, false);
  }

  setComponentShow = () => {
    window.scrollTo(0, 0);

    this.setPage();
  };

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
      <Layout>
        <Row>
          <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4}>
            <nav className="side-nav">
              <ul>
                <li className="nav-item">
                  <a>{this.getLocale('misc.development')}</a>
                  <ul className="pure-menu-list sub-nav">
                    {
                      Object.keys(pages.documents).map(page => {
                        return (
                          <li className="nav-item" key={page}>
                            <a href={`#/components/${page}`}
                               className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}
                            </a>
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
                                    <a href={`#/components/${page}`}
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
          </Col>
          <Col xs={24} sm={24} md={24} lg={18} xl={19} xxl={20}>
            <div className="content">
              <article className="markdown">
                {this.getComponent(this.state.page)}
                <BackTop />
              </article>
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}
