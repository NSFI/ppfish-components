import React, { Component } from 'react';
import './App.less';
import Loading from '../index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loadingIcon = require('./loading.gif');
    return (
      <div>
        <h3>示例1： 使用spin</h3>
        <div style={{ margin: 100, height: 100, position: 'relative' }}>
          <Loading
          />
        </div>
        <h3>示例1： 使用icon</h3>
        <div style={{ margin: 100, height: 100, position: 'relative' }}>
          <Loading
            loadingIcon={loadingIcon}
          />
        </div>
      </div>
    );
  }
}

export default App;
