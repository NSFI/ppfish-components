# 表格

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 如何使用

指定表格的数据源 `dataSource` 为一个数组。

```js
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

<Table dataSource={dataSource} columns={columns} />
```

## 基本用法
:::demo 简单的表格，最后一列是各种操作。
```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Divider type="vertical" />
          <a href="javascript:;" className="fishd-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];
    
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
    return (
      <Table columns={columns} dataSource={data} />
    );
  }
```
:::

## 控制列的显示

:::demo 
```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Divider type="vertical" />
          <a href="javascript:;" className="fishd-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];
    
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
    return (
      <Table columns={columns} dataSource={data} columnFiltrate={{
               defaultColumns:['age'],
               hideColumns:['name'],
               hideColumnsChange:(x)=>console.log(x),
      }}/>
    );
  }
```
:::


## JSX 风格的 API
:::demo 使用 JSX 风格的 API。
> 这个只是一个描述 `columns` 的语法糖，所以你不能用其他组件去包裹 `Column` 和 `ColumnGroup`。
```js
  render() {
    const { Column, ColumnGroup } = Table;
    const data = [{
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
    return (
      <Table dataSource={data}>
        <ColumnGroup title="Name">
          <Column
            title="First Name"
            dataIndex="firstName"
            key="firstName"
          />
          <Column
            title="Last Name"
            dataIndex="lastName"
            key="lastName"
          />
        </ColumnGroup>
        <Column
          title="Age"
          dataIndex="age"
          key="age"
        />
        <Column
          title="Address"
          dataIndex="address"
          key="address"
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a href="javascript:;">Action 一 {record.name}</a>
              <Divider type="vertical" />
              <a href="javascript:;">Delete</a>
              <Divider type="vertical" />
              <a href="javascript:;" className="fishd-dropdown-link">
                More actions <Icon type="down" />
              </a>
            </span>
          )}
        />
      </Table>
    );
  }
```
:::

## 可选择
:::demo 
第一列是联动的选择框。
默认点击 checkbox 触发选择行为，需要点击行触发可以参考例子：https://codesandbox.io/s/000vqw38rl

```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    }];
    
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
  }
```
:::

## 选择和操作
:::demo 选择后进行操作，完成后清空选择，通过 `rowSelection.selectedRowKeys` 来控制选中项。。
```js
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
```
:::

## 自定义选择项
:::demo 通过 `rowSelection.selections` 自定义选择项，默认不显示下拉选项，设为 `true` 时显示默认选择项。
```js
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
    }
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
  }
```
:::

## 可控的筛选和排序
:::demo 
使用受控属性对筛选和排序状态进行控制。
1.`columns` 中定义了 `filteredValue` 和 `sortOrder` 属性即视为受控模式。
2.只支持同时对一列进行排序，请保证只有一列的 `sortOrder` 属性是生效的。
3.务必指定 `column.key`。
```js
  constructor() {
    super();
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
    }
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }

  render() {
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    }];
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    }];
    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
```
:::

## 筛选和排序
:::demo 
对某一列数据进行筛选，使用列的 `filters` 属性来指定需要筛选菜单的列，`onFilter` 用于筛选当前数据，`filterMultiple` 用于指定多选和单选。
对某一列数据进行排序，通过指定列的 `sorter` 函数即可启动排序按钮。sorter: function(a, b) { ... }， a、b 为比较的两个列数据。
使用 `defaultSortOrder` 属性，设置列的默认排序顺序。
```js
  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      filters: [{
        text: 'Joe',
        value: 'Joe',
      }, {
        text: 'Jim',
        value: 'Jim',
      }, {
        text: 'Submenu',
        value: 'Submenu',
        children: [{
          text: 'Green',
          value: 'Green',
        }, {
          text: 'Black',
          value: 'Black',
        }],
      }],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sorterType:'firstLetter'
    }, {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age
    }, {
      title: 'Address',
      dataIndex: 'address',
      filters: [{
        text: 'London',
        value: 'London',
      }, {
        text: 'New York',
        value: 'New York',
      }],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
    }];
    
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    }];
    return (
      <Table columns={columns} dataSource={data} onChange={this.onChange} />
    );
  }
```
:::

## 远程加载数据
:::demo 这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。 
        另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的 onFilter 和 sorter 函数，而是在把筛选和排序的参数发到服务端来处理。
        注意，此示例使用 模拟接口，展示数据可能不准确，请打开网络面板查看请求。
```js
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    fetch('https://randomuser.me/api?results=10').then((res) => {
      return res.json() 
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: name => `${name.first} ${name.last}`,
      width: '20%',
    }, {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      width: '20%',
    }, {
      title: 'Email',
      dataIndex: 'email',
    }];
    return (
      <Table
        columns={columns}
        rowKey={record => record.login.uuid}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
```
:::

## 紧凑型
:::demo 两种紧凑型的列表，小型列表只用于对话框内。
```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
    return (
      <div>
        <h4>Middle size table</h4>
        <Table columns={columns} dataSource={data} size="middle" />
        <h4>Small size table</h4>
        <Table columns={columns} dataSource={data} size="small" />
      </div>
    );
  }
```
:::

## 带边框
:::demo 添加表格边框线，页头和页脚。
```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    
    const data = [{
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    }];
    return (
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'Header'}
        footer={() => 'Footer'}
      />
    );
  }
```
:::

## 可展开
:::demo 当表格内容较多不能一次性完全展示时。
```js
  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a> },
    ];
    
    const data = [
      { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
      { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
      { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
    ];
    return (
      <Table
        columns={columns}
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
        dataSource={data}
      />
    );
  }
```
:::

## 表格行/列合并
:::demo 
表头只支持列合并，使用 `column` 里的 `colSpan` 进行设置。
表格支持行/列合并，使用 `render` 里的单元格属性 `colSpan` 或者 `rowSpan` 设值为 `0` 时，设置的表格不会渲染。
```js
  render() {
    // In the fifth row, other columns are merged into first column
    // by setting it's colSpan to be 0
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: (text, row, index) => {
        if (index < 4) {
          return <a href="javascript:;">{text}</a>;
        }
        return {
          children: <a href="javascript:;">{text}</a>,
          props: {
            colSpan: 5,
          },
        };
      },
    }, {
      title: 'Age',
      dataIndex: 'age',
      render: renderContent,
    }, {
      title: 'Home phone',
      colSpan: 2,
      dataIndex: 'tel',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        // These two are merged into above cell
        if (index === 3) {
          obj.props.rowSpan = 0;
        }
        if (index === 4) {
          obj.props.colSpan = 0;
        }
        return obj;
      },
    }, {
      title: 'Phone',
      colSpan: 0,
      dataIndex: 'phone',
      render: renderContent,
    }, {
      title: 'Address',
      dataIndex: 'address',
      render: renderContent,
    }];
    
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      tel: '0571-22098333',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '4',
      name: 'Jim Red',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park',
    }, {
      key: '5',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    }];
    return (
      <Table columns={columns} dataSource={data} bordered />
    );
  }
```
:::

## 树形数据展示
:::demo 

表格支持树形数据的展示，可以通过设置 `indentSize` 以控制每一层的缩进宽度。

注：暂不支持父子数据递归关联选择。

```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    }, {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
    }];
    
    const data = [{
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [{
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      }, {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [{
          key: 121,
          name: 'Jimmy Brown',
          age: 16,
          address: 'New York No. 3 Lake Park',
        }],
      }, {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [{
          key: 131,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park',
          children: [{
            key: 1311,
            name: 'Jim Green jr.',
            age: 25,
            address: 'London No. 3 Lake Park',
          }, {
            key: 1312,
            name: 'Jimmy Green sr.',
            age: 18,
            address: 'London No. 4 Lake Park',
          }],
        }],
      }],
    }, {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
    
    // rowSelection objects indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
    return (
      <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
    );
  }
```
:::

## 固定表头
:::demo 
方便一页内展示大量数据。
需要指定 `column` 的 `width` 属性，否则列头和内容可能不对齐。
```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    }, {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    return (
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    );
  }
```
:::

## 固定表头-单屏幕固定
:::demo 
方便一页单屏内展示大量数据。
```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    }, {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    return (
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 'calc(100vh - 400px)' }} />
    );
  }
```
:::


## 固定列
:::demo 

对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 `scroll.x` 配合使用。

若列头与内容不对齐或出现列重复，请指定列的宽度 `width`。

建议指定 `scroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `scroll.x`。

```js
  render() {
    const columns = [
      { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
      { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
      { title: 'Column 1', dataIndex: 'address', key: '1' },
      { title: 'Column 2', dataIndex: 'address', key: '2' },
      { title: 'Column 3', dataIndex: 'address', key: '3' },
      { title: 'Column 4', dataIndex: 'address', key: '4' },
      { title: 'Column 5', dataIndex: 'address', key: '5' },
      { title: 'Column 6', dataIndex: 'address', key: '6' },
      { title: 'Column 7', dataIndex: 'address', key: '7' },
      { title: 'Column 8', dataIndex: 'address', key: '8' },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href="javascript:;">action</a>,
      },
    ];
    
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    }];
    return (
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
    );
  }
```
:::

## 固定头和列
:::demo 
适合同时展示有大量数据和数据列。

若列头与内容不对齐或出现列重复，请指定列的宽度 `width`。

建议指定 `scroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `scroll.x`。
```js
  render() {
    const columns = [
      { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
      { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
      { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
      { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
      { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
      { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
      { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
      { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
      { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
      { title: 'Column 8', dataIndex: 'address', key: '8' },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href="javascript:;">action</a>,
      },
    ];
    
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    return (
      <Table columnFiltrate={{}} columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
    );
  }
```
:::

## 表头分组
:::demo `columns[n]` 可以内嵌 `children`，以渲染分组表头。
```js
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
      filters: [{
        text: 'Joe',
        value: 'Joe',
      }, {
        text: 'John',
        value: 'John',
      }],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    }, {
      title: 'Other',
      children: [{
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 200,
        sorter: (a, b) => a.age - b.age,
      }, {
        title: 'Address',
        children: [{
          title: 'Street',
          dataIndex: 'street',
          key: 'street',
          width: 200,
        }, {
          title: 'Block',
          children: [{
            title: 'Building',
            dataIndex: 'building',
            key: 'building',
            width: 100,
          }, {
            title: 'Door No.',
            dataIndex: 'number',
            key: 'number',
            width: 100,
          }],
        }],
      }],
    }, {
      title: 'Company',
      children: [{
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
      }, {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      }],
    }, {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 60,
      fixed: 'right',
    }];
    
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        scroll={{ x: '130%', y: 240 }}
      />
    );
  }
```
:::

## 可编辑单元格
:::demo 
带单元格编辑功能的表格。
```js
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  edit = () => {
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ? (
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
              suffix={(
                <Icon
                  type="check"
                  className="editable-cell-icon-check"
                  onClick={this.check}
                />
)}
            />
          ) : (
            <div style={{ paddingRight: 24 }}>
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
          )
        }
      </div>
    );
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      ),
    }, {
      title: 'age',
      dataIndex: 'age',
    }, {
      title: 'address',
      dataIndex: 'address',
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1
            ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
    };
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }

  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
```
:::

## 可编辑行
:::demo 带行编辑功能的表格。
```js
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(data);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }
}
```
:::

## 嵌套子表格
:::demo 展示每行数据更详细的信息。
```js
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          Action 1
        </Menu.Item>
        <Menu.Item>
          Action 2
        </Menu.Item>
      </Menu>
    );
    const expandedRowRender = () => {
      const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          render: () => (
            <span className="table-operation">
              <a href="javascript:;">Pause</a>
              <a href="javascript:;">Stop</a>
              <Dropdown overlay={menu}>
                <a href="javascript:;">
                  More <Icon type="down" />
                </a>
              </Dropdown>
            </span>
          ),
        },
      ];
  
      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      );
    };
  
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Platform', dataIndex: 'platform', key: 'platform' },
      { title: 'Version', dataIndex: 'version', key: 'version' },
      { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      { title: 'Creator', dataIndex: 'creator', key: 'creator' },
      { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Action', key: 'operation', render: () => <a href="javascript:;">Publish</a> },
    ];
    
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
      });
    }
      
    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data}
      />
    );
  }
```
:::

## 动态控制表格属性
:::demo 选择不同配置组合查看效果。
```js
const FormItem = Form.Item;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: 70,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  width: 360,
  render: (text, record) => (
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="fishd-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

class Demo extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'default',
    expandedRowRender,
    title: undefined,
    showHeader,
    footer,
    rowSelection: {},
    scroll: undefined,
  }

  handleToggle = (prop) => {
    return (enable) => {
      this.setState({ [prop]: enable });
    };
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  handleExpandChange = (enable) => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  }

  handleTitleChange = (enable) => {
    this.setState({ title: enable ? title : undefined });
  }

  handleHeaderChange = (enable) => {
    this.setState({ showHeader: enable ? showHeader : false });
  }

  handleFooterChange = (enable) => {
    this.setState({ footer: enable ? footer : undefined });
  }

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  }

  handleScollChange = (enable) => {
    this.setState({ scroll: enable ? scroll : undefined });
  }

  handlePaginationChange = (e) => {
    const { value } = e.target;
    this.setState({
      pagination: value === 'none' ? false : { position: value },
    });
  }

  render() {
    const state = this.state;
    return (
      <div>
        <div className="components-table-demo-control-bar">
          <Form layout="inline">
            <FormItem label="Size">
              <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="Pagination">
              <Radio.Group
                value={state.pagination ? state.pagination.position : 'none'}
                onChange={this.handlePaginationChange}
              >
                <Radio.Button value="top">Top</Radio.Button>
                <Radio.Button value="bottom">Bottom</Radio.Button>
                <Radio.Button value="both">Both</Radio.Button>
                <Radio.Button value="none">None</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
        </div>
        <Table {...this.state} columns={columns} dataSource={data} />
      </div>
    );
  }
}
```
:::

## API

### Table

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeRowByClick | 点击后激活Row的激活态样式 | boolean | `false` |
| bordered | 是否展示外边框和列边框 | boolean | false |
| childrenColumnName | 指定树形结构的列名 | string\[] | children |
| columns | 表格列的配置描述，具体项见下表 | [ColumnProps](https://git.io/vMMXC)\[] | - |
| columnFiltrate | 列表筛选显示功能 | object\| boolean | false |
| components | 覆盖默认的 table 元素 | object | - |
| dataSource | 数据数组 | any\[] |  |
| defaultExpandAllRows | 初始时，是否展开所有行 | boolean | false |
| defaultExpandedRowKeys | 默认展开的行 | string\[] | - |
| expandedRowKeys | 展开的行，控制属性 | string\[] | - |
| expandedRowRender | 额外的展开行 | Function(record):ReactNode | - |
| expandRowByClick | 通过点击行来展开子行 | boolean | `false` |
| footer | 表格尾部 | Function(currentPageData) |  |
| indentSize | 展示树形数据时，每层缩进的宽度，以 px 为单位 | number | 15 |
| loading | 页面是否加载中 | boolean\|[object](https://nsfi.github.io/ppfish-components/#/components/spin/) ([更多](https://github.com/ant-design/ant-design/issues/4544#issuecomment-271533135)) | false |
| locale | 默认文案设置，目前包括排序、过滤、空数据文案 | object | filterConfirm: '确定' <br> filterReset: '重置' <br> emptyText: '暂无数据' <br> [默认值](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) |
| pagination | 分页器，参考 [pagination](https://nsfi.github.io/ppfish-components/#/components/pagination/)，设为 false 时不展示和进行分页 | object |  |
| rowClassName | 表格行的类名 | Function(record, index):string | - |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string\|Function(record):string | 'key' |
| rowSelection | 列表项是否可选择 | object | null |
| scroll | 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，建议为 `x` 设置一个数字，如果要设置为 `true`，需要配合样式 `.fishd-table td { white-space: nowrap; }` | { x: number \| true, y: number } | - |
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
| sorterType | 排序按钮类型：默认、首字母A-Z排序 | 'default' \| 'firstLetter' | - |
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

更多配置项，请查看 [`Pagination`](https://nsfi.github.io/ppfish-components/#/components/pagination/)。

### rowSelection

选择功能的配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columnWidth | 自定义列表选择框宽度 | string\|number | - |
| fixed | 把选择框列固定在左边 | boolean | - |
| getCheckboxProps | 选择框的默认属性配置 | Function(record) | - |
| hideDefaultSelections | 去掉『全选』『反选』两个默认选项 | boolean | false |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string\[] | \[] |
| selections | 自定义选择项 设为 `true` 时使用默认选择项 | object\[]\|boolean | true |
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


### columnFiltrate

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fixed | 是否fixed | ['left','right'] | - |
| hideColumns | 初始化组件时需要隐藏的columns的key[] | string[] | - |
| defaultColumns | 默认需要显示的不能调整的列的key[] | string[] | - |
| hideColumnsChange | 选择隐藏的列后的回调 | fucntion(hideColumns:string[]) | - |

> 隐藏列表项有以下限制：

- fixed的列不能隐藏

- 分组的列不能隐藏

- 存在fixed列的普通列的最后一列不能隐藏

- 没有fixed的列中至少保留一列不能隐藏

### 在 TypeScript 中使用

```js
import { Table } from 'ppfish';
import { ColumnProps } from 'ppfish/source/interface.tsx';

interface IUser {
  key: number;
  name: string;
}

const columns: ColumnProps<IUser>[] = [{
  key: 'name',
  title: 'Name',
  dataIndex: 'name',
}];

const data: IUser[] = [{
  key: 0,
  name: 'Jack',
}];

class UserTable extends Table<IUser> {}
<UserTable columns={columns} dataSource={data} />

// 使用 JSX 风格的 API
class NameColumn extends Table.Column<IUser> {}

<UserTable dataSource={data}>
  <NameColumn key="name" title="Name" dataIndex="name" />
</UserTable>
```

### 注意

按照 [React 的规范](https://facebook.github.io/react/docs/lists-and-keys.html#keys)，所有的组件数组必须绑定 key。在 Table 中，`dataSource` 和 `columns` 里的数据值都需要指定 `key` 值。对于 `dataSource` 默认将每列数据的 `key` 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 `rowKey` 来指定数据列的主键。若没有指定，控制台会出现以下的提示，表格组件也会出现各类奇怪的错误。

![控制台警告](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

```js
// 比如你的数据主键是 uid
return <Table rowKey="uid" />;
// 或
return <Table rowKey={record => record.uid} />;
```


<style>
th.column-money,
td.column-money {
  text-align: right !importfishd;
}
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
.components-table-demo-nested .fishd-table-expanded-row > td:last-child {
  padding: 0 48px 0 8px;
}

.components-table-demo-nested .fishd-table-expanded-row > td:last-child .fishd-table-thead th {
  border-bottom: 1px solid #e9e9e9;
}

.components-table-demo-nested .fishd-table-expanded-row > td:last-child .fishd-table-thead th:first-child {
  padding-left: 0;
}

.components-table-demo-nested .fishd-table-expanded-row > td:last-child .fishd-table-row td:first-child {
  padding-left: 0;
}

.components-table-demo-nested .fishd-table-expanded-row .fishd-table-row:last-child td {
  border: none;
}

.components-table-demo-nested .fishd-table-expanded-row .fishd-table-thead > tr > th {
  background: none;
}

.components-table-demo-nested .table-operation a:not(:last-child) {
  margin-right: 24px;
}

.components-table-demo-nested .fishd-table-expanded-row:hover > td {
  background: #fbfbfb;
}

.editable-cell {
  position: relative;
}

.editable-cell-icon,
.editable-cell-icon-check {
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 14px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -7px;
  display: none;
}

td:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-row .fishd-form-explain {
  position: absolute;
  font-size: 12px;
  margin-top: -4px;
}

#components-table-demo-drag-sorting tr.drop-over-downward td {
  border-bottom: 2px dashed #1890ff;
}

#components-table-demo-drag-sorting tr.drop-over-upward td {
  border-top: 2px dashed #1890ff;
}

.components-table-demo-control-bar { margin-bottom: 10px; } .components-table-demo-control-bar .fishd-form-item { margin-right: 16px; margin-bottom: 8px; } 
</style>
