import React from 'react';
import {Divider} from 'antd';
import {BackTop, Icon, Row, Col, Menu} from '../../../source/components';
import MobileMenu from 'rc-drawer';
import PropTypes from 'prop-types';
import Layout from '../common/layout';
import locales from '../../locales';
import components from '../../componentsPage';
import {getPlainComponentList, getComponentDepth} from '../../utils';
import {enquireScreen, unenquireScreen} from 'enquire-js';
import '../../styles/rc-drawer.less';
import './index.less';

const SubMenu = Menu.SubMenu;
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
    this.plainComponentList = getPlainComponentList();
    this.state = {
      page: '',
      isMobile: isMobile,
    };
  }

  componentWillMount() {
    window.addEventListener("hashchange", this.setComponentShow, false);
  }

  componentDidMount() {
    this.setPage();
    this.screentRegister = this.enquireScreenRegister();
  }

  componentDidUpdate() {
    const componentContent = document.querySelector('.component-content');
    componentContent.scrollTop = 0;
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.setComponentShow, false);
    this.unenquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 992px)';
    return enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  unenquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 992px)';
    unenquireScreen(this.screentRegister, mediaCondition);
  };


  setComponentShow = () => {
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
    return this.props.params.demo || this.plainComponentList[0].key;
  }

  setPage(fn) {
    this.setState({page: this.getPage()}, fn);
  }

  render() {
    const componentIndex = this.plainComponentList.findIndex((menuItem) => menuItem.key === this.state.page);
    const {isMobile} = this.state;
    const lastLink = this.plainComponentList[componentIndex - 1];
    const nextLink = this.plainComponentList[componentIndex + 1];
    const Navigation = (
      <div>
        <Divider/>
        <Row className="u-navigation-btm">
          <Col span={12} className="prev-page">
            {lastLink && <a href={lastLink.url}><Icon type="left" className="prev-page-icon"/>{lastLink.value.name}</a>}
          </Col>
          <Col span={12} className="next-page">
            {nextLink &&
            <a href={nextLink.url}>{nextLink.value.name}<Icon type="right" className="next-page-icon"/></a>}
          </Col>
        </Row>
      </div>
    );
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
                return (
                  <SubMenu key={this.getLocale(`misc.${key}`)} title={this.getLocale(`misc.${key}`)}>
                    {
                      Object.keys(components[key]).map(page => {
                        return (
                          <Menu.Item key={page}>
                            <a href={`#/components/${page}`}>{components[key][page].name}</a>
                          </Menu.Item>
                        );
                      })
                    }
                  </SubMenu>
                );
              } else if (depth === 2) {
                //三层菜单
                return (
                  <SubMenu key={this.getLocale(`misc.${key}`)} title={this.getLocale(`misc.${key}`)}>
                    {
                      Object.keys(components[key]).map(group => {
                        return (
                          <Menu.ItemGroup key={group} title={group} disabled={false}>
                            {
                              Object.keys(components[key][group]).map(page => {
                                return (
                                  <Menu.Item key={page}>
                                    <a href={`#/components/${page}`}>{components[key][group][page].name}</a>
                                  </Menu.Item>
                                );
                              })
                            }
                          </Menu.ItemGroup>
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
            <MobileMenu
              key="Mobile-menu"
              wrapperClassName="m-mobile-menu"
            >
              {menuChild}
            </MobileMenu> :
            <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4} className="component-list">
              {menuChild}
            </Col>
          }
          <Col xs={24} sm={24} md={24} lg={18} xl={19} xxl={20} className="component-content">
            <div className="content">
              <article className="markdown">
                {this.props.children}
              </article>
              {Navigation}
              <BackTop target={() => document.querySelector('.component-content')}>
                <img src={require('../../assets/nppd-web-1.51-but@2x.png')} className="u-backtop" alt="backTop"/>
              </BackTop>
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}
