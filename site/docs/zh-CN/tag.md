# 标签页

选项卡切换组件。

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。
- [RadioButton](/components/radio/#components-radio-demo-radiobutton) 可作为更次级的页签来使用。

## 基本
:::demo 基本标签的用法，可以通过添加 closable 变为可关闭标签。可关闭标签具有 onClose afterClose 两个事件。
```js
  log = (e) => {
    console.log(e);
  }
  
  preventDefault = (e) => {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
  }
  render() {
    return (
      <div>
        <Tag>Tag 1</Tag>
        <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
        <Tag closable onClose={this.log}>Tag 2</Tag>
        <Tag closable onClose={this.preventDefault}>Prevent Default</Tag>
      </div>
    );
  }
```
:::

## 多彩标签
:::demo 我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。
```js
  render() {
    return (
      <div>
        <h4 style={{ marginBottom: 16 }}>Presets:</h4>
        <div>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag>
        </div>
        <h4 style={{ margin: '16px 0' }}>Custom:</h4>
        <div>
          <Tag color="#f50">#f50</Tag>
          <Tag color="#2db7f5">#2db7f5</Tag>
          <Tag color="#87d068">#87d068</Tag>
          <Tag color="#108ee9">#108ee9</Tag>
        </div>
      </div>
    );
  }
```
:::

## 动态添加和删除
:::demo 用数组生成一组标签，可以动态添加和删除，通过监听删除动画结束的事件 afterClose 实现。
```js
  constructor() {
    super();
    this.state = {
      tags: ['Unremovable', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: '',
    };
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
```
:::

## 可选择
:::demo 可通过 CheckableTag 实现类似 Checkbox 的效果，点击切换选中效果。该组件为完全受控组件，不支持非受控用法。
```js
    constructor() {
      super();
      this.state = {
        checked: true
      }
    }
  
    handleChange = (checked) => {
      this.setState({ checked });
    }
  
    render() {
      const { CheckableTag } = Tag;
      return (
        <div>
          <CheckableTag checked={this.state.checked} onChange={this.handleChange}>
            tag1
          </CheckableTag>
        </div>
      );
    }
```
:::

## 热门标签
:::demo 选择你感兴趣的话题。
```js
  constructor() {
    super();
    this.state = {
      selectedTags: [],
    }
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const CheckableTag = Tag.CheckableTag;
    const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];
    const { selectedTags } = this.state;
    return (
      <div>
        <h6 style={{ marginRight: 8, display: 'inline' }}>Categories:</h6>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
```
:::

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前激活 tab 面板的 key | string | 无 |
| animated | 是否使用动画切换 Tabs，在 `tabPosition=top|bottom` 时有效 | boolean \| {inkBar:boolean, tabPane:boolean} | true, 当 type="card" 时为 false |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | string | 第一个面板 |
| hideAdd | 是否隐藏加号图标，在 `type="editable-card"` 时有效 | boolean | false |
| size | 大小，提供 `large` `default` 和 `small` 三种大小 | string | 'default' |
| tabBarExtraContent | tab bar 上额外的元素 | React.ReactNode | 无 |
| tabBarGutter | tabs 之间的间隙 | number | 无 |
| tabBarStyle | tab bar 的样式对象 | object | - |
| tabPosition | 页签位置，可选值有 `top` `right` `bottom` `left` | string | 'top' |
| type | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | string | 'line' |
| onChange | 切换面板的回调 | Function(activeKey) {} | 无 |
| onEdit | 新增和删除页签的回调，在 `type="editable-card"` 时有效 | (targetKey, action): void | 无 |
| onNextClick | next 按钮被点击的回调 | Function | 无 |
| onPrevClick | prev 按钮被点击的回调 | Function | 无 |
| onTabClick | tab 被点击的回调 | Function | 无 |

### Tabs.TabPane

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean | false |
| key | 对应 activeKey | string | 无 |
| tab | 选项卡头显示文字 | string\|ReactNode | 无 |


<style>
.ant-tag {
  margin-bottom: 8px;
}
</style>
