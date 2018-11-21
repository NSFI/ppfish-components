# AutoComplete 自动完成 【交互：李东岳 | 视觉：徐剑杰 |开发：高志友】

输入框自动完成功能。

## 何时使用

需要自动完成时。

## 基本使用

:::demo 通过 dataSource 设置自动完成的数据源。

```js

  constructor() {
    super();

    this.state = {
      dataSource: [],
    }
  }

  onSelect = (value) => {
    console.log('onSelect', value);
  }

  handleSearch = (value) => {
    const Option = AutoComplete.Option;
    let newValue = !value ? [] : [
      {
        value: value,
        more: ''
      },
      {
        value: value,
        more: '456'
      },
      {
        value: value,
        more: '456789'
      },
    ];
    this.setState({
      dataSource: newValue.map((item) => {
        return (
          <Option key={item.value + item.more} text={item.value + item.more}>
            <span style={{fontWeight: 600}}>
              {item.value}
            </span>
            {item.more}
          </Option>
        );
      })
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
        optionLabelProp="text"
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
      result = ['gmail.com', '163.com', 'qq.com'].map(domain => {
        return {
          'value': value,
          'suffix': `@${domain}`
        };
      });
    }
    this.setState({ result });
  }

  onSelect = (value) => {
    console.log('onSelect', value);
  }

  render() {
    const { result } = this.state;
    const children = result.map((item) => {
      return (
        <AutoComplete.Option key={item.value + item.suffix} text={item.value + item.suffix}>
          <span style={{fontWeight: 600}}>
            {item.value}
          </span>
          {item.suffix}
        </AutoComplete.Option>
      );
    });
    return (
      <AutoComplete
        style={{ width: 200 }}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="input here"
        optionLabelProp="text"
      >
        {children}
      </AutoComplete>
    );
  }
```
:::


## 查询模式

:::demo 查询模式。

```js

  constructor() {
    super();

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
      })
    );
  }

  renderOption = (item) => {
    const Option = AutoComplete.Option;
    return (
      <Option key={item.category} text={item.category}>
        <span style={{fontWeight: 600}}>
          {item.query}
        </span>
        在
        <a
          href={`https://www.baidu.com/s?wd=${item.query}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.category}
        </a>
        中
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
          style={{ width: '100%' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.props.debounce(this.handleSearch, 300)}
          placeholder="input here"
          optionLabelProp="text"
        >
          <Input.Search enterButton maxLength={20} />
        </AutoComplete>
      </div>
    );
  }
```
:::


## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持清除, 单选模式有效 | Boolean | false |
| autoFocus | 自动获取焦点 | Boolean | false |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | Boolean | false |
| children (数据源) | 自动完成的数据源。<br>AutoComplete.Option：选择项<br>AutoComplete.OptGroup：选择组 | ReactNode< [OptionProps](https://github.com/NSFI/ppfish-components/blob/master/source/components/AutoComplete/Select.tsx#L63) > \|<br> Array< ReactNode< [OptionProps](https://github.com/NSFI/ppfish-components/blob/master/source/components/AutoComplete/Select.tsx#L63) > > \|<br> ReactNode< [OptGroupProps](https://github.com/NSFI/ppfish-components/blob/master/source/components/AutoComplete/Select.tsx#L70) > \|<br> Array< ReactNode< [OptGroupProps](https://github.com/NSFI/ppfish-components/blob/master/source/components/AutoComplete/Select.tsx#L70) > > | - |
| children (自定义输入框) | 自定义输入框 | HTMLInputElement \|<br> HTMLTextAreaElement \|<br> ReactNode< InputProps > | `<Input />` |
| className | 容器类名 | String | - |
| dataSource | 自动完成的数据源 | Array< [DataSourceItemType](https://github.com/NSFI/ppfish-components/blob/master/source/components/AutoComplete/index.tsx#L10) >| - |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | Boolean | true |
| defaultValue | 指定默认选中的条目 | String \|<br> Array< String > \|<br> { key: String, label: String \| ReactNode } \|<br> Array< { key: String, label: String \| ReactNode} > | - |
| disabled | 是否禁用 | Boolean | false |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` 和 `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | Boolean \| (inputValue, option) => Boolean | true |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位 | (triggerNode) => HTMLElement | () => document.body |
| onBlur | 失去焦点时的回调 | () => Void | - |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | (value) => Void | - |
| onFocus | 获得焦点时的回调 | () => Void | - |
| onSearch | 搜索补全项的时候调用 | (value) => Void | - |
| onSelect | 被选中时调用，参数为选中项的 value 值 | (value, option) => Void | - |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value` | String | `children` |
| placeholder | 输入框提示 | String | - |
| style | 容器样式 | Object | - |
| value | 指定当前选中的条目 | String \|<br> Array< String > \|<br> { key: String, label: String \| ReactNode } \|<br> Array< { key: String, label: String \| ReactNode } > | - |

### 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
