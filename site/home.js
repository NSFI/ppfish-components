import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <h1>
              LOGO
            </h1>
            <ul className="nav">
              <li className="nav-item">
                <Link className="active" rel="noopener noreferrer">首页</Link>
              </li>
              <li className="nav-item">
                <Link to="spec/" rel="noopener noreferrer">设计语言</Link>
              </li>
              <li className="nav-item">
                <Link to="components/">组件</Link>
              </li>
            </ul>
          </div>
        </header>
        <div>首页</div>
      </div>
    );
  }
}
