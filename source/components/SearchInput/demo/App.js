import React, {Component} from 'react';
import './App.less';
import SearchInput from '../index';
import {Modal} from 'antd';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

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
      <DocumentLayout>
        <div style={{width: 220,margin:100}}>
          <SearchInput
            placeholder={"请输入..."}
            onSearch={this.onSearch}
          />
        </div>
      </DocumentLayout>
    );
  }

}

export default App;
