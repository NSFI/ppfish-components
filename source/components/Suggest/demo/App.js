/* eslint-disable no-console */
import React, { Component } from 'react';
import './App.less';
import Suggest from '../index';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

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
      <DocumentLayout>
        <div style={{ margin: 100 }}>
          <Suggest onSelect={this.onSelect.bind(this)} />
        </div>
      </DocumentLayout>
    );
  }
}

export default App;
