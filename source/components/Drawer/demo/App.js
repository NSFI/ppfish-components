import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Drawer from '../index';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

import './App.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible: false
    };
  }

  handleOpen= e=>{
    this.setState({
      visible: true
    });
  };

  handleClose= e=>{
    this.setState({
      visible: false
    });
  };

  render() {
    const {visible} = this.state;

    return (
      <DocumentLayout>
        <p>The container should be relative positioned and overflow hidden.</p>
        <div className="g-container">
          <Drawer visible={visible} onClose={this.handleClose}>
            <div style={{"padding":"20px"}}>This is custom contents.</div>
          </Drawer>
        </div>
        <button onClick={this.handleOpen}>Open Drawer</button>
      </DocumentLayout>
    );
  }
}

App.propTypes = {};

export default App;
