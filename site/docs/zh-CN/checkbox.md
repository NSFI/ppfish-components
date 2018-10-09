# Checkbox 复选框 【交互：李东岳 | 视觉：徐剑杰 |开发：王晓玲】

复选控件。

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 基本用法

:::demo 简单的 checkbox。

```js
onChange=(e) => {
  console.log(`checked = ${e.target.checked}`);
};

render(){
  return(<Checkbox onChange={this.onChange}>Checkbox</Checkbox>)
}
```
:::

## 不可用

:::demo checkbox 不可用。

```js
render(){
  return(<div>
       <Checkbox defaultChecked={false} disabled />
       <br />
       <Checkbox defaultChecked disabled />
     </div>
     )
}
```
:::

## 受控的 Checkbox

:::demo 联动 checkbox。

```js
  state = {
    checked: true,
    disabled: false,
  };

  render() {
    const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`;
    return (
      <div>
        <p style={{ marginBottom: '20px' }}>
          <Checkbox
            checked={this.state.checked}
            disabled={this.state.disabled}
            onChange={this.onChange}
          >
            {label}
          </Checkbox>
        </p>
        <p>
          <Button
            type="primary"
            size="small"
            onClick={this.toggleChecked}
          >
            {!this.state.checked ? 'Check' : 'Uncheck'}
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            size="small"
            onClick={this.toggleDisable}
          >
            {!this.state.disabled ? 'Disable' : 'Enable'}
          </Button>
        </p>
      </div>
    );
  }

  toggleChecked = () => {
    this.setState({ checked: !this.state.checked });
  }

  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  }

  onChange = (e) => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  }
```
:::

## Checkbox 组

:::demo 方便的从数组生成 Checkbox 组。

```js
onChange=(checkedValues) => {
  console.log('checked = ', checkedValues);
};

render(){
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
  ];
  return(<div>
             <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={this.onChange} />
             <br /><br />
             <CheckboxGroup options={options} defaultValue={['Pear']} onChange={this.onChange} />
             <br /><br />
             <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']} onChange={this.onChange} />
           </div>)
}
```
:::

## 全选

:::demo 在实现全选效果时，你可能会用到 `indeterminate` 属性。

```js
  state = {
    checkedList: ['Apple', 'Orange'],
    plainOptions:['Apple', 'Pear', 'Orange'],
    indeterminate: true,
    checkAll: false,
  };

  render() {
    const CheckboxGroup = Checkbox.Group;
    return (
      <div>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup options={this.state.plainOptions} value={this.state.checkedList} onChange={this.onChange} />
      </div>
    );
  }

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.state.plainOptions.length),
      checkAll: checkedList.length === this.state.plainOptions.length,
    });
  };

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
```
:::

## 布局

:::demo Checkbox.Group 内嵌 Checkbox 并与 Grid 组件一起使用，可以实现灵活的布局。

```js
onChange=(checkedValues) => {
  console.log('checked = ', checkedValues);
};

render(){
  return(
    <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
        <Row>
          <Col span={8}><Checkbox value="A">A</Checkbox></Col>
          <Col span={8}><Checkbox value="B">B</Checkbox></Col>
          <Col span={8}><Checkbox value="C">C</Checkbox></Col>
          <Col span={8}><Checkbox value="D">D</Checkbox></Col>
          <Col span={8}><Checkbox value="E">E</Checkbox></Col>
        </Row>
      </Checkbox.Group>
  )
}
```
:::

## API

### 属性

#### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 选择器的className | String | - |
| autoFocus | 自动获取焦点 | Boolean | false |
| checked | 指定当前是否选中 | Boolean | false |
| defaultChecked | 初始是否选中 | Boolean | false |
| disabled | 失效状态 | Boolean | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | Boolean | false |
| onChange | 变化时回调函数 | (e:Event) => Void | - |

#### Checkbox Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的选项 | String \| Array<String> | [] |
| disabled | 整组失效 | Boolean | false |
| options | 指定可选项 | String \| Array<String> | [] |
| value | 指定选中的选项 |  String \| Array<String> | [] |
| onChange | 变化时回调函数 | (checkedValue) => Void | - |

### 方法

#### Checkbox

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
