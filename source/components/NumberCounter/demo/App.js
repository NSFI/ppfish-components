import React, {Component} from 'react';
import './App.less';
import NumberCounter from '../index';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 42
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div style={{textAlign:'center'}}>
        <label className="label">
          输入任意数字：
          <input
            className="input"
            value={this.state.value}
            onChange={this.handleChange.bind(this)} />
          <div className="highlight" />
        </label>
        <NumberCounter
          value={parseInt(this.state.value, 10) || 0}
          commas={true}
          timeout={500}
          steps={10}
        />
      </div>
    );
  }
}
export default App;
