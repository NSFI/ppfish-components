import React, {Component} from 'react';
import './App.less';
import CustomTable from '../';
import DocumentLayout from '../../../common/DocumentLayout/DocumentLayout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{id: 1, name: 1}, {id: 2, name: 2}],
      totalNum: 2,
      isListLoading: false
    };
  }

  handleTableChange = (pagination) => {
    this.setState({current: pagination.current, isListLoading: true}, () => {
      setTimeout(() => {
        this.setState({isListLoading: false});
      }, 2000);
    });
  };

  render() {
    const {list, totalNum, isListLoading} = this.state;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },];
    return (
      <DocumentLayout>
        <CustomTable
          columns={columns}
          dataSource={list}
          totalNum={totalNum}
          onChange={this.handleTableChange}
          loading={isListLoading}
          offsetHeight={313}
          rowKey="id"
        />
      </DocumentLayout>
    );
  }
}

export default App;
