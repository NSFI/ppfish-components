# Select 选择器【交互：叶婧婕 |视觉：徐剑杰 |开发：卿泽】
 
## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](https://nsfi.github.io/ppfish-components/#/components/radio/) 是更好的选择。

## 基本使用

:::demo 最基本的下拉筛选使用方式
```js
  render() {
    return (
      <div className="demo-select">
        <Select style={{width: 300}}>
          <Select.Option value={0}>{'选项0'}</Select.Option>
          <Select.Option value={1}>{'选项1'}</Select.Option>
          <Select.Option value={2}>{'选项2'}</Select.Option>
          <Select.Option value={3}>{'选项3'}</Select.Option>
        </Select>
        <br/>
        <Select showSingleClear style={{width: 300}}>
          <Select.Option value={1}>{'选项1'}</Select.Option>
          <Select.Option value={2} disabled>{'选项2'}</Select.Option>
          <Select.Option value={3}>{'选项3'}</Select.Option>
        </Select>
        <br/>
        <Select disabled style={{width: 300}}></Select>
      </div>
    )
  }
```
:::

## 限制多选个数

:::demo 最基本的下拉筛选使用方式
```js
  render() {
    return (
      <div className="demo-select">
        <Select mode={'multiple'} errorMessage={'最多仅能选择3项'} labelClear maxCount={3} style={{width: 300, margin: 10}} showSelectAll>
          <Select.Option value={"1"}>{'选项1'}</Select.Option>
          <Select.Option value={"2"} disabled>{'选项2'}</Select.Option>
          <Select.Option value={"3"}>{'选项3'}</Select.Option>
          <Select.Option value={"4"}>{'比较长的选项比较长的选项-选项4'}</Select.Option>
          <Select.Option value={"5"}>{'选项5'}</Select.Option>
        </Select>
      </div>
    )
  }
```
:::

## 添加额外的内容

:::demo  可以自定义实现：最近选择、常用选项等功能，下面是最近选择的功能实现demo
```js
  state={
      recentOption:[],
      value:undefined,
      visible:false,
   };
  
  onChange=(value) => {
    const {recentOption=[]}=this.state;
    let newRecentOption= recentOption;
    if(value){
      if(!!recentOption.length ){
        const index =recentOption.findIndex(op=>op.key === value.key);
        if(index === -1){
          newRecentOption = [value,...this.state.recentOption].slice(0,3);
        }else{
          const tmpOption = recentOption[index]
          newRecentOption = [tmpOption,...recentOption.slice(0,index),...recentOption.slice(index+1)];
        }
      }else{
        newRecentOption = [value];
      }
    }
    this.setState({value,recentOption:newRecentOption})
  };
  
  onVisibleChange=(visible) => {
    this.setState({visible});
  }
  
  onOptionClick=(e,option) => {
    const {recentOption=[]} = this.state;
    const index =  recentOption.findIndex(op=>op.key === option.key)
    const tmpOption = recentOption[index];
       this.setState({
          visible:false,
          value:option,
          recentOption:[tmpOption,...recentOption.slice(0,index),...recentOption.slice(index+1)]
       })
  };
  
  render() {
    const {value,recentOption=[],visible}=this.state;
    return (
      <div className="demo-select">
        <Select 
        style={{width: 300}} 
        showSingleClear
        visible={visible}
        value={value}
        onVisibleChange={this.onVisibleChange} 
        labelInValue 
        onChange={this.onChange} 
        extraOptions={
              <Select.OptGroup label={"最近选择项"} _isShow={!!recentOption.length}>
                {recentOption.map((op,index) => <Select.Option 
                key={op.key}
                value={op.key}
                onOptionClick={this.onOptionClick}
                checked={value && op.key === value.key}>{op.label}</Select.Option>)}
              </Select.OptGroup>
        }>
          <Select.OptGroup label={'常规选项'}>
             <Select.Option value={"1"}>{'选项1'}</Select.Option>
             <Select.Option value={"2"}>{'选项2'}</Select.Option>
             <Select.Option value={"3"}>{'选项3'}</Select.Option>
             <Select.Option value={"4"}>{'选项4'}</Select.Option>
             <Select.Option value={"5"}>{'选项5'}</Select.Option>
             <Select.Option value={"6"}>{'选项6'}</Select.Option>
          </Select.OptGroup>
        </Select>
      </div>
    );
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
    this.setState({size: e.target.value});
  };

  render() {
    const {size} = this.state;
    return (
      <div className="demo-select">
        <Radio.Group value={size} onChange={this.handleSizeChange} style={{width: 300, margin: 10}}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br/>
        <Select showSingleClear size={size} style={{width: 300, margin: 10}}>
          <Select.Option value={"1"}>{'选项1'}</Select.Option>
          <Select.Option value={"2"} disabled>{'选项2'}</Select.Option>
          <Select.Option value={"3"}>{'选项3'}</Select.Option>
        </Select>
        <br/>
        <Select size={size} mode={'multiple'} style={{width: 300, margin: 10}}>
          <Select.Option value={"1"}>{'选项1'}</Select.Option>
          <Select.Option value={"2"} disabled>{'选项2'}</Select.Option>
          <Select.Option value={"3"}>{'选项3'}</Select.Option>
        </Select>
        <br/>
        <Select size={size} mode={'multiple'} labelClear style={{width: 300, margin: 10}} showSelectAll>
          <Select.Option value={"1"}>{'选项1'}</Select.Option>
          <Select.Option value={"2"} disabled>{'选项2'}</Select.Option>
          <Select.Option value={"3"}>{'选项3'}</Select.Option>
          <Select.Option value={"4"}>{'比较长的选项比较长的选项-选项4'}</Select.Option>
          <Select.Option value={"5"}>{'选项5'}</Select.Option>
          <Select.Option value={"6"}>{'选项6'}</Select.Option>
          <Select.Option value={"7"}>{'选项7'}</Select.Option>
          <Select.Option value={"8"}>{'选项8'}</Select.Option>
          <Select.Option value={"9"}>{'比较长的选项比较长的选项比较长的选项-选项9'}</Select.Option>
        </Select>
      </div>
    );
  }
```

:::


## 分组

:::demo 可以使用`Select.OptGroup`进行分组，提供了`utils.listConvertToGroup`首字母分组方法
```js
  state = {
    value: "1"
  };

  handleChange = (value) => {
    this.setState({value});
    console.log('newState: ', value);
  };


  render() {
    const Group = this.props.utils.listConvertToGroup([{key: "1", label: '张三-选项1'}, {key: "2", label: '李四-选项2'}, {
      key: "3",
      label: '默认-选项3'
    }, {key: "4", label: '默认-选项4'}]);
    return (
      <div className="demo-select">
        <Select style={{width: 300}} showSingleClear onChange={this.handleChange} value={this.state.value}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>
      </div>
    );
  }
```

:::

## 获得选项文本

:::demo `labelInValue`会返回`key`、`label`值，建议远程搜索采用此方案。
```js
  state = {
    value: {key: "1",label:"选项1"}
  };

  handleChange = (value) => {
    this.setState({value});
    console.log('newState: ', value);
  };

  render() {
    const Group = this.props.utils.listConvertToGroup([{key: "1", label: '选项1'}, {key: "2", label: '选项2'}, {
      key: "3",
      label: '选项3'
    }, {key: "4", label: '选项4'}]);
    return (
        <div className="demo-select">
          <div className="demo-select-label">
            <div>
              <span className="label">Key: </span>
              {this.state.value && this.state.value.key}
            </div>
            <div>
              <span className="label">Label:</span>
              {this.state.value && this.state.value.label}
            </div>
          </div>
          <Select style={{width: 300}} showSingleClear labelInValue onChange={this.handleChange}
                  value={this.state.value}>
            {Group.map(group =>
              <Select.OptGroup label={group.label} key={group.key}>
                {group.list && group.list.map(item => <Select.Option title={item.label}
                                                                     key={item.key}>{item.label}</Select.Option>)}
              </Select.OptGroup>
            )}
          </Select>
        </div>
    );
  }
```

:::

<style>
.demo-select-label{
 margin-bottom:10px;
}

.demo-select-label div{
 margin-bottom:10px;
 display:inline-block;
 margin-right:60px;
}

.demo-select-label .label{
  display:inline-block;
  width:40px;
}
</style>
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
      <div className="demo-select">
        <Select defaultValue={provinceData[0]} style={{ width: 150,display:'inline-block',marginRight:5 }} onChange={this.handleProvinceChange}>
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
  state = {
    value: ["1", "2", "3", "6", '失效的id']
  };

  handleChange = (value) => {
    this.setState({value});
    console.log('newState: ', value);
  };

  render() {``
    const Group = this.props.utils.listConvertToGroup([{key: "6", label: "选项6"}, {
      key: "1",
      label: '选项1'
    }, {key: "2", label: '选项2'}, {key: "3", label: '选项3'}, {key: "4", label: '选项4'}, {key: "5", label: '选项5'}]);
    return (
      <div className="demo-select">
        <Select style={{width: 300}} disabled={false} onChange={this.handleChange} value={this.state.value}
                showSelectAll={true} mode={'multiple'}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>
        <br/>
        <Select style={{width: 300}} disabled={false} labelClear onChange={this.handleChange} value={this.state.value}
                showSelectAll={true} mode={'multiple'}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option title={item.label} key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>

      </div>
    );
  }
```
:::

## 支持搜索

:::demo
```js
  state = {
    value: "1",
    mValue: ["1"],
  };

  handleChange = (value) => {
    this.setState({value});
    console.log('newState: ', value);
  };

  handleChangeMultiple = (mValue) => {
    this.setState({mValue});
    console.log('newState: ', mValue);
  };


  render() {
    const Group = this.props.utils.listConvertToGroup([{key: "1", label: '选项1'}, {key: "2", label: '选项2'}, {
      key: "3",
      label: '选项3'
    }, {key: "4", label: '选项4'}]);
    return (
      <div className="demo-select">
        <Select style={{width: 300}} showSingleClear showSearch
                filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChange} value={this.state.value}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>
        <br/>
        <Select style={{width: 300}} mode={'multiple'} showSearch showSelectAll
                filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChangeMultiple} value={this.state.mValue}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>
      </div>
    );
  }
```
:::

## 加载状态

:::demo 加载中状态文案
```js
render(){
  return(
    <div className="demo-select">
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
  state = {
    value: "1",
    align: "bottomLeft",
    width: 200,
  };

  handleChange = (e) => {
    this.setState({align: e.target.value});
  };

  handleChangeWidth = (e) => {
    this.setState({width: e.target.value});
  };


  render() {
    const Group = this.props.utils.listConvertToGroup([{key: "1", label: '选项1'}, {key: "2", label: '选项2'}, {
      key: "3",
      label: '选项3'
    }, {key: "4", label: '选项4'}]);
    return (
      <div className="demo-select">
        <Input style={{marginBottom: 20, width: 200}} placeholder="输入宽度" value={this.state.width}
               onChange={this.handleChangeWidth}/>
        <div>
          <Radio.Group showSingleClear value={this.state.align} onChange={this.handleChange} style={{marginBottom: 20}}>
            <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
            <Radio.Button value="bottomCenter">bottomCenter</Radio.Button>
            <Radio.Button value="bottomRight">bottomRight</Radio.Button>
            <Radio.Button value="topLeft">topLeft</Radio.Button>
            <Radio.Button value="topCenter">topCenter</Radio.Button>
            <Radio.Button value="topRight">topRight</Radio.Button>
          </Radio.Group>
        </div>
        <Select style={{width: 300}} popupAlign={this.state.align} onChange={(value) => this.setState({value})}
                value={this.state.value} dropdownMatchSelectWidth={false}
                dropdownStyle={{width: Number(this.state.width)}}>
          {Group.map(group =>
            <Select.OptGroup label={group.label} key={group.key}>
              {group.list && group.list.map(item => <Select.Option key={item.key}>{item.label}</Select.Option>)}
            </Select.OptGroup>
          )}
        </Select>
      </div>
    );

  }
```

:::

## 后端搜索-单选

:::demo 使用`showSeach`、`labelInValue`、`onSearch`配合进行后端搜索操作，`notFoundContent`可以定制搜索文案
```js
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.state = {
      value: [],
      fetching: false,
      data: []
    }
  }

  componentDidMount() {
    this.fetchUser('');
  }


  fetchUser = (value) => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({data: [], fetching: true});
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
        this.setState({data, fetching: false});
      });
  }

  handleChange = (value) => {
    this.setState({
      value,
      fetching: false,
    });
    console.log('newState:', value);
  };

  render() {
    const {fetching, data, value} = this.state;
    return (
      <div className="demo-select">
        <Select style={{width: 300}} labelInValue showSingleClear showSearch onSearch={this.fetchUser}
                onChange={this.handleChange} value={value}
                notFoundContent={fetching ? <Spin size="small"/> : null}>
          {data.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
        </Select>
      </div>
    );
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
    this.state = {
      value: [],
      fetching: false,
      data: []
    };
  }

  componentDidMount() {
    this.fetchUser('');
  }

  fetchUser = (value) => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({data: [], fetching: true});
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
        this.setState({data, fetching: false});
      });
  };

  handleChange = (value) => {
    this.setState({
      value,
      fetching: false,
    });
    console.log('newState:', value);
  };

  render() {
    const {fetching, data, value} = this.state;
    return (
      <div className="demo-select">
        <Select style={{width: 300}} showSelectAll mode="multiple" labelInValue showSearch
                onSearch={this.fetchUser} onChange={this.handleChange} value={value}
                notFoundContent={fetching ? <Spin size="small"/> : null}>
          {data.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
        </Select>
      </div>
    );
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
| allowClear | 支持搜索框清除操作 | Boolean | true |
| tagWidth | 可清除选项的宽度（仅在mode = 'multiple' 且 labelClear = true 生效） | String \| Number | 100 |
| defaultActiveFirstOption | 是否默认激活第一项 | Boolean | false |
| defaultValue | 指定默认选中的条目 | String \| Array<String> \| Number \| Array<Number>	 | - |
| disabled | 是否禁用 | Boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | String | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | Bolean | true |
| dropdownStyle | 下拉菜单的 style 属性 | Object | - |
| errorMessage | 错误提示文案 | String/ReactNode | '超过选项上限' |
| extraOptions | 额外的列表项 | String/ReactNode | - |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | Boolean \| (inputValue, option) => Void | true |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | (triggerNode) => HTMLElement | () => document.body |
| labelClear | 多选模式下开启label删除功能 | Boolean | false |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: String, label: ReactNode , title : String }` 的格式 | Boolean | false |
| loading | 加载状态 | Boolean | false |
| maxLabelClearPanelHeight | 可删除label模式下面板的最大高度( mode='multiple' & labelClear) | Number \| String | '三行的高度' |
| maxCount | 最大多选个数 | Number | - |
| maxScrollHeight | 列表滚动区高度 | Number | 250 |
| multipleSelectAllText | 多选模式下全部选中的文案 | String | '全部选中' |
| mode | 设置 Select 的模式 |  Enum {'multiple' , 'single' } | - |
| notFoundContent | 当下拉列表为空时显示的内容 | String \| ReactNode | '无匹配结果' |
| onChange | 选中 option时，调用此函数 | (value) => Void | - |
| onMouseEnter | 鼠标移入时回调 | (value) => Void | - |
| onMouseLeave | 鼠标移出时回调 | (value) => Void | - |
| onPopupScroll | 下拉列表滚动时的回调 | (value) => Void | - |
| onSearch | 文本框值变化时回调 | (value) => Void | - |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | (value) => Void | - |
| onVisibleChange | 弹出框显示隐藏 | (visible) => Void | - |
| placeholder | 选择框默认文字 | String | '请选择' |
| popupAlign | 弹窗位置 | Enum {'bottomLeft', 'bottomCenter', 'bottomRight','topLeft','topCenter', 'topRight'}| 'bottomLeft' |
| searchInputProps | 搜索框额外属性 | Object | {} |
| searchPlaceholder | 搜索框默认文字 | String | '请输入关键词' |
| selectAllText | 是否显示全选/反选功能-文案 | String | '选择所有' |
| showMultipleSelectAll | 多选模式下全部选中是否显示特殊文案 | Boolean | false |
| showArrow | 是否显示下拉小箭头 | Boolean | true |
| showOptionCheckedIcon | 是否显示option选中的√ | Boolean | true |
| showSearch | 是否可搜索，需要配合filterOption或者后端搜索使用 | Boolean | false |
| showSingleClear | 是否显示清除选择功能（仅在mode='single'生效） | Boolean | false |
| showSelectAll | 是否显示全选/反选功能（仅在mode='multiple'生效） | Boolean | true |
| size | 选择框大小，可选 `large` `small` | Enum {'large','small'} | default |
| value | 指定当前选中的条目 | String \| Array<String> \| Number \| Array<Number> | - |
| visible | 下拉选择框显示隐藏 | Boolean | - |

> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 getPopupContainer={triggerNode => triggerNode.parentNode} 将下拉弹层渲染节点固定在触发器的父元素中。

### Select Methods

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

> 注意，在有SearchInput的情况，操作的目标为Input框,`listConvertToGroup`在util库中引用
  
### Select.Option props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | Boolean | false |
| key | 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 | String | - |
| value | - | String | Number | - |
| title | title值 | String | - |

### Select.OptGroup props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | - | String | - |
| label | 组名 | String \| ReactNode | - |


<style>
 .demo-select .fishd-select{
   margin-bottom: 10px;
 }
</style>
