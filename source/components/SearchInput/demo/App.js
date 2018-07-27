import React, {Component} from 'react';
import './App.less';
import SearchInput from '../index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  onSearch = (text) => {
    alert(`From SearchInput: ${text}`);
  };

  render() {
    return (
      <div style={{width: 220,margin:100}}>
        <SearchInput
          placeholder={"请输入..."}
          onSearch={this.onSearch}
        />
      </div>
    );
  }

}

export default App;
