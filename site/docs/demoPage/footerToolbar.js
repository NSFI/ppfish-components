import React from "react";
import ReactDOM from 'react-dom';
import {FooterToolbar, Button} from '../../../source/components';

class Demo extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{background: '#f7f7f7'}}>
        <div style={{padding: 24, marginBottom: 52}}>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
        </div>
        <FooterToolbar>
          <Button>取消</Button>
          <Button type="primary" style={{marginLeft: 8}}>保存</Button>
        </FooterToolbar>
      </div>);
  }
}

ReactDOM.render(
  <Demo/>,
  document.getElementById('app')
);
