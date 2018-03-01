/* eslint-disable no-console */
import React, { Component } from 'react';
import './App.less';
import TextOverflow from '../index';


const TEXT1 = Array.from(Array(45)).fill('字');
const TEXT2 = Array.from(Array(120)).fill('1字');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: TEXT1
    };
  }
  toggleText = () => {
    if (this.state.data == TEXT1) {
      this.setState({ data: TEXT2 });
    } else {
      this.setState({ data: TEXT1 });
    }
  }
  render() {
    return (
      <div style={{ margin: 100, backgroundColor:'lightblue'}}>
        <TextOverflow  >{this.state.data}</TextOverflow>
        <button onClick={this.toggleText}>切换字符</button>
      </div>
    );
  }
}

export default App;
