# LoadMore 加载更多 【交互：翁宇宇 | 视觉：徐剑杰 |开发：卿泽】

当列表较长且数据保存于服务端时，采用分页减轻网页读取和展示压力

## 基本

:::demo 

```js
loadmore(){
  console.log('loadmore')
}

render(){
  return(<LoadMore onLoadMore={this.loadmore}/>)
  }
```
:::

## 加载中

:::demo 

```js
render(){
  return(<LoadMore status="loading"/>)
  }
```
:::

## 加载失败

:::demo 

```js
render(){
  return(<LoadMore status="error" />)
  }
```
:::

## 完全加载

:::demo 

```js
render(){
  return(<LoadMore status="end" />)
  }
```
:::

## 完整示例

:::demo 配合List完成列表加载功能

```js
  state = {
    list: [{title: 'Fishd Design Title 1'},{title: 'Fishd Design Title 2'}],
    loading: false,
    status: 'default',
    times:0,
  }

  loadList = () => {
    this.setState({
      loading: true,
      status: 'loading',
    }, () => {
      setTimeout(() => {
        this.setState({
        times:this.state.times + 1,
        list: [...this.state.list, {title: `fishd Design Title ${(Math.random() * 100).toFixed(0)}`}],
        loading: false, 
        status: this.state.times + 1 === 3 ?'end':'default'})
      }, 1000)
    })
  };

  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          loading={this.state.loading}
          dataSource={this.state.list}
          loadMore={
            <div style={{marginTop: 12}}>
              <LoadMore status={this.state.status} onLoadMore={this.loadList}/>
            </div>
          }
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title={<a href="https://qi.163.com">{item.title}</a>}
                description="Fishd Design, a design language for background applications, is refined by Fishd UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    )
  }

```
:::


## API

| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| buttonSize  | button大小    | Enum {'default','large','small'}  | 'default'   |
| className | 自定义类名 | String | - |
| defaultText  | 正常状态文案    | String \| HTMLElement   | '查看更多'   |
| endText  | 完全加载文案    | String \| HTMLElement   | '没有更多了'   |
| errorText  | 加载失败文案    | String \| HTMLElement   | '加载失败，请重试'   |
| loadingText  | 加载中文案    | String \| HTMLElement   | '加载中'   |
| onLoadMore  | 点击加载事件    | () => Void  |  noop   |
| status  | 状态    | Enum {'default','loading','error','end'}  |  'default'   |
| style | 自定义样式 | Object | - |

 > 其他属性会透传到Button上
