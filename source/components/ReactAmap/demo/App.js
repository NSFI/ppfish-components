import React, {Component} from 'react';
import {Map} from '../components';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

import './App.less';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <DocumentLayout>
        <div className="container">
          <Map
            amapkey={'a340e5f3036aa084e722361c3025c729'}
          >
          </Map>
        </div>
      </DocumentLayout>
    );
  }
}
export default App;
