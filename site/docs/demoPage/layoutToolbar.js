import React from "react";
import ReactDOM from 'react-dom';
import {Layout, Menu, Icon, FooterToolbar, Button} from '../../../source/components';

const {Header, Content, Sider} = Layout;

ReactDOM.render(
  <Layout>
    <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
      <div className="logo"/>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Icon type="demo-pie"/>
          <span className="nav-text">nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera"/>
          <span className="nav-text">nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="download-line"/>
          <span className="nav-text">nav 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="bar-chart"/>
          <span className="nav-text">nav 4</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="demo-grid"/>
          <span className="nav-text">nav 5</span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="demo-bargraph"/>
          <span className="nav-text">nav 6</span>
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="demo-play"/>
          <span className="nav-text">nav 7</span>
        </Menu.Item>
        <Menu.Item key="8">
          <Icon type="Settingx"/>
          <span className="nav-text">nav 8</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{marginLeft: 200, position: 'relative'}}>
      <Header style={{background: '#fff', padding: 0}}/>
      <Content style={{margin: '24px 16px 89px', overflow: 'initial'}}>
        <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
          ...
          <br/>
          Really
          <br/>...<br/>...<br/>...<br/>
          long
          <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
          <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
          <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
          <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
          <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
          <br/>...<br/>...<br/>...<br/>...<br/>...<br/>...
          <br/>...<br/>...<br/>...<br/>...<br/>...<br/>
          content
        </div>
      </Content>
      <FooterToolbar>
        <Button>取消</Button>
        <Button type="primary" style={{marginLeft: 8}}>保存</Button>
      </FooterToolbar>
    </Layout>
  </Layout>,
  document.getElementById('app')
);
