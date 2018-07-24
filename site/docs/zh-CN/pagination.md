# 分页

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。


## 基本

:::demo 基础分页。

```js
render(){
  return(<Pagination defaultCurrent={1} total={50} />)
}
```
:::

## 改变

:::demo 改变每页显示条目数。

```js
onShowSizeChange=(current, pageSize)=> {
  console.log(current, pageSize);
};

render(){
  return(
    <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
 )
}
```
:::

## 受控

:::demo 受控制的页码。

```js
  state = {
    current: 3,
  }

  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  }

  render() {
    return <Pagination current={this.state.current} onChange={this.onChange} total={50} />;
  }
```
:::

## 上一步和下一步

:::demo 修改上一步和下一步为文字链接。

```js
itemRender=(current, type, originalElement) =>{
  if (type === 'prev') {
    return <a>Previous</a>;
  } if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}

render(){
  return(<Pagination total={500} itemRender={this.itemRender} />)
}
```
:::

## 跳转

:::demo 快速跳转到某一页。

```js

onChange=(pageNumber) => {
  console.log('Page: ', pageNumber);
}
render(){
  return(<Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />)
}
```
:::

## 迷你

:::demo 迷你版本。

```js
showTotal=(total)=> {
  return `Total ${total} items`;
};

render(){
  return(
    <div id="components-pagination-demo-mini">
        <Pagination size="small" total={50}  style={{marginBottom:24}}/>
        <Pagination size="small" total={50} showSizeChanger showQuickJumper style={{marginBottom:24}}/>
        <Pagination size="small" total={50} showTotal={this.showTotal} />
      </div>
  )
}
```
:::

## 更多

:::demo 更多分页。

```js
render(){
  return(<Pagination defaultCurrent={6} total={500} />)
}
```
:::

## 简洁

:::demo 简单的翻页。

```js
render(){
  return( <Pagination simple defaultCurrent={2} total={50} />)
}
```
:::

## 总数

:::demo 通过设置 `showTotal` 展示总共有多少数据。


```js
render(){
  return(
    <div>
        <Pagination
          total={85}
          showTotal={total => `Total ${total} items`}
          pageSize={20}
          defaultCurrent={1}
        />
        <br />
        <Pagination
          total={85}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSize={20}
          defaultCurrent={1}
        />
      </div>
  )
}
```
:::

## API

```html
<Pagination onChange={onChange} total={50} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页数 | number | - |
| defaultCurrent | 默认的当前页数 | number | 1 |
| defaultPageSize | 默认的每页条数 | number | 10 |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false |
| itemRender | 用于自定义页码的结构，可用于优化 SEO | (page, type: 'page' \| 'prev' \| 'next', originalElement) => React.ReactNode | - |
| pageSize | 每页条数 | number | - |
| pageSizeOptions | 指定每页可以显示多少条 | string\[] | ['10', '20', '30', '40'] |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| showSizeChanger | 是否可以改变 pageSize | boolean | false |
| showTotal | 用于显示数据总量和当前数据顺序 | Function(total, range) | - |
| simple | 当添加该属性时，显示为简单分页 | boolean | - |
| size | 当为「small」时，是小尺寸分页 | string | "" |
| total | 数据总数 | number | 0 |
| onChange | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize) | noop |
| onShowSizeChange | pageSize 变化的回调 | Function(current, size) | noop |
