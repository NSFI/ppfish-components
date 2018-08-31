import React from 'react';
import {Divider, BackTop, Icon, Row, Col, Menu} from '../../../source/components';
import {Scrollbars} from 'react-custom-scrollbars';
import MobileMenu from 'rc-drawer';
import PropTypes from 'prop-types';
import {enquireScreen, unenquireScreen} from 'enquire-js';
import Layout from '../common/layout';
import locales from '../../locales';
import components from '../../componentsPage';
import {getPlainComponentList, getComponentDepth} from '../../utils';
import './index.less';

const SubMenu = Menu.SubMenu;
const isShowAllComponents = true;
let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
}, 'only screen and (max-width: 992px)');


export default class Components extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    params: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.plainComponentList = getPlainComponentList().filter(component => isShowAllComponents || component.published);
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
            Object.keys(components).map(key => {
              const depth = getComponentDepth(components[key]);
              //两层菜单
              if (depth === 1) {
                const menuList = Object.keys(components[key])
                  .filter(page => isShowAllComponents || components[key][page].published)
                  .map(page => ({
                    key: page,
                    href: `#/components/${page}`,
                    title: components[key][page].name,
                  }));
                return (
                  menuList.length &&
                  <SubMenu key={this.getLocale(`misc.${key}`)} title={this.getLocale(`misc.${key}`)}>
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
              } else if (depth === 2) {
                //三层菜单
                const menuList = Object.keys(components[key])
                  .map(group => ({
                    title: group,
                    components: Object.keys(components[key][group])
                      .filter(page => isShowAllComponents || components[key][group][page].published)
                      .map(page => ({
                        key: page,
                        href: `#/components/${page}`,
                        title: components[key][group][page].name,
                      }))
                  }));
                return (
                  menuList.length &&
                  <SubMenu key={this.getLocale(`misc.${key}`)} title={this.getLocale(`misc.${key}`)}>
                    {
                      menuList.map(subMenu => {
                        return subMenu.components.length &&
                          <Menu.ItemGroup key={subMenu.title} title={subMenu.title} disabled={false}>
                            {
                              subMenu.components.map(component => {
                                return (
                                  <Menu.Item key={component.key}>
                                    <a href={component.href}>{component.title}</a>
                                  </Menu.Item>
                                );
                              })
                            }
                          </Menu.ItemGroup>;
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
            <MobileMenu
              key="Mobile-menu"
              wrapperClassName="m-mobile-menu"
            >
              {menuChild}
            </MobileMenu> :
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
                      <a href={prevLink.url}>
                        <Icon type="left" className="prev-page-icon"/>{prevLink.value.name}
                      </a>
                    }
                  </Col>
                  <Col span={12} className="next-page">
                    {
                      nextLink &&
                      <a href={nextLink.url}>
                        {nextLink.value.name}<Icon type="right" className="next-page-icon"/>
                      </a>
                    }
                  </Col>
                </Row>
                <BackTop target={() => document.querySelector('.content').parentNode}>
                  <img src={'//ysf.nosdn.127.net/wkohrqpcnyecodfhfpduzggtvgbhjxpv'} className="u-backtop"
                       alt="backTop"/>
                </BackTop>
              </div>
            </Scrollbars>
          </Col>
        </Row>
      </Layout>
    );
  }
}
