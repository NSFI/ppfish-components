# TreeSelect 树选择 【交互：翁宇宇 |视觉：徐剑杰 |开发：高志友| 维护：李健夫】

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect。

## 单选

:::demo 最简单的用法。

```js  

  constructor(props) {
    super(props);
    this.state = {
      value: 'n4',
    }
  }

  onChange = (value) => {
    this.setState({ value });
  }

  onReset = () => {
    this.setState({ value: undefined });
  }

  onSelect = (value, valueList, infoList, extra) => {
    console.log("value: ", value);
    console.log("valueList: ", valueList);
    console.log("infoList: ", infoList);
    console.log("extra: ", extra);
  }

  render() {
    const TreeNode = TreeSelect.TreeNode;
    return (
      <div>
        <TreeSelect
          showSearch
          style={{ width: 300 }}
          value={this.state.value}
          dropdownStyle={{ width: 300 }}
          treeNodeResetTitle={"请选择"}
          treeDefaultExpandedKeys={['n4', 'n9']}
          onChange={this.onChange}
          onReset={this.onReset}
          onSelect={this.onSelect}
        >
          <TreeNode value="n1" key="n1" title="PNode1">
            <TreeNode value="n2" key="n2" title="Node1">
              <TreeNode value="n3" key="n3" title="CNode1-long-title-CNode1-long-title-CNode1-long-title-CNode1-long-title-CNode1-long-title" />
              <TreeNode value="n4" key="n4" title="CNode2" />
            </TreeNode>
            <TreeNode value="n5" key="n5" title="Node2">
              <TreeNode value="n6" key="n6" disabled title="CNode3" />
            </TreeNode>
          </TreeNode>
          <TreeNode value="n7" key="n7" title="PNode2">
            <TreeNode value="n8" key="n8" title="Node3">
              <TreeNode value="n9" key="n9" title="CNode4" />
              <TreeNode value="n10" key="n10" title="CNode5" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
        <br/>
        <TreeSelect disabled style={{ width: 300, marginTop: '10px' }}></TreeSelect>
      </div>
    );
  }

```
:::

## 设置为必选的单选

:::demo 设置为必选的单选。

```js  

  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
    }
  }

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    const TreeNode = TreeSelect.TreeNode;
    return (
      <TreeSelect
        required
        showSearch
        style={{ width: 300 }}
        treeDefaultExpandedKeys={['n4', 'n9']}
        value={this.state.value}
        dropdownStyle={{ width: 300 }}
        onChange={this.onChange}
      >
        <TreeNode value="n1" key="n1" title="PNode1">
          <TreeNode value="n2" key="n2" title="Node1">
            <TreeNode value="n3" key="n3" title="CNode1-long-title-CNode1-long-title-CNode1-long-title-CNode1-long-title-CNode1-long-title" />
            <TreeNode value="n4" key="n4" title="CNode2" />
          </TreeNode>
          <TreeNode value="n5" key="n5" title="Node2">
            <TreeNode value="n6" key="n6" disabled title="CNode3" />
          </TreeNode>
        </TreeNode>
        <TreeNode value="n7" key="n7" title="PNode2">
          <TreeNode value="n8" key="n8" title="Node3">
            <TreeNode value="n9" key="n9" title="CNode4" />
            <TreeNode value="n10" key="n10" title="CNode5" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
  }

```
:::

## 从数据直接生成的单选

:::demo 使用 `treeData` 把 JSON 数据直接生成树结构。
```js

  state = {
    value: undefined,
  }

  onChange = (value) => {
    this.setState({ value });
  }

  onReset = () => {
    this.setState({ value: undefined });
  }

  render() {
    const treeData = [
      {
        title: 'Node1',
        value: 'n1',
        key: 'k1',
        children: [
          {
            title: 'CNode1',
            value: 'n2',
            key: 'k2',
          }, 
          {
            title: 'CNode2',
            value: 'n3',
            key: 'k3',
          }
        ],
      }, 
      {
        title: 'Node2',
        value: 'n4',
        key: 'k4',
        children: [
          {
            title: 'CNode1',
            value: 'n5',
            key: 'k5',
          }, 
          {
            title: 'CNode2',
            value: 'n6',
            key: 'k6',
          },
          {
            title: 'CNode3',
            value: 'n7',
            key: 'k7',
          }, 
          {
            title: 'CNode4',
            value: 'n8',
            key: 'k8',
          }
        ],
      }
    ];
    
    return (
      <TreeSelect
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ width: 300 }}
        treeData={treeData}
        treeDefaultExpandedKeys={['k1', 'k4']}
        onChange={this.onChange}
        onReset={this.onReset}
      />
    );
  }

```
:::


## 异步加载数据的单选

:::demo 异步加载数据的单选。


```js

  state = {
    value: undefined,
    treeData: [
      { title: 'Node1', key: 'k1', value: 'n1' },
      { title: 'Node2', key: 'k2', value: 'n2' },
      { title: 'Node3', key: 'k3', value: 'n3', isLeaf: true }
    ]
  }

  generateTreeNodes = (treeNode) => {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
      arr.push({ title: `CNode${i+1}`, key: `${key}-${i}`, value: `${key}-${i}` });
    }
    return arr;
  }

  setLeaf = (treeData, curKey, level) => {
    const loopLeaf = (data, lev) => {
      const l = lev - 1;
      data.forEach((item) => {
        if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
          curKey.indexOf(item.key) !== 0) {
          return;
        }
        if (item.children) {
          loopLeaf(item.children, l);
        } else if (l < 1) {
          item.isLeaf = true;
        }
      });
    };
    loopLeaf(treeData, level + 1);
  }

  getNewTreeData = (treeData, curKey, child, level) => {
    const loop = (data) => {
      if (level < 1 || curKey.length - 3 > level * 2) return;
      data.forEach((item) => {
        if (curKey.indexOf(item.key) === 0) {
          if (item.children) {
            loop(item.children);
          } else {
            item.children = child;
          }
        }
      });
    };
    loop(treeData);
    this.setLeaf(treeData, curKey, level);
  }

  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        this.getNewTreeData(treeData, treeNode.props.eventKey, this.generateTreeNodes(treeNode), 1);
        this.setState({ treeData });
        resolve();
      }, 1000);
    });
  }

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    const tProps = {
      showSearch: true,
      treeData: this.state.treeData,
      value: this.state.value,
      onChange: this.onChange,
      required: true,
      style: {
        width: 300,
      },
      dropdownStyle: {
        width: 300,
      }
    };
    return (
      <TreeSelect {...tProps} loadData={this.onLoadData}/>
    );
  }
```
:::


## 多选

:::demo 使用勾选框实现多选功能。


```js

  state = {
    value: ['0-0-0'],
  }

  onConfirm = (value, infoList, extra) => {
    console.log('选中节点：', value);
    console.log('详细信息：', infoList);
    console.log('额外信息：', extra);
    this.setState({ value });
  }

  onCancel = (value) => {
    this.setState({ value });
  }

  onSelect = (value, valueList, infoList, extra) => {
    console.log('选中：', value);
    console.log('已选择：', valueList);
  }

  render() {
    const treeData = [{
      title: 'Node1',
      value: '0-0',
      key: '0-0a',
      children: [{
        title: 'CNode1',
        value: '0-0-0',
        key: '0-0a-0',
      }, {
        title: 'CNode2-long-title-CNode2-long-title-CNode2-long-title-CNode2-long-title',
        value: '0-0-1',
        key: '0-0a-1',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1a',
      children: [{
        title: 'CNode3',
        value: '0-1-0',
        key: '0-1a-0',
      }, {
        title: 'CNode4',
        value: '0-1-1',
        key: '0-1a-1',
        disabled: true
      }, {
        title: 'CNode5',
        value: '0-1-2',
        key: '0-1a-2',
      }, {
        title: 'CNode6',
        value: '0-1-3',
        key: '0-1a-3',
      }, {
        title: 'CNode7',
        value: '0-1-4',
        key: '0-1a-4',
      }, {
        title: 'CNode8',
        value: '0-1-5',
        key: '0-1a-5',
      }, {
        title: 'CNode9',
        value: '0-1-6',
        key: '0-1a-6',
      }, {
        title: 'CNode10',
        value: '0-1-7',
        key: '0-1a-7',
      }, {
        title: 'CNode11',
        value: '0-1-8',
        key: '0-1a-8',
      }, {
        title: 'CNode12',
        value: '0-1-9',
        key: '0-1a-9',
      }],
    }];
    const tProps = {
      showSearch: true,
      treeData,
      treeDefaultExpandedKeys: ['0-0a', '0-1a'],
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      onSelect: this.onSelect,
      treeCheckable: true,
      style: { width: 300 },
      dropdownStyle: { width: 300 }
    };
    const tPropsDisabled = {
      disabled: true,
      treeCheckable: true,
      style: { width: 300, marginTop: '10px' }
    };
    return (
      <div>
        <TreeSelect {...tProps} />
        <br/>
        <TreeSelect {...tPropsDisabled} />
      </div>
    );
  }
```
:::


## 设置为必选的多选

:::demo 设置为必选的多选。


```js

  state = {
    value: ['0-0-0'],
  }

  onConfirm = (value, infoList, extra) => {
    console.log('选中节点：', value);
    console.log('详细信息：', infoList);
    console.log('额外信息：', extra);
    this.setState({ value });
  }

  onCancel = (value) => {
    this.setState({ value });
  }

  onSelect = (value, valueList, infoList, extra) => {
    console.log('选中：', value);
    console.log('已选择：', valueList);
  }

  render() {
    const treeData = [{
      title: 'Node1',
      value: '0-0',
      key: '0-0a',
      children: [{
        title: 'CNode1',
        value: '0-0-0',
        key: '0-0a-0',
      }, {
        title: 'CNode2-long-title-CNode2-long-title-CNode2-long-title-CNode2-long-title',
        value: '0-0-1',
        key: '0-0a-1',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1a',
      children: [{
        title: 'CNode3',
        value: '0-1-0',
        key: '0-1a-0',
      }, {
        title: 'CNode4',
        value: '0-1-1',
        key: '0-1a-1',
        disabled: true
      }, {
        title: 'CNode5',
        value: '0-1-2',
        key: '0-1a-2',
      }, {
        title: 'CNode6',
        value: '0-1-3',
        key: '0-1a-3',
      }, {
        title: 'CNode7',
        value: '0-1-4',
        key: '0-1a-4',
      }, {
        title: 'CNode8',
        value: '0-1-5',
        key: '0-1a-5',
      }, {
        title: 'CNode9',
        value: '0-1-6',
        key: '0-1a-6',
      }, {
        title: 'CNode10',
        value: '0-1-7',
        key: '0-1a-7',
      }, {
        title: 'CNode11',
        value: '0-1-8',
        key: '0-1a-8',
      }, {
        title: 'CNode12',
        value: '0-1-9',
        key: '0-1a-9',
      }],
    }];
    const tProps = {
      required: true,
      showSearch: true,
      treeData,
      treeDefaultExpandedKeys: ['0-0a', '0-1a'],
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      onSelect: this.onSelect,
      treeCheckable: true,
      style: { width: 300 },
      dropdownStyle: { width: 300 }
    };
    return (
      <TreeSelect {...tProps} />
    );
  }
```
:::


## 不可编辑的多选

:::demo 使用勾选框实现多选功能，选中项不可编辑。


```js

  state = {
    value: ['0-0-0'],
  }

  onConfirm = (value) => {
    this.setState({ value });
  }
  
  onCancel = (value) => {
    this.setState({ value });
  }

  onExpand = (expandedKeyList, extra) => {
    console.log('expandedKeyList: ', expandedKeyList);
    console.log('extra info: ', extra);
  };

  render() {
    const treeData = [{
      title: 'Node1',
      value: '0-0',
      key: '0-0a',
      children: [{
        title: 'CNode1',
        value: '0-0-0',
        key: '0-0a-0',
      }, {
        title: 'CNode2-long-title-CNode2-long-title-CNode2-long-title-CNode2-long-title',
        value: '0-0-1',
        key: '0-0a-1',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1a',
      children: [{
        title: 'CNode3',
        value: '0-1-0',
        key: '0-1a-0',
      }, {
        title: 'CNode3',
        value: '0-1-1',
        key: '0-1a-1',
      }, {
        title: 'CNode5',
        value: '0-1-2',
        key: '0-1a-2',
      }, {
        title: 'CNode6',
        value: '0-1-3',
        key: '0-1a-3',
      }, {
        title: 'CNode7',
        value: '0-1-4',
        key: '0-1a-4',
      }, {
        title: 'CNode8',
        value: '0-1-5',
        key: '0-1a-5',
      }, {
        title: 'CNode9',
        value: '0-1-6',
        key: '0-1a-6',
      }, {
        title: 'CNode10',
        value: '0-1-7',
        key: '0-1a-7',
      }, {
        title: 'CNode11',
        value: '0-1-8',
        key: '0-1a-8',
      }, {
        title: 'CNode12',
        value: '0-1-9',
        key: '0-1a-9',
        disabled: true
      }],
    }];
    const tProps = {
      uniqueTreeNodeByLabel: true,
      showSearch: true,
      editable: false,
      treeData,
      treeDefaultExpandedKeys: ['0-0a', '0-1a'],
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      onExpand: this.onExpand,
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_CHILD,
      style: {
        width: 300,
      },
      dropdownStyle: {
        width: 300,
      }
    };
    return <TreeSelect {...tProps} />;
  }
```
:::


## 设置为必选且不可编辑的多选

:::demo 设置为必选且不可编辑的多选。


```js

  state = {
    value: ['0-0-0'],
  }

  onConfirm = (value) => {
    this.setState({ value });
  }
  
  onCancel = (value) => {
    this.setState({ value });
  }

  render() {
    const treeData = [{
      title: 'Node1',
      value: '0-0',
      key: '0-0a',
      children: [{
        title: 'CNode1',
        value: '0-0-0',
        key: '0-0a-0',
      }, {
        title: 'CNode2-long-title-CNode2-long-title-CNode2-long-title-CNode2-long-title',
        value: '0-0-1',
        key: '0-0a-1',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1a',
      children: [{
        title: 'CNode3',
        value: '0-1-0',
        key: '0-1a-0',
      }, {
        title: 'CNode4',
        value: '0-1-1',
        key: '0-1a-1',
      }, {
        title: 'CNode5',
        value: '0-1-2',
        key: '0-1a-2',
      }, {
        title: 'CNode6',
        value: '0-1-3',
        key: '0-1a-3',
      }, {
        title: 'CNode7',
        value: '0-1-4',
        key: '0-1a-4',
      }, {
        title: 'CNode8',
        value: '0-1-5',
        key: '0-1a-5',
      }, {
        title: 'CNode9',
        value: '0-1-6',
        key: '0-1a-6',
      }, {
        title: 'CNode10',
        value: '0-1-7',
        key: '0-1a-7',
      }, {
        title: 'CNode11',
        value: '0-1-8',
        key: '0-1a-8',
      }, {
        title: 'CNode12',
        value: '0-1-9',
        key: '0-1a-9',
        disabled: true
      }],
    }];
    const tProps = {
      required: true,
      uniqueTreeNodeByLabel: true,
      showSearch: true,
      editable: false,
      treeData,
      treeDefaultExpandedKeys: ['0-0a', '0-1a'],
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_CHILD,
      style: {
        width: 300,
      },
      dropdownStyle: {
        width: 300,
      }
    };
    return <TreeSelect {...tProps} />;
  }
```
:::


## 异步加载数据的多选

:::demo 异步加载数据的多选。

```js

  state = {
    value: [],
    treeData: [
      { title: 'Node1', key: 'k1', value: 'k1',childCount:3 },
      { title: 'Node2', key: 'k2', value: 'k2',childCount:6 },
      { title: 'Node3', key: 'k3', value: 'k3', isLeaf: true }
    ]
  }

  onConfirm = (value,obj,ext) => {
    console.log(value,obj,ext);
    this.setState({ value });
  }
  
  onCancel = (value) => {
    this.setState({ value });
  }

  generateTreeNodes = (treeNode) => {
    const arr = [];
    const key = treeNode.props.eventKey;
    let len=3;
    if(key=="k2"){
        len=6;
    }
    for (let i = 0; i < len; i++) {
      let pre="CNode";
      if(i>2){
         pre="CCNode";
      }
      arr.push({ title: `${pre}${i+1}`, key: `${key}-${i}`, value: `${key}-${i}` });
    }
    return arr;
  }

  setLeaf = (treeData, curKey, level) => {
    const loopLeaf = (data, lev) => {
      const l = lev - 1;
      data.forEach((item) => {
        if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
          curKey.indexOf(item.key) !== 0) {
          return;
        }
        if (item.children) {
          loopLeaf(item.children, l);
        } else if (l < 1) {
          item.isLeaf = true;
        }
      });
    };
    loopLeaf(treeData, level + 1);
  }

  getNewTreeData = (treeData, curKey, child, level) => {
    const loop = (data) => {
      if (level < 1 || curKey.length - 3 > level * 2) return;
      data.forEach((item) => {
        if (curKey.indexOf(item.key) === 0) {
          if (item.children) {
            loop(item.children);
          } else {
            item.children = child;
          }
        }
      });
    };
    loop(treeData);
    this.setLeaf(treeData, curKey, level);
  }

  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        this.getNewTreeData(treeData, treeNode.props.eventKey, this.generateTreeNodes(treeNode), 1);
        this.setState({ treeData });
        resolve();
      }, 1000);
    });
  }

  render() {
    const tProps = {
      doUnchecked:true,
      showSearch: true,
      treeData: this.state.treeData,
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      loadData: this.onLoadData,
      treeCheckable: true,
      style: {
        width: 300,
      },
      dropdownStyle: {
        width: 300,
      }
    };
    return (
      <TreeSelect {...tProps} />
    );
  }
```
:::


## 后端搜索

:::demo 后端搜索。

```js

  constructor(props) {
    super(props);
    this.lastSearchId = 1;
    this.loadDataTimes = 1;
    this.onSearch = this.props.debounce(this.onSearch, 300);
    this.state = {
      value: [],
      treeData: [
        { title: 'Node1', key: 'k1', value: 'n1' },
        { title: 'Node2', key: 'k2', value: 'n2' },
        { title: 'Node3', key: 'k3', value: 'n3', isLeaf: true }
      ],
      loading: false
    };
  }

  onConfirm = (value) => {
    this.setState({ value });
  }
  
  onCancel = (value) => {
    this.setState({ value });
  }

  onSearch = (value) => {
    if(!value) return;
    let oldTreeData = [...this.state.treeData];
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({
        treeData: [
          ...oldTreeData,
          {
            title: 'New Node' + this.lastSearchId + ': ' + value,
            key: 'new_key_' + this.lastSearchId,
            value: 'new_value_' + this.lastSearchId
          }
        ],
        loading: false
      }, () => {
        this.lastSearchId++;
      });
    }, 1000);
  }

  generateTreeNodes = (treeNode) => {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
      arr.push({ title: `CNode${i+1}`, key: `${key}-${i}`, value: `${key}-${i}` });
    }
    return arr;
  }

  setLeaf = (treeData, curKey, level) => {
    const loopLeaf = (data, lev) => {
      const l = lev - 1;
      data.forEach((item) => {
        if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
          curKey.indexOf(item.key) !== 0) {
          return;
        }
        if (item.children) {
          loopLeaf(item.children, l);
        } else if (l < 1) {
          item.isLeaf = true;
        }
      });
    };
    loopLeaf(treeData, level + 1);
  }

  getNewTreeData = (treeData, curKey, child, level) => {
    const loop = (data) => {
      if (level < 1 || curKey.length - 3 > level * 2) return;
      data.forEach((item) => {
        if (curKey.indexOf(item.key) === 0) {
          if (item.children) {
            loop(item.children);
          } else {
            item.children = child;
          }
        }
      });
    };
    loop(treeData);
    this.setLeaf(treeData, curKey, level);
  }

  onLoadData = (treeNode) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.loadDataTimes % 3 == 0) {
          reject();
        } else {
          const treeData = [...this.state.treeData];
          this.getNewTreeData(treeData, treeNode.props.eventKey, this.generateTreeNodes(treeNode), 1);
          this.setState({ treeData });
          resolve();
        }
        this.loadDataTimes++;
      }, 500);
    });
  }

  render() {
    const tProps = {
      showSearch: true,
      editable: false,
      treeData: this.state.treeData,
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      onSearch: this.onSearch,
      loadData: this.onLoadData,
      loading: this.state.loading,
      treeCheckable: true,
      style: {
        width: 300,
      },
      dropdownStyle: {
        width: 300,
      }
    };
    return (
      <TreeSelect {...tProps}/>
    );
  }
```
:::

## 自定义图标

:::demo 自定义图标。

```js

  state = {
    value: ['0-0-0'],
  }

  onConfirm = (value, infoList, extra) => {
    console.log('选中节点：', value);
    console.log('详细信息：', infoList);
    console.log('额外信息：', extra);
    this.setState({ value });
  }

  onCancel = (value) => {
    this.setState({ value });
  }

  onSelect = (value, valueList, infoList, extra) => {
    console.log('选中：', value);
    console.log('已选择：', valueList);
  }

  render() {
    const treeData = [{
      title: 'Node1',
      value: '0-0',
      key: '0-0a',
      icon: <IconImage className="img-icon-14" />,
      children: [{
        title: 'CNode1',
        value: '0-0-0',
        key: '0-0a-0',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1a',
      icon: <IconImage className="img-icon-14" />,
      children: [{
        title: 'CNode2',
        value: '0-1-0',
        key: '0-1a-0',
      }, {
        title: 'CNode3',
        value: '0-1-1',
        key: '0-1a-1',
      }, {
        title: 'CNode4',
        value: '0-1-2',
        key: '0-1a-2',
        disabled: true
      }],
    }];

    const tProps = {
      showIcon: true,
      showSearch: true,
      treeData,
      treeDefaultExpandedKeys: ['0-0a', '0-1a'],
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      onSelect: this.onSelect,
      treeCheckable: true,
      style: { width: 300 },
      dropdownStyle: { width: 300 }
    };

    return (
      <TreeSelect {...tProps} icon={<IconPie className="img-icon-14"/>}/>
    );
  }
```
:::


## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoClearSearchValue | 当树节点被选择时，是否自动清空搜索框 | Boolean | false |
| autoExpandParent | 是否自动展开父节点 | Boolean | false |
| className | 容器类名 | String | - |
| defaultValue | 指定默认选中的条目 | String \| Array< String > | - |
| disabled | 是否禁用 | Boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | String | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | Boolean | true |
| dropdownStyle | 下拉菜单的样式 | Object | - |
| editable | 选中的条目是否可编辑，多选时有效 | Boolean | true |
| esc | 是否开启按 ESC 键关闭弹层 | Boolean | true |
| filterTreeNode | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | (inputValue: String, treeNode: TreeNode) => Boolean | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | (triggerNode: TreeNode) => HTMLElement | () => document.body |
| icon | 自定义所有子节点 title 前的图标。可接收组件，props 为当前树的 props。若某子节点上同时自定义了图标，则被其覆盖。`showIcon` 为 true 时有效。 | ReactNode \| (props) => ReactNode | - |
| loadData | 异步加载数据，返回值应该是一个 promise | (treeNode: TreeNode) => Void | - |
| loading | 是否显示 loading 状态。可以配合实现后端搜索。 | Boolean | false |
| multiple | 支持多选（当设置 treeCheckable 时自动变为true） | Boolean | false |
| notFoundContent | 当下拉列表为空时显示的内容 | String \| ReactNode | '无匹配结果' |
| onCancel | 取消选中树节点时调用此函数，参数 value 为原始选中的条目 | (value) => Void | - |
| onChange | 选中的树节点改变时调用此函数。函数参数 value 为已选择的树节点值或值的列表，infoList 为已选择的树节点对象的列表，extra 为额外的相关信息 | (value, infoList, extra) => Void | - |
| onConfirm | 确认选中树节点时调用此函数。函数参数 valueList 为已选择的树节点值的列表，infoList 为已选择的树节点对象的列表，extra 为额外的相关信息 | (valueList, infoList, extra) => Void | - |
| onExpand | 展开或收起树节点时调用此函数。函数参数 expandedKeyList 为当前展开的树节点值的列表，extra 为额外的相关信息 | (expandedKeyList, extra) => Void | - |
| onReset | 点击复位选项时调用，单选时有效 | () => Void | - |
| onSearch | 搜索框值变化时调用。可以配合实现后端搜索。 | (value: String) => Void | - |
| onSelect | 选中某一选项时调用。函数参数 value 为选中的树节点值，valueList 为已选择的树节点值的列表，infoList 为已选择的树节点对象的列表，extra 为额外的相关信息 | (value, valueList, infoList, extra) => Void | - |
| placeholder | 选择框默认提示文字 | String | '请选择' |
| placement | 下拉菜单弹出的位置 | Enum {'bottomLeft', 'bottomCenter', 'bottomRight','topLeft','topCenter', 'topRight'} | 'bottomLeft' |
| required | 是否设置为必选。<br/>在单选模式下设置为 true 后，隐藏复位选项；<br/>在可编辑多选模式下设置为 true 后，禁止关闭最后一个 tag，且当前选择项为空时禁用确认按钮；<br/>不可编辑多选模式下设置为 true 后，当前选择项为空时禁用确认按钮。 | Boolean | false |
| searchPlaceholder | 搜索框默认文字 | String | '请输入关键字' |
| showCheckedStrategy | 定义选中项回填的方式。<br/>TreeSelect.SHOW_ALL：显示所有选中节点（包括父节点）<br/>TreeSelect.SHOW_PARENT：当父节点下所有子节点都选中时，只显示父节点<br/>TreeSelect.SHOW_CHILD：只显示子节点 | Enum {TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_PARENT |
| showIcon | 是否展示 TreeNode title 前的图标，无默认图标，若设置为 true，则需要自定义图标相关样式 | Boolean | false |
| showSearch | 是否在下拉中显示搜索框。默认提供实时前端搜索，可以配合 `onSearch` 实现后端搜索。 | Boolean | false |
| size | 选择框大小 | Enum {'default', 'large', 'small'} | 'default' |
| style | 选择框的样式 | Object | - |
| tagWidth | 标签的固定宽度，不能超过选择框的宽度，多选时有效 | Number | 100 |
| treeCheckable | 显示 checkbox | Boolean | false |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点。treeData 中 value 必须设置，且其值需在整个树范围内唯一；key 可选，未设置时取 value 的值。 | Array< {value, title, [children, key, icon, disabled, disableCheckbox, selectable, isLeaf]} > | [] |
| treeDefaultExpandAll | 默认展开所有树节点 | Boolean | false |
| treeDefaultExpandedKeys | 默认展开的树节点 | Array | [] |
| treeNodeFilterProp | 输入项过滤对应的 treeNode 属性 | String | 'title' |
| treeNodeLabelProp | 选中后在选择框中显示的 treeNode 属性 | String | 'title' |
| treeNodeResetTitle | 复位选项的默认文字，单选时有效 | String | '不选择任何分类' |
| uniqueTreeNodeByLabel | 是否对选择框中展示的树节点以 Label 去重， `editable` 为 false 时有效 | Boolean | false |
| value | 受控属性，指定当前选中的树节点 | String \| Array< String > | - |

### Tree 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

### TreeNode props

> 建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disableCheckbox | 禁掉 checkbox | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| icon | 自定义当前节点 title 前的图标。可接收组件，props 为当前节点的 props。Tree props 中 `showIcon` 为 true 时有效。 | ReactNode \| (props) => ReactNode | - |
| isLeaf | 是否是叶子节点 | Boolean | false |
| key | 此项必须设置，且其值需在整个树范围内唯一 | String | - |
| title | 树节点显示的内容，默认根据此属性值进行筛选 | String \| ReactNode | '---' |
| value | 此项必须设置，且其值需在整个树范围内唯一 | String | - |
