/* eslint-disable no-console */
import React, { Component } from 'react';
import './App.less';
import Collapse from '../index';
const CollapsePanel = Collapse.Panel;

class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(key) {
    console.log(`你点击的项目的key: ${key}`);
  }

  render() {
    return (
      <div style={{ margin: 100 }}>
        <Collapse
          defaultActiveKey={['todayBusiness']}
          onChange={this.onChange}
          isScrollToHeader
          accordion
        >
          <CollapsePanel header={'当日成交'} key="todayBusiness">
            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
          </CollapsePanel>
          <CollapsePanel header={'当日委托'} key="todayEntrust">
            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
          </CollapsePanel>
          <CollapsePanel header={'历史成交'} key="beforeBusiness">
            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
          </CollapsePanel>
          <CollapsePanel header={'历史委托'} key="beforeEntrust">
            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
          </CollapsePanel>
          <CollapsePanel header={'发财啦'} key="facai">
            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
          </CollapsePanel>
          <CollapsePanel header={'红中'} key="hongzhong">
            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
          </CollapsePanel>
          <CollapsePanel header={'白板'} key="baiban">
            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
          </CollapsePanel>
        </Collapse>
      </div>
    );
  }
}

export default App;
