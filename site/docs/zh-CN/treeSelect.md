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

  onChange = (value, label, extra) => {
    this.setState({ value });
  }

  onReset = () => {
    this.setState({ value: undefined });
  }

  render() {
    const TreeNode = TreeSelect.TreeNode;
    return (
      <TreeSelect
        showSearch
        treeNodeFilterProp={'title'}
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{
          width: 300
        }}
        treeDefaultExpandAll
        onChange={this.onChange}
        onReset={this.onReset}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0parent 1-0parent 1-0parent 1-0parent 1-0parent 1-0parent 1-0parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1my leaf1" key="random" />
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

## 无复位选项的单选

:::demo 最简单的用法。

```js  

  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
    }
  }

  onChange = (value, label, extra) => {
    this.setState({ value });
  }

  render() {
    const TreeNode = TreeSelect.TreeNode;
    return (
      <TreeSelect
        showSearch
        isRequired={true}
        treeNodeFilterProp={'title'}
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
        treeData={treeData}
        treeDefaultExpandAll
        onChange={this.onChange}
        onReset={this.onReset}
      />
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

  onConfirm = (value) => {
    // console.log('>> onConfirm: ', value);
    this.setState({ value });
  }
  
  onCancel = (value) => {
    // console.log('>> onCancel: ', value);
    this.setState({ value });
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
      }],
		}];
    const tProps = {
      showSearch: true,
      treeData,
      treeDefaultExpandAll: true,
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
    return <TreeSelect {...tProps} />;
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
    // console.log('>> onConfirm: ', value);
    this.setState({ value });
  }
  
  onCancel = (value) => {
    // console.log('>> onCancel: ', value);
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


## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | string | '' |
| defaultValue | 指定默认选中的条目 | string/string[] | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的样式 | object | - |
| editable | 选中的条目是否可编辑，多选时有效 | boolean | true |
| filterTreeNode | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | Function(inputValue: string, treeNode: TreeNode) (函数需要返回bool值) | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode) | () => document.body |
| loadData | 异步加载数据 | function(node) | - |
| placeholder | 选择框默认提示文字 | string | '请选择' |
| searchPlaceholder | 搜索框默认文字 | string | '请输入关键字' |
| showSearch | 是否在下拉中显示搜索框 | boolean | false |
| size | 选择框大小，可选 `large` `small` | string | 'default' |
| treeCheckable | 显示 checkbox | boolean | false |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一） | array<{value, label, children, [disabled, disableCheckbox, selectable]}>(如果定义了title，label会被title覆盖) | [] |
| treeDefaultExpandAll | 默认展开所有树节点 | boolean | false |
| treeDefaultExpandedKeys | 默认展开的树节点 | array | - |
| treeNodeFilterProp | 输入项过滤对应的 treeNode 属性 | string | 'value' |
| isRequired | 是否必选，不为必选时会显示复位选项，单选时有效 | boolean | false |
| treeNodeResetTitle | 复位选项的默认文字，单选时有效 | string | '不选择任何分类' |
| value | 指定当前选中的条目 | string/string[] | - |
| onChange | 选中树节点时调用此函数 | function(value, label, extra) | - |
| onConfirm | 确认选中树节点时调用此函数，参数 value 为当前选中的条目 | function(value) | - |
| onCancel | 取消选中树节点时调用此函数，参数 value 为原始选中的条目 | function(value) | - |
| onReset | 点击复位选项时调用 | function() | - |
| onSearch | 搜索框值变化时调用 | function(value: string) | - |
| onSelect | 被选中时调用 | function(value, node, extra) | - |

### Tree 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

### TreeNode props

> 建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disableCheckbox | 禁掉 checkbox | boolean | false |
| disabled | 是否禁用 | boolean | false |
| isLeaf | 是否是叶子节点 | boolean | false |
| key | 此项必须设置（其值在整个树范围内唯一） | string | - |
| title | 树节点显示的内容 | string\|ReactNode | '---' |
| value | 默认根据此属性值进行筛选（其值在整个树范围内唯一） | string | - |
