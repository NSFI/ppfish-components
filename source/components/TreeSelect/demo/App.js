import React, { Component } from 'react';
import './App.less';
import TreeSelect from '../index';
import { Checkbox, Button } from 'antd';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

// API定义的树形结构
const data = [
  {
    text: '家具个护',
    key: '0',
    values: [
      {
        text: '家居生活',
        key: '1',
        values: [
          {
            text: '厨房餐具',
            key: '2',
            values: [
              {
                text: '杯子',
                key: '3',
                values: [
                  {
                    text: '马克杯',
                    key: '4',
                    values: []
                  },
                  {
                    text: '茶杯',
                    key: '5',
                    values: []
                  }
                ]
              },
              {
                text: '锅具',
                key: '6',
                values: []
              }
            ]
          }
        ]
      },
      {
        text: '床',
        key: '20',
        values: []
      },
      {
        text: '凳子',
        key: '30',
        values: []
      }
    ]
  },
  {
    text: '运动户外',
    key: '40',
    values: [
      {
        text: '帐篷',
        key: '41',
        values: []
      },
      {
        text: '摇椅',
        key: '42',
        values: []
      },
      {
        text: '沙滩',
        key: '43',
        values: []
      }
    ]
  }
];

const defaultData = {
  '3': true,
  '20': true,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleGetSelected = this.handleGetSelected.bind(this);
    this.state = {
      selectedObj: null,
      selectedItems: [{text: '杯子', key: '3'},{text: '床', key: '20'}],
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
      <DocumentLayout>
      <div style={{ margin: 100 }}>
        <TreeSelect
          multiple={true}
          data={data}
          defaultSelectedMap={defaultData}
          selectedObj={selectedObj}
          onSelect={this.handleGetSelected}
          recursive={true}
        />
        <div style={{ margin: 100 }}>
          修改checkbox看看，
          <Checkbox defaultChecked={true}
                    onChange={(e) => this.handleChange('3', e.target.checked)}>杯子</Checkbox>
          <Checkbox defaultChecked={true}
                    onChange={(e) => this.handleChange('20', e.target.checked)}>床</Checkbox>
          <Checkbox defaultChecked={false}
                    onChange={(e) => this.handleAllChange(e.target.checked)}>全选</Checkbox>
        </div>
        <div style={{ margin: 100 }}>
          <span>勾选结果:</span>
          <span>
            {selectedItems.map(item => (<span key={item.key} style={{ marginRight: 20 }}>{item.text}: {item.key}</span>))}
          </span>
        </div>

      </div>
      </DocumentLayout>
    );
  }
}

export default App;
