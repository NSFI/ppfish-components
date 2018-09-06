# 树选择

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect。

## 单选

:::demo 最简单的用法。

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

  onReset = () => {
    this.setState({ value: undefined });
  }

  render() {
    const TreeNode = TreeSelect.TreeNode;
    return (
      <div>
        <TreeSelect
          showSearch
          getPopupContainer={() => document.querySelector('.main .component-content')}
          style={{ 
            width: 300,
            marginRight: '20px'
          }}
          value={this.state.value}
          dropdownStyle={{
            width: 300
          }}
          treeNodeResetTitle={"请选择"}
          treeDefaultExpandAll
          onChange={this.onChange}
          onReset={this.onReset}
        >
          <TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeNode value="parent 1-0" title="parent 1-0parent 1-0parent 1-0parent 1-0parent 1-0parent 1-0parent 1-0parent 1-0" key="0-1-1">
              <TreeNode value="leaf1" title="my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1" key="random" />
              <TreeNode value="leaf2" disabled title="your leaf2" key="random1" />
            </TreeNode>
            <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
              <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
            </TreeNode>
          </TreeNode>
          <TreeNode value="parent 2" title="parent 2" key="1-1">
            <TreeNode value="parent 2-0" title="parent 2-0" key="1-1-1">
              <TreeNode value="leaf3" title="my leaf3" key="random4" />
              <TreeNode value="leaf4" title="your leaf4" key="random5" />
            </TreeNode>
            <TreeNode value="parent 2-1" title="parent 2-1" key="random6">
              <TreeNode value="sss2" title={<b style={{ color: '#08c' }}>sss2</b>} key="random7" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
        <TreeSelect disabled style={{ width: 300 }}></TreeSelect>
      </div>
    );
  }

```
:::

## 无复位选项的单选

:::demo 无复位选项的单选。

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
        showSearch
        getPopupContainer={() => document.querySelector('.main .component-content')}
        isRequired={true}
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf1" key="random" />
            <TreeNode value="leaf2" title="your leaf2" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
        <TreeNode value="parent 2" title="parent 2" key="1-1">
          <TreeNode value="parent 2-0" title="parent 2-0" key="1-1-1">
            <TreeNode value="leaf3" title="my leaf3" key="random4" />
            <TreeNode value="leaf4" title="your leaf4" key="random5" />
          </TreeNode>
          <TreeNode value="parent 2-1" title="parent 2-1" key="random6">
            <TreeNode value="sss2" title={<b style={{ color: '#08c' }}>sss2</b>} key="random7" />
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
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-1',
            key: '0-0-1',
          }, 
          {
            title: 'Child Node2',
            value: '0-0-2',
            key: '0-0-2',
          }
        ],
      }, 
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
      }
    ];
    
    return (
      <TreeSelect
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        getPopupContainer={() => document.querySelector('.main .component-content')}
        treeData={treeData}
        treeDefaultExpandAll
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
      { title: 'Node1', key: '0-0', value: '0-0' },
      { title: 'Node2', key: '0-1', value: '0-1' },
      { title: 'Node3', key: '0-2', value: '0-2', isLeaf: true }
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
      getPopupContainer: () => document.querySelector('.main .component-content'),
      treeData: this.state.treeData,
      value: this.state.value,
      onChange: this.onChange,
      isRequired: true,
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
      key: '0-0',
      children: [{
        title: 'CNode1',
        value: '0-0-0',
        key: '0-0-0',
      }, {
        title: 'Child Node2Child Node2Child Node2Child Node2Child Node2Child Node2Child Node2',
        value: '0-0-1',
        key: '0-0-1',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [{
        title: 'CNode3',
        value: '0-1-0',
        key: '0-1-0',
        disabled: true
      }, {
        title: 'Child Node4Child Node4Child Node4Child Node4Child Node4Child Node4Child Node4Child Node4Child Node4Child Node4Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      }, {
        title: 'CNode5',
        value: '0-1-2',
        key: '0-1-2',
      }, {
        title: 'Child Node6Child Node6Child Node6Child Node6Child Node6Child Node6Child Node6Child Node6Child Node6Child Node6Child Node6',
        value: '0-1-3',
        key: '0-1-3',
      }, {
        title: 'Child Node7',
        value: '0-1-4',
        key: '0-1-4',
      }, {
        title: 'Child Node8',
        value: '0-1-5',
        key: '0-1-5',
      }, {
        title: 'Child Node9',
        value: '0-1-6',
        key: '0-1-6',
      }, {
        title: 'Child Node10',
        value: '0-1-7',
        key: '0-1-7',
      }, {
        title: 'Child Node11',
        value: '0-1-8',
        key: '0-1-8',
      }],
    }];
    const tProps = {
      showSearch: true,
      getPopupContainer: () => document.querySelector('.main .component-content'),
      treeData,
      treeDefaultExpandAll: true,
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      onSelect: this.onSelect,
      treeCheckable: true,
      style: {
        width: 300,
        marginRight: '20px'
      },
      dropdownStyle: {
        width: 300,
      }
    };
    const tPropsDisabled = {
      disabled: true,
      treeCheckable: true,
      style: {
        width: 300,
      }
    };
    return (
      <div>
        <TreeSelect {...tProps} />
        <TreeSelect {...tPropsDisabled} />
      </div>
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

  render() {
    const treeData = [{
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [{
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },{
        title: 'Child Node2',
        value: '0-0-1',
        key: '0-0-1',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [{
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      }, {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      }, {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      }, {
        title: 'Child Node6',
        value: '0-1-3',
        key: '0-1-3',
      }, {
        title: 'Child Node7',
        value: '0-1-4',
        key: '0-1-4',
      }],
    }];
    const tProps = {
      showSearch: true,
      editable: false,
      getPopupContainer: () => document.querySelector('.main .component-content'),
      treeData,
      treeDefaultExpandAll: true,
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      treeCheckable: true,
      style: {
        width: 300,
      },
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
      { title: 'Node1', key: '0-0', value: '0-0' },
      { title: 'Node2', key: '0-1', value: '0-1' },
      { title: 'Node3', key: '0-2', value: '0-2', isLeaf: true }
    ]
  }

  onConfirm = (value) => {
    this.setState({ value });
  }
  
  onCancel = (value) => {
    this.setState({ value });
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

  render() {
    const tProps = {
      showSearch: true,
      getPopupContainer: () => document.querySelector('.main .component-content'),
      treeData: this.state.treeData,
      value: this.state.value,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
      treeCheckable: true,
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

## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | String | - |
| defaultValue | 指定默认选中的条目 | String \| String[] | - |
| disabled | 是否禁用 | Boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | String | - |
| dropdownPopupAlign | 下拉菜单的对齐方式，具体配置可参考 [dom-align](https://github.com/yiminghe/dom-align) 的 alignConfig | Object | - |
| dropdownPopupPlacement | 下拉菜单弹出的位置 | Enum {'topCenter', 'topLeft', 'topRight', 'bottomCenter', 'bottomLeft', 'bottomRight', 'leftCenter', 'leftTop', 'leftBottom', 'rightCenter', 'rightTop', 'rightBottom'} | 'bottomLeft' |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | Boolean | true |
| dropdownStyle | 下拉菜单的样式 | Object | - |
| editable | 选中的条目是否可编辑，多选时有效 | Boolean | true |
| filterTreeNode | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | (inputValue: String, treeNode: TreeNode) => Boolean | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | (triggerNode: TreeNode) => ElementNode | () => document.body |
| loadData | 异步加载数据，返回值应该是一个 promise | (treeNode: TreeNode) => any | - |
| placeholder | 选择框默认提示文字 | String | '请选择' |
| searchPlaceholder | 搜索框默认文字 | String | '请输入关键字' |
| showSearch | 是否在下拉中显示搜索框 | Boolean | false |
| size | 选择框大小 | Enum {'default', 'large', 'small'} | 'default' |
| style | 选择框的样式 | Object | - |
| tagWidth | 标签的固定宽度，不能超过选择框的宽度，多选时有效 | Number | 100 |
| treeCheckable | 显示 checkbox | Boolean | false |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 必须设置，且其值需在整个树范围内唯一） | Array<{value, label, children, isLeaf, [disabled, disableCheckbox, selectable]}>(如果定义了title，label会被title覆盖) | [] |
| treeDefaultExpandAll | 默认展开所有树节点 | Boolean | false |
| treeDefaultExpandedKeys | 默认展开的树节点 | Array | - |
| treeNodeFilterProp | 输入项过滤对应的 treeNode 属性 | String | 'title' |
| treeNodeLabelProp | 选中后在选择框中显示的 treeNode 属性 | String | 'title' |
| isRequired | 是否必选，不为必选时会显示复位选项，单选时有效 | Boolean | false |
| treeNodeResetTitle | 复位选项的默认文字，单选时有效 | String | '不选择任何分类' |
| value | 指定当前选中的条目 | String \| String[] | - |
| onChange | 选中树节点时调用此函数。函数参数 value 为已选择的树节点值或值的列表，infoList 为已选择的树节点对象的列表，extra 为额外的相关信息 | (value, infoList, extra) => any | - |
| onConfirm | 确认选中树节点时调用此函数。函数参数 valueList 为已选择的树节点值的列表，infoList 为已选择的树节点对象的列表，extra 为额外的相关信息 | (valueList, infoList, extra) => any | - |
| onCancel | 取消选中树节点时调用此函数，参数 value 为原始选中的条目 | (value) => any | - |
| onReset | 点击复位选项时调用，单选时有效 | () => any | - |
| onSearch | 搜索框值变化时调用 | (value: String) => any | - |
| onSelect | 选中某一选项时调用。函数参数 value 为选中的树节点值，valueList 为已选择的树节点值的列表，infoList 为已选择的树节点对象的列表，extra 为额外的相关信息 | (value, valueList, infoList, extra) => any | - |

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
| isLeaf | 是否是叶子节点 | Boolean | false |
| key | 此项可选，若设置，其值需在整个树范围内唯一 | String | - |
| title | 树节点显示的内容，默认根据此属性值进行筛选 | String \| ReactNode | '---' |
| value | 此项必须设置，且其值需在整个树范围内唯一 | String | - |
