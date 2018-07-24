# BizTable 自定义表格

展示行列数据。

## 何时使用

- 需要进行单页输出表头固定，动态计算表高度（maxHeight）的时候

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

## API

### BizTable

   - 单页固定表头，需要指定 offsetHeight 值;
   - ant-table ellpsis 支持 `.col-ell`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetHeight | 表格高度差 | number | - |
| pageSize | 单页展示条数 | number | 50 |
| totalNum | 总项数 | number | - |
| pagination | 是否需要翻页器或者替换翻页器参数 | boolean\object |  |

> 其余参与见Table表
