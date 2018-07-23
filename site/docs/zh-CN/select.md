# 下拉筛选

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/#/components/radio/) 是更好的选择。

## 基本使用

:::demo 最基本的下拉筛选使用方式
```js
render(){
  return(
    <div>
        <Select>
          <Select.Option key={1} value={1}>{1}</Select.Option>  
          <Select.Option key={2} value={2} disabled>{2}</Select.Option>       
          <Select.Option key={3} value={3}>{3}</Select.Option>       
        </Select>
        <br/>
        <Select disabled ></Select>
    </div>
  )
  
}
```
:::

## 添加额外的内容

:::demo 
```js
render(){
  return(
    <div>
        <Select extraOptions={
          <div style={{padding:10,background:'#ccc'}}>这里是额外的内容 -。-</div>
        }>
          <Select.Option key={1} value={1}>{1}</Select.Option>  
          <Select.Option key={2} value={2} disabled>{2}</Select.Option>       
          <Select.Option key={3} value={3}>{3}</Select.Option>       
        </Select>
    </div>
  )
  
}
```

:::

## 三种大小

:::demo  `large 40px`、`default 32px`、`small 24px`
```js
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

render(){
        const { size } = this.state;
  return(
    <div>
                <Radio.Group value={size} onChange={this.handleSizeChange} style={{margin:10}}>
                  <Radio.Button value="large">Large</Radio.Button>
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
                <Select size={size} style={{margin:10}}>
                  <Select.Option key={1} >{1}</Select.Option>  
                  <Select.Option key={2}  disabled>{2}</Select.Option>       
                  <Select.Option key={3} >{3}</Select.Option>       
                </Select>
                <Select size={size} mode={'multiple'} style={{margin:10}}>
                  <Select.Option key={1} >{1}</Select.Option>  
                  <Select.Option key={2}  disabled>{2}</Select.Option>       
                  <Select.Option key={3}>{3}</Select.Option>       
                </Select>
                <Select size={size} mode={'multiple'} labelClear style={{margin:10}} showSelectAll>
                  <Select.Option key={1} >{1}</Select.Option>  
                  <Select.Option key={2}  disabled>{2}</Select.Option>       
                  <Select.Option key={3} >{3}</Select.Option>      
                  <Select.Option key={4} >{4}</Select.Option>  
                  <Select.Option key={5}>{5}</Select.Option>       
                  <Select.Option key={6} >{6}</Select.Option>       
                  <Select.Option key={7} >{7}</Select.Option>  
                  <Select.Option key={8}  disabled>{8}</Select.Option>       
                  <Select.Option key={9} >{9}</Select.Option>       
                  <Select.Option key={10} >{10}</Select.Option>  
                  <Select.Option key={11}  disabled>{11}</Select.Option>       
                  <Select.Option key={12} >{12}</Select.Option>       
                  <Select.Option key={13} >{13}</Select.Option>  
                  <Select.Option key={14} >{14}</Select.Option>       
                  <Select.Option key={15} >{15}</Select.Option>       
                  <Select.Option key={16} >{16}</Select.Option>  
                  <Select.Option key={17} >{17}</Select.Option>       
                  <Select.Option key={18} >{18}</Select.Option>       
                  <Select.Option key={19} >{19}</Select.Option>  
                  <Select.Option key={20} >{20}</Select.Option>       
                  <Select.Option key={21} >{21}</Select.Option>       
                  <Select.Option key={22} >{22}</Select.Option>       
                  <Select.Option key={23} >{23}</Select.Option>       
                </Select>
        <br/>
    </div>
  )
}
```

:::


## 分组

:::demo 可以使用`Select.OptGroup`进行分组，`utils`库中提供了`listConvertToGroup`首字母分组方法
```js
state={
  value:[1]
}
render(){
  const {listConvertToGroup}=this.props.utils;
  const Group = listConvertToGroup([{key:1,label:'卿泽'},{key:2,label:'李四'},{key:3,label:123},{key:4,label:'李一'}]);
  return(
        <Select onChange={(value) => this.setState({value})} value={this.state.value}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>
  )
  
}
```

:::

## 获得选项文本

:::demo `labelInValue`会返回`key`、`label`值，建议远程搜索采用此方案。
```js
state={
  value:[]
}
render(){
  const {listConvertToGroup}=this.props.utils;
  const Group = listConvertToGroup([{key:1,label:'卿泽'},{key:2,label:'李四'},{key:3,label:123},{key:4,label:'李一'}]);
  return(
    <div>
       <div>key:{this.state.value[0] && this.state.value[0].key}</div>
       <div>label:{this.state.value[0] && this.state.value[0].label}</div>
        <Select labelInValue onChange={(value) => this.setState({value})} value={this.state.value}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>
</div>
  )
}
```

:::


## 多选操作/Label可删除的多选操作
:::demo  `labelClear`参数可以使label在可删除状态
```js
state={
  value:[1,2,3,6,'失效的id']
}

render(){
  const {listConvertToGroup}=this.props.utils;
  const Group = listConvertToGroup([{key:6,label:<span>林林<Icon type="cloud" /></span>},{key:1,label:'卿泽'},{key:2,label:'李四'},{key:3,label:123},{key:4,label:'李一'},{key:5,label:'李二'}]);
  return(
    <div>
        <Select disabled={false} onChange={(value)=>this.setState({value})} value={this.state.value} showSelectAll={true} mode={'multiple'} >
                  {Group.map(group =>
                   <Select.OptGroup label={group.label} key={group.key}>
                     {group.list && group.list.map(item=> <Select.Option key={item.key}>{item.label}</Select.Option>)}
                      </Select.OptGroup>
                  )}
        </Select>
<br/>
        <Select disabled={false} labelClear onChange={(value)=>this.setState({value})} value={this.state.value} showSelectAll={true} mode={'multiple'} >
                  {Group.map(group =>
                   <Select.OptGroup label={group.label} key={group.key}>
                     {group.list && group.list.map(item=> <Select.Option key={item.key}>{item.label}</Select.Option>)}
                      </Select.OptGroup>
                  )}
        </Select>

</div>
)
}

```
:::

## 支持搜索

:::demo
```js
state={
  value:[1],
  mValue:[1],
}
render(){
  const {listConvertToGroup}=this.props.utils;
  const Group = listConvertToGroup([{key:1,label:'卿泽'},{key:2,label:'李四'},{key:3,label:123},{key:4,label:'李一'}]);
  return(
    <div>
            <Select showSearch filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={(value) => this.setState({value})} value={this.state.value}>
              {Group.map(group =>
                <Select.OptGroup label={group.label} key={group.key}>
                  {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
                </Select.OptGroup>
              )}
            </Select>
<br/>
        <Select mode={'multiple'} showSearch showSelectAll filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={(value) => this.setState({mValue:value})} value={this.state.mValue}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>

</div>
  )
}
```
:::

## 宽度及位置自定义

:::demo 下拉弹框位置可以进行自定义，`bottomLeft`、`bottom`、`bottomRight`
```js
state={
  value:[1],
  align:"bottomLeft"
}

  handleChange = (e) => {
    this.setState({ align: e.target.value });
  }

render(){
  const {listConvertToGroup}=this.props.utils;
  const Group = listConvertToGroup([{key:1,label:'卿泽'},{key:2,label:'李四'},{key:3,label:123},{key:4,label:'李一'}]);
  return(
    <div>
          <Radio.Group value={this.state.align} onChange={this.handleChange} style={{marginBottom:20}}>
            <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
            <Radio.Button value="bottom">bottom</Radio.Button>
            <Radio.Button value="bottomRight">bottomRight</Radio.Button>
          </Radio.Group>
        <Select  popupAlign={this.state.align} onChange={(value) => this.setState({value})} value={this.state.value} dropdownMatchSelectWidth={false} dropdownStyle={{width:200}}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key} >{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>
</div>
  )
  
}
```

:::

## 后端搜索-单选

:::demo 使用`showSeach`、`labelInValue`、`onSearch`配合进行后端搜索操作，`notFoundContent`可以定制搜索文案
```js
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.state={
      value:[],
      fetching: false,
      data:[]
    }
  }

    componentDidMount(){
      this.fetchUser('');
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
          fetching: false,
        });
      }
      
render(){
  const { fetching, data, value } = this.state;
  return(
    <div>
        <Select labelInValue showSearch onSearch={this.fetchUser} onChange={this.handleChange} value={value}       
          notFoundContent={fetching ? <Spin size="small" /> : null} >
          {data.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
        </Select>
</div>
  )
  
}
```

:::

## 后端搜索-多选

:::demo 使用`showSeach`、`labelInValue`、`onSearch`配合进行后端搜索操作，`notFoundContent`可以定制搜索文案
```js
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = this.props.debounce(this.fetchUser, 800);
    this.state={
      value:[],
      fetching: false,
      data:[]
    }
  }
  
    componentDidMount(){
      this.fetchUser('');
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
          fetching: false,
        });
      }
      
render(){
  const { fetching, data, value } = this.state;
  return(
    <div>
        <Select mode="multiple" labelInValue showSearch onSearch={this.fetchUser} onChange={this.handleChange} value={value}       
          notFoundContent={fetching ? <Spin size="small" /> : null} >
          {data.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
        </Select>
</div>
  )
  
}
```

:::

## API

```html
<Select>
  <Select.Option value="lucy">lucy</Select.Option>
</Select>
```

### Select props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持搜索框清除操作 | boolean | true |
| defaultActiveFirstOption | 是否默认激活第一项 | boolean | true |
| defaultValue | 初始化默认value | [] | - |
| defaultValue | 指定默认选中的条目 | [] | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的 style 属性 | object | - |
| extraOptions | 额外的列表项 | string/ReactNode | - |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | Function(triggerNode) | () => document.body |
| labelClear | 多选模式下开启label删除功能 | boolean | false |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: string, label: ReactNode}` 的格式 | boolean | false |
| maxScrollHeight | 列表滚动区高度 | number | 250 |
| mode | 设置 Select 的模式 | 'multiple' \| 'single'/ReactNode| - |
| notFoundContent | 当下拉列表为空时显示的内容 | string\|React.Element | '无匹配结果' |
| onChange | 选中 option时，调用此函数 | function(value, option:Option/Array&lt;Option>) | - |
| onMouseEnter | 鼠标移入时回调 | function | - |
| onMouseLeave | 鼠标移出时回调 | function | - |
| onPopupScroll | 下拉列表滚动时的回调 | function | - |
| onSearch | 文本框值变化时回调 | function(value: string) |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(value, option:Option) | - |
| onVisibleChange | 弹出框显示隐藏 | function(visible: boolean) |  |
| placeholder | 选择框默认文字 | string | '请选择' |
| popupAlign | 弹窗位置 | 'bottomLeft', 'bottomCenter', 'bottomRight'| 'bottomLeft' |
| searchInputProps | 搜索框额外属性 | object | {} |
| searchPlaceholder | 搜索框默认文字 | string | '请输入关键词' |
| selectAllText | 是否显示全选/反选功能-文案 | string | '选择所有' |
| showArrow | 是否显示下拉小箭头 | boolean | true |
| showSearch | 是否可搜索，需要配合filterOption或者后端搜索使用 | boolean | false |
| showSelectAll | 是否显示全选/反选功能（仅在mode='multiple'生效） | boolean | true |
| size | 选择框大小，可选 `large` `small` | string | default |
| value | 指定当前选中的条目 | [] | - |

> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 getPopupContainer={triggerNode => triggerNode.parentNode} 将下拉弹层渲染节点固定在触发器的父元素中。

### Select Methods

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

> 注意，在有SearchInput的情况，操作的目标为Input框
  
### Select.Option props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| key | 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 | string |  |
| value | 值 | string\|number | - |
| title | title值 | string\|number | - |
| onOptionClick | 未在Select.Children里使用的Select.Option,暴露此事件 | function(e,option:Option) | - |

### Select.OptGroup props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key |  | string | - |
| label | 组名 | string\|React.Element | 无 |

### Methods

> 在`utils`中提供了`listConvertToGroup`首字母分组方法用于分组。
