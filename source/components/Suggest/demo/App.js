/* eslint-disable no-console */
import React, { Component } from 'react';
import './App.less';
import Suggest from '../index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onSelect(val) {
    console.log(val.prod_name);
  }

  render() {
    return (
      <div style={{ margin: 100 }}>
        <Suggest onSelect={this.onSelect.bind(this)} />
      </div>
    );
  }
}

export default App;
