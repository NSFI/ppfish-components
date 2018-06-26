import React from 'react';
import {BackTop, Row, Col, Menu, Icon, Divider} from 'antd';
import Layout from './layout';
import locales from './locales';
import components from './componentsPage';

const SubMenu = Menu.SubMenu;

export default class Components extends React.Component {
  constructor(props) {
    super(props);
    const menuList = [];
    // 开发指南
    Object.keys(components.documents).map(key => {
      menuList.push({
        key: this.getLocale(`page.${key}`),
        url: `#/components/${key}`
      });
    });
    // 基础组件
    Object.keys(components.list).map((group) => (
      Object.keys(components.list[group]).map(key => {
        menuList.push({
          key: this.getLocale(`page.${key}`),
          url: `#/components/${key}`
        });
      })
    ));
    this.state = {menuList};
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
    this.components = this.components || Object.assign(Object.values(components.list).reduce((a, b) => {
      return Object.assign(a, b);
    }, {}), components.documents);

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
    const componentIndex = this.state.menuList.findIndex((menuItem) => menuItem.key === this.getLocale(`page.${this.state.page}`));
    const lastLink = this.state.menuList[componentIndex - 1];
    const nextLink = this.state.menuList[componentIndex + 1];
    const Navigation = (
      <div>
        <Divider/>
        <Row className="u-navigation-btm">
          <Col span={12} className="prev-page">
            {lastLink && <a href={lastLink.url}><Icon type="arrow-left" className="prev-page-icon"/>{lastLink.key}</a>}
          </Col>
          <Col span={12} className="next-page">
            {nextLink && <a href={nextLink.url}>{nextLink.key}<Icon type="arrow-right" className="next-page-icon"/></a>}
          </Col>
        </Row>
      </div>
    );
    return (
      <Layout className="doc">
        <Row>
          <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4}>
            <nav className="side-nav">
              <Menu
                selectedKeys={[this.state.page]}
                defaultOpenKeys={[this.getLocale('misc.development'), this.getLocale('misc.components')]}
                mode="inline"
              >
                <SubMenu key={this.getLocale('misc.development')} title={this.getLocale('misc.development')}>
                  {
                    Object.keys(components.documents).map(page => {
                      return (
                        <Menu.Item key={page}>
                          <a href={`#/components/${page}`}>{this.getLocale(`page.${page}`)}
                          </a>
                        </Menu.Item>
                      );
                    })
                  }
                </SubMenu>
                <SubMenu key={this.getLocale('misc.components')} title={this.getLocale('misc.components')}>
                  {
                    Object.keys(components.list).map(group => {
                      return (
                        <Menu.ItemGroup key={group} title={group} disabled={false}>
                          {
                            Object.keys(components.list[group]).map(page => {
                              return (
                                <Menu.Item key={page}>
                                  <a href={`#/components/${page}`}>{this.getLocale(`page.${page}`)}</a>
                                </Menu.Item>
                              );
                            })
                          }
                        </Menu.ItemGroup>
                      );
                    })
                  }
                </SubMenu>
              </Menu>
            </nav>
          </Col>
          <Col xs={24} sm={24} md={24} lg={18} xl={19} xxl={20}>
            <div className="content">
              <article className="markdown">
                {this.getComponent(this.state.page)}
                {Navigation}
                <BackTop/>
              </article>
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}
