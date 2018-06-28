import React, { Component } from 'react';
import DayTimeSelect from '../index';

import './App.less';

class App extends Component {

  constructor(props) {
    super(props);
  }

  handleTimeSlotChange = (item) => {
    //console.log(item);
  }

  render() {
    return (
      <div className="m-timeslot-list-container">
        <div className="timeslot-item">
          <DayTimeSelect
            timeRange={[1, 24]}
            value={[1,2,5]}
            intervalWidth={37}
            onChange={this.handleTimeSlotChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
