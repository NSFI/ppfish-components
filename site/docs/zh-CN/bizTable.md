# BizTable 自定义表格

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；

- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 基本使用

:::demo 基本使用方式。

```js
  constructor(props) {
    super(props);
    this.state = {
      totalNum: 2,
      isListLoading: false
    };
  }

  handleTableChange = (pagination) => {
    this.setState({current: pagination.current, isListLoading: true}, () => {
      setTimeout(() => {
        this.setState({isListLoading: false});
      }, 2000);
    });
  };

  render() {
    const {totalNum, isListLoading} = this.state;
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];
    return (
      <BizTable
        columns={columns}
        dataSource={dataSource}
        totalNum={totalNum}
        onChange={this.handleTableChange}
        loading={isListLoading}
        offsetHeight={313}
        rowKey="key"
      />
    );
  }
```
:::


## 自定义筛选

:::demo 自定义筛选
```js
  constructor(props) {
    super(props);
    this.state = {
      sortBy: '',
      order: 'ascend'
    };
  }

  handleChangeSorter = (sortBy, order) => {
    this.setState({sortBy, order});
  };

  render() {
    const {sortBy, order} = this.state;
    const BizTableSorter = BizTable.BizTableSorter;
    return (
      <div>
        <div className="sorter-demo-container">
          <h3>State</h3>
          {Object.keys(this.state).map(key => <p key={key}>{`${key}: ${this.state[key]}`}</p>)}
        </div>
        <div className="sorter-demo-container">
          <h3>普通模式</h3>
          <BizTableSorter
            handleChangeSorter={this.handleChangeSorter}
            sortBy={sortBy}
            sortKey="name"
            order={order}
          />
          <h3>自定义模式</h3>
        </div>
        <div className="sorter-demo-container">
          <BizTableSorter
            handleChangeSorter={this.handleChangeSorter}
            sortBy={sortBy}
            sortKey="id"
            order={order}
            iconDown={<Icon type="down-circle"/>}
            iconUp={<Icon type="up-circle"/>}
            customMode={true}
          />
        </div>
      </div>
    );
  }

```
:::

<style>
.sorter-demo-container {
  margin-bottom: 20px;
  padding-left: 50px;
}
</style>

## API

### BizTable

   - 单页固定表头，需要指定 offsetHeight 值;
   - 添加点击高亮功能;
   - 分页页数定制，页数取props pageSize;
   - ant-table ellpsis 支持 `.col-ell`
   - 添加customSorter支持

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetHeight | 表格高度差 | number | - |
| pageSize | 单页展示条数 | number | 50 |
| totalNum | 总项数 | number | - |
| pagination | 是否需要翻页器或者替换翻页器参数 | boolean\object |  |
| onRowClick | 单独封装,使用其余onRow操作使用onRow进行覆盖 | function | - |

> 其余参与见Table表

#### BizTable.BizTableSorter

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| iconUp | 升序图标 | node/string | <i class="anticon anticon-caret-up"/> |
| iconDown | 降序图标 | node/string | <i class="anticon anticon-caret-down"/> |
| sortBy | 以~排序 | number | - |
| sortKey | 排序key | string/number | - |
| order | 单独封装,升序还是降序 | 'ascend'/'descend' | - |
| handleChangeSorter | 改变排序规则 | function | - |
| customMode | 判断是自定义sorter还是普通类型sorter | boolean | false |

### Table

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否展示外边框和列边框 | boolean | false |
| childrenColumnName | 指定树形结构的列名 | string\[] | children |
| columns | 表格列的配置描述，具体项见下表 | [ColumnProps](https://git.io/vMMXC)\[] | - |
| components | 覆盖默认的 table 元素 | object | - |
| dataSource | 数据数组 | any\[] |  |
| defaultExpandAllRows | 初始时，是否展开所有行 | boolean | false |
| defaultExpandedRowKeys | 默认展开的行 | string\[] | - |
| expandedRowKeys | 展开的行，控制属性 | string\[] | - |
| expandedRowRender | 额外的展开行 | Function(record):ReactNode | - |
| expandRowByClick | 通过点击行来展开子行 | boolean | `false` |
| footer | 表格尾部 | Function(currentPageData) |  |
| indentSize | 展示树形数据时，每层缩进的宽度，以 px 为单位 | number | 15 |
| loading | 页面是否加载中 | boolean\|[object](/#/components/spin/) ([更多](https://github.com/ant-design/ant-design/issues/4544#issuecomment-271533135)) | false |
| locale | 默认文案设置，目前包括排序、过滤、空数据文案 | object | filterConfirm: '确定' <br> filterReset: '重置' <br> emptyText: '暂无数据' <br> [默认值](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) |
| pagination | 分页器，参考[pagination](/#/components/pagination/)，设为 false 时不展示和进行分页 | object |  |
| rowClassName | 表格行的类名 | Function(record, index):string | - |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string\|Function(record):string | 'key' |
| rowSelection | 列表项是否可选择 | object | null |
| scroll | 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，建议为 `x` 设置一个数字，如果要设置为 `true`，需要配合样式 `.ant-table td { white-space: nowrap; }` | { x: number \| true, y: number } | - |
| showHeader | 是否显示表头 | boolean | true |
| size | 正常或迷你类型，`default` or `small` | string | default |
| title | 表格标题 | Function(currentPageData) |  |
| onChange | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter) |  |
| onExpand | 点击展开图标时触发 | Function(expanded, record) |  |
| onExpandedRowsChange | 展开的行变化时触发 | Function(expandedRows) |  |
| onHeaderRow | 设置头部行属性 | Function(column, index) | - |
| onRow | 设置行属性 | Function(record, index) | - |

#### onRow 用法

适用于 `onRow` `onHeaderRow` `onCell` `onHeaderCell`。

```js
<Table
  onRow={(record) => {
    return {
      onClick: () => {},       // 点击行
      onMouseEnter: () => {},  // 鼠标移入行
      onXxxx...
    };
  }}
  onHeaderRow={(column) => {
    return {
      onClick: () => {},        // 点击表头行
    };
  }}
/>
```

### Column

列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 设置列内容的对齐方式 | 'left' \| 'right' \| 'center' | 'left' |
| className | 列的 className | string | - |
| colSpan | 表头列合并,设置为 0 时，不渲染 | number |  |
| dataIndex | 列数据在数据项中对应的 key，支持 `a.b.c` 的嵌套写法 | string | - |
| filterDropdown | 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互 | ReactNode | - |
| filterDropdownVisible | 用于控制自定义筛选菜单是否可见 | boolean | - |
| filtered | 标识数据是否经过过滤，筛选图标会高亮 | boolean | false |
| filteredValue | 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 | string\[] | - |
| filterIcon | 自定义 fiter 图标。 | ReactNode | false |
| filterMultiple | 是否多选 | boolean | true |
| filters | 表头的筛选菜单项 | object\[] | - |
| fixed | 列是否固定，可选 `true`(等效于 left) `'left'` `'right'` | boolean\|string | false |
| key | React 需要的 key，如果已经设置了唯一的 `dataIndex`，可以忽略这个属性 | string | - |
| render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并 | Function(text, record, index) {} | - |
| sorter | 排序函数，本地排序使用一个函数(参考 [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的 compareFunction)，需要服务端排序可设为 true | Function\|boolean | - |
| sortOrder | 排序的受控属性，外界可用此控制列的排序，可设置为 `'ascend'` `'descend'` `false` | boolean\|string | - |
| title | 列头显示文字 | string\|ReactNode | - |
| width | 列宽度 | string\|number | - |
| onCell | 设置单元格属性 | Function(record) | - |
| onFilter | 本地模式下，确定筛选的运行函数 | Function | - |
| onFilterDropdownVisibleChange | 自定义筛选菜单可见变化时调用 | function(visible) {} | - |
| onHeaderCell | 设置头部单元格属性 | Function(column) | - |

### ColumnGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列头显示文字 | string\|ReactNode | - |

### pagination

分页的配置项。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 指定分页显示的位置 | 'top' \| 'bottom' \| 'both' | 'bottom' |

更多配置项，请查看 [`Pagination`](/#/components/pagination/)。

### rowSelection

选择功能的配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columnWidth | 自定义列表选择框宽度 | string\|number | - |
| fixed | 把选择框列固定在左边 | boolean | - |
| getCheckboxProps | 选择框的默认属性配置 | Function(record) | - |
| hideDefaultSelections | 去掉『全选』『反选』两个默认选项 | boolean | false |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string\[] | \[] |
| selections | 自定义选择项, 设为 `true` 时使用默认选择项 | object\[]\|boolean | true |
| type | 多选/单选，`checkbox` or `radio` | string | `checkbox` |
| onChange | 选中项发生变化的时的回调 | Function(selectedRowKeys, selectedRows) | - |
| onSelect | 用户手动选择/取消选择某列的回调 | Function(record, selected, selectedRows, nativeEvent) | - |
| onSelectAll | 用户手动选择/取消选择所有列的回调 | Function(selected, selectedRows, changeRows) | - |
| onSelectInvert | 用户手动选择反选的回调 | Function(selectedRows) | - |

### selection

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | React 需要的 key，建议设置 | string | - |
| text | 选择项显示的文字 | string\|React.ReactNode | - |
| onSelect | 选择项点击回调 | Function(changeableRowKeys) | - |
