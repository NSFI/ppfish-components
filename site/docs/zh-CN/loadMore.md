# 加载更多

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



## API
| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| onLoadMore  | 点击加载事件    | function  |  noop   |
| status  | 状态    | string ['default','loading','error','end']  |  'default'   |
| defaultText  | 正常状态文案    | string   | '查看更多'   |
| loadingText  | 加载中文案    | string   | '加载中'   |
| errorText  | 加载失败文案    | string   | '加载失败，请重试'   |
| endText  | 完全加载文案    | string   | '没有更多了'   |
| buttonSize  | button大小    | string ['default','large','small']  | 'default'   |

 > 其他属性会透传到Button上
