import React from 'react';

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
                <a className="active" href="/#/home/" rel="noopener noreferrer">首页</a>
              </li>
              <li className="nav-item">
                <a href="/#/spec/" rel="noopener noreferrer">设计语言</a>
              </li>
              <li className="nav-item">
                <a href="/#/">组件</a>
              </li>
            </ul>
          </div>
        </header>
        <div>首页</div>
      </div>
    );
  }
}
