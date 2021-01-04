# ConfigProvider 全局化配置
为组件提供统一的全局化配置。


## 使用

ConfigProvider 使用 React 的 [Context](https://reactjs.org/docs/context.html) 特性，只需在应用外围包裹一次即可全局生效。

```js
import { ConfigProvider } from 'ppfish';
import zh_CN from 'ppfish/components/Locale/zh_CN';

export default () => (
  <ConfigProvider Locale={zh_CN}>
    <App />
  </ConfigProvider>
);
```

## 使用演示

:::demo Change locale of components: 
```js

  state = {
    currentLocale: Locale.zh_CN,
  };

  onChange = (e) => {
    const {zh_CN, en_US} = Locale;
    const lang = e.target.value;

    let currentLocale = zh_CN;

    if(lang === 'en_US') {
      currentLocale = en_US;
    }

    this.setState({
      currentLocale
    })
  }
    info=() => {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  }

  success=() => {
    Modal.success({
      title: 'This is a success message',
      content: 'some messages...some messages...',
    });
  }

  error=() => {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  }

  warning=() => {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  }
  render() {
    const {currentLocale} = this.state; 
    return (
      <div className="configProviderDemo">
        <ConfigProvider Locale={currentLocale}>
          <Radio.Group onChange={this.onChange} defaultValue="zh_CN">
            <Radio.Button value="zh_CN">中文</Radio.Button>
            <Radio.Button value="en_US">English</Radio.Button>
          </Radio.Group>
          <Divider />
          <Row gutter={24} className="btn-group">
            <Button onClick={this.info}>Info</Button>
            <Button onClick={this.success}>Success</Button>
            <Button onClick={this.error}>Error</Button>
            <Button onClick={this.warning}>Warning</Button>
          </Row>
          <Row>
            <Pagination
              defaultCurrent={3}
              total={500}
              showQuickJumper
              showSizeChanger />
          </Row> 
          <Row> 
            <Select style={{width: 300}}>
              <Select.Option value={0}>{'选项0'}</Select.Option>
              <Select.Option value={1}>{'选项1'}</Select.Option>
              <Select.Option value={2}>{'选项2'}</Select.Option>
              <Select.Option value={3}>{'选项3'}</Select.Option>
            </Select>
          </Row>
          <Row>
            <Transfer
              dataSource={[]}
              showSearch
              titles={['源列表', '目标列表']}
              targetKeys={[]}
              selectedKeys={[]}
              render={item => item.title}
            />
          </Row>
          <Row>
            <DatePicker
              style={{width: 300, marginRight: 12}}
            />
            <DatePicker
              style={{width: 310}}
              showTime={true}
              />
          </Row>
          <RichEditor />
        </ConfigProvider>
      </div>
    )
  }
```

```less
.configProviderDemo .fishd-row {
  margin: 8px 0
}

.configProviderDemo .btn-group .fishd-btn {
  margin-right: 8px;
}
```
:::
