import React, {Component} from 'react';
import {render} from 'react-dom';
import queryString from 'query-string';
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
    // 异步加载组件方式3：
    const DemoApp = requireContext(`./${upcaseFirstChar(queryObj.name)}/demo/App.js`);
    return (
      <DemoApp/>
    );
  }

  getList() {
    return (
      <div>
        <ul>
          {
            requireContext.keys().map((id) => {
              const idx = id.indexOf('/') + 1;
              const name = id.slice(idx, id.indexOf('/', idx));
              return (
                <li key={name}><a href={`?name=${name}`}>{name}</a></li>
              );
            })
          }

        </ul>
      </div>
    );
  }

  onClick = () => {
  };

  render() {
    return (<div style={{margin: 100}}>
      {queryObj.name ? this.getComponent() : this.getList()}
    </div>);
  }
}


render(<App/>, document.getElementById('demo-content'));
