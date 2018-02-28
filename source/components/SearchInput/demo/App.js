import React, {Component} from 'react';
import './App.less';
import SearchInput from '../index';
import {Modal} from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
  }

  onSearch = (text) => {
    Modal.info({
      title:`From SearchInput: ${text}`
    });
  };

  render() {
    return (
      <div style={{width: 220}}>
        <SearchInput
          placeholder={"请输入..."}
          onSearch={this.onSearch}
        />
      </div>
    );
  }

}

export default App;
