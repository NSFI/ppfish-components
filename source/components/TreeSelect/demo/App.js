import React, { Component } from 'react';
import './App.less';
import TreeSelect from '../index';
import { Checkbox, Button } from 'antd';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

// 初始化渲染的树形结构
let defaultData = [
  {
    text: '家具个护',
    key: '0',
    id: '0',
    leaf: false,
    values: [
      {
        text: '家居生活',
        key: '1',
        id: '1',
        leaf: false,
        values: [
          {
            text: '厨房餐具',
            key: '2',
            id: '2',
            leaf: true,
            values: [
              {
                text: '杯子',
                key: '3',
                id: '3',
                leaf: false,
                values: [
                  {
                    text: '马克杯',
                    key: '4',
                    id: '4',
                    leaf: true,
                    values: []
                  },
                  {
                    text: '茶杯',
                    key: '5',
                    id: '5',
                    leaf: true,
                    values: []
                  }
                ]
              },
              {
                text: '锅具',
                key: '6',
                id: '6',
                leaf: true,
                values: []
              }
            ]
          }
        ]
      },
      {
        text: '床',
        key: '20',
        id: '20',
        leaf: false,
        values: []
      },
      {
        text: '凳子',
        key: '30',
        id: '30',
        leaf: true,
        values: []
      }
    ]
  },
  {
    text: '运动户外',
    key: '40',
    id: '40',
    leaf: false,
    values: [
      {
        text: '帐篷',
        key: '41',
        id: '41',
        leaf: true,
        values: []
      },
      {
        text: '摇椅',
        key: '42',
        id: '42',
        leaf: true,
        values: []
      },
      {
        text: '沙滩',
        key: '43',
        id: '43',
        leaf: true,
        values: []
      }
    ]
  }
];

// 选中的树结构数据
const defaultSelected = {
  '3': true,
  '20': true,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleGetSelected = this.handleGetSelected.bind(this);
    this.state = {
      selected: null,
      selectedItems: [{text: '杯子', key: '3'},{text: '床', key: '20'}],
    };
  }

  handleChange(key, checked) {
    const { selected } = this.state;
    this.setState({
      selected: Object.assign({}, selected, {
        [`${key}`]: checked
      })
    });
  }

  handleAllChange(checked) {
    this.setState({
      selected: checked
    });
  }

  handleGetSelected(selectedItems, key, value) {
    // 获取selected
    const selected = {
      [`${key}`]: value
    };
    this.setState({
      selectedItems,
      selected,
    });
  }

  loadLeaf(key, id) {
    const data = [
      {
        text: '婴儿床',
        key: '21',
        leaf: true,
        values: []
      },
      {
        text: '1-3岁',
        key: '23',
        leaf: true,
        values: []
      },
      {
        text: '4-9岁',
        key: '26',
        leaf: true,
        values: []
      }
    ];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (key === '20') {
          resolve(data);
        } else {
          reject();
        }
      }, 200);
    });
  }

  render() {
    const { selected, selectedItems } = this.state;
    return (
      <DocumentLayout>
      <div style={{ margin: 100 }}>
        <TreeSelect
          multiple={true}
          defaultData={defaultData}
          defaultSelected={defaultSelected}
          selected={selected}
          onSelect={this.handleGetSelected}
          recursive={true}
          loadLeaf={this.loadLeaf}
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
