import React, { Component } from 'react';
import { render } from 'react-dom';
import { Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router';
import queryString from 'query-string';


import RouteMap from './routers/index';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import './demo.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const requireContext = require.context("./components", true, /demo\/App\.js$/);
const upcaseFirstChar = (name) => {
  if (!name || typeof name != 'string') {
    return '';
  }
  return name.replace(/^\w/, function (a) {
    return a.toUpperCase();
  });
};
const queryObj = queryString.parse(location.search);

class App extends Component {
  constructor() {
    super();
    this.state = {
      component: null,
    };
  }

  componentDidMount() {
  }
  changeUrl = (url) => {
    this.context.router = url

  }
  getComponent() {
    // 异步加载组件方式1：
    // require.ensure([], () => {
    //   const DemoApp = require(`./components/${upcaseFirstChar(queryObj.name)}/demo/App.js`);
    //   this.setState({
    //     component: <DemoApp />,
    //   });
    // });
    // 异步加载组件方式2：
    // import(`./components/${upcaseFirstChar(queryObj.name)}/demo/App.js`)
    //   .then((DemoApp) => {
    //     this.setState({
    //       component: <DemoApp />,
    //     });
    //   })
    //异步加载组件方式3：
    const DemoApp = requireContext(`./${upcaseFirstChar(queryObj.name)}/demo/App.js`);
    return (
      <div>
        <DemoApp />
      </div>
    );
  }

  getList() {
    return (
      <div className="g-wrapper">
        <Header style={{ width: 200, marginTop: 20 }} />
        <RouteMap />
        <Footer />
        {/* <ul>
          {
            requireContext.keys().map((id) => {
              const idx = id.indexOf('/') + 1;
              const name = id.slice(idx, id.indexOf('/', idx));
              return (
                <li key={name}><a href={`?name=${name}`}>{name}</a></li>
              );
            })
          }

        </ul> */}

      </div>
    );
  }

  onClick = () => {
  };

  render() {
    return (<div>
      {queryObj.name ? this.getComponent() : this.getList()}
    </div>);
  }
}


render(<App />, document.getElementById('demo-content'));
