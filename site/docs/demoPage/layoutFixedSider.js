import React from "react";
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon } from '../../../source/components';

const { Header, Content, Footer, Sider } = Layout;
const DEMOIconProps = {
  className:"img-icon-14 fishdicon",
  style:{ width: '14px', verticalAlign: 'middle'}
};
ReactDOM.render(
  <Layout>
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <img {...DEMOIconProps} src="../static/icons/demo-pie.svg" />
          <span className="nav-text">nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <img {...DEMOIconProps} src="../static/icons/demo-play.svg" />
          <span className="nav-text">nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="download-line" />
          <span className="nav-text">nav 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <img {...DEMOIconProps} src="../static/icons/demo-image.svg" />
          <span className="nav-text">nav 4</span>
        </Menu.Item>
        <Menu.Item key="5">
          <img {...DEMOIconProps} src="../static/icons/demo-grid.svg" />
          <span className="nav-text">nav 5</span>
        </Menu.Item>
        <Menu.Item key="6">
          <img {...DEMOIconProps} src="../static/icons/demo-bargraph.svg" />
          <span className="nav-text">nav 6</span>
        </Menu.Item>
        <Menu.Item key="7">
          <img {...DEMOIconProps} src="../static/icons/demo-play.svg" />
          <span className="nav-text">nav 7</span>
        </Menu.Item>
        <Menu.Item key="8">
          <Icon type="Settingx" />
          <span className="nav-text">nav 8</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          ...
          <br />
          Really
          <br />...<br />...<br />...<br />
          long
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />
          content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Fish Design
      </Footer>
    </Layout>
  </Layout>,
  document.getElementById('app')
);
