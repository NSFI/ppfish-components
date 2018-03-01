import React, { Component } from 'react';
import './App.less';
import TreeSelect from '../index';
import { Checkbox, Button } from 'antd';

// API定义的树形结构
const data = [
  {
    text: '浙江',
    key: '232ddsds',
    values: [
      {
        text: '杭州',
        key: '232ddsd1',
        values: [
          {
            text: '萧山',
            key: 'kk12111',
            values: []
          },
          {
            text: '滨江',
            key: 'kk12112',
            values: []
          },
          {
            text: '下沙',
            key: 'kk12113',
            values: []
          }
        ]
      },
      {
        text: '温州',
        key: '232ddsd2',
        values: []
      },
      {
        text: '金华',
        key: '232ddsd3',
        values: []
      }
    ]
  },
  {
    text: '江西',
    key: '13232dad1',
    values: [
      {
        text: '南昌',
        key: '13232dad2',
        values: []
      },
      {
        text: '赣州',
        key: '13232dad3',
        values: []
      },
      {
        text: '合肥',
        key: '13232dad4',
        values: []
      }
    ]
  }
];
const defaultSelectedMap = {
  'kk12112': true,
  '13232dad2': true,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleGetSelected = this.handleGetSelected.bind(this);
    this.state = {
      selectedObj: null,
      selectedItems: [{text: '滨江', key: 'kk12112'},{text: '南昌', key: '13232dad2'}],
    };
  }

  handleChange(key, checked) {
    const { selectedObj } = this.state;
    this.setState({
      selectedObj: Object.assign({}, selectedObj, {
        [`${key}`]: checked
      })
    });
  }

  handleAllChange(checked) {
    this.setState({
      selectedObj: checked
    });
  }

  handleGetSelected(selectedItems, key, value) {
    // 获取selectedObj
    const selectedObj = {
      [`${key}`]: value
    };
    this.setState({
      selectedItems,
      selectedObj,
    });
  }

  render() {
    const { selectedObj, selectedItems } = this.state;
    return (
      <div style={{ margin: 100 }}>
        <TreeSelect
          multiple={true}
          data={data}
          defaultSelectedMap={defaultSelectedMap}
          selectedObj={selectedObj}
          onSelect={this.handleGetSelected}
        />
        <div style={{ margin: 100 }}>
          修改checkbox看看，
          <Checkbox defaultChecked={true}
                    onChange={(e) => this.handleChange('kk12112', e.target.checked)}>滨江</Checkbox>
          <Checkbox defaultChecked={true}
                    onChange={(e) => this.handleChange('232ddsds', e.target.checked)}>浙江</Checkbox>
          <Checkbox defaultChecked={true}
                    onChange={(e) => this.handleAllChange(e.target.checked)}>全选</Checkbox>
        </div>
        <div style={{ margin: 100 }}>
          <span>勾选结果:</span>
          <span>
            {selectedItems.map(item => (<span key={item.key} style={{ marginRight: 20 }}>{item.text}: {item.key}</span>))}
          </span>
        </div>

      </div>
    );
  }
}

export default App;
