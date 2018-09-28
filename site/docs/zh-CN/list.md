# List 列表

通用列表。

## 何时使用

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## 基础列表

:::demo 列表拥有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

可通过设置 `header` 和 `footer`，来自定义列表头部和尾部。

```js
render(){
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Man charged over missing wedding girl.',
    'Racing car sprays burning fuel into crowd.',
    'Man charged over missing wedding girl.',
  ];
  return(
    <div>
        <h3 style={{ marginBottom: 16 }}>Default Size</h3>
        <List
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        <h3 style={{ margin: '16px 0' }}>Small Size</h3>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        <h3 style={{ margin: '16px 0' }}>Large Size</h3>
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
  )
}
```
:::

## 斑马纹样式

:::demo 列表拥有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

可通过设置 `header` 和 `footer`，来自定义列表头部和尾部。

```js
render(){
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Man charged over missing wedding girl.',
    'Racing car sprays burning fuel into crowd.',
    'Man charged over missing wedding girl.',
  ];
  return(
    <div>
        <h3 style={{ marginBottom: 16 }}>Default Size</h3>
        <List
          bordered
          striped
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        <h3 style={{ margin: '16px 0' }}>Small Size</h3>
        <List
          size="small"
          bordered
          striped
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        <h3 style={{ margin: '16px 0' }}>Large Size</h3>
        <List
          size="large"
          bordered
          striped
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
  )
}
```
:::


## 信息组合列表

:::demo 基础列表。

```js
render(){
  const data = [
    {
      title: 'Fishd Design Title 1',
    },
    {
      title: 'Fishd Design Title 2',
    },
    {
      title: 'Fishd Design Title 3',
    },
    {
      title: 'Fishd Design Title 4',
    },
  ];
  return(
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://qi.163.com">{item.title}</a>}
              description="Fishd Design, a design language for background applications, is refined by Fishd UED Team"
            />
          </List.Item>
        )}
      />
  )
}
```
:::


## 栅格列表

:::demo 可以通过设置 `List` 的 `grid` 属性来实现栅格列表，`column` 可设置期望显示的列数。

```js
render(){
  const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];
  return(
    <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
  )
}
```
:::

## 响应式的栅格列表

:::demo 响应式的栅格列表。尺寸与 [Layout Grid](https://nsfi.github.io/ppfish-components/#/components/grid/) 保持一致。

```js
render(){
  const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];
  return(
    <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
  )
}
```
:::

## 竖排列表样式

:::demo 通过设置 `itemLayout` 属性为 `vertical` 可实现竖排列表样式。

```js

render(){
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'http://qi.163.com',
      title: `fishd design part ${i}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'Fishd Design, a design language for background applications, is refined by Fishd UED Team.',
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }
  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  return(
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
    footer={<div><b>fishd design</b> footer part</div>}
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />);
}
```
:::

## API

### List

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否展示边框 | Boolean | false |
| footer | 列表底部 | String\|ReactNode | - |
| grid | 列表栅格配置 | Object | - |
| header | 列表头部 | String\|ReactNode | - |
| itemLayout | 设置 `List.Item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | String | - |
| loading | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位 | Boolean\|[Object](https://nsfi.github.io/ppfish-components/#/components/spin)  | false |
| loadMore | 加载更多 | String\|ReactNode | - |
| locale | 默认文案设置，目前包括空数据文案 | Object | {emptyText: '暂无数据'} |
| pagination | 对应的 `pagination` 配置, 设置 `false` 不显示 | Boolean\|Object | false |
| size | list 的尺寸 | Enum {'default' , 'middle', 'small' }| 'default' |
| split | 是否展示分割线 | Boolean | true |
| striped | 是否展示斑马纹 | Boolean | false |

### pagination

分页的配置项。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 指定分页显示的位置 | Enum {'top' , 'bottom' , 'both' }| 'bottom' |

更多配置项，请查看 [`Pagination`](https://nsfi.github.io/ppfish-components/#/components/pagination)。

### List grid props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column | 列数 | Number | - |
| gutter | 栅格间隔 | Number | 0 |
| xs | `<576px` 展示的列数 | Number | - |
| sm | `≥576px` 展示的列数 | Number | - |
| md | `≥768px` 展示的列数 | Number | - |
| lg | `≥992px` 展示的列数 | Number | - |
| xl | `≥1200px` 展示的列数 | Number | - |
| xxl | `≥1600px` 展示的列数 | Number | - |

### List.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 列表操作组，根据 `itemLayout` 的不同, 位置在卡片底部或者最右侧 | Array<ReactNode> | - |
| extra | 额外内容, 通常用在 `itemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | String\|ReactNode | - |

### List.Item.Meta

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| avatar | 列表元素的图标 | ReactNode | - |
| description | 列表元素的描述内容 | String\|ReactNode | - |
| title | 列表元素的标题 | String\|ReactNode | - |
