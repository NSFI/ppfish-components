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
        <Select showSingleClear style={{width:300}}>
          <Select.Option key={"1"} >{'选项1'}</Select.Option>  
          <Select.Option key={"2"}  disabled>{'选项2'}</Select.Option>       
          <Select.Option key={"3"} >{'选项3'}</Select.Option>       
        </Select>
        <br/>
        <Select disabled style={{width:300}}></Select>
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
        <Select style={{width:300}} showSingleClear extraOptions={
          <div style={{padding:10,background:'#ccc'}}>这里是额外的内容 -。-</div>
        }>
          <Select.Option key={"1"} >{'选项1'}</Select.Option>  
          <Select.Option key={"2"}  disabled>{'选项2'}</Select.Option>       
          <Select.Option key={"3"} >{'选项3'}</Select.Option>       
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
                <Radio.Group value={size} onChange={this.handleSizeChange} style={{width:300,margin:10}}>
                  <Radio.Button value="large">Large</Radio.Button>
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
                <Select showSingleClear size={size} style={{width:300,margin:10}}>
                  <Select.Option key={"1"} >{'选项1'}</Select.Option>  
                  <Select.Option key={"2"}  disabled>{'选项2'}</Select.Option>       
                  <Select.Option key={"3"} >{'选项3'}</Select.Option>       
                </Select>
                <Select  size={size} mode={'multiple'} style={{width:300,margin:10}}>
                  <Select.Option key={"1"} >{'选项1'}</Select.Option>  
                  <Select.Option key={"2"}  disabled>{'选项2'}</Select.Option>       
                  <Select.Option key={"3"} >{'选项3'}</Select.Option>       
                </Select>
                <Select size={size} mode={'multiple'} labelClear style={{width:300,margin:10}} showSelectAll>
                  <Select.Option key={"1"} >{'选项1'}</Select.Option>  
                  <Select.Option key={"2"}  disabled>{'选项2'}</Select.Option>       
                  <Select.Option key={"3"} >{'选项3'}</Select.Option>       
                  <Select.Option key={"4"} >{'选项4'}</Select.Option>  
                  <Select.Option key={"5"} >{'选项5'}</Select.Option>       
                  <Select.Option key={"6"} >{'选项6'}</Select.Option>       
                  <Select.Option key={"7"} >{'选项7'}</Select.Option>  
                  <Select.Option key={"8"} >{'选项8'}</Select.Option>       
                  <Select.Option key={"9"} >{'选项9'}</Select.Option>       
                </Select>
        <br/>
    </div>
  )
}
```

:::


## 分组

:::demo 可以使用`Select.OptGroup`进行分组，提供了`Select.listConvertToGroup`首字母分组方法
```js
state={
  value:"1"
}
render(){
  const Group = Select.listConvertToGroup([{key:"1",label:'不知名人士'},{key:"2",label:'李四'},{key:"3",label:'###'},{key:"4",label:'李一'}]);
  return(
        <Select style={{width:300}} showSingleClear onChange={(value) => this.setState({value})} value={this.state.value}>
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
  value:{key:"1"}
}
render(){
  const Group = Select.listConvertToGroup([{key:"1",label:'不知名人士'},{key:"2",label:'李四'},{key:"3",label:'@@@###xxx'},{key:"4",label:'李一'}]);
  return(
    <div>
       <div>key:{this.state.value && this.state.value.key}</div>
       <div>label:{this.state.value && this.state.value.label}</div>
        <Select style={{width:300}} showSingleClear labelInValue onChange={(value) => this.setState({value})} value={this.state.value}>
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

## 联动

:::demo  省市联动是典型的例子。但推荐使用 Cascader 组件。
```js

const Option = Select.Option;

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class Demo extends React.Component {
  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  }

  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }

  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return (
      <div>
        <Select defaultValue={provinceData[0]} style={{ width: 150,display:'inline-block' }} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <Select value={this.state.secondCity} style={{ width: 150,display:'inline-block' }} onChange={this.onSecondCityChange}>
          {cityOptions}
        </Select>
      </div>
    );
  }
}
```

:::

## 多选操作/Label可删除的多选操作
:::demo  `labelClear`参数可以使label在可删除状态
```js
state={
  value:["1","2","3","6",'失效的id']
}

render(){
  const Group = Select.listConvertToGroup([{key:"6",label:"qqt"},{key:"1",label:'skrskrskrskr'},{key:"2",label:'李四'},{key:"3",label:123},{key:"4",label:'李一'},{key:"5",label:'李二'}]);
  return(
    <div>
        <Select style={{width:300}} disabled={false} onChange={(value)=>this.setState({value})} value={this.state.value} showSelectAll={true} mode={'multiple'} >
                  {Group.map(group =>
                   <Select.OptGroup label={group.label} key={group.key}>
                     {group.list && group.list.map(item=> <Select.Option key={item.key}>{item.label}</Select.Option>)}
                      </Select.OptGroup>
                  )}
        </Select>
<br/>
        <Select style={{width:300}} disabled={false} labelClear onChange={(value)=>this.setState({value})} value={this.state.value} showSelectAll={true} mode={'multiple'} >
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
  value:"1",
  mValue:["1"],
}
render(){
  const Group = Select.listConvertToGroup([{key:"1",label:'选项1'},{key:"2",label:'李四'},{key:"3",label:123},{key:"4",label:'李一'}]);
  return(
    <div>
            <Select style={{width:300}} showSingleClear showSearch filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={(value) => this.setState({value})} value={this.state.value}>
              {Group.map(group =>
                <Select.OptGroup label={group.label} key={group.key}>
                  {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
                </Select.OptGroup>
              )}
            </Select>
<br/>
        <Select style={{width:300}} mode={'multiple'} showSearch showSelectAll filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={(value) => this.setState({mValue:value})} value={this.state.mValue}>
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

## 加载状态

:::demo 加载中状态文案
```js
render(){
  return(
    <div>
        <Select style={{width:300}} size={'small'} loading/>
        <br/>
        <Select style={{width:300}} loading/>
        <br/>
        <Select style={{width:300}} size={'large'} loading/>
    </div>
  )
}
```
:::

## 宽度及位置自定义

:::demo 下拉弹框位置可以进行自定义，`bottomLeft`、`bottomCenter`、`bottomRight`、`topLeft`、`topCenter`、`topRight`
```js
state={
  value:"1",
  align:"bottomLeft",
  width:300,
}

  handleChange = (e) => {
    this.setState({ align: e.target.value });
  }
  
  handleChangeWidth = (e) => {
   this.setState({ width: e.target.value });
  }


render(){
  const Group = Select.listConvertToGroup([{key:"1",label:'选项1'},{key:"2",label:'李四'},{key:"3",label:123},{key:"4",label:'李一'}]);
  return(
    <div>
          <Input  style={{marginRight:10,width:200}} placeholder="输入宽度" value={this.state.width} onChange={this.handleChangeWidth}/>
          <Radio.Group showSingleClear value={this.state.align} onChange={this.handleChange} style={{marginBottom:20}}>
            <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
            <Radio.Button value="bottomCenter">bottomCenter</Radio.Button>
            <Radio.Button value="bottomRight">bottomRight</Radio.Button>
            <Radio.Button value="topLeft">topLeft</Radio.Button>
            <Radio.Button value="topCenter">topCenter</Radio.Button>
            <Radio.Button value="topRight">topRight</Radio.Button>
          </Radio.Group>
        <Select  style={{width:300}} popupAlign={this.state.align} onChange={(value) => this.setState({value})} value={this.state.value} dropdownMatchSelectWidth={false} dropdownStyle={{width:Number(this.state.width)}}>
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
        <Select style={{width:300}} labelInValue showSingleClear showSearch onSearch={this.fetchUser} onChange={this.handleChange} value={value}       
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
        <Select style={{width:300}} showSelectAll selectAllText={'选中所有搜索结果'} mode="multiple" labelInValue showSearch onSearch={this.fetchUser} onChange={this.handleChange} value={value}       
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
| defaultActiveFirstOption | 是否默认激活第一项 | boolean | false |
| defaultValue | 指定默认选中的条目 | string\|string[]\|number\|number[]	 | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的 style 属性 | object | - |
| extraOptions | 额外的列表项 | string/ReactNode | - |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | Function(triggerNode) | () => document.body |
| labelClear | 多选模式下开启label删除功能 | boolean | false |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: string, label: ReactNode}` 的格式 | boolean | false |
| loading | 加载状态 | boolean | false |
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
| popupAlign | 弹窗位置 | 'bottomLeft', 'bottom', 'bottomRight','bottomLeft' 'top', 'topRight','topLeft' |
| searchInputProps | 搜索框额外属性 | object | {} |
| searchPlaceholder | 搜索框默认文字 | string | '请输入关键词' |
| selectAllText | 是否显示全选/反选功能-文案 | string | '选择所有' |
| showArrow | 是否显示下拉小箭头 | boolean | true |
| showSearch | 是否可搜索，需要配合filterOption或者后端搜索使用 | boolean | false |
| showSingleClear | 是否显示清除选择功能（仅在mode='single'生效） | boolean | false |
| showSelectAll | 是否显示全选/反选功能（仅在mode='multiple'生效） | boolean | true |
| size | 选择框大小，可选 `large` `small` | string | default |
| value | 指定当前选中的条目 | string\|string[]\|number\|number[] | - |

> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 getPopupContainer={triggerNode => triggerNode.parentNode} 将下拉弹层渲染节点固定在触发器的父元素中。

### Select Methods

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |
| listConvertToGroup() | 首字母分组方法 |

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
| key | string | - | 无 |
| label | 组名 | string\|React.Element | 无 |
