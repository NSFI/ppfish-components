# AutoComplete 自动完成 【交互：缺失 | 视觉：徐剑杰 |开发：高志友】

输入框自动完成功能。

## 何时使用

需要自动完成时。

## 基本使用

:::demo 通过 dataSource 设置自动完成的数据源。

```js
  state = {
    dataSource: [],
  }

  onSelect = (value) => {
    console.log('onSelect', value);
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="input here"
        getPopupContainer={() => document.querySelector('.content')}
      />
    );
  }
```
:::

## 自定义选项

:::demo 也可以直接传 `AutoComplete.Option` 作为 `AutoComplete` 的 `children`，而非使用 `dataSource`。

```js
  state = {
    result: [],
  }

  handleSearch = (value) => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
    this.setState({ result });
  }

  render() {
    const { result } = this.state;
    const children = result.map((email) => {
      return <AutoComplete.Option key={email}>{email}</AutoComplete.Option>;
    });
    return (
      <AutoComplete
        style={{ width: 200 }}
        onSearch={this.handleSearch}
        placeholder="input here"
        getPopupContainer={() => document.querySelector('.content')}
      >
        {children}
      </AutoComplete>
    );
  }
```
:::


## 不区分大小写

:::demo 不区分大小写的 AutoComplete。

```js

  render() {
    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
    return (
      <AutoComplete
        style={{ width: 200 }}
        dataSource={dataSource}
        placeholder="try to type `b`"
        filterOption={(inputValue, option) => option.props.children.toUpperCase && option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        getPopupContainer={() => document.querySelector('.content')}
      />
    );
  }
```
:::

## 自定义输入组件

:::demo 自定义输入组件。

```js
  state = {
    dataSource: [],
  }

  onSelect = (value) => {
    console.log('onSelect', value);
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  handleKeyPress = (ev) => {
    console.log('handleKeyPress', ev);
  }

  render() {
    const { dataSource } = this.state;
    const { TextArea } = Input;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        getPopupContainer={() => document.querySelector('.content')}
      >
        <TextArea
          placeholder="input here"
          className="custom"
          style={{ height: 50 }}
          onKeyPress={this.handleKeyPress}
        />
      </AutoComplete>
    );
  }
```
:::

## 查询模式 - 确定类目

:::demo 查询模式 - 确定类目。

```js

  constructor() {
    super();
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;
    const dataSource = [{
      title: '话题',
      children: [{
        title: 'FishDesign',
        count: 10000,
      }, {
        title: 'FishDesign UI',
        count: 10600,
      }],
    }, {
      title: '问题',
      children: [{
        title: 'FishDesign UI 有多好',
        count: 60100,
      }, {
        title: 'FishDesign 是啥',
        count: 30010,
      }],
    }, {
      title: '文章',
      children: [{
        title: 'FishDesign 是一种设计语言',
        count: 100000,
      }],
    }];
    function renderTitle(title) {
      return (
        <span>
          {title}
          <a
            style={{ float: 'right' }}
            href="https://www.google.com/search?q=fishdesign"
            target="_blank"
            rel="noopener noreferrer"
          >更多
          </a>
        </span>
      );
    }
    this.options = dataSource.map(group => (
      <OptGroup
        key={group.title}
        label={renderTitle(group.title)}
      >
        {group.children.map(opt => (
          <Option key={opt.title} value={opt.title}>
            {opt.title}
            <span className="certain-search-item-count">{opt.count} 人 关注</span>
          </Option>
        ))}
      </OptGroup>
    )).concat([
      <Option disabled key="all" className="show-all">
        <a
          href="https://www.google.com/search?q=fishdesign"
          target="_blank"
          rel="noopener noreferrer"
        >
          查看所有结果
        </a>
      </Option>,
    ]);
  }

  render() {
    return (
      <div className="certain-category-search-wrapper" style={{ width: 250 }}>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: '100%' }}
          dataSource={this.options}
          placeholder="input here"
          optionLabelProp="value"
          getPopupContainer={() => document.querySelector('.content')}
        >
          <Input suffix={<Icon type="search-line" className="certain-category-icon" />} />
        </AutoComplete>
      </div>
    );
  }
```
:::

## 查询模式 - 不确定类目

:::demo 查询模式 - 不确定类目。

```js

  constructor() {
    super();
    const Option = AutoComplete.Option;
    this.state = {
      dataSource: [],
    }
  }

  onSelect = (value) => {
    console.log('onSelect', value);
  };

  getRandomInt = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
  }

  searchResult = (query) => {
    return (new Array(this.getRandomInt(5))).join('.').split('.')
      .map((item, idx) => ({
        query,
        category: `${query}${idx}`,
        count: this.getRandomInt(200, 100),
    }));
  }

  renderOption = (item) => {
    return (
      <Option key={item.category} text={item.category}>
        {item.query} 在
        <a
          href={`https://s.taobao.com/search?q=${item.query}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.category}
        </a>
        区块中
        <span className="global-search-item-count">约 {item.count} 个结果</span>
      </Option>
    );
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: value ? this.searchResult(value) : [],
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="input here"
          optionLabelProp="text"
          getPopupContainer={() => document.querySelector('.content')}
        >
          <Input suffix={<Icon type="search-line" />} />
        </AutoComplete>
      </div>
    );
  }
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持清除, 单选模式有效 | Boolean | false |
| autoFocus | 自动获取焦点 | Boolean | false |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | Boolean | false |
| children (自动完成的数据源) | 自动完成的数据源 | ReactNode<OptionProps> \| Array<ReactNode<OptionProps>> | - |
| children (自定义输入框) | 自定义输入框 | HTMLInputElement \| HTMLTextAreaElement \| ReactNode<InputProps> | `<Input />` |
| className | 容器类名 | String | - |
| dataSource | 自动完成的数据源 | Array<DataSourceItemType(https://github.com/NSFI/ppfish-components/blob/master/source/components/AutoComplete/index.tsx#L10)> | - |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | Boolean | true |
| defaultValue | 指定默认选中的条目 | String \| Array<String> \| { key: String, label: String \| ReactNode } \| Array<{ key: String, label: String \| ReactNode}> | - |
| disabled | 是否禁用 | Boolean | false |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | Boolean \| (inputValue, option) => Boolean | true |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位 | (triggerNode) => HTMLElement | () => document.body |
| onBlur | 失去焦点时的回调 | () => Void | - |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | (value) => Void | - |
| onFocus | 获得焦点时的回调 | () => Void | - |
| onSearch | 搜索补全项的时候调用 | (value) => Void | - |
| onSelect | 被选中时调用，参数为选中项的 value 值 | (value, option) => Void | - |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value` | String | `children` |
| placeholder | 输入框提示 | String | - |
| style | 容器样式 | Object | - |
| value | 指定当前选中的条目 | String \| Array<String> \| { key: String, label: String \| ReactNode } \| Array<{ key: String, label: String \| ReactNode }> | - |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

