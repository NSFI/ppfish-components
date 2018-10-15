# Skeleton 加载占位图 【交互：李东岳 |视觉：徐剑杰 |开发：高志友】

在需要等待加载内容的位置提供一个占位图。

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。

## 基本使用

:::demo 最简单的占位效果。

```js
  render() {
    return (
      <Skeleton />
    );
  }
```
:::

## 复杂的组合

:::demo 复杂的组合。

```js
  render() {
    return (
      <Skeleton avatar paragraph={{ rows: 4 }} />
    );
  }
```
:::

## 动画效果

:::demo 动画效果。

```js
  render() {
    return (
      <Skeleton active />
    );
  }
```
:::

## 包含子组件

:::demo 包含子组件。

```js
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  showSkeleton = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  render() {
    return (
      <div className="article">
        <Skeleton loading={this.state.loading}>
          <div>
            <h4>Fish Design</h4>
            <p>Fish Design 是基于 React 实现的高质量的 UI 组件库，设计原则是简洁、直接、优雅和适应性。</p>
          </div>
        </Skeleton>
        <Button onClick={this.showSkeleton} disabled={this.state.loading}>
          Show Skeleton
        </Button>
      </div>
    );
  }
```
:::

<style>
.article h4 {
  margin-bottom: 16px;
}
.article button {
  margin-top: 16px;
}
</style>

## 列表

:::demo 在列表组件中使用加载占位符。

```js
  constructor() {
    super();

    this.state = {
      loading: true,
    }
  }

  onChange = (checked) => {
    this.setState({ loading: !checked });
  }

  render() {
    const listData = [];
    for (let i = 0; i < 3; i++) {
      listData.push({
        href: 'https://nsfi.github.io/ppfish-components/#/home',
        title: `Fish Design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Fish Design',
        content: 'Fish Design 是基于 React 实现的高质量的 UI 组件库，设计原则是简洁、直接、优雅和适应性。',
      });
    }

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const { loading } = this.state;

    return (
      <div>
        <Switch checked={!loading} onChange={this.onChange} />

        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={!loading && [<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
              extra={!loading && <img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  }
```
:::

<style>
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
</style>


## API

### Skeleton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否展示动画效果 | Boolean | false |
| avatar | 是否显示头像占位图 | Boolean \| SkeletonAvatarProps | false |
| className | 容器类名 | String | - |
| loading | 为 `true` 时，显示占位图。反之则直接展示子组件 | Boolean | - |
| paragraph | 是否显示段落占位图 | Boolean \| SkeletonParagraphProps | true |
| title | 是否显示标题占位图 | Boolean \| SkeletonTitleProps | true |

### SkeletonAvatarProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 设置头像占位图的大小 | Enum { 'large', 'small', 'default' } | - |
| shape | 指定头像的形状 | Enum { 'circle', 'square' } | - |

### SkeletonTitleProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 设置标题占位图的宽度 | Number \| String | - |

### SkeletonParagraphProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 设置段落占位图的行数 | Number | - |
| width | 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | number \| string \| Array<Number \| String> | - |
