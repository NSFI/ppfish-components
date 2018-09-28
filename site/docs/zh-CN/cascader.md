# Cascader 级联选择

级联选择框。

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## 基本

:::demo 省市区级联。

```js
onChange = (value)=> {
  console.log(value);
}

render(){
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  return(<Cascader options={options} onChange={this.onChange} />)
}
```

:::

## 默认值

:::demo 默认值通过数组的方式指定。

```js
onChange = (value) => {
  console.log(value);
}

render(){
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  return(
  <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} onChange={this.onChange} />);
  }
```
:::

## 可以自定义显示

:::demo 切换按钮和结果分开。

```js
  state = {
    text: 'Unselect',
  };

  onChange = (value, selectedOptions) => {
    this.setState({
      text: selectedOptions.map(o => o.label).join(', '),
    });
  };

  render() {
    const options = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
      }],
    }];
    return (
      <span>
        {this.state.text}
        &nbsp;
        <Cascader options={options} onChange={this.onChange}>
          <a href="#">Change city</a>
        </Cascader>
      </span>
    );
  }
```
:::

## 移入展开

:::demo 通过移入展开下级菜单，点击完成选择。

```js
onChange = (value)=> {
  console.log(value);
};

// Just show the latest item.
displayRender=(label)=> {
  return label[label.length - 1];
};

render(){
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  return(
    <Cascader
      options={options}
      expandTrigger="hover"
      displayRender={this.displayRender}
      onChange={this.onChange}
    />);
  }
```
:::

## 禁用选项

:::demo 通过指定 options 里的 `disabled` 字段。

```js

onChange=(value)=> {
  console.log(value);
};

render(){
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    disabled: true,
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  return(
    <Cascader options={options} onChange={this.onChange} />);
  }
```
:::

## 选择即改变

:::demo 这种交互允许只选中父级选项。

```js
onChange = (value)=> {
  console.log(value);
};

render(){
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hanzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  return(
    <Cascader options={options} onChange={this.onChange} changeOnSelect />)
  }
```
:::

## 大小

:::demo 不同大小的级联选择器。

```js
onChange=(value) =>{
  console.log(value);
}

render(){
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  return(
    <div>
      <Cascader size="large" options={options} onChange={this.onChange} /><br /><br />
      <Cascader options={options} onChange={this.onChange} /><br /><br />
      <Cascader size="small" options={options} onChange={this.onChange} /><br /><br />
    </div>)
  }
```
:::

## 自定义已选项

:::demo 例如给最后一项加上邮编链接。

```js
handleAreaClick=(e, label, option)=> {
  e.stopPropagation();
  console.log('clicked', label, option);
}

displayRender = (labels, selectedOptions) => labels.map((label, i) => {
  const option = selectedOptions[i];
  if (i === labels.length - 1) {
    return (
      <span key={option.value}>
        {label} (<a onClick={e => this.handleAreaClick(e, label, option)}>{option.code}</a>)
      </span>
    );
  }
  return <span key={option.value}>{label} / </span>;
});

render(){
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
        code: 752100,
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
        code: 453400,
      }],
    }],
  }];
  return(
  <Cascader
    options={options}
    defaultValue={['zhejiang', 'hangzhou', 'xihu']}
    displayRender={this.displayRender}
    style={{ width: '100%' }}
  />)
}
```
:::

## 搜索

:::demo 可以直接搜索选项并选择。

> `Cascader[showSearch]` 暂不支持服务端搜索，更多信息见 [#5547](https://github.com/ant-design/ant-design/issues/5547)

```js

onChange=(value, selectedOptions) =>{
  console.log(value, selectedOptions);
}

filter=(inputValue, path)=> {
  return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
}

render(){
  const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }, {
        value: 'xiasha',
        label: 'Xia Sha',
        disabled: true,
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua men',
      }],
    }],
  }];
  return(
  <Cascader
    options={options}
    onChange={this.onChange}
    showSearch={this.filter}
  />)
}
```
:::

## 动态加载选项

:::demo 使用 `loadData` 实现动态加载选项。

> 注意：`loadData` 与 `showSearch` 无法一起使用。

```js
  state = {
    options:[{
              value: 'zhejiang',
              label: 'Zhejiang',
              isLeaf: false,
            }, {
              value: 'jiangsu',
              label: 'Jiangsu',
              isLeaf: false,
            }],
  };

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [{
        label: `${targetOption.label} Dynamic 1`,
        value: 'dynamic1',
      }, {
        label: `${targetOption.label} Dynamic 2`,
        value: 'dynamic2',
      }];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  }

  render() {
    return (
      <Cascader
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
    );
  }
```
:::

## 自定义字段名

:::demo 自定义字段名。

```js

onChange=(value)=>{
  console.log(value);
};

render(){
  const options = [{
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [{
      code: 'hangzhou',
      name: 'Hangzhou',
      items: [{
        code: 'xihu',
        name: 'West Lake',
      }],
    }],
  }, {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [{
      code: 'nanjing',
      name: 'Nanjing',
      items: [{
        code: 'zhonghuamen',
        name: 'Zhong Hua Men',
      }],
    }],
  }];
  return(
  <Cascader fieldNames={{ label: 'name', value: 'code', children: 'items' }} options={options} onChange={this.onChange} />);
  }
```
:::

## API

```html
<Cascader options={options} onChange={onChange} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否支持清除 | Boolean | true |
| autoFocus | 自动获取焦点 | Boolean | false |
| changeOnSelect | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示 | Boolean | false |
| className | 自定义类名 | String | - |
| defaultValue | 默认的选中项 | Array<String> | \[] |
| disabled | 禁用 | Boolean | false |
| displayRender | 选择后展示的渲染函数 | (label, selectedOptions) => ReactNode | label => label.join(' / ') |
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | String | 'click' |
| fieldNames | 自定义 options 中 label name children 的字段 | Object | { label: 'label', value: 'value', children: 'children' } |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode) | () => document.body |
| loadData | 用于动态加载选项，无法与 `showSearch` 一起使用 | (selectedOptions) => void | - |
| notFoundContent | 当下拉列表为空时显示的内容 | String | 'Not Found' |
| options | 可选项数据源 | Object | - |
| placeholder | 输入框占位文本 | String | '请选择' |
| popupClassName | 自定义浮层类名 | String | - |
| popupPlacement | 浮层预设位置 | Enum {'bottomLeft','bottomRight','topLeft','topRight'} | 'bottomLeft' |
| popupVisible | 控制浮层显隐 | Boolean | - |
| showSearch | 在选择框中显示搜索框 | Boolean | false |
| size | 输入框大小 | Enum {'large' 'default' 'small'} | 'default' |
| style | 自定义样式 | String | - |
| value | 指定选中项 | Array<String> | - |
| onChange | 选择完成后的回调 | (value, selectedOptions) => void | - |
| onPopupVisibleChange | 显示/隐藏浮层的回调 | (value) => void | - |

`showSearch` 为对象时，其中的字段：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| filter | 接收 `inputValue` `path` 两个参数，当 `path` 符合筛选条件时，应返回 true，反之则返回 false。 | Function(inputValue, path): Boolean | - |
| matchInputWidth | 搜索结果列表是否与输入框同宽 | Boolean | - |
| render | 用于渲染 filter 后的选项 | Function(inputValue, path): ReactNode | - |
| sort | 用于排序 filter 后的选项 | Function(a, b, inputValue) | - |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

<style>
.fishd-cascader-picker {
  width: 300px;
}
</style>

> 注意，如果需要获得中国省市区数据，可以参考 [china-division](https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17)。
