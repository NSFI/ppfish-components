import React, { Component } from 'react';
import DayTimeSelect from '../index';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

import './App.less';

class App extends Component {

  constructor(props) {
    super(props);
  }

  handleTimeSlotChange = (item) => {
    console.log(item);
  }

  render() {
    return (
      <DocumentLayout>
      <div className="m-timeslot-list-container">
        <div className="timeslot-item">
          <DayTimeSelect
            timeRange={[1, 24]}
            value={[1,2,5]}
            onChange={this.handleTimeSlotChange}
          />
        </div>
      </div>
      </DocumentLayout>
    );
  }
}

export default App;
