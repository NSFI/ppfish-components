import React from 'react';
import {Divider, BackTop, Icon, Row, Col, Menu, Drawer} from '../../../source/components';
import PropTypes from 'prop-types';
import {enquireScreen, unenquireScreen} from 'enquire-js';
import {Scrollbars} from 'react-custom-scrollbars';
import Layout from '../common/layout';
import locales from '../../locales';
import {components, plainComponents} from '../../componentsPage';
import './index.less';

const isShowAllComponents = true;

export default class Components extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    params: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.plainComponentList = plainComponents.filter(component => isShowAllComponents || component.published);
    let isMobile = false;
    enquireScreen((b) => {
      isMobile = b;
    }, 'only screen and (max-width: 992px)');
    this.state = {
      page: '',
      isMobile: isMobile,
    };
  }

  componentWillMount() {
    window.addEventListener("hashchange", this.setActiveKey, false);
  }

  componentDidMount() {
    this.setActiveKey();
    this.screentRegister = this.enquireScreenRegister();
  }

  componentDidUpdate() {
    document.querySelector('.content').parentNode.scrollTop = 0;
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.setActiveKey, false);
    this.unenquireScreenRegister();
  }

  //监听屏幕宽度
  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 992px)';
    return enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  //取消监听
  unenquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 992px)';
    unenquireScreen(this.screentRegister, mediaCondition);
  };

  getLocale = (key) => {
    const map = locales || {};
    return key.split('.').reduce((a, b) => {
      const parent = map[a];
      if (b) {
        return (parent || {})[b];
      }
      return parent;
    });
  };

  getActiveKeyFromParams = () => {
    return this.props.params.demo || this.plainComponentList[0].key;
  };

  setActiveKey = () => {
    this.setState({page: this.getActiveKeyFromParams()});
  };

  render() {
    const SubMenu = Menu.SubMenu;
    const componentIndex = this.plainComponentList.findIndex((menuItem) => menuItem.key === this.state.page);
    const prevLink = this.plainComponentList[componentIndex - 1];
    const nextLink = this.plainComponentList[componentIndex + 1];
    const {isMobile} = this.state;
    const menuChild = (
      <nav className="side-nav">
        <Menu
          selectedKeys={[this.state.page]}
          defaultOpenKeys={Object.keys(components).map(key => this.getLocale(`misc.${key}`))}
          mode="inline"
        >
          {
            Object.keys(components).map(type => {
              const typeList = components[type];
              if (typeList && typeList.every(componentsList => componentsList.children)) {
                const menuList = typeList.map(typeListItem => {
                  return {
                    title: typeListItem.key,
                    children: typeListItem.children
                      .filter(components => isShowAllComponents || components.published)
                      .map(component => ({
                        key: component.key,
                        href: `#/components/${component.key}`,
                        title: component.name,
                      }))
                  };
                });
                return (
                  menuList.length &&
                  <SubMenu key={this.getLocale(`misc.${type}`)} title={this.getLocale(`misc.${type}`)}>
                    {
                      menuList.map(subMenu => (
                        <Menu.ItemGroup key={subMenu.title} title={subMenu.title} disabled={false}>
                          {
                            subMenu.children.map(component => {
                              return (
                                <Menu.Item key={component.key}>
                                  <a href={component.href}>{component.title}</a>
                                </Menu.Item>
                              );
                            })
                          }
                        </Menu.ItemGroup>
                      ))
                    }
                  </SubMenu>
                );
              }
              else {
                //二级菜单
                const menuList = typeList
                  .filter(components => isShowAllComponents || components.published)
                  .map(components => ({
                    key: components.key,
                    href: `#/components/${components.key}`,
                    title: components.name,
                  }));
                return (
                  menuList.length &&
                  <SubMenu key={this.getLocale(`misc.${type}`)} title={this.getLocale(`misc.${type}`)}>
                    {
                      menuList.map(component => {
                        return (
                          <Menu.Item key={component.key}>
                            <a href={component.href}>{component.title}</a>
                          </Menu.Item>
                        );
                      })
                    }
                  </SubMenu>
                );
              }
            })
          }
        </Menu>
      </nav>
    );
    return (
      <Layout className="doc" hideFooter>
        <Row className="component-container">
          {isMobile ?
            <Drawer
              key="Mobile-menu"
              wrapperClassName="m-mobile-menu"
              placement="left"
            >
              {menuChild}
            </Drawer> :
            <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4} className="component-list">
              <Scrollbars autoHide>
                {menuChild}
              </Scrollbars>
            </Col>
          }
          <Col xs={24} sm={24} md={24} lg={18} xl={19} xxl={20} className="component-content">
            <Scrollbars autoHide>
              <div className="content">
                <article className="markdown">
                  {this.props.children}
                </article>
                <Divider/>
                <Row className="u-navigation-btm">
                  <Col span={12} className="prev-page">
                    {
                      prevLink &&
                      <a href={`#/components/${prevLink.key}`}>
                        <Icon type="left" className="prev-page-icon"/>{prevLink.name}
                      </a>
                    }
                  </Col>
                  <Col span={12} className="next-page">
                    {
                      nextLink &&
                      <a href={`#/components/${nextLink.key}`}>
                        {nextLink.name}<Icon type="right" className="next-page-icon"/>
                      </a>
                    }
                  </Col>
                </Row>
                <BackTop target={() => document.querySelector('.content').parentNode}/>
              </div>
            </Scrollbars>
          </Col>
        </Row>
      </Layout>
    );
  }
}
