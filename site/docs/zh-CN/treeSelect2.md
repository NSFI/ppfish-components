# 树选择

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect。

## 基本

:::demo 最简单的用法。

```js  

  constructor(props) {
    super(props);
    this.state = {
    	value: undefined,
    }
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  render() {
    const TreeNode = TreeSelect2.TreeNode;
    return (
      <TreeSelect2
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect2>
    );
  }

```
:::

## 从数据直接生成

:::demo 使用 `treeData` 把 JSON 数据直接生成树结构。
```js

  state = {
    value: undefined,
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  render() {
    const treeData = [{
    label: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
        label: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        label: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
    }],
    }, {
    label: 'Node2',
    value: '0-1',
    key: '0-1',
    }];
    return (
      <TreeSelect2
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={this.onChange}
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

  onChange = (value) => {
    console.log('onChange ', value);
    this.setState({ value });
  }

  render() {
		const treeData = [{
			label: 'Node1',
			value: '0-0',
			key: '0-0',
			children: [{
				label: 'Child Node1',
				value: '0-0-0',
				key: '0-0-0',
			}],
		}, {
			label: 'Node2',
			value: '0-1',
			key: '0-1',
			children: [{
				label: 'Child Node3',
				value: '0-1-0',
				key: '0-1-0',
			}, {
				label: 'Child Node4',
				value: '0-1-1',
				key: '0-1-1',
			}, {
				label: 'Child Node5',
				value: '0-1-2',
				key: '0-1-2',
			}],
		}];
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      searchPlaceholder: 'Please select',
      style: {
        width: 300,
      },
    };
    return <TreeSelect2 {...tProps} />;
  }
```
:::

## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | string | '' |
| defaultValue | 指定默认选中的条目 | string | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的样式 | object | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode) | () => document.body |
| loadData | 异步加载数据 | function(node) | - |
| placeholder | 选择框默认提示文字 | string | - |
| size | 选择框大小，可选 `large` `small` | string | 'default' |
| treeCheckable | 显示 checkbox | boolean | false |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一） | array<{value, label, children, [disabled, disableCheckbox, selectable]}>(如果定义了title，label会被title覆盖) | [] |
| treeDefaultExpandAll | 默认展开所有树节点 | boolean | false |
| treeDefaultExpandedKeys | 默认展开的树节点 | array | - |
| treeNodeResetLabel | 复位选项的默认文字 | string | '不选择任何分类' |
| value | 指定当前选中的条目 | string | - |
| onChange | 选中树节点时调用此函数 | function(value, label, extra) | - |
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
