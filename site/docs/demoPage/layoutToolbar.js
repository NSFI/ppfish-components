import React from "react";
import ReactDOM from 'react-dom';
import {Layout, Menu, Icon, FooterToolbar, Button} from '../../../source/components';
import '../../static/Icons';
const {Header, Content, Sider} = Layout;
const DEMOIconProps = {
  className:"img-icon-14 fishdicon",
  style:{ width: '14px', verticalAlign: 'middle'}
};

ReactDOM.render(
  <Layout>
    <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
      <div className="logo"/>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <window.IconPie {...DEMOIconProps} />
          <span className="nav-text">nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <window.IconVideoCamera {...DEMOIconProps}  />
          <span className="nav-text">nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <window.IconDownloadLine {...DEMOIconProps}/>
          <span className="nav-text">nav 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <window.IconBarChart  {...DEMOIconProps} />
          <span className="nav-text">nav 4</span>
        </Menu.Item>
        <Menu.Item key="5">
          <window.IconGrid {...DEMOIconProps}  />
          <span className="nav-text">nav 5</span>
        </Menu.Item>
        <Menu.Item key="6">
          <window.IconBargraph {...DEMOIconProps}  />
          <span className="nav-text">nav 6</span>
        </Menu.Item>
        <Menu.Item key="7">
          <window.IconPlay {...DEMOIconProps}/>
          <span className="nav-text">nav 7</span>
        </Menu.Item>
        <Menu.Item key="8">
          <window.IconSetting {...DEMOIconProps}/>
          <span className="nav-text">nav 8</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{marginLeft: 200, position: 'relative'}}>
      <Header style={{background: '#fff', padding: 0}}/>
      <Content style={{margin: '24px 16px 76px', overflow: 'initial'}}>
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
