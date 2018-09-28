import React from "react";
import ReactDOM from 'react-dom';
import { Alert } from '../../../source/components';

class Demo extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Alert message="Warning text" banner />
        <br />
        <Alert message="Very long warning text warning text text text text text text text" banner closable />
        <br />
        <Alert showIcon={false} message="Warning text without icon" banner />
        <br />
        <Alert type="error" message="Error text" banner />
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('app')
);
