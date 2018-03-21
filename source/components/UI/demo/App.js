import React, { Component } from 'react';
import './App.less';
import UIcomponent from '../index';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DocumentLayout>
       <UIcomponent />
      </DocumentLayout>
    );
  }
}

export default App;
