# DayTimeSelect 时间点选择器

### 描述

当用户需要选择一段或多段时间点时，点击选择

### API

|参数|说明|类型|默认值|
|:-|:-|:-|:-|
|timeRange|时间选择范围|array|[1,24]|
|disable|是否禁用|bool|false|
|value|默认选中的值|array|无|
|intervalWidth|每个间隔的长度，单位px|number|37|
|onChange|时间发生变化的回调|func|() => {}|

### 代码演示

```js
import React, { Component } from 'react';
import DayTimeSelect from '../index';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

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
      <DocumentLayout>
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
      </DocumentLayout>
    );
  }
}

export default App;

```

