# Fish-Design编写指南

 组件使用场景及其描述
 
## 组件Demo编写方式1

:::demo 组件Demo的介绍1

```js
render(){
  return(
    <Button type="primary">Button</Button>
  )
}
```

```css
h4{
  font-size: 32px;
}
```
:::

## 组件Demo编写方式2

:::demo 组件Demo的介绍2

```js
class Demo extends React.Component{
  render(){
    return(
      <Button type="primary">Button</Button>
    )
  }
}

ReactDOM.render(<Demo {...context.props}/>,mountNode);
```

```less
h4{
  font-size: 32px;
}
```

:::

> 注意：所有二级标题都将会被渲染成右侧的`Anchor导航`
