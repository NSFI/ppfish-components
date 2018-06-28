# 选择器

下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/components/radio/) 是更好的选择。

## 基本使用

:::demo 基本使用。

```js

handleChange=(value)=> {
  console.log(`selected ${value}`);
}

render(){
  const Option = Select.Option;
  return(
      <div>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} disabled>
          <Option value="lucy">Lucy</Option>
        </Select>
      </div>
  )
}

```
:::

## 带搜索框

:::demo 展开后可对选项进行搜索。

```js
handleChange=(value)=> {
  console.log(`selected ${value}`);
}

handleBlur=()=> {
  console.log('blur');
}

handleFocus=()=> {
  console.log('focus');
}

render(){
  const Option = Select.Option;
  return(
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
  )
}
```
:::

## 多选

:::demo 多选，从已有条目中选择（scroll the menu）

```js
handleChange=(value)=>{
  console.log(`selected ${value}`);
}

render(){
  const Option = Select.Option;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  return(
  <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select"
    defaultValue={['a10', 'c12']}
    onChange={this.handleChange}
  >
    {children}
  </Select>)
  }
```
:::

## 三种大小

:::demo 三种大小的选择框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `40px` 和 `24px` ，默认高度为 `32px`。

```js
  state = {
    size: 'default',
  };
  
  handleChange=(value)=> {
    console.log(`Selected: ${value}`);
  }
  
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const Option = Select.Option;
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const { size } = this.state;
    return (
      <div className="code-box-demo">
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br /><br />
        <Select
          size={size}
          defaultValue="a1"
          onChange={this.handleChange}
          style={{ width: 200 }}
        >
          {children}
        </Select>
        <br />
        <Select
          mode="combobox"
          size={size}
          defaultValue="a1"
          onChange={this.handleChange}
          style={{ width: 200 }}
        >
          {children}
        </Select>
        <br />
        <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
        <br />
        <Select
          mode="tags"
          size={size}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
      </div>
    );
  }
```
:::

<style>
.code-box-demo .ant-select {
  margin: 0 8px 10px 0;
}

#components-select-demo-search-box .code-box-demo .ant-select {
  margin: 0;
}

</style>

## 标签

:::demo tags select，随意输入的内容（scroll the menu）

```js
handleChange=(value)=> {
  console.log(`selected ${value}`);
};

render(){
  const Option = Select.Option;
  
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  return(
     <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Tags Mode"
        onChange={this.handleChange}
      >
        {children}
      </Select>
  )
}
```
:::

## 智能提示

:::demo 输入框自动完成功能，下面是一个账号注册表单的例子。

推荐使用 [AutoComplete](/components/auto-complete/) 组件。

```js
  state = {
    options: [],
  }

  handleChange = (value) => {
    let options;
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map((domain) => {
        const email = `${value}@${domain}`;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({ options });
  }

  render() {
    // filterOption needs to be false，as the value is dynamically generated
    const Option = Select.Option;
    return (
      <Select
        mode="combobox"
        style={{ width: 200 }}
        onChange={this.handleChange}
        filterOption={false}
        placeholder="Enter the account name"
      >
        {this.state.options}
      </Select>
    );
  }
```
:::

## 分组

:::demo 用 `OptGroup` 进行选项分组。

```js

handleChange=(value)=> {
  console.log(`selected ${value}`);
}

render(){
  const { Option, OptGroup } = Select;
  return(
    <Select
        defaultValue="lucy"
        style={{ width: 200 }}
        onChange={this.handleChange}
      >
        <OptGroup label="Manager">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </OptGroup>
        <OptGroup label="Engineer">
          <Option value="Yiminghe">yiminghe</Option>
        </OptGroup>
      </Select>
  )
}
```
:::

## 联动

:::demo 省市联动是典型的例子。

推荐使用 [Cascader](/components/cascader/) 组件。

```js
  state = {
    provinceData:['Zhejiang', 'Jiangsu'],
    cityData:{
               Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
               Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
             },
    cities: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    secondCity: 'Hangzhou',
  }

  handleProvinceChange = (value) => {
    this.setState({
      cities: this.state.cityData[value],
      secondCity: this.state.cityData[value][0],
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }

  render() {
    const Option = Select.Option;
    const provinceOptions = this.state.provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return (
      <div>
        <Select defaultValue={this.state.provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}>
          {cityOptions}
        </Select>
      </div>
    );
  }
```
:::

## 获得选项的文本

:::demo 默认情况下 `onChange` 里只能拿到 value，如果需要拿到选中的节点文本 label，可以使用 `labelInValue` 属性。

选中项的 label 会被包装到 value 中传递给 `onChange` 等函数，此时 value 是一个对象。

```js
handleChange=(value)=> {
  console.log(value); // { key: "lucy", label: "Lucy (101)" }
}

render(){
  const Option = Select.Option;
  return(
      <Select labelInValue defaultValue={{ key: 'lucy' }} style={{ width: 120 }} onChange={this.handleChange}>
        <Option value="jack">Jack (100)</Option>
        <Option value="lucy">Lucy (101)</Option>
      </Select>
  )
}

```
:::

## 自动分词

:::demo 试下复制 `露西,杰克` 到输入框里。只在 tags 和 multiple 模式下可用。

```js
handleChange=(value)=> {
  console.log(`selected ${value}`);
}

render(){
  const Option = Select.Option;
  
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  return(
  <Select
    mode="tags"
    style={{ width: '100%' }}
    onChange={this.handleChange}
    tokenSeparators={[',']}
  >
    {children}
  </Select>)
  }
```
:::

## 搜索用户

:::demo 一个带有远程搜索，节流控制，请求时序控制，加载状态的多选示例。

```js
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = this.debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  }

  debounce = (factory, time)=> {
    var timer
    return function() {
      if(timer) clearTimeout(timer)
      timer = setTimeout(factory, time)
    }
  }

  fetchUser = (value) => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  }

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  render() {
    const Option = Select.Option;
    const { fetching, data, value } = this.state;
    return (
      <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
      </Select>
    );
  }
```
:::


## API

```html
<Select>
  <Option value="lucy">lucy</Option>
</Select>
```

### Select props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持清除 | boolean | false |
| autoFocus | 默认获取焦点 | boolean | false |
| combobox | 输入框自动提示模式（2.9 之后废弃，请使用 `mode`） | boolean | false |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean | true |
| defaultValue | 指定默认选中的条目 | string\|string\[]\|number\|number\[] | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的 style 属性 | object | - |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |
| firstActiveValue | 默认高亮的选项 | string\|string\[] | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | Function(triggerNode) | () => document.body |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: string, label: ReactNode}` 的格式 | boolean | false |
| maxTagCount | 最多显示多少个 tag | number | - |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode/function(omittedValues) | - |
| mode | 设置 Select 的模式（2.9 之后支持） | 'multiple' \| 'tags' \| 'combobox' | - |
| notFoundContent | 当下拉列表为空时显示的内容 | string | 'Not Found' |
| optionFilterProp | 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索 | string | value |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | string | `children` （combobox 模式下为 `value`） |
| placeholder | 选择框默认文字 | string | - |
| showArrow | 是否显示下拉小箭头 | boolean | true |
| showSearch | 使单选模式可搜索 | boolean | false |
| size | 选择框大小，可选 `large` `small` | string | default |
| tags | 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配（2.9 之后废弃，请使用 `mode`） | boolean | false |
| tokenSeparators | 在 tags 和 multiple 模式下自动分词的分隔符 | string\[] |  |
| value | 指定当前选中的条目 | string\|string\[]\|number\|number\[] | - |
| onBlur | 失去焦点的时回调 | function | - |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value, option:Option/Array&lt;Option>) | - |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 | function(value，option:Option) | - |
| onFocus | 获得焦点时回调 | function | - |
| onMouseEnter | 鼠标移入时回调 | function | - |
| onMouseLeave | 鼠标移出时回调 | function | - |
| onPopupScroll | 下拉列表滚动时的回调 | function | - |
| onSearch | 文本框值变化时回调 | function(value: string) |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(value, option:Option) | - |

> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 `getPopupContainer={triggerNode => triggerNode.parentNode}` 将下拉弹层渲染节点固定在触发器的父元素中。

### Select Methods

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

### Option props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| key | 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 | string |  |
| title | 选中该 Option 后，Select 的 title | string | - |
| value | 默认根据此属性值进行筛选 | string\|number | - |

### OptGroup props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key |  | string | - |
| label | 组名 | string\|React.Element | 无 |
