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
      list: [{id: 1, name: 1}, {id: 2, name: 2}],
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
    const {list, totalNum, isListLoading} = this.state;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },];
    return (
      <BizTable
        columns={columns}
        dataSource={list}
        totalNum={totalNum}
        onChange={this.handleTableChange}
        loading={isListLoading}
        offsetHeight={313}
        rowKey="id"
      />
    );
  }
```
:::


## API
| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |

