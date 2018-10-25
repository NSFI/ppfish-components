# Tree 树形控件 【交互：翁宇宇 |视觉：徐剑杰 |开发：高志友】

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 单选形式

:::demo 最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。

```js

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  render() {
    const TreeNode = Tree.TreeNode;
    return (
      <Tree
        defaultExpandedKeys={['0-0-1']}
        defaultSelectedKeys={['0-0-1-0']}
        onSelect={this.onSelect}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" disabled />
            <TreeNode title="leaf with long title leaf with long title leaf with long title" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }

```
:::


## 设置为必选的单选

:::demo 设置必选的单选。

```js

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  render() {
    const TreeNode = Tree.TreeNode;
    return (
      <Tree
        required
        defaultExpandAll
        defaultSelectedKeys={['0-0-0-1']}
        onSelect={this.onSelect}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" disabled />
            <TreeNode title="leaf with long title leaf with long title leaf with long title" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }

```
:::

## 复选形式

:::demo 复选形式。

```js

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    const TreeNode = Tree.TreeNode;
    return (
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox disabled />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }

```
:::


## 支持搜索

:::demo 可搜索的树。

```js

  constructor(props) {
    super(props);
    this.x = 3;
    this.y = 2;
    this.z = 1;
    this.gData = [];
    this.generateData = (_level, _preKey, _tns) => {
      const preKey = _preKey || '0';
      const tns = _tns || this.gData;
      const children = [];
      for (let i = 0; i < this.x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < this.y) {
          children.push(key);
        }
      }
      if (_level < 0) {
        return tns;
      }
      const level = _level - 1;
      children.forEach((key, index) => {
        tns[index].children = [];
        return this.generateData(level, key, tns[index].children);
      });
    };
    this.generateData(this.z);
    this.dataList = [];
    this.generateList = (data) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        this.dataList.push({ key, title: key });
        if (node.children) {
          this.generateList(node.children, node.key);
        }
      }
    };
    this.generateList(this.gData);
    this.getParentKey = (key, tree) => {
      let parentKey;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key;
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    };
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      notFound: true
    };
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = this.dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return this.getParentKey(item.key, this.gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  emitEmpty = () => {
    this.searchInput.focus();
    this.setState({ searchValue: '', notFound: false });
  }

  render() {
    const TreeNode = Tree.TreeNode;
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const suffix = searchValue ? <Icon type="close-circle-fill" onClick={this.emitEmpty} /> : <Icon type="search-line" />;
    let notFound = true;
    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      let title = <span>{item.title}</span>;

      if (index > -1) {
        title = (
          <span>
            {beforeStr}
            <span style={{ color: '#337eff' }}>{searchValue}</span>
            {afterStr}
          </span>
        );

        notFound = false;
      }

      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });

    let treeData = loop(this.gData);
    const renderTree = (notFound) => {
      return notFound ? <div className="not-found">无搜索结果</div> : (
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {treeData}
        </Tree>
      );
    }

    return (
      <div>
        <Input
          style={{ marginBottom: 8, width: 300 }}
          placeholder="请输入关键字"
          onChange={this.onChange}
          suffix={suffix}
          value={searchValue}
          ref={node => this.searchInput = node}
        />
        {renderTree(notFound)}
      </div>
    );
  }
```
:::

<style>
.fishdicon-search-line,
.fishdicon-close-circle-fill {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  font-size: 12px;
}
.fishdicon-search-line:hover,
.fishdicon-close-circle-fill:hover {
  color: #999;
}
.fishdicon-search-line:active,
.fishdicon-close-circle-fill:active {
  color: #666;
}
.not-found {
  font-size: 14px;
  color: #999;
  line-height: 32px;
  margin-left: 12px;
}
</style>


## 异步数据加载

:::demo 点击展开节点，动态加载数据。

```js

  constructor(props){
    super(props);
    this.state = {
      treeData: [
        { title: 'Expand to load', key: '0' },
        { title: 'Expand to load', key: '1' },
        { title: 'Tree Node', key: '2', isLeaf: true },
      ],
    }
  }

  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        treeNode.props.dataRef.children = [
          { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        ];
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      }, 1000);
    });
  }

  renderTreeNodes = (data) => {
    const TreeNode = Tree.TreeNode;
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }

  render() {
    const TreeNode = Tree.TreeNode;
    return (
      <Tree loadData={this.onLoadData}>
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
    );
  }
```
:::


## 自定义图标

:::demo 可以针对不同的节点定制图标。

```js

  render() {
    const TreeNode = Tree.TreeNode;
    return (
      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={['0-0-0']}
      >
        <TreeNode icon={<Icon type="demo-grid" />} title="parent 1" key="0-0">
          <TreeNode icon={<Icon type="demo-image" />} title="leaf" key="0-0-0" />
          <TreeNode
            icon={({ selected }) => (
              <Icon type={selected ? 'demo-mail' : 'demo-folder'} />
            )}
            title="leaf"
            key="0-0-1"
          />
        </TreeNode>
      </Tree>
    );
  }
```
:::

## 受控操作示例

:::demo 受控操作示例

```js

  constructor(props){
    super(props);
    this.treeData = [{
      title: '0-0',
      key: '0-0',
      children: [{
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      }, {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      }, {
        title: '0-0-2',
        key: '0-0-2',
      }],
    }, {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    }, {
      title: '0-2',
      key: '0-2',
    }];
    this.state = {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
    }
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  renderTreeNodes = (data) => {
    const TreeNode = Tree.TreeNode;
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render() {
    const TreeNode = Tree.TreeNode;
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(this.treeData)}
      </Tree>
    );
  }
```
:::


## 拖动示例

:::demo 将节点拖拽到其他节点内部或前后。

```js
  constructor(props){
    super(props);
    this.x = 3;
    this.y = 2;
    this.z = 1;
    this.gData = [];
    this.generateData = (_level, _preKey, _tns) => {
      const preKey = _preKey || '0';
      const tns = _tns || this.gData;

      const children = [];
      for (let i = 0; i < this.x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < this.y) {
          children.push(key);
        }
      }
      if (_level < 0) {
        return tns;
      }
      const level = _level - 1;
      children.forEach((key, index) => {
        tns[index].children = [];
        return this.generateData(level, key, tns[index].children);
      });
    };
    this.generateData(this.z);
    this.state = {
      gData:this.gData,
      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    }
  }

  onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  }

  onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // const dragNodesKeys = info.dragNodesKeys;
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    } else {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    }
    this.setState({
      gData: data,
    });
  }

  render() {
    const TreeNode = Tree.TreeNode;
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={item.title} />;
    });
    return (
      <Tree
        className="draggable-tree"
        defaultExpandedKeys={this.state.expandedKeys}
        draggable
        onDragEnter={this.onDragEnter}
        onDrop={this.onDrop}
      >
        {loop(this.state.gData)}
      </Tree>
    );
  }

```
:::

<style>
#components-tree-demo-draggable .draggable-tree .fishd-tree-node-content-wrapper {
  width: calc(100% - 18px);
}
</style>

## 连接线
:::demo 带连接线的树。

```js

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  render() {
    const TreeNode = Tree.TreeNode;
    const treeData = [{
      title: '0-0',
      key: '0-0',
      children: [{
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0', disabled: true },
          { title: '0-0-0-1', key: '0-0-0-1', selectable: false },
          { title: '0-0-0-2', key: '0-0-0-2' },
          { title: '0-0-0-3', key: '0-0-0-3' },
          { title: '0-0-0-4', key: '0-0-0-4' },
        ],
      }, {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      }, {
        title: '0-0-2',
        key: '0-0-2',
      }],
    }, {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    }, {
      title: '0-2',
      key: '0-2',
    }];
    return (
      <Tree
        showLine
        treeData={treeData}
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
      >
      </Tree>
    );
  }

```
:::


## 目录

:::demo 内置的目录树，`multiple` 模式支持 `ctrl(Windows)` / `command(Mac)` 复选。

```js

  state = {
    expandedKeys: [],
    autoExpandParent: true
  }

  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
    console.log('Trigger Expand');
  }

  render() {
    const DirectoryTree = Tree.DirectoryTree;
    const TreeNode = Tree.TreeNode;
    return (
      <DirectoryTree
        multiple
        defaultExpandAll
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onSelect={this.onSelect}
        onExpand={this.onExpand}
      >
        <TreeNode title="parent 0" key="0-0">
          <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
          <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
        </TreeNode>
        <TreeNode title="parent 1" key="0-1">
          <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
          <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
        </TreeNode>
      </DirectoryTree>
    );
  }
```
:::


## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoExpandParent | 是否自动展开父节点 | Boolean | true |
| checkable | 节点前添加 Checkbox 复选框 | Boolean | false |
| checkedKeys | （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点key，则子节点自动选中；相应当子节点key都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联 | Array<String> \| {checked: Array<String>, halfChecked: Array<String>} | [] |
| checkStrictly | checkable状态下节点选择完全受控（父子节点选中状态不再关联） | Boolean | false |
| className | 容器类名 | String | - |
| defaultCheckedKeys | 默认选中复选框的树节点 | Array<String> | [] |
| defaultExpandAll | 默认展开所有树节点 | Boolean | false |
| defaultExpandedKeys | 默认展开指定的树节点 | Array<String> | [] |
| defaultExpandParent | 默认展开父节点 | Boolean | true |
| defaultSelectedKeys | 默认选中的树节点 | Array<String> | [] |
| disabled | 将树禁用 | Boolean | false |
| draggable | 设置节点可拖拽（IE8+） | Boolean | false |
| expandAll | （受控）是否展开所有的树节点 | Boolean | false |
| expandedKeys | （受控）展开指定的树节点 | Array<String> | [] |
| filterTreeNode | 按需筛选树节点（高亮），返回true | (node) => Boolean | - |
| loadData | 异步加载数据 | (node) => Void | - |
| loadedKeys | （受控）已经加载的节点，需要配合 `loadData` 使用 | Array<String> | [] |
| multiple | 支持点选多个节点（节点本身） | Boolean | false |
| onCheck | 点击复选框触发 | (checkedKeys, e:{checked: Boolean, checkedNodes, node, event}) => Void | - |
| onDragEnd | dragend 触发时调用 | ({event, node}) => Void | - |
| onDragEnter | dragenter 触发时调用 | ({event, node, expandedKeys}) => Void | - |
| onDragLeave | dragleave 触发时调用 | ({event, node}) => Void | - |
| onDragOver | dragover 触发时调用 | ({event, node}) => Void | - |
| onDragStart | 开始拖拽时调用 | ({event, node}) => Void | - |
| onDrop | drop 触发时调用 | ({event, node, dragNode, dragNodesKeys}) => Void | - |
| onExpand | 展开/收起节点时触发 | (expandedKeys, {expanded: Boolean, node}) => Void | - |
| onLoad | 节点加载完毕时触发 | (loadedKeys, {event, node}) => Void | - |
| onRightClick | 响应右键点击 | ({event, node}) => Void | - |
| onSelect | 点击树节点触发 | (selectedKeys, e:{selected: Boolean, selectedNodes, node, event}) => Void | - |
| required | 是否必选，单选时有效 | Boolean | false |
| selectedKeys | （受控）设置选中的树节点 | Array<String> | - |
| showIcon | 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 | Boolean | false |
| showLine | 是否展示连接线 | Boolean | false |
| style | 容器样式 | Object | - |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点。treeData 中 key 必须设置，且其值需在整个树范围内唯一。 | Array<{key, title, [children, disabled, disableCheckbox, selectable, isLeaf]}> | [] |

### TreeNode props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disableCheckbox | 禁掉 checkbox | Boolean | false |
| disabled | 禁掉响应 | Boolean | false |
| icon | 自定义图标。可接收组件，props 为当前节点 props | ReactNode \| Function(props):ReactNode | - |
| isLeaf | 设置为叶子节点(设置了`loadData`时有效) | Boolean | false |
| key | 被树的 (default)ExpandedKeys \| (default)CheckedKeys \| (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复 | String | 内部计算出的节点位置 |
| selectable | 设置节点是否可被选中 | Boolean | true |
| title | 标题 | String \| ReactNode | '---' |

### DirectoryTree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expandAction | 目录展开逻辑 | Enum {false, 'click', 'doubleClick'} | 'click' |

### 注意

树节点可以有很多，在设置`checkable`时，将会花费更多的计算时间，因此我们缓存了一些计算结果（`this.treeNodesStates`）避免多次重复计算，以此提高性能。但这也带来了一些限制，当你异步加载树节点时，你需要这样渲染树：

```js
{this.state.treeData.length
  ? <Tree>{this.state.treeData.map(data => <TreeNode />)}</Tree>
  : 'loading tree'}
```
