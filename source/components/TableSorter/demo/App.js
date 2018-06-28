import React, {Component} from 'react';
import './App.less';
import TableSorter from '../index';
import {Icon} from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: '',
      order: 'ascend'
    };
  }

  handleChangeSorter = (sortBy, order) => {
    this.setState({sortBy, order});
  };

  render() {
    const {sortBy, order} = this.state;
    return (
      <div>
        <div className="sorter-demo-container">
          <h3>State</h3>
          {Object.keys(this.state).map(key => <p key={key}>{`${key}: ${this.state[key]}`}</p>)}
        </div>
        <div className="sorter-demo-container">
          <h3>普通模式</h3>
          <TableSorter
            handleChangeSorter={this.handleChangeSorter}
            sortBy={sortBy}
            sortKey="name"
            order={order}
          />
          <h3>自定义模式</h3>
        </div>
        <div className="sorter-demo-container">
          <TableSorter
            handleChangeSorter={this.handleChangeSorter}
            sortBy={sortBy}
            sortKey="id"
            order={order}
            iconDown={<Icon type="down-circle"/>}
            iconUp={<Icon type="up-circle"/>}
            customMode={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
