# TreePane 树形组件

树形选择组件。

## 何时使用

可选择的数据结构是一个树形结构时，可以使用 TreePane。

## 基本

:::demo 最简单的用法。

```js
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

    // selectedItems 是 Pane 的实例
    selectedItems = selectedItems.items;

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
    // 初始化渲染的树形结构
    const defaultData = [
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
    return (
      <div className="demo-tree-pane">
        <TreePane
          multiple={true}
          defaultData={defaultData}
          defaultSelected={defaultSelected}
          selected={selected}
          onSelect={this.handleGetSelected}
          recursive={true}
          loadLeaf={this.loadLeaf}
        />
        <div className="result">
          修改checkbox看看，
          <Checkbox defaultChecked={true}
                    onChange={(e) => this.handleChange('3', e.target.checked)}>杯子</Checkbox>
          <Checkbox defaultChecked={true}
                    onChange={(e) => this.handleChange('20', e.target.checked)}>床</Checkbox>
          <Checkbox defaultChecked={false}
                    onChange={(e) => this.handleAllChange(e.target.checked)}>全选</Checkbox>
        </div>
        <div className="result">
          <span>勾选结果:</span>
          <span>
            {selectedItems.map(item => (<span key={item.key} style={{ marginRight: 20 }}>{item.text}: {item.key}</span>))}
          </span>
        </div>
  
      </div>
    );
  }
```
:::


<style>
.demo-tree-pane {
  margin-bottom: 0;
}

.demo-tree-pane .result {
  margin: 15px 0;
}
</style>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | string | '' |
| defaultData | 指定默认的条目 | array<{key, text, id, leaf, values}> | - |
| data | 受控属性，树条目数据 | array<{key, text, id, leaf, values}> | - |
| loadLeaf | 异步加载数据，返回值应该是一个 promise | function(treeNode) | - |
| defaultSelected | 指定默认的选中的条目，true-全选，false-全不选 | boolean \| object | - |
| selected | 受控属性，树选中的条目数据，true-全选，false-全不选 | boolean \| object | - |
| multiple | 是否多选 | boolean | true |
| recursive | 勾选后是否递归子树和父树并返回合并后的条目 | boolean | true |
| onSelect | 被选中时调用 | function(pane, key, value) | () => {} |
