## 主标题-如组件名称：Checkbox多选框

一组备选项中进行多选

### 次级标题-如组件使用场景：三级标题将被识别成右侧导航锚点

demo外的文档内容，显示在demo上面：单独使用可以表示两种状态之间的切换。

:::demo Demo内的文档内容，显示在demo边上：简单的Checkbox，使用`checked`切换选中状态。
```js
render() {
  return <Checkbox checked>备选项</Checkbox>
}
```
:::

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onChange  | 当绑定值变化时触发的事件 | value |
